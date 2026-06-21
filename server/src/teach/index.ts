/**
 * The live teaching loop — Classai's agentic core, run as a deterministic
 * "lesson director" wrapped around the LLM.
 *
 * The director owns the lesson state (which beat, struggle streak, checks
 * passed, elapsed time) and, each turn, injects a STATE block + a DIRECTIVE
 * (continue / check now / the learner is stuck, slow down / wrap up). The LLM
 * produces the actual teaching speech and judges the learner's answer; the
 * director updates state from that judgement and decides when to advance beats
 * or end the lesson. This keeps lessons on-track instead of drifting.
 */
import { z } from 'zod';
import type {
  Kid,
  Course,
  Lesson,
  Session,
  TeacherTurn,
  KidResponse,
  WorkingMemory,
  Momentum
} from '../../../shared/types.ts';
import { blockIsInteractive } from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { getBrain, type ChatMessage } from '../ai/provider.ts';
import { generateStructured, TurnSchema, ReportSchema } from '../ai/schemas.ts';
import { teachSystemPrompt, teachKickoff, turnDirective, reportPrompt, summaryPrompt } from '../ai/prompts.ts';
import { subjectProfile } from '../ai/subjects.ts';
import { getOrInitLearner, applyTurnMemory, updateNarrative, addEpisode } from '../memory/index.ts';

const SummarySchema = z.object({ summary: z.string().default(''), preferences: z.string().default('') });

function freshWorking(lesson: Lesson): WorkingMemory {
  return {
    focus: lesson.objectives[0] || lesson.topic,
    momentum: 'steady',
    lastEmotion: 'neutral',
    beatIndex: 0,
    turnsSinceCheck: 0,
    teacherTurns: 0,
    struggleStreak: 0,
    checksPassed: 0,
    checksTotal: 0,
    notes: [],
    observed: {}
  };
}

export function startSession(kid: Kid, course: Course, lesson: Lesson): Session {
  const session: Session = {
    id: 's_' + Math.random().toString(36).slice(2) + Date.now().toString(36),
    kidId: kid.id,
    courseId: course.id,
    lessonId: lesson.id,
    subject: course.subject,
    topic: lesson.topic,
    status: 'active',
    startedAt: new Date().toISOString(),
    transcript: [],
    working: freshWorking(lesson)
  };
  db.sessions.insert(session);
  db.lessons.setStatus(lesson.id, 'in_progress');
  return session;
}

/** Soft time budget (minutes) for a lesson, from its plan size. */
function softLimit(lesson: Lesson): number {
  return Math.min(35, Math.max(12, lesson.plan.length * 5));
}

function buildMessages(session: Session, kid: Kid, lesson: Lesson, returning: boolean, directive: string): ChatMessage[] {
  const msgs: ChatMessage[] = [{ role: 'user', content: teachKickoff(kid, lesson, returning) }];
  for (const e of session.transcript) {
    msgs.push(e.role === 'teacher' ? { role: 'assistant', content: e.text } : { role: 'user', content: e.text });
  }
  // Attach the per-turn directive to the trailing user turn (or add one).
  const last = msgs[msgs.length - 1]!;
  if (last.role === 'user') last.content = `${last.content}\n\n${directive}`;
  else msgs.push({ role: 'user', content: directive });
  return msgs;
}

export interface TurnResult {
  turn: TeacherTurn;
  ended: boolean;
  sessionId: string;
  beat: { index: number; total: number };
}

export async function nextTurn(sessionId: string, response?: KidResponse): Promise<TurnResult> {
  const session = db.sessions.get(sessionId);
  if (!session) throw new Error('session_not_found');
  if (session.status === 'ended') throw new Error('session_ended');

  const kid = db.kids.get(session.kidId);
  const course = db.courses.get(session.courseId);
  const lesson = db.lessons.get(session.lessonId);
  if (!kid || !course || !lesson) throw new Error('session_context_missing');

  if (response) {
    session.transcript.push({ role: 'kid', text: response.text?.trim() || '(continue)', ts: new Date().toISOString() });
  }

  const model = getOrInitLearner(kid.id);
  const profile = subjectProfile(course.subjectKey);
  const returning = Boolean(model.summary) || db.sessions.listByKid(kid.id).length > 1;
  const w = session.working;

  const beatIdx = Math.min(w.beatIndex, lesson.plan.length - 1);
  const beat = lesson.plan[beatIdx]!;
  const minutesElapsed = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000);

  const directive = turnDirective({
    beatNo: beatIdx + 1,
    beatTotal: lesson.plan.length,
    beatKind: beat.kind,
    beatGoal: beat.goal,
    successCriteria: beat.successCriteria,
    check: beat.check,
    working: w,
    minutesElapsed,
    softLimitMin: softLimit(lesson)
  });

  const brain = await getBrain();
  const system = teachSystemPrompt(kid, course, lesson, profile, model);
  const messages = buildMessages(session, kid, lesson, returning, directive);

  const { blockError, ...parsedTurn } = await generateStructured(brain, TurnSchema, {
    system,
    messages,
    maxTokens: 1100,
    quality: 'fast',
    label: 'Teaching turn'
  });
  const turn = parsedTurn as TeacherTurn;

  session.transcript.push({
    role: 'teacher',
    text: turn.speech,
    emotion: turn.emotion,
    block: turn.block,
    ts: new Date().toISOString()
  });

  applyDirectorState(w, turn, beat.kind);
  // If the block was dropped, the next directive feeds the error back so the
  // model can self-correct instead of re-promising a visual that never shows.
  w.lastBlockError = blockError;
  if (turn.memoryUpdates.length) applyTurnMemory(kid.id, turn.memoryUpdates);
  if (turn.concern) addEpisode(kid.id, 'note', `⚠️ ${turn.concern}`, lesson.topic);

  // Deterministic backstop: never let a lesson run forever if the model keeps
  // omitting lessonComplete. End hard on a turn cap or 2x the soft time budget.
  const exhausted = w.teacherTurns >= MAX_TEACHER_TURNS || minutesElapsed >= softLimit(lesson) * 2;

  let ended = false;
  if (turn.lessonComplete || exhausted) {
    if (exhausted) turn.lessonComplete = true;
    await finalizeSession(session, kid);
    ended = true;
  } else {
    db.sessions.save(session);
  }
  return { turn, ended, sessionId, beat: { index: Math.min(w.beatIndex, lesson.plan.length - 1), total: lesson.plan.length } };
}

const MAX_TEACHER_TURNS = 40;

/** The director updates lesson state from the LLM's judgement of the turn. */
function applyDirectorState(w: WorkingMemory, turn: TeacherTurn, beatKind: string): void {
  w.teacherTurns++;
  w.lastEmotion = turn.emotion;

  const asked = blockIsInteractive(turn.block);
  w.turnsSinceCheck = asked || turn.answerEval !== 'na' ? 0 : w.turnsSinceCheck + 1;

  // Display-block loop detector: the model re-sending the same look-only block
  // while nothing moves (no answer to judge, beat not advancing) means it is
  // asking the learner to act on a block they can't touch.
  const stalledDisplay = !!turn.block && !asked && turn.answerEval === 'na' && !turn.beatComplete;
  if (stalledDisplay) {
    w.sameDisplayBlockStreak = turn.block!.type === w.lastBlockType ? (w.sameDisplayBlockStreak ?? 0) + 1 : 1;
  } else {
    w.sameDisplayBlockStreak = 0;
  }
  w.lastBlockType = turn.block?.type;

  if (turn.answerEval !== 'na') {
    w.checksTotal++;
    if (turn.answerEval === 'correct') {
      w.checksPassed++;
      w.struggleStreak = 0;
    } else if (turn.answerEval === 'incorrect') {
      w.struggleStreak++;
    } else {
      // partial: not a clean miss, ease the streak but don't clear it
      w.struggleStreak = Math.max(0, w.struggleStreak - 1);
    }
  }

  if (turn.beatComplete) {
    w.beatIndex = w.beatIndex + 1;
    w.struggleStreak = 0;
  }

  // Live momentum read.
  let momentum: Momentum = 'steady';
  if (w.struggleStreak >= 2) momentum = 'stuck';
  else if (turn.answerEval === 'correct' && w.struggleStreak === 0) momentum = 'flowing';
  if (turn.memoryUpdates.length) {
    const min = Math.min(...turn.memoryUpdates.map((u) => u.mastery));
    if (min < 0.35) momentum = 'stuck';
  }
  w.momentum = momentum;

  for (const u of turn.memoryUpdates) {
    w.observed[u.topic] = {
      signal: u.mastery < 0.4 ? 'struggling' : u.mastery < 0.7 ? 'shaky' : 'got_it',
      note: u.note || ''
    };
  }
  if (turn.assessment) {
    w.notes.push(turn.assessment);
    while (w.notes.length > 24) w.notes.shift();
  }
}

async function finalizeSession(session: Session, kid: Kid): Promise<void> {
  session.status = 'ended';
  session.endedAt = new Date().toISOString();
  try {
    const brain = await getBrain();
    const rp = reportPrompt(kid, session);
    const report = await generateStructured(brain, ReportSchema, {
      system: rp.system,
      messages: [{ role: 'user', content: rp.user }],
      maxTokens: 1200,
      quality: 'deep',
      label: 'Progress report'
    });
    session.report = report;

    const model = getOrInitLearner(kid.id);
    const sp = summaryPrompt(kid, model, session);
    const sum = await generateStructured(brain, SummarySchema, {
      system: sp.system,
      messages: [{ role: 'user', content: sp.user }],
      maxTokens: 600,
      quality: 'deep',
      label: 'Learner profile update'
    });
    updateNarrative(kid.id, sum.summary, sum.preferences);

    for (const h of report.highlights.slice(0, 3)) addEpisode(kid.id, 'highlight', h, session.topic);
    for (const n of report.needsWork.slice(0, 3)) addEpisode(kid.id, 'struggle', n, session.topic);
    if (report.mastered.length) addEpisode(kid.id, 'milestone', `Mastered: ${report.mastered.join(', ')}`, session.topic);
  } catch {
    session.report = session.report || {
      summary: 'Lesson completed. (Report generation was unavailable.)',
      mastered: [], needsWork: [], highlights: [], nextSteps: '', concerns: [], score: 50
    };
  }
  db.sessions.save(session);
  db.lessons.setStatus(session.lessonId, 'complete');
}

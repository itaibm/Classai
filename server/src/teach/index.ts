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
  LessonFull,
  LessonBeatFull,
  LessonBlock,
  PracticeItem,
  HandoffCard,
  WrongAnswer,
  LearnerModel,
  SubjectProfile,
  Session,
  TeacherTurn,
  KidResponse,
  WorkingMemory,
  Momentum
} from '../../../shared/types.ts';
import { blockIsInteractive, isInteractiveBlock, isLessonFull } from '../../../shared/types.ts';
import { findVideo } from '../services/video.ts';
import * as db from '../db/index.ts';
import { getBrain, type Brain, type ChatMessage } from '../ai/provider.ts';
import { generateStructured, TurnSchema, ReportSchema } from '../ai/schemas.ts';
import { teachSystemPrompt, teachKickoff, turnDirective, authoredDirective, reportPrompt, summaryPrompt } from '../ai/prompts.ts';
import type { AuthoredMode } from '../ai/prompts.ts';
import { subjectProfile } from '../ai/subjects.ts';
import {
  initPractice,
  chooseItem,
  markServed,
  recordAnswer,
  easyRecoveryItem,
  masteryEstimate,
  hintForAttempt
} from './practice.ts';
import { getOrInitLearner, applyTurnMemory, updateNarrative, addEpisode } from '../memory/index.ts';

const SummarySchema = z.object({ summary: z.string().default(''), preferences: z.string().default('') });
const JudgeSchema = z.object({ correct: z.boolean().default(false).catch(false) });

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

export function startSession(kid: Kid, course: Course, lesson: Lesson | LessonFull): Session {
  const session: Session = {
    id: 's_' + Math.random().toString(36).slice(2) + Date.now().toString(36),
    kidId: kid.id,
    classId: course.id,
    lessonId: lesson.id,
    lessonSnapshot: lesson,
    curriculumId: isLessonFull(lesson) ? lesson.curriculumId ?? lesson.id : undefined,
    subject: course.subject,
    topic: lesson.topic,
    status: 'active',
    startedAt: new Date().toISOString(),
    transcript: [],
    working: freshWorking(lesson)
  };
  db.sessions.insert(session);
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
  const course = db.classes.get(session.classId);
  const lesson = session.lessonSnapshot;
  if (!kid || !course || !lesson?.id) throw new Error('session_context_missing');

  const previousTeacherTurn = [...session.transcript].reverse().find((entry) => entry.role === 'teacher');
  if (response) {
    session.transcript.push({ role: 'kid', text: response.text?.trim() || '(continue)', ts: new Date().toISOString() });
  }

  const model = getOrInitLearner(kid.id);
  const profile = subjectProfile(course.subjectKey);
  const returning = Boolean(model.summary) || db.sessions.listByKid(kid.id).length > 1;
  const w = session.working;

  // Authored curriculum lesson → the deterministic authored-beat director owns
  // the flow (beats, verbatim scripts, authored blocks, practice adaptivity,
  // delivery modes); the LLM only voices and judges free text.
  if (isLessonFull(lesson)) {
    return await authoredTurn({ session, kid, course, lesson, model, profile, returning, response });
  }

  const beatIdx = Math.min(w.beatIndex, lesson.plan.length - 1);
  const beat = lesson.plan[beatIdx]!;
  const minutesElapsed = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000);

  let directive = turnDirective({
    beatNo: beatIdx + 1,
    beatTotal: lesson.plan.length,
    beatKind: beat.kind,
    beatGoal: beat.goal,
    beatNote: beat.note,
    beatVisual: beat.visual,
    successCriteria: beat.successCriteria,
    check: beat.check,
    working: w,
    minutesElapsed,
    softLimitMin: softLimit(lesson)
  });

  // The learner pressed "I don't get it" — they understood neither the words nor the
  // visual. Override: re-teach the SAME idea a different way, don't advance.
  if (response?.confused) {
    directive =
      'OVERRIDE — the learner just pressed "I DON\'T GET IT" on your last explanation. Do NOT advance the beat and do NOT just repeat yourself. Re-teach the SAME idea a different, simpler way: a fresh analogy or a different VISUAL (e.g. switch a table for an animated whiteboard, or break it into smaller steps), check the one piece they likely missed, and keep it warm and encouraging.\n\n' +
      directive;
  }

  const brain = await getBrain();
  const materials = db.knowledgeMaterials.listByClass(course.id)
    .filter((material) => !material.lessonId || material.lessonId === lesson.id)
    .filter((material) => material.status === 'ready' && material.rawText.trim());
  const activities = db.aiSuggestions.listByClass(course.id).filter((suggestion) => suggestion.status === 'approved');
  const knowledge = materials.length
    ? `\n\nPARENT-APPROVED KNOWLEDGE — use and adapt this; do not contradict it:\n${materials.map((material) => `--- ${material.title} ---\n${material.rawText}`).join('\n\n')}`
    : '';
  const activityLibrary = activities.length
    ? `\n\nPARENT-APPROVED ACTIVITY LIBRARY — reuse or adapt these when helpful:\n${activities.map((activity) => `--- ${activity.title}: ${activity.objective} ---\n${JSON.stringify(activity.block)}`).join('\n\n')}`
    : '';
  const system = teachSystemPrompt(kid, course, lesson, profile, model) + (knowledge + activityLibrary).slice(0, 30_000);
  const messages = buildMessages(session, kid, lesson, returning, directive);

  const { blockError, ...parsedTurn } = await generateStructured(brain, TurnSchema, {
    system,
    messages,
    maxTokens: 1100,
    quality: 'fast',
    label: 'Teaching turn'
  });
  const turn = parsedTurn as TeacherTurn;

  // Resolve any video block's search `query` into a real, embeddable URL before
  // the turn reaches the client. Unresolved videos are dropped so the learner
  // never sees a broken embed.
  await resolveTurnVideos(turn);

  session.transcript.push({
    role: 'teacher',
    text: turn.speech,
    emotion: turn.emotion,
    block: turn.block,
    blocks: turn.blocks,
    ts: new Date().toISOString()
  });

  applyDirectorState(w, turn, beat.kind);
  // If the block was dropped, the next directive feeds the error back so the
  // model can self-correct instead of re-promising a visual that never shows.
  w.lastBlockError = blockError;
  if (turn.memoryUpdates.length) applyTurnMemory(kid.id, turn.memoryUpdates);
  if (turn.concern) addEpisode(kid.id, 'note', `⚠️ ${turn.concern}`, lesson.topic);
  if (response && turn.answerEval === 'correct' && previousTeacherTurn) {
    const previousBlocks = previousTeacherTurn.blocks ?? (previousTeacherTurn.block ? [previousTeacherTurn.block] : []);
    const successfulActivity = previousBlocks.find(blockIsInteractive);
    if (successfulActivity) {
      const timestamp = new Date().toISOString();
      db.aiSuggestions.insert({
        id: 'a_' + Math.random().toString(36).slice(2) + Date.now().toString(36),
        classId: course.id,
        lessonId: lesson.id,
        sourceSessionId: session.id,
        sourceTurnTs: previousTeacherTurn.ts,
        title: `Successful ${successfulActivity.type} activity`,
        objective: w.focus || lesson.objectives[0] || lesson.topic,
        block: successfulActivity,
        status: 'draft',
        createdAt: timestamp,
        updatedAt: timestamp
      });
    }
  }

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

/** Resolve video blocks that carry a search `query` into a real embeddable URL.
 *  Drops the video block if search is disabled or finds nothing — never ship a
 *  broken embed. Mutates turn.blocks/turn.block in place. */
async function resolveTurnVideos(turn: TeacherTurn): Promise<void> {
  const blocks = turn.blocks ?? (turn.block ? [turn.block] : []);
  if (!blocks.length) return;
  const out: typeof blocks = [];
  for (const b of blocks) {
    if (b.type === 'video' && !b.url && b.query) {
      const v = await findVideo(b.query);
      if (v) out.push({ ...b, url: v.url, title: b.title || v.title });
      // else: drop the unresolved video block
    } else {
      out.push(b);
    }
  }
  turn.blocks = out;
  turn.block = out[0];
}

/** The director updates lesson state from the LLM's judgement of the turn. */
function applyDirectorState(w: WorkingMemory, turn: TeacherTurn, beatKind: string): void {
  w.teacherTurns++;
  w.lastEmotion = turn.emotion;

  const blocks = turn.blocks ?? (turn.block ? [turn.block] : []);
  const asked = blocks.some(blockIsInteractive);
  w.turnsSinceCheck = asked || turn.answerEval !== 'na' ? 0 : w.turnsSinceCheck + 1;

  // Display-block loop detector: the model re-sending the same look-only block
  // while nothing moves (no answer to judge, beat not advancing) means it is
  // asking the learner to act on a block they can't touch. Only fires when the
  // turn is ALL display (no interactive block paired with it).
  const displayBlock = blocks.find((b) => !blockIsInteractive(b));
  const stalledDisplay = !!displayBlock && !asked && turn.answerEval === 'na' && !turn.beatComplete;
  if (stalledDisplay) {
    w.sameDisplayBlockStreak = displayBlock!.type === w.lastBlockType ? (w.sameDisplayBlockStreak ?? 0) + 1 : 1;
  } else {
    w.sameDisplayBlockStreak = 0;
  }
  w.lastBlockType = displayBlock?.type;

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

// ===========================================================================
// Authored-beat director — plays a `classai-lesson/1` file deterministically.
// The director owns beat order, verbatim scripts, authored blocks, practice
// adaptivity and delivery modes; the LLM voices and judges free text only.
// ===========================================================================

const AUTHORED_MAX_TURNS = 70;
const PRACTICE_TARGET_CORRECT = 4;

interface AuthoredArgs {
  session: Session;
  kid: Kid;
  course: Course;
  lesson: LessonFull;
  model: LearnerModel;
  profile: SubjectProfile;
  returning: boolean;
  response?: KidResponse;
}

/** Soft time budget (minutes) for an authored lesson, from its stated duration. */
function authoredSoftLimit(lesson: LessonFull): number {
  return Math.max(15, Math.min(50, lesson.durationMin || lesson.plan.length * 4));
}

/** Loose match of the learner's text to one of the authored wrong answers. */
function matchWrongAnswer(wrongs: WrongAnswer[] | undefined, text: string): { why: string; remedy: string } | undefined {
  const t = (text || '').trim().toLowerCase();
  if (!t || !wrongs?.length) return undefined;
  const hit = wrongs.find((w) => {
    const a = w.answer.trim().toLowerCase();
    return a && (t === a || t.includes(a) || a.includes(t));
  });
  return hit ? { why: hit.why, remedy: hit.remedy } : undefined;
}

/** Judge a free-text answer with the brain (used only when the client couldn't). */
async function judgeFreeText(
  brain: Brain,
  question: string,
  expected: string,
  wrongs: WrongAnswer[],
  answer: string
): Promise<boolean> {
  if (!answer.trim()) return false;
  const system =
    'You grade a young learner\'s answer generously (ignore spelling/format; judge the meaning). Return ONLY JSON {"correct": boolean}.';
  const user =
    `Question: ${question || '(the practice item)'}\n` +
    `Correct answer: ${expected}\n` +
    (wrongs.length ? `Known wrong answers: ${wrongs.map((w) => w.answer).join('; ')}\n` : '') +
    `Learner said: "${answer}"\nIs the learner's answer essentially correct?`;
  try {
    const r = await generateStructured(brain, JudgeSchema, {
      system,
      messages: [{ role: 'user', content: user }],
      maxTokens: 80,
      quality: 'fast',
      label: 'Answer judge'
    });
    return r.correct;
  } catch {
    return false; // never crash a live lesson on a judging hiccup
  }
}

export async function authoredTurn(args: AuthoredArgs): Promise<TurnResult> {
  const { session, kid, course, lesson, model, profile, returning, response } = args;
  const w = session.working;
  const a = (w.authored ??= {});
  const plan = lesson.plan;
  const brain = await getBrain();
  const nowIso = () => new Date().toISOString();
  const minutesElapsed = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000);
  const softLimitMin = authoredSoftLimit(lesson);
  const clampIdx = () => Math.min(Math.max(0, w.beatIndex), plan.length - 1);

  const baseTurn = (partial: Partial<TeacherTurn>): TeacherTurn => ({
    speech: '',
    emotion: 'neutral',
    assessment: '',
    answerEval: 'na',
    beatComplete: false,
    memoryUpdates: [],
    lessonComplete: false,
    ...partial
  });

  // ---- LLM voicing: authored blocks are 100% director-controlled -----------
  const voiced = async (
    directive: string,
    blocks: LessonBlock[],
    opts?: { awaitResponse?: boolean; autoAdvance?: boolean; continueLabel?: string }
  ): Promise<TeacherTurn> => {
    const system = teachSystemPrompt(kid, course, lesson, profile, model);
    const messages = buildMessages(session, kid, lesson, returning, directive);
    const { blockError: _b, ...parsed } = await generateStructured(brain, TurnSchema, {
      system,
      messages,
      maxTokens: 900,
      quality: 'fast',
      label: 'Teaching turn'
    });
    const turn = parsed as TeacherTurn;
    turn.blocks = blocks;
    turn.block = blocks[0];
    turn.lessonComplete = false; // director decides when the lesson ends
    if (opts?.awaitResponse !== undefined) turn.awaitResponse = opts.awaitResponse;
    if (opts?.autoAdvance !== undefined) turn.autoAdvance = opts.autoAdvance;
    if (opts?.continueLabel !== undefined) turn.continueLabel = opts.continueLabel;
    return turn;
  };

  const dirArgs = (mode: AuthoredMode, beat: LessonBeatFull, extra: Record<string, unknown> = {}) => ({
    beatNo: clampIdx() + 1,
    beatTotal: plan.length,
    beat,
    emphasize: lesson.emphasize || [],
    interests: [...new Set([...(kid.interests || []), ...(model.interests || [])])],
    personalization: lesson.adaptivity.personalization || '',
    mode,
    authoredBlock: !!(beat.blocks && beat.blocks.length),
    working: w,
    minutesElapsed,
    softLimitMin,
    ...extra
  });

  const advanceBeat = () => {
    w.beatIndex = clampIdx() + 1;
    w.struggleStreak = 0;
    a.pending = undefined;
  };

  const endTurn = (): TeacherTurn =>
    baseTurn({ speech: 'That\'s a wrap — brilliant work today. You earned this one!', emotion: 'celebrating', lessonComplete: true });

  // ---- deterministic: parent handoff card (merges consecutive human beats) --
  const handoffTurn = (start: number, end: number): TeacherTurn => {
    const beats = plan.slice(start, end);
    const setup = beats.map((b) => b.humanHandoff?.setup).filter(Boolean).join(' ');
    const scriptLines = beats.map((b) => b.script?.say).filter(Boolean).join('\n\n');
    const notes = [lesson.delivery.humanNotes, ...beats.map((b) => b.note)].filter((n): n is string => !!n && !!n.trim());
    const cue = [...beats].reverse().map((b) => b.humanHandoff?.cueToResume).find((c) => !!c) || '';
    const card: HandoffCard = {
      setup: setup || 'Run this part hands-on with your child.',
      notes,
      materials: lesson.materials?.human || [],
      script: scriptLines || undefined,
      cueToResume: cue,
      continueLabel: 'We did it — continue ▶'
    };
    a.pending = 'human';
    a.humanRunEnd = end;
    return baseTurn({ speech: '', emotion: 'encouraging', handoff: card });
  };

  // ---- deterministic: curated lesson-level video ---------------------------
  const videoDue = (): boolean => {
    const v = lesson.video;
    if (!v || a.videoDone) return false;
    const beat = plan[clampIdx()];
    if (v.role === 'hook') return w.teacherTurns === 0;
    if (v.role === 'teach') return beat?.kind === 'explain';
    return beat?.kind === 'recap'; // reinforce → just before the recap
  };
  const videoTurn = async (): Promise<TeacherTurn | null> => {
    const v = lesson.video!;
    a.videoDone = true;
    let url = v.url;
    if (!url && v.searchTerm) url = (await findVideo(v.searchTerm))?.url;
    if (!url) return null; // no verified/resolvable video → skip silently, never a broken embed
    a.pending = 'video_watch';
    return baseTurn({
      speech: `Quick video break! ${v.watchTask}`,
      emotion: 'curious',
      block: { type: 'video', url, title: v.title },
      blocks: [{ type: 'video', url, title: v.title }],
      awaitResponse: false,
      autoAdvance: false,
      continueLabel: 'I watched it ▶'
    });
  };

  // ---- practice presentation ------------------------------------------------
  const presentReteach = async (itemId: string): Promise<TeacherTurn> => {
    const item = lesson.practiceBank.find((i) => i.id === itemId);
    a.pending = 'reteach';
    const blocks = item?.reteach.block ? [item.reteach.block] : [];
    const beat = plan[clampIdx()]!;
    return await voiced(
      authoredDirective(dirArgs('reteach', beat, { item, reteachSay: item?.reteach.say, authoredBlock: blocks.length > 0 })),
      blocks,
      { awaitResponse: false, autoAdvance: false, continueLabel: 'Got it — let\'s try one ▶' }
    );
  };

  const presentPractice = async (): Promise<TeacherTurn> => {
    const state = (w.practice ??= initPractice(lesson.adaptivity));
    const beat = plan[clampIdx()]!;
    const timeUp = minutesElapsed >= softLimitMin;
    const enough = state.correctCount >= PRACTICE_TARGET_CORRECT;

    if (enough || timeUp) {
      if (state.lastWasMiss) {
        const item = easyRecoveryItem(lesson.practiceBank, state);
        if (item) {
          markServed(state, item);
          a.pending = 'recovery_item';
          return await voiced(
            authoredDirective(dirArgs('endOnSuccess', beat, { item, practiceLevel: state.currentLevel, correctSoFar: state.correctCount, endOnSuccessNote: lesson.adaptivity.endOnSuccess })),
            [item.block],
            { awaitResponse: false }
          );
        }
      }
      advanceBeat();
      return await present();
    }

    const item = chooseItem(lesson.practiceBank, state);
    if (!item) {
      advanceBeat();
      return await present();
    }
    markServed(state, item);
    a.pending = 'practice_item';
    return await voiced(
      authoredDirective(dirArgs('practice', beat, { item, practiceLevel: state.currentLevel, correctSoFar: state.correctCount })),
      [item.block],
      { awaitResponse: false }
    );
  };

  // ---- present the current position ----------------------------------------
  async function present(): Promise<TeacherTurn> {
    if (w.beatIndex >= plan.length) return endTurn();
    if (videoDue()) {
      const v = await videoTurn();
      if (v) return v; // otherwise fall through (video skipped)
    }
    const idx = clampIdx();
    const beat = plan[idx]!;

    if (beat.delivery === 'human') {
      let end = idx;
      while (end < plan.length && plan[end]!.delivery === 'human') end++;
      return handoffTurn(idx, end);
    }

    if (beat.kind === 'check') {
      a.pending = 'beat_check';
      return await voiced(authoredDirective(dirArgs('check', beat)), beat.blocks || [], { awaitResponse: false });
    }
    if (beat.kind === 'practice') {
      return await presentPractice();
    }
    // hook / explain / example / recap (delivered by the AI)
    a.pending = 'beat_present';
    const mode = beat.kind === 'recap' ? 'recap' : 'teach';
    return await voiced(authoredDirective(dirArgs(mode, beat)), beat.blocks || []);
  }

  // ---- judge helper (client answer key first, else the brain) --------------
  const judge = async (
    question: string,
    expected: string,
    wrongs: WrongAnswer[],
    block: LessonBlock | undefined
  ): Promise<boolean> => {
    if (response?.correct !== undefined) return response.correct;
    const freeText = !block || block.type === 'shortText' || block.type === 'speak' || !isInteractiveBlock(block.type);
    if (freeText) return await judgeFreeText(brain, question, expected, wrongs, response?.text || '');
    return false; // an interactive block with no reported correctness → treat as a miss
  };

  // ---- resolve the pending transition, then present ------------------------
  let turn: TeacherTurn | null = null;

  if (response && a.pending) {
    const pending = a.pending;
    if (pending === 'human') {
      w.beatIndex = a.humanRunEnd ?? clampIdx() + 1;
      a.pending = undefined;
      a.humanRunEnd = undefined;
    } else if (pending === 'video_watch') {
      const v = lesson.video;
      if (v?.afterCheck) {
        a.pending = 'video_check';
        turn = baseTurn({ speech: v.afterCheck.question, emotion: 'curious', awaitResponse: true });
      } else {
        a.pending = undefined;
      }
    } else if (pending === 'video_check') {
      // Light judge for warmth; result doesn't gate progress.
      a.pending = undefined;
    } else if (pending === 'beat_present') {
      advanceBeat();
      if (w.beatIndex >= plan.length) turn = endTurn();
    } else if (pending === 'beat_check') {
      const beat = plan[clampIdx()]!;
      const chk = beat.check;
      const block = (beat.blocks || []).find((b) => isInteractiveBlock(b.type)) || (beat.blocks || [])[0];
      const correct = await judge(chk?.question || beat.goal, chk?.expectedAnswer || '', chk?.wrongAnswers || [], block);
      w.checksTotal++;
      if (correct) {
        w.checksPassed++;
        w.struggleStreak = 0;
        advanceBeat();
      } else {
        w.struggleStreak++;
        const remedy = matchWrongAnswer(chk?.wrongAnswers, response.text);
        const stuck = w.struggleStreak >= 2 ? beat.stuckProtocol ?? lesson.adaptivity.struggleProtocol : undefined;
        a.pending = 'beat_check';
        turn = await voiced(authoredDirective(dirArgs('checkRemedy', beat, { remedy, stuck })), beat.blocks || [], { awaitResponse: false });
      }
    } else if (pending === 'practice_item') {
      const state = (w.practice ??= initPractice(lesson.adaptivity));
      const item = lesson.practiceBank.find((i) => i.id === state.currentItemId);
      if (!item) {
        a.pending = undefined;
      } else {
        const prompt = 'prompt' in item.block ? String((item.block as { prompt?: unknown }).prompt ?? '') : item.skill;
        const correct = await judge(prompt, item.expectedAnswer, item.wrongAnswers, item.block);
        const outcome = recordAnswer(state, item, correct);
        w.checksTotal++;
        if (correct) {
          w.checksPassed++;
          w.struggleStreak = 0;
        } else {
          w.struggleStreak++;
        }
        if (outcome.leveledDown && outcome.reteachItemId) {
          turn = await presentReteach(outcome.reteachItemId);
        } else if (!correct) {
          state.currentItemId = item.id; // keep the item open for the retry
          a.pending = 'practice_item';
          const beat = plan[clampIdx()]!;
          const remedy = matchWrongAnswer(item.wrongAnswers, response.text);
          turn = await voiced(
            authoredDirective(dirArgs('practiceHint', beat, { item, hint: outcome.hint, remedy, practiceLevel: state.currentLevel })),
            [item.block],
            { awaitResponse: false }
          );
        } else {
          a.pending = undefined;
          turn = await presentPractice();
        }
      }
    } else if (pending === 'reteach') {
      a.pending = undefined;
      turn = await presentPractice();
    } else if (pending === 'recovery_item') {
      const state = (w.practice ??= initPractice(lesson.adaptivity));
      const item = lesson.practiceBank.find((i) => i.id === state.currentItemId);
      const prompt = item && 'prompt' in item.block ? String((item.block as { prompt?: unknown }).prompt ?? '') : '';
      const correct = item ? await judge(prompt, item.expectedAnswer, item.wrongAnswers, item.block) : true;
      if (item) recordAnswer(state, item, correct);
      if (correct) {
        advanceBeat();
        if (w.beatIndex >= plan.length) turn = endTurn();
      } else if (item) {
        state.currentItemId = item.id;
        a.pending = 'recovery_item';
        const attempts = state.attemptsByItem[item.id] || 1;
        const beat = plan[clampIdx()]!;
        turn = await voiced(
          authoredDirective(dirArgs('practiceHint', beat, { item, hint: hintForAttempt(item, attempts - 1), practiceLevel: state.currentLevel })),
          [item.block],
          { awaitResponse: false }
        );
      }
    }
  }

  if (!turn) turn = await present();

  // ---- shared tail: transcript, memory, backstop, finalize -----------------
  session.transcript.push({
    role: 'teacher',
    text: turn.speech,
    emotion: turn.emotion,
    block: turn.block,
    blocks: turn.blocks,
    ts: nowIso()
  });
  w.teacherTurns++;
  w.lastEmotion = turn.emotion;
  if (turn.memoryUpdates?.length) applyTurnMemory(kid.id, turn.memoryUpdates);
  if (turn.concern) addEpisode(kid.id, 'note', `⚠️ ${turn.concern}`, lesson.topic);

  const exhausted = w.teacherTurns >= AUTHORED_MAX_TURNS;
  let ended = false;
  if (turn.lessonComplete || exhausted) {
    turn.lessonComplete = true;
    // Fold the director's practice-derived mastery into long-term memory so
    // spaced review + recommendNext() benefit (informed by masterySignal).
    if (w.practice && w.practice.askedCount > 0) {
      applyTurnMemory(kid.id, [
        { topic: lesson.topic, mastery: masteryEstimate(w.practice), note: `Authored practice: reached level ${w.practice.currentLevel}, ${w.practice.correctCount}/${w.practice.askedCount} correct.` }
      ]);
    }
    await finalizeSession(session, kid);
    ended = true;
  } else {
    db.sessions.save(session);
  }

  return { turn, ended, sessionId: session.id, beat: { index: clampIdx(), total: plan.length } };
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
}

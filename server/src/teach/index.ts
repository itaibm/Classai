/**
 * The live teaching loop — the agentic core of Classai.
 *
 * Each beat, the brain returns a structured TeacherTurn built from persona +
 * long-term memory + short-term working memory + the lesson plan + subject
 * pedagogy + safety rules. We update both memory tiers from what comes back,
 * and when the lesson completes we distill a parent report and refresh the
 * learner's long-term profile.
 */
import { z } from 'zod';
import type {
  Kid,
  Course,
  Lesson,
  Session,
  TeacherTurn,
  KidResponse,
  WorkingMemory
} from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { getBrain, type ChatMessage } from '../ai/provider.ts';
import { generateStructured, TurnSchema, ReportSchema } from '../ai/schemas.ts';
import { teachSystemPrompt, teachKickoff, reportPrompt, summaryPrompt } from '../ai/prompts.ts';
import { subjectProfile } from '../ai/subjects.ts';
import { getOrInitLearner, applyTurnMemory, updateNarrative, addEpisode } from '../memory/index.ts';

const SummarySchema = z.object({
  summary: z.string().default(''),
  preferences: z.string().default('')
});

export function startSession(kid: Kid, course: Course, lesson: Lesson): Session {
  const working: WorkingMemory = {
    focus: lesson.objectives[0] || lesson.topic,
    momentum: 'steady',
    lastEmotion: 'neutral',
    beatIndex: 0,
    turnsSinceCheck: 0,
    notes: [],
    observed: {}
  };
  const session: Session = {
    id: cryptoId(),
    kidId: kid.id,
    courseId: course.id,
    lessonId: lesson.id,
    subject: course.subject,
    topic: lesson.topic,
    status: 'active',
    startedAt: new Date().toISOString(),
    transcript: [],
    working
  };
  db.sessions.insert(session);
  db.lessons.setStatus(lesson.id, 'in_progress');
  return session;
}

function cryptoId(): string {
  return 's_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** Build the alternating message history from the transcript, anchored by a
 *  kickoff user turn so it always starts with `user`. */
function buildMessages(session: Session, kid: Kid, lesson: Lesson, returning: boolean): ChatMessage[] {
  const msgs: ChatMessage[] = [{ role: 'user', content: teachKickoff(kid, lesson, returning) }];
  for (const e of session.transcript) {
    if (e.role === 'teacher') msgs.push({ role: 'assistant', content: e.text });
    else msgs.push({ role: 'user', content: e.text });
  }
  return msgs;
}

export interface TurnResult {
  turn: TeacherTurn;
  ended: boolean;
  sessionId: string;
}

/** Produce the next teacher turn (optionally in response to the kid). */
export async function nextTurn(sessionId: string, response?: KidResponse): Promise<TurnResult> {
  const session = db.sessions.get(sessionId);
  if (!session) throw new Error('session_not_found');
  if (session.status === 'ended') throw new Error('session_ended');

  const kid = db.kids.get(session.kidId);
  const course = db.courses.get(session.courseId);
  const lesson = db.lessons.get(session.lessonId);
  if (!kid || !course || !lesson) throw new Error('session_context_missing');

  if (response) {
    session.transcript.push({
      role: 'kid',
      text: response.text?.trim() || '(continue)',
      ts: new Date().toISOString()
    });
  }

  const model = getOrInitLearner(kid.id);
  const profile = subjectProfile(course.subjectKey);
  const returning = Boolean(model.summary) || db.sessions.listByKid(kid.id).length > 1;

  const brain = await getBrain();
  const system = teachSystemPrompt(kid, course, lesson, profile, model);
  const messages = buildMessages(session, kid, lesson, returning);

  const turn = (await generateStructured(brain, TurnSchema, {
    system,
    messages,
    maxTokens: 1200,
    quality: 'fast'
  })) as TeacherTurn;

  // Record the teacher's turn.
  session.transcript.push({
    role: 'teacher',
    text: turn.speech,
    emotion: turn.emotion,
    interaction: turn.interaction,
    ts: new Date().toISOString()
  });

  // Update SHORT-TERM working memory.
  updateWorkingMemory(session.working, turn);

  // Fold observations into LONG-TERM memory.
  if (turn.memoryUpdates.length) applyTurnMemory(kid.id, turn.memoryUpdates);

  // Surface anything a parent should see.
  if (turn.concern) addEpisode(kid.id, 'note', `⚠️ ${turn.concern}`, lesson.topic);

  let ended = false;
  if (turn.lessonComplete) {
    await finalizeSession(session, kid);
    ended = true;
  } else {
    db.sessions.save(session);
  }
  return { turn, ended, sessionId };
}

function updateWorkingMemory(w: WorkingMemory, turn: TeacherTurn): void {
  w.lastEmotion = turn.emotion;
  const asked = ['choice', 'type', 'speak'].includes(turn.interaction.type);
  w.turnsSinceCheck = asked ? 0 : w.turnsSinceCheck + 1;
  w.beatIndex = Math.max(w.beatIndex, w.beatIndex + (asked ? 1 : 0));

  if (turn.memoryUpdates.length) {
    const ms = turn.memoryUpdates.map((u) => u.mastery);
    const min = Math.min(...ms);
    const avg = ms.reduce((a, b) => a + b, 0) / ms.length;
    w.momentum = min < 0.4 ? 'stuck' : avg > 0.7 ? 'flowing' : 'steady';
    for (const u of turn.memoryUpdates) {
      w.observed[u.topic] = {
        signal: u.mastery < 0.4 ? 'struggling' : u.mastery < 0.7 ? 'shaky' : 'got_it',
        note: u.note || ''
      };
    }
  }
  if (turn.assessment) {
    w.notes.push(turn.assessment);
    while (w.notes.length > 20) w.notes.shift();
  }
}

/** Wrap up: write the parent report, refresh the long-term profile, log episodes. */
async function finalizeSession(session: Session, kid: Kid): Promise<void> {
  session.status = 'ended';
  session.endedAt = new Date().toISOString();

  try {
    const brain = await getBrain();

    const report = await generateStructured(brain, ReportSchema, {
      system: reportPrompt(kid, session).system,
      messages: [{ role: 'user', content: reportPrompt(kid, session).user }],
      maxTokens: 1200,
      quality: 'deep'
    });
    session.report = report;

    const model = getOrInitLearner(kid.id);
    const sum = await generateStructured(brain, SummarySchema, {
      system: summaryPrompt(kid, model, session).system,
      messages: [{ role: 'user', content: summaryPrompt(kid, model, session).user }],
      maxTokens: 600,
      quality: 'deep'
    });
    updateNarrative(kid.id, sum.summary, sum.preferences);

    for (const h of report.highlights.slice(0, 3)) addEpisode(kid.id, 'highlight', h, session.topic);
    for (const n of report.needsWork.slice(0, 3)) addEpisode(kid.id, 'struggle', n, session.topic);
    if (report.mastered.length) addEpisode(kid.id, 'milestone', `Mastered: ${report.mastered.join(', ')}`, session.topic);
  } catch (err) {
    // A report failure must never lose the session; persist what we have.
    session.report = session.report || {
      summary: 'Lesson completed. (Report generation was unavailable.)',
      mastered: [],
      needsWork: [],
      highlights: [],
      nextSteps: '',
      concerns: [],
      score: 50
    };
  }

  db.sessions.save(session);
  db.lessons.setStatus(session.lessonId, 'complete');
}

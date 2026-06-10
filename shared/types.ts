/**
 * Shared type contract for Classai, imported by both the server and the client.
 *
 * Hierarchy: Learner(Kid) → Course ("a class") → Topic (syllabus unit) →
 * Lesson (generated) → Session (a live run). Cross-cutting: LearnerModel
 * (long-term memory), Episodes, Reports.
 *
 * The most important type is `TeacherTurn` — the structured object the AI brain
 * returns on every beat of a live lesson. It is the single interface between
 * "the AI" and "the character on screen": what to say, which face to make, what
 * to ask the kid, and what was learned about the kid.
 */

// ---------------------------------------------------------------------------
// Brain (LLM provider) connection
// ---------------------------------------------------------------------------

export type BrainVendor = 'anthropic' | 'openai' | 'local';

export type BrainAuthMethod =
  | 'api_key' // user pasted their own API key
  | 'oauth' // OpenAI "Sign in with ChatGPT" (PKCE)
  | 'local_login' // reuse the user's existing local Claude login
  | 'none'; // local model, no auth

export interface BrainProfile {
  id: string; // "anthropic:default", "openai:personal", ...
  vendor: BrainVendor;
  method: BrainAuthMethod;
  label: string;
  model: string;
  baseUrl?: string; // local / custom endpoints
  createdAt: string;
}

/** Safe-to-send view (no secrets ever leave the server). */
export interface BrainProfilePublic extends BrainProfile {
  connected: boolean;
}

export interface ModelOption {
  id: string;
  label: string;
  note?: string;
}

// ---------------------------------------------------------------------------
// Learners
// ---------------------------------------------------------------------------

export interface Kid {
  id: string;
  name: string;
  age: number; // designed for ages 12+
  gradeLevel: string; // free text, e.g. "7th grade"
  interests: string[]; // used to personalize examples (soccer, space, anime…)
  avatar: AvatarConfig;
  createdAt: string;
}

/** The on-screen character a kid learns with. */
export interface AvatarConfig {
  character: 'sage' | 'nova' | 'pip';
  hue: number; // 0..360 accent color
  voice: string; // TTS voice id (Kokoro voice or browser voice name)
  rate: number; // speech rate multiplier (accessibility)
}

// ---------------------------------------------------------------------------
// Courses, curriculum, topics
// ---------------------------------------------------------------------------

/** A "class" — one subject for one kid (e.g. "7th-Grade Math"). */
export interface Course {
  id: string;
  kidId: string;
  subject: string; // free text; mapped to a SubjectProfile by family
  subjectKey: SubjectKey; // resolved pedagogy family
  title: string;
  description: string;
  gradeLevel: string;
  createdAt: string;
}

export interface Curriculum {
  id: string;
  courseId: string;
  kidId: string;
  source: 'pasted' | 'described' | 'file';
  rawText: string; // what the parent provided
  createdAt: string;
}

/** A syllabus unit within a course. Mastery is tracked per topic. */
export interface Topic {
  id: string;
  courseId: string;
  kidId: string;
  title: string;
  summary: string;
  order: number;
  estMinutes: number;
  prerequisites: string[]; // titles of topics that should come first
}

// ---------------------------------------------------------------------------
// Subject-aware pedagogy
// ---------------------------------------------------------------------------

export type SubjectKey =
  | 'math'
  | 'science'
  | 'language_arts' // reading/writing in the kid's main language
  | 'world_language' // a foreign language
  | 'history' // history & social studies
  | 'general';

/** Tells the teacher how to teach a subject family. */
export interface SubjectProfile {
  key: SubjectKey;
  label: string;
  pedagogy: string; // injected into the teaching prompt
  preferredInteractions: InteractionType[]; // what kinds of checks fit this subject
  encourageSpeaking: boolean; // bias toward 'speak' interactions (languages)
}

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

export type LessonKind = 'lesson' | 'diagnostic' | 'review';

/** An anticipated wrong answer, the misconception behind it, and how to fix it. */
export interface WrongAnswer {
  answer: string;
  why: string; // the misconception / error behind this answer
  remedy: string; // the teaching move that corrects it
}

/** A pre-authored understanding check attached to a beat. */
export interface BeatCheck {
  question: string;
  expectedAnswer: string;
  wrongAnswers: WrongAnswer[];
}

/** One ordered teaching beat the brain drafts when generating a lesson. */
export interface LessonBeat {
  kind: 'hook' | 'explain' | 'example' | 'check' | 'practice' | 'recap';
  goal: string;
  note: string; // guidance to the teacher for this beat
  successCriteria: string; // observable evidence this beat landed
  check?: BeatCheck; // for check/practice beats
}

/** The designer's analysis of the topic, produced before the beats. */
export interface LessonAnalysis {
  keyConcepts: string[];
  misconceptions: string[]; // common wrong mental models for this topic
  hooks: string[]; // real-world angles tied to the learner's interests
  priorKnowledge: string[]; // what this lesson assumes the learner has
}

export interface Lesson {
  id: string;
  kidId: string;
  courseId: string;
  topicId: string;
  kind: LessonKind;
  subject: string;
  topic: string;
  title: string;
  objectives: string[];
  analysis?: LessonAnalysis;
  plan: LessonBeat[];
  difficulty: 'gentle' | 'standard' | 'challenge';
  status: 'ready' | 'in_progress' | 'complete';
  createdAt: string;
}

// ---------------------------------------------------------------------------
// The live teaching turn — contract between brain and character
// ---------------------------------------------------------------------------

export type Emotion =
  | 'neutral'
  | 'happy'
  | 'encouraging'
  | 'celebrating'
  | 'thinking'
  | 'curious'
  | 'gentle';

export type InteractionType = 'choice' | 'type' | 'speak' | 'continue' | 'none';

export interface Interaction {
  type: InteractionType;
  prompt: string;
  choices?: string[]; // for 'choice'
}

/** A single observation the brain made about the learner this turn. */
export interface MemoryUpdate {
  topic: string;
  mastery: number; // 0..1 grasp of `topic`
  note?: string;
  strength?: string;
  struggle?: string;
  misconception?: string; // a wrong mental model to correct later
  interest?: string; // an interest revealed, to personalize future lessons
}

/** How the teacher judged the learner's last answer. */
export type AnswerEval = 'correct' | 'partial' | 'incorrect' | 'na';

/** Structured object the brain returns on every beat of a lesson. */
export interface TeacherTurn {
  speech: string; // spoken aloud (short, kid-friendly); also shown as captions
  emotion: Emotion;
  interaction: Interaction;
  assessment: string; // private read on how it's going (not spoken)
  answerEval: AnswerEval; // judgement of the learner's last reply ('na' if none)
  beatComplete: boolean; // true when the current beat's success criteria are met
  memoryUpdates: MemoryUpdate[];
  concern?: string; // set if the kid said something a parent should see
  lessonComplete: boolean;
}

// ---------------------------------------------------------------------------
// Memory
// ---------------------------------------------------------------------------

export interface MasteryEntry {
  mastery: number; // 0..1
  confidence: number; // 0..1 — how sure we are, grows with evidence
  note: string;
  topicId?: string;
  updatedAt: string;
}

/** LONG-TERM memory: the durable, cross-lesson model of one learner. */
export interface LearnerModel {
  kidId: string;
  summary: string; // narrative profile the tutor maintains
  preferences: string; // how this kid likes to learn
  strengths: string[];
  struggles: string[];
  misconceptions: string[]; // wrong mental models to watch for & correct
  interests: string[]; // merged from setup + revealed in lessons
  topicMastery: Record<string, MasteryEntry>; // keyed by topic title
  updatedAt: string;
}

export type Momentum = 'flowing' | 'steady' | 'stuck';

/** SHORT-TERM / working memory: scoped to one live lesson only. */
export interface WorkingMemory {
  focus: string; // current micro-goal
  momentum: Momentum; // the tutor's live read
  lastEmotion: Emotion;
  beatIndex: number; // where we are in the lesson plan
  turnsSinceCheck: number; // teacher turns since we last checked understanding
  teacherTurns: number; // total teacher turns this session
  struggleStreak: number; // consecutive incorrect/struggling answers
  checksPassed: number; // answers judged correct
  checksTotal: number; // answers judged (correct+partial+incorrect)
  notes: string[]; // running scratch notes for this lesson
  observed: Record<string, { signal: 'got_it' | 'shaky' | 'struggling'; note: string }>;
}

/** Where the live lesson currently is, returned with each turn. */
export interface BeatPosition {
  index: number; // 0-based current beat
  total: number;
  kind: LessonBeat['kind'] | 'done';
}

export interface MemoryEpisode {
  id: string;
  kidId: string;
  kind: 'highlight' | 'struggle' | 'milestone' | 'note';
  text: string;
  topic?: string;
  createdAt: string;
}

export type TranscriptRole = 'teacher' | 'kid';

export interface TranscriptEntry {
  role: TranscriptRole;
  text: string;
  emotion?: Emotion;
  interaction?: Interaction;
  ts: string;
}

export interface LessonReport {
  summary: string; // parent-facing recap
  mastered: string[];
  needsWork: string[];
  highlights: string[];
  nextSteps: string;
  concerns: string[]; // anything the parent should know about
  score: number; // 0..100 engagement/understanding for the lesson
}

export interface Session {
  id: string;
  kidId: string;
  courseId: string;
  lessonId: string;
  subject: string;
  topic: string;
  status: 'active' | 'ended';
  startedAt: string;
  endedAt?: string;
  transcript: TranscriptEntry[];
  working: WorkingMemory;
  report?: LessonReport;
}

// ---------------------------------------------------------------------------
// Progress (rollups for the parent dashboard) & recommendations
// ---------------------------------------------------------------------------

export interface TopicProgress {
  topicId: string;
  title: string;
  mastery: number; // 0..1 (0 if untouched)
  confidence: number;
  lastTouched?: string;
  due: boolean; // flagged for spaced review
}

export interface CourseProgress {
  course: Course;
  topics: TopicProgress[];
  completion: number; // 0..1 share of topics at/above mastery threshold
}

export interface Recommendation {
  reason: 'next_topic' | 'spaced_review' | 'diagnostic' | 'continue';
  courseId: string;
  topicId: string;
  topicTitle: string;
  note: string;
}

// ---------------------------------------------------------------------------
// API payloads
// ---------------------------------------------------------------------------

/** A kid's answer submitted back to the teaching loop. */
export interface KidResponse {
  text: string;
  via: 'choice' | 'type' | 'speak' | 'continue';
}

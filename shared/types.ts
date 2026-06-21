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

// ---- Weekly schedule ------------------------------------------------------
// A parent-built weekly plan: which classes a kid does on each weekday, in
// order, with an optional time. Entries are course-level — the kid "continues"
// the course and the recommendation engine picks the next topic.
export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export const WEEKDAYS: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export interface ScheduleEntry {
  id: string;
  courseId: string;
  time?: string; // optional "HH:MM" (24h); undefined = no fixed time
  order: number; // position within the day
}

export interface WeeklySchedule {
  kidId: string;
  days: Record<Weekday, ScheduleEntry[]>; // each day sorted by time then order
  updatedAt: string;
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
  recommendedBlocks: BlockType[]; // tool-belt blocks that fit this subject well
  encourageSpeaking: boolean; // bias toward 'speak' blocks (languages)
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

/** A visual the designer plans for an explain/example beat, realized at teach time. */
export interface BeatVisual {
  kind: string; // a block type, e.g. 'whiteboard' | 'slideshow' | 'steps' | 'video' | 'image' | 'emojiViz' | 'numberLine' | 'table' | 'custom'
  brief: string; // what it should show, concretely
}

/** One ordered teaching beat the brain drafts when generating a lesson. */
export interface LessonBeat {
  kind: 'hook' | 'explain' | 'example' | 'check' | 'practice' | 'recap';
  goal: string;
  note: string; // guidance to the teacher for this beat
  successCriteria: string; // observable evidence this beat landed
  visual?: BeatVisual; // for hook/explain/example: the planned visual to teach with
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

// ---------------------------------------------------------------------------
// The lesson UI "tool belt" — the closed set of interactive/visual elements the
// tutor composes lessons from. The brain picks a block type per turn and fills
// its props; the client renders the matching polished component. Interactive
// blocks carry their own answer key so they can give instant animated feedback
// (e.g. nudge a wrong choice to the right answer) before reporting the result.
// ---------------------------------------------------------------------------

export type BlockType =
  // display / teaching
  | 'richText' // formatted explanation (bold, lists)
  | 'steps' // a worked solution revealed step by step
  | 'keyTerm' // a vocabulary card (term + definition + example)
  | 'numberLine' // a labeled number line (math)
  | 'table' // a small data table
  | 'emojiViz' // a big emoji / row of emojis as an illustration
  | 'image' // an image by URL (diagram, photo, map)
  | 'video' // an embedded teaching video (YouTube/Vimeo)
  | 'slideshow' // an interactive multi-slide explainer ("next ▸")
  | 'flashcards' // flippable cards (tap to reveal the back)
  | 'whiteboard' // a board the tutor draws on (lines, arrows, shapes, labels)
  | 'custom' // an AI-composed element built from safe UI primitives (see CustomNode)
  // interactive / checks
  | 'multipleChoice' // pick one; wrong answer animates toward the right one
  | 'multiSelect' // pick all that apply
  | 'trueFalse' // true/false
  | 'fillBlank' // complete a sentence (optional word bank)
  | 'matchPairs' // match left items to right items
  | 'ordering' // arrange items into the correct order
  | 'categorize' // sort items into buckets
  | 'numberEntry' // type a numeric answer
  | 'shortText' // open written answer (tutor judges)
  | 'speak'; // say it aloud (language practice)

export interface RichTextBlock { type: 'richText'; markdown: string; }
export interface StepsBlock { type: 'steps'; title?: string; steps: string[]; }
export interface KeyTermBlock { type: 'keyTerm'; term: string; definition: string; example?: string; }
export interface NumberLineBlock { type: 'numberLine'; min: number; max: number; step?: number; marks?: { value: number; label?: string }[]; highlight?: number; }
export interface TableBlock { type: 'table'; headers: string[]; rows: string[][]; caption?: string; }
export interface EmojiVizBlock { type: 'emojiViz'; emojis: string; caption?: string; }
export interface ImageBlock { type: 'image'; src: string; alt?: string; caption?: string; }
export interface VideoBlock { type: 'video'; url?: string; query?: string; title?: string; caption?: string; }
export interface SlideshowBlock {
  type: 'slideshow';
  title?: string;
  slides: { title?: string; body?: string; emoji?: string; imageUrl?: string }[];
}
export interface FlashcardsBlock { type: 'flashcards'; cards: { front: string; back: string }[]; }

/**
 * A whiteboard the tutor draws on. Elements live on a 100 (wide) × 62 (tall)
 * coordinate canvas (0,0 = top-left). With `animate`, elements are drawn in one
 * by one (lines/paths "ink in"), so the character appears to sketch as it talks.
 */
export type DrawColor = 'ink' | 'accent' | 'red' | 'green' | 'blue' | 'orange' | 'purple';

export type WhiteboardElement =
  | { k: 'line'; x1: number; y1: number; x2: number; y2: number; color?: DrawColor; width?: number; arrow?: boolean; dashed?: boolean }
  | { k: 'rect'; x: number; y: number; w: number; h: number; color?: DrawColor; fill?: boolean; label?: string }
  | { k: 'circle'; x: number; y: number; r: number; color?: DrawColor; fill?: boolean; label?: string }
  | { k: 'path'; points: { x: number; y: number }[]; color?: DrawColor; width?: number; closed?: boolean } // polyline / freehand
  | { k: 'text'; x: number; y: number; value: string; size?: number; color?: DrawColor; bold?: boolean }
  | { k: 'dot'; x: number; y: number; color?: DrawColor; label?: string };

export interface WhiteboardBlock {
  type: 'whiteboard';
  title?: string;
  elements: WhiteboardElement[];
  animate?: boolean; // draw elements in sequence
}

/**
 * A node in the AI-composed "custom" block — a small, SAFE declarative UI tree.
 * The AI builds new lesson elements ("click me", reveals, mini-presentations,
 * illustrations, layouts) by composing these primitives only. There is no raw
 * HTML/JS: the renderer interprets this tree using the app's design system, so
 * custom tools always match the UI guidance and can't run arbitrary code.
 */
export type NodeAnim = 'none' | 'pop' | 'float' | 'spin' | 'pulse' | 'bounce' | 'fade';
export type NodeColor = 'ink' | 'muted' | 'accent' | 'good' | 'bad';

export type CustomNode =
  // layout
  | { t: 'col' | 'row' | 'card' | 'grid'; children: CustomNode[]; cols?: number; anim?: NodeAnim }
  // content
  | { t: 'text'; value: string; size?: 'sm' | 'md' | 'lg' | 'xl'; bold?: boolean; color?: NodeColor; align?: 'left' | 'center'; anim?: NodeAnim }
  | { t: 'emoji'; value: string; size?: 'md' | 'lg' | 'xl'; anim?: NodeAnim }
  | { t: 'image'; src: string; alt?: string; anim?: NodeAnim }
  | { t: 'badge'; value: string; color?: NodeColor }
  | { t: 'divider' }
  | { t: 'spacer' }
  // interactive (self-contained; no cross-node wiring)
  | { t: 'reveal'; label: string; children: CustomNode[] } // a "click me" card that expands
  | { t: 'steps'; slides: CustomNode[][] } // an interactive presentation (next/prev)
  | { t: 'button'; label: string; action: 'complete' | 'continue' | 'speak'; say?: string; correct?: boolean }
  | { t: 'choice'; prompt?: string; options: string[]; correct: number };

export interface CustomBlock {
  type: 'custom';
  title?: string;
  root: CustomNode;
  interactive?: boolean; // true if this block is a check the kid must complete (via a button/choice)
}

export interface MultipleChoiceBlock { type: 'multipleChoice'; prompt: string; options: string[]; correct: number; explain?: string; }
export interface MultiSelectBlock { type: 'multiSelect'; prompt: string; options: string[]; correct: number[]; explain?: string; }
export interface TrueFalseBlock { type: 'trueFalse'; statement: string; correct: boolean; explain?: string; }
export interface FillBlankBlock { type: 'fillBlank'; text: string; answer: string; wordBank?: string[]; } // `text` uses ___ for the blank
export interface MatchPairsBlock { type: 'matchPairs'; prompt: string; pairs: { left: string; right: string }[]; }
export interface OrderingBlock { type: 'ordering'; prompt: string; items: string[]; } // items given in CORRECT order
export interface CategorizeBlock { type: 'categorize'; prompt: string; buckets: string[]; items: { text: string; bucket: string }[]; }
export interface NumberEntryBlock { type: 'numberEntry'; prompt: string; answer: number; tolerance?: number; unit?: string; }
export interface ShortTextBlock { type: 'shortText'; prompt: string; sample?: string; }
export interface SpeakBlock { type: 'speak'; prompt: string; target?: string; }

export type LessonBlock =
  | RichTextBlock | StepsBlock | KeyTermBlock | NumberLineBlock | TableBlock | EmojiVizBlock
  | ImageBlock | VideoBlock | SlideshowBlock | FlashcardsBlock | WhiteboardBlock | CustomBlock
  | MultipleChoiceBlock | MultiSelectBlock | TrueFalseBlock | FillBlankBlock | MatchPairsBlock
  | OrderingBlock | CategorizeBlock | NumberEntryBlock | ShortTextBlock | SpeakBlock;

export const INTERACTIVE_BLOCKS: BlockType[] = [
  'multipleChoice', 'multiSelect', 'trueFalse', 'fillBlank', 'matchPairs',
  'ordering', 'categorize', 'numberEntry', 'shortText', 'speak'
];
export function isInteractiveBlock(t?: BlockType): boolean {
  return !!t && INTERACTIVE_BLOCKS.includes(t);
}
/** Does a custom node tree contain a control that can finish the block? */
export function customHasCompleter(node: CustomNode): boolean {
  if (node.t === 'choice') return true;
  if (node.t === 'button') return node.action === 'complete' || node.action === 'continue';
  if (node.t === 'reveal' || node.t === 'col' || node.t === 'row' || node.t === 'card' || node.t === 'grid') {
    return (node.children || []).some(customHasCompleter);
  }
  if (node.t === 'steps') return node.slides.some((s) => s.some(customHasCompleter));
  return false;
}

/** Whether a block requires the learner to finish it before the lesson advances. */
export function blockIsInteractive(block?: LessonBlock): boolean {
  if (!block) return false;
  if (block.type === 'custom') return block.interactive === true && customHasCompleter(block.root);
  return isInteractiveBlock(block.type);
}

/** Result the client reports back after the kid finishes an interactive block. */
export interface BlockResult {
  text: string; // human-readable summary of what the kid did
  correct?: boolean; // client-side judgement when the block has an answer key
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
  block?: LessonBlock; // back-compat: the first block this turn (blocks[0])
  blocks?: LessonBlock[]; // the UI element(s) this turn — e.g. a display block to explain + an interactive block to check
  assessment: string; // private read on how it's going (not spoken)
  answerEval: AnswerEval; // judgement of the learner's last reply ('na' if none)
  awaitResponse?: boolean; // true when this turn asks an open question (no interactive block) and waits for a spoken/typed reply; false/absent = just explaining, learner taps Continue
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
  // Set when the last turn's block failed validation and was dropped — the
  // next directive tells the model so it can correct instead of retry-looping.
  lastBlockError?: string;
  // Display-block loop detector: counts consecutive turns that re-sent the same
  // look-only block type with no answer judged and no beat progress (the model
  // asking the learner to act on a block they can't touch). The director uses
  // it to inject a change-approach directive.
  lastBlockType?: string;
  sameDisplayBlockStreak?: number;
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
  block?: LessonBlock;
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
  via: 'block' | 'continue';
  correct?: boolean; // client-side correctness when the block had an answer key
}

// ===========================================================================
// Prompt inspector (Parent area) — transparency into what the AI is told
// ===========================================================================

/** One recorded AI call, so a parent can see exactly what was sent and returned. */
export interface PromptLogEntry {
  id: string;
  ts: string; // ISO timestamp
  label: string; // what this call was for, e.g. 'Teaching turn', 'Syllabus'
  vendor: string;
  model: string;
  system: string; // the system prompt actually sent
  messages: { role: 'user' | 'assistant'; content: string }[];
  response?: string; // the model's reply (omitted/empty on error)
  ms: number; // round-trip duration
  ok: boolean;
  error?: string;
}

/** A static prompt template the app uses, rendered with sample data for review. */
export interface PromptTemplate {
  key: string;
  title: string;
  description: string;
  system: string;
  user?: string; // sample first user message, where the call has one
}

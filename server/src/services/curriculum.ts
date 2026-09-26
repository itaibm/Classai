/**
 * Curriculum library — loads the authored `classai-lesson/1` files under
 * `curriculum/` (plus AI-generated drafts under `${DATA_DIR}/generated/`) and
 * makes them browsable and playable.
 *
 * Disk is the source of truth: the tree is re-scanned on request (readdir +
 * stat) and a file is re-read + re-validated whenever its mtime changes, so
 * editing a JSON file on disk flows straight through without any re-import step. Parsing is tolerant in
 * the same spirit as `ai/schemas.ts` — a malformed file is skipped with a logged
 * warning and never crashes the server; a block our schema doesn't recognise is
 * kept as-is rather than dropping the whole lesson.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { z } from 'zod';
import type {
  LessonFull,
  LessonBlock,
  SubjectKey,
  CurriculumYear,
  CurriculumSubject,
  CurriculumUnit,
  CurriculumLessonSummary
} from '../../../shared/types.ts';
import { CURRICULUM_DIR, GENERATED_DIR } from '../config.ts';
import { BlockSchema } from '../ai/blocks.ts';

// ---- subject-key normalization (one place; PRD open question #1) -----------
// Files use `subject: "math"`; folders use `maths`. History and geography live
// in separate folders but share the `history` pedagogy family. Everything the
// app has no dedicated pedagogy for maps to `general` (still fully playable).
const SUBJECT_KEY_MAP: Record<string, SubjectKey> = {
  math: 'math',
  maths: 'math',
  science: 'science',
  english: 'language_arts',
  language_arts: 'language_arts',
  reading: 'language_arts',
  writing: 'language_arts',
  languages: 'world_language',
  world_language: 'world_language',
  history: 'history',
  geography: 'history',
  'history-geography': 'history',
  'social-studies': 'history'
};

/** Map a curriculum subject (file value or folder name) to a pedagogy family. */
export function curriculumSubjectKey(subject: string): SubjectKey {
  return SUBJECT_KEY_MAP[subject.trim().toLowerCase()] ?? 'general';
}

// ---- tolerant zod schema for a `classai-lesson/1` file --------------------

/** Coerce known authoring variants to the canonical block shape (files unchanged
 *  on disk; this only normalizes what the app plays). */
function normalizeBlock(b: unknown): unknown {
  if (!b || typeof b !== 'object') return b;
  const raw = b as Record<string, unknown>;
  // Some authored `steps` blocks use `items` instead of the canonical `steps`.
  if (raw.type === 'steps' && Array.isArray(raw.items) && !Array.isArray(raw.steps)) {
    return { ...raw, steps: raw.items };
  }
  return b;
}

/** Non-null while `readLessonFile` parses a file: collects "kept an unknown
 *  block" notes so each file logs one warning instead of one per block. */
let blockWarnings: string[] | null = null;

/** Validate a block with BlockSchema, but keep unknown-but-present blocks so a
 *  single stricter-than-the-file field never discards authored content. */
const tolerantBlock: z.ZodType<LessonBlock, z.ZodTypeDef, unknown> = z.unknown().transform((b) => {
  const normalized = normalizeBlock(b);
  const parsed = BlockSchema.safeParse(normalized);
  if (parsed.success) return parsed.data as unknown as LessonBlock;
  const snippet = JSON.stringify(normalized)?.slice(0, 160) ?? String(normalized);
  // While a file is being loaded, collect these and log once per file.
  if (blockWarnings) blockWarnings.push(snippet);
  else console.warn('[curriculum] keeping block that did not match BlockSchema:', snippet);
  return normalized as LessonBlock;
});

const wrongAnswer = z.object({
  answer: z.string(),
  why: z.string().default(''),
  remedy: z.string().default('')
});

const level = z.union([z.literal(1), z.literal(2), z.literal(3)]).catch(2);

const beat = z.object({
  kind: z.enum(['hook', 'explain', 'example', 'check', 'practice', 'recap']).catch('explain'),
  delivery: z.enum(['human', 'video', 'ai']).default('ai').catch('ai'),
  timeboxMin: z.tuple([z.number(), z.number()]).optional().catch(undefined),
  goal: z.string().default(''),
  note: z.string().default(''),
  successCriteria: z.string().default(''),
  visual: z.object({ kind: z.string().default(''), brief: z.string().default('') }).optional().catch(undefined),
  script: z.object({ say: z.string().default(''), adaptHints: z.string().optional() }).optional(),
  blocks: z.array(tolerantBlock).optional(),
  check: z
    .object({
      question: z.string().default(''),
      expectedAnswer: z.string().default(''),
      wrongAnswers: z.array(wrongAnswer).default([])
    })
    .optional(),
  humanHandoff: z.object({ setup: z.string().default(''), cueToResume: z.string().default('') }).optional(),
  stuckProtocol: z.array(z.string()).optional()
});

const practiceItem = z.object({
  id: z.string(),
  skill: z.string().default('general'),
  level,
  block: tolerantBlock,
  expectedAnswer: z.string().default(''),
  wrongAnswers: z.array(wrongAnswer).default([]),
  hints: z.array(z.string()).default([]),
  reteach: z.object({ say: z.string().default(''), block: tolerantBlock.optional() }).default({ say: '' }),
  interestSlots: z.array(z.string()).optional()
});

const adaptivity = z
  .object({
    startLevel: level,
    levelUp: z.string().default(''),
    levelDown: z.string().default(''),
    masterySignal: z.string().default(''),
    struggleProtocol: z.array(z.string()).default([]),
    personalization: z.string().default(''),
    endOnSuccess: z.string().default('')
  })
  .default({
    startLevel: 2,
    levelUp: '',
    levelDown: '',
    masterySignal: '',
    struggleProtocol: [],
    personalization: '',
    endOnSuccess: ''
  });

const curatedVideo = z.object({
  role: z.enum(['hook', 'teach', 'reinforce']).catch('reinforce'),
  url: z.string().optional(),
  title: z.string().optional(),
  channel: z.string().optional(),
  searchTerm: z.string().optional(),
  verifiedAt: z.string().optional(),
  watchTask: z.string().default(''),
  afterCheck: z.object({ question: z.string(), expectedAnswer: z.string().default('') }).optional()
});

/** The on-disk shape. Lesson-required plumbing (classId, revision…) is added by
 *  `toLessonFull` at read time — it isn't stored in the file. */
export const DiskLessonSchema = z.object({
  format: z.literal('classai-lesson/1'),
  id: z.string(),
  year: z.number().int().default(0),
  subject: z.string().default('general'),
  subjectLabel: z.string().default(''),
  unit: z
    .object({ number: z.number().int().default(1), title: z.string().default(''), essentialQuestion: z.string().default('') })
    .default({ number: 1, title: '', essentialQuestion: '' }),
  lessonNumber: z.number().int().default(1),
  kind: z.enum(['lesson', 'diagnostic', 'review']).catch('lesson'),
  topic: z.string().default(''),
  title: z.string(),
  durationMin: z.number().default(20),
  objectives: z.array(z.string()).default([]),
  difficulty: z.enum(['gentle', 'standard', 'challenge']).catch('standard'),
  status: z.enum(['draft', 'approved', 'archived']).catch('approved'),
  // Provenance for AI-generated lessons (absent on authored files).
  generatedAt: z.string().optional().catch(undefined),
  generatedBy: z.string().optional().catch(undefined),
  reviewedAt: z.string().optional().catch(undefined),
  vocabulary: z
    .array(z.object({ term: z.string(), definition: z.string().default(''), example: z.string().optional() }))
    .default([]),
  emphasize: z.array(z.string()).default([]),
  analysis: z
    .object({
      keyConcepts: z.array(z.string()).default([]),
      misconceptions: z.array(z.string()).default([]),
      hooks: z.array(z.string()).default([]),
      priorKnowledge: z.array(z.string()).default([])
    })
    .optional(),
  materials: z
    .object({ human: z.array(z.string()).default([]), digital: z.array(z.string()).default([]) })
    .default({ human: [], digital: [] }),
  delivery: z
    .object({
      mode: z.enum(['fully_ai', 'human_intro_then_ai', 'video_then_ai', 'human_lesson']).catch('fully_ai'),
      humanNotes: z.string().default('')
    })
    .default({ mode: 'fully_ai', humanNotes: '' }),
  video: curatedVideo.optional(),
  plan: z.array(beat).min(1),
  practiceBank: z.array(practiceItem).default([]),
  adaptivity,
  differentiation: z
    .object({ support: z.string().default(''), stretch: z.string().default('') })
    .default({ support: '', stretch: '' }),
  extension: z.string().default(''),
  assessmentEvidence: z.string().default(''),
  revisitLater: z.string().default('')
});

type DiskLesson = z.infer<typeof DiskLessonSchema>;

function contentHash(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);
}

/** Public: turn a validated disk-lesson object into a runtime LessonFull
 *  (hash derived from its JSON). Used by the generator when it can't re-read
 *  from disk. */
export function diskToLessonFull(disk: DiskLesson): LessonFull {
  return toLessonFull(disk, contentHash(JSON.stringify(disk)));
}

/** Add the Lesson-required plumbing fields around a validated disk lesson. */
function toLessonFull(disk: DiskLesson, hash: string): LessonFull {
  return {
    // Lesson-required fields (synthetic; classId/topicId filled at session start)
    classId: '',
    familyId: disk.id,
    revision: 1,
    topicId: disk.id,
    createdAt: '',
    updatedAt: '',
    // everything authored on disk
    ...disk,
    analysis: disk.analysis,
    curriculumId: disk.id,
    contentHash: hash
  } as unknown as LessonFull;
}

// ---- filesystem scan + in-memory index -------------------------------------
//
// Two roots are indexed: the authored curriculum (`curriculum/`, git-tracked)
// and AI-generated drafts (`${DATA_DIR}/generated/`, git-ignored). Both use the
// same `year-N/<subject>/lessons/*.json` layout. Authored always wins: a
// generated file is only served when no authored file carries the same id.
//
// Every lookup re-walks the directories (readdir + stat only — cheap), but a
// file is re-read and re-validated only when its mtime/size changed, so edits
// on disk still flow straight through without a restart.

/** Where a lesson file came from. */
export type LessonSource = 'authored' | 'generated';

interface LessonFileRef {
  filePath: string;
  year: number;
  subject: string; // folder name (e.g. "maths")
  source: LessonSource;
}

/** Every indexed, valid lesson with the file it came from. */
export interface IndexedLesson extends LessonFileRef {
  lesson: LessonFull;
}

function subdirs(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
}

/** Walk `<root>/year-N/<subject>/lessons/*.json` and list the files (no reads). */
function listLessonFilesIn(root: string, source: LessonSource): LessonFileRef[] {
  const out: LessonFileRef[] = [];
  for (const yearDir of subdirs(root).filter((d) => /^year-\d+$/i.test(d)).sort()) {
    const year = Number(yearDir.replace(/[^\d]/g, '')) || 0;
    const yearPath = path.join(root, yearDir);
    for (const subject of subdirs(yearPath).sort()) {
      const lessonsDir = path.join(yearPath, subject, 'lessons');
      let files: string[];
      try {
        files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith('.json')).sort();
      } catch {
        continue; // subject without a lessons/ folder yet
      }
      for (const file of files) out.push({ filePath: path.join(lessonsDir, file), year, subject, source });
    }
  }
  return out;
}

/** Authored files first, then generated — the order encodes precedence. */
function listLessonFiles(): LessonFileRef[] {
  return [...listLessonFilesIn(CURRICULUM_DIR, 'authored'), ...listLessonFilesIn(GENERATED_DIR, 'generated')];
}

/** Read + validate one file. Returns null (with a warning) if it's malformed. */
function readLessonFile(filePath: string): { lesson: LessonFull; raw: string } | null {
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    console.warn(`[curriculum] skipping ${path.basename(filePath)} — invalid JSON: ${(e as Error).message}`);
    return null;
  }
  blockWarnings = [];
  let parsed: ReturnType<typeof DiskLessonSchema.safeParse>;
  try {
    parsed = DiskLessonSchema.safeParse(json);
  } finally {
    const kept = blockWarnings;
    blockWarnings = null;
    if (kept.length) {
      console.warn(
        `[curriculum] ${path.basename(filePath)}: keeping ${kept.length} block(s) that did not match BlockSchema, e.g. ${kept[0]}`
      );
    }
  }
  if (!parsed.success) {
    console.warn(`[curriculum] skipping ${path.basename(filePath)} — schema: ${parsed.error.issues.slice(0, 3).map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
    return null;
  }
  return { lesson: toLessonFull(parsed.data, contentHash(raw)), raw };
}

interface CacheEntry {
  mtimeMs: number;
  size: number;
  lesson: LessonFull | null; // null = malformed (warned once until it changes)
}
const fileCache = new Map<string, CacheEntry>();
let parseCount = 0;

/** Parsed lesson for a file, re-parsed only when its mtime or size changed. */
function loadCached(filePath: string): LessonFull | null {
  let st: fs.Stats;
  try {
    st = fs.statSync(filePath);
  } catch {
    fileCache.delete(filePath);
    return null;
  }
  const hit = fileCache.get(filePath);
  if (hit && hit.mtimeMs === st.mtimeMs && hit.size === st.size) return hit.lesson;
  parseCount++;
  const lesson = readLessonFile(filePath)?.lesson ?? null;
  fileCache.set(filePath, { mtimeMs: st.mtimeMs, size: st.size, lesson });
  return lesson;
}

interface LessonIndex {
  /** Winning entry per id (authored beats generated). */
  byId: Map<string, IndexedLesson>;
  /** Winning entries in scan order. */
  all: IndexedLesson[];
  /** Every valid generated file, including ones shadowed by an authored id. */
  generated: IndexedLesson[];
}

function buildIndex(): LessonIndex {
  const byId = new Map<string, IndexedLesson>();
  const all: IndexedLesson[] = [];
  const generated: IndexedLesson[] = [];
  const seen = new Set<string>();
  for (const file of listLessonFiles()) {
    seen.add(file.filePath);
    const lesson = loadCached(file.filePath);
    if (!lesson) continue;
    const entry: IndexedLesson = { ...file, lesson };
    if (file.source === 'generated') generated.push(entry);
    if (byId.has(lesson.id)) continue; // authored listed first → it wins
    byId.set(lesson.id, entry);
    all.push(entry);
  }
  for (const key of [...fileCache.keys()]) if (!seen.has(key)) fileCache.delete(key); // file removed
  return { byId, all, generated };
}

/** Callers may mutate what they get (routes set classId/id), so never hand out
 *  the cached object itself. */
function fresh(lesson: LessonFull): LessonFull {
  return structuredClone(lesson);
}

// ---- public API ------------------------------------------------------------

/** Build the browsable year → subject → unit → lesson tree. */
export function curriculumTree(): CurriculumYear[] {
  const byYear = new Map<number, Map<string, CurriculumSubject>>();
  for (const file of buildIndex().all) {
    const l = file.lesson;
    const summary: CurriculumLessonSummary = {
      id: l.id,
      lessonNumber: l.lessonNumber,
      title: l.title,
      topic: l.topic,
      durationMin: l.durationMin,
      deliveryMode: l.delivery.mode,
      kind: l.kind,
      status: file.source === 'generated' ? 'generated' : l.status,
      valid: true,
      contentHash: l.contentHash || ''
    };
    let subjects = byYear.get(file.year);
    if (!subjects) byYear.set(file.year, (subjects = new Map()));
    let subject = subjects.get(file.subject);
    if (!subject) {
      subjects.set(file.subject, (subject = {
        subject: file.subject,
        subjectKey: curriculumSubjectKey(l.subject || file.subject),
        subjectLabel: l.subjectLabel || file.subject,
        units: []
      }));
    }
    let unit = subject.units.find((u) => u.number === l.unit.number && u.title === l.unit.title);
    if (!unit) {
      unit = { number: l.unit.number, title: l.unit.title, essentialQuestion: l.unit.essentialQuestion, lessons: [] };
      subject.units.push(unit);
    }
    unit.lessons.push(summary);
  }

  const years: CurriculumYear[] = [...byYear.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([year, subjects]) => ({
      year,
      subjects: [...subjects.values()]
        .sort((a, b) => a.subject.localeCompare(b.subject))
        .map((s) => ({
          ...s,
          units: s.units
            .sort((a, b) => a.number - b.number)
            .map((u) => ({ ...u, lessons: u.lessons.sort((a, b) => a.lessonNumber - b.lessonNumber) }))
        }))
    }));
  return years;
}

/** A curriculum lesson by id — authored first, else a generated draft. Null if
 *  gone or now malformed. Changed files are re-validated (mtime check), so this
 *  is still the source-of-truth read used at session start. */
export function getCurriculumLesson(id: string): LessonFull | null {
  const hit = buildIndex().byId.get(id);
  return hit ? fresh(hit.lesson) : null;
}

/** Where a lesson id is served from ('authored' | 'generated'), or null. */
export function curriculumLessonSource(id: string): LessonSource | null {
  return buildIndex().byId.get(id)?.source ?? null;
}

/** How many valid lessons the library currently holds (for startup logging). */
export function curriculumCount(): number {
  return buildIndex().all.length;
}

/** Every playable lesson (authored, plus generated drafts whose id no authored
 *  file claims) with its folder year+subject, for the catalog merge. The
 *  lessons are shared cached objects — treat them as read-only. */
export function scanAuthoredLessons(): { lesson: LessonFull; year: number; subject: string; source: LessonSource }[] {
  return buildIndex().all.map(({ lesson, year, subject, source }) => ({ lesson, year, subject, source }));
}

/** Every valid generated draft on disk (for parent review). `shadowed` = an
 *  authored lesson with the same id exists, so this file is never played. */
export function listGeneratedLessonFiles(): (IndexedLesson & { shadowed: boolean })[] {
  const index = buildIndex();
  return index.generated.map((g) => ({ ...g, lesson: fresh(g.lesson), shadowed: index.byId.get(g.lesson.id)?.filePath !== g.filePath }));
}

/** The generated file for a lesson id (the one that would play, else any), or null. */
export function generatedLessonFile(id: string): IndexedLesson | null {
  const index = buildIndex();
  const winning = index.byId.get(id);
  if (winning?.source === 'generated') return winning;
  return index.generated.find((g) => g.lesson.id === id) ?? null;
}

/** Directory a generated lesson for this year+subject is written to. */
export function generatedLessonsDir(year: number, subject: string): string {
  return path.join(GENERATED_DIR, `year-${year}`, subject, 'lessons');
}

/** Test/diagnostic hook: how many file parses have happened, and cache size. */
export function _curriculumCacheStats(): { parses: number; cached: number } {
  return { parses: parseCount, cached: fileCache.size };
}

export { CURRICULUM_DIR } from '../config.ts';

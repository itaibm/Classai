/**
 * Curriculum library — loads the authored `classai-lesson/1` files under
 * `curriculum/` and makes them browsable and playable.
 *
 * Disk is the source of truth: the tree is scanned fresh on request and a
 * lesson is re-read + re-validated on session start, so editing a JSON file on
 * disk flows straight through without any re-import step. Parsing is tolerant in
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
import { CURRICULUM_DIR } from '../config.ts';
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

/** Validate a block with BlockSchema, but keep unknown-but-present blocks so a
 *  single stricter-than-the-file field never discards authored content. */
const tolerantBlock: z.ZodType<LessonBlock, z.ZodTypeDef, unknown> = z.unknown().transform((b) => {
  const normalized = normalizeBlock(b);
  const parsed = BlockSchema.safeParse(normalized);
  if (parsed.success) return parsed.data as unknown as LessonBlock;
  console.warn('[curriculum] keeping block that did not match BlockSchema:', JSON.stringify(normalized)?.slice(0, 160));
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

// ---- filesystem scan -------------------------------------------------------

interface IndexedFile {
  id: string;
  filePath: string;
  year: number;
  subject: string; // folder name (e.g. "maths")
}

/** Walk every `curriculum/year-N/<subject>/lessons/` JSON and list the files. */
function listLessonFiles(): IndexedFile[] {
  const out: IndexedFile[] = [];
  let yearDirs: string[];
  try {
    yearDirs = fs.readdirSync(CURRICULUM_DIR).filter((d) => /^year-\d+$/i.test(d));
  } catch {
    return out; // no curriculum folder → empty library, never a crash
  }
  for (const yearDir of yearDirs) {
    const year = Number(yearDir.replace(/[^\d]/g, '')) || 0;
    const yearPath = path.join(CURRICULUM_DIR, yearDir);
    let subjects: string[];
    try {
      subjects = fs.readdirSync(yearPath).filter((s) => fs.statSync(path.join(yearPath, s)).isDirectory());
    } catch {
      continue;
    }
    for (const subject of subjects) {
      const lessonsDir = path.join(yearPath, subject, 'lessons');
      let files: string[];
      try {
        files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith('.json'));
      } catch {
        continue; // subject without a lessons/ folder yet
      }
      for (const file of files) {
        out.push({ id: '', filePath: path.join(lessonsDir, file), year, subject });
      }
    }
  }
  return out;
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
  const parsed = DiskLessonSchema.safeParse(json);
  if (!parsed.success) {
    console.warn(`[curriculum] skipping ${path.basename(filePath)} — schema: ${parsed.error.issues.slice(0, 3).map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
    return null;
  }
  return { lesson: toLessonFull(parsed.data, contentHash(raw)), raw };
}

// ---- public API ------------------------------------------------------------

/** Build the browsable year → subject → unit → lesson tree (scanned fresh). */
export function curriculumTree(): CurriculumYear[] {
  const byYear = new Map<number, Map<string, CurriculumSubject>>();
  for (const file of listLessonFiles()) {
    const read = readLessonFile(file.filePath);
    if (!read) continue;
    const l = read.lesson;
    const summary: CurriculumLessonSummary = {
      id: l.id,
      lessonNumber: l.lessonNumber,
      title: l.title,
      topic: l.topic,
      durationMin: l.durationMin,
      deliveryMode: l.delivery.mode,
      kind: l.kind,
      status: l.status,
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

/** Re-read a single curriculum lesson from disk by its id, fresh. Null if gone
 *  or now malformed. This is the source-of-truth read used at session start. */
export function getCurriculumLesson(id: string): LessonFull | null {
  for (const file of listLessonFiles()) {
    // Cheap prefilter: the id is embedded nowhere in the path reliably, so read.
    const read = readLessonFile(file.filePath);
    if (read && read.lesson.id === id) return read.lesson;
  }
  return null;
}

/** How many valid lessons the library currently holds (for startup logging). */
export function curriculumCount(): number {
  let n = 0;
  for (const file of listLessonFiles()) if (readLessonFile(file.filePath)) n++;
  return n;
}

/** Every authored lesson with its folder year+subject, for the catalog merge. */
export function scanAuthoredLessons(): { lesson: LessonFull; year: number; subject: string }[] {
  const out: { lesson: LessonFull; year: number; subject: string }[] = [];
  for (const file of listLessonFiles()) {
    const read = readLessonFile(file.filePath);
    if (read) out.push({ lesson: read.lesson, year: file.year, subject: file.subject });
  }
  return out;
}

export { CURRICULUM_DIR } from '../config.ts';

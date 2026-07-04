/**
 * Curriculum catalog — merges the parsed scope outlines (every planned lesson)
 * with the authored `classai-lesson/1` JSONs (the prepared ones) into one tree
 * the whole app browses. Disk is the source of truth: rebuilt fresh on request.
 *
 * A lesson is `authored` when a JSON exists for it, else `outline` (the AI will
 * build it from the scope on first start). Catalog ids match the authored
 * convention `y{year}-{subject}-u{unit}-l{NN}` so a generated file slots in.
 */
import fs from 'node:fs';
import path from 'node:path';
import type {
  CatalogYear,
  CatalogSubject,
  CatalogUnit,
  CatalogLesson,
  LessonFull,
  LessonOutline,
  SubjectKey
} from '../../../shared/types.ts';
import { CURRICULUM_DIR } from '../config.ts';
import { parseScopeFile } from './curriculum-scope.ts';
import { curriculumSubjectKey, scanAuthoredLessons, getCurriculumLesson } from './curriculum.ts';

const SUBJECT_LABELS: Record<string, string> = {
  maths: 'Mathematics',
  math: 'Mathematics',
  english: 'English',
  science: 'Science',
  history: 'History',
  geography: 'Geography',
  'history-geography': 'History & Geography',
  'art-design': 'Art & Design',
  'life-skills': 'Life Skills',
  computing: 'Computing',
  music: 'Music',
  languages: 'Languages'
};

function subjectLabel(folder: string): string {
  return (
    SUBJECT_LABELS[folder] ??
    folder.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  );
}

const pad2 = (n: number): string => String(n).padStart(2, '0');

/** Catalog id for a lesson slot — matches the authored `y2-maths-u1-l01` scheme. */
export function catalogId(year: number, subject: string, unitNumber: number, lessonNumber: number): string {
  return `y${year}-${subject}-u${unitNumber}-l${pad2(lessonNumber)}`;
}

const ID_RE = /^y(\d+)-(.+?)-u(\d+)-l(\d+)$/;

export interface CatalogLessonRef {
  id: string;
  year: number;
  subject: string;
  subjectKey: SubjectKey;
  subjectLabel: string;
  unitNumber: number;
  lessonNumber: number;
  title: string;
  status: 'authored' | 'outline';
  outline?: LessonOutline;
  unit?: { title: string; essentialQuestion: string; keyVocabulary: string[] };
  yearOverview?: string;
  authored?: LessonFull;
}

// ---- filesystem helpers ----------------------------------------------------

/** Find the scope markdown in a subject folder (e.g. `maths-year-2.md`, or
 *  `spanish-year-3.md` where the file name differs from the folder). */
function scopeFileFor(year: number, subjectDir: string): string | null {
  const dir = path.join(CURRICULUM_DIR, `year-${year}`, subjectDir);
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return null;
  }
  const re = new RegExp(`-year-${year}\\.md$`, 'i');
  const match = files.find((f) => re.test(f)) || files.find((f) => f.endsWith('.md') && !/^readme/i.test(f));
  return match ? path.join(dir, match) : null;
}

function listSubjectDirs(year: number): string[] {
  const dir = path.join(CURRICULUM_DIR, `year-${year}`);
  try {
    return fs.readdirSync(dir).filter((s) => {
      try {
        return fs.statSync(path.join(dir, s)).isDirectory();
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }
}

function listYears(): number[] {
  try {
    return fs
      .readdirSync(CURRICULUM_DIR)
      .filter((d) => /^year-\d+$/i.test(d))
      .map((d) => Number(d.replace(/[^\d]/g, '')))
      .filter((n) => n > 0)
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

// ---- catalog build ---------------------------------------------------------

/** Map key year|subject|lessonNumber → authored LessonFull. */
function authoredIndex(): Map<string, LessonFull> {
  const map = new Map<string, LessonFull>();
  for (const { lesson, year, subject } of scanAuthoredLessons()) {
    map.set(`${year}|${subject}|${lesson.lessonNumber}`, lesson);
  }
  return map;
}

/** The whole browsable curriculum tree (summaries; outlines fetched per-lesson). */
export function buildCatalog(): CatalogYear[] {
  const authored = authoredIndex();
  const years: CatalogYear[] = [];

  for (const year of listYears()) {
    const subjects: CatalogSubject[] = [];
    for (const subjectDir of listSubjectDirs(year)) {
      const scopePath = scopeFileFor(year, subjectDir);
      if (!scopePath) continue;
      let parsed;
      try {
        parsed = parseScopeFile(fs.readFileSync(scopePath, 'utf8'));
      } catch (e) {
        console.warn(`[catalog] skipping ${subjectDir} year ${year}: ${(e as Error).message}`);
        continue;
      }
      if (!parsed.units.length) continue;

      const units: CatalogUnit[] = [];
      let lessonCount = 0;
      let authoredCount = 0;
      for (const unit of parsed.units) {
        const lessons: CatalogLesson[] = unit.lessons.map((outline) => {
          const key = `${year}|${subjectDir}|${outline.lessonNumber}`;
          const authoredLesson = authored.get(key);
          lessonCount++;
          if (authoredLesson) authoredCount++;
          return {
            id: authoredLesson?.id ?? catalogId(year, subjectDir, unit.number, outline.lessonNumber),
            lessonNumber: outline.lessonNumber,
            unitNumber: unit.number,
            title: outline.title,
            objective: outline.objective,
            durationMin: outline.durationMin || authoredLesson?.durationMin || 20,
            status: authoredLesson ? 'authored' : 'outline',
            deliveryMode: authoredLesson?.delivery.mode
          };
        });
        units.push({ number: unit.number, title: unit.title, essentialQuestion: unit.essentialQuestion, lessons });
      }

      subjects.push({
        subject: subjectDir,
        subjectKey: curriculumSubjectKey(subjectDir),
        subjectLabel: subjectLabel(subjectDir),
        yearOverview: parsed.yearOverview,
        units,
        lessonCount,
        authoredCount
      });
    }
    if (subjects.length) years.push({ year, subjects });
  }
  return years;
}

/** Resolve a single catalog lesson by id — outline + unit context for the
 *  generator, and the authored LessonFull if it already exists. Efficient:
 *  decodes the id and parses only that one scope file. */
export function getCatalogLessonRef(id: string): CatalogLessonRef | null {
  const m = id.match(ID_RE);
  if (!m) return null;
  const year = Number(m[1]);
  const subject = m[2]!;
  const unitNumber = Number(m[3]);
  const lessonNumber = Number(m[4]);

  const authored = getCurriculumLesson(id) || undefined;
  const scopePath = scopeFileFor(year, subject);
  let outline: LessonOutline | undefined;
  let unitCtx: CatalogLessonRef['unit'];
  let yearOverview = '';
  if (scopePath) {
    try {
      const parsed = parseScopeFile(fs.readFileSync(scopePath, 'utf8'));
      yearOverview = parsed.yearOverview;
      const unit = parsed.units.find((u) => u.number === unitNumber) || parsed.units.find((u) => u.lessons.some((l) => l.lessonNumber === lessonNumber));
      if (unit) {
        unitCtx = { title: unit.title, essentialQuestion: unit.essentialQuestion, keyVocabulary: unit.keyVocabulary };
        outline = unit.lessons.find((l) => l.lessonNumber === lessonNumber);
      }
    } catch {
      /* fall through with whatever we have */
    }
  }
  if (!authored && !outline) return null; // unknown lesson

  return {
    id,
    year,
    subject,
    subjectKey: curriculumSubjectKey(subject),
    subjectLabel: subjectLabel(subject),
    unitNumber,
    lessonNumber,
    title: authored?.title || outline?.title || `Lesson ${lessonNumber}`,
    status: authored ? 'authored' : 'outline',
    outline,
    unit: unitCtx,
    yearOverview,
    authored
  };
}

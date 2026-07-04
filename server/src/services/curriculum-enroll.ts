/**
 * Curriculum enrollment — maps a curriculum subject-year to the (hidden) shared
 * class + enrollment data layer, so per-learner progress and mastery keep
 * working without exposing the old manual class builder. Class/year ids are
 * deterministic (`cur:y2-maths`, `cur-year-2`) so a subject-year always resolves
 * to the same class.
 */
import type { ClassDefinition, SchoolYear } from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { curriculumSubjectKey } from './curriculum.ts';

const now = () => new Date().toISOString();

const SUBJECT_LABELS: Record<string, string> = {
  maths: 'Mathematics', math: 'Mathematics', english: 'English', science: 'Science',
  history: 'History', geography: 'Geography', 'history-geography': 'History & Geography',
  'art-design': 'Art & Design', 'life-skills': 'Life Skills', computing: 'Computing',
  music: 'Music', languages: 'Languages'
};
const label = (s: string) => SUBJECT_LABELS[s] ?? s.split(/[-_]/).map((w) => w[0]!.toUpperCase() + w.slice(1)).join(' ');

export const curriculumClassId = (year: number, subject: string) => `cur:y${year}-${subject}`;
const curriculumYearId = (year: number) => `cur-year-${year}`;

/** Parse a curriculum class id back into (year, subject). Null for other classes. */
export function parseCurriculumClassId(classId: string): { year: number; subject: string } | null {
  const m = classId.match(/^cur:y(\d+)-(.+)$/);
  return m ? { year: Number(m[1]), subject: m[2]! } : null;
}

/** Ensure the shared year + class rows exist for a subject-year; return the class. */
export function ensureCurriculumClass(year: number, subject: string): ClassDefinition {
  const yearId = curriculumYearId(year);
  if (!db.schoolYears.get(yearId)) {
    const y: SchoolYear = { id: yearId, name: `Year ${year}`, order: year, createdAt: now() };
    try { db.schoolYears.insert(y); } catch { /* raced */ }
  }
  const classId = curriculumClassId(year, subject);
  const existing = db.classes.get(classId);
  if (existing) return existing;
  const cls: ClassDefinition = {
    id: classId,
    yearId,
    yearName: `Year ${year}`,
    subject: label(subject),
    subjectKey: curriculumSubjectKey(subject),
    title: label(subject),
    description: `Year ${year} ${label(subject)} — from the curriculum.`,
    createdAt: now(),
    updatedAt: now()
  };
  try { return db.classes.insert(cls); } catch { return db.classes.get(classId) ?? cls; }
}

/** Assign a learner to a subject-year (idempotent enrollment). */
export function assignCurriculum(kidId: string, year: number, subject: string): ClassDefinition {
  if (!db.kids.get(kidId)) throw new Error('learner not found');
  const cls = ensureCurriculumClass(year, subject);
  if (!db.enrollments.get(cls.id, kidId)) {
    db.enrollments.insert({ id: 'e_' + Math.random().toString(36).slice(2), classId: cls.id, kidId, createdAt: now() });
  }
  return cls;
}

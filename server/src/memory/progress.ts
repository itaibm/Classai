/**
 * Progress rollups + next-lesson recommendations — pure functions (no db).
 *
 * Two kinds of class:
 *  - Library classes (parent-built): progress over the class syllabus topics,
 *    read from the long-term mastery map (with forgetting + spaced review).
 *  - Curriculum classes (`cur:y<N>-<subject>`, the live product path): progress
 *    over the catalog's units/lessons, read from the learner's ended sessions.
 */
import type {
  CatalogSubject,
  ClassDefinition,
  CourseProgress,
  CurriculumLessonProgress,
  CurriculumProgress,
  CurriculumUnitProgress,
  LearnerModel,
  Recommendation,
  Topic,
  TopicProgress
} from '../../../shared/types.ts';
import { daysBetween, decayedMastery, isDue } from './mastery.ts';

export const MASTERY_THRESHOLD = 0.8;

// ---- library classes (syllabus topics + mastery map) ------------------------

export function courseProgress(course: ClassDefinition, topics: Topic[], model: LearnerModel, nowMs = Date.now()): CourseProgress {
  const tp: TopicProgress[] = topics.map((t) => {
    const m = model.topicMastery[t.title];
    return {
      topicId: t.id,
      title: t.title,
      mastery: m ? decayedMastery(m, nowMs) : 0,
      confidence: m?.confidence ?? 0,
      lastTouched: m?.updatedAt,
      due: isDue(m, nowMs)
    };
  });
  const mastered = tp.filter((t) => t.mastery >= MASTERY_THRESHOLD).length;
  return { classDefinition: course, topics: tp, completion: topics.length ? mastered / topics.length : 0 };
}

/** Human-readable course name; titles often already contain the subject ("Math" / "Math"). */
function courseLabel(course: ClassDefinition): string {
  return course.title.toLowerCase().includes(course.subject.toLowerCase())
    ? course.title
    : `${course.subject} ${course.title}`;
}

/** Recommend the single best next thing for this course. */
export function recommendNext(course: ClassDefinition, topics: Topic[], model: LearnerModel, nowMs = Date.now()): Recommendation | null {
  if (!topics.length) return null;
  const entry = (t: Topic) => model.topicMastery[t.title];
  const current = (t: Topic) => {
    const m = entry(t);
    return m ? decayedMastery(m, nowMs) : 0;
  };
  const touched = topics.some((t) => entry(t));

  // Brand-new, substantial course → start with a diagnostic.
  if (!touched && topics.length > 3) {
    const first = topics[0]!;
    return {
      reason: 'diagnostic',
      classId: course.id,
      topicId: first.id,
      topicTitle: first.title,
      note: `Start with a quick check-in to see what ${courseLabel(course)} already feels like.`
    };
  }

  // Spaced review (mastered topics included) takes priority over new material.
  const due = topics
    .filter((t) => isDue(entry(t), nowMs))
    .sort((a, b) => current(a) - current(b))[0];
  if (due) {
    return {
      reason: 'spaced_review',
      classId: course.id,
      topicId: due.id,
      topicTitle: due.title,
      note: `Time to lock in "${due.title}" with a short review.`
    };
  }

  // Otherwise the next not-yet-mastered topic whose prerequisites are met.
  const masteredTitles = new Set(topics.filter((t) => current(t) >= MASTERY_THRESHOLD).map((t) => t.title));
  for (const t of topics) {
    if (current(t) >= MASTERY_THRESHOLD) continue;
    if (t.prerequisites.every((p) => masteredTitles.has(p))) {
      return {
        reason: 'next_topic',
        classId: course.id,
        topicId: t.id,
        topicTitle: t.title,
        note: `Next up: "${t.title}".`
      };
    }
  }

  // Everything mastered — keep the weakest sharp.
  const weakest = [...topics].sort((a, b) => current(a) - current(b))[0]!;
  return {
    reason: 'continue',
    classId: course.id,
    topicId: weakest.id,
    topicTitle: weakest.title,
    note: `Great progress! Keep "${weakest.title}" sharp.`
  };
}

// ---- curriculum classes (catalog + ended sessions) ---------------------------

/** Lesson mastery counted as "learned" (matches the director's MASTERED). */
export const LESSON_MASTERED = 0.6;
/** Three-star level; mastered lessons below it are review candidates. */
export const LESSON_SOLID = 0.85;
/** Moving on after this many attempts counts the lesson as done. */
export const MAX_TRIES = 2;
/** A shaky lesson becomes a review candidate this long after it was finished. */
export const REVIEW_AFTER_DAYS = 3;

/** The bits of a session curriculum progress needs (no transcript). */
export interface LessonOutcome {
  curriculumId?: string;
  status: 'active' | 'ended';
  endedAt?: string;
  lessonMastery?: number;
}

export function lessonStars(mastery: number): 1 | 2 | 3 {
  return mastery >= LESSON_SOLID ? 3 : mastery >= LESSON_MASTERED ? 2 : 1;
}

/**
 * Catalog-based progress for one curriculum subject-year. Per lesson: attempts
 * and best mastery (sessions from before mastery tracking count as 0.6). Next =
 * first lesson not yet learned; review = weakest mastered-but-<0.85 lesson last
 * finished more than 3 days ago.
 */
export function curriculumProgress(
  course: ClassDefinition,
  year: number,
  subject: CatalogSubject,
  outcomes: LessonOutcome[],
  nowMs = Date.now()
): { progress: CourseProgress; recommendation: Recommendation | null } {
  const results = new Map<string, { attempts: number; best: number; last?: string }>();
  for (const o of outcomes) {
    if (o.status !== 'ended' || !o.curriculumId) continue;
    const r = results.get(o.curriculumId) ?? { attempts: 0, best: 0 };
    r.attempts++;
    const m = typeof o.lessonMastery === 'number' && Number.isFinite(o.lessonMastery) ? o.lessonMastery : LESSON_MASTERED;
    r.best = Math.max(r.best, m);
    if (o.endedAt && (!r.last || o.endedAt > r.last)) r.last = o.endedAt;
    results.set(o.curriculumId, r);
  }

  const units: CurriculumUnitProgress[] = subject.units.map((u) => {
    const lessons: CurriculumLessonProgress[] = u.lessons.map((l) => {
      const r = results.get(l.id);
      const base = { lessonId: l.id, unitNumber: l.unitNumber, lessonNumber: l.lessonNumber, title: l.title };
      if (!r) return { ...base, attempts: 0, done: false };
      return {
        ...base,
        attempts: r.attempts,
        bestMastery: r.best,
        stars: lessonStars(r.best),
        done: r.best >= LESSON_MASTERED || r.attempts >= MAX_TRIES,
        lastFinished: r.last
      };
    });
    const tried = lessons.filter((l) => l.bestMastery !== undefined);
    return {
      number: u.number,
      title: u.title,
      lessons,
      completed: lessons.filter((l) => l.done).length,
      total: lessons.length,
      averageMastery: tried.length ? tried.reduce((s, l) => s + (l.bestMastery ?? 0), 0) / tried.length : undefined
    };
  });

  const all = units.flatMap((u) => u.lessons);
  const completed = all.filter((l) => l.done).length;
  const where = (l: CurriculumLessonProgress) => `Unit ${l.unitNumber}, lesson ${l.lessonNumber}`;

  const nextLesson = all.find((l) => !l.done);
  const next: Recommendation | undefined = nextLesson && {
    reason: 'next_topic',
    classId: course.id,
    topicId: nextLesson.lessonId,
    topicTitle: nextLesson.title,
    note:
      nextLesson.attempts > 0
        ? `Try again: ${where(nextLesson)} — "${nextLesson.title}" (not quite there yet).`
        : completed === 0
          ? `Start here: ${where(nextLesson)} — "${nextLesson.title}".`
          : `Next up: ${where(nextLesson)} — "${nextLesson.title}".`
  };

  const reviewLesson = all
    .filter(
      (l) =>
        l.bestMastery !== undefined &&
        l.bestMastery >= LESSON_MASTERED &&
        l.bestMastery < LESSON_SOLID &&
        daysBetween(l.lastFinished, nowMs) > REVIEW_AFTER_DAYS
    )
    .sort((a, b) => (a.bestMastery! - b.bestMastery!) || (a.lastFinished ?? '').localeCompare(b.lastFinished ?? ''))[0];
  const review: Recommendation | undefined = reviewLesson && {
    reason: 'spaced_review',
    classId: course.id,
    topicId: reviewLesson.lessonId,
    topicTitle: reviewLesson.title,
    note: `Worth a review: ${where(reviewLesson)} — "${reviewLesson.title}" (${reviewLesson.stars}★, last played ${Math.floor(daysBetween(reviewLesson.lastFinished, nowMs))} days ago).`
  };

  const curriculum: CurriculumProgress = {
    year,
    subject: subject.subject,
    subjectLabel: subject.subjectLabel,
    units,
    completed,
    total: all.length,
    next,
    review
  };
  const topics: TopicProgress[] = all.map((l) => ({
    topicId: l.lessonId,
    title: l.title,
    mastery: l.bestMastery ?? 0,
    confidence: Math.min(1, l.attempts / 3),
    lastTouched: l.lastFinished,
    due: l.lessonId === reviewLesson?.lessonId
  }));
  return {
    progress: { classDefinition: course, topics, completion: all.length ? completed / all.length : 0, curriculum },
    recommendation: next ?? review ?? null
  };
}

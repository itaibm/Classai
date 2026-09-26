/**
 * Unit tests for the memory math (mastery blending, confidence, forgetting,
 * spaced review) and the progress/recommendation rollups. Pure functions only —
 * no db. Run with `npm run test:memory`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { CatalogSubject, ClassDefinition, LearnerModel, MasteryEntry, Topic } from '../../../shared/types.ts';
import {
  blendObservation,
  decayedMastery,
  evidenceWeight,
  halfLifeDays,
  isDue,
  nextConfidence,
  PRIOR,
  REVIEW_INTERVALS
} from './mastery.ts';
import { courseProgress, curriculumProgress, recommendNext } from './progress.ts';

const DAY = 86_400_000;
const T0 = Date.parse('2026-09-01T10:00:00Z');
const iso = (ms: number) => new Date(ms).toISOString();

// ---- blending ---------------------------------------------------------------

test('first observation starts from a 0.5 prior with modest weight (not face value)', () => {
  const e = blendObservation(undefined, 1, 'got it', T0);
  assert.ok(e.mastery > PRIOR && e.mastery < 0.8, `got ${e.mastery}`);
  const low = blendObservation(undefined, 0, '', T0);
  assert.ok(low.mastery < PRIOR && low.mastery > 0.2, `got ${low.mastery}`);
  assert.equal(e.evidence, 1);
  assert.equal(e.reviews, 1);
});

test('evidence weight shrinks as confidence grows', () => {
  assert.ok(evidenceWeight(0) > evidenceWeight(0.5));
  assert.ok(evidenceWeight(0.5) > evidenceWeight(1));
  assert.ok(evidenceWeight(1) > 0, 'evidence always counts a bit');
});

test('one noisy turn barely moves a well-established topic', () => {
  let e: MasteryEntry | undefined;
  for (let i = 0; i < 20; i++) e = blendObservation(e, 0.95, '', T0 + i * 60_000);
  const before = e!.mastery;
  const after = blendObservation(e, 0, '', T0 + 21 * 60_000).mastery;
  assert.ok(before - after < 0.15, `dropped ${before - after}`);
  // ...whereas a fresh topic reacts much more to the same miss.
  const fresh = blendObservation(blendObservation(undefined, 0.95, '', T0), 0, '', T0 + 60_000);
  const freshDrop = blendObservation(undefined, 0.95, '', T0).mastery - fresh.mastery;
  assert.ok(freshDrop > before - after);
});

test('repeated strong evidence converges toward the observed level', () => {
  let e: MasteryEntry | undefined;
  for (let i = 0; i < 40; i++) e = blendObservation(e, 0.9, '', T0 + i * 60_000);
  assert.ok(Math.abs(e!.mastery - 0.9) < 0.03, `got ${e!.mastery}`);
});

test('observations are clamped and non-finite input is safe', () => {
  assert.ok(blendObservation(undefined, 7, '', T0).mastery <= 1);
  assert.ok(blendObservation(undefined, -3, '', T0).mastery >= 0);
  const nan = blendObservation(undefined, Number.NaN, '', T0).mastery;
  assert.ok(Number.isFinite(nan));
});

// ---- confidence ---------------------------------------------------------------

test('confidence grows with diminishing returns and does not saturate in one lesson', () => {
  const c1 = nextConfidence(0);
  const c2 = nextConfidence(c1);
  assert.ok(c2 - c1 < c1 - 0, 'each step adds less');
  let c = 0;
  for (let i = 0; i < 6; i++) c = nextConfidence(c); // ~one lesson's worth of updates
  assert.ok(c < 0.75, `one lesson should not saturate confidence (got ${c})`);
  for (let i = 0; i < 100; i++) c = nextConfidence(c);
  assert.ok(c <= 1);
});

// ---- forgetting ---------------------------------------------------------------

test('mastery decays toward 0.5 on read; half-life grows with confidence', () => {
  const strong: MasteryEntry = { mastery: 0.95, confidence: 0.2, note: '', updatedAt: iso(T0) };
  assert.equal(decayedMastery(strong, T0), 0.95);
  const later = decayedMastery(strong, T0 + 30 * DAY);
  assert.ok(later < 0.95 && later > PRIOR, `got ${later}`);
  const weak: MasteryEntry = { mastery: 0.1, confidence: 0.2, note: '', updatedAt: iso(T0) };
  assert.ok(decayedMastery(weak, T0 + 30 * DAY) > 0.1, 'low mastery drifts up toward the prior too');

  assert.ok(halfLifeDays(0.9) > halfLifeDays(0.1));
  const sure: MasteryEntry = { ...strong, confidence: 0.9 };
  assert.ok(decayedMastery(sure, T0 + 30 * DAY) > later, 'confident knowledge fades slower');
});

test('blending starts from the decayed prior', () => {
  const e: MasteryEntry = { mastery: 0.95, confidence: 0.1, note: '', updatedAt: iso(T0), reviews: 1 };
  const fresh = blendObservation(e, 0.95, '', T0 + 60_000).mastery;
  const stale = blendObservation(e, 0.95, '', T0 + 60 * DAY).mastery;
  assert.ok(stale < fresh);
});

// ---- spaced review --------------------------------------------------------------

test('review count climbs once per study occasion, not per turn', () => {
  let e = blendObservation(undefined, 0.8, '', T0);
  e = blendObservation(e, 0.8, '', T0 + 10 * 60_000); // same lesson
  assert.equal(e.reviews, 1);
  e = blendObservation(e, 0.8, '', T0 + 2 * DAY); // new occasion
  assert.equal(e.reviews, 2);
  e = blendObservation(e, 0.2, '', T0 + 6 * DAY); // failed review restarts the ladder
  assert.equal(e.reviews, 1);
});

test('isDue uses expanding intervals and includes mastered topics', () => {
  const mastered = (reviews: number): MasteryEntry => ({ mastery: 0.95, confidence: 0.8, note: '', updatedAt: iso(T0), reviews });
  assert.deepEqual([...REVIEW_INTERVALS], [1, 3, 7, 14, 30]);
  assert.equal(isDue(mastered(1), T0 + 0.5 * DAY), false);
  assert.equal(isDue(mastered(1), T0 + 1.01 * DAY), true, 'mastered topics come back for review');
  assert.equal(isDue(mastered(3), T0 + 5 * DAY), false);
  assert.equal(isDue(mastered(3), T0 + 7.01 * DAY), true);
  assert.equal(isDue(mastered(9), T0 + 20 * DAY), false, 'caps at the 30-day rung');
  assert.equal(isDue(mastered(9), T0 + 31 * DAY), true);
  // Legacy entry without a review count → first rung.
  assert.equal(isDue({ mastery: 0.9, confidence: 1, note: '', updatedAt: iso(T0) }, T0 + 1.5 * DAY), true);
  // Shaky topics come back after a day regardless of the rung.
  assert.equal(isDue({ mastery: 0.2, confidence: 0.5, note: '', updatedAt: iso(T0), reviews: 4 }, T0 + 1.5 * DAY), true);
  assert.equal(isDue(undefined, T0), false);
});

// ---- library-class rollups ------------------------------------------------------

const course: ClassDefinition = {
  id: 'c1', yearId: 'y', yearName: 'Year 2', subject: 'Maths', subjectKey: 'math' as ClassDefinition['subjectKey'],
  title: 'Maths', description: '', createdAt: iso(T0), updatedAt: iso(T0)
};
const topic = (id: string, title: string, prerequisites: string[] = []): Topic =>
  ({ id, classId: 'c1', title, prerequisites } as unknown as Topic);
const model = (topicMastery: LearnerModel['topicMastery']): LearnerModel => ({
  kidId: 'k', summary: '', preferences: '', strengths: [], struggles: [], misconceptions: [], interests: [],
  topicMastery, updatedAt: iso(T0)
});

test('recommendNext brings a mastered topic back for spaced review', () => {
  const topics = [topic('a', 'Counting'), topic('b', 'Adding', ['Counting'])];
  const m = model({ Counting: { mastery: 0.95, confidence: 0.7, note: '', updatedAt: iso(T0), reviews: 1 } });
  const soon = recommendNext(course, topics, m, T0 + 0.2 * DAY)!;
  assert.equal(soon.reason, 'next_topic');
  assert.equal(soon.topicId, 'b');
  const later = recommendNext(course, topics, m, T0 + 2 * DAY)!;
  assert.equal(later.reason, 'spaced_review');
  assert.equal(later.topicId, 'a');
});

test('courseProgress reports decayed mastery and due flags', () => {
  const topics = [topic('a', 'Counting')];
  const m = model({ Counting: { mastery: 0.95, confidence: 0.3, note: '', updatedAt: iso(T0), reviews: 1 } });
  const p = courseProgress(course, topics, m, T0 + 40 * DAY);
  assert.ok(p.topics[0]!.mastery < 0.95);
  assert.equal(p.topics[0]!.due, true);
});

// ---- curriculum-class rollups ---------------------------------------------------

const lesson = (u: number, l: number) => ({
  id: `y2-maths-u${u}-l${String(l).padStart(2, '0')}`, unitNumber: u, lessonNumber: l, title: `U${u}L${l}`,
  objective: '', durationMin: 20, status: 'outline' as const
});
const subject: CatalogSubject = {
  subject: 'maths', subjectKey: 'math' as CatalogSubject['subjectKey'], subjectLabel: 'Maths', yearOverview: '',
  units: [
    { number: 1, title: 'Place value', essentialQuestion: '', lessons: [lesson(1, 1), lesson(1, 2), lesson(1, 3)] },
    { number: 2, title: 'Adding', essentialQuestion: '', lessons: [lesson(2, 4), lesson(2, 5)] }
  ],
  lessonCount: 5,
  authoredCount: 0
};
const cur: ClassDefinition = { ...course, id: 'cur:y2-maths' };
const ended = (id: string, daysAgo: number, lessonMastery?: number) =>
  ({ curriculumId: id, status: 'ended' as const, endedAt: iso(T0 - daysAgo * DAY), lessonMastery });

test('curriculum progress: attempts, best mastery, done, unit rollup, completion', () => {
  const { progress, recommendation } = curriculumProgress(cur, 2, subject, [
    ended('y2-maths-u1-l01', 5, 0.7),
    ended('y2-maths-u1-l01', 1, 0.9), // best of two
    ended('y2-maths-u1-l02', 4, 0.3),
    ended('y2-maths-u1-l02', 2, 0.4), // two tries → moved on
    ended('y2-maths-u1-l03', 1), // legacy session, no mastery → 0.6
    { curriculumId: 'y2-maths-u2-l04', status: 'active' } // unfinished: ignored
  ], T0);
  const c = progress.curriculum!;
  assert.equal(c.total, 5);
  assert.equal(c.completed, 3);
  assert.equal(progress.completion, 3 / 5);
  const [l1, l2, l3] = c.units[0]!.lessons;
  assert.deepEqual([l1!.attempts, l1!.bestMastery, l1!.stars, l1!.done], [2, 0.9, 3, true]);
  assert.deepEqual([l2!.attempts, l2!.bestMastery, l2!.stars, l2!.done], [2, 0.4, 1, true]);
  assert.deepEqual([l3!.bestMastery, l3!.stars, l3!.done], [0.6, 2, true]);
  assert.equal(c.units[0]!.completed, 3);
  assert.equal(c.units[1]!.completed, 0);
  assert.equal(c.units[1]!.lessons[0]!.attempts, 0);
  assert.equal(c.next?.topicId, 'y2-maths-u2-l04');
  assert.equal(recommendation?.topicId, 'y2-maths-u2-l04');
  assert.equal(c.review, undefined, 'the only 2★ lesson was finished just 1 day ago');
});

test('curriculum next = first lesson not yet learned (a single weak attempt is retried)', () => {
  const { progress } = curriculumProgress(cur, 2, subject, [ended('y2-maths-u1-l01', 1, 0.3)], T0);
  assert.equal(progress.curriculum!.next?.topicId, 'y2-maths-u1-l01');
  assert.match(progress.curriculum!.next!.note, /Try again/);
});

test('curriculum review = weakest mastered-but-<0.85 lesson finished > 3 days ago', () => {
  const { progress } = curriculumProgress(cur, 2, subject, [
    ended('y2-maths-u1-l01', 10, 0.8),
    ended('y2-maths-u1-l02', 6, 0.65), // weakest eligible
    ended('y2-maths-u1-l03', 2, 0.61), // too recent
    ended('y2-maths-u2-l04', 9, 0.95) // solid: no review needed
  ], T0);
  const c = progress.curriculum!;
  assert.equal(c.review?.topicId, 'y2-maths-u1-l02');
  assert.equal(c.review?.reason, 'spaced_review');
  assert.equal(c.next?.topicId, 'y2-maths-u2-l05');
  assert.equal(progress.topics.find((t) => t.topicId === 'y2-maths-u1-l02')!.due, true);
});

test('curriculum with everything learned recommends the review (or nothing)', () => {
  const all = subject.units.flatMap((u) => u.lessons).map((l) => ended(l.id, 20, 0.95));
  const done = curriculumProgress(cur, 2, subject, all, T0);
  assert.equal(done.progress.completion, 1);
  assert.equal(done.recommendation, null);
  all[0] = ended(subject.units[0]!.lessons[0]!.id, 20, 0.7);
  const withReview = curriculumProgress(cur, 2, subject, all, T0);
  assert.equal(withReview.recommendation?.reason, 'spaced_review');
});

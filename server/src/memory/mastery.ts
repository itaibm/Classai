/**
 * Mastery math — pure functions (no db), so they are unit-testable.
 *
 * Model: each topic has a mastery estimate (0..1) plus a confidence (0..1)
 * that says how much evidence stands behind it.
 *
 *  - Blending: new evidence moves the estimate by a weight that SHRINKS as
 *    confidence grows, so one noisy turn can't swing a well-established topic,
 *    while a fresh topic still learns quickly. The very first observation
 *    starts from a neutral 0.5 prior with a modest weight — it is never taken
 *    at face value.
 *  - Confidence grows with diminishing returns (each observation closes a
 *    fraction of the remaining gap), so it takes several lessons, not one, to
 *    get near 1.
 *  - Forgetting: on read, mastery drifts back toward 0.5 ("we're no longer
 *    sure") with a half-life that grows with confidence.
 *  - Spaced review: a topic is due on an expanding schedule (1, 3, 7, 14, 30
 *    days) indexed by how many separate study occasions it has had —
 *    mastered topics included, which is what makes it real spaced repetition.
 */
import type { MasteryEntry } from '../../../shared/types.ts';

export const PRIOR = 0.5;
/** Weight of an observation when we know nothing (confidence 0). */
export const W_MAX = 0.45;
/** Floor weight once confidence is saturated — evidence always counts a bit. */
export const W_MIN = 0.08;
/** Share of the remaining confidence gap closed by one observation. */
export const CONF_GAIN = 0.15;
/** Updates further apart than this count as a new study occasion (review). */
export const OCCASION_GAP_H = 12;
/** Review intervals (days), indexed by review count − 1. */
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30] as const;
/** Half-life (days) of mastery decay at confidence 0 and the extra at confidence 1. */
export const HALF_LIFE_BASE = 3;
export const HALF_LIFE_SPAN = 60;

const DAY_MS = 86_400_000;
const clamp01 = (x: number) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : PRIOR);

export function daysBetween(fromIso: string | undefined, nowMs: number): number {
  if (!fromIso) return Infinity;
  const t = new Date(fromIso).getTime();
  if (!Number.isFinite(t)) return Infinity;
  return Math.max(0, (nowMs - t) / DAY_MS);
}

/** Evidence weight for a new observation, given current confidence. */
export function evidenceWeight(confidence: number): number {
  return W_MIN + (W_MAX - W_MIN) * (1 - clamp01(confidence));
}

/** Confidence after one more observation — diminishing returns, never above 1. */
export function nextConfidence(confidence: number): number {
  const c = clamp01(confidence);
  return c + (1 - c) * CONF_GAIN;
}

/** Half-life (days) of forgetting for a topic at this confidence. */
export function halfLifeDays(confidence: number): number {
  const c = clamp01(confidence);
  return HALF_LIFE_BASE + HALF_LIFE_SPAN * c * c;
}

/** Mastery as of `nowMs`: the stored estimate drifted toward 0.5 by elapsed time. */
export function decayedMastery(entry: Pick<MasteryEntry, 'mastery' | 'confidence' | 'updatedAt'>, nowMs = Date.now()): number {
  const m = clamp01(entry.mastery);
  const days = daysBetween(entry.updatedAt, nowMs);
  if (!Number.isFinite(days)) return m;
  const keep = Math.pow(0.5, days / halfLifeDays(entry.confidence));
  return PRIOR + (m - PRIOR) * keep;
}

/**
 * Fold one observation into an entry (or create it). The prior is first decayed
 * to "now", then moved toward the observation by a confidence-dependent weight.
 */
export function blendObservation(
  prev: MasteryEntry | undefined,
  observed: number,
  note: string | undefined,
  nowMs = Date.now()
): MasteryEntry {
  const obs = clamp01(observed);
  const nowIso = new Date(nowMs).toISOString();
  const confidence = prev ? clamp01(prev.confidence) : 0;
  const prior = prev ? decayedMastery(prev, nowMs) : PRIOR;
  const w = evidenceWeight(confidence);
  const mastery = clamp01(prior + (obs - prior) * w);

  // A new study occasion when it's been a while since the last evidence.
  const prevReviews = prev ? Math.max(1, prev.reviews ?? 1) : 0;
  const newOccasion = !prev || daysBetween(prev.updatedAt, nowMs) * 24 >= OCCASION_GAP_H;

  return {
    mastery,
    confidence: nextConfidence(confidence),
    note: note || prev?.note || '',
    topicId: prev?.topicId,
    updatedAt: nowIso,
    evidence: (prev?.evidence ?? (prev ? 1 : 0)) + 1,
    // A failed review restarts the ladder (short interval again); a good one climbs it.
    reviews: newOccasion ? (prev && obs < PRIOR ? 1 : prevReviews + 1) : prevReviews
  };
}

/** Days until the next review is due, from the review count and current grasp. */
export function reviewIntervalDays(entry: Pick<MasteryEntry, 'reviews'>, currentMastery: number): number {
  const idx = Math.max(0, Math.min(REVIEW_INTERVALS.length - 1, (entry.reviews ?? 1) - 1));
  const base = REVIEW_INTERVALS[idx]!;
  // A shaky topic comes back quickly no matter how often it's been seen.
  return currentMastery < PRIOR ? Math.min(base, 1) : base;
}

/** Due for spaced review? Includes mastered topics (expanding intervals). */
export function isDue(entry: MasteryEntry | undefined, nowMs = Date.now()): boolean {
  if (!entry) return false;
  const current = decayedMastery(entry, nowMs);
  return daysBetween(entry.updatedAt, nowMs) >= reviewIntervalDays(entry, current);
}

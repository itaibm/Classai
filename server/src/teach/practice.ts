/**
 * Practice-bank adaptivity engine — a pure, unit-testable state machine owned by
 * the lesson director. It contains NO LLM calls and NO I/O: given a lesson's
 * `practiceBank` + `adaptivity` rules and the running `PracticeState`, it decides
 * which item to serve next, when to level up/down, when to reteach, which hint to
 * give, and how to end on an earned win. The director drives it and asks the LLM
 * only to voice the result.
 *
 * Rules (from LESSON-FILE-SPEC + the PRD):
 *  - Start at `adaptivity.startLevel` (default 2).
 *  - Prefer unseen items and skills with recorded misses; never repeat an item
 *    back-to-back; interleave skills at level 3.
 *  - Level up: 2 consecutive correct at the current level → +1 (cap 3).
 *  - Level down: 2 misses on the same skill → run that item's reteach, then drop
 *    one level and reset that skill's miss count.
 *  - Hint ladder: 1st miss on an item → hints[0], 2nd → hints[1] … one per attempt,
 *    never the answer.
 *  - End on success: never end on a miss — serve one easy, winnable item first.
 */
import type { PracticeItem, PracticeState, LessonAdaptivity } from '../../../shared/types.ts';

export interface PracticeOutcome {
  correct: boolean;
  leveledUp: boolean;
  leveledDown: boolean;
  /** When set, the director must run this item's `reteach` as the next turn. */
  reteachItemId?: string;
  /** When set (a miss that isn't leveling down), the single hint to give now. */
  hint?: string;
}

const asLevel = (n: number): 1 | 2 | 3 => (n <= 1 ? 1 : n >= 3 ? 3 : 2);

/** Fresh practice state at the start of a lesson's practice phase. */
export function initPractice(adaptivity: LessonAdaptivity): PracticeState {
  return {
    currentLevel: asLevel(adaptivity.startLevel || 2),
    consecutiveCorrect: 0,
    missesBySkill: {},
    usedItemIds: [],
    attemptsByItem: {},
    correctCount: 0,
    askedCount: 0,
    earnedSuccess: false,
    lastWasMiss: false
  };
}

/** The hint to show for the nth attempt (0-indexed) on an item — clamped to the
 *  last available hint so we never index past the ladder or reveal the answer. */
export function hintForAttempt(item: PracticeItem, attemptIndex: number): string | undefined {
  if (!item.hints.length) return undefined;
  const i = Math.max(0, Math.min(attemptIndex, item.hints.length - 1));
  return item.hints[i];
}

/**
 * Choose the next practice item to serve, without mutating state. Returns null
 * only when the bank is empty. Selection: within a level pool, score by unseen,
 * by skills carrying misses, and (at level 3) by interleaving away from the last
 * skill; never the item just served.
 */
export function chooseItem(bank: PracticeItem[], state: PracticeState): PracticeItem | null {
  if (!bank.length) return null;
  const lastSkill = bank.find((i) => i.id === state.lastItemId)?.skill;

  const poolFor = (level: 1 | 2 | 3): PracticeItem[] =>
    bank.filter((i) => i.level === level && i.id !== state.lastItemId);

  // Prefer the current level; widen to any level only if the current one is empty.
  let pool = poolFor(state.currentLevel);
  if (!pool.length) pool = bank.filter((i) => i.id !== state.lastItemId);
  if (!pool.length) pool = bank; // single-item bank edge case

  const score = (i: PracticeItem): number => {
    let s = 0;
    if (!state.usedItemIds.includes(i.id)) s += 100; // unseen first
    s += 10 * (state.missesBySkill[i.skill] || 0); // shore up shaky skills
    if (state.currentLevel === 3 && lastSkill && i.skill !== lastSkill) s += 40; // interleave
    return s;
  };

  const order = new Map(bank.map((i, idx) => [i.id, idx]));
  return [...pool].sort((a, b) => score(b) - score(a) || (order.get(a.id)! - order.get(b.id)!))[0] ?? null;
}

/** Mark that `item` was served this turn (updates seen/last/asked bookkeeping). */
export function markServed(state: PracticeState, item: PracticeItem): void {
  state.currentItemId = item.id;
  state.lastItemId = item.id;
  state.askedCount += 1;
  if (!state.usedItemIds.includes(item.id)) state.usedItemIds.push(item.id);
}

/**
 * Record the learner's answer to the currently-open item and advance the machine.
 * Mutates `state` and returns what the director should do next (level move, hint,
 * or reteach). Correctness is decided by the caller (client answer key for exact
 * blocks, LLM for free text) — this engine only reacts to it.
 */
export function recordAnswer(state: PracticeState, item: PracticeItem, correct: boolean): PracticeOutcome {
  const outcome: PracticeOutcome = { correct, leveledUp: false, leveledDown: false };
  state.lastWasMiss = !correct;
  state.currentItemId = undefined;

  if (correct) {
    state.correctCount += 1;
    state.consecutiveCorrect += 1;
    state.earnedSuccess = true;
    state.missesBySkill[item.skill] = 0;
    delete state.attemptsByItem[item.id];
    if (state.consecutiveCorrect >= 2 && state.currentLevel < 3) {
      state.currentLevel = asLevel(state.currentLevel + 1);
      state.consecutiveCorrect = 0;
      outcome.leveledUp = true;
    }
    return outcome;
  }

  // A miss.
  state.earnedSuccess = false;
  state.consecutiveCorrect = 0;
  const attempts = (state.attemptsByItem[item.id] || 0) + 1;
  state.attemptsByItem[item.id] = attempts;
  const misses = (state.missesBySkill[item.skill] || 0) + 1;
  state.missesBySkill[item.skill] = misses;

  if (misses >= 2) {
    // Level down + reteach: run this item's fresh re-explanation, drop a level,
    // and reset the skill's miss count so it gets a clean start after the reteach.
    outcome.leveledDown = true;
    outcome.reteachItemId = item.id;
    state.currentLevel = asLevel(state.currentLevel - 1);
    state.missesBySkill[item.skill] = 0;
    delete state.attemptsByItem[item.id];
    return outcome;
  }

  // First miss on this skill: give one hint and let them try again.
  outcome.hint = hintForAttempt(item, attempts - 1);
  return outcome;
}

/**
 * End-on-success: when time is up (or the phase is wrapping) and the last answer
 * was a miss, pick the easiest winnable item — level 1, favouring the weakest
 * skill — so the lesson ends on an earned win. Null if the bank can't supply one.
 */
export function easyRecoveryItem(bank: PracticeItem[], state: PracticeState): PracticeItem | null {
  if (!bank.length) return null;
  const weakestSkill = Object.entries(state.missesBySkill).sort((a, b) => b[1] - a[1])[0]?.[0];
  const byLevel = (lvl: 1 | 2 | 3) => bank.filter((i) => i.level === lvl);
  const pool = byLevel(1).length ? byLevel(1) : byLevel(2).length ? byLevel(2) : bank;
  const order = new Map(bank.map((i, idx) => [i.id, idx]));
  return (
    [...pool].sort((a, b) => {
      const aw = a.skill === weakestSkill ? 1 : 0;
      const bw = b.skill === weakestSkill ? 1 : 0;
      return bw - aw || order.get(a.id)! - order.get(b.id)!;
    })[0] ?? null
  );
}

/** A 0..1 mastery estimate from the level reached and answer accuracy. Fed
 *  through the existing memory path so spaced review + recommendations benefit. */
export function masteryEstimate(state: PracticeState): number {
  const accuracy = state.askedCount ? state.correctCount / state.askedCount : 0;
  const levelBase = state.currentLevel === 3 ? 0.85 : state.currentLevel === 2 ? 0.65 : 0.45;
  let m = levelBase * 0.6 + accuracy * 0.4;
  if (state.earnedSuccess && state.correctCount >= 3) m = Math.max(m, 0.8); // masterySignal shape
  return Math.max(0, Math.min(1, Number(m.toFixed(3))));
}

/** True once the practice phase has earned a clean win to end on. */
export function readyToEndOnSuccess(state: PracticeState): boolean {
  return state.earnedSuccess && !state.lastWasMiss;
}

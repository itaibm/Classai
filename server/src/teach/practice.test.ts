/**
 * Unit tests for the practice-bank adaptivity engine (pure, no LLM, no I/O).
 * Run with `npm run test:practice`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { PracticeItem, LessonAdaptivity } from '../../../shared/types.ts';
import {
  initPractice,
  chooseItem,
  markServed,
  recordAnswer,
  hintForAttempt,
  easyRecoveryItem,
  masteryEstimate,
  readyToEndOnSuccess
} from './practice.ts';

const ADAPT: LessonAdaptivity = {
  startLevel: 2,
  levelUp: '',
  levelDown: '',
  masterySignal: '',
  struggleProtocol: [],
  personalization: '',
  endOnSuccess: ''
};

function item(id: string, skill: string, level: 1 | 2 | 3, hints: string[] = ['h0', 'h1']): PracticeItem {
  return {
    id,
    skill,
    level,
    block: { type: 'shortText', prompt: id },
    expectedAnswer: 'x',
    wrongAnswers: [],
    hints,
    reteach: { say: `reteach ${id}` }
  };
}

const BANK: PracticeItem[] = [
  item('x1', 'X', 1),
  item('x2a', 'X', 2),
  item('x2b', 'X', 2),
  item('x3', 'X', 3),
  item('y1', 'Y', 1),
  item('y2', 'Y', 2),
  item('y3', 'Y', 3)
];

test('level up after 2 consecutive correct at the current level', () => {
  const s = initPractice(ADAPT);
  assert.equal(s.currentLevel, 2);
  const it = item('x2a', 'X', 2);
  const r1 = recordAnswer(s, it, true);
  assert.equal(r1.leveledUp, false);
  assert.equal(s.consecutiveCorrect, 1);
  const r2 = recordAnswer(s, item('x2b', 'X', 2), true);
  assert.equal(r2.leveledUp, true);
  assert.equal(s.currentLevel, 3);
  assert.equal(s.consecutiveCorrect, 0);
});

test('level up is capped at 3', () => {
  const s = initPractice({ ...ADAPT, startLevel: 3 });
  recordAnswer(s, item('x3', 'X', 3), true);
  const r = recordAnswer(s, item('y3', 'Y', 3), true);
  assert.equal(r.leveledUp, false);
  assert.equal(s.currentLevel, 3);
});

test('reteach + level down after 2 misses on the same skill', () => {
  const s = initPractice(ADAPT);
  const r1 = recordAnswer(s, item('x2a', 'X', 2), false);
  assert.equal(r1.leveledDown, false);
  assert.equal(r1.hint, 'h0'); // first miss → first hint
  assert.equal(s.currentLevel, 2);
  const r2 = recordAnswer(s, item('x2b', 'X', 2), false);
  assert.equal(r2.leveledDown, true);
  assert.equal(r2.reteachItemId, 'x2b');
  assert.equal(s.currentLevel, 1); // dropped one level
  assert.equal(s.missesBySkill['X'], 0); // reset after reteach
});

test('a correct answer clears the skill miss count (no premature level down)', () => {
  const s = initPractice(ADAPT);
  recordAnswer(s, item('x2a', 'X', 2), false); // miss 1
  recordAnswer(s, item('x2a', 'X', 2), true); // recover
  assert.equal(s.missesBySkill['X'], 0);
  const r = recordAnswer(s, item('x2b', 'X', 2), false); // miss 1 again, not 2
  assert.equal(r.leveledDown, false);
});

test('hint ladder gives one hint per attempt, in order, clamped', () => {
  const it = item('q', 'X', 2, ['first nudge', 'bigger scaffold']);
  assert.equal(hintForAttempt(it, 0), 'first nudge');
  assert.equal(hintForAttempt(it, 1), 'bigger scaffold');
  assert.equal(hintForAttempt(it, 5), 'bigger scaffold'); // clamp, never past the ladder
  assert.equal(hintForAttempt(item('n', 'X', 2, []), 0), undefined); // no hints → nothing
});

test('never repeats an item back-to-back', () => {
  const s = initPractice(ADAPT);
  const first = chooseItem(BANK, s)!;
  markServed(s, first);
  for (let i = 0; i < 6; i++) {
    const next = chooseItem(BANK, s)!;
    assert.notEqual(next.id, s.lastItemId);
    markServed(s, next);
  }
});

test('selection prefers unseen items, then shaky skills', () => {
  const s = initPractice(ADAPT);
  s.usedItemIds = ['x2a']; // x2a seen; x2b unseen → x2b preferred at level 2
  s.lastItemId = 'y2';
  const pick = chooseItem(BANK, s)!;
  assert.equal(pick.id, 'x2b');
});

test('interleaves skills at level 3', () => {
  const s = initPractice(ADAPT);
  s.currentLevel = 3;
  s.lastItemId = 'x3'; // last skill X → prefer a non-X skill
  s.usedItemIds = ['x3', 'y3'];
  const pick = chooseItem(BANK, s)!;
  assert.equal(pick.skill, 'Y');
});

test('end on success: easy recovery item is level 1, weakest skill', () => {
  const s = initPractice(ADAPT);
  s.missesBySkill = { X: 2, Y: 0 };
  s.lastWasMiss = true;
  assert.equal(readyToEndOnSuccess(s), false);
  const recovery = easyRecoveryItem(BANK, s)!;
  assert.equal(recovery.level, 1);
  assert.equal(recovery.skill, 'X'); // weakest skill
});

test('readyToEndOnSuccess flips after a correct answer', () => {
  const s = initPractice(ADAPT);
  recordAnswer(s, item('x2a', 'X', 2), false);
  assert.equal(readyToEndOnSuccess(s), false);
  recordAnswer(s, item('x2a', 'X', 2), true);
  assert.equal(readyToEndOnSuccess(s), true);
});

test('mastery estimate rises with level and accuracy', () => {
  const low = initPractice(ADAPT);
  low.askedCount = 4;
  low.correctCount = 1;
  low.currentLevel = 1;
  const high = initPractice(ADAPT);
  high.askedCount = 4;
  high.correctCount = 4;
  high.currentLevel = 3;
  high.earnedSuccess = true;
  assert.ok(masteryEstimate(high) > masteryEstimate(low));
  assert.ok(masteryEstimate(high) >= 0.8);
});

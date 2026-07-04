import { test } from 'node:test';
import assert from 'node:assert/strict';
import { arrayDots, tenFrameCells, numberLineTicks, pieSlices } from './geometry.ts';

test('arrayDots returns rows*cols points', () => {
  assert.equal(arrayDots(3, 5).length, 15);
});
test('tenFrameCells is always 10', () => {
  assert.equal(tenFrameCells().length, 10);
});
test('numberLineTicks marks every integer and flags evens big', () => {
  const t = numberLineTicks(0, 10);
  assert.equal(t.length, 11);
  assert.equal(t.find(x => x.n === 4)?.big, true);
});
test('pieSlices returns one path per slice', () => {
  assert.equal(pieSlices(4).length, 4);
});

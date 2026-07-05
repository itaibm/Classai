import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseElement, parseElements } from './element-schemas.ts';

test('parses a valid array element', () => {
  const el = parseElement({ type: 'array', rows: 3, cols: 5, animate: 'rotate' });
  assert.equal(el?.type, 'array');
  assert.equal((el as any).rows, 3);
});

test('coerces stringy numbers and fills defaults', () => {
  const el = parseElement({ type: 'array', rows: '3', cols: '5' });
  assert.equal((el as any).cols, 5);
  assert.equal((el as any).animate, 'none');
});

test('returns null for an unknown type', () => {
  assert.equal(parseElement({ type: 'nope' }), null);
});

test('parseElements drops the bad ones, keeps the good', () => {
  const els = parseElements([{ type: 'text', value: 'hi' }, { type: 'nope' }, { type: 'choice', prompt: 'p', options: ['a','b'], correct: [0] }]);
  assert.equal(els.length, 2);
});

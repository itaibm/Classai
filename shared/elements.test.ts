import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ELEMENT_JOB, elementIsManipulable, type ElementType } from './elements.ts';

test('every element id has a job', () => {
  const ids: ElementType[] = ['text','image','video','scene','audio','array','numberLine','baseTen','fraction','barModel','numberBond','shape','grid','dataChart','measure','wordBuild','textMark','sentence','diagram','map','timeline','sort','music','draw','steps','choice','enter','speak'];
  assert.equal(Object.keys(ELEMENT_JOB).length, 28);
  for (const id of ids) assert.ok(ELEMENT_JOB[id], `missing job for ${id}`);
});

test('pure display elements are not manipulable, checks are', () => {
  assert.equal(elementIsManipulable('text'), false);
  assert.equal(elementIsManipulable('choice'), true);
  assert.equal(elementIsManipulable('array'), true); // dual-mode
});

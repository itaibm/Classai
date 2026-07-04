/**
 * Integration smoke for the authored-beat director, driven end-to-end with the
 * gated mock brain (replaces the Playwright smoke — no browser needed). It plays
 * curriculum lesson-01 and asserts the deterministic behaviours: a human beat
 * shows a handoff card, authored blocks pass through unchanged, a wrong check
 * answer does not advance while a correct one does, and two same-skill practice
 * misses trigger the authored reteach.
 *
 * Run with `npm run test:teach`.
 */
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

// Isolate storage + activate the canned brain BEFORE any app module loads.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'classai-test-'));
process.env.CLASSAI_DATA_DIR = TMP;
process.env.CLASSAI_MOCK_BRAIN = '1';

// Dynamic imports so the env above is in effect when db/config initialize.
let db: typeof import('../db/index.ts');
let startSession: typeof import('./index.ts')['startSession'];
let nextTurn: typeof import('./index.ts')['nextTurn'];
let getCurriculumLesson: typeof import('../services/curriculum.ts')['getCurriculumLesson'];
let createSchoolYear: typeof import('../services/class-library.ts')['createSchoolYear'];
let createClass: typeof import('../services/class-library.ts')['createClass'];
let enrollLearner: typeof import('../services/class-library.ts')['enrollLearner'];

before(async () => {
  db = await import('../db/index.ts');
  ({ startSession, nextTurn } = await import('./index.ts'));
  ({ getCurriculumLesson } = await import('../services/curriculum.ts'));
  ({ createSchoolYear, createClass, enrollLearner } = await import('../services/class-library.ts'));
});

function seedKid() {
  const kid = {
    id: 'kid_test',
    name: 'Alex',
    age: 7,
    gradeLevel: 'Year 2',
    interests: ['dinosaurs'],
    avatar: { character: 'sage' as const, hue: 210, voice: 'default', rate: 1 },
    createdAt: new Date().toISOString()
  };
  db.kids.insert(kid);
  return kid;
}

test('authored director plays lesson-01: handoff, authored blocks, judging, reteach', async () => {
  const kid = seedKid();
  const year = createSchoolYear({ name: 'Year 2' });
  const klass = createClass({ yearId: year.id, subject: 'Mathematics' });
  enrollLearner(klass.id, kid.id);

  const lesson = getCurriculumLesson('y2-maths-u1-l01');
  assert.ok(lesson, 'lesson-01 should load from disk');
  lesson!.classId = klass.id;

  const session = startSession(kid, klass, lesson!);

  // Turn 1: the lesson opens on human beats → a parent handoff card, no TTS.
  let r = await nextTurn(session.id);
  assert.ok(r.turn.handoff, 'first turn is a parent handoff card');
  assert.ok(r.turn.handoff!.materials.length > 0, 'handoff lists human materials');
  assert.equal(r.turn.lessonComplete, false);

  // Parent taps resume → advances past the merged human run to the example beat.
  r = await nextTurn(session.id, { text: '(continue)', via: 'continue' });
  const exampleBeat = r.beat.index;
  assert.ok(r.turn.blocks && r.turn.blocks.some((b) => b.type === 'whiteboard'), 'authored whiteboard renders as authored');

  // Continue to the check beat; it carries the authored multipleChoice block.
  r = await nextTurn(session.id, { text: '(continue)', via: 'continue' });
  const checkIdx = r.beat.index;
  assert.ok(checkIdx > exampleBeat, 'advanced to the check beat');
  assert.ok(r.turn.blocks && r.turn.blocks.some((b) => b.type === 'multipleChoice'), 'authored MC check renders');

  // Wrong check answer → the director does NOT advance the beat.
  r = await nextTurn(session.id, { text: '7 tens and 4 ones', via: 'block', correct: false });
  assert.equal(r.beat.index, checkIdx, 'a wrong check answer stays on the check beat');

  // Correct check answer → advances to the practice beat.
  r = await nextTurn(session.id, { text: '4 tens and 7 ones', via: 'block', correct: true });
  assert.ok(r.beat.index > checkIdx, 'a correct check answer advances the beat');
  assert.ok(r.turn.blocks && r.turn.blocks.length > 0, 'a practice item is served');

  // Miss the same practice item twice → authored reteach fires (level drops).
  r = await nextTurn(session.id, { text: 'wrong', via: 'block', correct: false }); // first miss → hint
  r = await nextTurn(session.id, { text: 'wrong again', via: 'block', correct: false }); // second same-skill miss → reteach
  const saved = db.sessions.get(session.id)!;
  assert.equal(saved.working.practice?.currentLevel, 1, 'level dropped after 2 same-skill misses');
  // The reteach turn shows the item's authored reteach visual (a keyTerm card for p03).
  assert.ok(r.turn.block, 'reteach turn carries the authored reteach visual');
});

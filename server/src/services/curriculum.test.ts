/**
 * Tests for the curriculum-first library: scope parser, catalog merge, and the
 * AI lesson generator (driven by the gated mock brain). Uses a throwaway copy of
 * the real curriculum so the generator can write without touching the repo.
 *
 * Run with `npm run test:curriculum`.
 */
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REAL = path.resolve(import.meta.dirname, '../../../curriculum');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'classai-cur-'));
fs.cpSync(REAL, path.join(TMP, 'curriculum'), { recursive: true });
// Point the app at the copy and activate the canned brain BEFORE modules load.
process.env.CLASSAI_CURRICULUM_DIR = path.join(TMP, 'curriculum');
process.env.CLASSAI_DATA_DIR = path.join(TMP, 'data');
process.env.CLASSAI_MOCK_BRAIN = '1';

let scope: typeof import('./curriculum-scope.ts');
let catalog: typeof import('./curriculum-catalog.ts');
let generator: typeof import('./lesson-generator.ts');
let curriculum: typeof import('./curriculum.ts');

before(async () => {
  scope = await import('./curriculum-scope.ts');
  catalog = await import('./curriculum-catalog.ts');
  generator = await import('./lesson-generator.ts');
  curriculum = await import('./curriculum.ts');
});

test('scope parser reads units and lesson fields', () => {
  const md = fs.readFileSync(path.join(TMP, 'curriculum/year-2/maths/maths-year-2.md'), 'utf8');
  const parsed = scope.parseScopeFile(md);
  assert.ok(parsed.units.length >= 7, 'maths year 2 has several units');
  const u1 = parsed.units[0]!;
  assert.equal(u1.number, 1);
  assert.match(u1.essentialQuestion, /tens and the ones/i);
  const l1 = u1.lessons[0]!;
  assert.equal(l1.lessonNumber, 1);
  assert.equal(l1.durationMin, 22);
  assert.match(l1.objective, /build any number to 100/i);
  assert.ok(l1.differentiation.support.length > 0);
});

test('catalog merges authored + outline lessons', () => {
  const tree = catalog.buildCatalog();
  assert.ok(tree.length >= 6, 'six years');
  const ref = catalog.getCatalogLessonRef('y2-maths-u1-l01')!;
  assert.equal(ref.status, 'authored');
  assert.ok(ref.authored, 'authored lesson resolves to a LessonFull');
  const outline = catalog.getCatalogLessonRef('y3-history-u1-l01')!;
  assert.equal(outline.status, 'outline');
  assert.ok(!outline.authored);
  assert.ok(outline.outline, 'outline-only lesson still carries its scope outline');
});

test('generator builds, validates and saves an outline-only lesson', async () => {
  const ref = catalog.getCatalogLessonRef('y3-history-u1-l01')!;
  assert.equal(ref.status, 'outline');
  const { lesson, fallback } = await generator.generateAndSaveLesson(ref);
  assert.equal(fallback, false, 'mock brain returns a valid lesson, not the fallback');
  assert.equal(lesson.id, 'y3-history-u1-l01');
  assert.ok(lesson.plan.length >= 4, 'has beats');
  assert.ok(lesson.practiceBank.length >= 9, 'has a full practice bank');
  // It is now authored on disk and re-reads.
  const after = catalog.getCatalogLessonRef('y3-history-u1-l01')!;
  assert.equal(after.status, 'authored');
  assert.ok(curriculum.getCurriculumLesson('y3-history-u1-l01'), 'file is on disk');
});

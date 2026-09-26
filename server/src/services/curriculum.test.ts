/**
 * Tests for the curriculum-first library: scope parser, catalog merge, and the
 * AI lesson generator (driven by the gated mock brain), generated-vs-authored
 * precedence, the mtime cache, and parent review. Uses a throwaway copy of the
 * real curriculum and a temp data dir so nothing touches the repo.
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
  const md = fs.readFileSync(path.join(TMP, 'curriculum/year-1/maths/maths-year-1.md'), 'utf8');
  const parsed = scope.parseScopeFile(md);
  assert.ok(parsed.units.length >= 7, 'maths year 1 has several units');
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
  const ref = catalog.getCatalogLessonRef('y1-maths-u1-l01')!;
  assert.equal(ref.status, 'authored');
  assert.ok(ref.authored, 'authored lesson resolves to a LessonFull');
  const outline = catalog.getCatalogLessonRef('y2-history-u1-l01')!;
  assert.equal(outline.status, 'outline');
  assert.ok(!outline.authored);
  assert.ok(outline.outline, 'outline-only lesson still carries its scope outline');
});

const CUR = () => path.join(TMP, 'curriculum');
const GEN = () => path.join(TMP, 'data', 'generated');

/** Every *.json under a dir (recursive). */
function jsonFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return (fs.readdirSync(dir, { recursive: true }) as string[])
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(dir, f));
}

test('generator saves an outline-only lesson as a draft in the data dir, not curriculum/', async () => {
  const curBefore = jsonFiles(CUR()).length;
  const ref = catalog.getCatalogLessonRef('y2-history-u1-l01')!;
  assert.equal(ref.status, 'outline');
  const { lesson, fallback } = await generator.generateAndSaveLesson(ref);
  assert.equal(fallback, false, 'mock brain returns a valid lesson, not the fallback');
  assert.equal(lesson.id, 'y2-history-u1-l01');
  assert.ok(lesson.plan.length >= 4, 'has beats');
  assert.ok(lesson.practiceBank.length >= 9, 'has a full practice bank');
  assert.equal(lesson.status, 'draft', 'generated lessons are drafts');
  assert.ok(lesson.generatedAt && lesson.generatedBy, 'carries provenance');

  // Written under data/generated/year-2/history/lessons — curriculum/ untouched.
  assert.equal(jsonFiles(CUR()).length, curBefore, 'nothing written into curriculum/');
  assert.equal(jsonFiles(path.join(GEN(), 'year-2', 'history', 'lessons')).length, 1);

  // Playable (resolves) but marked generated in the catalog, not authored.
  const after = catalog.getCatalogLessonRef('y2-history-u1-l01')!;
  assert.equal(after.status, 'generated');
  assert.ok(after.authored, 'generated draft is playable');
  const tree = catalog.buildCatalog();
  const hist = tree.find((y) => y.year === 2)!.subjects.find((s) => s.subject === 'history')!;
  const slot = hist.units[0]!.lessons[0]!;
  assert.equal(slot.status, 'generated');
  assert.equal(slot.review, 'draft');
  assert.equal(hist.authoredCount, 0, 'generated drafts do not count as hand-built');
});

test('parent review: approve in place, regenerate, discard (slot back to outline)', async () => {
  const listed = generator.listGeneratedLessons();
  assert.ok(listed.some((l) => l.id === 'y2-history-u1-l01' && l.status === 'draft'));

  const approved = generator.approveGeneratedLesson('y2-history-u1-l01')!;
  assert.equal(approved.status, 'approved');
  assert.ok(approved.reviewedAt);
  assert.equal(curriculum.getCurriculumLesson('y2-history-u1-l01')!.status, 'approved', 'mtime change is picked up');
  assert.equal(jsonFiles(path.join(CUR(), 'year-2')).length, 0, 'approval does not copy into curriculum/');

  const regenerated = await generator.regenerateLesson('y2-history-u1-l01');
  assert.equal(regenerated.ok, true);
  assert.equal(curriculum.getCurriculumLesson('y2-history-u1-l01')!.status, 'draft', 'a regenerated lesson needs review again');
  assert.equal(jsonFiles(path.join(GEN(), 'year-2', 'history', 'lessons')).length, 1, 'regenerate replaces the old draft');

  assert.equal(generator.discardGeneratedLesson('y2-history-u1-l01'), true);
  assert.equal(curriculum.getCurriculumLesson('y2-history-u1-l01'), null);
  assert.equal(catalog.getCatalogLessonRef('y2-history-u1-l01')!.status, 'outline', 'will be regenerated next start');
  assert.equal(generator.approveGeneratedLesson('../../etc'), null, 'unknown ids never reach the filesystem');
});

test('loader: authored beats a generated file with the same id', () => {
  const authoredFile = path.join(CUR(), 'year-1', 'maths', 'lessons', 'lesson-01-tens-and-ones.json');
  const disk = JSON.parse(fs.readFileSync(authoredFile, 'utf8'));
  const dir = path.join(GEN(), 'year-1', 'maths', 'lessons');
  fs.mkdirSync(dir, { recursive: true });
  const shadow = path.join(dir, 'lesson-01-shadow.json');
  fs.writeFileSync(shadow, JSON.stringify({ ...disk, title: 'GENERATED SHADOW', status: 'draft' }));
  try {
    const lesson = curriculum.getCurriculumLesson(disk.id)!;
    assert.equal(lesson.title, disk.title, 'authored file wins');
    assert.equal(curriculum.curriculumLessonSource(disk.id), 'authored');
    assert.equal(catalog.getCatalogLessonRef(disk.id)!.status, 'authored');
    const entry = curriculum.listGeneratedLessonFiles().find((g) => g.filePath === shadow)!;
    assert.equal(entry.shadowed, true, 'the shadowed draft is reported as such');
  } finally {
    fs.rmSync(shadow);
  }
});

test('loader: mtime cache re-parses only changed files and returns fresh copies', () => {
  const dir = path.join(GEN(), 'year-2', 'history', 'lessons');
  fs.mkdirSync(dir, { recursive: true });
  const src = JSON.parse(fs.readFileSync(path.join(CUR(), 'year-1', 'maths', 'lessons', 'lesson-01-tens-and-ones.json'), 'utf8'));
  const file = path.join(dir, 'lesson-02-cache-probe.json');
  const write = (title: string) =>
    fs.writeFileSync(file, JSON.stringify({ ...src, id: 'y2-history-u1-l02', year: 3, subject: 'history', lessonNumber: 2, title }));
  write('Version one');
  try {
    assert.equal(curriculum.getCurriculumLesson('y2-history-u1-l02')!.title, 'Version one');
    const warm = curriculum._curriculumCacheStats().parses;
    curriculum.getCurriculumLesson('y2-history-u1-l02');
    catalog.buildCatalog();
    curriculum.curriculumTree();
    assert.equal(curriculum._curriculumCacheStats().parses, warm, 'unchanged files are not re-parsed');

    // Callers may mutate what they get without poisoning the cache.
    const mutated = curriculum.getCurriculumLesson('y2-history-u1-l02')!;
    mutated.title = 'mutated';
    mutated.classId = 'someone-else';
    assert.equal(curriculum.getCurriculumLesson('y2-history-u1-l02')!.title, 'Version one');

    write('Version two, longer');
    const future = new Date(Date.now() + 5000);
    fs.utimesSync(file, future, future);
    assert.equal(curriculum.getCurriculumLesson('y2-history-u1-l02')!.title, 'Version two, longer');
    assert.equal(curriculum._curriculumCacheStats().parses, warm + 1, 'exactly the changed file was re-parsed');
  } finally {
    fs.rmSync(file);
  }
  assert.equal(curriculum.getCurriculumLesson('y2-history-u1-l02'), null, 'deleted files drop out');
});

test('validator block-type list matches the app BlockSchema', async () => {
  const { BlockSchema } = await import('../ai/blocks.ts');
  const union = (BlockSchema as unknown as { _def: { schema: { options: { shape: { type: { value: string } } }[] } } })._def.schema;
  const appTypes = union.options.map((o) => o.shape.type.value).sort();
  const shared = JSON.parse(fs.readFileSync(path.join(REAL, 'block-types.json'), 'utf8')) as { blockTypes: string[] };
  assert.deepEqual([...shared.blockTypes].sort(), appTypes, 'curriculum/block-types.json must list exactly the BlockSchema types');
});

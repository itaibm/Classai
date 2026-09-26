/**
 * Migration v4 (curriculum re-anchor): an old-era learner's data moves to the
 * new year numbering without misattributing progress. Runs against a temp copy
 * of the real Year 1 lessons + ID map, so the repo is never touched.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'classai-mig-'));
process.env.CLASSAI_DATA_DIR = path.join(TMP, 'data');
const REPO_CUR = path.resolve('curriculum');
const CUR = path.join(TMP, 'curriculum');
fs.cpSync(path.join(REPO_CUR, 'year-1'), path.join(CUR, 'year-1'), { recursive: true });
fs.mkdirSync(path.join(CUR, 'year-0', 'maths'), { recursive: true });

test('v4 moves an old-era learner to the re-anchored years', async () => {
  await import('./index.ts'); // creates a fresh schema (v4, empty)
  const { DatabaseSync } = await import('node:sqlite');
  const { migrateYearsV4 } = await import('./migrate-years.ts');
  const db = new DatabaseSync(path.join(TMP, 'data', 'classai.sqlite'));
  db.exec('PRAGMA foreign_keys = OFF;');

  // --- an old-era learner: enrolled in old Year 2 maths + old Year 3 history-geography
  db.exec(`INSERT INTO kids VALUES ('k','Maya',7,'Year 2','[]','{}','t');
    INSERT INTO school_years VALUES ('cur-year-2','Year 2',2,'t'), ('cur-year-3','Year 3',3,'t');
    INSERT INTO classes VALUES ('cur:y2-maths','cur-year-2','Year 2','Mathematics','maths','Mathematics','Year 2 Mathematics — from the curriculum.','t','t'),
      ('cur:y3-history-geography','cur-year-3','Year 3','History & Geography','general','History & Geography','Year 3 History & Geography — from the curriculum.','t','t');
    INSERT INTO enrollments VALUES ('e1','cur:y2-maths','k','t'), ('e2','cur:y3-history-geography','k','t');`);
  const session = (id: string, classId: string, lessonId: string) =>
    db.prepare(`INSERT INTO sessions VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      id, 'k', classId, lessonId, JSON.stringify({ id: lessonId, curriculumId: lessonId, year: Number(lessonId[1]), title: id }),
      'Mathematics', 'topic', 'ended', '2026-09-01', '2026-09-01', '[]', JSON.stringify({ lessonMastery: 0.9 }), null
    );
  session('s-authored-moved', 'cur:y2-maths', 'y2-maths-u2-l06'); // hand-built, renumbered in Year 1
  session('s-authored-kept', 'cur:y2-maths', 'y2-maths-u1-l01'); // hand-built, same slot
  session('s-outline', 'cur:y3-history-geography', 'y3-history-u1-l01'); // outline slot the new plan rewrote
  session('s-foundation', 'cur:y2-maths', 'y1-maths-u1-l02'); // old Year 1 = Foundation (unchanged)

  // A lesson the old generator wrote into curriculum/ (no .md pair).
  const stray = path.join(CUR, 'year-1', 'maths', 'lessons', 'lesson-99-generated.json');
  fs.writeFileSync(stray, JSON.stringify({ id: 'y1-maths-u9-l99' }));

  db.exec('BEGIN');
  migrateYearsV4(db, { curriculumDir: CUR, dataDir: path.join(TMP, 'data') });
  db.exec('COMMIT');

  const classes = db.prepare('SELECT id, yearId, yearName, title FROM classes ORDER BY id').all() as any[];
  assert.deepEqual(classes.map((c) => c.id), ['cur:y1-maths', 'cur:y2-history']);
  assert.equal(classes[0].yearName, 'Year 1');
  assert.equal(classes[1].title, 'History', 'retired history-geography maps to history');
  const enrolled = (db.prepare('SELECT classId FROM enrollments ORDER BY classId').all() as any[]).map((e) => e.classId);
  assert.deepEqual(enrolled, ['cur:y1-maths', 'cur:y2-history'], 'enrollments follow the child\'s age');
  assert.deepEqual((db.prepare('SELECT id FROM school_years ORDER BY id').all() as any[]).map((y) => y.id), ['cur-year-1', 'cur-year-2']);

  const idOf = (sid: string) => {
    const r = db.prepare('SELECT lessonId, lessonSnapshot, classId FROM sessions WHERE id=?').get(sid) as any;
    return { lessonId: r.lessonId, snap: JSON.parse(r.lessonSnapshot), classId: r.classId };
  };
  const moved = idOf('s-authored-moved');
  assert.equal(moved.lessonId, 'y1-maths-u2-l27', 'shifted, then renumbered via ID-MAP');
  assert.equal(moved.snap.curriculumId, 'y1-maths-u2-l27');
  assert.equal(moved.classId, 'cur:y1-maths');
  assert.equal(idOf('s-authored-kept').lessonId, 'y1-maths-u1-l01');
  assert.equal(idOf('s-outline').snap.curriculumId, 'legacy:y3-history-u1-l01', 'rewritten slot is not credited to a different lesson');
  assert.equal(idOf('s-foundation').lessonId, 'y0-maths-u1-l02', 'Foundation keeps its lessons');

  assert.ok(!fs.existsSync(stray), 'stray generated lesson moved out of curriculum/');
  assert.ok(fs.existsSync(path.join(TMP, 'data', 'generated-legacy', 'year-1', 'maths', 'lessons', 'lesson-99-generated.json')));
  assert.ok(fs.readdirSync(path.join(CUR, 'year-1', 'maths', 'lessons')).length > 10, 'hand-built lessons stay');
});

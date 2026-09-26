/**
 * Migration v4 — the curriculum was re-anchored to the charter's ages (2026-09):
 * old UK-style Year N content became Year N-1 (old Year 1 → Foundation, year 0),
 * Years 1–5 got new full-year plans and Year 6 is new. This moves a learner's
 * existing data to the new numbering without misattributing progress:
 *
 *  - Class enrollments follow the child's age: `cur:y2-maths` (ages 6–7) becomes
 *    `cur:y1-maths` (still ages 6–7). The retired `history-geography` subject maps
 *    to `history` (except in Foundation, which keeps it).
 *  - Sessions keep their meaning only where the lesson itself survived: hand-built
 *    lessons (shifted, then renumbered via curriculum/year-1/ID-MAP.json) and the
 *    unchanged Foundation year. Anything else pointed at a lesson slot the new plan
 *    rewrote, so it becomes `legacy:<old id>` — still in the parent's history, but
 *    never counted as "learned" for a different new lesson.
 *  - Lessons the old generator wrote into curriculum/ (json without a .md pair)
 *    no longer match the rewritten outlines; they are moved to
 *    DATA_DIR/generated-legacy/ for reference and rebuilt from the new plan on demand.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { DatabaseSync } from 'node:sqlite';

const yearName = (n: number) => (n === 0 ? 'Foundation' : `Year ${n}`);

function lessonFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  return (fs.readdirSync(root, { recursive: true }) as string[])
    .map((f) => path.join(root, f))
    .filter((f) => f.endsWith('.json') && path.basename(path.dirname(f)) === 'lessons');
}

/** Ids of hand-built lessons (a .json with its .md pair) in the new curriculum. */
function authoredIds(curriculumDir: string): Set<string> {
  const ids = new Set<string>();
  for (const f of lessonFiles(curriculumDir)) {
    if (!fs.existsSync(f.replace(/\.json$/, '.md'))) continue;
    try {
      const id = JSON.parse(fs.readFileSync(f, 'utf8')).id;
      if (typeof id === 'string') ids.add(id);
    } catch {
      /* unreadable file: not a lesson */
    }
  }
  return ids;
}

export function makeLessonIdMapper(curriculumDir: string): (oldId: string) => string {
  const authored = authoredIds(curriculumDir);
  let idMap: Record<string, string> = {};
  try {
    idMap = JSON.parse(fs.readFileSync(path.join(curriculumDir, 'year-1', 'ID-MAP.json'), 'utf8'));
  } catch {
    /* no renumbering */
  }
  return (oldId: string) => {
    const m = /^y(\d+)-(.+)$/.exec(oldId);
    if (!m) return oldId; // not a catalog id (e.g. a library lesson)
    const n = Number(m[1]);
    if (n < 1) return oldId;
    let shifted = `y${n - 1}-${m[2]}`;
    if (n - 1 === 1 && idMap[shifted]) shifted = idMap[shifted]!; // applied once, not repeatedly
    return authored.has(shifted) || n - 1 === 0 ? shifted : `legacy:${oldId}`;
  };
}

function newClassId(oldId: string): string | null {
  const m = /^cur:y(\d+)-(.+)$/.exec(oldId);
  if (!m || Number(m[1]) < 1) return null;
  const year = Number(m[1]) - 1;
  const subject = m[2] === 'history-geography' && year > 0 ? 'history' : m[2]!;
  return `cur:y${year}-${subject}`;
}

const CLASS_REF_TABLES = ['enrollments', 'sessions', 'knowledge_materials', 'ai_suggestions', 'curriculum_attachments', 'class_topics', 'lesson_blueprints'];

export function migrateYearsV4(db: DatabaseSync, dirs: { curriculumDir: string; dataDir: string }): void {
  const tables = new Set((db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`).all() as Array<{ name: string }>).map((t) => t.name));

  // ---- school years + classes, lowest year first so ids never collide -------
  const years = (db.prepare(`SELECT id FROM school_years WHERE id LIKE 'cur-year-%'`).all() as Array<{ id: string }>)
    .map((r) => ({ id: r.id, n: Number(r.id.replace('cur-year-', '')) }))
    .filter((y) => Number.isInteger(y.n) && y.n >= 1)
    .sort((a, b) => a.n - b.n);
  for (const y of years) {
    const to = `cur-year-${y.n - 1}`;
    if (db.prepare('SELECT 1 FROM school_years WHERE id=?').get(to)) {
      db.prepare('UPDATE classes SET yearId=? WHERE yearId=?').run(to, y.id);
      db.prepare('DELETE FROM school_years WHERE id=?').run(y.id);
    } else {
      db.prepare('UPDATE school_years SET id=?, name=?, "order"=? WHERE id=?').run(to, yearName(y.n - 1), y.n - 1, y.id);
      db.prepare('UPDATE classes SET yearId=? WHERE yearId=?').run(to, y.id);
    }
  }

  const classes = (db.prepare(`SELECT id, subject FROM classes WHERE id LIKE 'cur:y%'`).all() as Array<{ id: string; subject: string }>)
    .map((c) => ({ ...c, to: newClassId(c.id), n: Number(/^cur:y(\d+)-/.exec(c.id)?.[1]) }))
    .filter((c): c is typeof c & { to: string } => c.to !== null)
    .sort((a, b) => a.n - b.n);
  for (const c of classes) {
    const year = c.n - 1;
    const merge = !!db.prepare('SELECT 1 FROM classes WHERE id=?').get(c.to);
    for (const t of CLASS_REF_TABLES) {
      if (!tables.has(t)) continue;
      if (t === 'enrollments') {
        // UNIQUE(classId, kidId): keep one enrollment when two old classes merge.
        db.prepare(`UPDATE OR IGNORE enrollments SET classId=? WHERE classId=?`).run(c.to, c.id);
        db.prepare(`DELETE FROM enrollments WHERE classId=?`).run(c.id);
      } else {
        db.prepare(`UPDATE ${t} SET classId=? WHERE classId=?`).run(c.to, c.id);
      }
    }
    if (merge) {
      db.prepare('DELETE FROM classes WHERE id=?').run(c.id);
    } else {
      const subject = c.to.replace(/^cur:y\d+-/, '');
      const label = subject === 'history' && /history-geography/.test(c.id) ? 'History' : null;
      db.prepare(`UPDATE classes SET id=?, yearId=?, yearName=?,
          title=COALESCE(?, title),
          description=REPLACE(REPLACE(description, 'History & Geography', COALESCE(?, 'History & Geography')), ?, ?)
        WHERE id=?`).run(c.to, `cur-year-${year}`, yearName(year), label, label, yearName(c.n), yearName(year), c.id);
    }
  }

  // ---- sessions: lesson ids in the column and the stored snapshot ------------
  const mapId = makeLessonIdMapper(dirs.curriculumDir);
  const rows = db.prepare('SELECT id, lessonId, lessonSnapshot FROM sessions').all() as Array<{ id: string; lessonId: string; lessonSnapshot: string }>;
  const update = db.prepare('UPDATE sessions SET lessonId=?, lessonSnapshot=? WHERE id=?');
  for (const r of rows) {
    let snap: Record<string, unknown>;
    try {
      snap = JSON.parse(r.lessonSnapshot);
    } catch {
      continue;
    }
    const lessonId = mapId(r.lessonId);
    let changed = lessonId !== r.lessonId;
    for (const key of ['id', 'curriculumId'] as const) {
      const v = snap[key];
      if (typeof v === 'string') {
        const nv = mapId(v);
        if (nv !== v) {
          snap[key] = nv;
          changed = true;
        }
      }
    }
    if (typeof snap.year === 'number' && snap.year >= 1 && typeof snap.curriculumId === 'string' && !String(snap.curriculumId).startsWith('legacy:')) {
      snap.year = snap.year - 1;
    }
    if (changed) update.run(lessonId, JSON.stringify(snap), r.id);
  }

  // ---- legacy generated lessons inside curriculum/ ---------------------------
  const legacyRoot = path.join(dirs.dataDir, 'generated-legacy');
  for (const f of lessonFiles(dirs.curriculumDir)) {
    if (fs.existsSync(f.replace(/\.json$/, '.md'))) continue; // hand-built: keep
    const rel = path.relative(dirs.curriculumDir, f);
    const dest = path.join(legacyRoot, rel);
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.renameSync(f, dest);
    } catch {
      /* best effort: a read-only checkout just keeps the file */
    }
  }
}

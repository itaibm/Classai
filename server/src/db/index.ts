/**
 * Data layer for Classai, built on Node 22's built-in `node:sqlite`
 * (zero native dependencies). Complex fields are stored as JSON text columns;
 * the repository functions hydrate them back into the shared types.
 */
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import type {
  Kid,
  Course,
  Curriculum,
  Topic,
  Lesson,
  LearnerModel,
  MemoryEpisode,
  Session
} from '../../../shared/types.ts';
import { DATA_DIR } from '../config.ts';

fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'classai.sqlite'));
db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
CREATE TABLE IF NOT EXISTS kids (
  id TEXT PRIMARY KEY, name TEXT, age INTEGER, gradeLevel TEXT,
  interests TEXT, avatar TEXT, createdAt TEXT
);
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY, kidId TEXT, subject TEXT, subjectKey TEXT, title TEXT,
  description TEXT, gradeLevel TEXT, createdAt TEXT
);
CREATE TABLE IF NOT EXISTS curricula (
  id TEXT PRIMARY KEY, courseId TEXT, kidId TEXT, source TEXT, rawText TEXT, createdAt TEXT
);
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY, courseId TEXT, kidId TEXT, title TEXT, summary TEXT,
  "order" INTEGER, estMinutes INTEGER, prerequisites TEXT
);
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY, kidId TEXT, courseId TEXT, topicId TEXT, kind TEXT,
  subject TEXT, topic TEXT, title TEXT, objectives TEXT, analysis TEXT, plan TEXT,
  difficulty TEXT, status TEXT, createdAt TEXT
);
CREATE TABLE IF NOT EXISTS learner_models (
  kidId TEXT PRIMARY KEY, summary TEXT, preferences TEXT, strengths TEXT,
  struggles TEXT, misconceptions TEXT, interests TEXT, topicMastery TEXT, updatedAt TEXT
);
CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY, kidId TEXT, kind TEXT, text TEXT, topic TEXT, createdAt TEXT
);
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY, kidId TEXT, courseId TEXT, lessonId TEXT, subject TEXT, topic TEXT,
  status TEXT, startedAt TEXT, endedAt TEXT, transcript TEXT, working TEXT, report TEXT
);
CREATE TABLE IF NOT EXISTS settings ( key TEXT PRIMARY KEY, value TEXT );
`);

// Lightweight migration for DBs created before the `analysis` column existed.
try {
  db.exec('ALTER TABLE lessons ADD COLUMN analysis TEXT');
} catch {
  /* column already exists */
}

const J = (v: unknown) => JSON.stringify(v ?? null);
const P = <T,>(v: unknown, fallback: T): T => {
  if (typeof v !== 'string') return fallback;
  try {
    const parsed = JSON.parse(v);
    return parsed == null ? fallback : (parsed as T);
  } catch {
    return fallback;
  }
};

// ---- kids -----------------------------------------------------------------

export const kids = {
  list: (): Kid[] =>
    db.prepare('SELECT * FROM kids ORDER BY createdAt').all().map(rowToKid),
  get(id: string): Kid | undefined {
    const r = db.prepare('SELECT * FROM kids WHERE id = ?').get(id);
    return r ? rowToKid(r) : undefined;
  },
  insert(k: Kid): Kid {
    db.prepare(
      'INSERT INTO kids (id,name,age,gradeLevel,interests,avatar,createdAt) VALUES (?,?,?,?,?,?,?)'
    ).run(k.id, k.name, k.age, k.gradeLevel, J(k.interests), J(k.avatar), k.createdAt);
    return k;
  },
  update(k: Kid): Kid {
    db.prepare(
      'UPDATE kids SET name=?,age=?,gradeLevel=?,interests=?,avatar=? WHERE id=?'
    ).run(k.name, k.age, k.gradeLevel, J(k.interests), J(k.avatar), k.id);
    return k;
  },
  remove: (id: string): void => void db.prepare('DELETE FROM kids WHERE id = ?').run(id)
};
function rowToKid(r: any): Kid {
  return {
    id: r.id,
    name: r.name,
    age: r.age,
    gradeLevel: r.gradeLevel,
    interests: P(r.interests, [] as string[]),
    avatar: P(r.avatar, { character: 'sage', hue: 200, voice: 'default', rate: 1 }),
    createdAt: r.createdAt
  };
}

// ---- courses --------------------------------------------------------------

export const courses = {
  listByKid: (kidId: string): Course[] =>
    db.prepare('SELECT * FROM courses WHERE kidId = ? ORDER BY createdAt').all(kidId).map(rowToCourse),
  get(id: string): Course | undefined {
    const r = db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
    return r ? rowToCourse(r) : undefined;
  },
  insert(c: Course): Course {
    db.prepare(
      'INSERT INTO courses (id,kidId,subject,subjectKey,title,description,gradeLevel,createdAt) VALUES (?,?,?,?,?,?,?,?)'
    ).run(c.id, c.kidId, c.subject, c.subjectKey, c.title, c.description, c.gradeLevel, c.createdAt);
    return c;
  },
  setSubjectKey: (id: string, subjectKey: string): void =>
    void db.prepare('UPDATE courses SET subjectKey = ? WHERE id = ?').run(subjectKey, id)
};
function rowToCourse(r: any): Course {
  return {
    id: r.id,
    kidId: r.kidId,
    subject: r.subject,
    subjectKey: r.subjectKey,
    title: r.title,
    description: r.description,
    gradeLevel: r.gradeLevel,
    createdAt: r.createdAt
  };
}

// ---- curricula & topics ---------------------------------------------------

export const curricula = {
  listByCourse: (courseId: string): Curriculum[] =>
    db.prepare('SELECT * FROM curricula WHERE courseId = ? ORDER BY createdAt').all(courseId) as unknown as Curriculum[],
  insert(c: Curriculum): Curriculum {
    db.prepare(
      'INSERT INTO curricula (id,courseId,kidId,source,rawText,createdAt) VALUES (?,?,?,?,?,?)'
    ).run(c.id, c.courseId, c.kidId, c.source, c.rawText, c.createdAt);
    return c;
  }
};

export const topics = {
  listByCourse: (courseId: string): Topic[] =>
    db.prepare('SELECT * FROM topics WHERE courseId = ? ORDER BY "order"').all(courseId).map(rowToTopic),
  get(id: string): Topic | undefined {
    const r = db.prepare('SELECT * FROM topics WHERE id = ?').get(id);
    return r ? rowToTopic(r) : undefined;
  },
  insertMany(list: Topic[]): void {
    const stmt = db.prepare(
      'INSERT INTO topics (id,courseId,kidId,title,summary,"order",estMinutes,prerequisites) VALUES (?,?,?,?,?,?,?,?)'
    );
    for (const t of list)
      stmt.run(t.id, t.courseId, t.kidId, t.title, t.summary, t.order, t.estMinutes, J(t.prerequisites));
  },
  clearCourse: (courseId: string): void =>
    void db.prepare('DELETE FROM topics WHERE courseId = ?').run(courseId)
};
function rowToTopic(r: any): Topic {
  return {
    id: r.id,
    courseId: r.courseId,
    kidId: r.kidId,
    title: r.title,
    summary: r.summary,
    order: r.order,
    estMinutes: r.estMinutes,
    prerequisites: P(r.prerequisites, [] as string[])
  };
}

// ---- lessons --------------------------------------------------------------

export const lessons = {
  listByKid: (kidId: string): Lesson[] =>
    db.prepare('SELECT * FROM lessons WHERE kidId = ? ORDER BY createdAt DESC').all(kidId).map(rowToLesson),
  listByCourse: (courseId: string): Lesson[] =>
    db.prepare('SELECT * FROM lessons WHERE courseId = ? ORDER BY createdAt DESC').all(courseId).map(rowToLesson),
  get(id: string): Lesson | undefined {
    const r = db.prepare('SELECT * FROM lessons WHERE id = ?').get(id);
    return r ? rowToLesson(r) : undefined;
  },
  insert(l: Lesson): Lesson {
    db.prepare(
      'INSERT INTO lessons (id,kidId,courseId,topicId,kind,subject,topic,title,objectives,analysis,plan,difficulty,status,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    ).run(
      l.id, l.kidId, l.courseId, l.topicId, l.kind, l.subject, l.topic, l.title,
      J(l.objectives), J(l.analysis ?? null), J(l.plan), l.difficulty, l.status, l.createdAt
    );
    return l;
  },
  setStatus: (id: string, status: Lesson['status']): void =>
    void db.prepare('UPDATE lessons SET status = ? WHERE id = ?').run(status, id)
};
function rowToLesson(r: any): Lesson {
  return {
    id: r.id,
    kidId: r.kidId,
    courseId: r.courseId,
    topicId: r.topicId,
    kind: r.kind,
    subject: r.subject,
    topic: r.topic,
    title: r.title,
    objectives: P(r.objectives, [] as string[]),
    analysis: P(r.analysis, undefined as Lesson['analysis']),
    plan: P(r.plan, [] as Lesson['plan']),
    difficulty: r.difficulty,
    status: r.status,
    createdAt: r.createdAt
  };
}

// ---- learner model (long-term memory) -------------------------------------

export const learnerModels = {
  get(kidId: string): LearnerModel | undefined {
    const r = db.prepare('SELECT * FROM learner_models WHERE kidId = ?').get(kidId);
    return r ? rowToLearner(r) : undefined;
  },
  upsert(m: LearnerModel): LearnerModel {
    db.prepare(
      `INSERT INTO learner_models (kidId,summary,preferences,strengths,struggles,misconceptions,interests,topicMastery,updatedAt)
       VALUES (?,?,?,?,?,?,?,?,?)
       ON CONFLICT(kidId) DO UPDATE SET
         summary=excluded.summary, preferences=excluded.preferences,
         strengths=excluded.strengths, struggles=excluded.struggles,
         misconceptions=excluded.misconceptions, interests=excluded.interests,
         topicMastery=excluded.topicMastery, updatedAt=excluded.updatedAt`
    ).run(
      m.kidId, m.summary, m.preferences, J(m.strengths), J(m.struggles),
      J(m.misconceptions), J(m.interests), J(m.topicMastery), m.updatedAt
    );
    return m;
  }
};
function rowToLearner(r: any): LearnerModel {
  return {
    kidId: r.kidId,
    summary: r.summary || '',
    preferences: r.preferences || '',
    strengths: P(r.strengths, [] as string[]),
    struggles: P(r.struggles, [] as string[]),
    misconceptions: P(r.misconceptions, [] as string[]),
    interests: P(r.interests, [] as string[]),
    topicMastery: P(r.topicMastery, {} as LearnerModel['topicMastery']),
    updatedAt: r.updatedAt
  };
}

// ---- episodes -------------------------------------------------------------

export const episodes = {
  listByKid: (kidId: string, limit = 200): MemoryEpisode[] =>
    db.prepare('SELECT * FROM episodes WHERE kidId = ? ORDER BY createdAt DESC LIMIT ?').all(kidId, limit) as unknown as MemoryEpisode[],
  insert(e: MemoryEpisode): MemoryEpisode {
    db.prepare('INSERT INTO episodes (id,kidId,kind,text,topic,createdAt) VALUES (?,?,?,?,?,?)').run(
      e.id, e.kidId, e.kind, e.text, e.topic ?? null, e.createdAt
    );
    return e;
  }
};

// ---- sessions -------------------------------------------------------------

export const sessions = {
  get(id: string): Session | undefined {
    const r = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
    return r ? rowToSession(r) : undefined;
  },
  listByKid: (kidId: string): Session[] =>
    db.prepare('SELECT * FROM sessions WHERE kidId = ? ORDER BY startedAt DESC').all(kidId).map(rowToSession),
  insert(s: Session): Session {
    db.prepare(
      'INSERT INTO sessions (id,kidId,courseId,lessonId,subject,topic,status,startedAt,endedAt,transcript,working,report) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
    ).run(
      s.id, s.kidId, s.courseId, s.lessonId, s.subject, s.topic, s.status,
      s.startedAt, s.endedAt ?? null, J(s.transcript), J(s.working), J(s.report)
    );
    return s;
  },
  save(s: Session): Session {
    db.prepare(
      'UPDATE sessions SET status=?, endedAt=?, transcript=?, working=?, report=? WHERE id=?'
    ).run(s.status, s.endedAt ?? null, J(s.transcript), J(s.working), J(s.report), s.id);
    return s;
  }
};
function rowToSession(r: any): Session {
  return {
    id: r.id,
    kidId: r.kidId,
    courseId: r.courseId,
    lessonId: r.lessonId,
    subject: r.subject,
    topic: r.topic,
    status: r.status,
    startedAt: r.startedAt,
    endedAt: r.endedAt || undefined,
    transcript: P(r.transcript, [] as Session['transcript']),
    working: P(r.working, {
      focus: '', momentum: 'steady', lastEmotion: 'neutral', beatIndex: 0,
      turnsSinceCheck: 0, teacherTurns: 0, struggleStreak: 0, checksPassed: 0,
      checksTotal: 0, notes: [], observed: {}
    } as Session['working']),
    report: P(r.report, undefined as Session['report'])
  };
}

// ---- settings -------------------------------------------------------------

export const settings = {
  get(key: string): string | undefined {
    const r = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
    return r?.value;
  },
  set: (key: string, value: string): void =>
    void db.prepare(
      'INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value'
    ).run(key, value)
};

export default db;

/** Local SQLite repositories for the shared class library and learner state. */
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import type {
  AISuggestion,
  ClassDefinition,
  ClassEnrollment,
  CurriculumAttachment,
  Kid,
  KnowledgeMaterial,
  LearnerModel,
  Lesson,
  MemoryEpisode,
  SchoolYear,
  Session,
  Topic
} from '../../../shared/types.ts';
import { DATA_DIR } from '../config.ts';

fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'classai.sqlite'));
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

const version = (db.prepare('PRAGMA user_version').get() as { user_version: number }).user_version;
if (version < 2) {
  db.exec('PRAGMA foreign_keys = OFF;');
  db.exec(`
    DROP TABLE IF EXISTS ai_suggestions;
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS episodes;
    DROP TABLE IF EXISTS learner_models;
    DROP TABLE IF EXISTS lessons;
    DROP TABLE IF EXISTS lesson_blueprints;
    DROP TABLE IF EXISTS topics;
    DROP TABLE IF EXISTS class_topics;
    DROP TABLE IF EXISTS curricula;
    DROP TABLE IF EXISTS knowledge_materials;
    DROP TABLE IF EXISTS enrollments;
    DROP TABLE IF EXISTS courses;
    DROP TABLE IF EXISTS classes;
    DROP TABLE IF EXISTS school_years;
    DROP TABLE IF EXISTS kids;
    DROP TABLE IF EXISTS settings;
  `);
  db.exec('PRAGMA foreign_keys = ON;');
}

db.exec(`
CREATE TABLE IF NOT EXISTS school_years (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, "order" INTEGER NOT NULL, createdAt TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY, yearId TEXT NOT NULL, yearName TEXT NOT NULL,
  subject TEXT NOT NULL, subjectKey TEXT NOT NULL, title TEXT NOT NULL,
  description TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL,
  FOREIGN KEY(yearId) REFERENCES school_years(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS kids (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, age INTEGER NOT NULL, gradeLevel TEXT NOT NULL,
  interests TEXT NOT NULL, avatar TEXT NOT NULL, createdAt TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY, classId TEXT NOT NULL, kidId TEXT NOT NULL, createdAt TEXT NOT NULL,
  UNIQUE(classId, kidId),
  FOREIGN KEY(classId) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY(kidId) REFERENCES kids(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS knowledge_materials (
  id TEXT PRIMARY KEY, classId TEXT NOT NULL, lessonId TEXT,
  title TEXT NOT NULL, source TEXT NOT NULL, rawText TEXT NOT NULL,
  status TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL,
  FOREIGN KEY(classId) REFERENCES classes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS class_topics (
  id TEXT PRIMARY KEY, classId TEXT NOT NULL, title TEXT NOT NULL, summary TEXT NOT NULL,
  "order" INTEGER NOT NULL, estMinutes INTEGER NOT NULL, prerequisites TEXT NOT NULL,
  FOREIGN KEY(classId) REFERENCES classes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS lesson_blueprints (
  id TEXT PRIMARY KEY, classId TEXT NOT NULL, familyId TEXT NOT NULL, revision INTEGER NOT NULL,
  topicId TEXT NOT NULL, kind TEXT NOT NULL, subject TEXT NOT NULL, topic TEXT NOT NULL,
  title TEXT NOT NULL, objectives TEXT NOT NULL, analysis TEXT, plan TEXT NOT NULL,
  difficulty TEXT NOT NULL, status TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL,
  UNIQUE(familyId, revision),
  FOREIGN KEY(classId) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY(topicId) REFERENCES class_topics(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS learner_models (
  kidId TEXT PRIMARY KEY, summary TEXT NOT NULL, preferences TEXT NOT NULL, strengths TEXT NOT NULL,
  struggles TEXT NOT NULL, misconceptions TEXT NOT NULL, interests TEXT NOT NULL,
  topicMastery TEXT NOT NULL, updatedAt TEXT NOT NULL,
  FOREIGN KEY(kidId) REFERENCES kids(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY, kidId TEXT NOT NULL, kind TEXT NOT NULL, text TEXT NOT NULL,
  topic TEXT, createdAt TEXT NOT NULL,
  FOREIGN KEY(kidId) REFERENCES kids(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY, kidId TEXT NOT NULL, classId TEXT NOT NULL, lessonId TEXT NOT NULL,
  lessonSnapshot TEXT NOT NULL, subject TEXT NOT NULL, topic TEXT NOT NULL,
  status TEXT NOT NULL, startedAt TEXT NOT NULL, endedAt TEXT,
  transcript TEXT NOT NULL, working TEXT NOT NULL, report TEXT,
  FOREIGN KEY(kidId) REFERENCES kids(id) ON DELETE CASCADE,
  FOREIGN KEY(classId) REFERENCES classes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS ai_suggestions (
  id TEXT PRIMARY KEY, classId TEXT NOT NULL, lessonId TEXT,
  sourceSessionId TEXT NOT NULL, sourceTurnTs TEXT NOT NULL,
  title TEXT NOT NULL, objective TEXT NOT NULL, block TEXT NOT NULL,
  status TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL,
  UNIQUE(sourceSessionId, sourceTurnTs),
  FOREIGN KEY(classId) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY(sourceSessionId) REFERENCES sessions(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS curriculum_attachments (
  id TEXT PRIMARY KEY, classId TEXT NOT NULL, curriculumId TEXT NOT NULL,
  contentHash TEXT NOT NULL, title TEXT NOT NULL, createdAt TEXT NOT NULL,
  UNIQUE(classId, curriculumId),
  FOREIGN KEY(classId) REFERENCES classes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
PRAGMA user_version = 2;
`);

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

export const kids = {
  list: (): Kid[] => db.prepare('SELECT * FROM kids ORDER BY createdAt').all().map(rowToKid),
  get(id: string): Kid | undefined {
    const row = db.prepare('SELECT * FROM kids WHERE id = ?').get(id);
    return row ? rowToKid(row) : undefined;
  },
  insert(kid: Kid): Kid {
    db.prepare('INSERT INTO kids (id,name,age,gradeLevel,interests,avatar,createdAt) VALUES (?,?,?,?,?,?,?)')
      .run(kid.id, kid.name, kid.age, kid.gradeLevel, J(kid.interests), J(kid.avatar), kid.createdAt);
    return kid;
  },
  update(kid: Kid): Kid {
    db.prepare('UPDATE kids SET name=?,age=?,gradeLevel=?,interests=?,avatar=? WHERE id=?')
      .run(kid.name, kid.age, kid.gradeLevel, J(kid.interests), J(kid.avatar), kid.id);
    return kid;
  },
  remove: (id: string): void => void db.prepare('DELETE FROM kids WHERE id = ?').run(id)
};

function rowToKid(row: any): Kid {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    gradeLevel: row.gradeLevel,
    interests: P(row.interests, [] as string[]),
    avatar: P(row.avatar, { character: 'sage', hue: 200, voice: 'default', rate: 1 }),
    createdAt: row.createdAt
  };
}

export const schoolYears = {
  list: (): SchoolYear[] => db.prepare('SELECT * FROM school_years ORDER BY "order", createdAt').all() as unknown as SchoolYear[],
  get(id: string): SchoolYear | undefined {
    return db.prepare('SELECT * FROM school_years WHERE id = ?').get(id) as unknown as SchoolYear | undefined;
  },
  insert(year: SchoolYear): SchoolYear {
    db.prepare('INSERT INTO school_years (id,name,"order",createdAt) VALUES (?,?,?,?)')
      .run(year.id, year.name, year.order, year.createdAt);
    return year;
  },
  update(year: SchoolYear): SchoolYear {
    db.prepare('UPDATE school_years SET name=?,"order"=? WHERE id=?').run(year.name, year.order, year.id);
    db.prepare('UPDATE classes SET yearName=?,updatedAt=? WHERE yearId=?')
      .run(year.name, new Date().toISOString(), year.id);
    return year;
  },
  remove: (id: string): void => void db.prepare('DELETE FROM school_years WHERE id = ?').run(id)
};

export const classes = {
  list: (): ClassDefinition[] => db.prepare('SELECT * FROM classes ORDER BY yearName,title').all().map(rowToClass),
  listByYear: (yearId: string): ClassDefinition[] =>
    db.prepare('SELECT * FROM classes WHERE yearId=? ORDER BY title').all(yearId).map(rowToClass),
  get(id: string): ClassDefinition | undefined {
    const row = db.prepare('SELECT * FROM classes WHERE id=?').get(id);
    return row ? rowToClass(row) : undefined;
  },
  insert(item: ClassDefinition): ClassDefinition {
    db.prepare('INSERT INTO classes (id,yearId,yearName,subject,subjectKey,title,description,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?)')
      .run(item.id, item.yearId, item.yearName, item.subject, item.subjectKey, item.title, item.description, item.createdAt, item.updatedAt);
    return item;
  },
  update(item: ClassDefinition): ClassDefinition {
    db.prepare('UPDATE classes SET yearId=?,yearName=?,subject=?,subjectKey=?,title=?,description=?,updatedAt=? WHERE id=?')
      .run(item.yearId, item.yearName, item.subject, item.subjectKey, item.title, item.description, item.updatedAt, item.id);
    return item;
  },
  setSubjectKey: (id: string, subjectKey: string): void =>
    void db.prepare('UPDATE classes SET subjectKey=?,updatedAt=? WHERE id=?').run(subjectKey, new Date().toISOString(), id),
  remove: (id: string): void => void db.prepare('DELETE FROM classes WHERE id=?').run(id)
};

function rowToClass(row: any): ClassDefinition {
  return {
    id: row.id,
    yearId: row.yearId,
    yearName: row.yearName,
    subject: row.subject,
    subjectKey: row.subjectKey,
    title: row.title,
    description: row.description,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

/** Compatibility export for prompt and memory code. */
export const courses = classes;

export const enrollments = {
  listByClass: (classId: string): ClassEnrollment[] =>
    db.prepare('SELECT * FROM enrollments WHERE classId=? ORDER BY createdAt').all(classId) as unknown as ClassEnrollment[],
  listByKid: (kidId: string): ClassEnrollment[] =>
    db.prepare('SELECT * FROM enrollments WHERE kidId=? ORDER BY createdAt').all(kidId) as unknown as ClassEnrollment[],
  get(classId: string, kidId: string): ClassEnrollment | undefined {
    return db.prepare('SELECT * FROM enrollments WHERE classId=? AND kidId=?').get(classId, kidId) as unknown as ClassEnrollment | undefined;
  },
  insert(enrollment: ClassEnrollment): ClassEnrollment {
    db.prepare('INSERT OR IGNORE INTO enrollments (id,classId,kidId,createdAt) VALUES (?,?,?,?)')
      .run(enrollment.id, enrollment.classId, enrollment.kidId, enrollment.createdAt);
    return this.get(enrollment.classId, enrollment.kidId) ?? enrollment;
  },
  remove: (classId: string, kidId: string): void =>
    void db.prepare('DELETE FROM enrollments WHERE classId=? AND kidId=?').run(classId, kidId)
};

export const knowledgeMaterials = {
  listByClass: (classId: string): KnowledgeMaterial[] =>
    db.prepare('SELECT * FROM knowledge_materials WHERE classId=? ORDER BY createdAt').all(classId).map(rowToMaterial),
  listByLesson: (lessonId: string): KnowledgeMaterial[] =>
    db.prepare('SELECT * FROM knowledge_materials WHERE lessonId=? ORDER BY createdAt').all(lessonId).map(rowToMaterial),
  get(id: string): KnowledgeMaterial | undefined {
    const row = db.prepare('SELECT * FROM knowledge_materials WHERE id=?').get(id);
    return row ? rowToMaterial(row) : undefined;
  },
  insert(item: KnowledgeMaterial): KnowledgeMaterial {
    db.prepare('INSERT INTO knowledge_materials (id,classId,lessonId,title,source,rawText,status,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?)')
      .run(item.id, item.classId, item.lessonId ?? null, item.title, item.source, item.rawText, item.status, item.createdAt, item.updatedAt);
    return item;
  },
  update(item: KnowledgeMaterial): KnowledgeMaterial {
    db.prepare('UPDATE knowledge_materials SET lessonId=?,title=?,source=?,rawText=?,status=?,updatedAt=? WHERE id=?')
      .run(item.lessonId ?? null, item.title, item.source, item.rawText, item.status, item.updatedAt, item.id);
    return item;
  },
  remove: (id: string): void => void db.prepare('DELETE FROM knowledge_materials WHERE id=?').run(id)
};

/** Compatibility export while old names are removed from call sites. */
export const curricula = {
  listByCourse: knowledgeMaterials.listByClass,
  insert: knowledgeMaterials.insert
};

function rowToMaterial(row: any): KnowledgeMaterial {
  return {
    id: row.id,
    classId: row.classId,
    lessonId: row.lessonId || undefined,
    title: row.title,
    source: row.source,
    rawText: row.rawText,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

export const topics = {
  listByClass: (classId: string): Topic[] =>
    db.prepare('SELECT * FROM class_topics WHERE classId=? ORDER BY "order"').all(classId).map(rowToTopic),
  listByCourse(classId: string): Topic[] { return this.listByClass(classId); },
  get(id: string): Topic | undefined {
    const row = db.prepare('SELECT * FROM class_topics WHERE id=?').get(id);
    return row ? rowToTopic(row) : undefined;
  },
  insertMany(items: Topic[]): void {
    const statement = db.prepare('INSERT INTO class_topics (id,classId,title,summary,"order",estMinutes,prerequisites) VALUES (?,?,?,?,?,?,?)');
    for (const item of items) {
      statement.run(item.id, item.classId, item.title, item.summary, item.order, item.estMinutes, J(item.prerequisites));
    }
  },
  clearClass: (classId: string): void => void db.prepare('DELETE FROM class_topics WHERE classId=?').run(classId),
  clearCourse(classId: string): void { this.clearClass(classId); }
};

function rowToTopic(row: any): Topic {
  return {
    id: row.id,
    classId: row.classId,
    title: row.title,
    summary: row.summary,
    order: row.order,
    estMinutes: row.estMinutes,
    prerequisites: P(row.prerequisites, [] as string[])
  };
}

export const lessons = {
  listByClass: (classId: string): Lesson[] =>
    db.prepare('SELECT * FROM lesson_blueprints WHERE classId=? ORDER BY createdAt DESC, revision DESC').all(classId).map(rowToLesson),
  listByCourse(classId: string): Lesson[] { return this.listByClass(classId); },
  listByTopic: (topicId: string): Lesson[] =>
    db.prepare('SELECT * FROM lesson_blueprints WHERE topicId=? ORDER BY revision DESC').all(topicId).map(rowToLesson),
  get(id: string): Lesson | undefined {
    const row = db.prepare('SELECT * FROM lesson_blueprints WHERE id=?').get(id);
    return row ? rowToLesson(row) : undefined;
  },
  latestRevision(familyId: string): number {
    const row = db.prepare('SELECT MAX(revision) AS revision FROM lesson_blueprints WHERE familyId=?').get(familyId) as { revision?: number };
    return row.revision ?? 0;
  },
  insert(item: Lesson): Lesson {
    db.prepare(`INSERT INTO lesson_blueprints
      (id,classId,familyId,revision,topicId,kind,subject,topic,title,objectives,analysis,plan,difficulty,status,createdAt,updatedAt)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .run(item.id, item.classId, item.familyId, item.revision, item.topicId, item.kind, item.subject, item.topic,
        item.title, J(item.objectives), J(item.analysis ?? null), J(item.plan), item.difficulty, item.status, item.createdAt, item.updatedAt);
    return item;
  },
  update(item: Lesson): Lesson {
    db.prepare(`UPDATE lesson_blueprints SET topicId=?,kind=?,subject=?,topic=?,title=?,objectives=?,analysis=?,plan=?,difficulty=?,updatedAt=? WHERE id=?`)
      .run(item.topicId, item.kind, item.subject, item.topic, item.title, J(item.objectives), J(item.analysis ?? null), J(item.plan), item.difficulty, item.updatedAt, item.id);
    return item;
  },
  setStatus(id: string, status: Lesson['status']): void {
    db.prepare('UPDATE lesson_blueprints SET status=?,updatedAt=? WHERE id=?').run(status, new Date().toISOString(), id);
  },
  approve(item: Lesson): Lesson {
    db.exec('BEGIN IMMEDIATE;');
    try {
      db.prepare("UPDATE lesson_blueprints SET status='archived',updatedAt=? WHERE familyId=? AND status='approved'")
        .run(new Date().toISOString(), item.familyId);
      this.setStatus(item.id, 'approved');
      db.exec('COMMIT;');
      return { ...item, status: 'approved', updatedAt: new Date().toISOString() };
    } catch (error) {
      db.exec('ROLLBACK;');
      throw error;
    }
  },
  hasSessions(id: string): boolean {
    const row = db.prepare('SELECT 1 AS found FROM sessions WHERE lessonId=? LIMIT 1').get(id) as { found: number } | undefined;
    return Boolean(row);
  },
  remove: (id: string): void => void db.prepare('DELETE FROM lesson_blueprints WHERE id=?').run(id)
};

function rowToLesson(row: any): Lesson {
  return {
    id: row.id,
    classId: row.classId,
    familyId: row.familyId,
    revision: row.revision,
    topicId: row.topicId,
    kind: row.kind,
    subject: row.subject,
    topic: row.topic,
    title: row.title,
    objectives: P(row.objectives, [] as string[]),
    analysis: P(row.analysis, undefined as Lesson['analysis']),
    plan: P(row.plan, [] as Lesson['plan']),
    difficulty: row.difficulty,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

export const aiSuggestions = {
  listByClass: (classId: string): AISuggestion[] =>
    db.prepare('SELECT * FROM ai_suggestions WHERE classId=? ORDER BY createdAt DESC').all(classId).map(rowToSuggestion),
  get(id: string): AISuggestion | undefined {
    const row = db.prepare('SELECT * FROM ai_suggestions WHERE id=?').get(id);
    return row ? rowToSuggestion(row) : undefined;
  },
  insert(item: AISuggestion): AISuggestion {
    db.prepare(`INSERT OR IGNORE INTO ai_suggestions
      (id,classId,lessonId,sourceSessionId,sourceTurnTs,title,objective,block,status,createdAt,updatedAt)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
      .run(item.id, item.classId, item.lessonId ?? null, item.sourceSessionId, item.sourceTurnTs,
        item.title, item.objective, J(item.block), item.status, item.createdAt, item.updatedAt);
    const saved = db.prepare('SELECT * FROM ai_suggestions WHERE sourceSessionId=? AND sourceTurnTs=?')
      .get(item.sourceSessionId, item.sourceTurnTs);
    return saved ? rowToSuggestion(saved) : item;
  },
  update(item: AISuggestion): AISuggestion {
    db.prepare('UPDATE ai_suggestions SET lessonId=?,title=?,objective=?,block=?,status=?,updatedAt=? WHERE id=?')
      .run(item.lessonId ?? null, item.title, item.objective, J(item.block), item.status, item.updatedAt, item.id);
    return item;
  },
  remove: (id: string): void => void db.prepare('DELETE FROM ai_suggestions WHERE id=?').run(id)
};

function rowToSuggestion(row: any): AISuggestion {
  return {
    id: row.id,
    classId: row.classId,
    lessonId: row.lessonId || undefined,
    sourceSessionId: row.sourceSessionId,
    sourceTurnTs: row.sourceTurnTs,
    title: row.title,
    objective: row.objective,
    block: P(row.block, { type: 'shortText', prompt: '' } as AISuggestion['block']),
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

export const learnerModels = {
  get(kidId: string): LearnerModel | undefined {
    const row = db.prepare('SELECT * FROM learner_models WHERE kidId=?').get(kidId);
    return row ? rowToLearner(row) : undefined;
  },
  upsert(model: LearnerModel): LearnerModel {
    db.prepare(`INSERT INTO learner_models
      (kidId,summary,preferences,strengths,struggles,misconceptions,interests,topicMastery,updatedAt)
      VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(kidId) DO UPDATE SET
      summary=excluded.summary,preferences=excluded.preferences,strengths=excluded.strengths,
      struggles=excluded.struggles,misconceptions=excluded.misconceptions,interests=excluded.interests,
      topicMastery=excluded.topicMastery,updatedAt=excluded.updatedAt`)
      .run(model.kidId, model.summary, model.preferences, J(model.strengths), J(model.struggles),
        J(model.misconceptions), J(model.interests), J(model.topicMastery), model.updatedAt);
    return model;
  }
};

function rowToLearner(row: any): LearnerModel {
  return {
    kidId: row.kidId,
    summary: row.summary || '',
    preferences: row.preferences || '',
    strengths: P(row.strengths, [] as string[]),
    struggles: P(row.struggles, [] as string[]),
    misconceptions: P(row.misconceptions, [] as string[]),
    interests: P(row.interests, [] as string[]),
    topicMastery: P(row.topicMastery, {} as LearnerModel['topicMastery']),
    updatedAt: row.updatedAt
  };
}

export const episodes = {
  listByKid: (kidId: string, limit = 200): MemoryEpisode[] =>
    db.prepare('SELECT * FROM episodes WHERE kidId=? ORDER BY createdAt DESC LIMIT ?').all(kidId, limit) as unknown as MemoryEpisode[],
  insert(item: MemoryEpisode): MemoryEpisode {
    db.prepare('INSERT INTO episodes (id,kidId,kind,text,topic,createdAt) VALUES (?,?,?,?,?,?)')
      .run(item.id, item.kidId, item.kind, item.text, item.topic ?? null, item.createdAt);
    return item;
  }
};

export const sessions = {
  get(id: string): Session | undefined {
    const row = db.prepare('SELECT * FROM sessions WHERE id=?').get(id);
    return row ? rowToSession(row) : undefined;
  },
  listByKid: (kidId: string): Session[] =>
    db.prepare('SELECT * FROM sessions WHERE kidId=? ORDER BY startedAt DESC').all(kidId).map(rowToSession),
  insert(item: Session): Session {
    db.prepare(`INSERT INTO sessions
      (id,kidId,classId,lessonId,lessonSnapshot,subject,topic,status,startedAt,endedAt,transcript,working,report)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .run(item.id, item.kidId, item.classId, item.lessonId, J(item.lessonSnapshot), item.subject, item.topic,
        item.status, item.startedAt, item.endedAt ?? null, J(item.transcript), J(item.working), J(item.report));
    return item;
  },
  save(item: Session): Session {
    db.prepare('UPDATE sessions SET status=?,endedAt=?,transcript=?,working=?,report=? WHERE id=?')
      .run(item.status, item.endedAt ?? null, J(item.transcript), J(item.working), J(item.report), item.id);
    return item;
  }
};

function rowToSession(row: any): Session {
  const lessonSnapshot = P(row.lessonSnapshot, {} as Lesson);
  return {
    id: row.id,
    kidId: row.kidId,
    classId: row.classId,
    lessonId: row.lessonId,
    lessonSnapshot,
    // Derived from the snapshot (which carries it for authored lessons) so no
    // schema migration is needed to surface it in reports/history.
    curriculumId: (lessonSnapshot as { curriculumId?: string }).curriculumId,
    subject: row.subject,
    topic: row.topic,
    status: row.status,
    startedAt: row.startedAt,
    endedAt: row.endedAt || undefined,
    transcript: P(row.transcript, [] as Session['transcript']),
    working: P(row.working, {
      focus: '', momentum: 'steady', lastEmotion: 'neutral', beatIndex: 0,
      turnsSinceCheck: 0, teacherTurns: 0, struggleStreak: 0, checksPassed: 0,
      checksTotal: 0, notes: [], observed: {}
    } as Session['working']),
    report: P(row.report, undefined as Session['report'])
  };
}

export const curriculumAttachments = {
  listByClass: (classId: string): CurriculumAttachment[] =>
    db.prepare('SELECT * FROM curriculum_attachments WHERE classId=? ORDER BY createdAt')
      .all(classId) as unknown as CurriculumAttachment[],
  get(id: string): CurriculumAttachment | undefined {
    return db.prepare('SELECT * FROM curriculum_attachments WHERE id=?').get(id) as unknown as
      | CurriculumAttachment
      | undefined;
  },
  getByClassAndCurriculum(classId: string, curriculumId: string): CurriculumAttachment | undefined {
    return db.prepare('SELECT * FROM curriculum_attachments WHERE classId=? AND curriculumId=?')
      .get(classId, curriculumId) as unknown as CurriculumAttachment | undefined;
  },
  insert(item: CurriculumAttachment): CurriculumAttachment {
    db.prepare('INSERT OR IGNORE INTO curriculum_attachments (id,classId,curriculumId,contentHash,title,createdAt) VALUES (?,?,?,?,?,?)')
      .run(item.id, item.classId, item.curriculumId, item.contentHash, item.title, item.createdAt);
    return this.getByClassAndCurriculum(item.classId, item.curriculumId) ?? item;
  },
  remove: (id: string): void => void db.prepare('DELETE FROM curriculum_attachments WHERE id=?').run(id)
};

export const settings = {
  get(key: string): string | undefined {
    const row = db.prepare('SELECT value FROM settings WHERE key=?').get(key) as { value: string } | undefined;
    return row?.value;
  },
  set(key: string, value: string): void {
    db.prepare('INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value')
      .run(key, value);
  }
};

export default db;

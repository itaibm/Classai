/** Parent-owned class library: years, classes, materials, enrollment, and topics. */
import { nanoid } from 'nanoid';
import type {
  ClassDefinition,
  ClassEnrollment,
  KnowledgeMaterial,
  SchoolYear,
  Topic
} from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { getBrain } from '../ai/provider.ts';
import { generateStructured, SyllabusSchema } from '../ai/schemas.ts';
import { syllabusPrompt } from '../ai/prompts.ts';
import { resolveSubjectKey } from '../ai/subjects.ts';

const now = () => new Date().toISOString();

export function createSchoolYear(input: { name: string; order?: number }): SchoolYear {
  const name = input.name.trim();
  if (!name) throw new Error('year name required');
  const years = db.schoolYears.list();
  if (years.some((year) => year.name.toLowerCase() === name.toLowerCase())) throw new Error('year already exists');
  return db.schoolYears.insert({
    id: nanoid(),
    name,
    order: input.order ?? years.length,
    createdAt: now()
  });
}

export function createClass(input: {
  yearId: string;
  subject: string;
  title?: string;
  description?: string;
}): ClassDefinition {
  const year = db.schoolYears.get(input.yearId);
  if (!year) throw new Error('year not found');
  const subject = input.subject.trim();
  if (!subject) throw new Error('subject required');
  const timestamp = now();
  return db.classes.insert({
    id: nanoid(),
    yearId: year.id,
    yearName: year.name,
    subject,
    subjectKey: resolveSubjectKey(subject),
    title: input.title?.trim() || subject,
    description: input.description?.trim() || '',
    createdAt: timestamp,
    updatedAt: timestamp
  });
}

export function updateClass(item: ClassDefinition, input: Partial<Pick<ClassDefinition, 'yearId' | 'subject' | 'title' | 'description'>>): ClassDefinition {
  const year = input.yearId ? db.schoolYears.get(input.yearId) : db.schoolYears.get(item.yearId);
  if (!year) throw new Error('year not found');
  const subject = input.subject?.trim() || item.subject;
  return db.classes.update({
    ...item,
    yearId: year.id,
    yearName: year.name,
    subject,
    subjectKey: resolveSubjectKey(subject),
    title: input.title?.trim() || item.title,
    description: input.description?.trim() ?? item.description,
    updatedAt: now()
  });
}

export function addKnowledgeMaterial(classId: string, input: {
  lessonId?: string;
  title?: string;
  source?: KnowledgeMaterial['source'];
  rawText: string;
}): KnowledgeMaterial {
  const classDefinition = db.classes.get(classId);
  if (!classDefinition) throw new Error('class not found');
  if (input.lessonId) {
    const lesson = db.lessons.get(input.lessonId);
    if (!lesson || lesson.classId !== classId) throw new Error('lesson not found in class');
  }
  const timestamp = now();
  return db.knowledgeMaterials.insert({
    id: nanoid(),
    classId,
    lessonId: input.lessonId,
    title: input.title?.trim() || 'Parent material',
    source: input.source || 'pasted',
    rawText: input.rawText.trim(),
    status: 'ready',
    createdAt: timestamp,
    updatedAt: timestamp
  });
}

export function enrollLearner(classId: string, kidId: string): ClassEnrollment {
  if (!db.classes.get(classId)) throw new Error('class not found');
  if (!db.kids.get(kidId)) throw new Error('learner not found');
  return db.enrollments.insert({ id: nanoid(), classId, kidId, createdAt: now() });
}

/** Generate or regenerate a shared syllabus without learner-specific context. */
export async function buildSyllabus(classId: string): Promise<Topic[]> {
  const classDefinition = db.classes.get(classId);
  if (!classDefinition) throw new Error('class not found');
  const materials = db.knowledgeMaterials.listByClass(classId).filter((material) => !material.lessonId);
  const curriculumText = materials.map((material) => material.rawText).filter(Boolean).join('\n\n---\n\n') ||
    `Create a sensible standard syllabus for ${classDefinition.subject} in ${classDefinition.yearName}.`;

  const brain = await getBrain();
  const { system, user } = syllabusPrompt(classDefinition.subject, classDefinition.yearName, curriculumText);
  const result = await generateStructured(brain, SyllabusSchema, {
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 2500,
    quality: 'deep',
    label: 'Syllabus'
  });

  if (result.subjectKey && result.subjectKey !== classDefinition.subjectKey) {
    classDefinition.subjectKey = result.subjectKey;
    db.classes.setSubjectKey(classDefinition.id, result.subjectKey);
  }

  db.topics.clearClass(classId);
  const topics: Topic[] = result.topics.map((topic, order) => ({
    id: nanoid(),
    classId,
    title: topic.title,
    summary: topic.summary,
    order,
    estMinutes: topic.estMinutes,
    prerequisites: topic.prerequisites
  }));
  db.topics.insertMany(topics);
  return topics;
}

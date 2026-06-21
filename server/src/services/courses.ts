/** Course & curriculum services: create a course, attach curriculum, and build
 *  the AI-generated syllabus (topics) from what the parent provided. */
import { nanoid } from 'nanoid';
import type { Kid, Course, Curriculum, Topic } from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { getBrain } from '../ai/provider.ts';
import { generateStructured, SyllabusSchema } from '../ai/schemas.ts';
import { syllabusPrompt } from '../ai/prompts.ts';
import { resolveSubjectKey } from '../ai/subjects.ts';

export function createCourse(
  kid: Kid,
  input: { subject: string; title?: string; description?: string; gradeLevel?: string }
): Course {
  const course: Course = {
    id: nanoid(),
    kidId: kid.id,
    subject: input.subject,
    subjectKey: resolveSubjectKey(input.subject),
    title: input.title?.trim() || input.subject,
    description: input.description?.trim() || '',
    gradeLevel: input.gradeLevel?.trim() || kid.gradeLevel,
    createdAt: new Date().toISOString()
  };
  return db.courses.insert(course);
}

export function addCurriculum(
  course: Course,
  input: { source: Curriculum['source']; rawText: string }
): Curriculum {
  const c: Curriculum = {
    id: nanoid(),
    courseId: course.id,
    kidId: course.kidId,
    source: input.source,
    rawText: input.rawText,
    createdAt: new Date().toISOString()
  };
  return db.curricula.insert(c);
}

/** Generate (or regenerate) the syllabus for a course from its curriculum inputs. */
export async function buildSyllabus(kid: Kid, course: Course): Promise<Topic[]> {
  const inputs = db.curricula.listByCourse(course.id);
  const curriculumText = inputs.map((c) => c.rawText).join('\n\n---\n\n') ||
    `Create a sensible standard syllabus for ${course.subject} at ${course.gradeLevel} level.`;

  const brain = await getBrain();
  const { system, user } = syllabusPrompt(kid, course.subject, course.gradeLevel, curriculumText);
  const result = await generateStructured(brain, SyllabusSchema, {
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 2500,
    quality: 'deep',
    label: 'Syllabus'
  });

  // Persist resolved subjectKey if the model refined it.
  if (result.subjectKey && result.subjectKey !== course.subjectKey) {
    course.subjectKey = result.subjectKey;
    db.courses.setSubjectKey(course.id, result.subjectKey);
  }

  db.topics.clearCourse(course.id);
  const topics: Topic[] = result.topics.map((t, i) => ({
    id: nanoid(),
    courseId: course.id,
    kidId: kid.id,
    title: t.title,
    summary: t.summary,
    order: i,
    estMinutes: t.estMinutes,
    prerequisites: t.prerequisites
  }));
  db.topics.insertMany(topics);
  return topics;
}

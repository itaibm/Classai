/** Lesson generation: turn a topic into a concrete, subject-aware lesson plan
 *  tailored to what we know about the learner. */
import { nanoid } from 'nanoid';
import type { Kid, Course, Topic, Lesson, LessonKind } from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { getBrain } from '../ai/provider.ts';
import { generateStructured, LessonPlanSchema } from '../ai/schemas.ts';
import { lessonPlanPrompt } from '../ai/prompts.ts';
import { subjectProfile } from '../ai/subjects.ts';
import { getOrInitLearner } from '../memory/index.ts';

export async function generateLesson(
  kid: Kid,
  course: Course,
  topic: Topic,
  kind: LessonKind = 'lesson'
): Promise<Lesson> {
  const model = getOrInitLearner(kid.id);
  const profile = subjectProfile(course.subjectKey);
  const brain = await getBrain();

  const { system, user } = lessonPlanPrompt(kid, course, topic, profile, model, kind);
  const result = await generateStructured(brain, LessonPlanSchema, {
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 2000,
    quality: 'deep'
  });

  const lesson: Lesson = {
    id: nanoid(),
    kidId: kid.id,
    courseId: course.id,
    topicId: topic.id,
    kind,
    subject: course.subject,
    topic: topic.title,
    title: result.title || topic.title,
    objectives: result.objectives,
    plan: result.plan,
    difficulty: result.difficulty,
    status: 'ready',
    createdAt: new Date().toISOString()
  };
  return db.lessons.insert(lesson);
}

/**
 * Lesson generation — a two-pass pedagogy pipeline:
 *   1. ANALYSE the topic (key concepts, misconceptions, hooks, prior knowledge).
 *   2. DESIGN a gradual-release plan whose check/practice beats carry
 *      pre-authored questions, expected answers, anticipated wrong answers and
 *      remedies — so the live tutor can diagnose and fix errors in the moment.
 */
import { nanoid } from 'nanoid';
import type { Kid, Course, Topic, Lesson, LessonKind, LessonAnalysis } from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { getBrain } from '../ai/provider.ts';
import { generateStructured, LessonPlanSchema, LessonAnalysisSchema } from '../ai/schemas.ts';
import { lessonAnalysisPrompt, lessonPlanPrompt } from '../ai/prompts.ts';
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

  // Pass 1 — analyse the topic.
  let analysis: LessonAnalysis = { keyConcepts: [], misconceptions: [], hooks: [], priorKnowledge: [] };
  try {
    const a = lessonAnalysisPrompt(kid, course, topic, profile, model);
    analysis = await generateStructured(brain, LessonAnalysisSchema, {
      system: a.system,
      messages: [{ role: 'user', content: a.user }],
      maxTokens: 900,
      quality: 'deep',
      label: 'Lesson analysis'
    });
  } catch {
    // Analysis is an enhancer; if it fails, design from the topic alone.
  }

  // Pass 2 — design the lesson from the analysis.
  const p = lessonPlanPrompt(kid, course, topic, profile, model, kind, analysis);
  const result = await generateStructured(brain, LessonPlanSchema, {
    system: p.system,
    messages: [{ role: 'user', content: p.user }],
    // A full gradual-release plan (7–8 beats with notes + checks) can run long;
    // 3000 truncated the JSON mid-`plan` on smaller models. Give it headroom.
    maxTokens: 4096,
    quality: 'deep',
    label: 'Lesson plan'
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
    analysis: result.analysis ?? analysis,
    plan: result.plan,
    difficulty: result.difficulty,
    status: 'ready',
    createdAt: new Date().toISOString()
  };
  return db.lessons.insert(lesson);
}

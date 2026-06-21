/** Shared lesson blueprint generation, editing, revision, and approval. */
import { nanoid } from 'nanoid';
import type { Kid, Lesson, LessonAnalysis, LessonBeat, LessonKind } from '../../../shared/types.ts';
import * as db from '../db/index.ts';
import { getBrain } from '../ai/provider.ts';
import { generateStructured, LessonAnalysisSchema, LessonPlanSchema } from '../ai/schemas.ts';
import { lessonAnalysisPrompt, lessonPlanPrompt } from '../ai/prompts.ts';
import { subjectProfile } from '../ai/subjects.ts';

const now = () => new Date().toISOString();

function planningLearner(yearName: string): Kid {
  return {
    id: 'shared-planning',
    name: 'the learner',
    age: 8,
    gradeLevel: yearName,
    interests: [],
    avatar: { character: 'sage', hue: 210, voice: 'default', rate: 1 },
    createdAt: now()
  };
}

function materialContext(classId: string, lessonId?: string): string {
  const materials = db.knowledgeMaterials.listByClass(classId)
    .filter((material) => !material.lessonId || material.lessonId === lessonId)
    .filter((material) => material.status === 'ready' && material.rawText.trim());
  const activities = db.aiSuggestions.listByClass(classId).filter((suggestion) => suggestion.status === 'approved');
  const knowledge = materials.length ? `\n\nPARENT-APPROVED KNOWLEDGE (ground the plan in this material):\n${materials
    .map((material) => `--- ${material.title} ---\n${material.rawText}`)
    .join('\n\n')}` : '';
  const activityLibrary = activities.length ? `\n\nPARENT-APPROVED ACTIVITY LIBRARY (reuse when it fits):\n${activities
    .map((activity) => `--- ${activity.title}: ${activity.objective} ---\n${JSON.stringify(activity.block)}`)
    .join('\n\n')}` : '';
  return (knowledge + activityLibrary).slice(0, 30_000);
}

function copyLessonMaterials(fromLessonId: string, toLessonId: string): void {
  for (const material of db.knowledgeMaterials.listByLesson(fromLessonId)) {
    const timestamp = now();
    db.knowledgeMaterials.insert({
      ...material,
      id: nanoid(),
      lessonId: toLessonId,
      createdAt: timestamp,
      updatedAt: timestamp
    });
  }
}

export async function generateLessonDraft(
  classId: string,
  topicId: string,
  kind: LessonKind = 'lesson'
): Promise<Lesson> {
  const classDefinition = db.classes.get(classId);
  const topic = db.topics.get(topicId);
  if (!classDefinition) throw new Error('class not found');
  if (!topic || topic.classId !== classId) throw new Error('topic not found in class');

  const kid = planningLearner(classDefinition.yearName);
  const profile = subjectProfile(classDefinition.subjectKey);
  const brain = await getBrain();
  const grounding = materialContext(classId);
  let analysis: LessonAnalysis = { keyConcepts: [], misconceptions: [], hooks: [], priorKnowledge: [] };
  try {
    const prompt = lessonAnalysisPrompt(kid, classDefinition, topic, profile, undefined);
    analysis = await generateStructured(brain, LessonAnalysisSchema, {
      system: prompt.system,
      messages: [{ role: 'user', content: prompt.user + grounding }],
      maxTokens: 900,
      quality: 'deep',
      label: 'Lesson analysis'
    });
  } catch {
    // Analysis enhances planning; a valid plan can still be created without it.
  }

  const prompt = lessonPlanPrompt(kid, classDefinition, topic, profile, undefined, kind, analysis);
  const result = await generateStructured(brain, LessonPlanSchema, {
    system: prompt.system,
    messages: [{ role: 'user', content: prompt.user + grounding }],
    maxTokens: 4096,
    quality: 'deep',
    label: 'Lesson plan'
  });
  const timestamp = now();
  const lesson: Lesson = {
    id: nanoid(),
    classId,
    familyId: nanoid(),
    revision: 1,
    topicId,
    kind,
    subject: classDefinition.subject,
    topic: topic.title,
    title: result.title || topic.title,
    objectives: result.objectives,
    analysis: result.analysis ?? analysis,
    plan: result.plan,
    difficulty: result.difficulty,
    status: 'draft',
    createdAt: timestamp,
    updatedAt: timestamp
  };
  return db.lessons.insert(lesson);
}

export interface LessonDraftInput {
  title?: string;
  objectives?: string[];
  analysis?: LessonAnalysis;
  plan?: LessonBeat[];
  difficulty?: Lesson['difficulty'];
  kind?: LessonKind;
}

export function saveLessonDraft(lessonId: string, input: LessonDraftInput): Lesson {
  const current = db.lessons.get(lessonId);
  if (!current) throw new Error('lesson not found');
  const updated: Lesson = {
    ...current,
    id: current.status === 'draft' ? current.id : nanoid(),
    revision: current.status === 'draft' ? current.revision : db.lessons.latestRevision(current.familyId) + 1,
    status: 'draft',
    title: input.title?.trim() || current.title,
    objectives: input.objectives ?? current.objectives,
    analysis: input.analysis ?? current.analysis,
    plan: input.plan ?? current.plan,
    difficulty: input.difficulty ?? current.difficulty,
    kind: input.kind ?? current.kind,
    updatedAt: now()
  };
  if (current.status === 'draft') return db.lessons.update(updated);
  const inserted = db.lessons.insert(updated);
  copyLessonMaterials(current.id, inserted.id);
  return inserted;
}

export async function reviseLessonDraft(lessonId: string, instruction: string): Promise<Lesson> {
  const current = db.lessons.get(lessonId);
  if (!current) throw new Error('lesson not found');
  const classDefinition = db.classes.get(current.classId);
  if (!classDefinition) throw new Error('class not found');
  const brain = await getBrain();
  const result = await generateStructured(brain, LessonPlanSchema, {
    system: `You are an expert lesson editor. Revise the parent-authored lesson exactly as requested while preserving sound pedagogy and all unaffected details. Return ONLY JSON matching {"title":string,"objectives":[string],"analysis":{"keyConcepts":[string],"misconceptions":[string],"hooks":[string],"priorKnowledge":[string]},"plan":[{"kind":"hook"|"explain"|"example"|"check"|"practice"|"recap","goal":string,"note":string,"successCriteria":string,"visual"?:{"kind":string,"brief":string},"check"?:{"question":string,"expectedAnswer":string,"wrongAnswers":[{"answer":string,"why":string,"remedy":string}]} }],"difficulty":"gentle"|"standard"|"challenge"}.`,
    messages: [{
      role: 'user',
      content: `Class: ${classDefinition.yearName} — ${classDefinition.title}\nParent request: ${instruction.trim()}\n\nCURRENT LESSON:\n${JSON.stringify(current, null, 2)}${materialContext(current.classId, current.id)}`
    }],
    maxTokens: 4096,
    quality: 'deep',
    label: 'Lesson revision'
  });
  const timestamp = now();
  const revised = db.lessons.insert({
    ...current,
    id: nanoid(),
    revision: db.lessons.latestRevision(current.familyId) + 1,
    title: result.title || current.title,
    objectives: result.objectives,
    analysis: result.analysis ?? current.analysis,
    plan: result.plan,
    difficulty: result.difficulty,
    status: 'draft',
    createdAt: timestamp,
    updatedAt: timestamp
  });
  copyLessonMaterials(current.id, revised.id);
  return revised;
}

export function approveLesson(lessonId: string): Lesson {
  const lesson = db.lessons.get(lessonId);
  if (!lesson) throw new Error('lesson not found');
  if (lesson.status !== 'draft') throw new Error('only draft lessons can be approved');
  return db.lessons.approve(lesson);
}

export function archiveLesson(lessonId: string): Lesson {
  const lesson = db.lessons.get(lessonId);
  if (!lesson) throw new Error('lesson not found');
  db.lessons.setStatus(lesson.id, 'archived');
  return { ...lesson, status: 'archived', updatedAt: now() };
}

export function deleteLesson(lessonId: string): void {
  const lesson = db.lessons.get(lessonId);
  if (!lesson) throw new Error('lesson not found');
  if (lesson.status === 'approved' || db.lessons.hasSessions(lesson.id)) {
    archiveLesson(lesson.id);
    return;
  }
  db.lessons.remove(lesson.id);
}

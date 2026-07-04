/**
 * Lesson generator — builds a full `classai-lesson/1` from a scope outline + the
 * knowledge base when a planned lesson isn't authored yet, then writes it to
 * disk so the curriculum fills itself in. Split into two LLM calls (core beats,
 * then practice bank) so neither hits output-token limits. Never returns a
 * broken lesson: if generation fails, it synthesizes a minimal-but-valid lesson
 * from the outline alone.
 */
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import type { LessonFull } from '../../../shared/types.ts';
import { CURRICULUM_DIR } from '../config.ts';
import { getBrain } from '../ai/provider.ts';
import { extractJson } from '../ai/schemas.ts';
import { DiskLessonSchema, getCurriculumLesson, diskToLessonFull } from './curriculum.ts';
import {
  lessonGenSystem,
  lessonGenCoreUser,
  lessonGenPracticeUser,
  type GenLessonMeta
} from '../ai/prompts.ts';
import type { CatalogLessonRef } from './curriculum-catalog.ts';

const KB_MAP: Record<string, string> = {
  maths: 'maths',
  english: 'english',
  science: 'science',
  history: 'history-geography',
  geography: 'history-geography',
  'history-geography': 'history-geography',
  'art-design': 'art-music',
  music: 'art-music',
  computing: 'computing-life-skills',
  'life-skills': 'computing-life-skills',
  languages: 'languages'
};

const KB_DIR = path.join(CURRICULUM_DIR, '..', 'knowledge-base', 'subjects');

/** Best-effort teaching knowledge for a subject-year (empty if none on disk). */
function loadKnowledge(year: number, subject: string): string {
  const kbSubject = KB_MAP[subject] || subject;
  const dir = path.join(KB_DIR, kbSubject);
  const candidates = [path.join(dir, `year-${year}.md`), path.join(dir, `year${year}.md`)];
  for (const file of candidates) {
    try {
      return fs.readFileSync(file, 'utf8');
    } catch {
      /* try next */
    }
  }
  // fall back to concatenating the subject's docs (truncated by the caller)
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .slice(0, 3)
      .map((f) => fs.readFileSync(path.join(dir, f), 'utf8'))
      .join('\n\n');
  } catch {
    return '';
  }
}

function slug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'lesson';
}

function toMeta(ref: CatalogLessonRef): GenLessonMeta {
  const o = ref.outline;
  return {
    id: ref.id,
    year: ref.year,
    subject: ref.subject,
    subjectLabel: ref.subjectLabel,
    unitNumber: ref.unitNumber,
    lessonNumber: ref.lessonNumber,
    title: ref.title,
    unitTitle: ref.unit?.title || '',
    essentialQuestion: ref.unit?.essentialQuestion || '',
    keyVocabulary: ref.unit?.keyVocabulary || [],
    outline: {
      durationMin: o?.durationMin || 20,
      objective: o?.objective || `Learn about ${ref.title}.`,
      hook: o?.hook || '',
      keyActivity: o?.keyActivity || '',
      check: o?.check || '',
      differentiation: o?.differentiation || { support: '', stretch: '' },
      materials: o?.materials || '',
      joy: o?.joy || ''
    }
  };
}

/** Assemble a disk-shaped lesson object from the two generated parts + meta. */
function assemble(meta: GenLessonMeta, core: Record<string, unknown>, practice: Record<string, unknown>): Record<string, unknown> {
  return {
    ...core,
    format: 'classai-lesson/1',
    id: meta.id,
    year: meta.year,
    subject: meta.subject,
    subjectLabel: meta.subjectLabel,
    unit: { number: meta.unitNumber, title: meta.unitTitle, essentialQuestion: meta.essentialQuestion },
    lessonNumber: meta.lessonNumber,
    kind: 'lesson',
    topic: meta.unitTitle || meta.title,
    title: meta.title,
    durationMin: meta.outline.durationMin,
    objectives: [meta.outline.objective].filter(Boolean),
    difficulty: 'standard',
    status: 'approved',
    practiceBank: practice.practiceBank,
    adaptivity: practice.adaptivity
  };
}

/** A minimal but valid, playable lesson from the outline alone (never broken). */
function fallbackDisk(meta: GenLessonMeta): Record<string, unknown> {
  const o = meta.outline;
  const checkQ = o.check || `In your own words, what did we learn about ${meta.title}?`;
  return {
    format: 'classai-lesson/1',
    id: meta.id,
    year: meta.year,
    subject: meta.subject,
    subjectLabel: meta.subjectLabel,
    unit: { number: meta.unitNumber, title: meta.unitTitle, essentialQuestion: meta.essentialQuestion },
    lessonNumber: meta.lessonNumber,
    kind: 'lesson',
    topic: meta.unitTitle || meta.title,
    title: meta.title,
    durationMin: o.durationMin,
    objectives: [o.objective].filter(Boolean),
    difficulty: 'standard',
    status: 'approved',
    vocabulary: [],
    emphasize: [o.objective].filter(Boolean),
    analysis: { keyConcepts: [], misconceptions: [], hooks: o.hook ? [o.hook] : [], priorKnowledge: [] },
    materials: { human: [], digital: [] },
    delivery: { mode: 'fully_ai', humanNotes: '' },
    plan: [
      { kind: 'hook', delivery: 'ai', goal: 'Spark curiosity', note: '', successCriteria: 'Learner is curious.', script: { say: o.hook || `Let's explore ${meta.title}!` } },
      { kind: 'explain', delivery: 'ai', goal: o.objective, note: '', successCriteria: 'The idea is shown clearly.', script: { say: o.keyActivity || o.objective }, blocks: [{ type: 'richText', markdown: `**${meta.title}**\n\n${o.keyActivity || o.objective}` }] },
      { kind: 'check', delivery: 'ai', goal: 'Check understanding', note: '', successCriteria: 'Learner answers.', script: { say: checkQ }, blocks: [{ type: 'shortText', prompt: checkQ }], check: { question: checkQ, expectedAnswer: '', wrongAnswers: [] } },
      { kind: 'practice', delivery: 'ai', goal: 'Practise the idea', note: '', successCriteria: '3+ correct.', script: { say: "Let's practise together!" } },
      { kind: 'recap', delivery: 'ai', goal: 'Recap and praise', note: '', successCriteria: 'Learner states the idea.', script: { say: `You worked hard on ${meta.title} — tell me the big idea in your own words!` } }
    ],
    practiceBank: [1, 2, 3].map((lvl) => ({
      id: `${meta.id}-p0${lvl}`,
      skill: meta.title,
      level: lvl,
      block: { type: 'shortText', prompt: checkQ },
      expectedAnswer: '',
      wrongAnswers: [],
      hints: ['Think back to what we just learned.', 'Talk it through one small step at a time.'],
      reteach: { say: o.keyActivity || o.objective }
    })),
    adaptivity: {
      startLevel: 2,
      levelUp: '2 correct in a row → level up.',
      levelDown: '2 misses on a skill → reteach and drop a level.',
      masterySignal: 'Answers the objective correctly a few times.',
      struggleProtocol: ["Don't reveal the answer.", 'Name the likely slip.', 'Give one hint.', 'Re-ask a smaller version.'],
      personalization: "Use the learner's interests for examples; never change the facts.",
      endOnSuccess: 'End on an earned win with specific process praise.'
    },
    differentiation: { support: o.differentiation.support, stretch: o.differentiation.stretch },
    extension: o.joy || '',
    assessmentEvidence: o.check,
    revisitLater: ''
  };
}

function writeLessonFile(meta: GenLessonMeta, disk: Record<string, unknown>): void {
  const dir = path.join(CURRICULUM_DIR, `year-${meta.year}`, meta.subject, 'lessons');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `lesson-${String(meta.lessonNumber).padStart(2, '0')}-${slug(meta.title)}.json`);
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(disk, null, 2));
  fs.renameSync(tmp, file); // atomic
}

async function callJson(system: string, user: string, maxTokens: number): Promise<Record<string, unknown> | null> {
  const brain = await getBrain();
  const attempt = async (): Promise<Record<string, unknown>> => {
    const raw = await brain.generate({ system, messages: [{ role: 'user', content: user }], maxTokens, json: true, quality: 'deep', label: 'Lesson generation' });
    return extractJson(raw) as Record<string, unknown>;
  };
  try {
    return await attempt();
  } catch {
    try {
      return await attempt();
    } catch (e) {
      console.warn('[generator] call failed after retry:', (e as Error)?.message);
      return null;
    }
  }
}

export interface GeneratedLesson {
  lesson: LessonFull;
  fallback: boolean; // true if the minimal outline-only lesson was used
}

/**
 * Generate a full lesson for an outline-only catalog slot, save it to disk, and
 * return the runtime LessonFull. Requires a connected brain (throws NoBrainError
 * upward if none) but degrades to a valid minimal lesson if generation fails.
 */
export async function generateAndSaveLesson(ref: CatalogLessonRef): Promise<GeneratedLesson> {
  const meta = toMeta(ref);
  const knowledge = loadKnowledge(meta.year, meta.subject);
  const system = lessonGenSystem(meta.subjectLabel);

  const core = await callJson(system, lessonGenCoreUser(meta, knowledge), 6000);
  const practice = core ? await callJson(system, lessonGenPracticeUser(meta), 5000) : null;

  if (core && practice) {
    const disk = assemble(meta, core, practice);
    const parsed = DiskLessonSchema.safeParse(disk);
    if (parsed.success) {
      try {
        writeLessonFile(meta, disk);
      } catch (e) {
        console.warn('[generator] disk write failed, using in-memory lesson:', (e as Error)?.message);
      }
      const fromDisk = getCurriculumLesson(meta.id);
      return { lesson: fromDisk ?? diskToLessonFull(parsed.data), fallback: false };
    }
    console.warn('[generator] assembled lesson failed validation:', parsed.error.issues.slice(0, 3).map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  // Fallback — a minimal, valid, playable lesson from the outline.
  const disk = fallbackDisk(meta);
  const parsed = DiskLessonSchema.safeParse(disk);
  if (!parsed.success) throw new Error('lesson generation failed and fallback is invalid');
  try {
    writeLessonFile(meta, disk);
  } catch {
    /* in-memory is fine */
  }
  const fromDisk = getCurriculumLesson(meta.id);
  return { lesson: fromDisk ?? diskToLessonFull(parsed.data), fallback: true };
}

/** Schema handle re-export so tests can assert shapes without deep imports. */
export const _GenSchemas = { DiskLessonSchema, z };

/**
 * Structured output schemas (zod) and a tolerant parser. Because Classai must
 * work across Anthropic, OpenAI and local models, we instruct the model to emit
 * JSON and then parse defensively rather than relying on one vendor's
 * structured-output API. Everything is validated and given safe fallbacks so a
 * malformed turn never crashes a live lesson.
 */
import { z } from 'zod';
import type { Brain, GenerateOptions } from './provider.ts';

// ---- tolerant JSON extraction ---------------------------------------------

export function extractJson(text: string): unknown {
  let t = text.trim();
  // strip ```json ... ``` fences
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) t = fence[1].trim();
  // find the first balanced {...}
  const start = t.indexOf('{');
  if (start === -1) throw new Error('no_json_found');
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < t.length; i++) {
    const c = t[i]!;
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return JSON.parse(t.slice(start, i + 1));
    }
  }
  throw new Error('unbalanced_json');
}

// ---- schemas --------------------------------------------------------------

export const TurnSchema = z.object({
  speech: z.string(),
  emotion: z
    .enum(['neutral', 'happy', 'encouraging', 'celebrating', 'thinking', 'curious', 'gentle'])
    .default('neutral'),
  interaction: z
    .object({
      type: z.enum(['choice', 'type', 'speak', 'continue', 'none']).default('continue'),
      prompt: z.string().default(''),
      choices: z.array(z.string()).optional()
    })
    .default({ type: 'continue', prompt: '' }),
  assessment: z.string().default(''),
  memoryUpdates: z
    .array(
      z.object({
        topic: z.string(),
        mastery: z.number().min(0).max(1).default(0.5),
        note: z.string().optional(),
        strength: z.string().optional(),
        struggle: z.string().optional(),
        misconception: z.string().optional(),
        interest: z.string().optional()
      })
    )
    .default([]),
  concern: z.string().optional(),
  lessonComplete: z.boolean().default(false)
});

export const SyllabusSchema = z.object({
  title: z.string(),
  description: z.string().default(''),
  subjectKey: z
    .enum(['math', 'science', 'language_arts', 'world_language', 'history', 'general'])
    .optional(),
  topics: z
    .array(
      z.object({
        title: z.string(),
        summary: z.string().default(''),
        estMinutes: z.number().int().min(5).max(90).default(20),
        prerequisites: z.array(z.string()).default([])
      })
    )
    .min(1)
});

export const LessonPlanSchema = z.object({
  title: z.string(),
  objectives: z.array(z.string()).default([]),
  difficulty: z.enum(['gentle', 'standard', 'challenge']).default('standard'),
  plan: z
    .array(
      z.object({
        kind: z.enum(['hook', 'explain', 'example', 'check', 'practice', 'recap']),
        goal: z.string(),
        note: z.string().default('')
      })
    )
    .min(1)
});

export const ReportSchema = z.object({
  summary: z.string(),
  mastered: z.array(z.string()).default([]),
  needsWork: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  nextSteps: z.string().default(''),
  concerns: z.array(z.string()).default([]),
  score: z.number().min(0).max(100).default(50)
});

// ---- generate + validate helper -------------------------------------------

/**
 * Ask the brain for JSON and validate it against `schema`. Retries once with a
 * corrective nudge if parsing/validation fails.
 */
export async function generateStructured<S extends z.ZodTypeAny>(
  brain: Brain,
  schema: S,
  opts: GenerateOptions
): Promise<z.infer<S>> {
  const attempt = async (extra?: string): Promise<z.infer<S>> => {
    const messages = extra
      ? [...opts.messages, { role: 'user' as const, content: extra }]
      : opts.messages;
    const raw = await brain.generate({ ...opts, json: true, messages });
    const parsed = schema.parse(extractJson(raw));
    return parsed;
  };
  try {
    return await attempt();
  } catch {
    return await attempt(
      'Your previous reply could not be parsed. Reply again with ONLY a single valid JSON object that matches the required shape — no prose, no code fences.'
    );
  }
}

/**
 * Structured output schemas (zod) and a tolerant parser. Because Classai must
 * work across Anthropic, OpenAI and local models, we instruct the model to emit
 * JSON and then parse defensively rather than relying on one vendor's
 * structured-output API. Everything is validated and given safe fallbacks so a
 * malformed turn never crashes a live lesson.
 */
import { z } from 'zod';
import type { Brain, GenerateOptions } from './provider.ts';
import { BlockSchema } from './blocks.ts';

// ---- tolerant JSON extraction ---------------------------------------------

export function extractJson(text: string): unknown {
  let t = text.trim();
  // strip ```json ... ``` fences
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) t = fence[1].trim();

  // Try each '{' as a candidate start; return the first that yields a
  // balanced, parseable object. This is robust to prose that contains braces
  // before the real JSON (e.g. "the JSON for {your topic}: {\"speech\":...}").
  for (let start = t.indexOf('{'); start !== -1; start = t.indexOf('{', start + 1)) {
    const end = matchingBrace(t, start);
    if (end === -1) continue;
    try {
      return JSON.parse(t.slice(start, end + 1));
    } catch {
      /* not valid from here — try the next '{' */
    }
  }
  throw new Error('no_json_found');
}

/** Index of the '}' that closes the '{' at `start`, string/escape aware, or -1. */
function matchingBrace(t: string, start: number): number {
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
      if (depth === 0) return i;
    }
  }
  return -1;
}

// ---- schemas --------------------------------------------------------------

/** Compact one-line summary of a zod error, for logs and corrective prompts. */
export function summarizeZodError(error: z.ZodError): string {
  return error.issues
    .slice(0, 5)
    .map((i) => (i.path.length ? `${i.path.join('.')}: ${i.message}` : i.message))
    .join('; ');
}

export const TurnSchema = z
  .object({
    speech: z.string(),
    // `.catch` (not just `.default`) so an out-of-enum value the model invents
    // — e.g. emotion "warm" — falls back instead of crashing the whole turn.
    emotion: z
      .enum(['neutral', 'happy', 'encouraging', 'celebrating', 'thinking', 'curious', 'gentle'])
      .default('neutral')
      .catch('neutral'),
    // Validated against BlockSchema in the transform below — a malformed block
    // must not fail the whole turn, but it must also not vanish silently.
    block: z.unknown().optional(),
    assessment: z.string().default(''),
    answerEval: z.enum(['correct', 'partial', 'incorrect', 'na']).default('na').catch('na'),
    beatComplete: z.boolean().default(false),
    // Models often emit `null` for "no value" on optional fields — treat any
    // invalid optional as absent rather than failing the turn.
    memoryUpdates: z
      .array(
        z.object({
          topic: z.string(),
          mastery: z.number().min(0).max(1).default(0.5),
          note: z.string().optional().catch(undefined),
          strength: z.string().optional().catch(undefined),
          struggle: z.string().optional().catch(undefined),
          misconception: z.string().optional().catch(undefined),
          interest: z.string().optional().catch(undefined)
        })
      )
      .default([])
      .catch([]),
    concern: z.string().optional().catch(undefined),
    lessonComplete: z.boolean().default(false)
  })
  .transform((t) => {
    // Drop a malformed block but keep the speech — and make the failure
    // visible: log it server-side and surface `blockError` so the lesson
    // director can feed a corrective hint back to the model next turn
    // (otherwise the model keeps promising a visual that never renders).
    if (t.block == null) return { ...t, block: undefined, blockError: undefined };
    const parsed = BlockSchema.safeParse(t.block);
    if (parsed.success) return { ...t, block: parsed.data, blockError: undefined };
    const blockError = summarizeZodError(parsed.error);
    console.warn('[TurnSchema] dropping malformed block:', blockError);
    console.warn('[TurnSchema] raw block was:', JSON.stringify(t.block)?.slice(0, 600));
    return { ...t, block: undefined, blockError };
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

const WrongAnswerSchema = z.object({
  answer: z.string(),
  why: z.string().default(''),
  remedy: z.string().default('')
});

const BeatCheckSchema = z.object({
  question: z.string(),
  expectedAnswer: z.string().default(''),
  wrongAnswers: z.array(WrongAnswerSchema).default([])
});

const EMPTY_ANALYSIS = { keyConcepts: [], misconceptions: [], hooks: [], priorKnowledge: [] };

export const LessonAnalysisSchema = z.object({
  keyConcepts: z.array(z.string()).default([]),
  misconceptions: z.array(z.string()).default([]),
  hooks: z.array(z.string()).default([]),
  priorKnowledge: z.array(z.string()).default([])
});

export const LessonPlanSchema = z.object({
  // Defaulted so a model that omits it doesn't fail the whole lesson — the
  // caller falls back to the topic title (see services/lessons.ts).
  title: z.string().default(''),
  objectives: z.array(z.string()).default([]),
  difficulty: z.enum(['gentle', 'standard', 'challenge']).default('standard').catch('standard'),
  analysis: z
    .object({
      keyConcepts: z.array(z.string()).default([]),
      misconceptions: z.array(z.string()).default([]),
      hooks: z.array(z.string()).default([]),
      priorKnowledge: z.array(z.string()).default([])
    })
    .default(EMPTY_ANALYSIS),
  plan: z
    .array(
      z.object({
        // Tolerate weaker models: bad enum -> 'explain', null/invalid check -> dropped,
        // missing goal -> empty. A malformed beat must not fail the whole lesson.
        kind: z.enum(['hook', 'explain', 'example', 'check', 'practice', 'recap']).catch('explain'),
        goal: z.string().default(''),
        note: z.string().default(''),
        successCriteria: z.string().default(''),
        check: BeatCheckSchema.optional().catch(undefined)
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
  let lastRaw = '';
  const attempt = async (extra?: string): Promise<z.infer<S>> => {
    let messages = opts.messages;
    if (extra) {
      // Merge the corrective nudge into the trailing user turn rather than
      // appending a second consecutive user message (which some providers reject).
      messages = [...opts.messages];
      const last = messages[messages.length - 1];
      if (last && last.role === 'user') {
        messages[messages.length - 1] = { ...last, content: `${last.content}\n\n${extra}` };
      } else {
        messages.push({ role: 'user', content: extra });
      }
    }
    lastRaw = await brain.generate({ ...opts, json: true, messages });
    return schema.parse(extractJson(lastRaw));
  };
  try {
    return await attempt();
  } catch {
    try {
      return await attempt(
        'Your previous reply could not be parsed. Reply again with ONLY a single valid JSON object that matches the required shape — no prose, no code fences.'
      );
    } catch (e) {
      // Surface what the model actually produced so flaky generations on weaker
      // models are diagnosable instead of failing silently.
      console.warn('[generateStructured] unparseable after retry:', (e as Error)?.message);
      console.warn('[generateStructured] raw output was:', lastRaw.slice(0, 600));
      throw e;
    }
  }
}

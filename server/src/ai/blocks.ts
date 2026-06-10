/**
 * Zod schemas for the lesson UI "tool belt" (LessonBlock). Kept permissive with
 * sensible defaults so minor model deviations still validate; the turn schema
 * drops a malformed block rather than failing the whole turn.
 */
import { z } from 'zod';

const richText = z.object({ type: z.literal('richText'), markdown: z.string() });
const steps = z.object({ type: z.literal('steps'), title: z.string().optional(), steps: z.array(z.string()).min(1) });
const keyTerm = z.object({ type: z.literal('keyTerm'), term: z.string(), definition: z.string(), example: z.string().optional() });
const numberLine = z.object({
  type: z.literal('numberLine'),
  min: z.number(),
  max: z.number(),
  step: z.number().optional(),
  marks: z.array(z.object({ value: z.number(), label: z.string().optional() })).optional(),
  highlight: z.number().optional()
});
const table = z.object({
  type: z.literal('table'),
  headers: z.array(z.string()).min(1),
  rows: z.array(z.array(z.string())),
  caption: z.string().optional()
});
const emojiViz = z.object({ type: z.literal('emojiViz'), emojis: z.string(), caption: z.string().optional() });

const multipleChoice = z.object({
  type: z.literal('multipleChoice'),
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  correct: z.number().int().min(0),
  explain: z.string().optional()
});
const multiSelect = z.object({
  type: z.literal('multiSelect'),
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  correct: z.array(z.number().int().min(0)),
  explain: z.string().optional()
});
const trueFalse = z.object({ type: z.literal('trueFalse'), statement: z.string(), correct: z.boolean(), explain: z.string().optional() });
const fillBlank = z.object({ type: z.literal('fillBlank'), text: z.string(), answer: z.string(), wordBank: z.array(z.string()).optional() });
const matchPairs = z.object({
  type: z.literal('matchPairs'),
  prompt: z.string(),
  pairs: z.array(z.object({ left: z.string(), right: z.string() })).min(2)
});
const ordering = z.object({ type: z.literal('ordering'), prompt: z.string(), items: z.array(z.string()).min(2) });
const categorize = z.object({
  type: z.literal('categorize'),
  prompt: z.string(),
  buckets: z.array(z.string()).min(2),
  items: z.array(z.object({ text: z.string(), bucket: z.string() })).min(2)
});
const numberEntry = z.object({
  type: z.literal('numberEntry'),
  prompt: z.string(),
  answer: z.number(),
  tolerance: z.number().optional(),
  unit: z.string().optional()
});
const shortText = z.object({ type: z.literal('shortText'), prompt: z.string(), sample: z.string().optional() });
const speak = z.object({ type: z.literal('speak'), prompt: z.string(), target: z.string().optional() });

export const BlockSchema = z.discriminatedUnion('type', [
  richText, steps, keyTerm, numberLine, table, emojiViz,
  multipleChoice, multiSelect, trueFalse, fillBlank, matchPairs,
  ordering, categorize, numberEntry, shortText, speak
]);

export type BlockSchemaType = z.infer<typeof BlockSchema>;

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
const image = z.object({ type: z.literal('image'), src: z.string(), alt: z.string().optional(), caption: z.string().optional() });
const video = z.object({ type: z.literal('video'), url: z.string(), title: z.string().optional(), caption: z.string().optional() });
const slideshow = z.object({
  type: z.literal('slideshow'),
  title: z.string().optional(),
  slides: z.array(z.object({
    title: z.string().optional(), body: z.string().optional(), emoji: z.string().optional(), imageUrl: z.string().optional()
  })).min(1)
});
const flashcards = z.object({
  type: z.literal('flashcards'),
  cards: z.array(z.object({ front: z.string(), back: z.string() })).min(1)
});

// Safe, recursive custom-UI node tree (no raw HTML/JS).
const anim = z.enum(['none', 'pop', 'float', 'spin', 'pulse', 'bounce', 'fade']);
const color = z.enum(['ink', 'muted', 'accent', 'good', 'bad']);
const customNode: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.object({ t: z.enum(['col', 'row', 'card', 'grid']), children: z.array(customNode), cols: z.number().int().min(1).max(6).optional(), anim: anim.optional() }),
    z.object({ t: z.literal('text'), value: z.string(), size: z.enum(['sm', 'md', 'lg', 'xl']).optional(), bold: z.boolean().optional(), color: color.optional(), align: z.enum(['left', 'center']).optional(), anim: anim.optional() }),
    z.object({ t: z.literal('emoji'), value: z.string(), size: z.enum(['md', 'lg', 'xl']).optional(), anim: anim.optional() }),
    z.object({ t: z.literal('image'), src: z.string(), alt: z.string().optional(), anim: anim.optional() }),
    z.object({ t: z.literal('badge'), value: z.string(), color: color.optional() }),
    z.object({ t: z.literal('divider') }),
    z.object({ t: z.literal('spacer') }),
    z.object({ t: z.literal('reveal'), label: z.string(), children: z.array(customNode) }),
    z.object({ t: z.literal('steps'), slides: z.array(z.array(customNode)).min(1) }),
    z.object({ t: z.literal('button'), label: z.string(), action: z.enum(['complete', 'continue', 'speak']), say: z.string().optional(), correct: z.boolean().optional() }),
    z.object({ t: z.literal('choice'), prompt: z.string().optional(), options: z.array(z.string()).min(2), correct: z.number().int().min(0) })
  ])
);
const custom = z.object({ type: z.literal('custom'), title: z.string().optional(), root: customNode, interactive: z.boolean().optional() });

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
  image, video, slideshow, flashcards, custom,
  multipleChoice, multiSelect, trueFalse, fillBlank, matchPairs,
  ordering, categorize, numberEntry, shortText, speak
]);

export type BlockSchemaType = z.infer<typeof BlockSchema>;

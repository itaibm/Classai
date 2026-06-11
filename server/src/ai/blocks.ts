/**
 * Zod schemas for the lesson UI "tool belt" (LessonBlock). Kept permissive with
 * sensible defaults so minor model deviations still validate; the turn schema
 * drops a malformed block rather than failing the whole turn.
 */
import { z } from 'zod';

// Models often emit `null` (or other junk) for "no value" on optional fields —
// treat any invalid optional as absent rather than failing the whole block.
// Mirrors the same hardening on TurnSchema's optional fields (see schemas.ts).
const opt = <T extends z.ZodTypeAny>(schema: T) => schema.optional().catch(undefined);

const richText = z.object({ type: z.literal('richText'), markdown: z.string() });
const steps = z.object({ type: z.literal('steps'), title: opt(z.string()), steps: z.array(z.string()).min(1) });
const keyTerm = z.object({ type: z.literal('keyTerm'), term: z.string(), definition: z.string(), example: opt(z.string()) });
const numberLine = z.object({
  type: z.literal('numberLine'),
  min: z.number(),
  max: z.number(),
  step: opt(z.number()),
  marks: opt(z.array(z.object({ value: z.number(), label: opt(z.string()) }))),
  highlight: opt(z.number())
});
const table = z.object({
  type: z.literal('table'),
  headers: z.array(z.string()).min(1),
  rows: z.array(z.array(z.string())),
  caption: opt(z.string())
});
const emojiViz = z.object({ type: z.literal('emojiViz'), emojis: z.string(), caption: opt(z.string()) });
const image = z.object({ type: z.literal('image'), src: z.string(), alt: opt(z.string()), caption: opt(z.string()) });
const video = z.object({ type: z.literal('video'), url: z.string(), title: opt(z.string()), caption: opt(z.string()) });
const slideshow = z.object({
  type: z.literal('slideshow'),
  title: opt(z.string()),
  slides: z.array(z.object({
    title: opt(z.string()), body: opt(z.string()), emoji: opt(z.string()), imageUrl: opt(z.string())
  })).min(1)
});
const flashcards = z.object({
  type: z.literal('flashcards'),
  cards: z.array(z.object({ front: z.string(), back: z.string() })).min(1)
});

const drawColor = z.enum(['ink', 'accent', 'red', 'green', 'blue', 'orange', 'purple']);
const wbElement = z.union([
  z.object({ k: z.literal('line'), x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(), color: opt(drawColor), width: opt(z.number()), arrow: opt(z.boolean()), dashed: opt(z.boolean()) }),
  z.object({ k: z.literal('rect'), x: z.number(), y: z.number(), w: z.number(), h: z.number(), color: opt(drawColor), fill: opt(z.boolean()), label: opt(z.string()) }),
  z.object({ k: z.literal('circle'), x: z.number(), y: z.number(), r: z.number(), color: opt(drawColor), fill: opt(z.boolean()), label: opt(z.string()) }),
  z.object({ k: z.literal('path'), points: z.array(z.object({ x: z.number(), y: z.number() })).min(2), color: opt(drawColor), width: opt(z.number()), closed: opt(z.boolean()) }),
  z.object({ k: z.literal('text'), x: z.number(), y: z.number(), value: z.string(), size: opt(z.number()), color: opt(drawColor), bold: opt(z.boolean()) }),
  z.object({ k: z.literal('dot'), x: z.number(), y: z.number(), color: opt(drawColor), label: opt(z.string()) })
]);
const whiteboard = z.object({
  type: z.literal('whiteboard'),
  title: opt(z.string()),
  elements: z.array(wbElement).min(1),
  animate: opt(z.boolean())
});

// Safe, recursive custom-UI node tree (no raw HTML/JS).
const anim = z.enum(['none', 'pop', 'float', 'spin', 'pulse', 'bounce', 'fade']);
const color = z.enum(['ink', 'muted', 'accent', 'good', 'bad']);
const customNode: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.object({ t: z.enum(['col', 'row', 'card', 'grid']), children: z.array(customNode), cols: opt(z.number().int().min(1).max(6)), anim: opt(anim) }),
    z.object({ t: z.literal('text'), value: z.string(), size: opt(z.enum(['sm', 'md', 'lg', 'xl'])), bold: opt(z.boolean()), color: opt(color), align: opt(z.enum(['left', 'center'])), anim: opt(anim) }),
    z.object({ t: z.literal('emoji'), value: z.string(), size: opt(z.enum(['md', 'lg', 'xl'])), anim: opt(anim) }),
    z.object({ t: z.literal('image'), src: z.string(), alt: opt(z.string()), anim: opt(anim) }),
    z.object({ t: z.literal('badge'), value: z.string(), color: opt(color) }),
    z.object({ t: z.literal('divider') }),
    z.object({ t: z.literal('spacer') }),
    z.object({ t: z.literal('reveal'), label: z.string(), children: z.array(customNode) }),
    z.object({ t: z.literal('steps'), slides: z.array(z.array(customNode)).min(1) }),
    z.object({ t: z.literal('button'), label: z.string(), action: z.enum(['complete', 'continue', 'speak']), say: opt(z.string()), correct: opt(z.boolean()) }),
    z.object({ t: z.literal('choice'), prompt: opt(z.string()), options: z.array(z.string()).min(2), correct: z.number().int().min(0) })
  ])
);
const custom = z.object({ type: z.literal('custom'), title: opt(z.string()), root: customNode, interactive: opt(z.boolean()) });

const multipleChoice = z.object({
  type: z.literal('multipleChoice'),
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  correct: z.number().int().min(0),
  explain: opt(z.string())
});
const multiSelect = z.object({
  type: z.literal('multiSelect'),
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  correct: z.array(z.number().int().min(0)),
  explain: opt(z.string())
});
const trueFalse = z.object({ type: z.literal('trueFalse'), statement: z.string(), correct: z.boolean(), explain: opt(z.string()) });
const fillBlank = z.object({ type: z.literal('fillBlank'), text: z.string(), answer: z.string(), wordBank: opt(z.array(z.string())) });
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
  tolerance: opt(z.number()),
  unit: opt(z.string())
});
const shortText = z.object({ type: z.literal('shortText'), prompt: z.string(), sample: opt(z.string()) });
const speak = z.object({ type: z.literal('speak'), prompt: z.string(), target: opt(z.string()) });

export const BlockSchema = z.discriminatedUnion('type', [
  richText, steps, keyTerm, numberLine, table, emojiViz,
  image, video, slideshow, flashcards, whiteboard, custom,
  multipleChoice, multiSelect, trueFalse, fillBlank, matchPairs,
  ordering, categorize, numberEntry, shortText, speak
]);

export type BlockSchemaType = z.infer<typeof BlockSchema>;

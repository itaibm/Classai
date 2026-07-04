/**
 * Tolerant zod schemas for the 28 semantic `LessonElement` types (see
 * `shared/elements.ts`). Mirrors the defensive-parsing style of `schemas.ts`:
 * validate with zod, coerce loose numeric strings, default missing optionals,
 * and never throw on a malformed AI reply — `parseElement` returns `null`
 * instead of crashing a live lesson.
 */
import { z } from 'zod';
import type { LessonElement } from '../../../shared/elements.ts';

// ---- tell / show -----------------------------------------------------------

const TextSchema = z.object({
  type: z.literal('text'),
  value: z.string(),
  emphasis: z.enum(['plain', 'callout', 'term']).optional().catch(undefined),
  term: z.string().optional().catch(undefined),
  definition: z.string().optional().catch(undefined)
});

const ImageSchema = z.object({
  type: z.literal('image'),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional().catch(undefined),
  annotate: z.array(z.string()).optional().catch(undefined)
});

const VideoSchema = z.object({
  type: z.literal('video'),
  url: z.string().optional().catch(undefined),
  searchTerm: z.string().optional().catch(undefined),
  watchTask: z.string(),
  afterCheck: z
    .object({ question: z.string(), expectedAnswer: z.string() })
    .optional()
    .catch(undefined)
});

const SceneSchema = z.object({
  type: z.literal('scene'),
  items: z.array(
    z.object({
      emoji: z.string(),
      label: z.string().optional().catch(undefined),
      count: z.coerce.number().optional().catch(undefined)
    })
  ),
  layout: z.enum(['row', 'grid', 'scatter']).optional().catch(undefined),
  caption: z.string().optional().catch(undefined)
});

const AudioSchema = z.object({
  type: z.literal('audio'),
  src: z.string().optional().catch(undefined),
  label: z.string(),
  listenTask: z.string().optional().catch(undefined)
});

// ---- model ------------------------------------------------------------------

const ArraySchema = z.object({
  type: z.literal('array'),
  rows: z.coerce.number(),
  cols: z.coerce.number(),
  show: z.string().optional().catch(undefined),
  animate: z.enum(['none', 'rotate']).default('none').catch('none')
});

const NumberLineSchema = z.object({
  type: z.literal('numberLine'),
  min: z.coerce.number(),
  max: z.coerce.number(),
  step: z.coerce.number().optional().catch(undefined),
  marks: z.array(z.coerce.number()).optional().catch(undefined),
  jumps: z.array(z.coerce.number()).optional().catch(undefined),
  target: z.coerce.number().optional().catch(undefined)
});

const BaseTenSchema = z.object({
  type: z.literal('baseTen'),
  value: z.coerce.number(),
  mode: z.enum(['tenFrame', 'blocks', 'placeValue']).optional().catch(undefined),
  target: z.coerce.number().optional().catch(undefined)
});

const FractionSchema = z.object({
  type: z.literal('fraction'),
  whole: z.array(z.enum(['bar', 'circle'])),
  num: z.coerce.number(),
  den: z.coerce.number()
});

const NumberOrQuestion = z.union([z.coerce.number(), z.literal('?')]);

const BarModelSchema = z.object({
  type: z.literal('barModel'),
  whole: NumberOrQuestion,
  parts: z.array(NumberOrQuestion),
  label: z.string().optional().catch(undefined)
});

const NumberBondSchema = z.object({
  type: z.literal('numberBond'),
  whole: NumberOrQuestion,
  parts: z.array(NumberOrQuestion)
});

const ShapeSchema = z.object({
  type: z.literal('shape'),
  mode: z.enum(['2d', '3d', 'angle', 'symmetry', 'net']),
  spec: z.string()
});

const GridSchema = z.object({
  type: z.literal('grid'),
  rows: z.coerce.number(),
  cols: z.coerce.number(),
  mode: z.enum(['coord', 'beebot', 'pixel']).optional().catch(undefined),
  cells: z
    .array(
      z.object({
        x: z.coerce.number(),
        y: z.coerce.number(),
        fill: z.string().optional().catch(undefined),
        label: z.string().optional().catch(undefined)
      })
    )
    .optional()
    .catch(undefined),
  target: z
    .object({ x: z.coerce.number(), y: z.coerce.number() })
    .optional()
    .catch(undefined)
});

const DataChartSchema = z.object({
  type: z.literal('dataChart'),
  kind: z.enum(['table', 'pictogram', 'bar', 'line', 'pie']),
  data: z.array(z.object({ label: z.string(), value: z.coerce.number() })),
  unit: z.string().optional().catch(undefined)
});

const MeasureSchema = z.object({
  type: z.literal('measure'),
  mode: z.enum(['clock', 'money', 'ruler', 'scale', 'jug', 'thermo']),
  value: z.coerce.number(),
  unit: z.string().optional().catch(undefined),
  target: z.coerce.number().optional().catch(undefined)
});

const WordBuildSchema = z.object({
  type: z.literal('wordBuild'),
  word: z.string(),
  split: z.enum(['phoneme', 'syllable', 'morpheme']),
  parts: z.array(z.string()).optional().catch(undefined)
});

const TextMarkSchema = z.object({
  type: z.literal('textMark'),
  passage: z.string(),
  mode: z.enum(['highlight', 'cloze', 'sort']).optional().catch(undefined),
  marks: z.array(z.string()).optional().catch(undefined)
});

const SentenceSchema = z.object({
  type: z.literal('sentence'),
  words: z.array(z.string()),
  label: z.enum(['pos', 'punct', 'order']).optional().catch(undefined)
});

const DiagramSchema = z.object({
  type: z.literal('diagram'),
  mode: z.enum(['label', 'cycle', 'flow', 'web', 'mindmap']),
  nodes: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      x: z.coerce.number().optional().catch(undefined),
      y: z.coerce.number().optional().catch(undefined)
    })
  ),
  edges: z
    .array(z.object({ from: z.string(), to: z.string(), label: z.string().optional().catch(undefined) }))
    .optional()
    .catch(undefined)
});

const MapSchema = z.object({
  type: z.literal('map'),
  scope: z.enum(['world', 'region', 'local', 'historical']),
  pins: z
    .array(z.object({ x: z.coerce.number(), y: z.coerce.number(), label: z.string() }))
    .optional()
    .catch(undefined),
  regions: z.array(z.string()).optional().catch(undefined),
  routes: z.array(z.object({ from: z.string(), to: z.string() })).optional().catch(undefined)
});

const TimelineSchema = z.object({
  type: z.literal('timeline'),
  events: z.array(z.object({ when: z.string(), label: z.string() })),
  scale: z.string().optional().catch(undefined)
});

const SortSchema = z.object({
  type: z.literal('sort'),
  mode: z.enum(['bucket', 'venn', 'rank']),
  groups: z.array(z.string()),
  items: z.array(z.object({ text: z.string(), group: z.string() }))
});

const MusicSchema = z.object({
  type: z.literal('music'),
  mode: z.enum(['staff', 'rhythm', 'keyboard']),
  spec: z.string()
});

const DrawSchema = z.object({
  type: z.literal('draw'),
  prompt: z.string().optional().catch(undefined),
  guides: z.string().optional().catch(undefined)
});

// ---- sequence ---------------------------------------------------------------

const StepsSchema = z.object({
  type: z.literal('steps'),
  slides: z.array(z.object({ title: z.string().optional().catch(undefined), body: z.string() })),
  reveal: z.enum(['one-by-one', 'all']).optional().catch(undefined)
});

// ---- do -----------------------------------------------------------------

const ChoiceSchema = z.object({
  type: z.literal('choice'),
  prompt: z.string(),
  options: z.array(z.string()),
  correct: z.array(z.coerce.number()),
  explain: z.string().optional().catch(undefined)
});

const EnterSchema = z.object({
  type: z.literal('enter'),
  prompt: z.string(),
  answer: z.string(),
  kind: z.enum(['number', 'text']).optional().catch(undefined),
  tolerance: z.coerce.number().optional().catch(undefined),
  unit: z.string().optional().catch(undefined)
});

const SpeakSchema = z.object({
  type: z.literal('speak'),
  prompt: z.string(),
  target: z.string().optional().catch(undefined)
});

// ---- combined ---------------------------------------------------------------

export const ElementSchema = z.discriminatedUnion('type', [
  TextSchema,
  ImageSchema,
  VideoSchema,
  SceneSchema,
  AudioSchema,
  ArraySchema,
  NumberLineSchema,
  BaseTenSchema,
  FractionSchema,
  BarModelSchema,
  NumberBondSchema,
  ShapeSchema,
  GridSchema,
  DataChartSchema,
  MeasureSchema,
  WordBuildSchema,
  TextMarkSchema,
  SentenceSchema,
  DiagramSchema,
  MapSchema,
  TimelineSchema,
  SortSchema,
  MusicSchema,
  DrawSchema,
  StepsSchema,
  ChoiceSchema,
  EnterSchema,
  SpeakSchema
]);

/** Validate a single element. Returns `null` on unrecoverable input rather
 * than throwing, so a malformed element never crashes a live lesson. */
export function parseElement(raw: unknown): LessonElement | null {
  const result = ElementSchema.safeParse(raw);
  return result.success ? (result.data as LessonElement) : null;
}

/** Validate an array of elements, dropping any that don't parse. */
export function parseElements(raw: unknown): LessonElement[] {
  if (!Array.isArray(raw)) return [];
  const out: LessonElement[] = [];
  for (const item of raw) {
    const el = parseElement(item);
    if (el) out.push(el);
  }
  return out;
}

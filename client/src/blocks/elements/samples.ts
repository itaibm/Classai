import type { LessonElement } from '@shared/elements.ts';

/**
 * One realistic sample instance per implemented element, for the dev
 * gallery (`#/dev/elements`). Grows by one entry per renderer task.
 */
export const GALLERY_SAMPLES: LessonElement[] = [
  { type: 'array', rows: 3, cols: 5, animate: 'rotate' },
  {
    type: 'text',
    value: 'Every sentence needs a noun — a word that names a person, place, thing, or idea.',
    emphasis: 'term',
    term: 'Noun',
    definition: 'A word that names a person, place, thing, or idea.',
  },
  {
    type: 'image',
    src: '',
    alt: 'A diagram of the water cycle, showing water moving between clouds, rain, and the ocean',
    caption: 'The water cycle',
    annotate: ['Evaporation', 'Condensation', 'Precipitation'],
  },
  {
    type: 'video',
    searchTerm: 'how plants make food — photosynthesis for kids',
    watchTask: 'Watch how plants turn sunlight into food.',
    afterCheck: { question: 'What gas do plants release during photosynthesis?', expectedAnswer: 'oxygen' },
  },
  {
    type: 'scene',
    items: [
      { emoji: '🍎', count: 4, label: 'apples' },
      { emoji: '🍌', count: 3, label: 'bananas' },
    ],
    layout: 'row',
    caption: 'How many pieces of fruit in total?',
  },
  {
    type: 'audio',
    src: '',
    label: 'A dog barking',
    listenTask: 'Listen closely — what do you hear?',
  },
  {
    type: 'numberLine',
    min: 0,
    max: 12,
    step: 3,
    jumps: [0, 3, 6, 9],
    target: 9,
  },
  {
    type: 'baseTen',
    value: 47,
    mode: 'blocks',
    target: 47,
  },
  {
    type: 'fraction',
    whole: ['circle'],
    num: 3,
    den: 4,
  },
  {
    type: 'barModel',
    whole: 12,
    parts: [7, '?'],
    label: 'There are 12 sweets. 7 are red, the rest are blue.',
  },
  {
    type: 'numberBond',
    whole: 10,
    parts: [6, '?'],
  },
  { type: 'shape', mode: '2d', spec: 'hexagon' },
  { type: 'shape', mode: '3d', spec: 'cylinder' },
  { type: 'shape', mode: 'angle', spec: 'obtuse 130' },
  { type: 'shape', mode: 'symmetry', spec: 'rectangle' },
  { type: 'shape', mode: 'net', spec: 'cube' },
  {
    type: 'grid',
    rows: 5,
    cols: 5,
    mode: 'coord',
    cells: [
      { x: 1, y: 1, label: 'A' },
      { x: 3, y: 4, label: 'B' },
    ],
    target: { x: 2, y: 3 },
  },
  {
    type: 'grid',
    rows: 4,
    cols: 4,
    mode: 'beebot',
    cells: [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ],
    target: { x: 3, y: 2 },
  },
  {
    type: 'grid',
    rows: 4,
    cols: 4,
    mode: 'pixel',
    cells: [
      { x: 1, y: 1, fill: 'var(--el-pink)' },
      { x: 2, y: 1, fill: 'var(--el-pink)' },
      { x: 1, y: 2, fill: 'var(--el-purple)' },
      { x: 2, y: 2, fill: 'var(--el-purple)' },
    ],
    target: { x: 0, y: 0 },
  },
  {
    type: 'dataChart',
    kind: 'bar',
    data: [
      { label: 'Cat', value: 6 },
      { label: 'Dog', value: 9 },
      { label: 'Fish', value: 4 },
    ],
    unit: 'votes',
  },
  {
    type: 'dataChart',
    kind: 'pie',
    data: [
      { label: 'Red', value: 3 },
      { label: 'Blue', value: 5 },
      { label: 'Green', value: 2 },
    ],
  },
  {
    type: 'dataChart',
    kind: 'pictogram',
    data: [
      { label: 'Apples', value: 4 },
      { label: 'Bananas', value: 7 },
    ],
    unit: 'pieces',
  },
  {
    type: 'dataChart',
    kind: 'table',
    data: [
      { label: 'Mon', value: 12 },
      { label: 'Tue', value: 18 },
      { label: 'Wed', value: 9 },
    ],
    unit: 'steps (00s)',
  },
  {
    type: 'dataChart',
    kind: 'line',
    data: [
      { label: 'Jan', value: 4 },
      { label: 'Feb', value: 7 },
      { label: 'Mar', value: 6 },
      { label: 'Apr', value: 10 },
    ],
    unit: '°C',
  },
  { type: 'measure', mode: 'clock', value: 150, target: 195 },
  { type: 'measure', mode: 'money', value: 87, target: 132 },
  { type: 'measure', mode: 'ruler', value: 12, target: 18, unit: 'cm' },
  { type: 'measure', mode: 'scale', value: 4, target: 7, unit: 'kg' },
  { type: 'measure', mode: 'jug', value: 250, target: 600, unit: 'ml' },
  { type: 'measure', mode: 'thermo', value: 18, target: 25, unit: '°C' },
];

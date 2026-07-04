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
];

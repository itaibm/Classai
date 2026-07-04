import type { LessonElement } from '@shared/elements.ts';

/**
 * One realistic sample instance per implemented element, for the dev
 * gallery (`#/dev/elements`). Grows by one entry per renderer task.
 */
export const GALLERY_SAMPLES: LessonElement[] = [{ type: 'array', rows: 3, cols: 5, animate: 'rotate' }];

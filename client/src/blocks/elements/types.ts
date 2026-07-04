import type { ElementMode, ElementResult, LessonElement } from '@shared/elements.ts';

/** Props every element renderer receives. `E` narrows to a specific LessonElement variant. */
export interface ElementProps<E = LessonElement> {
  el: E;
  mode: ElementMode;
  onResult?: (r: ElementResult) => void;
}

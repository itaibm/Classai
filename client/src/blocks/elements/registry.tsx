import type { ElementType } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

/**
 * Maps an element `type` to its React renderer. Empty at first — each
 * later task (5-11) registers one more component here as it's built.
 * `ElementView` falls back to a placeholder for any type not yet present.
 */
export const ELEMENT_REGISTRY: Partial<Record<ElementType, React.FC<ElementProps>>> = {};

export function hasRenderer(t: ElementType): boolean {
  return t in ELEMENT_REGISTRY;
}

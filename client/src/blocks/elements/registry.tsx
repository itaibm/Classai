import type { ElementType } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';
import { TextElement } from './text.tsx';
import { ImageElement } from './image.tsx';
import { VideoElement } from './video.tsx';
import { SceneElement } from './scene.tsx';
import { AudioElement } from './audio.tsx';

/**
 * Maps an element `type` to its React renderer. Empty at first — each
 * later task (5-11) registers one more component here as it's built.
 * `ElementView` falls back to a placeholder for any type not yet present.
 */
export const ELEMENT_REGISTRY: Partial<Record<ElementType, React.FC<ElementProps>>> = {
  text: TextElement as React.FC<ElementProps>,
  image: ImageElement as React.FC<ElementProps>,
  video: VideoElement as React.FC<ElementProps>,
  scene: SceneElement as React.FC<ElementProps>,
  audio: AudioElement as React.FC<ElementProps>,
};

export function hasRenderer(t: ElementType): boolean {
  return t in ELEMENT_REGISTRY;
}

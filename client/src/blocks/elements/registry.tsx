import type { ElementType } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';
import { TextElement } from './text.tsx';
import { ImageElement } from './image.tsx';
import { VideoElement } from './video.tsx';
import { SceneElement } from './scene.tsx';
import { AudioElement } from './audio.tsx';
import { ArrayElement } from './array.tsx';
import { NumberLineElement } from './numberLine.tsx';
import { BaseTenElement } from './baseTen.tsx';
import { FractionElement } from './fraction.tsx';
import { BarModelElement } from './barModel.tsx';
import { NumberBondElement } from './numberBond.tsx';
import { ShapeElement } from './shape.tsx';
import { GridElement } from './grid.tsx';
import { DataChartElement } from './dataChart.tsx';
import { MeasureElement } from './measure.tsx';

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
  array: ArrayElement as React.FC<ElementProps>,
  numberLine: NumberLineElement as React.FC<ElementProps>,
  baseTen: BaseTenElement as React.FC<ElementProps>,
  fraction: FractionElement as React.FC<ElementProps>,
  barModel: BarModelElement as React.FC<ElementProps>,
  numberBond: NumberBondElement as React.FC<ElementProps>,
  shape: ShapeElement as React.FC<ElementProps>,
  grid: GridElement as React.FC<ElementProps>,
  dataChart: DataChartElement as React.FC<ElementProps>,
  measure: MeasureElement as React.FC<ElementProps>,
};

export function hasRenderer(t: ElementType): boolean {
  return t in ELEMENT_REGISTRY;
}

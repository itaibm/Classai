import type { ElementMode, ElementResult, LessonElement } from '@shared/elements.ts';
import { ELEMENT_REGISTRY } from './registry.tsx';
import type { ElementProps } from './types.ts';
import './tokens.css';

/**
 * The shared renderer shell: looks up the registry for `el.type`, renders
 * that component (or a labelled placeholder if none is registered yet),
 * wrapped in the common `.el-card` shell.
 */
export function ElementView({
  el,
  mode,
  onResult,
}: {
  el: LessonElement;
  mode: ElementMode;
  onResult?: (r: ElementResult) => void;
}) {
  const C = ELEMENT_REGISTRY[el.type] as React.FC<ElementProps<LessonElement>> | undefined;
  return (
    <div className="el-card" data-el={el.type}>
      {C ? <C el={el} mode={mode} onResult={onResult} /> : <div className="el-todo">no renderer yet: {el.type}</div>}
    </div>
  );
}

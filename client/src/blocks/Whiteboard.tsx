/**
 * Whiteboard the tutor draws on. Renders declarative drawing elements on a
 * 100×62 SVG canvas. With `animate`, elements appear in sequence and strokes
 * "ink in" so it looks like the character is sketching as it explains.
 */
import { useId } from 'react';
import type { WhiteboardBlock, WhiteboardElement, DrawColor } from '@shared/types';

const COLOR: Record<DrawColor, string> = {
  ink: 'var(--ink)',
  accent: 'var(--accent)',
  red: '#d35c5c',
  green: '#2e9e6b',
  blue: '#3b82f6',
  orange: '#e0792f',
  purple: '#9b59b6'
};
const col = (c?: DrawColor) => COLOR[c || 'ink'];

export function Whiteboard({ block }: { block: WhiteboardBlock }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const animate = block.animate !== false; // default on
  const step = 0.5;

  return (
    <div className="block-card whiteboard">
      {block.title && <div className="board-title">{block.title}</div>}
      <svg viewBox="0 0 100 62" width="100%" className="wb-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id={`arrow-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
          </marker>
        </defs>
        {block.elements.map((el, i) => {
          const hostRect = el.k === 'text'
            ? block.elements.find((candidate): candidate is Extract<WhiteboardElement, { k: 'rect' }> =>
                candidate.k === 'rect' && el.x >= candidate.x && el.x <= candidate.x + candidate.w && el.y >= candidate.y && el.y <= candidate.y + candidate.h)
            : undefined;
          const hasInnerText = el.k === 'rect' && block.elements.some((candidate) =>
            candidate.k === 'text' && candidate.x >= el.x && candidate.x <= el.x + el.w && candidate.y >= el.y && candidate.y <= el.y + el.h);
          return (
            <Element key={i} el={el} i={i} animate={animate} step={step}
              marker={`url(#arrow-${uid})`} hostRect={hostRect} hasInnerText={hasInnerText} />
          );
        })}
      </svg>
    </div>
  );
}

type RectElement = Extract<WhiteboardElement, { k: 'rect' }>;

function Element({ el, i, animate, step, marker, hostRect, hasInnerText }: {
  el: WhiteboardElement;
  i: number;
  animate: boolean;
  step: number;
  marker: string;
  hostRect?: RectElement;
  hasInnerText?: boolean;
}) {
  const delay = `${i * step}s`;
  const drawStyle = animate ? { animationDelay: delay } : undefined;
  const drawCls = animate ? 'wb-draw' : '';
  const fadeCls = animate ? 'wb-fade' : '';
  const c = col(el.k === 'line' || el.k === 'path' || el.k === 'rect' || el.k === 'circle' || el.k === 'text' || el.k === 'dot' ? (el as any).color : undefined);

  switch (el.k) {
    case 'line':
      return (
        <line x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} pathLength={1}
          className={drawCls} style={{ ...drawStyle, stroke: c }}
          strokeWidth={el.width ?? 1.2} strokeLinecap="round" vectorEffect="non-scaling-stroke"
          strokeDasharray={el.dashed ? '4 3' : undefined}
          markerEnd={el.arrow ? marker : undefined} />
      );
    case 'path': {
      const d = el.points.map((p, k) => `${k === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ') + (el.closed ? ' Z' : '');
      return (
        <path d={d} pathLength={1} fill="none" className={drawCls} style={{ ...drawStyle, stroke: c }}
          strokeWidth={el.width ?? 1.2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      );
    }
    case 'rect':
      return (
        <g className={fadeCls} style={drawStyle}>
          <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={1.5}
            style={{ stroke: c, fill: el.fill ? c : 'transparent', fillOpacity: el.fill ? 0.12 : 0 }}
            strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
          {el.label && <ShapeLabel rect={el} color={c} compact={Boolean(hasInnerText)} />}
        </g>
      );
    case 'circle':
      return (
        <g className={fadeCls} style={drawStyle}>
          <circle cx={el.x} cy={el.y} r={el.r}
            style={{ stroke: c, fill: el.fill ? c : 'transparent', fillOpacity: el.fill ? 0.12 : 0 }}
            strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
          {el.label && <text x={el.x} y={el.y} fontSize={4.5} textAnchor="middle" dominantBaseline="central" style={{ fill: c }}>{el.label}</text>}
        </g>
      );
    case 'dot':
      return (
        <g className={fadeCls} style={drawStyle}>
          <circle cx={el.x} cy={el.y} r={1.6} style={{ fill: c }} />
          {el.label && <text x={el.x} y={el.y - 3} fontSize={4} textAnchor="middle" style={{ fill: c }}>{el.label}</text>}
        </g>
      );
    case 'text':
      if (hostRect) {
        const glyphs = Math.max(1, Array.from(el.value).length);
        const fontSize = Math.max(2.5, Math.min(el.size ?? 5, hostRect.h * 0.42, (hostRect.w - 3) / (glyphs * 0.72)));
        return (
          <text x={hostRect.x + hostRect.w / 2} y={hostRect.y + hostRect.h * 0.66}
            fontSize={fontSize} textAnchor="middle" dominantBaseline="central"
            className={fadeCls} style={{ ...drawStyle, fill: c, fontWeight: el.bold ? 800 : 600 }}>
            {el.value}
          </text>
        );
      }
      return (
        <text x={el.x} y={el.y} fontSize={el.size ?? 5} className={fadeCls} style={{ ...drawStyle, fill: c, fontWeight: el.bold ? 800 : 600 }}>{el.value}</text>
      );
    default:
      return null;
  }
}

function ShapeLabel({ rect, color, compact }: { rect: RectElement; color: string; compact: boolean }) {
  const x = rect.x + 1;
  const y = rect.y + (compact ? 1 : 1.5);
  const width = Math.max(1, rect.w - 2);
  const height = compact ? Math.max(4, rect.h * 0.28) : Math.max(1, rect.h - 3);
  const fontSize = compact ? 2.8 : rect.label && rect.label.length > 14 ? 3.1 : 3.6;
  return (
    <foreignObject x={x} y={y} width={width} height={height} pointerEvents="none">
      <div className="wb-shape-label" style={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', textAlign: 'center', overflowWrap: 'anywhere', lineHeight: 1.05,
        fontSize: `${fontSize}px`, fontWeight: 700, color, boxSizing: 'border-box', padding: '0 .4px'
      }}>
        {rect.label}
      </div>
    </foreignObject>
  );
}

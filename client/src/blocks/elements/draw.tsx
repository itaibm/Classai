import { useRef, useState } from 'react';
import type { ElementProps } from './types.ts';
import type { DrawEl, ElementResult } from '@shared/elements.ts';

/* ------------------------------------------------------------------ */
/* guide-shape parsing                                                  */
/* ------------------------------------------------------------------ */

type GuideShape = 'circle' | 'square' | 'triangle' | 'line' | 'zigzag' | 'star';
const GUIDE_KEYWORDS: readonly GuideShape[] = ['circle', 'square', 'triangle', 'line', 'zigzag', 'star'];

/**
 * `guides` is free text (e.g. "a circle and a wavy line"), not a structured
 * shape list. We lowercase + split on non-letters and keep any recognised
 * shape keyword, in the order it appears, de-duplicated isn't required
 * since drawing the same guide twice is harmless. Unrecognised guide text
 * still shows as a caption under the canvas (see `DrawDemonstrate`) so
 * nothing authored is silently dropped, even if it isn't drawn.
 */
function parseGuideShapes(guides: string): GuideShape[] {
  const tokens = guides.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  return GUIDE_KEYWORDS.filter((shape) => tokens.includes(shape));
}

function starPoints(cx: number, cy: number, rOuter: number, rInner: number, spikes: number): string {
  const pts: string[] = [];
  const step = Math.PI / spikes;
  let angle = -Math.PI / 2;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    angle += step;
  }
  return pts.join(' ');
}

function GuideShapeSvg({ shape, cx, cy, size }: { shape: GuideShape; cx: number; cy: number; size: number }) {
  const stroke = 'var(--el-faint)';
  const common = { fill: 'none', stroke, strokeWidth: 2, strokeDasharray: '4 4' };
  switch (shape) {
    case 'circle':
      return <circle cx={cx} cy={cy} r={size / 2} {...common} />;
    case 'square':
      return <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} rx="4" {...common} />;
    case 'triangle': {
      const h = size * 0.87;
      const points = `${cx},${cy - h / 2} ${cx - size / 2},${cy + h / 2} ${cx + size / 2},${cy + h / 2}`;
      return <polygon points={points} {...common} />;
    }
    case 'line':
      return <line x1={cx - size / 2} y1={cy + size / 2} x2={cx + size / 2} y2={cy - size / 2} {...common} />;
    case 'zigzag': {
      const pts = [
        [cx - size / 2, cy + size / 3],
        [cx - size / 6, cy - size / 3],
        [cx + size / 6, cy + size / 3],
        [cx + size / 2, cy - size / 3],
      ]
        .map(([x, y]) => `${x},${y}`)
        .join(' ');
      return <polyline points={pts} {...common} />;
    }
    case 'star':
      return <polygon points={starPoints(cx, cy, size / 2, size / 4.5, 5)} {...common} />;
    default:
      return null;
  }
}

function GuideShapes({ shapes, cy }: { shapes: GuideShape[]; cy: number }) {
  return (
    <>
      {shapes.map((shape, i) => {
        const cx = shapes.length === 1 ? 130 : 46 + i * (168 / Math.max(1, shapes.length - 1));
        return <GuideShapeSvg key={i} shape={shape} cx={cx} cy={cy} size={64} />;
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* demonstrate — prompt + faint traceable guides                       */
/* ------------------------------------------------------------------ */

function DrawDemonstrate({ el }: { el: DrawEl }) {
  const shapes = parseGuideShapes(el.guides ?? '');
  return (
    <div className="el-stack">
      {el.prompt && <p className="el-prompt">{el.prompt}</p>}
      <svg viewBox="0 0 260 160" width="240" role="img" aria-label="drawing guide">
        <rect x="4" y="4" width="252" height="152" rx="12" fill="var(--el-surface-2)" stroke="var(--el-line)" strokeWidth="1.5" />
        {shapes.length > 0 ? (
          <GuideShapes shapes={shapes} cy={80} />
        ) : (
          <text x="130" y="84" textAnchor="middle" fontSize="11" fill="var(--el-faint)">
            Trace freely — no guide shape given
          </text>
        )}
      </svg>
      {el.guides && (
        <p className="el-prompt" style={{ fontSize: 12 }}>
          Guide: {el.guides}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* manipulate — a real pointer-drawable canvas                         */
/* ------------------------------------------------------------------ */

const CANVAS_W = 260;
const CANVAS_H = 160;

/** Canvas 2D `strokeStyle` can't take a raw `var(--x)` string — it needs a
 * resolved color. We read the custom property off the live element via
 * `getComputedStyle` so the stroke still tracks the current theme, with a
 * plain color-keyword fallback (never a hex literal) if it's ever empty. */
function resolveVar(el: Element, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v.length > 0 ? v : fallback;
}

function DrawManipulate({ el, onResult }: { el: DrawEl; onResult?: (r: ElementResult) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [done, setDone] = useState(false);
  const shapes = parseGuideShapes(el.guides ?? '');

  function pointFromEvent(e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const p = pointFromEvent(e);
    if (!ctx || !p) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    ctx.strokeStyle = resolveVar(canvas, '--el-accent', 'black');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const p = pointFromEvent(e);
    if (!ctx || !p) return;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    if (!hasDrawn) setHasDrawn(true);
  }

  function stopDrawing() {
    drawingRef.current = false;
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  /** Drawing is creative, not gradeable — finishing always reports success. */
  function finish() {
    if (done) return;
    setDone(true);
    onResult?.({ text: 'drew it', correct: true });
  }

  return (
    <div className="el-stack">
      {el.prompt && <p className="el-prompt">{el.prompt}</p>}
      <div style={{ position: 'relative', width: CANVAS_W, height: CANVAS_H }}>
        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <rect x="1" y="1" width={CANVAS_W - 2} height={CANVAS_H - 2} rx="12" fill="var(--el-surface-2)" stroke="var(--el-line)" strokeWidth="1.5" />
          <GuideShapes shapes={shapes} cy={CANVAS_H / 2} />
        </svg>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ position: 'absolute', inset: 0, touchAction: 'none', cursor: done ? 'default' : 'crosshair', borderRadius: 12 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" className="el-btn" disabled={done || !hasDrawn} onClick={clear}>
          Clear
        </button>
        <button type="button" className="el-btn" disabled={done} onClick={finish}>
          Done
        </button>
      </div>
      {done && (
        <p className="el-prompt" style={{ color: 'var(--el-green)' }}>
          ✓ Nice drawing!
        </p>
      )}
    </div>
  );
}

/**
 * `draw` — a free-drawing canvas activity.
 *
 * demonstrate: shows `prompt` plus a faint traceable outline for each
 * recognised shape keyword found in `guides` (see `parseGuideShapes`); with
 * no recognised shape it shows an empty canvas frame so it's never blank
 * of meaning.
 * manipulate: a real pointer-driven `<canvas>` (mouse + touch/pen via the
 * Pointer Events API) layered over the same faint guides, with Clear and
 * Done. Drawing is inherently creative, so Done always reports
 * `{ text: 'drew it', correct: true }` — there is nothing to grade. The
 * canvas ref is guarded everywhere (`if (!canvas) return`) since it's null
 * until mount and briefly during unmount.
 */
export const DrawElement: React.FC<ElementProps<DrawEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <DrawManipulate el={el} onResult={onResult} />;
  return <DrawDemonstrate el={el} />;
};

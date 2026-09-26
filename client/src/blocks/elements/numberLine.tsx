import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { NumberLineEl } from '@shared/elements.ts';
import { numberLineTicks } from './geometry.ts';

const BASELINE = 88;

/** The horizontal line + tick marks + number labels, shared by both modes. */
function Axis({ ticks }: { ticks: ReturnType<typeof numberLineTicks> }) {
  const first = ticks[0];
  const last = ticks[ticks.length - 1];
  return (
    <>
      <line x1={first?.x ?? 16} y1={BASELINE} x2={last?.x ?? 244} y2={BASELINE} stroke="var(--el-line)" strokeWidth="2" />
      {ticks.map((t) => (
        <g key={t.n}>
          <line
            x1={t.x}
            y1={BASELINE - (t.big ? 8 : 5)}
            x2={t.x}
            y2={BASELINE + (t.big ? 8 : 5)}
            stroke="var(--el-muted)"
            strokeWidth="1.5"
          />
          <text x={t.x} y={BASELINE + 20} textAnchor="middle" fontSize="10" fill="var(--el-muted)">
            {t.n}
          </text>
        </g>
      ))}
    </>
  );
}

/** A skip-count arc above the line from `x1` to `x2`, labelled `+delta`. */
function JumpArc({ x1, x2, delta }: { x1: number; x2: number; delta: number }) {
  const mid = (x1 + x2) / 2;
  const height = Math.min(34, 14 + Math.abs(x2 - x1) * 0.25);
  return (
    <g>
      <path
        d={`M${x1} ${BASELINE} Q${mid} ${BASELINE - height} ${x2} ${BASELINE}`}
        fill="none"
        stroke="var(--el-orange)"
        strokeWidth="2"
        markerEnd="url(#nl-arrow)"
      />
      <text x={mid} y={BASELINE - height - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--el-orange)">
        +{delta}
      </text>
    </g>
  );
}

/**
 * `numberLine` — a labelled number line with optional skip-count jump arcs,
 * plain marks, and a target.
 *
 * demonstrate: draws the axis, then `jumps[]` as labelled arcs and `marks[]`
 * as dots; `target` is ringed in green (the tutor is showing where it lands).
 * manipulate: the target is hidden; the child taps a number below the line
 * and the tap is compared against `target`.
 */
export const NumberLineElement: React.FC<ElementProps<NumberLineEl>> = ({ el, mode, onResult }) => {
  const ticks = numberLineTicks(el.min, el.max);
  const [picked, setPicked] = useState<number | null>(null);
  const jumps = el.jumps ?? [];

  const arrowDefs = (
    <defs>
      <marker id="nl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--el-orange)" />
      </marker>
    </defs>
  );

  if (mode === 'manipulate') {
    const done = picked !== null;
    const correct = el.target === undefined ? undefined : picked === el.target;
    return (
      <div className="el-stack">
        <p className="el-prompt">Tap the number on the line.</p>
        <svg viewBox="0 0 260 150" width="240" role="img" aria-label={`number line from ${el.min} to ${el.max}`}>
          <Axis ticks={ticks} />
        </svg>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {ticks.map((t) => (
            <button
              key={t.n}
              type="button"
              className="el-btn"
              disabled={done}
              aria-pressed={picked === t.n}
              style={picked === t.n ? { borderColor: 'var(--el-accent)', color: 'var(--el-accent)' } : undefined}
              onClick={() => {
                setPicked(t.n);
                onResult?.({ text: String(t.n), correct: el.target === undefined ? undefined : t.n === el.target });
              }}
            >
              {t.n}
            </button>
          ))}
        </div>
        {done && el.target !== undefined && (
          <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
            {correct ? '✓ Correct!' : `Not quite — it was ${el.target}.`}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="el-stack">
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label="number line">
        {arrowDefs}
        <Axis ticks={ticks} />
        {jumps.slice(0, -1).map((from, i) => {
          const to = jumps[i + 1];
          const x1 = ticks.find((t) => t.n === from)?.x;
          const x2 = to === undefined ? undefined : ticks.find((t) => t.n === to)?.x;
          if (to === undefined || x1 === undefined || x2 === undefined) return null;
          return <JumpArc key={i} x1={x1} x2={x2} delta={el.step ?? to - from} />;
        })}
        {(el.marks ?? []).map((m) => {
          const x = ticks.find((t) => t.n === m)?.x;
          if (x === undefined) return null;
          return <circle key={m} cx={x} cy={BASELINE} r="5" fill="var(--el-blue)" />;
        })}
        {el.target !== undefined &&
          (() => {
            const x = ticks.find((t) => t.n === el.target)?.x;
            if (x === undefined) return null;
            return <circle cx={x} cy={BASELINE} r="7" fill="none" stroke="var(--el-green)" strokeWidth="2.5" />;
          })()}
      </svg>
    </div>
  );
};

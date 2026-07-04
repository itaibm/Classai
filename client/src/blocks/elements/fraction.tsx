import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { FractionEl } from '@shared/elements.ts';
import { pieSlices } from './geometry.ts';

/** A bar split into `den` equal segments; `shaded` of them are filled. */
function Bar({ den, shaded, onTap }: { den: number; shaded: (i: number) => boolean; onTap?: (i: number) => void }) {
  const w = 120 / den;
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" role="img" aria-label={`bar split into ${den}`}>
      {Array.from({ length: den }).map((_, i) => (
        <rect
          key={i}
          x={i * w}
          y="0"
          width={w}
          height="40"
          fill={shaded(i) ? 'var(--el-blue)' : 'var(--el-surface-2)'}
          stroke="var(--el-surface)"
          strokeWidth="2"
          style={onTap ? { cursor: 'pointer' } : undefined}
          onClick={onTap ? () => onTap(i) : undefined}
        />
      ))}
      <rect x="0.5" y="0.5" width="119" height="39" fill="none" stroke="var(--el-line)" strokeWidth="1.5" />
    </svg>
  );
}

/** A circle split into `den` pie slices via `pieSlices`; `shaded` of them are filled. */
function Circle({ den, shaded, onTap }: { den: number; shaded: (i: number) => boolean; onTap?: (i: number) => void }) {
  const slices = pieSlices(den, 34);
  return (
    <svg width="76" height="76" viewBox="-38 -38 76 76" role="img" aria-label={`circle split into ${den}`}>
      {slices.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={shaded(i) ? 'var(--el-blue)' : 'var(--el-surface-2)'}
          stroke="var(--el-surface)"
          strokeWidth="1.5"
          style={onTap ? { cursor: 'pointer' } : undefined}
          onClick={onTap ? () => onTap(i) : undefined}
        />
      ))}
      <circle cx="0" cy="0" r="34" fill="none" stroke="var(--el-line)" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * `fraction` — one or more wholes (bars or circles), each split into `den`
 * parts, with `num` parts shaded across all of them together (so improper
 * fractions across multiple wholes — e.g. 5/4 as two quarters-circles — work).
 *
 * demonstrate: the first `num` parts (in whole-then-segment order) are shaded.
 * manipulate: the child taps parts on/off; a Check compares the shaded count to `num`.
 */
export const FractionElement: React.FC<ElementProps<FractionEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <FractionManipulate el={el} onResult={onResult} />;
  return <FractionDemonstrate el={el} />;
};

function FractionManipulate({
  el,
  onResult,
}: {
  el: FractionEl;
  onResult?: (r: import('@shared/elements.ts').ElementResult) => void;
}) {
  const wholes = el.whole.length > 0 ? el.whole : ['bar' as const];
  const totalParts = wholes.length * el.den;
  const [shadedSet, setShadedSet] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const correct = done ? shadedSet.size === el.num : undefined;
  return (
      <div className="el-stack">
        <p className="el-prompt">Tap parts to shade {el.num} of {totalParts}.</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          {wholes.map((shape, wi) => {
            const isShaded = (i: number) => shadedSet.has(wi * el.den + i);
            const tap = (i: number) => {
              if (done) return;
              setShadedSet((prev) => {
                const key = wi * el.den + i;
                const next = new Set(prev);
                if (next.has(key)) next.delete(key);
                else next.add(key);
                return next;
              });
            };
            return shape === 'circle' ? (
              <Circle key={wi} den={el.den} shaded={isShaded} onTap={tap} />
            ) : (
              <Bar key={wi} den={el.den} shaded={isShaded} onTap={tap} />
            );
          })}
        </div>
        <button
          className="el-btn"
          disabled={done}
          onClick={() => {
            setDone(true);
            onResult?.({ text: `${shadedSet.size}/${totalParts}`, correct: shadedSet.size === el.num });
          }}
        >
          Check
        </button>
        {done && (
          <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
            {correct ? '✓ Correct!' : `Not quite — it should be ${el.num} of ${totalParts}.`}
          </p>
        )}
      </div>
    );
}

function FractionDemonstrate({ el }: { el: FractionEl }) {
  const wholes = el.whole.length > 0 ? el.whole : ['bar' as const];
  const isShadedDemo = (globalIndex: number) => globalIndex < el.num;
  return (
    <div className="el-stack">
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        {wholes.map((shape, wi) =>
          shape === 'circle' ? (
            <Circle key={wi} den={el.den} shaded={(i) => isShadedDemo(wi * el.den + i)} />
          ) : (
            <Bar key={wi} den={el.den} shaded={(i) => isShadedDemo(wi * el.den + i)} />
          )
        )}
      </div>
      <p className="el-prompt el-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--el-ink)' }}>
        {el.num}⁄{el.den}
      </p>
    </div>
  );
}

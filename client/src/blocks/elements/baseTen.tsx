import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { BaseTenEl } from '@shared/elements.ts';
import { tenFrameCells } from './geometry.ts';

/** A single "ten rod" — a strip of 10 unit divisions, for the `blocks` view. */
function Rod({ color = 'var(--el-blue)' }: { color?: string }) {
  return (
    <svg width="18" height="76" viewBox="0 0 18 76" aria-hidden="true">
      <rect x="1" y="1" width="16" height="74" rx="3" fill={color} stroke="var(--el-line)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1="1" y1={1 + (i + 1) * 7.4} x2="17" y2={1 + (i + 1) * 7.4} stroke="var(--el-surface)" strokeWidth="1" opacity="0.6" />
      ))}
    </svg>
  );
}

/** A single "one" unit square, for the `blocks` view. */
function Unit({ color = 'var(--el-orange)' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="2" fill={color} stroke="var(--el-line)" />
    </svg>
  );
}

function clampDigit(n: number): number {
  return Math.max(0, Math.min(9, Math.round(n)));
}

/**
 * `baseTen` — place value: ten-frame, base-ten blocks, or a place-value chart.
 *
 * demonstrate: `tenFrame` fills the 10-cell frame up to `value` (extra beyond
 * 10 is called out in text); `blocks` shows tens-rods + ones-units; `placeValue`
 * shows a hundreds/tens/ones chart.
 * manipulate: the child builds towards `target` — tapping frame cells,
 * adding rods/units, or typing each column — and a Done/Check reports the total.
 */
export const BaseTenElement: React.FC<ElementProps<BaseTenEl>> = ({ el, mode, onResult }) => {
  const viewMode = el.mode ?? 'tenFrame';

  if (mode === 'manipulate') return <BaseTenManipulate el={el} viewMode={viewMode} onResult={onResult} />;

  if (viewMode === 'blocks') {
    const tens = Math.floor(el.value / 10);
    const ones = el.value % 10;
    return (
      <div className="el-stack">
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: tens }).map((_, i) => (
              <Rod key={i} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 90 }}>
            {Array.from({ length: ones }).map((_, i) => (
              <Unit key={i} />
            ))}
          </div>
        </div>
        <p className="el-prompt">
          {tens} ten{tens === 1 ? '' : 's'} and {ones} one{ones === 1 ? '' : 's'} = {el.value}
        </p>
      </div>
    );
  }

  if (viewMode === 'placeValue') {
    const clamped = Math.max(0, Math.min(999, Math.round(el.value)));
    const h = Math.floor(clamped / 100);
    const t = Math.floor((clamped % 100) / 10);
    const o = clamped % 10;
    const cols: { label: string; digit: number; color: string }[] = [
      { label: 'H', digit: h, color: 'var(--el-purple)' },
      { label: 'T', digit: t, color: 'var(--el-blue)' },
      { label: 'O', digit: o, color: 'var(--el-orange)' },
    ];
    return (
      <div className="el-stack">
        <div style={{ display: 'flex', gap: 10 }}>
          {cols.map((c) => (
            <div
              key={c.label}
              style={{
                width: 56,
                textAlign: 'center',
                border: `2px solid ${c.color}`,
                borderRadius: 12,
                padding: '8px 0',
                opacity: c.digit === 0 && c.label === 'H' ? 0.35 : 1,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.label}</div>
              <div className="el-display" style={{ fontSize: 26, fontWeight: 800, color: 'var(--el-ink)' }}>
                {c.digit}
              </div>
            </div>
          ))}
        </div>
        <p className="el-prompt">{clamped}</p>
      </div>
    );
  }

  // tenFrame
  const cells = tenFrameCells();
  const fill = Math.max(0, Math.min(10, el.value));
  return (
    <div className="el-stack">
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label={`ten frame showing ${el.value}`}>
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width="40"
            height="40"
            rx="6"
            fill={i < fill ? 'var(--el-blue)' : 'var(--el-surface-2)'}
            stroke="var(--el-line)"
            strokeWidth="2"
          />
        ))}
      </svg>
      <p className="el-prompt">{el.value > 10 ? `${el.value} — a full frame of 10, and ${el.value - 10} more` : String(el.value)}</p>
    </div>
  );
};

type ManipulateProps = {
  el: BaseTenEl;
  onResult?: (r: import('@shared/elements.ts').ElementResult) => void;
};

/** Dispatches to one of three leaf components — each owns its own hooks
 * unconditionally, so switching `viewMode` never changes hook call order
 * within a single mounted component. */
function BaseTenManipulate({ el, viewMode, onResult }: ManipulateProps & { viewMode: 'tenFrame' | 'blocks' | 'placeValue' }) {
  if (viewMode === 'blocks') return <BlocksManipulate el={el} onResult={onResult} />;
  if (viewMode === 'placeValue') return <PlaceValueManipulate el={el} onResult={onResult} />;
  return <TenFrameManipulate el={el} onResult={onResult} />;
}

function BlocksManipulate({ el, onResult }: ManipulateProps) {
  const [done, setDone] = useState(false);
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  const total = tens * 10 + ones;
  return (
      <div className="el-stack">
        <p className="el-prompt">Build {el.target ?? el.value} using tens and ones.</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center', minHeight: 76 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: tens }).map((_, i) => (
              <Rod key={i} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 90 }}>
            {Array.from({ length: ones }).map((_, i) => (
              <Unit key={i} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="el-btn" disabled={done} onClick={() => setTens((n) => n + 1)}>+ tens rod</button>
          <button className="el-btn" disabled={done} onClick={() => setOnes((n) => n + 1)}>+ one</button>
        </div>
        <button
          className="el-btn"
          disabled={done}
          onClick={() => {
            setDone(true);
            onResult?.({ text: String(total), correct: el.target === undefined ? undefined : total === el.target });
          }}
        >
          Done — that's {total}
        </button>
        {done && el.target !== undefined && (
          <p className="el-prompt" style={{ color: total === el.target ? 'var(--el-green)' : 'var(--el-red)' }}>
            {total === el.target ? '✓ Correct!' : `Not quite — it should be ${el.target}.`}
          </p>
        )}
      </div>
    );
}

function PlaceValueManipulate({ el, onResult }: ManipulateProps) {
  const [done, setDone] = useState(false);
  const [h, setH] = useState(0);
  const [t, setT] = useState(0);
  const [o, setO] = useState(0);
  const total = h * 100 + t * 10 + o;
  const cols: { label: string; digit: number; set: (n: number) => void; color: string }[] = [
    { label: 'H', digit: h, set: setH, color: 'var(--el-purple)' },
    { label: 'T', digit: t, set: setT, color: 'var(--el-blue)' },
    { label: 'O', digit: o, set: setO, color: 'var(--el-orange)' },
  ];
  return (
      <div className="el-stack">
        <p className="el-prompt">Type {el.target ?? el.value} into the place-value chart.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {cols.map((c) => (
            <div key={c.label} style={{ width: 56, textAlign: 'center', border: `2px solid ${c.color}`, borderRadius: 12, padding: '8px 0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.label}</div>
              <input
                type="number"
                min={0}
                max={9}
                disabled={done}
                value={c.digit}
                onChange={(e) => c.set(clampDigit(Number(e.target.value)))}
                className="el-display"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 800,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--el-ink)',
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="el-btn"
          disabled={done}
          onClick={() => {
            setDone(true);
            onResult?.({ text: String(total), correct: el.target === undefined ? undefined : total === el.target });
          }}
        >
          Check
        </button>
        {done && el.target !== undefined && (
          <p className="el-prompt" style={{ color: total === el.target ? 'var(--el-green)' : 'var(--el-red)' }}>
            {total === el.target ? '✓ Correct!' : `Not quite — it should be ${el.target}.`}
          </p>
        )}
      </div>
    );
}

function TenFrameManipulate({ el, onResult }: ManipulateProps) {
  const [done, setDone] = useState(false);
  const cells = tenFrameCells();
  const [filled, setFilled] = useState<Set<number>>(new Set());
  return (
    <div className="el-stack">
      <p className="el-prompt">Tap cells to show {el.target ?? el.value}.</p>
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label="tap the ten frame">
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width="40"
            height="40"
            rx="6"
            fill={filled.has(i) ? 'var(--el-blue)' : 'var(--el-surface-2)'}
            stroke="var(--el-line)"
            strokeWidth="2"
            style={{ cursor: done ? 'default' : 'pointer' }}
            onClick={() => {
              if (done) return;
              setFilled((prev) => {
                const next = new Set(prev);
                if (next.has(i)) next.delete(i);
                else next.add(i);
                return next;
              });
            }}
          />
        ))}
      </svg>
      <button
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: String(filled.size), correct: el.target === undefined ? undefined : filled.size === el.target });
        }}
      >
        Done — I filled {filled.size}
      </button>
      {done && el.target !== undefined && (
        <p className="el-prompt" style={{ color: filled.size === el.target ? 'var(--el-green)' : 'var(--el-red)' }}>
          {filled.size === el.target ? '✓ Correct!' : `Not quite — it should be ${el.target}.`}
        </p>
      )}
    </div>
  );
}

import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, TimelineEl } from '@shared/elements.ts';
import { zigzagOrder } from './shuffle.ts';

const VBW = 260;
const VBH = 150;
const LINE_Y = 75;
const LEFT = 24;
const RIGHT = 232;

function eventX(i: number, n: number): number {
  if (n <= 1) return (LEFT + RIGHT) / 2;
  return LEFT + ((RIGHT - LEFT) * i) / (n - 1);
}

function TimelineDemonstrate({ el }: { el: TimelineEl }) {
  const events = el.events;
  const n = events.length;
  return (
    <div className="el-stack">
      <svg viewBox={`0 0 ${VBW} ${VBH}`} width="240" role="img" aria-label="timeline">
        <line x1={LEFT} y1={LINE_Y} x2={RIGHT} y2={LINE_Y} stroke="var(--el-line)" strokeWidth="3" strokeLinecap="round" />
        <path
          d={`M ${RIGHT - 6} ${LINE_Y - 5} L ${RIGHT + 5} ${LINE_Y} L ${RIGHT - 6} ${LINE_Y + 5} Z`}
          fill="var(--el-line)"
        />
        {events.map((ev, i) => {
          const x = eventX(i, n);
          const above = i % 2 === 0;
          const whenY = above ? LINE_Y - 18 : LINE_Y + 26;
          const labelY = above ? LINE_Y - 34 : LINE_Y + 42;
          const label = ev.label.length > 16 ? `${ev.label.slice(0, 15)}…` : ev.label;
          return (
            <g key={i}>
              <line x1={x} y1={LINE_Y - 6} x2={x} y2={LINE_Y + 6} stroke="var(--el-accent)" strokeWidth="2" />
              <circle cx={x} cy={LINE_Y} r="5" fill="var(--el-accent)" stroke="var(--el-surface)" strokeWidth="1.5" />
              <text x={x} y={whenY} textAnchor="middle" fontSize="8" fontWeight="800" fill="var(--el-accent)">
                {ev.when}
              </text>
              <text x={x} y={labelY} textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--el-ink)">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      {el.scale && <p className="el-prompt">{el.scale}</p>}
    </div>
  );
}

/**
 * The tutor's `events` order IS the correct chronological order. Tiles show
 * only the `label` while placing (the `when` date would give the order away
 * outright) and reveal `when` once the round is checked. Graded by comparing
 * the resulting sequence of original event INDICES to 0..n-1 — never by
 * matching label text — so repeated `when`/`label` values across events can
 * never cause a correct ordering to be marked wrong.
 */
function TimelineManipulate({ el, onResult }: { el: TimelineEl; onResult?: (r: ElementResult) => void }) {
  const events = el.events;
  const n = events.length;
  const [tray] = useState(() => zigzagOrder(n));
  const [placed, setPlaced] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const remaining = tray.filter((i) => !placed.includes(i));
  const correct = placed.length === n && placed.every((idx, pos) => idx === pos);

  function tap(idx: number) {
    if (done || placed.includes(idx)) return;
    const next = [...placed, idx];
    setPlaced(next);
    if (next.length === n) {
      setDone(true);
      const text = next.map((i) => events[i]?.label ?? '').join(' → ');
      onResult?.({ text, correct: next.every((idx, pos) => idx === pos) });
    }
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the events into the order they happened — earliest first.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        {Array.from({ length: n }, (_, pos) => {
          const idx = placed[pos];
          const ev = idx !== undefined ? events[idx] : undefined;
          return (
            <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span
                className="el-display"
                style={{
                  minWidth: 64,
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: ev ? 'var(--el-on-accent)' : 'var(--el-faint)',
                  background: ev ? 'var(--el-blue)' : 'var(--el-surface-2)',
                  border: ev ? 'none' : '2px dashed var(--el-line)',
                  borderRadius: 8,
                  padding: '6px 8px',
                }}
              >
                {ev ? ev.label : `${pos + 1}`}
              </span>
              {done && ev && <span style={{ fontSize: 9, color: 'var(--el-muted)' }}>{ev.when}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {remaining.map((idx) => {
          const ev = events[idx];
          if (!ev) return null;
          return (
            <button key={idx} type="button" className="el-btn" onClick={() => tap(idx)} disabled={done}>
              {ev.label}
            </button>
          );
        })}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct order!' : `Not quite — the order is ${events.map((e) => e.label).join(' → ')}.`}
        </p>
      )}
    </div>
  );
}

/**
 * `timeline` — a horizontal line with `events` marked in order, `when` +
 * `label` alternating above/below to avoid crowding, plus an optional
 * `scale` caption.
 *
 * demonstrate: draws the events in their authored (correct) order.
 * manipulate: events are shuffled (deterministically, never trivially in
 * order) and shown label-only; the child taps them back into chronological
 * order. Graded by index against the authored order — see doc above.
 */
export const TimelineElement: React.FC<ElementProps<TimelineEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <TimelineManipulate el={el} onResult={onResult} />;
  return <TimelineDemonstrate el={el} />;
};

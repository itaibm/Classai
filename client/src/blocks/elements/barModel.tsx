import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { BarModelEl } from '@shared/elements.ts';

function isNum(v: number | '?'): v is number {
  return v !== '?';
}

const COLORS = ['var(--el-blue)', 'var(--el-orange)', 'var(--el-purple)', 'var(--el-green)', 'var(--el-pink)'];

/** Proportional (or, for `?` segments, share-of-remainder) width for each part. */
function widths(parts: (number | '?')[]): number[] {
  const numeric = parts.filter(isNum);
  const sum = numeric.reduce((a, b) => a + b, 0);
  const fallback = numeric.length > 0 ? sum / numeric.length : 1;
  const raw = parts.map((p) => (isNum(p) ? Math.max(p, 0.5) : fallback || 1));
  const total = raw.reduce((a, b) => a + b, 0) || 1;
  return raw.map((r) => (r / total) * 100);
}

/** The readonly bar visualisation, shared by both modes; `unknownSlot` (if given)
 * renders that segment's children instead of its own "?" label — used by
 * manipulate mode to swap in a live input. */
function Bars({
  parts,
  pct,
  unknownIndex,
  unknownContent,
}: {
  parts: (number | '?')[];
  pct: number[];
  unknownIndex?: number;
  unknownContent?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: 260, borderRadius: 8, overflow: 'hidden', border: '2px solid var(--el-line)' }}>
      {parts.map((p, i) => (
        <div
          key={i}
          style={{
            width: `${pct[i] ?? 100 / parts.length}%`,
            minWidth: 30,
            padding: '10px 4px',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 14,
            color: p === '?' ? 'var(--el-accent)' : 'var(--el-on-accent)',
            background: p === '?' ? 'var(--el-accent-soft)' : (COLORS[i % COLORS.length] ?? 'var(--el-blue)'),
            borderRight: i < parts.length - 1 ? '2px solid var(--el-surface)' : 'none',
            backgroundImage:
              p === '?'
                ? 'repeating-linear-gradient(45deg, var(--el-accent-soft), var(--el-accent-soft) 6px, var(--el-surface-2) 6px, var(--el-surface-2) 12px)'
                : undefined,
          }}
        >
          {i === unknownIndex ? unknownContent : p}
        </div>
      ))}
    </div>
  );
}

/**
 * `barModel` — a whole split into part bars (bar-model / tape-diagram style).
 * Numeric parts get proportional widths; a `'?'` part or whole is the unknown.
 *
 * demonstrate: shows the whole (or "?") above the part bars.
 * manipulate: the unknown segment holds a number input; Check compares the
 * child's guess against whole − known parts (or the sum of parts, if the
 * whole itself is unknown).
 */
export const BarModelElement: React.FC<ElementProps<BarModelEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <BarModelManipulate el={el} onResult={onResult} />;
  return <BarModelDemonstrate el={el} />;
};

function BarModelDemonstrate({ el }: { el: BarModelEl }) {
  const pct = widths(el.parts);
  return (
    <div className="el-stack">
      {el.label && <p className="el-prompt">{el.label}</p>}
      <p className="el-display" style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--el-ink)' }}>
        {el.whole}
      </p>
      <Bars parts={el.parts} pct={pct} />
    </div>
  );
}

function BarModelManipulate({
  el,
  onResult,
}: {
  el: BarModelEl;
  onResult?: (r: import('@shared/elements.ts').ElementResult) => void;
}) {
  const pct = widths(el.parts);
  const numericParts = el.parts.filter(isNum);
  const sumParts = numericParts.reduce((a, b) => a + b, 0);
  const wholeUnknown = el.whole === '?';
  const missingPartIndex = el.parts.findIndex((p) => p === '?');
  const knownWhole = isNum(el.whole) ? el.whole : undefined;
  const answer = wholeUnknown ? sumParts : missingPartIndex >= 0 && knownWhole !== undefined ? knownWhole - sumParts : undefined;

  const [guess, setGuess] = useState('');
  const [done, setDone] = useState(false);
  const correct = done && guess !== '' && answer !== undefined ? Number(guess) === answer : undefined;

  function check() {
    if (done || guess === '') return;
    setDone(true);
    onResult?.({ text: guess, correct: answer === undefined ? undefined : Number(guess) === answer });
  }

  const input = (
    <input
      type="number"
      value={guess}
      disabled={done}
      onChange={(e) => setGuess(e.target.value)}
      style={{
        width: 44,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 700,
        border: '1px solid var(--el-line)',
        borderRadius: 6,
        color: 'var(--el-ink)',
        background: 'var(--el-surface)',
      }}
    />
  );

  return (
    <div className="el-stack">
      <p className="el-prompt">{el.label ?? 'Work out the missing number.'}</p>
      <p className="el-display" style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--el-ink)' }}>
        {wholeUnknown ? input : el.whole}
      </p>
      <Bars parts={el.parts} pct={pct} unknownIndex={wholeUnknown ? undefined : missingPartIndex} unknownContent={input} />
      <button className="el-btn" disabled={done || guess === ''} onClick={check}>
        Check
      </button>
      {done && answer !== undefined && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be ${answer}.`}
        </p>
      )}
    </div>
  );
}

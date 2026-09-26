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

/** The readonly bar visualisation, shared by both modes; `unknownContent` (if given)
 * renders each `'?'` segment's live input in place of its own "?" label — used
 * by manipulate mode. Supports any number of unknown segments at once. */
function Bars({
  parts,
  pct,
  unknownContent,
}: {
  parts: (number | '?')[];
  pct: number[];
  unknownContent?: (i: number) => React.ReactNode;
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
          {p === '?' && unknownContent ? unknownContent(i) : p}
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

/** Key used for the whole's slot in the per-slot guess map (parts use their own index, 0..n-1). */
const WHOLE_KEY = -1;

function BarModelManipulate({
  el,
  onResult,
}: {
  el: BarModelEl;
  onResult?: (r: import('@shared/elements.ts').ElementResult) => void;
}) {
  const pct = widths(el.parts);
  const wholeUnknown = el.whole === '?';
  const unknownPartIndices = el.parts.reduce<number[]>((acc, p, i) => {
    if (p === '?') acc.push(i);
    return acc;
  }, []);
  const hasUnknown = wholeUnknown || unknownPartIndices.length > 0;

  const [guesses, setGuesses] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  function setGuess(key: number, value: string) {
    setGuesses((prev) => ({ ...prev, [key]: value }));
  }

  /** Parses a slot's guess as a non-negative number, or undefined if missing/invalid. */
  function parsedGuess(key: number): number | undefined {
    const raw = guesses[key] ?? '';
    if (raw === '') return undefined;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  }

  const allFilled =
    (!wholeUnknown || parsedGuess(WHOLE_KEY) !== undefined) &&
    unknownPartIndices.every((i) => parsedGuess(i) !== undefined);

  function evaluate(): boolean | undefined {
    if (!allFilled) return undefined;
    const whole = wholeUnknown ? parsedGuess(WHOLE_KEY) : isNum(el.whole) ? el.whole : undefined;
    if (whole === undefined) return undefined;
    const sum = el.parts.reduce<number>((acc, p, i) => {
      const v = p === '?' ? parsedGuess(i) : p;
      return acc + (v ?? 0);
    }, 0);
    return sum === whole;
  }

  const correct = done ? evaluate() : undefined;

  function check() {
    if (done || !allFilled) return;
    setDone(true);
    onResult?.({
      text: Object.entries(guesses)
        .map(([k, v]) => `${k}:${v}`)
        .join(', '),
      correct: evaluate(),
    });
  }

  function confirm() {
    if (done) return;
    setDone(true);
    onResult?.({ text: 'confirmed', correct: true });
  }

  function inputFor(key: number) {
    return (
      <input
        type="number"
        value={guesses[key] ?? ''}
        disabled={done}
        onChange={(e) => setGuess(key, e.target.value)}
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
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">{el.label ?? (hasUnknown ? 'Work out the missing number.' : 'Check the bar model.')}</p>
      <p className="el-display" style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--el-ink)' }}>
        {wholeUnknown ? inputFor(WHOLE_KEY) : el.whole}
      </p>
      <Bars parts={el.parts} pct={pct} unknownContent={inputFor} />
      {hasUnknown ? (
        <button className="el-btn" disabled={done || !allFilled} onClick={check}>
          Check
        </button>
      ) : (
        <button className="el-btn" disabled={done} onClick={confirm}>
          Got it 👍
        </button>
      )}
      {done && correct !== undefined && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : 'Not quite — check the numbers add up.'}
        </p>
      )}
    </div>
  );
}

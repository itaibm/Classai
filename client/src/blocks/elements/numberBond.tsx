import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { NumberBondEl } from '@shared/elements.ts';

const WHOLE_POS = { cx: 130, cy: 34 };

function partPositions(count: number): { cx: number; cy: number }[] {
  const n = Math.max(count, 1);
  const gap = Math.min(70, 200 / n);
  const startX = 130 - (gap * (n - 1)) / 2;
  return Array.from({ length: n }, (_, i) => ({ cx: startX + i * gap, cy: 118 }));
}

/** The whole-circle-on-top, part-circles-below diagram, shared by both modes.
 * `renderPart` lets manipulate mode swap the unknown part's content for an input. */
function Bond({
  whole,
  parts,
  renderPart,
}: {
  whole: number | '?';
  parts: (number | '?')[];
  renderPart?: (p: number | '?', i: number) => React.ReactNode;
}) {
  const positions = partPositions(parts.length);
  return (
    <svg viewBox="0 0 260 150" width="240" role="img" aria-label="number bond">
      {positions.map((p, i) => (
        <line key={i} x1={WHOLE_POS.cx} y1={WHOLE_POS.cy} x2={p.cx} y2={p.cy} stroke="var(--el-line)" strokeWidth="2" />
      ))}
      <circle
        cx={WHOLE_POS.cx}
        cy={WHOLE_POS.cy}
        r="26"
        fill={whole === '?' ? 'var(--el-accent-soft)' : 'var(--el-blue)'}
        stroke={whole === '?' ? 'var(--el-accent)' : 'var(--el-line)'}
        strokeWidth="2.5"
        strokeDasharray={whole === '?' ? '5 4' : undefined}
      />
      <text
        x={WHOLE_POS.cx}
        y={WHOLE_POS.cy + 6}
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill={whole === '?' ? 'var(--el-accent)' : 'var(--el-on-accent)'}
      >
        {whole === '?' ? '' : whole}
      </text>
      {positions.map((p, i) => {
        const part = parts[i] ?? '?';
        return (
          <g key={i}>
            <circle
              cx={p.cx}
              cy={p.cy}
              r="22"
              fill={part === '?' ? 'var(--el-accent-soft)' : 'var(--el-orange)'}
              stroke={part === '?' ? 'var(--el-accent)' : 'var(--el-line)'}
              strokeWidth="2.5"
              strokeDasharray={part === '?' ? '5 4' : undefined}
            />
            <text
              x={p.cx}
              y={p.cy + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={part === '?' ? 'var(--el-accent)' : 'var(--el-on-accent)'}
            >
              {part === '?' ? '' : part}
            </text>
          </g>
        );
      })}
      {renderPart &&
        positions.map((p, i) => {
          const part = parts[i] ?? '?';
          if (part !== '?') return null;
          return (
            <foreignObject key={`fo-${i}`} x={p.cx - 20} y={p.cy - 12} width="40" height="24">
              {renderPart(part, i)}
            </foreignObject>
          );
        })}
      {renderPart && whole === '?' && (
        <foreignObject x={WHOLE_POS.cx - 20} y={WHOLE_POS.cy - 12} width="40" height="24">
          {renderPart(whole, -1)}
        </foreignObject>
      )}
    </svg>
  );
}

/**
 * `numberBond` — a whole joined by lines to its parts; the unknown (whole or
 * one part) is drawn dashed.
 *
 * demonstrate: whole + all known parts shown.
 * manipulate: the child types the missing number in-place; Check compares it
 * to whole − known parts (or the sum of parts, if the whole is unknown).
 */
export const NumberBondElement: React.FC<ElementProps<NumberBondEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <NumberBondManipulate el={el} onResult={onResult} />;
  return (
    <div className="el-stack">
      <Bond whole={el.whole} parts={el.parts} />
    </div>
  );
};

function isNum(v: number | '?'): v is number {
  return v !== '?';
}

function NumberBondManipulate({
  el,
  onResult,
}: {
  el: NumberBondEl;
  onResult?: (r: import('@shared/elements.ts').ElementResult) => void;
}) {
  const numericParts = el.parts.filter(isNum);
  const sumParts = numericParts.reduce((a, b) => a + b, 0);
  const wholeUnknown = el.whole === '?';
  const knownWhole = isNum(el.whole) ? el.whole : undefined;
  const answer = wholeUnknown ? sumParts : knownWhole !== undefined ? knownWhole - sumParts : undefined;

  const [guess, setGuess] = useState('');
  const [done, setDone] = useState(false);
  const correct = done && answer !== undefined ? Number(guess) === answer : undefined;

  function check() {
    if (done || guess === '') return;
    setDone(true);
    onResult?.({ text: guess, correct: answer === undefined ? undefined : Number(guess) === answer });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Fill in the missing number.</p>
      <Bond
        whole={el.whole}
        parts={el.parts}
        renderPart={() => (
          <input
            type="number"
            value={guess}
            disabled={done}
            onChange={(e) => setGuess(e.target.value)}
            style={{
              width: 38,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 700,
              border: '1px solid var(--el-accent)',
              borderRadius: 6,
              color: 'var(--el-ink)',
              background: 'var(--el-surface)',
            }}
          />
        )}
      />
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

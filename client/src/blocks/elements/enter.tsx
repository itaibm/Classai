import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { EnterEl, ElementResult } from '@shared/elements.ts';

/** Numeric compare is within `tolerance` (default 0); a non-numeric guess or
 *  target parses to NaN and is simply graded wrong, never thrown. Text
 *  compare is case-insensitive and trimmed. */
function isCorrectAnswer(value: string, el: EnterEl): boolean {
  if (el.kind === 'number') {
    const guess = Number(value);
    const target = Number(el.answer);
    if (Number.isNaN(guess) || Number.isNaN(target)) return false;
    const tol = el.tolerance ?? 0;
    return Math.abs(guess - target) <= tol;
  }
  return value.trim().toLowerCase() === el.answer.trim().toLowerCase();
}

function EnterDemonstrate({ el }: { el: EnterEl }) {
  const isNumber = el.kind === 'number';
  return (
    <div className="el-stack">
      <p className="el-prompt">{el.prompt}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          disabled
          placeholder={isNumber ? '0' : 'answer'}
          style={{
            width: isNumber ? 70 : 140,
            padding: '8px 10px',
            borderRadius: 9,
            border: '1px solid var(--el-line)',
            background: 'var(--el-surface-2)',
            color: 'var(--el-muted)',
            fontSize: 14,
            textAlign: isNumber ? 'center' : 'left',
          }}
        />
        {el.unit && <span className="el-prompt">{el.unit}</span>}
      </div>
    </div>
  );
}

function EnterManipulate({ el, onResult }: { el: EnterEl; onResult?: (r: ElementResult) => void }) {
  const isNumber = el.kind === 'number';
  const [value, setValue] = useState('');
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(false);

  function submit() {
    if (done || value.trim() === '') return;
    const ok = isCorrectAnswer(value, el);
    setCorrect(ok);
    setDone(true);
    onResult?.({ text: value.trim(), correct: ok });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">{el.prompt}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          type={isNumber ? 'number' : 'text'}
          value={value}
          disabled={done}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          placeholder={isNumber ? '0' : 'Type your answer…'}
          style={{
            width: isNumber ? 70 : 160,
            padding: '8px 10px',
            borderRadius: 9,
            border: '1px solid var(--el-line)',
            background: 'var(--el-surface)',
            color: 'var(--el-ink)',
            fontSize: 15,
            fontWeight: 600,
            textAlign: isNumber ? 'center' : 'left',
          }}
        />
        {el.unit && <span className="el-prompt">{el.unit}</span>}
      </div>
      {!done && (
        <button type="button" className="el-btn" disabled={value.trim() === ''} onClick={submit}>
          Check
        </button>
      )}
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — the answer is ${el.answer}${el.unit ? ' ' + el.unit : ''}.`}
        </p>
      )}
    </div>
  );
}

/**
 * `enter` — a free-input answer box (number or text).
 * demonstrate: prompt + a disabled placeholder input.
 * manipulate: `kind:'number'` grades within `tolerance` (default exact);
 * otherwise grades case-insensitive/trimmed text equality against `answer`.
 */
export const EnterElement: React.FC<ElementProps<EnterEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <EnterManipulate el={el} onResult={onResult} />;
  return <EnterDemonstrate el={el} />;
};

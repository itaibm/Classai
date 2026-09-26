import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ChoiceEl, ElementResult } from '@shared/elements.ts';

function sameSet(a: Set<number>, b: Set<number>): boolean {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

/** demonstrate: options shown, greyed out, non-interactive — no submit. */
function ChoiceDemonstrate({ el }: { el: ChoiceEl }) {
  return (
    <div className="el-stack">
      <p className="el-prompt">{el.prompt}</p>
      <div className="el-stack" style={{ gap: 8, alignItems: 'stretch' }}>
        {el.options.map((opt, i) => (
          <div
            key={i}
            className="el-btn"
            style={{ opacity: 0.55, cursor: 'default', width: '100%', maxWidth: 260, textAlign: 'left' }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * manipulate: `correct.length === 1` is single-select (tap one, radio-style);
 * otherwise multi-select (tap many, checkbox-style). Submit compares the
 * chosen SET of indices to `correct` order-independently, then reveals
 * `explain` (if given) alongside per-option correct/incorrect colouring.
 */
function ChoiceManipulate({ el, onResult }: { el: ChoiceEl; onResult?: (r: ElementResult) => void }) {
  const multi = el.correct.length !== 1;
  const correctSet = new Set(el.correct);
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(false);

  function toggle(i: number) {
    if (done) return;
    setPicked((prev) => {
      const next = new Set(prev);
      if (multi) {
        if (next.has(i)) next.delete(i);
        else next.add(i);
      } else {
        next.clear();
        next.add(i);
      }
      return next;
    });
  }

  function submit() {
    if (done || picked.size === 0) return;
    const ok = sameSet(picked, correctSet);
    setCorrect(ok);
    setDone(true);
    const chosenLabels = [...picked]
      .sort((a, b) => a - b)
      .map((i) => el.options[i] ?? '')
      .filter(Boolean)
      .join(', ');
    onResult?.({ text: chosenLabels, correct: ok });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">{el.prompt}</p>
      <div className="el-stack" style={{ gap: 8, width: '100%', alignItems: 'stretch' }}>
        {el.options.map((opt, i) => {
          const isPicked = picked.has(i);
          const isCorrectOpt = done && correctSet.has(i);
          const isWrongPick = done && isPicked && !correctSet.has(i);
          const color = isCorrectOpt ? 'var(--el-green)' : isWrongPick ? 'var(--el-red)' : isPicked ? 'var(--el-accent)' : undefined;
          return (
            <button
              key={i}
              type="button"
              className="el-btn"
              disabled={done}
              onClick={() => toggle(i)}
              style={{
                width: '100%',
                maxWidth: 260,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderColor: color,
                color,
              }}
            >
              <span aria-hidden="true">{multi ? (isPicked ? '☑' : '☐') : isPicked ? '●' : '○'}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {!done && (
        <button type="button" className="el-btn" disabled={picked.size === 0} onClick={submit}>
          Check
        </button>
      )}
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : 'Not quite.'} {el.explain ?? ''}
        </p>
      )}
    </div>
  );
}

/**
 * `choice` — single- or multi-select multiple choice, the base "Do" check.
 * See `ChoiceDemonstrate`/`ChoiceManipulate` doc comments for per-mode behaviour.
 */
export const ChoiceElement: React.FC<ElementProps<ChoiceEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <ChoiceManipulate el={el} onResult={onResult} />;
  return <ChoiceDemonstrate el={el} />;
};

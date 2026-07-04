import { useState } from 'react';
import type { ElementResult, TextMarkEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

function normalizeWord(w: string): string {
  return w.toLowerCase().replace(/[^a-z']/g, '');
}

function tokenize(passage: string): string[] {
  return passage.split(/\s+/).filter(Boolean);
}

/**
 * Matches each entry in `marks` to one occurrence of that (normalized) word
 * in the passage, consuming it from a pool so repeated words are handled
 * like a multiset (e.g. marks ['the', 'the'] targets the first two "the"s,
 * not every "the").
 */
function markedIndices(words: string[], marks: string[]): Set<number> {
  const pool = marks.map(normalizeWord);
  const result = new Set<number>();
  words.forEach((w, i) => {
    const nw = normalizeWord(w);
    const idx = pool.indexOf(nw);
    if (idx !== -1) {
      result.add(i);
      pool.splice(idx, 1);
    }
  });
  return result;
}

function setsEqual(a: Set<number>, b: Set<number>): boolean {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

/**
 * `textMark` — a passage rendered word-by-word, with a subset of words
 * (`marks`) called out.
 *
 * mode 'highlight': demonstrate highlights the marked words; manipulate has
 *   the child tap the words they think are marked, then Check compares the
 *   tapped set to `marks`.
 * mode 'cloze': demonstrate blanks the marked words out; manipulate gives the
 *   child an input per blank, compared to the removed word.
 * mode 'sort': demonstrate shows the passage as plain tappable tokens (no
 *   answer revealed); manipulate has the child tap the words that "belong"
 *   (i.e. match `marks`), compared the same way as highlight.
 */
export const TextMarkElement: React.FC<ElementProps<TextMarkEl>> = ({ el, mode, onResult }) => {
  const words = tokenize(el.passage);
  const markMode = el.mode ?? 'highlight';
  const marks = el.marks ?? [];
  const target = markedIndices(words, marks);

  if (mode === 'manipulate') {
    if (markMode === 'cloze') return <ClozeManipulate words={words} target={target} onResult={onResult} />;
    return (
      <TapSelectManipulate
        words={words}
        target={target}
        prompt={markMode === 'sort' ? 'Tap the words that belong, then press Check.' : 'Tap the words to highlight, then press Check.'}
        onResult={onResult}
      />
    );
  }

  if (markMode === 'cloze') {
    return (
      <div className="el-stack">
        <p className="el-prompt">Fill in the missing words.</p>
        <p className="el-display" style={{ margin: 0, fontSize: 17, lineHeight: 1.9, textAlign: 'center' }}>
          {words.map((w, i) =>
            target.has(i) ? (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  minWidth: Math.max(28, w.length * 10),
                  borderBottom: '3px solid var(--el-accent)',
                  margin: '0 4px',
                }}
              >
                &nbsp;
              </span>
            ) : (
              <span key={i} style={{ margin: '0 4px' }}>
                {w}
              </span>
            )
          )}
        </p>
      </div>
    );
  }

  if (markMode === 'sort') {
    return (
      <div className="el-stack">
        <p className="el-prompt">Here's the passage, word by word.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {words.map((w, i) => (
            <span
              key={i}
              className="el-display"
              style={{
                fontSize: 14,
                fontWeight: 600,
                background: 'var(--el-surface-2)',
                border: '1px solid var(--el-line)',
                borderRadius: 8,
                padding: '4px 10px',
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // highlight (default)
  return (
    <div className="el-stack">
      <p className="el-display" style={{ margin: 0, fontSize: 17, lineHeight: 1.9, textAlign: 'center' }}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              margin: '0 4px',
              padding: '1px 5px',
              borderRadius: 6,
              background: target.has(i) ? 'var(--el-accent-soft)' : 'transparent',
              color: target.has(i) ? 'var(--el-accent)' : 'var(--el-ink)',
              fontWeight: target.has(i) ? 800 : 400,
            }}
          >
            {w}
          </span>
        ))}
      </p>
    </div>
  );
};

function TapSelectManipulate({
  words,
  target,
  prompt,
  onResult,
}: {
  words: string[];
  target: Set<number>;
  prompt: string;
  onResult?: (r: ElementResult) => void;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const correct = setsEqual(selected, target);

  function toggle(i: number) {
    if (done) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function check() {
    if (done || selected.size === 0) return;
    setDone(true);
    const text = words.filter((_, i) => selected.has(i)).join(' ');
    onResult?.({ text, correct });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">{prompt}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        {words.map((w, i) => {
          const isSel = selected.has(i);
          const isTarget = target.has(i);
          let border = '2px solid transparent';
          let bg = 'transparent';
          if (done) {
            if (isSel && isTarget) {
              border = '2px solid var(--el-green)';
              bg = 'var(--el-accent-soft)';
            } else if (isSel && !isTarget) {
              border = '2px solid var(--el-red)';
            } else if (!isSel && isTarget) {
              border = '2px dashed var(--el-accent)';
            }
          } else if (isSel) {
            border = '2px solid var(--el-accent)';
            bg = 'var(--el-accent-soft)';
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              disabled={done}
              className="el-display"
              style={{ fontSize: 14, fontWeight: 600, background: bg, border, borderRadius: 8, padding: '4px 10px', cursor: done ? 'default' : 'pointer' }}
            >
              {w}
            </button>
          );
        })}
      </div>
      <button type="button" className="el-btn" onClick={check} disabled={done || selected.size === 0}>
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : 'Not quite — see the outlined words above.'}
        </p>
      )}
    </div>
  );
}

function ClozeManipulate({
  words,
  target,
  onResult,
}: {
  words: string[];
  target: Set<number>;
  onResult?: (r: ElementResult) => void;
}) {
  const blanks = [...target].sort((a, b) => a - b);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);
  const filled = blanks.every((i) => (answers[i] ?? '').trim().length > 0);
  const allCorrect = blanks.every((i) => normalizeWord(answers[i] ?? '') === normalizeWord(words[i] ?? ''));

  function setAnswer(i: number, v: string) {
    if (done) return;
    setAnswers((prev) => ({ ...prev, [i]: v }));
  }

  function check() {
    if (done || !filled) return;
    setDone(true);
    const guesses = blanks.map((i) => (answers[i] ?? '').trim());
    onResult?.({ text: guesses.join(' '), correct: allCorrect });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Fill in each blank, then press Check.</p>
      <p className="el-display" style={{ margin: 0, fontSize: 16, lineHeight: 2.4, textAlign: 'center' }}>
        {words.map((w, i) =>
          target.has(i) ? (
            <input
              key={i}
              type="text"
              value={answers[i] ?? ''}
              disabled={done}
              onChange={(e) => setAnswer(i, e.target.value)}
              style={{
                width: Math.max(50, w.length * 11),
                margin: '0 4px',
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 6,
                background: 'var(--el-surface)',
                color: 'var(--el-ink)',
                border: done
                  ? normalizeWord(answers[i] ?? '') === normalizeWord(w)
                    ? '2px solid var(--el-green)'
                    : '2px solid var(--el-red)'
                  : '2px solid var(--el-accent)',
              }}
            />
          ) : (
            <span key={i} style={{ margin: '0 4px' }}>
              {w}
            </span>
          )
        )}
      </p>
      <button type="button" className="el-btn" onClick={check} disabled={done || !filled}>
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: allCorrect ? 'var(--el-green)' : 'var(--el-red)' }}>
          {allCorrect ? '✓ Correct!' : `Not quite — it should be "${blanks.map((i) => words[i] ?? '').join(' ')}".`}
        </p>
      )}
    </div>
  );
}

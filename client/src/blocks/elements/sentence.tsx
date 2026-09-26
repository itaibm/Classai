import { useState } from 'react';
import type { ElementResult, SentenceEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';
import { zigzagOrder } from './shuffle.ts';

interface PosGuess {
  label: string;
  color: string;
}

const DETERMINERS = new Set(['a', 'an', 'the', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their']);
const PRONOUNS = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'us', 'them', 'who', 'what', 'which']);
const CONJUNCTIONS = new Set(['and', 'but', 'or', 'so', 'because', 'although', 'if', 'when', 'while']);
const PREPOSITIONS = new Set(['in', 'on', 'at', 'by', 'with', 'from', 'to', 'of', 'for', 'about', 'under', 'over', 'into', 'through', 'after', 'before', 'between']);
const AUX_VERBS = new Set(['is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'can', 'could', 'should', 'must']);

function isPunctuationToken(w: string): boolean {
  return /^[.,!?;:'"()\-]+$/.test(w);
}

/**
 * A dictionary + suffix heuristic — NOT a real part-of-speech tagger.
 * `SentenceEl` carries no ground-truth tags, so for `label:'pos'` this
 * heuristic's own output doubles as the "correct answer" for grading
 * manipulate mode (documented limitation: an author can't currently supply
 * an authoritative tag set).
 */
function guessPos(word: string): PosGuess {
  if (isPunctuationToken(word)) return { label: 'punct', color: 'var(--el-muted)' };
  const w = word.toLowerCase().replace(/[^a-z']/g, '');
  if (w.length === 0) return { label: 'punct', color: 'var(--el-muted)' };
  if (DETERMINERS.has(w)) return { label: 'det', color: 'var(--el-purple)' };
  if (PRONOUNS.has(w)) return { label: 'pron', color: 'var(--el-purple)' };
  if (CONJUNCTIONS.has(w)) return { label: 'conj', color: 'var(--el-faint)' };
  if (PREPOSITIONS.has(w)) return { label: 'prep', color: 'var(--el-blue)' };
  if (AUX_VERBS.has(w)) return { label: 'verb', color: 'var(--el-orange)' };
  if (/(ing|ed)$/.test(w) && w.length > 4) return { label: 'verb', color: 'var(--el-orange)' };
  if (/ly$/.test(w) && w.length > 3) return { label: 'adv', color: 'var(--el-pink)' };
  if (/(ous|ful|ive|able|ible|al|ic)$/.test(w) && w.length > 4) return { label: 'adj', color: 'var(--el-green)' };
  return { label: 'noun', color: 'var(--el-blue)' };
}

function punctName(tok: string): string {
  const t = tok.trim();
  if (t === '.') return 'full stop';
  if (t === ',') return 'comma';
  if (t === '!') return 'exclamation mark';
  if (t === '?') return 'question mark';
  if (t === ';') return 'semicolon';
  if (t === ':') return 'colon';
  if (t.includes("'")) return 'apostrophe';
  if (t.includes('"')) return 'quotation mark';
  return 'punctuation';
}

function setsEqual(a: Set<number>, b: Set<number>): boolean {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

/**
 * `sentence` — `words[]` rendered as tiles, in one of three views.
 *
 * label 'order' (default): demonstrate shows the words in their given
 *   (correct) order; manipulate shuffles them and the child taps them back
 *   into order, compared to the source order.
 * label 'pos': demonstrate tags each tile with a heuristic part-of-speech
 *   chip; manipulate has the child pick a label per tile from the small set
 *   of labels actually present in this sentence, compared to the heuristic.
 * label 'punct': demonstrate marks punctuation tokens as dashed "slots" with
 *   their name; manipulate has the child tap the punctuation tile(s).
 */
export const SentenceElement: React.FC<ElementProps<SentenceEl>> = ({ el, mode, onResult }) => {
  const words = el.words;
  const label = el.label ?? 'order';

  if (mode === 'manipulate') {
    if (label === 'pos') return <PosManipulate words={words} onResult={onResult} />;
    if (label === 'punct') return <PunctManipulate words={words} onResult={onResult} />;
    return <OrderManipulate words={words} onResult={onResult} />;
  }

  if (label === 'pos') {
    return (
      <div className="el-stack">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {words.map((w, i) => {
            const g = guessPos(w);
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <span
                  className="el-display"
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: 'var(--el-ink)',
                    background: 'var(--el-surface-2)',
                    border: '1px solid var(--el-line)',
                    borderRadius: 8,
                    padding: '6px 12px',
                  }}
                >
                  {w}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: g.color }}>{g.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (label === 'punct') {
    return (
      <div className="el-stack">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', alignItems: 'flex-end' }}>
          {words.map((w, i) =>
            isPunctuationToken(w) ? (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <span
                  className="el-display"
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: 'var(--el-accent)',
                    background: 'var(--el-accent-soft)',
                    border: '2px dashed var(--el-accent)',
                    borderRadius: 8,
                    padding: '4px 12px',
                    minWidth: 24,
                    textAlign: 'center',
                  }}
                >
                  {w}
                </span>
                <span style={{ fontSize: 10, color: 'var(--el-muted)' }}>{punctName(w)}</span>
              </div>
            ) : (
              <span key={i} className="el-display" style={{ fontSize: 17, fontWeight: 600, color: 'var(--el-ink)', padding: '6px 4px' }}>
                {w}
              </span>
            )
          )}
        </div>
      </div>
    );
  }

  // order (default)
  return (
    <div className="el-stack">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {words.map((w, i) => (
          <span
            key={i}
            className="el-display"
            style={{ fontSize: 17, fontWeight: 700, color: 'var(--el-on-accent)', background: 'var(--el-blue)', borderRadius: 8, padding: '6px 14px' }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

function OrderManipulate({ words, onResult }: { words: string[]; onResult?: (r: ElementResult) => void }) {
  const [tray] = useState(() => zigzagOrder(words.length));
  const [placed, setPlaced] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const remaining = tray.filter((i) => !placed.includes(i));
  const built = placed.map((i) => words[i] ?? '').join(' ');
  const correct = placed.length === words.length && built === words.join(' ');

  function tap(idx: number) {
    if (done || placed.includes(idx)) return;
    const next = [...placed, idx];
    setPlaced(next);
    if (next.length === words.length) {
      setDone(true);
      const built = next.map((i) => words[i] ?? '').join(' ');
      const isCorrect = built === words.join(' ');
      onResult?.({ text: built, correct: isCorrect });
    }
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the words in order to build the sentence.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', minHeight: 36 }}>
        {Array.from({ length: words.length }, (_, pos) => {
          const idx = placed[pos];
          const w = idx !== undefined ? words[idx] : undefined;
          return (
            <span
              key={pos}
              style={{
                minWidth: 32,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 700,
                color: w ? 'var(--el-on-accent)' : 'var(--el-faint)',
                background: w ? 'var(--el-blue)' : 'var(--el-surface-2)',
                border: w ? 'none' : '2px dashed var(--el-line)',
                borderRadius: 8,
                padding: '6px 10px',
              }}
            >
              {w ?? '·'}
            </span>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {remaining.map((idx) => (
          <button
            key={idx}
            type="button"
            className="el-display"
            onClick={() => tap(idx)}
            disabled={done}
            style={{ fontSize: 15, fontWeight: 700, color: 'var(--el-on-accent)', background: 'var(--el-blue)', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: done ? 'default' : 'pointer' }}
          >
            {words[idx]}
          </button>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be "${words.join(' ')}".`}
        </p>
      )}
    </div>
  );
}

function PunctManipulate({ words, onResult }: { words: string[]; onResult?: (r: ElementResult) => void }) {
  const target = new Set(words.map((w, i) => (isPunctuationToken(w) ? i : -1)).filter((i) => i >= 0));
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
      <p className="el-prompt">Tap the punctuation marks, then press Check.</p>
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
              style={{ fontSize: 15, fontWeight: 600, background: bg, border, borderRadius: 8, padding: '5px 11px', cursor: done ? 'default' : 'pointer' }}
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
          {correct ? '✓ Correct!' : 'Not quite — see the outlined ones above.'}
        </p>
      )}
    </div>
  );
}

function PosManipulate({ words, onResult }: { words: string[]; onResult?: (r: ElementResult) => void }) {
  const truth = words.map((w) => guessPos(w));
  const options = Array.from(new Set(truth.map((t) => t.label)));
  const [assigned, setAssigned] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);
  const filled = words.every((_, i) => assigned[i] !== undefined);
  const allCorrect = words.every((_, i) => assigned[i] === truth[i]?.label);

  function pick(i: number, opt: string) {
    if (done) return;
    setAssigned((prev) => ({ ...prev, [i]: opt }));
  }

  function check() {
    if (done || !filled) return;
    setDone(true);
    const text = words.map((w, i) => `${w}:${assigned[i] ?? ''}`).join(' ');
    onResult?.({ text, correct: allCorrect });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the label that matches each word.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {words.map((w, i) => {
          const picked = assigned[i];
          const isRight = done && picked === truth[i]?.label;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span
                className="el-display"
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--el-ink)',
                  background: 'var(--el-surface-2)',
                  border: done ? `2px solid ${isRight ? 'var(--el-green)' : 'var(--el-red)'}` : '1px solid var(--el-line)',
                  borderRadius: 8,
                  padding: '5px 11px',
                }}
              >
                {w}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', maxWidth: 110 }}>
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pick(i, opt)}
                    disabled={done}
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.3,
                      padding: '2px 6px',
                      borderRadius: 6,
                      cursor: done ? 'default' : 'pointer',
                      border: picked === opt ? '1.5px solid var(--el-accent)' : '1px solid var(--el-line)',
                      background: picked === opt ? 'var(--el-accent-soft)' : 'var(--el-surface)',
                      color: picked === opt ? 'var(--el-accent)' : 'var(--el-muted)',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" className="el-btn" onClick={check} disabled={done || !filled}>
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: allCorrect ? 'var(--el-green)' : 'var(--el-red)' }}>
          {allCorrect ? '✓ Correct!' : 'Not quite — see the outlined words above.'}
        </p>
      )}
    </div>
  );
}

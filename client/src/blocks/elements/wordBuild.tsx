import { useState } from 'react';
import type { ElementResult, WordBuildEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

const CHIP_COLORS = ['var(--el-blue)', 'var(--el-orange)', 'var(--el-green)', 'var(--el-purple)', 'var(--el-pink)'];

function chipColor(i: number): string {
  return CHIP_COLORS[i % CHIP_COLORS.length] ?? 'var(--el-blue)';
}

/**
 * Common English digraphs / vowel teams, longest-match-first, so a genuine
 * two-or-three letter grapheme ("sh", "tch", "igh"...) stays together.
 * This is a classroom approximation, NOT a phonetic transcription — there is
 * no phoneme engine here. Anything not in this list simply falls back to its
 * own letter (documented per the task brief).
 */
const DIGRAPHS = [
  'tch', 'igh', 'dge',
  'ch', 'sh', 'th', 'ph', 'wh', 'ng', 'ck', 'qu',
  'ee', 'ea', 'oo', 'ai', 'ay', 'oa', 'ow', 'ou', 'oi', 'oy',
  'ar', 'er', 'ir', 'or', 'ur',
];

function splitPhonemes(word: string): string[] {
  const w = word.toLowerCase();
  const parts: string[] = [];
  let i = 0;
  while (i < w.length) {
    const match = DIGRAPHS.find((d) => w.startsWith(d, i));
    if (match) {
      parts.push(match);
      i += match.length;
    } else {
      const ch = w[i];
      if (ch) parts.push(ch);
      i += 1;
    }
  }
  return parts.length ? parts : [word];
}

/**
 * Simple vowel-group heuristic: each syllable is a run of leading consonants
 * plus the vowel run that follows (e.g. "banana" -> ba-na-na). It doesn't
 * model silent e, doubled consonants, or stress — a reasonable approximation
 * for common words, not a dictionary-backed syllabifier.
 */
function splitSyllables(word: string): string[] {
  const w = word.toLowerCase();
  const isVowel = (c: string | undefined) => !!c && 'aeiouy'.includes(c);
  const groups: string[] = [];
  let i = 0;
  while (i < w.length) {
    const start = i;
    while (i < w.length && !isVowel(w[i])) i += 1;
    while (i < w.length && isVowel(w[i])) i += 1;
    if (i === start) break; // safety: no progress made, avoid infinite loop
    groups.push(w.slice(start, i));
  }
  return groups.length ? groups : [word];
}

function computeParts(el: WordBuildEl): string[] {
  if (el.parts && el.parts.length > 0) return el.parts;
  if (el.split === 'phoneme') return splitPhonemes(el.word);
  if (el.split === 'syllable') return splitSyllables(el.word);
  return [el.word]; // morpheme with no parts given: treat the whole word as one morpheme
}

/**
 * Deterministic "zigzag from both ends" reorder (not random) — the same word
 * always presents the same shuffled tray, but it visibly differs from the
 * correct order whenever there's more than one chip.
 */
function zigzagOrder(n: number): number[] {
  const order: number[] = [];
  let lo = 0;
  let hi = n - 1;
  let takeHigh = true;
  while (lo <= hi) {
    if (takeHigh) {
      order.push(hi);
      hi -= 1;
    } else {
      order.push(lo);
      lo += 1;
    }
    takeHigh = !takeHigh;
  }
  return order;
}

/**
 * `wordBuild` — a word broken into its phoneme / syllable / morpheme chips.
 *
 * demonstrate: coloured chips for each part (author-supplied `parts`, or a
 * heuristic split of `word`), plus the assembled word as a "read it" line.
 * manipulate: the chips are shown shuffled; the child taps them in the order
 * that spells the word. Once every chip is placed, the assembled order is
 * compared to the source order.
 */
export const WordBuildElement: React.FC<ElementProps<WordBuildEl>> = ({ el, mode, onResult }) => {
  const parts = computeParts(el);

  if (mode === 'manipulate') return <WordBuildManipulate parts={parts} onResult={onResult} />;

  return (
    <div className="el-stack">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {parts.map((p, i) => (
          <span
            key={i}
            className="el-display"
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: 'var(--el-on-accent)',
              background: chipColor(i),
              borderRadius: 10,
              padding: '8px 14px',
            }}
          >
            {p}
          </span>
        ))}
      </div>
      <p className="el-prompt">
        Read it: <strong style={{ color: 'var(--el-ink)' }}>{parts.join('')}</strong>
      </p>
    </div>
  );
};

function WordBuildManipulate({
  parts,
  onResult,
}: {
  parts: string[];
  onResult?: (r: ElementResult) => void;
}) {
  const [tray] = useState(() => zigzagOrder(parts.length));
  const [placed, setPlaced] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const remaining = tray.filter((i) => !placed.includes(i));
  const correct = placed.length === parts.length && placed.every((idx, pos) => idx === pos);

  function tap(idx: number) {
    if (done || placed.includes(idx)) return;
    const next = [...placed, idx];
    setPlaced(next);
    if (next.length === parts.length) {
      setDone(true);
      const built = next.map((i) => parts[i] ?? '').join('');
      const isCorrect = next.every((v, pos) => v === pos);
      onResult?.({ text: built, correct: isCorrect });
    }
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the chips in order to build the word.</p>
      <div style={{ display: 'flex', gap: 6, minHeight: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
        {Array.from({ length: parts.length }, (_, pos) => {
          const idx = placed[pos];
          const p = idx !== undefined ? parts[idx] : undefined;
          return (
            <span
              key={pos}
              style={{
                minWidth: 32,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 800,
                color: idx !== undefined && p ? 'var(--el-on-accent)' : 'var(--el-faint)',
                background: idx !== undefined && p ? chipColor(idx) : 'var(--el-surface-2)',
                border: idx !== undefined && p ? 'none' : '2px dashed var(--el-line)',
                borderRadius: 8,
                padding: '6px 8px',
              }}
            >
              {p ?? '·'}
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
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: 'var(--el-on-accent)',
              background: chipColor(idx),
              border: 'none',
              borderRadius: 10,
              padding: '8px 14px',
              cursor: done ? 'default' : 'pointer',
            }}
          >
            {parts[idx]}
          </button>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be ${parts.join('')}.`}
        </p>
      )}
    </div>
  );
}

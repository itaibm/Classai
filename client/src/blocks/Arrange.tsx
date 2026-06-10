/**
 * The "arrange" family of interactive blocks: matchPairs, ordering, categorize.
 * All tap-based (no fragile drag-and-drop), with animated right/wrong feedback
 * that reveals the correct arrangement before reporting the result.
 */
import { useMemo, useState } from 'react';
import type { MatchPairsBlock, OrderingBlock, CategorizeBlock, BlockResult } from '@shared/types';

type Done = (r: BlockResult) => void;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const COLORS = ['#3b82f6', '#e0792f', '#2e9e6b', '#9b59b6', '#d35c5c'];

// ---- matchPairs ------------------------------------------------------------

export function MatchPairs({ block, active, onComplete }: { block: MatchPairsBlock; active: boolean; onComplete: Done }) {
  const lefts = block.pairs.map((p) => p.left);
  const rights = useMemo(() => shuffle(block.pairs.map((p) => p.right)), [block]);
  const [sel, setSel] = useState<number | null>(null); // selected left index
  const [links, setLinks] = useState<Record<number, number>>({}); // left -> right index
  const [checked, setChecked] = useState(false);

  const rightToLeft = (ri: number) => Object.entries(links).find(([, r]) => r === ri)?.[0];

  function tapRight(ri: number) {
    if (!active || checked || sel === null) return;
    const next = { ...links };
    for (const k of Object.keys(next)) if (next[+k] === ri) delete next[+k];
    next[sel] = ri;
    setLinks(next);
    setSel(null);
  }

  function check() {
    setChecked(true);
    let correct = 0;
    for (let li = 0; li < lefts.length; li++) {
      const ri = links[li];
      if (ri != null && rights[ri] === block.pairs[li]!.right) correct++;
    }
    const all = correct === lefts.length;
    setTimeout(() => onComplete({ text: `Matching: ${correct}/${lefts.length} correct`, correct: all }), 1500);
  }

  const isCorrectLink = (li: number) => links[li] != null && rights[links[li]!] === block.pairs[li]!.right;

  return (
    <div className="interaction">
      <p className="block-prompt">{block.prompt}</p>
      <div className="match">
        <div className="match-col">
          {lefts.map((l, li) => (
            <button
              key={li}
              className={`match-item ${sel === li ? 'sel' : ''} ${checked ? (isCorrectLink(li) ? 'ok' : 'bad') : links[li] != null ? 'linked' : ''}`}
              style={links[li] != null ? { borderColor: COLORS[li % COLORS.length] } : undefined}
              disabled={!active || checked}
              onClick={() => setSel(li)}
            >
              {l}
              {links[li] != null && <span className="dot-mark" style={{ background: COLORS[li % COLORS.length] }} />}
            </button>
          ))}
        </div>
        <div className="match-col">
          {rights.map((r, ri) => {
            const li = rightToLeft(ri);
            return (
              <button
                key={ri}
                className={`match-item ${li != null ? 'linked' : ''}`}
                style={li != null ? { borderColor: COLORS[+li % COLORS.length] } : undefined}
                disabled={!active || checked || sel === null}
                onClick={() => tapRight(ri)}
              >
                {r}
                {li != null && <span className="dot-mark" style={{ background: COLORS[+li % COLORS.length] }} />}
              </button>
            );
          })}
        </div>
      </div>
      {!checked && (
        <div className="row center" style={{ marginTop: 12 }}>
          <button className="btn" disabled={!active || Object.keys(links).length < lefts.length} onClick={check}>Check</button>
        </div>
      )}
      {checked && <p className="muted small center" style={{ textAlign: 'center' }}>Here's how they pair up 👇</p>}
    </div>
  );
}

// ---- ordering --------------------------------------------------------------

export function Ordering({ block, active, onComplete }: { block: OrderingBlock; active: boolean; onComplete: Done }) {
  const [order, setOrder] = useState<string[]>(useMemo(() => {
    let s = shuffle(block.items);
    if (s.join('|') === block.items.join('|') && block.items.length > 1) s = shuffle(s);
    return s;
  }, [block]));
  const [checked, setChecked] = useState(false);

  function move(i: number, dir: -1 | 1) {
    if (!active || checked) return;
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const a = [...order];
    [a[i], a[j]] = [a[j]!, a[i]!];
    setOrder(a);
  }

  function check() {
    setChecked(true);
    const correctCount = order.filter((x, i) => x === block.items[i]).length;
    const all = correctCount === block.items.length;
    if (!all) setTimeout(() => setOrder([...block.items]), 700); // animate into correct order
    setTimeout(() => onComplete({ text: `Ordering: ${correctCount}/${block.items.length} in place`, correct: all }), 1700);
  }

  return (
    <div className="interaction">
      <p className="block-prompt">{block.prompt}</p>
      <ul className="list-reset order">
        {order.map((item, i) => {
          const state = checked ? (item === block.items[i] ? 'ok' : 'bad') : '';
          return (
            <li key={item} className={`order-item ${state}`}>
              <span className="order-num">{i + 1}</span>
              <span className="grow">{item}</span>
              {!checked && (
                <span className="order-moves">
                  <button disabled={!active || i === 0} onClick={() => move(i, -1)} aria-label="up">▲</button>
                  <button disabled={!active || i === order.length - 1} onClick={() => move(i, 1)} aria-label="down">▼</button>
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {!checked && <div className="row center" style={{ marginTop: 12 }}><button className="btn" disabled={!active} onClick={check}>Check</button></div>}
    </div>
  );
}

// ---- categorize ------------------------------------------------------------

export function Categorize({ block, active, onComplete }: { block: CategorizeBlock; active: boolean; onComplete: Done }) {
  const items = useMemo(() => shuffle(block.items), [block]);
  const [placed, setPlaced] = useState<Record<number, string>>({}); // item index -> bucket
  const [sel, setSel] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  function place(bucket: string) {
    if (!active || checked || sel === null) return;
    setPlaced({ ...placed, [sel]: bucket });
    setSel(null);
  }
  const allPlaced = items.every((_, i) => placed[i]);

  function check() {
    setChecked(true);
    const correct = items.filter((it, i) => placed[i] === it.bucket).length;
    const all = correct === items.length;
    setTimeout(() => onComplete({ text: `Sorting: ${correct}/${items.length} in the right group`, correct: all }), 1600);
  }

  return (
    <div className="interaction">
      <p className="block-prompt">{block.prompt}</p>
      <div className="cat-tray">
        {items.map((it, i) =>
          placed[i] ? null : (
            <button key={i} className={`chip-btn ${sel === i ? 'sel' : ''}`} disabled={!active || checked} onClick={() => setSel(i)}>
              {it.text}
            </button>
          )
        )}
      </div>
      <div className="cat-buckets">
        {block.buckets.map((b) => (
          <div key={b} className={`cat-bucket ${sel !== null ? 'droppable' : ''}`} onClick={() => place(b)}>
            <div className="cat-bucket-name">{b}</div>
            {items.map((it, i) =>
              placed[i] === b ? (
                <span key={i} className={`chip ${checked ? (it.bucket === b ? 'ok' : 'bad') : ''}`}>
                  {it.text}{checked && (it.bucket === b ? ' ✓' : ` → ${it.bucket}`)}
                </span>
              ) : null
            )}
          </div>
        ))}
      </div>
      {!checked && <div className="row center" style={{ marginTop: 12 }}><button className="btn" disabled={!active || !allPlaced} onClick={check}>Check</button></div>}
    </div>
  );
}

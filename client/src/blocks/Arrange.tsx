/**
 * The "arrange" family of interactive blocks: matchPairs, ordering, categorize.
 * All tap-based (no fragile drag-and-drop), with animated right/wrong feedback
 * that reveals the correct arrangement before reporting the result.
 */
import { useMemo, useState } from 'react';
import type { MatchPairsBlock, OrderingBlock, CategorizeBlock, BlockResult } from '@shared/types';
import { useTurnComplete } from './useComplete.ts';

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
  const { complete } = useTurnComplete(onComplete);

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
    complete({ text: `Matching: ${correct}/${lefts.length} correct`, correct: all }, 1500);
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

interface OrderItem { id: number; text: string }

export function Ordering({ block, active, onComplete }: { block: OrderingBlock; active: boolean; onComplete: Done }) {
  // Stable ids keep React identity (so reorder animates) even with duplicate text.
  const initial = useMemo<OrderItem[]>(() => {
    const tagged = block.items.map((text, id) => ({ id, text }));
    let s = shuffle(tagged);
    if (s.map((x) => x.id).join('|') === tagged.map((x) => x.id).join('|') && tagged.length > 1) s = shuffle(s);
    return s;
  }, [block]);
  const [order, setOrder] = useState<OrderItem[]>(initial);
  const [checked, setChecked] = useState(false);
  const { complete, schedule } = useTurnComplete(onComplete);

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
    const correctCount = order.filter((x, i) => x.text === block.items[i]).length;
    const all = correctCount === block.items.length;
    if (!all) {
      // animate the SAME nodes into the correct order (preserve ids → smooth move)
      const remaining = [...order];
      const fixed: OrderItem[] = block.items.map((t) => {
        const idx = remaining.findIndex((o) => o.text === t);
        return remaining.splice(idx === -1 ? 0 : idx, 1)[0]!;
      });
      schedule(() => setOrder(fixed), 700);
    }
    complete({ text: `Ordering: ${correctCount}/${block.items.length} in place`, correct: all }, 1700);
  }

  return (
    <div className="interaction">
      <p className="block-prompt">{block.prompt}</p>
      <ul className="list-reset order">
        {order.map((item, i) => {
          const state = checked ? (item.text === block.items[i] ? 'ok' : 'bad') : '';
          return (
            <li key={item.id} className={`order-item ${state}`}>
              <span className="order-num">{i + 1}</span>
              <span className="grow">{item.text}</span>
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
  const { complete } = useTurnComplete(onComplete);

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
    complete({ text: `Sorting: ${correct}/${items.length} in the right group`, correct: all }, 1600);
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

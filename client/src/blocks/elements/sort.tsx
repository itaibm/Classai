import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, SortEl } from '@shared/elements.ts';

const VBW = 260;
const VBH = 150;

const CHIP_COLORS = ['var(--el-blue)', 'var(--el-orange)', 'var(--el-green)', 'var(--el-purple)', 'var(--el-pink)', 'var(--el-amber)'];
function chipColor(i: number): string {
  return CHIP_COLORS[i % CHIP_COLORS.length] ?? 'var(--el-blue)';
}

/* ------------------------------------------------------------------ */
/* demonstrate — one layout per SortEl['mode']                         */
/* ------------------------------------------------------------------ */

function BucketDemonstrate({ el }: { el: SortEl }) {
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
      {el.groups.map((g, gi) => (
        <div key={gi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 76 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--el-ink)', textTransform: 'uppercase', letterSpacing: 0.4 }}>{g}</span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              alignItems: 'center',
              background: 'var(--el-surface-2)',
              border: '2px solid var(--el-line)',
              borderRadius: 10,
              padding: '8px 6px',
              minHeight: 60,
              width: '100%',
            }}
          >
            {el.items
              .filter((it) => it.group === g)
              .map((it, ii) => (
                <span
                  key={ii}
                  className="el-display"
                  style={{ fontSize: 11, fontWeight: 700, color: 'var(--el-on-accent)', background: chipColor(gi), borderRadius: 6, padding: '3px 8px' }}
                >
                  {it.text}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RankDemonstrate({ el }: { el: SortEl }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: 220 }}>
      {el.groups.map((g, gi) => (
        <div key={gi} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--el-muted)', minWidth: 20, textAlign: 'right' }}>{gi + 1}.</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--el-ink)', minWidth: 54 }}>{g}</span>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1 }}>
            {el.items
              .filter((it) => it.group === g)
              .map((it, ii) => (
                <span
                  key={ii}
                  className="el-display"
                  style={{ fontSize: 10, fontWeight: 700, color: 'var(--el-on-accent)', background: chipColor(gi), borderRadius: 6, padding: '2px 7px' }}
                >
                  {it.text}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function vennCircleCenters(n: number): { x: number; y: number }[] {
  if (n === 2) return [{ x: 105, y: 75 }, { x: 155, y: 75 }];
  if (n >= 3) return [{ x: 105, y: 60 }, { x: 155, y: 60 }, { x: 130, y: 100 }];
  return [{ x: 130, y: 75 }];
}

/**
 * `SortEl.items` carries exactly one `group` per item (no set of groups), so
 * this can't model true set-intersection membership. The circles overlap to
 * look like a venn diagram and teach the CONCEPT of comparing groups, but
 * each item is drawn inside only its own circle's private wedge — overlaps
 * are visual, not semantic. Documented limitation of the current data shape.
 */
function VennDemonstrate({ el }: { el: SortEl }) {
  const n = Math.min(el.groups.length, 3);
  const centers = vennCircleCenters(n);
  const r = n === 3 ? 42 : 46;
  const labelOffsets =
    n === 3
      ? [{ dx: -34, dy: -30 }, { dx: 34, dy: -30 }, { dx: 0, dy: 46 }]
      : n === 2
        ? [{ dx: -34, dy: -34 }, { dx: 34, dy: -34 }]
        : [{ dx: 0, dy: -50 }];
  const itemAnchor =
    n === 3
      ? [{ dx: -34, dy: -6 }, { dx: 34, dy: -6 }, { dx: 0, dy: 22 }]
      : n === 2
        ? [{ dx: -34, dy: 4 }, { dx: 34, dy: 4 }]
        : [{ dx: 0, dy: 4 }];
  const groupsUsed = el.groups.slice(0, n);
  return (
    <div className="el-stack">
      <svg viewBox={`0 0 ${VBW} ${VBH}`} width="240" role="img" aria-label="venn diagram">
        {centers.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={r} fill={chipColor(i)} fillOpacity="0.22" stroke={chipColor(i)} strokeWidth="2" />
        ))}
        {groupsUsed.map((g, gi) => {
          const c = centers[gi];
          const off = labelOffsets[gi];
          if (!c || !off) return null;
          return (
            <text key={gi} x={c.x + off.dx} y={c.y + off.dy} textAnchor="middle" fontSize="9" fontWeight="800" fill={chipColor(gi)}>
              {g}
            </text>
          );
        })}
        {groupsUsed.map((g, gi) => {
          const c = centers[gi];
          const off = itemAnchor[gi];
          if (!c || !off) return null;
          const items = el.items.filter((it) => it.group === g);
          return items.map((it, ii) => (
            <text key={`${gi}-${ii}`} x={c.x + off.dx} y={c.y + off.dy + ii * 11} textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--el-ink)">
              {it.text}
            </text>
          ));
        })}
      </svg>
      <p className="el-prompt">Each item belongs to one circle — the overlap just shows the groups being compared.</p>
    </div>
  );
}

function SortDemonstrate({ el }: { el: SortEl }) {
  if (el.mode === 'venn') return <VennDemonstrate el={el} />;
  if (el.mode === 'rank')
    return (
      <div className="el-stack">
        <RankDemonstrate el={el} />
      </div>
    );
  return (
    <div className="el-stack">
      <BucketDemonstrate el={el} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* manipulate — identical mechanic for all three modes                 */
/* ------------------------------------------------------------------ */

/**
 * Child taps an item, then taps the group/bucket/circle/rung it belongs in.
 * Every item keeps its OWN array index throughout (`assigned[i]`), so
 * grading compares each item's chosen group to `items[i].group` by content —
 * never by matching against a shuffled pool position — meaning duplicate
 * item text or duplicate group names can never cause a correct placement to
 * be marked wrong. `onResult` fires once every item has been placed.
 */
function SortManipulate({ el, onResult }: { el: SortEl; onResult?: (r: ElementResult) => void }) {
  const items = el.items;
  const [assigned, setAssigned] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  function pickItem(i: number) {
    if (done || assigned[i] !== undefined) return;
    setSelected(i);
  }
  function pickGroup(g: string) {
    if (done || selected === null) return;
    const next = { ...assigned, [selected]: g };
    setAssigned(next);
    setSelected(null);
    if (items.every((_, i) => next[i] !== undefined)) {
      const correct = items.every((it, i) => next[i] === it.group);
      setAllCorrect(correct);
      setDone(true);
      const text = items.map((it, i) => `${it.text}:${next[i] ?? ''}`).join(', ');
      onResult?.({ text, correct });
    }
  }

  const modeLabel = el.mode === 'venn' ? 'circle' : el.mode === 'rank' ? 'rung' : 'bucket';

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap an item, then tap the {modeLabel} it belongs in.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {items.map((it, i) => {
          const isSel = selected === i;
          const isAssigned = assigned[i] !== undefined;
          const isRight = done && assigned[i] === it.group;
          const border = done ? `2px solid ${isRight ? 'var(--el-green)' : 'var(--el-red)'}` : isSel ? '2px solid var(--el-accent)' : '1px solid var(--el-line)';
          return (
            <button
              key={i}
              type="button"
              className="el-display"
              onClick={() => pickItem(i)}
              disabled={done || isAssigned}
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--el-ink)',
                background: isSel ? 'var(--el-accent-soft)' : 'var(--el-surface-2)',
                border,
                borderRadius: 8,
                padding: '6px 12px',
                cursor: done || isAssigned ? 'default' : 'pointer',
              }}
            >
              {it.text}
              {isAssigned && <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--el-muted)' }}>→ {assigned[i]}</span>}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {el.groups.map((g, gi) => (
          <button key={gi} type="button" className="el-btn" onClick={() => pickGroup(g)} disabled={done || selected === null}>
            {g}
          </button>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: allCorrect ? 'var(--el-green)' : 'var(--el-red)' }}>
          {allCorrect ? '✓ All correct!' : 'Not quite — check the outlined items.'}
        </p>
      )}
    </div>
  );
}

/**
 * `sort` — `items` (each with a single `group`) shown per `mode`: `bucket`
 * (labelled containers), `venn` (overlapping circles — see doc on
 * `VennDemonstrate` for the single-group-per-item limitation), `rank` (an
 * ordered ladder, top-to-bottom = `groups` order).
 *
 * demonstrate: renders items inside their authored group's container.
 * manipulate: tap-item-then-tap-group, identical across all three modes;
 * graded per item by its own index against `items[i].group` (see
 * `SortManipulate` doc for why that's duplicate-safe).
 */
export const SortElement: React.FC<ElementProps<SortEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <SortManipulate el={el} onResult={onResult} />;
  return <SortDemonstrate el={el} />;
};

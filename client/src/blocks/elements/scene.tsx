import { useState } from 'react';
import type { SceneEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

interface Instance {
  emoji: string;
  groupIndex: number;
}

/** Deterministic scattered position/rotation for a "spilled on the table" look. */
function scatterPos(i: number): { x: number; y: number; rot: number } {
  const a = (i * 47) % 100;
  const b = (i * 83 + 31) % 100;
  return {
    x: 10 + (a / 100) * 80,
    y: 12 + (b / 100) * 72,
    rot: ((i * 37) % 40) - 20,
  };
}

/**
 * `scene` — a countable collection of emoji, for "show me / count me" tasks.
 *
 * demonstrate: lays items out per `layout` (row groups, plain grid, or a
 * playful scatter) + caption.
 * manipulate: the child taps each instance to count it, then presses Done;
 * the tapped count is compared against the true total.
 */
export const SceneElement: React.FC<ElementProps<SceneEl>> = ({ el, mode, onResult }) => {
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  const groups = el.items.map((it) => ({ emoji: it.emoji, label: it.label, count: it.count ?? 1 }));
  const instances: Instance[] = groups.flatMap((g, gi) =>
    Array.from({ length: g.count }, () => ({ emoji: g.emoji, groupIndex: gi }))
  );
  const trueTotal = groups.reduce((sum, g) => sum + g.count, 0);
  const layout = el.layout ?? 'row';

  function toggle(i: number) {
    if (done) return;
    setTapped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function finish() {
    if (done || tapped.size === 0) return;
    setDone(true);
    onResult?.({ text: String(tapped.size), correct: tapped.size === trueTotal });
  }

  if (mode === 'manipulate') {
    return (
      <div className="el-stack">
        <p className="el-prompt">Tap each one to count, then press Done.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', width: '100%' }}>
          {instances.map((inst, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              disabled={done}
              aria-pressed={tapped.has(i)}
              style={{
                fontSize: 28,
                lineHeight: 1,
                background: tapped.has(i) ? 'var(--el-accent-soft)' : 'transparent',
                border: tapped.has(i) ? '2px solid var(--el-accent)' : '2px solid transparent',
                borderRadius: 10,
                padding: 4,
                cursor: done ? 'default' : 'pointer',
              }}
            >
              {inst.emoji}
            </button>
          ))}
        </div>
        <button type="button" className="el-btn" onClick={finish} disabled={done || tapped.size === 0}>
          Done — I counted {tapped.size}
        </button>
        {done && (
          <p className="el-prompt" style={{ color: tapped.size === trueTotal ? 'var(--el-green)' : 'var(--el-red)' }}>
            {tapped.size === trueTotal ? `✓ Correct — there are ${trueTotal}!` : `Not quite — there are ${trueTotal}.`}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="el-stack">
      {layout === 'scatter' ? (
        <div style={{ position: 'relative', width: '100%', minHeight: 150 }}>
          {instances.map((inst, i) => {
            const p = scatterPos(i);
            return (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
                  fontSize: 28,
                }}
              >
                {inst.emoji}
              </span>
            );
          })}
        </div>
      ) : layout === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))', gap: 8, width: '100%' }}>
          {instances.map((inst, i) => (
            <span key={i} style={{ fontSize: 26, textAlign: 'center' }}>
              {inst.emoji}
            </span>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center', width: '100%' }}>
          {groups.map((g, gi) => (
            <div key={gi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ display: 'flex', gap: 2, fontSize: 26 }}>
                {Array.from({ length: g.count }, (_, k) => (
                  <span key={k}>{g.emoji}</span>
                ))}
              </div>
              {g.label && (
                <span style={{ fontSize: 11, color: 'var(--el-muted)' }}>{g.label}</span>
              )}
            </div>
          ))}
        </div>
      )}
      {el.caption && <p className="el-prompt">{el.caption}</p>}
    </div>
  );
};

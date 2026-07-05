import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { DiagramEl, ElementResult } from '@shared/elements.ts';

type Node = DiagramEl['nodes'][number];
type Edge = NonNullable<DiagramEl['edges']>[number];
type Pt = { x: number; y: number };

const VBW = 260;
const VBH = 150;
const CX = VBW / 2;
const CY = VBH / 2 + 5;

/* ------------------------------------------------------------------ */
/* layout — one positioning strategy per DiagramEl['mode']             */
/* ------------------------------------------------------------------ */

function mapPct(x: number, y: number): Pt {
  return { x: 30 + (x / 100) * 200, y: 18 + (y / 100) * 110 };
}

function ringPositions(ids: string[], cx = CX, cy = CY, r = 52): Record<string, Pt> {
  const n = Math.max(ids.length, 1);
  const pos: Record<string, Pt> = {};
  ids.forEach((id, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    pos[id] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  return pos;
}

/** BFS levels + parent pointers from the node(s) with no incoming edge
 * (falls back to the first node when every node has an incoming edge, e.g.
 * a genuine cycle). Shared by `flow` and `mindmap` layout. */
function bfsLevels(nodes: Node[], edges: Edge[]): { level: Map<string, number>; parent: Map<string, string> } {
  const ids = nodes.map((n) => n.id);
  const idSet = new Set(ids);
  const indeg = new Map<string, number>(ids.map((id) => [id, 0]));
  const adj = new Map<string, string[]>(ids.map((id) => [id, []]));
  for (const e of edges) {
    if (!idSet.has(e.from) || !idSet.has(e.to)) continue;
    adj.get(e.from)?.push(e.to);
    indeg.set(e.to, (indeg.get(e.to) ?? 0) + 1);
  }
  const roots = ids.filter((id) => (indeg.get(id) ?? 0) === 0);
  const start = roots.length > 0 ? roots : ids.slice(0, 1);
  const level = new Map<string, number>();
  const parent = new Map<string, string>();
  const queue: string[] = [...start];
  for (const r of start) level.set(r, 0);
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur === undefined) break;
    const curLevel = level.get(cur) ?? 0;
    for (const next of adj.get(cur) ?? []) {
      if (level.has(next)) continue;
      level.set(next, curLevel + 1);
      parent.set(next, cur);
      queue.push(next);
    }
  }
  const maxLevel = Math.max(0, ...Array.from(level.values()));
  let extra = maxLevel + 1;
  for (const id of ids) {
    if (!level.has(id)) level.set(id, extra++);
  }
  return { level, parent };
}

function byLevelGroups(nodes: Node[], level: Map<string, number>): Map<number, string[]> {
  const byLevel = new Map<number, string[]>();
  for (const n of nodes) {
    const lv = level.get(n.id) ?? 0;
    const arr = byLevel.get(lv) ?? [];
    arr.push(n.id);
    byLevel.set(lv, arr);
  }
  return byLevel;
}

function flowPositions(nodes: Node[], edges: Edge[]): Record<string, Pt> {
  const { level } = bfsLevels(nodes, edges);
  const byLevel = byLevelGroups(nodes, level);
  const levels = Array.from(byLevel.keys()).sort((a, b) => a - b);
  const top = 20;
  const bottom = 132;
  const rowGap = levels.length > 1 ? (bottom - top) / (levels.length - 1) : 0;
  const pos: Record<string, Pt> = {};
  levels.forEach((lv, li) => {
    const ids = byLevel.get(lv) ?? [];
    const y = levels.length > 1 ? top + li * rowGap : (top + bottom) / 2;
    const gap = ids.length > 1 ? 180 / (ids.length - 1) : 0;
    const startX = ids.length > 1 ? 40 : CX;
    ids.forEach((id, i) => {
      pos[id] = { x: ids.length > 1 ? startX + i * gap : CX, y };
    });
  });
  return pos;
}

/** Root at the centre; each further BFS level sits on a wider ring, angled
 * near its parent so branches fan out visibly (a genuine mind-map look). */
function mindmapPositions(nodes: Node[], edges: Edge[]): Record<string, Pt> {
  const { level, parent } = bfsLevels(nodes, edges);
  const byLevel = byLevelGroups(nodes, level);
  const levels = Array.from(byLevel.keys()).sort((a, b) => a - b);
  const angle = new Map<string, number>();
  const pos: Record<string, Pt> = {};
  const rGap = 34;
  for (const lv of levels) {
    const ids = byLevel.get(lv) ?? [];
    if (lv === 0) {
      ids.forEach((id) => {
        pos[id] = { x: CX, y: CY };
        angle.set(id, -Math.PI / 2);
      });
      continue;
    }
    const r = 20 + lv * rGap;
    const byParent = new Map<string, string[]>();
    for (const id of ids) {
      const p = parent.get(id) ?? '';
      const arr = byParent.get(p) ?? [];
      arr.push(id);
      byParent.set(p, arr);
    }
    let cursor = 0;
    const total = Math.max(ids.length, 1);
    for (const [p, sibs] of byParent.entries()) {
      const baseAngle = angle.get(p) ?? -Math.PI / 2 + (2 * Math.PI * cursor) / total;
      const spread = Math.min(1.2, 0.55 * sibs.length);
      sibs.forEach((id, i) => {
        const a = sibs.length > 1 ? baseAngle - spread / 2 + (spread * i) / (sibs.length - 1) : baseAngle;
        pos[id] = { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
        angle.set(id, a);
        cursor++;
      });
    }
  }
  return pos;
}

function webPositions(nodes: Node[]): Record<string, Pt> {
  if (nodes.length === 0) return {};
  const root = nodes[0];
  if (!root) return {};
  const rest = nodes.slice(1).map((n) => n.id);
  return { [root.id]: { x: CX, y: CY }, ...ringPositions(rest, CX, CY, 55) };
}

function cyclePositions(nodes: Node[]): Record<string, Pt> {
  return ringPositions(
    nodes.map((n) => n.id),
    CX,
    CY,
    52
  );
}

/** `label` mode places nodes at their authored `x`/`y` (0-100 space); any
 * node missing one auto-lands on a fallback ring so nothing overlaps. */
function labelPositions(nodes: Node[]): Record<string, Pt> {
  const autoIds = nodes.filter((n) => n.x === undefined || n.y === undefined).map((n) => n.id);
  const autoRing = ringPositions(autoIds, CX, CY, 45);
  const pos: Record<string, Pt> = {};
  for (const n of nodes) {
    if (n.x !== undefined && n.y !== undefined) pos[n.id] = mapPct(n.x, n.y);
    else pos[n.id] = autoRing[n.id] ?? { x: CX, y: CY };
  }
  return pos;
}

function layoutFor(el: DiagramEl): Record<string, Pt> {
  switch (el.mode) {
    case 'cycle':
      return cyclePositions(el.nodes);
    case 'flow':
      return flowPositions(el.nodes, el.edges ?? []);
    case 'web':
      return webPositions(el.nodes);
    case 'mindmap':
      return mindmapPositions(el.nodes, el.edges ?? []);
    case 'label':
    default:
      return labelPositions(el.nodes);
  }
}

function edgesFor(el: DiagramEl): Edge[] {
  const ids = el.nodes.map((n) => n.id);
  const given = el.edges ?? [];
  if (given.length > 0) return given;
  if (el.mode === 'cycle') {
    return ids.map((id, i) => ({ from: id, to: ids[(i + 1) % ids.length] ?? id }));
  }
  if (el.mode === 'web') {
    const root = ids[0];
    if (root === undefined) return [];
    return ids.slice(1).map((id) => ({ from: root, to: id }));
  }
  if (el.mode === 'mindmap') {
    const { parent } = bfsLevels(el.nodes, []);
    return Array.from(parent.entries()).map(([child, par]) => ({ from: par, to: child }));
  }
  if (el.mode === 'flow') {
    return ids.slice(0, -1).map((id, i) => ({ from: id, to: ids[i + 1] ?? id }));
  }
  return [];
}

/* ------------------------------------------------------------------ */
/* drawing primitives                                                   */
/* ------------------------------------------------------------------ */

function ArrowDefs() {
  return (
    <defs>
      <marker id="diagram-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="2.5" orient="auto">
        <path d="M0 0 L5 2.5 L0 5 Z" fill="var(--el-accent)" />
      </marker>
    </defs>
  );
}

function EdgeLine({ from, to, label, shorten = 20 }: { from: Pt; to: Pt; label?: string; shorten?: number }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const ux = dx / len;
  const uy = dy / len;
  const x1 = from.x + ux * Math.min(shorten * 0.2, len * 0.3);
  const y1 = from.y + uy * Math.min(shorten * 0.2, len * 0.3);
  const x2 = to.x - ux * Math.min(shorten, len * 0.6);
  const y2 = to.y - uy * Math.min(shorten, len * 0.6);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--el-accent)" strokeWidth="1.8" markerEnd="url(#diagram-arrow)" />
      {label && (
        <text x={mx} y={my - 4} textAnchor="middle" fontSize="7" fill="var(--el-muted)">
          {label}
        </text>
      )}
    </g>
  );
}

function LabelNode({ node, pos }: { node: Node; pos: Pt }) {
  const dx = pos.x - CX || 1;
  const dy = pos.y - CY;
  const len = Math.max(1, Math.hypot(dx, dy));
  const lx = pos.x + (dx / len) * 22;
  const ly = pos.y + (dy / len) * 22;
  return (
    <g>
      <line x1={pos.x} y1={pos.y} x2={lx} y2={ly} stroke="var(--el-muted)" strokeWidth="1.2" />
      <circle cx={pos.x} cy={pos.y} r="4" fill="var(--el-accent)" stroke="var(--el-surface)" strokeWidth="1" />
      <text x={lx} y={ly} textAnchor={dx >= 0 ? 'start' : 'end'} dominantBaseline="middle" fontSize="9" fontWeight="700" fill="var(--el-ink)">
        {node.label}
      </text>
    </g>
  );
}

function CircleNode({ node, pos, r = 20, fill = 'var(--el-blue)' }: { node: Node; pos: Pt; r?: number; fill?: string }) {
  const text = node.label.length > 10 ? `${node.label.slice(0, 9)}…` : node.label;
  return (
    <g>
      <circle cx={pos.x} cy={pos.y} r={r} fill={fill} stroke="var(--el-surface)" strokeWidth="2" />
      <text x={pos.x} y={pos.y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--el-on-accent)">
        {text}
      </text>
    </g>
  );
}

function BoxNode({ node, pos, w = 68, h = 26 }: { node: Node; pos: Pt; w?: number; h?: number }) {
  const text = node.label.length > 12 ? `${node.label.slice(0, 11)}…` : node.label;
  return (
    <g>
      <rect x={pos.x - w / 2} y={pos.y - h / 2} width={w} height={h} rx="6" fill="var(--el-surface-2)" stroke="var(--el-accent)" strokeWidth="1.5" />
      <text x={pos.x} y={pos.y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--el-ink)">
        {text}
      </text>
    </g>
  );
}

function shortenFor(mode: DiagramEl['mode']): number {
  if (mode === 'flow') return 26;
  if (mode === 'label') return 6;
  return 22;
}

/* ------------------------------------------------------------------ */
/* demonstrate                                                         */
/* ------------------------------------------------------------------ */

function DiagramDemonstrate({ el }: { el: DiagramEl }) {
  const layout = layoutFor(el);
  const edges = edgesFor(el);
  const shorten = shortenFor(el.mode);
  return (
    <div className="el-stack">
      <svg viewBox={`0 0 ${VBW} ${VBH}`} width="240" role="img" aria-label={`${el.mode} diagram`}>
        <ArrowDefs />
        {el.mode !== 'label' &&
          edges.map((e, i) => {
            const from = layout[e.from];
            const to = layout[e.to];
            if (!from || !to) return null;
            return <EdgeLine key={i} from={from} to={to} label={e.label} shorten={shorten} />;
          })}
        {el.mode === 'label' &&
          el.nodes.map((n) => {
            const p = layout[n.id];
            if (!p) return null;
            return <LabelNode key={n.id} node={n} pos={p} />;
          })}
        {el.mode === 'flow' &&
          el.nodes.map((n) => {
            const p = layout[n.id];
            if (!p) return null;
            return <BoxNode key={n.id} node={n} pos={p} />;
          })}
        {(el.mode === 'cycle' || el.mode === 'web' || el.mode === 'mindmap') &&
          el.nodes.map((n, i) => {
            const p = layout[n.id];
            if (!p) return null;
            const isRoot = (el.mode === 'web' || el.mode === 'mindmap') && i === 0;
            return <CircleNode key={n.id} node={n} pos={p} r={isRoot ? 24 : 18} fill={isRoot ? 'var(--el-accent)' : 'var(--el-blue)'} />;
          })}
        {el.mode === 'label' &&
          el.edges?.map((e, i) => {
            const from = layout[e.from];
            const to = layout[e.to];
            if (!from || !to) return null;
            return <EdgeLine key={`extra-${i}`} from={from} to={to} label={e.label} shorten={6} />;
          })}
      </svg>
      <p className="el-prompt">
        {el.mode === 'label' && 'Each part is labelled.'}
        {el.mode === 'cycle' && 'Follow the arrows around the cycle.'}
        {el.mode === 'flow' && 'Follow the steps from top to bottom.'}
        {el.mode === 'web' && 'A web of connected ideas.'}
        {el.mode === 'mindmap' && 'A mind map branching from the centre.'}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* manipulate                                                           */
/* ------------------------------------------------------------------ */

/** Deterministic "zigzag from both ends" shuffle — never equals the source
 * order when there's more than one item, but is stable across re-renders. */
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

/** `cycle`: child taps the steps into order; graded by comparing the
 * resulting sequence of original node INDICES to 0..n-1 (identity-safe even
 * if two nodes share the same label text). */
function CycleManipulate({ el, onResult }: { el: DiagramEl; onResult?: (r: ElementResult) => void }) {
  const nodes = el.nodes;
  const [tray] = useState(() => zigzagOrder(nodes.length));
  const [placed, setPlaced] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const remaining = tray.filter((i) => !placed.includes(i));
  const correct = placed.length === nodes.length && placed.every((idx, pos) => idx === pos);

  function tap(idx: number) {
    if (done || placed.includes(idx)) return;
    const next = [...placed, idx];
    setPlaced(next);
    if (next.length === nodes.length) {
      setDone(true);
      const text = next.map((i) => nodes[i]?.label ?? '').join(' → ');
      onResult?.({ text, correct: next.every((idx, pos) => idx === pos) });
    }
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the steps in order to build the cycle.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        {Array.from({ length: nodes.length }, (_, pos) => {
          const idx = placed[pos];
          const n = idx !== undefined ? nodes[idx] : undefined;
          return (
            <span
              key={pos}
              className="el-display"
              style={{
                minWidth: 60,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: n ? 'var(--el-on-accent)' : 'var(--el-faint)',
                background: n ? 'var(--el-blue)' : 'var(--el-surface-2)',
                border: n ? 'none' : '2px dashed var(--el-line)',
                borderRadius: 8,
                padding: '6px 8px',
              }}
            >
              {n ? n.label : `${pos + 1}`}
            </span>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {remaining.map((idx) => {
          const n = nodes[idx];
          if (!n) return null;
          return (
            <button key={idx} type="button" className="el-btn" onClick={() => tap(idx)} disabled={done}>
              {n.label}
            </button>
          );
        })}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — the order is ${nodes.map((n) => n.label).join(' → ')}.`}
        </p>
      )}
    </div>
  );
}

/** `label` / `flow` / `web` / `mindmap`: nodes are drawn anonymised (numbered
 * placeholders); the child taps a node then taps a label chip from a shuffled
 * pool (one chip per node) to assign it. Graded by comparing each node's
 * assigned chip TEXT to that node's own true label — content equality, never
 * chip identity — so duplicate label text across nodes can never be marked
 * wrong just because a different (identical-looking) chip instance was used. */
function LabelAssignManipulate({ el, onResult }: { el: DiagramEl; onResult?: (r: ElementResult) => void }) {
  const nodes = el.nodes;
  const layout = layoutFor(el);
  const edges = edgesFor(el);
  const shorten = shortenFor(el.mode);
  const [pool] = useState(() => zigzagOrder(nodes.length));
  const [assigned, setAssigned] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const usedPoolIdx = new Set(Object.values(assigned));
  const available = pool.filter((i) => !usedPoolIdx.has(i));

  function pickTarget(id: string) {
    if (done || assigned[id] !== undefined) return;
    setSelected(id);
  }
  function pickChip(poolIdx: number) {
    if (done || selected === null) return;
    const next = { ...assigned, [selected]: poolIdx };
    setAssigned(next);
    setSelected(null);
    if (Object.keys(next).length === nodes.length) {
      const correct = nodes.every((n) => nodes[next[n.id] ?? -1]?.label === n.label);
      setAllCorrect(correct);
      setDone(true);
      const text = nodes.map((n) => `${n.id}:${nodes[next[n.id] ?? -1]?.label ?? '?'}`).join(', ');
      onResult?.({ text, correct });
    }
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap a part, then tap its label below.</p>
      <svg viewBox={`0 0 ${VBW} ${VBH}`} width="240" role="img" aria-label="assign labels to the diagram">
        <ArrowDefs />
        {edges.map((e, i) => {
          const from = layout[e.from];
          const to = layout[e.to];
          if (!from || !to) return null;
          return <EdgeLine key={i} from={from} to={to} shorten={shorten} />;
        })}
        {nodes.map((n, i) => {
          const p = layout[n.id];
          if (!p) return null;
          const pi = assigned[n.id];
          const filled = pi !== undefined;
          const text = filled ? (nodes[pi]?.label ?? '?') : `${i + 1}`;
          const isSel = selected === n.id;
          const stroke = filled ? 'var(--el-green)' : isSel ? 'var(--el-accent)' : 'var(--el-line)';
          const fillColor = filled ? 'var(--el-accent-soft)' : isSel ? 'var(--el-accent-soft)' : 'var(--el-surface-2)';
          if (el.mode === 'flow') {
            return (
              <g key={n.id} onClick={() => pickTarget(n.id)} style={{ cursor: filled || done ? 'default' : 'pointer' }}>
                <rect x={p.x - 34} y={p.y - 13} width="68" height="26" rx="6" fill={fillColor} stroke={stroke} strokeWidth="2" />
                <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--el-ink)">
                  {text}
                </text>
              </g>
            );
          }
          return (
            <g key={n.id} onClick={() => pickTarget(n.id)} style={{ cursor: filled || done ? 'default' : 'pointer' }}>
              <circle cx={p.x} cy={p.y} r={el.mode === 'label' ? 12 : 18} fill={fillColor} stroke={stroke} strokeWidth="2" />
              <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--el-ink)">
                {text}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {available.map((idx) => {
          const n = nodes[idx];
          if (!n) return null;
          return (
            <button key={idx} type="button" className="el-btn" onClick={() => pickChip(idx)} disabled={done || selected === null}>
              {n.label}
            </button>
          );
        })}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: allCorrect ? 'var(--el-green)' : 'var(--el-red)' }}>
          {allCorrect ? '✓ All correct!' : 'Not quite — some labels landed on the wrong part.'}
        </p>
      )}
    </div>
  );
}

/**
 * `diagram` — five relationship views over the same `nodes`/`edges` shape:
 * `label` (leader-lined parts), `cycle` (ring + directional arrows), `flow`
 * (top-down boxes), `web` (central node + spokes, all edges drawn), `mindmap`
 * (central node + branching levels from BFS over `edges`).
 *
 * demonstrate: lays out nodes per `mode` and draws the edges (authored, or a
 * sensible synthesized set when `edges` is omitted).
 * manipulate: `cycle` is an ordering task (tap steps into sequence, graded by
 * index against 0..n-1); every other mode is a tap-to-assign labelling task
 * (graded by comparing each node's assigned chip TEXT to its own true label,
 * never by chip identity — see `LabelAssignManipulate` doc for why that
 * matters when two nodes share a label). P1 note: true drag-and-drop isn't
 * implemented; both manipulate flows use tap-tap-select instead.
 */
export const DiagramElement: React.FC<ElementProps<DiagramEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') {
    if (el.mode === 'cycle') return <CycleManipulate el={el} onResult={onResult} />;
    return <LabelAssignManipulate el={el} onResult={onResult} />;
  }
  return <DiagramDemonstrate el={el} />;
};

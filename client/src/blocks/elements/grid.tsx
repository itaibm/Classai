import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, GridEl } from '@shared/elements.ts';

type Cell = { x: number; y: number; fill?: string; label?: string };

const MARGIN_L = 22;
const MARGIN_T = 6;
const MARGIN_B = 20;
const MARGIN_R = 6;

/** Fits a `rows`×`cols` grid into the shared 260×150 viewBox, leaving room
 * for axis labels, and returns the geometry every sub-part draws from. */
function gridGeometry(rows: number, cols: number) {
  const w = 260 - MARGIN_L - MARGIN_R;
  const h = 150 - MARGIN_T - MARGIN_B;
  const cell = Math.min(w / Math.max(cols, 1), h / Math.max(rows, 1));
  const gw = cell * Math.max(cols, 1);
  const gh = cell * Math.max(rows, 1);
  const originX = MARGIN_L + (w - gw) / 2;
  const originY = MARGIN_T + (h - gh) / 2;
  return { cell, originX, originY, gw, gh };
}
type Geo = ReturnType<typeof gridGeometry>;

/** (0,0) is bottom-left, y grows upward (standard Cartesian) — row index
 * counted from the bottom of the drawn grid. */
function cellRect(x: number, y: number, geo: Geo) {
  return {
    x: geo.originX + x * geo.cell,
    y: geo.originY + geo.gh - (y + 1) * geo.cell,
    w: geo.cell,
    h: geo.cell,
  };
}

function GridLines({ geo, rows, cols }: { geo: Geo; rows: number; cols: number }) {
  return (
    <>
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={geo.originX}
          y1={geo.originY + i * geo.cell}
          x2={geo.originX + geo.gw}
          y2={geo.originY + i * geo.cell}
          stroke="var(--el-line)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={geo.originX + i * geo.cell}
          y1={geo.originY}
          x2={geo.originX + i * geo.cell}
          y2={geo.originY + geo.gh}
          stroke="var(--el-line)"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function AxisLabels({ geo, rows, cols }: { geo: Geo; rows: number; cols: number }) {
  return (
    <>
      {Array.from({ length: cols + 1 }).map((_, x) => (
        <text key={`xl${x}`} x={geo.originX + x * geo.cell} y={geo.originY + geo.gh + 12} textAnchor="middle" fontSize="8" fill="var(--el-muted)">
          {x}
        </text>
      ))}
      {Array.from({ length: rows + 1 }).map((_, y) => (
        <text key={`yl${y}`} x={geo.originX - 6} y={geo.originY + geo.gh - y * geo.cell + 3} textAnchor="end" fontSize="8" fill="var(--el-muted)">
          {y}
        </text>
      ))}
    </>
  );
}

function CoordDot({ cell, geo }: { cell: Cell; geo: Geo }) {
  const r = cellRect(cell.x, cell.y, geo);
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={Math.min(7, geo.cell * 0.28)} fill={cell.fill ?? 'var(--el-blue)'} stroke="var(--el-surface)" strokeWidth="1.5" />
      {cell.label && (
        <text x={cx} y={cy - geo.cell * 0.4} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--el-ink)">
          {cell.label}
        </text>
      )}
    </g>
  );
}

function CellFill({ cell, geo }: { cell: Cell; geo: Geo }) {
  const r = cellRect(cell.x, cell.y, geo);
  return (
    <g>
      <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={cell.fill ?? 'var(--el-blue)'} stroke="var(--el-surface)" strokeWidth="1" />
      {cell.label && (
        <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 3} textAnchor="middle" fontSize="8" fill="var(--el-on-accent)">
          {cell.label}
        </text>
      )}
    </g>
  );
}

function BeebotRoute({ cells, geo }: { cells: Cell[]; geo: Geo }) {
  const centers = cells.map((c) => {
    const r = cellRect(c.x, c.y, geo);
    return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
  });
  const first = centers[0];
  const last = centers[centers.length - 1];
  return (
    <>
      {centers.slice(0, -1).map((p, i) => {
        const q = centers[i + 1];
        if (!q) return null;
        return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--el-orange)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#grid-arrow)" />;
      })}
      {centers.map((p, i) => (
        <circle key={`pt${i}`} cx={p.x} cy={p.y} r="3" fill="var(--el-orange)" />
      ))}
      {first && (
        <text x={first.x} y={first.y + 4} textAnchor="middle" fontSize="14">
          🐝
        </text>
      )}
      {last && (
        <text x={last.x} y={last.y - geo.cell * 0.5} textAnchor="middle" fontSize="14">
          🏁
        </text>
      )}
    </>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="grid-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--el-orange)" />
      </marker>
    </defs>
  );
}

function GridDemonstrate({ el }: { el: GridEl }) {
  const gm = el.mode ?? 'coord';
  const geo = gridGeometry(el.rows, el.cols);
  const cells = el.cells ?? [];
  const target = el.target;
  return (
    <div className="el-stack">
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label={`${el.rows} by ${el.cols} grid`}>
        <ArrowDefs />
        <GridLines geo={geo} rows={el.rows} cols={el.cols} />
        {gm === 'coord' && <AxisLabels geo={geo} rows={el.rows} cols={el.cols} />}
        {gm === 'beebot' ? (
          <BeebotRoute cells={cells} geo={geo} />
        ) : gm === 'pixel' ? (
          cells.map((c, i) => <CellFill key={i} cell={c} geo={geo} />)
        ) : (
          cells.map((c, i) => <CoordDot key={i} cell={c} geo={geo} />)
        )}
        {target &&
          (() => {
            const r = cellRect(target.x, target.y, geo);
            return <rect x={r.x + 1} y={r.y + 1} width={r.w - 2} height={r.h - 2} rx="3" fill="none" stroke="var(--el-green)" strokeWidth="2.5" />;
          })()}
      </svg>
      <p className="el-prompt">
        {gm === 'beebot' ? 'Follow the route the robot takes.' : gm === 'pixel' ? 'A pixel picture on the grid.' : `${el.rows}×${el.cols} grid`}
      </p>
    </div>
  );
}

function GridManipulate({ el, onResult }: { el: GridEl; onResult?: (r: ElementResult) => void }) {
  const gm = el.mode ?? 'coord';
  const geo = gridGeometry(el.rows, el.cols);
  const cells = el.cells ?? [];
  const routeCells = gm === 'beebot' ? cells.slice(0, Math.max(cells.length - 1, 0)) : cells;
  const target = el.target;
  const [picked, setPicked] = useState<{ x: number; y: number } | null>(null);
  const done = picked !== null;
  const correct = picked && target ? picked.x === target.x && picked.y === target.y : undefined;

  function tap(x: number, y: number) {
    if (done) return;
    setPicked({ x, y });
    onResult?.({ text: `(${x}, ${y})`, correct: target ? x === target.x && y === target.y : undefined });
  }

  const prompt =
    gm === 'beebot'
      ? 'Tap the cell where the robot goes next.'
      : gm === 'pixel'
        ? `Tap the cell at (${target?.x ?? '?'}, ${target?.y ?? '?'}).`
        : `Tap the point at (${target?.x ?? '?'}, ${target?.y ?? '?'}).`;

  return (
    <div className="el-stack">
      <p className="el-prompt">{prompt}</p>
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label="tap the grid">
        <ArrowDefs />
        <GridLines geo={geo} rows={el.rows} cols={el.cols} />
        {gm === 'coord' && <AxisLabels geo={geo} rows={el.rows} cols={el.cols} />}
        {gm === 'beebot' && <BeebotRoute cells={routeCells} geo={geo} />}
        {gm === 'pixel' && cells.map((c, i) => <CellFill key={i} cell={c} geo={geo} />)}
        {Array.from({ length: el.rows }).map((_, y) =>
          Array.from({ length: el.cols }).map((_, x) => {
            const r = cellRect(x, y, geo);
            const isPicked = picked?.x === x && picked?.y === y;
            return (
              <rect
                key={`${x}-${y}`}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill={isPicked ? 'var(--el-accent-soft)' : 'transparent'}
                stroke={isPicked ? 'var(--el-accent)' : 'none'}
                strokeWidth="2"
                style={{ cursor: done ? 'default' : 'pointer', pointerEvents: 'all' }}
                onClick={() => tap(x, y)}
              />
            );
          })
        )}
      </svg>
      {done && target && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it was (${target.x}, ${target.y}).`}
        </p>
      )}
    </div>
  );
}

/**
 * `grid` — rows×cols grids in three flavours: `coord` (axes + plotted
 * points), `beebot` (a floor-robot route), `pixel` (a coloured-cell picture).
 *
 * demonstrate: draws the grid for the mode, with `target` (if any) ringed
 * in green.
 * manipulate: the target is hidden from the drawing; the child taps a cell
 * (the point / the picture's cell / the robot's next step) and the tap is
 * compared against `target`.
 */
export const GridElement: React.FC<ElementProps<GridEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <GridManipulate el={el} onResult={onResult} />;
  return <GridDemonstrate el={el} />;
};

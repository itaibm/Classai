import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { DataChartEl, ElementResult } from '@shared/elements.ts';
import { pieSlices } from './geometry.ts';

type Datum = { label: string; value: number };

const SLICE_COLORS = ['var(--el-blue)', 'var(--el-orange)', 'var(--el-green)', 'var(--el-purple)', 'var(--el-pink)', 'var(--el-amber)'];
function sliceColor(i: number): string {
  return SLICE_COLORS[i % SLICE_COLORS.length] ?? 'var(--el-blue)';
}

/* ------------------------------------------------------------------ */
/* pure chart bodies (no label/prompt chrome)                          */
/* ------------------------------------------------------------------ */

function TableView({ data, unit }: { data: Datum[]; unit?: string }) {
  return (
    <table className="el-mono" style={{ borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '4px 10px', borderBottom: '2px solid var(--el-line)', color: 'var(--el-muted)' }}>Label</th>
          <th style={{ textAlign: 'right', padding: '4px 10px', borderBottom: '2px solid var(--el-line)', color: 'var(--el-muted)' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            <td style={{ padding: '4px 10px', borderBottom: '1px solid var(--el-line)', color: 'var(--el-ink)' }}>{d.label}</td>
            <td style={{ padding: '4px 10px', borderBottom: '1px solid var(--el-line)', textAlign: 'right', fontWeight: 700, color: 'var(--el-ink)' }}>
              {d.value}
              {unit ? ` ${unit}` : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const PICTO_ICONS = ['🟦', '🟧', '🟩', '🟪', '🟥', '🟨'] as const;
const MAX_ICONS = 20;

function PictogramView({ data, unit }: { data: Datum[]; unit?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {data.map((d, i) => {
        const icon = PICTO_ICONS[i % PICTO_ICONS.length] ?? '🟦';
        const shown = Math.max(0, Math.min(d.value, MAX_ICONS));
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 66, fontSize: 11, color: 'var(--el-muted)', fontWeight: 600, flexShrink: 0 }}>{d.label}</span>
            <span style={{ fontSize: 15, letterSpacing: 1, wordBreak: 'break-all' }}>
              {icon.repeat(shown)}
              {d.value > MAX_ICONS ? ` +${d.value - MAX_ICONS}` : ''}
            </span>
            <span style={{ fontSize: 10, color: 'var(--el-faint)', marginLeft: 'auto', flexShrink: 0 }}>
              {d.value}
              {unit ? ` ${unit}` : ''}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function barLayout(n: number) {
  const baseline = 118;
  const top = 14;
  const gap = 8;
  const barW = Math.min(34, (236 - gap * Math.max(n - 1, 0)) / Math.max(n, 1));
  const startX = (260 - (barW * n + gap * Math.max(n - 1, 0))) / 2;
  return { baseline, top, chartH: baseline - top, gap, barW, startX };
}

function BarChart({ data }: { data: Datum[] }) {
  const maxV = Math.max(1, ...data.map((d) => d.value));
  const { baseline, chartH, gap, barW, startX } = barLayout(data.length);
  return (
    <svg viewBox="0 0 260 150" width="240" role="img" aria-label="bar chart">
      <line x1="14" y1={baseline} x2="246" y2={baseline} stroke="var(--el-line)" strokeWidth="1.5" />
      {data.map((d, i) => {
        const h = (d.value / maxV) * chartH;
        const x = startX + i * (barW + gap);
        const y = baseline - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx="3" fill="var(--el-blue)" />
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--el-ink)">
              {d.value}
            </text>
            <text x={x + barW / 2} y={baseline + 11} textAnchor="middle" fontSize="8" fill="var(--el-muted)">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({ data }: { data: Datum[] }) {
  const maxV = Math.max(1, ...data.map((d) => d.value));
  const baseline = 118;
  const top = 14;
  const chartH = baseline - top;
  const n = data.length;
  const startX = 24;
  const endX = 244;
  const stepX = n > 1 ? (endX - startX) / (n - 1) : 0;
  const pts = data.map((d, i) => ({ x: startX + i * stepX, y: baseline - (d.value / maxV) * chartH }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  return (
    <svg viewBox="0 0 260 150" width="240" role="img" aria-label="line chart">
      <line x1={startX} y1={baseline} x2={endX} y2={baseline} stroke="var(--el-line)" strokeWidth="1.5" />
      {path && <path d={path} fill="none" stroke="var(--el-blue)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
      {pts.map((p, i) => {
        const d = data[i];
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--el-blue)" stroke="var(--el-surface)" strokeWidth="1.5" />
            <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--el-ink)">
              {d?.value}
            </text>
            <text x={p.x} y={baseline + 11} textAnchor="middle" fontSize="8" fill="var(--el-muted)">
              {d?.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * `pieSlices(n, r)` only divides a circle into `n` *equal-angle* wedges — it
 * has no notion of value. To still get "sized by value" out of it (as asked)
 * we call it once per datum with a per-datum radius scaled to that datum's
 * share of the max value, and keep only that datum's slice — an equal-angle,
 * variable-radius "rose"/coxcomb pie, built entirely from the shared helper.
 */
function PieChart({ data, unit }: { data: Datum[]; unit?: string }) {
  const n = Math.max(data.length, 1);
  const maxV = Math.max(1, ...data.map((d) => d.value));
  const minR = 16;
  const maxR = 34;
  return (
    <div className="el-stack">
      <svg viewBox="-40 -40 80 80" width="150" height="150" role="img" aria-label="pie chart">
        {data.map((d, i) => {
          const r = minR + (maxR - minR) * (d.value / maxV);
          const path = pieSlices(n, r)[i];
          if (!path) return null;
          return <path key={i} d={path} fill={sliceColor(i)} stroke="var(--el-surface)" strokeWidth="1.5" />;
        })}
      </svg>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {data.map((d, i) => (
          <span key={i} style={{ fontSize: 11, color: 'var(--el-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: sliceColor(i), display: 'inline-block' }} />
            {d.label}: {d.value}
            {unit ? ` ${unit}` : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

function ChartByKind({ el }: { el: DataChartEl }) {
  switch (el.kind) {
    case 'table':
      return <TableView data={el.data} unit={el.unit} />;
    case 'pictogram':
      return <PictogramView data={el.data} unit={el.unit} />;
    case 'bar':
      return <BarChart data={el.data} />;
    case 'line':
      return <LineChart data={el.data} />;
    case 'pie':
    default:
      return <PieChart data={el.data} unit={el.unit} />;
  }
}

function DataChartDemonstrate({ el }: { el: DataChartEl }) {
  return (
    <div className="el-stack">
      <ChartByKind el={el} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* manipulate                                                          */
/* ------------------------------------------------------------------ */

function NumberStepper({ value, onChange, disabled }: { value: number; onChange: (n: number) => void; disabled?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button type="button" className="el-btn" disabled={disabled} onClick={() => onChange(Math.max(0, value - 1))}>
        −
      </button>
      <span className="el-display" style={{ minWidth: 28, textAlign: 'center', fontWeight: 800, fontSize: 16 }}>
        {value}
      </span>
      <button type="button" className="el-btn" disabled={disabled} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}

/** bar kind: the last bar is hidden from the reference chart; the child
 * drags (steps) its own bar to match, then checks against the real value. */
function BarManipulate({ el, onResult }: { el: DataChartEl; onResult?: (r: ElementResult) => void }) {
  const data = el.data;
  if (data.length === 0) return <p className="el-prompt">No data.</p>;
  const lastIndex = data.length - 1;
  const target = data[lastIndex];
  const reference = data.slice(0, lastIndex);
  const maxV = Math.max(1, ...data.map((d) => d.value));
  const [guess, setGuess] = useState(0);
  const [done, setDone] = useState(false);
  const correct = done && target ? guess === target.value : undefined;

  const { baseline, chartH, gap, barW, startX } = barLayout(data.length);
  const guessH = (guess / maxV) * chartH;
  const guessX = startX + lastIndex * (barW + gap);
  const guessY = baseline - guessH;

  return (
    <div className="el-stack">
      <p className="el-prompt">Set the last bar to match {target?.label ?? 'the missing value'}.</p>
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label="set the bar height">
        <line x1="14" y1={baseline} x2="246" y2={baseline} stroke="var(--el-line)" strokeWidth="1.5" />
        {reference.map((d, i) => {
          const h = (d.value / maxV) * chartH;
          const x = startX + i * (barW + gap);
          const y = baseline - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={h} rx="3" fill="var(--el-blue)" opacity="0.55" />
              <text x={x + barW / 2} y={baseline + 11} textAnchor="middle" fontSize="8" fill="var(--el-muted)">
                {d.label}
              </text>
            </g>
          );
        })}
        <rect x={guessX} y={guessY} width={barW} height={guessH} rx="3" fill="var(--el-accent)" />
        <text x={guessX + barW / 2} y={guessY - 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--el-ink)">
          {guess}
        </text>
        <text x={guessX + barW / 2} y={baseline + 11} textAnchor="middle" fontSize="8" fill="var(--el-muted)">
          {target?.label ?? '?'}
        </text>
      </svg>
      <NumberStepper value={guess} onChange={setGuess} disabled={done} />
      <button
        type="button"
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: String(guess), correct: target ? guess === target.value : undefined });
        }}
      >
        Check
      </button>
      {done && target && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be ${target.value}.`}
        </p>
      )}
    </div>
  );
}

/** table / pictogram / line / pie: the last datum is withheld from the
 * chart; the child reads/estimates its value and enters a number. */
function ReadValueManipulate({ el, onResult }: { el: DataChartEl; onResult?: (r: ElementResult) => void }) {
  const data = el.data;
  if (data.length === 0) return <p className="el-prompt">No data.</p>;
  const idx = data.length - 1;
  const target = data[idx];
  const shown = data.slice(0, idx);
  const [guess, setGuess] = useState(0);
  const [done, setDone] = useState(false);
  const correct = done && target ? guess === target.value : undefined;

  return (
    <div className="el-stack">
      {el.kind === 'table' && <TableView data={shown} unit={el.unit} />}
      {el.kind === 'pictogram' && <PictogramView data={shown} unit={el.unit} />}
      {el.kind === 'line' && <LineChart data={shown} />}
      {el.kind === 'pie' && <PieChart data={shown} unit={el.unit} />}
      <p className="el-prompt">
        How many {target?.label ?? 'is it'}
        {el.unit ? ` (${el.unit})` : ''}?
      </p>
      <NumberStepper value={guess} onChange={setGuess} disabled={done} />
      <button
        type="button"
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: String(guess), correct: target ? guess === target.value : undefined });
        }}
      >
        Check
      </button>
      {done && target && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it was ${target.value}.`}
        </p>
      )}
    </div>
  );
}

function DataChartManipulate({ el, onResult }: { el: DataChartEl; onResult?: (r: ElementResult) => void }) {
  if (el.kind === 'bar') return <BarManipulate el={el} onResult={onResult} />;
  return <ReadValueManipulate el={el} onResult={onResult} />;
}

/**
 * `dataChart` — five ways to look at the same `{label, value}[]`: table,
 * pictogram, bar, line, pie.
 *
 * demonstrate: renders `data` per `kind`.
 * manipulate: for `bar`, the last bar is hidden and the child steps their
 * own bar to match it; for the other kinds, the last datum is withheld and
 * the child reads/estimates its value with a stepper. Both compare against
 * the real value from `data`.
 */
export const DataChartElement: React.FC<ElementProps<DataChartEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <DataChartManipulate el={el} onResult={onResult} />;
  return <DataChartDemonstrate el={el} />;
};

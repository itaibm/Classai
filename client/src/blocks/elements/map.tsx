import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, MapEl } from '@shared/elements.ts';

const VBW = 260;
const VBH = 150;

type Pt = { x: number; y: number };

/** Pin coordinates are authored on a 0-100 scale on both axes; map straight
 * onto the viewBox (percent-of-width, percent-of-height). */
function pct(x: number, y: number): Pt {
  return { x: (x / 100) * VBW, y: (y / 100) * VBH };
}

function distance(a: Pt, b: Pt): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Deterministic soft "blob" outline — a stand-in for a continent/region.
 * Intentionally NOT real cartography: a rounded, slightly irregular closed
 * shape built from a jittered ring of points, smoothed with quadratic
 * curves through their midpoints. */
function blobPath(cx: number, cy: number, rx: number, ry: number, seed: number, n = 9): string {
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2;
    const jitter = 0.82 + 0.18 * Math.sin(seed + i * 2.3) + 0.06 * Math.cos(seed * 1.7 + i * 0.9);
    pts.push({ x: cx + rx * jitter * Math.cos(angle), y: cy + ry * jitter * Math.sin(angle) });
  }
  const first = pts[0];
  const last = pts[n - 1];
  if (!first || !last) return '';
  const startMid = { x: (last.x + first.x) / 2, y: (last.y + first.y) / 2 };
  let d = `M ${startMid.x.toFixed(1)} ${startMid.y.toFixed(1)} `;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const next = pts[(i + 1) % n];
    if (!p || !next) continue;
    const mid = { x: (p.x + next.x) / 2, y: (p.y + next.y) / 2 };
    d += `Q ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${mid.x.toFixed(1)} ${mid.y.toFixed(1)} `;
  }
  return `${d}Z`;
}

const REGION_COLORS = ['var(--el-green)', 'var(--el-blue)', 'var(--el-amber)', 'var(--el-purple)', 'var(--el-pink)'];
function regionColor(i: number): string {
  return REGION_COLORS[i % REGION_COLORS.length] ?? 'var(--el-green)';
}

interface Blob {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  seed: number;
  label?: string;
  color: string;
}

/**
 * `MapEl` carries region NAMES but no region geometry, so "shading regions"
 * means: draw one tinted, labelled landmass per named region (cycling
 * colours), sized/arranged per `scope`. With no regions authored, a
 * sensible default set of undifferentiated landmasses is still drawn so the
 * map never looks empty.
 */
function blobsForScope(scope: MapEl['scope'], regions: string[]): Blob[] {
  if (scope === 'local') {
    const count = Math.max(regions.length, 4);
    const cols = Math.ceil(Math.sqrt(count));
    return Array.from({ length: count }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const label = regions[i];
      return { cx: 55 + col * 60, cy: 40 + row * 45, rx: 24, ry: 18, seed: i * 1.3, label, color: label ? regionColor(i) : 'var(--el-surface-2)' };
    });
  }
  if (scope === 'region') {
    if (regions.length <= 1) {
      return [{ cx: 130, cy: 75, rx: 95, ry: 55, seed: 1, label: regions[0], color: regions[0] ? regionColor(0) : 'var(--el-green)' }];
    }
    const preset = [
      { cx: 95, cy: 70, rx: 60, ry: 42 },
      { cx: 185, cy: 85, rx: 55, ry: 38 },
      { cx: 140, cy: 40, rx: 40, ry: 26 },
    ];
    return regions.slice(0, 3).map((label, i) => {
      const p = preset[i];
      return { cx: p?.cx ?? 130, cy: p?.cy ?? 75, rx: p?.rx ?? 50, ry: p?.ry ?? 35, seed: i * 1.4 + 1, label, color: regionColor(i) };
    });
  }
  if (scope === 'historical') {
    const preset = [
      { cx: 70, cy: 55, rx: 45, ry: 32 },
      { cx: 160, cy: 45, rx: 38, ry: 26 },
      { cx: 190, cy: 100, rx: 42, ry: 30 },
      { cx: 90, cy: 110, rx: 32, ry: 22 },
    ];
    const count = Math.min(Math.max(regions.length, 3), preset.length);
    return Array.from({ length: count }, (_, i) => {
      const p = preset[i];
      return { cx: p?.cx ?? 130, cy: p?.cy ?? 75, rx: p?.rx ?? 40, ry: p?.ry ?? 28, seed: i * 1.9 + 0.5, label: regions[i], color: 'var(--el-amber)' };
    });
  }
  // world (default)
  const preset = [
    { cx: 65, cy: 55, rx: 40, ry: 30 },
    { cx: 170, cy: 50, rx: 45, ry: 32 },
    { cx: 195, cy: 110, rx: 32, ry: 22 },
    { cx: 90, cy: 115, rx: 30, ry: 20 },
    { cx: 140, cy: 30, rx: 22, ry: 14 },
  ];
  const count = Math.min(Math.max(regions.length, 3), preset.length);
  return Array.from({ length: count }, (_, i) => {
    const p = preset[i];
    const label = regions[i];
    return { cx: p?.cx ?? 130, cy: p?.cy ?? 75, rx: p?.rx ?? 30, ry: p?.ry ?? 20, seed: i * 1.5, label, color: label ? regionColor(i) : 'var(--el-green)' };
  });
}

function MapBackground({ scope, regions }: { scope: MapEl['scope']; regions: string[] }) {
  const blobs = blobsForScope(scope, regions);
  const historical = scope === 'historical';
  return (
    <>
      {blobs.map((b, i) => (
        <g key={i}>
          <path
            d={blobPath(b.cx, b.cy, b.rx, b.ry, b.seed)}
            fill={b.color}
            fillOpacity={historical ? 0.35 : 0.5}
            stroke={historical ? 'var(--el-amber)' : 'var(--el-surface)'}
            strokeWidth={historical ? 1.5 : 2}
            strokeDasharray={historical ? '3 3' : undefined}
          />
          {b.label && (
            <text x={b.cx} y={b.cy} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="var(--el-ink)" opacity="0.75">
              {b.label}
            </text>
          )}
        </g>
      ))}
    </>
  );
}

function PinMarker({ p, label, color = 'var(--el-red)' }: { p: Pt; label?: string; color?: string }) {
  return (
    <g>
      <path
        d={`M ${p.x} ${p.y - 9} c 4 0 7 3 7 7 c 0 5 -7 11 -7 11 s -7 -6 -7 -11 c 0 -4 3 -7 7 -7 Z`}
        fill={color}
        stroke="var(--el-surface)"
        strokeWidth="1"
      />
      <circle cx={p.x} cy={p.y - 2} r="2" fill="var(--el-surface)" />
      {label && (
        <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--el-ink)">
          {label}
        </text>
      )}
    </g>
  );
}

function RouteLine({ from, to }: { from: Pt; to: Pt }) {
  return <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="var(--el-accent)" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />;
}

/* ------------------------------------------------------------------ */
/* demonstrate                                                         */
/* ------------------------------------------------------------------ */

function MapDemonstrate({ el }: { el: MapEl }) {
  const pins = el.pins ?? [];
  const regions = el.regions ?? [];
  const findPin = (label: string) => pins.find((p) => p.label === label);
  return (
    <div className="el-stack">
      <svg viewBox={`0 0 ${VBW} ${VBH}`} width="240" role="img" aria-label={`${el.scope} map`}>
        <MapBackground scope={el.scope} regions={regions} />
        {(el.routes ?? []).map((r, i) => {
          const a = findPin(r.from);
          const b = findPin(r.to);
          if (!a || !b) return null;
          return <RouteLine key={i} from={pct(a.x, a.y)} to={pct(b.x, b.y)} />;
        })}
        {pins.map((p, i) => (
          <PinMarker key={i} p={pct(p.x, p.y)} label={p.label} />
        ))}
      </svg>
      {regions.length > 0 && <p className="el-prompt">Regions: {regions.join(', ')}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* manipulate                                                           */
/* ------------------------------------------------------------------ */

const PLACE_TOLERANCE = 14; // percent-space distance treated as "close enough"

/** The last pin is withheld; the child taps where they think it belongs and
 * the tap is compared (by distance, within tolerance) to its true spot. */
function PinPlaceManipulate({ el, onResult }: { el: MapEl; onResult?: (r: ElementResult) => void }) {
  const pins = el.pins ?? [];
  const targetIdx = pins.length - 1;
  const target = pins[targetIdx];
  const shown = pins.slice(0, targetIdx);
  const [tap, setTap] = useState<Pt | null>(null);
  const [done, setDone] = useState(false);

  if (!target) return <p className="el-prompt">No pins to place.</p>;

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    if (done || !target) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setTap({ x: xPct, y: yPct });
    setDone(true);
    const dist = distance({ x: xPct, y: yPct }, { x: target.x, y: target.y });
    onResult?.({ text: `(${Math.round(xPct)}, ${Math.round(yPct)})`, correct: dist <= PLACE_TOLERANCE });
  }

  const correct = tap ? distance(tap, { x: target.x, y: target.y }) <= PLACE_TOLERANCE : undefined;

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the map where you think &ldquo;{target.label}&rdquo; is.</p>
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        width="240"
        role="img"
        aria-label="tap the map to place a pin"
        onClick={handleClick}
        style={{ cursor: done ? 'default' : 'crosshair' }}
      >
        <MapBackground scope={el.scope} regions={el.regions ?? []} />
        {shown.map((p, i) => (
          <PinMarker key={i} p={pct(p.x, p.y)} label={p.label} color="var(--el-muted)" />
        ))}
        {tap && <PinMarker p={pct(tap.x, tap.y)} label="Your guess" color={correct ? 'var(--el-green)' : 'var(--el-red)'} />}
        {done && <PinMarker p={pct(target.x, target.y)} label={target.label} color="var(--el-accent)" />}
      </svg>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Close enough!' : `Not quite — ${target.label} was there.`}
        </p>
      )}
    </div>
  );
}

/** All pins are shown; the child taps the two endpoints of the target route.
 * Graded by comparing the tapped PIN-NAME PAIR (as a set) to the route's
 * {from, to} — content equality, safe even if two pins share a label. */
function RouteTraceManipulate({ el, route, onResult }: { el: MapEl; route: { from: string; to: string }; onResult?: (r: ElementResult) => void }) {
  const pins = el.pins ?? [];
  const [picks, setPicks] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function tapPin(label: string) {
    if (done || picks.includes(label) || picks.length >= 2) return;
    const next = [...picks, label];
    setPicks(next);
    if (next.length === 2) {
      setDone(true);
      const want = new Set([route.from, route.to]);
      const got = new Set(next);
      const correct = want.size === got.size && [...want].every((w) => got.has(w));
      onResult?.({ text: next.join(' ↔ '), correct });
    }
  }

  const wantSet = new Set([route.from, route.to]);
  const gotSet = new Set(picks);
  const correct = done && wantSet.size === gotSet.size && [...wantSet].every((w) => gotSet.has(w));

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the two places the route connects.</p>
      <svg viewBox={`0 0 ${VBW} ${VBH}`} width="240" role="img" aria-label="trace the route between two pins">
        <MapBackground scope={el.scope} regions={el.regions ?? []} />
        {picks.length === 2 &&
          (() => {
            const a = pins.find((p) => p.label === picks[0]);
            const b = pins.find((p) => p.label === picks[1]);
            if (!a || !b) return null;
            return <RouteLine from={pct(a.x, a.y)} to={pct(b.x, b.y)} />;
          })()}
        {pins.map((p, i) => {
          const picked = picks.includes(p.label);
          return (
            <g key={i} onClick={() => tapPin(p.label)} style={{ cursor: done ? 'default' : 'pointer' }}>
              <PinMarker p={pct(p.x, p.y)} label={p.label} color={picked ? 'var(--el-accent)' : 'var(--el-red)'} />
            </g>
          );
        })}
      </svg>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct route!' : `Not quite — the route connects ${route.from} and ${route.to}.`}
        </p>
      )}
    </div>
  );
}

/**
 * `map` — a stylised, abstract landmass (not real cartography) for `scope`,
 * with `pins`, region shading (regions have no geometry of their own, so
 * each becomes a tinted labelled landmass), and `routes` between pins.
 *
 * demonstrate: draws the whole map as authored.
 * manipulate: if `routes` are authored, the child taps the two pins the
 * first route connects (graded as a name set); otherwise the last pin is
 * withheld and the child taps its location, graded by distance within a
 * tolerance (percent-space).
 */
export const MapElement: React.FC<ElementProps<MapEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') {
    const route = (el.routes ?? [])[0];
    if (route) return <RouteTraceManipulate el={el} route={route} onResult={onResult} />;
    return <PinPlaceManipulate el={el} onResult={onResult} />;
  }
  return <MapDemonstrate el={el} />;
};

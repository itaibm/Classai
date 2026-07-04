import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, ShapeEl } from '@shared/elements.ts';

/* ------------------------------------------------------------------ */
/* geometry helpers (local to this renderer — spec parsing + drawing) */
/* ------------------------------------------------------------------ */

/** Regular-polygon table: `startDeg` chosen per shape so it looks natural
 * (axis-aligned square, apex-up triangle/pentagon, flat-top hexagon). */
const POLY_2D = {
  triangle: { name: 'triangle', sides: 3, startDeg: -90 },
  square: { name: 'square', sides: 4, startDeg: 45 },
  pentagon: { name: 'pentagon', sides: 5, startDeg: -90 },
  hexagon: { name: 'hexagon', sides: 6, startDeg: 0 },
} as const;
type PolyKey = keyof typeof POLY_2D;
type Poly2D = (typeof POLY_2D)[PolyKey];

function regularPolygonPoints(sides: number, cx: number, cy: number, r: number, startDeg: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const rad = ((startDeg + (360 / sides) * i) * Math.PI) / 180;
    pts.push({ x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) });
  }
  return pts;
}
function pointsAttr(pts: { x: number; y: number }[]): string {
  return pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

type Resolved2D = { kind: 'circle' } | { kind: 'polygon'; poly: Poly2D };

/** `spec` is a free-text shape name from the lesson author, e.g. "square" or
 * "a big blue triangle" — we scan for a known keyword and fall back to a
 * square (a safe, always-renderable default) if nothing matches. */
function parseShape2D(spec: string): Resolved2D {
  const s = spec.toLowerCase();
  const keys = Object.keys(POLY_2D) as PolyKey[];
  for (const key of keys) {
    if (s.includes(key)) return { kind: 'polygon', poly: POLY_2D[key] };
  }
  if (s.includes('circle')) return { kind: 'circle' };
  return { kind: 'polygon', poly: POLY_2D.square };
}

type Shape3DKind = 'cube' | 'cuboid' | 'sphere' | 'pyramid' | 'cylinder';
function parse3D(spec: string): Shape3DKind {
  const s = spec.toLowerCase();
  if (s.includes('cuboid') || s.includes('box') || s.includes('prism')) return 'cuboid';
  if (s.includes('sphere') || s.includes('ball')) return 'sphere';
  if (s.includes('pyramid')) return 'pyramid';
  if (s.includes('cylinder')) return 'cylinder';
  return 'cube';
}

type AngleKind = 'right' | 'acute' | 'obtuse';
/** `spec` may name the kind directly ("obtuse angle") and/or carry an
 * explicit degree ("acute 40"). Right angles are always drawn at exactly
 * 90° (the canonical right-angle marker assumes a vertical second ray). */
function parseAngle(spec: string): { kind: AngleKind; deg: number } {
  const s = spec.toLowerCase();
  const match = spec.match(/(\d+(?:\.\d+)?)/);
  const explicit = match?.[1] !== undefined ? Number(match[1]) : undefined;
  let kind: AngleKind;
  if (s.includes('right')) kind = 'right';
  else if (s.includes('obtuse')) kind = 'obtuse';
  else if (s.includes('acute')) kind = 'acute';
  else if (explicit !== undefined) kind = explicit === 90 ? 'right' : explicit > 90 ? 'obtuse' : 'acute';
  else kind = 'acute';
  const deg = kind === 'right' ? 90 : (explicit ?? (kind === 'obtuse' ? 130 : 50));
  return { kind, deg };
}

type SymShape = 'square' | 'rectangle' | 'triangle' | 'circle' | 'pentagon' | 'hexagon';
function parseSymmetryShape(spec: string): SymShape {
  const s = spec.toLowerCase();
  if (s.includes('rectangle')) return 'rectangle';
  if (s.includes('triangle')) return 'triangle';
  if (s.includes('circle')) return 'circle';
  if (s.includes('pentagon')) return 'pentagon';
  if (s.includes('hexagon')) return 'hexagon';
  return 'square';
}

type NetKind = 'cube' | 'pyramid';
function parseNetKind(spec: string): NetKind {
  return spec.toLowerCase().includes('pyramid') ? 'pyramid' : 'cube';
}
function netFaceCount(kind: NetKind): number {
  return kind === 'pyramid' ? 5 : 6;
}

/* ------------------------------------------------------------------ */
/* 2d: polygon / circle                                               */
/* ------------------------------------------------------------------ */

function Shape2DDemonstrate({ spec }: { spec: string }) {
  const resolved = parseShape2D(spec);
  if (resolved.kind === 'circle') {
    return (
      <div className="el-stack">
        <svg viewBox="-60 -60 120 120" width="150" height="150" role="img" aria-label="circle">
          <circle cx="0" cy="0" r="46" fill="var(--el-accent-soft)" stroke="var(--el-accent)" strokeWidth="3" />
        </svg>
        <p className="el-prompt">A circle — no straight sides, curved all the way round.</p>
      </div>
    );
  }
  const { poly } = resolved;
  const pts = regularPolygonPoints(poly.sides, 0, 0, 46, poly.startDeg);
  return (
    <div className="el-stack">
      <svg viewBox="-60 -60 120 120" width="150" height="150" role="img" aria-label={poly.name}>
        <polygon points={pointsAttr(pts)} fill="var(--el-accent-soft)" stroke="var(--el-accent)" strokeWidth="3" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="var(--el-blue)" />
        ))}
      </svg>
      <p className="el-prompt">
        {poly.sides} sides, {poly.sides} vertices — a {poly.name}.
      </p>
    </div>
  );
}

function Shape2DManipulate({ spec, onResult }: { spec: string; onResult?: (r: ElementResult) => void }) {
  const resolved = parseShape2D(spec);
  const sides = resolved.kind === 'circle' ? 0 : resolved.poly.sides;
  const pts = resolved.kind === 'polygon' ? regularPolygonPoints(resolved.poly.sides, 0, 0, 46, resolved.poly.startDeg) : [];
  const options = [0, 3, 4, 5, 6, 7, 8];
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  const correct = done ? picked === sides : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">How many sides does this shape have?</p>
      <svg viewBox="-60 -60 120 120" width="140" height="140" role="img" aria-label="count the sides">
        {resolved.kind === 'circle' ? (
          <circle cx="0" cy="0" r="46" fill="var(--el-accent-soft)" stroke="var(--el-accent)" strokeWidth="3" />
        ) : (
          <polygon points={pointsAttr(pts)} fill="var(--el-accent-soft)" stroke="var(--el-accent)" strokeWidth="3" />
        )}
      </svg>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {options.map((n) => (
          <button
            key={n}
            type="button"
            className="el-btn"
            disabled={done}
            aria-pressed={picked === n}
            style={picked === n ? { borderColor: 'var(--el-accent)', color: 'var(--el-accent)' } : undefined}
            onClick={() => {
              setPicked(n);
              onResult?.({ text: String(n), correct: n === sides });
            }}
          >
            {n}
          </button>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it has ${sides} sides.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3d: simple isometric sketches                                      */
/* ------------------------------------------------------------------ */

/** An isometric box: top / left / right face polygons around one shared
 * corner at the origin, for a given width/depth/height. Reused by cube and
 * cuboid (which just pass different proportions). */
function isoBox(w: number, d: number, h: number) {
  const c = Math.cos(Math.PI / 6);
  const sn = Math.sin(Math.PI / 6);
  const right = { x: w * c, y: w * sn };
  const left = { x: -d * c, y: d * sn };
  const front = { x: right.x + left.x, y: right.y + left.y };
  const down = (p: { x: number; y: number }) => ({ x: p.x, y: p.y + h });
  return {
    top: pointsAttr([{ x: 0, y: 0 }, right, front, left]),
    left: pointsAttr([left, front, down(front), down(left)]),
    right: pointsAttr([right, front, down(front), down(right)]),
  };
}

function CubeSvg() {
  const box = isoBox(26, 26, 32);
  return (
    <svg viewBox="-40 -30 80 90" width="140" height="140" role="img" aria-label="cube">
      <polygon points={box.top} fill="var(--el-blue)" fillOpacity="1" stroke="var(--el-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points={box.left} fill="var(--el-blue)" fillOpacity="0.7" stroke="var(--el-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points={box.right} fill="var(--el-blue)" fillOpacity="0.45" stroke="var(--el-ink)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function CuboidSvg() {
  const box = isoBox(34, 18, 44);
  return (
    <svg viewBox="-46 -30 92 100" width="140" height="140" role="img" aria-label="cuboid">
      <polygon points={box.top} fill="var(--el-purple)" fillOpacity="1" stroke="var(--el-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points={box.left} fill="var(--el-purple)" fillOpacity="0.7" stroke="var(--el-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points={box.right} fill="var(--el-purple)" fillOpacity="0.45" stroke="var(--el-ink)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function SphereSvg() {
  return (
    <svg viewBox="-50 -50 100 100" width="140" height="140" role="img" aria-label="sphere">
      <circle cx="0" cy="0" r="42" fill="var(--el-orange)" stroke="var(--el-ink)" strokeWidth="1.5" />
      <ellipse cx="0" cy="6" rx="40" ry="13" fill="none" stroke="var(--el-ink)" strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
      <ellipse cx="-14" cy="-16" rx="15" ry="9" fill="var(--el-surface)" opacity="0.3" />
    </svg>
  );
}
function PyramidSvg() {
  const c = Math.cos(Math.PI / 6);
  const sn = Math.sin(Math.PI / 6);
  const w = 28;
  const d = 28;
  const right = { x: w * c, y: w * sn };
  const left = { x: -d * c, y: d * sn };
  const front = { x: right.x + left.x, y: right.y + left.y };
  const back = { x: 0, y: 0 };
  const baseY = 14;
  const shift = (p: { x: number; y: number }) => ({ x: p.x, y: p.y + baseY });
  const R = shift(right);
  const L = shift(left);
  const F = shift(front);
  const B = shift(back);
  const apex = { x: 0, y: -36 };
  return (
    <svg viewBox="-46 -46 92 100" width="140" height="140" role="img" aria-label="square-based pyramid">
      <polygon
        points={pointsAttr([apex, L, F])}
        fill="var(--el-green)"
        fillOpacity="0.55"
        stroke="var(--el-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points={pointsAttr([apex, F, R])}
        fill="var(--el-green)"
        fillOpacity="0.85"
        stroke="var(--el-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1={apex.x} y1={apex.y} x2={B.x} y2={B.y} stroke="var(--el-ink)" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
      <polygon points={pointsAttr([B, L, F, R])} fill="none" stroke="var(--el-ink)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
function CylinderSvg() {
  return (
    <svg viewBox="-40 -50 80 110" width="130" height="150" role="img" aria-label="cylinder">
      <path d="M-28,-28 L-28,28 A28 9 0 0 0 28 28 L28,-28" fill="var(--el-pink)" fillOpacity="0.6" stroke="var(--el-ink)" strokeWidth="1.5" />
      <ellipse cx="0" cy="-28" rx="28" ry="9" fill="var(--el-pink)" stroke="var(--el-ink)" strokeWidth="1.5" />
      <path d="M-28,28 A28 9 0 0 0 28 28" fill="none" stroke="var(--el-ink)" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
    </svg>
  );
}

function Shape3DIcon({ kind }: { kind: Shape3DKind }) {
  switch (kind) {
    case 'cuboid':
      return <CuboidSvg />;
    case 'sphere':
      return <SphereSvg />;
    case 'pyramid':
      return <PyramidSvg />;
    case 'cylinder':
      return <CylinderSvg />;
    case 'cube':
    default:
      return <CubeSvg />;
  }
}

function Shape3DDemonstrate({ spec }: { spec: string }) {
  const kind = parse3D(spec);
  return (
    <div className="el-stack">
      <Shape3DIcon kind={kind} />
      <p className="el-prompt">A {kind}.</p>
    </div>
  );
}

function Shape3DManipulate({ spec, onResult }: { spec: string; onResult?: (r: ElementResult) => void }) {
  const kind = parse3D(spec);
  const options: Shape3DKind[] = ['cube', 'cuboid', 'sphere', 'pyramid', 'cylinder'];
  const [picked, setPicked] = useState<Shape3DKind | null>(null);
  const done = picked !== null;
  const correct = done ? picked === kind : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">Which 3D shape is this?</p>
      <Shape3DIcon kind={kind} />
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className="el-btn"
            disabled={done}
            aria-pressed={picked === o}
            style={picked === o ? { borderColor: 'var(--el-accent)', color: 'var(--el-accent)' } : undefined}
            onClick={() => {
              setPicked(o);
              onResult?.({ text: o, correct: o === kind });
            }}
          >
            {o}
          </button>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it's a ${kind}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* angle                                                               */
/* ------------------------------------------------------------------ */

function AngleSvg({ deg, kind }: { deg: number; kind: AngleKind }) {
  const vx = 30;
  const vy = 100;
  const rayLen = 88;
  const arcR = 28;
  const rad = (-deg * Math.PI) / 180;
  const x2 = vx + rayLen * Math.cos(rad);
  const y2 = vy + rayLen * Math.sin(rad);
  const ax2 = vx + arcR * Math.cos(rad);
  const ay2 = vy + arcR * Math.sin(rad);
  return (
    <svg viewBox="0 0 260 130" width="220" role="img" aria-label={`${kind} angle`}>
      <line x1={vx} y1={vy} x2={vx + rayLen} y2={vy} stroke="var(--el-ink)" strokeWidth="3" strokeLinecap="round" />
      <line x1={vx} y1={vy} x2={x2} y2={y2} stroke="var(--el-ink)" strokeWidth="3" strokeLinecap="round" />
      {kind === 'right' ? (
        <path d={`M${vx + 14} ${vy} L${vx + 14} ${vy - 14} L${vx} ${vy - 14}`} fill="none" stroke="var(--el-orange)" strokeWidth="2.5" />
      ) : (
        <path d={`M${vx + arcR} ${vy} A${arcR} ${arcR} 0 0 0 ${ax2} ${ay2}`} fill="none" stroke="var(--el-orange)" strokeWidth="2.5" />
      )}
    </svg>
  );
}

function AngleDemonstrate({ spec }: { spec: string }) {
  const { kind, deg } = parseAngle(spec);
  const shownDeg = kind === 'right' ? 90 : deg;
  return (
    <div className="el-stack">
      <AngleSvg deg={shownDeg} kind={kind} />
      <p className="el-prompt">
        {Math.round(shownDeg)}° — {kind} angle.
      </p>
    </div>
  );
}

function AngleManipulate({ spec, onResult }: { spec: string; onResult?: (r: ElementResult) => void }) {
  const { kind, deg } = parseAngle(spec);
  const shownDeg = kind === 'right' ? 90 : deg;
  const options: AngleKind[] = ['right', 'acute', 'obtuse'];
  const [picked, setPicked] = useState<AngleKind | null>(null);
  const done = picked !== null;
  const correct = done ? picked === kind : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">Which type of angle is this?</p>
      <AngleSvg deg={shownDeg} kind={kind} />
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className="el-btn"
            disabled={done}
            aria-pressed={picked === o}
            style={picked === o ? { borderColor: 'var(--el-accent)', color: 'var(--el-accent)' } : undefined}
            onClick={() => {
              setPicked(o);
              onResult?.({ text: o, correct: o === kind });
            }}
          >
            {o}
          </button>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it's ${kind}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* symmetry                                                            */
/* ------------------------------------------------------------------ */

function SymmetryShape({ shape }: { shape: SymShape }) {
  if (shape === 'circle') {
    return <circle cx="0" cy="0" r="44" fill="var(--el-accent-soft)" stroke="var(--el-accent)" strokeWidth="3" />;
  }
  if (shape === 'rectangle') {
    return <rect x="-46" y="-28" width="92" height="56" fill="var(--el-accent-soft)" stroke="var(--el-accent)" strokeWidth="3" />;
  }
  const poly = shape === 'triangle' ? POLY_2D.triangle : shape === 'pentagon' ? POLY_2D.pentagon : shape === 'hexagon' ? POLY_2D.hexagon : POLY_2D.square;
  const pts = regularPolygonPoints(poly.sides, 0, 0, 44, poly.startDeg);
  return <polygon points={pointsAttr(pts)} fill="var(--el-accent-soft)" stroke="var(--el-accent)" strokeWidth="3" />;
}

function SymmetryDemonstrate({ spec }: { spec: string }) {
  const shape = parseSymmetryShape(spec);
  return (
    <div className="el-stack">
      <svg viewBox="-60 -60 120 120" width="160" height="160" role="img" aria-label={`${shape} with a line of symmetry`}>
        <SymmetryShape shape={shape} />
        <line x1="0" y1="-58" x2="0" y2="58" stroke="var(--el-purple)" strokeWidth="2.5" strokeDasharray="5 4" />
      </svg>
      <p className="el-prompt">The dashed line is a line of symmetry.</p>
    </div>
  );
}

/** All shapes we draw here are laid out vertically-symmetric about x=0, so
 * the centre candidate is always the correct one — the two side candidates
 * are decoys that don't fall on a real mirror line. */
function SymmetryManipulate({ spec, onResult }: { spec: string; onResult?: (r: ElementResult) => void }) {
  const shape = parseSymmetryShape(spec);
  const candidates = [-34, 0, 34];
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  const correct = done ? picked === 0 : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the true line of symmetry.</p>
      <svg viewBox="-60 -60 120 120" width="160" height="160" role="img" aria-label="tap the line of symmetry">
        <SymmetryShape shape={shape} />
        {candidates.map((x) => (
          <g key={x}>
            <line
              x1={x}
              y1="-58"
              x2={x}
              y2="58"
              stroke={picked === x ? 'var(--el-accent)' : 'var(--el-purple)'}
              strokeWidth={picked === x ? 3.5 : 2}
              strokeDasharray="5 4"
              opacity={done && picked !== x ? 0.35 : 1}
            />
            <rect
              x={x - 8}
              y="-58"
              width="16"
              height="116"
              fill="transparent"
              style={{ cursor: done ? 'default' : 'pointer' }}
              onClick={() => {
                if (done) return;
                setPicked(x);
                onResult?.({ text: String(x), correct: x === 0 });
              }}
            />
          </g>
        ))}
      </svg>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : 'Not quite — the middle line is the true mirror line.'}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* net                                                                 */
/* ------------------------------------------------------------------ */

function CubeNet() {
  const s = 26;
  const squares: [number, number][] = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
  ];
  const originX = -2 * s;
  const originY = -1.5 * s;
  return (
    <>
      {squares.map(([gx, gy], i) => (
        <rect
          key={i}
          x={originX + gx * s}
          y={originY + gy * s}
          width={s}
          height={s}
          fill={i % 2 === 0 ? 'var(--el-blue)' : 'var(--el-accent-soft)'}
          stroke="var(--el-ink)"
          strokeWidth="1.5"
        />
      ))}
    </>
  );
}

function PyramidNet() {
  const hs = 24;
  const flap = 34;
  return (
    <>
      <rect x={-hs} y={-hs} width={hs * 2} height={hs * 2} fill="var(--el-blue)" stroke="var(--el-ink)" strokeWidth="1.5" />
      <polygon points={`${-hs},${-hs} ${hs},${-hs} 0,${-hs - flap}`} fill="var(--el-accent-soft)" stroke="var(--el-ink)" strokeWidth="1.5" />
      <polygon points={`${hs},${-hs} ${hs},${hs} ${hs + flap},0`} fill="var(--el-accent-soft)" stroke="var(--el-ink)" strokeWidth="1.5" />
      <polygon points={`${-hs},${hs} ${hs},${hs} 0,${hs + flap}`} fill="var(--el-accent-soft)" stroke="var(--el-ink)" strokeWidth="1.5" />
      <polygon points={`${-hs},${-hs} ${-hs},${hs} ${-hs - flap},0`} fill="var(--el-accent-soft)" stroke="var(--el-ink)" strokeWidth="1.5" />
    </>
  );
}

function NetDemonstrate({ spec }: { spec: string }) {
  const kind = parseNetKind(spec);
  const faces = netFaceCount(kind);
  return (
    <div className="el-stack">
      <svg viewBox="-70 -70 140 140" width="180" height="180" role="img" aria-label={`net of a ${kind}`}>
        {kind === 'pyramid' ? <PyramidNet /> : <CubeNet />}
      </svg>
      <p className="el-prompt">
        Folds into a {kind} — {faces} faces.
      </p>
    </div>
  );
}

function NetManipulate({ spec, onResult }: { spec: string; onResult?: (r: ElementResult) => void }) {
  const kind = parseNetKind(spec);
  const faces = netFaceCount(kind);
  const options = [3, 4, 5, 6];
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  const correct = done ? picked === faces : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">How many faces will this net fold into?</p>
      <svg viewBox="-70 -70 140 140" width="160" height="160" role="img" aria-label="count the faces">
        {kind === 'pyramid' ? <PyramidNet /> : <CubeNet />}
      </svg>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((n) => (
          <button
            key={n}
            type="button"
            className="el-btn"
            disabled={done}
            aria-pressed={picked === n}
            style={picked === n ? { borderColor: 'var(--el-accent)', color: 'var(--el-accent)' } : undefined}
            onClick={() => {
              setPicked(n);
              onResult?.({ text: String(n), correct: n === faces });
            }}
          >
            {n}
          </button>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it folds into ${faces} faces.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* top-level dispatch                                                  */
/* ------------------------------------------------------------------ */

/**
 * `shape` — the geometry cluster: flat polygons/circles, isometric 3D solids,
 * angles, lines of symmetry, and unfolded nets — one component per `mode`,
 * each with its own demonstrate/manipulate pair.
 *
 * demonstrate: draws the shape named in `spec` for the given `mode`.
 * manipulate: a small one-tap quiz appropriate to the mode (count sides,
 * name the solid, classify the angle, tap the mirror line, count net faces).
 */
export const ShapeElement: React.FC<ElementProps<ShapeEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') {
    switch (el.mode) {
      case '3d':
        return <Shape3DManipulate spec={el.spec} onResult={onResult} />;
      case 'angle':
        return <AngleManipulate spec={el.spec} onResult={onResult} />;
      case 'symmetry':
        return <SymmetryManipulate spec={el.spec} onResult={onResult} />;
      case 'net':
        return <NetManipulate spec={el.spec} onResult={onResult} />;
      case '2d':
      default:
        return <Shape2DManipulate spec={el.spec} onResult={onResult} />;
    }
  }
  switch (el.mode) {
    case '3d':
      return <Shape3DDemonstrate spec={el.spec} />;
    case 'angle':
      return <AngleDemonstrate spec={el.spec} />;
    case 'symmetry':
      return <SymmetryDemonstrate spec={el.spec} />;
    case 'net':
      return <NetDemonstrate spec={el.spec} />;
    case '2d':
    default:
      return <Shape2DDemonstrate spec={el.spec} />;
  }
};

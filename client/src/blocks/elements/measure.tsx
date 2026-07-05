import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, MeasureEl } from '@shared/elements.ts';

/* ------------------------------------------------------------------ */
/* clock                                                               */
/* ------------------------------------------------------------------ */

/** Encoding: `value` (and `target`) is **minutes since 12:00** (0–719).
 * hour = floor(value/60) % 12 (12 shown for 0), minute = value % 60. A
 * single number, wraps cleanly, and the hour hand naturally drifts between
 * hour ticks the way a real clock does. */
function clockAngles(value: number): { hourDeg: number; minDeg: number } {
  const v = ((value % 720) + 720) % 720;
  return { minDeg: (v % 60) * 6, hourDeg: (v / 60) * 30 };
}
function clockLabel(value: number): string {
  const v = ((value % 720) + 720) % 720;
  let h = Math.floor(v / 60) % 12;
  if (h === 0) h = 12;
  const m = Math.round(v % 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

function ClockFace({ value }: { value: number }) {
  const { hourDeg, minDeg } = clockAngles(value);
  const r = 44;
  const hourRad = ((hourDeg - 90) * Math.PI) / 180;
  const minRad = ((minDeg - 90) * Math.PI) / 180;
  return (
    <svg viewBox="-55 -55 110 110" width="150" height="150" role="img" aria-label={`clock showing ${clockLabel(value)}`}>
      <circle cx="0" cy="0" r={r} fill="var(--el-surface)" stroke="var(--el-ink)" strokeWidth="2.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const deg = i * 30;
        const rad = ((deg - 90) * Math.PI) / 180;
        const x1 = (r - 6) * Math.cos(rad);
        const y1 = (r - 6) * Math.sin(rad);
        const x2 = (r - 1) * Math.cos(rad);
        const y2 = (r - 1) * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--el-muted)" strokeWidth={i % 3 === 0 ? 2 : 1} />;
      })}
      <line x1="0" y1="0" x2={26 * Math.cos(hourRad)} y2={26 * Math.sin(hourRad)} stroke="var(--el-ink)" strokeWidth="4" strokeLinecap="round" />
      <line x1="0" y1="0" x2={38 * Math.cos(minRad)} y2={38 * Math.sin(minRad)} stroke="var(--el-blue)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="0" cy="0" r="3" fill="var(--el-ink)" />
    </svg>
  );
}

function ClockManipulate({ el, onResult }: { el: MeasureEl; onResult?: (r: ElementResult) => void }) {
  const target = el.target ?? el.value;
  const [guess, setGuess] = useState(0);
  const [done, setDone] = useState(false);
  const correct = done ? Math.abs(guess - target) <= 1 : undefined;
  function bump(delta: number) {
    if (done) return;
    setGuess((g) => ((g + delta) % 720 + 720) % 720);
  }
  return (
    <div className="el-stack">
      <p className="el-prompt">Set the clock to {clockLabel(target)}.</p>
      <ClockFace value={guess} />
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <button type="button" className="el-btn" disabled={done} onClick={() => bump(-60)}>
          −1h
        </button>
        <button type="button" className="el-btn" disabled={done} onClick={() => bump(-5)}>
          −5m
        </button>
        <button type="button" className="el-btn" disabled={done} onClick={() => bump(-1)}>
          −1m
        </button>
        <span className="el-display" style={{ minWidth: 54, textAlign: 'center', fontWeight: 800 }}>
          {clockLabel(guess)}
        </span>
        <button type="button" className="el-btn" disabled={done} onClick={() => bump(1)}>
          +1m
        </button>
        <button type="button" className="el-btn" disabled={done} onClick={() => bump(5)}>
          +5m
        </button>
        <button type="button" className="el-btn" disabled={done} onClick={() => bump(60)}>
          +1h
        </button>
      </div>
      <button
        type="button"
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: clockLabel(guess), correct: Math.abs(guess - target) <= 1 });
        }}
      >
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be ${clockLabel(target)}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* money — value/target in pence                                      */
/* ------------------------------------------------------------------ */

const COIN_VALUES = [200, 100, 50, 20, 10, 5, 2, 1] as const;

function coinLabel(v: number): string {
  return v >= 100 ? `£${v / 100}` : `${v}p`;
}
function coinMeta(v: number): { size: number; color: string } {
  if (v >= 200) return { size: 30, color: 'var(--el-amber)' };
  if (v >= 100) return { size: 27, color: 'var(--el-amber)' };
  if (v >= 50) return { size: 25, color: 'var(--el-purple)' };
  if (v >= 20) return { size: 21, color: 'var(--el-purple)' };
  if (v >= 10) return { size: 22, color: 'var(--el-blue)' };
  if (v >= 5) return { size: 17, color: 'var(--el-blue)' };
  if (v >= 2) return { size: 20, color: 'var(--el-orange)' };
  return { size: 15, color: 'var(--el-orange)' };
}
function greedyCoins(total: number): number[] {
  let remaining = Math.max(0, Math.round(total));
  const coins: number[] = [];
  for (const c of COIN_VALUES) {
    while (remaining >= c) {
      coins.push(c);
      remaining -= c;
    }
  }
  return coins;
}
function moneyLabel(pence: number): string {
  return pence >= 100 ? `£${(pence / 100).toFixed(2)}` : `${pence}p`;
}

function MoneyDisplay({ pence }: { pence: number }) {
  const coins = greedyCoins(pence);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 220 }}>
      {coins.map((v, i) => {
        const m = coinMeta(v);
        return (
          <div
            key={i}
            style={{
              width: m.size,
              height: m.size,
              borderRadius: '50%',
              background: m.color,
              color: 'var(--el-on-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: m.size * 0.32,
              fontWeight: 800,
              border: '1.5px solid var(--el-ink)',
            }}
          >
            {coinLabel(v)}
          </div>
        );
      })}
    </div>
  );
}

function MoneyManipulate({ el, onResult }: { el: MeasureEl; onResult?: (r: ElementResult) => void }) {
  const target = el.target ?? el.value;
  const [picked, setPicked] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const total = picked.reduce((a, b) => a + b, 0);
  const correct = done ? total === target : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">Tap coins to make {moneyLabel(target)}.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        {COIN_VALUES.map((v) => {
          const m = coinMeta(v);
          return (
            <button
              key={v}
              type="button"
              className="el-btn"
              disabled={done}
              style={{ borderRadius: '50%', width: m.size + 16, height: m.size + 16, padding: 0, background: m.color, color: 'var(--el-on-accent)', fontWeight: 800 }}
              onClick={() => setPicked((p) => [...p, v])}
            >
              {coinLabel(v)}
            </button>
          );
        })}
      </div>
      <p className="el-prompt">Total: {moneyLabel(total)}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" className="el-btn" disabled={done || picked.length === 0} onClick={() => setPicked([])}>
          Clear
        </button>
        <button
          type="button"
          className="el-btn"
          disabled={done}
          onClick={() => {
            setDone(true);
            onResult?.({ text: String(total), correct: total === target });
          }}
        >
          Check
        </button>
      </div>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should total ${moneyLabel(target)}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ruler — value/target in the given unit (default cm), 0..30          */
/* ------------------------------------------------------------------ */

const RULER_MAX = 30;
function rulerX(v: number): number {
  return 16 + (Math.max(0, Math.min(RULER_MAX, v)) / RULER_MAX) * 228;
}

function RulerView({ value }: { value: number }) {
  const x = rulerX(value);
  return (
    <svg viewBox="0 0 260 90" width="240" role="img" aria-label={`ruler showing ${value}`}>
      <rect x="14" y="20" width="232" height="24" rx="3" fill="var(--el-surface-2)" stroke="var(--el-ink)" strokeWidth="1.5" />
      {Array.from({ length: RULER_MAX + 1 }).map((_, i) => {
        const tx = rulerX(i);
        const big = i % 5 === 0;
        return (
          <g key={i}>
            <line x1={tx} y1="20" x2={tx} y2={big ? 32 : 27} stroke="var(--el-ink)" strokeWidth={big ? 1.5 : 1} />
            {big && (
              <text x={tx} y="54" textAnchor="middle" fontSize="8" fill="var(--el-muted)">
                {i}
              </text>
            )}
          </g>
        );
      })}
      <path d={`M${x} 10 L${x - 5} 20 L${x + 5} 20 Z`} fill="var(--el-orange)" />
      <line x1={x} y1="10" x2={x} y2="44" stroke="var(--el-orange)" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function RulerManipulate({ el, onResult }: { el: MeasureEl; onResult?: (r: ElementResult) => void }) {
  const target = el.target ?? el.value;
  const unit = el.unit ?? 'cm';
  const [guess, setGuess] = useState(0);
  const [done, setDone] = useState(false);
  const TOL = 0.5;
  const correct = done ? Math.abs(guess - target) <= TOL : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">
        Move the marker to {target}
        {unit}.
      </p>
      <RulerView value={guess} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.max(0, g - 1))}>
          −1
        </button>
        <span className="el-display" style={{ minWidth: 36, textAlign: 'center', fontWeight: 800 }}>
          {guess}
        </span>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.min(RULER_MAX, g + 1))}>
          +1
        </button>
      </div>
      <button
        type="button"
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: String(guess), correct: Math.abs(guess - target) <= TOL });
        }}
      >
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct
            ? '✓ Correct!'
            : `Not quite — it should be ${target}${unit}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* scale — a dial gauge, 0..max (max auto-fit around value/target)     */
/* ------------------------------------------------------------------ */

function scaleMax(...vals: number[]): number {
  const m = Math.max(10, ...vals);
  return Math.ceil(m / 5) * 5;
}

function ScaleGauge({ value, max }: { value: number; max: number }) {
  const cx = 0;
  const cy = 40;
  const r = 42;
  const clamped = Math.max(0, Math.min(max, value));
  const angleDeg = 180 - (clamped / max) * 180;
  const rad = (angleDeg * Math.PI) / 180;
  const nx = cx + r * 0.82 * Math.cos(rad);
  const ny = cy - r * 0.82 * Math.sin(rad);
  const ticks = 5;
  return (
    <svg viewBox="-55 -10 110 70" width="150" role="img" aria-label={`scale showing ${value}`}>
      <path d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--el-ink)" strokeWidth="2.5" />
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const a = 180 - (i / ticks) * 180;
        const rr = (a * Math.PI) / 180;
        const x1 = cx + (r - 6) * Math.cos(rr);
        const y1 = cy - (r - 6) * Math.sin(rr);
        const x2 = cx + r * Math.cos(rr);
        const y2 = cy - r * Math.sin(rr);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--el-muted)" strokeWidth="1.5" />;
      })}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--el-red)" strokeWidth="3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill="var(--el-ink)" />
    </svg>
  );
}

function ScaleManipulate({ el, onResult }: { el: MeasureEl; onResult?: (r: ElementResult) => void }) {
  const target = el.target ?? el.value;
  const unit = el.unit ?? 'kg';
  const max = scaleMax(el.value, target);
  const step = Math.max(1, Math.round(max / 20));
  const [guess, setGuess] = useState(0);
  const [done, setDone] = useState(false);
  const TOL = step / 2;
  const correct = done ? Math.abs(guess - target) <= TOL : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">
        Move the needle to {target}
        {unit}.
      </p>
      <ScaleGauge value={guess} max={max} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.max(0, g - step))}>
          −
        </button>
        <span className="el-display" style={{ minWidth: 36, textAlign: 'center', fontWeight: 800 }}>
          {guess}
        </span>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.min(max, g + step))}>
          +
        </button>
      </div>
      <button
        type="button"
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: String(guess), correct: Math.abs(guess - target) <= TOL });
        }}
      >
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be ${target}${unit}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* jug — a measuring jug, 0..max ml (max auto-fit)                     */
/* ------------------------------------------------------------------ */

function jugMax(...vals: number[]): number {
  const m = Math.max(100, ...vals);
  return Math.ceil(m / 100) * 100;
}

function JugView({ value, max }: { value: number; max: number }) {
  const jugH = 90;
  const jugW = 60;
  const jugX = -30;
  const jugY = -10;
  const fillFrac = Math.max(0, Math.min(1, value / max));
  const liquidH = fillFrac * jugH;
  return (
    <svg viewBox="-45 -20 90 120" width="120" role="img" aria-label={`jug showing ${value}`}>
      <path d={`M${jugX + jugW},${jugY + 10} q18,0 18,20 q0,20 -18,20`} fill="none" stroke="var(--el-ink)" strokeWidth="2" />
      <rect x={jugX} y={jugY} width={jugW} height={jugH} rx="6" fill="none" stroke="var(--el-ink)" strokeWidth="2.5" />
      <rect x={jugX + 1} y={jugY + jugH - liquidH + 1} width={jugW - 2} height={Math.max(0, liquidH - 2)} fill="var(--el-blue)" opacity="0.75" />
      {Array.from({ length: 4 }).map((_, i) => {
        const ly = jugY + jugH - ((i + 1) * jugH) / 4;
        return <line key={i} x1={jugX - 4} y1={ly} x2={jugX} y2={ly} stroke="var(--el-muted)" strokeWidth="1.5" />;
      })}
    </svg>
  );
}

function JugManipulate({ el, onResult }: { el: MeasureEl; onResult?: (r: ElementResult) => void }) {
  const target = el.target ?? el.value;
  const unit = el.unit ?? 'ml';
  const max = jugMax(el.value, target);
  const step = 50;
  const [guess, setGuess] = useState(0);
  const [done, setDone] = useState(false);
  const TOL = 25;
  const correct = done ? Math.abs(guess - target) <= TOL : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">
        Fill the jug to {target}
        {unit}.
      </p>
      <JugView value={guess} max={max} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.max(0, g - step))}>
          −{step}
        </button>
        <span className="el-display" style={{ minWidth: 44, textAlign: 'center', fontWeight: 800 }}>
          {guess}
        </span>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.min(max, g + step))}>
          +{step}
        </button>
      </div>
      <button
        type="button"
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: String(guess), correct: Math.abs(guess - target) <= TOL });
        }}
      >
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be ${target}${unit}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* thermo — a thermometer, auto-fit range around value/target          */
/* ------------------------------------------------------------------ */

function thermoRange(...vals: number[]): { min: number; max: number } {
  const lo = Math.min(-10, ...vals);
  const hi = Math.max(40, ...vals);
  return { min: Math.floor(lo / 10) * 10, max: Math.ceil(hi / 10) * 10 };
}

function ThermoView({ value, min, max }: { value: number; min: number; max: number }) {
  const tubeH = 90;
  const tubeY = -20;
  const bulbCy = tubeY + tubeH + 10;
  const frac = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const mercuryH = frac * tubeH;
  return (
    <svg viewBox="-30 -35 60 150" width="90" role="img" aria-label={`thermometer showing ${value}`}>
      <line x1="0" y1={tubeY} x2="0" y2={tubeY + tubeH} stroke="var(--el-line)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="0" cy={bulbCy} r="12" fill="var(--el-surface-2)" stroke="var(--el-line)" strokeWidth="2" />
      <line x1="0" y1={tubeY + tubeH - mercuryH} x2="0" y2={tubeY + tubeH} stroke="var(--el-red)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="0" cy={bulbCy} r="9" fill="var(--el-red)" />
      {Array.from({ length: 6 }).map((_, i) => {
        const ty = tubeY + (i / 5) * tubeH;
        return <line key={i} x1="7" y1={ty} x2="12" y2={ty} stroke="var(--el-muted)" strokeWidth="1.5" />;
      })}
    </svg>
  );
}

function ThermoManipulate({ el, onResult }: { el: MeasureEl; onResult?: (r: ElementResult) => void }) {
  const target = el.target ?? el.value;
  const unit = el.unit ?? '°C';
  const { min, max } = thermoRange(el.value, target);
  const [guess, setGuess] = useState(0);
  const [done, setDone] = useState(false);
  const TOL = 1;
  const correct = done ? Math.abs(guess - target) <= TOL : undefined;
  return (
    <div className="el-stack">
      <p className="el-prompt">
        Set the temperature to {target}
        {unit}.
      </p>
      <ThermoView value={guess} min={min} max={max} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.max(min, g - 1))}>
          −1
        </button>
        <span className="el-display" style={{ minWidth: 36, textAlign: 'center', fontWeight: 800 }}>
          {guess}
        </span>
        <button type="button" className="el-btn" disabled={done} onClick={() => setGuess((g) => Math.min(max, g + 1))}>
          +1
        </button>
      </div>
      <button
        type="button"
        className="el-btn"
        disabled={done}
        onClick={() => {
          setDone(true);
          onResult?.({ text: String(guess), correct: Math.abs(guess - target) <= TOL });
        }}
      >
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — it should be ${target}${unit}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* top-level dispatch                                                  */
/* ------------------------------------------------------------------ */

function MeasureDemonstrate({ el }: { el: MeasureEl }) {
  switch (el.mode) {
    case 'money':
      return (
        <div className="el-stack">
          <MoneyDisplay pence={el.value} />
          <p className="el-prompt">= {moneyLabel(el.value)}</p>
        </div>
      );
    case 'ruler':
      return (
        <div className="el-stack">
          <RulerView value={el.value} />
          <p className="el-prompt">
            {el.value}
            {el.unit ?? 'cm'}
          </p>
        </div>
      );
    case 'scale': {
      const max = scaleMax(el.value, el.target ?? 0);
      return (
        <div className="el-stack">
          <ScaleGauge value={el.value} max={max} />
          <p className="el-prompt">
            {el.value}
            {el.unit ?? 'kg'}
          </p>
        </div>
      );
    }
    case 'jug': {
      const max = jugMax(el.value, el.target ?? 0);
      return (
        <div className="el-stack">
          <JugView value={el.value} max={max} />
          <p className="el-prompt">
            {el.value}
            {el.unit ?? 'ml'}
          </p>
        </div>
      );
    }
    case 'thermo': {
      const { min, max } = thermoRange(el.value, el.target ?? 0);
      return (
        <div className="el-stack">
          <ThermoView value={el.value} min={min} max={max} />
          <p className="el-prompt">
            {el.value}
            {el.unit ?? '°C'}
          </p>
        </div>
      );
    }
    case 'clock':
    default:
      return (
        <div className="el-stack">
          <ClockFace value={el.value} />
          <p className="el-prompt">{clockLabel(el.value)}</p>
        </div>
      );
  }
}

function MeasureManipulate({ el, onResult }: { el: MeasureEl; onResult?: (r: ElementResult) => void }) {
  switch (el.mode) {
    case 'money':
      return <MoneyManipulate el={el} onResult={onResult} />;
    case 'ruler':
      return <RulerManipulate el={el} onResult={onResult} />;
    case 'scale':
      return <ScaleManipulate el={el} onResult={onResult} />;
    case 'jug':
      return <JugManipulate el={el} onResult={onResult} />;
    case 'thermo':
      return <ThermoManipulate el={el} onResult={onResult} />;
    case 'clock':
    default:
      return <ClockManipulate el={el} onResult={onResult} />;
  }
}

/**
 * `measure` — six real-world measuring instruments, one component per
 * `mode`: `clock` (analog hands — value is minutes-since-12:00, see
 * `clockAngles`), `money` (coins summing to `value` pence), `ruler`
 * (0–30 marker), `scale` (dial gauge, range auto-fit), `jug` (liquid fill,
 * range auto-fit), `thermo` (mercury column, range auto-fit).
 *
 * demonstrate: renders the instrument at `value`.
 * manipulate: the child steps the instrument (buttons — coins are tapped)
 * towards `target`; Check compares within a small mode-appropriate
 * tolerance (documented per mode) since these are physical-reading tasks,
 * not exact-typing ones.
 */
export const MeasureElement: React.FC<ElementProps<MeasureEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <MeasureManipulate el={el} onResult={onResult} />;
  return <MeasureDemonstrate el={el} />;
};

import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, MusicEl } from '@shared/elements.ts';

/* ------------------------------------------------------------------ */
/* note-name parsing — shared by staff + keyboard modes                */
/* ------------------------------------------------------------------ */

const SOLFEGE: Record<string, string> = {
  do: 'C',
  re: 'D',
  mi: 'E',
  fa: 'F',
  sol: 'G',
  so: 'G',
  la: 'A',
  ti: 'B',
  si: 'B',
};

/**
 * Parses one whitespace/comma-separated token from `spec` into a note name:
 * a single letter A-G, optionally with a trailing `#` for sharps. Accepts
 * either letter names ("C", "F#") or solfège syllables ("do", "re", "mi",
 * "fa", "sol"/"so", "la", "ti"/"si"), case-insensitively. Octave digits
 * (e.g. "C4") are accepted but stripped before matching — every note lands
 * in a single reference octave, since this is a beginner's first look at
 * pitch/keys, not full clef-reading practice. Unrecognised tokens drop out.
 */
function parseNoteToken(tok: string): string {
  const t = tok.trim();
  if (!t) return '';
  const lower = t.toLowerCase().replace(/[0-9]/g, '');
  const solfege = SOLFEGE[lower];
  if (solfege) return solfege;
  const letter = t[0]?.toUpperCase();
  if (!letter || !'ABCDEFG'.includes(letter)) return '';
  return letter + (t.includes('#') ? '#' : '');
}

function parseNotes(spec: string): string[] {
  return spec
    .split(/[\s,]+/)
    .map(parseNoteToken)
    .filter((n): n is string => n.length > 0);
}

/* ------------------------------------------------------------------ */
/* staff mode                                                          */
/* ------------------------------------------------------------------ */

const STAFF_TOP = 40;
const STAFF_GAP = 12;
const STAFF_LINES = [0, 1, 2, 3, 4].map((i) => STAFF_TOP + i * STAFF_GAP); // 40..88, bottom line = 88

/** Treble-clef-accurate y positions for one octave (C4 ledger .. B4 line3). */
const NOTE_Y: Record<string, number> = { C: 100, D: 94, E: 88, F: 82, G: 76, A: 70, B: 64 };
function noteY(note: string): number {
  const letter = note[0] ?? 'C';
  return NOTE_Y[letter] ?? 88;
}

function StaffLines() {
  return (
    <>
      {STAFF_LINES.map((y) => (
        <line key={y} x1={26} y1={y} x2={234} y2={y} stroke="var(--el-line)" strokeWidth="1.5" />
      ))}
    </>
  );
}

function NoteHead({ x, y, color }: { x: number; y: number; color: string }) {
  const bottomLine = STAFF_LINES[STAFF_LINES.length - 1] ?? 88;
  return (
    <g>
      {y > bottomLine && <line x1={x - 9} y1={y} x2={x + 9} y2={y} stroke="var(--el-muted)" strokeWidth="1.5" />}
      <ellipse cx={x} cy={y} rx="6" ry="4.5" fill={color} transform={`rotate(-18 ${x} ${y})`} />
      <line x1={x + 5.5} y1={y} x2={x + 5.5} y2={y - 26} stroke={color} strokeWidth="1.5" />
    </g>
  );
}

function StaffDemonstrate({ spec }: { spec: string }) {
  const notes = parseNotes(spec);
  const startX = notes.length > 1 ? 44 : 130;
  const stepX = notes.length > 1 ? Math.min(26, 190 / (notes.length - 1)) : 0;
  return (
    <div className="el-stack">
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label={`staff showing notes ${notes.join(' ')}`}>
        <StaffLines />
        {notes.map((n, i) => (
          <NoteHead key={i} x={startX + i * stepX} y={noteY(n)} color="var(--el-blue)" />
        ))}
      </svg>
      <p className="el-prompt">{notes.length > 0 ? notes.join(' – ') : spec}</p>
    </div>
  );
}

const STAFF_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

/** Tappable staff rows: the 7 naturals plus a row for every SHARP that
 * actually appears in the parsed `spec` (drawn at its natural's y, offset
 * slightly and marked with ♯), so a sharp target (e.g. "F#") is reachable —
 * not just the 7 natural rows. */
function tappableStaffNotes(notes: string[]): string[] {
  const sharps = Array.from(new Set(notes.filter((n) => n.includes('#'))));
  return [...STAFF_LETTERS, ...sharps];
}

function StaffManipulate({ el, onResult }: { el: MusicEl; onResult?: (r: ElementResult) => void }) {
  const notes = parseNotes(el.spec);
  const target = notes[0] ?? 'C';
  const tappable = tappableStaffNotes(notes);
  const [picked, setPicked] = useState<string | null>(null);
  const done = picked !== null;
  const correct = done ? picked === target : undefined;
  const bottomLine = STAFF_LINES[STAFF_LINES.length - 1] ?? 88;

  function tap(note: string) {
    if (done) return;
    setPicked(note);
    onResult?.({ text: note, correct: note === target });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">
        Tap where the note <strong>{target}</strong> goes on the staff.
      </p>
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label="staff, tap a note position">
        <StaffLines />
        {tappable.map((n) => {
          const isSharp = n.includes('#');
          const y = noteY(n) - (isSharp ? 4 : 0);
          return (
            <g key={n} onClick={() => tap(n)} style={{ cursor: done ? 'default' : 'pointer' }}>
              {/* `pointerEvents: 'all'` is required here: a `fill="transparent"` shape
                  is NOT hit-tested under the default `pointer-events: visiblePainted`,
                  so untapped rows would silently swallow no clicks at all. */}
              <rect
                x={26}
                y={y - 6}
                width={208}
                height={12}
                fill={picked === n ? 'var(--el-accent-soft)' : 'transparent'}
                style={{ pointerEvents: 'all' }}
              />
              {isSharp && (
                <text x={214} y={y + 4} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--el-muted)">
                  ♯
                </text>
              )}
              {!isSharp && y > bottomLine && <line x1={122} y1={y} x2={138} y2={y} stroke="var(--el-muted)" strokeWidth="1.5" />}
            </g>
          );
        })}
      </svg>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — try again next time for ${target}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* rhythm mode                                                         */
/* ------------------------------------------------------------------ */

/**
 * Splits `spec` into beat tokens ("ta ta ti-ti ta") and counts each token's
 * hyphen-joined syllables as sub-beat "units": "ta" -> 1 unit (one beat),
 * "ti-ti" -> 2 units (one beat split into two quick sounds). This is a
 * simplified Kodály-style reading, not full note-duration notation.
 */
function parseRhythmUnits(spec: string): number[] {
  return spec
    .split(/[\s,]+/)
    .map((tok) => tok.trim())
    .filter(Boolean)
    .map((tok) => Math.max(1, tok.split('-').filter(Boolean).length));
}

function RhythmDemonstrate({ spec }: { spec: string }) {
  const tokens = spec.split(/[\s,]+/).filter(Boolean);
  const units = parseRhythmUnits(spec);
  const boxW = 34;
  const gap = 8;
  const totalW = units.length * boxW + Math.max(0, units.length - 1) * gap;
  const startX = (260 - totalW) / 2;
  return (
    <div className="el-stack">
      <svg viewBox="0 0 260 90" width="240" role="img" aria-label={`rhythm pattern ${tokens.join(' ')}`}>
        {units.map((u, i) => {
          const x = startX + i * (boxW + gap);
          return (
            <g key={i}>
              <rect x={x} y={20} width={boxW} height={40} rx="6" fill="var(--el-surface-2)" stroke="var(--el-blue)" strokeWidth="2" />
              {Array.from({ length: Math.max(0, u - 1) }).map((_, di) => (
                <line
                  key={di}
                  x1={x + (boxW / u) * (di + 1)}
                  y1={22}
                  x2={x + (boxW / u) * (di + 1)}
                  y2={58}
                  stroke="var(--el-blue)"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              ))}
              <text x={x + boxW / 2} y={75} textAnchor="middle" fontSize="10" fill="var(--el-muted)">
                {tokens[i] ?? ''}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Manipulate: the beat boxes (grouped exactly like the demonstrate view,
 * with a divider per sub-beat) become tap targets. The child taps them in
 * time, left to right; each tap disables that cell. There is no real audio
 * timing here (the task explicitly doesn't require it) — "compare
 * count/pattern" is implemented as: once every cell has been tapped
 * (count matches), we check whether the tap ORDER exactly matches the
 * left-to-right beat order (pattern matches), i.e. `order[idx] === idx`
 * for every cell.
 */
function RhythmManipulate({ el, onResult }: { el: MusicEl; onResult?: (r: ElementResult) => void }) {
  const units = parseRhythmUnits(el.spec);
  const total = units.reduce((a, b) => a + b, 0);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [order, setOrder] = useState<number[]>([]);
  const done = total > 0 && order.length === total;
  const allCorrect = done && order.every((idx, pos) => idx === pos);

  function tap(idx: number) {
    if (done || tapped.has(idx)) return;
    const nextOrder = [...order, idx];
    setTapped((prev) => new Set(prev).add(idx));
    setOrder(nextOrder);
    if (nextOrder.length === total) {
      const correct = nextOrder.every((v, pos) => v === pos);
      onResult?.({ text: nextOrder.join(','), correct });
    }
  }

  let idxCounter = 0;

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the beats in order, left to right.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {units.map((u, ti) => (
          <div key={ti} style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: u }).map((_, si) => {
              const idx = idxCounter++;
              const isTapped = tapped.has(idx);
              const isNext = !done && idx === order.length;
              const isRight = done && order[idx] === idx;
              return (
                <button
                  key={si}
                  type="button"
                  className="el-btn"
                  disabled={done || isTapped}
                  onClick={() => tap(idx)}
                  style={{
                    width: u > 1 ? 22 : 34,
                    height: 34,
                    padding: 0,
                    background: isTapped ? 'var(--el-accent-soft)' : 'var(--el-surface)',
                    borderColor: done ? (isRight ? 'var(--el-green)' : 'var(--el-red)') : isNext ? 'var(--el-accent)' : 'var(--el-line)',
                    borderWidth: 2,
                  }}
                >
                  {isTapped ? '●' : ''}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {done && (
        <p className="el-prompt" style={{ color: allCorrect ? 'var(--el-green)' : 'var(--el-red)' }}>
          {allCorrect ? '✓ Great rhythm!' : 'Not quite in order — try tapping left to right next time.'}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* keyboard mode                                                       */
/* ------------------------------------------------------------------ */

const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_AFTER = ['C', 'D', 'F', 'G', 'A']; // black key sits between this white key and the next

interface KeyRect {
  note: string;
  x: number;
  y: number;
  w: number;
  h: number;
  black: boolean;
}

function keyboardLayout(): KeyRect[] {
  const WKW = 30;
  const WKH = 90;
  const startX = 20;
  const topY = 10;
  const keys: KeyRect[] = WHITE_KEYS.map((k, i) => ({ note: k, x: startX + i * WKW, y: topY, w: WKW - 1, h: WKH, black: false }));
  for (const after of BLACK_AFTER) {
    const wi = WHITE_KEYS.indexOf(after);
    keys.push({ note: `${after}#`, x: startX + (wi + 1) * WKW - 8, y: topY, w: 16, h: 56, black: true });
  }
  return keys;
}

function KeyboardDemonstrate({ spec }: { spec: string }) {
  const notes = parseNotes(spec);
  const keys = keyboardLayout();
  return (
    <div className="el-stack">
      <svg viewBox="0 0 260 132" width="240" role="img" aria-label={`keyboard highlighting ${notes.join(' ')}`}>
        {keys
          .filter((k) => !k.black)
          .map((k) => (
            <g key={k.note}>
              <rect
                x={k.x}
                y={k.y}
                width={k.w}
                height={k.h}
                rx="4"
                fill={notes.includes(k.note) ? 'var(--el-accent-soft)' : 'var(--el-surface)'}
                stroke={notes.includes(k.note) ? 'var(--el-accent)' : 'var(--el-ink)'}
                strokeWidth={notes.includes(k.note) ? 2.5 : 1.5}
              />
              <text x={k.x + k.w / 2} y={k.y + k.h + 12} textAnchor="middle" fontSize="9" fill="var(--el-muted)">
                {k.note}
              </text>
            </g>
          ))}
        {keys
          .filter((k) => k.black)
          .map((k) => (
            <rect key={k.note} x={k.x} y={k.y} width={k.w} height={k.h} rx="3" fill={notes.includes(k.note) ? 'var(--el-accent)' : 'var(--el-ink)'} />
          ))}
      </svg>
      <p className="el-prompt">{notes.length > 0 ? notes.join(' – ') : spec}</p>
    </div>
  );
}

function KeyboardManipulate({ el, onResult }: { el: MusicEl; onResult?: (r: ElementResult) => void }) {
  const target = parseNotes(el.spec);
  const targetSet = new Set(target);
  const keys = keyboardLayout();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);
  const correct = done ? selected.size === targetSet.size && [...selected].every((n) => targetSet.has(n)) : undefined;

  function toggle(note: string) {
    if (done) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(note)) next.delete(note);
      else next.add(note);
      return next;
    });
  }

  function keyColor(k: KeyRect): { fill: string; stroke: string } {
    const isSel = selected.has(k.note);
    if (!done) {
      if (k.black) return { fill: isSel ? 'var(--el-accent)' : 'var(--el-ink)', stroke: 'var(--el-ink)' };
      return { fill: isSel ? 'var(--el-accent-soft)' : 'var(--el-surface)', stroke: isSel ? 'var(--el-accent)' : 'var(--el-ink)' };
    }
    const shouldHave = targetSet.has(k.note);
    const tone = shouldHave === isSel ? 'var(--el-green)' : 'var(--el-red)';
    if (k.black) return { fill: isSel ? tone : 'var(--el-ink)', stroke: tone };
    return { fill: isSel ? 'var(--el-accent-soft)' : 'var(--el-surface)', stroke: tone };
  }

  function check() {
    if (done) return;
    setDone(true);
    onResult?.({
      text: [...selected].join(' '),
      correct: selected.size === targetSet.size && [...selected].every((n) => targetSet.has(n)),
    });
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">Tap the key{target.length > 1 ? 's' : ''}: {target.join(', ') || '—'}</p>
      <svg viewBox="0 0 260 132" width="240" role="img" aria-label="tap the named keys">
        {keys
          .filter((k) => !k.black)
          .map((k) => {
            const c = keyColor(k);
            return (
              <g key={k.note} onClick={() => toggle(k.note)} style={{ cursor: done ? 'default' : 'pointer' }}>
                <rect x={k.x} y={k.y} width={k.w} height={k.h} rx="4" fill={c.fill} stroke={c.stroke} strokeWidth="2.5" />
                <text x={k.x + k.w / 2} y={k.y + k.h + 12} textAnchor="middle" fontSize="9" fill="var(--el-muted)">
                  {k.note}
                </text>
              </g>
            );
          })}
        {keys
          .filter((k) => k.black)
          .map((k) => {
            const c = keyColor(k);
            return (
              <rect
                key={k.note}
                onClick={() => toggle(k.note)}
                style={{ cursor: done ? 'default' : 'pointer' }}
                x={k.x}
                y={k.y}
                width={k.w}
                height={k.h}
                rx="3"
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth="1.5"
              />
            );
          })}
      </svg>
      <button type="button" className="el-btn" disabled={done || selected.size === 0} onClick={check}>
        Check
      </button>
      {done && (
        <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
          {correct ? '✓ Correct!' : `Not quite — the key${target.length > 1 ? 's were' : ' was'} ${target.join(', ')}.`}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* top-level dispatch                                                  */
/* ------------------------------------------------------------------ */

/**
 * `music` — one component per `mode`, all reading note names out of the
 * free-text `spec` via `parseNotes`/`parseRhythmUnits` (see their doc
 * comments for the exact parsing rules):
 * - `staff`: 5 lines + note heads at treble-clef-accurate y positions for
 *   one reference octave.
 * - `rhythm`: a row of beat boxes, sub-divided per hyphenated syllable
 *   group (e.g. "ti-ti" -> a box split in two).
 * - `keyboard`: one octave (7 white + 5 black keys), keys named in `spec`
 *   highlighted.
 *
 * demonstrate renders the notation/keys as authored. manipulate: `staff`
 * asks the child to tap the staff position of the spec's first note;
 * `keyboard` asks the child to tap every key named in `spec` then Check
 * (graded as a set, order-independent); `rhythm` asks the child to tap the
 * beat cells in left-to-right order (graded by tap-order equality — see
 * `RhythmManipulate` doc). No audio is played; taps get instant visual
 * feedback instead, per the task brief.
 */
export const MusicElement: React.FC<ElementProps<MusicEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') {
    if (el.mode === 'rhythm') return <RhythmManipulate el={el} onResult={onResult} />;
    if (el.mode === 'keyboard') return <KeyboardManipulate el={el} onResult={onResult} />;
    return <StaffManipulate el={el} onResult={onResult} />;
  }
  if (el.mode === 'rhythm') return <RhythmDemonstrate spec={el.spec} />;
  if (el.mode === 'keyboard') return <KeyboardDemonstrate spec={el.spec} />;
  return <StaffDemonstrate spec={el.spec} />;
};

/**
 * The on-screen teacher — a fully hand-authored SVG character rig (no external
 * assets, fully open). It's driven by:
 *   - `emotion`   : sets brows / eyes / mouth shape
 *   - `mouthOpen` : 0..1 viseme level for lip-sync while speaking
 *   - `speaking`  : enables the talking mouth
 * Three characters (sage / nova / pip) differ by palette and a small accessory.
 * Blinking and a gentle idle bob are built in.
 */
import { useEffect, useState } from 'react';
import type { Emotion } from '@shared/types';

interface Props {
  character: 'sage' | 'nova' | 'pip';
  hue: number;
  emotion: Emotion;
  mouthOpen: number; // 0..1
  speaking: boolean;
}

type Brow = { y: number; angle: number };
const BROW: Record<Emotion, Brow> = {
  neutral: { y: 0, angle: 0 },
  happy: { y: -3, angle: 0 },
  encouraging: { y: -2, angle: -6 },
  celebrating: { y: -5, angle: 0 },
  thinking: { y: 2, angle: 12 },
  curious: { y: -4, angle: -12 },
  gentle: { y: -1, angle: -3 }
};

// closed-mouth smile amount (0 flat .. 1 big grin) per emotion
const SMILE: Record<Emotion, number> = {
  neutral: 0.35,
  happy: 0.8,
  encouraging: 0.7,
  celebrating: 1,
  thinking: 0.1,
  curious: 0.25,
  gentle: 0.55
};

export function Character({ character, hue, emotion, mouthOpen, speaking }: Props) {
  const [blink, setBlink] = useState(false);
  const [lookUp, setLookUp] = useState(false);

  useEffect(() => {
    let alive = true;
    const loop = () => {
      if (!alive) return;
      setBlink(true);
      setTimeout(() => alive && setBlink(false), 130);
      const next = 2200 + Math.random() * 3200;
      timer = window.setTimeout(loop, next);
    };
    let timer = window.setTimeout(loop, 2000);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  // "thinking" makes the eyes glance up
  useEffect(() => {
    setLookUp(emotion === 'thinking' || emotion === 'curious');
  }, [emotion]);

  const face = `hsl(${hue} 70% 88%)`;
  const faceEdge = `hsl(${hue} 55% 72%)`;
  const ink = `hsl(${hue} 45% 26%)`;
  const cheek = `hsl(${(hue + 20) % 360} 80% 80%)`;
  const accent = `hsl(${hue} 75% 52%)`;

  const brow = BROW[emotion];
  const smile = SMILE[emotion];
  const open = speaking ? Math.max(0, Math.min(1, mouthOpen)) : 0;

  // Mouth: blend between a smile arc (closed) and an open ellipse (talking).
  const mouthCx = 100;
  const mouthCy = 126;
  const openRy = 4 + open * 16;
  const openRx = 13 + open * 5;
  const smilePath = `M ${mouthCx - 20} ${mouthCy} Q ${mouthCx} ${mouthCy + 6 + smile * 18} ${mouthCx + 20} ${mouthCy}`;

  const eyeY = 96 + (lookUp ? -3 : 0);
  const pupilDX = lookUp ? 0 : 0;
  const pupilDY = lookUp ? -3 : 0;

  return (
    <div className="avatar-wrap" style={{ animation: 'bob 4.5s ease-in-out infinite' }}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-label={`tutor feeling ${emotion}`}>
        {/* celebrate sparkles */}
        {emotion === 'celebrating' && (
          <g fill={accent}>
            <circle cx="34" cy="44" r="3" />
            <circle cx="168" cy="58" r="4" />
            <circle cx="150" cy="30" r="2.5" />
            <circle cx="44" cy="92" r="2.5" />
          </g>
        )}

        {/* character-specific accessory behind head */}
        {character === 'nova' && (
          <g stroke={accent} strokeWidth="3" fill="none">
            <line x1="100" y1="30" x2="100" y2="14" />
            <circle cx="100" cy="11" r="5" fill={accent} stroke="none" />
          </g>
        )}

        {/* head */}
        <circle cx="100" cy="104" r="68" fill={face} stroke={faceEdge} strokeWidth="3" />
        {character === 'pip' && <circle cx="100" cy="104" r="68" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 8" />}

        {/* ears / side bits */}
        <circle cx="34" cy="104" r="12" fill={face} stroke={faceEdge} strokeWidth="3" />
        <circle cx="166" cy="104" r="12" fill={face} stroke={faceEdge} strokeWidth="3" />

        {/* cheeks */}
        <circle cx="66" cy="120" r="9" fill={cheek} opacity="0.6" />
        <circle cx="134" cy="120" r="9" fill={cheek} opacity="0.6" />

        {/* brows */}
        <g stroke={ink} strokeWidth="4" strokeLinecap="round">
          <line
            x1="64" y1={80 + brow.y} x2="88" y2={80 + brow.y}
            transform={`rotate(${brow.angle} 76 ${80 + brow.y})`}
          />
          <line
            x1="112" y1={80 + brow.y} x2="136" y2={80 + brow.y}
            transform={`rotate(${-brow.angle} 124 ${80 + brow.y})`}
          />
        </g>

        {/* eyes */}
        <g>
          <ellipse cx="76" cy={eyeY} rx="11" ry={blink ? 1.4 : 12} fill="#fff" stroke={faceEdge} strokeWidth="2" />
          <ellipse cx="124" cy={eyeY} rx="11" ry={blink ? 1.4 : 12} fill="#fff" stroke={faceEdge} strokeWidth="2" />
          {!blink && (
            <>
              <circle cx={76 + pupilDX} cy={eyeY + pupilDY} r="5" fill={ink} />
              <circle cx={124 + pupilDX} cy={eyeY + pupilDY} r="5" fill={ink} />
              <circle cx={78 + pupilDX} cy={eyeY - 2 + pupilDY} r="1.6" fill="#fff" />
              <circle cx={126 + pupilDX} cy={eyeY - 2 + pupilDY} r="1.6" fill="#fff" />
            </>
          )}
          {/* sage wears glasses */}
          {character === 'sage' && (
            <g stroke={ink} strokeWidth="2.5" fill="none">
              <circle cx="76" cy={eyeY} r="16" />
              <circle cx="124" cy={eyeY} r="16" />
              <line x1="92" y1={eyeY} x2="108" y2={eyeY} />
            </g>
          )}
        </g>

        {/* mouth */}
        {open > 0.06 ? (
          <ellipse cx={mouthCx} cy={mouthCy + 2} rx={openRx} ry={openRy} fill={ink} />
        ) : (
          <path d={smilePath} fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        )}
        {open > 0.2 && <ellipse cx={mouthCx} cy={mouthCy + openRy * 0.4} rx={openRx * 0.5} ry={openRy * 0.4} fill={cheek} opacity="0.7" />}
      </svg>
    </div>
  );
}

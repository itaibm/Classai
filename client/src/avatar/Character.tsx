/**
 * Character 2.0 — a fully hand-authored, expressive SVG tutor (no external
 * assets, fully open). Driven by:
 *   - `emotion`   : sets brows, eyes, mouth shape, head tilt, and a body gesture
 *   - `mouthOpen` : 0..1 amplitude → viseme mouth shapes for lip-sync
 *   - `speaking`  : enables the talking mouth
 *
 * Extras that make it feel alive: arm gestures (wave, arms-up celebration,
 * hand-to-chin thinking), eye saccades + blinking, springy transitions between
 * emotions, and a gentle idle bob/breathe.
 */
import { useEffect, useRef, useState } from 'react';
import type { Emotion } from '@shared/types';

interface Props {
  character: 'sage' | 'nova' | 'pip';
  hue: number;
  emotion: Emotion;
  mouthOpen: number;
  speaking: boolean;
}

type Pose = {
  brow: { y: number; angle: number };
  smile: number; // closed-mouth curve, -0.3 (frown) .. 1 (grin)
  headTilt: number; // degrees
  lean: number; // px forward
  gesture: 'rest' | 'wave' | 'cheer' | 'think' | 'present';
};

const POSE: Record<Emotion, Pose> = {
  neutral: { brow: { y: 0, angle: 0 }, smile: 0.35, headTilt: 0, lean: 0, gesture: 'rest' },
  happy: { brow: { y: -3, angle: 0 }, smile: 0.85, headTilt: -2, lean: 0, gesture: 'wave' },
  encouraging: { brow: { y: -2, angle: -6 }, smile: 0.7, headTilt: -3, lean: 2, gesture: 'present' },
  celebrating: { brow: { y: -5, angle: 0 }, smile: 1, headTilt: 0, lean: 0, gesture: 'cheer' },
  thinking: { brow: { y: 2, angle: 12 }, smile: 0.1, headTilt: 6, lean: 1, gesture: 'think' },
  curious: { brow: { y: -4, angle: -12 }, smile: 0.3, headTilt: -5, lean: 4, gesture: 'present' },
  gentle: { brow: { y: -1, angle: -3 }, smile: 0.55, headTilt: -2, lean: 0, gesture: 'rest' }
};

export function Character({ character, hue, emotion, mouthOpen, speaking }: Props) {
  const [blink, setBlink] = useState(false);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const breatheRef = useRef(0);

  // blink loop
  useEffect(() => {
    let alive = true;
    let t: number;
    const loop = () => {
      if (!alive) return;
      setBlink(true);
      setTimeout(() => alive && setBlink(false), 120);
      t = window.setTimeout(loop, 2200 + Math.random() * 3200);
    };
    t = window.setTimeout(loop, 1800);
    return () => { alive = false; clearTimeout(t); };
  }, []);

  // eye saccades — small darts, with an upward glance while thinking
  useEffect(() => {
    let alive = true;
    let t: number;
    const loop = () => {
      if (!alive) return;
      if (emotion === 'thinking' || emotion === 'curious') setGaze({ x: (Math.random() - 0.5) * 3, y: -3 });
      else setGaze({ x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 3 });
      t = window.setTimeout(loop, 1200 + Math.random() * 1800);
    };
    t = window.setTimeout(loop, 600);
    return () => { alive = false; clearTimeout(t); };
  }, [emotion]);

  const pose = POSE[emotion];
  const face = `hsl(${hue} 70% 88%)`;
  const faceEdge = `hsl(${hue} 55% 72%)`;
  const ink = `hsl(${hue} 45% 26%)`;
  const cheek = `hsl(${(hue + 20) % 360} 80% 80%)`;
  const accent = `hsl(${hue} 75% 52%)`;
  const body = `hsl(${hue} 60% 64%)`;
  const bodyEdge = `hsl(${hue} 55% 54%)`;

  const open = speaking ? Math.max(0, Math.min(1, mouthOpen)) : 0;
  const eyeY = 96 + gaze.y * 0.4;

  // arm transforms by gesture (spring-transitioned via CSS)
  const armSpring = 'transform 360ms cubic-bezier(.34,1.56,.64,1)';
  const leftArm = armTransform(pose.gesture, 'left', speaking);
  const rightArm = armTransform(pose.gesture, 'right', speaking);

  return (
    <div className="avatar-wrap" style={{ animation: 'bob 4.5s ease-in-out infinite' }}>
      <svg viewBox="0 0 240 280" width="100%" height="100%" role="img" aria-label={`tutor feeling ${emotion}`}>
        {emotion === 'celebrating' && (
          <g fill={accent} className="sparkle">
            <circle cx="40" cy="40" r="3.5" /><circle cx="206" cy="54" r="4.5" />
            <circle cx="186" cy="26" r="2.5" /><circle cx="54" cy="86" r="2.5" />
            <circle cx="120" cy="14" r="3" />
          </g>
        )}

        {/* ---- BODY (under everything, gives arms a place to attach) ---- */}
        <g style={{ transition: 'transform 400ms ease', transform: `translateX(${pose.lean}px)` }}>
          {/* torso */}
          <path d="M120 168 C 86 168 74 196 74 226 L74 266 Q120 280 166 266 L166 226 C166 196 154 168 120 168 Z" fill={body} stroke={bodyEdge} strokeWidth="3" />
          {character === 'nova' && <circle cx="120" cy="214" r="8" fill={accent} />}
          {character === 'pip' && <path d="M104 210 H136" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />}

          {/* arms */}
          <g style={{ transition: armSpring, transformOrigin: '86px 184px', transform: leftArm }}>
            <path d="M86 184 q-30 6 -34 40" fill="none" stroke={body} strokeWidth="15" strokeLinecap="round" />
            <circle cx="52" cy="224" r="10" fill={face} stroke={faceEdge} strokeWidth="2.5" />
          </g>
          <g style={{ transition: armSpring, transformOrigin: '154px 184px', transform: rightArm }}>
            <path d="M154 184 q30 6 34 40" fill="none" stroke={body} strokeWidth="15" strokeLinecap="round" />
            <circle cx="188" cy="224" r="10" fill={face} stroke={faceEdge} strokeWidth="2.5" />
          </g>
        </g>

        {/* ---- HEAD (tilts + breathes) ---- */}
        <g
          style={{
            transition: 'transform 400ms cubic-bezier(.34,1.4,.64,1)',
            transformOrigin: '120px 150px',
            transform: `translateX(${pose.lean}px) rotate(${pose.headTilt}deg)`
          }}
        >
          {character === 'nova' && (
            <g stroke={accent} strokeWidth="3" fill="none">
              <line x1="120" y1="44" x2="120" y2="26" />
              <circle cx="120" cy="22" r="5" fill={accent} stroke="none" />
            </g>
          )}

          <circle cx="120" cy="104" r="62" fill={face} stroke={faceEdge} strokeWidth="3" />
          {character === 'pip' && <circle cx="120" cy="104" r="62" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 8" />}
          <circle cx="58" cy="104" r="11" fill={face} stroke={faceEdge} strokeWidth="3" />
          <circle cx="182" cy="104" r="11" fill={face} stroke={faceEdge} strokeWidth="3" />

          <circle cx="86" cy="120" r="9" fill={cheek} opacity="0.6" />
          <circle cx="154" cy="120" r="9" fill={cheek} opacity="0.6" />

          {/* brows (smoothly transition position/angle) */}
          <g stroke={ink} strokeWidth="4" strokeLinecap="round" style={{ transition: 'transform 250ms ease' }}>
            <line x1="84" y1={80 + pose.brow.y} x2="108" y2={80 + pose.brow.y} transform={`rotate(${pose.brow.angle} 96 ${80 + pose.brow.y})`} />
            <line x1="132" y1={80 + pose.brow.y} x2="156" y2={80 + pose.brow.y} transform={`rotate(${-pose.brow.angle} 144 ${80 + pose.brow.y})`} />
          </g>

          {/* eyes with gaze + blink */}
          <g>
            <ellipse cx="96" cy={eyeY} rx="11" ry={blink ? 1.4 : 12} fill="#fff" stroke={faceEdge} strokeWidth="2" />
            <ellipse cx="144" cy={eyeY} rx="11" ry={blink ? 1.4 : 12} fill="#fff" stroke={faceEdge} strokeWidth="2" />
            {!blink && (
              <g style={{ transition: 'transform 140ms ease-out', transform: `translate(${gaze.x}px, ${gaze.y}px)` }}>
                <circle cx="96" cy={eyeY} r="5" fill={ink} />
                <circle cx="144" cy={eyeY} r="5" fill={ink} />
                <circle cx="98" cy={eyeY - 2} r="1.7" fill="#fff" />
                <circle cx="146" cy={eyeY - 2} r="1.7" fill="#fff" />
              </g>
            )}
            {character === 'sage' && (
              <g stroke={ink} strokeWidth="2.5" fill="none">
                <circle cx="96" cy={eyeY} r="16" /><circle cx="144" cy={eyeY} r="16" />
                <line x1="112" y1={eyeY} x2="128" y2={eyeY} />
              </g>
            )}
          </g>

          {/* mouth — viseme shapes from amplitude */}
          <Mouth open={open} smile={pose.smile} ink={ink} cheek={cheek} />
        </g>
      </svg>
    </div>
  );
}

function armTransform(gesture: Pose['gesture'], side: 'left' | 'right', speaking: boolean): string {
  const mirror = side === 'left' ? -1 : 1;
  switch (gesture) {
    case 'cheer':
      return `rotate(${mirror * -150}deg)`; // both arms up
    case 'wave':
      return side === 'right' ? 'rotate(-120deg)' : 'rotate(8deg)';
    case 'present':
      return side === 'right' ? 'rotate(-38deg)' : 'rotate(10deg)';
    case 'think':
      return side === 'right' ? 'rotate(-96deg)' : 'rotate(6deg)'; // hand toward chin
    default:
      return `rotate(${mirror * 4 + (speaking ? mirror * 2 : 0)}deg)`;
  }
}

/** Mouth as discrete viseme shapes selected by amplitude. */
function Mouth({ open, smile, ink, cheek }: { open: number; smile: number; ink: string; cheek: string }) {
  const cx = 120;
  const cy = 128;
  if (open <= 0.06) {
    // closed: smile / neutral / slight frown
    const d = `M ${cx - 20} ${cy} Q ${cx} ${cy + 4 + smile * 18} ${cx + 20} ${cy}`;
    return <path d={d} fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />;
  }
  // open visemes: width narrows as it gets rounder ("oo"), height grows ("ah")
  const ry = 3 + open * 17;
  const rx = 15 - open * 5;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2} rx={rx} ry={ry} fill={ink} />
      {open > 0.25 && <ellipse cx={cx} cy={cy + ry * 0.45} rx={rx * 0.55} ry={ry * 0.42} fill={cheek} opacity="0.75" />}
    </g>
  );
}

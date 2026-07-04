import { useMemo, useRef, useState } from 'react';
import type { AudioEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

const DISTRACTOR_POOL = [
  'A car horn honking',
  'Ocean waves',
  'Birds singing',
  'A door creaking',
  'Rain falling',
  'A dog barking',
  'A bell ringing',
  'Wind blowing through trees',
];

/** Deterministic (not random) so re-renders of the same element show the same options. */
function pickOptions(label: string): string[] {
  const pool = DISTRACTOR_POOL.filter((d) => d.toLowerCase() !== label.toLowerCase());
  const seed = label.length || 1;
  const opts = [label];
  for (let k = 0; opts.length < 3 && k < pool.length; k++) {
    const candidate = pool[(seed + k * 3) % pool.length]!;
    if (!opts.includes(candidate)) opts.push(candidate);
  }
  const rotate = seed % opts.length;
  return [...opts.slice(rotate), ...opts.slice(0, rotate)];
}

/**
 * `audio` — a sound clip the tutor plays.
 *
 * demonstrate: a play button (disabled/placeholder when there's no `src`) + `label`.
 * manipulate: `listenTask` + a 2–3 option "what did you hear" choice, graded
 * against `label` (the label itself is hidden in this mode — it's the answer).
 */
export const AudioElement: React.FC<ElementProps<AudioEl>> = ({ el, mode, onResult }) => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const options = useMemo(() => pickOptions(el.label), [el.label]);
  const hasSrc = !!el.src && el.src.trim().length > 0;

  function togglePlay() {
    const node = ref.current;
    if (!hasSrc || !node) return;
    if (playing) node.pause();
    else node.play().catch(() => {});
  }

  function choose(opt: string) {
    if (picked !== null) return;
    setPicked(opt);
    onResult?.({ text: opt, correct: opt === el.label });
  }

  return (
    <div className="el-stack">
      {hasSrc && (
        <audio
          ref={ref}
          src={el.src}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          style={{ display: 'none' }}
        />
      )}
      <span style={{ fontSize: 40 }} aria-hidden="true">
        🔊
      </span>
      <button
        type="button"
        className="el-btn"
        onClick={togglePlay}
        disabled={!hasSrc}
        style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 999, padding: '10px 20px', fontSize: 15 }}
      >
        <span aria-hidden="true">{playing ? '⏸' : '▶'}</span>
        {hasSrc ? (playing ? 'Playing…' : 'Play') : 'No audio available'}
      </button>

      {mode !== 'manipulate' ? (
        <p className="el-prompt" style={{ fontWeight: 600, color: 'var(--el-ink)' }}>
          {el.label}
        </p>
      ) : (
        <>
          <p className="el-prompt">{el.listenTask ?? 'Listen, then choose what you hear.'}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {options.map((opt) => {
              const isPicked = picked === opt;
              const isCorrect = isPicked && opt === el.label;
              return (
                <button
                  key={opt}
                  type="button"
                  className="el-btn"
                  onClick={() => choose(opt)}
                  disabled={picked !== null}
                  style={{
                    textAlign: 'left',
                    borderColor: isPicked ? (isCorrect ? 'var(--el-green)' : 'var(--el-red)') : undefined,
                    color: isPicked ? (isCorrect ? 'var(--el-green)' : 'var(--el-red)') : undefined,
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

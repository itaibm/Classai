import { useState } from 'react';
import type { ImageEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

function looksLikeUrl(src?: string): boolean {
  if (!src || !src.trim()) return false;
  return /^(https?:)?\/\//i.test(src) || src.startsWith('data:') || src.startsWith('/');
}

/** Fixed, well-spread pin positions (as % of the frame) — cycles if there are more annotations. */
const HOTSPOT_LAYOUT: { x: number; y: number }[] = [
  { x: 18, y: 26 },
  { x: 76, y: 18 },
  { x: 46, y: 70 },
  { x: 86, y: 74 },
  { x: 12, y: 80 },
  { x: 60, y: 42 },
];
function hotspotAt(i: number): { x: number; y: number } {
  return HOTSPOT_LAYOUT[i % HOTSPOT_LAYOUT.length]!;
}

/** A position:relative frame the image (or placeholder) and hotspot pins sit inside. */
function Frame({ children }: { children: React.ReactNode }) {
  return <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', minHeight: 130 }}>{children}</div>;
}

const pinBase: React.CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  fontWeight: 700,
  padding: 0,
};

/**
 * `image` — a picture the tutor shows, optionally with tappable annotated regions.
 *
 * demonstrate: shows the image (or an offline-friendly emoji placeholder when `src`
 * isn't a usable URL) + caption; `annotate[]` renders as numbered pins that reveal
 * their label on tap.
 *
 * manipulate: the child is asked to tap the region named in the prompt (the first
 * annotation is the stable target); tapping any pin reports the result.
 */
export const ImageElement: React.FC<ElementProps<ImageEl>> = ({ el, mode, onResult }) => {
  const [broken, setBroken] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [picked, setPicked] = useState<number | null>(null);

  const annotate = el.annotate ?? [];
  const showImage = looksLikeUrl(el.src) && !broken;
  const target = annotate[0];

  if (mode === 'manipulate' && target !== undefined) {
    function handlePick(i: number, label: string) {
      if (picked !== null) return;
      setPicked(i);
      onResult?.({ text: label, correct: label === target });
    }
    return (
      <div className="el-stack">
        <p className="el-prompt">
          Tap: <strong style={{ color: 'var(--el-ink)' }}>{target}</strong>
        </p>
        <Frame>
          {showImage ? (
            <img
              src={el.src}
              alt={el.alt}
              onError={() => setBroken(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--el-surface-2)',
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 40 }} aria-hidden="true">
                🖼️
              </span>
            </div>
          )}
          {annotate.map((label, i) => {
            const pos = hotspotAt(i);
            const isPicked = picked === i;
            const isCorrect = isPicked && label === target;
            return (
              <div key={i} style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <button
                  type="button"
                  className="el-btn"
                  onClick={() => handlePick(i, label)}
                  disabled={picked !== null}
                  aria-label={label}
                  style={{
                    ...pinBase,
                    position: 'static',
                    transform: 'none',
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    borderColor: isPicked ? (isCorrect ? 'var(--el-green)' : 'var(--el-red)') : undefined,
                    color: isPicked ? (isCorrect ? 'var(--el-green)' : 'var(--el-red)') : undefined,
                  }}
                >
                  {isPicked ? (isCorrect ? '✓' : '✗') : i + 1}
                </button>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    padding: '2px 6px',
                    borderRadius: 8,
                    background: 'var(--el-surface)',
                    color: 'var(--el-ink)',
                    border: '1px solid var(--el-line)',
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </Frame>
      </div>
    );
  }

  return (
    <div className="el-stack">
      <Frame>
        {showImage ? (
          <img
            src={el.src}
            alt={el.alt}
            onError={() => setBroken(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'var(--el-surface-2)',
              borderRadius: 12,
            }}
          >
            <span style={{ fontSize: 40 }} aria-hidden="true">
              🖼️
            </span>
            <span style={{ fontSize: 13, color: 'var(--el-muted)', textAlign: 'center', padding: '0 12px' }}>
              {el.alt}
            </span>
          </div>
        )}
        {annotate.map((label, i) => {
          const pos = hotspotAt(i);
          const isOpen = revealed.has(i);
          return (
            <button
              key={i}
              type="button"
              className="el-btn"
              onClick={() =>
                setRevealed((prev) => {
                  const next = new Set(prev);
                  if (next.has(i)) next.delete(i);
                  else next.add(i);
                  return next;
                })
              }
              style={{
                ...pinBase,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: isOpen ? 'auto' : 28,
                height: 28,
                padding: isOpen ? '4px 10px' : 0,
                borderRadius: isOpen ? 10 : 999,
                whiteSpace: 'nowrap',
                background: isOpen ? 'var(--el-accent)' : 'var(--el-surface)',
                color: isOpen ? 'var(--el-on-accent)' : 'var(--el-ink)',
                borderColor: 'var(--el-accent)',
              }}
            >
              {isOpen ? label : i + 1}
            </button>
          );
        })}
      </Frame>
      {el.caption && <p className="el-prompt">{el.caption}</p>}
    </div>
  );
};

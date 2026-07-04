import { useState } from 'react';
import { elementIsManipulable, type ElementResult } from '@shared/elements.ts';
import { ElementView } from '../blocks/elements/ElementView.tsx';
import { GALLERY_SAMPLES } from '../blocks/elements/samples.ts';
import '../blocks/elements/tokens.css';

/**
 * Internal dev-only gallery for the semantic lesson elements.
 * Not linked from any user-facing nav — reachable at #/dev/elements.
 * Renders every GALLERY_SAMPLES entry in demonstrate mode, plus
 * manipulate mode when the element type supports it.
 */
export function ElementGallery() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [results, setResults] = useState<Record<number, ElementResult>>({});

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <div
      className="el-display"
      style={{
        minHeight: '100vh',
        background: 'var(--el-ground)',
        color: 'var(--el-ink)',
        padding: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <header style={{ marginBottom: 32, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: '.11em',
              textTransform: 'uppercase',
              color: 'var(--el-accent)',
              margin: '0 0 10px',
            }}
          >
            Classai · dev · element gallery
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, letterSpacing: '-.01em' }}>
            Lesson element renderers
          </h1>
          <p style={{ margin: '8px 0 0', color: 'var(--el-muted)', maxWidth: '64ch' }}>
            {GALLERY_SAMPLES.length} sample{GALLERY_SAMPLES.length === 1 ? '' : 's'} — demonstrate mode (tutor
            shows) and manipulate mode (child does), side by side.
          </p>
        </div>
        <button className="el-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 dark' : '☀️ light'} theme
        </button>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}
      >
        {GALLERY_SAMPLES.map((el, i) => {
          const manipulable = elementIsManipulable(el.type);
          const result = results[i];
          return (
            <section
              key={i}
              style={{
                background: 'var(--el-surface-2)',
                border: '1px solid var(--el-line)',
                borderRadius: 20,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="el-mono" style={{ fontSize: 14, fontWeight: 600 }}>
                  {el.type}
                </span>
                <span
                  className="el-mono"
                  style={{ fontSize: 11, color: 'var(--el-faint)' }}
                >
                  {manipulable ? 'demonstrate + manipulate' : 'demonstrate only'}
                </span>
              </div>

              <div>
                <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--el-muted)' }}>
                  Demonstrate
                </p>
                <ElementView el={el} mode="demonstrate" />
              </div>

              {manipulable && (
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--el-muted)' }}>
                    Manipulate
                  </p>
                  <ElementView
                    el={el}
                    mode="manipulate"
                    onResult={(r) => setResults((prev) => ({ ...prev, [i]: r }))}
                  />
                  {result && (
                    <p className="el-mono" style={{ fontSize: 12, marginTop: 8, color: 'var(--el-green)' }}>
                      result: {result.text} {result.correct === undefined ? '' : result.correct ? '✓' : '✗'}
                    </p>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

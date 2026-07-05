import { useMemo, useState } from 'react';
import {
  ELEMENT_JOB,
  elementIsManipulable,
  type ElementJob,
  type ElementResult,
  type ElementType,
  type LessonElement,
} from '@shared/elements.ts';
import { ElementView } from '../blocks/elements/ElementView.tsx';
import { GALLERY_SAMPLES } from '../blocks/elements/samples.ts';
import { hasRenderer } from '../blocks/elements/registry.tsx';
import '../blocks/elements/tokens.css';

/**
 * Internal dev-only gallery for the semantic lesson elements.
 * Not linked from any user-facing nav — reachable at #/dev/elements.
 * Renders every GALLERY_SAMPLES entry in demonstrate mode, plus
 * manipulate mode when the element type supports it. Samples are
 * grouped by their ELEMENT_JOB (tell / show / model / sequence / do),
 * and a completeness guard flags any ElementType missing a renderer
 * or a sample.
 */

const ALL_ELEMENT_TYPES = Object.keys(ELEMENT_JOB) as ElementType[];

const JOB_ORDER: ElementJob[] = ['tell', 'show', 'model', 'sequence', 'do'];

const JOB_LABEL: Record<ElementJob, string> = {
  tell: 'Tell',
  show: 'Show',
  model: 'Model',
  sequence: 'Sequence',
  do: 'Do',
};

interface CompletenessIssue {
  type: ElementType;
  missingRenderer: boolean;
  missingSample: boolean;
}

function checkCompleteness(): CompletenessIssue[] {
  const sampleTypes = new Set(GALLERY_SAMPLES.map((s) => s.type));
  const issues: CompletenessIssue[] = [];
  for (const t of ALL_ELEMENT_TYPES) {
    const missingRenderer = !hasRenderer(t);
    const missingSample = !sampleTypes.has(t);
    if (missingRenderer || missingSample) {
      issues.push({ type: t, missingRenderer, missingSample });
    }
  }
  return issues;
}

function ElementCard({
  el,
  index,
  result,
  onResult,
}: {
  el: LessonElement;
  index: number;
  result: ElementResult | undefined;
  onResult: (i: number, r: ElementResult) => void;
}) {
  const manipulable = elementIsManipulable(el.type);
  return (
    <section
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
        <span className="el-mono" style={{ fontSize: 11, color: 'var(--el-faint)' }}>
          {manipulable ? 'demonstrate + manipulate' : 'demonstrate only'}
        </span>
      </div>

      <div>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--el-muted)' }}>Demonstrate</p>
        <ElementView el={el} mode="demonstrate" />
      </div>

      {manipulable && (
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--el-muted)' }}>Manipulate</p>
          <ElementView el={el} mode="manipulate" onResult={(r) => onResult(index, r)} />
          <p
            className="el-mono"
            data-testid="el-result-readout"
            style={{
              fontSize: 12,
              marginTop: 8,
              minHeight: 16,
              color: result ? 'var(--el-green)' : 'var(--el-faint)',
            }}
          >
            {result
              ? `result: ${result.text} ${result.correct === undefined ? '' : result.correct ? '✓' : '✗'}`
              : 'result: (interact above to report a result)'}
          </p>
        </div>
      )}
    </section>
  );
}

export function ElementGallery() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [results, setResults] = useState<Record<number, ElementResult>>({});

  const issues = useMemo(checkCompleteness, []);

  const grouped = useMemo(() => {
    const byJob = new Map<ElementJob, { el: LessonElement; index: number }[]>();
    GALLERY_SAMPLES.forEach((el, index) => {
      const job = ELEMENT_JOB[el.type];
      const list = byJob.get(job) ?? [];
      list.push({ el, index });
      byJob.set(job, list);
    });
    return byJob;
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  function handleResult(i: number, r: ElementResult) {
    setResults((prev) => ({ ...prev, [i]: r }));
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
            {GALLERY_SAMPLES.length} sample{GALLERY_SAMPLES.length === 1 ? '' : 's'} across {ALL_ELEMENT_TYPES.length}{' '}
            element types — demonstrate mode (tutor shows) and manipulate mode (child does), grouped by job.
          </p>
        </div>
        <button className="el-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 dark' : '☀️ light'} theme
        </button>
      </header>

      {issues.length > 0 && (
        <div
          role="alert"
          style={{
            background: 'var(--el-red)',
            color: '#fff',
            borderRadius: 14,
            padding: '16px 20px',
            marginBottom: 28,
            fontFamily: 'inherit',
          }}
        >
          <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 15 }}>
            ⚠ Gallery completeness check failed — {issues.length} element{issues.length === 1 ? '' : 's'} incomplete
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6 }}>
            {issues.map((issue) => (
              <li key={issue.type} className="el-mono">
                {issue.type}
                {issue.missingRenderer ? ' — missing renderer' : ''}
                {issue.missingRenderer && issue.missingSample ? ',' : ''}
                {issue.missingSample ? ' — missing sample' : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      {JOB_ORDER.map((job) => {
        const items = grouped.get(job);
        if (!items || items.length === 0) return null;
        return (
          <section key={job} style={{ marginBottom: 36 }}>
            <h2
              style={{
                margin: '0 0 14px',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-.01em',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {JOB_LABEL[job]}
              <span className="el-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--el-faint)' }}>
                {items.length} sample{items.length === 1 ? '' : 's'}
              </span>
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: 20,
              }}
            >
              {items.map(({ el, index }) => (
                <ElementCard key={index} el={el} index={index} result={results[index]} onResult={handleResult} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

import type { TextEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

/**
 * `text` — the simplest element: the tutor says or highlights something.
 * Demonstrate only (no manipulate mode — there is nothing for the child to do).
 *
 * emphasis:
 *  - 'plain'   — a calm, readable line of speech.
 *  - 'callout' — a boxed, accented card for "pay attention to this".
 *  - 'term'    — a vocabulary card: the term in large accent type, its definition below.
 */
export const TextElement: React.FC<ElementProps<TextEl>> = ({ el }) => {
  const emphasis = el.emphasis ?? 'plain';

  if (emphasis === 'term') {
    return (
      <div className="el-stack" style={{ gap: 10 }}>
        {el.value && (
          <p className="el-display" style={{ margin: 0, fontSize: 15, color: 'var(--el-muted)', textAlign: 'center' }}>
            {el.value}
          </p>
        )}
        <div
          style={{
            width: '100%',
            background: 'var(--el-accent-soft)',
            border: '1px solid var(--el-line)',
            borderRadius: 14,
            padding: '16px 18px',
            textAlign: 'center',
          }}
        >
          <p className="el-display" style={{ margin: '0 0 6px', fontSize: 21, fontWeight: 800, color: 'var(--el-accent)' }}>
            {el.term ?? ''}
          </p>
          {el.definition && (
            <p style={{ margin: 0, fontSize: 15, color: 'var(--el-ink)', lineHeight: 1.45 }}>{el.definition}</p>
          )}
        </div>
      </div>
    );
  }

  if (emphasis === 'callout') {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          background: 'var(--el-accent-soft)',
          border: '1px solid var(--el-accent)',
          borderRadius: 14,
          padding: '16px 18px',
        }}
      >
        <span style={{ fontSize: 22, lineHeight: 1 }} aria-hidden="true">
          💡
        </span>
        <p
          className="el-display"
          style={{ margin: 0, fontSize: 17, fontWeight: 650, color: 'var(--el-ink)', lineHeight: 1.45 }}
        >
          {el.value}
        </p>
      </div>
    );
  }

  return (
    <p
      className="el-display"
      style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--el-ink)', lineHeight: 1.5, textAlign: 'center' }}
    >
      {el.value}
    </p>
  );
};

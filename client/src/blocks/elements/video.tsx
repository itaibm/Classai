import { useState } from 'react';
import type { VideoEl } from '@shared/elements.ts';
import type { ElementProps } from './types.ts';

/**
 * `video` — a video the tutor assigns to watch. We never embed a real iframe
 * (no third-party network calls from a live lesson); instead a styled "▶ video"
 * card stands in for the player, offline-friendly.
 *
 * demonstrate: watchTask + the placeholder card.
 * manipulate: "✓ I watched it" gate, then (if `afterCheck` is set) a short
 * follow-up question graded by case-insensitive "contains".
 */
export const VideoElement: React.FC<ElementProps<VideoEl>> = ({ el, mode, onResult }) => {
  const afterCheck = el.afterCheck;
  const [watched, setWatched] = useState(false);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);

  const card = (
    <div className="el-stack" style={{ gap: 10 }}>
      <p className="el-prompt" style={{ fontWeight: 600, color: 'var(--el-ink)' }}>
        🎬 {el.watchTask}
      </p>
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 14,
          background: 'var(--el-surface-2)',
          border: '1px solid var(--el-line)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'var(--el-accent)',
            color: 'var(--el-on-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          ▶
        </span>
        <span style={{ fontSize: 12.5, color: 'var(--el-muted)', textAlign: 'center', padding: '0 14px' }}>
          {el.url ? el.url : `Search: “${el.searchTerm ?? 'video'}”`}
        </span>
      </div>
    </div>
  );

  if (mode !== 'manipulate') {
    return card;
  }

  function submit() {
    if (checked !== null || !afterCheck) return;
    const expected = afterCheck.expectedAnswer.trim().toLowerCase();
    const a = answer.trim().toLowerCase();
    const ok = expected ? a.includes(expected) : a.length > 0;
    setChecked(ok);
    onResult?.({ text: answer, correct: ok });
  }

  if (!watched) {
    return (
      <div className="el-stack">
        {card}
        <button
          type="button"
          className="el-btn"
          onClick={() => {
            setWatched(true);
            if (!afterCheck) onResult?.({ text: 'watched', correct: true });
          }}
        >
          ✓ I watched it
        </button>
      </div>
    );
  }

  if (!afterCheck) {
    return (
      <div className="el-stack">
        {card}
        <p className="el-prompt" style={{ color: 'var(--el-green)' }}>
          ✓ Nice work watching!
        </p>
      </div>
    );
  }

  return (
    <div className="el-stack">
      {card}
      <p className="el-prompt">{afterCheck.question}</p>
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={checked !== null}
          placeholder="Your answer"
          style={{
            flex: 1,
            borderRadius: 9,
            border: '1px solid var(--el-line)',
            padding: '8px 10px',
            fontSize: 14,
            background: 'var(--el-surface)',
            color: 'var(--el-ink)',
          }}
        />
        <button type="button" className="el-btn" onClick={submit} disabled={checked !== null || !answer.trim()}>
          Check
        </button>
      </div>
      {checked !== null && (
        <p className="el-prompt" style={{ color: checked ? 'var(--el-green)' : 'var(--el-red)' }}>
          {checked ? '✓ Correct!' : `Not quite — the answer was “${afterCheck.expectedAnswer}”.`}
        </p>
      )}
    </div>
  );
};

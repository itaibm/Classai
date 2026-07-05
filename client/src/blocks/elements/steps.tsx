import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ElementResult, StepsEl } from '@shared/elements.ts';

type Slide = StepsEl['slides'][number];

/* ------------------------------------------------------------------ */
/* leniency: grading a free-text prediction against the hidden slide   */
/* ------------------------------------------------------------------ */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Predicting "what happens next" from a partial worked example is
 * inherently fuzzy — there's no single right phrasing a 5-11 year old will
 * type. So we accept ANY non-empty guess as a genuine attempt (always call
 * `onResult`, never block progress), and mark `correct` only if it loosely
 * overlaps the hidden slide's title+body: an exact substring match in
 * either direction, or sharing at least one "meaningful" word (length
 * >= 3, so filler words like "the"/"is"/"to" can't trivially match).
 */
function looseMatch(guess: string, target: string): boolean {
  const g = normalize(guess);
  const t = normalize(target);
  if (!g || !t) return false;
  if (t.includes(g) || g.includes(t)) return true;
  const gWords = new Set(g.split(' ').filter((w) => w.length >= 3));
  return t.split(' ').some((w) => w.length >= 3 && gWords.has(w));
}

/* ------------------------------------------------------------------ */
/* shared slide chrome                                                  */
/* ------------------------------------------------------------------ */

function StepDots({ count, current }: { count: number; current: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{ width: 7, height: 7, borderRadius: '50%', background: i <= current ? 'var(--el-accent)' : 'var(--el-line)' }}
        />
      ))}
    </div>
  );
}

function SlideCard({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 220 }}>
      <p className="el-prompt" style={{ fontSize: 11, fontWeight: 700, color: 'var(--el-accent)', margin: '0 0 4px' }}>
        Step {index + 1} of {total}
      </p>
      {slide.title && <p style={{ margin: '0 0 4px', fontWeight: 800, color: 'var(--el-ink)' }}>{slide.title}</p>}
      <p style={{ margin: 0, color: 'var(--el-ink)' }}>{slide.body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* demonstrate — reveal `slides` one-by-one (Next) or all at once       */
/* ------------------------------------------------------------------ */

function StepsDemonstrate({ el }: { el: StepsEl }) {
  const slides = el.slides;
  const [i, setI] = useState(0);

  if (slides.length === 0) return <p className="el-prompt">No steps.</p>;

  if (el.reveal === 'all') {
    return (
      <div className="el-stack">
        {slides.map((s, idx) => (
          <SlideCard key={idx} slide={s} index={idx} total={slides.length} />
        ))}
      </div>
    );
  }

  const current = slides[Math.min(i, slides.length - 1)];
  if (!current) return null;
  const isLast = i >= slides.length - 1;
  return (
    <div className="el-stack">
      <SlideCard slide={current} index={i} total={slides.length} />
      <StepDots count={slides.length} current={i} />
      <button type="button" className="el-btn" disabled={isLast} onClick={() => setI((n) => Math.min(n + 1, slides.length - 1))}>
        {isLast ? 'Done' : 'Next step →'}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* manipulate — reveal all but the last slide, then predict it          */
/* ------------------------------------------------------------------ */

/**
 * Reveals every slide except the last (one-by-one via Next, or all at once
 * per `el.reveal`, matching demonstrate's pacing), then hides the last
 * slide's body/title and asks the child to type what they think comes
 * next. Any non-empty guess is accepted as a real attempt (see
 * `looseMatch`'s doc comment for the leniency rule); the real last slide
 * is always revealed afterwards regardless of correctness, since the goal
 * is prediction practice, not gatekeeping.
 */
function StepsManipulate({ el, onResult }: { el: StepsEl; onResult?: (r: ElementResult) => void }) {
  const slides = el.slides;
  const lastIndex = slides.length - 1;
  const priorSlides = slides.slice(0, lastIndex);
  const lastSlide = slides[lastIndex];

  const [revealed, setRevealed] = useState(el.reveal === 'all' ? priorSlides.length : Math.min(1, priorSlides.length));
  const [guess, setGuess] = useState('');
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(false);

  if (!lastSlide) return <p className="el-prompt">No steps.</p>;

  const readyToPredict = revealed >= priorSlides.length;

  function submit() {
    if (done || guess.trim().length === 0 || !lastSlide) return;
    const target = `${lastSlide.title ?? ''} ${lastSlide.body}`;
    const ok = looseMatch(guess, target);
    setCorrect(ok);
    setDone(true);
    onResult?.({ text: guess.trim(), correct: ok });
  }

  return (
    <div className="el-stack">
      {priorSlides.slice(0, revealed).map((s, idx) => (
        <SlideCard key={idx} slide={s} index={idx} total={slides.length} />
      ))}
      {!readyToPredict && (
        <button type="button" className="el-btn" onClick={() => setRevealed((n) => Math.min(n + 1, priorSlides.length))}>
          Next step →
        </button>
      )}
      {readyToPredict && !done && (
        <div className="el-stack">
          <p className="el-prompt">What do you think happens next?</p>
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your guess…"
            style={{
              width: '90%',
              maxWidth: 220,
              padding: '8px 10px',
              borderRadius: 9,
              border: '1px solid var(--el-line)',
              background: 'var(--el-surface)',
              color: 'var(--el-ink)',
              fontSize: 14,
            }}
          />
          <button type="button" className="el-btn" disabled={guess.trim().length === 0} onClick={submit}>
            Submit guess
          </button>
        </div>
      )}
      {done && (
        <div className="el-stack">
          <SlideCard slide={lastSlide} index={lastIndex} total={slides.length} />
          <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-muted)' }}>
            {correct ? '✓ Great prediction!' : "Good try! Here's what actually happens:"}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * `steps` — a worked-example / sequence walkthrough.
 *
 * demonstrate: `reveal: 'all'` shows every slide at once; the default
 * `'one-by-one'` shows one slide with a "Next step →" button and progress
 * dots (`StepDots`), matching the approved gallery's reveal pattern.
 * manipulate: see `StepsManipulate`'s doc comment — reveals every slide but
 * the last, then asks for a free-text prediction, graded leniently.
 */
export const StepsElement: React.FC<ElementProps<StepsEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <StepsManipulate el={el} onResult={onResult} />;
  return <StepsDemonstrate el={el} />;
};

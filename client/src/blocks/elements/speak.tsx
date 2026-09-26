import { useEffect, useRef, useState } from 'react';
import type { ElementProps } from './types.ts';
import type { SpeakEl, ElementResult } from '@shared/elements.ts';
import { startRecording, micSupported, type RecorderHandle } from '../../voice/stt.ts';

/** Case-insensitive contains-match against `target`; with no `target`, any
 *  non-empty attempt counts as correct (the point is "say something",
 *  not word-perfect recall). */
function isMatch(transcript: string, target?: string): boolean {
  const t = transcript.trim();
  if (!target) return t.length > 0;
  return t.toLowerCase().includes(target.trim().toLowerCase());
}

function SpeakDemonstrate({ el }: { el: SpeakEl }) {
  return (
    <div className="el-stack">
      <p className="el-prompt">{el.prompt}</p>
      <button
        type="button"
        className="el-btn"
        disabled
        aria-label="Microphone (disabled)"
        style={{ borderRadius: '50%', width: 52, height: 52, fontSize: 20 }}
      >
        🎤
      </button>
    </div>
  );
}

/**
 * manipulate: reuses the app's real on-device Whisper capture
 * (`voice/stt.ts` `startRecording`/`micSupported`) — press the mic to
 * record, press again to stop; the resolved transcript is graded via
 * `isMatch`. Falls back to a typed answer when the mic isn't available
 * (insecure origin / no getUserMedia) or if starting it fails, and always
 * offers "Type instead" as a manual escape hatch, matching the classroom's
 * existing mic-or-type pattern (see BlockView.tsx `AnswerInput`).
 */
function SpeakManipulate({ el, onResult }: { el: SpeakEl; onResult?: (r: ElementResult) => void }) {
  const micAvailable = micSupported();
  const [typeMode, setTypeMode] = useState(!micAvailable);
  const [status, setStatus] = useState<'idle' | 'recording' | 'transcribing'>('idle');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(false);
  const recRef = useRef<RecorderHandle | null>(null);

  useEffect(
    () => () => {
      recRef.current?.cancel();
    },
    []
  );

  function finish(answer: string) {
    const ok = isMatch(answer, el.target);
    setCorrect(ok);
    setDone(true);
    onResult?.({ text: answer.trim(), correct: ok });
  }

  async function startMic() {
    setError('');
    try {
      recRef.current = await startRecording();
      setStatus('recording');
    } catch {
      setError('Could not start the microphone. Type your answer instead.');
      setTypeMode(true);
      setStatus('idle');
    }
  }

  async function stopMic() {
    const rec = recRef.current;
    recRef.current = null;
    if (!rec) return;
    setStatus('transcribing');
    const transcript = await rec.stop();
    setStatus('idle');
    if (!transcript) {
      setError("Didn't catch that — try again, or type your answer.");
      return;
    }
    setText(transcript);
    finish(transcript);
  }

  function submitTyped() {
    if (done || text.trim() === '') return;
    finish(text);
  }

  return (
    <div className="el-stack">
      <p className="el-prompt">{el.prompt}</p>

      {!typeMode && !done && (
        <>
          <button
            type="button"
            className="el-btn"
            disabled={status === 'transcribing'}
            onClick={status === 'recording' ? stopMic : startMic}
            aria-label={status === 'recording' ? 'Stop recording' : 'Start recording'}
            style={{
              borderRadius: '50%',
              width: 56,
              height: 56,
              fontSize: 22,
              borderColor: status === 'recording' ? 'var(--el-red)' : undefined,
              color: status === 'recording' ? 'var(--el-red)' : undefined,
            }}
          >
            {status === 'recording' ? '■' : status === 'transcribing' ? '…' : '🎤'}
          </button>
          {status === 'recording' && <p className="el-prompt">● Listening… tap to stop</p>}
          <button type="button" className="el-btn" onClick={() => setTypeMode(true)}>
            Type instead
          </button>
        </>
      )}

      {typeMode && !done && (
        <div className="el-stack">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitTyped();
            }}
            placeholder="Type what you'd say…"
            style={{
              width: 200,
              padding: '8px 10px',
              borderRadius: 9,
              border: '1px solid var(--el-line)',
              background: 'var(--el-surface)',
              color: 'var(--el-ink)',
              fontSize: 14,
            }}
          />
          <button type="button" className="el-btn" disabled={text.trim() === ''} onClick={submitTyped}>
            Check
          </button>
          {micAvailable && (
            <button type="button" className="el-btn" onClick={() => setTypeMode(false)}>
              Use mic
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="el-prompt" style={{ color: 'var(--el-red)' }}>
          {error}
        </p>
      )}

      {done && (
        <div className="el-stack">
          <p className="el-prompt">“{text}”</p>
          <p className="el-prompt" style={{ color: correct ? 'var(--el-green)' : 'var(--el-red)' }}>
            {correct ? '✓ Nice!' : el.target ? `Try saying: "${el.target}"` : 'Good try!'}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * `speak` — a spoken-answer check. See `SpeakManipulate`'s doc comment for
 * why it reuses the existing Whisper capture instead of inventing a new
 * mic pipeline, and when it falls back to typing.
 */
export const SpeakElement: React.FC<ElementProps<SpeakEl>> = ({ el, mode, onResult }) => {
  if (mode === 'manipulate') return <SpeakManipulate el={el} onResult={onResult} />;
  return <SpeakDemonstrate el={el} />;
};

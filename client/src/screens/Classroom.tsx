import { useEffect, useRef, useState } from 'react';
import type { Kid, Lesson, TeacherTurn, Emotion, LessonReport, LessonBlock, BlockResult } from '@shared/types';
import { blockIsInteractive } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { Character } from '../avatar/Character.tsx';
import { BlockView, AnswerInput } from '../blocks/BlockView.tsx';
import { speak, unlockAudio, type SpeakHandle } from '../voice/tts.ts';

type Phase = 'gate' | 'starting' | 'thinking' | 'speaking' | 'awaiting' | 'ended' | 'error';

const HD_KEY = 'classai_hd';
const MUTE_KEY = 'classai_mute';
const MIC_KEY = 'classai_mic';

export function Classroom({ lessonId }: { lessonId: string }) {
  const [kid, setKid] = useState<Kid | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [phase, setPhase] = useState<Phase>('gate');
  const [emotion, setEmotion] = useState<Emotion>('happy');
  const [mouthOpen, setMouthOpen] = useState(0);
  const [captions, setCaptions] = useState('');
  const [shown, setShown] = useState(''); // progressively-revealed portion of captions
  const [block, setBlock] = useState<LessonBlock | null>(null);
  const [errMsg, setErrMsg] = useState('');
  const [report, setReport] = useState<LessonReport | null>(null);
  const [beat, setBeat] = useState<{ index: number; total: number } | null>(null);
  const [turnSeq, setTurnSeq] = useState(0); // unique per turn → forces a fresh block instance
  const [hd, setHd] = useState(localStorage.getItem(HD_KEY) === '1');
  const [muted, setMuted] = useState(localStorage.getItem(MUTE_KEY) === '1');
  const [micOn, setMicOn] = useState(localStorage.getItem(MIC_KEY) !== '0'); // default on
  const [listening, setListening] = useState(false); // mic actively recording (for top-bar indicator)

  const sessionRef = useRef<string>('');
  const revealRef = useRef<number | null>(null);
  const speakRef = useRef<SpeakHandle | null>(null);
  const watchdogRef = useRef<number | null>(null); // forces the answer UI to appear if TTS never reports it finished

  function clearWatchdog() {
    if (watchdogRef.current) { clearTimeout(watchdogRef.current); watchdogRef.current = null; }
  }

  function stopReveal() {
    if (revealRef.current) { clearInterval(revealRef.current); revealRef.current = null; }
  }
  /** Reveal the tutor's speech word-by-word so it reads like talking, not a dump.
   *  Pace roughly tracks spoken length; always completes on the final tick. */
  function startReveal(text: string) {
    stopReveal();
    const tokens = text.split(/(\s+)/); // keep whitespace so join('') restores text
    if (tokens.length <= 1) { setShown(text); return; }
    const totalMs = Math.min(14000, 600 + text.length * 32);
    const stepMs = Math.max(40, Math.round(totalMs / tokens.length));
    let i = 0;
    setShown('');
    revealRef.current = window.setInterval(() => {
      i += 1;
      setShown(tokens.slice(0, i).join(''));
      if (i >= tokens.length) stopReveal();
    }, stepMs);
  }
  const kidRef = useRef<Kid | null>(null);
  const mutedRef = useRef(muted);
  const hdRef = useRef(hd);
  mutedRef.current = muted;
  hdRef.current = hd;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { lesson } = await api.lesson(lessonId);
        const { kid } = await api.kid(lesson.kidId);
        if (cancelled) return;
        setLesson(lesson);
        setKid(kid);
        kidRef.current = kid;
      } catch (e: any) {
        setErrMsg(e.message || 'Could not load the lesson.');
        setPhase('error');
      }
    })();
    return () => {
      cancelled = true;
      speakRef.current?.stop();
      stopReveal();
      clearWatchdog();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  async function begin() {
    unlockAudio(); // must run inside the tap so audio can play
    setPhase('starting');
    try {
      const { sessionId } = await api.startLesson(lessonId);
      sessionRef.current = sessionId;
      fetchTurn();
    } catch (e: any) {
      setErrMsg(e.message || 'Could not start the lesson.');
      setPhase('error');
    }
  }

  async function fetchTurn(response?: { text: string; via: 'block' | 'continue'; correct?: boolean }) {
    setPhase('thinking');
    setEmotion('thinking');
    setCaptions('');
    stopReveal();
    clearWatchdog();
    setShown('');
    setBlock(null);
    setListening(false);
    try {
      const { turn, ended, beat } = await api.turn(sessionRef.current, response as any);
      setBeat(beat);
      present(turn, ended);
    } catch (e: any) {
      setErrMsg(e.message || 'The tutor had trouble responding.');
      setPhase('error');
    }
  }

  function present(turn: TeacherTurn, ended: boolean) {
    setEmotion(turn.emotion || 'neutral');
    setCaptions(turn.speech);
    setBlock(turn.block ?? null);
    setTurnSeq((n) => n + 1);
    startReveal(turn.speech);
    // Show the bubble immediately — never depend on the TTS engine firing onStart
    // to reveal the question (some engines/voices never fire it).
    setPhase('speaking');

    let done = false;
    const afterSpeech = () => {
      if (done) return; // idempotent: onEnd and the watchdog must not both advance
      done = true;
      clearWatchdog();
      setMouthOpen(0);
      stopReveal();
      setShown(turn.speech); // ensure the full text is visible once speech ends
      if (ended || turn.lessonComplete) finish();
      else setPhase('awaiting'); // <- this is what reveals the answer bar / mic
    };

    // WATCHDOG: the browser SpeechSynthesis engine frequently fails to fire
    // onend (long text, tab blur, no loaded voice). Without this, the lesson is
    // stranded in 'speaking' forever and the learner never gets a way to answer.
    // Cap generously above expected speech length so it only fires on real hangs.
    const cap = mutedRef.current
      ? Math.min(6000, 900 + turn.speech.length * 35)
      : Math.min(60000, 5000 + turn.speech.length * 90);
    watchdogRef.current = window.setTimeout(afterSpeech, cap);

    if (mutedRef.current) return; // muted: the watchdog alone advances the turn

    speakRef.current = speak({
      text: turn.speech,
      hd: hdRef.current,
      rate: kidRef.current?.avatar.rate ?? 1,
      voice: hdRef.current ? 'af_heart' : kidRef.current?.avatar.voice,
      onStart: () => setPhase('speaking'),
      onLevel: setMouthOpen,
      onEnd: afterSpeech
    });
  }

  async function finish() {
    setPhase('ended');
    setEmotion('celebrating');
    setBlock(null);
    try {
      const { session } = await api.session(sessionRef.current);
      setReport(session.report || null);
    } catch {
      /* report optional */
    }
  }

  const onBlockComplete = (r: BlockResult) => {
    speakRef.current?.stop();
    fetchTurn({ text: r.text, via: 'block', correct: r.correct });
  };
  const onContinue = () => {
    speakRef.current?.stop();
    fetchTurn({ text: '(continue)', via: 'continue' });
  };
  // Free-text / spoken answer when the turn has no interactive block.
  const onAnswer = (t: string) => {
    speakRef.current?.stop();
    fetchTurn({ text: t, via: 'block' });
  };

  const hue = kid?.avatar.hue ?? 210;
  const speaking = phase === 'speaking';
  const interactive = blockIsInteractive(block ?? undefined);
  const showContinue = phase === 'awaiting' && !interactive;

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <div className="topbar">
        <div className="brand" onClick={() => navigate(kid ? `/learn/${kid.id}` : '/')}>← Leave class</div>
        <div className="spacer" />
        <span className="muted small">{lesson?.title}</span>
        {listening && (
          <span className="listening-pill" title="Microphone is listening">
            <span className="rec-dot" /> Listening…
          </span>
        )}
        <button
          className="btn ghost small"
          title={micOn ? 'Microphone is on — click to turn off' : 'Microphone is off — click to turn on'}
          onClick={() => setMicOn((m) => { localStorage.setItem(MIC_KEY, m ? '0' : '1'); return !m; })}
        >
          {micOn ? '🎙️ Mic on' : '🎙️ Mic off'}
        </button>
        <button className="btn ghost small" onClick={() => setMuted((m) => { localStorage.setItem(MUTE_KEY, m ? '0' : '1'); return !m; })}>
          {muted ? '🔇 Muted' : '🔊 Voice on'}
        </button>
        <button className="btn ghost small" title="Higher-quality voice (downloads once)" onClick={() => setHd((h) => { localStorage.setItem(HD_KEY, h ? '0' : '1'); return !h; })}>
          {hd ? '✨ HD voice' : 'HD voice off'}
        </button>
      </div>

      <div className="container">
        <div className="stage compact">
          {kid && <Character character={kid.avatar.character} hue={hue} emotion={emotion} mouthOpen={mouthOpen} speaking={speaking} />}

          {phase === 'gate' && (
            <div className="col center" style={{ gap: 12 }}>
              <div className="captions">{lesson ? `Ready for “${lesson.topic}”?` : 'Getting ready…'}</div>
              <button className="btn lg" disabled={!lesson} onClick={begin}>▶ Start lesson</button>
              <span className="muted small">Your tutor will talk to you — make sure your sound is on.</span>
            </div>
          )}

          {(phase === 'starting' || phase === 'thinking') && (
            <div className="captions thinking">{phase === 'starting' ? 'Getting ready…' : 'thinking…'}</div>
          )}
          {phase === 'error' && <div className="captions"><span className="muted">{errMsg}</span></div>}
          {(phase === 'speaking' || phase === 'awaiting' || phase === 'ended') && captions && (
            <div className="speech-bubble">
              {shown}
              {phase === 'speaking' && shown.length < captions.length && <span className="caret">▌</span>}
            </div>
          )}

          {beat && phase !== 'ended' && phase !== 'gate' && (
            <div className="beats" title={`Step ${beat.index + 1} of ${beat.total}`}>
              {Array.from({ length: beat.total }).map((_, i) => (
                <span key={i} className={`dot ${i < beat.index ? 'done' : i === beat.index ? 'now' : ''}`} />
              ))}
            </div>
          )}
        </div>

        {/* the tool-belt block for this turn */}
        {block && (phase === 'speaking' || phase === 'awaiting') && (
          <div className="block-area">
            <BlockView key={turnSeq} block={block} active={phase === 'awaiting'} onComplete={onBlockComplete} micEnabled={micOn} onMicState={setListening} />
          </div>
        )}

        {showContinue && (
          <div className="block-area">
            {/* Always give the kid a way to respond when the tutor is waiting —
                speak or type — even on turns that carry no interactive block. */}
            <AnswerInput
              key={turnSeq}
              active={true}
              micEnabled={micOn}
              onMicState={setListening}
              onSubmit={onAnswer}
              placeholder="Speak or type your answer…"
            />
            <div className="row center" style={{ marginTop: 10 }}>
              <button className="btn ghost" onClick={onContinue}>Skip / Continue ▶</button>
            </div>
          </div>
        )}

        {phase === 'error' && (
          <div className="row center" style={{ gap: 10 }}>
            <button className="btn" onClick={() => (sessionRef.current ? fetchTurn() : begin())}>Try again</button>
            <button className="btn ghost" onClick={() => navigate(kid ? `/learn/${kid.id}` : '/')}>Leave</button>
          </div>
        )}

        {phase === 'ended' && (
          <div className="card pad-lg" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
            <h2>Great work today! 🎉</h2>
            {report && <p className="muted">{report.summary}</p>}
            <div className="row center" style={{ gap: 10, marginTop: 14 }}>
              <button className="btn lg" onClick={() => navigate(kid ? `/learn/${kid.id}` : '/')}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

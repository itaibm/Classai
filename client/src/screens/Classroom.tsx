import { useEffect, useRef, useState } from 'react';
import type { Kid, Lesson, TeacherTurn, Interaction, Emotion, LessonReport } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { Character } from '../avatar/Character.tsx';
import { speak, type SpeakHandle } from '../voice/tts.ts';
import { listen, liveSttSupported, type ListenHandle } from '../voice/stt.ts';

type Phase = 'starting' | 'thinking' | 'speaking' | 'awaiting' | 'ended' | 'error';

const HD_KEY = 'classai_hd';
const MUTE_KEY = 'classai_mute';

export function Classroom({ lessonId }: { lessonId: string }) {
  const [kid, setKid] = useState<Kid | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [phase, setPhase] = useState<Phase>('starting');
  const [emotion, setEmotion] = useState<Emotion>('happy');
  const [mouthOpen, setMouthOpen] = useState(0);
  const [captions, setCaptions] = useState('');
  const [interaction, setInteraction] = useState<Interaction | null>(null);
  const [typed, setTyped] = useState('');
  const [recording, setRecording] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [report, setReport] = useState<LessonReport | null>(null);
  const [hd, setHd] = useState(localStorage.getItem(HD_KEY) === '1');
  const [muted, setMuted] = useState(localStorage.getItem(MUTE_KEY) === '1');

  const sessionRef = useRef<string>('');
  const speakRef = useRef<SpeakHandle | null>(null);
  const listenRef = useRef<ListenHandle | null>(null);
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
        const { sessionId } = await api.startLesson(lessonId);
        if (cancelled) return;
        sessionRef.current = sessionId;
        fetchTurn();
      } catch (e: any) {
        setErrMsg(e.message || 'Could not start the lesson.');
        setPhase('error');
      }
    })();
    return () => {
      cancelled = true;
      speakRef.current?.stop();
      listenRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  async function fetchTurn(response?: { text: string; via: 'choice' | 'type' | 'speak' | 'continue' }) {
    setInteraction(null);
    setPhase('thinking');
    setEmotion('thinking');
    setCaptions('');
    try {
      const { turn, ended } = await api.turn(sessionRef.current, response as any);
      present(turn, ended);
    } catch (e: any) {
      setErrMsg(e.message || 'The tutor had trouble responding.');
      setPhase('error');
    }
  }

  function present(turn: TeacherTurn, ended: boolean) {
    setEmotion(turn.emotion || 'neutral');
    setCaptions(turn.speech);
    const afterSpeech = () => {
      setMouthOpen(0);
      if (ended || turn.lessonComplete) finish();
      else {
        const it = turn.interaction;
        setInteraction(it.type === 'none' ? { type: 'continue', prompt: '' } : it);
        setTyped('');
        setPhase('awaiting');
      }
    };
    if (mutedRef.current) {
      setPhase('speaking');
      setTimeout(afterSpeech, Math.min(6000, 900 + turn.speech.length * 35));
      return;
    }
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
    try {
      const { session } = await api.session(sessionRef.current);
      setReport(session.report || null);
    } catch {
      /* report optional */
    }
  }

  // ---- answer handlers ----
  const answer = (text: string, via: 'choice' | 'type' | 'speak' | 'continue') => {
    speakRef.current?.stop();
    listenRef.current?.stop();
    setRecording(false);
    fetchTurn({ text, via });
  };

  function toggleRecord() {
    if (recording) {
      listenRef.current?.stop();
      setRecording(false);
      return;
    }
    setRecording(true);
    setTyped('');
    listenRef.current = listen({
      onPartial: (t) => setTyped(t),
      onFinal: (t) => setTyped(t),
      onEnd: () => setRecording(false),
      onError: () => setRecording(false)
    });
  }

  const hue = kid?.avatar.hue ?? 210;
  const speaking = phase === 'speaking';

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <div className="topbar">
        <div className="brand" onClick={() => navigate(kid ? `/learn/${kid.id}` : '/')}>
          ← Leave class
        </div>
        <div className="spacer" />
        <span className="muted small">{lesson?.title}</span>
        <button className="btn ghost small" onClick={() => { setMuted((m) => { localStorage.setItem(MUTE_KEY, m ? '0' : '1'); return !m; }); }}>
          {muted ? '🔇 Muted' : '🔊 Voice on'}
        </button>
        <button className="btn ghost small" onClick={() => { setHd((h) => { localStorage.setItem(HD_KEY, h ? '0' : '1'); return !h; }); }}>
          {hd ? '✨ HD voice' : 'HD voice off'}
        </button>
      </div>

      <div className="container">
        <div className="stage">
          {kid && (
            <Character character={kid.avatar.character} hue={hue} emotion={emotion} mouthOpen={mouthOpen} speaking={speaking} />
          )}
          <div className={`captions ${phase === 'thinking' ? 'thinking' : ''}`}>
            {phase === 'starting' && 'Getting ready…'}
            {phase === 'thinking' && 'thinking…'}
            {(phase === 'speaking' || phase === 'awaiting' || phase === 'ended') && captions}
            {phase === 'error' && <span className="muted">{errMsg}</span>}
          </div>
        </div>

        {phase === 'error' && (
          <div className="row center" style={{ gap: 10 }}>
            <button className="btn" onClick={() => fetchTurn()}>Try again</button>
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

        {phase === 'awaiting' && interaction && (
          <div className="interaction">
            {interaction.prompt && <p style={{ textAlign: 'center', fontWeight: 600 }}>{interaction.prompt}</p>}

            {interaction.type === 'choice' && interaction.choices && (
              <div className="choices">
                {interaction.choices.map((c, i) => (
                  <button key={i} className="choice" onClick={() => answer(c, 'choice')}>
                    {c}
                  </button>
                ))}
              </div>
            )}

            {interaction.type === 'type' && (
              <form
                className="answer-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (typed.trim()) answer(typed.trim(), 'type');
                }}
              >
                <input autoFocus type="text" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Type your answer…" />
                <button className="btn" type="submit" disabled={!typed.trim()}>Send</button>
              </form>
            )}

            {interaction.type === 'speak' && (
              <div className="col center" style={{ gap: 12 }}>
                <button className={`mic ${recording ? 'recording' : ''}`} onClick={toggleRecord} title="Hold a conversation out loud">
                  {recording ? '■' : '🎤'}
                </button>
                {typed && <p className="muted">“{typed}”</p>}
                <div className="row center" style={{ gap: 10 }}>
                  <button className="btn" disabled={!typed.trim()} onClick={() => answer(typed.trim(), 'speak')}>
                    Send answer
                  </button>
                  {!liveSttSupported() && <span className="muted small">Speaking isn’t supported here — type instead.</span>}
                </div>
                {!liveSttSupported() && (
                  <form className="answer-row" onSubmit={(e) => { e.preventDefault(); if (typed.trim()) answer(typed.trim(), 'speak'); }}>
                    <input type="text" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Type what you'd say…" />
                  </form>
                )}
              </div>
            )}

            {interaction.type === 'continue' && (
              <div className="row center">
                <button className="btn lg" onClick={() => answer('(continue)', 'continue')}>Continue ▶</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

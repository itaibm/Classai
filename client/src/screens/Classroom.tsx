import { useEffect, useRef, useState } from 'react';
import type { Kid, Lesson, TeacherTurn, Emotion, LessonReport, LessonBlock, BlockResult } from '@shared/types';
import { blockIsInteractive } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { Character } from '../avatar/Character.tsx';
import { BlockView } from '../blocks/BlockView.tsx';
import { speak, unlockAudio, type SpeakHandle } from '../voice/tts.ts';

type Phase = 'gate' | 'starting' | 'thinking' | 'speaking' | 'awaiting' | 'ended' | 'error';

const HD_KEY = 'classai_hd';
const MUTE_KEY = 'classai_mute';

export function Classroom({ lessonId }: { lessonId: string }) {
  const [kid, setKid] = useState<Kid | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [phase, setPhase] = useState<Phase>('gate');
  const [emotion, setEmotion] = useState<Emotion>('happy');
  const [mouthOpen, setMouthOpen] = useState(0);
  const [captions, setCaptions] = useState('');
  const [block, setBlock] = useState<LessonBlock | null>(null);
  const [errMsg, setErrMsg] = useState('');
  const [report, setReport] = useState<LessonReport | null>(null);
  const [beat, setBeat] = useState<{ index: number; total: number } | null>(null);
  const [hd, setHd] = useState(localStorage.getItem(HD_KEY) === '1');
  const [muted, setMuted] = useState(localStorage.getItem(MUTE_KEY) === '1');

  const sessionRef = useRef<string>('');
  const speakRef = useRef<SpeakHandle | null>(null);
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
    setBlock(null);
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
    const afterSpeech = () => {
      setMouthOpen(0);
      if (ended || turn.lessonComplete) finish();
      else setPhase('awaiting');
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

          {phase !== 'gate' && (
            <div className={`captions ${phase === 'thinking' ? 'thinking' : ''}`}>
              {phase === 'starting' && 'Getting ready…'}
              {phase === 'thinking' && 'thinking…'}
              {(phase === 'speaking' || phase === 'awaiting' || phase === 'ended') && captions}
              {phase === 'error' && <span className="muted">{errMsg}</span>}
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
            <BlockView key={`${beat?.index}-${block.type}`} block={block} active={phase === 'awaiting'} onComplete={onBlockComplete} />
          </div>
        )}

        {showContinue && (
          <div className="row center" style={{ marginTop: 16 }}>
            <button className="btn lg" onClick={onContinue}>Continue ▶</button>
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

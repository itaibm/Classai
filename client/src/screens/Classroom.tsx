import { useEffect, useRef, useState } from 'react';
import type { Kid, Lesson, TeacherTurn, Emotion, LessonStats, LessonBlock, BlockResult, HandoffCard } from '@shared/types';
import { blockIsInteractive } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { Character } from '../avatar/Character.tsx';
import { BlockView, AnswerInput } from '../blocks/BlockView.tsx';
import { ReadAloudContext, type ReadFn } from '../blocks/readAloud.tsx';
import { speak, unlockAudio, type SpeakHandle } from '../voice/tts.ts';
import { subjectStyle } from '../lib/subject.ts';

type Phase = 'gate' | 'starting' | 'thinking' | 'speaking' | 'awaiting' | 'ended' | 'error';

const HD_KEY = 'classai_hd';
const MUTE_KEY = 'classai_mute';
const MIC_KEY = 'classai_mic';
const HANDSFREE_KEY = 'classai_handsfree';

export function Classroom({ lessonId, kidId, catalogId }: { lessonId?: string; kidId: string; catalogId?: string }) {
  const [kid, setKid] = useState<Kid | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [startMsg, setStartMsg] = useState('Getting ready…');
  const catalogStatusRef = useRef<string>('');
  const [phase, setPhase] = useState<Phase>('gate');
  const [emotion, setEmotion] = useState<Emotion>('happy');
  const [mouthOpen, setMouthOpen] = useState(0);
  const [captions, setCaptions] = useState('');
  const [shown, setShown] = useState(''); // progressively-revealed portion of captions
  const [blocks, setBlocks] = useState<LessonBlock[]>([]);
  const [expectsAnswer, setExpectsAnswer] = useState(false); // this turn asks an open question
  const [autoAdvance, setAutoAdvance] = useState(true); // explanation turn flows on automatically
  const [continueLabel, setContinueLabel] = useState(''); // AI-chosen advance button text
  const [errMsg, setErrMsg] = useState('');
  const [stats, setStats] = useState<LessonStats | null>(null); // streak now; stars at the end
  const [reveal, setReveal] = useState(true); // false: a miss is marked wrong without showing the answer
  const [subjectKey, setSubjectKey] = useState<string>('');
  const [beat, setBeat] = useState<{ index: number; total: number } | null>(null);
  const [handoff, setHandoff] = useState<HandoffCard | null>(null); // parent-run beat card
  const [turnSeq, setTurnSeq] = useState(0); // unique per turn → forces a fresh block instance
  const [hd, setHd] = useState(localStorage.getItem(HD_KEY) === '1');
  const [muted, setMuted] = useState(localStorage.getItem(MUTE_KEY) === '1');
  const [micOn, setMicOn] = useState(localStorage.getItem(MIC_KEY) !== '0'); // default on
  // Hands-free talking: default ON for young learners (ages ≤ 8), who can't
  // manage tap-talk-tap-send. Resolved once the learner loads; toggle persists.
  const [handsFree, setHandsFree] = useState<boolean | null>(() => {
    const v = localStorage.getItem(HANDSFREE_KEY);
    return v === null ? null : v === '1';
  });
  const [theme, setTheme] = useState<string | undefined>(undefined); // today's theme, picked by the learner
  const [explicitAsk, setExplicitAsk] = useState(false); // the director marked this turn as awaiting a spoken answer
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
  const turnInFlightRef = useRef(false);
  const lastResponseRef = useRef<Parameters<typeof fetchTurn>[0]>(undefined);
  const hdRef = useRef(hd);
  mutedRef.current = muted;
  hdRef.current = hd;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { kid } = await api.kid(kidId);
        if (cancelled) return;
        setKid(kid);
        kidRef.current = kid;
        setHandsFree((h) => (h === null ? kid.age <= 8 : h));
        if (catalogId) {
          // Curriculum lesson — may be authored (ready) or outline (AI builds it on start).
          const { lesson: ref } = await api.catalogLesson(catalogId);
          if (cancelled) return;
          catalogStatusRef.current = ref.status;
          setSubjectKey(ref.subjectKey);
          setLesson({ id: ref.id, title: ref.title, topic: ref.unit?.title || ref.title, classId: '' } as Lesson);
        } else if (lessonId) {
          const { lesson } = await api.lesson(lessonId);
          if (cancelled) return;
          setLesson(lesson);
          api.classDetail(lesson.classId)
            .then(({ classDefinition }) => { if (!cancelled) setSubjectKey(classDefinition.subjectKey); })
            .catch(() => {});
        }
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
  }, [lessonId, kidId]);

  async function begin() {
    unlockAudio(); // must run inside the tap so audio can play
    setStartMsg(catalogId && catalogStatusRef.current === 'outline'
      ? 'Building your lesson with AI… this happens once, then it\'s saved.'
      : 'Getting ready…');
    setPhase('starting');
    try {
      const { sessionId } = catalogId
        ? await api.startCatalogLesson(catalogId, kidId, theme)
        : await api.startLesson(lessonId!, kidId, theme);
      sessionRef.current = sessionId;
      fetchTurn();
    } catch (e: any) {
      setErrMsg(e.message || 'Could not start the lesson.');
      setPhase('error');
    }
  }

  async function fetchTurn(response?: { text: string; via: 'block' | 'continue'; correct?: boolean; confused?: boolean }) {
    // One request at a time: an auto-advance timer racing a tap must not send two.
    if (turnInFlightRef.current) return;
    turnInFlightRef.current = true;
    lastResponseRef.current = response; // so "Try again" resends the kid's answer
    setPhase('thinking');
    setEmotion('thinking');
    setCaptions('');
    stopReveal();
    clearWatchdog();
    setShown('');
    setBlocks([]);
    setHandoff(null);
    setListening(false);
    try {
      const { turn, ended, beat, stats } = await api.turn(sessionRef.current, response as any);
      setBeat(beat);
      if (stats) setStats(stats);
      present(turn, ended);
    } catch (e: any) {
      setErrMsg(e.message || 'The tutor had trouble responding.');
      setEmotion('gentle');
      setPhase('error');
    } finally {
      turnInFlightRef.current = false;
    }
  }

  function present(turn: TeacherTurn, ended: boolean) {
    setEmotion(turn.emotion || 'neutral');
    // Parent handoff beat: show the full-screen card, do NOT run TTS, and wait
    // for the parent to tap resume. The session clock keeps running server-side;
    // no further AI call happens until they continue.
    if (turn.handoff) {
      stopReveal();
      clearWatchdog();
      setCaptions('');
      setShown('');
      setBlocks([]);
      setHandoff(turn.handoff);
      setMouthOpen(0);
      setPhase('awaiting');
      return;
    }
    setHandoff(null);
    setCaptions(turn.speech);
    setBlocks(turn.blocks ?? (turn.block ? [turn.block] : []));
    setReveal(turn.revealAnswer ?? true);
    // The turn expects a spoken/typed answer only if it says so, or its speech is
    // clearly a question. Otherwise it's an explanation — lead with Continue.
    setExplicitAsk(!!turn.awaitResponse);
    setExpectsAnswer(!!turn.awaitResponse || /\?\s*["'”’)\]]*\s*$/.test((turn.speech || '').trim()));
    // Auto-advance only pure-speech transitions by default; when there's a visual
    // to study (table/diagram/steps/slideshow) wait for the kid — unless the tutor
    // explicitly opts in/out via autoAdvance.
    const hasVisual = (turn.blocks ?? (turn.block ? [turn.block] : [])).length > 0;
    setAutoAdvance(turn.autoAdvance ?? !hasVisual);
    setContinueLabel((turn.continueLabel || '').trim());
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
    // Scale by the kid's speech rate: at a slower voice the real speech runs longer.
    const rate = Math.max(0.5, kidRef.current?.avatar.rate ?? 1);
    const cap = mutedRef.current
      ? Math.min(6000, 900 + turn.speech.length * 35) // muted: just finish the text reveal
      : Math.min(90000, (5000 + turn.speech.length * 90) / rate);
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
    setBlocks([]);
    // (The parent's progress report is written server-side and shown in the parent area.)
  }

  const onBlockComplete = (r: BlockResult) => {
    speakRef.current?.stop();
    fetchTurn({ text: r.text, via: 'block', correct: r.correct });
  };
  const onContinue = () => {
    speakRef.current?.stop();
    fetchTurn({ text: '(continue)', via: 'continue' });
  };
  // "I don't get it" — ask the tutor to re-explain the same idea a different way.
  const onConfused = () => {
    speakRef.current?.stop();
    fetchTurn({ text: "I don't get it yet — can you explain it a different way?", via: 'continue', confused: true });
  };
  // Free-text / spoken answer when the turn has no interactive block.
  const onAnswer = (t: string) => {
    speakRef.current?.stop();
    fetchTurn({ text: t, via: 'block' });
  };


  // Read a question + its options aloud on request (tapping 🔊 on a block).
  // Each part has its own watchdog: browser speech often never fires onend.
  const readAloud: ReadFn = (parts, onPart) => {
    speakRef.current?.stop();
    let i = 0;
    let stopped = false;
    let handle: SpeakHandle | null = null;
    let guard = 0;
    const next = () => {
      window.clearTimeout(guard);
      if (stopped) return;
      if (i >= parts.length) { onPart?.(-1); return; }
      const idx = i++;
      const text = parts[idx]!;
      onPart?.(idx);
      let advanced = false;
      const advance = () => { if (!advanced) { advanced = true; window.setTimeout(next, 250); } };
      const rate = Math.max(0.5, kidRef.current?.avatar.rate ?? 1);
      guard = window.setTimeout(advance, (1200 + text.length * 85) / rate);
      handle = speak({ text, hd: hdRef.current, rate, voice: hdRef.current ? 'af_heart' : kidRef.current?.avatar.voice, onEnd: advance });
    };
    next();
    return () => { stopped = true; window.clearTimeout(guard); handle?.stop(); onPart?.(-1); };
  };

  const hue = kid?.avatar.hue ?? 210;
  const speaking = phase === 'speaking';
  const interactiveIdx = blocks.findIndex((b) => blockIsInteractive(b));
  const interactive = interactiveIdx >= 0;
  const awaitingNoBlock = phase === 'awaiting' && !interactive && !handoff;
  const showAnswerBar = awaitingNoBlock && expectsAnswer;

  // Auto-advance an explanation turn after a short, length-scaled pause — but ONLY
  // when the tutor opted in (autoAdvance). After a key idea the tutor sets
  // autoAdvance=false so the kid actively confirms ("I got it!") before moving on.
  useEffect(() => {
    // Muted means the child is reading, and early readers need their own pace — never auto-advance then.
    if (!awaitingNoBlock || expectsAnswer || !autoAdvance || muted) return;
    const ms = Math.min(9000, Math.max(4000, 2500 + captions.length * 25));
    const t = window.setTimeout(() => onContinue(), ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awaitingNoBlock, expectsAnswer, autoAdvance, muted, turnSeq]);

  return (
    <ReadAloudContext.Provider value={readAloud}>
    <div className="app classroom" style={{ ['--accent-h' as any]: hue, ...subjectStyle(subjectKey) }}>
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
        <button
          className="btn ghost small"
          title="Hands-free: when the tutor asks you something, the mic listens and sends your answer by itself"
          onClick={() => setHandsFree((h) => { localStorage.setItem(HANDSFREE_KEY, h ? '0' : '1'); return !h; })}
        >
          {handsFree ? '🙌 Hands-free' : '👆 Tap to talk'}
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
              {kid && kid.interests.length > 0 && (
                <div className="col center" style={{ gap: 8 }}>
                  <span className="muted small">Pick today’s adventure:</span>
                  <div className="theme-chips">
                    {kid.interests.slice(0, 3).map((it) => (
                      <button key={it} type="button" className={`theme-chip${theme === it ? ' on' : ''}`} aria-pressed={theme === it} onClick={() => setTheme(theme === it ? undefined : it)}>
                        {it}
                      </button>
                    ))}
                    <button type="button" className={`theme-chip${!theme ? ' on' : ''}`} aria-pressed={!theme} onClick={() => setTheme(undefined)}>🎲 Surprise me</button>
                  </div>
                </div>
              )}
              <button className="btn lg" disabled={!lesson} onClick={begin}>▶ Start lesson</button>
              <span className="muted small">Your tutor will talk to you — make sure your sound is on.</span>
            </div>
          )}

          {(phase === 'starting' || phase === 'thinking') && (
            <div className="captions thinking">{phase === 'starting' ? startMsg : 'thinking…'}</div>
          )}
          {phase === 'error' && (
            <div className="captions">
              <span>Hmm, I got a little muddled there. Let’s try that again!</span>
              {/* technical detail for the grown-up, kept out of the child's way */}
              <details className="muted small"><summary>For grown-ups</summary>{errMsg}</details>
            </div>
          )}
          {(phase === 'speaking' || phase === 'awaiting' || phase === 'ended') && captions && (
            <div className="speech-bubble">
              {kid && <span className="speech-name">{kid.avatar.character.charAt(0).toUpperCase() + kid.avatar.character.slice(1)}</span>}
              <div>
                {shown}
                {phase === 'speaking' && shown.length < captions.length && <span className="caret">▌</span>}
              </div>
            </div>
          )}

          {beat && phase !== 'ended' && phase !== 'gate' && (
            <div className="row center" style={{ gap: 10 }}>
              <div className="beats" title={`Step ${beat.index + 1} of ${beat.total}`}>
                {Array.from({ length: beat.total }).map((_, i) => (
                  <span key={i} className={`dot ${i < beat.index ? 'done' : i === beat.index ? 'now' : ''}`} />
                ))}
              </div>
              {(stats?.streak ?? 0) >= 2 && (
                <span key={stats!.streak} className="streak-pill" aria-live="polite">🔥 {stats!.streak} in a row!</span>
              )}
            </div>
          )}
        </div>

        {handoff && phase !== 'ended' && (
          <div className="block-area">
            <div className="card pad-lg handoff-card" style={{ maxWidth: 620, margin: '0 auto' }}>
              <div className="row" style={{ gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 26 }}>🙋</span>
                <h3 style={{ margin: 0 }}>Grown-up moment</h3>
              </div>
              <p className="muted" style={{ marginTop: 6 }}>
                This part is hands-on — a parent or helper runs it with real materials. The tutor waits here.
              </p>

              {handoff.materials.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <strong>Have ready</strong>
                  <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
                    {handoff.materials.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>
              )}

              {handoff.setup && (
                <div style={{ marginTop: 12 }}>
                  <strong>Set up</strong>
                  <p style={{ margin: '6px 0 0' }}>{handoff.setup}</p>
                </div>
              )}

              {handoff.script && (
                <div style={{ marginTop: 12 }}>
                  <strong>Say it (your own words are fine — keep the numbers exact)</strong>
                  <blockquote style={{ margin: '6px 0 0', padding: '8px 12px', borderLeft: '3px solid var(--accent, #5b6cff)', whiteSpace: 'pre-wrap' }}>
                    {handoff.script}
                  </blockquote>
                </div>
              )}

              {handoff.notes.length > 0 && (
                <details style={{ marginTop: 12 }}>
                  <summary className="muted">Teaching notes</summary>
                  <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
                    {handoff.notes.map((n, i) => <li key={i} className="muted">{n}</li>)}
                  </ul>
                </details>
              )}

              {handoff.cueToResume && (
                <p className="muted small" style={{ marginTop: 12 }}>
                  ▸ Resume when: {handoff.cueToResume}
                </p>
              )}

              <div className="row center" style={{ marginTop: 16 }}>
                <button className="btn lg" onClick={onContinue}>{handoff.continueLabel || 'Continue ▶'}</button>
              </div>
            </div>
          </div>
        )}

        {/* the tool-belt block(s) for this turn — a display block to explain may be
            paired with an interactive block to check; render them stacked. */}
        {blocks.length > 0 && (phase === 'speaking' || phase === 'awaiting') && (
          <div className="block-area">
            {blocks.map((b, i) => {
              const isInteractive = i === interactiveIdx;
              return (
                <BlockView
                  key={`${turnSeq}-${i}`}
                  block={b}
                  active={isInteractive && phase === 'awaiting'}
                  onComplete={isInteractive ? onBlockComplete : () => {}}
                  micEnabled={isInteractive ? micOn : false}
                  onMicState={isInteractive ? setListening : () => {}}
                  reveal={reveal}
                  handsFree={!!handsFree && micOn}
                />
              );
            })}
          </div>
        )}

        {awaitingNoBlock && (
          <div className="block-area">
            {showAnswerBar ? (
              <>
                {/* This turn asked a question — let the kid answer. The mic opens by
                    itself only in hands-free mode on an explicit ask; otherwise on tap. */}
                <AnswerInput
                  key={turnSeq}
                  active={true}
                  micEnabled={micOn}
                  onMicState={setListening}
                  // Hands-free only when the director explicitly asked for an answer —
                  // never on a guessed "ends with ?" turn (the mic must not feel always-on).
                  handsFree={!!handsFree && micOn && explicitAsk}
                  onSubmit={onAnswer}
                  placeholder="Speak or type your answer…"
                />
                <div className="row center" style={{ marginTop: 10 }}>
                  <button className="btn ghost" onClick={onContinue}>Skip / Continue ▶</button>
                </div>
              </>
            ) : (
              /* Explanation turn — no question. The tutor decides whether the lesson
                 flows on automatically or waits for the kid to confirm ("I got it!"). */
              <div className="col center" style={{ gap: 8 }}>
                <div className="row center" style={{ gap: 10 }}>
                  <button className="btn lg" onClick={onContinue}>
                    {continueLabel || (autoAdvance ? 'Continue ▶' : 'I got it! ▶')}
                  </button>
                  <button className="btn ghost" onClick={onConfused}>🤔 I don’t get it</button>
                </div>
                {autoAdvance && !muted && <span className="muted small">continuing automatically…</span>}
              </div>
            )}
          </div>
        )}

        {phase === 'error' && (
          <div className="row center" style={{ gap: 10 }}>
            <button className="btn lg" onClick={() => (sessionRef.current ? fetchTurn(lastResponseRef.current) : begin())}>🔁 Try again</button>
            <button className="btn ghost" onClick={() => navigate(kid ? `/learn/${kid.id}` : '/')}>Leave</button>
          </div>
        )}

        {phase === 'ended' && (
          <>
            <Confetti />
            <div className="card pad-lg celebrate-card" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
              <div className="celebrate-emoji">🎉</div>
              <h2>Great work today!</h2>
              {stats?.stars && (
                <div className="stars" aria-label={`${stats.stars} of 3 stars`}>
                  {[1, 2, 3].map((n) => <span key={n} className={n <= stats.stars! ? 'star on' : 'star'}>★</span>)}
                </div>
              )}
              {lesson?.title && <p className="muted">You worked on <strong>{lesson.title}</strong>.</p>}
              {stats && stats.answered > 0 && (
                <p className="muted">
                  {stats.correct} right answer{stats.correct === 1 ? '' : 's'}
                  {stats.stars === 1 ? ' — this one’s tricky, so we’ll practise it again next time. That’s how brains grow! 🌱' : ' — you really worked for these!'}
                </p>
              )}
              <div className="row center" style={{ gap: 10, marginTop: 14 }}>
                <button className="btn lg" onClick={() => navigate(kid ? `/learn/${kid.id}` : '/')}>Done</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </ReadAloudContext.Provider>
  );
}

/** One-shot celebratory confetti burst (CSS-only, respects reduced-motion). */
function Confetti() {
  const colors = ['#5b6cff', '#1bb6a6', '#ff7a6b', '#e8a33a', '#9a6cff'];
  const pieces = Array.from({ length: 36 }).map((_, i) => {
    const left = (i * 137.5) % 100;
    const delay = (i % 9) * 0.06;
    const dur = 1.6 + ((i * 7) % 10) / 10;
    const color = colors[i % colors.length]!;
    const rot = (i * 53) % 360;
    return (
      <span
        key={i}
        className="confetti-piece"
        style={{ left: `${left}%`, background: color, animationDelay: `${delay}s`, animationDuration: `${dur}s`, ['--rot' as any]: `${rot}deg` }}
      />
    );
  });
  return <div className="confetti" aria-hidden>{pieces}</div>;
}

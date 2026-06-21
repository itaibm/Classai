/**
 * The lesson "tool belt" renderer. Maps a LessonBlock to a polished component.
 * Display blocks just render; interactive blocks capture the kid's response,
 * give instant animated feedback, and call onComplete with a BlockResult.
 */
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type {
  LessonBlock, BlockResult,
  RichTextBlock, StepsBlock, KeyTermBlock, NumberLineBlock, TableBlock, EmojiVizBlock,
  ImageBlock, VideoBlock, SlideshowBlock, FlashcardsBlock,
  MultipleChoiceBlock, MultiSelectBlock, TrueFalseBlock, FillBlankBlock, NumberEntryBlock, ShortTextBlock, SpeakBlock
} from '@shared/types';
import { startRecording, micSupported, type RecorderHandle } from '../voice/stt.ts';
import { useTurnComplete } from './useComplete.ts';
import { MatchPairs, Ordering, Categorize } from './Arrange.tsx';
import { CustomBlock } from './CustomBlock.tsx';
import { Whiteboard } from './Whiteboard.tsx';

type Done = (r: BlockResult) => void;

export function BlockView({ block, active, onComplete, micEnabled, onMicState }: { block: LessonBlock; active: boolean; onComplete: Done; micEnabled?: boolean; onMicState?: (listening: boolean) => void }) {
  switch (block.type) {
    case 'richText': return <RichText block={block} />;
    case 'steps': return <Steps block={block} />;
    case 'keyTerm': return <KeyTerm block={block} />;
    case 'numberLine': return <NumberLine block={block} />;
    case 'table': return <TableView block={block} />;
    case 'emojiViz': return <EmojiViz block={block} />;
    case 'image': return <ImageView block={block} />;
    case 'video': return <Video block={block} />;
    case 'slideshow': return <Slideshow block={block} />;
    case 'flashcards': return <Flashcards block={block} />;
    case 'whiteboard': return <Whiteboard block={block} />;
    case 'custom': return <CustomBlock block={block} active={active} onComplete={onComplete} />;
    case 'multipleChoice': return <Choice prompt={block.prompt} options={block.options} correct={[block.correct]} explain={block.explain} active={active} onComplete={onComplete} />;
    case 'trueFalse': return <Choice prompt={block.statement} options={['True', 'False']} correct={[block.correct ? 0 : 1]} explain={block.explain} active={active} onComplete={onComplete} />;
    case 'multiSelect': return <MultiSelect block={block} active={active} onComplete={onComplete} />;
    case 'fillBlank': return <FillBlank block={block} active={active} onComplete={onComplete} />;
    case 'numberEntry': return <NumberEntry block={block} active={active} onComplete={onComplete} />;
    case 'shortText': return <ShortText block={block} active={active} onComplete={onComplete} />;
    case 'speak': return <Speak block={block} active={active} onComplete={onComplete} micEnabled={micEnabled} onMicState={onMicState} />;
    case 'matchPairs': return <MatchPairs block={block} active={active} onComplete={onComplete} />;
    case 'ordering': return <Ordering block={block} active={active} onComplete={onComplete} />;
    case 'categorize': return <Categorize block={block} active={active} onComplete={onComplete} />;
    default: return null;
  }
}

// ============================ DISPLAY BLOCKS ===============================

function RichText({ block }: { block: RichTextBlock }) {
  return <div className="block-card richtext">{renderMarkdown(block.markdown)}</div>;
}

/** Tiny, safe markdown: **bold**, `- ` bullets, blank-line paragraphs. */
function renderMarkdown(md: string) {
  const lines = md.split('\n');
  const out: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (bullets.length) {
      out.push(<ul key={`u${out.length}`}>{bullets.map((b, i) => <li key={i}>{inline(b)}</li>)}</ul>);
      bullets = [];
    }
  };
  for (const ln of lines) {
    if (/^\s*[-*]\s+/.test(ln)) bullets.push(ln.replace(/^\s*[-*]\s+/, ''));
    else { flush(); if (ln.trim()) out.push(<p key={`p${out.length}`}>{inline(ln)}</p>); }
  }
  flush();
  return <>{out}</>;
}
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
    seg.startsWith('**') && seg.endsWith('**') ? <strong key={i}>{seg.slice(2, -2)}</strong> : <Fragment key={i}>{seg}</Fragment>
  );
}

function Steps({ block }: { block: StepsBlock }) {
  return (
    <div className="block-card">
      {block.title && <div className="board-title">{block.title}</div>}
      <ol className="steps">
        {block.steps.map((s, i) => (
          <li key={i} style={{ animationDelay: `${i * 0.5}s` }}>{inline(s)}</li>
        ))}
      </ol>
    </div>
  );
}

function KeyTerm({ block }: { block: KeyTermBlock }) {
  return (
    <div className="block-card keyterm">
      <div className="keyterm-term">{block.term}</div>
      <div className="keyterm-def">{block.definition}</div>
      {block.example && <div className="keyterm-ex">e.g. {block.example}</div>}
    </div>
  );
}

function NumberLine({ block }: { block: NumberLineBlock }) {
  const { min, max } = block;
  const span = max - min || 1;
  let step = block.step || niceStep(span);
  // a derived step on an integral range (e.g. an integers lesson) must never show decimal
  // ticks; an explicit block.step (e.g. 0.25 on a fractions line) is honored as-is
  if (!block.step && Number.isInteger(min) && Number.isInteger(max)) step = Math.max(1, Math.round(step));
  const start = Math.ceil((min - 1e-9) / step) * step; // ticks sit on the step grid, not offset from min
  const ticks: number[] = [];
  for (let v = start; v <= max + 1e-9; v += step) ticks.push(Math.round(v * 1000) / 1000);
  const x = (v: number) => 6 + ((v - min) / span) * 88; // percent
  return (
    <div className="block-card">
      <svg viewBox="0 0 100 26" width="100%" height="80" preserveAspectRatio="none" className="numline">
        <line x1="3" y1="13" x2="97" y2="13" stroke="var(--accent)" strokeWidth="0.6" />
        {ticks.map((v, i) => (
          <g key={i}>
            <line x1={x(v)} y1="10" x2={x(v)} y2="16" stroke="var(--accent)" strokeWidth="0.5" />
            <text x={x(v)} y="23" fontSize="3.4" textAnchor="middle" fill="var(--muted)">{v}</text>
          </g>
        ))}
        {block.marks?.map((m, i) => (
          <g key={`m${i}`}>
            <circle cx={x(m.value)} cy="13" r="1.6" fill="var(--accent)" />
            {m.label && <text x={x(m.value)} y="7" fontSize="3.4" textAnchor="middle" fill="var(--accent-ink)" fontWeight="700">{m.label}</text>}
          </g>
        ))}
        {block.highlight != null && <circle cx={x(block.highlight)} cy="13" r="2.4" fill="var(--bad)" />}
      </svg>
    </div>
  );
}
function niceStep(span: number) {
  const raw = span / 10;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const r = raw / p;
  return (r >= 7 ? 10 : r >= 3 ? 5 : r >= 1.5 ? 2 : 1) * p;
}

function TableView({ block }: { block: TableBlock }) {
  return (
    <div className="block-card">
      <table className="data-table">
        <thead><tr>{block.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{block.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
      {block.caption && <div className="muted small" style={{ textAlign: 'center', marginTop: 6 }}>{block.caption}</div>}
    </div>
  );
}

function EmojiViz({ block }: { block: EmojiVizBlock }) {
  return (
    <div className="block-card emoji-viz">
      <div className="emoji-row">{block.emojis}</div>
      {block.caption && <div className="muted">{block.caption}</div>}
    </div>
  );
}

function ImageView({ block }: { block: ImageBlock }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className="block-card muted" style={{ textAlign: 'center' }}>🖼️ {block.alt || block.caption || 'image'}</div>;
  return (
    <figure className="block-card" style={{ margin: 0, textAlign: 'center' }}>
      <img className="cu-image" src={block.src} alt={block.alt || ''} loading="lazy" referrerPolicy="no-referrer" onError={() => setOk(false)} />
      {block.caption && <figcaption className="muted small" style={{ marginTop: 6 }}>{block.caption}</figcaption>}
    </figure>
  );
}

/** Turn a YouTube/Vimeo/url into an embeddable src; null if unrecognized. */
function embedSrc(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  if (/^https:\/\/(www\.youtube\.com\/embed\/|player\.vimeo\.com\/)/.test(url)) return url;
  if (/^[\w-]{11}$/.test(url)) return `https://www.youtube.com/embed/${url}`; // bare YouTube id
  return null;
}

function Video({ block }: { block: VideoBlock }) {
  // The server resolves a video's search query into a real URL before it reaches
  // here; if there's still no usable URL, render nothing rather than a dead link.
  const src = block.url ? embedSrc(block.url) : null;
  if (!block.url) return null;
  return (
    <div className="block-card">
      {block.title && <div className="board-title">{block.title}</div>}
      {src ? (
        <div className="video-embed">
          <iframe src={src} title={block.title || 'video'} allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      ) : (
        <a className="btn" href={block.url} target="_blank" rel="noreferrer">▶ Open video</a>
      )}
      {block.caption && <div className="muted small" style={{ marginTop: 8 }}>{block.caption}</div>}
    </div>
  );
}

function Slideshow({ block }: { block: SlideshowBlock }) {
  const [i, setI] = useState(0);
  if (!block.slides.length) return null;
  const s = block.slides[Math.min(i, block.slides.length - 1)]!;
  return (
    <div className="block-card">
      {block.title && <div className="board-title">{block.title}</div>}
      <div className="slide" key={i}>
        {s.emoji && <div className="emoji-row" style={{ fontSize: '2.6rem' }}>{s.emoji}</div>}
        {s.imageUrl && <img className="cu-image" src={s.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />}
        {s.title && <h3 style={{ margin: '6px 0' }}>{s.title}</h3>}
        {s.body && <p style={{ fontSize: '1.05rem' }}>{s.body}</p>}
      </div>
      <div className="cu-steps-nav">
        <button className="btn ghost small" disabled={i === 0} onClick={() => setI(i - 1)}>◂ Back</button>
        <span className="beats">{block.slides.map((_, j) => <span key={j} className={`dot ${j === i ? 'now' : j < i ? 'done' : ''}`} />)}</span>
        <button className="btn small" disabled={i >= block.slides.length - 1} onClick={() => setI(i + 1)}>Next ▸</button>
      </div>
    </div>
  );
}

function Flashcards({ block }: { block: FlashcardsBlock }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setFlipped((f) => { const n = new Set(f); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div className="block-card">
      <div className="flashcards">
        {block.cards.map((c, i) => (
          <button key={i} className={`flashcard ${flipped.has(i) ? 'flipped' : ''}`} onClick={() => toggle(i)}>
            <span className="flashcard-inner">
              <span className="flashcard-face front">{c.front}</span>
              <span className="flashcard-face back">{c.back}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="muted small" style={{ textAlign: 'center', marginTop: 8 }}>Tap a card to flip it</div>
    </div>
  );
}

// ============================ INTERACTIVE BLOCKS ===========================

function Choice({ prompt, options, correct, explain, active, onComplete }:
  { prompt: string; options: string[]; correct: number[]; explain?: string; active: boolean; onComplete: Done }) {
  const [picked, setPicked] = useState<number | null>(null);
  const { complete } = useTurnComplete(onComplete);
  const correctIdx = correct[0]!;
  function pick(i: number) {
    if (!active || picked !== null) return;
    setPicked(i);
    const ok = i === correctIdx;
    complete({ text: `Chose “${options[i]}”${ok ? ' (correct)' : ` (incorrect — correct: “${options[correctIdx]}”)`}`, correct: ok }, ok ? 950 : 1600);
  }
  return (
    <div className="interaction">
      <p className="block-prompt">{prompt}</p>
      <div className="choices">
        {options.map((o, i) => {
          let cls = 'choice';
          if (picked !== null) {
            if (i === correctIdx) cls += ' reveal-correct';
            else if (i === picked) cls += ' reveal-wrong';
            else cls += ' dim';
          }
          return <button key={i} className={cls} disabled={!active || picked !== null} onClick={() => pick(i)}>{o}</button>;
        })}
      </div>
      {picked !== null && explain && <p className="explain">{explain}</p>}
    </div>
  );
}

function MultiSelect({ block, active, onComplete }: { block: MultiSelectBlock; active: boolean; onComplete: Done }) {
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const { complete } = useTurnComplete(onComplete);
  const correct = new Set(block.correct);
  function toggle(i: number) { if (!active || checked) return; const n = new Set(sel); n.has(i) ? n.delete(i) : n.add(i); setSel(n); }
  function check() {
    setChecked(true);
    const ok = sel.size === correct.size && [...sel].every((i) => correct.has(i));
    complete({ text: `Selected ${[...sel].map((i) => `“${block.options[i]}”`).join(', ') || 'nothing'} ${ok ? '(correct)' : '(not quite)'}`, correct: ok }, 1500);
  }
  return (
    <div className="interaction">
      <p className="block-prompt">{block.prompt} <span className="muted small">(pick all that apply)</span></p>
      <div className="choices">
        {block.options.map((o, i) => {
          let cls = 'choice ms';
          if (sel.has(i)) cls += ' sel';
          if (checked) { if (correct.has(i)) cls += ' reveal-correct'; else if (sel.has(i)) cls += ' reveal-wrong'; }
          return <button key={i} className={cls} disabled={!active || checked} onClick={() => toggle(i)}>{sel.has(i) ? '☑ ' : '☐ '}{o}</button>;
        })}
      </div>
      {!checked && <div className="row center" style={{ marginTop: 12 }}><button className="btn" disabled={!active} onClick={check}>Check</button></div>}
      {checked && block.explain && <p className="explain">{block.explain}</p>}
    </div>
  );
}

function FillBlank({ block, active, onComplete }: { block: FillBlankBlock; active: boolean; onComplete: Done }) {
  const [val, setVal] = useState('');
  const [checked, setChecked] = useState(false);
  const { complete } = useTurnComplete(onComplete);
  const [parts] = useState(() => block.text.split(/_{2,}|\[blank\]/i));
  function submit(v: string) {
    if (!active || checked || !v.trim()) return;
    setVal(v);
    setChecked(true);
    const ok = v.trim().toLowerCase() === block.answer.trim().toLowerCase();
    complete({ text: `Filled “${v}”${ok ? ' (correct)' : ` (incorrect — answer: “${block.answer}”)`}`, correct: ok }, ok ? 950 : 1500);
  }
  const ok = checked && val.trim().toLowerCase() === block.answer.trim().toLowerCase();
  return (
    <div className="interaction">
      <p className="block-prompt fill-text">
        {parts[0]}
        <span className={`blank ${checked ? (ok ? 'reveal-correct' : 'reveal-wrong') : ''}`}>{checked ? (ok ? val : block.answer) : (val || '_____')}</span>
        {parts.slice(1).join(' ')}
      </p>
      {!checked && block.wordBank && (
        <div className="chips center" style={{ justifyContent: 'center' }}>
          {block.wordBank.map((w) => <button key={w} className="chip-btn" disabled={!active} onClick={() => submit(w)}>{w}</button>)}
        </div>
      )}
      {!checked && !block.wordBank && (
        <form className="answer-row" onSubmit={(e) => { e.preventDefault(); submit(val); }}>
          <input autoFocus value={val} onChange={(e) => setVal(e.target.value)} placeholder="Type the missing word…" />
          <button className="btn" type="submit" disabled={!active || !val.trim()}>Check</button>
        </form>
      )}
    </div>
  );
}

function NumberEntry({ block, active, onComplete }: { block: NumberEntryBlock; active: boolean; onComplete: Done }) {
  const [val, setVal] = useState('');
  const [checked, setChecked] = useState(false);
  const { complete } = useTurnComplete(onComplete);
  const tol = block.tolerance ?? 0;
  const ok = checked && Math.abs(parseFloat(val) - block.answer) <= tol + 1e-9;
  function submit() {
    if (!active || checked || val.trim() === '') return;
    setChecked(true);
    const good = Math.abs(parseFloat(val) - block.answer) <= tol + 1e-9;
    complete({ text: `Answered ${val}${block.unit ? ' ' + block.unit : ''}${good ? ' (correct)' : ` (incorrect — answer: ${block.answer}${block.unit ? ' ' + block.unit : ''})`}`, correct: good }, good ? 950 : 1500);
  }
  return (
    <div className="interaction">
      <p className="block-prompt">{block.prompt}</p>
      <form className="answer-row" style={{ maxWidth: 320, margin: '0 auto' }} onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <input autoFocus type="number" step="any" value={val} disabled={!active || checked}
          className={checked ? (ok ? 'ok-input' : 'bad-input') : ''}
          onChange={(e) => setVal(e.target.value)} placeholder="?" />
        {block.unit && <span className="unit">{block.unit}</span>}
        {!checked && <button className="btn" type="submit" disabled={!active || val.trim() === ''}>Check</button>}
      </form>
    </div>
  );
}

function ShortText({ block, active, onComplete }: { block: ShortTextBlock; active: boolean; onComplete: Done }) {
  const [val, setVal] = useState('');
  return (
    <div className="interaction">
      <p className="block-prompt">{block.prompt}</p>
      <form onSubmit={(e) => { e.preventDefault(); if (val.trim()) onComplete({ text: val.trim() }); }}>
        <textarea autoFocus value={val} disabled={!active} onChange={(e) => setVal(e.target.value)} placeholder="Write your answer…" />
        <div className="row center" style={{ marginTop: 8 }}><button className="btn" type="submit" disabled={!active || !val.trim()}>Send</button></div>
      </form>
    </div>
  );
}

/** Reusable mic + typing answer input. Used by the Speak block AND by the
 *  Classroom's always-available answer bar, so the kid can always respond when
 *  the tutor is waiting — even on turns that carry no interactive block. */
export function AnswerInput({ active, micEnabled, onMicState, onSubmit, placeholder = 'Type your answer…', autoMic = false }: {
  active: boolean; micEnabled?: boolean; onMicState?: (listening: boolean) => void;
  onSubmit: (text: string) => void; placeholder?: string;
  autoMic?: boolean; // open the mic automatically (only for a deliberate "say it aloud" task)
}) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'recording' | 'transcribing'>('idle');
  const [level, setLevel] = useState(0); // live mic loudness 0..1 while recording
  const [error, setError] = useState('');
  const [, setFails] = useState(0);
  const [typeMode, setTypeMode] = useState(false); // user chose to type (or after 2 misses)
  const recRef = useRef<RecorderHandle | null>(null);
  const autoStartedRef = useRef(false); // open the mic once per turn, don't re-grab after the user stops

  // The mic is usable only on a secure origin AND when not switched off globally.
  const micAvailable = micSupported() && micEnabled !== false;
  const showTyping = !micAvailable || typeMode;

  // Tell the Classroom top bar whether we're actively listening.
  useEffect(() => { onMicState?.(status === 'recording'); }, [status, onMicState]);
  useEffect(() => () => onMicState?.(false), [onMicState]); // clear on unmount (turn change)
  // Open the mic automatically ONLY for a deliberate speaking task (autoMic).
  // Otherwise the mic stays off until the kid taps it — never "default on" after
  // an explanation turn. Once per turn: if they stop it, we don't re-grab.
  useEffect(() => {
    if (!autoMic || autoStartedRef.current) return;
    if (active && micAvailable && status === 'idle' && !typeMode && !text && !error) {
      autoStartedRef.current = true;
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMic, active, micAvailable, status, typeMode]);
  // If the mic is switched off mid-recording, stop cleanly.
  useEffect(() => {
    if (!micAvailable && (status === 'recording' || recRef.current)) {
      recRef.current?.cancel();
      recRef.current = null;
      setLevel(0);
      setStatus('idle');
    }
  }, [micAvailable, status]);

  function registerFail(msg: string) {
    setError(msg);
    setFails((n) => {
      const next = n + 1;
      if (next >= 2) setTypeMode(true);
      return next;
    });
  }

  async function start() {
    if (!active) return;
    setError(''); setText('');
    try {
      recRef.current = await startRecording({ onLevel: setLevel });
      setStatus('recording');
    } catch (e: any) {
      const denied = /denied|not ?allowed|permission/i.test(e?.message || '');
      registerFail(
        denied
          ? 'Microphone is blocked. Allow mic access for this site (macOS System Settings → Privacy → Microphone), or type your answer.'
          : 'Could not start the microphone. Type your answer instead.'
      );
      setStatus('idle');
    }
  }

  async function stop() {
    const handle = recRef.current;
    recRef.current = null;
    setLevel(0);
    if (!handle) { setStatus('idle'); return; }
    setStatus('transcribing');
    try {
      const said = await handle.stop();
      setStatus('idle');
      if (said.trim()) setText(said.trim());
      else registerFail("I didn't catch that — try again, or type your answer.");
    } catch {
      setStatus('idle');
      registerFail("I couldn't process the audio — type your answer instead.");
    }
  }

  function toggle() {
    if (status === 'recording') stop();
    else if (status === 'idle') start();
  }

  function switchToTyping() {
    recRef.current?.cancel();
    recRef.current = null;
    setLevel(0);
    setStatus('idle');
    setTypeMode(true);
    setError('');
  }
  const submit = () => { if (text.trim()) onSubmit(text.trim()); };

  return (
    <div className="interaction col center" style={{ gap: 12 }}>
      {!showTyping && (
        <>
          <button
            className={`mic ${status === 'recording' ? 'recording' : ''}`}
            disabled={!active || status === 'transcribing'}
            onClick={toggle}
            aria-label={status === 'recording' ? 'Stop recording' : 'Start recording'}
            // halo grows with your actual voice level — visible proof it's hearing you
            style={status === 'recording' ? { boxShadow: `0 0 0 ${6 + level * 28}px var(--accent-soft)` } : undefined}
          >
            {status === 'recording' ? '■' : status === 'transcribing' ? '…' : '🎤'}
          </button>

          {status === 'recording' && (
            <>
              <div className="mic-meter" aria-hidden="true">
                {[0.6, 1, 0.78, 1, 0.6].map((m, i) => (
                  <span key={i} style={{ transform: `scaleY(${Math.max(0.12, Math.min(1, level * m * 1.6))})` }} />
                ))}
              </div>
              <span className="listening-label"><span className="rec-dot" /> Listening… tap to stop</span>
            </>
          )}
          {status === 'transcribing' && <span className="muted small">Transcribing… (first time downloads a small voice model)</span>}
          {status === 'idle' && !text && !error && <span className="muted small">Tap the mic to speak your answer, then tap it again when you're done.</span>}
        </>
      )}

      {error && <p className="muted small" style={{ color: '#c0392b' }}>{error}</p>}
      {text && <p className="muted">“{text}”</p>}

      {showTyping && (
        <form className="answer-row" style={{ width: '100%' }} onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <input autoFocus value={text} disabled={!active} onChange={(e) => setText(e.target.value)} placeholder={placeholder} />
        </form>
      )}

      <div className="row center" style={{ gap: 10 }}>
        <button className="btn" disabled={!active || !text.trim()} onClick={submit}>Send</button>
        {micAvailable && !typeMode && (
          <button className="btn ghost small" type="button" disabled={!active} onClick={switchToTyping}>Type instead</button>
        )}
        {micAvailable && typeMode && (
          <button className="btn ghost small" type="button" disabled={!active} onClick={() => { setTypeMode(false); setError(''); }}>Use mic</button>
        )}
      </div>

      {showTyping && !micSupported() && (
        <span className="muted small">
          The mic needs the app opened at <strong>http://localhost:8787</strong> (not a 192.168.x.x address).
        </span>
      )}
    </div>
  );
}

function Speak({ block, active, onComplete, micEnabled, onMicState }: { block: SpeakBlock; active: boolean; onComplete: Done; micEnabled?: boolean; onMicState?: (listening: boolean) => void }) {
  return (
    <div className="col center" style={{ gap: 12 }}>
      <p className="block-prompt" style={{ textAlign: 'center' }}>{block.prompt}</p>
      {block.target && <div className="board-title" style={{ textAlign: 'center' }}>{block.target}</div>}
      <AnswerInput
        active={active}
        micEnabled={micEnabled}
        onMicState={onMicState}
        autoMic
        onSubmit={(t) => onComplete({ text: `Said: “${t}”` })}
      />
    </div>
  );
}

/**
 * Renderer for AI-composed "custom" blocks. It interprets the safe CustomNode
 * tree using the app's design system — there is no HTML/JS execution, only a
 * fixed set of primitives, so anything the AI builds stays on-brand and safe.
 */
import { useState } from 'react';
import type { CustomBlock as CustomBlockT, CustomNode, BlockResult } from '@shared/types';
import { speak } from '../voice/tts.ts';
import { useTurnComplete } from './useComplete.ts';

interface Ctx { active: boolean; onComplete: (r: BlockResult) => void; }

export function CustomBlock({ block, active, onComplete }: { block: CustomBlockT; active: boolean; onComplete: (r: BlockResult) => void }) {
  return (
    <div className="block-card">
      {block.title && <div className="board-title">{block.title}</div>}
      <Node node={block.root} ctx={{ active, onComplete }} />
    </div>
  );
}

const animClass = (a?: string) => (a && a !== 'none' ? `anim-${a}` : '');
const sizeClass = (s?: string) => (s ? `sz-${s}` : '');

function Node({ node, ctx }: { node: CustomNode; ctx: Ctx }) {
  switch (node.t) {
    case 'col':
    case 'row':
    case 'card':
    case 'grid': {
      const cls = node.t === 'card' ? 'cu-card' : node.t === 'grid' ? 'cu-grid' : `cu-${node.t}`;
      const style = node.t === 'grid' ? { gridTemplateColumns: `repeat(${node.cols || 2}, 1fr)` } : undefined;
      return (
        <div className={`${cls} ${animClass(node.anim)}`} style={style}>
          {node.children.map((c, i) => <Node key={i} node={c} ctx={ctx} />)}
        </div>
      );
    }
    case 'text':
      return (
        <div className={`cu-text ${sizeClass(node.size)} ${animClass(node.anim)}`}
          style={{ fontWeight: node.bold ? 800 : undefined, textAlign: node.align, color: node.color ? `var(--cu-${node.color})` : undefined }}>
          {node.value}
        </div>
      );
    case 'emoji':
      return <div className={`cu-emoji ${sizeClass(node.size)} ${animClass(node.anim)}`}>{node.value}</div>;
    case 'image':
      return <img className={`cu-image ${animClass(node.anim)}`} src={node.src} alt={node.alt || ''} loading="lazy" referrerPolicy="no-referrer" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />;
    case 'badge':
      return <span className="pill" style={{ background: 'var(--accent-soft)', color: node.color ? `var(--cu-${node.color})` : 'var(--accent-ink)' }}>{node.value}</span>;
    case 'divider':
      return <hr className="cu-divider" />;
    case 'spacer':
      return <div style={{ height: 12 }} />;
    case 'reveal':
      return <Reveal node={node} ctx={ctx} />;
    case 'steps':
      return <Steps node={node} ctx={ctx} />;
    case 'button':
      return (
        <button
          className="btn"
          disabled={!ctx.active}
          onClick={() => {
            if (node.action === 'speak') speak({ text: node.say || node.label });
            else if (node.action === 'continue') ctx.onComplete({ text: '(continue)' });
            else ctx.onComplete({ text: 'Done', correct: node.correct });
          }}
        >
          {node.label}
        </button>
      );
    case 'choice':
      return <InlineChoice node={node} ctx={ctx} />;
    default:
      return null;
  }
}

function Reveal({ node, ctx }: { node: Extract<CustomNode, { t: 'reveal' }>; ctx: Ctx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cu-reveal">
      <button className="cu-reveal-btn" onClick={() => setOpen((o) => !o)}>
        <span>{node.label}</span> <span className="cu-reveal-caret">{open ? '▾' : '▸'}</span>
      </button>
      {open && <div className="cu-reveal-body">{node.children.map((c, i) => <Node key={i} node={c} ctx={ctx} />)}</div>}
    </div>
  );
}

function Steps({ node, ctx }: { node: Extract<CustomNode, { t: 'steps' }>; ctx: Ctx }) {
  const [i, setI] = useState(0);
  const slide = node.slides[i] || [];
  return (
    <div className="cu-steps">
      <div className="cu-steps-body" key={i}>{slide.map((c, j) => <Node key={j} node={c} ctx={ctx} />)}</div>
      <div className="cu-steps-nav">
        <button className="btn ghost small" disabled={i === 0} onClick={() => setI(i - 1)}>◂ Back</button>
        <span className="beats">{node.slides.map((_, j) => <span key={j} className={`dot ${j === i ? 'now' : j < i ? 'done' : ''}`} />)}</span>
        <button className="btn small" disabled={i >= node.slides.length - 1} onClick={() => setI(i + 1)}>Next ▸</button>
      </div>
    </div>
  );
}

function InlineChoice({ node, ctx }: { node: Extract<CustomNode, { t: 'choice' }>; ctx: Ctx }) {
  const [picked, setPicked] = useState<number | null>(null);
  const { complete } = useTurnComplete(ctx.onComplete);
  function pick(k: number) {
    if (!ctx.active || picked !== null) return;
    setPicked(k);
    const ok = k === node.correct;
    complete({ text: `Chose “${node.options[k]}”${ok ? ' (correct)' : ` (incorrect — correct: “${node.options[node.correct]}”)`}`, correct: ok }, ok ? 950 : 1500);
  }
  return (
    <div>
      {node.prompt && <p className="block-prompt">{node.prompt}</p>}
      <div className="choices">
        {node.options.map((o, k) => {
          let cls = 'choice';
          if (picked !== null) cls += k === node.correct ? ' reveal-correct' : k === picked ? ' reveal-wrong' : ' dim';
          return <button key={k} className={cls} disabled={!ctx.active || picked !== null} onClick={() => pick(k)}>{o}</button>;
        })}
      </div>
    </div>
  );
}

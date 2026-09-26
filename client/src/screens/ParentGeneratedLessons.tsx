import { useState } from 'react';
import type { GeneratedLessonSummary, LessonBlock, LessonFull, PracticeItem, WrongAnswer } from '@shared/types';
import { yearLabel } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, Toast, useAsync, useToast } from '../lib/ui.tsx';

/**
 * Parent review of AI-generated lessons. When a learner starts a lesson that
 * only has an outline, the AI builds it and saves it as a draft in the data
 * folder. The child can play it straight away; here a parent reads it and
 * approves it, discards it (rebuilt next time) or asks for a fresh version.
 */
export function ParentGeneratedLessons() {
  const { data, loading, error, reload } = useAsync(() => api.generatedLessons());
  const [openId, setOpenId] = useState<string | null>(null);
  const toast = useToast();
  const drafts = data?.lessons.filter((l) => l.status === 'draft').length ?? 0;

  return (
    <div className="app">
      <TopBar />
      <div className="container wide">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h1>Review AI-built lessons</h1>
            <p className="muted" style={{ marginTop: -6 }}>
              Lessons the AI built from the curriculum outline the first time your child opened them. They
              are playable straight away; read them here and approve, discard, or ask for a new version.
            </p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn ghost small" onClick={reload}>↻ Refresh</button>
            <button className="btn ghost" onClick={() => navigate('/parent')}>← Parent area</button>
          </div>
        </div>

        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}

        {data && data.lessons.length === 0 && (
          <div className="card pad-lg center">
            <p className="muted">
              No AI-built lessons yet. When your child starts a lesson that isn’t hand-built, the AI prepares
              it and it appears here for review.
            </p>
          </div>
        )}

        {data && data.lessons.length > 0 && (
          <>
            <p className="muted small">
              {data.lessons.length} AI-built lesson{data.lessons.length === 1 ? '' : 's'} · {drafts} awaiting review
            </p>
            <div className="col" style={{ gap: 10 }}>
              {data.lessons.map((l) => (
                <GeneratedCard
                  key={l.id}
                  summary={l}
                  open={openId === l.id}
                  onToggle={() => setOpenId((o) => (o === l.id ? null : l.id))}
                  onChanged={(msg) => {
                    toast.show(msg);
                    reload();
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Toast msg={toast.msg} />
    </div>
  );
}

function when(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

function GeneratedCard({
  summary: s,
  open,
  onToggle,
  onChanged
}: {
  summary: GeneratedLessonSummary;
  open: boolean;
  onToggle: () => void;
  onChanged: (msg: string) => void;
}) {
  const [busy, setBusy] = useState<'' | 'approve' | 'discard' | 'regenerate'>('');
  const [actionError, setActionError] = useState('');

  async function act(kind: 'approve' | 'discard' | 'regenerate') {
    if (kind === 'discard' && !window.confirm(`Discard “${s.title}”? It will be rebuilt by the AI the next time it is started.`)) return;
    setBusy(kind);
    setActionError('');
    try {
      if (kind === 'approve') await api.approveGeneratedLesson(s.id);
      if (kind === 'discard') await api.discardGeneratedLesson(s.id);
      if (kind === 'regenerate') await api.regenerateLesson(s.id);
      onChanged(kind === 'approve' ? 'Lesson approved' : kind === 'discard' ? 'Lesson discarded' : 'New version built — please review it');
    } catch (e) {
      setActionError((e as Error).message || 'Something went wrong');
    } finally {
      setBusy('');
    }
  }

  return (
    <div className="card" style={{ padding: 0 }}>
      <button
        onClick={onToggle}
        style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', boxSizing: 'border-box', padding: '12px 14px' }}
        aria-expanded={open}
      >
        <div className="row" style={{ alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <strong>{s.title}</strong>
          <span className={`pill ${s.status === 'approved' ? 'good' : 'warn'}`}>
            {s.status === 'approved' ? '✓ Approved' : '✎ Draft'}
          </span>
          {s.shadowed && <span className="pill neutral" title="A hand-built lesson with the same id exists and is used instead">Superseded</span>}
          <div style={{ flex: 1 }} />
          <span className="muted">{open ? '▾' : '▸'}</span>
        </div>
        <div className="muted small" style={{ marginTop: 4 }}>
          {yearLabel(s.year)} · {s.subjectLabel} · Unit {s.unitNumber}{s.unitTitle ? `: ${s.unitTitle}` : ''} · Lesson {s.lessonNumber}
          {s.generatedAt && <> · built {when(s.generatedAt)}</>}
          {s.generatedBy && <> by {s.generatedBy}</>}
          {s.reviewedAt && <> · approved {when(s.reviewedAt)}</>}
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 14px 14px' }}>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap', margin: '4px 0 10px' }}>
            {s.status !== 'approved' && (
              <button className="btn small" disabled={!!busy} onClick={() => act('approve')}>
                {busy === 'approve' ? 'Approving…' : '✓ Approve'}
              </button>
            )}
            <button className="btn soft small" disabled={!!busy} onClick={() => act('regenerate')}>
              {busy === 'regenerate' ? 'Building a new version… (can take a minute)' : '↻ Regenerate'}
            </button>
            <button className="btn danger small" disabled={!!busy} onClick={() => act('discard')}>
              {busy === 'discard' ? 'Discarding…' : '🗑 Discard'}
            </button>
          </div>
          {actionError && <ErrorNote error={actionError} />}
          <LessonPreview id={s.id} version={`${s.generatedAt}|${s.status}`} />
        </div>
      )}
    </div>
  );
}

// ---- readable preview --------------------------------------------------------

const sectionTitle: React.CSSProperties = { fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3, marginTop: 14 };

function LessonPreview({ id, version }: { id: string; version: string }) {
  const { data, loading, error, reload } = useAsync(() => api.generatedLesson(id), [id, version]);
  if (loading) return <Loading label="Loading lesson…" />;
  if (error) return <ErrorNote error={error} onRetry={reload} />;
  if (!data) return null;
  const l: LessonFull = data.lesson;
  const byLevel = ([1, 2, 3] as const).map((lvl) => ({ lvl, items: l.practiceBank.filter((p) => p.level === lvl) }));

  return (
    <div>
      <div className="muted small" style={sectionTitle}>Objectives</div>
      <ul style={{ margin: '4px 0' }}>
        {l.objectives.map((o, i) => <li key={i}>{o}</li>)}
      </ul>
      <div className="muted small">
        {l.durationMin} min · delivery: {l.delivery.mode.replace(/_/g, ' ')}
        {l.materials.human.length > 0 && <> · materials: {l.materials.human.join(', ')}</>}
      </div>

      {l.vocabulary.length > 0 && (
        <>
          <div className="muted small" style={sectionTitle}>Vocabulary</div>
          <ul style={{ margin: '4px 0' }}>
            {l.vocabulary.map((v, i) => <li key={i}><strong>{v.term}</strong> — {v.definition}</li>)}
          </ul>
        </>
      )}

      <div className="muted small" style={sectionTitle}>Lesson plan ({l.plan.length} steps)</div>
      <ol style={{ margin: '4px 0', paddingLeft: 20 }}>
        {l.plan.map((b, i) => (
          <li key={i} style={{ marginBottom: 10 }}>
            <div className="row" style={{ gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="pill neutral">{b.kind}</span>
              {b.delivery !== 'ai' && <span className="pill warn">{b.delivery === 'human' ? '🧑‍🏫 grown-up' : '🎬 video'}</span>}
              {b.timeboxMin && <span className="muted small">{b.timeboxMin[0]}–{b.timeboxMin[1]} min</span>}
              <strong>{b.goal}</strong>
            </div>
            {b.script?.say && <div style={{ marginTop: 4 }}>🗣 “{b.script.say}”</div>}
            {(b.blocks || []).map((bl, j) => <div key={j} className="small" style={{ marginTop: 3 }}>▸ {summariseBlock(bl)}</div>)}
            {b.check && (
              <div className="small" style={{ marginTop: 4 }}>
                <strong>Check:</strong> {b.check.question} → <em>{b.check.expectedAnswer || '(open answer)'}</em>
                <WrongAnswers list={b.check.wrongAnswers} />
              </div>
            )}
            {b.humanHandoff && <div className="small muted" style={{ marginTop: 3 }}>Grown-up: {b.humanHandoff.setup} (hand back: {b.humanHandoff.cueToResume})</div>}
          </li>
        ))}
      </ol>

      <div className="muted small" style={sectionTitle}>Practice bank ({l.practiceBank.length} items)</div>
      {byLevel.map(({ lvl, items }) => (
        <div key={lvl} style={{ marginTop: 6 }}>
          <div className="small"><strong>Level {lvl} {lvl === 1 ? '(support)' : lvl === 2 ? '(core)' : '(stretch)'}</strong> — {items.length} item{items.length === 1 ? '' : 's'}{items.length < 3 && <span className="pill warn" style={{ marginLeft: 6 }}>thin</span>}</div>
          <ul style={{ margin: '2px 0', paddingLeft: 20 }}>
            {items.map((p) => <PracticeRow key={p.id} item={p} />)}
          </ul>
        </div>
      ))}

      {(l.differentiation.support || l.differentiation.stretch) && (
        <>
          <div className="muted small" style={sectionTitle}>Differentiation</div>
          {l.differentiation.support && <div className="small">Support: {l.differentiation.support}</div>}
          {l.differentiation.stretch && <div className="small">Stretch: {l.differentiation.stretch}</div>}
        </>
      )}
      {l.assessmentEvidence && (
        <>
          <div className="muted small" style={sectionTitle}>Evidence of learning</div>
          <div className="small">{l.assessmentEvidence}</div>
        </>
      )}
    </div>
  );
}

function PracticeRow({ item: p }: { item: PracticeItem }) {
  return (
    <li className="small" style={{ marginBottom: 6 }}>
      <span className="muted">[{p.skill}]</span> {summariseBlock(p.block)}
      <div>Answer: <strong>{p.expectedAnswer || '(open answer — tutor judges)'}</strong></div>
      <WrongAnswers list={p.wrongAnswers} />
      {p.hints.length > 0 && <div className="muted">Hints: {p.hints.join(' → ')}</div>}
    </li>
  );
}

function WrongAnswers({ list }: { list: WrongAnswer[] }) {
  if (!list.length) return <div className="muted small">No anticipated wrong answers.</div>;
  return (
    <ul style={{ margin: '2px 0', paddingLeft: 18 }}>
      {list.map((w, i) => (
        <li key={i} className="muted small">
          ✗ “{w.answer}”{w.why && <> — {w.why}</>}{w.remedy && <> · fix: {w.remedy}</>}
        </li>
      ))}
    </ul>
  );
}

/** One readable line for any block (what the child sees / is asked). */
function summariseBlock(b: LessonBlock): string {
  switch (b.type) {
    case 'richText': return `Text: ${b.markdown.replace(/\s+/g, ' ').slice(0, 160)}`;
    case 'steps': return `Steps${b.title ? ` “${b.title}”` : ''}: ${b.steps.join(' · ')}`;
    case 'keyTerm': return `Key term: ${b.term} — ${b.definition}`;
    case 'numberLine': return `Number line ${b.min}–${b.max}`;
    case 'table': return `Table: ${b.headers.join(' | ')} (${b.rows.length} rows)`;
    case 'emojiViz': return `Picture: ${b.emojis}${b.caption ? ` — ${b.caption}` : ''}`;
    case 'image': return `Image: ${b.alt || b.caption || b.src}`;
    case 'video': return `Video: ${b.title || b.query || b.url || ''}`;
    case 'slideshow': return `Slideshow${b.title ? ` “${b.title}”` : ''}: ${b.slides.map((s) => s.title || s.body || '').join(' · ')}`;
    case 'flashcards': return `Flashcards: ${b.cards.map((c) => `${c.front} / ${c.back}`).join(' · ')}`;
    case 'whiteboard': return `Whiteboard drawing${b.title ? ` “${b.title}”` : ''} (${b.elements.length} parts)`;
    case 'custom': return `Custom activity${b.title ? ` “${b.title}”` : ''}`;
    case 'multipleChoice': return `Multiple choice: ${b.prompt} [${b.options.map((o, i) => (i === b.correct ? `✓${o}` : o)).join(' / ')}]`;
    case 'multiSelect': return `Pick all: ${b.prompt} [${b.options.map((o, i) => (b.correct.includes(i) ? `✓${o}` : o)).join(' / ')}]`;
    case 'trueFalse': return `True/false: ${b.statement} (${b.correct ? 'true' : 'false'})`;
    case 'fillBlank': return `Fill the blank: ${b.text} (${b.answer})`;
    case 'matchPairs': return `Match: ${b.pairs.map((p) => `${p.left} ↔ ${p.right}`).join(' · ')}`;
    case 'ordering': return `Put in order: ${b.items.join(' → ')}`;
    case 'categorize': return `Sort into ${b.buckets.join(' / ')}: ${b.items.map((i) => `${i.text}→${i.bucket}`).join(' · ')}`;
    case 'numberEntry': return `Number: ${b.prompt} (${b.answer}${b.unit ? ` ${b.unit}` : ''})`;
    case 'shortText': return `Written answer: ${b.prompt}`;
    case 'speak': return `Say it: ${b.prompt}`;
    default: return `Block: ${(b as { type?: string }).type ?? 'unknown'}`;
  }
}

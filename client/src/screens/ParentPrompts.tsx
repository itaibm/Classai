import { useState } from 'react';
import type { PromptLogEntry, PromptTemplate } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync } from '../lib/ui.tsx';

type Tab = 'live' | 'templates';

export function ParentPrompts() {
  const { data, loading, error, reload } = useAsync(() => api.promptInspector());
  const [tab, setTab] = useState<Tab>('live');
  const [clearing, setClearing] = useState(false);

  async function clearLog() {
    setClearing(true);
    try {
      await api.clearPromptLog();
      await reload();
    } finally {
      setClearing(false);
    }
  }

  return (
    <div className="app">
      <TopBar />
      <div className="container wide">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>AI prompt monitor</h1>
            <p className="muted" style={{ marginTop: -6 }}>
              See exactly what Classai tells the AI — the templates it uses, and a live log of the real
              prompts sent during your child’s sessions.
            </p>
          </div>
          <button className="btn ghost" onClick={() => navigate('/parent')}>← Parent area</button>
        </div>

        <div className="row" style={{ gap: 8, margin: '8px 0 16px' }}>
          <button className={`btn ${tab === 'live' ? '' : 'ghost'} small`} onClick={() => setTab('live')}>
            Live activity{data ? ` (${data.log.length})` : ''}
          </button>
          <button className={`btn ${tab === 'templates' ? '' : 'ghost'} small`} onClick={() => setTab('templates')}>
            Prompt templates{data ? ` (${data.templates.length})` : ''}
          </button>
          <div className="spacer" style={{ flex: 1 }} />
          {tab === 'live' && (
            <>
              <button className="btn ghost small" onClick={reload}>↻ Refresh</button>
              <button className="btn ghost small" disabled={clearing || !data?.log.length} onClick={clearLog}>
                {clearing ? 'Clearing…' : 'Clear log'}
              </button>
            </>
          )}
        </div>

        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}

        {data && tab === 'live' && (
          data.log.length === 0 ? (
            <div className="card pad-lg center">
              <p className="muted">
                No AI calls yet. Start a lesson (or create a class) and the real prompts will appear here,
                newest first.
              </p>
            </div>
          ) : (
            <div className="col" style={{ gap: 10 }}>
              {data.log.map((e) => <LogCard key={e.id} entry={e} />)}
              <p className="muted small center">Showing the most recent {data.log.length} calls (kept in memory only).</p>
            </div>
          )
        )}

        {data && tab === 'templates' && (
          <div className="col" style={{ gap: 10 }}>
            <p className="muted small">
              These are the fixed instruction templates the app uses, shown filled in with a sample learner
              (“Alex”). Your child’s real details replace the samples at run time.
            </p>
            {data.templates.map((t) => <TemplateCard key={t.key} tmpl={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function relTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleString();
}

const preStyle: React.CSSProperties = {
  whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.82rem',
  background: 'var(--surface-2, #f4f1e8)', borderRadius: 8, padding: '10px 12px',
  margin: '6px 0 0', maxHeight: 420, overflow: 'auto'
};

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="muted small" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
      <pre style={preStyle}>{text}</pre>
    </div>
  );
}

function LogCard({ entry }: { entry: PromptLogEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ padding: 0 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', boxSizing: 'border-box', padding: '12px 14px' }}
      >
        <div className="row" style={{ alignItems: 'center', gap: 10 }}>
          <span className="badge">{entry.label}</span>
          {!entry.ok && <span className="badge" style={{ background: 'var(--bad, #c0392b)', color: '#fff' }}>error</span>}
          <span className="muted small">{entry.vendor} · {entry.model}</span>
          <div style={{ flex: 1 }} />
          <span className="muted small">{entry.ms} ms · {relTime(entry.ts)}</span>
          <span className="muted">{open ? '▾' : '▸'}</span>
        </div>
        {!open && (
          <div className="muted small" style={{ marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {entry.ok ? (entry.response || '').slice(0, 160) || '(empty reply)' : entry.error}
          </div>
        )}
      </button>
      {open && (
        <div style={{ padding: '0 14px 14px' }}>
          <Field label="System prompt" text={entry.system || '(none)'} />
          {entry.messages.map((m, i) => (
            <Field key={i} label={m.role === 'assistant' ? 'Assistant message' : 'User message'} text={m.content} />
          ))}
          {entry.ok ? <Field label="AI reply" text={entry.response || '(empty)'} /> : <Field label="Error" text={entry.error || 'failed'} />}
        </div>
      )}
    </div>
  );
}

function TemplateCard({ tmpl }: { tmpl: PromptTemplate }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ padding: 0 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', boxSizing: 'border-box', padding: '12px 14px' }}
      >
        <div className="row" style={{ alignItems: 'center', gap: 10 }}>
          <strong>{tmpl.title}</strong>
          <div style={{ flex: 1 }} />
          <span className="muted">{open ? '▾' : '▸'}</span>
        </div>
        <div className="muted small" style={{ marginTop: 4 }}>{tmpl.description}</div>
      </button>
      {open && (
        <div style={{ padding: '0 14px 14px' }}>
          <Field label="System prompt" text={tmpl.system} />
          {tmpl.user && <Field label="Sample first message" text={tmpl.user} />}
        </div>
      )}
    </div>
  );
}

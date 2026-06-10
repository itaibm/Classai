import { useState } from 'react';
import type { LessonKind } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, useToast, Toast, masteryPill } from '../lib/ui.tsx';

export function CourseDetail({ courseId }: { courseId: string }) {
  const { data, loading, error, reload } = useAsync(() => api.course(courseId), [courseId]);
  const { msg, show } = useToast();
  const [more, setMore] = useState('');
  const [busy, setBusy] = useState(false);
  const [preparing, setPreparing] = useState(false);

  async function teach(topicId: string, kind: LessonKind) {
    setPreparing(true);
    try {
      const { lesson } = await api.generateLesson(courseId, topicId, kind);
      navigate(`/class/${lesson.id}`);
    } catch (e: any) {
      show(e.message || 'Could not start lesson');
      setPreparing(false);
    }
  }

  async function addCurriculum() {
    if (!more.trim()) return;
    setBusy(true);
    try {
      await api.addCurriculum(courseId, more.trim());
      setMore('');
      show('Syllabus updated');
      reload();
    } catch (e: any) {
      show(e.message || 'Could not update');
    } finally {
      setBusy(false);
    }
  }

  async function regenerate() {
    setBusy(true);
    try {
      await api.regenerateSyllabus(courseId);
      show('Syllabus regenerated');
      reload();
    } catch (e: any) {
      show(e.message || 'Could not regenerate');
    } finally {
      setBusy(false);
    }
  }

  const hue = data?.kid.avatar.hue ?? 210;
  const masteryFor = (title: string) => data?.progress.topics.find((t) => t.title === title)?.mastery ?? 0;

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <TopBar accentHue={hue} />
      <div className="container wide">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {preparing && (
          <div className="banner" style={{ marginBottom: 14 }}>
            <span className="row" style={{ gap: 8 }}><span className="spinner" /> Preparing the lesson…</span>
          </div>
        )}
        {data && (
          <>
            <button className="btn ghost small" onClick={() => navigate(`/parent/kid/${data.kid.id}`)}>← {data.kid.name}</button>
            <h1 style={{ marginTop: 8 }}>{data.course.title}</h1>
            <p className="muted">{data.course.subject} · {data.course.gradeLevel}{data.course.description ? ` · ${data.course.description}` : ''}</p>

            {data.recommendation && (
              <div className="banner" style={{ margin: '12px 0' }}>
                <strong>Recommended next:</strong> {data.recommendation.note}{' '}
                <button className="btn small" onClick={() => teach(data.recommendation!.topicId, data.recommendation!.reason === 'diagnostic' ? 'diagnostic' : data.recommendation!.reason === 'spaced_review' ? 'review' : 'lesson')}>
                  Start
                </button>
              </div>
            )}

            <h3 style={{ marginTop: 16 }}>Syllabus</h3>
            <div className="card">
              {data.topics.length === 0 && <p className="muted">No topics yet.</p>}
              <ul className="list-reset">
                {data.topics.map((t, i) => {
                  const m = masteryFor(t.title);
                  const pill = masteryPill(m);
                  return (
                    <li key={t.id} className="kv">
                      <span>
                        <strong>{i + 1}. {t.title}</strong>
                        <div className="muted small">{t.summary}</div>
                      </span>
                      <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                        <span className={`pill ${pill.cls}`}>{pill.label}</span>
                        <button className="btn soft small" onClick={() => teach(t.id, 'lesson')}>Teach ▶</button>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="row" style={{ marginTop: 10, gap: 8 }}>
                <button className="btn ghost small" disabled={busy} onClick={regenerate}>Regenerate syllabus</button>
              </div>
            </div>

            <h3 style={{ marginTop: 16 }}>Curriculum</h3>
            <div className="card">
              {data.curricula.length === 0 && <p className="muted small">No curriculum provided — Classai generated a standard syllabus.</p>}
              {data.curricula.map((c) => (
                <details key={c.id} style={{ marginBottom: 8 }}>
                  <summary className="small muted">{c.source} · {new Date(c.createdAt).toLocaleDateString()}</summary>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', marginTop: 6 }}>{c.rawText}</pre>
                </details>
              ))}
              <label className="field" style={{ marginTop: 8 }}>
                Add more curriculum <span className="hint">(rebuilds the syllabus)</span>
                <textarea value={more} onChange={(e) => setMore(e.target.value)} placeholder="Paste additional topics or materials…" />
              </label>
              <button className="btn" disabled={busy || !more.trim()} onClick={addCurriculum}>
                {busy ? 'Working…' : 'Add & rebuild'}
              </button>
            </div>
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}

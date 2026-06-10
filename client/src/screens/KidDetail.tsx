import { useState } from 'react';
import { api, type CourseCard } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, useToast, Toast, masteryPill } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';

export function KidDetail({ kidId }: { kidId: string }) {
  const { data, loading, error, reload } = useAsync(async () => {
    const [{ kid }, { courses }, mem, { sessions }] = await Promise.all([
      api.kid(kidId),
      api.courses(kidId),
      api.memory(kidId),
      api.sessions(kidId)
    ]);
    return { kid, courses, model: mem.model, episodes: mem.episodes, sessions };
  }, [kidId]);
  const { msg, show } = useToast();

  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [busy, setBusy] = useState(false);
  const [showReport, setShowReport] = useState<string>('');

  async function addClass() {
    if (!subject.trim()) return show('Enter a subject');
    setBusy(true);
    try {
      const { course } = await api.createCourse(kidId, { subject: subject.trim(), gradeLevel: grade, curriculum });
      navigate(`/parent/course/${course.id}`);
    } catch (e: any) {
      show(e.message || 'Could not create class');
    } finally {
      setBusy(false);
    }
  }

  const hue = data?.kid.avatar.hue ?? 210;

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <TopBar accentHue={hue} />
      <div className="container wide">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && (
          <>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="row" style={{ alignItems: 'center', gap: 14 }}>
                <div style={{ width: 84, height: 84 }}>
                  <Character character={data.kid.avatar.character} hue={hue} emotion="happy" mouthOpen={0} speaking={false} />
                </div>
                <div>
                  <h1 style={{ marginBottom: 2 }}>{data.kid.name}</h1>
                  <span className="muted">{data.kid.gradeLevel || `age ${data.kid.age}`}</span>
                </div>
              </div>
              <button className="btn" onClick={() => navigate(`/learn/${kidId}`)}>Start learning →</button>
            </div>

            {/* Classes */}
            <h3 style={{ marginTop: 24 }}>Classes</h3>
            <div className="grid cols-2">
              {data.courses.map((c: CourseCard) => (
                <div key={c.course.id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/parent/course/${c.course.id}`)}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>{c.course.title}</strong>
                    <span className="muted small">{Math.round(c.progress.completion * 100)}%</span>
                  </div>
                  <div className="bar" style={{ margin: '10px 0' }}><span style={{ width: `${Math.round(c.progress.completion * 100)}%` }} /></div>
                  <span className="muted small">{c.topicCount} topics{c.recommendation ? ` · next: ${c.recommendation.topicTitle}` : ''}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: 14 }}>
              <h3>Add a class</h3>
              <div className="row">
                <label className="field grow">Subject<input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Pre-Algebra, Biology, Spanish" /></label>
                <label className="field grow">Grade / level<input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder={data.kid.gradeLevel || '7th grade'} /></label>
              </div>
              <label className="field">
                Curriculum <span className="hint">(paste a syllabus, a textbook's table of contents, or describe what to cover — optional)</span>
                <textarea value={curriculum} onChange={(e) => setCurriculum(e.target.value)} placeholder="Leave blank to let Classai build a standard syllabus." />
              </label>
              <button className="btn" disabled={busy} onClick={addClass}>
                {busy ? <span className="row" style={{ gap: 8 }}><span className="spinner" /> Building syllabus…</span> : 'Create class'}
              </button>
            </div>

            {/* Long-term memory */}
            <h3 style={{ marginTop: 24 }}>What the tutor knows about {data.kid.name}</h3>
            <div className="card">
              {data.model.summary ? <p>{data.model.summary}</p> : <p className="muted">Nothing yet — this fills in as {data.kid.name} learns.</p>}
              {data.model.preferences && <p className="muted small"><strong>Learns best:</strong> {data.model.preferences}</p>}
              <div className="grid cols-3" style={{ marginTop: 10 }}>
                <MemList title="Strengths" items={data.model.strengths} />
                <MemList title="Working on" items={data.model.struggles} />
                <MemList title="Interests" items={data.model.interests.length ? data.model.interests : data.kid.interests} />
              </div>
              {Object.keys(data.model.topicMastery).length > 0 && (
                <>
                  <h4 style={{ marginTop: 14 }}>Topic mastery</h4>
                  <ul className="list-reset">
                    {Object.entries(data.model.topicMastery).sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt)).slice(0, 12).map(([t, m]) => {
                      const pill = masteryPill(m.mastery);
                      return (
                        <li key={t} className="kv">
                          <span>{t}</span>
                          <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                            <div className="bar" style={{ width: 120 }}><span style={{ width: `${Math.round(m.mastery * 100)}%` }} /></div>
                            <span className={`pill ${pill.cls}`}>{pill.label}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            {/* History & reports */}
            <h3 style={{ marginTop: 24 }}>History & reports</h3>
            <div className="card">
              {data.sessions.length === 0 && <p className="muted">No lessons yet.</p>}
              <ul className="list-reset timeline">
                {data.sessions.map((s) => (
                  <li key={s.id}>
                    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{s.topic}</strong> <span className="muted small">· {s.subject} · {new Date(s.startedAt).toLocaleDateString()}</span>
                        {s.report?.concerns?.length ? <span className="pill warn" style={{ marginLeft: 8 }}>note for you</span> : null}
                      </div>
                      <div className="row" style={{ gap: 8, alignItems: 'center' }}>
                        {s.report && <span className="pill neutral">{s.report.score}/100</span>}
                        <button className="btn ghost small" onClick={() => setShowReport(showReport === s.id ? '' : s.id)}>{showReport === s.id ? 'Hide' : 'View'}</button>
                      </div>
                    </div>
                    {showReport === s.id && s.report && (
                      <div style={{ marginTop: 8 }}>
                        <p>{s.report.summary}</p>
                        <div className="grid cols-2">
                          <MemList title="Mastered" items={s.report.mastered} />
                          <MemList title="Needs work" items={s.report.needsWork} />
                        </div>
                        {s.report.nextSteps && <p className="muted small"><strong>Next steps:</strong> {s.report.nextSteps}</p>}
                        {s.report.concerns?.length > 0 && (
                          <div className="banner warn" style={{ marginTop: 8 }}>
                            <strong>For you:</strong> {s.report.concerns.join(' ')}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="row" style={{ marginTop: 24 }}>
              <button
                className="btn danger small"
                onClick={() => {
                  if (confirm(`Delete ${data.kid.name} and all their data?`)) api.deleteKid(kidId).then(() => navigate('/parent'));
                }}
              >
                Delete learner
              </button>
            </div>
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}

function MemList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 style={{ marginBottom: 6 }}>{title}</h4>
      {items.length === 0 ? (
        <span className="muted small">—</span>
      ) : (
        <ul className="list-reset">{items.map((i) => <li key={i} className="small">• {i}</li>)}</ul>
      )}
    </div>
  );
}

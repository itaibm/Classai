import { useState } from 'react';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { ErrorNote, Loading, Toast, TopBar, useAsync, useToast } from '../lib/ui.tsx';
import { subjectColor } from '../lib/subject.ts';

const DELIVERY_BADGE: Record<string, { label: string; cls: string }> = {
  fully_ai: { label: '🤖 AI', cls: 'neutral' },
  human_intro_then_ai: { label: '🙋 Parent intro', cls: 'warn' },
  video_then_ai: { label: '🎬 Video + AI', cls: 'neutral' },
  human_lesson: { label: '🙋 Parent-led', cls: 'warn' }
};

export function ClassLibrary() {
  const { data, loading, error, reload } = useAsync(() => api.library());
  const curriculum = useAsync(() => api.curriculum());
  const { msg, show } = useToast();
  const [tab, setTab] = useState<'structure' | 'curriculum'>('structure');
  const [yearName, setYearName] = useState('');
  const [yearId, setYearId] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  const allClasses = (data?.years ?? []).flatMap((year) =>
    year.classes.map((c) => ({ id: c.id, label: `${year.name} · ${c.title}` }))
  );

  async function attach(curriculumId: string, classId: string) {
    if (!classId) return;
    try {
      await api.attachCurriculum(classId, curriculumId);
      show('Added to class — it will appear in the learner’s lessons.');
    } catch (cause: any) {
      show(cause.message || 'Could not add lesson');
    }
  }

  async function addYear() {
    if (!yearName.trim()) return show('Enter a year name');
    setBusy(true);
    try {
      const { year } = await api.createYear({ name: yearName.trim(), order: data?.years.length ?? 0 });
      setYearName('');
      setYearId(year.id);
      show(`${year.name} created`);
      reload();
    } catch (cause: any) {
      show(cause.message || 'Could not create year');
    } finally {
      setBusy(false);
    }
  }

  async function addClass() {
    if (!yearId || !subject.trim()) return show('Choose a year and enter a subject');
    setBusy(true);
    try {
      const { classDefinition } = await api.createClass({ yearId, subject: subject.trim(), title: title.trim() || undefined });
      navigate(`/parent/class/${classDefinition.id}`);
    } catch (cause: any) {
      show(cause.message || 'Could not create class');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app">
      <TopBar />
      <div className="container wide">
        <button className="btn ghost small" onClick={() => navigate('/parent')}>← Parent area</button>
        <h1 style={{ marginBottom: 4 }}>Class library</h1>
        <p className="muted">Build each year and subject once, then enroll any learner who should take it.</p>

        <div className="row" style={{ gap: 8, margin: '14px 0 6px' }}>
          <button className={`btn ${tab === 'structure' ? '' : 'ghost'} small`} onClick={() => setTab('structure')}>Your classes</button>
          <button className={`btn ${tab === 'curriculum' ? '' : 'ghost'} small`} onClick={() => setTab('curriculum')}>Curriculum</button>
        </div>

        {tab === 'curriculum' && (
          <section style={{ marginTop: 10 }}>
            <p className="muted">Hand-built, ready-to-play lessons. Add one to a class and it appears in that learner’s lessons — exactly as authored, not generated on the fly.</p>
            {curriculum.loading && <Loading />}
            {curriculum.error && <ErrorNote error={curriculum.error} onRetry={curriculum.reload} />}
            {curriculum.data && curriculum.data.years.length === 0 && (
              <div className="banner" style={{ marginTop: 12 }}>No curriculum files found on disk.</div>
            )}
            {curriculum.data?.years.map((year) => (
              <section key={year.year} style={{ marginTop: 18 }}>
                <h2>Year {year.year}</h2>
                {year.subjects.map((subj) => (
                  <div key={subj.subject} className="card" style={{ marginTop: 10, borderColor: subjectColor(subj.subjectKey).soft }}>
                    <h3 className="row" style={{ gap: 8, alignItems: 'center' }}>
                      <span className="today-dot" style={{ background: subjectColor(subj.subjectKey).accent }} />
                      {subj.subjectLabel}
                    </h3>
                    {subj.units.map((unit) => (
                      <details key={unit.number} style={{ marginTop: 8 }} open>
                        <summary style={{ cursor: 'pointer' }}>
                          <strong>Unit {unit.number}: {unit.title}</strong>
                          {unit.essentialQuestion && <span className="muted small"> — {unit.essentialQuestion}</span>}
                        </summary>
                        <ul className="list-reset" style={{ marginTop: 8 }}>
                          {unit.lessons.map((lesson) => {
                            const badge = DELIVERY_BADGE[lesson.deliveryMode] ?? { label: '🤖 AI', cls: 'neutral' };
                            return (
                              <li key={lesson.id} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                                <div style={{ minWidth: 0 }}>
                                  <div className="row" style={{ gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <strong>{lesson.lessonNumber}. {lesson.title}</strong>
                                    <span className={`pill ${badge.cls}`}>{badge.label}</span>
                                    <span className="pill neutral">{lesson.durationMin} min</span>
                                    {lesson.valid ? <span className="pill good">✓ valid</span> : <span className="pill warn">needs review</span>}
                                  </div>
                                  <span className="muted small">{lesson.topic} · <code>{lesson.id}</code></span>
                                </div>
                                <select
                                  className="small"
                                  defaultValue=""
                                  disabled={allClasses.length === 0}
                                  onChange={(e) => { attach(lesson.id, e.target.value); e.target.value = ''; }}
                                >
                                  <option value="">＋ Add to class…</option>
                                  {allClasses.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                                </select>
                              </li>
                            );
                          })}
                        </ul>
                      </details>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </section>
        )}

        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {tab === 'structure' && data && (
          <>
            {data.years.length === 0 && (
              <div className="banner" style={{ margin: '18px 0' }}>
                The library is empty. Curriculum files have not been imported; create the structure here first.
              </div>
            )}
            {data.years.map((year) => (
              <section key={year.id} style={{ marginTop: 24 }}>
                <h2>{year.name}</h2>
                <div className="grid cols-3">
                  {year.classes.map((classDefinition) => (
                    <button
                      key={classDefinition.id}
                      className="card class-card"
                      style={{ textAlign: 'left', cursor: 'pointer', borderColor: subjectColor(classDefinition.subjectKey).soft }}
                      onClick={() => navigate(`/parent/class/${classDefinition.id}`)}
                    >
                      <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                        <span className="today-dot" style={{ background: subjectColor(classDefinition.subjectKey).accent }} />
                        <strong>{classDefinition.title}</strong>
                      </span>
                      <span className="muted small">{classDefinition.subject}</span>
                    </button>
                  ))}
                  {year.classes.length === 0 && <p className="muted small">No subjects in this year yet.</p>}
                </div>
              </section>
            ))}

            <div className="grid cols-2" style={{ marginTop: 28 }}>
              <div className="card">
                <h3>Add a year</h3>
                <label className="field">Year name<input value={yearName} onChange={(event) => setYearName(event.target.value)} placeholder="Year 1" /></label>
                <button className="btn" disabled={busy || !yearName.trim()} onClick={addYear}>Create year</button>
              </div>
              <div className="card">
                <h3>Add a subject class</h3>
                <label className="field">Year
                  <select value={yearId} onChange={(event) => setYearId(event.target.value)}>
                    <option value="">Choose a year…</option>
                    {data.years.map((year) => <option key={year.id} value={year.id}>{year.name}</option>)}
                  </select>
                </label>
                <label className="field">Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Computing" /></label>
                <label className="field">Display title <span className="hint">optional</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="AI Foundations" /></label>
                <button className="btn" disabled={busy || !yearId || !subject.trim()} onClick={addClass}>Create class</button>
              </div>
            </div>
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}

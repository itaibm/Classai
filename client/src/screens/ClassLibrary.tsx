import { useState } from 'react';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { ErrorNote, Loading, Toast, TopBar, useAsync, useToast } from '../lib/ui.tsx';
import { subjectColor } from '../lib/subject.ts';

export function ClassLibrary() {
  const { data, loading, error, reload } = useAsync(() => api.library());
  const { msg, show } = useToast();
  const [yearName, setYearName] = useState('');
  const [yearId, setYearId] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

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

        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && (
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

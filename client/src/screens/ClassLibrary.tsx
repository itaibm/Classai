import { useEffect, useState } from 'react';
import type { CatalogSubject, Kid } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { ErrorNote, Loading, Toast, TopBar, useAsync, useToast } from '../lib/ui.tsx';
import { subjectColor, subjectStyle } from '../lib/subject.ts';

const DELIVERY_BADGE: Record<string, string> = {
  fully_ai: '🤖 AI',
  human_intro_then_ai: '🙋 Parent intro',
  video_then_ai: '🎬 Video + AI',
  human_lesson: '🙋 Parent-led'
};

export function ClassLibrary() {
  const { data, loading, error, reload } = useAsync(async () => {
    const [{ years }, { kids }] = await Promise.all([api.catalog(), api.kids()]);
    return { years, kids };
  });
  const { msg, show } = useToast();
  const [year, setYear] = useState<number | null>(null);
  const [subjectKey, setSubjectKey] = useState<string>(''); // selected subject folder

  useEffect(() => {
    if (year === null && data?.years.length) setYear(data.years[0]!.year);
  }, [data, year]);

  const activeYear = data?.years.find((y) => y.year === year) || null;
  const activeSubject: CatalogSubject | null = activeYear?.subjects.find((s) => s.subject === subjectKey) || null;

  async function assign(kid: Kid, subject: CatalogSubject) {
    if (year === null) return;
    try {
      await api.assignCurriculum(kid.id, year, subject.subject);
      show(`${subject.subjectLabel} assigned to ${kid.name}`);
    } catch (cause: any) {
      show(cause.message || 'Could not assign');
    }
  }

  return (
    <div className="app">
      <TopBar />
      <div className="container wide">
        <button className="btn ghost small" onClick={() => navigate('/parent')}>← Parent area</button>
        <h1 style={{ marginBottom: 4 }}>Curriculum</h1>
        <p className="muted">The whole school, Years 1–6. Assign a subject to a learner; lessons marked ✓ are hand-built, ✨ are built by AI the first time they’re opened.</p>

        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && (
          <>
            <div className="row" style={{ gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
              {data.years.map((y) => (
                <button
                  key={y.year}
                  className={`btn ${y.year === year ? '' : 'ghost'} small`}
                  onClick={() => { setYear(y.year); setSubjectKey(''); }}
                >
                  Year {y.year}
                </button>
              ))}
            </div>

            {!activeSubject && activeYear && (
              <div className="grid cols-3">
                {activeYear.subjects.map((subject) => (
                  <button
                    key={subject.subject}
                    className="card class-card"
                    style={{ textAlign: 'left', cursor: 'pointer', ...subjectStyle(subject.subjectKey) }}
                    onClick={() => setSubjectKey(subject.subject)}
                  >
                    <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                      <span className="today-dot" style={{ background: subjectColor(subject.subjectKey).accent }} />
                      <strong>{subject.subjectLabel}</strong>
                    </span>
                    <div className="muted small" style={{ marginTop: 6 }}>
                      {subject.lessonCount} lessons · {subject.authoredCount} ready
                    </div>
                  </button>
                ))}
                {activeYear.subjects.length === 0 && <p className="muted small">No subjects outlined for this year yet.</p>}
              </div>
            )}

            {activeSubject && (
              <section style={subjectStyle(activeSubject.subjectKey)}>
                <button className="btn ghost small" onClick={() => setSubjectKey('')}>← All Year {year} subjects</button>
                <h2 className="row" style={{ gap: 8, alignItems: 'center', marginTop: 8 }}>
                  <span className="today-dot" style={{ background: subjectColor(activeSubject.subjectKey).accent }} />
                  Year {year} {activeSubject.subjectLabel}
                </h2>
                {activeSubject.yearOverview && <p className="muted small">{activeSubject.yearOverview}</p>}

                <div className="card" style={{ marginTop: 10 }}>
                  <strong>Assign to a learner</strong>
                  {data.kids.length === 0 ? (
                    <p className="muted small">Add a learner in the Parent area first.</p>
                  ) : (
                    <div className="row" style={{ gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                      {data.kids.map((kid) => (
                        <button key={kid.id} className="btn soft small" onClick={() => assign(kid, activeSubject)}>
                          ＋ {kid.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {activeSubject.units.map((unit) => (
                  <div key={unit.number} className="card" style={{ marginTop: 12 }}>
                    <h3 style={{ marginBottom: 2 }}>Unit {unit.number}: {unit.title}</h3>
                    {unit.essentialQuestion && <p className="muted small" style={{ marginTop: 0 }}>{unit.essentialQuestion}</p>}
                    <ul className="list-reset" style={{ marginTop: 8 }}>
                      {unit.lessons.map((lesson) => (
                        <li key={lesson.id} className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
                          <div style={{ minWidth: 0 }}>
                            <div className="row" style={{ gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                              <strong>{lesson.lessonNumber}. {lesson.title}</strong>
                              {lesson.status === 'authored'
                                ? <span className="pill good" title="Hand-built and ready">✓ Ready</span>
                                : <span className="pill neutral" title="Built by AI on first open">✨ AI-built</span>}
                              <span className="pill neutral">{lesson.durationMin} min</span>
                              {lesson.deliveryMode && <span className="pill neutral">{DELIVERY_BADGE[lesson.deliveryMode] || '🤖 AI'}</span>}
                            </div>
                            {lesson.objective && <span className="muted small">{lesson.objective}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}

import { useState } from 'react';
import type { LessonKind, Recommendation } from '@shared/types';
import { api, type CourseCard } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, masteryPill } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';

function kindForReason(reason?: Recommendation['reason']): LessonKind {
  if (reason === 'diagnostic') return 'diagnostic';
  if (reason === 'spaced_review') return 'review';
  return 'lesson';
}

export function LearnHome({ kidId }: { kidId: string }) {
  const { data, error, loading, reload } = useAsync(async () => {
    const [{ kid }, { courses }] = await Promise.all([api.kid(kidId), api.courses(kidId)]);
    return { kid, courses };
  }, [kidId]);
  const [preparing, setPreparing] = useState('');

  async function start(courseId: string, topicId: string, kind: LessonKind) {
    setPreparing('Getting your lesson ready…');
    try {
      const { lesson } = await api.generateLesson(courseId, topicId, kind);
      navigate(`/class/${lesson.id}`);
    } catch (e: any) {
      setPreparing('');
      alert(e.message || 'Could not start the lesson.');
    }
  }

  const hue = data?.kid.avatar.hue ?? 210;

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <TopBar accentHue={hue} />
      <div className="container">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {preparing && (
          <div className="banner" style={{ marginBottom: 16 }}>
            <span className="row" style={{ gap: 8 }}>
              <span className="spinner" /> {preparing}
            </span>
          </div>
        )}
        {data && (
          <>
            <div className="row" style={{ alignItems: 'center', gap: 16 }}>
              <div style={{ width: 96, height: 96 }}>
                <Character character={data.kid.avatar.character} hue={hue} emotion="happy" mouthOpen={0} speaking={false} />
              </div>
              <div>
                <h1 style={{ marginBottom: 2 }}>Hi {data.kid.name}! 👋</h1>
                <span className="muted">Ready to learn something today?</span>
              </div>
            </div>

            {data.courses.length === 0 && (
              <div className="card" style={{ marginTop: 18 }}>
                <p>No classes yet. Ask a grown-up to set one up in the Parent area.</p>
              </div>
            )}

            {data.courses.map((c: CourseCard) => (
              <div key={c.course.id} className="card" style={{ marginTop: 18 }}>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ marginBottom: 2 }}>{c.course.title}</h2>
                    <span className="muted small">{Math.round(c.progress.completion * 100)}% of the way through</span>
                  </div>
                  {c.recommendation && (
                    <button
                      className="btn lg"
                      onClick={() => start(c.course.id, c.recommendation!.topicId, kindForReason(c.recommendation!.reason))}
                    >
                      ▶ {c.recommendation.reason === 'diagnostic' ? 'Start check-in' : c.recommendation.reason === 'spaced_review' ? 'Review' : 'Start'}
                    </button>
                  )}
                </div>
                {c.recommendation && <p className="muted" style={{ marginTop: 8 }}>{c.recommendation.note}</p>}

                <div className="bar" style={{ margin: '12px 0 16px' }}>
                  <span style={{ width: `${Math.round(c.progress.completion * 100)}%` }} />
                </div>

                <details>
                  <summary className="muted small" style={{ cursor: 'pointer' }}>All topics</summary>
                  <ul className="list-reset" style={{ marginTop: 10 }}>
                    {c.progress.topics.map((t) => {
                      const pill = masteryPill(t.mastery);
                      return (
                        <li key={t.topicId} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                          <span>{t.title}</span>
                          <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                            <span className={`pill ${pill.cls}`}>{pill.label}</span>
                            <button className="btn soft small" onClick={() => start(c.course.id, t.topicId, 'lesson')}>
                              ▶
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { AssignedLesson, AssignedSubject } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';
import { subjectStyle, subjectColor } from '../lib/subject.ts';

type CatLesson = AssignedLesson;

/** First not-yet-learned lesson in a subject (the "Continue" target). A lesson
 *  finished without mastery comes back here before new material. */
function nextLesson(subject: AssignedSubject): CatLesson | null {
  for (const unit of subject.units) for (const lesson of unit.lessons as CatLesson[]) if (!lesson.done) return lesson;
  return null;
}

/** A finished lesson that could earn more stars (lowest first) — offered as a
 *  choice next to the new lesson, so the learner has a say without skipping
 *  ahead in a sequence where order matters. */
function starLesson(subject: AssignedSubject): CatLesson | null {
  let best: CatLesson | null = null;
  for (const unit of subject.units)
    for (const lesson of unit.lessons as CatLesson[])
      if (lesson.done && lesson.stars && lesson.stars < 3 && (!best || lesson.stars < best.stars!)) best = lesson;
  return best;
}

export function LearnHome({ kidId }: { kidId: string }) {
  const { data, error, loading, reload } = useAsync(async () => {
    const [{ kid }, { subjects }] = await Promise.all([api.kid(kidId), api.kidCurriculum(kidId)]);
    return { kid, subjects };
  }, [kidId]);
  const [open, setOpen] = useState<string>(''); // expanded subject classId

  const hue = data?.kid.avatar.hue ?? 232;
  const go = (lesson: CatLesson) => navigate(`/learn/${kidId}/c/${lesson.id}`);

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <TopBar accentHue={hue} />
      <div className="container">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && (
          <>
            <div className="row" style={{ alignItems: 'center', gap: 16 }}>
              <div style={{ width: 110, height: 110 }}>
                <Character character={data.kid.avatar.character} hue={hue} emotion="happy" mouthOpen={0} speaking={false} />
              </div>
              <div>
                <h1 style={{ marginBottom: 2 }}>Hi {data.kid.name}! 👋</h1>
                <span className="muted">Pick up where you left off, or start something new.</span>
              </div>
            </div>

            {data.subjects.length === 0 && (
              <div className="card" style={{ marginTop: 18 }}>
                <p>No subjects yet. Ask a grown-up to assign you some from the Parent area → Curriculum.</p>
              </div>
            )}

            <div className="grid cols-2" style={{ marginTop: 22 }}>
              {data.subjects.map((subject) => {
                const next = nextLesson(subject);
                const more = next && !next.tryAgain ? starLesson(subject) : null;
                const pct = subject.total ? Math.round((subject.completed / subject.total) * 100) : 0;
                const isOpen = open === subject.classId;
                const accent = subjectColor(subject.subjectKey).accent;
                return (
                  <div key={subject.classId} className="card class-card" style={subjectStyle(subject.subjectKey)}>
                    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                      <div>
                        <h3 className="row" style={{ marginBottom: 2, gap: 7 }}>
                          <span className="today-dot" style={{ background: accent }} />
                          {subject.subjectLabel}
                        </h3>
                        <span className="muted small">Year {subject.year} · {subject.completed}/{subject.total} lessons</span>
                      </div>
                      {next ? (
                        <div className="col" style={{ gap: 6, alignItems: 'stretch' }}>
                          <button className="btn subject" onClick={() => go(next)} title={next.title}>
                            {next.tryAgain ? '🔁 Practise again' : `▶ ${subject.completed ? 'New lesson' : 'Start'}`}
                          </button>
                          {more && (
                            <button className="btn soft small" onClick={() => go(more)} title={`Replay “${more.title}” to win more stars`}>
                              ⭐ Win more stars
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="pill good">All done 🎉</span>
                      )}
                    </div>
                    <div className="bar" style={{ margin: '12px 0 6px' }}><span style={{ width: `${pct}%` }} /></div>

                    <button className="btn ghost small" style={{ marginTop: 4 }} onClick={() => setOpen(isOpen ? '' : subject.classId)}>
                      {isOpen ? 'Hide lessons' : 'All lessons'}
                    </button>

                    {isOpen && (
                      <div style={{ marginTop: 10 }}>
                        {subject.units.map((unit) => (
                          <div key={unit.number} style={{ marginTop: 10 }}>
                            <div className="muted small" style={{ fontWeight: 600 }}>Unit {unit.number}: {unit.title}</div>
                            <ul className="list-reset" style={{ marginTop: 4 }}>
                              {(unit.lessons as CatLesson[]).map((lesson) => (
                                <li key={lesson.id} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--line)' }}>
                                  <span className="row" style={{ gap: 8, alignItems: 'center', minWidth: 0 }}>
                                    <span title={lesson.tryAgain ? 'Let’s practise this one again' : lesson.done ? 'Learned' : 'Not started'}>
                                      {lesson.tryAgain ? '🔁' : lesson.done ? (lesson.stars ? '⭐'.repeat(lesson.stars) : '✅') : '•'}
                                    </span>
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson.lessonNumber}. {lesson.title}</span>
                                    {lesson.status === 'authored'
                                      ? <span className="pill good" title="Ready to play">✓</span>
                                      : <span className="pill neutral" title="Your tutor will build this the first time">✨</span>}
                                  </span>
                                  <button className="btn soft small" onClick={() => go(lesson)}>▶</button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { LessonKind, Recommendation, WeeklySchedule, Weekday } from '@shared/types';
import { WEEKDAYS } from '@shared/types';
import { api, type CourseCard } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';
import { subjectStyle, subjectColor } from '../lib/subject.ts';

function kindForReason(reason?: Recommendation['reason']): LessonKind {
  if (reason === 'diagnostic') return 'diagnostic';
  if (reason === 'spaced_review') return 'review';
  return 'lesson';
}
function ctaLabel(rec: Recommendation, started: boolean): string {
  if (rec.reason === 'diagnostic') return started ? 'Continue check-in' : 'Start check-in';
  if (rec.reason === 'spaced_review') return 'Review';
  return started ? 'Continue' : 'Start';
}

const SUBJECT_LABEL: Record<string, string> = {
  math: 'Math', science: 'Science', language_arts: 'Language Arts',
  world_language: 'World Language', history: 'History', general: 'General',
};
const todayWeekday = (): Weekday => WEEKDAYS[(new Date().getDay() + 6) % 7]!;

export function LearnHome({ kidId }: { kidId: string }) {
  const { data, error, loading, reload } = useAsync(async () => {
    const [{ kid }, { courses }, { schedule }] = await Promise.all([
      api.kid(kidId), api.courses(kidId), api.schedule(kidId),
    ]);
    return { kid, courses, schedule: schedule as WeeklySchedule };
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

  const hue = data?.kid.avatar.hue ?? 232;
  const byId = (id: string): CourseCard | undefined => data?.courses.find((c) => c.course.id === id);

  // today's plan = scheduled entries for today, resolved to live courses
  const today = todayWeekday();
  const todayCards: CourseCard[] = (data?.schedule?.days?.[today] ?? [])
    .map((e) => byId(e.courseId)).filter((c): c is CourseCard => !!c);
  const firstUnfinishedIdx = todayCards.findIndex((c) => c.progress.completion < 1);

  // all classes grouped by subjectKey
  const groups = new Map<string, CourseCard[]>();
  for (const c of data?.courses ?? []) {
    const k = c.course.subjectKey || 'general';
    (groups.get(k) ?? groups.set(k, []).get(k)!).push(c);
  }

  function Continue({ card, big }: { card: CourseCard; big?: boolean }) {
    const rec = card.recommendation;
    const started = card.progress.completion > 0;
    if (!rec) return <span className="pill neutral">{card.topicCount === 0 ? 'No topics yet' : 'All done 🎉'}</span>;
    return (
      <button className={`btn subject ${big ? 'lg' : ''}`} onClick={() => start(card.course.id, rec.topicId, kindForReason(rec.reason))}>
        ▶ {ctaLabel(rec, started)}
      </button>
    );
  }

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <TopBar accentHue={hue} />
      <div className="container">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {preparing && (
          <div className="banner" style={{ marginBottom: 16 }}>
            <span className="row" style={{ gap: 8 }}><span className="spinner" /> {preparing}</span>
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

            {todayCards.length > 0 && (
              <section style={{ marginTop: 24 }}>
                <h2 className="section-head">Today’s plan</h2>
                <div className="today-list">
                  {todayCards.map((c, i) => {
                    const entry = data.schedule.days[today].find((e) => e.courseId === c.course.id);
                    return (
                      <div key={c.course.id + i} className="today-row" style={subjectStyle(c.course.subjectKey)}>
                        <span className="today-dot" />
                        <div className="today-main">
                          <div className="today-title">{c.course.title}</div>
                          <div className="muted small">
                            {entry?.time ? `${entry.time} · ` : ''}{Math.round(c.progress.completion * 100)}% complete
                          </div>
                          <div className="bar" style={{ marginTop: 6 }}><span style={{ width: `${Math.round(c.progress.completion * 100)}%` }} /></div>
                        </div>
                        <Continue card={c} big={i === firstUnfinishedIdx} />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {[...groups.entries()].map(([key, cards]) => (
              <section key={key} style={{ marginTop: 26 }}>
                <h2 className="section-head">
                  <span className="today-dot" style={{ background: subjectColor(key).accent }} />
                  {SUBJECT_LABEL[key] ?? cards[0]!.course.subject}
                </h2>
                <div className="grid cols-2">
                  {cards.map((c) => (
                    <div key={c.course.id} className="card class-card" style={subjectStyle(c.course.subjectKey)}>
                      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                        <div>
                          <h3 style={{ marginBottom: 2 }}>{c.course.title}</h3>
                          <span className="muted small">{Math.round(c.progress.completion * 100)}% of the way through</span>
                        </div>
                        <Continue card={c} />
                      </div>
                      <div className="bar" style={{ margin: '12px 0 6px' }}><span style={{ width: `${Math.round(c.progress.completion * 100)}%` }} /></div>
                      <details>
                        <summary className="muted small" style={{ cursor: 'pointer' }}>All topics</summary>
                        <ul className="list-reset" style={{ marginTop: 10 }}>
                          {c.progress.topics.map((t) => (
                            <li key={t.topicId} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                              <span>{t.title}</span>
                              <button className="btn soft small" onClick={() => start(c.course.id, t.topicId, 'lesson')}>▶</button>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

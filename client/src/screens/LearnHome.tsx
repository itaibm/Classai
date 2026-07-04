import { useState } from 'react';
import type { Recommendation, WeeklySchedule, Weekday } from '@shared/types';
import { WEEKDAYS } from '@shared/types';
import { api, type ClassCard } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';
import { subjectStyle, subjectColor } from '../lib/subject.ts';

function ctaLabel(rec: Recommendation, started: boolean): string {
  if (rec.reason === 'diagnostic') return started ? 'Continue check-in' : 'Start check-in';
  if (rec.reason === 'spaced_review') return 'Review';
  return started ? 'Continue' : 'Start';
}

const todayWeekday = (): Weekday => WEEKDAYS[(new Date().getDay() + 6) % 7]!;

export function LearnHome({ kidId }: { kidId: string }) {
  const { data, error, loading, reload } = useAsync(async () => {
    const [{ kid }, { classes }, { schedule }] = await Promise.all([
      api.kid(kidId), api.kidClasses(kidId), api.schedule(kidId),
    ]);
    return { kid, classes, schedule: schedule as WeeklySchedule };
  }, [kidId]);
  const [preparing, setPreparing] = useState('');

  async function start(card: ClassCard, topicId: string) {
    const lesson = card.approvedLessons.find((item) => item.topicId === topicId);
    if (!lesson) return alert('This lesson is still waiting for parent approval.');
    setPreparing('Opening your lesson…');
    try {
      navigate(`/learn/${kidId}/lesson/${lesson.id}`);
    } catch (e: any) {
      setPreparing('');
      alert(e.message || 'Could not start the lesson.');
    }
  }

  const hue = data?.kid.avatar.hue ?? 232;
  const byId = (id: string): ClassCard | undefined => data?.classes.find((card) => card.classDefinition.id === id);

  // today's plan = scheduled entries for today, resolved to live courses
  const today = todayWeekday();
  const todayCards: ClassCard[] = (data?.schedule?.days?.[today] ?? [])
    .map((entry) => byId(entry.classId)).filter((card): card is ClassCard => Boolean(card));
  const firstUnfinishedIdx = todayCards.findIndex((c) => c.progress.completion < 1);

  // all classes grouped by subjectKey
  const groups = new Map<string, ClassCard[]>();
  for (const c of data?.classes ?? []) {
    const k = c.classDefinition.yearName;
    (groups.get(k) ?? groups.set(k, []).get(k)!).push(c);
  }

  function Continue({ card, big }: { card: ClassCard; big?: boolean }) {
    const rec = card.recommendation;
    const started = card.progress.completion > 0;
    if (!rec) return <span className="pill neutral">{card.topicCount === 0 ? 'No topics yet' : 'All done 🎉'}</span>;
    return (
      <button className={`btn subject ${big ? 'lg' : ''}`} disabled={!card.approvedLessons.some((lesson) => lesson.topicId === rec.topicId)} onClick={() => start(card, rec.topicId)}>
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
              <div style={{ width: 120, height: 120 }}>
                <Character character={data.kid.avatar.character} hue={hue} emotion="happy" mouthOpen={0} speaking={false} />
              </div>
              <div>
                <h1 style={{ marginBottom: 2 }}>Hi {data.kid.name}! 👋</h1>
                <span className="muted">Ready to learn something today?</span>
              </div>
            </div>

            {data.classes.length === 0 && (
              <div className="card" style={{ marginTop: 18 }}>
                <p>No classes yet. Ask a grown-up to set one up in the Parent area.</p>
              </div>
            )}

            {todayCards.length > 0 && (
              <section style={{ marginTop: 24 }}>
                <h2 className="section-head">Today’s plan</h2>
                <div className="today-list">
                  {todayCards.map((c, i) => {
                    const entry = data.schedule.days[today].find((item) => item.classId === c.classDefinition.id);
                    return (
                      <div key={c.classDefinition.id + i} className="today-row" style={subjectStyle(c.classDefinition.subjectKey)}>
                        <span className="today-dot" />
                        <div className="today-main">
                          <div className="today-title">{c.classDefinition.title}</div>
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

            {[...groups.entries()].map(([yearName, cards]) => (
              <section key={yearName} style={{ marginTop: 26 }}>
                <h2 className="section-head">
                  {yearName}
                </h2>
                <div className="grid cols-2">
                  {cards.map((c) => (
                    <div key={c.classDefinition.id} className="card class-card" style={subjectStyle(c.classDefinition.subjectKey)}>
                      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                        <div>
                          <h3 className="row" style={{ marginBottom: 2, gap: 7 }}><span className="today-dot" style={{ background: subjectColor(c.classDefinition.subjectKey).accent }} />{c.classDefinition.title}</h3>
                          <span className="muted small">{Math.round(c.progress.completion * 100)}% of the way through</span>
                        </div>
                        <Continue card={c} />
                      </div>
                      <div className="bar" style={{ margin: '12px 0 6px' }}><span style={{ width: `${Math.round(c.progress.completion * 100)}%` }} /></div>
                      {c.curriculumLessons.length > 0 && (
                        <div style={{ marginTop: 10 }}>
                          <span className="muted small">Curriculum lessons</span>
                          <ul className="list-reset" style={{ marginTop: 6 }}>
                            {c.curriculumLessons.map((lesson) => (
                              <li key={lesson.id} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                                <span>📘 {lesson.title}</span>
                                <button className="btn subject small" onClick={() => navigate(`/learn/${kidId}/lesson/${lesson.id}`)}>▶ Start</button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <details>
                        <summary className="muted small" style={{ cursor: 'pointer' }}>All topics</summary>
                        <ul className="list-reset" style={{ marginTop: 10 }}>
                          {c.progress.topics.map((t) => (
                            <li key={t.topicId} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                              <span>{t.title}</span>
                              <button className="btn soft small" disabled={!c.approvedLessons.some((lesson) => lesson.topicId === t.topicId)} onClick={() => start(c, t.topicId)}>▶</button>
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

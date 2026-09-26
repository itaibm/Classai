import { useState } from 'react';
import type { AvatarConfig, CurriculumProgress, CurriculumLessonProgress, Recommendation } from '@shared/types';
import { api, type ClassCard } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, useToast, Toast, masteryPill } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';
import { InterestsInput } from '../components/InterestsInput.tsx';
import { subjectStyle, subjectColor } from '../lib/subject.ts';

const CHARACTERS: AvatarConfig['character'][] = ['sage', 'nova', 'pip'];

const HISTORY_PAGE = 20;
const HISTORY_MAX = 100;

export function KidDetail({ kidId }: { kidId: string }) {
  const [historyLimit, setHistoryLimit] = useState(HISTORY_PAGE);
  const { data, loading, error, reload } = useAsync(async () => {
    const [{ kid }, { classes }, mem, { sessions }] = await Promise.all([
      api.kid(kidId),
      api.kidClasses(kidId),
      api.memory(kidId),
      api.sessions(kidId, historyLimit)
    ]);
    return { kid, classes, model: mem.model, episodes: mem.episodes, sessions };
  }, [kidId, historyLimit]);
  const { msg, show } = useToast();

  const [showReport, setShowReport] = useState<string>('');
  const [editing, setEditing] = useState(false);

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
              <div className="row" style={{ gap: 8 }}>
                <button className="btn ghost" onClick={() => setEditing((e) => !e)}>{editing ? 'Close' : '✎ Edit'}</button>
                <button className="btn ghost" onClick={() => navigate(`/parent/kid/${kidId}/schedule`)}>📅 Weekly schedule</button>
                <button className="btn" onClick={() => navigate(`/learn/${kidId}`)}>Start learning →</button>
              </div>
            </div>

            {editing && <EditLearner kid={data.kid} onSaved={() => { setEditing(false); reload(); }} onToast={show} />}

            {/* Classes */}
            <h3 style={{ marginTop: 24 }}>Classes</h3>
            <div className="grid cols-2">
              {data.classes.map((c: ClassCard) => (
                <div
                  key={c.classDefinition.id}
                  className="card class-card"
                  style={{ cursor: 'pointer', ...subjectStyle(c.classDefinition.subjectKey) }}
                  onClick={() => {
                    // Curriculum classes have no library page worth opening — jump to their progress below.
                    if (c.progress.curriculum) document.getElementById(`progress-${c.classDefinition.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    else navigate(`/parent/class/${c.classDefinition.id}`);
                  }}
                >
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                      <span className="today-dot" style={{ background: subjectColor(c.classDefinition.subjectKey).accent }} />
                      <strong>{c.classDefinition.yearName} · {c.classDefinition.title}</strong>
                    </span>
                    <span className="muted small">{Math.round(c.progress.completion * 100)}%</span>
                  </div>
                  <div className="bar" style={{ margin: '10px 0' }}><span style={{ width: `${Math.round(c.progress.completion * 100)}%` }} /></div>
                  <span className="muted small">
                    {c.progress.curriculum
                      ? `${c.progress.curriculum.completed} of ${c.progress.curriculum.total} lessons learned`
                      : `${c.topicCount} topics`}
                    {c.recommendation ? ` · next: ${c.recommendation.topicTitle}` : ''}
                  </span>
                </div>
              ))}
            </div>

            {/* Curriculum progress (catalog classes) */}
            {data.classes.some((c) => c.progress.curriculum) && (
              <>
                <h3 style={{ marginTop: 24 }}>Curriculum progress</h3>
                <p className="muted small" style={{ marginTop: -4 }}>
                  Stars are {data.kid.name}'s best result on each lesson: ★ still learning · ★★ learned · ★★★ solid.
                  A lesson counts as learned at ★★, or after two tries (it comes back later as a warm-up).
                </p>
                {data.classes.filter((c) => c.progress.curriculum).map((c) => (
                  <CurriculumCard
                    key={c.classDefinition.id}
                    id={`progress-${c.classDefinition.id}`}
                    title={`${c.classDefinition.yearName} · ${c.classDefinition.title}`}
                    accent={subjectColor(c.classDefinition.subjectKey).accent}
                    progress={c.progress.curriculum!}
                  />
                ))}
              </>
            )}

            <div className="card" style={{ marginTop: 14 }}>
              <h3>Shared class enrollment</h3>
              <p className="muted small">Classes now live in the parent library. Open a class to enroll or remove {data.kid.name}.</p>
              <button className="btn" onClick={() => navigate('/parent/classes')}>Open class library</button>
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
                        {s.status === 'active' && <span className="pill neutral" style={{ marginLeft: 8 }}>not finished</span>}
                        {typeof s.lessonMastery === 'number' && <span style={{ marginLeft: 8 }} title={`Lesson mastery ${Math.round(s.lessonMastery * 100)}%`}><Stars n={starsFor(s.lessonMastery)} /></span>}
                        {s.curriculumId && <span className="pill neutral" style={{ marginLeft: 8 }} title="Authored curriculum lesson"><code>{s.curriculumId}</code></span>}
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
              {data.sessions.length >= historyLimit && historyLimit < HISTORY_MAX && (
                <button className="btn ghost small" style={{ marginTop: 8 }} onClick={() => setHistoryLimit(HISTORY_MAX)}>
                  Show older lessons
                </button>
              )}
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

function EditLearner({ kid, onSaved, onToast }: { kid: import('@shared/types').Kid; onSaved: () => void; onToast: (m: string) => void }) {
  const [name, setName] = useState(kid.name);
  const [age, setAge] = useState(kid.age);
  const [grade, setGrade] = useState(kid.gradeLevel);
  const [interests, setInterests] = useState<string[]>(kid.interests);
  const [character, setCharacter] = useState<AvatarConfig['character']>(kid.avatar.character);
  const [hue, setHue] = useState(kid.avatar.hue);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!name.trim()) return onToast('Name cannot be empty');
    setBusy(true);
    try {
      await api.updateKid(kid.id, {
        name: name.trim(), age, gradeLevel: grade, interests,
        avatar: { ...kid.avatar, character, hue }
      });
      onToast('Saved ✓');
      onSaved();
    } catch (e: any) {
      onToast(e.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card pad-lg" style={{ marginTop: 14, ['--accent-h' as any]: hue }}>
      <h3>Edit {kid.name}</h3>
      <div className="row">
        <div className="grow">
          <label className="field">Name<input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <div className="row">
            <label className="field grow">Age<input type="number" min={4} max={14} value={age} onChange={(e) => setAge(Number(e.target.value))} /></label>
            <label className="field grow">Grade / level<input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} /></label>
          </div>
          <label className="field">Interests<InterestsInput value={interests} onChange={setInterests} /></label>
        </div>
        <div style={{ width: 200, textAlign: 'center' }}>
          <div style={{ width: 130, height: 130, margin: '0 auto' }}>
            <Character character={character} hue={hue} emotion="happy" mouthOpen={0} speaking={false} />
          </div>
          <div className="row center" style={{ gap: 6, marginTop: 6 }}>
            {CHARACTERS.map((c) => <button key={c} className={`btn ${character === c ? '' : 'ghost'} small`} onClick={() => setCharacter(c)}>{c}</button>)}
          </div>
          <label className="field small" style={{ marginTop: 10 }}>Color<input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} style={{ width: '100%' }} /></label>
        </div>
      </div>
      <button className="btn" disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save changes'}</button>
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

/** Mirrors the server's star bands (0.6 learned, 0.85 solid). */
function starsFor(m: number): 1 | 2 | 3 {
  return m >= 0.85 ? 3 : m >= 0.6 ? 2 : 1;
}

function Stars({ n, of = 3 }: { n: number; of?: number }) {
  return (
    <span aria-label={`${n} of ${of} stars`} style={{ letterSpacing: 1, whiteSpace: 'nowrap' }}>
      <span style={{ color: '#f4b400' }}>{'★'.repeat(n)}</span>
      <span style={{ color: '#d5dae3' }}>{'★'.repeat(of - n)}</span>
    </span>
  );
}

function RecLine({ label, rec }: { label: string; rec?: Recommendation }) {
  if (!rec) return null;
  return (
    <div className="kv" style={{ alignItems: 'baseline' }}>
      <strong className="small" style={{ minWidth: 90 }}>{label}</strong>
      <span className="small grow">{rec.note}</span>
    </div>
  );
}

function lessonStatus(l: CurriculumLessonProgress, nextId?: string): { text: string; cls: string } {
  if (l.lessonId === nextId) return { text: l.attempts ? 'try again next' : 'up next', cls: 'warn' };
  if (l.done) return { text: l.attempts > 1 ? `learned · ${l.attempts} tries` : 'learned', cls: 'good' };
  if (l.attempts) return { text: 'not yet', cls: 'bad' };
  return { text: 'not started', cls: 'neutral' };
}

function CurriculumCard({ id, title, accent, progress }: { id: string; title: string; accent: string; progress: CurriculumProgress }) {
  const pct = progress.total ? Math.round((progress.completed / progress.total) * 100) : 0;
  const nextId = progress.next?.topicId;
  return (
    <div id={id} className="card" style={{ marginTop: 12, ['--subject' as any]: accent }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{title}</strong>
        <span className="muted small">{progress.completed} / {progress.total} lessons · {pct}%</span>
      </div>
      <div className="bar" style={{ margin: '10px 0' }}><span style={{ width: `${pct}%` }} /></div>
      {progress.next || progress.review ? (
        <div style={{ marginBottom: 8 }}>
          <RecLine label="What's next" rec={progress.next} />
          <RecLine label="Review" rec={progress.review} />
        </div>
      ) : (
        <p className="small">Every lesson in this subject is learned. 🎉</p>
      )}
      {progress.units.map((u) => {
        const hasNext = u.lessons.some((l) => l.lessonId === nextId);
        return (
          <details key={u.number} open={hasNext} style={{ borderTop: '1px solid #eef0f4', padding: '6px 0' }}>
            <summary style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span className="small"><strong>Unit {u.number}</strong> · {u.title}</span>
              <span className="muted small" style={{ whiteSpace: 'nowrap' }}>
                {u.completed}/{u.total}
                {u.averageMastery !== undefined && <> · avg <Stars n={starsFor(u.averageMastery)} /></>}
              </span>
            </summary>
            <ul className="list-reset" style={{ marginTop: 6 }}>
              {u.lessons.map((l) => {
                const st = lessonStatus(l, nextId);
                return (
                  <li key={l.lessonId} className="kv" style={{ gap: 8 }}>
                    <span className="small grow">{l.lessonNumber}. {l.title}</span>
                    <span className="row" style={{ gap: 8, alignItems: 'center', flex: 'none' }}>
                      {l.stars ? <Stars n={l.stars} /> : null}
                      <span className={`pill ${st.cls}`}>{st.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </div>
  );
}

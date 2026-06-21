import { useState } from 'react';
import type { AvatarConfig } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, useToast, Toast } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';
import { InterestsInput } from '../components/InterestsInput.tsx';
import { subjectColor } from '../lib/subject.ts';
import type { CourseCard } from '../lib/api.ts';

const CHARACTERS: AvatarConfig['character'][] = ['sage', 'nova', 'pip'];

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};

export function ParentDashboard() {
  const { data, loading, error, reload } = useAsync(async () => {
    const [{ kids }, { profiles }] = await Promise.all([api.kids(), api.brainProfiles()]);
    const courseLists = await Promise.all(kids.map((k) => api.courses(k.id).then((r) => r.courses).catch(() => [] as CourseCard[])));
    const coursesByKid: Record<string, CourseCard[]> = {};
    kids.forEach((k, i) => { coursesByKid[k.id] = courseLists[i] ?? []; });
    return { kids, profiles, coursesByKid };
  });
  const { msg, show } = useToast();

  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(12);
  const [grade, setGrade] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [character, setCharacter] = useState<AvatarConfig['character']>('sage');
  const [hue, setHue] = useState(210);
  const [busy, setBusy] = useState(false);

  async function addKid() {
    if (!name.trim()) return show('Enter a name');
    setBusy(true);
    try {
      const { kid } = await api.createKid({
        name: name.trim(),
        age,
        gradeLevel: grade,
        interests,
        avatar: { character, hue, voice: 'default', rate: 1 }
      });
      setAdding(false);
      setName(''); setGrade(''); setInterests([]);
      navigate(`/parent/kid/${kid.id}`);
    } catch (e: any) {
      show(e.message || 'Could not add learner');
    } finally {
      setBusy(false);
    }
  }

  const brainConnected = data?.profiles.some((p) => p.connected);

  return (
    <div className="app">
      <TopBar />
      <div className="container wide">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ marginBottom: 2 }}>{greeting()} 👋</h1>
            <span className="muted">Manage learners, classes, schedules, and reports.</span>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn ghost" onClick={() => navigate('/parent/prompts')}>🔎 AI prompt monitor</button>
            <button className="btn ghost" onClick={() => navigate('/connect')}>
              {brainConnected ? '⚙ Manage AI brain' : '⚡ Connect AI brain'}
            </button>
          </div>
        </div>

        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}

        {data && (
          <>
            {(!brainConnected || data.kids.length === 0) && (
              <div className="card" style={{ marginBottom: 16 }}>
                <h3>Get started</h3>
                <ol className="setup-steps">
                  <li className={brainConnected ? 'done' : ''}>
                    <span className="step-mark">{brainConnected ? '✓' : '1'}</span>
                    <span className="grow"><strong>Connect an AI brain</strong><div className="muted small">Use your own Anthropic/OpenAI key, or a free local model.</div></span>
                    {!brainConnected && <button className="btn small" onClick={() => navigate('/connect')}>Connect</button>}
                  </li>
                  <li className={data.kids.length > 0 ? 'done' : ''}>
                    <span className="step-mark">{data.kids.length > 0 ? '✓' : '2'}</span>
                    <span className="grow"><strong>Add a learner</strong><div className="muted small">Name, age, interests, and a character to learn with.</div></span>
                    {data.kids.length === 0 && <button className="btn small" onClick={() => setAdding(true)}>Add</button>}
                  </li>
                  <li>
                    <span className="step-mark">3</span>
                    <span className="grow"><strong>Create a class</strong><div className="muted small">Open a learner and add a subject (paste a curriculum or let Classai build one).</div></span>
                  </li>
                </ol>
              </div>
            )}

            <h3 style={{ marginTop: 22 }}>Learners</h3>
            <div className="grid cols-2">
              {data.kids.map((k) => {
                const courses = data.coursesByKid[k.id] ?? [];
                return (
                  <div key={k.id} className="card learner-card" style={{ ['--accent-h' as any]: k.avatar.hue }} onClick={() => navigate(`/parent/kid/${k.id}`)}>
                    <div className="row" style={{ alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 64, height: 64, flex: 'none' }}>
                        <Character character={k.avatar.character} hue={k.avatar.hue} emotion="happy" mouthOpen={0} speaking={false} />
                      </div>
                      <div className="grow">
                        <strong style={{ fontSize: '1.1rem' }}>{k.name}</strong>
                        <div className="muted small">{k.gradeLevel || `age ${k.age}`} · {courses.length} {courses.length === 1 ? 'class' : 'classes'}</div>
                      </div>
                      <button className="btn small" onClick={(e) => { e.stopPropagation(); navigate(`/learn/${k.id}`); }}>Start learning →</button>
                    </div>
                    {courses.length > 0 && (
                      <div className="subject-rows">
                        {courses.slice(0, 4).map((c) => (
                          <div key={c.course.id} className="subject-row">
                            <span className="today-dot" style={{ background: subjectColor(c.course.subjectKey).accent }} />
                            <span className="subject-name">{c.course.title}</span>
                            <span className="bar" style={{ ['--subject' as any]: subjectColor(c.course.subjectKey).accent }}><span style={{ width: `${Math.round(c.progress.completion * 100)}%` }} /></span>
                            <span className="muted small" style={{ width: 34, textAlign: 'right' }}>{Math.round(c.progress.completion * 100)}%</span>
                          </div>
                        ))}
                        {courses.length > 4 && <div className="muted small">+{courses.length - 4} more</div>}
                      </div>
                    )}
                  </div>
                );
              })}

              {!adding && (
                <div className="card center add-learner-card" style={{ cursor: 'pointer', minHeight: 100 }} onClick={() => setAdding(true)}>
                  <strong className="muted">+ Add a learner</strong>
                </div>
              )}
            </div>

            {adding && (
              <div className="card pad-lg" style={{ marginTop: 16, ['--accent-h' as any]: hue }}>
                <h3>Add a learner</h3>
                <div className="row">
                  <div className="grow">
                    <label className="field">Name<input type="text" value={name} onChange={(e) => setName(e.target.value)} autoFocus /></label>
                    <div className="row">
                      <label className="field grow">Age<input type="number" min={8} max={19} value={age} onChange={(e) => setAge(Number(e.target.value))} /></label>
                      <label className="field grow">Grade / level<input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="7th grade" /></label>
                    </div>
                    <label className="field">
                      Interests <span className="hint">(used to make examples relatable)</span>
                      <InterestsInput value={interests} onChange={setInterests} />
                    </label>
                  </div>
                  <div style={{ width: 200, textAlign: 'center' }}>
                    <div style={{ width: 140, height: 140, margin: '0 auto' }}>
                      <Character character={character} hue={hue} emotion="happy" mouthOpen={0} speaking={false} />
                    </div>
                    <div className="row center" style={{ gap: 6, marginTop: 6 }}>
                      {CHARACTERS.map((c) => (
                        <button key={c} className={`btn ${character === c ? '' : 'ghost'} small`} onClick={() => setCharacter(c)}>{c}</button>
                      ))}
                    </div>
                    <label className="field small" style={{ marginTop: 10 }}>
                      Color
                      <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} style={{ width: '100%' }} />
                    </label>
                  </div>
                </div>
                <div className="row" style={{ gap: 10 }}>
                  <button className="btn" disabled={busy} onClick={addKid}>{busy ? 'Adding…' : 'Add learner'}</button>
                  <button className="btn ghost" onClick={() => setAdding(false)}>Cancel</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}

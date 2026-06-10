import { useState } from 'react';
import type { AvatarConfig } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, useToast, Toast } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';
import { InterestsInput } from '../components/InterestsInput.tsx';

const CHARACTERS: AvatarConfig['character'][] = ['sage', 'nova', 'pip'];

export function ParentDashboard() {
  const { data, loading, error, reload } = useAsync(async () => {
    const [{ kids }, { profiles }] = await Promise.all([api.kids(), api.brainProfiles()]);
    return { kids, profiles };
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
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Parent area</h1>
          <button className="btn ghost" onClick={() => navigate('/connect')}>
            {brainConnected ? '⚙ Manage AI brain' : '⚡ Connect AI brain'}
          </button>
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

            <h3>Learners</h3>
            <div className="grid cols-2">
              {data.kids.map((k) => (
                <div key={k.id} className="card row" style={{ alignItems: 'center', gap: 14, cursor: 'pointer', ['--accent-h' as any]: k.avatar.hue }} onClick={() => navigate(`/parent/kid/${k.id}`)}>
                  <div style={{ width: 72, height: 72 }}>
                    <Character character={k.avatar.character} hue={k.avatar.hue} emotion="happy" mouthOpen={0} speaking={false} />
                  </div>
                  <div>
                    <strong>{k.name}</strong>
                    <div className="muted small">{k.gradeLevel || `age ${k.age}`}</div>
                    {k.interests.length > 0 && <div className="muted small">likes {k.interests.slice(0, 3).join(', ')}</div>}
                  </div>
                </div>
              ))}

              {!adding && (
                <div className="card center" style={{ cursor: 'pointer', minHeight: 100 }} onClick={() => setAdding(true)}>
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

import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync } from '../lib/ui.tsx';
import { Character } from '../avatar/Character.tsx';

export function Home() {
  const { data, error, loading, reload } = useAsync(async () => {
    const [{ kids }, { profiles }] = await Promise.all([api.kids(), api.brainProfiles()]);
    return { kids, brainConnected: profiles.some((p) => p.connected) };
  });

  return (
    <div className="app">
      <TopBar />
      <div className="container">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && (
          <>
            {!data.brainConnected && (
              <div className="banner" style={{ marginBottom: 18 }}>
                Welcome! First, connect an AI brain so your tutor can think.{' '}
                <button className="btn small" onClick={() => navigate('/connect')}>
                  Connect your brain
                </button>
              </div>
            )}

            {data.kids.length === 0 ? (
              <div className="hero">
                <h1>Your at-home AI tutor</h1>
                <p className="lead">
                  A friendly character that teaches any subject, adapts as it goes, and remembers what your child learns.
                </p>
                <div style={{ marginTop: 22 }}>
                  <button className="btn lg" onClick={() => navigate('/parent')}>
                    Set up the first learner
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="hero">
                  <h1>Who's learning today?</h1>
                </div>
                <div className="grid cols-3">
                  {data.kids.map((k) => (
                    <div
                      key={k.id}
                      className="card learner-tile"
                      style={{ ['--accent-h' as any]: k.avatar.hue }}
                      onClick={() => navigate(`/learn/${k.id}`)}
                    >
                      <div style={{ width: 120, height: 120 }}>
                        <Character character={k.avatar.character} hue={k.avatar.hue} emotion="happy" mouthOpen={0} speaking={false} />
                      </div>
                      <strong style={{ fontSize: '1.2rem' }}>{k.name}</strong>
                      <span className="muted small">{k.gradeLevel || `age ${k.age}`}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

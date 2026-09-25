import { useState, type ReactNode } from 'react';
import { api, PARENT_TOKEN_KEY } from '../lib/api.ts';
import { TopBar, Loading, useAsync } from '../lib/ui.tsx';

const hasToken = (): boolean => {
  try {
    return !!sessionStorage.getItem(PARENT_TOKEN_KEY);
  } catch {
    return false;
  }
};

/** Wraps the parent area behind a simple PIN (set on first use). */
export function ParentGate({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(hasToken);
  const { data, loading } = useAsync(() => api.parentStatus());
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [err, setErr] = useState('');

  if (ok) return <>{children}</>;
  if (loading || !data) {
    return (
      <div className="app">
        <TopBar />
        <Loading />
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      let token: string;
      if (!data!.pinSet) {
        if (!/^\d{4,8}$/.test(pin)) return setErr('Use 4–8 digits.');
        if (pin !== pin2) return setErr('PINs do not match.');
        ({ token } = await api.parentSetPin(pin));
      } else {
        ({ token } = await api.parentVerify(pin));
      }
      try {
        sessionStorage.setItem(PARENT_TOKEN_KEY, token);
      } catch {
        /* storage unavailable: gate re-prompts next navigation */
      }
      setOk(true);
    } catch (e: any) {
      setErr(e.message || 'Incorrect PIN');
    }
  }

  return (
    <div className="app">
      <TopBar />
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="card pad-lg">
          <h2>{data.pinSet ? 'Parent area' : 'Set a parent PIN'}</h2>
          <p className="muted small">{data.pinSet ? 'Enter your PIN to manage learners, classes, and reports.' : 'Protects the parent area. Kids won’t need this to learn.'}</p>
          <form onSubmit={submit}>
            <label className="field">
              PIN
              <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} autoFocus />
            </label>
            {!data.pinSet && (
              <label className="field">
                Confirm PIN
                <input type="password" inputMode="numeric" value={pin2} onChange={(e) => setPin2(e.target.value)} />
              </label>
            )}
            {err && <p className="pill bad" style={{ display: 'inline-block' }}>{err}</p>}
            <button className="btn block" type="submit">{data.pinSet ? 'Enter' : 'Set PIN'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

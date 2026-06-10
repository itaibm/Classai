import { useState, type ReactNode } from 'react';
import { api } from '../lib/api.ts';
import { TopBar, Loading, useAsync } from '../lib/ui.tsx';

const OK_KEY = 'classai_parent_ok';

/** Wraps the parent area behind a simple PIN (set on first use). */
export function ParentGate({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(sessionStorage.getItem(OK_KEY) === '1');
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
      if (!data!.pinSet) {
        if (pin.length < 4) return setErr('Use at least 4 digits.');
        if (pin !== pin2) return setErr('PINs do not match.');
        await api.parentSetPin(pin);
      } else {
        await api.parentVerify(pin);
      }
      sessionStorage.setItem(OK_KEY, '1');
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

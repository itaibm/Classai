import { useCallback, useEffect, useState } from 'react';
import { navigate } from './router.ts';

/** Run an async loader; re-run with reload(). */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const run = useCallback(() => {
    setLoading(true);
    setError(null);
    fn()
      .then((d) => setData(d))
      .catch((e) => setError(e.message || 'Something went wrong'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(run, [run]);
  return { data, error, loading, reload: run, setData };
}

export function TopBar({ accentHue = 210 }: { accentHue?: number }) {
  return (
    <div className="topbar" style={{ ['--accent-h' as any]: accentHue }}>
      <div className="brand" onClick={() => navigate('/')}>
        Class<span>ai</span>
      </div>
      <div className="spacer" />
      <button className="btn ghost small" onClick={() => navigate('/parent')}>
        Parent area
      </button>
    </div>
  );
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="row center" style={{ gap: 10, padding: 40 }}>
      <div className="spinner" /> <span className="muted">{label}</span>
    </div>
  );
}

export function ErrorNote({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <div className="banner warn" role="alert">
      {error} {onRetry && <button className="btn ghost small" onClick={onRetry}>Retry</button>}
    </div>
  );
}

export function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

export function useToast() {
  const [msg, setMsg] = useState('');
  const show = useCallback((m: string, ms = 2600) => {
    setMsg(m);
    setTimeout(() => setMsg(''), ms);
  }, []);
  return { msg, show };
}

export function masteryPill(m: number) {
  if (m >= 0.8) return { cls: 'good', label: 'Strong' };
  if (m >= 0.5) return { cls: 'warn', label: 'Building' };
  if (m > 0) return { cls: 'bad', label: 'Shaky' };
  return { cls: 'neutral', label: 'New' };
}

import { useCallback, useEffect, useState } from 'react';
import { navigate } from './router.ts';

/** True when the user asked the OS/browser to minimise motion. Checked at call
 *  time so JS-driven animation (word-by-word captions, confetti) can skip itself;
 *  CSS animations are already disabled globally in styles.css. */
export function prefersReducedMotion(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

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
      <button type="button" className="brand" aria-label="Classai home" onClick={() => navigate('/')}>
        Class<span>ai</span>
      </button>
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

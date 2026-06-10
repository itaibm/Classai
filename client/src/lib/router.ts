import { useEffect, useState } from 'react';

const getHash = (): string => window.location.hash.replace(/^#/, '') || '/';

export function navigate(path: string): void {
  window.location.hash = path;
}

export function useRoute(): string {
  const [path, setPath] = useState(getHash());
  useEffect(() => {
    const fn = () => setPath(getHash());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return path;
}

/** Match '/parent/kid/:id' against '/parent/kid/abc' -> { id: 'abc' } or null. */
export function match(pattern: string, path: string): Record<string, string> | null {
  const pp = pattern.split('/').filter(Boolean);
  const xp = path.split('/').filter(Boolean);
  if (pp.length !== xp.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < pp.length; i++) {
    const seg = pp[i]!;
    if (seg.startsWith(':')) params[seg.slice(1)] = decodeURIComponent(xp[i]!);
    else if (seg !== xp[i]) return null;
  }
  return params;
}

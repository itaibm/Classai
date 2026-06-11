import { useEffect, useRef } from 'react';
import type { BlockResult } from '@shared/types';

/**
 * Helper for interactive blocks: schedule the (single) completion and any
 * feedback timers so they can't double-fire and are cleared if the block
 * unmounts (e.g. the turn advances or the kid leaves). Fixes the class of bug
 * where a delayed onComplete from one turn fired during the next.
 */
export function useTurnComplete(onComplete: (r: BlockResult) => void) {
  const done = useRef(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => { timers.current.forEach((t) => clearTimeout(t)); }, []);

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };
  const complete = (r: BlockResult, ms = 0) => {
    if (done.current) return;
    done.current = true;
    schedule(() => onComplete(r), ms);
  };
  return { complete, schedule };
}

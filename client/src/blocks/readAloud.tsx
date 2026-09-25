/**
 * Read-aloud for questions: a 6-year-old often can't read the prompt or the
 * options yet. The Classroom provides a `read` function (it knows the tutor's
 * voice settings); blocks show a 🔊 button that reads the prompt and then each
 * option, highlighting the one being read.
 */
import { createContext, useContext, useEffect, useRef, useState } from 'react';

/** Speak `parts` in order; `onPart(i)` fires as each starts (-1 when done). Returns a stop fn. */
export type ReadFn = (parts: string[], onPart?: (i: number) => void) => () => void;

export const ReadAloudContext = createContext<ReadFn | null>(null);

/** Hook for a block: `reading` is the index of the part being read (-1 = none). */
export function useReadAloud(parts: string[]) {
  const read = useContext(ReadAloudContext);
  const [reading, setReading] = useState(-1);
  const stopRef = useRef<(() => void) | null>(null);
  useEffect(() => () => stopRef.current?.(), []);
  const start = () => {
    stopRef.current?.();
    if (!read) return;
    stopRef.current = read(parts, setReading);
  };
  return { available: !!read, reading, start };
}

export function ReadAloudButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="read-aloud" onClick={onClick} aria-label="Read it to me" title="Read it to me">
      🔊
    </button>
  );
}

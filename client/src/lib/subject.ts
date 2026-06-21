/** Per-subject color identity. Keyed by Course.subjectKey (see server/src/ai/subjects.ts). */
import type { CSSProperties } from 'react';

export interface SubjectColor { accent: string; soft: string; ink: string }

export const SUBJECT_COLORS: Record<string, SubjectColor> = {
  math:           { accent: '#5b6cff', soft: '#eef0ff', ink: '#3a45c4' }, // indigo
  science:        { accent: '#1bb6a6', soft: '#e6f8f5', ink: '#0f7c70' }, // teal
  language_arts:  { accent: '#ff7a6b', soft: '#fff0ee', ink: '#c9483a' }, // coral
  world_language: { accent: '#9a6cff', soft: '#f2ecff', ink: '#6a3fd0' }, // violet
  history:        { accent: '#e8a33a', soft: '#fdf3e1', ink: '#a96f15' }, // amber
  general:        { accent: '#5b6cff', soft: '#eef0ff', ink: '#3a45c4' }, // slate-indigo
  default:        { accent: '#5b6cff', soft: '#eef0ff', ink: '#3a45c4' },
};

export function subjectColor(key?: string): SubjectColor {
  return (key && SUBJECT_COLORS[key]) || SUBJECT_COLORS.default!;
}

/** Inline style that sets the --subject* custom properties for a themed subtree. */
export function subjectStyle(key?: string): CSSProperties {
  const c = subjectColor(key);
  return {
    ['--subject' as any]: c.accent,
    ['--subject-soft' as any]: c.soft,
    ['--subject-ink' as any]: c.ink,
  };
}

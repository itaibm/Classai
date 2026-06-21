/**
 * In-memory prompt log — a transparency feature for the Parent area.
 *
 * Every `brain.generate()` call (see `withPromptLog` in provider.ts) records the
 * exact system prompt, messages, and reply here, so a parent can monitor what
 * the AI is being told about their child. It's a small ring buffer kept only in
 * memory: nothing is persisted to disk, and it clears on restart.
 */
import type { PromptLogEntry } from '../../../shared/types.ts';

const MAX_ENTRIES = 60;
const entries: PromptLogEntry[] = [];

export function recordPrompt(entry: PromptLogEntry): void {
  entries.unshift(entry); // newest first
  if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
}

export function getPromptLog(): PromptLogEntry[] {
  return entries;
}

export function clearPromptLog(): void {
  entries.length = 0;
}

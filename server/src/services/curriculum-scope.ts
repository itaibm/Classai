/**
 * Scope-file parser — turns a `<subject>-year-N.md` outline into structured
 * units + lesson outlines. Pure (no I/O). The scope files are uniform across
 * every subject and year:
 *
 *   ## Year overview
 *   ...prose...
 *   ## Unit 1 — Title
 *   **Essential question:** ...
 *   **Key vocabulary:** a, b, c
 *   ### Lesson 1 — Title
 *   - **Duration:** 22 min
 *   - **Objective:** "..."
 *   - **Hook:** ...
 *   - **Key activity:** ...
 *   - **Check for understanding:** ...
 *   - **Differentiation:** support: ... / stretch: ...
 *   - **Materials:** ...
 *   - **Joy:** ...
 *   **End-of-unit check:** ...
 *
 * A lesson needs only its `### Lesson N —` heading to be counted; every field is
 * optional and defaults to empty, so thin scope files still parse.
 */
import type { ParsedScope, ScopeUnit, LessonOutline } from '../../../shared/types.ts';

const DASH = '[—–-]'; // em / en / hyphen — headings use em dash, be tolerant
const UNIT_RE = new RegExp(`^##\\s+Unit\\s+(\\d+)\\s*${DASH}\\s*(.+?)\\s*$`);
const LESSON_RE = new RegExp(`^###\\s+Lesson\\s+(\\d+)\\s*${DASH}\\s*(.+?)\\s*$`);
// A "- **Field:**value" or "**Field:** value" bullet (colon lives inside the bold).
const FIELD_RE = /^\s*-?\s*\*\*([^*:]+):\*\*\s*(.*)$/;

function emptyLesson(lessonNumber: number, unitNumber: number, title: string): LessonOutline {
  return {
    lessonNumber,
    unitNumber,
    title,
    durationMin: 0,
    objective: '',
    hook: '',
    keyActivity: '',
    check: '',
    differentiation: { support: '', stretch: '' },
    materials: '',
    joy: ''
  };
}

function stripQuotes(s: string): string {
  return s.trim().replace(/^["“”']|["“”']$/g, '').trim();
}

function parseDifferentiation(value: string): { support: string; stretch: string } {
  const supportMatch = value.match(/support:\s*([^]*?)(?:\s*\/\s*stretch:|$)/i);
  const stretchMatch = value.match(/stretch:\s*([^]*)$/i);
  if (supportMatch || stretchMatch) {
    return { support: (supportMatch?.[1] || '').trim(), stretch: (stretchMatch?.[1] || '').trim() };
  }
  return { support: value.trim(), stretch: '' };
}

function applyField(lesson: LessonOutline, unit: ScopeUnit, rawName: string, value: string): void {
  const name = rawName.trim().toLowerCase();
  const v = value.trim();
  switch (name) {
    case 'duration': {
      const n = v.match(/\d+/);
      if (n) lesson.durationMin = Number(n[0]);
      break;
    }
    case 'objective':
      lesson.objective = stripQuotes(v);
      break;
    case 'hook':
      lesson.hook = stripQuotes(v);
      break;
    case 'key activity':
      lesson.keyActivity = v;
      break;
    case 'check for understanding':
      lesson.check = v;
      break;
    case 'differentiation':
      lesson.differentiation = parseDifferentiation(v);
      break;
    case 'materials':
      lesson.materials = v;
      break;
    case 'joy':
      lesson.joy = v;
      break;
    default:
      break; // unit-level fields (essential question, etc.) handled elsewhere
  }
  void unit;
}

export function parseScopeFile(markdown: string): ParsedScope {
  const lines = markdown.split(/\r?\n/);
  const units: ScopeUnit[] = [];
  let yearOverview = '';
  let inOverview = false;
  let unit: ScopeUnit | null = null;
  let lesson: LessonOutline | null = null;

  const flushLesson = () => {
    if (lesson && unit) unit.lessons.push(lesson);
    lesson = null;
  };

  for (const line of lines) {
    // Section headings reset context.
    if (/^##\s+Year overview/i.test(line)) {
      flushLesson();
      inOverview = true;
      continue;
    }
    const unitMatch = line.match(UNIT_RE);
    if (unitMatch) {
      flushLesson();
      inOverview = false;
      unit = {
        number: Number(unitMatch[1]),
        title: (unitMatch[2] || '').trim(),
        essentialQuestion: '',
        keyVocabulary: [],
        endOfUnitCheck: '',
        lessons: []
      };
      units.push(unit);
      continue;
    }
    if (/^##\s+/.test(line)) {
      // Some other H2 section (e.g. "## Assessment") — leave the current unit open
      // for its lessons but stop collecting overview text.
      flushLesson();
      inOverview = false;
      continue;
    }

    const lessonMatch = line.match(LESSON_RE);
    if (lessonMatch && unit) {
      flushLesson();
      lesson = emptyLesson(Number(lessonMatch[1]), unit.number, (lessonMatch[2] || '').trim());
      continue;
    }

    // Unit-level metadata (only when not inside a lesson).
    if (unit && !lesson) {
      const field = line.match(FIELD_RE);
      if (field) {
        const name = (field[1] || '').trim().toLowerCase();
        const value = (field[2] || '').trim();
        if (name === 'essential question') unit.essentialQuestion = stripQuotes(value);
        else if (name === 'key vocabulary') unit.keyVocabulary = value.split(/[,;]/).map((s) => s.trim().replace(/\.$/, '')).filter(Boolean);
        else if (name === 'end-of-unit check') unit.endOfUnitCheck = value;
        continue;
      }
    }

    // Lesson-level fields.
    if (lesson && unit) {
      const field = line.match(FIELD_RE);
      if (field) {
        applyField(lesson, unit, field[1] || '', field[2] || '');
        continue;
      }
    }

    if (inOverview && line.trim() && !/^[-*_]{3,}$/.test(line.trim())) {
      yearOverview += (yearOverview ? ' ' : '') + line.trim();
    }
  }
  flushLesson();

  return { yearOverview: yearOverview.trim(), units };
}

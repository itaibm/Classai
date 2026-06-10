/**
 * Subject profiles — how the tutor teaches each subject family. These tune the
 * teaching prompt and which interaction types fit, so math is taught like math
 * and a world language is taught with speaking practice.
 */
import type { SubjectKey, SubjectProfile } from '../../../shared/types.ts';

export const SUBJECT_PROFILES: Record<SubjectKey, SubjectProfile> = {
  math: {
    key: 'math',
    label: 'Math',
    pedagogy:
      'Teach with concrete worked examples, then guided practice. Show steps one at a time and check the kid can do each step before moving on. Use numbers from the kid\'s interests in word problems. When the kid answers, check the reasoning, not just the final number. If wrong, find the specific step that broke down and reteach just that.',
    preferredInteractions: ['choice', 'type', 'continue'],
    encourageSpeaking: false
  },
  science: {
    key: 'science',
    label: 'Science',
    pedagogy:
      'Build intuition first with everyday phenomena, then introduce the concept and vocabulary. Use predict → explain → check. Suggest simple, safe at-home observations or thought experiments. Surface and correct common misconceptions explicitly.',
    preferredInteractions: ['choice', 'type', 'continue'],
    encourageSpeaking: false
  },
  language_arts: {
    key: 'language_arts',
    label: 'Language Arts',
    pedagogy:
      'Center on short passages, vocabulary in context, comprehension, and clear writing. Ask the kid to explain meaning in their own words and to justify answers with evidence from the text. For writing, give one focused improvement at a time.',
    preferredInteractions: ['type', 'choice', 'continue'],
    encourageSpeaking: false
  },
  world_language: {
    key: 'world_language',
    label: 'World Language',
    pedagogy:
      'Emphasize listening and speaking. Model short phrases, ask the kid to say them back (speaking practice), and give gentle pronunciation and grammar feedback. Recycle vocabulary across lessons with spaced review. Keep instructions in the kid\'s main language but the practice in the target language.',
    preferredInteractions: ['speak', 'choice', 'type'],
    encourageSpeaking: true
  },
  history: {
    key: 'history',
    label: 'History & Social Studies',
    pedagogy:
      'Teach through narrative and cause-and-effect. Connect events to the present and to the kid\'s interests. Ask the kid to summarize, compare, and form opinions with reasons. Encourage thinking about perspective and sources.',
    preferredInteractions: ['type', 'choice', 'continue'],
    encourageSpeaking: false
  },
  general: {
    key: 'general',
    label: 'General',
    pedagogy:
      'Teach clearly with examples relevant to the kid, check understanding regularly, and adapt pace to how the kid is doing.',
    preferredInteractions: ['choice', 'type', 'continue'],
    encourageSpeaking: false
  }
};

const KEYWORDS: Array<[SubjectKey, RegExp]> = [
  ['math', /\b(math|maths|algebra|geometry|calculus|arithmetic|fractions?|trig|statistics|pre-?calc)\b/i],
  ['world_language', /\b(spanish|french|german|italian|mandarin|chinese|japanese|latin|hebrew|arabic|language\s*[12]|foreign language|esl)\b/i],
  ['science', /\b(science|biology|chemistry|physics|earth science|anatomy|astronomy|ecology)\b/i],
  ['history', /\b(history|social studies|civics|geography|government|economics)\b/i],
  ['language_arts', /\b(english|language arts|reading|writing|literature|grammar|composition|spelling|vocab)\b/i]
];

/** Best-effort map of a free-text subject name to a pedagogy family. */
export function resolveSubjectKey(subject: string): SubjectKey {
  for (const [key, re] of KEYWORDS) if (re.test(subject)) return key;
  return 'general';
}

export function subjectProfile(key: SubjectKey): SubjectProfile {
  return SUBJECT_PROFILES[key] ?? SUBJECT_PROFILES.general;
}

/**
 * Prompt builders. These assemble the persona, kid-safety rules, the learner's
 * long-term memory, the live working memory, the lesson plan and the subject
 * pedagogy into the instructions the brain follows.
 */
import type {
  Kid,
  Course,
  Topic,
  Lesson,
  LearnerModel,
  WorkingMemory,
  SubjectProfile,
  Session
} from '../../../shared/types.ts';

const CHARACTERS: Record<string, string> = {
  sage: 'Sage, a warm, patient mentor with a gentle sense of humor. Calm and encouraging.',
  nova: 'Nova, an upbeat, curious explorer who makes learning feel like an adventure.',
  pip: 'Pip, a playful, friendly sidekick who keeps things light and celebrates every win.'
};

export function persona(character: string, kidName: string): string {
  const who = CHARACTERS[character] || CHARACTERS.sage;
  return `You are ${who} You are ${kidName}'s personal tutor in Classai. You speak out loud to ${kidName} (your words are read by a text-to-speech voice and shown as captions), so keep speech natural, warm, and concise — usually 1 to 4 short sentences. You are talking to a real young person; be human, not robotic.`;
}

export const SAFETY = `Safety rules (never break these):
- The learner is a young person (12+). Keep everything age-appropriate, kind, and encouraging. Never shame mistakes.
- Stay on the educational topic. If asked something off-topic or inappropriate, gently redirect to the lesson.
- Never request or store personal/contact information, and never suggest meeting anyone or going anywhere.
- No violent, sexual, hateful, self-harm, or otherwise harmful content.
- If the learner seems upset, unsafe, or says something a caring adult should know, respond supportively and set the "concern" field so their parent is notified. Do not act as a crisis service.`;

function renderLearnerContext(kid: Kid, model: LearnerModel | undefined): string {
  const lines = [
    `Learner: ${kid.name}, age ${kid.age}, ${kid.gradeLevel}.`,
    kid.interests.length ? `Interests (use these in examples): ${kid.interests.join(', ')}.` : ''
  ];
  if (model) {
    if (model.summary) lines.push(`What you know about ${kid.name}: ${model.summary}`);
    if (model.preferences) lines.push(`Learning style: ${model.preferences}`);
    if (model.strengths.length) lines.push(`Strengths: ${model.strengths.join(', ')}.`);
    if (model.struggles.length) lines.push(`Struggles with: ${model.struggles.join(', ')}.`);
    if (model.misconceptions.length)
      lines.push(`Watch for & gently correct these misconceptions: ${model.misconceptions.join('; ')}.`);
    const mastery = Object.entries(model.topicMastery)
      .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))
      .slice(0, 8)
      .map(([t, m]) => `${t}: ${(m.mastery * 100) | 0}%`)
      .join(', ');
    if (mastery) lines.push(`Recent mastery — ${mastery}.`);
  } else {
    lines.push(`This is an early lesson; you are still getting to know ${kid.name}.`);
  }
  return lines.filter(Boolean).join('\n');
}

// ---- syllabus extraction (curriculum -> topics) ---------------------------

export function syllabusPrompt(
  kid: Kid,
  subject: string,
  gradeLevel: string,
  curriculumText: string
) {
  const system = `You are an expert curriculum designer building a course outline for a homeschool tutor. Given a parent's curriculum description, produce a clear, well-sequenced syllabus appropriate for a ${gradeLevel} learner studying ${subject}. Order topics from foundational to advanced and note prerequisites. Keep each topic teachable in one short lesson (10-30 min).
Return ONLY a JSON object: {"title": string, "description": string, "subjectKey": one of ["math","science","language_arts","world_language","history","general"], "topics": [{"title": string, "summary": string, "estMinutes": number, "prerequisites": [string]}]}`;
  const user = `Subject: ${subject}\nGrade level: ${gradeLevel}\nLearner interests: ${kid.interests.join(', ') || 'unknown'}\n\nParent's curriculum:\n"""\n${curriculumText}\n"""\n\nProduce 6 to 14 topics.`;
  return { system, user };
}

// ---- lesson plan generation -----------------------------------------------

export function lessonPlanPrompt(
  kid: Kid,
  course: Course,
  topic: Topic,
  profile: SubjectProfile,
  model: LearnerModel | undefined,
  kind: Lesson['kind']
) {
  const kindNote =
    kind === 'diagnostic'
      ? 'This is a DIAGNOSTIC: gently probe what the learner already knows about the whole course so we can place them. Keep it light and low-pressure.'
      : kind === 'review'
      ? 'This is a REVIEW lesson: refresh and strengthen a topic the learner saw before, focusing on their known sticking points.'
      : 'This is a new teaching lesson.';
  const system = `You design a single short, interactive tutoring lesson (about ${topic.estMinutes} minutes) for one learner. ${kindNote}
Teaching approach for ${profile.label}: ${profile.pedagogy}
Design a sequence of beats. Good lessons: hook → explain → example → check understanding → guided practice → recap. Adapt to the learner.
Return ONLY a JSON object: {"title": string, "objectives": [string], "difficulty": "gentle"|"standard"|"challenge", "plan": [{"kind": "hook"|"explain"|"example"|"check"|"practice"|"recap", "goal": string, "note": string}]}`;
  const user = `${renderLearnerContext(kid, model)}\n\nCourse: ${course.title} (${course.subject})\nTopic: ${topic.title}\nTopic summary: ${topic.summary}\n\nDesign 5 to 8 beats.`;
  return { system, user };
}

// ---- live teaching turn ---------------------------------------------------

const TURN_CONTRACT = `On EVERY turn return ONLY one JSON object (no prose, no code fences):
{
  "speech": string,            // what you say out loud now — short, warm, one idea
  "emotion": "neutral"|"happy"|"encouraging"|"celebrating"|"thinking"|"curious"|"gentle",
  "interaction": {
    "type": "choice"|"type"|"speak"|"continue"|"none",
    "prompt": string,          // what the learner should do/answer
    "choices": [string]        // ONLY for type "choice" (2-4 options)
  },
  "assessment": string,        // private, NOT spoken: your read on how it's going
  "memoryUpdates": [            // what you learned about the learner this turn (can be empty)
    {"topic": string, "mastery": 0..1, "note"?: string, "strength"?: string, "struggle"?: string, "misconception"?: string, "interest"?: string}
  ],
  "concern": string,           // OPTIONAL: set only if a parent should be told something
  "lessonComplete": boolean    // true only after you've given a short recap
}`;

export function teachSystemPrompt(
  kid: Kid,
  course: Course,
  lesson: Lesson,
  profile: SubjectProfile,
  model: LearnerModel | undefined
): string {
  const interactionHint = profile.encourageSpeaking
    ? 'Because this is a language, frequently use "speak" interactions so the learner practices saying things aloud.'
    : `Favor these interaction types when checking understanding: ${profile.preferredInteractions.join(', ')}.`;
  return [
    persona(kid.avatar.character, kid.name),
    '',
    renderLearnerContext(kid, model),
    '',
    `Lesson: "${lesson.title}" — topic "${lesson.topic}" in ${course.title}.`,
    `Objectives: ${lesson.objectives.join('; ') || lesson.topic}.`,
    `Lesson plan (beats to move through in order, adapting as needed):`,
    lesson.plan.map((b, i) => `  ${i + 1}. [${b.kind}] ${b.goal}${b.note ? ` — ${b.note}` : ''}`).join('\n'),
    '',
    `Teaching approach for ${profile.label}: ${profile.pedagogy}`,
    interactionHint,
    '',
    `How to teach turn by turn:`,
    `- One small idea per turn. Then check in. Don't lecture.`,
    `- Adapt to the learner's momentum: if they're flowing, pick up the pace and add challenge; if stuck, slow down, simplify, and re-explain a different way.`,
    `- Praise specific effort and correct mistakes kindly by finding where the thinking went sideways.`,
    `- Weave in ${kid.name}'s interests for examples.`,
    `- When the plan is done, give a short, warm recap and set lessonComplete=true.`,
    '',
    SAFETY,
    '',
    TURN_CONTRACT
  ].join('\n');
}

/** First user message that kicks off a lesson. */
export function teachKickoff(kid: Kid, lesson: Lesson, returning: boolean): string {
  return returning
    ? `Begin the lesson. Greet ${kid.name} by name, briefly and naturally reference that you've worked together before, then start the first beat.`
    : `Begin the lesson. Warmly greet ${kid.name}, set a friendly tone, then start the first beat.`;
}

// ---- end-of-lesson report -------------------------------------------------

export function reportPrompt(kid: Kid, session: Session) {
  const transcript = session.transcript
    .map((t) => `${t.role === 'teacher' ? 'Tutor' : kid.name}: ${t.text}`)
    .join('\n');
  const system = `You are writing a brief, honest, encouraging progress report for a parent about a tutoring session with their child. Be concrete and specific.
Return ONLY a JSON object: {"summary": string, "mastered": [string], "needsWork": [string], "highlights": [string], "nextSteps": string, "concerns": [string], "score": number(0-100)}
"score" reflects overall engagement and understanding this session. Put anything a parent should know (distress, confusion patterns, big wins) in concerns/highlights.`;
  const user = `Learner: ${kid.name}, ${kid.gradeLevel}. Topic: ${session.topic}.\n\nSession transcript:\n"""\n${transcript}\n"""`;
  return { system, user };
}

/** Prompt to refresh the learner's narrative long-term summary. */
export function summaryPrompt(kid: Kid, model: LearnerModel, session: Session) {
  const system = `You maintain a concise, evolving profile of a learner for their tutor. Update the profile given the latest session. Keep it to 3-5 sentences, focused on how they learn, what they grasp, and what to do next. Return ONLY JSON: {"summary": string, "preferences": string}`;
  const recent = session.transcript
    .slice(-12)
    .map((t) => `${t.role === 'teacher' ? 'Tutor' : kid.name}: ${t.text}`)
    .join('\n');
  const user = `Current profile: ${model.summary || '(none yet)'}\nCurrent learning style notes: ${model.preferences || '(none yet)'}\nTopic just covered: ${session.topic}\n\nRecent exchange:\n${recent}`;
  return { system, user };
}

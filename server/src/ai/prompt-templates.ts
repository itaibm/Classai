/**
 * Renders the app's prompt templates with representative SAMPLE data, so the
 * Parent area can show exactly what the AI is instructed to do at each step.
 * Nothing here touches real learner data — the sample learner "Alex" exists only
 * to fill the placeholders so the templates read naturally.
 */
import type {
  Kid, Course, Topic, Lesson, Session, LearnerModel, LessonAnalysis, PromptTemplate
} from '../../../shared/types.ts';
import { subjectProfile } from './subjects.ts';
import {
  persona, SAFETY, TEACHING_PRINCIPLES,
  syllabusPrompt, lessonAnalysisPrompt, lessonPlanPrompt,
  teachSystemPrompt, teachKickoff, reportPrompt, summaryPrompt
} from './prompts.ts';

// --- sample data (placeholders only) ---------------------------------------

const kid = {
  id: 'sample', name: 'Alex', age: 12, gradeLevel: '7th grade',
  interests: ['soccer', 'space', 'drawing'],
  avatar: { character: 'sage', hue: 210, voice: 'default', rate: 1 },
  createdAt: '2026-01-01T00:00:00.000Z'
} as unknown as Kid;

const model = {
  kidId: 'sample',
  summary: 'Alex grasps ideas fast when they connect to real examples, but rushes and makes careless sign errors.',
  preferences: 'Learns best with a quick visual and one worked example before trying it themselves.',
  strengths: ['mental math', 'explaining their reasoning'],
  struggles: ['negative numbers', 'multi-step word problems'],
  misconceptions: ['believes "adding" always makes a number bigger'],
  interests: ['soccer', 'space'],
  topicMastery: { 'Adding integers': { mastery: 0.55, updatedAt: '2026-05-01T00:00:00.000Z' } }
} as unknown as LearnerModel;

const course = {
  id: 'sample', yearId: 'year-7', yearName: 'Year 7', title: 'Pre-Algebra', subject: 'Math',
  subjectKey: 'math', description: '', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z'
} as unknown as Course;

const topic = {
  id: 'sample', classId: 'sample', title: 'Adding Integers',
  summary: 'Adding positive and negative whole numbers using a number line.',
  estMinutes: 20, prerequisites: ['Number line basics'], order: 1
} as unknown as Topic;

const analysis: LessonAnalysis = {
  keyConcepts: ['Integers extend the number line below zero', 'Adding a negative moves you left'],
  misconceptions: ['"Adding" always increases the total', 'The sign of the bigger number is ignored'],
  hooks: ['Goal difference in soccer (goals for − goals against)', 'Temperature above and below zero'],
  priorKnowledge: ['Reading a number line', 'Single-digit addition']
};

const lesson = {
  id: 'sample', classId: 'sample', familyId: 'family-sample', revision: 1, topicId: 'sample',
  kind: 'lesson', subject: 'Math', topic: 'Adding Integers',
  title: 'Adding Integers with a Number Line', difficulty: 'standard',
  objectives: ['Add two integers using a number line', 'Predict the sign of a sum'],
  analysis,
  plan: [
    { kind: 'hook', goal: 'Connect to soccer goal difference', note: 'Use goals for/against as +/-', successCriteria: 'Alex relates +/- to a real situation' },
    { kind: 'explain', goal: 'Show that adding a negative moves left on the line', note: '', successCriteria: 'Alex restates the rule in their own words' },
    {
      kind: 'check', goal: 'Check understanding of -3 + 5', note: '', successCriteria: 'Gets 2 with correct reasoning',
      check: { question: 'What is -3 + 5?', expectedAnswer: '2 — start at -3 and move 5 to the right', wrongAnswers: [{ answer: '-8', why: 'added the magnitudes and kept the negative sign', remedy: 'walk it on the number line, counting the direction of each step' }] }
    }
  ],
  status: 'approved', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z'
} as unknown as Lesson;

const session = {
  id: 'sample', topic: 'Adding Integers',
  working: { checksPassed: 2, checksTotal: 3, struggleStreak: 0, momentum: 'flowing', turnsSinceCheck: 1 },
  transcript: [
    { role: 'teacher', text: "Let's start with soccer: your team scores 3 goals and lets in 5. What's the goal difference?" },
    { role: 'learner', text: 'minus 2?' },
    { role: 'teacher', text: 'Exactly — you moved the right direction on the number line. How did you know it was negative?' }
  ]
} as unknown as Session;

const profile = subjectProfile('math');

// --- assemble the template list --------------------------------------------

/** Build the reviewable list of prompt templates with sample data filled in. */
export function promptTemplates(): PromptTemplate[] {
  const syllabus = syllabusPrompt(course.subject, course.yearName, "Chapter 3: Integers — adding and subtracting positive and negative numbers.");
  const lessonAnalysis = lessonAnalysisPrompt(kid, course, topic, profile, model);
  const plan = lessonPlanPrompt(kid, course, topic, profile, model, 'lesson', analysis);
  const report = reportPrompt(kid, session);
  const summary = summaryPrompt(kid, model, session);

  return [
    {
      key: 'persona',
      title: 'Tutor persona',
      description: 'Sets the character’s voice and reminds the AI its words are spoken aloud. Prepended to every live teaching prompt.',
      system: persona(kid.avatar.character, kid.name)
    },
    {
      key: 'safety',
      title: 'Safety rules',
      description: 'Hard safety constraints included in every live teaching turn.',
      system: SAFETY
    },
    {
      key: 'principles',
      title: 'Teaching principles',
      description: 'The pedagogy (gradual release, Socratic hinting, process praise) injected into every teaching turn.',
      system: TEACHING_PRINCIPLES
    },
    {
      key: 'teach',
      title: 'Live teaching turn — full system prompt',
      description: 'The complete instructions the tutor receives every turn: persona, what it knows about your child, the lesson plan, the visual “tool belt”, safety rules, and the required reply format. (Shown with the sample learner.)',
      system: teachSystemPrompt(kid, course, lesson, profile, model),
      user: teachKickoff(kid, lesson, false)
    },
    {
      key: 'syllabus',
      title: 'Build a syllabus',
      description: 'Turns a parent’s curriculum into an ordered list of teachable topics.',
      system: syllabus.system,
      user: syllabus.user
    },
    {
      key: 'analysis',
      title: 'Lesson design — analyse the topic',
      description: 'Pass 1 of lesson creation: identifies key concepts, common misconceptions, and hooks for your child.',
      system: lessonAnalysis.system,
      user: lessonAnalysis.user
    },
    {
      key: 'plan',
      title: 'Lesson design — write the plan',
      description: 'Pass 2: drafts the gradual-release lesson with pre-authored checks and remedies.',
      system: plan.system,
      user: plan.user
    },
    {
      key: 'report',
      title: 'End-of-lesson parent report',
      description: 'Writes the honest progress report you see after a session.',
      system: report.system,
      user: report.user
    },
    {
      key: 'summary',
      title: 'Update the learner profile',
      description: 'Maintains the evolving “what the tutor knows about your child” memory after each session.',
      system: summary.system,
      user: summary.user
    }
  ];
}

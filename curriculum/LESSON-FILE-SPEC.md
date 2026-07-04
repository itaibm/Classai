# Classai Full-Lesson File Spec (v1)

> How a **fully-built lesson** is stored so the app can run it and a human can read it.
> Governed by [`SCHOOL-CHARTER.md`](../SCHOOL-CHARTER.md); pedagogy from `knowledge-base/teaching/`.
> Every lesson ships as a **pair**: `lesson-NN-slug.json` (machine) + `lesson-NN-slug.md` (human view).
> The JSON is the source of truth; the MD is generated from it for review.

## The concept it encodes

1. **Teach** — delivered by one of three modes, chosen per lesson (and overridable per beat):
   - `human` — a real person (parent) runs the moment: hands-on materials, experiments. The file gives them a verbatim script + handoff cue back to the AI.
   - `video` — a **verified, real** curated video with a watching task and an after-check (never passive).
   - `ai` — the animated character teaches with on-screen visuals (whiteboard, slideshow, virtual manipulatives).
2. **Practice** — always AI: a graded **practice bank** the director draws from, each item with an answer key, wrong-answer diagnosis, a hint ladder and a scripted re-teach, so the AI can give feedback, re-explain, and adapt.
3. **Adaptivity** — explicit rules: when to level up/down, what to do when stuck, how to personalize with the learner's interests (from `LearnerModel`).

## Mapping to `shared/types.ts`

The JSON is a **superset of the existing `Lesson` type**. Fields `id, kind, subject, topic, title, objectives, analysis, plan, difficulty` map 1:1. New fields (`delivery`, `timeboxMin`, `script`, `blocks`, `stuckProtocol` on beats; `practiceBank`, `adaptivity`, `video`, `vocabulary`, `materials` on the lesson) are additive — proposed type extensions live at the bottom of this file. Until the app loads these files, the teach director can also use them as grounding context verbatim.

## Top-level shape

```jsonc
{
  "format": "classai-lesson/1",
  "id": "y2-maths-u1-l01",              // yY-subject-uU-lNN
  "year": 2,
  "subject": "math",                     // SubjectKey
  "subjectLabel": "Mathematics",
  "unit": { "number": 1, "title": "…", "essentialQuestion": "…" },
  "lessonNumber": 1,
  "kind": "lesson",                      // lesson | diagnostic | review
  "topic": "Place value to 100",
  "title": "Tens and ones to 100",
  "durationMin": 22,
  "objectives": ["By the end, I can …"],
  "difficulty": "standard",
  "status": "approved",

  "vocabulary": [{ "term": "tens", "definition": "kid-friendly", "example": "…" }],
  "emphasize": ["the 1–3 things that MUST land", "the misconception to pre-empt"],
  "analysis": { "keyConcepts": [], "misconceptions": [], "hooks": [], "priorKnowledge": [] },

  "materials": {
    "human": ["only when a human beat exists — everything laid out before the lesson"],
    "digital": ["what the app renders — no prep needed"]
  },

  "delivery": {
    "mode": "human_intro_then_ai",       // fully_ai | human_intro_then_ai | video_then_ai | human_lesson
    "humanNotes": "what the human must know/prepare; empty for fully_ai"
  },

  "video": {                             // optional; role: hook | teach | reinforce
    "role": "reinforce",
    // EITHER a verified link (oEmbed-checked, never invented)…
    "url": "https://www.youtube.com/watch?v=…", "title": "exact title", "verifiedAt": "2026-07-03",
    // …OR an unverified spec per the KB honesty rule (video-library.md): named source + search term, NO url
    "searchTerm": "what to search within the channel/platform",
    "channel": "…",
    "watchTask": "what to look/listen for (active watching)",
    "afterCheck": { "question": "…", "expectedAnswer": "…" }
  },

  "plan": [ /* beats, below */ ],
  "practiceBank": [ /* items, below */ ],
  "adaptivity": { /* below */ },

  "differentiation": { "support": "…", "stretch": "…" },
  "extension": "meaningful early-finisher task",
  "assessmentEvidence": "what proves the objective was met",
  "revisitLater": "what to bring back as retrieval, and when"
}
```

## Beats (`plan[]`) — extends `LessonBeat`

Ordered; kinds follow the arc **hook → explain → example → check → practice → recap** (small ideas may collapse beats).

```jsonc
{
  "kind": "explain",                     // hook | explain | example | check | practice | recap
  "delivery": "ai",                      // human | video | ai  (who runs THIS beat)
  "timeboxMin": [3, 8],                  // start–end minutes
  "goal": "…",
  "note": "director guidance for this beat",
  "successCriteria": "observable evidence the beat landed",

  "script": {
    "say": "verbatim character/human speech — warm, short sentences, pitched to the age",
    "adaptHints": "how the AI may personalize (names, interests) WITHOUT changing the maths"
  },

  "blocks": [ /* concrete LessonBlock objects from shared/types.ts, e.g. whiteboard/slideshow/multipleChoice */ ],

  "check": {                             // check/practice beats only — BeatCheck + extras
    "question": "…",
    "expectedAnswer": "…",
    "wrongAnswers": [{ "answer": "…", "why": "misconception", "remedy": "guiding move — never reveal" }]
  },

  "humanHandoff": {                      // human/video beats only
    "setup": "what the human lays out / what plays",
    "cueToResume": "the exact moment the AI takes over again"
  },

  "stuckProtocol": ["ordered moves when the learner misses twice — never reveal the answer"]
}
```

## Practice bank (`practiceBank[]`)

The director picks items live; it never runs out and never repeats an identical item back-to-back.

```jsonc
{
  "id": "l01-p04",
  "skill": "name tens and ones in a 2-digit number",
  "level": 2,                            // 1 support · 2 core · 3 stretch
  "block": { "type": "numberEntry", "prompt": "…", "answer": 47 },  // any interactive LessonBlock
  "expectedAnswer": "…",
  "wrongAnswers": [{ "answer": "…", "why": "…", "remedy": "…" }],
  "hints": ["hint 1 (smallest nudge)", "hint 2 (bigger scaffold)"],  // give ONE per attempt
  "reteach": {                           // used after 2 misses on this skill
    "say": "a fresh, smaller re-explanation (not a repeat)",
    "block": { /* optional visual */ }
  },
  "interestSlots": ["sweets", "football stickers"]  // nouns the AI may swap for the kid's interests
}
```

## Adaptivity (`adaptivity`)

```jsonc
{
  "startLevel": 2,
  "levelUp": "2 consecutive correct at current level → next level (or interleave if at 3)",
  "levelDown": "2 misses on the same skill → run the item's reteach, then drop one level (CPA step down)",
  "masterySignal": "what tells the director the objective is met (feeds MemoryUpdate/mastery)",
  "struggleProtocol": ["1) don't reveal", "2) name why", "3) drop a CPA stage / shrink numbers", "4) ONE hint", "5) re-ask smaller, build back", "6) keep it safe — 'mistakes show us what to practise'"],
  "personalization": "how to use LearnerModel.interests/struggles for hooks and word problems",
  "endOnSuccess": "always end on an earned win + specific PROCESS praise (effort/strategy, never 'clever')"
}
```

## Authoring rules (non-negotiable)

- **One new idea per lesson.** Explain short; most minutes are the kid *doing*.
- **CPA**: concrete (real or virtual manipulatives) → pictorial → abstract, in that order.
- **Every check and practice item has** expected answer + ≥2 anticipated wrong answers with why + remedy.
- **Videos must be real and verified** (oEmbed/title check, log `verifiedAt`). If none fits, use a `slideshow`/`whiteboard` instead — never invent a URL.
- **Human beats end with an explicit handoff cue** so the AI knows when to resume.
- **Process praise only**; end on an earned success.
- Practice bank: **≥ 9 items** (3 per level) covering every skill in the objectives, each with `reteach`.

## Proposed `shared/types.ts` extensions (for the app-wiring phase)

```ts
export type BeatDelivery = 'human' | 'video' | 'ai';
export interface BeatScript { say: string; adaptHints?: string; }
export interface HumanHandoff { setup: string; cueToResume: string; }
export interface LessonBeatFull extends LessonBeat {
  delivery: BeatDelivery;
  timeboxMin?: [number, number];
  script?: BeatScript;
  blocks?: LessonBlock[];
  humanHandoff?: HumanHandoff;
  stuckProtocol?: string[];
}
export interface PracticeItem {
  id: string; skill: string; level: 1 | 2 | 3;
  block: LessonBlock;
  expectedAnswer: string;
  wrongAnswers: WrongAnswer[];
  hints: string[];
  reteach: { say: string; block?: LessonBlock };
  interestSlots?: string[];
}
export interface LessonAdaptivity {
  startLevel: 1 | 2 | 3;
  levelUp: string; levelDown: string; masterySignal: string;
  struggleProtocol: string[]; personalization: string; endOnSuccess: string;
}
export interface CuratedVideo {
  role: 'hook' | 'teach' | 'reinforce';
  url: string; title: string; channel: string; verifiedAt: string;
  watchTask: string; afterCheck?: { question: string; expectedAnswer: string };
}
export interface LessonFull extends Lesson {
  format: 'classai-lesson/1';
  year: number; unit: { number: number; title: string; essentialQuestion: string };
  lessonNumber: number; durationMin: number;
  vocabulary: { term: string; definition: string; example?: string }[];
  emphasize: string[];
  materials: { human: string[]; digital: string[] };
  delivery: { mode: 'fully_ai' | 'human_intro_then_ai' | 'video_then_ai' | 'human_lesson'; humanNotes: string };
  video?: CuratedVideo;
  plan: LessonBeatFull[];
  practiceBank: PracticeItem[];
  adaptivity: LessonAdaptivity;
  differentiation: { support: string; stretch: string };
  extension: string; assessmentEvidence: string; revisitLater: string;
}
```

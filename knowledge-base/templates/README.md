# Templates — lesson plans, assessment tools & question banks

This folder is the **ready-to-fill toolkit** for the Classai knowledge base: blank-but-concrete scaffolds a parent or teacher can fill in by hand, *and* structured prompts the Classai AI can be steered with. Everything here maps onto the app's lesson machinery — the beat arc **hook → explain → example → check → practice → recap** (`teaching/lesson-anatomy.md`), the **block tool-belt** (interactive vs display-only), and the **`BeatCheck.wrongAnswers`** structure `{ answer, why, remedy }` (`teaching/assessment-and-feedback.md`, `INGESTION.md`).

Where the `teaching/` files explain *how* to teach and the `subjects/` files supply *what* to teach, this folder gives you the **reusable forms** to capture a plan, a check, a rubric, or a question — quickly and correctly.

## What's in here

```
templates/
├── README.md                       ← you are here
├── lesson-plan-templates.md        ← 8 ready-to-fill lesson plans, each mapped to the app's beats + blocks
├── assessment-and-rubric-bank.md   ← exit tickets, hinge questions, rubrics, self-assessment, mastery thresholds
└── question-bank-guide.md          ← Bloom/SOLO/DOK stems, misconception probes + a sample question bank per subject
```

- **`lesson-plan-templates.md`** — eight templates (gradual-release, 5E inquiry, mastery, review/retrieval, diagnostic/placement, practice/fluency, project/extended task, 10-minute micro-lesson). Each has blank fields, a worked primary example, and a beat→block mapping.
- **`assessment-and-rubric-bank.md`** — drop-in formative tools: exit-ticket and hinge-question templates, single-point and analytic rubrics, primary writing rubrics, a maths-reasoning rubric, an oracy rubric, self-assessment checklists, traffic-light/confidence tools, a "diagnostic question + likely wrong answers + remedy" template (the app's `wrongAnswers` shape), and mastery-threshold guidance.
- **`question-bank-guide.md`** — how to generate good questions, with copy-paste stems for Bloom's six levels, SOLO, and Depth of Knowledge; reasoning/justification stems; misconception-probe design; and a sample bank of ~10 primary questions each for maths, English/reading, science, and history/geography (answers + a likely wrong answer per item).

## How to use a template — two paths

### Path A — by hand (parent/teacher)
1. Pick the template that fits your goal (teaching something new → gradual-release; checking what stuck → review/retrieval; finding a starting level → diagnostic; building speed → practice/fluency).
2. Copy the blank template into your own notes.
3. Fill the fields top to bottom. The hardest, most valuable field is always the **checks with wrong answers** — write the *real* mistakes a child makes, not random distractors (see `assessment-and-feedback.md` §1).
4. Teach from it. Treat the beat sequence as a guide, not a cage — collapse beats for small topics, loop *example→check* for tricky ones (`lesson-anatomy.md`).

### Path B — to prompt Classai
You don't have to hand the app a finished plan — the app generates beats itself. Use these templates to **steer and ground** that generation:
- **Seed the syllabus/lesson:** paste a filled template (or a subject `year-N.md` topic block) into the curriculum box. `buildSyllabus()` and the lesson planner accept pasted text and will follow its structure, key concepts and checks (`INGESTION.md` §3, Option A).
- **Ground the wrong-answers:** the `check` fields you fill (`question / expectedAnswer / wrongAnswers[answer, why, remedy]`) are exactly the `BeatCheck` shape the planner emits. Supplying them means the tutor reuses *vetted* misconceptions instead of inventing them live.
- **Pick the lesson type:** tell the app which template you want ("run this as a **review/retrieval** lesson" / "make this a **diagnostic** to find his level"). The lesson-type → beat-emphasis mapping is given in each template so the request is unambiguous.

## A note on the blocks

Each lesson-plan template names which **blocks** to use per beat. The one rule to remember: **display blocks are LOOK-ONLY; interactive blocks carry the answer.** To make a child *do* something (place, pick, type, drag), use an interactive block (`multipleChoice`, `multiSelect`, `trueFalse`, `numberEntry`, `fillBlank`, `matchPairs`, `ordering`, `categorize`, `shortText`, `speak`). Use display blocks (`richText`, `steps`, `whiteboard`, `slideshow`, `video`, `keyTerm`, `numberLine`, `emojiViz`, `flashcards`) to *show*. Never ask a child to act on a display-only block (`lesson-anatomy.md`).

## Related

- `teaching/lesson-anatomy.md` — the beat-by-beat anatomy these plans map onto.
- `teaching/assessment-and-feedback.md` — the diagnosis/feedback engine behind the rubrics and checks.
- `teaching/pedagogy-core.md` — the underlying playbook (gradual release, retrieval, scaffolding, ~80% band).
- `INGESTION.md` — how the app consumes filled templates as grounding.
- `methods/` — the method library these templates operationalise.

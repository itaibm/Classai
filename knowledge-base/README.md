# Classai Knowledge Base

A curated, self-contained teaching knowledge base for **homeschooling children up to age ~12**, aligned to the **UK National Curriculum (Key Stages 1 & 2, Years 1–6, ages 5–11)**.

It exists for one purpose: to give the Classai AI tutor the *best possible raw material* — what to teach, in what order, how to teach it well, the mistakes kids actually make, and the strongest free resources — so it can generate excellent lessons instead of relying only on the model's own memory.

## What's in here

```
knowledge-base/
├── README.md                  ← you are here
├── INGESTION.md               ← how the Classai AI should consume this + how to wire it into the app
├── index.json                 ← machine-readable manifest of every section, subject, topic & file
├── _TEMPLATE.md               ← the per-topic content contract every subject file follows
│
├── teaching/                  ← subject-agnostic "how to teach" knowledge
│   ├── pedagogy-core.md         ← the condensed teaching playbook
│   ├── child-development.md     ← what ages 5–11 can/can't do cognitively & emotionally
│   ├── lesson-anatomy.md        ← how to structure one great lesson (maps to Classai beats)
│   ├── assessment-and-feedback.md
│   ├── research-learning-science.md  ← evidence base (EEF, cognitive science) with citations
│   └── research-ai-tutoring.md       ← evidence base (ITS + LLM-tutor studies) with citations
│
├── methods/                   ← THE teaching methods library — "all methods, all practices"
│   ├── README.md                ← index of all 15 method families (200+ catalogued methods)
│   └── …                        ← instruction, questioning, retrieval, inquiry, mastery,
│                                   differentiation, motivation, assessment, play, tech, …
│
├── templates/                 ← ready-to-use lesson plans, rubrics, question & activity banks
│   ├── lesson-plan-templates.md   ← 8 fillable plan formats mapped to Classai beats
│   ├── assessment-and-rubric-bank.md
│   ├── question-bank-guide.md      ← Bloom/SOLO/DOK stems + sample banks
│   └── activity-bank-*.md          ← ~114 reusable activities & games
│
├── standards/                 ← curriculum-agnostic crosswalk: UK NC ↔ US CCSS/NGSS ↔ IB PYP
│
└── subjects/
    ├── _lesson-banks-humanities.md   ← ready-to-run lesson outlines (humanities & enrichment)
    ├── maths/         (+ extension-topics.md, lesson-bank.md)
    ├── english/       (+ extension-topics.md, lesson-bank.md)
    ├── science/       (+ extension-topics.md, lesson-bank.md)
    ├── history-geography/  (+ extension-topics.md)
    ├── languages/     ← world language (Spanish), KS2 (+ spanish-extension.md)
    ├── art-music/     (+ extension-topics.md)
    ├── computing-life-skills/  (+ extension-topics.md)
    │
    │   ── Israeli-school subjects (anchored to משרד החינוך) ──
    ├── hebrew/        ← Hebrew reading & writing (first language) — files in HEBREW (כיתות א'–ו')
    ├── french/        ← French as a foreign language, taught THROUGH Hebrew — files in HEBREW
    ├── israel-history/   ← Israel history & heritage (ancient focus) — English
    └── french-history/   ← French history for kids — English
```

The four Israeli-school subjects were added for a Hebrew-speaking school: **Hebrew literacy** and **French (foreign)** are written in Hebrew with bilingual section headings so they stay machine-parseable; **Israel History** (heritage & ancient focus) and **French History** are in English. Sensitive/contested content is handled factually, age-appropriately, and even-handedly.

This is a large reference — **300+ subject topics, 200+ catalogued teaching methods, ~114 activities, 8 lesson-plan formats, and a multi-standard crosswalk**. The `methods/` library is "the bible" core: how to teach anything. The `subjects/` folders are what to teach. `teaching/` and the two `research-*.md` files are why it works.

Each subject folder contains:
- `README.md` — subject overview, the full Year 1→6 scope & sequence, and how to teach this subject.
- `year-1.md` … `year-6.md` (or `ks1.md` / `ks2.md` for non-core subjects) — the actual teachable content, topic by topic.
- `misconceptions.md` — the common wrong ideas and how to fix them, gathered in one place.
- `resources.md` — curated, real, free resources (videos, sites) the tutor can point to or embed.

## Design principles

1. **Self-contained.** A tutor should be able to teach a topic from this file alone — explanations, worked examples, activities and checks are written out, not just linked.
2. **Shaped like the app.** Every topic provides the four things Classai's lesson designer asks for — **key concepts, misconceptions (with the wrong answers kids give + the fix), real-world hooks, and assumed prior knowledge** — plus ready-to-use checks. See `INGESTION.md`.
3. **Sequenced.** Topics are ordered so each builds on the last, with prerequisites named.
4. **Honest resources.** Linked resources point to stable, well-known free platforms (BBC Bitesize, Oak National Academy, Khan Academy, etc.) at the topic/playlist level, never invented video IDs.

## How to use it as a parent

- Browse a subject's `README.md` to see the whole year's plan at a glance.
- Open a `year-N.md` file to teach a specific topic yourself, or let Classai generate the lesson from it.
- Paste a topic's "Scope" section into Classai as the course curriculum to seed an accurate syllabus.

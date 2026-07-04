# How Classai Consumes This Knowledge Base

This document maps the knowledge base onto Classai's existing data model and lesson pipeline, and describes the (small) changes needed to wire it in. Nothing here changes the app's architecture constraints — it's all local, bring-your-own-key, privacy-preserving content that gets injected into prompts.

## 1. The contract: every topic provides what the lesson designer asks for

Classai builds a lesson in passes (`server/src/services/lessons.ts`, `server/src/ai/prompts.ts`):

1. **Syllabus** (`syllabusPrompt`) → ordered `Topic[]` with `prerequisites` and `estMinutes`.
2. **Analysis** (`lessonAnalysisPrompt`) → `{ keyConcepts, misconceptions, hooks, priorKnowledge }` (`LessonAnalysis`).
3. **Plan** (`lessonPlanPrompt`) → beats, where every `check`/`practice` beat carries a `BeatCheck`:
   `{ question, expectedAnswer, wrongAnswers: [{ answer, why, remedy }] }`.

So **every topic file in this knowledge base is written to supply exactly those fields.** Each topic block contains:

| Knowledge-base field | Feeds Classai field |
|----------------------|---------------------|
| `Key concepts`            | `LessonAnalysis.keyConcepts` |
| `Misconceptions` (answer / why / remedy) | `LessonAnalysis.misconceptions` **and** `BeatCheck.wrongAnswers` |
| `Hooks`                   | `LessonAnalysis.hooks` |
| `Prior knowledge`         | `LessonAnalysis.priorKnowledge` |
| `Worked content` / `Teach it`  | the `explain` / `example` beats' `note` |
| `Checks`                  | `BeatCheck.question` + `expectedAnswer` |
| `Resources`               | `video` / `image` display blocks |

This means the AI is no longer *inventing* the misconception analysis from scratch — it's grounded in vetted material, then personalises it to the learner's interests.

## 2. Subject-key mapping

The knowledge-base subjects map onto Classai's `SubjectKey` families (`shared/types.ts`):

| Knowledge-base folder        | Classai `SubjectKey` |
|------------------------------|----------------------|
| `subjects/maths`             | `math` |
| `subjects/english`           | `language_arts` |
| `subjects/science`           | `science` |
| `subjects/history-geography` | `history` |
| `subjects/languages`         | `world_language` |
| `subjects/art-music`         | `general` |
| `subjects/computing-life-skills` | `general` |
| `subjects/hebrew`            | `language_arts` (Hebrew as first language; content in Hebrew) |
| `subjects/french`            | `world_language` (French taught through Hebrew) |
| `subjects/israel-history`    | `history` |
| `subjects/french-history`    | `history` |

Note: the `hebrew` and `french` files are written in **Hebrew** (right-to-left) with **bilingual section headings** (`### Key concepts — מושגי מפתח`), so the four analysis fields remain machine-parseable while the teaching content is in Hebrew. The two history subjects are in English.

## 3. Two ways to wire it in

### Option A — Curriculum seeding (zero code change, available today)
When a parent creates a course, paste the relevant subject `README.md` "Scope & sequence" section (or a single year file) into the curriculum box. `buildSyllabus()` already accepts pasted curriculum text and will produce an accurate, well-sequenced syllabus from it instead of a generic one.

### Option B — Knowledge retrieval (small server addition, recommended)
Add a lightweight loader that, given a `subjectKey` + `gradeLevel` + `topic.title`, returns the matching topic block from this folder and injects it into the **analysis** and **plan** prompts as grounding context.

Sketch (no app code is changed by this knowledge base itself — this is the integration recipe):

```
server/src/ai/knowledge.ts
  loadTopic(subjectKey, year, topicTitle) → { keyConcepts, misconceptions, hooks, priorKnowledge, checks, resources }
```
- Read `knowledge-base/index.json` once at boot.
- Fuzzy-match `topicTitle` against the manifest's topic titles for that subject/year.
- In `lessonAnalysisPrompt`, if a match is found, append:
  `"Grounding (use and adapt to the learner; do not contradict): <the topic block>"`.
- In `lessonPlanPrompt`, pass the topic's pre-authored `checks` so the model reuses vetted wrong-answers/remedies.

Because Classai already parses model output tolerantly (`schemas.ts`), grounding only improves quality — it never becomes a hard dependency.

## 4. index.json shape

`index.json` is the machine-readable manifest. Top level:

```json
{
  "version": "1.0",
  "curriculum": "UK National Curriculum (KS1–KS2)",
  "ageRange": "5-11",
  "subjects": [
    {
      "key": "maths",
      "subjectKey": "math",
      "label": "Mathematics",
      "readme": "subjects/maths/README.md",
      "misconceptions": "subjects/maths/misconceptions.md",
      "resources": "subjects/maths/resources.md",
      "years": [
        { "year": 1, "ages": "5-6", "file": "subjects/maths/year-1.md", "topics": ["Numbers to 20", "..."] }
      ]
    }
  ],
  "teaching": ["teaching/pedagogy-core.md", "..."]
}
```

A consumer can load `index.json`, find a subject+year, open the file, and locate the topic by its heading.

## 5. Resource embedding rules (keep the app honest)

The teaching-turn prompt tells the model to embed "real, well-known educational video URLs." Hallucinated video IDs are the main risk. Resources in this knowledge base therefore:
- name a **stable platform + exact search/topic title** (e.g. "BBC Bitesize KS2 — *Adding fractions*"), and
- prefer **channel/playlist** references over specific video IDs.

When the tutor wants a `video` block, it should use these named resources; if it can't resolve a real URL, it should fall back to a `slideshow`/`whiteboard` it builds itself rather than guess a URL.

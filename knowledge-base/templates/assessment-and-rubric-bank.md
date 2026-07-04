# Assessment & rubric bank — ready-to-use tools

Drop-in formative assessment tools for primary tutoring (ages 5–11): exit tickets, hinge questions, rubrics, self-assessment, confidence tools, the app's diagnostic-question structure, and mastery thresholds. These operationalise `teaching/assessment-and-feedback.md` — assessment here is **gathering evidence in order to adapt**, not grading. Every tool should *change what you do next*.

All checks map to the app's `BeatCheck` shape: `{ question, expectedAnswer, wrongAnswers: [{ answer, why, remedy }] }`. The rubrics are for *you* (parent/teacher/tutor) to judge open work the app captures via `shortText`/`speak` and evaluates with `answerEval`.

---

## 1. Exit-ticket templates

A 1–3 item check at the *end* of a lesson (or the app's **recap** beat) answering: did the core idea land? Keep it tiny, single-concept, and *revealing*.

### Template — generic exit ticket
```
Lesson idea:   [the one thing taught]
Q1 (did it land?):   [single-concept check]   → expected: [ ]
Q2 (can they apply?):[a slightly different case]→ expected: [ ]
Q3 (self-report):    "Thumbs: solid / wobbly / lost?"  + "one thing you'd ask about"
Decision rule:       both right + can explain → advance · one wrong → reteach that piece next time · self-report 'lost' → reteach regardless
```

### Three reusable exit-ticket *formats*
- **3-2-1:** *3* things I learned · *2* things I can do now · *1* question I still have. (Good for older primary; surfaces gaps.)
- **One-problem solo:** a single fresh problem of the target type, no scaffold — the cleanest mastery signal.
- **Explain-it-back:** "Tell me/teach me [the idea] in your own words." (Catches lucky right answers — see guessing vs mastery, §6.)

### Worked example — exit ticket, *area of a rectangle* (age 9)
```
Lesson idea: area = length × width (in square units)
Q1: "A rectangle is 4 cm by 3 cm. What's its area?"  expected: "12 cm² (4×3)"
Q2: "Why square centimetres, not just centimetres?"  expected: "we're covering a surface — counting squares, not a line"
Q3: thumbs + "one thing I'd ask"
Decision: gets Q1 but fumbles Q2 → understands the procedure, not the *unit* meaning → reteach 'why squared' with a covered grid next time.
```

---

## 2. Hinge-question templates

A **hinge question** is a single, well-designed check at a pivotal moment that decides whether to move on or stop — *the* check the whole lesson hinges on. Properties: quick to answer, *impossible to get right for the wrong reason*, and every wrong option diagnoses a specific misconception.

### Template
```
Hinge point:    [the concept everything after depends on]
Question:       [single, fast, with a built-in distractor for the key misconception]
Options:        A) [correct]  B) [misconception 1]  C) [misconception 2]  D) [careless-slip answer]
What each tells you:
  A → understood, advance
  B → [misconception] → remedy: [ ]
  C → [misconception] → remedy: [ ]
  D → slip → just nudge "check again"
Pass bar:       [e.g. correct AND can say why]
```

### Worked example — hinge question, *equal parts / fractions* (age 7)
```
Hinge point: a fraction needs *equal* parts
Question: "Which picture shows one quarter shaded?"
Options:  A) circle in 4 equal parts, 1 shaded  ✔
          B) circle in 4 *unequal* parts, 1 shaded  → "any 4 parts" misconception → remedy: overlay the parts, show they don't match
          C) circle in 3 equal parts, 1 shaded     → confuses quarter with 'a part' / wrong count → remedy: count the parts: a quarter needs four
          D) circle in 4 equal parts, 2 shaded      → miscounted shaded parts (slip) → remedy: "how many did you shade?"
Pass bar: picks A and says "because the parts are the same size."
```

> Design tip: a hinge question where a guesser or a misconception-holder *can still pick the right answer* has failed. The distractors must catch the exact confusion (`assessment-and-feedback.md` §1).

---

## 3. Rubrics

### 3a. Single-point rubric (the everyday default)

Describes only the **target** (what "good" looks like); you note evidence on each side. Less intimidating than a grid, fast to use, and gives concrete feedback. Best for most primary work.

```
Task: [ ]

| Not yet (what's missing) | TARGET — what we're aiming for | Beyond (going further) |
|--------------------------|--------------------------------|------------------------|
| [note gaps here]         | • [criterion 1]                | [note stretch here]    |
|                          | • [criterion 2]                |                        |
|                          | • [criterion 3]                |                        |
```

**Worked example — single-point rubric, *a recount of a day out* (age 7–8)**
```
| Not yet                         | TARGET                                          | Beyond                          |
|---------------------------------|-------------------------------------------------|---------------------------------|
| events out of order; no capitals| • events in time order, with time words (first, then, after) | adds feelings / a 'best bit' |
| / full stops                    | • capital letters & full stops in each sentence |                                 |
|                                 | • tells the reader what actually happened       | varies sentence openers         |
```

### 3b. Analytic rubric (multi-criterion grid)

Scores several dimensions separately — use when you need to see *which* part is strong/weak (e.g. a piece that's well-organised but full of spelling slips). Keep levels few and child-friendly (3 levels is plenty for primary).

```
Task: [ ]   Levels: Emerging (1) · Secure (2) · Strong (3)

| Criterion        | Emerging (1)        | Secure (2)               | Strong (3)                    |
|------------------|---------------------|--------------------------|-------------------------------|
| [criterion A]    | [ ]                 | [ ]                      | [ ]                           |
| [criterion B]    | [ ]                 | [ ]                      | [ ]                           |
| [criterion C]    | [ ]                 | [ ]                      | [ ]                           |
```

**Worked example — analytic rubric, *explain how you solved a word problem* (age 9)**
```
| Criterion          | Emerging (1)                 | Secure (2)                          | Strong (3)                                   |
|--------------------|------------------------------|-------------------------------------|----------------------------------------------|
| Correct answer     | answer wrong                 | answer right                        | right, and checked for reasonableness        |
| Method shown       | no working / jumps to answer | steps shown, mostly clear           | clear, efficient method, well laid out       |
| Reasoning explained| "I just knew"                | names what they did ("I multiplied")| says *why* that operation, links to the story|
```

### 3c. Primary writing rubrics

**Narrative / story (age 7–9)** — single-point target list:
- a clear beginning, middle, end (a problem and how it's solved)
- capital letters and full stops accurately
- interesting word choices (not just "nice", "good")
- sentences that make sense when read aloud
- *Beyond:* dialogue, description of feelings, varied openers.

**Information / non-chronological report (age 9–11)** — analytic:
```
| Criterion       | Emerging (1)            | Secure (2)                        | Strong (3)                                  |
|-----------------|-------------------------|-----------------------------------|---------------------------------------------|
| Organisation    | one block, no order     | grouped with subheadings          | logical sections, intro + rounding-off line |
| Information      | vague / mixed with story| accurate facts, in own words      | precise, well-chosen facts; a 'did you know'|
| Language         | informal/storylike      | formal, present tense, topic words| confident technical vocabulary, varied sentences |
| Technical (SPaG) | frequent errors         | mostly accurate punctuation/spelling | accurate, including commas in lists       |
```

**Sentence-level writing (age 5–7)** — checklist (tick):
☐ starts with a capital ☐ ends with a full stop ☐ finger spaces ☐ makes sense when I read it ☐ I tried a 'wow' word.

### 3d. Maths reasoning rubric

For when the answer matters less than the *thinking* (the `shortText`/`speak` "how do you know?" turns).
```
| Level    | What it looks like                                                                 |
|----------|------------------------------------------------------------------------------------|
| 1 Recall | gives an answer, can't explain ("I just knew") — could be a guess                   |
| 2 Method | describes the steps they took ("I added the tens then the ones")                    |
| 3 Reason | explains *why* the method works / why the answer must be so ("it has to be more than 30 because…") |
| 4 Justify| convinces / generalises ("it would always work because…"; spots a counter-example)  |
```
Use it live: a right answer at level 1 is **not yet mastery** — probe for level 2+ before advancing (`assessment-and-feedback.md` §5).

### 3e. Oracy / spoken-answer rubric

For `speak` turns and discussion (ages 5–11), four strands kept simple:
```
| Strand      | Emerging                     | Secure                                  |
|-------------|------------------------------|-----------------------------------------|
| Physical    | very quiet / rushed          | clear, audible, paced                   |
| Linguistic  | one or two words             | full sentence, topic vocabulary         |
| Cognitive   | restates the question        | gives a reason / example; "because…"    |
| Social      | doesn't take a turn          | answers the question asked, builds on it|
```
For a 1:1 tutor the **Cognitive** strand ("because…") is the one to push — reward reasons, not volume.

---

## 4. Self-assessment & confidence tools

Children judging their own learning builds metacognition (`pedagogy-core.md` — but note: young children over-rate themselves, so pair self-report with a real check, never trust it alone).

### 4a. Traffic-light / confidence tool
```
"How sure are you?"  🟢 got it  🟡 nearly  🔴 not yet
Rule of use: ALWAYS pair with one real item. 🟢 + wrong answer = a teaching moment ("you felt sure — let's see why it tricked us").
```

### 4b. Thumbs / fist-of-five (quick, spoken)
Thumb up / sideways / down — or 5 fingers (totally get it) to 1 (lost). Fast temperature check between beats.

### 4c. Self-assessment checklist (child ticks before saying "done")
```
Before I say I've finished:
☐ I read the question again
☐ I checked my answer makes sense (is it about the right size?)
☐ I can explain how I got it
☐ I tried my best handwriting/setting-out
```

### 4d. "Two stars and a wish" (reflective, after a piece of work)
Child names **two stars** (things that went well) and **one wish** (one thing to improve). Keeps reflection specific and balanced; works for writing, projects, or a whole lesson.

### 4e. KWL grid (for a topic, ages 8–11)
```
| Know (already)      | Want to know        | Learned (fill at the end) |
|---------------------|---------------------|---------------------------|
| [ ]                 | [ ]                 | [ ]                       |
```
Doubles as a diagnostic (the "Know" column surfaces prior knowledge and misconceptions) and a recap (the "Learned" column).

---

## 5. Diagnostic question + likely wrong answers + remedy (the app's `wrongAnswers` template)

This is the **core check structure** — author it for every check/practice beat. It is the §2–3 diagnosis machinery (`assessment-and-feedback.md`) pre-loaded so the tutor has the fix ready before the child errs. **Never reveal the answer** on a miss — run the `remedy` as a guiding hint.

### Template (copy per check)
```
question:       [single-concept, ~80%-gettable, with a built-in distractor]
expectedAnswer: [the right answer + a one-line reason]
wrongAnswers:
  - answer:  [a real mistake a child makes — not a random distractor]
    why:     [the misconception / slip / gap behind it]
    remedy:  [ONE guiding move or counter-example — never the bare answer]
  - answer:  [ ]
    why:     [ ]
    remedy:  [ ]
```

### Worked example — *comparing decimals* (age 10)
```
question:       "Which is bigger, 0.45 or 0.6?"
expectedAnswer: "0.6 — that's 6 tenths, more than the 4 tenths in 0.45."
wrongAnswers:
  - answer:  "0.45"
    why:     "thinks more digits = bigger ('whole-number' thinking applied to decimals)"
    remedy:  "line them up by place value: 0.6 = 0.60. Compare tenths first — 6 vs 4. On a number line, 0.45 sits before 0.5, 0.6 after."
  - answer:  "they're equal"
    why:     "ignores place value, sees '4,5' and '6' as just digits"
    remedy:  "what does the first digit after the point mean? tenths. Whose tenths are bigger?"
```

### How to write good `wrongAnswers` (checklist)
☐ each is a mistake a **real child** makes (pull from the topic's `misconceptions.md`)
☐ the `why` names a *cause* — slip / gap / misconception — not just "they got it wrong"
☐ the `remedy` is **one** guiding move or counter-example, phrased as a hint
☐ a distractor nobody would pick is useless — cut it
☐ the question's distractor would actually *catch* the misconception (a guesser can't slip through)

---

## 6. Mastery thresholds — when is it "learned"?

A right answer is not proof; mastery means **understood, durable, and transferable** (`assessment-and-feedback.md` §5–6). Thresholds below are practical defaults — adjust to the child and the stakes (foundational skills demand higher bars).

| Signal | "Not yet" | "Secure for now" (advance) | "Mastered" (durable) |
|---|---|---|---|
| **Accuracy** | below ~70%, or only with heavy scaffolds | ~80%+ on the target type, scaffolds faded | high accuracy across **varied/interleaved** items |
| **Reasoning** | "I just knew" / can't explain | can explain the method | explains *why* it works; spots a wrong one |
| **Independence** | needs prompting each step | does it solo with light reminders | quick & confident, no reconstruction (fluent) |
| **Transfer** | breaks if the surface changes | holds on a near-variant | holds on a genuinely different context |
| **Over time** | — | got it today | still right on a **delayed** revisit (days later) |

**Decision rules (the gates):**
- **Advance** when in the ~80% band **with reasoning**, not on a single lucky multiple-choice.
- **Reteach / hold** on any *systematic* error (gap or misconception) — never layer new learning on a broken foundation.
- **Don't reteach a slip** — nudge and move on; reteaching bores a child who already understands.
- **Mastered ≠ done.** Even mastered skills go to **spaced review** — verify on a delayed revisit before retiring them (`assessment-and-feedback.md` §7).
- **The single best test:** "How did you get that?" + "What if it were [a different case]?" — separates luck from learning fast.

**For the app:** record the evidence via the turn's `memoryUpdates` (mastery level, struggles, misconceptions) and end-of-session `needsWork`, so the long-term learner model schedules the right revisits. A check that doesn't update memory or change the next move was a wasted turn.

---

## Related
- `teaching/assessment-and-feedback.md` — the full diagnosis/feedback/spacing engine.
- `templates/lesson-plan-templates.md` — where these checks and tickets slot into a plan.
- `templates/question-bank-guide.md` — how to *generate* the questions these tools assess.
- each subject's `misconceptions.md` — the source of real `wrongAnswers`.

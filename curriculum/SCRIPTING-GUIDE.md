# Full Teacher Scripts — format & best-practice guide

> Turns a **lesson outline** into a **complete, minute-by-minute script a teacher can read and
> deliver**. Grounded in `knowledge-base/teaching/lesson-anatomy.md`, `pedagogy-core.md`, and
> `assessment-and-feedback.md`. Governed by [`../SCHOOL-CHARTER.md`](../SCHOOL-CHARTER.md).

A scripted lesson must let a teacher (or a confident parent) pick it up cold and teach a
world-class lesson **without guessing our intent**. It covers the **full duration** — every
minute is accounted for — and tells the teacher exactly what to **say**, **show**, **do**, and
**ask**, what to **do when a child doesn't get it**, and what to **emphasize**.

## The teaching arc (every script follows it)

The gradual-release arc from the KB — **Hook → Explain (I do) → Example (we do) → Check →
Practice (you do) → Recap** — is the spine. Small ideas collapse beats; tricky ones loop
Example→Check. The constants (from `lesson-anatomy.md`):

- **One new idea per lesson.** Teach one thing well, not three poorly.
- **Mostly the child *doing*, not listening.** Keep Explain short; weight Example/Check/Practice.
- **Concrete → Pictorial → Abstract (CPA)** for anything mathematical or new — show the real thing first.
- **Every check has its answer key + wrong-answer playbook** (likely mistake → why → the fix).
- **End on an earned success**, with specific *process* praise (effort/strategy, never "you're so clever").

## The script format (use this exact structure per lesson)

````
## Lesson N — <title>
**Subject · Year · Unit** | **Duration:** <X min> | **Objective:** "By the end, I can …"

**You will need:** <every material, ready before the lesson>
**Prior knowledge to retrieve:** <the prerequisite the hook reactivates>
**Key vocabulary:** <terms, child-friendly definitions>
**What to emphasize (the heart of the lesson):** <the 1–3 things that MUST land; the common
misconception to pre-empt; the phrase or image worth repeating>

---

### ⏱ 0–X min · HOOK
> **Say:** "<verbatim teacher words>"
**Show:** <what's on the board/table>  **Do:** <teacher actions>
**Ask (retrieve prior knowledge):** "<question>" → *listen for:* <expected>
*(If the prerequisite is shaky: <quick backfill move>.)*

### ⏱ X–X min · EXPLAIN (I do)
> **Say:** "<think-aloud model, narrating the decisions, smallest steps>"
**Show / Do:** <board work, the concrete object, the diagram — step by step>
**Emphasize:** "<the key line to stress / repeat>"

### ⏱ X–X min · EXAMPLE (we do)
> **Say:** "<set up a shared example; hand pieces to the child>"
**Do:** <what the teacher starts, what the child supplies>
**Ask:** "<question handed to the child>" → *listen for:* <expected>

### ⏱ X–X min · CHECK
**Ask:** "<a revealing question, with a distractor that exposes the misconception>"
- ✅ **Expected:** <answer> — then probe: *"How did you work that out?"*
- ❌ **If "<wrong answer>":** <why it happens> → **fix:** <one guiding move, don't reveal>
- ❌ **If "<other wrong answer>":** <why> → **fix:** <move>

### ⏱ X–X min · PRACTICE (you do)
**Do:** <fresh solo task, scaffolds faded; interleave a variant once secure>
**Circulate / watch for:** <what to look for; the slip to catch>
> **If a child is stuck (missed twice):** 1) don't reveal; 2) name *why* (slip / missing
> prerequisite / misconception); 3) drop a CPA stage or shrink the numbers; 4) give ONE hint or
> a sentence starter; 5) re-ask a smaller version, then build back up; 6) keep it safe —
> "Mistakes show us what to practise. Let's take a smaller step."

### ⏱ X–X min · RECAP
> **Say:** "<child-led recall prompt — the child says the idea back>"
**Process praise:** "<specific to what you saw, e.g. 'you kept going and switched methods'>"
**Revisit later:** <what to bring back as retrieval, and roughly when>

---

**Differentiation**
- **Support (gentle):** <smaller steps, more concrete, scaffolds, guaranteed early win>
- **Stretch (challenge):** <fewer scaffolds, harder context, "why does that work? would it always?">

**Extension / early finishers:** <a meaningful deepening task, not just "more">
**Assessment evidence:** <what a teacher records as proof the objective was met>
````

## Rules that make a script *teacher-ready*

1. **Verbatim teacher talk** goes in `> **Say:**` blocks — real words, warm and age-pitched, not stage directions.
2. **Account for the whole time.** The ⏱ ranges must sum to the lesson's duration. No dead air, no overrun of the core idea — front-load the essential concept so a time-box never leaves it unchecked.
3. **Pull the checks, misconceptions, hooks and worked examples from the knowledge base** for that topic — don't invent where the KB already supplies them. Each CHECK's wrong-answer fixes come from the KB's misconception list.
4. **Show, don't just tell.** Name the concrete object / diagram / manipulative the teacher puts in front of the child (CPA).
5. **The "stuck" path is mandatory** in Practice (and wherever a check can fail). Never reveal the answer — diagnose and step down.
6. **Differentiation is built in, not bolted on** — support + stretch every lesson.
7. **Age-appropriate length & load:** Year 2 (ages 6–7) ~20–30 min, attention in short bursts, lots of doing, concrete throughout. Year 4 (ages 8–9) ~25–40 min, more abstract, longer independent practice, reasoning probes ("how do you know?").
8. **End on a win** with specific process praise; hand off to spaced review.

## File organisation

Scripts live beside the outlines, in a `scripts/` subfolder per subject/year:
`curriculum/year-N/<subject>/scripts/<subject>-year-N-scripts.md` (split into part files if very long).
The outline file remains the at-a-glance map; the script file is the deliver-it-now version.

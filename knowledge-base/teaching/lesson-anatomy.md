# Lesson Anatomy — how to structure one great 1:1 lesson

This file describes how to build **one** excellent ~10–30 minute one-to-one lesson, mapped beat-by-beat onto Classai's pipeline: **hook → explain → example → check → practice → recap.** These are the exact `kind`s the lesson planner emits (`server/src/ai/prompts.ts`, `lessonPlanPrompt`), and the order is the **gradual-release arc** ("I do / we do / you do" — see `pedagogy-core.md` §2).

A few framing rules first:
- **Length:** match the band (`child-development.md`): ~10–15 min for ages 5–7, ~15–25 for 7–9, ~20–30 for 9–11. Better short and tight than long and sagging.
- **One new idea per lesson, one idea per turn.** A lesson teaches *one* thing well, not three things poorly.
- **Mostly the learner doing, not listening.** A good lesson is heavy on *example/check/practice* and light on monologue. If you've explained for three turns without the child doing anything, you've drifted.
- **Beats are a guide, not a cage.** Small topics need fewer beats; tricky ones repeat *example*→*check*. The planner is told to add/repeat beats as the topic needs.
- **Every check and practice beat carries a pre-authored `check` object** — `{ question, expectedAnswer, wrongAnswers: [{ answer, why, remedy }] }`. This is the heart of responsive teaching; see `assessment-and-feedback.md`.
- **Display blocks are LOOK-ONLY; interactive blocks carry the answer.** To make the child *do* something (place, pick, type, arrange), you must use an interactive block. Never ask a child to act on a display-only block.

---

## The beats

### HOOK — open the appetite and warm up prior knowledge
- **Purpose:** create a reason to care, connect to the child's world/interests, and *retrieve the prerequisite* so the new idea has somewhere to land. Hooks do double duty: motivation + a prior-knowledge check (`pedagogy-core.md` §1, §4, §12).
- **How long:** short — 30–90 seconds. One or two turns.
- **What good looks like:** a vivid, concrete entry tied to *this* child's interests, *plus* a quick recall of the named prior knowledge. e.g. teaching fractions to a football fan: "If we cut a half-time orange into 4 equal pieces, what do we call one piece?… Before that — quick one, what does *equal* mean?"
- **Common mistakes:** a generic, bland opener ("Today we're learning fractions"); a hook so elaborate it becomes the lesson; skipping the prior-knowledge check and discovering mid-lesson the prerequisite is missing.
- **Blocks that fit:** usually none (just warm speech), or a single attention-grabbing `emojiViz`/`image`, or a one-item retrieval `multipleChoice`/`trueFalse` to surface prior knowledge.

### EXPLAIN — model the idea ("I do")
- **Purpose:** present the one new idea clearly, in the smallest steps, with a *think-aloud* model. This is the teacher demonstrating (`pedagogy-core.md` §2, §3).
- **How long:** brief — the explanation is small steps, not a lecture. A turn or two; check before it sprawls.
- **What good looks like:** one concept, chunked, anchored concretely/pictorially before the abstract (CPA, §8), narrating the *decisions* not just the answer. e.g. "Watch how I find a quarter. A quarter means *four equal parts*. Here's the orange — I cut it into 4 equal pieces… one of those is a quarter."
- **Common mistakes:** dumping the whole topic at once (cognitive overload); explaining abstractly with no concrete/visual anchor; talking for many turns without handing it back; a busy visual that competes with the words (redundancy — §7).
- **Blocks that fit:** display/teaching blocks — `richText` (short), `steps` (reveal a worked method step-by-step), `whiteboard` (diagram/bar model/array, `animate:true`), `slideshow`, `video`, `keyTerm` for vocabulary, `numberLine`/`emojiViz` for the concrete-pictorial anchor.

### EXAMPLE — do one together ("we do")
- **Purpose:** a *shared* attempt where the child participates and you catch errors instantly. The bridge from watching to doing (`pedagogy-core.md` §2, §3).
- **How long:** a turn or two — long enough for genuine joint work.
- **What good looks like:** you start a worked example and hand pieces to the child ("I've cut it into 4 — you tell me which one piece is the quarter"). Fade from fully-worked toward partially-worked as they engage. The child contributes thinking, not just nods.
- **Common mistakes:** making "we do" secretly another "I do" (the child just watches again); doing the *whole* thing so they never contribute; jumping past it straight to solo practice.
- **Blocks that fit:** a `steps`/`whiteboard` you build *with* them, a low-stakes `multipleChoice`/`fillBlank` (with a `wordBank` scaffold) where you set it up together, or a `shortText`/`speak` capturing their contribution.

### CHECK — find out if it landed
- **Purpose:** a deliberate, revealing question that produces *evidence* of understanding so you can respond. Formative assessment in action (`pedagogy-core.md` §11; full detail in `assessment-and-feedback.md`).
- **How long:** one focused exchange; wait for a real answer (give wait time).
- **What good looks like:** a question that *distinguishes* understanding from guessing and would expose the likely misconception, with its pre-authored `wrongAnswers`. After the answer, ask "how did you get that?" even when right. e.g. check a quarter with an *un*even split as a distractor, so a child who thinks "any 4 parts" reveals it.
- **Common mistakes:** a check too easy to reveal anything ("is a quarter four parts? yes/no"); accepting a right answer without probing for reasoning (guessing slips through); not acting on the result.
- **Blocks that fit:** interactive blocks that carry the answer key — `multipleChoice`, `multiSelect`, `trueFalse`, `numberEntry`, `fillBlank`, `matchPairs`, `ordering`, `categorize`; `shortText`/`speak` when you'll judge the reasoning via `answerEval`.

### PRACTICE — they try it alone ("you do")
- **Purpose:** independent application — the child does it themselves so the skill becomes theirs and starts toward fluency (`pedagogy-core.md` §2, §13).
- **How long:** the meatiest doing portion; one or a few items.
- **What good looks like:** the child works a fresh problem solo with *faded* support. Once the skill is secure, **interleave** types so they choose the method, not just repeat one (§5). e.g. "Now you: which of these shows a quarter shaded?" then a non-quarter distractor.
- **Common mistakes:** never reaching "you do" (the whole lesson stays guided); practice that's identical drill of one type when interleaving would build more; leaving scaffolds on so it's not really independent; abandoning a struggling child instead of re-scaffolding.
- **Blocks that fit:** the interactive blocks, with support faded (drop the `wordBank`, give a clean problem). For reasoning-heavy subjects, `shortText`/`speak`.

### RECAP — consolidate and close well
- **Purpose:** retrieve and cement the key idea, leave the child feeling successful, and plant the seed for spaced review (`pedagogy-core.md` §4, §5).
- **How long:** short — 20–40 seconds. One turn.
- **What good looks like:** a quick *child-led* recall ("So — what's a quarter? Tell me in your own words"), one specific piece of **process praise** about what they did well, and a warm sign-off. Sets `lessonComplete=true` after the final recap.
- **Common mistakes:** the *tutor* summarising instead of the child retrieving (misses the retrieval benefit); vague "great job!" instead of specific praise; trailing off with no closure; cramming a new idea into the recap.
- **Blocks that fit:** usually just warm speech, or a single closing retrieval (`multipleChoice`/`shortText`), or `flashcards` flagging what to revisit.

---

## Differentiating: gentle / standard / challenge

The planner picks a lesson `difficulty` (`gentle | standard | challenge`) for the child, and the tutor flexes live. The *structure* stays the same; the *grain size and support* change.

- **Gentle** — for a child who's shaky, anxious, or missing some prerequisite. Smaller steps, more concrete/pictorial, heavier scaffolds (sentence starters, `wordBank`, partially-worked examples, a `numberLine` to lean on), simpler numbers/contexts, more "we do" before "you do", extra encouragement. Aim to guarantee early wins.
- **Standard** — the band-appropriate default: solid model, one shared example, a genuine check, independent practice with faded support.
- **Challenge** — for a confident, flowing child. Fewer scaffolds, faster fade, harder numbers/contexts, interleaving, "why does that work?" and "would it always?", an extension that generalises the idea. Don't just add *more* — add *depth*.

Match difficulty to the **~80% success band** (`pedagogy-core.md` §1): if the child is missing a lot, slide toward gentle; if everything's trivially right, slide toward challenge. The live director also nudges this — when momentum is "flowing" on an explain/example beat it tells the tutor to move crisper and raise the challenge slightly.

---

## Responding to struggle — the "learner is stuck" case

When a child misses twice in a row, Classai's director sets a **stuck** state and tells the tutor *not to advance*. This is the most important moment for lesson quality. The move:

1. **Don't reveal the answer.** Revealing it ends the learning.
2. **Diagnose *why*** (a careless slip vs a missing prerequisite vs a real misconception — see `assessment-and-feedback.md`). The pre-authored `wrongAnswers` (`why`/`remedy`) are exactly for this.
3. **Simplify to the smallest next step.** Drop back a CPA stage (abstract → pictorial → concrete), shrink the numbers, or break the step in half.
4. **Add a scaffold or give *one* concrete hint** — a sentence starter, a partial worked example, "what if it were 10 instead of 7?"
5. **Re-ask a smaller version**, then build back up.
6. **Keep it emotionally safe** the whole time — "Mistakes just show us what to practise. Let's take a smaller step." Never let the child feel they're failing.

The opposite failure also matters: a child who's *flowing* shouldn't be slowed by needless re-explanation — keep it crisp and raise the bar.

There's also a **block-misuse** stuck case the director catches: sending the same *display-only* block twice expecting the child to act on it. Display blocks can't be tapped/typed/dragged — if you want the child to *do*, switch to an interactive block, or fill the display in yourself and check with `multipleChoice`/`numberEntry`/`ordering`/`fillBlank`.

---

## Ending well (and pacing the whole)

- **End on a success.** Engineer the final practice/recap so the child finishes with a win they earned — it's what they'll remember and what brings them back.
- **Time-box gracefully.** When the soft time limit hits, the director forces a wrap-up. So *front-load the essential idea* — get the one key concept modelled, checked, and practised early; treat extension as optional. Never let the lesson run out of time with the core idea unchecked.
- **Honest, specific process praise** at the close — name the *strategy or effort* you actually saw ("you kept going and switched methods"), never global ability ("you're so clever"). See `pedagogy-core.md` §14.
- **Hand off to spaced review.** Note what to revisit (memory updates / `needsWork`) so the system can resurface it in a future lesson — one lesson is the start of a spaced sequence, not the end of a topic.

---

## One worked skeleton (fractions, ~age 8, "standard")

| Beat | What happens | Block |
|---|---|---|
| **hook** | "If we share a pizza fairly between 4, what's your slice called? … Quick recall: what does *equal* mean?" | none / `emojiViz` 🍕 |
| **explain** | Think-aloud: "A quarter = 4 *equal* parts; one of them is a quarter." Cut the pizza on a board. | `whiteboard` (animate) |
| **example** | "We do" — you cut, child names which piece is the quarter; child contributes. | `multipleChoice` set up together |
| **check** | "Which picture shows a quarter shaded?" — distractor: 4 *un*equal parts (reveals the "any 4 parts" misconception). | `multipleChoice` (carries answer + wrongAnswers) |
| **practice** | "Your turn, solo: shade-which-one shows ¾?" — support faded; then interleave with ½. | `multiSelect` / `fillBlank` |
| **recap** | "Tell me in your own words — what's a quarter?" + "You spotted the *equal* part brilliantly." | warm speech |

Small topics collapse some of these; tricky ones loop *example*→*check* until the child is solid. The arc — hook to recap, I-do to you-do — is the constant.

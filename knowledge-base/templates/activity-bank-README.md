# Activity & Game Bank — how it's organised and how to pick

A large, reusable library of **activities and games** for tutoring children **ages 5–11**, designed to work **one-to-one at home** (parent + child, or the Classai AI tutor + child) and mapped to the app's interactive blocks.

It has two parts:

- **`activity-bank-generic.md`** — 40+ **topic-agnostic** activities. Each one is a *frame* you drop any content into: "Odd one out" works for shapes, animals, verbs, or composers. Reach here first.
- **`activity-bank-by-subject.md`** — subject-specific activities for **maths, English, science, history, geography, world language (Spanish), art, music, computing, life skills**. Reach here when a subject has a signature move (number talks, predict-observe-explain, TPR) the generic frames don't capture.

Every entry uses the same fields, so you can scan and compare:

> **Name** · **Goal / when** (which lesson beat) · **How to run** (steps) · **Adapt to any topic** · **Classai block(s)** · **Primary example**

---

## 1. Pick by GOAL (which lesson beat are you filling?)

These activities slot into the Classai lesson arc — **hook → explain → example → check → practice → recap** (`teaching/lesson-anatomy.md`). Choose by what the beat needs:

| Goal | What you want | Good activity families |
|------|---------------|------------------------|
| **HOOK** — open the appetite, surface prior knowledge | fast, curious, low-stakes, 30–90s | Would-you-rather, Odd-one-out, Estimation, Mystery/Whodunit, 20 Questions, Which-one-doesn't-belong, Notice & wonder |
| **EXPLAIN** — model one idea ("I do") | clear, chunked, concrete-first | Think-aloud, Worked example reveal, Draw-it/Build-it (you model), I have… who has… (you demo) |
| **EXAMPLE** — do one together ("we do") | shared, child contributes | Quiz-quiz-trade (1:1), Describe-it/Taboo, Story chain, Role-play, Build-it together |
| **CHECK** — get evidence it landed | reveals understanding vs guessing | True/false swat, Sorting/categorising, Matching pairs, Fill-the-gap, Spot-my-mistake, Hot-seat |
| **PRACTICE** — they try it alone ("you do") | independent, fluency-building, interleaved | Bingo, Board-game frame, Dice/card games, Flashcard games, Ranking/Diamond-9, Quick-write, Scavenger hunt |
| **RETRIEVAL** — pull it back from memory (any beat, especially warm-up) | effortful recall, spaced | Flashcard games, Bingo, I have… who has…, Brain-dump quick-write, Quiz-quiz-trade |
| **CONSOLIDATION / RECAP** — cement and close | child-led recall, sense of success | Exit-ticket games, Quick-write, Draw-it summary, Ranking/Diamond-9, 3-2-1 |
| **CHECK / assess at the door** — quick read of where they are | one focused, revealing item | Exit-ticket games, Estimation, Hot-seat, Spot-my-mistake |

**Rule of thumb:** every activity here is really a wrapper around one of three cognitive moves — **retrieve** (pull from memory), **process** (sort, compare, sequence, explain), or **produce** (write, draw, build, say). Hooks and recaps lean on retrieve; checks lean on process; practice spans all three.

---

## 2. Pick by INTERACTION TYPE (which Classai block does it become?)

If you're authoring for the app, work backwards from the block. Each block has a small set of activities that fit it naturally:

| Classai block | Activities that map to it |
|---------------|---------------------------|
| **multipleChoice** | Odd-one-out, Would-you-rather, 20 Questions, Which-one-doesn't-belong, quiz frames, Mystery clues |
| **multiSelect** | "Pick all that…" sorts, Diamond-9 shortlist, error-spotting (find all the mistakes) |
| **trueFalse** | True/false swat, Spot-my-mistake (single claim), myth-busting |
| **fillBlank** | Fill-the-gap, cloze, Mad-libs style story chain, sentence stealing |
| **matchPairs** | Matching pairs, I have… who has…, vocabulary pairs, cause↔effect |
| **ordering** | Sequencing, story chain order, timeline, steps-of-a-process, ranking |
| **categorize** | Sorting/categorising, concept sort, odd-one-out (sort version), Venn/two-box |
| **numberEntry** | Estimation, dice/card score games, number talks answer, scavenger-hunt counts |
| **shortText** | Quick-write, exit ticket, brain-dump, 3-2-1, error explanation, hot-seat answer |
| **speak** | Charades narration, Taboo/describe-it, role-play, 20 Questions, TPR, read-aloud |
| **richText / steps / keyTerm** (display) | Think-aloud model, worked example reveal, rules of a game, vocabulary intro |
| **numberLine / table / emojiViz** (display) | Estimation anchor, number talks, sorting grid, bar-model story |
| **whiteboard** (display, can animate) | Draw-it, Pictionary, build-it diagrams, board-game frame, bar models |
| **image / video / slideshow** (display) | Scavenger hunt prompts, mystery clues, hook visuals, picture-based 20 questions |
| **flashcards** (display) | Flashcard games, I have… who has… deck, retrieval warm-ups, bingo card source |
| **custom** | Board-game frames, dice games, anything bespoke when no standard block fits |

**Reminder (from `lesson-anatomy.md`):** *display blocks are look-only; interactive blocks carry the answer.* If you want the child to **do** something — pick, sort, place, type, say — the activity must end in an interactive block (or in the AI judging a `speak`/`shortText` reply). Use a display block to *set up* the game, an interactive block to *play* it.

---

## 3. How to ADAPT any activity to your topic (the 4-step swap)

The whole point of the generic bank is reusability. To turn a frame into a real activity:

1. **Name the learning target.** One sentence: "child can identify odd and even numbers" / "child knows three causes of the Fire of London."
2. **Pick the matching frame** by goal (§1) or block (§2).
3. **Fill the slots.** Every frame has 1–3 content slots (the cards, the claim, the categories, the gap). Swap in *your* target's content. Each entry's **"Adapt to any topic"** line tells you exactly what the slots are.
4. **Personalise the wrapper.** Skin it in the child's interests (football, dinosaurs, Minecraft, a favourite book) — same task, child's world. This is where the Classai tutor uses its **learner model** (`server/src/memory/`) to choose the theme.

---

## 4. Make it work at home, 1:1

These are tuned for **one child + one tutor**, not a class of thirty. The adaptations are baked into each entry, but in general:

- **Class games → 1:1 versions.** "Quiz-quiz-trade" (kids swap questions in pairs) becomes *tutor and child trade*. "I have… who has…" (a chain round a room) becomes *a two-handed deck* the pair pass back and forth. "Bingo" needs no callers — the tutor calls, the child marks.
- **Competition → beat-your-best.** With no peers, race the **clock** or the child's **own previous score**, not another kid. Keep it light; the goal is effortful recall, not winning.
- **Movement still matters.** Swat, charades, TPR, scavenger hunts — young children learn through the body. The AI tutor can *narrate* these and have the child report back via `speak`/`shortText` even when it can't see them.
- **Keep stakes low and turns short.** Ages 5–7 fade fast; one round of a game beats a long one. Stop while it's still fun.

---

## 5. Choosing well — a short decision guide

- **Starting a lesson?** → a hook frame (Would-you-rather, Odd-one-out, Estimation, Notice & wonder).
- **Child just learned something — does it stick?** → a check frame (True/false swat, Sorting, Spot-my-mistake).
- **Need fluency on a known skill?** → a practice frame (Bingo, Board-game, Dice/card, Flashcard games), and **interleave** item types so they pick the method (`teaching/pedagogy-core.md` §5).
- **Reviewing last week's topic?** → a retrieval frame as a warm-up (Brain-dump, Flashcard games, I have… who has…) — spacing beats massing.
- **Closing a lesson?** → a recap/exit frame (3-2-1, Quick-write, Draw-it summary) that makes the *child* do the recalling.
- **Child is flagging / it's gone flat?** → switch modality: a movement or drawing or speaking game (Charades, Pictionary, Role-play, TPR).

> **Evidence note.** Games and activities are vehicles, not magic. They earn their place when they force **active processing** and **retrieval**, give **immediate feedback**, and keep **cognitive load** manageable — the same mechanisms behind all good teaching (`teaching/pedagogy-core.md`, `teaching/research-learning-science.md`). A game that's all fun and no thinking ("hands-on but minds-off") is a waste of a turn. Pick the frame for the thinking it forces, then make it delightful.

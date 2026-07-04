# Assessment & Feedback — formative checking for 1:1 tutoring

This file is the diagnostic engine of a Classai lesson. It covers how to **write a good check**, how to **diagnose *why* an answer is wrong** (not merely that it is), the **wrong-answer → misconception → remedy loop** (which maps directly onto the app's `BeatCheck.wrongAnswers` structure), how to **give feedback that moves learning forward**, how to **tell mastery from guessing**, **when to reteach vs advance**, and how **spaced review** revisits decide what comes back.

The core idea: in 1:1 teaching, assessment is not grading — it's **gathering evidence in order to adapt**. Every check should change what you do next. A check that doesn't change anything was a wasted turn (`pedagogy-core.md` §11).

---

## 1. How to write a good check

A good formative check is one whose answer **tells you something you didn't already know** about the child's understanding — and, ideally, *distinguishes real understanding from a plausible misconception*.

**Properties of a strong check:**
- **Diagnostic, not just correct/incorrect.** Design it so the *wrong* answers are *informative* — each wrong answer should correspond to a specific misconception, so the child's choice reveals *which* confusion they have. This is exactly the `wrongAnswers` array.
- **In the right difficulty band (~80% gettable).** Hard enough to reveal understanding, not so hard it just measures frustration. Too easy reveals nothing.
- **One thing at a time.** Test the target concept, not three skills at once — otherwise a wrong answer is ambiguous (was it the fractions or the multiplication that broke?).
- **Probes reasoning, not just the result.** Either build the reasoning into the task or follow up with "how did you get that?" — including when the answer is *right* (see §5 on guessing).

**Example of a weak vs strong check** (telling a quarter):
- Weak: "Is a quarter one of four parts? (yes/no)" — a child who thinks *any* 4 parts count says "yes" and looks correct. Reveals nothing.
- Strong: a `multipleChoice` with one circle in 4 *equal* parts shaded, and a distractor with 4 *unequal* parts shaded. A child holding the "any four parts" misconception will pick the unequal one — and now you *know*.

**Writing good distractors / `wrongAnswers`:** don't invent random wrong options. Make each wrong answer a *real mistake a child actually makes*, drawn from the topic's misconception list. A distractor nobody would pick teaches you nothing.

**How the tutor should apply this:** Author every `check`/`practice` beat's `check` object so each `wrongAnswers` entry is a genuine, diagnostic misconception with its own `why` and `remedy`. Keep checks single-concept and in the ~80% band, and follow right answers with a quick "how did you work it out?".

---

## 2. Diagnosing *why* an answer is wrong — slip vs gap vs misconception

This is the most important skill in responsive tutoring. "Wrong" is not a diagnosis — *why* it's wrong determines the fix. There are three causes, and they need *different* responses:

1. **Slip (careless error).** The child *knows* the concept but mis-executed — a miscount, a transcription slip, a rushed step. e.g. they understand carrying but wrote 71 for 27+5 by adding the 5 to the tens.
   - *Remedy:* a light nudge — "Check that again carefully" / "Read it once more." Don't reteach; you'll bore and confuse them. Slips don't repeat systematically.

2. **Gap (missing prerequisite).** The child can't do this because a *prior* skill isn't in place. e.g. they can't bridge through ten because their number bonds to 10 aren't fluent.
   - *Remedy:* pause the new content and **shore up the prerequisite** first (`pedagogy-core.md` §12). Teaching the new thing on a missing foundation is futile.

3. **Misconception (a wrong but coherent belief).** The child has constructed a *rule that's wrong* and applies it consistently. e.g. "to multiply by 10, add a zero" → fails on decimals (2.5 × 10 = 2.50). Or "the longer number is the bigger number" → 0.45 > 0.6.
   - *Remedy:* you must **confront and replace the faulty rule**, usually with a concrete counter-example that the wrong rule *can't* explain (`pedagogy-core.md` §11). Just restating the right answer rarely works — the misconception survives and resurfaces.

**How to tell them apart:** *ask*. "How did you work that out?" surfaces the reasoning. A slip sounds like "oh, I added wrong"; a gap sounds like the child not knowing a sub-step; a misconception sounds like a confident, wrong *rule*. The pattern also tells you: a one-off is likely a slip; a *systematic, repeated* error is a gap or misconception.

**How the tutor should apply this:** On any wrong answer, *diagnose before responding* — usually by asking the child to explain their thinking. Match the response to the cause: nudge a slip, backfill a gap, confront a misconception with a counter-example. The pre-authored `wrongAnswers[].why` already encodes the likely cause — use it, but verify against what the child actually says.

---

## 3. The wrong-answer → misconception → remedy loop (the `wrongAnswers` structure)

Classai bakes this loop into the data model. Every check beat carries:

```
check.wrongAnswers: [ { answer, why, remedy } ]
```

- **`answer`** — a specific wrong answer the child is likely to give.
- **`why`** — the misconception or error behind it (the *diagnosis*).
- **`remedy`** — the precise teaching move to fix it (the *response*).

This is the §2 diagnosis machinery, pre-authored so the tutor doesn't have to invent it live. When the child gives that wrong answer, the tutor already has the diagnosis and the fix ready — and follows the rule: **diagnose, then give *one* targeted hint or counter-example; do *not* reveal the answer.**

**A fully worked example** (decimals, comparing 0.45 and 0.6):

```
question:       "Which is bigger, 0.45 or 0.6?"
expectedAnswer: "0.6 — it's 6 tenths, which is more than 4 tenths (0.45 is between 0.4 and 0.5)."
wrongAnswers:
  - answer:  "0.45"
    why:     "Thinks the longer/more-digits number is bigger ('whole number' thinking applied to decimals)."
    remedy:  "Line them up by place value: 0.6 = 0.60. Compare tenths first: 6 tenths vs 4 tenths. Use a number line — 0.45 sits before 0.5, 0.6 sits after. The counter-example breaks the 'more digits = bigger' rule."
```

When a child answers "0.45", the tutor doesn't say "wrong, it's 0.6." It says something like: "Interesting — let's line them up by place value. 0.6 is the same as 0.60. Now compare the tenths…" — the *remedy*, as a guiding move, letting the child recover the answer.

**How the tutor should apply this:** Treat `wrongAnswers` as a live playbook. When the child's answer matches one, run its `remedy` as a guiding hint — never as the bare answer. When the answer matches *none*, fall back to §2: ask for the reasoning, classify slip/gap/misconception, and respond accordingly. (Memory updates should record any genuine misconception so it's watched for next time.)

---

## 4. Feedback that moves learning forward

Feedback should tell the child **how to improve their thinking**, not just whether they were right. Effective feedback (Hattie & Timperley) answers "where am I going, how am I doing, where to next?" — and for children it must also keep them *safe and willing to keep trying*.

**Do:**
- **Be specific about the thinking.** "You lined the place values up really carefully" / "You spotted that the parts had to be *equal*" — not "good job." (Process praise — `pedagogy-core.md` §14.)
- **On a wrong answer, guide, don't tell.** One targeted hint or one question that moves them one step — then hand it back so *they* produce the answer. Recovering it themselves is what builds the memory.
- **Treat mistakes as information.** "Great mistake — it shows exactly what to practise." Keep it warm and blameless.
- **Confirm *and probe* right answers.** "Yes — how did you get it?" so reasoning isn't only demanded after errors.

**Don't:**
- **Don't give the answer away** on a miss (kills the learning).
- **Don't praise emptily or dishonestly.** "Great!" on a wrong answer confuses the child and erodes trust — name the part that *was* good, then fix the rest.
- **Don't praise ability** ("you're so clever") — praise the strategy/effort.
- **Don't pile on corrections.** One clear next step beats five.

**Worked contrast** (child says ½ of 8 is 3):
- *Weak:* "No, it's 4." (tells, no learning) — or "Good try!" (empty, dishonest).
- *Strong:* "Let's check — half means two *equal* groups. Deal these 8 counters into two piles, one each… how many in each pile now?" (a guiding remedy; the child re-derives 4).

**How the tutor should apply this:** Make feedback *specific, process-focused, blameless, and forward-moving*. On errors, give exactly one guiding hint and let the child finish. Probe right answers for reasoning. Keep praise honest and tied to thinking. This is precisely the `TEACHING_PRINCIPLES` the live prompt already enforces — apply them rigorously.

---

## 5. Spotting mastery vs guessing

A correct answer is *not* proof of understanding — especially on `multipleChoice` and `trueFalse`, where guessing has decent odds. Distinguishing real mastery from luck protects you from advancing too soon on a shaky foundation.

**Signs it's probably *guessing* / fragile:**
- They can't explain *how* they got it ("I just knew" / shrug).
- Right on a multiple-choice but wrong when asked to *produce* the same answer freely (`numberEntry`/`shortText`).
- Correct on one phrasing, lost when the surface changes slightly (a different context or layout).
- Long hesitation then a guess; answer flips when you ask "are you sure?".
- Got it after seeing the auto-feedback slide a wrong choice to the right one — that's recognition, not recall.

**Signs it's probably *mastery*:**
- They can **explain the reasoning** in their own words.
- They're right across **varied** items, including a transferred or interleaved one.
- They're **quick and confident** without reconstructing from scratch (fluency — `pedagogy-core.md` §13).
- They can spot *why a wrong option is wrong*, or catch a deliberate error.

**The single best test: ask them to explain or to apply it to a slightly different case.** "How did you work that out?" and "What if it were 12 instead of 8?" separate luck from learning fast.

**How the tutor should apply this:** Don't treat a single correct multiple-choice as mastery. Confirm with a reasoning probe ("how did you get it?") or a transfer item (a free-entry or interleaved version). Only then record high mastery and advance. When confidence and explanation are both present and the answer holds across variation, that's the green light.

---

## 6. When to reteach vs advance

Use the evidence — and the ~80% success band — to decide:

**Advance when:**
- The child meets the beat's `successCriteria` with **understanding** (not just a lucky tick) — confirmed by reasoning or transfer (§5).
- They're consistently in/above the ~80%-correct band on this skill.
- Momentum is good and the next step is the natural progression. (When the director reports "flowing", keep it crisp and move on — don't over-explain a secure child.)

**Reteach / hold when:**
- A **systematic** error (gap or misconception) is present — advancing layers new learning on a broken foundation (§2).
- The child can do it *only* with heavy scaffolds — fade and re-check before moving on.
- They're below the success band — the step was too big; shrink it, reteach the smaller piece, re-check. (The director's "stuck" state — two misses in a row — *is* the signal to stop advancing and reteach the smallest next step; see `lesson-anatomy.md`.)
- It's a **slip**, not a gap — *don't* reteach (you'll bore/confuse a child who already understands); just nudge and move on.

**The balance:** advancing too soon builds fragile knowledge that collapses later; reteaching what's already mastered wastes time and demotivates. Lean on *evidence of understanding*, not just *evidence of a right answer*. And remember the time-box — if time is short, secure the *one core idea* (model→check→practise it) and let extension go rather than half-teaching two things.

**How the tutor should apply this:** Gate advancement on understanding, not on a single correct response. Reteach systematic errors at a smaller grain; nudge (don't reteach) slips; fade scaffolds before crediting mastery. Front-load the core idea so it's secured before time runs out.

---

## 7. Spaced review — deciding what comes back, and when

One correct lesson does not equal permanent learning. Memory fades, and **re-retrieving something after a delay** is what makes it durable (`pedagogy-core.md` §4–5). So assessment doesn't end at the lesson — it feeds a *schedule of revisits*. Classai's long-term learner model and spaced-review system use this.

**What to bring back:**
- **Known sticking points** — anything that needed reteaching, or any misconception you caught and corrected (it isn't truly gone after one fix; verify it later). These are the highest priority.
- **Newly-mastered skills** — to convert "got it once" into durable, fluent knowledge.
- **Prerequisites for upcoming topics** — refresh them just before they're needed.

**When (spacing schedule):** sooner for shaky/just-learned material, then at expanding intervals as it proves durable — a revisit in a few days, then a couple of weeks, then a month. A *little* forgetting before the revisit is *good*; that's the effortful re-retrieval doing the work, so don't panic if a revisit is rocky — that's exactly when the practice pays off.

**How to revisit (lightly):** a single retrieval item dropped into a later lesson's **hook**, a short **review** lesson that spends most of its time on the child's known sticking points plus a couple of fresh items, or **interleaving** a previously-learned type into today's practice so the child must choose the method (§5 of pedagogy-core). Keep revisits low-stakes and quick — they're maintenance, not re-teaching from scratch (unless the revisit reveals the skill genuinely decayed, in which case reteach).

**How the tutor should apply this:** Record what to revisit via the turn's `memoryUpdates` (mastery, struggles, misconceptions) and the end-of-session `needsWork` — this is what lets the system schedule spaced returns. Open lessons with a quick retrieval of a *prior* topic, give corrected misconceptions a deliberate later re-check, and expect (don't fear) a little rustiness on revisits — re-retrieving it is the point.

---

## The loop in one line

**Ask a revealing check → read the answer *and its reasoning* → diagnose (slip / gap / misconception) → respond with one guiding move (nudge / backfill / counter-example), never the bare answer → confirm understanding, not luck → advance or reteach accordingly → schedule what to bring back.**

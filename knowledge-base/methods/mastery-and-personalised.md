# Mastery & personalised methods

This family is, in many ways, **Classai's home turf.** A 1:1 AI tutor *is* the technology that finally makes mastery learning and personalisation practical: Bloom's famous "2 sigma problem" (1984) showed that one-to-one tutoring with mastery learning moves the average student two standard deviations above classroom teaching — the best result in education — but it was unaffordable to deliver at scale. Classai's whole reason to exist is to approximate that for one child.

So these methods are not optional flavour — they describe how the tutor should *sequence, pace, gate, scaffold, and adapt*. The director's state machine, the difficulty banding, the prerequisite checks, and the two-tier memory are all implementations of the ideas below.

See also: `pedagogy-core.md` §8 (scaffolding), `research-ai-tutoring.md`, and the sibling `metacognition-and-self-regulation.md`.

---

## Mastery learning (Bloom)

**Family:** Mastery & personalised · **Evidence:** strong — EEF Mastery learning +5 months; Bloom's 2-sigma; Kulik et al. meta-analyses · **Best for:** hierarchical, cumulative subjects (maths, reading, languages); any age.

**What it is.** A child must reach a defined level of **mastery** on a unit (typically ~80%+) **before** moving to the next, with extra time and corrective teaching for those who need it. Time is the variable; the standard is fixed. The opposite of "teach the unit, test once, move on regardless."

**Why it works.** In cumulative subjects, gaps compound — a child who only half-learned subtraction will fail at the next thing that needs it. Holding the standard fixed and varying the time prevents the silent accumulation of holes; the corrective loop (re-teach what was missed, differently) fixes errors before they fossilise.

**When to use / when NOT.** Default for cumulative skills. The trade-off: it's slower for some material, and "mastery before progress" can stall a child who's nearly there — so set a *sensible* bar (not perfection) and watch for diminishing returns. Less critical for loosely-connected enrichment content.

**How to run it (steps).**
1. Define the mastery criterion for the unit (clear, ~80%).
2. Teach.
3. Formative check.
4. If not mastered → **corrective** teaching (a *different* approach, not louder repetition) → re-check.
5. Only then progress; provide enrichment for those who master quickly.

**1:1 AI-tutor adaptation.** This is the **director's core gating logic.** A lesson doesn't end "successful" until the `check`/`practice` beats clear a mastery bar; if not, the wrong-answer→remedy loop runs **corrective instruction (a different explanation/representation), not a repeat.** The `LearnerModel` mastery map is the persistent record of what's mastered, gating the *next* topic via prerequisites. Spaced review re-tests mastery later (mastery isn't one-and-done). Enrichment for fast masters = raising the difficulty band rather than ending early.

**Primary example.** Maths, Year 2: the child must reliably show number bonds to 10 (`numberEntry`, ~8/10) before the tutor advances to bonds to 20 — and if they miss, the corrective uses a *ten-frame* (`whiteboard`) rather than repeating the same words.

**Pitfalls.** "Corrective" = louder repetition of the same failed explanation; a perfectionist bar that stalls progress; never re-checking mastery later (it decays).

**Related.** [[keller-plan-psi]], [[competency-standards-based-progression]], [[precision-teaching]], [[spacing-of-mastery-checks]]

---

## Keller Plan / Personalised System of Instruction (PSI)

**Family:** Mastery & personalised · **Evidence:** moderate-strong — Keller's PSI showed strong achievement gains in its era; self-paced mastery with unit gating · **Best for:** self-paced, modular progression; motivated independent learners; ages 9–11 and up.

**What it is.** A self-paced mastery system: content is broken into small **units**; the learner studies, takes a unit test, and must pass it (mastery) to unlock the next. Five features: mastery requirement, self-pacing, unit modularity, stress on the written/explained word, and immediate scoring/feedback.

**Why it works.** Self-pacing + mandatory mastery means no child is dragged forward before ready or held back when ready; small units give frequent success and clear progress; immediate feedback closes the loop fast.

**When to use / when NOT.** Great where content modularises cleanly and the learner can work fairly independently. Risk: self-pacing can let an unmotivated learner drift (procrastination), so it needs a motivational/structure scaffold — exactly where a tutor and the home-ed routine help.

**How to run it (steps).**
1. Break the course into small, ordered, masterable units.
2. Learner studies a unit at their own pace.
3. Unit test; immediate feedback.
4. Pass → next unit; not pass → restudy that unit.

**1:1 AI-tutor adaptation.** Maps onto the **Topic→Lesson** structure: each Topic is a unit, gated by `prerequisites`, unlocked only when mastered (the mastery map). The tutor supplies the self-pacing (a child can spend two sessions on one Topic) *and* the motivational scaffold PSI lacks — the avatar, streaks, and warm encouragement counter the procrastination risk. Immediate feedback is the per-turn remedy loop.

**Primary example.** Maths progression: "Times tables" as a Topic split into ×2, ×5, ×10, ×3, ×4… units; the child unlocks ×4 only after mastering the earlier ones, at their own pace across sessions.

**Pitfalls.** Drift/procrastination under pure self-pacing; units too big to feel like progress; no enrichment for fast movers.

**Related.** [[mastery-learning-bloom]], [[competency-standards-based-progression]], [[adaptive-personalised-learning]]

---

## Competency / standards-based progression

**Family:** Mastery & personalised · **Evidence:** promising — coherent with mastery learning; system-level evidence still developing · **Best for:** tracking *what a child can do* against clear standards rather than age/year; any age, home-ed especially.

**What it is.** Progress is defined by **demonstrated competencies/standards** met, not by time served or year group. A child advances when they can *do* the thing, and their record is a map of competencies, not a single grade.

**Why it works.** It decouples learning from age, so a child can be ahead in reading and consolidating in maths simultaneously (true personalisation), and it makes "what next" concrete (the next un-met competency). It honours the cumulative reality of skills.

**When to use / when NOT.** Ideal for home-ed and 1:1 where rigid year-groups don't apply. Needs well-specified competencies (vague standards → vague tracking). The risk: fragmenting learning into a checklist of micro-skills that miss the bigger picture.

**How to run it (steps).**
1. Define clear, observable competencies (the standards crosswalk supports this).
2. Assess against them, not against a year-level average.
3. Record each as not-yet / developing / secure.
4. Pick the next lesson from the secure-able frontier.

**1:1 AI-tutor adaptation.** The `LearnerModel` mastery map **is** a competency record — per-skill, not per-year. The tutor recommends the next lesson from the "developing → about to be secure" frontier (the ZPD, below), independent of the child's age. Progress rollups report competencies met, giving parents a true picture rather than a single grade. The standards crosswalk lets the same competency map onto UK/US/IB labels.

**Primary example.** A 7-year-old who reads fluently (secure: decoding, fluency) but is developing addition: the tutor advances reading to comprehension/inference while consolidating number bonds — different frontiers, same child.

**Pitfalls.** Vague competencies; a checklist mindset that loses coherence; mistaking "covered" for "secure."

**Related.** [[mastery-learning-bloom]], [[knowledge-tracing-and-prerequisite-mapping]], standards crosswalk

---

## Precision teaching

**Family:** Mastery & personalised · **Evidence:** strong for *fluency* of well-defined skills (Lindsley; behavioural fluency research) · **Best for:** building **fluency** (speed + accuracy) of foundational facts/skills; ages 5–11.

**What it is.** A measurement-driven method: a precisely-defined skill is practised in very short, timed bursts, with **rate (correct responses per minute)** charted over time, and instruction adjusted from the chart. The goal is *fluency* — automatic, fast, accurate performance, not just one-off accuracy.

**Why it works.** Accuracy alone isn't enough: a child who gets 7+5 right *slowly* will still choke when it's a sub-step inside a bigger problem (working-memory cost). Fluency makes facts automatic, freeing working memory for harder thinking. Daily timed practice + visible progress charts drive both the skill and the motivation.

**When to use / when NOT.** For foundational facts/skills that should become automatic: number bonds, times tables, phonics grapheme-phoneme correspondences, sight words. **Not** for conceptual understanding (you don't "fluency-drill" *why* fractions work) and not before the child *understands* the thing — fluency follows understanding, never replaces it.

**How to run it (steps).**
1. Pick a precisely-defined skill already understood.
2. Short daily timed probe (e.g. 1 minute of number bonds).
3. Chart correct-per-minute.
4. If the rate plateaus or dips, change the instruction.
5. Celebrate the rising line (it's motivating).

**1:1 AI-tutor adaptation.** Implemented as **timed fluency `practice` beats**: a 60-second burst of `numberEntry`/`flashcards`, scoring correct-per-minute, with the rate stored in the `LearnerModel` and a simple progress chart in the recap/parent view (the rising line is the reward). The director only opens fluency drills for skills already marked *understood* — never as a substitute for the conceptual `explain`. Spaced review schedules the recurring probes.

**Primary example.** Maths, Year 3: a daily 1-minute times-tables sprint (×3, ×4), charting correct-per-minute over a fortnight so the child *sees* themselves getting faster.

**Pitfalls.** Drilling fluency before understanding (rote with no meaning); drilling concepts that shouldn't be timed; timing creating anxiety (keep it a personal-best game, not a threat).

**Related.** [[mastery-learning-bloom]], retrieval/spaced practice (Part 1), [[spacing-of-mastery-checks]]

---

## The spacing of mastery checks

**Family:** Mastery & personalised · **Evidence:** strong — spacing + testing effects (Cepeda et al. 2006; Roediger & Karpicke) applied to *checking* mastery, not just teaching · **Best for:** ensuring mastery *persists*; all cumulative subjects; all ages.

**What it is.** Re-checking previously-"mastered" material at **expanding intervals** over time, rather than testing once and assuming permanence. Mastery decays; spaced re-checks catch the decay and re-strengthen the memory.

**Why it works.** A skill judged "mastered" today can be half-forgotten in three weeks (the forgetting curve). Spacing the re-check both *detects* decay (so you can re-teach) and, because retrieval at the edge of forgetting is the strongest, *re-strengthens* the memory more than massed practice would.

**When to use / when NOT.** For anything that must *stay* learned. The only caution is logistical — it needs a scheduler tracking *when each thing was last checked*, which is precisely what a computer does well.

**How to run it (steps).**
1. When a skill is mastered, schedule a re-check (e.g. +3 days, +1 week, +3 weeks).
2. At each due date, quick retrieval check.
3. Pass → push the next interval out further. Fail → re-teach and reset the interval.

**1:1 AI-tutor adaptation.** This is the **spaced-review engine** (`server/src/memory/`): mastered items carry a "due for review" date; lessons open with a short spaced-retrieval `hook` of items coming due (interleaved with new content). A failed re-check re-enters the topic into the active queue and resets its interval — mastery is treated as *maintained*, not *achieved once*. The two-tier memory is exactly what makes this automatic.

**Primary example.** A child mastered "telling time to the half hour" three weeks ago; today's lesson opens with one quick clock-reading retrieval before the new material — catching any decay early.

**Pitfalls.** "Mastered, done forever" (no re-checks → silent decay); re-checking too soon (massed, low benefit) or only once (no expanding schedule).

**Related.** [[mastery-learning-bloom]], spaced/retrieval practice (Part 1), [[knowledge-tracing-and-prerequisite-mapping]]

---

## Adaptive / personalised learning

**Family:** Mastery & personalised · **Evidence:** mixed-to-promising — intelligent tutoring systems show solid gains (VanLehn 2011: ITS ≈ human tutors on some measures); "personalised learning" *products* vary wildly in quality · **Best for:** matching pace, difficulty, and content to the individual; any age; the AI tutor's core job.

**What it is.** Continuously adjusting *what* and *how* the system teaches based on the individual learner's responses — difficulty, pace, examples, and next topic all adapt in real time. (Beware: "personalised learning" is also a marketing buzzword slapped on weak products — the substance is whether it genuinely adapts on good evidence.)

**Why it works.** Keeping the child in the productive zone — challenged but succeeding (~80%) — maximises both learning and motivation; tailoring examples to interests boosts engagement; responding to errors immediately closes the loop. It's the computational version of an attentive tutor.

**When to use / when NOT.** Always, in principle, for a 1:1 system — but adaptation must be *evidence-based and transparent*, not a black box that mislabels a child. **AVOID** "adaptive" features built on debunked premises (learning-styles matching, dubious "personality" sorting). Adapt on *performance and prior knowledge*, which are real; not on pseudo-traits.

**How to run it (steps).**
1. Continuously assess (every turn).
2. If success is high → raise difficulty / new content; if low → drop difficulty / re-teach.
3. Tailor *examples* (not standards) to interests.
4. Choose the next topic from the prerequisite-respecting frontier.

**1:1 AI-tutor adaptation.** This *is* the director: difficulty banding, the success-rate target, the remedy loop, and interest-tailored hooks (from `LearnerModel.interests`) together constitute adaptive learning. Two principles to keep honest: (1) adapt the *examples and pacing*, never water down the *standard* (mastery stays fixed); (2) adapt on real signals (performance, prerequisites, interests) — never on a "learning style." Transparency: the parent view should show *why* it chose what it chose.

**Primary example.** A child who loves dinosaurs and is breezing through addition: the tutor keeps the standard but raises difficulty (two-digit, then crossing ten) and frames every problem with dinosaurs — adapting difficulty *and* interest, not the goal.

**Pitfalls.** Adapting on pseudo-science (styles/personality — avoid); lowering the *standard* instead of the *step*; opaque adaptation parents can't see; over-adapting so the child never meets desirable difficulty.

**Related.** [[knowledge-tracing-and-prerequisite-mapping]], [[the-assistance-dilemma]], [[zpd-scaffolding-and-fading]]

---

## Knowledge tracing & prerequisite mapping

**Family:** Mastery & personalised · **Evidence:** strong as a technique — Bayesian Knowledge Tracing (Corbett & Anderson 1995) underlies effective ITS; prerequisite graphs improve sequencing · **Best for:** estimating mastery and ordering content; the engine behind adaptation; any age.

**What it is.** **Knowledge tracing** = continuously estimating the probability that a learner has mastered each skill, updated from each response (right/wrong, with allowances for slips and guesses). **Prerequisite mapping** = a graph of which skills must precede which, so the system never teaches B before A is in place.

**Why it works.** A running mastery estimate (not a single test score) is a far better basis for "teach this next" than age or a one-off mark; the prerequisite graph guarantees the child meets ideas in a sequence where each has its foundation — the cumulative-subject imperative made explicit.

**When to use / when NOT.** Foundational to any adaptive system. The caveats: estimates are *probabilistic* (allow for a lucky guess or a careless slip — don't over-react to a single answer); prerequisite graphs must be *correct* (a wrong edge mis-sequences everything).

**How to run it (steps).**
1. Maintain a mastery estimate per skill, updated each response (discounting slips/guesses).
2. Maintain a prerequisite graph.
3. Recommend next = a skill whose prerequisites are mastered and which isn't yet.
4. Re-estimate continuously; let spaced re-checks update stale estimates.

**1:1 AI-tutor adaptation.** The `LearnerModel` mastery map is the knowledge-traced state; each turn's judgement blends into it (not overwriting on one answer — exactly the slip/guess tolerance). Topic `prerequisites` are the prerequisite graph; `buildSyllabus()` and next-lesson recommendation walk it. The tutor should *not* downgrade a skill on a single wrong answer (could be a slip) — it weights the trend, which is what the blending memory already does.

**Primary example.** The map shows "regrouping in subtraction" at 0.4 mastery with its prerequisite "place value" at 0.9 — so the tutor recommends practising regrouping next (prereq met, skill weak), not jumping to long division.

**Pitfalls.** Over-reacting to one answer (slip/guess); an incorrect prerequisite graph; treating a probability as a certainty.

**Related.** [[competency-standards-based-progression]], [[adaptive-personalised-learning]], [[spacing-of-mastery-checks]]

---

## Flipped learning (and the home-ed adaptation)

**Family:** Mastery & personalised · **Evidence:** mixed — modest gains, *very* dependent on whether students do the pre-work and on what class time is then used for (Bishop & Verleger 2013) · **Best for:** freeing 1:1 time for application; older primary (9–11) with support; home-ed.

**What it is.** Flipping the usual order: the *first exposure* to content happens at home (a video/reading), and the *contact time* is spent on application, problem-solving, and getting help — the harder work done *with* the teacher rather than alone.

**Why it works.** First exposure (which can be passive) is offloaded to solo time, reserving the precious interactive time for the parts where a teacher's help matters most — practice, error-correction, discussion. The risk is structural: it collapses entirely if the pre-work isn't done.

**When to use / when NOT.** For older primary children who'll reliably do a short pre-task, to make the live session application-rich. **Don't** flip with young children who can't self-study, and don't flip content that *needs* a teacher for first exposure (most genuinely new, hard ideas). The "did they do the pre-work?" dependency is the killer.

**How to run it (steps).**
1. Provide a short, well-chosen pre-task (a 3-minute video, a read).
2. Check it was engaged with (a quick entry question).
3. Spend the session on application, misconceptions, and extension.

**1:1 AI-tutor adaptation — home-ed twist.** Pure flipping fits awkwardly (the tutor *is* the contact time). The useful adaptation: the tutor can **assign a tiny between-session pre-task** (watch this clip, notice this thing) and **open the next lesson by checking it** (a `hook` retrieval), then go straight to application. Equally, the *parent* can run the first-exposure reading and the tutor does the interactive application. Two-tier memory carries the assignment across sessions. Keep pre-tasks short and *verify* them, or the flip fails.

**Primary example.** Science, Year 5: between sessions, "watch this 2-minute clip on the water cycle and notice the three main steps"; next lesson opens with "what were the three steps?" then dives into applying/explaining them.

**Pitfalls.** Pre-work not done (whole method collapses); flipping content too hard for solo first-exposure; pre-task too long; not checking it happened.

**Related.** [[tutoring-1-1-as-a-method]], active-learning routines (cooperative file), [[mastery-learning-bloom]]

---

## Tutoring / 1:1 as a method

**Family:** Mastery & personalised · **Evidence:** **the strongest single intervention in education** — EEF One-to-one tuition +5 months; Bloom's 2-sigma; tutoring among the highest-effect approaches known · **Best for:** essentially everything; the format Classai embodies.

**What it is.** One teacher, one learner: continuous attention, immediate feedback, perfectly-paced instruction, and a relationship. Not a "technique" so much as the *condition* that makes every other technique work better.

**Why it works.** Everything good in teaching is easier 1:1: you see every response (no hiding), feedback is immediate, pacing fits exactly this child, examples use *their* interests, and the relationship supplies motivation and safety. It's why Bloom's tutored students hit +2 sigma — the conditions are simply optimal.

**When to use / when NOT.** It's the baseline format here. The only "when not" is recognising what 1:1 *lacks*: peers (handle via the cooperative-file adaptations), and the risk of over-helping (see the assistance dilemma). A good tutor deliberately imports peer-like moments and resists rescuing too fast.

**How to run it (steps).**
1. Diagnose where the child is (don't assume).
2. Teach at exactly their level, one step at a time.
3. Check every step; respond immediately.
4. Build the relationship — warmth, interest, encouragement.
5. Fade support toward independence (don't foster dependence).

**1:1 AI-tutor adaptation.** Classai *is* this — the entire architecture is a 1:1 tutor. The design imperatives that follow: (1) exploit the format's strengths fully (constant checking, immediate remedy, interest-tailoring, the avatar relationship); (2) consciously compensate for its weaknesses (no peers → teachable-agent/role-play; over-help → the assistance dilemma below); (3) protect the relationship (the avatar's warmth and the `LearnerModel`'s memory of the child make it feel *known*).

**Primary example.** The whole app: a child who froze on long division gets, in one session, a re-diagnosis, a place-value re-teach with a different model, immediate correction on each step, and a dinosaur-themed problem — none of which a class of 30 affords.

**Pitfalls.** Fostering dependence (the child can only do it *with* the tutor); missing the peer dimension; mistaking presence for the relationship (it has to feel like the child is *known*).

**Related.** [[the-assistance-dilemma]], [[zpd-scaffolding-and-fading]], cooperative methods (whole file)

---

## The assistance dilemma (Koedinger)

**Family:** Mastery & personalised · **Evidence:** strong/foundational — Koedinger & Aleven (2007), "Exploring the assistance dilemma in experiments with cognitive tutors" · **Best for:** every decision about *how much help* to give; the tutor's central judgement call.

**What it is.** The core tension of tutoring: **how much information/assistance to give versus how much to withhold to make the learner generate it themselves.** Too much help → the learner is passive and doesn't build robust knowledge (the "assistance" trap); too little → they flounder and fail (the "withholding" trap). The right amount depends on the learner's current competence and the task.

**Why it works (as a lens).** It names the trade-off behind worked-examples-vs-problem-solving, hints-vs-telling, scaffolding-vs-fading. Giving help reduces load and prevents failure *now*; withholding it forces the generative effort that builds *durable* knowledge. Neither extreme is right — the skill is *titrating*.

**When to use / when NOT.** Always in play. The principle: **give more assistance to novices, withhold more from the competent** (the expertise-reversal effect — what helps a novice can *hinder* an expert). Err toward *more* help for young/anxious learners and *less* as competence grows.

**How to run it (steps).**
1. Estimate current competence on *this* task.
2. Novice/struggling → give worked examples, more hints, smaller steps.
3. Competent → withhold; pose the problem, let them generate, hint only on real impasse.
4. Use *graduated* hints (nudge → bigger nudge → tell) rather than all-or-nothing.
5. Fade help as success rises.

**1:1 AI-tutor adaptation.** The director's `assistanceLevel` *is* this dilemma made into state. Concretely: the remedy loop should give **graduated hints** (a prompt, then a bigger hint, then a worked step, then tell) rather than immediately supplying the answer — so the child generates as much as they can before being told. As mastery rises in the `LearnerModel`, the tutor withholds more (fades worked examples → problems; drops `wordBank` scaffolds). The expertise-reversal warning: keep over-helping a *competent* child, and you stall them — so the tutor must *reduce* support, not just maintain it.

**Primary example.** Maths, Year 4, a child stuck on 34−18: the tutor doesn't say "it's 16." It hints in steps — "what could you do to make 18 friendlier?" → "try taking 20 then giving 2 back" → models it only if still stuck — maximising the child's own generation.

**Pitfalls.** Telling too soon (kills generation, breeds dependence); withholding too long (frustration, failure); all-or-nothing help instead of graduated hints; over-helping the already-competent (expertise reversal).

**Related.** [[zpd-scaffolding-and-fading]], [[productive-failure]] (in `inquiry-and-problem-based.md`), worked examples (Part 1)

---

## Zone of proximal development & scaffolding/fading (Vygotsky / Wood–Bruner–Ross)

**Family:** Mastery & personalised · **Evidence:** strong/foundational — Vygotsky's ZPD; Wood, Bruner & Ross (1976) coined "scaffolding"; underpins EEF metacognition & feedback · **Best for:** pitching the challenge and managing support; every lesson; all ages.

**What it is.** The **ZPD** is the band between what a child can do *alone* and what they can do *with help* — the zone where teaching has leverage. **Scaffolding** is the temporary support that lets a child succeed in that zone; **fading** is the deliberate removal of that support as they become able, transferring control to the child. (Wood, Bruner & Ross identified the functions of scaffolding: recruitment, reducing degrees of freedom, direction maintenance, marking critical features, frustration control, demonstration.)

**Why it works.** Teaching *below* the ZPD is boring and wasteful (they can already do it); *above* it is overwhelming and fails (even help can't bridge it); *within* it, support lets the child achieve — and crucially do — what they couldn't alone, and the achievement, repeated with fading support, becomes independent ability. Fading is the part people forget: scaffolds left up forever create dependence, never independence.

**When to use / when NOT.** Always — it's the master frame for pitching difficulty and managing help. The two failure modes: pitching outside the ZPD (too easy/too hard), and **never fading** (the scaffold becomes a crutch).

**How to run it (steps).**
1. Find the ZPD: what can the child do alone vs with help? (diagnostic/dynamic assessment).
2. Pitch the task into the with-help zone.
3. Scaffold to ensure success (model, prompt, reduce the problem, mark key features, control frustration).
4. **Fade** the scaffold as success grows — fewer prompts, harder steps, scaffolds removed.
5. Confirm independent performance; then move the ZPD up.

**1:1 AI-tutor adaptation.** The ZPD is operationalised by the difficulty band + mastery map: the tutor picks the next lesson at the child's *with-help* frontier (just beyond solo ability). Scaffolds are concrete app features — `wordBank`, `steps` revealing one at a time, `multipleChoice` instead of open recall, hints in the remedy loop, the avatar's prompts. **Fading is a first-class behaviour:** across a lesson and across sessions, the tutor *removes* scaffolds (drop the `wordBank`, switch `multipleChoice`→`shortText`, raise the difficulty band) as the `LearnerModel` shows growing competence. A lesson that never fades has failed its job. The six scaffolding functions map to tutor moves: recruitment=the hook, marking features=think-aloud, frustration control=warmth + smaller steps, demonstration=the worked example.

**Primary example.** English, Year 2, writing a sentence: scaffolded start (`wordBank` of words + a sentence frame "The ___ is ___."), then faded (frame only, no word bank), then independent ("write me a sentence about your day") — the same skill, support withdrawn step by step.

**Pitfalls.** Teaching outside the ZPD (bored or overwhelmed); **never fading** (dependence — the cardinal sin); fading too fast (the child crashes); confusing "help them succeed" with "do it for them."

**Related.** [[the-assistance-dilemma]], [[dynamic-assessment]], scaffolding/worked examples (Part 1), [[mastery-learning-bloom]]

---

## Dynamic assessment

**Family:** Mastery & personalised · **Evidence:** moderate — rooted in Vygotsky/Feuerstein; assesses learning *potential*, not just current state · **Best for:** diagnosing the ZPD and how a child responds to teaching; any age; especially valuable for atypical learners.

**What it is.** Assessment that *interacts* with the learner — a **test–teach–retest** cycle that measures not just what the child can do now, but how much they improve *with help* (their learning potential / ZPD width and their responsiveness to instruction). The opposite of a static one-shot test.

**Why it works.** A static test conflates "doesn't know it" with "could learn it fast" — very different teaching implications. By teaching *during* assessment and watching the response, dynamic assessment reveals the ZPD directly and tells you *what kind* of help unlocks this child — exactly the information a tutor needs to teach well.

**When to use / when NOT.** When you need to know not just *whether* but *how* a child learns a thing — diagnosing a struggle, planning the right scaffold, assessing a child who tests poorly statically. It's slower than a static check, so use it diagnostically, not for routine fluency probes.

**How to run it (steps).**
1. **Test:** pose the task unaided; note where it breaks.
2. **Teach:** offer graduated help and watch *which* help works.
3. **Retest:** pose a similar task; measure the gain and the support still needed.
4. Use the *responsiveness* (how little/much help was needed) to plan instruction.

**1:1 AI-tutor adaptation.** A natural fit for a conversational tutor and a powerful *diagnostic* mode: when a child fails a `check`, the remedy loop *is* a mini test–teach–retest — the tutor offers a hint (teach), re-poses (retest), and records **how much help unlocked it** to the `LearnerModel`. That "responsiveness" signal is richer than pass/fail: a child who got it after one hint is in a very different place from one who needed full modelling, and the tutor sets the next lesson's scaffolding accordingly. Use it to *re-diagnose* a stuck child rather than just re-teaching blindly.

**Primary example.** Maths, Year 3: child fails 7×6. Static test says "doesn't know it." Dynamic: the tutor prompts "you know 7×5 is 35 — what's one more 7?" — child instantly gets 42. That responsiveness reveals the fact is *almost* there (one cue unlocks it), so the tutor schedules light practice, not a full re-teach.

**Pitfalls.** Using it for routine checks (too slow); reading only the final score, ignoring the *amount of help* (the whole point); over-helping during the "teach" so the retest is meaningless.

**Related.** [[zpd-scaffolding-and-fading]], [[the-assistance-dilemma]], [[knowledge-tracing-and-prerequisite-mapping]], formative assessment (Part 3)

---

## How this family wires into Classai (summary)

These methods aren't separate features — they're the same engine seen from different angles:

- **The mastery map (`LearnerModel`)** = competency record + knowledge-traced state. It *gates* progress (mastery learning, PSI, competency progression).
- **Prerequisites** = the prerequisite graph. They *order* content.
- **Difficulty banding + success-rate target** = adaptive learning, pitched at the **ZPD**.
- **The remedy loop** = corrective instruction + graduated hints + dynamic assessment, navigating the **assistance dilemma**.
- **Scaffold features** (`wordBank`, `steps`, `multipleChoice`) **+ deliberate fading** = scaffolding/fading.
- **Spaced review** = the spacing of mastery checks; mastery is *maintained*, not banked.
- **Timed `practice` beats** = precision teaching for fluency.

The one discipline to hold throughout: **adapt the step and the support, never the standard; and always fade.** That is what turns a patient tutor into one that produces *independent* learners — the whole point of Bloom's 2 sigma.

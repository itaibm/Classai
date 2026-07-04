# Metacognition & self-regulation methods

This family is one of the **highest-impact** in the whole library: the EEF rates **"Metacognition and self-regulation" at +7 months' progress** — among the very best interventions, low-cost, and effective across ages and subjects. Metacognition is "thinking about your own thinking": knowing *how* you learn, *which* strategy to use, and *whether* it's working — and adjusting accordingly.

Three things must be true for it to deliver, and all three are easy to get wrong:
1. **It must be taught explicitly, in the context of real subject content** — not as a bolt-on "thinking skills" lesson divorced from maths or reading. Generic metacognition lessons don't transfer.
2. **It needs a knowledge base to operate on** — you can't strategise about a topic you know nothing about. Metacognition *amplifies* knowledge; it doesn't replace it.
3. **It must be modelled, then gradually handed over** — the teacher thinks aloud, then fades, until the child runs the strategies themselves.

A conversational 1:1 tutor is an unusually good vehicle for this: it can *model* its own thinking out loud and *prompt* the child's reflection on every single turn. See also `pedagogy-core.md`, `assessment-and-feedback.md`, and the sibling `motivation-and-engagement.md` (self-regulation and motivation are intertwined).

---

## The EEF 7-step metacognition model

**Family:** Metacognition & self-regulation · **Evidence:** strong — EEF "Metacognition and self-regulated learning" guidance (+7 months); the recommended structure for teaching strategies metacognitively · **Best for:** teaching any strategy/skill so the child can self-regulate it; ages 7–11 especially.

**What it is.** A seven-step cycle for teaching a strategy *metacognitively* (so the child learns not just the strategy but *when and how* to deploy it): **(1) activate prior knowledge → (2) explicit strategy instruction → (3) model it → (4) memorise it → (5) guided practice → (6) independent practice → (7) structured reflection.** The reflection step closes the loop and builds the self-monitoring.

**Why it works.** It combines explicit teaching (the strategy is *told and modelled*, not discovered) with the metacognitive wrapper (when to use it, how to check it's working, reflecting on the result), so the child gains both the skill and the self-regulation to apply it independently.

**When to use / when NOT.** For teaching any non-trivial strategy — a writing-planning method, a problem-solving approach, a reading strategy. Don't skip the modelling (steps 3) or the reflection (step 7) — those are the parts people drop, and they're where the metacognition lives. Needs the underlying knowledge first.

**How to run it (steps).** Follow the seven steps above: connect to what they know, *tell* the strategy, *model* it with a think-aloud, help them *remember* it (a name/mnemonic), *guided* practice, *independent* practice, then *reflect* ("how did that go? when would you use it again?").

**1:1 AI-tutor adaptation.** Maps cleanly onto the beats with reflection added: activate=**hook**, instruct+model=**explain** (a think-aloud — the tutor's superpower), memorise=a `keyTerm`/mnemonic, guided=**example**, independent=**practice**, and **reflect=a metacognitive recap** ("which step helped most? when would you use this again?", `shortText`/`speak`). The reflection feeds the `LearnerModel` as a strategy the child can now use, so the tutor can later *prompt* rather than re-teach it.

**Primary example.** English, Year 4, planning a story: tutor names and models a "Beginning–Middle–End + one problem" planning strategy with a think-aloud, the child names it, practises it guided then alone, and reflects: "Did planning first make writing easier? When else could you plan like this?"

**Pitfalls.** Teaching metacognition generically (no subject content → no transfer); dropping the modelling or the reflection; assuming a strategy taught once is now self-regulated (it needs the cycle).

**Related.** [[think-alouds-for-strategy]], [[strategy-instruction]], [[self-assessment-and-reflection]]

---

## Planning–monitoring–evaluating (the metacognitive cycle)

**Family:** Metacognition & self-regulation · **Evidence:** strong — the core self-regulated-learning cycle (Zimmerman; Schraw) underpinning the +7mo finding · **Best for:** any task with steps — writing, multi-step problems, projects; ages 7–11.

**What it is.** The three-phase cycle good learners run, mostly unconsciously: **plan** (before — what's the goal, what strategy, what do I know?), **monitor** (during — is this working? am I on track?), **evaluate** (after — did it work? what would I change?). Teaching makes these explicit and habitual.

**Why it works.** Novices dive straight into *doing* with no plan, don't notice when they've gone wrong, and don't review — wasting effort and repeating errors. Making plan/monitor/evaluate explicit gives the child control over their own learning: they catch errors mid-task and improve their approach next time.

**When to use / when NOT.** For any non-trivial, multi-step task. Less relevant for instant recall (no planning needed for 2+2). The phases must attach to *real* tasks, not be practised in the abstract.

**How to run it (steps).**
1. **Plan** aloud before starting: "What am I trying to do? What's my plan? What do I already know?"
2. **Monitor** during: pause to ask "Is this working? Am I stuck? Should I switch?"
3. **Evaluate** after: "Did it work? What helped? What would I do differently?"
4. Model all three, then prompt the child to run them.

**1:1 AI-tutor adaptation.** The tutor scaffolds the cycle around `practice` beats: a **planning prompt** before the child starts ("What's your plan for this one?"), a **monitoring prompt** if the struggle streak rises ("Is your plan working, or should you try another way?" — note this is part of the remedy loop, prompting self-correction *before* the tutor takes over), and an **evaluating prompt** in the recap. Over time the tutor fades from *prompting* the cycle to merely *expecting* it, recording in memory that the child plans/monitors independently.

**Primary example.** Maths, Year 5, a word problem: Plan ("What's it asking? What's my first step?"), Monitor ("Does this answer make sense so far?"), Evaluate ("Is £450 sensible for one pencil? No — let me recheck the units").

**Pitfalls.** Abstract practice with no real task; only ever planning (skipping monitor/evaluate); the tutor monitoring *for* the child instead of prompting the child to.

**Related.** [[self-questioning]], [[goal-setting-as-a-method]], [[error-reflection]]

---

## Self-questioning

**Family:** Metacognition & self-regulation · **Evidence:** strong — self-generated questions improve comprehension and monitoring (EEF reading; self-explanation effect, Chi) · **Best for:** reading comprehension, problem-solving, self-checking; ages 7–11.

**What it is.** Teaching the child to ask *themselves* the questions a teacher would ask: "Do I understand this? What does this word mean? What's the main idea? How does this connect to what I know? How do I know my answer is right?" — internalising the monitoring.

**Why it works.** Self-questioning forces active monitoring and self-explanation (which deepens understanding), and catches comprehension breakdowns the child would otherwise sail past. It's the internalisation of the teacher's questions — the end-state of reciprocal teaching.

**When to use / when NOT.** For comprehension and self-checking once the child has questions to ask (they must be taught the question stems first). Don't assume children generate good self-questions unprompted — model the stems explicitly.

**How to run it (steps).**
1. Provide question stems ("What's the main idea? Does this make sense? How do I know?").
2. Model using them aloud on real content.
3. Have the child apply them to their own reading/work.
4. Fade the provided stems as they internalise them.

**1:1 AI-tutor adaptation.** The tutor teaches a small set of self-check questions and then *expects* them: after an answer it asks "How did you know that's right?" until the child starts asking it themselves; for reading it prompts "What did you not understand in that bit?" The flagship habit is **"How do you know?"** (its own entry below). Stems can live as a `keyTerm`/reference the child reuses; the `LearnerModel` notes when self-questioning becomes spontaneous.

**Primary example.** English, Year 4, reading: the child learns to pause and self-ask "Do I get what just happened? No — let me reread that sentence," catching their own confusion.

**Pitfalls.** Self-questions never taught (children don't invent them); stems that stay forever (no internalisation); questions too generic to bite.

**Related.** [[how-do-you-know-habits]], reciprocal teaching (cooperative file), [[self-assessment-and-reflection]]

---

## Think-alouds for strategy

**Family:** Metacognition & self-regulation · **Evidence:** strong — modelling expert thinking makes invisible strategy visible (Rosenshine; self-explanation) · **Best for:** revealing *how* to think through a problem; every subject; all ages.

**What it is.** The teacher narrates their *own* thinking — including false starts, choices, and self-corrections — so the child sees the normally-invisible process of an expert working through a task. Specifically used to model the *metacognitive* moves (deciding a strategy, noticing a dead-end, switching).

**Why it works.** Children see *answers* but not the *thinking* that produced them, so they imagine experts just "know it" and feel inadequate when they have to struggle. A think-aloud that includes hesitation and self-correction normalises struggle *and* shows the actual strategy — making the metacognitive process learnable.

**When to use / when NOT.** Whenever introducing a strategy or a way of approaching problems (explain/example beats). The key (and the common miss): think aloud the *decisions and the monitoring* ("hmm, that's not working, let me try…"), not just a clean answer.

**How to run it (steps).**
1. Pick a task and solve it *out loud*, voicing every decision.
2. Deliberately include a wrong turn and a self-correction ("oh wait, that's not right because…").
3. Name the strategy you're using as you use it.
4. Then have the child think aloud on a similar task.

**1:1 AI-tutor adaptation.** Think-alouds are the **explain** beat's native form, and the tutor should make them *metacognitive*: not just "the answer is 16" but "I'll make 18 friendlier first — that's my strategy — let me check… yes." Crucially the avatar can model **getting briefly stuck and recovering**, normalising struggle (motivation benefit too). The tutor then invites the child to think aloud (`speak`/`shortText`), capturing their strategy use for `answerEval` and the `LearnerModel`.

**Primary example.** Maths, Year 3, 23+19: "Nineteen is nearly twenty… I'll add 20 instead — that's easier — 23 and 20 is 43… but I added one too many, so I take one off: 42. I changed the problem to make it simpler; that's my trick."

**Pitfalls.** Narrating only the clean answer (hides the strategy); never having the child think aloud back; making it so polished it implies experts never struggle.

**Related.** [[the-eef-7-step-metacognition-model]], [[strategy-instruction]], worked examples (Part 1)

---

## Goal setting (as a method)

**Family:** Metacognition & self-regulation · **Evidence:** strong — specific, proximal goals raise performance and self-efficacy (Locke & Latham; Bandura/Schunk) · **Best for:** focus, motivation, self-regulation; ages 6–11 (with proximal, concrete goals).

**What it is.** Setting **specific, achievable, near-term** learning goals with the child, so they have a clear target and can monitor progress toward it. Distinct from vague aspiration ("get better at maths") — effective goals are concrete and proximal ("get all the ×4 facts in a minute by Friday").

**Why it works.** A specific goal directs attention and effort and makes progress visible (each step toward it is reinforcing); proximal goals give frequent success that builds self-efficacy (Bandura) — the belief "I can do this," which itself drives effort. Distal-only goals ("be a great reader") are too far to motivate or monitor.

**When to use / when NOT.** For building focus, ownership, and self-efficacy. Keep goals **proximal and specific** for young children (a far-off goal is meaningless to a 6-year-old). **Caution:** over-emphasising *performance* goals ("score 10/10") can raise anxiety and ability-focus — favour *mastery/learning* goals ("learn to use a number line") and *process* goals ("plan before writing"). (See goal orientation in `motivation-and-engagement.md`.)

**How to run it (steps).**
1. Co-set a specific, near-term, achievable goal.
2. Make progress visible (a chart, a tally).
3. Review against the goal; celebrate hitting it.
4. Set the next one — keep them proximal.

**1:1 AI-tutor adaptation.** The tutor co-sets a tiny goal at a session's start ("today, let's nail telling time to the quarter hour") and reviews it in the recap, with progress visible in a chart and the goal stored in the `LearnerModel` across sessions. It favours **learning/process goals** over score-chasing to protect motivation and reduce anxiety. The avatar frames goals warmly and proximally.

**Primary example.** Maths: "Your goal today: read three clocks correctly on your own. Let's see if we get there." — checked off visibly at the end, then a new small goal next time.

**Pitfalls.** Goals too distant/vague to motivate; performance-goal pressure raising anxiety; setting goals and never reviewing them.

**Related.** [[planning-monitoring-evaluating]], goal orientation & self-efficacy (motivation file), [[self-assessment-and-reflection]]

---

## Self-assessment & reflection

**Family:** Metacognition & self-regulation · **Evidence:** strong — self-assessment against criteria improves learning and self-regulation (EEF feedback/metacognition; Black & Wiliam) · **Best for:** building self-monitoring and ownership; all subjects; ages 7–11.

**What it is.** The child judges *their own* work or understanding against clear criteria, and reflects on it — what they did well, what to improve, how confident they are. The internalisation of assessment.

**Why it works.** To self-assess, the child must hold the success criteria in mind — which clarifies what "good" *is* and transfers to their future work; reflection turns each task into a learning event ("what did I learn about how I work?"), building the self-regulation that drives the +7mo effect.

**When to use / when NOT.** After tasks, and as a habit. **Requires clear, child-friendly criteria** — self-assessment without criteria is just "I think it's good." Young children need very concrete checklists. Watch for mis-calibration (see confidence calibration below) — children often over-rate early work; that's information, not a problem.

**How to run it (steps).**
1. Establish clear, child-friendly success criteria *before* the task.
2. After, the child rates their work against each criterion.
3. They identify one strength and one next step.
4. Compare with the teacher's view; discuss any gap (calibration).

**1:1 AI-tutor adaptation.** The tutor surfaces the success criteria up front (a `keyTerm`/checklist), and in the recap asks the child to **self-rate against them** ("Did your sentence have a capital? a full stop? an interesting word?") via `multiSelect`/`shortText`, then gently compares with its own judgement to build calibration. Self-rated reflections go to the `LearnerModel`, and persistent over-/under-rating is itself a signal the tutor acts on.

**Primary example.** English, Year 3: against a 3-point checklist (capital, full stop, "wow word"), the child marks their own sentence, then the tutor confirms or gently corrects — teaching them to see what good writing has.

**Pitfalls.** No criteria ("I think it's great"); the tutor over-riding rather than discussing the self-assessment; ignoring mis-calibration instead of using it.

**Related.** [[exit-tickets-learning-logs]], [[calibration-of-confidence]], peer/self-assessment (cooperative file), [[error-reflection]]

---

## Exit tickets & learning logs

**Family:** Metacognition & self-regulation · **Evidence:** moderate-strong — quick reflective retrieval consolidates and informs teaching (combines exit-check + reflection) · **Best for:** end-of-lesson consolidation + planning the next; all ages.

**What it is.** **Exit tickets** = a quick question or reflection at a lesson's end ("one thing I learned / one thing I'm unsure about"). **Learning logs** = an ongoing record where the child notes what they learned, found hard, or want to revisit — a running reflective trace.

**Why it works.** They force a final retrieval + reflection (consolidation), give the teacher evidence of where the child is (informing the next lesson), and the log builds a sense of progress and self-knowledge over time ("look how far I've come").

**When to use / when NOT.** Exit tickets at most lesson ends; learning logs as an ongoing habit. Keep them *short* — a one-line reflection, not a chore. For young children, make it spoken/pictorial, not written labour.

**How to run it (steps).**
1. End the lesson with one reflective question ("What's one thing you learned? One thing still fuzzy?").
2. Record it.
3. Use it to plan the next lesson (revisit the fuzzy thing).
4. Periodically review the log together — see the progress.

**1:1 AI-tutor adaptation.** The **recap beat is the exit ticket**: a quick "one thing you learned today, one thing still tricky?" (`shortText`/`speak`), with the "still tricky" item logged to the `LearnerModel` and surfaced in the next session's hook (closing the loop). The accumulating reflections *are* a learning log; the parent progress view can show the child their own journey — a strong motivator.

**Primary example.** Any lesson's close: "Tell me one thing you can now do that you couldn't this morning… and one thing you'd like to practise again." The second answer schedules itself for next time.

**Pitfalls.** A long, chore-like reflection (resented, skipped); collecting exit tickets but never acting on them; written logs that exceed a young child's stamina.

**Related.** [[self-assessment-and-reflection]], spaced review (mastery file), retrieval practice (Part 1)

---

## Strategy instruction

**Family:** Metacognition & self-regulation · **Evidence:** strong — explicitly teaching task strategies improves outcomes, especially in reading and writing (EEF; SRSD for writing, Graham & Harris) · **Best for:** writing, reading comprehension, problem-solving; ages 7–11.

**What it is.** Explicitly teaching *named* strategies for a task — a planning method for writing, a comprehension strategy for reading, a heuristic for problem-solving — rather than hoping children infer them. Often paired with the metacognitive wrapper (when to use each).

**Why it works.** Skilled performers use strategies that novices lack; *telling and modelling* those strategies (rather than leaving children to discover them) directly transfers expert practice. Named strategies are memorable and cueable ("use your RUCSAC for word problems").

**When to use / when NOT.** For complex tasks with identifiable expert strategies (writing, comprehension, multi-step maths). Teach **one strategy well** at a time; a flood of acronyms with no depth is the failure mode. The strategy must be *modelled and practised*, not just named.

**How to run it (steps).**
1. Name and explain the strategy.
2. Model it with a think-aloud.
3. Practise it guided, then independently.
4. Discuss *when* to use it (the metacognitive part).
5. Prompt it, then fade to expecting it.

**1:1 AI-tutor adaptation.** The tutor teaches a small, durable strategy per topic (a writing-planning frame, a word-problem heuristic), modelled in **explain**, practised in **example/practice**, named as a `keyTerm` for reuse, and stored in the `LearnerModel` so later lessons can *cue* it ("remember your planning frame?") rather than re-teach. It teaches *when* to use it, not just how — and avoids drowning the child in acronyms.

**Primary example.** Maths, Year 4, word problems: teach one heuristic — "Read it, picture it, what's the question, choose the operation, check it's sensible" — modelled and reused across many problems.

**Pitfalls.** Acronym overload (many strategies, none mastered); naming without modelling; never teaching *when* to apply it (so it doesn't transfer).

**Related.** [[think-alouds-for-strategy]], [[the-eef-7-step-metacognition-model]], [[study-skills-instruction]]

---

## Error reflection

**Family:** Metacognition & self-regulation · **Evidence:** strong — analysing errors deepens learning and reduces repetition (links to feedback +6mo, retrieval, productive failure) · **Best for:** turning mistakes into learning; maths, spelling, reasoning; ages 7–11.

**What it is.** Deliberately examining a mistake — *why* it happened, what the misconception was, how to avoid it — rather than just marking it wrong and moving on. The error becomes the lesson.

**Why it works.** A wrong answer usually reflects a *reason* (a misconception, a slip, a wrong strategy); surfacing that reason fixes the cause, not just the instance, and prevents repetition. Reflecting on errors also reframes mistakes as informative rather than shameful (motivation/mindset benefit), encouraging risk-taking.

**When to use / when NOT.** After errors, especially recurring ones. Keep the tone safe and curious ("interesting — let's see what happened"), never punitive. Don't over-dwell on every slip (a careless slip needs a light touch; a misconception needs real reflection).

**How to run it (steps).**
1. Treat the error as interesting, not bad.
2. Ask the child to explain their thinking ("how did you get that?").
3. Pinpoint *where* and *why* it went wrong (misconception vs slip).
4. Re-teach/correct the cause.
5. Note it so you can watch for it again.

**1:1 AI-tutor adaptation.** This is the **wrong-answer→remedy loop made metacognitive.** Because every `check` carries pre-authored `wrongAnswers` with a `why` and `remedy`, the tutor can *name the likely misconception* and reflect on it with the child rather than just correcting: "Ah — I think you added the bottoms of the fractions too. Let's see why that doesn't work." The misconception is logged to the `LearnerModel.misconceptions` so spaced review can re-check it. The tutor keeps the tone safe (mistakes = information), distinguishing a slip from a real misconception (don't over-react to a slip — see knowledge tracing).

**Primary example.** Maths, Year 5: child writes 1/2 + 1/4 = 2/6. Tutor: "Let's see your thinking… you added 1+1 and 2+4. That makes sense as a guess! But fourths and halves are different-sized pieces — here's why we need the same-sized pieces first."

**Pitfalls.** Marking wrong and moving on (cause unaddressed → repeats); a punitive tone (shame shuts down learning); treating slips like deep misconceptions.

**Related.** [[self-assessment-and-reflection]], misconceptions (subject files), [[productive-failure]] (inquiry file), feedback (Part 3)

---

## "How do you know?" habits

**Family:** Metacognition & self-regulation · **Evidence:** strong (as a routine) — demanding justification builds reasoning, monitoring, and catches guessing (EEF metacognition; dialogic teaching) · **Best for:** every subject, every answer; all ages; the tutor's signature habit.

**What it is.** A relentless, gentle habit of asking the child to **justify every answer — right *or* wrong** — "How do you know? How did you work that out? What makes you sure?" so reasoning is always made explicit.

**Why it works.** Asking "how do you know" *only after wrong answers* teaches children that the question signals an error — so they learn to second-guess correct answers. Asking it *always* (a) makes a right answer's reasoning explicit (consolidating it and exposing lucky guesses), (b) builds the habit of self-justification (metacognition), and (c) keeps the tone neutral (it's not an accusation). It's the cheapest, highest-frequency metacognitive move there is.

**When to use / when NOT.** Constantly — after essentially every substantive answer. The discipline is asking it after **correct** answers too, not just wrong ones. Don't let it become an interrogation; keep it warm and curious.

**How to run it (steps).**
1. After an answer (right or wrong), ask "How did you get that?"
2. Listen to the reasoning, not just the answer.
3. If reasoning is sound → affirm the *process*. If a lucky guess → teach the reasoning. If wrong → reflect on the error.
4. Make it a predictable, safe habit.

**1:1 AI-tutor adaptation.** A **default tutor behaviour after every `check`/`practice`**: capture the answer in a block, then ask for the *reasoning* (`shortText`/`speak`→`answerEval`). Because it's asked after correct answers too, a right-but-lucky-guess is caught (low mastery despite a correct tick → the knowledge-traced map shouldn't over-credit it). It's the front door of the Socratic/self-questioning habits and the error-reflection loop, and it keeps the relationship warm because the question is constant, not a "gotcha."

**Primary example.** Maths: child answers "8" to 5+3 correctly — tutor still asks "How did you work it out?" → "I counted on from 5" (good) or "I just guessed" (now the tutor teaches counting-on). Same question, no implication of error.

**Pitfalls.** Asking it *only* after wrong answers (children learn it means "you're wrong"); accepting answers with no reasoning (guessing slips through); over-doing it into an interrogation.

**Related.** [[self-questioning]], [[error-reflection]], Socratic questioning (inquiry file), [[calibration-of-confidence]]

---

## Calibration of confidence

**Family:** Metacognition & self-regulation · **Evidence:** moderate-strong — accurate confidence (calibration) improves study decisions; over-confidence harms learning (Dunlosky & Rawson; metamemory research) · **Best for:** building accurate self-knowledge; ages 8–11; older children especially.

**What it is.** Teaching the child to judge **how confident they are** in an answer and then check that confidence against reality — closing the gap between *feeling* they know and *actually* knowing. Poorly-calibrated learners (sure when wrong, unsure when right) make bad study choices.

**Why it works.** Learners decide what to study based on what they *think* they know — so if that judgement is wrong (the fluency illusion: re-reading feels like knowing), they stop studying things they haven't mastered. Practising "rate your confidence, then find out" recalibrates these judgements, making self-regulated study actually effective. Retrieval practice (failing and seeing the answer) is the great calibrator.

**When to use / when NOT.** For older primary children building study independence. Keep it light and game-like for this age (a thumbs scale, not statistics). The point is the *gap-closing feedback*, so always reveal the truth right after the confidence rating.

**How to run it (steps).**
1. Before revealing the answer, ask "How sure are you? (sure / not sure / guessing)".
2. Reveal the truth immediately.
3. Note mismatches ("you were sure but it was tricky — interesting").
4. Over time, the child's confidence tracks reality better.

**1:1 AI-tutor adaptation.** The tutor can attach a quick **confidence rating** to a `check` ("How sure — sure, think-so, or guessing?") *before* feedback, then reveal — surfacing over-confidence (sure-but-wrong → a flag to slow down and re-teach, not just correct) and under-confidence (unsure-but-right → praise to build self-efficacy). The calibration trend goes to the `LearnerModel`; a chronically over-confident child gets more "how do you know?" and more spaced re-checks. This also fuels honest study decisions later.

**Primary example.** Maths, Year 6: child is "totally sure" 7×8 is 54, then sees it's 56 — the surprise is memorable and recalibrates ("I need to actually check the ones I feel sure about").

**Pitfalls.** Making it heavy/statistical for young children; rating confidence but not revealing the truth (no calibration); shaming over-confidence instead of using it.

**Related.** [["how-do-you-know"-habits]], [[self-assessment-and-reflection]], retrieval practice (Part 1)

---

## Study-skills instruction

**Family:** Metacognition & self-regulation · **Evidence:** mixed — effective when *specific, evidence-based strategies* are taught in context; weak when generic "study skills" courses are bolted on · **Best for:** older primary building independent learning; ages 9–11.

**What it is.** Explicitly teaching *how to learn* — which study strategies actually work (retrieval practice, spacing, self-testing, elaboration) and which feel good but don't (re-reading, highlighting, cramming) — so children can eventually direct their own learning.

**Why it works.** Children (and adults) gravitate to *ineffective* strategies that *feel* productive — re-reading and highlighting create a fluency illusion while building little durable memory (Dunlosky et al. 2013). Teaching the *effective* strategies and *why* they work lets children study smart, not just hard, and is the foundation of lifelong independent learning.

**When to use / when NOT — and the fads to flag.** For older primary children gaining study independence. Teach it **embedded in real content**, not as a generic standalone course (the bolt-on version doesn't transfer — that's why "study skills" has mixed evidence). **Flag the debunked/low-value strategies as AVOID:** re-reading and highlighting as primary study methods (fluency illusion), cramming (vs spacing), and — again — **"learning styles" matching** (no evidence; don't teach children to study "in their style"). Teach instead: self-testing, spacing, explaining-it.

**How to run it (steps).**
1. Within a real topic, show an *effective* strategy (e.g. self-quizzing) and *why* it beats re-reading.
2. Have the child experience the difference (test yourself vs re-read, then check recall).
3. Name the high-value strategies: retrieve, space, explain, self-test.
4. Explicitly debunk the low-value ones (highlighting/re-reading/cramming/"styles").

**1:1 AI-tutor adaptation.** The tutor *enacts* good study strategy (it's built on retrieval + spacing) and, for older children, can **make the strategy explicit**: "We test you instead of re-reading because trying to remember is what makes it stick." It can coach a child preparing for something to self-quiz and space, not cram, and it never endorses "learning styles" or highlighting-as-studying. The `LearnerModel` can note the child's growing study independence.

**Primary example.** Year 6 preparing for a spelling check: the tutor coaches "cover the word and try to write it from memory (self-test), do a few each day this week (spacing)" — not "read the list ten times tonight."

**Pitfalls.** Generic bolt-on study-skills lessons (don't transfer); teaching/condoning re-reading, highlighting, cramming, or "learning styles" (low/no value — avoid); strategy talk with no experience of the difference.

**Related.** [[strategy-instruction]], retrieval & spacing (Part 1), [[calibration-of-confidence]], [[error-reflection]]

---

## Why this family matters most for the app

A 1:1 conversational tutor is almost ideally shaped to deliver the +7-month metacognition effect, because the two hard parts of teaching metacognition are *exactly* what it does naturally:

- **Modelling thinking** — the tutor's **explain** beat is a think-aloud by default; the avatar can show getting-stuck-and-recovering, which a textbook can't.
- **Prompting reflection on every turn** — "How do you know?", confidence ratings, plan/monitor/evaluate prompts, and the reflective recap fire on *every* lesson, building the habits relentlessly and safely.

The disciplines to hold: **teach it inside real subject content** (never as generic "thinking skills"), **model then fade** (from prompting the strategy to expecting it), and **keep the tone safe** (errors and uncertainty are information, never failures). Do that, and the tutor doesn't just teach content — it builds a child who can teach themselves, which is the whole long-term game.

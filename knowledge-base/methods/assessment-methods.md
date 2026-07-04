# Assessment & feedback methods

A catalogue of **assessment and feedback methods** — ways to gather evidence of learning and act on it. This complements `teaching/assessment-and-feedback.md` (which explains the diagnostic *engine* of a Classai lesson) by laying out the individual methods as a browsable, retrievable list.

The throughline (after Dylan Wiliam): **assessment is only formative if it changes what happens next.** In 1:1 tutoring there is no grade to chase — every check exists to *adapt the next move*. A check that doesn't change anything was a wasted turn. Most methods below were invented for a classroom of 30; for each, the **1:1 AI-tutor adaptation** line gives the home/solo equivalent and ties it to the app's beats (hook→explain→example→check→practice→recap), its block tool-belt (`multipleChoice`, `numberEntry`, `shortText`, `trueFalse`, `sort`, `match`, `whiteboard`…), the wrong-answer→remedy loop (`BeatCheck.wrongAnswers`), and its two-tier memory (`WorkingMemory` + `LearnerModel`).

---

## Formative assessment (assessment FOR learning)

**Family:** Assessment & feedback · **Evidence:** strong — (EEF "Feedback" +6mo; Black & Wiliam 1998 *Inside the Black Box*; Wiliam 2011) · **Best for:** all ages, all subjects, *during* learning.

**What it is.** Any evidence-gathering whose purpose is to inform the *next teaching step* (and the learner's next move), not to award a mark. Includes questioning, checks, observation, self-assessment — anything that reveals where the learner is so you can close the gap.

**Why it works.** It makes teaching *responsive*: you teach the child in front of you, not the lesson plan. The feedback loop is short, so misconceptions are caught before they harden, and effort is spent where it's needed.

**When to use / when NOT.** Use continuously, woven into teaching. NOT as a hidden grade — the moment a "formative" check is logged as a score the child performs *for the mark* and stops revealing genuine confusion. Don't formatively assess what you won't act on.

**How to run it (steps).**
1. Decide the *learning intention* for this segment.
2. Pose a check whose answer reveals understanding (see [[hinge-questions]]).
3. Interpret the response — right/wrong *and why*.
4. Act: advance, hint, reteach, or backfill a prerequisite.
5. Loop.

**1:1 AI-tutor adaptation.** This *is* the Classai director's core loop. Every `check`/`practice` beat is formative: the LLM judges the answer into a structured `TeacherTurn`, the director updates `WorkingMemory` (checks passed, struggle streak) and chooses the next DIRECTIVE (continue / check now / stuck / wrap). Nothing is "graded"; everything adapts.

**Primary example.** Year 2, telling time to the half hour: instead of marking a worksheet, the tutor shows a clock and asks "what time is this?" — a wrong "3:06" vs "3:30" instantly tells the tutor whether the child is reading the hour or muddling minutes, and it adapts on the spot.

**Pitfalls.** Collecting evidence then ignoring it; turning every check into a stealth test; over-checking so the child never gets a flowing run of practice.

**Related.** [[summative-assessment]], [[hinge-questions]], [[exit-tickets]], [[feedback-that-moves-learning-forward]], [[wrong-answer-misconception-remedy-loop]].

---

## Summative assessment (assessment OF learning)

**Family:** Assessment & feedback · **Evidence:** strong (as measurement) / mixed (as a learning tool) — (standard psychometrics; over-testing harms motivation, EEF) · **Best for:** end-of-unit or end-of-term checkpoints, ages 7–11.

**What it is.** Assessment that *sums up* attainment at a point in time — an end-of-topic quiz, a half-term review, a "can you now do all of this?" check. Its job is to certify/record, not to steer the next five minutes.

**Why it works.** Gives a defensible snapshot of mastery for reporting and for deciding whether a whole unit is secure before moving on. The *act* of summative retrieval is also itself good for memory (see [[low-stakes-quizzing-as-assessment]]).

**When to use / when NOT.** Use sparingly, at genuine milestones. NOT as the main diet — frequent high-stakes testing of young children raises anxiety and narrows learning. For ages 5–7 keep it light and playful or skip formal summatives entirely.

**How to run it (steps).**
1. Define what "secure on this unit" means (the success criteria).
2. Sample across the unit's skills, including a transfer item.
3. Administer low-pressure; frame it as "showing what you've got."
4. Record the result against the learner model; decide unit complete vs revisit.

**1:1 AI-tutor adaptation.** Classai's summative is the **end-of-lesson recap + a milestone "review" lesson** that samples the topic broadly. Results feed the `LearnerModel` mastery map and the progress rollup / report — *not* a leaderboard. Keep it framed as a friendly "let's see everything you can do now."

**Primary example.** After a 5-lesson place-value unit (Year 3), a short mixed review: partition 426, say which is bigger 318/381, add 10 to 295. The spread of results decides whether to start the next unit or revisit hundreds.

**Pitfalls.** Over-testing young children; treating one summative as the whole truth (confirm with reasoning, [[mastery-vs-guessing-check]]); letting the mark, not the learning, drive the next unit.

**Related.** [[formative-assessment]], [[low-stakes-quizzing-as-assessment]], [[portfolios]], [[rubrics-and-success-criteria]].

---

## Diagnostic / pre-assessment

**Family:** Assessment & feedback · **Evidence:** moderate–strong — (activating prior knowledge, EEF; readiness, Tomlinson) · **Best for:** the start of any topic; identifying gaps and misconceptions *before* teaching, all ages.

**What it is.** A short check *before* (or at the very start of) teaching, to find out what the learner already knows, what prerequisites are in place, and what misconceptions they arrive with — so the lesson starts in the right place.

**Why it works.** Teaching pitched above a missing prerequisite is futile; teaching what's already mastered is wasted time. Diagnosing first lets you pitch into the learner's "zone" and pre-empt known misconceptions.

**When to use / when NOT.** Use at the launch of a new topic, and whenever a child stumbles unexpectedly (diagnose the gap). NOT as a long formal test that demoralises before learning begins — keep it to a few revealing items.

**How to run it (steps).**
1. List the topic's prerequisites and its 2–3 classic misconceptions.
2. Pose one item per prerequisite + one "misconception-bait" item.
3. Read the result: secure → proceed; gap → backfill first; misconception → plan to confront it.

**1:1 AI-tutor adaptation.** Maps onto the **hook beat** doing double duty and onto `LessonAnalysis.priorKnowledge` + `misconceptions`. The tutor opens with a quick retrieval of prerequisites (also spaced review, [[low-stakes-quizzing-as-assessment]]); if `LearnerModel` already flags a gap, it backfills before the new content. A wrong diagnostic answer routes straight into the relevant `wrongAnswers` remedy.

**Primary example.** Before teaching column subtraction with exchange (Year 3), the tutor checks: "What's 13 − 7?" and "In 42, what does the 4 mean?" A wobble on place value means *that* is taught first, not borrowing.

**Pitfalls.** Skipping it and teaching blind; making it long/scary; diagnosing then ignoring the result.

**Related.** [[formative-assessment]], [[error-analysis]], [[wrong-answer-misconception-remedy-loop]], [[hinge-questions]].

---

## Exit tickets

**Family:** Assessment & feedback · **Evidence:** moderate — (widely-used formative routine; Marzano; Leahy/Wiliam) · **Best for:** the close of a lesson, ages 6–11.

**What it is.** One quick question answered at the *end* of a lesson that tells you whether the day's core idea landed — your evidence to plan tomorrow.

**Why it works.** Forces a final act of retrieval (good for memory) and gives a clean, single signal of "did the main thing stick?" that's easy to act on.

**When to use / when NOT.** Use to close most lessons. NOT to cram in everything taught — pick the *one* core idea. NOT if the lesson already ended on a strong, explained success (you have your evidence).

**How to run it (steps).**
1. Identify the single most important thing from the lesson.
2. Pose one short item targeting it.
3. Read the answer; record secure / shaky / not-yet.
4. Use it to decide tomorrow's opening (revisit or advance).

**1:1 AI-tutor adaptation.** This is the **recap beat** + the `memoryUpdates`/`needsWork` written at session end. The tutor poses one targeted retrieval, judges it, and writes the result to the `LearnerModel` so the *next* lesson's hook can re-check a shaky item via spaced review. A "not-yet" exit ticket schedules a near-term revisit.

**Primary example.** End of a Year 4 fractions lesson: "Quick one before we finish — what's ¾ + ¼? Tell me how you know." A confident "1 whole, because the quarters complete the four" closes the loop; a "8/8" flags a misconception to revisit.

**Pitfalls.** Overloading the ticket; not acting on it; making it feel like a test the child can "fail."

**Related.** [[exit-tickets]] pairs with [[low-stakes-quizzing-as-assessment]], [[traffic-lighting-and-confidence-rating]], [[formative-assessment]].

---

## Hinge questions

**Family:** Assessment & feedback · **Evidence:** strong — (Wiliam 2011; Dylan Wiliam's "hinge-point question") · **Best for:** the pivot moment of a lesson — "do I move on or reteach?", ages 7–11.

**What it is.** A single, carefully designed diagnostic question placed at a *hinge* in the lesson, whose answer cleanly decides whether to proceed. Crucially, the *wrong* answers are diagnostic — each distractor maps to a specific misconception, so a wrong choice tells you *which* confusion the child holds.

**Why it works.** Concentrates assessment at the decision point and makes wrong answers *informative*. You learn not just *that* the child is stuck but *why*, which tells you exactly how to respond.

**When to use / when NOT.** Use at the explain→practice transition, before building on a concept. NOT for open creative tasks. The question must be answerable in seconds and impossible to get right *for the wrong reason*.

**How to run it (steps).**
1. Find the lesson's pivotal concept.
2. Write a question with one correct answer and distractors each tied to a named misconception.
3. Ensure a child *can't* get it right via faulty reasoning.
4. Pose it; let the *choice* route your next move.

**1:1 AI-tutor adaptation.** A hinge question is the gold-standard `multipleChoice` `check` beat: its `wrongAnswers` array *is* the hinge design — each `{answer, why, remedy}` is a diagnostic distractor with its fix pre-loaded. When the child picks a distractor, the director fires that `remedy` as a guiding hint, never the bare answer.

**Primary example.** Equal parts (Year 1): a circle in 4 *equal* parts shaded vs a distractor circle in 4 *unequal* parts. A child holding "any four parts = quarters" picks the unequal one — and now the tutor *knows* to confront that exact rule.

**Pitfalls.** Distractors nobody would pick (reveal nothing); a question gettable by guessing; testing two ideas at once so a wrong answer is ambiguous.

**Related.** [[wrong-answer-misconception-remedy-loop]], [[error-analysis]], [[diagnostic-pre-assessment]], [[formative-assessment]].

---

## Mini-whiteboards (and the 1:1 equivalent)

**Family:** Assessment & feedback · **Evidence:** strong — (all-pupil-response technique; EEF; Wiliam) · **Best for:** whole-class instant checks, ages 5–11 — and reimagined for 1:1.

**What it is.** In a classroom, every child writes an answer and holds up the board at once, so the teacher sees *everyone's* thinking in one glance. The point is **all-response** — no child can hide, and the teacher gets a live read of the whole room.

**Why it works.** Maximises participation and gives immediate, simultaneous evidence; lowers stakes (easily wiped); surfaces working, not just answers.

**When to use / when NOT.** Classroom: for quick recall and "show me" checks. For a *solo* learner the "all-response" purpose is moot — but the **show-your-working** purpose transfers directly.

**How to run it (steps).**
1. Pose a question.
2. "Write your answer / working on the board."
3. "Show me" — read the working, not just the result.
4. Respond and wipe.

**1:1 AI-tutor adaptation.** The solo equivalent is the **`whiteboard` block** (child sketches/jots) and free-entry blocks (`numberEntry`, `shortText`) that capture *working*, not just a tick. Because there's no class to scan, the tutor leans harder on "show me how" — the working is the evidence. The director treats a `whiteboard` response as a check it can judge and remember.

**Primary example.** Year 3 multiplication: "On your whiteboard, draw 4 × 3 as an array, then tell me the answer." The drawing reveals whether the child understands rows×columns or just guessed 12.

**Pitfalls.** Reading only the final answer and missing the (revealing) working; using it for tasks too complex to jot; for 1:1, forgetting that the "instant all-response" benefit doesn't apply — it's the working that matters.

**Related.** [[observation-and-questioning]], [[error-analysis]], [[low-stakes-quizzing-as-assessment]].

---

## Comparative judgement

**Family:** Assessment & feedback · **Evidence:** promising–moderate — (Pollitt; Thurstone's paired comparisons; growing UK use, e.g. *No More Marking*) · **Best for:** assessing *open* work (writing, art, reasoning) where rubrics struggle, ages 7–11.

**What it is.** Instead of scoring each piece against a rubric, an assessor repeatedly judges *which of two pieces is better*. Many such paired decisions are combined statistically into a reliable rank order.

**Why it works.** Humans are far more reliable at relative ("which is better?") than absolute ("what mark?") judgements. It captures holistic quality that analytic rubrics miss, and inter-judge reliability is high.

**When to use / when NOT.** Use for open, hard-to-rubric outputs — a story, an explanation, a drawing. NOT for right/wrong items (use a check). For a single learner it's a *progress* tool, not a live-lesson tool.

**How to run it (steps).**
1. Collect a set of pieces (e.g. the child's writing over weeks).
2. Present pairs; decide "which shows better X (e.g. clearer description)?"
3. Aggregate to a rank → see the trajectory.

**1:1 AI-tutor adaptation.** Not a per-turn method, but a powerful **progress lens**: Classai can store dated samples (a [[portfolios]] use) and, for the parent report, judge "is this story better than last month's?" rather than forcing a spurious numeric mark. Keeps qualitative growth visible in the `LearnerModel` without false precision.

**Primary example.** A Year 5 child's monthly "favourite animal" paragraph: comparing September vs December pieces shows clearly improved sentence variety and detail — a gain a 1–10 score would have flattened.

**Pitfalls.** Using it where a simple correct answer exists; needing too many comparisons to be practical solo; opaque to the child unless you explain *why* one was stronger.

**Related.** [[rubrics-and-success-criteria]], [[single-point-rubrics]], [[portfolios]], [[summative-assessment]].

---

## Rubrics & success criteria

**Family:** Assessment & feedback · **Evidence:** strong — (success criteria / goal clarity, Hattie d≈0.7+; EEF feedback) · **Best for:** any task with quality dimensions; sharing "what good looks like," ages 6–11.

**What it is.** **Success criteria** make the goal of a task explicit and child-friendly ("you'll know you've done it when…"). A **rubric** lays out levels of quality across the criteria. Together they answer "where am I going?" and "how am I doing?"

**Why it works.** Learning improves most when the *goal is clear*. Visible criteria let the child self-monitor and make feedback meaningful (it points to a shared standard, not the teacher's whim).

**When to use / when NOT.** Use for tasks with quality (not just correctness) — writing, explaining, a model. NOT over-engineered multi-level grids for a 6-year-old (use a [[single-point-rubrics|single-point rubric]] or 2–3 "steps to success"). Beware criteria so detailed they reduce creativity to a checklist.

**How to run it (steps).**
1. State the goal in child language.
2. List 2–4 concrete success criteria ("includes a capital letter and full stop"; "shows the working").
3. Share *before* the task; refer to them during; use them to give feedback after.
4. Co-construct criteria with the child where possible (raises ownership).

**1:1 AI-tutor adaptation.** Success criteria are the beat's **`successCriteria`** field, surfaced to the child as "here's what we're aiming for" in the explain beat and used to *gate advancement* (the director only credits mastery when criteria are met *with understanding*). Feedback in the wrong-answer loop references the criteria, not just the answer.

**Primary example.** Year 2 sentence writing — success criteria shown first: "capital letter, finger spaces, full stop, makes sense." The child checks their own sentence against the three before the tutor does.

**Pitfalls.** Hidden criteria (child guessing the target); over-long rubrics; criteria that reward compliance over thinking.

**Related.** [[single-point-rubrics]], [[self-and-peer-assessment]], [[feed-up-feedback-feed-forward]], [[comparative-judgement]].

---

## Single-point rubrics

**Family:** Assessment & feedback · **Evidence:** promising — (Fluckiger; practitioner evidence for feedback quality) · **Best for:** giving rich feedback on open work without grade-grid clutter, ages 7–11.

**What it is.** A rubric with just *one* column — the description of "proficient / target" for each criterion — with blank space either side for the assessor to note where the child *exceeded* and where they *fell short*. It centres the conversation on the standard and on personalised next steps.

**Why it works.** Simpler than a full grid, so the child actually reads it. The blank margins force *specific*, individual feedback (the most powerful kind) rather than ticking a generic band.

**When to use / when NOT.** Use when you want quality feedback on open tasks but a multi-level rubric would overwhelm. NOT when you need a defensible numeric grade (use a scored rubric).

**How to run it (steps).**
1. Write the "target" descriptor for each criterion (the single column).
2. Share it as the goal.
3. After the work, note in the margins: "even better than target here because…" / "not yet target here — next step is…".

**1:1 AI-tutor adaptation.** A natural fit for Classai feedback: the **target descriptor = `successCriteria`**, and the tutor's spoken feedback fills the two margins live — naming one specific strength ("your opening sentence really set the scene") and one specific next step ("add what the character *felt*"). This is exactly [[feed-up-feedback-feed-forward]] in miniature, stored as a `LearnerModel` strength + struggle.

**Primary example.** Year 4 recount: target = "events in order, time words, reader knows what happened." Tutor: "Order and time words: spot on. Next step: tell me how *you* felt at the end."

**Pitfalls.** Vague margin notes ("good"/"improve" — say *what*); using it where a quick correct/incorrect check suffices.

**Related.** [[rubrics-and-success-criteria]], [[feedback-that-moves-learning-forward]], [[self-and-peer-assessment]].

---

## Self- & peer-assessment

**Family:** Assessment & feedback · **Evidence:** strong (self-assessment / self-regulation) — (EEF "Metacognition & self-regulation" +7mo; Wiliam) · **Best for:** building independence and metacognition, ages 7–11 (peer needs another child).

**What it is.** The learner judges their *own* work against the success criteria (self-assessment), or two children assess each other's (peer). The aim is to make the child an *owner* of the standard, not a passive receiver of marks.

**Why it works.** Activating learners as owners of their learning is one of Wiliam's five key strategies. Judging work against criteria builds metacognition and transfers the monitoring job to the child — the goal of all teaching.

**When to use / when NOT.** Self-assessment: use often, against clear criteria. Peer assessment: needs a second learner and trained "kind, specific, helpful" norms — **largely unavailable to a solo home learner**, so substitute self- and tutor-assessment. NOT as the child just guessing a grade; it must reference explicit criteria.

**How to run it (steps).**
1. Ensure criteria are clear and shared.
2. Child checks their work against each criterion ("did I…?").
3. Child names one strength and one next step.
4. (Peer) partner gives kind/specific/helpful feedback to the same frame.

**1:1 AI-tutor adaptation.** The tutor explicitly hands the child the criteria and asks "**check it yourself** — which of these did you do?" before giving its own view, building self-regulation. With no peer available, the **AI tutor plays the constructive "peer/critical friend"** role, and may invite the child to "spot the mistake" in a deliberately flawed example ([[error-analysis]]). Self-ratings feed `traffic-light`/confidence data into memory.

**Primary example.** Year 5 maths: "Before I look, check your working against our two rules — did you line up the place values, and did you show the exchange? Which one are you sure about?"

**Pitfalls.** No criteria → guessing; over-praise or harsh self-criticism without structure; assuming a home learner has a peer (they usually don't).

**Related.** [[rubrics-and-success-criteria]], [[traffic-lighting-and-confidence-rating]], [[metacognition]] (in `methods/` part 2), [[error-analysis]].

---

## Feedback that moves learning forward (Wiliam)

**Family:** Assessment & feedback · **Evidence:** strong — (EEF "Feedback" +6mo; Wiliam 2011; Kluger & DeNisi 1996 — feedback can *harm* if mishandled) · **Best for:** the response to any piece of work, all ages.

**What it is.** Feedback designed to cause *more thinking by the learner* and a concrete improvement — not to grade, praise, or simply tell the answer. Wiliam's test: feedback should require the child to *do something* (think, redraft, retry).

**Why it works.** Feedback only helps if it's acted on. Telling the answer or giving a grade short-circuits the thinking that builds learning; a guiding move that the child completes themselves builds durable memory.

**When to use / when NOT.** Use on every error and on right answers (probe the reasoning). NOT as bare correction ("no, it's 4"), empty praise ("great!"), or ability praise ("you're so clever"). NOT five corrections at once — one clear next step.

**How to run it (steps).**
1. On a miss, *diagnose first* (slip vs gap vs misconception — see `assessment-and-feedback.md` §2).
2. Give exactly *one* targeted hint or counter-example.
3. Hand it back so the *child* produces the answer.
4. On a hit, confirm and probe ("how did you get it?").
5. Keep it specific, process-focused, warm, blameless.

**1:1 AI-tutor adaptation.** This is precisely the `TEACHING_PRINCIPLES` the live prompt enforces. The wrong-answer→remedy loop runs the `remedy` as a *guiding move*, never the bare answer; the director never lets the LLM "tell." Right answers trigger a reasoning probe before mastery is recorded ([[mastery-vs-guessing-check]]).

**Primary example.** Child says "½ of 8 is 3." Weak: "No, it's 4." Strong: "Half means two *equal* piles — deal these 8 counters into two piles… how many in each?" The child re-derives 4.

**Pitfalls.** Giving the answer; empty/dishonest praise; ability praise; overloading with corrections; feedback the child never gets to act on.

**Related.** [[feed-up-feedback-feed-forward]], [[wrong-answer-misconception-remedy-loop]], [[single-point-rubrics]], [[mastery-vs-guessing-check]].

---

## Feed-up / feedback / feed-forward (Hattie & Timperley)

**Family:** Assessment & feedback · **Evidence:** strong — (Hattie & Timperley 2007 *The Power of Feedback*) · **Best for:** structuring *any* feedback so it's complete, ages 6–11.

**What it is.** A model that says effective feedback answers three questions at four levels. The three questions: **Feed-up** ("Where am I going?" — the goal), **Feedback** ("How am I doing?" — relative to the goal), **Feed-forward** ("Where to next?" — the next step). The four levels: task, process, self-regulation, and (least useful) self/praise.

**Why it works.** Most feedback omits *feed-up* (the goal) or *feed-forward* (the next step) and stalls at "right/wrong." Including all three closes the gap. Process- and self-regulation-level feedback transfer far better than task-only or person-level praise.

**When to use / when NOT.** Use as a mental checklist for every feedback moment. NOT to deliver all three as a speech every time — for young children, keep it to one clear next step. Avoid the self/praise level as the *main* message.

**How to run it (steps).**
1. **Feed-up:** restate the goal/criteria.
2. **Feedback:** where is the work relative to it?
3. **Feed-forward:** the single most useful next move.
4. Pitch at the *process* level ("the strategy you used…") not the person ("you're clever").

**1:1 AI-tutor adaptation.** The three questions map cleanly: feed-up = the beat's `successCriteria` surfaced at the start; feedback = the director's judgement of the answer; feed-forward = the chosen `remedy`/next beat. The tutor is told to aim feedback at *strategy/process*, and stores the feed-forward as the next `needsWork` item.

**Primary example.** Year 3 writing: feed-up "we're aiming for a sentence that *makes sense* with a capital and full stop"; feedback "you've got the capital and the meaning"; feed-forward "next, find where the full stop goes."

**Pitfalls.** Skipping feed-up (no shared goal) or feed-forward (no next step); drowning in person-level praise; delivering all three as a lecture.

**Related.** [[feedback-that-moves-learning-forward]], [[rubrics-and-success-criteria]], [[single-point-rubrics]].

---

## The wrong-answer → misconception → remedy loop

**Family:** Assessment & feedback · **Evidence:** strong — (misconceptions research, Hattie; diagnostic teaching, Swan; conceptual-change) · **Best for:** the heart of responsive tutoring — turning any error into a fix, all ages.

**What it is.** A structured diagnosis: when an answer is wrong, identify *which* misconception caused it, then deliver the *specific* remedy that confronts that misconception — rather than just marking it wrong or restating the answer.

**Why it works.** "Wrong" is not a diagnosis. Slips, gaps, and misconceptions need *different* responses; a misconception in particular is a *coherent wrong rule* that survives being told the right answer — it must be confronted with a counter-example it can't explain.

**When to use / when NOT.** Use on every wrong answer. NOT to skip the diagnosis and leap to "the answer is…". NOT to reteach a *slip* (a child who already understands will be confused/bored).

**How to run it (steps).**
1. On a wrong answer, ask "how did you work that out?" to surface the reasoning.
2. Classify: slip (nudge) / gap (backfill prerequisite) / misconception (confront with counter-example).
3. Deliver *one* targeted move matched to the cause.
4. Re-check; record any genuine misconception to revisit.

**1:1 AI-tutor adaptation.** This loop is *baked into the data model*: every check carries `wrongAnswers: [{answer, why, remedy}]`. When the child's answer matches an entry, the director runs its `remedy` as a guiding hint (never the bare answer). No match → fall back to "ask for reasoning, classify, respond." The misconception is written to `LearnerModel.misconceptions` so it's watched for and re-checked later.

**Primary example.** "Which is bigger, 0.45 or 0.6?" Child: "0.45." `why`: longer-number-is-bigger (whole-number thinking on decimals). `remedy`: "Line them up — 0.6 = 0.60. Compare tenths: 6 vs 4. On a number line 0.45 sits before 0.5." The counter-example breaks the rule.

**Pitfalls.** Treating "wrong" as the diagnosis; reteaching slips; telling the answer; not recording the misconception so it silently returns.

**Related.** [[hinge-questions]], [[error-analysis]], [[diagnostic-pre-assessment]], [[feedback-that-moves-learning-forward]].

---

## Low-stakes quizzing as assessment

**Family:** Assessment & feedback · **Evidence:** strong — (testing effect, Roediger & Karpicke 2006; EEF; "tests as learning events") · **Best for:** simultaneous practice + evidence, ages 6–11.

**What it is.** Frequent, *low-pressure* quizzes whose primary job is to strengthen memory through retrieval — and which *incidentally* give you a clean read of what's secure. The stakes are deliberately tiny (no grade, "great mistakes welcome").

**Why it works.** Retrieving an answer (vs rereading) is one of the most powerful things for durable memory (the testing effect), *and* the result is assessment evidence. Two wins from one activity. Low stakes keep anxiety off so the evidence is honest.

**When to use / when NOT.** Use to open lessons (spaced retrieval of prior topics) and to revisit. NOT high-stakes/graded (kills the honesty and the calm). NOT as the *only* assessment — pair with reasoning probes.

**How to run it (steps).**
1. Pull 3–5 items from *previously taught* material (spacing/interleaving).
2. Pose them quickly, low-pressure, "no worries if you forget."
3. Note which are secure / shaky.
4. Feed shaky items into the spaced-review schedule.

**1:1 AI-tutor adaptation.** This is the **hook beat as retrieval starter** plus the spaced-review system. The tutor opens with a quick quiz of a *prior* topic (drawn from `LearnerModel` items due for review), judges each, and updates mastery — assessment and memory-strengthening in one move. Frame: "let's warm up — a few from before."

**Primary example.** Year 4 lesson opens: "Quick warm-up — 6×7? What's ¾ as a decimal? Capital of France?" Mixed retrieval that both strengthens recall and flags what needs another pass.

**Pitfalls.** Making it high-stakes; only quizzing *today's* lesson (no spacing); not acting on the misses.

**Related.** [[formative-assessment]], [[exit-tickets]], [[diagnostic-pre-assessment]]; retrieval practice & spacing methods (`methods/` part 1).

---

## Observation & questioning

**Family:** Assessment & feedback · **Evidence:** strong — (questioning, Hattie; oral assessment; EEF "Oral language" +6mo) · **Best for:** revealing *reasoning* (the part marks hide), all ages, especially 5–7.

**What it is.** Gathering evidence by *watching* how a child works and by *asking* probing questions ("how did you get that?", "what if…?", "why?") rather than only inspecting final answers.

**Why it works.** The reasoning is where understanding lives — and where misconceptions hide behind right answers. Observation catches strategy, hesitation, and what the child reaches for; good questions surface the thinking that a tick can't show.

**When to use / when NOT.** Use constantly, especially with early-years children who can't yet write much. NOT as vague watching — *plan* the questions. Avoid only ever asking after errors (probe successes too).

**How to run it (steps).**
1. Watch *how* the child approaches the task (method, manipulatives, hesitation).
2. Ask open, reasoning-focused questions: "How? Why? What if it were…?"
3. Listen for slip vs gap vs misconception in the explanation.
4. Respond and record.

**1:1 AI-tutor adaptation.** With voice answers (on-device Whisper) the tutor can pose "how did you get that?" verbally and judge the spoken reasoning — observation/questioning is its richest evidence channel, since a `whiteboard` or spoken explanation reveals process. The director is built to probe right answers, not just wrong ones, before crediting mastery.

**Primary example.** Year 1, "what's 7 + 5?" Child says 12. Tutor: "How did you do it?" "I counted 8, 9, 10, 11, 12 on from 7." — reveals secure counting-on, not a guess.

**Pitfalls.** Inspecting only the answer; unplanned/aimless questioning; questioning only after errors so "how did you do it?" signals "you're wrong."

**Related.** [[mini-whiteboards]], [[mastery-vs-guessing-check]], [[error-analysis]], [[formative-assessment]].

---

## Portfolios

**Family:** Assessment & feedback · **Evidence:** moderate — (authentic assessment; useful for growth/ownership, weaker for comparability) · **Best for:** showing growth over time, project/creative work, ages 5–11.

**What it is.** A curated collection of a child's work gathered over time, showing development and range — and giving the child a tangible record of progress they can be proud of.

**Why it works.** Captures growth and authentic, messy, real work that one-off tests miss; builds ownership and motivation ("look how far I've come"); supports [[comparative-judgement]] of trajectory.

**When to use / when NOT.** Use for writing, art, projects, and anything where *progress* is the story. NOT as a substitute for diagnostic checks of specific skills; NOT as an unsorted dumping ground (curate, with the child).

**How to run it (steps).**
1. Decide what goes in (best work, or representative samples, dated).
2. Periodically add, with the child reflecting "why this piece / what's better now."
3. Review the trajectory at milestones; share in reports.

**1:1 AI-tutor adaptation.** Classai can keep dated work samples and session artefacts in local storage; the parent report and progress rollup draw on them to show growth ("compare this story to last month's"). The child's reflection on a piece feeds `LearnerModel` interests/strengths. Fits the privacy constraint — it all stays local.

**Primary example.** A Year 3 "my writing journal": one piece a fortnight. Reviewing it together in December shows visibly longer, better-punctuated writing than September — motivating and informative.

**Pitfalls.** Hoarding everything (no curation); no reflection (just storage); using it to dodge needed skill checks.

**Related.** [[comparative-judgement]], [[summative-assessment]], [[self-and-peer-assessment]], [[rubrics-and-success-criteria]].

---

## Error analysis

**Family:** Assessment & feedback · **Evidence:** strong — (analysing errors for patterns; diagnostic teaching, Swan; cognitive science of misconceptions) · **Best for:** finding the *systematic* fault behind repeated mistakes, ages 7–11.

**What it is.** Studying a child's *errors* for the underlying pattern — and often, deliberately giving the child a wrong worked example to *find and fix* — to expose the faulty rule driving them.

**Why it works.** A systematic error reveals the buggy rule precisely; fixing the rule fixes the whole class of mistakes at once. Asking the child to *find* an error is metacognitive and far more memorable than being told.

**When to use / when NOT.** Use when an error repeats (signals gap/misconception, not slip), and as a "spot the mistake" task. NOT for one-off slips. NOT if it would just confuse a fragile beginner with a wrong model before they have the right one.

**How to run it (steps).**
1. Collect 2–3 instances of the error.
2. Find the common faulty rule ("always subtracts the smaller from the larger digit").
3. Confront it with a counter-example, or set a "find my mistake" task on a worked example exhibiting it.
4. Re-teach the correct rule; re-check.

**1:1 AI-tutor adaptation.** Two uses: (1) the director watches for *repeated* `wrongAnswers` matches across the session/`LearnerModel` and treats a pattern as a misconception to confront; (2) a deliberate **"spot my mistake"** block (a `whiteboard`/`shortText` task showing flawed working) turns error analysis into a metacognitive activity — a constructive-peer move when no peer exists.

**Primary example.** Column subtraction (Year 4): the tutor shows "52 − 27 = 35" worked out and asks "I made a mistake — can you find it?" The child spots that 2−7 was done as 7−2. Naming the bug fixes every similar sum.

**Pitfalls.** Analysing slips as if systematic; modelling the wrong method to a beginner who'll imitate it; finding the pattern but not re-teaching the right rule.

**Related.** [[wrong-answer-misconception-remedy-loop]], [[hinge-questions]], [[diagnostic-pre-assessment]], [[self-and-peer-assessment]].

---

## Traffic-lighting & confidence rating

**Family:** Assessment & feedback · **Evidence:** moderate — (self-report formative routine; relates to calibration/metacognition; self-report alone is unreliable) · **Best for:** quick self-assessment and surfacing (mis)calibration, ages 6–11.

**What it is.** The child signals their confidence/understanding with a simple scale — green/amber/red, thumbs, or a 1–3 — so you (and they) can see where they feel secure vs shaky. Best used *alongside* a real check, to compare felt confidence with actual performance.

**Why it works.** Cheap, fast, and builds metacognitive awareness (the child reflects on their own understanding). Comparing rating-vs-result reveals *calibration*: a confident-but-wrong child holds a misconception; an unconfident-but-right child needs reassurance and fluency.

**When to use / when NOT.** Use to add a self-awareness layer to checks and at lesson close. NOT *instead of* a real check — self-report alone is unreliable (children over- and under-rate). Watch for "all green" compliance.

**How to run it (steps).**
1. After a concept, ask "green/amber/red — how sure are you?"
2. Pair with an actual check.
3. Compare: confident+wrong = misconception to confront; unsure+right = build fluency/confidence.
4. Use red/amber to choose what to revisit.

**1:1 AI-tutor adaptation.** The tutor can ask for a confidence rating (via a quick `multipleChoice`/voice "how sure are you?") and **store calibration** in `WorkingMemory`/`LearnerModel`. A "confident but wrong" pattern flags a misconception to confront; "unsure but right" tells the tutor to lighten support and build fluency, not reteach. Reds steer spaced review.

**Primary example.** Year 5 fractions: child rates "green" then gets ¾ + ¼ wrong. The mismatch (sure-but-wrong) is the loudest possible signal of a misconception to address now.

**Pitfalls.** Trusting the rating without a check; children defaulting to "green"; using colour to judge the child rather than to guide teaching.

**Related.** [[self-and-peer-assessment]], [[mastery-vs-guessing-check]], [[exit-tickets]], [[metacognition]].

---

## Mastery-vs-guessing check

**Family:** Assessment & feedback · **Evidence:** strong — (guessing on selected-response; transfer as the test of understanding; `assessment-and-feedback.md` §5) · **Best for:** deciding whether a *correct* answer is real before advancing, all ages.

**What it is.** A deliberate follow-up that distinguishes genuine mastery from a lucky guess or surface recognition — typically asking the child to *explain* or to *apply the idea to a slightly different case* — before crediting understanding.

**Why it works.** A correct `multipleChoice`/`trueFalse` can be a 1-in-3 guess; recognition isn't recall. Explanation and transfer are hard to fake, so they separate luck from learning and stop you advancing on a shaky foundation.

**When to use / when NOT.** Use before recording high mastery, especially after selected-response items. NOT on every single right answer (you'll grind a flowing child to a halt) — use it at decision points and when something feels too easy/fast.

**How to run it (steps).**
1. After a correct answer, ask "how did you work that out?"
2. Or pose a transfer item ("what if it were 12 instead of 8?", a free-entry version).
3. Mastery = explains it + holds across variation, quick and confident.
4. Guessing = can't explain, flips when surface changes, recognition not recall → don't advance yet.

**1:1 AI-tutor adaptation.** Built into the director: a single correct `multipleChoice` is *not* treated as mastery. The tutor confirms with a reasoning probe or a transferred/interleaved item before writing high mastery to the `LearnerModel` and advancing the beat. This gates the reteach-vs-advance decision (`assessment-and-feedback.md` §6).

**Primary example.** Year 2 child ticks the right "½ of 6 = 3." Tutor: "Show me with these 6 cubes — what if there were 10?" If they can split 10 into two equal piles, it's mastery; if they're lost, it was a guess.

**Pitfalls.** Treating one tick as proof; probing so relentlessly that confident children feel doubted; ignoring the "got it after the auto-feedback nudged the right answer" trap (recognition, not recall).

**Related.** [[low-stakes-quizzing-as-assessment]], [[observation-and-questioning]], [[traffic-lighting-and-confidence-rating]], [[formative-assessment]].

---

## The assessment loop in one line

**Decide the goal → choose a method that reveals understanding (not just correctness) → read the answer *and its reasoning* → diagnose → respond with a forward-moving move → confirm mastery vs guessing → record it for spaced review → adapt the next step.**

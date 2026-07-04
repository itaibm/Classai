# Research: AI as a Teacher — what the evidence says, and how Classai should build on it

This file reviews the research on **AI / computer tutoring** — both classic *Intelligent Tutoring Systems* (ITS) and the new wave of *LLM-based tutors* — and distils it into concrete design rules for **Classai: a 1:1 AI homeschool tutor for children ages 5–11**.

It is a companion to `pedagogy-core.md` (the subject-agnostic "how to teach" playbook). Where that file grounds *teaching* in learning science, this file grounds the specific bet Classai makes — *that an AI can run an effective 1:1 lesson* — in the empirical literature, and is honest about where that evidence is strong, thin, or contested.

Every major claim below is tied to a real, named, citable source (full URLs in §5). Each lesson ends with a **"How Classai should apply this"** line tying it to Classai's architecture: the **lesson director** (the deterministic state machine in `server/src/teach/`), its **beats** (hook → explain → example → check → practice → recap), its **wrong-answer / misconception** structure, the **two-tier memory** (`WorkingMemory` + `LearnerModel`), and the **structured `TeacherTurn`** the LLM returns.

---

## 1. What the research says AI/computer tutoring can — and can't — do

**The headline (the realistic effect-size picture).**

- **Bloom's "2 sigma" (1984) is the aspiration, not the benchmark.** Bloom reported that students tutored 1:1 with mastery learning scored about **two standard deviations (2σ)** higher than conventionally-taught peers — the average tutored student beat 98% of the control class (Bloom 1984). This is the famous "2 sigma problem": find group methods as good as 1:1 tutoring. But 2σ has **not** held up as a realistic, replicable target. The original studies used very short interventions, tiny samples, and — crucially — held tutored students to a *higher mastery threshold* (90%) than the classroom (80%), so they weren't a fair comparison (see the Nintil systematic review and Education Next critique). **Modern, well-controlled human-tutoring effects are closer to d ≈ 0.4–0.8, not 2.0.**

- **The most important single result for Classai: good computer tutoring is roughly as effective as human tutoring.** VanLehn's (2011) landmark review found human tutoring at **d ≈ 0.79** and step-based ITS at **d ≈ 0.76** — *nearly identical* — overturning the earlier folklore of 0.3 (computer) vs 1.0 (ITS) vs 2.0 (human). This is the empirical license for Classai to exist: a well-designed automated tutor can land in the same ballpark as a human one.

- **Independent meta-analyses converge on "moderate-to-large and reliably positive" for ITS:**
  - **Ma, Adesope, Nesbit & Liu (2014)** — 107 effect sizes, ~14,000 learners: ITS beat large-group teacher-led instruction at **g ≈ 0.42** and non-ITS computer instruction at **g ≈ 0.57**, and was **statistically indistinguishable from individual human tutoring** (−0.11, n.s.) and small-group instruction (0.05, n.s.).
  - **Kulik & Fletcher (2016)** — 50 controlled evaluations: median effect **≈ 0.66σ** (50th → 75th percentile), but with a big caveat — effects were much larger on *locally-developed* tests aligned to the tutor than on *standardized* tests. **Test–instruction alignment inflates apparent effects.**

- **At real scale, in real classrooms, the effects shrink.** The Cognitive Tutor (Carnegie Learning) — one of the most successful, ACT-R-grounded ITS ever built — showed *no* effect in year 1 of a 7-state RCT and **≈ 0.21σ** for high schoolers in year 2 (Pane et al. 2014). The US What Works Clearinghouse rates its overall maths effects as "mixed." Lesson: lab-sized effects don't transfer 1:1 to messy reality, and a new tool often needs a full implementation cycle before it helps.

**So, honestly:**
- AI/computer tutoring **reliably helps** — typically **d ≈ 0.4–0.8** over conventional group instruction, and **comparable to human 1:1 tutoring** when well-designed.
- It does **not** routinely deliver Bloom's 2σ. Treating 2σ as a promise is overselling; treating "as good as a decent human tutor, available infinitely" as the realistic ceiling is honest and still enormous.
- The *design* is what separates a tutor that helps from one that **harms** (see §3 — the Bastani et al. RCT, where an unguarded ChatGPT made students *worse* once it was taken away).

> **How Classai should apply this:** Aim for the mechanisms that produce the reliable 0.4–0.8 effect — step-level interaction, immediate feedback, mastery, error-driven correction — not the mythical 2σ. Be modest in claims to parents. And treat *design discipline* (don't give away answers, keep the child working) as the difference between helping and harming, because the evidence shows both are possible from the same base model.

---

## 2. Lessons from classic ITS research

These are the durable, decades-old findings about *what makes computer tutoring work*. They predate LLMs and are the most trustworthy guidance we have.

### 2.1 Step-level interaction beats answer-only — but there's a plateau (VanLehn 2011)

**Finding.** VanLehn classified tutors by *interaction granularity*: **answer-based** (feedback only on the final answer), **step-based** (feedback on each intermediate step), and **substep-based** (feedback within a step, e.g. on the reasoning). Effectiveness jumps from answer-based to **step-based** — but then **plateaus**: substep-based tutoring added little over step-based ("the interaction plateau"). The big win is moving from "right/wrong on the final answer" to "guidance at each step."

**Source.** VanLehn, K. (2011), *Educational Psychologist* 46(4).

> **How Classai should apply this:** Classai's beats already *are* step-based interaction — the win is real, so protect it. The director should break a problem into steps and check at each one, not just judge the final answer. Don't over-engineer toward "substep" micro-analysis of every reasoning move (the plateau says the payoff is small and the cost is cognitive load on a 6-year-old). Step-level feedback via the `check`/`practice` beats is the sweet spot.

### 2.2 Immediate, step-level feedback (Cognitive Tutor; ASSISTments)

**Finding.** A core mechanism behind ITS gains is **immediate feedback at the point of error**, so a misconception is caught before it's rehearsed. ASSISTments — which gives students immediate feedback and hints on each homework problem — produced a reliable **g ≈ 0.22** on a standardized maths test in SRI's independent 2-year RCT (Roschelle, Feng, Murphy & Mason 2016), with a *gap-closing* effect (lower-prior-achievement students gained most). Cognitive Tutor's **model tracing** checks every student action against a cognitive model and responds instantly.

**Source.** Roschelle et al. (2016), *AERA Open*; Ritter, Anderson, Koedinger & Corbett (2007).

> **How Classai should apply this:** Feedback must come *the same turn* as the answer, not at the end of the lesson — this is exactly Classai's "act on every check the same turn" rule (`pedagogy-core.md` §11). The `TeacherTurn` judges the learner's answer and the director responds immediately: confirm, hint, or reteach. Never bank up errors to address later. The gap-closing finding means immediate feedback matters *most* for struggling learners — lean into it for them, don't withdraw it.

### 2.3 Mastery learning & knowledge tracing (Corbett & Anderson)

**Finding.** Effective ITS don't march at a fixed pace; they **advance only when the learner has demonstrated mastery** of the current skill, and they **estimate that mastery continuously**. Cognitive Tutor uses *Bayesian Knowledge Tracing* (Corbett & Anderson 1995) to maintain a running probability that each underlying skill is mastered, and selects the next problem accordingly. This is the operationalization of Bloom's "mastery learning" half of the 2σ result.

**Source.** Corbett & Anderson (1995), *User Modeling and User-Adapted Interaction*; Ritter et al. (2007).

> **How Classai should apply this:** This is Classai's **`LearnerModel`** (`server/src/memory/`) — the durable mastery map that should gate progression and feed spaced review / next-lesson recommendations. The director should not advance a beat (or "pass" a topic) on one lucky answer; it should require demonstrated mastery (multiple checks, ideally spaced), and the `LearnerModel` should blend each turn's evidence into a running mastery estimate rather than a binary "done." Classai doesn't need a literal Bayesian model, but it needs the *behaviour*: track per-skill confidence, advance on mastery, resurface weak skills.

### 2.4 Expectation-and-misconception-tailored dialogue (AutoTutor; Graesser)

**Finding.** AutoTutor holds a lesson in natural-language dialogue by pre-specifying, for each question, a set of **expectations** (the ideas a good answer should contain) and a set of **anticipated misconceptions** (common wrong ideas). It compares the student's words to both, then uses **pumps, hints, prompts, and assertions** to draw out the missing expectations and **directly correct** any misconception it detects. Across ~10 controlled studies with 1,000+ learners, AutoTutor produced gains of **≈ 0.2–1.5σ** (≈ 0.8 typical).

**Source.** Graesser et al., "AutoTutor and Family: A Review of 17 Years of Natural Language Tutoring" (2014), *IJAIED*.

> **How Classai should apply this:** This is the single best-validated template for an LLM tutor's *dialogue*, and it maps cleanly onto Classai's existing data shapes. Each topic in the knowledge base already carries **Key concepts** (= expectations) and **Misconceptions: wrong answer → why → fix** (= anticipated misconceptions, feeding `wrongAnswers`). The director/prompt should: (a) try to *elicit* the expectations from the child rather than stating them; (b) when an answer matches a known misconception, fire the *specific* pre-authored fix, not a generic "not quite." Authoring expected answers and misconceptions per check is the highest-leverage content work for tutor quality.

### 2.5 The assistance dilemma & "mid-level" help (Koedinger & Aleven)

**Finding.** There is a genuine, unsolved trade-off: **withholding help** risks frustration and floundering; **giving help** risks shallow learning and dependence. Experiments with Cognitive Tutors found that **mid-level assistance** (interactive hints, on-demand) often beats both extremes — pure worked examples (too much help) *and* unsupported problem-solving (too little). Worked examples are the most *efficient* (least time/effort) but not always the best for transfer; the optimum is help that is *faded* and *given only as needed*.

**Source.** Koedinger & Aleven (2007), "Exploring the Assistance Dilemma in Experiments with Cognitive Tutors," *Educational Psychology Review*.

> **How Classai should apply this:** Classai should default to **eliciting, then hinting in escalating tiers, then (only if stuck) telling** — never jumping straight to the answer, but never leaving a child to flounder either. The director's **struggle streak** is the dial: on a first miss, hint; on a second, give a stronger scaffold or drop a CPA stage; only after that, model the step. This is the "learner is stuck" DIRECTIVE — wire it to *graduated* help, not a binary hint/answer switch. The dilemma is genuinely unsolved, so tune it per child via the `LearnerModel`.

### 2.6 Worked examples, fading, and the expertise-reversal effect (Sweller; Salden et al.)

**Finding.** For **novices**, studying a complete **worked example** beats solving an equivalent unsolved problem (the worked-example effect). But as expertise grows, worked examples become *redundant* and can even *hurt* — the **expertise-reversal effect**. The fix is **example-to-problem fading**: start with full worked examples, then partially-completed ones, then independent problems — and **fade adaptively, tied to the individual's growing mastery**. Removing steps also naturally triggers **self-explanation**, which deepens learning.

**Source.** Salden, Aleven, Schwonke & Renkl (2010), "The expertise reversal effect and worked examples in tutored problem solving," *Instructional Science*; Sweller (worked-example effect).

> **How Classai should apply this:** This is `pedagogy-core.md` §3 made adaptive. The director should choose the *amount of worked support* based on the `LearnerModel`'s mastery estimate for the skill: low mastery → full think-aloud worked example (`steps`/`whiteboard`); growing → partially-worked ("you finish the last step"); secure → clean problem. Critically, **don't keep modelling for a child who's already got it** — that's the expertise-reversal trap and it wastes their working memory and motivation. Fade per-child, not per-lesson-template.

### 2.7 Hints and prompting self-explanation

**Finding.** On-demand **hints** that scaffold rather than solve, and **self-explanation prompts** ("why did that step work?"), are recurrent ingredients in effective ITS. Self-explanation prompts that are themselves *faded* over time (heavy early, removed as the learner improves) outperform permanent prompting.

**Source.** Koedinger & Aleven (2007); self-explanation / fading literature (Salden et al. 2010).

> **How Classai should apply this:** After a *correct* answer, the director should sometimes prompt "how did you work that out?" (Classai's questioning rule, `pedagogy-core.md` §10) — this is self-explanation, and it confirms understanding vs. luck while strengthening memory. Capture the reasoning in a `shortText`/`speak` block. Fade these prompts as mastery rises so they don't become busywork for a fluent child.

---

## 3. Lessons from recent (2023–2025) LLM-tutor research — promise, risks, guardrails

This is the **new, fast-moving, and genuinely mixed** evidence. LLMs make AutoTutor-style natural dialogue trivial to produce — but they also introduce failure modes ITS never had (hallucination, sycophancy, giving away answers, fostering over-reliance). The honest summary: **LLM tutors can match or beat good instruction *when carefully designed*, and can actively *harm* learning when not.**

### 3.1 LLM tutors *can* work — when pedagogy is engineered in (Kestin et al., Harvard)

**Finding.** In a within-subjects RCT (~190 Harvard physics students, fall 2023), students learned **more than twice as much in less time** with a purpose-built AI tutor ("PS2 Pal") than in an instructor-led active-learning class — and were more engaged. The authors are explicit that success came from **pedagogical fine-tuning**, not raw GPT: the tutor was told to be **brief** (a few sentences, to avoid cognitive overload), to **reveal only one step at a time**, and to **withhold the full solution**.

**Source.** Kestin, Miller et al. (2025), "AI tutoring outperforms in-class active learning," *Scientific Reports* 15:17458. (Note: widely cited as a "Harvard physics study"; published in *Scientific Reports*, not PNAS.) Caveat: university students, single subject, short duration — not 5–11-year-olds.

> **How Classai should apply this:** This validates Classai's whole bet *and* its specific moves. The winning recipe — **brief turns, one step at a time, don't reveal the full solution** — is already Classai's design (one idea per turn, step-based beats). Hold the line on terseness: the `TeacherTurn` speech should be short. The result also says the *control logic*, not the base model, is what made it work — so keep control flow in the director, not the prompt (Classai's core architectural constraint).

### 3.2 LLM tutors *can harm* without guardrails (Bastani et al.)

**Finding.** A ~1,000-student RCT in a Turkish high school (2023) compared a plain ChatGPT interface ("GPT Base") vs. a pedagogically-prompted "GPT Tutor" vs. no AI, during maths practice. **With AI access, performance soared** (+48% GPT Base, +127% GPT Tutor). But **when access was removed for the exam, GPT-Base students scored ~17% *worse* than students who never had AI** — they'd used it as a crutch. The guard-railed **GPT Tutor avoided this harm** (no significant drop on unassisted exams). The base model *fed them answers*; the tutor *withheld them*.

**Source.** Bastani, Bastani, Sungu, Ge, Kabakcı & Mariman (2025), "Generative AI without guardrails can harm learning: Evidence from high school mathematics," *PNAS* 122.

> **How Classai should apply this:** This is the most important cautionary result for Classai. **A tutor that gives answers produces impressive in-the-moment performance and worse actual learning.** Classai must be the "GPT Tutor," never "GPT Base": the prompt + director must enforce *don't give the answer; guide with questions*, and the metric of success is the child's *unassisted* later performance (the `LearnerModel`'s mastery on subsequent retrieval), **not** how smoothly the lesson went. Build the spaced-review check that measures retention *after* the AI's help is gone — that's the real outcome.

### 3.3 The "don't give the answer — be Socratic" design (Khanmigo)

**Finding.** The most prominent child-facing LLM tutor, **Khan Academy's Khanmigo**, is deliberately designed *not* to answer but to **ask guiding questions** — "what do you think the first step is?" — so the student does the cognitive work. This is an explicit, productized version of the AutoTutor/assistance-dilemma logic. (Note: large-scale independent RCT efficacy evidence for Khanmigo specifically is still limited/emerging as of 2026 — its Socratic *design* is well-documented; its *measured learning effect* is not yet established at the level of the classic ITS.)

**Source.** Khan Academy / Khanmigo public design materials; reporting on its Socratic persona.

> **How Classai should apply this:** Adopt the Socratic default — and be honest in the knowledge base that the *design* is evidence-aligned even though independent efficacy data for chatbot tutors is still thin. Classai's director should treat "I don't know / just tell me" not as a cue to reveal the answer but as a cue to **drop to a smaller step or a scaffold** and re-ask. The child producing the answer is the product; the tutor's fluent explanation is not.

### 3.4 Hallucination, accuracy, and sycophancy — the LLM-specific risks

**Finding.** LLMs **hallucinate** — they produce confident, plausible, *wrong* content — which in a tutor risks *teaching a misconception*. Experiments injecting erroneous LLM feedback into a maths tutor found students still learned, but spent **more time, were more confused, and trusted the feedback less** (When LLMs Hallucinate, L@S 2025). A second, subtler risk is **sycophancy**: preference-tuned LLMs tend to *agree* with the user, so they may **validate a child's wrong answer** rather than correct it — directly undermining the error-driven correction that makes tutoring work. Both risks are worse for young children, who can't sanity-check the tutor and tend to over-trust it.

**Source.** "When LLMs Hallucinate: Examining the Effects of Erroneous Feedback in Math Tutoring Systems" (ACM L@S 2025); "Sycophancy is an Educational Safety Risk" (2026, arXiv); JEDM "Designing Safe and Relevant Generative Chats for Math Learning."

> **How Classai should apply this:** Two guardrails. (1) **Ground the content, don't let the model invent it.** Classai's strength is that lessons/checks are pre-authored in the knowledge base with *known* correct answers and misconceptions — the live LLM should *judge against* those, not free-improvise facts. Keep answer-keys server-side and have the director check the child's answer against the authored key, not the model's opinion. (2) **Counter sycophancy explicitly.** The teaching prompt must instruct the model to *correct* wrong answers (kindly, process-praise style) and never affirm an incorrect answer for the sake of agreeableness — and the director, not the model's mood, decides pass/fail by comparing to the authored answer. For a 5–11-year-old who over-trusts the tutor, an unflagged hallucination or a validated misconception is a real harm, not a cosmetic bug.

### 3.5 Over-reliance & cognitive offloading

**Finding.** Heavy, passive AI use is associated with **cognitive offloading** and **"metacognitive laziness"** — students delegate the thinking, copy-paste output, and show *reduced* critical-thinking engagement and self-regulation; some studies find **younger users offload more**. This is the mechanism behind the Bastani harm: the tool does the work, the brain doesn't, and the learning doesn't stick.

**Source.** "Beware of Metacognitive Laziness" (2024, arXiv/BJET); reviews on AI, cognitive offloading and critical thinking (2025).

> **How Classai should apply this:** Design so the **child always does the cognitive work** — Classai is a tutor that *makes the child produce*, not a chatbot that produces *for* them. Every beat should end in the child doing something (an interactive block, a spoken answer), never in the tutor having done it all. The `LearnerModel` and spaced review are the antidotes to offloading: they force re-retrieval *without* the tutor's scaffolds present, surfacing whether real learning happened. Watch for the child trying to extract the answer ("just tell me") and treat it as a signal to scaffold down, not to comply.

### 3.6 Broad meta-analyses of GenAI in learning — positive but young and noisy

**Finding.** Early meta-analyses report **moderate positive** average effects for ChatGPT/GenAI on learning outcomes (e.g. g ≈ 0.67 across 35 experimental studies; SMD ≈ 0.45 in a broader review), with gains in achievement, engagement, and higher-order thinking, and *reduced* mental effort. But these pool short, heterogeneous, often higher-ed studies with weak controls and obvious publication bias; "reduced mental effort" is double-edged (it can mean *offloading*, per §3.5). Treat as **encouraging but immature** evidence — nothing like the 40-year ITS base.

**Source.** Sun et al. / Deng et al. (2024–2026) meta-analyses of ChatGPT on learning outcomes.

> **How Classai should apply this:** Lean on the *mature* ITS findings (§2) for design certainty, and treat the GenAI meta-analyses as directional support, not proof. Be candid in parent-facing claims that LLM-tutor efficacy evidence is early. Build Classai so it could *generate its own* evidence — i.e., measure unassisted post-lesson and spaced-review mastery per child.

---

## 4. Best-practice design checklist for the Classai tutor

Distilled from the evidence above. Each item names the strongest source(s) behind it.

**Keep the child doing the cognitive work (the #1 rule).**
- [ ] **Never hand over the answer.** Guide with questions; the child must produce. *(Bastani 2025 — answers = worse learning; Kestin 2025 — "withhold the full solution"; Khanmigo Socratic design.)*
- [ ] **Every beat ends in the child doing something** (interactive block or spoken answer), not in the tutor monologuing. *(Cognitive-offloading research, 2024–25.)*

**Interact at the step level with immediate feedback.**
- [ ] **Step-based, not answer-based** — check at each step, not just the final answer. *(VanLehn 2011; interaction plateau — no need to go finer than step-level.)*
- [ ] **Feedback the same turn as the answer**, never banked for later. *(ASSISTments / Roschelle 2016; Cognitive Tutor model tracing.)*

**Teach to mastery and track it.**
- [ ] **Advance only on demonstrated mastery**, not one lucky answer; estimate per-skill mastery continuously in the `LearnerModel`. *(Corbett & Anderson 1995; Bloom 1984 mastery half.)*
- [ ] **Resurface weak skills via spaced review** — and measure retention *after* the tutor's help is removed. *(Spacing; Bastani 2025 — the real metric is unassisted performance.)*

**Use the AutoTutor dialogue template.**
- [ ] **Pre-author expectations + anticipated misconceptions per check**, and *elicit* the expectations rather than stating them. *(Graesser / AutoTutor.)*
- [ ] **On a known wrong answer, fire the specific authored fix** (wrong → why → fix), not a generic "not quite." *(AutoTutor; Classai's `wrongAnswers` structure.)*

**Calibrate help: graduated, faded, never zero / never the answer.**
- [ ] **Escalate help in tiers** — elicit → hint → stronger scaffold / drop a CPA stage → model the step — driven by the director's struggle streak. *(Koedinger & Aleven 2007, assistance dilemma; mid-level help wins.)*
- [ ] **Fade worked support to the individual's mastery** — full worked example → partial → clean problem — and stop modelling for a child who already has it. *(Worked-example effect; expertise-reversal, Salden et al. 2010.)*
- [ ] **Prompt self-explanation after correct answers** ("how did you work it out?"), then fade those prompts. *(Self-explanation / fading.)*

**Keep turns short; one idea at a time.**
- [ ] **Brief tutor speech, one step per turn**, to protect working memory. *(Kestin 2025 — brevity + one step; cognitive load theory.)*

**Guard against the LLM-specific failure modes.**
- [ ] **Judge answers against authored answer-keys, not the model's free opinion** — minimise hallucination teaching a misconception. *(Hallucination-in-tutoring research, L@S 2025.)*
- [ ] **Counter sycophancy: correct wrong answers, never validate them for agreeableness.** Pass/fail is the director's call vs. the key, not the model's mood. *(Sycophancy-as-safety-risk, 2026.)*
- [ ] **Watch for "just tell me" / answer-extraction** and respond by scaffolding down, not complying. *(Over-reliance / metacognitive-laziness research.)*

**Motivation & honesty (carry-over from `pedagogy-core.md`).**
- [ ] **Process praise, honestly; mistakes are information.** Keep difficulty in the ~80%-success band. *(Dweck; Rosenshine success-rate.)*
- [ ] **Be modest in claims.** Realistic ceiling = "as good as a decent human 1:1 tutor," roughly d ≈ 0.4–0.8 — *not* Bloom's 2σ. *(VanLehn 2011; Ma 2014; Kulik & Fletcher 2016; Pane 2014 at-scale shrinkage.)*

**Where the evidence is thin / contested (flag, don't overclaim):**
- Bloom's 2σ is largely an artifact of unequal mastery thresholds and tiny studies — *do not* treat it as a target.
- Independent, rigorous RCT efficacy data for *LLM chatbot tutors with young children* barely exists yet; the design principles transfer from ITS, but the head-to-head proof for ages 5–11 is not in.
- At-scale effects are much smaller than lab effects (Pane 2014), and effect sizes inflate on tutor-aligned tests (Kulik & Fletcher 2016) — be skeptical of large numbers.

---

## 5. References (every source with URL)

**Bloom's 2 sigma & the realistic view**
- Bloom, B. S. (1984). *The 2 Sigma Problem: The Search for Methods of Group Instruction as Effective as One-to-One Tutoring.* Educational Researcher, 13(6). https://journals.sagepub.com/doi/10.3102/0013189X013006004
- "Bloom's 2 sigma problem" — Wikipedia (overview + caveats). https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem
- Nintil, "On Bloom's two sigma problem: A systematic review of the effectiveness of mastery learning, tutoring, and direct instruction." https://nintil.com/bloom-sigma/
- Education Next, "Two-Sigma Tutoring: Separating Science Fiction from Science Fact." https://www.educationnext.org/two-sigma-tutoring-separating-science-fiction-from-science-fact/

**ITS meta-analyses & comparative effectiveness**
- VanLehn, K. (2011). *The Relative Effectiveness of Human Tutoring, Intelligent Tutoring Systems, and Other Tutoring Systems.* Educational Psychologist, 46(4), 197–221. https://www.tandfonline.com/doi/abs/10.1080/00461520.2011.611369 · ERIC: https://eric.ed.gov/?id=EJ946764
- Ma, W., Adesope, O. O., Nesbit, J. C., & Liu, Q. (2014). *Intelligent Tutoring Systems and Learning Outcomes: A Meta-Analysis.* Journal of Educational Psychology, 106(4), 901–918. PDF: https://www.apa.org/pubs/journals/features/edu-a0037123.pdf · ERIC: https://eric.ed.gov/?id=EJ1049508
- Kulik, J. A., & Fletcher, J. D. (2016). *Effectiveness of Intelligent Tutoring Systems: A Meta-Analytic Review.* Review of Educational Research, 86(1), 42–78. https://journals.sagepub.com/doi/abs/10.3102/0034654315581420 · ERIC: https://eric.ed.gov/?id=EJ1090502

**Mechanisms: feedback, mastery, dialogue, assistance, worked examples**
- Roschelle, J., Feng, M., Murphy, R. F., & Mason, C. A. (2016). *Online Mathematics Homework Increases Student Achievement* (ASSISTments efficacy RCT). AERA Open. IES award page: https://nces.ed.gov/use-work/awards/efficacy-study-online-mathematics-homework-support-evaluation-assistments-formative-assessment-and · ASSISTments evidence: https://www.assistments.org/evidence-of-impact
- Ritter, S., Anderson, J. R., Koedinger, K. R., & Corbett, A. (2007). *Cognitive Tutor: Applied research in mathematics education.* https://pact.cs.cmu.edu/koedinger/pubs/Ritter%20Anderson%20Koedinger%20Corbett%202007.pdf
- Pane, J. F., Griffin, B. A., McCaffrey, D. F., & Karam, R. (2014). *Effectiveness of Cognitive Tutor Algebra I at Scale.* Educational Evaluation and Policy Analysis, 36(2). https://journals.sagepub.com/doi/abs/10.3102/0162373713507480 · RAND: https://www.rand.org/pubs/external_publications/EP50410.html · WWC report: https://ies.ed.gov/ncee/wwc/Docs/InterventionReports/wwc_cognitivetutor_062116.pdf
- Graesser, A. C., et al. (2014). *AutoTutor and Family: A Review of 17 Years of Natural Language Tutoring.* IJAIED. https://link.springer.com/article/10.1007/s40593-014-0029-5 · PDF: https://files.eric.ed.gov/fulltext/ED586834.pdf
- Koedinger, K. R., & Aleven, V. (2007). *Exploring the Assistance Dilemma in Experiments with Cognitive Tutors.* Educational Psychology Review, 19. https://link.springer.com/article/10.1007/s10648-007-9049-0 · PDF: https://pact.cs.cmu.edu/pubs/Koedinger%20Aleven%2007.pdf
- Salden, R. J. C. M., Aleven, V., Schwonke, R., & Renkl, A. (2010). *The expertise reversal effect and worked examples in tutored problem solving.* Instructional Science, 38. https://link.springer.com/article/10.1007/s11251-009-9107-8 · PDF: http://www.cee.uma.pt/ron/Salden%20et%20al.%20-%20The%20Expertise%20Reversal%20Effect%20and%20Worked%20Examples.pdf
- Worked-example effect — Wikipedia (overview). https://en.wikipedia.org/wiki/Worked-example_effect · Expertise reversal effect — Wikipedia. https://en.wikipedia.org/wiki/Expertise_reversal_effect

**Recent LLM-tutor research, risks & guardrails**
- Kestin, G., Miller, K., et al. (2025). *AI tutoring outperforms in-class active learning: an RCT introducing a novel research-based design in an authentic educational setting.* Scientific Reports, 15, 17458. https://www.nature.com/articles/s41598-025-97652-6 · Harvard Gazette coverage: https://news.harvard.edu/gazette/story/2024/09/professor-tailored-ai-tutor-to-physics-course-engagement-doubled/
- Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). *Generative AI without guardrails can harm learning: Evidence from high school mathematics.* PNAS, 122. https://www.pnas.org/doi/10.1073/pnas.2422633122 · SSRN: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486 · Wharton summary: https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education/
- Khan Academy / Khanmigo — Socratic-tutor design (does not give answers; guides with questions). https://www.khanmigo.ai/ · Freethink profile: https://www.freethink.com/consumer-tech/khanmigo-ai-tutor
- "When LLMs Hallucinate: Examining the Effects of Erroneous Feedback in Math Tutoring Systems." ACM Learning @ Scale 2025. https://dl.acm.org/doi/10.1145/3698205.3729555
- "Designing Safe and Relevant Generative Chats for Math Learning in Intelligent Tutoring Systems." Journal of Educational Data Mining. https://jedm.educationaldatamining.org/index.php/JEDM/article/download/840/238
- "Sycophancy is an Educational Safety Risk: Why LLM Tutors Need Sycophancy Benchmarks." arXiv (2026). https://arxiv.org/html/2605.14604
- "Beware of Metacognitive Laziness: Effects of Generative AI on Learning Motivation, Processes, and Performance." arXiv (2024). https://arxiv.org/pdf/2412.09315 · Hechinger Report on offloading critical thinking to AI: https://hechingerreport.org/proof-points-offload-critical-thinking-ai/

**GenAI-in-learning meta-analyses (early, directional)**
- Meta-analysis: *Does ChatGPT enhance student learning?* (systematic review & meta-analysis of experimental studies), Computers & Education (2024). https://www.sciencedirect.com/science/article/pii/S0360131524002380
- Meta-analysis: *The impact of GenAI on learning outcomes* (systematic review & meta-analysis), Educational Research Review (2025). https://www.sciencedirect.com/science/article/abs/pii/S1747938X2500051X

> **Verification note:** Effect sizes above are quoted as reported in the named papers / their abstracts and reputable secondary summaries (ERIC, journal pages, RAND, IES WWC). The Kestin study is frequently mis-cited as "PNAS" — it is in *Scientific Reports* (the *Bastani* harm study is the one in PNAS); both are noted correctly here. Independent RCT efficacy evidence for LLM chatbot tutors *with children ages 5–11* is still emerging as of 2026 — flagged as thin in §3.3 and §4.

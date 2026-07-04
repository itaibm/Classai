# Inquiry & problem-based methods

This family covers methods where the learner investigates, questions, and constructs understanding rather than (or before) being told. They are powerful and motivating — and the most commonly **misapplied** family in the whole library. The single most important fact in this file is this:

> **Minimally-guided, discovery-style inquiry fails novices.** Kirschner, Sweller & Clark (2006), "Why minimal guidance during instruction does not work," is the landmark review: for learners who lack the relevant schema, free discovery overloads working memory, lets misconceptions form unchecked, and is reliably beaten by explicit instruction. Inquiry pays off **after** foundations are secure, and only when it is **guided**.

So the rule for ages 5–11 is: **teach the basics explicitly first, then use guided inquiry to deepen, apply, and motivate.** Almost every method below works well *guided* and poorly *unguided*. Each entry says where it sits.

See also: `pedagogy-core.md` §2 (explicit instruction beats discovery for novices), `research-learning-science.md`, and the sibling file `cooperative-and-active-learning.md`.

---

## Inquiry-based learning (the umbrella)

**Family:** Inquiry & problem-based · **Evidence:** mixed — strong when guided and post-foundational (Hmelo-Silver, Duncan & Chinn 2007; Alfieri et al. 2011 meta-analysis: *guided* discovery beats both unguided discovery and pure exposition); weak/negative when minimally guided (Kirschner/Sweller/Clark 2006) · **Best for:** consolidating and applying secured knowledge; science, maths reasoning, humanities; ages 7–11 more than 5–7.

**What it is.** Learning driven by questions, problems, or curiosity, where the child investigates and builds explanations rather than receiving them ready-made. Exists on a spectrum from *structured* (teacher gives the question and method) → *guided* (teacher gives the question, child finds the method) → *open* (child sets their own question).

**Why it works.** Generating and testing one's own ideas creates strong, well-connected memories and high engagement (the generation effect, agency under Self-Determination Theory). The catch: generation only helps if the child has enough prior knowledge to generate *something sensible*; otherwise it generates confusion.

**When to use / when NOT.** Use **after** the relevant facts/skills are explicitly taught and reasonably fluent — to apply, transfer, and motivate. Do **not** use to introduce genuinely new content to novices, and avoid *open* inquiry with under-8s or with any child still shaky on the basics. The younger and less expert the learner, the more guidance they need.

**How to run it (steps).**
1. Confirm the foundation is in place (a quick retrieval check). If it isn't, switch to explicit teaching first.
2. Pose a worthwhile, bounded question with a clear point ("Which paper aeroplane design flies furthest, and why?").
3. Provide structure: materials, a recording method, prompts, and constraints — heavy for novices, lighter as they gain expertise.
4. Let the child investigate while you monitor and intervene at the first sign of a wrong turn.
5. Surface and **consolidate the correct conclusion explicitly** — inquiry must end with the right idea named, not left ambiguous.

**1:1 AI-tutor adaptation.** Inquiry maps to a *guided* arc, not a free-for-all. After the **explain/example** beats have secured the idea, the tutor uses **check/practice** beats to pose a small investigation: the child predicts, the tutor reveals data or an animation (`whiteboard animate:true`, `numberLine`, `emojiViz`), the child explains. The director keeps it bounded — if the struggle streak rises, it falls **back to explicit instruction** (the wrong-answer→remedy loop), because a stuck novice in inquiry mode is the failure case Kirschner warns about. Two-tier memory gates it: only open the inquiry if the `LearnerModel` shows the prerequisite is mastered.

**Primary example.** Science, Year 4, "what affects how fast ice melts": after teaching that heat melts ice, the tutor asks the child to predict which melts faster — ice in a hand vs ice on a plate — then reveals the result and helps them articulate "more contact with warmth = faster melting."

**Pitfalls.** Using inquiry to *introduce* content to novices; never closing the loop so the child leaves with a half-formed or wrong idea; "inquiry theatre" where the answer is obvious and the investigation is decorative.

**Related.** [[guided-vs-open-inquiry]], [[the-5e-learning-cycle]], [[discovery-learning]], [[productive-failure]]

---

## Guided vs open inquiry

**Family:** Inquiry & problem-based · **Evidence:** strong for *guided*; the gradient itself is the key finding (Alfieri et al. 2011) · **Best for:** deciding *how much* scaffolding any inquiry needs.

**What it is.** A four-level scale of who supplies the question, the method, and the answer:
- **Confirmation** — child verifies a known result (question, method, answer all given). Good for procedure practice.
- **Structured** — question + method given; answer open. Good for novices.
- **Guided** — question given; child devises the method. The sweet spot for most primary inquiry.
- **Open** — child poses the question too. For experts/older confident learners only.

**Why it works.** It operationalises scaffolding (`pedagogy-core.md` §8): match support to expertise. As the child's schema strengthens, you release control — exactly the fading that builds independence without overload.

**When to use / when NOT.** Pick the level by the child's current mastery, not by ambition. Default to **structured/guided** for ages 5–11. Reserve **open** for a confident older child on familiar ground. Never jump a novice straight to open inquiry.

**How to run it (steps).**
1. Diagnose mastery of the prerequisite.
2. Choose the lowest level the child can succeed at with ~80% success.
3. Run it; if they succeed easily, step up one level; if they stall, step down.

**1:1 AI-tutor adaptation.** The director already does this implicitly via difficulty banding. Explicitly: a `confirmation` inquiry is a worked check; `structured` gives a `steps`/`wordBank` scaffold; `guided` removes the method scaffold; `open` invites the child to pose their own question (`shortText`). The `assistanceLevel` in working memory should track which rung is active, and fade it across the lesson.

**Primary example.** Maths, Year 5: structured ("Use these counters to find all factor pairs of 24") → guided ("Find every rectangle you can build with 24 squares — what do they tell you about 24?") → open ("Pick a number and investigate its factors; what do you notice?").

**Pitfalls.** Treating "inquiry" as a single thing; always running open inquiry because it sounds most impressive; never releasing past structured so the child never gains autonomy.

**Related.** [[inquiry-based-learning-the-umbrella]], [[zpd-scaffolding-and-fading]] (in `mastery-and-personalised.md`)

---

## The 5E learning cycle

**Family:** Inquiry & problem-based · **Evidence:** moderate — widely used in science education (Bybee/BSCS); effective when the *Explain* phase includes real instruction · **Best for:** science topics, ages 7–11; structuring a single inquiry lesson or a short unit.

**What it is.** A five-phase cycle: **Engage** (hook, surface prior ideas) → **Explore** (hands-on investigation) → **Explain** (teacher formalises the correct concept and vocabulary) → **Elaborate** (apply to a new context) → **Evaluate** (assess understanding).

**Why it works.** It sequences curiosity and exploration *before* formal explanation, so the explanation lands on prepared ground (a "time for telling" — Schwartz & Bransford). Crucially, the **Explain** phase is explicit teaching: 5E is guided inquiry with telling built in, which is why it works where pure discovery doesn't.

**When to use / when NOT.** Excellent default skeleton for a primary science lesson once basics exist. Don't skip or weaken **Explain** — a 5E lesson that never names the correct concept collapses into discovery learning.

**How to run it (steps).**
1. **Engage:** a vivid phenomenon or question; elicit the child's current thinking.
2. **Explore:** a short, structured investigation.
3. **Explain:** *you* state the correct concept and vocabulary, reconciling it with what they saw.
4. **Elaborate:** apply it to a fresh case.
5. **Evaluate:** check understanding.

**1:1 AI-tutor adaptation.** 5E maps almost one-to-one onto the beats: Engage→**hook**, Explore→**example** (a tutor-run mini-investigation with a `whiteboard`/`emojiViz`), Explain→**explain** (think-aloud naming the concept), Elaborate→**practice** (new context), Evaluate→**check**/**recap**. Note the reorder: with 5E the tutor lets the child *explore/predict first*, then the **explain** beat formalises it — a legitimate variation the planner can choose for science.

**Primary example.** Science, Year 3, "what plants need to grow": Engage (two plants, one thriving one wilting — why?), Explore (predict what's different), Explain (light + water + warmth, named), Elaborate (predict a plant in a cupboard), Evaluate (a check).

**Pitfalls.** Hollowing out **Explain** into "so what did *you* think?"; stretching all 5 phases into one short lesson and rushing each.

**Related.** [[predict-observe-explain]], [[the-scientific-method-as-a-teaching-method]], [[5e]]

---

## Discovery learning

**Family:** Inquiry & problem-based · **Evidence:** **mixed-to-negative for pure discovery; positive only for *guided* discovery** (Mayer 2004 "Should there be a three-strikes rule against pure discovery learning?"; Alfieri et al. 2011) · **Best for:** narrow, well-scaffolded "noticing" moments — never as a primary teaching strategy for novices.

**What it is.** Letting children find principles for themselves through exploration, with minimal telling. *Pure* discovery gives almost no guidance; *guided* discovery gives carefully chosen prompts, feedback, and worked support.

**Why it works (and when it doesn't).** The appeal is agency and the generation effect. But three decades of evidence (Mayer 2004) show **pure** discovery underperforms because novices flounder, form misconceptions, and miss the point. **Guided** discovery — direction plus feedback at the moment of insight — is what actually helps. The difference is guidance, not "discovery" itself.

**When to use / when NOT.** Use only in a tightly-bounded, scaffolded form for a quick "notice the pattern" moment with adequate prior knowledge. **AVOID pure/unguided discovery as a teaching method**, especially for under-8s and for anything genuinely new. This is the classic fad to resist: "let them discover it" sounds child-centred but reliably wastes time and breeds error.

**How to run it (steps).**
1. Pre-teach the components the child needs to notice the pattern.
2. Arrange examples so the pattern is salient.
3. Prompt the noticing ("What do you see happening each time?").
4. Confirm and name the principle explicitly the moment they spot it.

**1:1 AI-tutor adaptation.** The tutor uses *guided* discovery only: it arranges a `whiteboard`/`numberLine` so a pattern pops out, asks the child what they notice, and — critically — **names the rule immediately** rather than leaving them to flounder. If the child doesn't see it within one or two prompts, the director switches to direct explanation (remedy loop). The tutor never runs an open-ended "go find out" with no support.

**Primary example.** Maths, Year 2: tutor shows 2+4=6, 4+2=6, 3+5=8, 5+3=8 and asks "what do you notice when we swap the numbers?" — guiding the child to the commutative idea, then names it.

**Pitfalls.** Confusing guided with pure discovery; using it for novices; leaving the principle un-named.

**Related.** [[inquiry-based-learning-the-umbrella]], [[productive-failure]] (a disciplined cousin), [[discovery]]

---

## Problem-based learning (PBL)

**Family:** Inquiry & problem-based · **Evidence:** moderate — effective for applying and integrating knowledge and for long-term retention and motivation; *less* efficient than direct instruction for first acquisition of facts (Hmelo-Silver 2004; Dochy et al. 2003) · **Best for:** applying secured knowledge to a realistic problem; ages 8–11.

**What it is.** Learning organised around solving an authentic, ill-structured problem. The problem comes first; the child identifies what they need to know, learns it, and applies it. (Distinct from project-based learning — PBL centres a *problem*; the product is the solution/reasoning.)

**Why it works.** Anchoring knowledge to a meaningful problem improves transfer and retention and recruits motivation. But because learners must *first* acquire the underlying knowledge, PBL is an application/integration method, not an acquisition method.

**When to use / when NOT.** Use to consolidate and apply a unit's worth of secured knowledge. Don't use it to teach foundational facts from scratch (inefficient and overloading for novices). Provide strong facilitation for primary-age children.

**How to run it (steps).**
1. Present a real, bounded problem ("Plan a healthy packed lunch for under £2").
2. Help the child list what they know and what they need to find out.
3. Support the learning of the needed pieces (mini-explanations as required).
4. Child applies it to solve the problem.
5. Debrief: what was learned, and name the transferable principles.

**1:1 AI-tutor adaptation.** The tutor frames a whole lesson around one problem as the **hook**, then provides just-in-time **explain** beats as the child hits each knowledge gap, with **practice** being the application. The wrong-answer→remedy loop handles gaps; two-tier memory checks the child has the prerequisites before launching a PBL lesson, and feeds the applied success into the mastery map.

**Primary example.** Maths/Life-skills, Year 5: "Our class wants a pet fish. Work out the total setup cost and whether £40 is enough." — drives addition, money, and reasoning toward a real answer.

**Pitfalls.** Choosing a problem beyond the child's knowledge base; letting it sprawl with no resolution; mistaking busywork for problem-solving.

**Related.** [[project-based-learning]], [[case-method]], [[design-thinking]], [[pbl]]

---

## Project-based learning

**Family:** Inquiry & problem-based · **Evidence:** promising — gains in engagement, application, and some achievement when well-structured (Gold Standard PBL, PBLWorks; Thomas 2000 review) · **Best for:** extended cross-curricular work; producing a tangible artefact; ages 7–11.

**What it is.** Sustained learning organised around creating a meaningful **product** (a model, a guide, a presentation, a campaign) over days or weeks, integrating multiple skills.

**Why it works.** A genuine audience and outcome supply purpose (relatedness + competence), and the extended timescale allows real depth and revision. Like PBL, it *applies* knowledge — the teaching of skills must still happen alongside, not be assumed.

**When to use / when NOT.** Use for consolidation, transfer, and motivation across a unit. Don't let "doing the project" replace teaching the skills it needs; budget explicit instruction within it. Watch that the child, not the tutor/parent, does the cognitive work.

**How to run it (steps).**
1. Define a driving question and a real product/audience.
2. Break it into milestones; teach the needed skills at each.
3. Build in checkpoints, feedback, and revision (not just a final reveal).
4. Public sharing of the product.
5. Reflect on both product and process.

**1:1 AI-tutor adaptation.** A project spans **multiple sessions**: the tutor uses the two-tier memory to track milestones across lessons, opens each session with a recap of progress, teaches the needed micro-skill (full beat arc), and logs the artefact's state. The avatar acts as collaborator/audience. Best surfaced as a multi-lesson Topic, not a single lesson.

**Primary example.** History/English, Year 4: "Make a museum guide for the Egyptians exhibit" — researched, written, and presented over several sessions, with writing and history taught along the way.

**Pitfalls.** Product over learning (great poster, little thinking); no formative checkpoints; the adult doing the hard parts.

**Related.** [[problem-based-learning-pbl]], [[design-thinking]], [[phenomenon-based-learning]]

---

## Phenomenon-based learning

**Family:** Inquiry & problem-based · **Evidence:** promising — popularised in Finland; coherent with anchored instruction; limited large-scale effect data · **Best for:** integrating subjects around a real-world phenomenon; ages 8–11.

**What it is.** Organising learning around a real, holistic **phenomenon** (rain, the local river, migration, a festival) studied through whatever subjects it touches, dissolving subject boundaries.

**Why it works.** Real phenomena are inherently meaningful and naturally cross-disciplinary, supporting transfer and relevance. Same caveat as all inquiry: the constituent skills must still be taught.

**When to use / when NOT.** Good for connecting subjects and showing knowledge in the wild, especially in home-ed where subject silos are flexible. Don't let breadth crowd out depth or skill instruction.

**How to run it (steps).**
1. Choose a rich, locally-relevant phenomenon.
2. Map which subjects it naturally invites.
3. Pose questions; teach the needed skills per subject as they arise.
4. Synthesise into an account of the phenomenon.

**1:1 AI-tutor adaptation.** The phenomenon becomes a recurring **hook theme** linking several lessons across subjects (the tutor can tag lessons to a shared phenomenon in memory), letting the child's interest carry through maths, science, and writing about the same thing.

**Primary example.** "Our local river": geography (where it flows), science (the water cycle), maths (measuring flow/width), English (a descriptive poem) — across a week.

**Pitfalls.** A mile wide and an inch deep; losing the thread that skills must be explicitly taught.

**Related.** [[project-based-learning]], [[inquiry-based-learning-the-umbrella]]

---

## Case method

**Family:** Inquiry & problem-based · **Evidence:** moderate — long pedigree in professional education; adapts to primary as scenario/story discussion · **Best for:** reasoning, ethics, decision-making, comprehension; ages 8–11.

**What it is.** Learning by analysing a concrete case or scenario — a story, a dilemma, a real situation — and reasoning about it, rather than studying abstract rules first.

**Why it works.** Concrete cases give abstract principles something to attach to and force the application of judgement. The discussion surfaces reasoning that can be examined and corrected.

**When to use / when NOT.** Use for topics where judgement matters (a moral choice, a character's decision, a historical "what would you do?"). Less suited to procedural skills (number bonds need practice, not debate).

**How to run it (steps).**
1. Present a vivid, relatable case.
2. Ask the child to take a position and justify it.
3. Probe with "why / how do you know / what if".
4. Introduce complicating facts.
5. Draw out the transferable principle.

**1:1 AI-tutor adaptation.** The tutor presents the case as a `richText`/`slideshow` **hook**, then runs a Socratic **check** loop via `shortText`/`speak` with `answerEval`, probing reasoning. The avatar can voice a character. The two-tier memory notes the child's reasoning quality, not just a right/wrong answer.

**Primary example.** PSHE/English, Year 4: "Sam found £5 in the playground. What should Sam do, and why?" — reasoning about honesty with no single 'sum' answer.

**Pitfalls.** A case with an obvious answer (no reasoning happens); accepting a position without demanding justification.

**Related.** [[socratic-seminar]], [[role-play-and-simulation]] (in `cooperative-and-active-learning.md`)

---

## Socratic seminar / Socratic questioning

**Family:** Inquiry & problem-based · **Evidence:** moderate — questioning that demands reasoning improves comprehension and metacognition (links to EEF metacognition +7mo) · **Best for:** discussion of texts and ideas; reasoning; ages 8–11.

**What it is.** Teaching by structured questioning rather than telling: the teacher asks progressively probing questions ("What do you mean? How do you know? What follows? What's an example? What's a counterexample?") that lead the learner to examine and refine their own thinking.

**Why it works.** It forces articulation and justification, exposing gaps and building metacognition. The learner does the reasoning; the questions shape it.

**When to use / when NOT.** Excellent for deepening understanding the child already half-has, for comprehension and reasoning. Poor for delivering brand-new factual content (you can't question someone into facts they've never met) and frustrating if pitched above the child's knowledge.

**How to run it (steps).**
1. Start from the child's stated idea or answer.
2. Ask one clarifying or probing question at a time.
3. Follow their reasoning, not a script.
4. Let them revise; confirm the refined understanding.

**1:1 AI-tutor adaptation.** This is the tutor's native questioning mode in **check** beats and after *any* answer (right or wrong): "How did you get that?" The director caps the depth so it stays supportive, not interrogative; if the child is lost rather than refining, it switches to telling. `speak`/`shortText` capture the reasoning for `answerEval`.

**Primary example.** English, Year 5: after "The wolf is the villain," — "What makes you say that? Is there a moment where the wolf isn't villainous? How would the pigs tell this story?"

**Pitfalls.** Turning it into a guess-what-I'm-thinking game; questioning a child who simply lacks the knowledge (frustration, not insight); too many questions in a row (feels like an interrogation).

**Related.** [[case-method]], [[predict-observe-explain]], questioning methods (Part 1)

---

## Predict–observe–explain (POE)

**Family:** Inquiry & problem-based · **Evidence:** strong for confronting misconceptions in science (White & Gunstone 1992) · **Best for:** science demonstrations; surfacing and fixing misconceptions; ages 6–11.

**What it is.** A three-step routine: the child **predicts** what will happen, then **observes** the actual outcome, then **explains** any gap between the two.

**Why it works.** Committing to a prediction creates a stake and exposes the child's mental model; a surprising observation produces *cognitive conflict* that makes them ready to revise. The explain step forces them to reconcile model and reality. Prediction also primes attention (a "hypothesis-driven" looking).

**When to use / when NOT.** Ideal where children hold a sticky intuition that's wrong (heavier things fall faster; the sun moves). Needs an observable, surprising-enough outcome. Less useful where there's nothing to observe.

**How to run it (steps).**
1. Set up the situation; ask for a committed prediction *and reason*.
2. Reveal/run the observation.
3. If prediction ≠ reality, name the surprise and ask them to explain.
4. Consolidate the correct model explicitly.

**1:1 AI-tutor adaptation.** A natural **check→reveal→remedy** sequence: the tutor asks the prediction (`multipleChoice`/`numberEntry`), reveals via `whiteboard animate:true` or a described outcome, then runs the explain. A wrong prediction is *welcome* — it's the entry to the remedy loop, and the misconception gets logged to the `LearnerModel`.

**Primary example.** Science, Year 3, "will a big coin or a small feather hit the ground first if dropped together?" — predict, observe (or watch a clip), explain why weight isn't the deciding factor at this scale.

**Pitfalls.** Skipping the *reason* for the prediction; a dull, unsurprising outcome; not consolidating the right model at the end.

**Related.** [[the-5e-learning-cycle]], [[the-scientific-method-as-a-teaching-method]], [[productive-failure]]

---

## The scientific method as a teaching method

**Family:** Inquiry & problem-based · **Evidence:** moderate — teaches the *process* of science; effective when each sub-skill is explicitly taught (fair testing, variables) · **Best for:** science enquiry skills (working scientifically); ages 7–11.

**What it is.** Using the question → hypothesis → fair test → measure → conclude cycle as the structure for learning, so children learn science by *doing* enquiry, not only memorising facts.

**Why it works.** It teaches the transferable skills of evidence and reasoning (controlling variables, fair testing) that facts alone don't. But each sub-skill (what a fair test is, how to control a variable) must be **explicitly taught** — children don't induce these reliably on their own.

**When to use / when NOT.** Use to develop "working scientifically" skills alongside content. Don't assume children grasp fair testing or variables without direct teaching — that's the common failure.

**How to run it (steps).**
1. Pose a testable question.
2. Explicitly teach/recall the relevant enquiry skill (e.g. "change one thing, keep the rest the same").
3. Plan a fair test together.
4. Measure and record.
5. Conclude, and judge whether the test was fair.

**1:1 AI-tutor adaptation.** The tutor scaffolds one enquiry sub-skill per lesson as the **explain** focus (e.g. fair testing), then runs a small designed test in **example/practice** with the child choosing variables (`categorize`, `multipleChoice`), and the `LearnerModel` tracks enquiry skills separately from content knowledge.

**Primary example.** Science, Year 4, "which surface lets a toy car roll furthest?" — identify the one thing to change (surface), keep ramp height the same, measure, conclude.

**Pitfalls.** Teaching the *steps* as a rote ritual without the reasoning; leaving "fair test" undefined; one-trial conclusions.

**Related.** [[predict-observe-explain]], [[the-5e-learning-cycle]], [[design-thinking]]

---

## Design thinking

**Family:** Inquiry & problem-based · **Evidence:** promising — popular in D&T/computing; develops problem-framing and iteration; limited rigorous effect data at primary · **Best for:** design & technology, computing, creative problem-solving; ages 8–11.

**What it is.** A human-centred problem-solving cycle: **empathise → define → ideate → prototype → test → iterate.** Children design a solution for a real user and improve it through cycles.

**Why it works.** It legitimises iteration and "first attempts are rough," supporting a growth mindset and resilience, and centres a real user (relatedness/purpose). Like all inquiry, the needed skills must be taught within it.

**When to use / when NOT.** Use for open-ended making/designing tasks with a real user in mind. Don't use where there's a single correct method to be learned (it's for ill-structured design problems, not arithmetic).

**How to run it (steps).**
1. Empathise: who is this for, what do they need?
2. Define the problem in one sentence.
3. Ideate several options.
4. Prototype the most promising.
5. Test with the user; iterate.

**1:1 AI-tutor adaptation.** The tutor runs the cycle across **practice** beats, with the avatar role-playing the "user" giving feedback. Iteration maps perfectly to the remedy loop: test → feedback → revise. Best as a multi-beat or multi-session project; memory tracks iterations.

**Primary example.** D&T/Computing, Year 5: "Design a better pencil case for a younger sibling who keeps losing pens" — interview (role-play), sketch options, build/describe a prototype, get the avatar-user's feedback, improve.

**Pitfalls.** Skipping empathise/define and jumping to building; one-and-done with no iteration; treating it as crafts with no thinking.

**Related.** [[project-based-learning]], [[the-scientific-method-as-a-teaching-method]], [[productive-failure]]

---

## Productive failure (Kapur)

**Family:** Inquiry & problem-based · **Evidence:** strong and important — Kapur (2008, 2012, 2016): *structured* attempt-then-instruction beats instruction-then-practice for deeper, transferable understanding, **under specific conditions** · **Best for:** maths and science concepts; building deep understanding and transfer; ages 9–11 (and confident 8s).

**What it is.** Deliberately letting the child struggle with a challenging problem *before* being taught the method — generating their own (often flawed) approaches — and then giving the canonical instruction, which now lands with far richer understanding. The failure is *productive* because it primes learning, not because struggle is good per se.

**Why it works.** The struggle activates prior knowledge, reveals the problem's deep structure, and creates "time for telling" — so the subsequent explicit instruction is understood, not just received. It's the disciplined, *guided* cousin of discovery learning: failure is planned, bounded, and **always followed by explicit consolidation.**

**When to use / when NOT.** Use for *conceptual* learning where exploring the problem space pays off, with a child who has enough prior knowledge to generate ideas (typically 9–11). The non-negotiable conditions: (a) the problem is challenging but accessible, (b) the child generates multiple approaches, (c) **explicit instruction follows** and consolidates. Without the consolidation it's just failure. Don't use it to introduce procedures to true novices, and don't use it with under-8s or anxiety-prone learners without care.

**How to run it (steps).**
1. Pose a rich problem just beyond current method ("Which is the better deal: 3 for £2 or 5 for £3?" before teaching unit rate).
2. Let the child generate and attempt their own approaches — value the attempts, don't rescue too soon.
3. Collect what they tried, including the flawed bits.
4. **Now teach** the canonical method, explicitly connecting it to their attempts.
5. Consolidate and apply.

**1:1 AI-tutor adaptation.** A deliberate inversion of the beats for a chosen lesson: **practice-before-explain.** The director sets `assistanceLevel` low and *tolerates* a higher struggle streak for a bounded window (it doesn't trigger the remedy loop immediately — the struggle is the point), then pivots to a strong **explain** beat that references the child's own attempts (stored in working memory). Use only when the `LearnerModel` shows solid prerequisites; otherwise fall back to explicit-first. This is the one place the tutor intentionally relaxes its "high success rate" rule — briefly and on purpose.

**Primary example.** Maths, Year 6: before teaching averaging, give "Three children scored 4, 8, 6 — what single number best represents the team?" Let them invent (pick the middle? the most? add them?), then teach the mean as the principled answer, connecting to their guesses.

**Pitfalls.** Omitting the consolidating instruction (the most common and fatal error — then it's just unproductive failure); using it with novices who can't generate anything; letting the struggle run too long into frustration; using it for procedures rather than concepts.

**Related.** [[discovery-learning]], [[inquiry-in-maths-low-floor-high-ceiling]], [[the-assistance-dilemma]] (in `mastery-and-personalised.md`)

---

## Inquiry in maths — low-floor / high-ceiling tasks (NRICH-style)

**Family:** Inquiry & problem-based · **Evidence:** promising — strong practitioner base (NRICH/University of Cambridge, Boaler's mathematical mindsets); develops reasoning and resilience · **Best for:** maths reasoning, fluency-with-understanding, differentiation; ages 5–11 (the format scales).

**What it is.** Rich maths tasks with a **low floor** (every child can start) and a **high ceiling** (it extends far), often with multiple solutions or strategies. The child explores, conjectures, justifies — doing mathematics, not just answers.

**Why it works.** A low entry point keeps everyone in the productive zone (success → competence → motivation), while the high ceiling stretches the able without separate tasks — natural differentiation. Open middles develop reasoning, pattern-spotting, and justification, the things drill misses. Works best *after* the relevant number facts are fluent, so working memory is free for reasoning.

**When to use / when NOT.** Use to build reasoning and apply secured facts; superb for a single learner because it self-differentiates by depth. Don't use it as a substitute for fact fluency (a child still counting on fingers will drown in the reasoning) — fluency first, then richness.

**How to run it (steps).**
1. Pose an accessible starter everyone can attempt ("Find two numbers that add to 10").
2. Invite extension ("How many ways? What if it's 20? What if you can use three numbers?").
3. Press for *noticing*, conjecture, and *why* — not just answers.
4. Compare strategies; name the mathematics.

**1:1 AI-tutor adaptation.** Ideal for the tutor's **practice** beat because it self-differentiates: the director sets the entry low, then dials the ceiling via follow-up prompts based on success (the difficulty band rises as the child succeeds). `shortText`/`speak` capture conjectures for `answerEval`; the `LearnerModel` records reasoning, not just correctness. The "what do you notice / what's the same, what's different?" prompts are the tutor's reasoning workhorses.

**Primary example.** Maths, Year 3, "Make 24" (NRICH-style): "Using +, −, × on 2, 3, 4, can you make 24? What other numbers can you make? Which can't you make?" — every child starts; the able go far.

**Pitfalls.** Using rich tasks before fact fluency (reasoning capacity is eaten by computation); accepting answers without "why"; a "high ceiling" the tutor never actually raises.

**Related.** [[productive-failure]], [[guided-vs-open-inquiry]], maths representation methods (Part 1: CPA, bar models)

---

## Summary: when does inquiry work?

A one-screen decision aid for the tutor and teacher:

- **Is the content new to this child?** → Teach it **explicitly first** (`pedagogy-core.md` §2). Inquiry is not for first acquisition.
- **Are the prerequisites fluent (free working memory)?** → If no, build fluency first; inquiry will overload them.
- **Is the child 5–7, or anxiety-prone?** → Stay **structured/guided**; avoid open inquiry and unbounded struggle.
- **Foundations secure, child 8–11, goal is depth/transfer/motivation?** → **Now** guided inquiry, PBL, POE, low-floor-high-ceiling, or productive failure shine.
- **Whatever you run, does it END with the correct idea named and consolidated?** → If not, you've done discovery learning, and it will have failed the way Kirschner/Sweller/Clark predict.

The throughline: **guidance + secured foundations + explicit consolidation** is what separates inquiry that works from inquiry that wastes a child's time.

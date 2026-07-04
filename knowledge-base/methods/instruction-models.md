# Instruction models — lesson-design & instructional frameworks

This family covers the **named models for designing and delivering a lesson**: how to sequence what you teach, how much to model vs release, and how to structure a unit. These are the skeletons Classai's beat structure (hook → explain → example → check → practice → recap) hangs on. They overlap heavily and reinforce each other — most good lessons quietly use several at once. Don't duplicate [`pedagogy-core.md`](../teaching/pedagogy-core.md); this is the deeper catalogue of *named* models with their own evidence and running steps.

> Orientation: for **introducing genuinely new content to novices** (the usual case for ages 5–11), explicit/direct models win. Inquiry-style models earn their place later, once the child has the foundational knowledge to inquire *with* — see [`../methods/questioning-and-dialogue.md`] and the inquiry family.

---

## Direct / Explicit Instruction

**Family:** Instruction models · **Evidence:** strong — (EEF "Explicit instruction" cited across; Project Follow Through; Rosenshine 2012; Kirschner, Sweller & Clark 2006) · **Best for:** introducing any new skill or concept to novices, all ages, all subjects — especially foundational maths and early reading.

**What it is.** The teacher clearly states the goal, breaks the content into small steps, models each step, and checks understanding constantly — leaving as little as possible to be guessed or inferred. "Explicit" means the thing to be learned is *shown*, not discovered.

**Why it works.** Novices have no schema to organise new information, so unguided exploration overloads working memory and often teaches the wrong thing. Explicit teaching minimises extraneous load and feeds knowledge in digestible, checkable pieces (cognitive load theory).

**When to use / when NOT.** Use whenever content is new or the child lacks prerequisites. NOT a licence to lecture — it is *interactive*, with checks every minute or two. Avoid pure explicit drill once a skill is secure and the child is ready to apply it more openly.

**How to run it (steps).**
1. State the learning goal in child language ("Today you'll add two numbers that cross ten").
2. Review the named prerequisite (quick retrieval).
3. Teach **one** small step; model it with a think-aloud.
4. Check immediately; do not advance on silence or a guess.
5. Repeat step-by-step, success rate ~80%.
6. Consolidate and connect back to the goal.

**1:1 AI-tutor adaptation.** This is Classai's default spine. The *explain* beat is the model, every *check* beat is the constant questioning, and the director's "learner is stuck" state enforces the no-advance-on-failure rule. Keep one idea per turn; lean on the block tool-belt (`steps`, `whiteboard`) to externalise each small step. The pre-authored `wrongAnswers → remedy` loop is the explicit correction built in.

**Primary example.** Maths, Year 2 — column addition without carrying: state goal, recall number bonds, model "ones first, then tens" on a `whiteboard`, child does one with you, then one alone via `numberEntry`.

**Pitfalls.** (1) Turning it into a monologue with no checks. (2) Steps too big — if the child misses twice, the step was the problem, not the child. (3) Never releasing to independent practice.

**Related.** [[Gradual Release of Responsibility]], [[Rosenshine's Principles of Instruction]], [[Engelmann Direct Instruction (DISTAR)]], [[Madeline Hunter lesson cycle]].

---

## Gradual Release of Responsibility (I do / we do / you do)

**Family:** Instruction models · **Evidence:** strong — (Pearson & Gallagher 1983; Fisher & Frey 2008; aligns with EEF metacognition + scaffolding) · **Best for:** any skill that the child must eventually perform independently; all ages.

**What it is.** Responsibility for the task transfers from teacher to child in three phases: **I do** (teacher models), **we do** (shared attempt), **you do** (independent practice). Often a fourth phase, *you do together* (peer work), exists in classrooms but collapses to we-do/you-do in 1:1.

**Why it works.** It matches scaffolding to the child's growing competence: heavy support exactly when they need it, removed exactly as they can take over. The "we do" phase catches errors before they're practised wrong.

**When to use / when NOT.** Use for procedural and conceptual skills alike. NOT when the child already owns the skill (skip to you-do) — and never skip straight to you-do for new content, the commonest failure.

**How to run it (steps).**
1. **I do:** model the whole skill with a think-aloud; child only watches.
2. **We do:** do it together on a near-identical item; child contributes the next step, you catch slips instantly.
3. **You do:** child does one alone; you observe and diagnose.
4. Fade further across the lesson and across sessions.

**1:1 AI-tutor adaptation.** Maps literally onto the beats: *explain* = I do, *example* = we do, *practice* = you do. The director should not let a lesson end without reaching a genuine unsupported "you do." Use heavy scaffolds (`wordBank`, sentence starters, partial worked example) in we-do and strip them in you-do; the two-tier memory records whether the child reached independence so the next lesson can start at the right release point.

**Primary example.** English, Year 1 — capital letters: I-do "watch me fix 'the dog ran'", we-do "your turn to help me fix 'my cat sleeps'", you-do `fillBlank` "fix 'sam likes jam'".

**Pitfalls.** (1) Skipping I-do or we-do. (2) Staying in I-do forever (over-modelling). (3) Treating the phases as fixed-length rather than evidence-driven.

**Related.** [[Direct / Explicit Instruction]], [[Worked-example & faded guidance]], [[Demonstration / modelling]], [[Rosenshine's Principles of Instruction]].

---

## Rosenshine's Principles of Instruction

**Family:** Instruction models · **Evidence:** strong — (Rosenshine 2012, "Principles of Instruction"; synthesis of process–product, cognitive science, and master-teacher research) · **Best for:** a checklist for designing *any* explicit lesson; all ages/subjects.

**What it is.** Ten research-backed principles of what effective teachers do: short daily review; small steps with practice; many questions; models; guided practice; checks for understanding; ~80% success; scaffolds for hard tasks; independent practice; weekly/monthly review.

**Why it works.** Each principle protects working memory or strengthens long-term memory: review activates prior knowledge, small steps limit load, questioning forces retrieval, the 80% band keeps difficulty productive, spaced review consolidates.

**When to use / when NOT.** Use as the design heuristic behind explicit lessons. It is not itself a lesson *script* — it's the set of properties a good script has. Less central for open creative tasks where exploration is the point.

**How to run it (steps).**
1. Open with a short review (retrieval) of prior learning.
2. Present new material in small steps, practising after each.
3. Ask many questions; check every response.
4. Model with worked examples/think-alouds.
5. Guide initial practice heavily; aim for ~80% success.
6. Provide scaffolds for hard tasks, then fade.
7. Require independent practice; revisit weekly/monthly.

**1:1 AI-tutor adaptation.** These ten map onto Classai's whole loop: review = hook retrieval; small steps + questions = the explain/check rhythm; 80% success = the director's difficulty target (miss twice → shrink the step; trivially right → raise it); weekly/monthly review = the spaced-review scheduler. Treat "obtain a high success rate" as a live control signal, not a nicety.

**Primary example.** Maths, Year 3 — bridging through ten (27 + 5): review 7+5, teach "make the next ten," model splitting 5 into 3+2, guided 28+4, check, aim 80%.

**Pitfalls.** (1) Cherry-picking models/questions but dropping review and the success band. (2) Reading it as "lecture more." (3) Forgetting principle 10 — the spaced review.

**Related.** [[Direct / Explicit Instruction]], [[Gradual Release of Responsibility]], [[../methods/retrieval-and-memory|retrieval & spacing]], [[Madeline Hunter lesson cycle]].

---

## Madeline Hunter lesson cycle (ITIP / Elements of Effective Instruction)

**Family:** Instruction models · **Evidence:** moderate — (Hunter 1982; widely adopted, weaker direct-effect evidence than Rosenshine; sound when used flexibly) · **Best for:** a clear, beginner-friendly lesson template; all ages.

**What it is.** A seven-element lesson template: **anticipatory set** (hook), **objective & purpose**, **input**, **modelling**, **check for understanding**, **guided practice**, **independent practice** (with closure). Elements need not all appear or stay in order.

**Why it works.** It bundles several evidence-based moves (hook, stated objective, modelling, checking, guided→independent practice) into one memorable sequence — essentially a packaged gradual-release plan.

**When to use / when NOT.** Good scaffolding for planning a single explicit lesson. NOT a rigid checklist — Hunter herself warned against treating all seven as mandatory every time; forcing them produces stilted lessons.

**How to run it (steps).**
1. Anticipatory set: a quick hook that primes the topic.
2. State objective and why it matters.
3. Input: teach the new content.
4. Model it.
5. Check for understanding.
6. Guided practice (you do it together).
7. Independent practice + closure (recap).

**1:1 AI-tutor adaptation.** Almost a one-to-one map onto Classai's beats: anticipatory set = hook, input+modelling = explain/example, check = check, guided/independent practice = practice, closure = recap. Use it as a sanity check that a generated plan has all the load-bearing beats — but let the director collapse or reorder elements responsively rather than march through all seven.

**Primary example.** Science, Year 2 — materials: hook "which of these would you build a boat from?", objective, input on waterproof/strong, model sorting, check, guided sort, independent `dragDrop` sort, recap.

**Pitfalls.** (1) Treating all seven as compulsory. (2) Stating the objective then never checking it. (3) Skipping guided practice between modelling and independent work.

**Related.** [[Gradual Release of Responsibility]], [[Rosenshine's Principles of Instruction]], [[Mini-lessons]].

---

## The 5E instructional model (Engage, Explore, Explain, Elaborate, Evaluate)

**Family:** Instruction models · **Evidence:** moderate — (BSCS, Bybee 2006; strong in science when explanation is well-guided; weaker if "Explore" becomes unguided discovery) · **Best for:** science and concept-rich topics where a short hands-on phase precedes explanation; ages 7–11 more than 5–7.

**What it is.** A five-phase cycle: **Engage** (hook curiosity), **Explore** (brief hands-on investigation), **Explain** (teacher formalises the concept), **Elaborate** (apply to a new context), **Evaluate** (assess). It's a structured-inquiry model — exploration is *framed*, not free.

**Why it works.** A short, guided exploration creates a "need to know" and generates concrete experiences for the Explain phase to label — productive *if* Explain does real teaching and Explore is tightly bounded.

**When to use / when NOT.** Best in science and where a quick concrete experience aids understanding. NOT for foundational skills with novices where Explore-first becomes guess-and-flounder — see AVOID note on discovery below. Keep Explore short and scaffolded for young children.

**How to run it (steps).**
1. **Engage:** a question/phenomenon that hooks.
2. **Explore:** a brief, guided activity producing observations.
3. **Explain:** teach the concept explicitly, naming what they saw.
4. **Elaborate:** apply it to a new situation.
5. **Evaluate:** check understanding.

**1:1 AI-tutor adaptation.** Map Engage→hook, a short Explore via an interactive block (`emojiViz`, `dragDrop`, a predict-then-see), Explain→explain, Elaborate→a transfer practice item, Evaluate→check. Crucially, keep Classai's "explain does the teaching" rule: the Explore is a 30–60s primed observation, not a discovery quest. If the child flounders in Explore, the director cuts to Explain.

**Primary example.** Science, Year 4 — states of matter: engage "what happens to an ice lolly you forget?", explore predict-and-watch melting, explain solid→liquid, elaborate "what about chocolate?", evaluate sort items.

**Pitfalls.** (1) Letting Explore run as open discovery and skimping on Explain. (2) Using it for skills that need direct instruction. (3) Long phases that exhaust a young child before Explain.

**Related.** [[Concept Attainment]], [[Advance Organisers (Ausubel)]], the inquiry family.

---

## Backward Design (Understanding by Design — Wiggins & McTighe)

**Family:** Instruction models · **Evidence:** moderate — (Wiggins & McTighe 1998; strong design logic; effect depends on execution) · **Best for:** *planning* a topic or unit before any lesson is run; all ages/subjects.

**What it is.** Plan in three stages, end-first: (1) identify desired **results** (what mastery looks like), (2) decide **acceptable evidence** (how you'll know they got it), (3) plan the **learning activities** that get them there. You design the destination and the test of arrival before the route.

**Why it works.** It prevents "activity-oriented" teaching (fun tasks with no learning target) and "coverage" teaching (racing through content). Every activity is justified by the evidence and goal it serves.

**When to use / when NOT.** Use at the *syllabus/topic* level, not turn-by-turn. NOT a live-teaching method — it's a planning discipline. Overkill for a single 10-minute retrieval session.

**How to run it (steps).**
1. Name the enduring understanding / goal for the topic.
2. Define what evidence (a check, a task, a transfer problem) would prove it.
3. Only then design the sequence of lessons/activities.
4. Build each check to align with the goal.

**1:1 AI-tutor adaptation.** This is exactly Classai's **syllabus → analysis → plan** pipeline read backwards: the analysis pass names key concepts (results) and the plan's `BeatCheck` questions are the *evidence*, authored to match the goal. Grounding files supply pre-vetted checks so the "evidence" is well-aligned, not invented. Use backward design to ensure every topic's checks actually test the topic's stated key concept, not a tangent.

**Primary example.** History, Year 5 — "Why did people build castles?": result = explain defence/control purposes; evidence = child justifies a castle feature; activities planned to reach that.

**Pitfalls.** (1) Choosing activities first, then back-fitting goals. (2) Vague goals that no check can prove. (3) Using it as a live script instead of a planning lens.

**Related.** [[Madeline Hunter lesson cycle]], [[../methods/retrieval-and-memory|cumulative review]], [[Concept Attainment]].

---

## Engelmann Direct Instruction (DI / DISTAR)

**Family:** Instruction models · **Evidence:** strong — (Engelmann; Project Follow Through, the largest US educational experiment, ranked DI top in basic skills, cognitive *and* affective outcomes) · **Best for:** foundational decoding, spelling, early maths; children who need maximum structure; ages 5–9.

**What it is.** A highly scripted, fast-paced form of explicit instruction with carefully sequenced examples, choral/active responding, immediate correction, and mastery before progression. Capital-D "Direct Instruction" (the programme) is stricter than generic direct instruction.

**Why it works.** Faultless, minimally-different example sequences make the concept unambiguous (you can't misgeneralise if the examples rule out every wrong reading). Frequent active responses keep the child engaged and give the teacher continuous data; immediate correction stops errors embedding.

**When to use / when NOT.** Use for skills where precision and automaticity matter (phonics, number facts). NOT for open-ended, creative, or discussion tasks. The scripting can feel mechanical if used everywhere; reserve it for the basics.

**How to run it (steps).**
1. Use a carefully sequenced set of examples and non-examples that isolate the concept.
2. Model precisely ("My turn").
3. Elicit an immediate active response ("Your turn").
4. Correct any error at once with the model-lead-test routine.
5. Require mastery before moving on.

**1:1 AI-tutor adaptation.** Classai borrows DI's *correction routine* directly: model → child tries → on error, re-model and re-test (the `wrongAnswers → remedy` loop). Its "minimally different examples" idea informs how the tutor should pick the *next* practice item — vary one feature at a time. The mastery-before-progression rule maps to the director not advancing the beat until success.

**Primary example.** Phonics, Year 1 — blending /s/ /a/ /t/: "My turn: sss-aaa-t, sat. Your turn." On a slip, re-model that exact word, then re-test, then move on.

**Pitfalls.** (1) Applying scripted DI to creative/discussion work where it stifles. (2) Going so fast the child is parroting, not understanding. (3) Skipping the non-examples that prevent overgeneralisation.

**Related.** [[Direct / Explicit Instruction]], [[Concept Attainment]], [[../methods/retrieval-and-memory|fluency drills]].

---

## Teach–Practice–Apply

**Family:** Instruction models · **Evidence:** moderate — (common UK lesson structure; aligns with gradual release & Rosenshine) · **Best for:** a simple, robust three-part lesson shape; all ages.

**What it is.** A pared-down lesson cycle: **teach** the new content, **practise** it with guidance, **apply** it to a slightly new context or problem. The "apply" phase is what distinguishes it — pushing toward transfer, not just repetition.

**Why it works.** It guarantees the lesson reaches *application*, the point where learning becomes useful and transfer is tested — a phase blocked-practice lessons often skip.

**When to use / when NOT.** A good default when you want a lean structure. NOT enough on its own for content needing heavy modelling — fold gradual release into "teach." The "apply" step can overreach if the practice wasn't yet secure.

**How to run it (steps).**
1. **Teach:** explicit input + model.
2. **Practise:** guided then independent on like items, to ~80%.
3. **Apply:** one transfer task in a fresh context.

**1:1 AI-tutor adaptation.** Teach = explain/example, Practise = practice, Apply = a final transfer `practice`/`check` item that changes the surface (a word problem, a new context) once the core is secure. The director should gate "apply" behind a real practice success; if practice is shaky, it stays in practice rather than risking a transfer flop.

**Primary example.** Maths, Year 4 — area of rectangles: teach length×width, practise on grids, apply to "how much carpet for this room?"

**Pitfalls.** (1) Jumping to Apply before Practise is secure. (2) "Apply" that's just more of the same (no transfer). (3) Cramming all three into too little time.

**Related.** [[Gradual Release of Responsibility]], [[Worked-example & faded guidance]], [[../methods/retrieval-and-memory|interleaving]].

---

## Concept Attainment

**Family:** Instruction models · **Evidence:** moderate — (Bruner, Goodnow & Austin 1956; Joyce & Weil "Models of Teaching") · **Best for:** teaching the *definition* of a category/concept through examples vs non-examples; ages 6–11.

**What it is.** The teacher presents labelled **examples** ("this IS a ___") and **non-examples** ("this is NOT a ___"); the child compares them to infer the defining attributes, then tests the rule on new cases.

**Why it works.** Contrasting cases make the critical attribute pop out — the child does the categorising, which builds a sharper, more transferable concept than being handed a definition. (A structured, guided form of induction, not free discovery.)

**When to use / when NOT.** Use for concepts defined by clear attributes (even/odd, vertebrate, adjective, polygon). NOT for procedures or where attributes are fuzzy. Needs enough examples; with too few it becomes guessing.

**How to run it (steps).**
1. Present a clear positive example and a clear negative, labelled.
2. Add more of each; child hypothesises the rule.
3. Child tests the rule by sorting new cases (yes/no).
4. Confirm and name the concept and its attributes.

**1:1 AI-tutor adaptation.** Run it in the explain/example beats with a `dragDrop` or `trueFalse` sort: tutor reveals labelled examples/non-examples, child predicts the rule, then sorts new cases as the check. The pre-authored misconceptions tell the tutor which *near-miss* non-examples to include (e.g. a rectangle as a non-example when teaching "square").

**Primary example.** English, Year 2 — adjectives: "happy" IS, "run" is NOT, "blue" IS, "quickly" is NOT → child infers "describes a noun," sorts new words.

**Pitfalls.** (1) Too few or ambiguous examples. (2) Naming the concept first (removes the thinking). (3) Letting it sprawl into unguided discovery.

**Related.** [[Advance Organisers (Ausubel)]], [[The 5E instructional model]], [[../methods/representation-and-modelling|Frayer model]].

---

## Advance Organisers (Ausubel)

**Family:** Instruction models · **Evidence:** moderate — (Ausubel 1960; meta-analyses show small-to-moderate gains, larger when content is unfamiliar) · **Best for:** giving a "mental coat-hook" before new, abstract, or text-heavy content; ages 8–11.

**What it is.** A brief, more-general framing given *before* the lesson that the new details can attach to — an overview, an analogy, a "today we'll see how X is like Y," or a structural preview ("rivers have three parts; we'll learn each").

**Why it works.** Meaningful learning needs the new material to subsume into existing structure. An organiser supplies (or activates) that structure up front, so incoming details have somewhere to go rather than floating free.

**When to use / when NOT.** Use before unfamiliar or abstract topics, and longer texts. Less needed when prior knowledge is already strong or content is concrete and short. A vague organiser ("today we learn about water") does nothing.

**How to run it (steps).**
1. Before teaching, give a short, higher-level framing or analogy.
2. Make the structure explicit ("there will be three causes").
3. Teach the details, referring back to the organiser.
4. Recap by re-populating the organiser with what was learned.

**1:1 AI-tutor adaptation.** Place the organiser in the *hook/explain*: one sentence of framing or a `whiteboard`/`mindMap` skeleton the child fills as the lesson proceeds. The grounding file's `keyConcepts` give the organiser's structure. Keep it short — an organiser is a coat-hook, not a second lesson — and return to it in the *recap*.

**Primary example.** Geography, Year 4 — the water cycle: organiser "water goes on a round trip — up, across, down, back" before teaching evaporation/condensation/precipitation.

**Pitfalls.** (1) Making it as long as the lesson. (2) An organiser too vague to organise anything. (3) Never referring back to it.

**Related.** [[Concept Attainment]], [[../methods/representation-and-modelling|graphic organisers]], [[../methods/literacy-across-curriculum|knowledge organisers]].

---

## Worked-example & faded guidance (completion problems)

**Family:** Instruction models · **Evidence:** strong — (Sweller, the worked-example effect; Renkl & Atkinson, the guidance-fading effect) · **Best for:** problem-solving skills in maths, science, grammar; novices especially; all ages.

**What it is.** Give a fully worked, step-by-step solution to study; then a *partially* completed one to finish (completion problem); then an unaided problem. The support fades as competence grows — the "guidance-fading effect."

**Why it works.** For novices, studying a worked solution frees working memory to attend to the *method* instead of flailing for an answer. Faded completion problems keep the child active without the load of a blank problem. As expertise grows, full worked examples stop helping (the "expertise-reversal effect") — hence the fade.

**When to use / when NOT.** Use when introducing a procedure. NOT for experts on that skill (give them the problem). NOT as answer-only "examples" — the reasoning must be narrated.

**How to run it (steps).**
1. Present a complete worked example as a think-aloud (narrate decisions, not just steps).
2. Give a completion problem: first steps done, child finishes.
3. Increase the gap each time (fewer steps given).
4. End on a fully independent problem.

**1:1 AI-tutor adaptation.** Use `steps` (reveal one step at a time) or `whiteboard` for the full worked example in explain/example, then hand a partial via `fillBlank`/`numberEntry` in practice, then a clean problem. The two-tier memory tracks how much fading the child can take, so the next lesson starts at the right level rather than re-modelling from scratch. Always narrate the *decision* ("the bigger number's on the bottom, so I start in the ones"), never just the answer.

**Primary example.** Maths, Year 5 — short multiplication: full worked 23×4 think-aloud, then "I've done the ones, you do the tens" (completion), then 34×6 alone.

**Pitfalls.** (1) "Worked examples" that are just answers. (2) No fading (dependence) or fading too fast (failure). (3) Keeping full examples for a child who's already fluent (expertise reversal).

**Related.** [[Gradual Release of Responsibility]], [[Demonstration / modelling]], [[../methods/representation-and-modelling|think-alouds]], [[Teach–Practice–Apply]].

---

## Demonstration / modelling

**Family:** Instruction models · **Evidence:** strong — (Bandura social learning; modelling underpins gradual release & worked examples) · **Best for:** any skill that can be *shown* — letter formation, a procedure, reading aloud, a strategy; all ages.

**What it is.** The teacher performs the skill while the child watches, ideally narrating the hidden thinking (a "think-aloud") so the invisible decisions become visible.

**Why it works.** Children learn powerfully by observing a competent performance, especially when the expert's normally-hidden reasoning is voiced. It provides a clear target to imitate before they attempt it.

**When to use / when NOT.** Use before any first attempt at a new skill. NOT as the whole lesson — modelling without subsequent practice doesn't transfer. Silent modelling (no think-aloud) hides the part that matters most.

**How to run it (steps).**
1. Tell the child what to watch for ("notice where I start the letter").
2. Perform the skill, narrating the decisions.
3. Highlight the easy-to-miss step.
4. Hand straight into a we-do attempt.

**1:1 AI-tutor adaptation.** The *explain*/*example* beats are the model. Because Classai is voice-led, the think-aloud is natural: speak the reasoning while a `whiteboard`/`steps` block shows the action. Keep speech short (cognitive load) — model one step, then check. Pair with the gradual-release fade so modelling always leads into the child doing it.

**Primary example.** English, Year 1 — forming the letter *b*: "Watch — I start at the top, straight line down, then round the bottom" on a `whiteboard`, then child traces.

**Pitfalls.** (1) Modelling silently (no reasoning). (2) Modelling then never releasing. (3) Modelling too much at once.

**Related.** [[Worked-example & faded guidance]], [[Gradual Release of Responsibility]], [[../methods/representation-and-modelling|think-alouds]].

---

## Mini-lessons

**Family:** Instruction models · **Evidence:** moderate — (Calkins, writing/reading workshop; aligns with cognitive-load chunking) · **Best for:** a single, tightly-focused teaching point inside a longer activity; ages 6–11, especially literacy.

**What it is.** A short (5–15 min) focused lesson on *one* skill or strategy, after which the child applies it in their own work. Classic in writing/reading workshops: brief teach, long do.

**Why it works.** It respects working-memory limits (one teaching point), then maximises application time. The brevity keeps attention high and prevents over-loading.

**When to use / when NOT.** Use to teach a discrete skill the child then practises in a real task (a writing move, a reading strategy). NOT for content needing extended instruction or many linked steps.

**How to run it (steps).**
1. Name one teaching point.
2. Teach/model it briefly (a few minutes).
3. Have the child try it immediately in their own work.
4. Confer / check as they apply it.

**1:1 AI-tutor adaptation.** This *is* a Classai lesson's natural size: one idea per lesson, short explain, long practice. Use mini-lessons to break a big topic into a sequence of one-point sessions the spaced-review system can revisit. The director's "one idea per turn" rule is the mini-lesson principle at turn scale.

**Primary example.** English, Year 3 — writing: mini-lesson on "start some sentences with an *-ly* adverb," then the child adds two to their own piece via `shortText`.

**Pitfalls.** (1) Cramming several teaching points into one "mini" lesson. (2) Teaching long, applying short (inverts the ratio). (3) A teaching point too vague to apply.

**Related.** [[Direct / Explicit Instruction]], [[../methods/literacy-across-curriculum|writing-to-learn]], [[../methods/retrieval-and-memory|spaced practice]].

---

## AVOID — Pure discovery / unguided "minimal guidance" for novices

**Family:** Instruction models · **Evidence:** strong evidence *against* for novices — (Kirschner, Sweller & Clark 2006; Mayer 2004 "Should there be a three-strikes rule against pure discovery learning?") · **Status: AVOID for new content with novices.**

**What it is.** Letting children "discover" new concepts or procedures with minimal instruction, on the theory that self-found knowledge sticks better.

**Why it fails (for novices).** With no schema to guide them, novices flounder, overload working memory, and frequently induce the *wrong* rule — which then has to be unlearned. The evidence consistently favours *guided* instruction during the acquisition of new skills. (Guided/structured inquiry, where exploration is framed and explanation is explicit — as in well-run 5E — is a different thing and can work.)

**When (rarely) acceptable.** Once a child already has the relevant knowledge, open exploration to *apply* or *extend* it can be motivating and useful. The error is using discovery to *acquire* foundations.

**1:1 AI-tutor adaptation.** Classai's design rule already encodes this: the *explain* beat must do real teaching; any "explore" phase (as in 5E) is a short, framed, predict-then-see, and the director cuts to explanation if the child flounders. Never ask a child to infer a brand-new procedure from a blank problem.

**Related.** [[Direct / Explicit Instruction]], [[The 5E instructional model]], [[Worked-example & faded guidance]].

# Differentiation & inclusion methods

Methods for teaching **every kind of learner** — adapting so each child can access, engage with, and succeed at the same rich content. This family covers differentiation, scaffolding, Universal Design for Learning, the graduated SEND approach, specific learning needs (dyslexia, dyscalculia, dysgraphia, ADHD, autism, speech & language), EAL/ESL learners, and stretching the gifted — plus the cognitive-load techniques (pre-teaching, chunking, multisensory) that make hard content reachable.

**Tone and stance — read this first.** Every child is a *learner with strengths*, not a deficit to fix. Differences in how a child reads, calculates, attends, or communicates are differences in *processing*, not in worth or potential. Describe needs accurately and respectfully; build on what the child *can* do; keep expectations **high** while changing the *route*. Avoid labels-as-limits and never lower the ceiling when you should be changing the access. None of the conditions below is diagnosed by an AI tutor — Classai *adapts to* a child's profile (often supplied by a parent), it does not assess or label.

A 1:1 AI tutor is, in a real sense, *differentiation by design*: it teaches one child, can adjust pace and representation every turn, and remembers what works in the `LearnerModel`. The methods here tell it *how* to adapt well.

---

## Differentiation by task, support, and outcome

**Family:** Differentiation & inclusion · **Evidence:** moderate — (EEF "Within-class attainment grouping" caution; differentiation works when it changes *access*, not when it just means easier work) · **Best for:** matching challenge to readiness, all ages/subjects.

**What it is.** Three classic ways to adapt a single learning goal: **by task** (different activities/levels toward the same goal), **by support** (same task, different scaffolding), and **by outcome** (same open task, learners go as far as they can). The aim is to keep everyone working on the *same big idea* at the right level of challenge.

**Why it works.** Learning happens in the "zone" just beyond what a child can already do alone. Adjusting task/support/outcome keeps each child in their zone — neither bored by easy work nor lost by hard work.

**When to use / when NOT.** Use to pitch challenge correctly. NOT "differentiation by dumbing down" — giving struggling children a permanently lower ceiling (the EEF's warning). Prefer differentiating *support* (scaffold up) over *task* (separate, lesser work) where possible.

**How to run it (steps).**
1. Fix the *core learning goal* for all.
2. Choose the lever: vary the task, vary the support, or open the outcome.
3. Pitch each child just beyond their current independent level.
4. Plan to *reduce* the adaptation over time (don't make scaffolds permanent).

**1:1 AI-tutor adaptation.** Differentiation by support is Classai's native mode: the director keeps the *same beat goal* but adjusts hint level, representation, and step size turn-by-turn based on the struggle streak and `LearnerModel`. "By outcome" maps to open `shortText`/`whiteboard` tasks where the child goes as far as they can; "by task" maps to swapping in an easier or harder `practice` block while holding the concept constant.

**Primary example.** Goal: "add two-digit numbers." Support-differentiated: same sum, but a struggling child gets base-ten blocks shown and a partial-step scaffold; a secure child gets it mentally and an "explain your method" prompt.

**Pitfalls.** Permanent low-track work; three separate worksheets that fragment the class goal; adapting forever instead of fading the support.

**Related.** [[scaffolding-and-fading]], [[tomlinson-content-process-product]], [[stretching-the-gifted-and-talented]], [[reducing-cognitive-load]].

---

## Tomlinson's content / process / product (and readiness/interest/profile)

**Family:** Differentiation & inclusion · **Evidence:** moderate — (Tomlinson's model; respected framework, evidence strongest for *interest* and *readiness* adaptation) · **Best for:** a systematic way to plan differentiation, all ages.

**What it is.** Carol Ann Tomlinson's framework: you can differentiate the **content** (what's learned / how it's accessed), the **process** (the activities to make sense of it), or the **product** (how the child shows learning) — according to a child's **readiness**, **interests**, or **learning profile**.

**Why it works.** Gives a complete menu so adaptation isn't ad hoc. Differentiating by *interest* boosts engagement; by *readiness* keeps challenge right; varying the *product* lets children show understanding through a strength.

**When to use / when NOT.** Use as the planning lens. NOTE: "learning profile" must **not** mean VAK "learning styles" — matching teaching to a child's supposed style is **debunked** (see [[avoid-learning-styles]]); profile here means strengths, prior knowledge, language, interests. Don't over-engineer 6 versions of everything.

**How to run it (steps).**
1. Pick the dimension to vary: content, process, or product.
2. Pick the basis: readiness, interest, or profile (strengths, not "styles").
3. Adapt *one* dimension meaningfully rather than all three superficially.

**1:1 AI-tutor adaptation.** Classai differentiates **content** via representation choice (manipulative vs number line vs symbols), **process** via step size and hint depth, and **product** via answer mode (voice, type, `whiteboard`, `sort`/`match`). Crucially it differentiates by **interest** by weaving the child's `LearnerModel` interests into examples — its single strongest engagement lever.

**Primary example.** A dinosaur-loving Year 2 child practising counting in 2s: same content/process, but the *product* and examples use dinosaurs ("count the T-rex teeth in 2s"), tapping interest from memory.

**Pitfalls.** Sliding into "learning styles"; differentiating everything shallowly; varying product so much the core skill goes unassessed.

**Related.** [[differentiation-by-task-support-outcome]], [[avoid-learning-styles]], [[universal-design-for-learning]], [[stretching-the-gifted-and-talented]].

---

## Scaffolding & fading

**Family:** Differentiation & inclusion · **Evidence:** strong — (Wood/Bruner/Ross; "guided practice", Rosenshine; EEF metacognition) · **Best for:** getting a child to do, *with help*, what they can't yet do alone — all ages/subjects.

**What it is.** Temporary supports (a model, a partial solution, a prompt, a sentence starter, a manipulative) that let a child succeed at a task just beyond their independent reach — then **faded** deliberately as competence grows, until the child does it unaided.

**Why it works.** Bridges the gap between assisted and independent performance (Vygotsky's ZPD). Success-with-support builds the schema; *removing* the support transfers responsibility to the child — which is the whole point. Permanent scaffolds create dependence.

**When to use / when NOT.** Use whenever a task is currently too hard alone. The *fading* is non-negotiable — a scaffold never removed becomes a crutch. NOT for tasks the child can already do (wasteful, even insulting).

**How to run it (steps).**
1. Model it / provide the support so the child succeeds *now*.
2. Do it together (guided practice).
3. Reduce the support a notch; re-check.
4. Continue fading to independence; verify the child can do it alone.

**1:1 AI-tutor adaptation.** Scaffolding is the explain→example→guided-practice arc; fading is the director *reducing hint depth and step support* as `WorkingMemory` shows checks passing. Before crediting mastery to the `LearnerModel`, the director **fades and re-checks** — it never records mastery on heavily-scaffolded success (`assessment-and-feedback.md` §6). Sentence starters, worked-example skeletons, and manipulative visuals are the scaffold blocks.

**Primary example.** Year 3 written method: tutor first shows the full worked column add, then a half-done one to complete, then "you do this one" with only a "remember to start in the ones" prompt, then nothing.

**Pitfalls.** Never fading (dependence); fading too fast (collapse); crediting mastery while support is still on.

**Related.** [[differentiation-by-task-support-outcome]], [[pre-teaching]], [[chunking]], [[reducing-cognitive-load]].

---

## Universal Design for Learning (UDL)

**Family:** Differentiation & inclusion · **Evidence:** promising–moderate — (CAST UDL framework; principled, but mixed direct-effect research) · **Best for:** designing flexible learning that works for many learners *up front*, all ages.

**What it is.** A framework (CAST) for reducing barriers by building in flexibility from the start across three principles: multiple means of **engagement** (the *why* — motivation, choice), **representation** (the *what* — present content multiple ways), and **action & expression** (the *how* — let learners respond multiple ways).

**Why it works.** Designing flexibly *up front* means fewer learners hit barriers needing individual retrofits. Options for engagement, representation, and expression help not just SEND learners but everyone (the "curb-cut" effect).

**When to use / when NOT.** Use as a design philosophy for materials and tasks. NOT as "offer every option always" — too many choices overload. Provide *meaningful* flexibility on the dimensions that remove real barriers.

**How to run it (steps).**
1. **Engagement:** offer relevance/choice, manage challenge, sustain effort.
2. **Representation:** present the idea more than one way (words + image + concrete).
3. **Action/expression:** allow more than one way to respond and show learning.
4. Remove the barrier rather than lowering the goal.

**1:1 AI-tutor adaptation.** Classai is UDL-aligned by construction: **engagement** via interest-woven examples and choice of activity; **representation** via the block tool-belt (text + `image`/`video` + `whiteboard` + manipulatives, dual-coded); **action/expression** via answer modes (voice/Whisper, typing, `multipleChoice`, `sort`, `match`, drawing). The tutor picks the representation/response that removes *this* child's barrier, recorded in `LearnerModel`.

**Primary example.** A water-cycle lesson offered as a labelled diagram *and* spoken explanation *and* a drag-the-stages `sort`, with the child answering by voice or by ordering the stages — same concept, barrier-free access.

**Pitfalls.** Choice overload; treating UDL as a checklist not a mindset; using "options" to avoid teaching the hard core.

**Related.** [[tomlinson-content-process-product]], [[multisensory-teaching]], [[differentiation-by-task-support-outcome]], technology methods (multimedia).

---

## The graduated approach: assess–plan–do–review

**Family:** Differentiation & inclusion · **Evidence:** moderate (policy/practice standard) — (England SEND Code of Practice 2015) · **Best for:** any persistent learning need; a cycle for getting support right, ages 5–11.

**What it is.** The statutory four-part cycle for supporting a child with additional needs: **Assess** (identify the need precisely), **Plan** (decide adjustments + targets with the family), **Do** (implement), **Review** (did it work? adjust). It repeats, refining support over time.

**Why it works.** Turns "this child is struggling" into a disciplined, evidence-led, *iterative* response — small experiments, reviewed and refined — rather than a one-off label or guess. Centres the child and family.

**When to use / when NOT.** Use for any need that persists despite good first teaching. It is a *process*, not a diagnosis. An AI tutor supports the cycle (gathering evidence, trying adjustments, reviewing) but the **parent/professional owns** assessment and planning.

**How to run it (steps).**
1. **Assess:** what exactly is the barrier? (gather evidence).
2. **Plan:** specific adjustments + small, measurable targets, agreed with the family.
3. **Do:** implement consistently.
4. **Review:** what changed? Keep, tweak, or change the approach; loop.

**1:1 AI-tutor adaptation.** The `LearnerModel` *is* a running assess-plan-do-review record: it logs struggles/strengths (assess), the tutor tries an adaptation (plan/do), and the next sessions show whether mastery moved (review). The parent dashboard surfaces this so the human can steer the cycle. Classai contributes evidence and tries adjustments; it never diagnoses.

**Primary example.** A Year 2 child keeps reversing b/d. Assess: confusion is specific to those letters. Plan: a "bed" mnemonic + multisensory tracing, reviewed in two weeks. Do/Review: if errors drop, keep; if not, try another adaptation.

**Pitfalls.** Skipping "review" (set-and-forget support); an AI overstepping into diagnosis; not involving the parent.

**Related.** [[scaffolding-and-fading]], [[supporting-dyslexia]], [[multisensory-teaching]], and all specific-need methods below.

---

## SEND adaptations (general principles)

**Family:** Differentiation & inclusion · **Evidence:** moderate–strong — (EEF "Special Educational Needs in Mainstream Schools" guidance; "high-quality teaching" first) · **Best for:** any learner with special educational needs/disability, all ages.

**What it is.** A set of cross-cutting principles for adapting teaching for children with SEND: know the child, scaffold flexibly, reduce cognitive load, use multisensory and explicit instruction, and build a positive relationship — *before* reaching for specialist programmes. EEF's headline: great SEND teaching is mostly *great teaching*, applied deliberately.

**Why it works.** Most learners with SEND benefit most from the same evidence-based teaching done *more carefully* — clearer modelling, smaller steps, more retrieval, more scaffolding — rather than a wholly separate method. Relationship and accessibility come first.

**When to use / when NOT.** Use as the default stance for any additional need. NOT as an excuse for low expectations. Specific programmes (e.g. structured literacy) layer *on top of* these principles, not instead.

**How to run it (steps).**
1. Understand the specific profile (strengths and barriers).
2. Apply the "five-a-day": explicit instruction, scaffolding, flexible grouping (n/a solo), cognitive-load reduction, *and* use of technology.
3. Pre-empt barriers (pre-teach vocabulary, chunk, multisensory).
4. Keep expectations high; change the route, not the destination.

**1:1 AI-tutor adaptation.** Classai applies the "five-a-day" continuously: explicit modelling in explain beats, scaffolding/fading, cognitive-load reduction (one idea per beat), and it *is* the assistive technology. The `LearnerModel` carries the child's profile so adaptations persist across sessions. Pace, modality, and step size flex to the individual every turn.

**Primary example.** A child with working-memory difficulties: the tutor keeps each beat to one step, repeats the key instruction, offers an on-screen reminder of the goal, and never asks them to hold three things at once.

**Pitfalls.** Reaching for exotic programmes before nailing high-quality teaching; lowering expectations; one-size adaptation ignoring the specific profile.

**Related.** [[the-graduated-approach]], [[reducing-cognitive-load]], [[multisensory-teaching]], [[scaffolding-and-fading]].

---

## Supporting dyslexia

**Family:** Differentiation & inclusion · **Evidence:** strong (structured literacy) — (Orton-Gillingham principles; systematic synthetic phonics, EEF +5mo; IDA) · **Best for:** children with reading/spelling difficulties rooted in phonological processing, ages 5–11.

**What it is.** Dyslexia is a *specific* difficulty with accurate/fluent word reading and spelling, usually from weaker phonological processing — *unrelated to intelligence*. Support centres on **structured literacy**: explicit, systematic, cumulative, multisensory phonics, plus assistive supports (text-to-speech, more time, reduced copying).

**Why it works.** Strengthening the phoneme–grapheme link explicitly and multisensorially builds the decoding that doesn't come incidentally. Assistive tech removes the *reading* barrier so the child can still access rich *content* and ideas (their thinking is usually strong).

**When to use / when NOT.** Use structured, cumulative phonics + accommodations. NOT coloured overlays/tinted lenses as a *literacy* cure (evidence weak — [[avoid-fads-in-inclusion]]); NOT whole-word guessing from pictures. Don't reduce the *intellectual* demand — reduce the *reading load*.

**How to run it (steps).**
1. Teach phonics explicitly, systematically, cumulatively; lots of overlearning.
2. Make it multisensory (see/say/hear/trace — [[multisensory-teaching]]).
3. Accommodate: text-to-speech, audio for content, less copying, more time, decodable fonts/spacing.
4. Protect comprehension and ideas by removing the decoding bottleneck.

**1:1 AI-tutor adaptation.** Classai's **on-device TTS (Kokoro) reads text aloud**, removing the decoding barrier so a dyslexic child can engage with full-strength content; **voice answers (Whisper)** let them respond without the spelling barrier. For literacy itself, the tutor delivers small, cumulative, overlearned phonics steps with multisensory cues, and the `LearnerModel` tracks which graphemes are secure. High intellectual challenge stays; reading/writing load is offloaded.

**Primary example.** A Year 4 child with dyslexia doing a science lesson: the tutor reads the passage aloud (TTS), the child answers questions by voice, and their strong scientific reasoning shines — the reading difficulty no longer caps the science.

**Pitfalls.** Coloured-overlay "cures"; guess-from-pictures reading; lowering content demand instead of reading demand; too-large phonics steps.

**Related.** [[multisensory-teaching]], [[pre-teaching]], [[supporting-dysgraphia]], [[avoid-fads-in-inclusion]].

---

## Supporting dyscalculia

**Family:** Differentiation & inclusion · **Evidence:** moderate — (number-sense interventions; concrete-pictorial-abstract; manipulatives, EEF) · **Best for:** children with a specific, persistent difficulty with number/quantity, ages 5–11.

**What it is.** Dyscalculia is a specific difficulty understanding numbers and quantity — weak "number sense," trouble subitising, comparing magnitudes, and recalling facts — *not* general low ability. Support builds number sense concretely and slowly, with heavy use of manipulatives and visual models.

**Why it works.** Grounding number in *quantity* (objects, then pictures, then symbols — CPA) builds the intuition that doesn't develop incidentally. Manipulatives externalise the maths so working memory isn't overloaded; overlearning of facts compensates for weak recall.

**When to use / when NOT.** Use concrete→pictorial→abstract, manipulatives, structured small steps, and lots of practice. NOT rushing to abstract symbols or timed fact-drills under pressure (raises maths anxiety, which compounds the difficulty). Separate *anxiety* from *dyscalculia* — both may need addressing.

**How to run it (steps).**
1. Build number sense with objects (counting, subitising, comparing).
2. Move to pictures/number lines; then to symbols — only when the prior stage is secure.
3. Use ten-frames, Numicon-style structured visuals, bar models.
4. Overlearn facts in a low-pressure, untimed way; revisit constantly.

**1:1 AI-tutor adaptation.** The tutor leans on **manipulative and visual blocks** (ten-frames, number lines, arrays via `image`/`whiteboard`) and stays concrete longer, only moving to symbols when the `LearnerModel` shows the pictorial stage is secure. It keeps fact practice **low-stakes and untimed** (no anxiety-inducing clock), and chunks every step. Calculation is supported, *reasoning* is still expected.

**Primary example.** Year 3 child with dyscalculia learning 7+5: the tutor uses a ten-frame to "make ten" visually (fill to 10, then 2 more) rather than expecting recall — building the bridging strategy concretely.

**Pitfalls.** Jumping to abstract too soon; timed pressure feeding anxiety; assuming low maths = low ability generally.

**Related.** [[reducing-cognitive-load]], [[multisensory-teaching]], [[scaffolding-and-fading]], [[pre-teaching]].

---

## Supporting dysgraphia

**Family:** Differentiation & inclusion · **Evidence:** moderate — (handwriting/OT interventions; assistive tech for written expression) · **Best for:** children whose *handwriting/transcription* is disproportionately hard, ages 5–11.

**What it is.** Dysgraphia is a specific difficulty with the *physical act of writing* and/or transcription (letter formation, spacing, the motor–memory load of handwriting) that can mask strong ideas. Support separates **composition** (ideas) from **transcription** (getting it on the page) and offloads the latter.

**Why it works.** Handwriting consumes huge working-memory and motor resources for these children, leaving little for *thinking*. Reducing the transcription load (typing, dictation, scribing) frees cognition for composition; targeted motor practice builds the mechanics separately.

**When to use / when NOT.** Use dictation/typing for *composition* tasks; practise handwriting mechanics separately and briefly. NOT forcing long handwritten outputs that bury the child's actual ideas. Don't conflate messy writing with weak thinking.

**How to run it (steps).**
1. For idea-focused tasks, let the child *dictate or type* (offload transcription).
2. Practise letter formation in short, multisensory bursts, separately.
3. Reduce copying; provide structure (frames, starters) so motor load is minimal.
4. Assess the *ideas* without penalising the handwriting.

**1:1 AI-tutor adaptation.** **Voice answers (Whisper)** let a dysgraphic child compose by *speaking* — capturing rich ideas without the handwriting bottleneck. Typed and selected-response blocks avoid handwriting entirely. The tutor assesses composition/reasoning from the spoken/typed answer and doesn't penalise transcription; handwriting practice, if wanted, is a separate, short multisensory activity.

**Primary example.** A Year 5 child with dysgraphia "writes" a story by telling it aloud to the tutor (voice→text); the tutor responds to the plot and vocabulary, which are excellent — the page is no longer the limit.

**Pitfalls.** Judging ideas by handwriting; long handwritten tasks that exhaust the child; ignoring that brief, correct motor practice still helps.

**Related.** [[supporting-dyslexia]], [[reducing-cognitive-load]], [[universal-design-for-learning]], [[multisensory-teaching]].

---

## Supporting ADHD

**Family:** Differentiation & inclusion · **Evidence:** moderate — (behavioural/educational strategies; structure, movement, chunking; EEF self-regulation) · **Best for:** children with attention regulation and/or hyperactivity-impulsivity differences, ages 5–11.

**What it is.** ADHD involves differences in *regulating* attention, activity, and impulse — not a lack of ability or effort. Educational support provides external structure, short focused chunks, movement, immediate feedback, and reduced distraction, working *with* the child's energy and interests.

**Why it works.** External structure and frequent feedback substitute for the self-regulation that's harder for these children; short chunks fit the natural attention span; movement and interest-led tasks harness (rather than fight) their drive; immediate consequences/feedback aid impulse control.

**When to use / when NOT.** Use frequent breaks, novelty, clear short goals, and immediate feedback. NOT long, monotonous, low-feedback tasks; NOT framing inattention as defiance/laziness. Build on hyperfocus and interest — strengths, not just deficits.

**How to run it (steps).**
1. Chunk work into short, clear segments with a visible goal.
2. Build in movement and brain breaks.
3. Give immediate, specific feedback; keep novelty/interest high.
4. Reduce distractions; provide gentle refocusing cues, not reprimands.

**1:1 AI-tutor adaptation.** Classai's **short beats with frequent interactive checks** fit a short attention span and give immediate feedback every turn. The director can pace in shorter bursts, weave the child's `LearnerModel` interests in for novelty, and prompt **brain breaks** (see `methods/routines-and-environment.md`). Variety in block types sustains attention; refocusing is warm, never a telling-off.

**Primary example.** A Year 3 child with ADHD: the tutor runs 5–7 minute mini-segments, each ending in an interactive `multipleChoice` or `match`, with a 1-minute "stretch and wiggle" break between — keeping engagement without a 30-minute slog.

**Pitfalls.** Long passive stretches; treating restlessness as misbehaviour; no movement; sparse feedback; ignoring the child's hyperfocus strengths.

**Related.** routines-and-environment methods (brain breaks, pacing), [[chunking]], [[reducing-cognitive-load]], [[universal-design-for-learning]].

---

## Supporting autistic learners (ASD)

**Family:** Differentiation & inclusion · **Evidence:** moderate — (autism education practice; predictability, explicit teaching, special-interest leverage) · **Best for:** autistic children — diverse needs; adapt to the *individual*, ages 5–11.

**What it is.** Autism is a difference in social communication, sensory processing, and a preference for predictability, alongside often-intense focused interests. Support provides **predictability and clear structure**, makes the *implicit explicit* (instructions, expectations, social/abstract concepts), respects sensory needs, and leverages the child's deep interests.

**Why it works.** Predictable structure reduces anxiety so cognition is free for learning. Autistic children often don't infer the unstated, so explicit, literal, concrete instruction prevents confusion. Special interests are a powerful, authentic motivation and memory hook.

**When to use / when NOT.** Adapt to the *specific* child — autism is highly varied ("if you've met one autistic child, you've met one"). Use clear routines, literal language, advance warning of change, sensory awareness. NOT figurative/ambiguous instructions without explanation; NOT forcing eye contact or suppressing harmless self-regulation (stimming). Never treat difference as deficit.

**How to run it (steps).**
1. Keep structure and routine predictable; signal changes in advance.
2. Make instructions explicit, literal, concrete; check understanding.
3. Respect sensory and regulation needs (volume, pace, breaks).
4. Build content around special interests; use clear visual supports.

**1:1 AI-tutor adaptation.** A 1:1 tutor offers a **calm, predictable, low-social-pressure** environment — a genuine strength for many autistic children. Classai keeps a consistent session structure (predictable beats and rituals — see routines-and-environment), uses **literal, explicit language** (no idioms without explanation), gives advance notice of "we'll do two more then finish," and **weaves special interests** from `LearnerModel` deeply into examples. The character and pacing can be tuned to sensory preferences.

**Primary example.** An autistic Year 4 child fascinated by trains: every maths problem uses train timetables and carriages; the session always follows the same warm-up→learn→practise→finish shape, with "two questions left, then we stop" warnings before transitions.

**Pitfalls.** Idioms/sarcasm taken literally and confusing; surprise changes; sensory overload (busy visuals, loud audio); pathologising stimming or non-eye-contact; assuming all autistic children are alike.

**Related.** routines-and-environment methods (rituals, transitions), [[universal-design-for-learning]], [[supporting-speech-and-language-needs]], [[stretching-the-gifted-and-talented]] (twice-exceptional).

---

## Supporting speech, language & communication needs (SLCN)

**Family:** Differentiation & inclusion · **Evidence:** strong (oral language) — (EEF "Oral language interventions" +6mo; vocabulary instruction) · **Best for:** children with difficulties understanding or using spoken language, ages 5–11.

**What it is.** SLCN spans difficulties with *understanding* language (receptive), *using* it (expressive), or *speech sounds*. Support simplifies and supports language input (shorter sentences, visuals, processing time), pre-teaches vocabulary, and builds expressive language gently — without reducing *thinking* demand.

**Why it works.** If language is the bottleneck, lowering language load (but not cognitive load) lets the child access the concept. Visual support and extra processing time make oral instruction reachable; explicit vocabulary teaching gives the words to think and answer with.

**When to use / when NOT.** Use simplified, well-paced language, visuals, wait time, and vocabulary pre-teaching. NOT long, fast, complex instructions; NOT mistaking a language difficulty for low understanding or rushing the child's response.

**How to run it (steps).**
1. Shorten and simplify *instructions* (not the concept); one step at a time.
2. Pair words with visuals/gestures; pre-teach key vocabulary.
3. Give generous processing/response time ("wait time").
4. Model expressive language; accept and extend partial answers.

**1:1 AI-tutor adaptation.** The tutor keeps **utterances short and clear**, pairs them with `image`/`whiteboard` visuals, **pre-teaches vocabulary** in the explain beat, and — crucially — gives **wait time**, not rushing a spoken (Whisper) answer. It accepts partial/approximate spoken answers and *extends* them ("yes — and we call that *evaporation*"). Selected-response blocks (`sort`, `match`, `multipleChoice`) let the child show understanding without heavy expressive demand. Adjustable TTS pace supports receptive needs.

**Primary example.** A Year 2 child with receptive language difficulty: instead of "Once you've worked out the total, can you tell me which number is the greatest?", the tutor says "Add them. [pause] Now — which is biggest?" with the numbers shown.

**Pitfalls.** Long/fast/complex instructions; no wait time; simplifying the *concept* instead of the *language*; mistaking quiet or partial answers for not knowing.

**Related.** [[supporting-eal-esl-learners]], [[pre-teaching]], [[reducing-cognitive-load]], [[observation-and-questioning]].

---

## Supporting EAL / ESL learners

**Family:** Differentiation & inclusion · **Evidence:** strong — (EAL pedagogy; TPR; visuals; translanguaging research, e.g. García) · **Best for:** children learning *in* English while still acquiring it; bilingual learners, ages 5–11.

**What it is.** Teaching children who are learning the language of instruction. Methods include **TPR** (Total Physical Response — link language to action/movement), heavy **visual support**, **translanguaging** (purposeful use of the child's home language as a resource), pre-teaching vocabulary, and giving processing time — keeping cognitive challenge high while supporting language.

**Why it works.** Comprehensible input + a low-anxiety environment drives second-language acquisition. TPR and visuals make meaning clear without translation; translanguaging lets the child *think and build concepts in their stronger language* and transfer them — a strength, not a problem. New-to-English ≠ new-to-thinking.

**When to use / when NOT.** Use visuals, gestures, TPR, sentence frames, vocabulary pre-teaching, and the home language as a bridge. NOT "no home language" rules (counterproductive); NOT mistaking limited English for limited ability; NOT cognitively dumbed-down work.

**How to run it (steps).**
1. Make input comprehensible: visuals, gestures, demonstrate, TPR for vocabulary.
2. Pre-teach key vocabulary; provide sentence frames for output.
3. Allow translanguaging — let the child use/check in their home language.
4. Keep the *concept* challenging; support the *language*; give wait time and a safe-to-try climate.

**1:1 AI-tutor adaptation.** The tutor pairs language with **visuals** (`image`/`whiteboard`), **pre-teaches vocabulary**, offers **sentence frames** for spoken/typed answers, and can **leverage the home language** if known to `LearnerModel` (give a key term in both languages, accept an answer in either). Voice (Whisper) supports oral practice in a low-pressure setting; the tutor accepts approximate English and gently recasts it. Cognitive demand stays full.

**Primary example.** A child new to English learning life-cycle vocabulary: the tutor shows pictures and does TPR ("show me *grow* — stretch up tall!"), gives the frame "First the ___, then the ___," and accepts the answer even if the home-language word slips in, then recasts in English.

**Pitfalls.** Banning the home language; equating language level with ability; reducing intellectual challenge; no visuals; correcting every error (silences the child — recast instead).

**Related.** [[supporting-speech-and-language-needs]], [[pre-teaching]], [[multisensory-teaching]], [[universal-design-for-learning]].

---

## Stretching the gifted & talented (depth, breadth, acceleration)

**Family:** Differentiation & inclusion · **Evidence:** moderate — (enrichment & acceleration both have support; "more of the same" does not) · **Best for:** children who grasp material fast and need genuine challenge, ages 5–11.

**What it is.** Extending able learners through **depth** (richer, more complex thinking on the same topic), **breadth** (connecting to wider/related ideas), or **acceleration** (moving to more advanced content) — emphatically *not* just "more questions of the same kind."

**Why it works.** Able children disengage when given busywork. Depth (analysis, justification, multiple methods, open problems) grows reasoning; breadth builds connected schemas; well-judged acceleration keeps challenge in the zone. The aim is *harder thinking*, not *more output*.

**When to use / when NOT.** Use when a child is consistently quick, accurate, *and explains with understanding*. NOT "finish early → ten more sums" (punishing competence). Watch for **twice-exceptional** children (gifted *and* with a SEND) — both need meeting. Don't accelerate so far the child is isolated from age-appropriate foundations.

**How to run it (steps).**
1. Confirm real mastery (explanation + transfer — [[mastery-vs-guessing-check]]).
2. Go *deep*: ask "why? prove it. another way? what if…?"; open-ended/low-floor-high-ceiling tasks.
3. Go *broad*: connect to related/cross-curricular ideas.
4. Accelerate selectively where a foundation is fully secure.

**1:1 AI-tutor adaptation.** When the `LearnerModel` shows fast, secure, *well-explained* mastery, the director **raises the ceiling, not the volume**: it switches to "prove it / find another method / what if…" probes, opens harder `shortText`/`whiteboard` problems, makes cross-topic connections, and can advance the syllabus pace. It deliberately *avoids* padding with repetitive practice a secure child doesn't need.

**Primary example.** A Year 4 child who instantly nails area of rectangles: rather than 20 more rectangles, the tutor asks "find two *different* rectangles with area 24" and "what's the *biggest* area you can make with a fence of 12?" — depth, not drudgery.

**Pitfalls.** "More of the same" busywork; missing twice-exceptional needs; acceleration that skips foundations; mistaking fast-but-shallow answers for giftedness.

**Related.** [[mastery-vs-guessing-check]], play-and-game methods (low-floor-high-ceiling), [[differentiation-by-task-support-outcome]], [[avoid-learning-styles]].

---

## Reducing cognitive load for strugglers

**Family:** Differentiation & inclusion · **Evidence:** strong — (Cognitive Load Theory, Sweller; worked examples; EEF) · **Best for:** any child overwhelmed by a task's complexity, especially novices and SEND, all ages.

**What it is.** Deliberately lowering the *extraneous* mental load of a task — by simplifying presentation, removing distractions, using worked examples, narrating clearly, and offloading what doesn't need to be held in mind — so the child's limited working memory can focus on the *core* learning.

**Why it works.** Working memory is small and easily swamped, especially in novices. Every irrelevant demand (cluttered page, ambiguous instruction, holding too many steps) crowds out the actual thinking. Cutting that load frees capacity for learning the target idea.

**When to use / when NOT.** Use whenever a child is overwhelmed, and by default for novices/SEND. NOT to the point of removing *desirable* difficulty (the productive struggle that builds learning) — cut *extraneous* load, keep *germane* load. Don't over-simplify a secure learner (boredom).

**How to run it (steps).**
1. Strip extraneous detail (clean visuals, one focus, clear language).
2. Use worked examples and partial solutions before full independence.
3. Offload memory demands (manipulatives, jottings, on-screen reminders).
4. One step at a time; remove distractions.

**1:1 AI-tutor adaptation.** Classai's **one-idea-per-beat** design is cognitive-load reduction by construction. The director keeps instructions short, uses worked examples (example beats) before practice, offloads memory with `whiteboard`/manipulatives and on-screen goal reminders, and removes distractions from the display. For a struggling child it shrinks step size; for a secure one it restores desirable difficulty.

**Primary example.** A child overwhelmed by a multi-step word problem: the tutor presents *one* sentence at a time, has the child jot the number from each, and only then asks the operation — so they never hold the whole problem at once.

**Pitfalls.** Removing the productive struggle too (no learning); permanent over-scaffolding; cluttered displays; multi-step instructions that overload from the start.

**Related.** [[chunking]], [[scaffolding-and-fading]], [[pre-teaching]], [[universal-design-for-learning]].

---

## Pre-teaching

**Family:** Differentiation & inclusion · **Evidence:** moderate–strong — (pre-teaching vocabulary/concepts; EEF; especially for EAL & SEND) · **Best for:** front-loading what a child will need, so the main lesson is accessible, all ages.

**What it is.** Teaching key vocabulary, a prerequisite skill, or a tricky concept *in advance* of the lesson that needs it — so the child arrives ready and can participate from a position of (relative) confidence rather than catching up.

**Why it works.** Pre-loading the hard prerequisite into long-term memory means it doesn't consume working memory during the main lesson, *and* it lets a child who'd otherwise lag start on a more even footing — a confidence and access win.

**When to use / when NOT.** Use when a known gap or hard vocabulary would otherwise block the lesson, especially for EAL, SLCN, and SEND learners. NOT for everything (it would double the load); target the *specific* barrier.

**How to run it (steps).**
1. Identify the prerequisite/vocabulary that will block this child.
2. Teach it briefly *before* the main lesson (its own short slot, or the lesson hook).
3. Confirm it's in place; then run the main lesson, which now flows.

**1:1 AI-tutor adaptation.** When the `LearnerModel` flags a likely gap or hard vocabulary for the upcoming topic, the director front-loads it in the **hook/early beats** — a quick teach-and-check of the prerequisite before the new content (this is also `LessonAnalysis.priorKnowledge` in action). A child who would have stumbled instead starts secure.

**Primary example.** Before a Year 5 lesson on "evaporation and condensation," the tutor first ensures the child knows *evaporate*, *condense*, *vapour* (with pictures) — so the lesson isn't derailed by unfamiliar words.

**Pitfalls.** Pre-teaching everything (overload); pre-teaching but not checking it stuck; doing it so far ahead it's forgotten by the lesson.

**Related.** [[reducing-cognitive-load]], [[supporting-eal-esl-learners]], [[supporting-speech-and-language-needs]], [[chunking]].

---

## Chunking

**Family:** Differentiation & inclusion · **Evidence:** strong — (chunking / working-memory limits, Miller; CLT; mastery learning) · **Best for:** breaking complex content into manageable pieces, all ages/subjects.

**What it is.** Breaking a complex task, sequence, or body of content into small, coherent **chunks** taught and practised one at a time, then combined — so working memory is never overwhelmed and each piece is secured before the next.

**Why it works.** Working memory holds only a few items; a complex whole exceeds it. Chunking respects that limit, lets each piece reach mastery, and — once chunks are automatic — they combine into a single larger "chunk," freeing capacity (how expertise grows).

**When to use / when NOT.** Use for any multi-step or content-heavy goal, and especially for strugglers/SEND. NOT chunking so finely that the child loses the bigger purpose — periodically show how the pieces fit the whole.

**How to run it (steps).**
1. Decompose the goal into its smallest sensible steps.
2. Teach + practise one chunk to security.
3. Add the next; then practise them *combined*.
4. Keep the end-goal visible so chunks connect into the whole.

**1:1 AI-tutor adaptation.** Chunking is the **beat structure itself** — a lesson is the content chunked into bite-size beats, each checked before advancing. When a child struggles, the director chunks *further* (smaller next step). It then **recombines** in the recap and in interleaved practice so the chunks integrate. Mastery of each chunk is tracked in `WorkingMemory`/`LearnerModel`.

**Primary example.** Long multiplication (Year 5) chunked: first secure ×ones, then ×tens (with the place-holder zero), *then* combine and add — never all at once. Each chunk checked before the next.

**Pitfalls.** Over-chunking so the child loses the point; never recombining (child can do parts, not the whole); uneven chunks (one secretly huge).

**Related.** [[reducing-cognitive-load]], [[scaffolding-and-fading]], [[pre-teaching]]; mastery-learning methods (`methods/` part 2).

---

## Multisensory teaching (Orton-Gillingham principles)

**Family:** Differentiation & inclusion · **Evidence:** strong (for structured literacy) / moderate (general) — (Orton-Gillingham; structured literacy; multisensory = simultaneous V-A-K-T) · **Best for:** literacy & maths foundations, dyslexia, SEND, early years.

**What it is.** Engaging multiple senses *simultaneously* — **visual, auditory, kinaesthetic, tactile** (V-A-K-T) — so a concept is encoded through several linked channels at once (e.g. *see* the letter, *say* its sound, *hear* it, *trace* it). Central to Orton-Gillingham structured literacy. **Note:** this is *not* "learning styles" — it's *all* children using *all* senses together, not matching a child to one preferred sense.

**Why it works.** Multiple linked memory traces for the same idea strengthen recall and give more retrieval routes; the kinaesthetic/tactile channel especially aids the phoneme–grapheme link and engages young/struggling learners. The *simultaneous, multi-channel* encoding is the mechanism — not catering to a "style."

**When to use / when NOT.** Use for phonics, number, spelling, and any abstract concept that benefits from a concrete handle, especially early years and dyslexia. NOT as VAK "learning styles" (assigning a child a single sense — [[avoid-learning-styles]]). NOT gimmicky activities with no link to the concept.

**How to run it (steps).**
1. Present the concept through several senses *at once* (see + say + hear + trace/move).
2. Keep every channel tied to the *same* target idea.
3. Be explicit and structured (O-G is also systematic and cumulative).
4. Use movement/manipulatives to make the abstract concrete.

**1:1 AI-tutor adaptation.** Classai combines channels: **visual** (`image`/`whiteboard`, the animated character), **auditory** (TTS speech, the child saying it aloud via Whisper), **kinaesthetic/tactile** (tracing on the `whiteboard`, manipulating `sort`/`match` items, "show me with your fingers"). For phonics it does the O-G see-say-hear-trace loop. It deploys multisensory encoding for *all* learners, never to slot a child into a single "style."

**Primary example.** Learning the grapheme *sh* (Year 1): the child *sees* "sh," *hears* and *says* /sh/ ("quiet sound — finger on lips"), and *traces* it on the whiteboard while saying the sound — three channels, one target.

**Pitfalls.** Mistaking it for "learning styles" (the big one — flag and avoid); sensory activities disconnected from the concept; novelty without structure.

**Related.** [[supporting-dyslexia]], [[avoid-learning-styles]], [[reducing-cognitive-load]], [[universal-design-for-learning]]; play methods (manipulatives-as-play).

---

## AVOID: learning styles (and related inclusion fads)

**Family:** Differentiation & inclusion · **Evidence:** debunked — (Pashler et al. 2008; Willingham; Coffield 2004 — no evidence for the matching hypothesis) · **Best for:** *nothing* — this is a flag-and-avoid entry.

**What it is.** The popular but **false** belief that each child has a fixed "learning style" (visual/auditory/kinaesthetic, VAK) and learns best when taught in their style. Listed here precisely so the tutor *doesn't* do it.

**Why it (doesn't) work.** Repeated controlled studies find **no benefit** to matching instruction to a supposed style — the "meshing hypothesis" fails. Children do have preferences and prior knowledge, but tailoring to a sensory "style" wastes effort and can *limit* a child (e.g. excusing a "kinaesthetic learner" from reading). Content is usually best taught in the modality that suits the *content* (geography → maps; phonics → sounds), for *everyone*.

**When to use / when NOT.** Never differentiate by "learning style." DO differentiate by *readiness, prior knowledge, language, and interest*; DO use **multisensory** teaching (all senses, all children — not the same thing); DO use **dual coding** (words + images together — also not "styles").

**1:1 AI-tutor adaptation.** Classai must **not** label a child a "visual/auditory/kinaesthetic learner" in the `LearnerModel`, nor restrict modalities to a supposed style. It *does* record genuine differentiators (mastery, misconceptions, interests, language needs, what representation helped *this concept*) and uses multisensory/dual-coded teaching for all. If a parent supplies a "learning style," treat it as a preference, not a prescription.

**Primary example.** *Anti*-example: do **not** decide a child is "kinaesthetic" and skip reading practice. Do teach the *sh* sound multisensorially to *every* child, and teach maps visually because maps are visual — not because a child is a "visual learner."

**Pitfalls.** Storing a "style" as fact; reducing a child's diet of modalities; confusing multisensory/dual-coding (good) with learning-styles matching (debunked).

**Related.** [[multisensory-teaching]], [[tomlinson-content-process-product]], [[universal-design-for-learning]]; dual-coding (technology-and-multimedia methods).

---

## AVOID: other inclusion fads (overlays, Brain Gym, etc.)

**Family:** Differentiation & inclusion · **Evidence:** weak/debunked — (coloured overlays for dyslexia: weak; Brain Gym: no scientific basis; "left/right brain learners": myth) · **Best for:** *nothing* — flag-and-avoid.

**What it is.** A grab-bag of popular but unevidenced inclusion practices: **coloured overlays/tinted lenses** as a dyslexia *cure*, **Brain Gym** movements claiming to boost cognition, **left-brain/right-brain learner** labels, and similar. Listed so the tutor steers clear and recommends what works.

**Why it (doesn't) work.** None has robust evidence for the claimed effect. Overlays may help a small subset with a specific visual-stress condition but are **not** a literacy intervention; Brain Gym's neurological claims are pseudoscience; brain-hemisphere "types" are a myth. Time on these displaces structured, effective support.

**When to use / when NOT.** Avoid as *interventions*. (If a parent already uses a comfort aid that does no harm, don't fight it — but never present it as evidence-based or in place of real support.)

**1:1 AI-tutor adaptation.** Classai should ground its inclusion support in evidence — structured literacy, multisensory phonics, cognitive-load reduction, scaffolding, assistive tech — and **not** suggest overlays/Brain Gym/brain-type labels as solutions. Where a real need exists, point toward the evidenced method and (for diagnosis/therapy) the appropriate professional.

**Primary example.** *Anti*-example: don't offer a coloured overlay "to fix" a child's reading; offer TTS to remove the reading barrier and structured phonics to build decoding.

**Pitfalls.** Presenting fads as evidence-based; displacing effective support; overstepping into therapy/diagnosis.

**Related.** [[avoid-learning-styles]], [[supporting-dyslexia]], [[the-graduated-approach]], [[send-adaptations]].

---

## The inclusion principle in one line

**Know the child's strengths and barriers → keep the goal high → change the *route* (representation, support, language, pace, modality), not the ceiling → use evidenced methods (scaffolding, multisensory, load reduction, assistive tech) → review and adjust — and never reduce a difference in *how* a child learns to a limit on *what* they can learn.**

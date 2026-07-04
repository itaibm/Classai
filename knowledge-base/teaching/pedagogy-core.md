# Pedagogy Core — the Classai teaching playbook

This is the subject-agnostic "how to teach" file. It is the single most important grounding for lesson *quality*. Everything here is written for a **1:1 AI tutor teaching one child, ages 5–11 (UK KS1–KS2)**, through short, interactive, voice-led lessons.

Read the named frameworks below as a toolkit, not a curriculum. They overlap and reinforce each other. Each section ends with a **"How the tutor should apply this"** line that translates the theory into a concrete instruction for generating and running a Classai lesson (hook → explain → example → check → practice → recap).

A one-line summary of the whole file: **teach a small idea, model it clearly, let the child do it with support, check whether it landed, fix what didn't, and come back to it later.**

> **Evidence base.** The frameworks below are not opinion — they are distilled from the strongest research in education and AI tutoring. Two companion files hold the cited evidence and effect sizes:
> - [`research-learning-science.md`](research-learning-science.md) — what the best educational science (EEF Toolkit, cognitive science, reading science) says works, with sources.
> - [`research-ai-tutoring.md`](research-ai-tutoring.md) — what intelligent-tutoring-system and recent LLM-tutor studies say an AI teacher should and shouldn't do, with sources.
>
> When in doubt about a teaching move, those two files are the authority.

---

## 1. Rosenshine's Principles of Instruction

Barak Rosenshine distilled decades of research on effective teachers into ten principles. The most load-bearing for us:

1. **Begin with a short review of prior learning.** Recall warms up the relevant knowledge so the new idea has somewhere to attach.
2. **Present new material in small steps, with practice after each step.** Don't pour out the whole topic; teach one sub-step, let them try it, then the next.
3. **Ask a large number of questions and check the responses of all students.** In 1:1 this means *constant* low-stakes checking — you can't hide at the back of a class of one.
4. **Provide models** (worked examples, think-alouds).
5. **Guide student practice** — scaffold the first attempts heavily.
6. **Check for understanding** frequently (not just "does this make sense?" — actually test it).
7. **Obtain a high success rate** — aim for ~80% correct during guided practice. If the child is getting most things wrong, the step is too big.
8. **Provide scaffolds for difficult tasks**, then remove them.
9. **Require and monitor independent practice.**
10. **Engage students in weekly and monthly review** (this is spaced practice — see §5).

Concrete primary example — teaching "adding a two-digit and a one-digit number that crosses ten" (e.g. 27 + 5):
- Review: "First, quick one — what's 7 + 5?" (the prerequisite fact).
- Small step: just the "make the next ten" idea — 27 needs 3 to reach 30.
- Model: think aloud splitting the 5 into 3 and 2.
- Guided practice with a near-identical problem (28 + 4).
- Check understanding before moving to harder bridging.
- Aim for that 80% success — if they miss two in a row, the step was too big; shrink it.

**How the tutor should apply this:** Open every lesson's *hook/explain* with a 5–10 second recall of the named prior knowledge. Break the *explain* beat into the smallest teachable sub-steps and never present more than one before a quick check. Treat ~80% success in *check/practice* as the target band: lots of wrong answers ⇒ shrink the step; everything trivially right ⇒ raise the challenge.

---

## 2. Explicit / direct instruction & "I do / we do / you do" (gradual release)

For children, especially when introducing something genuinely new, **clear up-front teaching beats discovery.** Telling a 6-year-old to "discover" how to form the letter *b* wastes effort and breeds confusion. Show them, do it together, then let them go. This is the *gradual release of responsibility* (Pearson & Gallagher) — exactly the spine of Classai's beats.

- **I do** (teacher models, child watches): clear demonstration with a think-aloud. → maps to **explain**.
- **We do** (teacher and child do it together): shared attempt, teacher catches errors instantly. → maps to **example**.
- **You do** (child does it alone): independent attempt, teacher observes. → maps to **practice**.

Worked primary example — teaching capital letters at the start of a sentence:
- *I do:* "Watch me. 'the dog ran.' — every sentence starts with a capital, so I change the *t* to a big *T*: 'The dog ran.'"
- *We do:* "Your turn to help me. 'my cat sleeps.' — which letter do we make capital?" (do it together).
- *You do:* "Now you. Fix this one: 'sam likes jam.'" (child does it; use a `fillBlank` or `shortText` block).

The big mistake is skipping straight to "you do" — handing independent practice before modelling. The other mistake is *never* releasing — over-modelling so the child never actually does it themselves.

**How the tutor should apply this:** Honour the I-do/we-do/you-do arc literally: *explain* is the model (a think-aloud, a `steps` or `whiteboard` block), *example* is a joint attempt, *practice* is the child's solo go on an interactive block. Don't jump to *practice* without modelling first, and don't linger in *explain* — every lesson must reach a genuine "you do."

---

## 3. Worked examples & the worked-example effect

Studying a fully **worked example** (a complete, step-by-step solution) is more effective for novices than struggling through an equivalent unsolved problem. This is the *worked-example effect* (Sweller). The novice's working memory is freed from flailing and can attend to the *method*. As skill grows, fade from full worked examples → partially-completed examples → independent problems (this dovetails with scaffolding, §8).

Make worked examples **think-alouds**, not just answers: narrate the decisions ("I see the bigger number is on the bottom, so I'll start in the ones column…"). The reasoning is the lesson; the answer is incidental.

Primary example — a worked example for "half of 12":
> "Half means split into two equal groups. I have 12. I'll deal them out like cards: one for this pile, one for that pile… (6 and 6). The piles are equal, so half of 12 is 6."

Then a *partially*-worked one: "Half of 8 — I've started the piles, you finish dealing." Then independent: "Now half of 10, all you."

**How the tutor should apply this:** In *explain*/*example*, present complete worked solutions as think-alouds using the `steps` block (reveal one step at a time) or a `whiteboard`. As the child succeeds, fade: give a partially-finished example and have them complete it, then a clean problem. Never narrate only the answer — narrate the *decisions*.

---

## 4. Retrieval practice & low-stakes quizzing

**Pulling knowledge *out* of memory strengthens it far more than putting it *in* again** (the testing effect). Re-reading feels productive but barely helps; trying to recall — even when you fail and then see the answer — builds durable memory. Keep it **low-stakes**: a quiz to learn from, never to be judged by. Mistakes are information.

For young children, retrieval should feel like a game, not an exam: "Quick-fire — three things plants need to grow. Go!" A wrong recall followed by the correction is still a win.

Primary example — at the start of a science lesson on materials: "Before we start — tell me one thing you remember about metal. … And what about wood?" (free recall). Or a quick `multipleChoice`: "Which of these is waterproof?"

**How the tutor should apply this:** Open lessons with a quick retrieval of last lesson's key idea (a recall question or a one-item `multipleChoice`/`trueFalse`), not a re-explanation. Throughout, prefer asking the child to *produce* an answer (`numberEntry`, `shortText`, `fillBlank`) over showing them the answer again. Frame every check as low-stakes and safe: "Mistakes just tell us what to practise."

---

## 5. Spaced & interleaved practice

- **Spacing:** practice spread over time beats the same amount crammed together. A topic met today, revisited in a few days, then a couple of weeks later, sticks. Forgetting a little and then re-retrieving is the mechanism — it's *meant* to feel slightly effortful.
- **Interleaving:** mixing problem *types* within a session (a × b, then a − b, then a + b) beats doing twenty of the same in a row. Blocked practice feels smoother but the child is just repeating a motion; interleaving forces them to *choose* the method, which is the real skill. Use it carefully with the youngest learners — interleave only types they've each already met.

Primary example — instead of 10 straight "add 9" questions, mix: 8+9, 15−9, 9+6, 12−9. The child has to notice *which* operation each time. For the youngest, keep blocks of a new skill first, then interleave once it's secure.

**How the tutor should apply this:** Across lessons, deliberately resurface earlier topics — a *review* lesson or a single retrieval item from a previous topic dropped into today's hook (this is exactly what Classai's spaced-review system schedules). Within a *practice* beat, once two or more skills are secure, mix the question types rather than repeating one. Expect a little extra effort on revisits — that difficulty is doing the work, don't "rescue" too fast.

---

## 6. Cognitive load theory — limit new info, chunk it

Working memory holds only a few new items at once and tires quickly — and a child's is smaller than an adult's. Overload it and learning stops. Three practical rules:

- **Limit the new.** Introduce one new concept at a time; lean on what they *already* know.
- **Chunk it.** Break content into small, named pieces and only join them once each is secure ("first we find the tens, *then* the ones").
- **Cut extraneous load.** Remove anything that doesn't serve the idea — busy visuals, long preambles, two examples competing for attention. Cute but irrelevant decoration steals working memory.

Primary example — when teaching long-ish addition, *don't* simultaneously introduce a new word problem context *and* a new carrying procedure *and* a new layout. Hold two of those constant. Teach the carrying with bare numbers first; bring in word problems once carrying is automatic.

**How the tutor should apply this:** One new idea per lesson and (per the live teaching principles) one idea per *turn*. Keep speech short — a setup, not a lecture. Use blocks to *reduce* load (a `numberLine` or `whiteboard` that externalises the thinking) not to add spectacle. Don't combine two unfamiliar things in one beat; vary only one dimension at a time.

---

## 7. Dual coding — words + visuals

Information presented as **words *and* a relevant picture** is understood and remembered better than words alone, because they're processed by complementary channels (Paivio; Mayer's multimedia principle). The picture must *carry meaning*, not just decorate. And avoid *redundancy*: don't make the child read a wall of text *and* listen to the same words *and* parse a busy diagram at once — that splits attention.

Primary example — teaching fractions, pair the word "quarter" with an image of a pizza cut into four with one slice highlighted. Teaching "habitat", pair the word with a simple labelled scene. The visual does explanatory work the words can't.

**How the tutor should apply this:** Whenever an idea is easier *seen* than *heard*, attach exactly one meaningful visual block (`emojiViz`, `numberLine`, `whiteboard`, `image`, `slideshow`) alongside the spoken explanation — and keep the speech short so it complements rather than duplicates the visual. Pick the visual that *explains*, never one that merely decorates. One block per turn; don't stack competing visuals.

---

## 8. Concrete → Pictorial → Abstract (CPA)

Children grasp new mathematical (and many scientific) ideas best when they move through three stages (Bruner; the basis of UK "maths mastery"):

1. **Concrete** — real or imagined objects they could handle (counters, cubes, fingers, "3 apples").
2. **Pictorial** — a drawing or diagram that represents those objects (a `numberLine`, an array, a bar model, dots).
3. **Abstract** — the symbols alone (3 + 4 = 7).

Skipping to abstract too fast is the classic cause of fragile maths. The symbols are shorthand for something the child should be able to *picture*.

Primary example — "3 + 4":
- Concrete: "Three blocks here, four blocks here — push them together and count."
- Pictorial: an `emojiViz` "🟦🟦🟦 ➕ 🟥🟥🟥🟥" or dots on a `numberLine`.
- Abstract: "So we can just write 3 + 4 = 7."

**How the tutor should apply this:** For any new maths/quantity concept, anchor the *explain*/*example* beats in the concrete and pictorial before the abstract — use `emojiViz`, `numberLine`, `whiteboard` arrays/bar models to picture the idea, *then* write the symbols. If a child stumbles on the abstract form, drop back a stage rather than re-explaining the symbols.

---

## 9. Scaffolding & fading

A **scaffold** is temporary support that lets a child succeed at something just beyond what they could do alone (Vygotsky's *zone of proximal development*). The art is the *fade*: remove the support gradually so the child ends up doing it independently. Permanent scaffolds create dependence; absent scaffolds create failure.

Scaffolds include: sentence starters, a partly-completed example, a hint, a `numberLine` to lean on, a `wordBank`, breaking a task into steps, doing the first one together.

Primary example — writing a sentence about a picture:
- Heavy scaffold: a sentence starter + word bank ("The ___ is ___.").
- Lighter: just the starter.
- Faded: "Now write your own sentence about the picture."

**How the tutor should apply this:** Start guided practice with generous support (sentence starters, `wordBank` on `fillBlank`, a partial worked example, a `numberLine` aid) and *deliberately remove* it across the lesson/sessions as the child succeeds. If a *practice* item is too hard, add a scaffold rather than giving the answer; if it's too easy, strip one away. The goal of every lesson is an unsupported success by the end.

---

## 10. Questioning techniques (for 1:1)

Classroom techniques like "cold call" exist to keep 30 children thinking. In 1:1 the child is *always* the one called on — so the goal shifts to **getting genuine thinking, surfacing reasoning, and keeping it safe**:

- **Wait time.** After asking, *pause* and let them think — don't fill the silence. Young children need real seconds to formulate. Pause again after their answer; they often add the best part then.
- **Ask for reasoning, not just answers.** "Why do you think that?" / "How did you work it out?" — for *right* answers too, so reasoning isn't only demanded when they're wrong (which would teach them that "why?" means "you're wrong").
- **Probe, don't tell.** "What made you choose that one?" "What if it were 10 instead of 5?" "Can you show me with the blocks?"
- **One question at a time.** Don't stack three questions in a breath.
- **Make thinking safe.** "Have a go, even if you're not sure" / "There's no bad guess here."

Primary example — child says 6 × 4 = 24. Don't just say "yes." Ask "Nice — how did you get it?" If they say "I did 6, 12, 18, 24, counting in sixes," you've confirmed *understanding*, not luck.

**How the tutor should apply this:** Build genuine wait time into checks — ask, then stop. Routinely ask "why?"/"how did you work it out?" after *both* correct and incorrect answers, so reasoning is normal, not a punishment. Use `shortText`/`speak` blocks to capture reasoning, and keep prompts emotionally safe ("have a go"). Never stack multiple questions in one turn.

---

## 11. Formative assessment & responsive teaching

**Formative assessment** is checking *during* learning in order to *adapt* — not to grade. Its whole point is that what you find *changes what you do next*. A check that doesn't alter the lesson was a waste of a turn. "Responsive teaching" is acting on it: reteach, hint, advance, or branch based on the evidence.

The loop: **ask a revealing question → read the answer (and the reasoning) → diagnose → respond** (reteach / hint / advance). See `assessment-and-feedback.md` for the full diagnosis-and-feedback machinery.

Primary example — you check "what's ½ of 8?" and the child says 3. That's *evidence*: probably they're not splitting into equal groups. Responsive move: don't just say "it's 4" — go back to the concrete (deal 8 into two equal piles) and re-check with ½ of 6.

**How the tutor should apply this:** Treat every *check*/*practice* beat as live evidence and *act on it the same turn*: advance only on a real success, otherwise diagnose and adjust (reteach, scaffold, drop a CPA stage, or branch). The director's "learner is stuck" state is exactly this — when the child misses twice, stop advancing and respond. A check that doesn't change your next move was wasted.

---

## 12. Prerequisite / prior knowledge

New learning sticks to old learning. If the **prerequisite** isn't there, the lesson collapses — a child who can't yet count reliably to 20 cannot learn to add within 20, no matter how good the explanation. Identifying and (if needed) quickly shoring up prior knowledge is often the highest-leverage thing a tutor does. New knowledge is also *understood through* what's known — which is why tying examples to the child's existing interests works.

Primary example — before teaching "telling time to the half hour", check the prerequisites: do they know the numbers 1–12 on the clock face, and do they understand "half"? If "half" is shaky, that's today's real lesson.

**How the tutor should apply this:** Every lesson names its assumed prior knowledge (the analysis pass supplies `priorKnowledge`). Probe it in the *hook* with a quick retrieval question; if it's missing, pause the new content and shore up the prerequisite first — that *is* the responsive move, not a detour. Anchor new ideas in what the child already knows and likes.

---

## 13. Fluency vs understanding (you need both)

- **Understanding** = knowing *why* it works (½ of 8 is 4 because you split 8 into two equal groups).
- **Fluency** = doing it *fast and accurately* without burning working memory (instantly recalling 6 × 4 = 24).

You need both, in that order-ish: understanding first so the child isn't memorising nonsense, then practice to fluency so the basics become automatic and free up working memory for harder things. A child who must reconstruct every number bond from scratch has no capacity left for the multi-step problem on top. But fluency *without* understanding is brittle — they break the moment a problem looks unfamiliar.

Primary example — number bonds to 10. First *understand* them (with `emojiViz`/`numberLine`: 6 and 4 make a full ten-frame). Then drill to *fluency* (quick `flashcards`/quick-fire recall) so "6 + 4" is instant and they're not counting on fingers mid-way through a bigger sum.

**How the tutor should apply this:** Teach for understanding first (CPA, worked examples, "why?"), *then* build fluency on secured ideas through quick, low-stakes, spaced retrieval (`flashcards`, quick-fire). Don't drill something the child doesn't yet understand — that bakes in fragility. Once a foundational skill is understood, getting it automatic is a legitimate lesson goal in itself.

---

## 14. Motivation & growth mindset — praise the *process* (correctly)

Children persist when they believe ability *grows with effort* (Dweck's growth mindset) and when work feels achievable and meaningful. The well-known, easy-to-get-wrong part is praise:

- **Praise the process, specifically** — the strategy, the effort, the perseverance: "You kept going when it got tricky and tried a different method — that's exactly what good mathematicians do." / "You lined up the place values really carefully."
- **Avoid person/ability praise** — "You're so clever / a natural" backfires: it frames ability as fixed, so the child later *avoids* hard tasks to protect the "clever" label, and crumbles when something is hard ("I guess I'm not clever after all").
- **Praise must be honest.** Empty "great job!" on a wrong answer teaches nothing and the child knows it's hollow. Acknowledge the *effort or part that was good*, then work on the rest.
- **Frame mistakes as information**, never as failure. "Brilliant mistake — it shows exactly what to practise."
- **Make success visible and achievable** (the ~80% success band from Rosenshine keeps motivation up; constant failure kills it).

Primary example — child struggles, tries three times, gets it: "Did you notice you didn't give up? You changed your method and it worked. *That's* the skill." Not "You're so smart."

**How the tutor should apply this:** Praise the specific *thinking, strategy, or effort* you actually observed — never global ability ("clever", "smart", "a natural"). Keep praise honest: on a wrong answer, name the part that was good, then fix the rest. Treat mistakes out loud as useful information. Keep difficulty in the ~80%-success band so the child experiences earned, frequent wins. (This is exactly the "process praise" the live teaching prompt already calls for — apply it rigorously.)

---

## Quick reference — the playbook in one screen

| Principle | The move | In a Classai lesson |
|---|---|---|
| Rosenshine | small steps, lots of checks, ~80% success | shrink steps until the child mostly succeeds |
| I do/we do/you do | model → together → solo | explain → example → practice |
| Worked examples | show full solutions, then fade | think-aloud `steps`/`whiteboard`, then partial |
| Retrieval practice | recall, don't re-read | open with a recall question; ask them to produce |
| Spacing & interleaving | revisit later; mix types | spaced-review lessons; mix secure skills in practice |
| Cognitive load | one new thing, chunked, no clutter | one idea per turn; short speech; clean visuals |
| Dual coding | words + meaningful picture | one explanatory visual block per turn |
| CPA | concrete → pictorial → abstract | objects → `numberLine`/array → symbols |
| Scaffolding | support, then fade | start with starters/word banks; remove them |
| Questioning | wait time; "why?"; one at a time | pause; ask reasoning on right answers too |
| Responsive teaching | check, diagnose, adapt | act on every check the same turn |
| Prerequisites | shore up prior knowledge first | probe priorKnowledge in the hook |
| Fluency vs understanding | understand first, then automate | CPA first, then spaced quick-fire drill |
| Growth mindset | praise process, honestly | name the strategy/effort; mistakes = info |

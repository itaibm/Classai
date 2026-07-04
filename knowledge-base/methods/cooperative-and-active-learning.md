# Cooperative & active learning methods

This family covers methods built on **social interaction and physical/active participation**: children learning *with and from each other*, and learning by *doing/moving* rather than passively receiving. Cooperative learning is one of the best-evidenced families in education (EEF "Collaborative learning" +5 months; Johnson & Johnson's decades of meta-analysis).

But Classai is a **solo 1:1 AI tutor** — there is no peer in the room. So the central design question for every method here is: **how does a single tutor with an avatar simulate the social benefit?** The recurring answers are:

- **The avatar/tutor plays a role** — partner, fellow-learner, opponent in a debate, a confused student to be taught.
- **The parent is recruited** where a real second person genuinely helps (TPR, role-play, debate).
- **The cognitive mechanism is reproduced without the group** — e.g. explaining-to-learn works because *articulating* builds understanding; the tutor gets that by having the child explain *to it*.

Each entry's **1:1 AI-tutor adaptation** line is therefore the most important — it's where a group method becomes usable by a lone tutor. See also `cooperative-and-active-learning`'s siblings and `pedagogy-core.md` (active processing, articulation).

---

## Cooperative learning (Johnson & Johnson)

**Family:** Cooperative & active learning · **Evidence:** strong — EEF Collaborative learning +5 months; Johnson & Johnson meta-analyses show cooperation beats competition/individual work for achievement *when structured* · **Best for:** consolidation, reasoning, motivation; ages 6–11 (in classrooms).

**What it is.** Structured group learning built on five conditions: **positive interdependence** (we sink or swim together), **individual accountability** (each child is answerable), **promotive interaction** (helping each other), **social skills**, and **group processing** (reflecting on how the group worked). It is *not* just "group work."

**Why it works.** Explaining to a peer forces articulation and exposes gaps (the protégé effect); hearing a near-peer's reasoning is often more accessible than an adult's; accountability prevents free-riding; the social stake raises motivation.

**When to use / when NOT.** In a classroom, for consolidation/discussion once basics exist. The famous failure mode: **unstructured group work** — without individual accountability and positive interdependence, one child does it all and the rest coast. For a solo tutor, the group itself is absent — only the *mechanisms* transfer.

**How to run it (steps).** (classroom)
1. Set a task that genuinely needs the group (interdependence).
2. Give each child a role/portion (accountability).
3. Teach the social skill needed.
4. Run it; monitor.
5. Group processing: "what helped us work well?"

**1:1 AI-tutor adaptation.** The tutor reproduces the *mechanisms*, not the group: **articulation** (the child explains their answer to the tutor — "teach me how you did that"), **accountability** (every answer is the child's own, captured in a block), and **near-peer reasoning** (the avatar can model a fellow-learner's thinking). The avatar plays "partner" in *example* (we do) beats. Where real cooperation would add value (a debate, a role-play), the tutor invites the **parent** in. Two-tier memory plays the role of "group processing": the recap reflects on *how* the child worked, not just what.

**Primary example.** Maths, Year 4: instead of a group sorting shapes, the tutor and child "team up" to sort 2-D shapes (`categorize` block) — tutor sorts one, child the next, tutor deliberately makes a small error for the child to catch (interdependence simulated).

**Pitfalls.** Confusing structured cooperation with "just put them in groups"; (for the tutor) the avatar doing the thinking instead of the child.

**Related.** [[jigsaw]], [[think-pair-share]], [[peer-tutoring-and-peer-assessment]]

---

## Jigsaw

**Family:** Cooperative & active learning · **Evidence:** moderate-strong — Aronson's jigsaw improves achievement and inter-group relations; relies on genuine interdependence · **Best for:** dividing a body of content; reading/topic work; ages 8–11 (classrooms).

**What it is.** A cooperative structure where each child becomes the "expert" on one piece of a topic (in an expert group), then returns to a home group and teaches their piece — so the whole is assembled only if everyone contributes (built-in positive interdependence).

**Why it works.** Each child *must* learn their piece well enough to teach it (protégé effect + accountability), and the group depends on each member, so engagement is structural, not exhorted.

**When to use / when NOT.** For dividing a topic into teachable chunks once each chunk is within reach. Needs at least a small group — so for a solo learner the *teaching-back* mechanism is what transfers.

**How to run it (steps).** (classroom)
1. Split the topic into N pieces.
2. Each child masters one piece (with support).
3. Children teach their piece to the others.
4. Synthesise the whole; check everyone learned all pieces.

**1:1 AI-tutor adaptation.** The tutor simulates jigsaw across **a sequence of beats or sessions**: the child becomes "expert" on one sub-part (learns it), then **teaches it back to the avatar**, who plays the not-yet-knowing group member ("I don't get this bit — explain it to me"). The protégé effect is captured solo. For a multi-part topic, the tutor can take the *other* parts and the child theirs, then they "teach each other" (the tutor's teaching is the explain beat; the child's is the check).

**Primary example.** Science, Year 5, "the planets": the child becomes expert on Mars, teaches the avatar three facts, then the avatar shares Jupiter — each "teaches" the other; the child is checked on both.

**Pitfalls.** Pieces too hard for a child to master alone; (solo) skipping the teach-back, which *is* the method.

**Related.** [[learning-by-teaching-the-protege-effect]], [[reciprocal-teaching]], [[cooperative-learning-johnson-and-johnson]]

---

## Think–pair–share

**Family:** Cooperative & active learning · **Evidence:** strong as a routine — increases participation and processing; low-cost, high-yield · **Best for:** any subject, any age; making every child think before anyone answers.

**What it is.** A three-step routine: **think** (each child considers the question alone, with wait time) → **pair** (compare with a partner) → **share** (some share with the class). It guarantees private processing before public response.

**Why it works.** The "think" step gives wait time and individual processing (no one hides); the "pair" step rehearses and refines reasoning in low stakes before going public, raising both quality and confidence.

**When to use / when NOT.** Almost any check or discussion question. The "pair" step needs a partner — the part to preserve for a solo learner is the **think-with-wait-time** and a **rehearsal before committing**.

**How to run it (steps).**
1. Pose a question.
2. Think: silent individual time (don't accept instant answers).
3. Pair: discuss with a partner.
4. Share: a few report out.

**1:1 AI-tutor adaptation.** The tutor builds in **wait time** explicitly (the *think*) — it does not rush the child or fill silence. The *pair* becomes "rehearse it with me first" — the avatar acts as the low-stakes partner: "Tell me your first thought before you commit." Then the child *shares* the committed answer in a block. This preserves the processing/rehearsal benefit with no second child. The watchdog/turn timing in the director should allow genuine think time, not auto-advance.

**Primary example.** English, Year 3: "Think: was it fair for the giant to chase Jack? (have a think)… Now tell me your first idea… okay, now give me your proper answer." (`shortText`/`speak`).

**Pitfalls.** Killing wait time by talking into the silence; (solo) skipping straight to "share" with no rehearsal.

**Related.** [[think-pair-share]], questioning/wait-time methods (Part 1), [[cooperative-learning-johnson-and-johnson]]

---

## Reciprocal teaching

**Family:** Cooperative & active learning · **Evidence:** strong for reading comprehension — Palincsar & Brown 1984; EEF Reading comprehension strategies +6 months · **Best for:** reading comprehension; ages 8–11 (and adaptable younger).

**What it is.** A structured dialogue around a text using four strategies, with the learner gradually taking the "teacher" role: **predict, question, clarify, summarise.** Originally a teacher-and-group routine where the role of dialogue leader passes to students.

**Why it works.** It makes the invisible strategies of good readers visible and practised, and the handover of the "teacher" role builds metacognitive control and the protégé effect.

**When to use / when NOT.** For comprehension of any text the child can decode. Needs modelling first (don't hand the role over cold). It's a dialogue method — perfect for a conversational tutor.

**How to run it (steps).**
1. Read a chunk of text.
2. Model the four moves: predict what's next, ask a question about it, clarify a hard word/idea, summarise it.
3. Gradually pass each move to the child.
4. Repeat across chunks, fading your support.

**1:1 AI-tutor adaptation.** This is a *natural fit* — the tutor and child take turns as "dialogue leader." Across **example→check→practice** beats, the tutor first models predict/question/clarify/summarise on a passage (`richText`), then hands moves to the child one at a time ("Your turn — ask me a question about this paragraph"). The fading of the leader role is exactly scaffold-fading; the child's summaries go to `shortText`/`answerEval`. The avatar can play "the reader who got confused" so the child clarifies for it.

**Primary example.** English, Year 4, reading a short non-fiction passage on volcanoes: tutor models a prediction and a clarifying question on paragraph 1; child leads paragraph 2 (predicts, questions, clarifies "magma", summarises).

**Pitfalls.** Handing over the role before modelling; turning it into a comprehension quiz rather than a dialogue.

**Related.** [[learning-by-teaching-the-protege-effect]], [[jigsaw]], reading comprehension methods (Part 1)

---

## Peer tutoring & peer assessment

**Family:** Cooperative & active learning · **Evidence:** strong — EEF Peer tutoring +5 months; benefits *both* tutor and tutee · **Best for:** practice/consolidation, fluency, feedback; ages 6–11 (cross-age pairs especially).

**What it is.** Children teaching or assessing each other: one explains/coaches (gaining from the protégé effect) while the other gets individualised attention and feedback. Peer assessment has children evaluate each other's work against criteria.

**Why it works.** The tutor learns by explaining and diagnosing; the tutee gets responsive, near-peer help; assessing others' work sharpens the child's grasp of what "good" looks like (which improves their own work — links to metacognition).

**When to use / when NOT.** For practice and feedback on something both children partly know. Peer assessment needs clear criteria (or it's just "I like it"). Both depend on a second child — so the tutor reproduces *both* the explaining-to-learn and the assessing-against-criteria mechanisms solo.

**How to run it (steps).**
1. Pair children; give the tutor a clear coaching focus or the assessor clear criteria.
2. Tutor coaches / assessor evaluates against the rubric.
3. Swap roles where possible.
4. Debrief.

**1:1 AI-tutor adaptation.** Two distinct moves. (1) *Peer tutoring*: the **child tutors the avatar** ("Coach me — I keep getting this wrong") so the child gets the protégé effect; the tutor deliberately makes a typical error for the child to correct. (2) *Peer assessment*: the tutor shows a sample answer (e.g. another, fictional child's) and asks the child to **mark it against criteria** ("Did this answer use a capital letter? a full stop? a wow-word?") — assessing-to-learn without a second child. This builds the child's success criteria, feeding back into their own `practice`.

**Primary example.** English, Year 3: the tutor shows "the dog ran fast it was happy" and asks the child to mark it against a checklist (capitals, full stops) and fix it — assessing another's work to sharpen their own.

**Pitfalls.** Peer assessment with no criteria; the child "tutoring" the avatar but the avatar carrying the load; using a sample answer too far from the child's level.

**Related.** [[learning-by-teaching-the-protege-effect]], peer/self-assessment in `metacognition-and-self-regulation.md`, [[reciprocal-teaching]]

---

## Structured debate

**Family:** Cooperative & active learning · **Evidence:** promising — develops reasoning, evidence use, and oral language; best with structure · **Best for:** reasoning, persuasive language, considering other views; ages 8–11.

**What it is.** A formatted argument where children take and defend positions on a question, marshalling reasons and evidence, and respond to the other side — within rules that keep it civil and balanced.

**Why it works.** Defending a position forces the child to organise reasons and anticipate counters (deep processing); arguing a side they may not hold builds perspective-taking and flexible thinking; the format channels energy into reasoning.

**When to use / when NOT.** For genuinely two-sided questions where the child knows enough to argue. Not for matters of fact (you don't debate 7×8) or topics too remote from the child's knowledge.

**How to run it (steps).**
1. Pose a balanced, debatable question.
2. Assign positions (assign the *less* intuitive side to stretch thinking).
3. Give prep time to gather reasons.
4. Argue; require responding to the other side, not just restating.
5. Debrief the strongest reasons on each side.

**1:1 AI-tutor adaptation.** The **avatar takes the opposing side** — the tutor argues *against* the child to force them to defend and rebut ("I think homework is great because… convince me otherwise"). The director caps it so the avatar concedes gracefully and the child wins on reasoning, protecting motivation. For a richer debate, the tutor recruits the **parent** as the second debater while it referees. Reasoning quality is logged, not a winner.

**Primary example.** PSHE/English, Year 5: "Should children have screen time limits?" — the avatar argues for unlimited screens; the child must build the case for limits with reasons, then the avatar rebuts once and concedes.

**Pitfalls.** Debating points of fact; letting it become a personal contest rather than reasoning; the avatar "winning" and deflating the child.

**Related.** [[role-play-and-simulation]], [[socratic-seminar]] (in `inquiry-and-problem-based.md`), [[case-method]]

---

## Role-play & simulation

**Family:** Cooperative & active learning · **Evidence:** moderate — improves engagement, empathy, and recall of contextualised knowledge; strong in history, languages, PSHE · **Best for:** history, languages, social/emotional, science processes; ages 5–11.

**What it is.** Children act out a situation, role, or system — being a Roman soldier, ordering food in French, "being" the water cycle — learning through embodied, contextual enactment.

**Why it works.** Embodiment and narrative make abstract content concrete and memorable (dual coding, emotional salience); taking a role builds empathy and perspective; in languages it forces authentic use.

**When to use / when NOT.** For bringing content to life and for situational skills (a conversation, a historical decision). Less efficient for abstract procedures. Needs a partner for two-way role-play.

**How to run it (steps).**
1. Set the scene and roles clearly.
2. Give a goal within the scene.
3. Enact; coach in role.
4. Step out and reflect on what was learned.

**1:1 AI-tutor adaptation.** The **avatar plays the other character** — the shopkeeper the child orders from (languages), the citizen the child interviews (history), the partner in a dialogue. The tutor stays in role for the exchange (`speak`/`shortText`), then steps out to consolidate. For physical/embodied role-play (acting the water cycle), the tutor *narrates and directs* while the child performs, optionally with the **parent** joining. Memory notes vocabulary used / perspective taken.

**Primary example.** Spanish, KS2: the avatar is a café waiter ("¿Qué quieres?") and the child orders, paying with role-played money — authentic use of taught phrases.

**Pitfalls.** Role-play with no learning goal (just fun); the tutor over-scripting so the child doesn't actually produce language/reasoning; abstract topics forced into role-play awkwardly.

**Related.** [[total-physical-response-tpr]], [[structured-debate]], [[kinaesthetic-learning]]

---

## Learning by teaching / the protégé effect

**Family:** Cooperative & active learning · **Evidence:** strong — explaining to others (real or simulated) deepens the explainer's understanding (Chi; Bargh & Schul; teachable-agent studies, Biswas et al.) · **Best for:** consolidation, exposing gaps, metacognition; ages 6–11.

**What it is.** The learner teaches the material to someone else — a peer, a younger child, or a **teachable agent** (a computer "student" the child instructs). The act of teaching, even to a non-human "protégé," improves the teacher's own learning.

**Why it works.** To teach, you must organise, simplify, and anticipate confusion — that *generative* processing builds robust understanding and surfaces your own gaps. The "protégé effect": children work harder and learn more when responsible for a protégé's learning than for their own (a face-saving motivational boost — it's the agent who'll fail, not them).

**When to use / when NOT.** Superb for consolidation *after* initial learning. Don't use it to *introduce* content (you can't teach what you don't know). The teachable-agent variant is uniquely suited to a screen-based AI tutor.

**How to run it (steps).**
1. Ensure the child has learned the thing (roughly).
2. Give them a "student" to teach.
3. Have them explain/demonstrate it.
4. The student asks questions / makes errors the child must address.
5. Reflect on what teaching revealed.

**1:1 AI-tutor adaptation.** This is the **flagship adaptation for a solo tutor**: the **avatar becomes a teachable agent** — a friendly, slightly-confused younger "student" the child teaches. "I'm learning this too — can you show me how to add these fractions?" The avatar asks naive questions and makes a deliberate, typical error; the child must explain and correct it (the misconception the tutor *wanted* surfaced). The child's explanation goes to `answerEval`; gaps it reveals enter the remedy loop and the `LearnerModel`. The protégé framing also protects motivation — the child is the competent helper.

**Primary example.** Maths, Year 4: the avatar "Robo" says "I think to add 1/2 and 1/4 you just add the tops and bottoms to get 2/6 — is that right?" and the child has to spot and fix the error, teaching Robo the correct method.

**Pitfalls.** Using it before the child knows the material; the avatar's "error" being too subtle or too silly; not acting on the gaps the teaching reveals.

**Related.** [[jigsaw]], [[reciprocal-teaching]], [[peer-tutoring-and-peer-assessment]]

---

## Total physical response (TPR) — especially languages

**Family:** Cooperative & active learning · **Evidence:** moderate-strong for early language vocabulary/comprehension (Asher); strong for young learners · **Best for:** world languages, early vocabulary, following instructions; ages 5–9 especially.

**What it is.** Pairing language with **physical movement**: the teacher gives commands ("stand up," "touch your nose," "jump") and the learner responds with actions before being asked to speak. Comprehension and movement precede production.

**Why it works.** Linking words to actions creates strong, multi-sensory memory traces (dual coding + motor encoding); responding physically lets beginners show understanding without the stress of speaking, lowering the affective filter (anxiety) and freeing acquisition.

**When to use / when NOT.** Excellent for introducing concrete vocabulary and commands to young language learners. Less suited to abstract vocabulary or grammar. The physical response needs the child to actually move — a screen tutor must enlist real movement.

**How to run it (steps).**
1. Model the word + action together ("*salta!*" — and jump).
2. Say the word; the child does the action (comprehension, no speaking).
3. Build a sequence of commands.
4. Later, the child gives the commands (production).

**1:1 AI-tutor adaptation.** The tutor **issues commands and the child physically performs them** — "When I say *toca la cabeza*, touch your head!" The avatar can demonstrate the action on screen (animation), and the child mirrors it in the room. Because the app can't *see* the movement, it relies on the honour system + a follow-up comprehension check (`multipleChoice` with images, or "now you tell *me* the command"). The **parent** can join to verify/encourage movement. This is also a built-in brain-break (movement) for young learners.

**Primary example.** Spanish, Year 3: the avatar calls "*salta, gira, siéntate*" and the child jumps, spins, sits — then the child commands the avatar, switching to production.

**Pitfalls.** No real movement (defeats the method); pushing to speaking too soon; using it for abstract words it doesn't suit.

**Related.** [[role-play-and-simulation]], [[kinaesthetic-learning]], languages methods/resources

---

## Active-learning routines

**Family:** Cooperative & active learning · **Evidence:** strong as a principle — active engagement beats passive listening (Freeman et al. 2014; "minds-on" processing) · **Best for:** every subject and age; keeping the child *doing*, not just listening.

**What it is.** Short, repeatable routines that make the learner *act on* the content every minute or two: turn-and-talk, mini-whiteboard show-me, hands-up votes, "everybody answers," quick-write, sort/categorise. The opposite of a child sitting and absorbing.

**Why it works.** Learning requires the learner to *do something with* the material (encode, retrieve, manipulate). Passive exposure feels like learning but barely sticks; active processing forces engagement and produces evidence the teacher can respond to. (Note: "active" means *minds-on*, not merely hands-busy — colouring is active hands, passive minds.)

**When to use / when NOT.** Constantly. The only caution: activity must serve thinking — busy hands with idle minds (decorative crafts, copying) is the failure mode.

**How to run it (steps).**
1. After any short input, insert an action ("show me on your whiteboard," "tell me one thing you remember").
2. Require *everyone* to respond (in a class) — in 1:1, every turn is the child's.
3. Use the responses to decide what's next.

**1:1 AI-tutor adaptation.** This is structurally guaranteed in a 1:1 tutor — **every turn the child acts** (a block, a spoken answer). The lesson-anatomy rule "mostly the learner doing, not listening" *is* active learning. The tutor's job is to never monologue across several turns: the director should flag if too many `explain`/display-only beats pass without an interactive block. The universal answer bar (mic+type) keeps the child producing on every turn.

**Primary example.** Any: instead of the tutor reading three facts about Vikings, it gives one fact then "your turn — tell me back one thing, or pick the true statement" (`multipleChoice`).

**Pitfalls.** "Active" that's hands-busy/minds-idle; long tutor monologues with no child action; activity for its own sake with no thinking.

**Related.** [[think-pair-share]], retrieval practice (Part 1), [[kinaesthetic-learning]]

---

## Kinaesthetic learning (the method, not the myth)

**Family:** Cooperative & active learning · **Evidence:** mixed — **movement-as-encoding is real and useful; "kinaesthetic *learning style*" is a debunked myth — AVOID** (see learning-styles note) · **Best for:** embodying concepts; young children; brain-breaks; ages 5–9 especially.

**What it is.** Using **movement and the body** to learn — acting out, manipulating objects, walking a number line, gesturing a concept. Valuable as a *method for everyone*, especially young children.

**Why it works.** Embodied cognition: gesture and movement can offload working memory and create motor memory traces that aid recall (Goldin-Meadow on gesture; manipulatives in maths). Movement also re-energises and suits young children's need to move.

**When to use / when NOT — and the myth to kill.** Use movement to make abstract ideas concrete and to re-energise. **But do NOT classify a child as a "kinaesthetic learner" and teach them *only* through movement.** The "learning styles" theory (VAK — visual/auditory/kinaesthetic matching) is **comprehensively debunked**: there is no reliable evidence that matching instruction to a supposed style improves learning, and acting on it wastes effort and limits children (Pashler et al. 2008; Coffield 2004). The right take: *everyone* benefits from movement for *suitable* content; no one should be pigeonholed. Flag any "what's your learning style?" framing as **AVOID**.

**How to run it (steps).**
1. Pick content that has a physical analogue (number line, shapes, a process).
2. Embody it (walk it, act it, manipulate it).
3. Bridge from the action to the abstract representation.
4. Don't restrict the child to movement-only — combine modalities.

**1:1 AI-tutor adaptation.** The tutor builds in movement deliberately for young learners: "stand up and take 3 big steps forward on our number line, then 2 back — where are you?" (the room becomes a number line); manipulatives at home for counting; gestures for grammar. Crucially, the tutor treats this as a tool **for every child**, never as a fixed "style," and always **bridges back to the symbolic** (the number line on the `numberLine` block). The `LearnerModel` records *interests and what re-engages this child* — not a bogus "learning style" label.

**Primary example.** Maths, Year 1: the child physically jumps along a floor number line to add (4, jump 3 more, land on 7) before doing it on the `numberLine` block.

**Pitfalls.** **Labelling a child by learning style (debunked — avoid);** movement that never connects to the abstract idea; movement as mere fun with no learning.

**Related.** [[total-physical-response-tpr]], [[kinaesthetic-learning]], CPA/manipulatives (Part 1), [[active-learning-routines]]

---

## Note on the social-to-solo translation

Across this whole family, the recurring design pattern for Classai is:

| Group method's engine | How the solo tutor reproduces it |
|---|---|
| Explaining to a peer (protégé effect) | Child **teaches the avatar** (teachable agent) |
| Hearing near-peer reasoning | Avatar **models a fellow-learner's** thinking |
| Accountability / no hiding | Every turn carries the **child's own** answer |
| Rehearse before going public (pair) | "Tell me your first idea, then commit" |
| Two-sided argument (debate) | Avatar takes the **opposing side**; parent for real debate |
| Two-way conversation (role-play, TPR) | Avatar plays the **other character**; parent for richer play |
| Group processing | The **recap** reflects on *how* the child worked |

When a method truly needs a second human (rich debate, two-way physical play), the honest move is to **recruit the parent** — Classai's home-ed context makes that available. The tutor should know when to ask for a person and when the avatar suffices.

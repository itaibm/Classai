# Methods — Technology-Enhanced & Multimedia Learning

How to use screens, media, audio, video and adaptive software so they *help* learning rather than decorate it. For a 1:1 AI tutor this family is central: Classai *is* an educational technology, and most of its "teaching" arrives as multimedia (spoken words + an animated character + display/interactive blocks). Get these methods right and the medium amplifies learning; get them wrong and the medium adds noise the child has to filter out.

Companion file: see [[research-ai-tutoring]] for the evidence base on AI/computer tutoring, and [[representation-and-modelling]] for dual coding in any medium.

---

## Mayer's Principles of Multimedia Learning

**Family:** Technology & multimedia · **Evidence:** strong — Richard Mayer's Cognitive Theory of Multimedia Learning, decades of controlled studies; aligns with Cognitive Load Theory (Sweller). · **Best for:** designing every explanation that combines words with pictures, animation, audio or video — i.e. almost every Classai "explain" beat.

**What it is.** A set of research-backed rules for combining words and visuals so they reduce, not increase, cognitive load. The headline principles:
- **Coherence** — cut anything that isn't needed (decorative images, background music, fun-but-irrelevant facts). Less is more.
- **Signalling** — highlight/point to what matters (arrows, bold, "notice the denominator").
- **Redundancy** — don't make the child read on-screen text *and* hear the same words verbatim at the same time; pick one channel for the same information.
- **Spatial contiguity** — put labels next to the thing they label, not in a key far away.
- **Temporal contiguity** — show the picture and say the matching words at the same time, not one then the other.
- **Modality** — explain a diagram with *spoken* words rather than on-screen text (frees the visual channel). Strongly relevant to a voice-led tutor.
- **Segmenting** — break a long explanation into learner-paced chunks with a "continue".
- **Pre-training** — teach the key names/terms before the full explanation.
- **Personalisation** — conversational, warm wording ("let's…", "you'll see…") beats formal narration.

**Why it works.** Working memory has separate, limited visual and verbal channels. These rules stop the two channels from overloading or duplicating each other, leaving capacity for actual thinking.

**When to use / NOT.** Use for every multimedia explanation. The one caution: the **redundancy** and **modality** effects can reverse for learners with weak language/decoding or for very technical terms — sometimes seeing a key word *written* helps. Adapt to the child.

**How to run it (steps).**
1. State the one idea the media must land.
2. Choose a single representation; strip everything decorative (coherence).
3. Narrate the visual with spoken words, timed to what's on screen (modality + temporal contiguity).
4. Signal the key part as you say it.
5. Break into continue-paced segments; don't dump it all at once.

**1:1 AI-tutor adaptation.** The app already separates *spoken* teacher speech from *display blocks* — that's the modality principle for free. So: let the avatar **say** the explanation while a `whiteboard`/`numberLine`/`image` shows the visual; do **not** also pack the same sentence into the block as text (redundancy). Keep `richText` blocks short and use them for the *key* line, not a transcript. Use `slideshow`/`steps` for segmenting. Drop decorative emoji/images that don't carry meaning.

**Primary example.** Explaining the water cycle: avatar narrates "watch the sun heat the sea — the water rises as invisible vapour…" while a `whiteboard` animates sun → arrows up → cloud → rain. No paragraph of on-screen text repeating the narration; one labelled arrow ("evaporation") signalled as it's named.

**Pitfalls.** Reading slides aloud word-for-word (redundancy); cute but irrelevant animations (coherence); a wall of on-screen text under a talking avatar; visual and narration out of sync.

**Related.** [[representation-and-modelling]], [[Segmenting & pacing]], [[Educational video done well]].

---

## Educational video done well (active, not passive)

**Family:** Technology & multimedia · **Evidence:** moderate–strong — video is only as good as the thinking it provokes; segmented, interactive video beats continuous viewing (Guo et al. 2014 on engagement; retrieval research on pausing). · **Best for:** introducing a phenomenon, showing something un-seeable (slow-mo, space, history), or demonstrating a process.

**What it is.** Using short video as a teaching tool with built-in thinking, rather than as a babysitter.

**Why it works.** Video can show what words can't, but passive watching produces little learning — the mind drifts. Stopping to predict, retrieve or explain converts watching into studying.

**When to use / NOT.** Use a clip when motion/reality genuinely adds something (a volcano, a chemical reaction, a native speaker's accent). NOT as a default explainer for things the tutor can teach interactively, and never a long unbroken clip for young children.

**How to run it (steps).**
1. Keep clips short (often 2–6 minutes for primary; shorter for KS1).
2. Give a *watching task* first ("find out why…", "count how many…").
3. Pause at key moments to predict or explain ("what do you think happens next?").
4. After: retrieve ("tell me the three stages we saw") before moving on.
5. Re-watch a tricky section rather than ploughing on.

**1:1 AI-tutor adaptation.** When the tutor uses a `video` block, it should (a) set a watching task in its speech first, (b) follow the clip with a `check` block that retrieves what was shown, not just "did you like it?". Prefer named, real educational sources (BBC Bitesize/Teach, Numberblocks, etc. — see each subject's `resources.md`); if no real URL can be resolved, build a `slideshow`/`whiteboard` instead of guessing a link (this protects against hallucinated video IDs — see [[research-ai-tutoring]]).

**Primary example.** Y5 Earth & Space: 90-second clip of the Earth rotating into night → pause → "so is it the Sun moving or the Earth?" → after, a `trueFalse`: "The Sun goes round the Earth each day." (false).

**Pitfalls.** Long passive clips; "edutainment" with a high fun-to-learning ratio; no follow-up retrieval; autoplaying the next unrelated video.

**Related.** [[Mayer's Principles of Multimedia Learning]], [[retrieval-and-memory]].

---

## Virtual manipulatives & simulations

**Family:** Technology & multimedia · **Evidence:** moderate — virtual manipulatives can match or complement physical ones (PhET sims widely studied at older levels; primary evidence positive when guided). · **Best for:** maths concepts (place value, fractions, number lines), science models (forces, circuits, states of matter) where a physical kit is impractical.

**What it is.** On-screen objects the child manipulates — base-ten blocks, fraction bars, a balance, a circuit — to explore a concept.

**Why it works.** Gives concrete/pictorial experience (the C and P of [[representation-and-modelling]]'s CPA) on demand, with instant feedback and no mess, and can make the invisible visible (e.g. electrons, forces).

**When to use / NOT.** Use to bridge concrete→abstract and to let a child *test* ideas. NOT as a replacement for *some* real physical manipulation in the early years (real beans, real coins matter), and not for open free-play without a guiding question (novices need guidance — see [[inquiry-and-problem-based]]).

**How to run it (steps).**
1. Pose a question the tool can answer ("can you make 1/2 a different way?").
2. Let the child *act*, then predict before they see the result.
3. Connect the on-screen action to the symbols ("you just showed 3 tens and 4 ones — that's 34").
4. Fade the tool as the child internalises the idea.

**1:1 AI-tutor adaptation.** The app's **interactive** blocks are lightweight virtual manipulatives: `numberEntry` on a `numberLine`, `categorize`, `ordering`, `matchPairs`, and especially the interactive `custom` block. Use them so the child *does* (places, sorts, builds), then have the tutor name the abstract symbol. Remember the rule: display blocks are look-only — to let the child manipulate, it must be an interactive block.

**Primary example.** Fractions: an interactive `custom`/`matchPairs` where the child matches 1/2, 2/4, 3/6 to the same shaded bar, then the tutor says "all the same amount — equivalent fractions."

**Pitfalls.** Tool does the thinking for the child; pretty but aimless dragging; never linking the manipulation back to the formal notation.

**Related.** [[representation-and-modelling]], [[play-and-game-based]].

---

## Adaptive & intelligent tutoring software

**Family:** Technology & multimedia · **Evidence:** moderate–strong — ITS roughly match human 1:1 tutoring in meta-analyses (VanLehn 2011; Kulik & Fletcher 2016); benefits depend on step-level feedback and mastery. · **Best for:** sequencing practice, mastery checks, and adapting difficulty — the core of what Classai's director does.

**What it is.** Software that estimates what a learner knows and adapts the next step — difficulty, hints, review timing — accordingly.

**Why it works.** Keeps every learner in their zone of proximal development, gives immediate step-level feedback, and ensures mastery before advancing. See [[mastery-and-personalised]] and [[research-ai-tutoring]].

**When to use / NOT.** This is the operating model for the whole app. The caution is the **assistance dilemma** (Koedinger): too much help and the child stops thinking; too little and they flounder. Calibrate.

**How to run it (steps).**
1. Track mastery per concept (not just "lesson done").
2. Choose the next item from what's shaky, interleaving review.
3. Give immediate, specific feedback on the step that failed.
4. Offer graduated hints, not the answer.
5. Hold a mastery bar before advancing; revisit on a spacing schedule.

**1:1 AI-tutor adaptation.** This *is* the director (`server/src/teach`) + the two-tier memory + the recommendation/spaced-review engine. The knowledge base feeds it: pre-authored `wrongAnswers`/remedies for step-level feedback, prerequisite lists for sequencing, and the [[mastery-and-personalised]] thresholds for "advance vs reteach".

**Primary example.** Child misses two column-subtraction items that both need regrouping → director diagnoses the regrouping step, reteaches just that (not the whole topic), then re-checks, then schedules a review in a few days.

**Pitfalls.** Over-helping (answer-giving); advancing on a single lucky correct answer; ignoring forgetting (no spacing).

**Related.** [[mastery-and-personalised]], [[assessment-methods]], [[research-ai-tutoring]].

---

## Voice & speech practice (talk-enabled learning)

**Family:** Technology & multimedia · **Evidence:** moderate — output/speaking practice supports language learning (comprehensible output; TPR for early language); oral rehearsal aids literacy and reasoning. · **Best for:** world languages, reading aloud/phonics, explaining reasoning, oracy.

**What it is.** Using the child's *spoken* responses as part of learning — saying phrases back, reading aloud, explaining thinking out loud.

**Why it works.** Producing language (not just recognising it) strengthens memory and reveals errors; speaking reasoning ("how do you know?") makes thinking visible and improves it.

**When to use / NOT.** Essential in [[cooperative-and-active-learning]] for languages (TPR, repetition) and valuable everywhere for "explain your answer". NOT when it adds anxiety for a reluctant talker — build rapport first ([[routines-and-environment]]).

**How to run it (steps).**
1. Model the target phrase/sound clearly.
2. Ask the child to say it back; give gentle, specific feedback.
3. For reasoning, ask them to talk through a step before they write it.
4. Recycle spoken vocabulary across sessions (spacing).

**1:1 AI-tutor adaptation.** The app has a `speak` block and on-device speech capture. Use it heavily for `world_language` (the subject profile already biases toward speaking) and for "explain your thinking" checks in any subject. Keep instructions in the child's main language, practice in the target language. Privacy: speech is processed on-device — only text reaches the brain (an architecture constraint, and a selling point).

**Primary example.** Spanish: avatar says "¿Cómo te llamas?", child speaks "Me llamo Leo"; tutor praises and recycles it next session.

**Pitfalls.** Correcting every tiny error (kills confidence); recognition-only practice with no production; forgetting to recycle spoken words later.

**Related.** [[cooperative-and-active-learning]], [[retrieval-and-memory]].

---

## When technology helps vs distracts (the design check)

**Family:** Technology & multimedia · **Evidence:** strong consensus — tech raises attainment *modestly and conditionally*; how it's used matters far more than whether it's used (EEF Digital Technology guidance). · **Best for:** deciding whether to add a screen element at all.

**What it is.** A discipline of choosing technology for a pedagogical reason, not novelty.

**Why it works.** Devices add learning only when they enable something better — faster feedback, a clearer model, more practice, more talk. Otherwise they cost attention.

**When to use / NOT.** Add a tech element if it gives feedback, makes an idea visible, increases active practice, or enables speaking. Avoid it if it merely digitises a worksheet or adds eye-candy.

**How to run it (steps) — the 4-question check.**
1. **Purpose:** what learning does this serve that paper/talk couldn't?
2. **Active or passive:** does the child *do* and *think*, or just watch?
3. **Load:** does it reduce extraneous load (Mayer) or add it?
4. **Evidence of learning:** how will I check it landed?

**1:1 AI-tutor adaptation.** Before attaching any block, the tutor should pass this check: prefer an **interactive** block (child thinks) over a **display** block (child watches); keep displays clean (coherence); always follow a rich display with a check. Don't add a block just to vary the screen — vary it *to provoke thinking*.

**Primary example.** Choosing between a flashy video and a `numberEntry` for practising number bonds → the `numberEntry` wins: the child actively retrieves and gets instant feedback.

**Pitfalls.** Tech for novelty; passive consumption; screen-time with no learning check; mistaking engagement (fun) for learning (durable change).

**Related.** [[Mayer's Principles of Multimedia Learning]], [[motivation-and-engagement]], [[play-and-game-based]].

---

### Family summary — apply these every lesson
- Say it, show it, don't double-type it (modality/redundancy).
- Strip the decorative; signal the essential (coherence/signalling).
- Segment long explanations; let the child pace them.
- Make video *active* (task → pause → retrieve).
- Prefer interactive blocks (child does) over display blocks (child watches).
- Use a real resource or build your own — never guess a video URL.
- Every screen element earns its place by serving thinking.

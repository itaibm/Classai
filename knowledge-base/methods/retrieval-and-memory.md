# Retrieval & memory — methods that make learning stick

This family covers the **cognitive-science methods for durable learning**: getting knowledge *out* of memory (not just in), spreading practice over time, mixing it up, and building automaticity. These are among the best-evidenced techniques in all of education — and the most counter-intuitive, because the methods that *feel* productive (re-reading, massed blocking) are weak, while the ones that feel effortful (retrieval, spacing) are strong. Classai's spaced-review system and constant low-stakes checks are built on this family. Don't duplicate [`pedagogy-core.md` §4–5](../teaching/pedagogy-core.md); this is the deeper catalogue.

> The golden rule: **desirable difficulty.** A bit of struggle to recall is the *mechanism*, not a bug. Don't rescue too fast.

---

## Retrieval practice (the testing effect)

**Family:** Retrieval & memory · **Evidence:** strong — (Roediger & Karpicke 2006; Dunlosky et al. 2013 *high* utility; EEF) · **Best for:** consolidating any learned facts/skills; all ages, all subjects.

**What it is.** Deliberately recalling information *from memory* (a quiz, a "tell me what you remember") rather than re-studying it. The act of retrieval itself strengthens the memory — the "testing effect."

**Why it works.** Each successful (or even partly-failed-then-corrected) retrieval strengthens and reconsolidates the memory trace and the cues that find it. Re-reading creates a comforting *illusion* of fluency without this strengthening.

**When to use / when NOT.** Use constantly, low-stakes, *after* something has been initially understood. NOT as a *substitute* for first teaching (you can't retrieve what was never encoded). Keep it judgement-free — it's to learn from, never to grade.

**How to run it (steps).**
1. Teach/encode the idea first.
2. Later (next turn, next lesson), ask the child to recall it *without* looking.
3. Let them try even if unsure; then reveal/confirm.
4. Frame mistakes as information; re-test the missed item soon.

**1:1 AI-tutor adaptation.** Open lessons with a recall of last lesson's key idea (a question or one-item `multipleChoice`/`trueFalse`), not a re-explanation. Throughout, prefer asking the child to *produce* (`numberEntry`, `shortText`, `fillBlank`) over re-showing. Every check *is* retrieval practice; the learner model logs hits/misses to schedule the next retrieval (spaced review).

**Primary example.** Science, Year 3 — start a lesson: "Before we begin — tell me one thing you remember about magnets." (free recall) then a quick `trueFalse`.

**Pitfalls.** (1) Re-teaching instead of asking. (2) Making it high-stakes (kills the safety). (3) Quizzing before initial understanding exists.

**Related.** [[Spaced practice]], [[The generation effect]], [[Pretesting]], [[Brain dumps (free recall)]].

---

## Low-stakes quizzing

**Family:** Retrieval & memory · **Evidence:** strong — (Roediger; EEF; the affective half of the testing effect) · **Best for:** making retrieval safe and frequent; all ages.

**What it is.** Frequent, ungraded quizzes whose purpose is to *learn from*, not to judge — so the child takes risks, reveals real gaps, and isn't anxious.

**Why it works.** It captures the testing effect *without* the test anxiety that depresses performance and discourages risk-taking. Children answer honestly when nothing is at stake, giving truer formative data.

**When to use / when NOT.** Use as the default texture of practice. NOT when framed/perceived as a graded test — that flips it into a stressor. Avoid scores/rankings for young children.

**How to run it (steps).**
1. Quiz little and often.
2. Explicitly frame it: "this is just to see what to practise."
3. Celebrate attempts and treat misses as useful.
4. Use the results to choose what to revisit.

**1:1 AI-tutor adaptation.** Every Classai check is low-stakes by design; the tutor's tone ("mistakes just tell us what to practise") enforces it. No grades shown to the child — the learner model uses results internally for spacing/difficulty, while the child only ever experiences a friendly check.

**Primary example.** Maths — "Quick-fire five, no pressure, just for fun" with `flashcards`, then "the one you missed, let's nail it."

**Pitfalls.** (1) Letting it feel like a test (scores, stakes). (2) Reacting to misses with disappointment. (3) Quizzing so often there's no teaching.

**Related.** [[Retrieval practice (the testing effect)]], [[Do-now / retrieval warm-ups]], [[Cumulative review]].

---

## Spaced practice (distributed practice)

**Family:** Retrieval & memory · **Evidence:** strong — (Ebbinghaus; Cepeda et al. 2006; Dunlosky *high* utility) · **Best for:** long-term retention of anything worth keeping; all ages.

**What it is.** Spreading study/practice of a topic across multiple sessions over time, instead of one long block — meeting it today, again in a few days, again in a couple of weeks.

**Why it works.** A little forgetting between sessions, then re-retrieving, strengthens memory far more than back-to-back repetition (where each rep is nearly free and adds little). Re-learning across the "forgetting curve" builds durability.

**When to use / when NOT.** Use for everything you want retained. The cost is it *feels* harder and slower than cramming — expect (and explain) the mild effort. Spacing too long (forgetting completely) wastes it; the sweet spot is "just before they'd forget."

**How to run it (steps).**
1. Teach the topic.
2. Revisit it after a short gap (days), then a longer one (a week+), then occasionally.
3. Each revisit, *retrieve* rather than re-read.
4. Expand the gaps as the memory strengthens (expanding retrieval).

**1:1 AI-tutor adaptation.** This is exactly what Classai's spaced-review scheduler does: it resurfaces earlier topics as a *review* lesson or a single retrieval item dropped into today's hook, timed from the learner model's mastery/last-seen data. Expect a little extra effort on revisits — don't "rescue" too fast; the difficulty is doing the work.

**Primary example.** Maths — number bonds met Monday, revisited Thursday as the hook of another lesson, again the next week, then folded into bigger sums.

**Pitfalls.** (1) Massing (cramming) because it feels smoother. (2) Gaps so long the topic is fully forgotten. (3) Re-reading on revisits instead of retrieving.

**Related.** [[Distributed vs massed practice]], [[Cumulative review]], [[Retrieval practice (the testing effect)]].

---

## Distributed vs massed practice

**Family:** Retrieval & memory · **Evidence:** strong — (the spacing effect; massed practice gives short-term illusion, distributed gives retention) · **Best for:** understanding *why* cramming fails; all ages.

**What it is.** A direct contrast: **massed** practice = all the practice in one block (cramming); **distributed** = the same practice spread over time. Same total effort, very different retention.

**Why it matters.** Massed practice produces good *immediate* performance (hence its popularity) but poor long-term retention; distributed practice produces slightly worse immediate performance but far better long-term retention. People mistake the immediate fluency for real learning.

**When to use / when NOT.** Distribute whenever retention matters (almost always). Massing has a narrow use: a final brush-up just before a one-off performance you'll never need again — rare for children. Never mass *foundational* skills.

**How to run it (steps).**
1. Plan the same practice as several short sessions, not one long one.
2. Resist the urge to "finish the topic" in a single sitting.
3. Trust the (research-backed) trade: a little worse now, much better later.

**1:1 AI-tutor adaptation.** Classai never tries to "complete" a topic in one lesson; it teaches a small piece, then the scheduler distributes the practice across future hooks/reviews. The director's one-idea-per-lesson rule naturally prevents massing. The tutor can explain the trade to motivated older children ("we space it so it sticks").

**Primary example.** Times tables: not 30 minutes of ×6 once, but five short ×6 bursts across two weeks, interleaved with other tables.

**Pitfalls.** (1) Equating immediate fluency with learning. (2) Cramming before a "test" mindset. (3) No revisits scheduled.

**Related.** [[Spaced practice]], [[Cumulative review]], [[Fluency / automaticity drills]].

---

## Interleaving

**Family:** Retrieval & memory · **Evidence:** strong — (Rohrer & Taylor 2007; Dunlosky moderate; strong in maths) · **Best for:** discriminating between *which* method/type to use; ages 7–11 (carefully with younger).

**What it is.** Mixing different problem *types* within a practice set (a×b, then a−b, then a+b) instead of doing many of one type in a row (blocked practice).

**Why it works.** Blocked practice lets the child repeat one motion without deciding *which* method applies — but choosing the method is the real skill. Interleaving forces that discrimination every item, and the spacing between same-type items adds a spacing benefit. It feels harder and slower (and learners *dislike* it) precisely because it's working.

**When to use / when NOT.** Use once the child has *each* type securely on its own. NOT for a brand-new skill (block it first to build it). With the youngest learners, interleave only skills they've each already met.

**How to run it (steps).**
1. Secure each type with some blocked practice first.
2. Then mix the types in the practice set.
3. The child must *identify* the type before solving.
4. Keep the mix to types they each already know.

**1:1 AI-tutor adaptation.** In the *practice* beat, once two or more skills are secure (per the learner model), the tutor mixes question types rather than repeating one — so the child must choose the operation/strategy. New skills are blocked first, then folded into an interleaved set in later lessons. Expect and tolerate the extra effort.

**Primary example.** Maths, Year 4 — instead of ten "add 9", mix 8+9, 15−9, 9+6, 12−9 so the child must notice the operation.

**Pitfalls.** (1) Interleaving a skill that isn't yet secure (just confuses). (2) Dropping it because it "feels harder." (3) Mixing wildly unrelated content with no discrimination value.

**Related.** [[Distributed vs massed practice]], [[Spaced practice]], [[../methods/instruction-models|Teach–Practice–Apply]].

---

## Flashcards & the Leitner system

**Family:** Retrieval & memory · **Evidence:** strong — (flashcards = retrieval + spacing; Leitner adds adaptive spacing) · **Best for:** facts/vocabulary needing automaticity — number bonds, sight words, definitions; all ages.

**What it is.** Cards with a prompt one side, answer the other, used for self-testing. The **Leitner system** organises them into boxes: a card answered correctly moves to a box reviewed *less* often; a missed card drops to the box reviewed *most* often — automating expanding/adaptive spacing.

**Why it works.** Each card is a retrieval rep; Leitner concentrates practice on the items the child finds hard (more reps) and rests the easy ones (fewer reps) — efficient, personalised spacing.

**When to use / when NOT.** Use for fact/vocabulary fluency *after* understanding. NOT for conceptual understanding or reasoning (cards drill associations, not thinking). Beware "flip without recalling" (peeking) — that's re-reading, not retrieval.

**How to run it (steps).**
1. Make cards (prompt ↔ answer).
2. For each: try to recall *before* flipping.
3. Correct → promote to a less-frequent box; wrong → demote to the daily box.
4. Review boxes on their schedules.

**1:1 AI-tutor adaptation.** The `flashcards` block runs this; the learner model *is* the Leitner mechanism — mastery/last-seen data decides which facts resurface and how often, demoting missed items to frequent review and promoting secure ones. Tutor enforces "recall before reveal." Use only on understood, automaticity-worthy facts.

**Primary example.** English, Year 1 — common exception words ("said", "one", "the"): missed ones come back next session, mastered ones space out.

**Pitfalls.** (1) Peeking instead of recalling. (2) Carding things that need understanding, not memorising. (3) Ignoring the adaptive spacing (treating all cards equally).

**Related.** [[Spaced practice]], [[Fluency / automaticity drills]], [[Mnemonics & memory techniques]].

---

## Brain dumps (free recall)

**Family:** Retrieval & memory · **Evidence:** strong — (free recall is a potent form of retrieval practice) · **Best for:** consolidating a topic's whole picture; ages 7–11.

**What it is.** Asking the child to write/say *everything they can remember* about a topic, from a blank page, with no prompts — then comparing against the material to spot gaps.

**Why it works.** Unprompted free recall is harder (and so more strengthening) than cued recall, and it reveals the child's *organisation* of the knowledge and its holes — directly useful for the next teaching move.

**When to use / when NOT.** Use to consolidate/review a taught topic. NOT before teaching (nothing to dump) — though a *pre*-dump can prime curiosity (see pretesting). Younger children dump orally; older can jot.

**How to run it (steps).**
1. "Tell/write me everything you remember about ___."
2. Give time; don't prompt mid-dump.
3. Compare to the target; note gaps.
4. Re-teach/retrieve the missing pieces.

**1:1 AI-tutor adaptation.** Run as an oral `speak` dump or a `shortText` list in a *review* lesson or recap: "everything you know about the Romans — go." The gaps feed the learner model and set up the next spaced item. Keep it celebratory ("look how much you remember!").

**Primary example.** History, Year 4 — "Tell me everything you remember about the Stone Age," then fill the gaps the child missed.

**Pitfalls.** (1) Prompting too much (turns it into cued recall). (2) No gap-check afterward (loses the formative value). (3) Doing it before there's anything encoded.

**Related.** [[Retrieval practice (the testing effect)]], [[Cumulative review]], [[../methods/representation-and-modelling|mind maps]].

---

## Do-now / retrieval warm-ups

**Family:** Retrieval & memory · **Evidence:** strong — (combines retrieval + spacing at lesson start; Rosenshine's "daily review") · **Best for:** the first 60 seconds of every lesson; all ages.

**What it is.** A short retrieval task at the very start of a lesson — a few quick questions on prior material — that warms up relevant knowledge and gets the child producing immediately.

**Why it works.** It's spaced retrieval baked into routine: it re-activates prior knowledge (so new content has anchors), squeezes in distributed practice of old material, and starts the lesson with the child *doing*, not listening.

**When to use / when NOT.** Use to open essentially every lesson. NOT a long task — it's a warm-up, not a lesson. Pull from a *mix* of recent and older topics (not just yesterday's) for spacing.

**How to run it (steps).**
1. Open with 2–4 quick recall items.
2. Include prerequisites for today *and* older spaced items.
3. Keep it brisk and low-stakes.
4. Use any misses to decide what to shore up.

**1:1 AI-tutor adaptation.** The *hook* beat is the do-now: a recall question or quick `multipleChoice`/`trueFalse` mixing today's prerequisite with a spaced-review item the scheduler selected. It activates prior knowledge (Rosenshine) and serves the spacing system in one move.

**Primary example.** Maths — hook: "Quick three: 6+4? half of 10? what's a quarter?" (today's prerequisite + two spaced items).

**Pitfalls.** (1) Making it long. (2) Only ever yesterday's content (no real spacing). (3) Skipping it and diving into new content cold.

**Related.** [[Spaced practice]], [[Cumulative review]], [[../methods/instruction-models|Rosenshine's Principles]].

---

## Fluency / automaticity drills

**Family:** Retrieval & memory · **Evidence:** strong — (automaticity frees working memory — Geary; National Numeracy/Reading panels) · **Best for:** making foundational facts/skills instant — number facts, phonics, sight words; all ages.

**What it is.** Brief, repeated, timed-ish practice of an *already-understood* skill until it becomes fast and effortless (automatic), so it no longer consumes working memory.

**Why it works.** Automatic basics free up limited working memory for higher-level problems — a child who must reconstruct 6+4 every time has no capacity left for the multi-step word problem on top. Fluency is the bridge from "can do slowly" to "do without thinking."

**When to use / when NOT.** Use *only after* the skill is understood — drilling a misunderstood skill bakes in fragility. NOT for conceptual understanding (drilling doesn't create it). Keep drills short and game-like for young children.

**How to run it (steps).**
1. Confirm the skill is *understood* first.
2. Drill in short, frequent, game-like bursts.
3. Nudge toward speed *and* accuracy (accuracy first).
4. Space the drills (don't mass them).

**1:1 AI-tutor adaptation.** Once an idea is secure (learner model says understood), the tutor builds fluency via quick-fire `flashcards`/`numberEntry` bursts, spaced across sessions. The director keeps drills short and never drills an un-understood skill — it routes back to CPA/explain instead. Frame as a fun "beat your time," not a test.

**Primary example.** Maths, Year 2 — number bonds to 10, understood via ten-frames, then drilled to instant recall with quick-fire `flashcards`.

**Pitfalls.** (1) Drilling before understanding (brittle). (2) Speed over accuracy (embeds errors fast). (3) Massing drills into one exhausting block.

**Related.** [[Fluency vs understanding|../teaching/pedagogy-core]], [[Flashcards & the Leitner system]], [[Distributed vs massed practice]].

---

## Mnemonics & memory techniques

**Family:** Retrieval & memory · **Evidence:** strong (for arbitrary material) — (keyword method, acronyms, method of loci; Dunlosky rates keyword *low-moderate* general but useful for specific tasks) · **Best for:** *arbitrary* facts with no inherent logic — spellings, ordered lists, foreign vocabulary; ages 7–11.

**What it is.** Memory aids that impose structure on otherwise-arbitrary material: acronyms (BIDMAS), acrostics ("Naughty Elephants Squirt Water" for N/E/S/W), rhymes ("i before e…"), the keyword method (link a foreign word to a sound-alike image), and the method of loci (place items along a familiar route).

**Why it works.** They convert meaningless material into something vivid, structured, or connected to existing memory — giving a retrieval cue where none naturally exists. Most powerful exactly where understanding *can't* help (arbitrary content).

**When to use / when NOT.** Use for arbitrary, must-memorise material. NOT as a substitute for understanding meaningful content — a mnemonic for *why* fractions work would replace thinking with a trick. Don't over-mnemonic everything.

**How to run it (steps).**
1. Identify genuinely arbitrary material to memorise.
2. Choose/co-create a mnemonic (vivid, personal mnemonics stick best).
3. Practise recalling *via* the mnemonic.
4. Fade the mnemonic as the fact becomes automatic.

**1:1 AI-tutor adaptation.** The tutor offers a mnemonic when a fact is arbitrary (spelling rule, compass points, days in months), ideally co-created with the child and tied to their interests for vividness. For *meaningful* content, it teaches understanding instead. Stores the mnemonic in the learner model to reuse on revisits.

**Primary example.** Geography — compass points: "Never Eat Shredded Wheat" (N, E, S, W clockwise).

**Pitfalls.** (1) Mnemonics for content that should be understood. (2) Too many to remember (the aids become a burden). (3) The mnemonic recalled but not the fact.

**Related.** [[../methods/representation-and-modelling|dual coding]], [[Flashcards & the Leitner system]], [[../methods/literacy-across-curriculum|etymology / morphology]].

---

## Dual coding (as a memory method)

**Family:** Retrieval & memory · **Evidence:** strong — (Paivio dual-coding theory; Mayer multimedia principle) · **Best for:** remembering and understanding via words + meaningful image; all ages. *(See representation family for the fuller entry.)*

**What it is.** Encoding information through *both* verbal and visual channels — a word and a relevant picture — so memory has two complementary routes to it.

**Why it works.** Verbal and visual information are processed by partly separate systems; a memory coded in both has more retrieval paths and richer associations than one coded in words alone. (The picture must carry meaning, not decorate.)

**When to use / when NOT.** Use when an idea is clearer/stickier *seen*. NOT redundantly — don't make the child read text, hear the same words, *and* parse a busy diagram at once (split attention). One meaningful visual.

**How to run it (steps).**
1. Pair the verbal idea with one *explanatory* image.
2. Keep the spoken words short so they complement, not duplicate, the visual.
3. Cue recall via either channel ("picture the…", "what was the word for…").

**1:1 AI-tutor adaptation.** When an idea is easier seen, attach one meaningful visual block (`emojiViz`, `numberLine`, `whiteboard`, `image`) and keep speech short. For recall later, the tutor can cue via the image ("remember the pizza?"). One block per turn; no competing visuals.

**Primary example.** Maths — "quarter" paired with a pizza cut in four, one slice shaded; recalled later via the image.

**Pitfalls.** (1) Decorative images that carry no meaning. (2) Redundant text+audio+visual overload. (3) Stacking visuals.

**Related.** [[../methods/representation-and-modelling|dual coding & diagrams]], [[Mnemonics & memory techniques]], [[Pretesting]].

---

## The generation effect

**Family:** Retrieval & memory · **Evidence:** strong — (Slamecka & Graf 1978; generating beats reading) · **Best for:** any time the child could *produce* rather than be shown; all ages.

**What it is.** Information the child *generates themselves* (an answer, an example, the missing word) is remembered better than the same information simply read or heard.

**Why it works.** Generating requires retrieving/constructing from existing knowledge, which engages deeper processing and creates a stronger, more personal memory trace than passive reception.

**When to use / when NOT.** Use by defaulting to "ask, don't tell" wherever the child *can* produce the answer with reasonable effort. NOT when they lack the knowledge to generate anything (then it's just guessing — teach first). Balance with cognitive load: don't make them generate everything at once.

**How to run it (steps).**
1. Before giving an answer/example, ask the child to attempt it.
2. Let them generate, even partially.
3. Confirm/correct what they produced.
4. Only supply it directly if generation isn't yet feasible.

**1:1 AI-tutor adaptation.** Encoded in Classai's "prefer the child *produces* the answer" rule: use `numberEntry`/`shortText`/`fillBlank` to have the child generate rather than reveal. In examples, ask "what do you think the next step is?" before showing it. The tutor only tells when generation isn't yet possible.

**Primary example.** English — instead of giving an example of an adjective, "Can you think of a word that describes this dog?" (child generates "fluffy").

**Pitfalls.** (1) Asking them to generate what they can't (guessing). (2) Telling when they could have generated. (3) Overloading by demanding generation of too much at once.

**Related.** [[Retrieval practice (the testing effect)]], [[../methods/questioning-and-dialogue|elaborative interrogation]], [[Pretesting]].

---

## Pretesting (the pre-testing effect)

**Family:** Retrieval & memory · **Evidence:** promising — (Richland, Kornell & Kao; trying-then-failing-then-learning beats studying) · **Best for:** priming curiosity before new content; ages 8–11.

**What it is.** Asking the child a question about material *before* teaching it — even though they'll likely get it wrong — to prime attention and curiosity, so the subsequent teaching lands better.

**Why it works.** Attempting an answer (and failing) activates relevant prior knowledge, generates curiosity about the gap, and makes the child *notice* the right answer when it comes — errors during pretesting don't harm and often help, provided feedback follows.

**When to use / when NOT.** Use as a hook before new content. NOT if the failure would be demoralising rather than intriguing — frame it as "have a guess, no pressure." Always follow with the teaching/answer (never leave the wrong guess to stand).

**How to run it (steps).**
1. Pose a question on the *upcoming* content.
2. Have the child guess (expect wrong; that's fine).
3. Teach the material — they now attend to the answer.
4. Resolve the guess explicitly.

**1:1 AI-tutor adaptation.** Use a pretest as a curiosity hook: "Before I explain — what do *you* think makes ice melt?" via `speak`/`multipleChoice`, framed playfully, then teach. The wrong guess is safe (process-praise framing) and primes the explain beat. Pairs with elaborative interrogation afterward.

**Primary example.** Science, Year 4 — "Guess: which melts faster, ice in your hand or ice on the table?" then teach about heat transfer.

**Pitfalls.** (1) Letting the wrong guess stand uncorrected. (2) Framing it so failure stings. (3) Pretesting content with zero connection to prior knowledge.

**Related.** [[The generation effect]], [[../methods/questioning-and-dialogue|elaborative interrogation]], [[Do-now / retrieval warm-ups]].

---

## Cumulative review

**Family:** Retrieval & memory · **Evidence:** strong — (Rosenshine's weekly/monthly review; spacing applied at curriculum scale) · **Best for:** keeping *old* learning alive while new learning piles on; all ages.

**What it is.** Regularly revisiting previously-learned material (not just the most recent) so earlier topics don't decay — a rolling review that accumulates across the whole course.

**Why it works.** Without revisiting, old knowledge fades (forgetting curve), and later topics that depend on it then collapse. Cumulative review is spacing + retrieval applied across the *curriculum*, keeping the whole knowledge base retrievable.

**When to use / when NOT.** Use as a steady drumbeat (weekly/monthly review items). The risk is it crowds out new content if overdone — keep review items brief. Prioritise reviewing *foundational* and *fading* topics.

**How to run it (steps).**
1. Track what's been taught and when last seen.
2. Periodically fold older items into warm-ups/reviews.
3. Prioritise foundational and at-risk-of-forgetting topics.
4. Retrieve, don't re-teach, unless a gap demands it.

**1:1 AI-tutor adaptation.** The spaced-review scheduler *is* cumulative review: it selects older topics (by mastery decay and last-seen) to surface as review lessons or single hook items, prioritising foundations. The learner model's mastery map is the "what to review" engine. Keep each review item short so it complements, not replaces, new learning.

**Primary example.** Across a term — a Friday "review lesson" that retrieves a mix of the term's topics, heaviest on the shakiest.

**Pitfalls.** (1) Only reviewing the latest topic. (2) Review so heavy it stalls progress. (3) Re-teaching everything instead of retrieving.

**Related.** [[Spaced practice]], [[Distributed vs massed practice]], [[Do-now / retrieval warm-ups]], [[../methods/instruction-models|Rosenshine's Principles]].

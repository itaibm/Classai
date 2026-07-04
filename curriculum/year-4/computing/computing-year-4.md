# Computing — Year 4 (ages 8–9, KS2) — Lesson Outlines

> Part of **the best international primary school** (see [`../../../SCHOOL-CHARTER.md`](../../../SCHOOL-CHARTER.md)).
> Year 4 scope drawn from `knowledge-base/subjects/computing-life-skills/computing-ks1-ks2.md`
> and `online-safety.md`. Follows the lesson-outline format and 8 design principles in
> [`../README.md`](../README.md).

## Year overview

Year 4 is the year of **repetition**. In **computer science**, the child meets the most
powerful idea so far: the **loop** — spotting a repeating pattern and using "repeat ( )" and
"forever" instead of dragging the same blocks over and over. The child uses loops with the Scratch
**pen** to draw shapes and patterns, and debugs loop programs. In **information technology**,
the data strand grows into **branching databases** — sorting and identifying things by
yes/no questions — and a first creative leap into **multimedia**: planning and making a short
**audio or video** piece (recorded narration, sound effects, a simple animation or photo
sequence) for a real purpose and audience. The **digital-literacy / online-safety** thread
goes deeper on **reliable vs unreliable information** (judging and comparing sources to do
real research) and keeps privacy, kindness, balance and the worry plan warm and current.

How it builds on Year 3: Year 3 wrote sequences and event-driven programs; Year 4 adds
**repetition** so programs become shorter, clearer and able to make patterns. Year 3 read and
built bar charts; Year 4 organises information by **yes/no questions** in a branching
database. Year 3 created text-and-image pages; Year 4 adds **sound and moving images
(multimedia)**. Year 3 met "not everything is true"; Year 4 uses the who/why/when checks to
**research properly** across sources.

The year runs to **18 lessons** across **5 units**, each lesson 20–40 minutes.

---

## Unit 1 — Loops & repetition

**Essential question:** How can a loop make my program shorter, clearer and able to repeat a pattern?

**Key vocabulary:** loop, repeat, repeat ( ), forever, pattern, repetition, efficient, iterate, debug.

### Lesson 1 — Spot the repeat
- **Duration:** 30 min
- **Objective:** "By the end, I can spot a repeating pattern and say how many times it repeats."
- **Hook:** "To make your sprite hop 20 times, would you really drag 20 blocks? There's a smarter way!"
- **Key activity:** Unplugged: clap/stamp patterns and dances — the child spots "this bit repeats N times." Look at a long Scratch script of identical blocks and identify the repeating chunk and its count. Introduce **repetition** as a key computational-thinking idea (pattern recognition).
- **Check for understanding:** "These four blocks are the same and repeat 8 times. What pattern do you see?" → The same action repeated 8 times — it can be a loop.
- **Differentiation:** support: count repeats in a clear pattern. / stretch: find two different repeating chunks in one sequence.
- **Materials:** rhythm/dance prompts, printed long-script example.
- **Joy:** turning a clapping pattern into "repeat 8".

### Lesson 2 — The "repeat" loop in Scratch
- **Duration:** 35 min
- **Objective:** "By the end, I can use a 'repeat ( )' loop to replace many copied blocks."
- **Hook:** "One block inside a loop can do the work of twenty. Let's shrink a program!"
- **Key activity:** Introduce the C-shaped **"repeat ( )"** block: whatever's inside runs that many times. The child takes a long copied-block script and rewrites it with one repeat loop, predicts, runs, and confirms identical behaviour. Discuss loops = shorter, clearer, easier to debug.
- **Check for understanding:** "How many 'hop' blocks do you need with a loop to make a sprite hop 6 times?" → Just one hop block inside "repeat 6".
- **Differentiation:** support: drop one block into a ready repeat. / stretch: nest a count change to vary the repeats.
- **Materials:** a computer with Scratch, a long starter script to refactor.
- **Joy:** the satisfaction of a giant script collapsing into a tidy little loop.

### Lesson 3 — "forever" vs "repeat"
- **Duration:** 30 min
- **Objective:** "By the end, I can choose 'repeat ( )' or 'forever' for the right job."
- **Hook:** "Some things repeat a set number of times; some go on and on. Which loop fits which?"
- **Key activity:** Contrast **"repeat 10"** (stops) with **"forever"** (runs until you stop it — great for animation like flapping wings). The child builds one of each: a costume-swap animation in "forever", and a fixed action in "repeat N". Discuss when each is right.
- **Check for understanding:** "Why might 'forever' be a problem if you want the program to finish?" → It never ends on its own — you'd use 'repeat N' when you want it to stop.
- **Differentiation:** support: match "repeat / forever" to two examples. / stretch: combine a "forever" animation with a "repeat" movement.
- **Materials:** a computer with Scratch (multi-costume sprite).
- **Joy:** a "forever" flapping/wiggling animation that won't sit still.

### Lesson 4 — Loops + pen: draw shapes
- **Duration:** 35 min
- **Objective:** "By the end, I can use a loop with the pen to draw a regular shape."
- **Hook:** "Can you draw a perfect square with just ONE loop instead of eight blocks?"
- **Key activity:** Add the **pen** extension. Build "pen down → repeat 4 [move 100, turn 90]" → a square. Predict the shape before running. Change to repeat 3 / turn 120 → triangle. The child predicts and draws two shapes. (Links to maths: angles, regular polygons.)
- **Check for understanding:** "Why use a loop instead of copying the same blocks?" → It's shorter, clearer, less error-prone and shows the repeating pattern.
- **Differentiation:** support: run a given shape, then change the count. / stretch: work out the turn for a pentagon (360 ÷ 5 = 72).
- **Materials:** a computer with Scratch + pen extension.
- **Joy:** watching a perfect shape appear from one tiny loop.

### Lesson 5 — Debug a loop program
- **Duration:** 30 min
- **Objective:** "By the end, I can find and fix a bug in a loop program."
- **Hook:** "My square came out as an open shape! Is the bug in the loop or in a block inside it?"
- **Key activity:** Open buggy loop projects (wrong repeat count, wrong turn angle, missing pen down). Apply predict→run→spot→fix, deciding whether the bug is the *loop count* or a *block inside the loop*. The child fixes two.
- **Check for understanding:** "Your shape has too many sides. Is the fix the loop count or the move block?" → The loop count (repeat number) — reduce it.
- **Differentiation:** support: one clearly-flagged bug. / stretch: a bug where the count and angle must both be reasoned about.
- **Materials:** a computer with Scratch, pre-loaded buggy loop projects.
- **Joy:** turning a wonky scribble back into a crisp shape with one fix.

**End-of-unit check:** Child replaces copied blocks with a "repeat" loop, chooses repeat vs forever appropriately, draws a shape with a loop+pen, and debugs a loop program.

---

## Unit 2 — Branching databases

**Essential question:** How can yes/no questions help me sort and identify things?

**Key vocabulary:** data, attribute, branching database, yes/no question, sort, identify, classify, tree.

### Lesson 6 — Yes/no questions sort the world
- **Duration:** 30 min
- **Objective:** "By the end, I can sort a set of things using a series of yes/no questions."
- **Hook:** "I'm thinking of an animal. With clever yes/no questions, can you find it in just a few guesses?"
- **Key activity:** Play "20 questions" / guess-who with a set of objects or animals, noticing good questions split the group roughly in half. Introduce **attribute** (a feature like "has wings"). The child sorts a small set of picture cards by repeatedly asking yes/no questions.
- **Check for understanding:** "Why is 'does it have wings?' a better first question than 'is it a robin?'" → It splits the group, ruling out lots at once, instead of checking one thing.
- **Differentiation:** support: sort 4 items with given questions. / stretch: invent questions that split the set evenly.
- **Materials:** picture/object cards, sorting hoops.
- **Joy:** the detective thrill of narrowing down to the answer fast.

### Lesson 7 — Build a branching database
- **Duration:** 35 min
- **Objective:** "By the end, I can build a branching database that identifies items by yes/no questions."
- **Hook:** "Let's build a machine that can identify any of our creatures just by asking questions!"
- **Key activity:** Introduce the **branching database** as a tree of yes/no questions, each splitting into two branches, ending at a single item. The child builds one (on paper, then optionally in a tool like j2e/branching software) for ~6 items, testing that each item is reached by a unique question path.
- **Check for understanding:** "What does each yes/no question do in a branching database?" → Splits the items into two groups, narrowing down until one item is left.
- **Differentiation:** support: complete a part-built tree. / stretch: ensure no two items share the same path.
- **Materials:** tree-template sheets, item cards, (optional) branching-database tool.
- **Joy:** testing the "identifier" and watching it pinpoint each creature.

### Lesson 8 — Test and improve the database
- **Duration:** 30 min
- **Objective:** "By the end, I can test my branching database and fix a question that doesn't work."
- **Hook:** "Two animals end up at the same spot — our machine is confused! Which question must we fix?"
- **Key activity:** The child and tutor swap databases — the child tests the tutor's (which hides a planted collision) by trying to identify each item, while the tutor tests the child's. Where two items land together, the child spots the missing/poor question and adds or improves one to separate them — debugging applied to data.
- **Check for understanding:** "Two items reach the same end. What's wrong and how do you fix it?" → A question is missing/unclear; add a yes/no question that separates the two items.
- **Differentiation:** support: fix one flagged collision. / stretch: redesign a question so the whole tree is balanced.
- **Materials:** the child's database from Lesson 7, a tutor-made database with a planted collision, blank question slips.
- **Joy:** being the "tester" who breaks then fixes the tutor's machine.

**End-of-unit check:** Child builds a branching database that identifies each item by a unique yes/no path, and tests/fixes a question that fails.

---

## Unit 3 — Multimedia: audio & video

**Essential question:** How do I plan and make a short audio or video piece for a real purpose?

**Key vocabulary:** multimedia, audio, video, record, narration, sound effect, sequence/storyboard, edit, purpose, audience.

### Lesson 9 — Plan with a storyboard
- **Duration:** 35 min
- **Objective:** "By the end, I can storyboard a short audio/video piece for a purpose and audience."
- **Hook:** "Films and podcasts aren't made up on the spot — they're *planned*. Let's plan ours!"
- **Key activity:** Decide purpose + audience (e.g. a 30-second advert for a summer fair, a fact narration, a short stop-motion). The child fills a **storyboard**: each frame/section's picture or shot, plus the words/sounds. Emphasise planning before recording.
- **Check for understanding:** "Why storyboard before recording?" → It plans the order, words and shots so the recording goes smoothly and matches the purpose.
- **Differentiation:** support: 3-frame storyboard with prompts. / stretch: include camera/sound notes per frame.
- **Materials:** storyboard sheets, example short clips.
- **Joy:** "directing" their own mini-production on paper first.

### Lesson 10 — Record audio (narration & sound)
- **Duration:** 35 min
- **Objective:** "By the end, I can record clear narration and a sound effect for my piece."
- **Hook:** "A great voiceover can make a picture come alive — let's get recording!"
- **Key activity:** Using a recording tool, the child records narration following their storyboard (clear voice, no rush) and adds/records a sound effect. They listen back, re-record a section to improve it (editing = redoing/trimming a part). Save with a sensible name.
- **Check for understanding:** "Your narration was too quiet and rushed. What do you do?" → Re-record that part more slowly and clearly (you can edit/redo it).
- **Differentiation:** support: read a short scripted line. / stretch: layer narration with a fitting sound effect.
- **Materials:** a device with a recording app, quiet space, headphones.
- **Joy:** hearing their own voice played back as a "real" recording.

### Lesson 11 — Make and share the video/animation
- **Duration:** 40 min
- **Objective:** "By the end, I can combine images and sound into a short piece and improve one thing."
- **Hook:** "Time to put it together — pictures, words and sound into one piece your audience will love!"
- **Key activity:** The child assembles their multimedia piece — a photo/picture sequence or simple stop-motion/animation with their audio, in the storyboard order. They watch it, improve one thing (timing, an extra caption, a clearer shot), then share it with the tutor and family (the audience).
- **Check for understanding:** "How does your finished piece match its purpose and audience?" → It explains/advertises clearly for the people it's meant for (any sound link of content to purpose/audience).
- **Differentiation:** support: sequence given images with audio. / stretch: time captions/audio to match the visuals.
- **Materials:** a device with a simple video/animation/slideshow tool, saved audio.
- **Joy:** the premiere — showing their finished "film" to the tutor and family.

**End-of-unit check:** Child storyboards, records clear audio, and assembles a short multimedia piece for a stated purpose and audience, improving one element.

---

## Unit 4 — Researching with reliable sources

**Essential question:** How do I find trustworthy information and tell good sources from bad?

**Key vocabulary:** source, reliable, unreliable, evidence, who/why/when, cross-check, advert, fake news, fact, opinion.

### Lesson 12 — Reliable vs unreliable, deeper
- **Duration:** 30 min
- **Objective:** "By the end, I can use who/why/when to judge and rank several sources."
- **Hook:** "Four pages, four different 'facts' about the same animal. Which can we trust — and how do we decide?"
- **Key activity:** Recap that anyone can publish online. Strengthen the **who / why / when / do others agree** checks. Given a topic and 4 sources (encyclopaedia/museum, advert, joke/satire, news), the child ranks most→least reliable and justifies each with the detective questions.
- **Check for understanding:** "Give two questions to judge a web page." → Any two of: Who made it? Why? When? Do other good sources agree?
- **Differentiation:** support: rank 3 sources. / stretch: spot which source is an advert in disguise and explain how.
- **Materials:** four contrasting source cards on one topic, ranking mat.
- **Joy:** running a "source court" and judging which page is guilty of fibbing.

### Lesson 13 — Fact vs opinion; cross-checking
- **Duration:** 30 min
- **Objective:** "By the end, I can tell a fact from an opinion and cross-check a fact in a second source."
- **Hook:** "'The Earth has one moon' and 'the moon is the best thing in space' — which can you actually check?"
- **Key activity:** Distinguish **fact** (can be checked) from **opinion** (a feeling/view). The child sorts statements. Then they take one fact and **cross-check** it against a second trustworthy source, learning that agreement across good sources builds confidence.
- **Check for understanding:** "Why check a fact in a second source?" → If two trustworthy sources agree, it's much more likely to be true.
- **Differentiation:** support: sort clear fact/opinion cards. / stretch: rewrite an opinion as a checkable fact.
- **Materials:** fact/opinion statement cards, two vetted sources to cross-check.
- **Joy:** confirming a wild "fact" is actually true by catching two experts agreeing.

### Lesson 14 — Mini-research with sources
- **Duration:** 35 min
- **Objective:** "By the end, I can research a question using sources I've judged reliable and note where facts came from."
- **Hook:** "Let's answer a real question — and prove our answer with trustworthy sources!"
- **Key activity:** The child researches a set question (e.g. "how do volcanoes erupt?") using tutor-curated sources, choosing reliable ones, recording 2–3 facts and *where each came from*. Optionally turn it into a short content piece (links to multimedia/content skills).
- **Check for understanding:** "How do you know your answer is trustworthy?" → The facts came from reliable sources I checked, and ideally agreed across two.
- **Differentiation:** support: pick from two vetted sources. / stretch: cross-check one fact across two sources.
- **Materials:** a computer with curated sources, research note sheet.
- **Joy:** becoming a real "researcher" who can back up every fact.

**End-of-unit check:** Child ranks several sources by reliability with reasons, distinguishes fact from opinion, and researches a question using reliable, noted sources.

---

## Unit 5 — Staying safe, kind & balanced (KS2)

**Essential question:** How do I keep myself and others safe, kind and balanced online as I grow?

**Key vocabulary:** personal information, privacy, kind, bystander, worry plan, trusted adult, Childline, balance, breaks.

> **Tone note (from the online-safety KB):** keep this unit **warm, calm and reassuring** —
> the internet is brilliant, and a trusted adult is always there to help. Never imply a child
> is to blame; keep examples gentle and age-appropriate.

### Lesson 15 — Privacy & footprints (a first look)
- **Duration:** 25 min
- **Objective:** "By the end, I can explain why we keep personal information private and that things shared online can spread."
- **Hook:** "Once you post something, who might see it — and can you always take it back?"
- **Key activity:** Recap personal information (full name, address, school, phone, password, photos) staying private and that passwords are secret. Introduce gently that things shared online (a photo, a message) can be copied and shared on — so we think before we post and check with a trusted adult. (A first, light touch on digital footprint — deepened in Year 5.)
- **Check for understanding:** "Why think carefully before posting a photo or message?" → Once it's out, others can copy/share it and you can't always take it back; keep private things private.
- **Differentiation:** support: sort private vs okay-to-share. / stretch: explain why "I can just delete it" isn't a full safety net.
- **Materials:** "share / keep private" cards, simple "it spreads" visual.
- **Joy:** the "aha" of seeing how one shared thing can travel.

### Lesson 16 — Kind online & being a good bystander
- **Duration:** 25 min
- **Objective:** "By the end, I can act kindly online and help when I see unkindness."
- **Hook:** "Standing up for someone online can be as brave as in the playground."
- **Key activity:** Scenarios of teasing/exclusion in chats/games. The child decides the kind action *and* the bystander action (don't join in, support the person, tell a trusted adult). Reinforce telling-to-help is not tattling. Use the "would I be happy if this was said to me in front of my family?" test.
- **Check for understanding:** "You see someone being left out of a game on purpose. What can a kind bystander do?" → Don't join in; include or support them; tell a trusted adult.
- **Differentiation:** support: choose the kind option from two. / stretch: script a kind bystander response.
- **Materials:** scenario cards, role-play prompts.
- **Joy:** acting out the "upstander" who makes things right.

### Lesson 17 — Balance, breaks & the worry plan
- **Duration:** 25 min
- **Objective:** "By the end, I can plan a balanced day and recite the worry plan with my trusted adults."
- **Hook:** "Screens are great — and so is everything else. What makes a brilliant balanced day?"
- **Key activity:** Discuss **balance** (screens + movement, sleep, reading, friends) and healthy habits (take breaks, screen-free before bed; apps are *designed* to be hard to stop — not your fault). The child plans a balanced day. Refresh the **worry plan** (stop → don't reply → keep it → tell) and **trusted adults** / Childline.
- **Check for understanding:** "Name one healthy screen habit, and the first step of the worry plan." → e.g. take breaks / screen-free before bed; and: stop (then don't reply, keep it, tell a trusted adult).
- **Differentiation:** support: sort screen vs screen-free activities. / stretch: explain why screen-free time before bed helps sleep.
- **Materials:** day-planning strip, activity cards, worry-plan cards.
- **Joy:** designing their ideal balanced day.

### Lesson 18 — Year 4 computing showcase
- **Duration:** 35 min
- **Objective:** "By the end, I can demonstrate my loops, data, multimedia and online-smart skills."
- **Hook:** "Loops, branching databases, your own film, and source-detective skills — let's show them off!"
- **Key activity:** Stations/showcase: (1) demo a loop+pen drawing, (2) use a branching database to identify items, (3) play your multimedia piece, (4) rank sources / sort fact vs opinion, (5) recite the worry plan and a balanced-day plan. The child presents one proud achievement to the tutor and family.
- **Check for understanding:** "Why is a loop better than copying the same blocks ten times?" → Shorter, clearer, less error-prone, and shows the repeating pattern.
- **Differentiation:** support: present at two stations with the tutor alongside. / stretch: teach one strand to a family member as if they were the learner.
- **Materials:** all year's resources — a computer with Scratch, branching databases, multimedia clips, source cards, certificates.
- **Joy:** a Year 4 "computing expert" certificate and a film premiere.

**End-of-unit check:** Child explains why personal information stays private and that posts can spread, acts as a kind bystander, plans a balanced day, and recites the worry plan and trusted adults.

---

## End-of-year mastery checks

A Year 4 child finishing this curriculum should be able to:

1. **Loops.** Replace copied blocks with a "repeat" loop, and choose between "repeat N" and "forever" for the job.
2. **Loops + pen.** Use a loop with the pen to draw a regular shape, predicting it first.
3. **Debugging loops.** Find and fix a bug, reasoning about whether it's the loop count or a block inside the loop.
4. **Branching databases.** Build a branching database that identifies each item by a unique yes/no path, and fix a question that fails.
5. **Multimedia.** Storyboard, record clear audio, and assemble a short multimedia piece for a purpose and audience.
6. **Evaluating sources.** Use who/why/when to rank sources by reliability and distinguish fact from opinion.
7. **Researching.** Research a question using reliable sources and note where the facts came from (cross-checking when possible).
8. **Staying safe.** Explain privacy and that posts can spread, act as a kind bystander, plan a balanced day, and recite the worry plan with trusted adults.

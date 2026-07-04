# Representation & modelling — making ideas visible

This family covers the methods for **externalising abstract ideas** so a child can see, manipulate, and reason about them: concrete objects, pictures, diagrams, graphic organisers, analogies, gestures, and think-alouds. The unifying principle is that young children's understanding is anchored in the concrete and the visual — abstract symbols are *shorthand for something they should be able to picture*. These methods are how Classai's visual block tool-belt (`emojiViz`, `numberLine`, `whiteboard`, `image`, `slideshow`, `dragDrop`, `mindMap`) earns its keep. Don't duplicate [`pedagogy-core.md` §7–8](../teaching/pedagogy-core.md); this is the deeper catalogue.

> Guiding rule (Mayer): a representation must *carry meaning*, not decorate. A cute-but-irrelevant picture steals working memory; a meaningful one offloads it.

---

## Concrete–Pictorial–Abstract (CPA / Bruner's enactive–iconic–symbolic)

**Family:** Representation & modelling · **Evidence:** strong — (Bruner; basis of Singapore/UK maths mastery; EEF "manipulatives and representations") · **Best for:** any new maths/quantity concept and many science ideas; ages 5–11.

**What it is.** Introducing a concept through three stages: **Concrete** (handle real/imagined objects — counters, cubes), **Pictorial** (a drawing representing those objects — dots, a bar, a number line), then **Abstract** (the symbols alone — 3 + 4 = 7). Bruner's enactive→iconic→symbolic is the same arc.

**Why it works.** Symbols are meaningless until grounded; building from objects → pictures → symbols lets the child attach the abstract notation to something they can actually picture, preventing the fragile "symbol-pushing" that collapses on unfamiliar problems.

**When to use / when NOT.** Use for *every* new quantitative concept. NOT a one-way street — drop *back* a stage whenever the abstract stumbles. Don't linger in concrete forever either; the goal is fluent abstract use, reached *through* the earlier stages.

**How to run it (steps).**
1. Concrete: act it out with objects ("three blocks, four blocks, push together, count").
2. Pictorial: draw it (dots, array, bar, number line).
3. Abstract: write the symbols, tied explicitly to the picture.
4. If the abstract fails later, return to pictorial/concrete.

**1:1 AI-tutor adaptation.** Anchor the *explain*/*example* beats in concrete and pictorial before the abstract: `emojiViz`/`numberLine`/`whiteboard` arrays picture the idea, *then* write the symbols. The remedy loop's first move on an abstract miss is "drop a CPA stage" — the director routes back to the picture rather than re-explaining symbols. The learner model tracks which stage the child needs.

**Primary example.** Maths, Year 1 — "3 + 4": concrete blocks → `emojiViz` "🟦🟦🟦 ➕ 🟥🟥🟥🟥" → abstract "3 + 4 = 7."

**Pitfalls.** (1) Jumping to abstract too fast (fragile maths). (2) Never leaving concrete (no fluency). (3) Treating the stages as a fixed ladder rather than moving between them responsively.

**Related.** [[Manipulatives]], [[Number lines & ten frames]], [[Bar modelling / Singapore maths]], [[Multiple representations]].

---

## Manipulatives

**Family:** Representation & modelling · **Evidence:** strong — (EEF "manipulatives and representations" +; effective *with explicit teaching*, weaker if left as free play) · **Best for:** the concrete stage of maths/science — counting, place value, fractions, shape; ages 5–9 most.

**What it is.** Physical (or on-screen) objects a child handles to embody an abstract idea: counters, cubes, base-ten blocks, fraction tiles, bead strings, coins.

**Why it works.** Acting on objects gives a concrete, multisensory grounding the child can mentally re-run later; it makes invisible structure (a "ten," a "half") tangible.

**When to use / when NOT.** Use to introduce/repair a concept, with the teacher explicitly linking the object to the maths. NOT as free play hoping understanding emerges (it usually doesn't), and they must be *faded* — a child who always needs blocks hasn't reached abstraction. The object can become a distraction if it's too fun or fiddly.

**How to run it (steps).**
1. Choose a manipulative that *embodies* the structure (base-ten for place value, not random counters).
2. Model the link explicitly ("this rod is one *ten*").
3. Have the child act on it to solve.
4. Bridge to the picture, then fade to symbols.

**1:1 AI-tutor adaptation.** On-screen manipulatives live in `emojiViz`, `numberLine`, `dragDrop`, and `whiteboard`. The tutor narrates the link object→maths, has the child manipulate (drag, group), then fades to pictorial/abstract across the lesson. On a misconception, the tutor brings the manipulative *back* (remedy), then fades again.

**Primary example.** Maths, Year 2 — place value: base-ten on a `dragDrop` board — bundle ten ones into a ten to model 14.

**Pitfalls.** (1) Free play with no explicit link. (2) Never fading (dependence). (3) A manipulative whose structure doesn't match the maths.

**Related.** [[Concrete–Pictorial–Abstract]], [[Number lines & ten frames]], [[../methods/instruction-models|scaffolding & fading]].

---

## Bar modelling / Singapore maths

**Family:** Representation & modelling · **Evidence:** strong — (Singapore method; widely adopted in UK mastery; powerful for word problems) · **Best for:** representing the *structure* of word problems and part–whole/comparison relationships; ages 7–11.

**What it is.** Drawing rectangular **bars** to represent quantities and their relationships (part–whole, comparison, ratio), turning a word problem's structure into a picture before any calculation.

**Why it works.** Word problems fail children not at arithmetic but at *seeing the structure* (what's known, what's asked, how parts relate). The bar makes the relationship visible, so the child can *see* whether to add, subtract, multiply, or divide — bridging pictorial to abstract for multi-step problems.

**When to use / when NOT.** Use for word problems and part–whole/comparison reasoning. NOT for bare-fact fluency (overkill). Needs teaching as a tool first — a bar drawn wrong models the wrong relationship.

**How to run it (steps).**
1. Read the problem; identify the quantities.
2. Draw bars showing parts, wholes, and comparisons.
3. Mark the known values and the unknown.
4. Read the operation off the picture; calculate.

**1:1 AI-tutor adaptation.** Use the `whiteboard` to build a bar model step-by-step in the *example* beat (a worked example), then have the child complete a partial bar (`fillBlank`-style) in practice. The tutor models reading the operation *off* the bar — the structure is the lesson. On a word-problem miss, drawing the bar is the remedy.

**Primary example.** Maths, Year 4 — "Tom has 12 sweets, 5 more than Sam. How many has Sam?": two comparison bars make it visibly a subtraction.

**Pitfalls.** (1) Teaching it as a ritual without reading the operation off it. (2) Using it where bare arithmetic suffices. (3) Drawing the relationship wrong (models the wrong sum).

**Related.** [[Concrete–Pictorial–Abstract]], [[Multiple representations]], [[../methods/instruction-models|worked-example & faded guidance]].

---

## Number lines & ten frames

**Family:** Representation & modelling · **Evidence:** strong — (core mastery pictorial tools; strong for number sense and bridging) · **Best for:** counting, ordering, bridging ten, fractions, negative numbers; ages 5–10.

**What it is.** Two staple pictorial tools. A **number line** represents numbers as positions on a line (supporting counting on/back, jumps, ordering, fractions). A **ten frame** is a 2×5 grid for showing numbers to ten, making bonds and "how many to make ten" visible.

**Why it works.** Both externalise number relationships spatially: the number line turns addition/subtraction into movement and shows magnitude/order; the ten frame makes the structure of ten (and number bonds) instantly visible, building the part–whole sense behind mental arithmetic.

**When to use / when NOT.** Number line: counting, jumps, bridging, comparing, fractions. Ten frame: numbers/bonds within ten/twenty. NOT for large abstract computation (cumbersome). Fade as mental strategies form.

**How to run it (steps).**
1. Number line: mark start, model the jumps (count on/back), land on the answer.
2. Ten frame: fill counters, "see" the number and how many empty to make ten.
3. Tie the picture to the symbol.
4. Fade as the child computes mentally.

**1:1 AI-tutor adaptation.** The `numberLine` block models jumps for addition/subtraction/bridging and fractions; `emojiViz` builds ten-frames for bonds. Use them in explain/example to picture the operation, and as the *first remedy* when a child's mental method fails ("let's jump it on the line"). Fade across sessions as fluency grows.

**Primary example.** Maths, Year 1 — 8 + 4: on a `numberLine`, jump 2 to reach 10, then 2 more to 12 (bridging via a ten frame showing 8 + 2 = full ten).

**Pitfalls.** (1) Keeping them past the point of fluency (dependence). (2) Mislabelled/unevenly-spaced lines. (3) Using a ten frame for numbers far beyond ten/twenty.

**Related.** [[Concrete–Pictorial–Abstract]], [[Manipulatives]], [[Bar modelling / Singapore maths]].

---

## Dual coding & diagrams

**Family:** Representation & modelling · **Evidence:** strong — (Paivio; Mayer's multimedia & coherence principles) · **Best for:** any idea clearer *seen* — processes, structures, relationships; all ages.

**What it is.** Presenting information as **words + a meaningful visual** (a labelled diagram, a process picture, a chart) so two complementary channels encode it — and cutting any visual that merely decorates.

**Why it works.** Verbal and visual channels are partly separate; a meaningful diagram offloads relationships the words would have to hold in working memory, and gives a second retrieval route. Mayer's coherence principle: removing irrelevant detail *improves* learning.

**When to use / when NOT.** Use when structure/process/relationship is easier shown. NOT redundantly (don't make the child read text, hear identical words, and parse a busy diagram at once — split attention). One clean visual per idea.

**How to run it (steps).**
1. Pick the *explanatory* visual (a labelled diagram, not clip-art).
2. Keep accompanying speech/text short and complementary, not duplicate.
3. Point to parts as you name them (signalling).
4. Strip everything that doesn't carry meaning.

**1:1 AI-tutor adaptation.** Attach exactly one meaningful visual block (`image`, `whiteboard`, `slideshow`, `emojiViz`) alongside short spoken explanation; never stack competing visuals (cognitive-load rule, one block per turn). Choose the visual that *explains*. Use the resource rules in [`../INGESTION.md`] for real diagrams/images, falling back to a self-built `whiteboard` rather than a guessed URL.

**Primary example.** Science, Year 4 — life cycle of a butterfly as a 4-stage labelled `slideshow`, with one short sentence per stage.

**Pitfalls.** (1) Decorative visuals (theft of attention). (2) Redundant text+narration+diagram. (3) A cluttered diagram with extraneous detail.

**Related.** [[../methods/retrieval-and-memory|dual coding (as memory)]], [[Graphic organisers]], [[Multiple representations]].

---

## Graphic organisers (mind maps, concept maps, Frayer, Venn, flowcharts, tables)

**Family:** Representation & modelling · **Evidence:** strong — (Hattie; comprehension research; structure aids understanding & recall) · **Best for:** organising relationships between ideas — comparing, categorising, sequencing, defining; ages 7–11 (simpler forms younger).

**What it is.** Visual frameworks that lay out how ideas relate. Key types: **mind map** (radiating from a central topic), **concept map** (nodes + *labelled* links showing relationships), **Frayer model** (a word in the centre with definition/characteristics/examples/non-examples), **Venn diagram** (overlap = shared attributes), **flowchart** (a sequence/decision process), **comparison table** (rows × columns).

**Why it works.** They impose visible structure on a set of ideas, making relationships (causal, hierarchical, comparative, sequential) explicit and reducing the working-memory cost of holding them in mind — and they double as retrieval scaffolds when filled from memory.

**When to use / when NOT.** Match the organiser to the relationship: Venn for compare/contrast, flowchart for process, Frayer for a concept's definition, concept map for a web of linked ideas, table for multi-attribute comparison. NOT decorative — an organiser the child copies passively does little; the value is in *constructing* it.

**How to run it (steps).**
1. Choose the organiser that fits the relationship.
2. Model filling part of it (think-aloud).
3. Have the child complete the rest (generation).
4. Use it later as a retrieval prompt (fill it from memory).

**1:1 AI-tutor adaptation.** Build organisers on the `mindMap`/`whiteboard` blocks; the tutor models a couple of nodes then the child generates the rest (generation effect) via `shortText`/`dragDrop`. A Frayer model grounds explicit vocabulary teaching (see literacy family). Later, an empty organiser becomes a retrieval/brain-dump scaffold. Pick the type by the thinking required, not by looks.

**Primary example.** English, Year 3 — Frayer model for "habitat": definition, characteristics, examples (pond, desert), non-examples (a toy box). Or Venn comparing frogs vs toads.

**Pitfalls.** (1) Pretty maps with no real relationships. (2) Wrong organiser for the thinking (a mind map where a flowchart's sequence was needed). (3) Copying instead of constructing.

**Related.** [[Concept maps|Graphic organisers]], [[../methods/literacy-across-curriculum|knowledge organisers]], [[../methods/instruction-models|Concept Attainment]], [[Mind maps]].

---

## Worked examples & process modelling

**Family:** Representation & modelling · **Evidence:** strong — (Sweller worked-example effect; see instruction family for the full entry) · **Best for:** showing *how* a multi-step process is done; novices; all ages.

**What it is.** Making a process visible by working through a complete example step-by-step, externalising each move on a board/diagram so the *procedure* (not just the answer) is on display.

**Why it works.** It frees the novice's working memory from flailing for an answer and focuses it on the method; seeing every step laid out makes the structure of the procedure inspectable and imitable.

**When to use / when NOT.** Use when introducing any multi-step procedure. NOT answer-only — the steps and the *reasoning* must show. Fade to partial then independent (guidance-fading).

**How to run it (steps).**
1. Lay out the problem on a board.
2. Work each step visibly, narrating the decision.
3. Leave the steps on display for reference.
4. Fade to a partial example, then independent.

**1:1 AI-tutor adaptation.** Use the `steps` block (reveal one step at a time) or `whiteboard` so the process is visible and paced; pair with self-explanation prompts ("why this step?"). The visible steps stay as a reference scaffold the child can lean on in practice, then fade. (Cross-ref the fuller treatment in the instruction family.)

**Primary example.** Maths, Year 5 — long multiplication laid out on a `whiteboard`, each partial product shown and narrated.

**Pitfalls.** (1) Showing the answer, not the steps. (2) No narration of the decisions. (3) Never fading.

**Related.** [[../methods/instruction-models|worked-example & faded guidance]], [[Think-alouds]], [[Multiple representations]].

---

## Think-alouds

**Family:** Representation & modelling · **Evidence:** strong — (cognitive apprenticeship — Collins, Brown & Newman; makes expert thinking visible) · **Best for:** modelling *invisible* mental processes — reading strategies, problem-solving, decision-making; all ages.

**What it is.** The teacher voices their inner thinking while performing a task ("Hmm, this word is tricky — I'll sound it out… *th-r-ough*… oh, 'through'"), exposing the normally-hidden reasoning a child can't otherwise observe.

**Why it works.** The hardest things to learn are the invisible decisions experts make automatically. Voicing them turns tacit expertise into something the child can hear, imitate, and eventually internalise as their own self-talk (cognitive apprenticeship).

**When to use / when NOT.** Use whenever the *process* (not just the product) is the learning — reading comprehension, problem-solving, editing, planning. NOT for purely factual recall. Keep it focused; rambling think-alouds add load.

**How to run it (steps).**
1. Tell the child to listen to your thinking.
2. Perform the task, voicing each decision and self-correction.
3. Highlight the strategic moves ("when I'm stuck I…").
4. Hand into a we-do where the child voices *their* thinking.

**1:1 AI-tutor adaptation.** Because Classai is voice-led, think-alouds are native: in *explain*/*example* the tutor narrates reasoning while a `whiteboard`/`steps` block shows the action. Then it flips — asking the child to think aloud (`speak`) so the tutor can hear (and the learner model record) their strategy, not just their answer. Keep each think-aloud short (one idea per turn).

**Primary example.** English, Year 4 — reading: "This sentence confused me, so I'll reread it… ah, *it* means the dog. Now it makes sense." Then the child narrates their own re-read.

**Pitfalls.** (1) Modelling silently (the reasoning is the point). (2) Think-alouds so long they overload. (3) Never having the child think aloud back.

**Related.** [[Worked examples & process modelling]], [[../methods/questioning-and-dialogue|self-explanation prompts]], [[../methods/instruction-models|demonstration / modelling]].

---

## Analogies & metaphors

**Family:** Representation & modelling · **Evidence:** moderate — (Gentner structure-mapping; powerful for transfer, risky if surface-mapped) · **Best for:** making an unfamiliar abstract idea graspable via a familiar one; ages 7–11.

**What it is.** Explaining a new concept by mapping it onto something the child already understands ("electric current is like water flowing through pipes"; "a fraction is like sharing a pizza fairly").

**Why it works.** It lets the child import an existing, well-understood structure onto the new idea, giving instant intuition. Effective analogies map the *relational structure*, not just surface features.

**When to use / when NOT.** Use for abstract ideas with a good familiar parallel, anchored in the child's known interests. NOT when the analogy breaks in misleading ways — every analogy has limits, and children may over-extend it (e.g. "electricity gets used up like water runs out"). Always name where it breaks.

**How to run it (steps).**
1. Pick a familiar thing that shares the *relational structure*.
2. Map the parts explicitly (this↔that).
3. Use it to reason about the new idea.
4. Flag where the analogy *breaks* before it misleads.

**1:1 AI-tutor adaptation.** The tutor draws analogies from the learner model's recorded *interests* (football, baking, a favourite game) to make the new idea click, then explicitly states the analogy's limit. If a misconception traces to an over-stretched analogy, the remedy is to mark the breakpoint, not to abandon the analogy.

**Primary example.** Science, Year 6 — circuits: "the battery is like a pump, the wire like pipes, the bulb like a water wheel" — then "but the electricity isn't *used up* like water can be."

**Pitfalls.** (1) Surface analogies that don't map the structure. (2) Never naming the breakpoint (breeds new misconceptions). (3) An analogy more confusing than the concept.

**Related.** [[Multiple representations]], [[../methods/instruction-models|Advance Organisers]], [[../methods/questioning-and-dialogue|elaborative interrogation]].

---

## Gestures

**Family:** Representation & modelling · **Evidence:** promising — (Goldin-Meadow; gesturing while learning aids maths and retention) · **Best for:** embodying spatial/relational ideas — magnitude, grouping, balance, sequence; ages 5–9 especially.

**What it is.** Using hand/body movements to represent ideas — sweeping a hand for "bigger," cupping two groups for "equal sharing," tracing a letter shape in the air — by teacher and child alike.

**Why it works.** Gesture offloads thinking onto the body, lightening working memory, and a matching gesture can convey relational structure (size, grouping, direction) more directly than words. Children who gesture while reasoning often understand more.

**When to use / when NOT.** Use for spatial, relational, or kinaesthetic ideas, and to anchor a procedure (the "carry" gesture). NOT a substitute for the conceptual teaching; and it transfers awkwardly to a voice-only medium — adapt for the app.

**How to run it (steps).**
1. Pair a clear gesture with the idea ("a *whole* — two hands forming a circle").
2. Have the child copy the gesture while saying the idea.
3. Re-use the same gesture consistently as a cue.

**1:1 AI-tutor adaptation.** Classai is voice/avatar-led, so the tutor *invites the child* to gesture ("hold up the bigger number's amount on your fingers", "draw the letter in the air with me") rather than relying on its own hands, and the avatar/`whiteboard` motion can stand in for teacher gesture. Best paired with concrete/pictorial blocks. Limited but real for the youngest, kinaesthetic learners — note this isn't "kinaesthetic learning style" (see AVOID in the instruction/pedagogy notes), just embodied cognition.

**Primary example.** Maths, Year 1 — "show me 7 on your fingers, now 3 more" — the child's hands embody bridging to ten.

**Pitfalls.** (1) Treating gesture as a "learning style" rather than a universal aid. (2) Inconsistent gestures (confusing cues). (3) Over-relying on it in a voice-only flow.

**Related.** [[Manipulatives]], [[Concrete–Pictorial–Abstract]], [[Multiple representations]].

---

## Multiple representations

**Family:** Representation & modelling · **Evidence:** strong — (Lesh; deep understanding = flexible movement across representations) · **Best for:** building robust, transferable understanding of a concept; ages 7–11.

**What it is.** Presenting the *same* idea in several forms — concrete object, picture, number line, symbols, words, real-world context — and helping the child move fluently *between* them. Understanding a concept deeply means recognising it across all its faces.

**Why it works.** A concept tied to a single representation is brittle (it breaks when the surface changes). Seeing ½ as a folded paper, a shaded bar, a point on a line, the symbol, and "one of two equal parts" builds a richer, more flexible schema that transfers to new problems.

**When to use / when NOT.** Use to consolidate and deepen a concept once introduced, and to test true understanding ("show me ½ a different way"). NOT all at once for a novice (overload) — introduce representations one at a time, then connect them. Don't pile on representations that don't add a new angle.

**How to run it (steps).**
1. Introduce the concept in one representation.
2. Add a second; explicitly link them ("this picture *is* this symbol").
3. Build up several, connecting each to the others.
4. Test flexibility: "show/explain it another way."

**1:1 AI-tutor adaptation.** Across a topic's lessons the tutor deliberately rotates representations (`emojiViz`, `numberLine`, `whiteboard` bar, symbols, a worded context) and asks the child to *translate* between them as a high-level check ("draw what 3 × 4 means"). Introduce one at a time (cognitive load), then connect. Translating between representations is strong evidence of real understanding for the learner model.

**Primary example.** Maths, Year 3 — ¼ shown as a pizza slice, a shaded bar, a point on a `numberLine`, the symbol ¼, and "one of four equal parts" — child links them.

**Pitfalls.** (1) Dumping all representations on a novice at once. (2) Never *connecting* the representations (they stay isolated). (3) Adding representations that don't reveal a new facet.

**Related.** [[Concrete–Pictorial–Abstract]], [[Bar modelling / Singapore maths]], [[Number lines & ten frames]], [[Analogies & metaphors]].

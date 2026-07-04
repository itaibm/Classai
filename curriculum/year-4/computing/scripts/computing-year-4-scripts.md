# Year 4 Computing — Tutor Scripts (Lessons 1–18)

Complete tutor scripts for [Year 4 Computing](../computing-year-4.md), built to the [scripting guide](../../../SCRIPTING-GUIDE.md) and grounded in `knowledge-base/subjects/computing-life-skills/computing-ks1-ks2.md` and `online-safety.md`. Year 4 is the year of **repetition** (loops), with branching databases, multimedia, source-evaluation and a warm online-safety unit. Unplugged-first wherever it helps. Every beat ⏱ sums to the duration, with verbatim Say / Show / Do / Ask, a real CHECK with wrong-answer fixes, the mandatory "if the child is stuck" protocol, differentiation, extension and assessment evidence. A Year 4 child (ages 8–9) gets longer practice and reasoning probes ("how do you know?"). Keep the online-safety unit **warm and reassuring** — never imply a child is to blame.

---

# Unit 1 — Loops & repetition

---

## Lesson 1 — Spot the repeat
**Computing · Year 4 · Unit 1 (Loops & repetition)** | **Duration:** 30 min | **Objective:** "By the end, I can spot a repeating pattern and say how many times it repeats."
**You will need:** a clapping/stamping rhythm to lead, a printed "long script" of 8 identical hop blocks (or drawn on paper), highlighter, dance prompt cards.
**Prior knowledge to retrieve:** Year 3 — programs are sequences of blocks that run in order.
**Key vocabulary:** **loop**, **repeat**, **pattern**, **repetition**, **iterate**, **efficient**.
**What to emphasize:** **repetition = the same chunk done again and again.** Spot the repeating chunk *and* count how many times. Pre-empt "every block is different" — many are *identical copies*.
---
### ⏱ 0–4 min · HOOK
> **Say:** "To make your sprite hop 20 times, would you really drag 20 blocks? That's slow and easy to get wrong. There's a *much* smarter way — and it starts with spotting a repeat. Clap with me: clap-clap-stamp… clap-clap-stamp… clap-clap-stamp. What keeps happening?"
**Do:** lead the rhythm 3 times; let the child join in.
**Ask (retrieve prior knowledge):** "What is a program?" → *listen for:* "blocks/steps that run in order."
*(If shaky: "It's an algorithm the computer runs — steps in order.")*
### ⏱ 4–11 min · EXPLAIN (I do)
> **Say:** "When the same chunk happens again and again, that's **repetition**. In our rhythm, 'clap-clap-stamp' is the chunk, and it repeated **3 times**. Spotting a repeat means two jobs: find the chunk that's the same, and count how many times. Watch this Scratch script — eight 'hop' blocks, all identical. The chunk is one 'hop', and it repeats **8 times**."
**Show / Do:** point at the 8 identical blocks; highlight one and write "× 8".
**Emphasize:** "Find the **same chunk**, then **count the repeats**."
### ⏱ 11–16 min · EXAMPLE (we do)
> **Say:** "Your turn with a dance: step-step-clap, step-step-clap, step-step-clap, step-step-clap. What's the repeating chunk, and how many times?"
**Do:** the child performs/says it; the tutor tallies repeats on paper.
**Ask:** "What's the chunk, and how many repeats?" → *listen for:* "'step-step-clap', 4 times."
### ⏱ 16–20 min · CHECK
**Ask:** "These four blocks are the same and the whole group repeats 8 times. What pattern do you see — and why isn't it 'eight different blocks'?"
- ✅ **Expected:** the *same* action repeated 8 times — it could be a loop. — probe: *"How did you know they were the same?"*
- ❌ **If "eight different blocks":** counting copies as different → **fix:** "Cover all but one — are the others the same as this? They're *copies*."
- ❌ **If can't count repeats:** → **fix:** "Point and count the chunks out loud with me: one… two… three…"
### ⏱ 20–26 min · PRACTICE (you do)
**Do:** The child looks at 2–3 patterns (a clapping line, a printed block list, a tile border) and writes the chunk + the repeat count for each. Once secure, interleave: a sequence with **two** repeating chunks (e.g. "AAA then BB").
**Watch for:** miscounting; thinking copies are different blocks.
> **If the child is stuck (missed twice):** 1) don't tell them the count; 2) name *why* — copies look like new things, or a miscount; 3) cover all but the chunk so the repeat is obvious; 4) one hint: "How many times does *this bit* happen?"; 5) re-ask with a shorter pattern, then build up; 6) "Mistakes show us what to practise — let's take a smaller pattern."
### ⏱ 26–30 min · RECAP
> **Say:** "Tell me what 'repetition' means and how you spot it." → *listen for:* "the same chunk again and again; find the chunk and count the repeats."
**Process praise:** "You spotted the repeating chunk *and* counted it exactly — that's pattern recognition, a real coder's skill."
**Revisit later:** next lesson we turn 'repeat 8 times' into a single **loop** block.
---
**Differentiation** — support: count the repeats in one clear pattern with the chunk pre-marked. / stretch: find two different repeating chunks in one sequence.
**Extension (if time allows):** invent a clapping pattern and challenge the tutor to name the chunk and count.
**Assessment evidence:** child names the repeating chunk and states the correct repeat count.

---

## Lesson 2 — The "repeat ( )" loop in Scratch
**Computing · Year 4 · Unit 1 (Loops & repetition)** | **Duration:** 35 min | **Objective:** "By the end, I can use a 'repeat ( )' loop to replace many copied blocks."
**You will need:** a computer with Scratch (scratch.mit.edu) loaded with a long starter script (e.g. 6–8 copied "move 10 / wait" blocks), the C-shaped "repeat ( )" block ready to point to.
**Prior knowledge to retrieve:** spotting the repeating chunk and its count (L1).
**Key vocabulary:** **loop**, **repeat ( )**, **C-shaped block**, **efficient**, **iterate**.
**What to emphasize:** **one block inside "repeat N" runs N times** — the loop replaces the copies, behaviour stays identical. Pre-empt "repeat 4 means do four different things."
---
### ⏱ 0–4 min · HOOK
> **Say:** "One block inside a loop can do the work of twenty. Let's shrink a program! Here's a sprite that hops using SIX copied blocks. Watch me make it do *exactly the same thing* with just one block inside a loop."
**Do:** run the long copied script so the child sees the behaviour first.
**Ask (retrieve prior knowledge):** "What's the repeating chunk here, and how many times?" → *listen for:* "one 'hop', 6 times."
### ⏱ 4–12 min · EXPLAIN (I do)
> **Say:** "This is the **'repeat ( )'** block — it's **C-shaped**, like a mouth. Whatever I put *inside* its mouth runs that many times. I take ONE hop block, drop it inside 'repeat 6', and the loop runs it six times. Important: 'repeat 6' does NOT mean do six different things — it means do the *same* inside blocks, six times over."
**Show / Do:** drag one block into "repeat 6"; run it; show the loop block highlighting as it cycles.
**Emphasize:** "**One block inside 'repeat 6' runs six times** — same result, far fewer blocks."
### ⏱ 12–20 min · EXAMPLE (we do)
> **Say:** "Let's refactor together. Predict first: if we put one 'move 10' inside 'repeat 4', what will the sprite do? Now let's run it."
**Do:** the child predicts, the tutor builds it; run and compare to the long version.
**Ask:** "Did the loop do the same as the copies?" → *listen for:* "yes — identical, but tidier."
### ⏱ 20–24 min · CHECK
**Ask:** "How many 'hop' blocks do you need *with a loop* to make a sprite hop 6 times?"
- ✅ **Expected:** just one 'hop' block, inside 'repeat 6'. — probe: *"Where does the number 6 go?"*
- ❌ **If "six hop blocks":** still thinking in copies → **fix:** "The loop repeats *one* block for you — how many do you actually drag inside?"
- ❌ **If "repeat 6 = do six different moves":** → **fix:** "Watch it loop — it runs the *same* inside block each time. Count the highlights."
### ⏱ 24–31 min · PRACTICE (you do)
**Do:** The child opens the long starter script and rewrites it with one "repeat ( )" loop, predicts, runs, and confirms the behaviour is identical. Once secure, interleave: change the repeat number to vary how many times it runs.
**Watch for:** blocks placed *beside* the loop not *inside* it; wrong repeat count.
> **If the child is stuck (missed twice):** 1) don't build it for them; 2) name *why* — block outside the mouth, or wrong count; 3) point to the C-shape and where the chunk drops in; 4) one hint: "Does the block click *inside* the mouth?"; 5) do one block together, then they add the rest; 6) "One block in the loop — let's place just that first."
### ⏱ 31–35 min · RECAP
> **Say:** "Why is a loop better than copying the same block six times?" → *listen for:* "shorter, clearer, less error-prone, shows the pattern."
**Process praise:** "You collapsed a giant script into one tidy loop and proved it behaves the same — brilliant, efficient coding."
**Revisit later:** next we choose between "repeat N" and "forever".
---
**Differentiation** — support: drop one given block into a ready-made "repeat 4". / stretch: nest a count change so the same loop runs a different number of times.
**Extension (if time allows):** refactor a second copied script and write how many blocks the loop saved.
**Assessment evidence:** child replaces copied blocks with one working "repeat ( )" loop, behaviour unchanged.

---

## Lesson 3 — "forever" vs "repeat"
**Computing · Year 4 · Unit 1 (Loops & repetition)** | **Duration:** 30 min | **Objective:** "By the end, I can choose 'repeat ( )' or 'forever' for the right job."
**You will need:** a computer with Scratch, a multi-costume sprite (e.g. a bird/butterfly with two costumes), the "forever" and "repeat ( )" blocks ready.
**Prior knowledge to retrieve:** "repeat ( )" runs inside blocks N times (L2).
**Key vocabulary:** **forever**, **repeat ( )**, **animation**, **costume**, **stop**.
**What to emphasize:** **"repeat N" stops on its own; "forever" never ends until you stop it.** Match the loop to the job: counted action → "repeat N"; endless animation → "forever". Pre-empt using "forever" then wondering why the program never finishes.
---
### ⏱ 0–4 min · HOOK
> **Say:** "Some things repeat a *set* number of times — clap five times, then stop. Some things go *on and on* — a heart beating, wings flapping. Which loop fits which? Today you'll pick the right one."
**Do:** flap your arms endlessly, then clap exactly 5 times and stop.
**Ask (retrieve prior knowledge):** "What does 'repeat 5' do?" → *listen for:* "runs the inside blocks 5 times, then stops."
### ⏱ 4–11 min · EXPLAIN (I do)
> **Say:** "Two loops. **'Repeat 10'** runs the inside ten times then *stops by itself* — good when you want a set amount. **'Forever'** runs the inside blocks over and over and *never stops on its own* — you have to stop the program. That's perfect for animation, like wings that keep flapping. Watch: I put 'next costume / wait' inside 'forever' — the bird flaps and won't sit still."
**Show / Do:** build a "forever [next costume, wait 0.2]" wing flap; run it; click stop to end it.
**Emphasize:** "**Repeat N stops itself. Forever needs *you* to stop it.**"
### ⏱ 11–16 min · EXAMPLE (we do)
> **Say:** "Let's build a fixed action together: 'repeat 4 [move 50, wait]'. Predict — will it stop on its own?"
**Do:** the child predicts, the tutor builds; run it and watch it stop after 4.
**Ask:** "Why did this one stop but the flapping didn't?" → *listen for:* "repeat 4 has a count; forever has no end."
### ⏱ 16–20 min · CHECK
**Ask:** "Why might 'forever' be a problem if you want your program to *finish*?"
- ✅ **Expected:** it never ends on its own — you'd use 'repeat N' when you want it to stop. — probe: *"So which loop for 'jump exactly 3 times'?"*
- ❌ **If "forever stops after a while":** thinks it self-ends → **fix:** "Watch — count to ten… still going. It only stops when *we* press stop."
- ❌ **If picks 'forever' for a counted job:** → **fix:** "Do you want it to stop after a set number? Then which loop has a number?"
### ⏱ 20–26 min · PRACTICE (you do)
**Do:** The child builds **two** programs: a costume-swap animation in "forever", and a fixed movement in "repeat N". They label which is which and why. Once secure, interleave: combine a "forever" flap with a "repeat" move inside one project.
**Watch for:** "forever" used where a count is wanted; nothing stops because no stop is understood.
> **If the child is stuck (missed twice):** 1) don't choose for them; 2) name *why* — confusing endless vs counted; 3) ask "does this job have a number of times, or go on forever?"; 4) one hint: "Set amount → repeat N. On and on → forever."; 5) build the easier one first; 6) "Let's match just the flapping wings to a loop."
### ⏱ 26–30 min · RECAP
> **Say:** "When do you use 'forever', and when 'repeat N'?" → *listen for:* "forever for endless things like animation; repeat N when you want a set number, then it stops."
**Process praise:** "You matched each loop to its job and explained *why* — that's real decision-making."
**Revisit later:** next we use a loop with the pen to draw shapes.
---
**Differentiation** — support: match "repeat / forever" to two given examples. / stretch: combine a "forever" animation with a "repeat" movement in one project.
**Extension (if time allows):** make a scene with one forever animation and one counted action running together.
**Assessment evidence:** child builds a "forever" animation and a "repeat N" action and explains the choice.

---

## Lesson 4 — Loops + pen: draw shapes
**Computing · Year 4 · Unit 1 (Loops & repetition)** | **Duration:** 35 min | **Objective:** "By the end, I can use a loop with the pen to draw a regular shape."
**You will need:** a computer with Scratch + the **Pen** extension added, paper to sketch predictions, a printed square/triangle reference.
**Prior knowledge to retrieve:** "repeat ( )" runs inside blocks N times (L2–3); turning by degrees.
**Key vocabulary:** **pen down**, **pen up**, **repeat ( )**, **regular shape**, **angle/turn**, **side**.
**What to emphasize:** a shape = **move + turn, repeated once per side.** Square = repeat 4 [move, turn 90]; triangle = repeat 3 [move, turn 120]. Pre-empt "repeat 4 = four different things" and forgetting "pen down".
---
### ⏱ 0–4 min · HOOK
> **Say:** "Can you draw a *perfect* square with just ONE loop instead of eight blocks? A square has four equal sides and four equal turns — and a loop *loves* doing the same thing again and again. Let's draw with code!"
**Do:** trace a square in the air: side, turn, side, turn, side, turn, side.
**Ask (retrieve prior knowledge):** "How many sides has a square, and how many turns?" → *listen for:* "4 sides, 4 turns."
### ⏱ 4–13 min · EXPLAIN (I do)
> **Say:** "First, **pen down** so the sprite leaves a line as it moves. A square is the same two blocks — 'move 100' then 'turn 90' — repeated for each side. Four sides, so 'repeat 4 [move 100, turn 90]'. Watch me predict a square… pen down… run." (Demo.) "One tiny loop drew the whole square!"
**Show / Do:** add Pen, build "pen down → repeat 4 [move 100, turn 90]"; run; trace each side as it draws.
**Emphasize:** "**Move + turn, repeated once per side** — and don't forget **pen down**."
### ⏱ 13–20 min · EXAMPLE (we do)
> **Say:** "Now a triangle has 3 sides. Predict on paper first: what should I change — the repeat number, the turn, or both? Let's try 'repeat 3' and 'turn 120'."
**Do:** the child predicts; the tutor changes count to 3 and turn to 120; run and compare to prediction.
**Ask:** "Why did we change the turn to 120 for a triangle?" → *listen for:* "fewer sides means a bigger turn; the turns share 360 degrees."
### ⏱ 20–24 min · CHECK
**Ask:** "Why use a loop instead of copying the same move-and-turn blocks for every side?"
- ✅ **Expected:** shorter, clearer, less error-prone, and shows the repeating pattern. — probe: *"What would change if you wanted a pentagon?"*
- ❌ **If "loops are just shorter to type":** missing the bigger point → **fix:** "Also fewer mistakes — change *one* number and every side updates. Try it."
- ❌ **If shape is open / no pen line:** forgot pen down → **fix:** "Did you put the pen *down*? Add it before the loop and run again."
### ⏱ 24–31 min · PRACTICE (you do)
**Do:** The child predicts then draws **two** shapes with a loop+pen (e.g. square and triangle), sketching the prediction first. Once secure, interleave: predict and draw a third shape by changing the count and turn.
**Watch for:** missing "pen down"; "repeat 4" with the turn wrong; not predicting first.
> **If the child is stuck (missed twice):** 1) don't fix it for them; 2) name *why* — pen up, wrong turn, or no prediction; 3) draw the shape on paper and count sides/turns together; 4) one hint: "How many sides → that's your repeat number."; 5) draw a square first (the secure one), then change it; 6) "Let's get one clean square, then change just the count."
### ⏱ 31–35 min · RECAP
> **Say:** "Tell me the loop for a square, in your own words." → *listen for:* "pen down, repeat 4, move then turn 90."
**Process praise:** "You predicted the shape *then* proved it with one loop — that's exactly how a coder works."
**Revisit later:** next we *debug* loop programs whose shapes come out wrong.
---
**Differentiation** — support: run a given square, then just change the count to a triangle. / stretch: work out the turn for a pentagon (360 ÷ 5 = 72) and draw it.
**Extension (if time allows):** draw a repeating *pattern* by wrapping the shape loop inside another loop with a small turn between shapes.
**Assessment evidence:** child predicts and draws a regular shape using a loop + pen, with pen down set.

---

## Lesson 5 — Debug a loop program
**Computing · Year 4 · Unit 1 (Loops & repetition)** | **Duration:** 30 min | **Objective:** "By the end, I can find and fix a bug in a loop program."
**You will need:** a computer with Scratch, pre-loaded buggy loop+pen projects (one with the wrong repeat count, one with the wrong turn angle, one missing "pen down"), paper for predictions.
**Prior knowledge to retrieve:** the debugging routine (predict → run → spot → fix one → run again); loops + pen (L4).
**Key vocabulary:** **bug**, **debug**, **loop count**, **inside block**, **predict**, **fix one**.
**What to emphasize:** decide whether the bug is the **loop count (repeat number)** or a **block inside the loop** (the move or turn). Fix one thing, run again. Pre-empt scrapping the whole program.
---
### ⏱ 0–4 min · HOOK
> **Say:** "My square came out as an open shape — yikes! But the loop *almost* worked. Is the bug in the **loop count**, or in a **block inside** the loop? Bugs are normal, even for expert coders. Let's be loop detectives."
**Do:** run the buggy project so the child sees the wonky shape.
**Ask (retrieve prior knowledge):** "What's our debugging routine?" → *listen for:* "predict, run, spot, fix one, run again."
### ⏱ 4–11 min · EXPLAIN (I do)
> **Say:** "With loops there are two main places a bug hides. The **loop count** — the repeat number — controls *how many* sides. A **block inside** — the move or the turn — controls the *size* or the *angle*. So I predict a square, run it, and spot: too many sides? That's the *count*. Angle wrong so it won't close? That's the *turn* inside. I change just that ONE thing and run again."
**Show / Do:** demo a project with "repeat 5" for a square — too many sides → reduce the count to 4; run again.
**Emphasize:** "Ask first: is it the **loop count** or a **block inside**? Then fix **one**."
### ⏱ 11–16 min · EXAMPLE (we do)
> **Say:** "Here's a triangle that won't close — the turn is 90 not 120. Predict, run, and tell me: count or inside block?"
**Do:** the child diagnoses (inside block — the turn); the tutor fixes it; run again to a clean triangle.
**Ask:** "How did you know it was the turn, not the count?" → *listen for:* "right number of sides but they don't meet up — so it's the angle inside, not how many."
### ⏱ 16–20 min · CHECK
**Ask:** "Your shape has too many sides. Is the fix the loop count or the move block — and which way?"
- ✅ **Expected:** the loop count (repeat number) — reduce it. — probe: *"How did you decide it wasn't the turn?"*
- ❌ **If "change the move block":** wrong target → **fix:** "Too many *sides* — does 'move' make sides appear, or does the *repeat number*? Count the sides."
- ❌ **If "start over":** scrapping → **fix:** "Most of it works! Change just the one number that's wrong, then run again."
### ⏱ 20–26 min · PRACTICE (you do)
**Do:** The child fixes **two** buggy loop projects, each time saying whether it was the count or an inside block before fixing. Once secure, interleave: a project where the count is fine but "pen down" is missing.
**Watch for:** changing several things at once; not predicting; clearing the program.
> **If the child is stuck (missed twice):** 1) don't fix it for them; 2) name *why* — not isolating count vs inside; 3) count the sides together and check if they meet; 4) one hint: "Right number of sides? Then it's an inside block."; 5) fix one obvious bug first; 6) "Mistakes show us where to look — change just one thing and run."
### ⏱ 26–30 min · RECAP
> **Say:** "When a loop shape is wrong, what two places do you check?" → *listen for:* "the loop count, or a block inside the loop."
**Process praise:** "You diagnosed *where* the bug lived before touching anything, then fixed just one thing — proper debugging."
**Revisit later:** end-of-unit check; the debugging routine returns when we test branching databases.
---
**Differentiation** — support: one clearly-flagged bug ("look at the repeat number"). / stretch: a bug where the count *and* angle must both be reasoned about.
**Extension (if time allows):** plant a single loop bug for the tutor to diagnose and fix — then swap roles.
**Assessment evidence:** child finds a loop bug, says whether it's the count or an inside block, and fixes it with one change.

> **End-of-unit check (Unit 1):** Child replaces copied blocks with a "repeat" loop, chooses repeat vs forever appropriately, draws a regular shape with a loop+pen (predicting first), and debugs a loop program by reasoning about count vs inside block.

---

# Unit 2 — Branching databases

---

## Lesson 6 — Yes/no questions sort the world
**Computing · Year 4 · Unit 2 (Branching databases)** | **Duration:** 30 min | **Objective:** "By the end, I can sort a set of things using a series of yes/no questions."
**You will need:** a set of 6–8 picture/object cards (animals or vehicles), 2–3 sorting hoops or trays, a "thinking of an animal" idea ready.
**Prior knowledge to retrieve:** Year 3 — sorting/organising information (charts, groups).
**Key vocabulary:** **data**, **attribute**, **yes/no question**, **sort**, **classify**.
**What to emphasize:** a **good yes/no question splits the group roughly in half** — it rules out lots at once. An **attribute** is a feature like "has wings". Pre-empt asking "is it a robin?" first (only rules out one).
---
### ⏱ 0–4 min · HOOK
> **Say:** "I'm thinking of one of these animals. With clever yes/no questions, can you find it in just a few guesses — instead of guessing each one? Let's play detective."
**Show:** spread the picture cards out.
**Ask (retrieve prior knowledge):** "How might we put these into groups?" → *listen for:* "by something they have — colour, wings, legs."
### ⏱ 4–11 min · EXPLAIN (I do)
> **Say:** "An **attribute** is a feature something has — 'has wings', 'lives in water'. We sort using **yes/no questions** about attributes. The trick: a *good* first question splits the group roughly in **half**, so each answer rules out lots at once. Watch: 'Does it have wings?' Yes → these go here; No → these go there. Two questions later, I've found it."
**Show / Do:** ask "Does it have wings?"; physically split the cards into two hoops.
**Emphasize:** "A good question **splits the group in half** — rule out many, not one."
### ⏱ 11–16 min · EXAMPLE (we do)
> **Say:** "Your turn. From the 'no wings' pile, give me one yes/no question that splits it again."
**Do:** the child poses a question (e.g. "Does it have four legs?"); the tutor splits the pile accordingly.
**Ask:** "Did your question rule out *several* cards or just one?" → *listen for:* "several — it split the pile."
### ⏱ 16–20 min · CHECK
**Ask:** "Why is 'Does it have wings?' a better *first* question than 'Is it a robin?'"
- ✅ **Expected:** it splits the group, ruling out lots at once, instead of checking one thing. — probe: *"How many cards does 'is it a robin?' rule out if the answer is no?"*
- ❌ **If "is it a robin? is better":** thinks naming is faster → **fix:** "If it's not a robin, how many are left? Almost all! A splitting question is faster."
- ❌ **If asks a not-yes/no question:** → **fix:** "Can I answer that with just *yes* or *no*? Reshape it."
### ⏱ 20–26 min · PRACTICE (you do)
**Do:** The child sorts a small set of picture cards by repeatedly asking their own yes/no questions, aiming to narrow to one. Once secure, interleave: choose a first question that splits the set as evenly as possible.
**Watch for:** "name the item" questions; questions that aren't yes/no.
> **If the child is stuck (missed twice):** 1) don't give the question; 2) name *why* — naming instead of splitting; 3) look for an attribute half the cards share; 4) one hint: "What do about *half* of these have?"; 5) sort with that one question together; 6) "Let's split the pile with one good question first."
### ⏱ 26–30 min · RECAP
> **Say:** "What makes a yes/no question a *good* sorting question?" → *listen for:* "it splits the group in half / rules out lots at once."
**Process praise:** "Your questions split the pile each time — that's exactly how a computer narrows down data fast."
**Revisit later:** next we turn these questions into a branching database tree.
---
**Differentiation** — support: sort 4 items using given questions. / stretch: invent questions that split the set as evenly as possible each time.
**Extension (if time allows):** play "guess my item" with the tutor using only splitting questions and count how few it took.
**Assessment evidence:** child sorts a set using yes/no questions, choosing questions that split rather than name.

---

## Lesson 7 — Build a branching database
**Computing · Year 4 · Unit 2 (Branching databases)** | **Duration:** 35 min | **Objective:** "By the end, I can build a branching database that identifies items by yes/no questions."
**You will need:** branching-tree template sheets, ~6 item cards (creatures/vehicles), pencils; optional: a branching-database tool (e.g. j2e/JIT branching, or a tablet app).
**Prior knowledge to retrieve:** good yes/no questions split the group (L6).
**Key vocabulary:** **branching database**, **tree**, **branch**, **yes/no question**, **identify**, **unique path**.
**What to emphasize:** a branching database is a **tree of yes/no questions**; each question **splits into two branches**, ending at a **single item** reached by a **unique path**. Pre-empt two items sharing the same path.
---
### ⏱ 0–5 min · HOOK
> **Say:** "Let's build a machine that can identify *any* of our creatures just by asking questions! Answer yes or no a few times, and it points to exactly one. Today you build your own."
**Show:** a half-drawn tree on paper with one question splitting into yes/no.
**Ask (retrieve prior knowledge):** "What does a *good* yes/no question do?" → *listen for:* "splits the group / rules out lots."
### ⏱ 5–14 min · EXPLAIN (I do)
> **Say:** "A **branching database** is a **tree** of yes/no questions. Each question has **two branches** — yes goes one way, no goes the other. Every time you answer, the group splits, until you reach a branch with just **one item** on it. The path of answers that gets you there is **unique** — no two items share it. Watch me build a tree for four creatures."
**Show / Do:** draw a 2-level tree: Q1 splits 4 into 2 and 2; Q2 on each side splits to single items.
**Emphasize:** "Each question **splits into two**; every item ends at its **own unique path**."
### ⏱ 14–22 min · EXAMPLE (we do)
> **Say:** "Help me add a fifth creature. Where does it go? What yes/no question separates it from the one already there?"
**Do:** the child suggests a question that splits the shared spot; the tutor draws the new branch.
**Ask:** "What does that new question *do* to those two creatures?" → *listen for:* "splits them so each has its own path."
### ⏱ 22–26 min · CHECK
**Ask:** "What does each yes/no question do in a branching database?"
- ✅ **Expected:** it splits the items into two groups, narrowing down until one item is left. — probe: *"What's at the very end of each branch?"*
- ❌ **If "it names the item":** confusing question with answer → **fix:** "A question doesn't name it — it *splits* the group. What's left after a few splits?"
- ❌ **If "questions can have three answers":** → **fix:** "Each branch is yes *or* no — only two. How would you split three ways into yes/no steps?"
### ⏱ 26–32 min · PRACTICE (you do)
**Do:** The child builds a branching database (on the template, then optionally in a tool) for ~6 items, testing that each item is reached by a **unique** yes/no path. Once secure, interleave: check no two items share a path.
**Watch for:** two items at the same end; non-yes/no questions; branches that don't split.
> **If the child is stuck (missed twice):** 1) don't build it for them; 2) name *why* — items sharing a spot or a vague question; 3) point to the two stuck items and ask what's *different* about them; 4) one hint: "What does one have that the other doesn't?"; 5) add that one splitting question together; 6) "Let's separate just these two first."
### ⏱ 32–35 min · RECAP
> **Say:** "How does a branching database identify one item?" → *listen for:* "yes/no questions split the group until only one is left, by a unique path."
**Process praise:** "You built a tree where every creature has its own path — your machine can identify them all."
**Revisit later:** next the tutor and child test each other's databases and fix a question that fails.
---
**Differentiation** — support: complete a part-built tree (last splits only). / stretch: ensure no two items share the same path and the tree is balanced.
**Extension (if time allows):** add two more items and the questions needed to keep every path unique.
**Assessment evidence:** child builds a branching database where each item is reached by a unique yes/no path.

---

## Lesson 8 — Test and improve the database
**Computing · Year 4 · Unit 2 (Branching databases)** | **Duration:** 30 min | **Objective:** "By the end, I can test my branching database and fix a question that doesn't work."
**You will need:** the child's branching database from L7, a tutor-made branching database with a planted collision, blank question slips, pencils.
**Prior knowledge to retrieve:** each item needs a unique yes/no path (L7); the debugging mindset (predict→run→spot→fix).
**Key vocabulary:** **test**, **collision** (two items, same path), **improve**, **add a question**, **debug**.
**What to emphasize:** **testing means trying to reach every item**; if two land in the same place, a question is **missing or unclear** — add/improve one to **separate** them. This is debugging applied to data. Pre-empt blaming the items rather than the questions.
---
### ⏱ 0–4 min · HOOK
> **Say:** "Two animals end up at the same spot — our machine is confused and can't tell them apart! Which question must we fix? Today we swap — you test my database and I test yours — and help them both work perfectly."
**Show:** a tree where two items share one end branch.
**Ask (retrieve prior knowledge):** "What should be at the end of each branch?" → *listen for:* "exactly one item, a unique path."
### ⏱ 4–10 min · EXPLAIN (I do)
> **Say:** "**Testing** means I try to reach *every* item by answering the questions. If two items end up in the **same** spot — a **collision** — the database can't tell them apart. The fix isn't to throw it away: I find where they're stuck and **add or improve one yes/no question** that *separates* them. That's debugging, but for data."
**Show / Do:** trace two stuck items to the same branch; add one splitting question on a slip.
**Emphasize:** "Two items, one spot = a **missing question**. Add one that **separates** them."
### ⏱ 10–16 min · EXAMPLE (we do)
> **Say:** "Test this branch with me. Both a cat and a rabbit end here. What yes/no question tells them apart?"
**Do:** child proposes a separating question (e.g. "Does it have long ears?"); add the branch.
**Ask:** "Why does *that* question fix the collision?" → *listen for:* "one says yes, the other no — now each has its own path."
### ⏱ 16–20 min · CHECK
**Ask:** "Two items reach the same end. What's wrong, and how do you fix it?"
- ✅ **Expected:** a question is missing/unclear; add a yes/no question that separates the two items. — probe: *"What must be different about your new question's answers for those two?"*
- ❌ **If "remove one of the items":** dodging the fix → **fix:** "We want to keep both! What's *different* about them we can ask about?"
- ❌ **If adds a non-splitting question:** both still answer the same → **fix:** "Does one say yes and the other no? If both say yes, it doesn't separate them."
### ⏱ 20–26 min · PRACTICE (you do)
**Do:** The child and tutor swap databases — the child tests the tutor's (with its planted collision) by trying to identify each item, while the tutor tests the child's. Where two items collide, the child adds/improves a question to separate them, then re-tests. Once secure, interleave: fix a second collision in their own tree.
**Watch for:** questions that don't actually split the two; not re-testing after the fix.
> **If the child is stuck (missed twice):** 1) don't fix it for them; 2) name *why* — the new question doesn't separate; 3) look at the two items: what does one have the other doesn't?; 4) one hint: "Make a question where they answer *differently*."; 5) add it together and re-test; 6) "Keep both items — let's find the one difference."
### ⏱ 26–30 min · RECAP
> **Say:** "How do you know a branching database works?" → *listen for:* "every item has its own unique path — no two collide."
**Process praise:** "You tested like a real engineer, found the collision, and fixed the question that caused it."
**Revisit later:** end-of-unit check; planning and testing skills carry into our multimedia projects.
---
**Differentiation** — support: fix one flagged collision with a hint. / stretch: redesign a question so the whole tree is balanced (splits evenly).
**Extension (if time allows):** add a brand-new item to the tutor's tree and the question needed to keep all paths unique.
**Assessment evidence:** child tests a branching database, identifies a collision, and adds/improves a question that separates the items.

> **End-of-unit check (Unit 2):** Child builds a branching database that identifies each item by a unique yes/no path, and tests/fixes a question that fails (a collision).

---

# Unit 3 — Multimedia: audio & video

---

## Lesson 9 — Plan with a storyboard
**Computing · Year 4 · Unit 3 (Multimedia)** | **Duration:** 35 min | **Objective:** "By the end, I can storyboard a short audio/video piece for a purpose and audience."
**You will need:** storyboard sheets (3–6 frames, each with a picture box + a words/sounds line), pencils, one short example clip (e.g. a 30-second advert or fact narration), purpose/audience prompt cards.
**Prior knowledge to retrieve:** Year 3 — making content for a **purpose and audience**; planning before doing.
**Key vocabulary:** **multimedia**, **storyboard**, **frame/shot**, **narration**, **sound effect**, **purpose**, **audience**.
**What to emphasize:** **plan before you record.** A storyboard sets the **order, the words/sounds, and the shots** so the recording matches the **purpose and audience**. Pre-empt "I'll just make it up on the spot."
---
### ⏱ 0–5 min · HOOK
> **Say:** "Films and podcasts aren't made up on the spot — they're *planned*, frame by frame, before anyone records a word. Let's plan ours! First, who is it *for*, and what's it *for*?"
**Show:** play a 30-second example clip.
**Ask (retrieve prior knowledge):** "What does 'purpose and audience' mean?" → *listen for:* "what it's for, and who'll see/hear it."
### ⏱ 5–14 min · EXPLAIN (I do)
> **Say:** "Today we decide a **purpose** (advertise a summer fair, narrate a fact, a short stop-motion) and an **audience** (younger children, family). Then we fill a **storyboard**: each **frame** has a *picture or shot* and the *words or sounds* that go with it. The storyboard is the plan — get it right and the recording goes smoothly. Watch me fill frame 1: picture of the fair sign; words: 'Come to our summer fair!'"
**Show / Do:** model filling the first 1–2 frames, picture box + words/sounds line.
**Emphasize:** "**Plan the order, words and shots first** — recording is easy once it's planned."
### ⏱ 14–22 min · EXAMPLE (we do)
> **Say:** "Let's plan frame 2 together. What's the picture, and what words or sound go with it — and does it suit our audience?"
**Do:** the child supplies the shot + words; the tutor writes them in; check it fits purpose/audience.
**Ask:** "Does this frame match who it's *for*?" → *listen for:* "yes — simple/exciting words for younger children," etc.
### ⏱ 22–26 min · CHECK
**Ask:** "Why storyboard *before* recording?"
- ✅ **Expected:** it plans the order, words and shots so the recording goes smoothly and matches the purpose. — probe: *"What could go wrong if you skip it?"*
- ❌ **If "to make it look nice":** surface answer → **fix:** "It's mostly about *planning* — what would happen if you recorded with no plan?"
- ❌ **If "you don't need to plan":** → **fix:** "Try recording with no plan — you'd forget words, mix up the order. The storyboard prevents that."
### ⏱ 26–32 min · PRACTICE (you do)
**Do:** The child completes their own storyboard (3–6 frames) for a stated purpose and audience, with a picture/shot and words/sounds per frame. Once secure, interleave: add a sound-effect note to one frame.
**Watch for:** frames with no words/sounds; order that doesn't tell the story; drifting off the audience.
> **If the child is stuck (missed twice):** 1) don't plan it for them; 2) name *why* — no clear purpose or empty frames; 3) ask "what's the very first thing your audience should see and hear?"; 4) one hint: "Frame 1: a picture *and* a few words."; 5) fill one frame together; 6) "Let's plan just the opening shot first."
### ⏱ 32–35 min · RECAP
> **Say:** "What three things does each storyboard frame hold?" → *listen for:* "a picture/shot, the words/sounds, in the right order — for the purpose and audience."
**Process praise:** "You planned every frame *for your audience* before touching a microphone — that's how real directors work."
**Revisit later:** next we record the narration and sound effects from this storyboard.
---
**Differentiation** — support: 3-frame storyboard with picture/word prompts. / stretch: add camera/shot and sound notes per frame.
**Extension (if time allows):** add an opening title frame and a closing frame so the piece feels complete.
**Assessment evidence:** child produces a storyboard with ordered frames, each with a shot and words/sounds, matched to a stated purpose and audience.

---

## Lesson 10 — Record audio (narration & sound)
**Computing · Year 4 · Unit 3 (Multimedia)** | **Duration:** 35 min | **Objective:** "By the end, I can record clear narration and a sound effect for my piece."
**You will need:** a device with a recording app (voice recorder / Audacity / online recorder), a quiet space, headphones, the child's storyboard from L9.
**Prior knowledge to retrieve:** the storyboard plan (L9); saving work with a sensible name.
**Key vocabulary:** **record**, **narration**, **sound effect**, **edit** (redo/trim), **listen back**, **save**.
**What to emphasize:** **record clearly, not in a rush; listen back; re-record to improve.** Editing means *redoing or trimming* a part — you don't have to start over. Pre-empt mumbling/rushing and never reviewing.
---
### ⏱ 0–4 min · HOOK
> **Say:** "A great voiceover can make a picture come alive — let's get recording! Listen: same words, two ways." (Read one line rushed and quiet, then slow and clear.) "Which one did your ears like?"
**Do:** model the rushed vs clear read.
**Ask (retrieve prior knowledge):** "What does your storyboard tell you to say first?" → *listen for:* the child reads frame 1's words.
### ⏱ 4–12 min · EXPLAIN (I do)
> **Say:** "To record well: hold the device a steady distance, speak **clearly and not too fast**, and read your storyboard words. Then the secret of all good recordings — **listen back**. If a bit was too quiet or rushed, I just **re-record that part**. Editing means redoing or trimming a piece — I don't start the whole thing again. Watch: I record frame 1, listen back, decide it was rushed, and re-record just that line. I'll add a **sound effect** too — a little clap for the fair."
**Show / Do:** record one line, play it back, re-record it slower, add a sound effect, save with a sensible name.
**Emphasize:** "**Record clear → listen back → re-record the part that needs it.**"
### ⏱ 12–20 min · EXAMPLE (we do)
> **Say:** "Let's record your frame 1 together. Ready, slow and clear… now we listen back. Was it clear, or shall we redo it?"
**Do:** the child records one line; play it back; the child decides to keep or re-record.
**Ask:** "What would make this even clearer?" → *listen for:* "slower / louder / closer to the mic."
### ⏱ 20–24 min · CHECK
**Ask:** "Your narration was too quiet and rushed. What do you do?"
- ✅ **Expected:** re-record that part more slowly and clearly (you can edit/redo it). — probe: *"Do you redo the whole thing or just that part?"*
- ❌ **If "leave it / start the whole thing again":** → **fix:** "You can redo *just* that line — that's editing. Keep the good bits."
- ❌ **If "talk faster":** misdiagnosis → **fix:** "It was *rushed* — would faster help or slower? Try slower and listen again."
### ⏱ 24–31 min · PRACTICE (you do)
**Do:** The child records their narration frame by frame from the storyboard, listening back and re-recording any unclear part, then adds/records one sound effect. Saves with a sensible name. Once secure, interleave: layer the sound effect under a line of narration.
**Watch for:** rushing; not listening back; unsaved or vaguely-named files.
> **If the child is stuck (missed twice):** 1) don't record it for them; 2) name *why* — rushing or not reviewing; 3) read one line together, slow and clear; 4) one hint: "Pretend you're telling it to someone across the room."; 5) record one good line and play it back; 6) "One clear line first — then listen and decide."
### ⏱ 31–35 min · RECAP
> **Say:** "What do you always do *after* recording a part?" → *listen for:* "listen back, and re-record it if it's not clear."
**Process praise:** "You listened back and improved your own recording — that's exactly what real audio editors do."
**Revisit later:** next we combine these recordings with pictures into the finished piece.
---
**Differentiation** — support: read one short scripted line and re-record it once. / stretch: layer narration with a fitting sound effect that doesn't drown the voice.
**Extension (if time allows):** record an alternative take of one line and choose the better one, saying why.
**Assessment evidence:** child records clear narration and a sound effect, listens back, re-records to improve, and saves with a sensible name.

---

## Lesson 11 — Make and share the video/animation
**Computing · Year 4 · Unit 3 (Multimedia)** | **Duration:** 40 min | **Objective:** "By the end, I can combine images and sound into a short piece and improve one thing."
**You will need:** a device with a simple video/slideshow/animation tool (e.g. iMovie/Clips/Photos slideshow, or a stop-motion app), the child's saved audio (L10) and images, headphones.
**Prior knowledge to retrieve:** the storyboard order (L9); their recorded audio (L10).
**Key vocabulary:** **assemble/combine**, **sequence**, **timing**, **caption**, **improve**, **share**, **purpose/audience**.
**What to emphasize:** **assemble images + sound in the storyboard order, then watch and improve ONE thing.** Tie the finished piece back to its **purpose and audience**. Pre-empt random ordering and skipping the improve step.
---
### ⏱ 0–5 min · HOOK
> **Say:** "Time to put it together — pictures, words and sound into one piece your audience will love! You've planned it and recorded it; today is the premiere."
**Show:** your finished example piece (one play-through).
**Ask (retrieve prior knowledge):** "What order do your pictures and sound go in?" → *listen for:* "the storyboard order."
### ⏱ 5–14 min · EXPLAIN (I do)
> **Say:** "I open my tool and **assemble** in storyboard order: drop in image 1, attach narration 1, then image 2 with its audio, and so on. When it's together, I **watch it once** and pick **one thing to improve** — maybe a shot is too quick, or a caption would help, or a clearer picture. I change that one thing, watch again, then it's ready to **share**."
**Show / Do:** sequence two image-and-audio frames; play; add one caption as the "improve one thing".
**Emphasize:** "**Storyboard order → watch → improve one thing → share.**"
### ⏱ 14–22 min · EXAMPLE (we do)
> **Say:** "Let's place your first two frames in order together and play them. What's one thing we could improve?"
**Do:** the child sequences two frames with audio; play back; the child names one improvement.
**Ask:** "How does this match who it's *for*?" → *listen for:* "it explains/advertises clearly for [the audience]."
### ⏱ 22–26 min · CHECK
**Ask:** "How does your finished piece match its purpose and audience?"
- ✅ **Expected:** it explains/advertises clearly for the people it's meant for (any sound link of content → purpose/audience). — probe: *"What in it makes it right for *that* audience?"*
- ❌ **If "it just looks cool":** no purpose link → **fix:** "But what's it *for*, and who's it for? Point to a bit that does that job."
- ❌ **If frames out of order:** → **fix:** "Check your storyboard — which frame comes first? Reorder to match."
### ⏱ 26–35 min · PRACTICE (you do)
**Do:** The child assembles their full piece (image/photo sequence or simple stop-motion) with their audio in storyboard order, watches it, improves **one** thing (timing, a caption, a clearer shot), then shares it with the tutor and family (the audience). Once secure, interleave: time a caption/audio to match the visuals.
**Watch for:** wrong order; audio not matched to its image; skipping the improve step.
> **If the child is stuck (missed twice):** 1) don't assemble it for them; 2) name *why* — order or audio-image mismatch; 3) lay the storyboard beside the screen and match frame by frame; 4) one hint: "Which picture does *this* narration belong to?"; 5) place one frame correctly together; 6) "Let's match just frame 1's picture and sound first."
### ⏱ 35–40 min · RECAP
> **Say:** "What one thing did you improve, and why?" → *listen for:* a specific improvement tied to clarity/purpose.
**Process praise:** "You assembled it in order, watched it like a director, and improved one thing on purpose — a real finished production."
**Revisit later:** end-of-unit check; you'll show this piece again at the Year 4 showcase.
---
**Differentiation** — support: sequence given images with their audio in order. / stretch: time captions/audio precisely to match the visuals.
**Extension (if time allows):** add a title and credits frame, or improve a second element and say why.
**Assessment evidence:** child assembles a short multimedia piece in storyboard order, improves one element, and links it to its purpose and audience.

> **End-of-unit check (Unit 3):** Child storyboards, records clear audio, and assembles a short multimedia piece for a stated purpose and audience, improving one element.

---

# Unit 4 — Researching with reliable sources

---

## Lesson 12 — Reliable vs unreliable, deeper
**Computing · Year 4 · Unit 4 (Researching with reliable sources)** | **Duration:** 30 min | **Objective:** "By the end, I can use who/why/when to judge and rank several sources."
**You will need:** four contrasting "source cards" on ONE topic (encyclopaedia/museum, an advert, a joke/satire page, a news site), a ranking mat (most → least reliable), the four detective questions on display.
**Prior knowledge to retrieve:** Year 3 — "not everything online is true; anyone can publish."
**Key vocabulary:** **source**, **reliable**, **unreliable**, **who / why / when**, **do others agree**, **advert**, **fake news**.
**What to emphasize:** judge a source with **Who made it? Why? When? Do other good sources agree?** Use them to **rank** sources. Pre-empt "if it's online it's true" and "the most shocking claim is the real one".
---
### ⏱ 0–4 min · HOOK
> **Say:** "Four pages, four different 'facts' about the same animal. They can't all be right! Which can we trust — and how do we decide? Today we run a source court."
**Show:** lay out the four source cards on one topic.
**Ask (retrieve prior knowledge):** "Is everything online true?" → *listen for:* "no — anyone can put anything online, so we check."
### ⏱ 4–11 min · EXPLAIN (I do)
> **Say:** "Four detective questions judge any source. **Who** made it — an expert, a museum, a news site, or a random poster? **Why** — to inform you, to sell you something, or to make you laugh? **When** — is it up to date? And **do other good sources agree**? Watch me judge the advert: *who* — a shop; *why* — to sell; not very reliable for facts. The museum page: *who* — experts; *why* — to inform; *when* — recent. More reliable."
**Show / Do:** model judging two of the four cards aloud against the questions.
**Emphasize:** "**Who? Why? When? Do others agree?** — every time."
### ⏱ 11–16 min · EXAMPLE (we do)
> **Say:** "Let's judge the joke page together. Who made it? Why? Where should it go on the ranking mat?"
**Do:** the child applies the questions; place the card on the mat together.
**Ask:** "Why is the joke page near the *least* reliable end?" → *listen for:* "it's made to be funny, not to give true facts."
### ⏱ 16–20 min · CHECK
**Ask:** "Give two questions you'd use to judge a web page."
- ✅ **Expected:** any two of — Who made it? Why? When? Do other good sources agree? — probe: *"Which question catches a sneaky advert?"* (Why.)
- ❌ **If "the one with the most pictures":** wrong cue → **fix:** "Pretty doesn't mean true — *who* made it and *why*? Use those."
- ❌ **If "the most exciting claim":** → **fix:** "Surprising claims need *more* checking, not less. Who said it, and do others agree?"
### ⏱ 20–26 min · PRACTICE (you do)
**Do:** The child ranks all four sources most → least reliable on the mat and writes one detective-question reason for each. Once secure, interleave: spot which source is an advert *in disguise* and explain how.
**Watch for:** ranking by looks; reasons that aren't who/why/when.
> **If the child is stuck (missed twice):** 1) don't rank it for them; 2) name *why* — judging by appearance; 3) ask just one question — "Who made this one?"; 4) one hint: "Made to inform, sell, or joke?"; 5) place the clearest source first; 6) "Let's judge just one card with 'who and why'."
### ⏱ 26–30 min · RECAP
> **Say:** "What four questions judge a source?" → *listen for:* "who, why, when, do others agree."
**Process praise:** "You ranked every source *with reasons*, not just guesses — that's real critical thinking."
**Revisit later:** next we separate fact from opinion and cross-check a fact.
---
**Differentiation** — support: rank 3 sources with the questions on display. / stretch: spot the advert-in-disguise and explain how you knew.
**Extension (if time allows):** find a fifth source and slot it into the ranking with a reason.
**Assessment evidence:** child ranks several sources by reliability and justifies each with who/why/when reasoning.

---

## Lesson 13 — Fact vs opinion; cross-checking
**Computing · Year 4 · Unit 4 (Researching with reliable sources)** | **Duration:** 30 min | **Objective:** "By the end, I can tell a fact from an opinion and cross-check a fact in a second source."
**You will need:** fact/opinion statement cards (mixed), two vetted sources that both contain one checkable fact, two labelled trays ("fact — can check" / "opinion — a view").
**Prior knowledge to retrieve:** judging sources with who/why/when (L12).
**Key vocabulary:** **fact** (can be checked), **opinion** (a feeling/view), **cross-check**, **agree**, **evidence**.
**What to emphasize:** a **fact can be checked; an opinion is a feeling/view.** **Cross-checking** = finding the same fact in a second trustworthy source builds confidence. Pre-empt treating a strong opinion as a fact.
---
### ⏱ 0–4 min · HOOK
> **Say:** "'The Earth has one moon' and 'the Moon is the best thing in space' — which one can you actually *check*? One's a fact, one's an opinion. Let's learn to tell them apart."
**Do:** hold up both statements.
**Ask (retrieve prior knowledge):** "What makes a source reliable?" → *listen for:* "who/why/when; others agree."
### ⏱ 4–11 min · EXPLAIN (I do)
> **Say:** "A **fact** is something you can **check** — 'the Earth has one moon' — true or false, you can find out. An **opinion** is a **feeling or view** — 'the Moon is the best' — it's not right or wrong, it's what someone *thinks*. Watch me sort: 'A spider has eight legs' — can I check it? Yes → fact. 'Spiders are scary' — that's a feeling → opinion. And once I have a fact, I **cross-check** it: I find it in a *second* trustworthy source. If two good sources agree, I'm much more confident."
**Show / Do:** sort 2–3 cards aloud; then show one fact appearing in two vetted sources.
**Emphasize:** "**Fact = checkable. Opinion = a view.** Cross-check facts in a second source."
### ⏱ 11–16 min · EXAMPLE (we do)
> **Say:** "Sort these with me: 'Water boils when it's very hot' and 'Summer is the best season'. Which tray for each, and why?"
**Do:** the child sorts; explain the test ("can I check it?").
**Ask:** "How did you decide which was a fact?" → *listen for:* "I could check/prove it."
### ⏱ 16–20 min · CHECK
**Ask:** "Why check a fact in a second source?"
- ✅ **Expected:** if two trustworthy sources agree, it's much more likely to be true. — probe: *"What if the second source disagrees?"* (Check a third / be cautious.)
- ❌ **If "one source is always enough":** → **fix:** "One page could be wrong. If a *second* good one agrees, you're far surer."
- ❌ **If treats an opinion as a fact:** → **fix:** "Can you *check* 'it's the best'? No — that's a view. Facts can be checked."
### ⏱ 20–26 min · PRACTICE (you do)
**Do:** The child sorts a mixed set of statements into fact/opinion, then takes one fact and cross-checks it against the second vetted source, recording "both agree". Once secure, interleave: rewrite an opinion as a checkable fact.
**Watch for:** sorting strong opinions as facts; not actually cross-checking.
> **If the child is stuck (missed twice):** 1) don't sort it for them; 2) name *why* — confusing a strong view with a fact; 3) apply the test together: "Can we *check* this?"; 4) one hint: "If it's a feeling, it's an opinion."; 5) sort one clear card together; 6) "Let's test just this one — can we check it, yes or no?"
### ⏱ 26–30 min · RECAP
> **Say:** "What's the difference between a fact and an opinion, and why cross-check?" → *listen for:* "fact can be checked, opinion is a view; cross-checking in a second good source makes you surer."
**Process praise:** "You separated facts from opinions *and* proved a fact with a second source — careful, confident thinking."
**Revisit later:** next we do real mini-research, noting where each fact came from.
---
**Differentiation** — support: sort clearly different fact/opinion cards. / stretch: rewrite an opinion as a checkable fact.
**Extension (if time allows):** find a fact that two sources *disagree* on and say what you'd do next.
**Assessment evidence:** child sorts fact vs opinion correctly and cross-checks one fact in a second trustworthy source.

---

## Lesson 14 — Mini-research with sources
**Computing · Year 4 · Unit 4 (Researching with reliable sources)** | **Duration:** 35 min | **Objective:** "By the end, I can research a question using sources I've judged reliable and note where facts came from."
**You will need:** a computer/tablet with **tutor-curated** sources for one question (e.g. "how do volcanoes erupt?"), a research note sheet (columns: Fact | Which source | Checked it twice?).
**Prior knowledge to retrieve:** judging sources (L12); fact vs opinion and cross-checking (L13).
**Key vocabulary:** **research**, **question**, **reliable source**, **note where it came from**, **cross-check**.
**What to emphasize:** **choose reliable sources, record 2–3 facts, and write WHERE each fact came from** (and cross-check when you can). Noting your source is what makes an answer trustworthy. Pre-empt copying the first thing found without checking.
---
### ⏱ 0–5 min · HOOK
> **Say:** "Let's answer a real question — and *prove* our answer with trustworthy sources! Today you're a researcher: not just 'I think', but 'I know, and here's where I found it'."
**Show:** the research question and the curated source list.
**Ask (retrieve prior knowledge):** "Before I trust a source, what do I ask?" → *listen for:* "who/why/when; do others agree."
### ⏱ 5–13 min · EXPLAIN (I do)
> **Say:** "Researching has four moves. **One:** read the question. **Two:** pick a **reliable** source (who/why/when). **Three:** find a fact that answers the question and write it in my own words. **Four** — the researcher's secret — write **where** it came from, so I (and you) can trust it. Even better: **cross-check** it in a second source. Watch me find one fact about volcanoes and note its source."
**Show / Do:** pick one curated source, record one fact + its source on the note sheet.
**Emphasize:** "**Reliable source → fact → note WHERE it came from** (cross-check if you can)."
### ⏱ 13–20 min · EXAMPLE (we do)
> **Say:** "Let's find a second fact together. Which source shall we use, and is it reliable? Now — what's the fact, and where did it come from?"
**Do:** the child chooses a source, states a fact, names the source; the tutor records it.
**Ask:** "Why write down which source it came from?" → *listen for:* "so we can prove it / check it / trust it."
### ⏱ 20–24 min · CHECK
**Ask:** "How do you *know* your answer is trustworthy?"
- ✅ **Expected:** the facts came from reliable sources I checked, and ideally agreed across two. — probe: *"Could you show me where you got this fact?"*
- ❌ **If "because it was first / on the internet":** → **fix:** "First isn't truest. Which reliable source did it come from? Note it."
- ❌ **If no source recorded:** → **fix:** "A fact with no source can't be trusted yet — go back and note where it came from."
### ⏱ 24–31 min · PRACTICE (you do)
**Do:** The child researches the set question using the curated sources, choosing reliable ones, recording 2–3 facts and *where each came from*. Once secure, interleave: cross-check one fact across two sources and tick "checked twice". (Optionally shape facts into a short content piece, linking to multimedia.)
**Watch for:** copying without checking; facts with no recorded source; opinions slipping in.
> **If the child is stuck (missed twice):** 1) don't research it for them; 2) name *why* — no source or unchecked; 3) choose one reliable source together; 4) one hint: "Find one fact that answers the question — then write where it's from."; 5) record one fact + source together; 6) "Let's get one trustworthy fact, with its source, first."
### ⏱ 31–35 min · RECAP
> **Say:** "What makes you sure your facts are true?" → *listen for:* "they came from reliable sources I noted, and I cross-checked one."
**Process praise:** "Every fact you found has a source you can point to — that's exactly what a real researcher does."
**Revisit later:** end-of-unit check; source-detective skills return at the showcase.
---
**Differentiation** — support: pick from two vetted sources and record one fact + source. / stretch: cross-check one fact across two sources and note the agreement.
**Extension (if time allows):** turn the recorded facts into 2–3 sentences for a short fact card or narration.
**Assessment evidence:** child researches a question from reliable sources, records 2–3 facts, and notes where each came from (cross-checking where possible).

> **End-of-unit check (Unit 4):** Child ranks several sources by reliability with reasons, distinguishes fact from opinion, and researches a question using reliable, noted sources.

---

# Unit 5 — Staying safe, kind & balanced (KS2)

> **Tone note (from the online-safety KB):** keep this unit **warm, calm and reassuring** — the internet is brilliant, and a trusted adult is always there to help. Never imply a child is to blame; keep examples gentle and age-appropriate.

---

## Lesson 15 — Privacy & footprints (a first look)
**Computing · Year 4 · Unit 5 (Staying safe, kind & balanced)** | **Duration:** 25 min | **Objective:** "By the end, I can explain why we keep personal information private and that things shared online can spread."
**You will need:** "share / keep private" sorting cards, a simple "it spreads" visual (one card passed → copied → passed on), a calm and friendly manner.
**Prior knowledge to retrieve:** personal information (full name, address, school, phone, password, photos) stays private; passwords are secret.
**Key vocabulary:** **personal information**, **private**, **password**, **share**, **spread/copy**, **trusted adult**.
**What to emphasize:** keep **personal information private**; once something is shared online it can be **copied and shared on**, so **think before you post and check with a trusted adult.** Keep it reassuring — this is about being sensible, never about blame.
---
### ⏱ 0–3 min · HOOK
> **Say:** "Once you post something online — a photo or a message — who might see it? And here's the big question: can you always take it back? Let's find out, and don't worry — this is about being clever and safe, not scary."
**Show:** hold up a "photo" card ready to pass around.
**Ask (retrieve prior knowledge):** "Name a piece of personal information we keep private." → *listen for:* "full name / address / school / phone / password / photos."
### ⏱ 3–9 min · EXPLAIN (I do)
> **Say:** "**Personal information** — your full name, address, school, phone number, password, photos — is **private**, like the key to your front door. Passwords are extra-secret: only ever for you and a parent or carer. Now here's the new idea: once you share something online, someone can **copy** it and **share it on** — and on, and on. Watch: I 'post' this photo, my friend copies it, sends it to two more… now four people have it. That's why we **think before we post** and **check with a trusted adult**."
**Show / Do:** pass and "copy" the card between you (rope in family members if they're nearby) to show one post spreading to several hands.
**Emphasize:** "**Think before you post — once it's out, it can spread and you can't always take it back.**"
### ⏱ 9–13 min · EXAMPLE (we do)
> **Say:** "Let's sort: 'my favourite colour' — share or keep private? 'My home address' — which one? And why?"
**Do:** the child sorts two cards into share / keep-private and gives a reason.
**Ask:** "Why keep your address private?" → *listen for:* "people I don't know offline shouldn't have it; it could spread."
### ⏱ 13–17 min · CHECK
**Ask:** "Why think carefully before posting a photo or message?"
- ✅ **Expected:** once it's out, others can copy/share it and you can't always take it back; keep private things private. — probe: *"Who can help you decide before posting?"* (a trusted adult.)
- ❌ **If "I can just delete it":** → **fix (gently):** "Deleting helps, but if someone already copied it, your delete can't reach *their* copy. So we think *first*."
- ❌ **If "only strangers are a problem":** → **fix:** "Even shared with friends, things can be copied on. Private stays private, and a trusted adult helps."
### ⏱ 17–22 min · PRACTICE (you do)
**Do:** The child sorts a set of cards into "okay to share" vs "keep private", then explains, for one private item, why "I can just delete it" isn't a full safety net. Once secure, interleave: name two trusted adults they'd check with before posting.
**Watch for:** sorting personal info as "okay"; thinking deleting always works.
> **If the child is stuck (missed twice):** 1) keep it warm, no blame; 2) name *why* gently — mixing private with okay-to-share; 3) ask "would you tell this to someone you'd never met?"; 4) one hint: "Private = like your front-door key."; 5) sort one clear card together; 6) "Let's decide just this one — share, or keep safe?"
### ⏱ 22–25 min · RECAP
> **Say:** "Tell me one reason we think before we post." → *listen for:* "it can be copied/shared and you can't always take it back; keep private things private."
**Process praise:** "You spotted what to keep private *and* why posts can spread — that's smart, safe thinking."
**Revisit later:** deepened as 'digital footprint' in Year 5; bring back at the showcase.
---
**Differentiation** — support: sort private vs okay-to-share with picture cards. / stretch: explain why "I can just delete it" isn't a full safety net.
**Extension (if time allows):** draw the "it spreads" idea as a little arrow diagram (one post → many copies).
**Assessment evidence:** child explains why personal information stays private and that shared things can be copied and spread.

---

## Lesson 16 — Kind online & being a good bystander
**Computing · Year 4 · Unit 5 (Staying safe, kind & balanced)** | **Duration:** 25 min | **Objective:** "By the end, I can act kindly online and help when I see unkindness."
**You will need:** gentle scenario cards (teasing/exclusion in a chat or game), role-play prompts, the "would I be happy if this was said to me in front of my family?" test on display.
**Prior knowledge to retrieve:** kindness rules are the same online as offline; tell a trusted adult.
**Key vocabulary:** **kind**, **unkind**, **bystander / upstander**, **include**, **trusted adult**, **not tattling**.
**What to emphasize:** there's a **real person on the other side of every screen.** A kind **bystander**: **don't join in, support the person, tell a trusted adult.** Telling to *help* is not tattling, and it's **never the child's fault.** Keep it warm.
---
### ⏱ 0–3 min · HOOK
> **Say:** "Standing up for someone online can be just as brave as in the playground. There's a real person — with real feelings — on the other side of every screen. Today we learn how to be the one who helps."
**Do:** point to the "would I be happy if this was said to me in front of my family?" test.
**Ask (retrieve prior knowledge):** "Are the kindness rules different online?" → *listen for:* "no — same as in real life."
### ⏱ 3–9 min · EXPLAIN (I do)
> **Say:** "Sometimes online people forget there's a real person there and type things they'd never say to your face — teasing, or leaving someone out of a game. A good test before sending anything: **'Would I be happy if this was said to *me*, out loud, in front of my family?'** If someone *is* being unkind, a kind **bystander** does three things: **don't join in; support the person** (include them, or send something kind); **tell a trusted adult.** Telling to *help* someone isn't tattling — it's the brave, kind thing, and it's never your fault."
**Show / Do:** model the three bystander actions with a scenario card.
**Emphasize:** "**Don't join in. Support the person. Tell a trusted adult.** Telling to help is *not* tattling."
### ⏱ 9–13 min · EXAMPLE (we do)
> **Say:** "Here's a chat where one friend is being teased. Let's decide together: what's the *kind* thing, and what's the *bystander* thing?"
**Do:** the child names a kind action and a bystander action for the scenario.
**Ask:** "Why is telling a trusted adult *not* tattling here?" → *listen for:* "it's to help/keep someone safe, not to get them in trouble for fun."
### ⏱ 13–17 min · CHECK
**Ask:** "You see someone being left out of a game on purpose. What can a kind bystander do?"
- ✅ **Expected:** don't join in; include or support them; tell a trusted adult. — probe: *"Why is that braver than just watching?"*
- ❌ **If "join in / it's not my problem":** → **fix (warmly):** "Imagine it was you being left out — what would you wish someone did? You can be that person."
- ❌ **If "telling is tattling":** → **fix:** "Tattling is to get someone in trouble for fun; telling to *help* keeps someone safe — that's always right."
### ⏱ 17–22 min · PRACTICE (you do)
**Do:** The child works through 2–3 gentle scenarios, choosing the kind action and the bystander action for each. Once secure, interleave: script a kind bystander message they could actually send.
**Watch for:** passive "do nothing"; thinking telling is tattling.
> **If the child is stuck (missed twice):** 1) keep it safe and warm; 2) name *why* gently — unsure what helping looks like; 3) ask "how would the left-out person feel, and what would help?"; 4) one hint: "Don't join in; include them; tell an adult."; 5) act out one kind action together; 6) "Let's just think of one kind thing to say."
### ⏱ 22–25 min · RECAP
> **Say:** "What are the three things a kind bystander does?" → *listen for:* "don't join in; support the person; tell a trusted adult."
**Process praise:** "You chose the brave, kind action *and* knew telling-to-help isn't tattling — that's being a real upstander."
**Revisit later:** revisit alongside balance and the worry plan next lesson.
---
**Differentiation** — support: choose the kind option from two given choices. / stretch: script a full kind bystander response.
**Extension (if time allows):** make a "kind online" poster with the bystander's three steps.
**Assessment evidence:** child identifies kind and bystander actions and explains that telling to help is not tattling.

---

## Lesson 17 — Balance, breaks & the worry plan
**Computing · Year 4 · Unit 5 (Staying safe, kind & balanced)** | **Duration:** 25 min | **Objective:** "By the end, I can plan a balanced day and recite the worry plan with my trusted adults."
**You will need:** a day-planning strip, activity cards (screen + screen-free), worry-plan cards (stop / don't reply / keep it / tell), a warm tone.
**Prior knowledge to retrieve:** balance matters; tell a trusted adult if something worries you.
**Key vocabulary:** **balance**, **break**, **screen-free**, **worry plan**, **trusted adult**, **Childline**.
**What to emphasize:** a brilliant day has **balance** (screens *and* movement, sleep, reading, friends); healthy habits include **breaks** and **screen-free before bed**; apps are *designed* to be hard to stop — **not your fault.** Refresh the **worry plan: stop → don't reply → keep it → tell a trusted adult.**
---
### ⏱ 0–3 min · HOOK
> **Say:** "Screens are great — and so is *everything else*! Running about, reading, building, friends, sleep. What makes a brilliant, balanced day? Let's design one."
**Show:** the empty day-planning strip and the activity cards.
**Ask (retrieve prior knowledge):** "Why is balance a good idea?" → *listen for:* "so we still get sleep, exercise, play and time with people."
### ⏱ 3–9 min · EXPLAIN (I do)
> **Say:** "Screens are a bit like sweets — lovely in the right amount, not so good as *all* you have. A balanced day mixes some screen time with movement, reading, friends and good sleep. Healthy habits: **take breaks** (look away and move), and go **screen-free before bed** so your brain can settle to sleep. And here's a kind truth: apps and games are *designed* to be hard to stop — so if it's hard, that's **not your fault**, we just plan ahead. And our **worry plan** for anything that upsets us online: **stop → don't reply → keep it → tell a trusted adult.**"
**Show / Do:** place a few cards on the strip (bike ride, screen game, reading, screen-free bedtime); lay out the worry-plan cards in order.
**Emphasize:** "**Balance + breaks + screen-free before bed.** Worry plan: **stop, don't reply, keep it, tell.**"
### ⏱ 9–13 min · EXAMPLE (we do)
> **Say:** "Let's add to my day together — where do breaks go, and what screen-free thing do you love? Then say the first step of the worry plan with me."
**Do:** the child places activities and a break; says "stop".
**Ask:** "Why screen-free before bed?" → *listen for:* "the bright light makes it harder to fall asleep / helps you sleep."
### ⏱ 13–17 min · CHECK
**Ask:** "Name one healthy screen habit, and the first step of the worry plan."
- ✅ **Expected:** a healthy habit (take breaks / screen-free before bed) **and** "stop" (then don't reply, keep it, tell). — probe: *"Who would you tell?"*
- ❌ **If "no screens ever":** all-or-nothing → **fix:** "Screens are great too — it's about *balance*, not banning. What else goes in the day?"
- ❌ **If can't recall the worry plan:** → **fix:** "Let's say it together with the cards: stop… don't reply… keep it… tell a trusted adult."
### ⏱ 17–22 min · PRACTICE (you do)
**Do:** The child plans a balanced day on the strip (sorting screen vs screen-free, adding breaks and a screen-free bedtime) and recites the worry plan in order, naming two trusted adults (and that Childline exists). Once secure, interleave: explain why screen-free time before bed helps sleep.
**Watch for:** a day that's all-screen or no-screen; jumbled worry-plan order.
> **If the child is stuck (missed twice):** 1) keep it warm; 2) name *why* gently — all-or-nothing, or order muddled; 3) ask "what do you love that *isn't* a screen?"; 4) one hint: "Some screen, lots of other good things."; 5) place one card and say one worry-plan step together; 6) "Let's add just one screen-free thing you love."
### ⏱ 22–25 min · RECAP
> **Say:** "Say the worry plan, and one healthy screen habit." → *listen for:* "stop, don't reply, keep it, tell a trusted adult; and take breaks / screen-free before bed."
**Process praise:** "You designed a balanced day *and* know exactly what to do if something worries you — that's looking after yourself brilliantly."
**Revisit later:** showcase next lesson; revisit the worry plan often so it's automatic.
---
**Differentiation** — support: sort screen vs screen-free activity cards. / stretch: explain why screen-free time before bed helps sleep.
**Extension (if time allows):** design a "my balanced day" poster with their own breaks and trusted adults.
**Assessment evidence:** child plans a balanced day and recites the worry plan in order, naming trusted adults.

---

## Lesson 18 — Year 4 computing showcase
**Computing · Year 4 · Unit 5 (Staying safe, kind & balanced)** | **Duration:** 35 min | **Objective:** "By the end, I can demonstrate my loops, data, multimedia and online-smart skills."
**You will need:** all year's resources — a computer with Scratch (loop+pen projects), the branching databases, the saved multimedia pieces, source-ranking cards, worry-plan cards; five station signs; "Year 4 computing expert" certificates.
**Prior knowledge to retrieve:** loops & pen, branching databases, multimedia, source evaluation, online safety — the whole year.
**Key vocabulary:** all key terms revisited — **loop**, **forever/repeat**, **branching database**, **storyboard/multimedia**, **reliable source**, **worry plan**.
**What to emphasize:** the child **shows and explains** their best work across the five strands; celebrate **effort and progress.** The headline reasoning to land again: **a loop beats copying because it's shorter, clearer, less error-prone, and shows the pattern.**
---
### ⏱ 0–4 min · HOOK
> **Say:** "Loops, branching databases, your very own film, *and* source-detective skills — what a year! Today we show them off. You'll visit five stations and present one thing you're really proud of."
**Show:** the five station signs.
**Ask (retrieve prior knowledge):** "Which station are you most proud of?" → *listen for:* any genuine choice with a reason.
### ⏱ 4–10 min · EXPLAIN (I do)
> **Say:** "Five stations. **One:** demo a loop+pen drawing and explain the loop. **Two:** use a branching database to identify items. **Three:** play your multimedia piece. **Four:** rank some sources / sort fact vs opinion. **Five:** recite the worry plan and your balanced-day plan. At each, don't just *do* it — *explain* it, like an expert."
**Show / Do:** model one station — run a loop square and explain why the loop beats copying.
**Emphasize:** "**Show it *and* explain it** — that's what an expert does."
### ⏱ 10–16 min · EXAMPLE (we do)
> **Say:** "Let's rehearse the branching-database station together. Identify this item by answering my questions — then explain what each question did."
**Do:** the child uses a database to identify an item and explains the splitting.
**Ask:** "What did each yes/no question do?" → *listen for:* "split the group until one item was left."
### ⏱ 16–20 min · CHECK
**Ask:** "Why is a loop better than copying the same blocks ten times?"
- ✅ **Expected:** shorter, clearer, less error-prone, and shows the repeating pattern. — probe: *"What would you change to repeat it twenty times?"* (the loop number.)
- ❌ **If "it just looks neater":** partial → **fix:** "Yes — *and* fewer mistakes, and you change one number to change them all. Show me."
- ❌ **If "copying is the same":** → **fix:** "If you needed twenty, would you rather drag twenty or change one number? Why?"
### ⏱ 20–31 min · PRACTICE (you do)
**Do:** The child rotates through the stations, demonstrating each skill to the tutor (invite family to watch), then **presents one proud achievement** to the tutor and family, explaining it. Once secure, interleave: teach one strand back to the tutor or a family member as if they were the learner.
**Watch for:** doing without explaining; rushing past the safety station.
> **If the child is stuck (missed twice):** 1) keep it celebratory; 2) name *why* — unsure how to explain; 3) ask "what does this do, in your own words?"; 4) one hint: a sentence starter — "My loop draws a square because…"; 5) rehearse one station together; 6) "Pick the station you love most and tell me one thing about it."
### ⏱ 31–35 min · RECAP
> **Say:** "Tell me one thing you can do now in computing that you couldn't at the start of the year." → *listen for:* a specific skill (loops, branching database, a film, judging sources, the worry plan).
**Process praise:** "You showed *and* explained your skills across the whole year — you've earned 'Year 4 computing expert'."
**Revisit later:** present certificates; carry loops, data and source-skills into Year 5.
---
**Differentiation** — support: present at two stations with the tutor alongside. / stretch: teach a strand to a family member as if they were the learner.
**Extension (if time allows):** write a short "what I'm proudest of and why" reflection for their portfolio.
**Assessment evidence:** child demonstrates and explains a skill at each strand and presents one proud achievement.

> **End-of-unit check (Unit 5):** Child explains why personal information stays private and that posts can spread, acts as a kind bystander, plans a balanced day, and recites the worry plan and trusted adults.

---

# End-of-year mastery checks

A Year 4 child finishing this curriculum should be able to:

1. **Loops.** Replace copied blocks with a "repeat" loop, and choose between "repeat N" and "forever" for the job. *(L2, L3)*
2. **Loops + pen.** Use a loop with the pen to draw a regular shape, predicting it first. *(L4)*
3. **Debugging loops.** Find and fix a bug, reasoning about whether it's the loop count or a block inside the loop. *(L5)*
4. **Branching databases.** Build a branching database that identifies each item by a unique yes/no path, and fix a question that fails. *(L7, L8)*
5. **Multimedia.** Storyboard, record clear audio, and assemble a short multimedia piece for a purpose and audience. *(L9–L11)*
6. **Evaluating sources.** Use who/why/when to rank sources by reliability and distinguish fact from opinion. *(L12, L13)*
7. **Researching.** Research a question using reliable sources and note where the facts came from (cross-checking when possible). *(L14)*
8. **Staying safe.** Explain privacy and that posts can spread, act as a kind bystander, plan a balanced day, and recite the worry plan with trusted adults. *(L15–L17)*

---

## Closing note for the tutor

Year 4 is the year the big idea of **repetition** clicks — the moment the child collapses twenty copied blocks into one tidy loop is genuinely thrilling, so let them feel it. Across the year, keep the gradual-release arc: a short Explain, then weight the time on the child *doing* — predicting, building, testing, fixing. Always have the child **predict before they run** (loops + pen, debugging) and **explain how they know** (source evaluation, fact vs opinion). When something breaks, treat it as the fun part: bugs and collisions are normal, and the debugging routine — *predict → run → spot → fix one → run again* — is the same skill whether it's a loop, a branching database, or a recording that needs a re-take.

Hold the **online-safety unit warm and reassuring** at all times: the internet is brilliant, telling a trusted adult is always right, and nothing here is ever the child's fault. End every lesson on an earned success with **specific process praise** ("you kept going and changed just one thing", not "you're so clever"), and hand the key ideas to spaced review so loops, data, source-skills and the worry plan stay fresh into Year 5.

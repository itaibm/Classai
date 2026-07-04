# Computing — Year 6 (ages 10–11, KS2) — Lesson Outlines

> Part of **the best international primary school** (see [`../../../SCHOOL-CHARTER.md`](../../../SCHOOL-CHARTER.md)).
> Year 6 scope drawn from `knowledge-base/subjects/computing-life-skills/computing-ks1-ks2.md`
> and `online-safety.md`. Follows the lesson-outline format and 8 design principles in
> [`../README.md`](../README.md).

## Year overview

Year 6 is the **capstone** of primary computing — children bring together every big idea and
build real, complete programs. In **computer science**, they **combine sequence, loops,
selection and variables** into a substantial project (a multi-level game or interactive quiz),
plan and decompose it, and **debug, evaluate and improve** it like a real programmer. They
also take two exciting steps toward what comes next: **physical computing** — programming
something in the real world (a micro:bit or a Crumble-style controller, with an unplugged
fallback) — and a first taste of **text-based programming**, seeing that a typed line of code
is just an instruction, like a block. In **information technology**, they run a full **data
project** end-to-end (collect → spreadsheet → calculate → chart → conclude) and **evaluate and
share** their digital work, giving and acting on feedback. The **digital-literacy /
online-safety** thread consolidates everything for the move to secondary: managing a
**digital footprint and reputation**, evaluating information and **fake news** critically,
healthy balance, and a confident, well-rehearsed worry plan.

How it builds on Year 5: Year 5 introduced selection and variables; Year 6 **combines all
four programming concepts** in one real project and adds **physical** and **text-based**
programming as a bridge to secondary. Year 5 used spreadsheets; Year 6 runs a **complete data
investigation**. Year 5 introduced the digital footprint; Year 6 deepens it to **reputation
and critical evaluation**, readying pupils for an increasingly independent online life.

The year runs to **20 lessons** across **6 units**, each lesson 25–40 minutes.

---

## Unit 1 — Combine it all: a complete program

**Essential question:** How do I plan, build, debug and improve a program that uses sequence, loops, selection and variables together?

**Key vocabulary:** decompose, sequence, loop, selection, variable, condition, plan, debug, evaluate, improve, algorithm.

### Lesson 1 — Plan and decompose a project
- **Duration:** 35 min
- **Objective:** "By the end, I can decompose a program idea into parts and plan the algorithm."
- **Hook:** "We're building a real game this term. Real developers plan first — let's break the dream into buildable parts."
- **Key activity:** Recap the four big ideas (sequence, loops, selection, variables). Children choose a project (a game or interactive quiz), **decompose** it into parts (start, controls, scoring, win/lose), and write the algorithm/plan, noting where each concept will be used.
- **Check for understanding:** "Which concept will you use to keep score, and which to decide if the player wins?" → A variable for score; selection ("if score = …") to decide the win.
- **Differentiation:** support: choose from two project templates and plan with prompts. / stretch: plan a project with two levels or two win conditions.
- **Materials:** planning sheet, project idea cards.
- **Joy:** designing their own game on paper, dreaming up the rules.

### Lesson 2 — Build the core
- **Duration:** 40 min
- **Objective:** "By the end, I can build the core of my project using events, a loop and a variable."
- **Hook:** "Time to bring the plan to life — controls, movement and a working score!"
- **Key activity:** Children build the core: green flag setup (reset score to 0), event-driven controls (keys/clicks), a forever loop for ongoing action, and a score variable that changes on the right event. Test the core works before adding more.
- **Check for understanding:** "Why test the core before adding features?" → To make sure the basics work, so any new bug must be in the part you just added — easier to find.
- **Differentiation:** support: extend a starter project's core. / stretch: add a second controllable element.
- **Materials:** computers with Scratch, the plan from Lesson 1.
- **Joy:** the first moment their own game is actually playable.

### Lesson 3 — Add decisions (selection)
- **Duration:** 35 min
- **Objective:** "By the end, I can add selection so my program reacts and decides win/lose."
- **Hook:** "A game needs stakes — let's add winning, losing, and reactions!"
- **Key activity:** Children add "if … then …" / "if … then … else …" inside the loop: react to collisions/conditions, and a win/lose decision (e.g. "if score = 10 then say 'You win!'", "if lives = 0 then stop"). Combines selection + variables + loop.
- **Check for understanding:** "How does your program decide the player has won?" → An "if [condition about the score/state] then …" runs the win action only when the condition is true.
- **Differentiation:** support: add one given if/then. / stretch: add both a win and a lose condition.
- **Materials:** computers with Scratch.
- **Joy:** the first time their game can actually be won (or lost!).

### Lesson 4 — Debug, evaluate, improve
- **Duration:** 35 min
- **Objective:** "By the end, I can debug my project and improve it against my plan."
- **Hook:** "Does it do what you planned? Where's the bug — and what would make it even better?"
- **Key activity:** Children test against their plan, debug systematically (predict→run→spot→fix, isolating which part holds the bug), then **evaluate**: does it meet the goal? They make one or two improvements (difficulty, feedback, clarity) and note why.
- **Check for understanding:** "How do you find which part of a big program has the bug?" → Test parts separately / check the part you changed last; narrow down to the section that misbehaves.
- **Differentiation:** support: debug one flagged issue. / stretch: improve based on a partner's playtest feedback.
- **Materials:** computers with Scratch, the plan, a debugging checklist.
- **Joy:** polishing their game until it plays just right.

**End-of-unit check:** Child plans/decomposes a project, builds it using sequence, loop, selection and a variable, and debugs/evaluates/improves it against the plan.

---

## Unit 2 — Physical computing

**Essential question:** How can my code control something in the real world?

**Key vocabulary:** physical computing, micro:bit / controller, input, output, sensor, LED, program, download/flash, real world.

> If no hardware is available, use the **unplugged fallback** noted in each lesson (and the
> micro:bit online simulator at makecode.microbit.org).

### Lesson 5 — Inputs and outputs in the real world
- **Duration:** 30 min
- **Objective:** "By the end, I can identify inputs and outputs on a physical device."
- **Hook:** "Your code has only lived on screen. What if it could light up, buzz or react to a shake?"
- **Key activity:** Introduce **physical computing** = programming a device that interacts with the real world. Identify **inputs** (button, shake, light/temperature sensor) and **outputs** (LED display, sound). On a micro:bit (or simulator), explore the buttons and LED grid. Unplugged fallback: sort real-world devices' inputs vs outputs.
- **Check for understanding:** "Give one input and one output on the device." → e.g. input: button A / shake; output: the LED display / a sound.
- **Differentiation:** support: match inputs/outputs to a picture. / stretch: explain how a sensor is a special kind of input.
- **Materials:** micro:bit + computer (or simulator at makecode.microbit.org); input/output sorting cards as fallback.
- **Joy:** holding a tiny computer they can actually program.

### Lesson 6 — Program the device
- **Duration:** 40 min
- **Objective:** "By the end, I can write a program that responds to an input with an output."
- **Hook:** "Let's make it show a heart when you press a button — your code, in your hand!"
- **Key activity:** In MakeCode (blocks), children build "on button A pressed → show icon/scroll text", and "on shake → show a number" (a dice). They download/flash to the device (or run in the simulator), combining event + output, and add selection or a variable if confident (e.g. a step counter). Unplugged fallback: simulator only.
- **Check for understanding:** "What does your program do when you press the button?" → Shows the chosen output (icon/number/text) — an input triggers an output.
- **Differentiation:** support: build "on A → show heart". / stretch: add a variable counter or an if/then condition.
- **Materials:** micro:bit + USB + computer (or simulator), MakeCode.
- **Joy:** their code lighting up a real device they can wave around.

**End-of-unit check:** Child identifies inputs/outputs and writes a program where an input triggers an output on a physical device (or simulator).

---

## Unit 3 — A peek at text-based code

**Essential question:** How is typed code like the blocks I already know?

**Key vocabulary:** text-based code, command/statement, syntax, line, error, Python/JavaScript, translate.

### Lesson 7 — Blocks to text
- **Duration:** 35 min
- **Objective:** "By the end, I can match a familiar block to a line of text code."
- **Hook:** "Grown-up coders type their instructions. But a typed line is just a block in words — let's prove it!"
- **Key activity:** Show side-by-side: a Scratch "say 'Hello'" block ↔ a text line (e.g. `print("Hello")`), a loop block ↔ `for`/`repeat`, an if block ↔ `if`. Children match blocks to lines. In a beginner text tool (or block→text view), they run a tiny program (print a message; a short loop). Emphasise: same ideas, typed.
- **Check for understanding:** "What does a line like print('Hi') do?" → It outputs/displays "Hi" — the same as a "say/print Hi" block.
- **Differentiation:** support: match 3 blocks to 3 lines. / stretch: write a 2-line text program (print, then a short loop).
- **Materials:** computers with a beginner text editor (e.g. Python via a kid-friendly online tool) or Scratch's text view; block↔text matching cards.
- **Joy:** typing real code and seeing it actually run.

### Lesson 8 — Syntax and errors
- **Duration:** 30 min
- **Objective:** "By the end, I can explain that text code needs exact syntax and fix a simple typo."
- **Hook:** "One missing bracket and the computer gets confused — text code is super precise!"
- **Key activity:** Introduce **syntax** = the exact rules for writing a line (spelling, brackets, quotes). Show a tiny program with a typo (missing quote/bracket); children read the error, find and fix it — debugging applied to text. Reinforce: precision matters even more than with blocks.
- **Check for understanding:** "Why might a typed program not run?" → A syntax error — a typo, missing bracket or quote; the computer needs it written exactly right.
- **Differentiation:** support: fix one clearly marked typo. / stretch: fix a program with two small syntax errors.
- **Materials:** computers with a beginner text editor, buggy one-line examples.
- **Joy:** cracking the "secret code" rules and making a broken program run.

**End-of-unit check:** Child matches blocks to text-code lines, runs a tiny text program, and fixes a simple syntax error.

---

## Unit 4 — A complete data investigation

**Essential question:** How do I answer a real question with data from start to finish?

**Key vocabulary:** question, data, collect, spreadsheet, formula (SUM/average), chart, interpret, conclusion, evidence.

### Lesson 9 — Pose the question & collect data
- **Duration:** 30 min
- **Objective:** "By the end, I can frame a question and plan how to collect data to answer it."
- **Hook:** "Data can settle any classroom debate — let's pick a question and prove the answer!"
- **Key activity:** Children choose a real question (e.g. "which sport is most popular in our class?", "do we read more in winter?"). They plan **what data** to collect and **how** (survey/measurement), then collect it. Discuss fair, accurate collection.
- **Check for understanding:** "Why plan how you collect data before starting?" → So the data actually answers the question and is fair/accurate.
- **Differentiation:** support: use a ready survey. / stretch: plan a question needing two pieces of data.
- **Materials:** survey/data-collection sheets, clipboards.
- **Joy:** running their own survey to settle a real debate.

### Lesson 10 — Spreadsheet: enter and calculate
- **Duration:** 35 min
- **Objective:** "By the end, I can enter my data and use formulas to calculate."
- **Hook:** "Let the computer crunch the numbers — totals and averages in a click!"
- **Key activity:** Children enter their data into a spreadsheet with headings, then use **SUM** (and, for stretch, **AVERAGE**/MAX) to calculate. They change a value to see totals update automatically. Reinforces Year 5 spreadsheet skills at greater depth.
- **Check for understanding:** "Why use a formula instead of typing the total?" → It recalculates automatically if the data changes, and avoids mistakes.
- **Differentiation:** support: SUM a ready range. / stretch: also compute an average and compare two groups.
- **Materials:** computers with a spreadsheet app.
- **Joy:** the formula instantly totalling dozens of numbers.

### Lesson 11 — Chart, interpret, conclude
- **Duration:** 35 min
- **Objective:** "By the end, I can chart my data and write a conclusion backed by evidence."
- **Hook:** "What does the data actually tell us? Time to chart it and reveal the answer!"
- **Key activity:** Children make an appropriate **chart**, read it (most/least/total/compare), and write a **conclusion** that answers their question *with evidence* ("X is most popular: 12 votes vs 4"). Discuss honest interpretation (not over-claiming).
- **Check for understanding:** "What makes a good conclusion?" → It answers the question using evidence from the data (specific numbers from the chart), without exaggerating.
- **Differentiation:** support: complete a sentence-stem conclusion. / stretch: note a limitation of their data.
- **Materials:** computers with a spreadsheet app, conclusion sheet.
- **Joy:** revealing the data-backed answer to the class.

**End-of-unit check:** Child runs a data investigation end-to-end: poses a question, collects and enters data, calculates with a formula, charts it, and writes an evidence-based conclusion.

---

## Unit 5 — Evaluate & share

**Essential question:** How do I evaluate my digital work and improve it from feedback?

**Key vocabulary:** evaluate, criteria, feedback, audience, purpose, improve, share, present, reflect.

### Lesson 12 — Evaluate against criteria
- **Duration:** 30 min
- **Objective:** "By the end, I can evaluate a piece of digital work against clear criteria."
- **Hook:** "How do we know if our work is *good*? We measure it against what good looks like."
- **Key activity:** Agree **criteria** for a strong project/piece (meets its purpose, suits its audience, works/has no obvious bugs, clear and well-made). Children evaluate their own (or an example) project against the criteria, scoring and noting strengths and one fix.
- **Check for understanding:** "Why use criteria to evaluate?" → They give a fair, clear measure of whether the work meets its purpose and is well made.
- **Differentiation:** support: tick criteria with prompts. / stretch: weight the most important criterion and justify.
- **Materials:** criteria checklist, work to evaluate.
- **Joy:** judging work like a real reviewer.

### Lesson 13 — Give and act on feedback
- **Duration:** 35 min
- **Objective:** "By the end, I can give kind, useful feedback and improve my work using feedback I receive."
- **Hook:** "The best creators love feedback — it's how good becomes great."
- **Key activity:** Teach kind, specific feedback ("two stars and a wish" / "what works + one improvement"). Pairs play/review each other's projects and give feedback against the criteria. Each child then makes one improvement based on feedback received and notes the change.
- **Check for understanding:** "What makes feedback useful rather than just nice?" → It's specific and helps the person improve (names what works and one clear thing to change).
- **Differentiation:** support: use sentence stems for feedback. / stretch: prioritise which feedback to act on first and say why.
- **Materials:** feedback slips/stems, projects to review.
- **Joy:** seeing your project get better thanks to a friend's idea.

### Lesson 14 — Share with an audience
- **Duration:** 35 min
- **Objective:** "By the end, I can present my finished work clearly to an audience."
- **Hook:** "A project isn't finished until you share it — let's present like real makers."
- **Key activity:** Children prepare a short share (demo + explain purpose, how it works, what they'd improve next). They present to a small group/the class. Discuss sharing safely (what's okay to share publicly vs keep private) — links to footprint.
- **Check for understanding:** "What three things make a clear project share?" → Show it working, explain its purpose/how it works, and say what you'd improve next.
- **Differentiation:** support: present with a script/partner. / stretch: field a question from the audience.
- **Materials:** finished projects, presentation space.
- **Joy:** the applause after demoing their own creation.

**End-of-unit check:** Child evaluates work against criteria, gives and acts on specific feedback, and presents finished work clearly to an audience.

---

## Unit 6 — Ready for secondary: footprint, reputation & critical online life

**Essential question:** How do I take charge of my online life — footprint, reputation, and what I believe — as I move on?

**Key vocabulary:** digital footprint, reputation, privacy settings, fake news, misinformation, critical, verify, trusted adult, balance.

> **Tone note (from the online-safety KB):** keep this unit **warm, calm and empowering** —
> the internet is brilliant and pupils are becoming capable, critical, kind users. A trusted
> adult is always there to help; never imply a child is to blame.

### Lesson 15 — Footprint & reputation
- **Duration:** 30 min
- **Objective:** "By the end, I can explain how my digital footprint shapes my reputation."
- **Hook:** "What might someone learn about you just from what you've shared online — and is it the *you* you want them to see?"
- **Key activity:** Build on Year 5's footprint to **reputation** = the impression your footprint gives others (friends, schools, future you). Children review what builds a positive footprint (kind, honest, private about personal info) vs a risky one, and plan habits for a footprint to be proud of. Note privacy settings and that a trusted adult helps.
- **Check for understanding:** "How can your digital footprint affect your reputation?" → What you share builds the impression others get of you; a kind, careful footprint protects your reputation.
- **Differentiation:** support: sort builds-good vs risky actions. / stretch: explain why "future you" cares about today's posts.
- **Materials:** footprint/reputation scenario cards.
- **Joy:** designing the "online me I'm proud of".

### Lesson 16 — Spotting fake news & misinformation
- **Duration:** 35 min
- **Objective:** "By the end, I can critically evaluate a claim and decide if it's reliable."
- **Hook:** "A shocking headline is racing round the internet. True, or fake? Let's investigate like fact-checkers."
- **Key activity:** Recap who/why/when + cross-check. Introduce **misinformation/fake news** and that surprising claims need *more* checking. Children investigate a few claims/headlines (some real, some fake/satire/advert), verify across sources, and decide reliable or not, justifying with evidence.
- **Check for understanding:** "A shocking claim has no author and isn't on any trusted site. Reliable?" → No — unverified and surprising; check who made it and whether trustworthy sources agree before believing/sharing.
- **Differentiation:** support: judge 2 clear claims. / stretch: explain why people *share* fake news and how to slow down.
- **Materials:** computers with curated claim examples, fact-check checklist.
- **Joy:** unmasking a viral "fact" as fake with real evidence.

### Lesson 17 — Kind, balanced & safe for secondary
- **Duration:** 30 min
- **Objective:** "By the end, I can set healthy habits and apply the worry plan confidently for an independent online life."
- **Hook:** "Bigger freedom online is coming — let's go in strong, kind and safe."
- **Key activity:** Discuss the more independent online life ahead (more messaging, social apps with age limits). Refresh kindness/bystander, **balance** & healthy habits, age-appropriate choices, and the **worry plan** (stop → don't reply → keep it → tell) + **Childline**. Children set two personal habits and name trusted adults. Reinforce: never your fault, always tell.
- **Check for understanding:** "Name a healthy habit and the worry-plan steps." → e.g. take breaks / screen-free before bed; stop → don't reply → keep it → tell a trusted adult.
- **Differentiation:** support: order the worry-plan cards. / stretch: explain why age limits on apps exist and how to handle pressure to break them.
- **Materials:** habit-pledge sheet, worry-plan cards.
- **Joy:** writing a personal "online charter" for secondary.

### Lesson 18 — Capstone build (catch-up & polish)
- **Duration:** 40 min
- **Objective:** "By the end, I can finish and polish my main project to a standard I'm proud of."
- **Hook:** "Final polish time — make your project the best it can be!"
- **Key activity:** Dedicated time to complete, debug and improve the main programming or data project using feedback and criteria. Children finalise and prepare to showcase.
- **Check for understanding:** "Against your criteria, what's the strongest part of your project and what did you improve?" → A specific strength and a specific improvement, referenced to the criteria.
- **Differentiation:** support: focus on one improvement. / stretch: add a stretch feature and re-test.
- **Materials:** computers, criteria checklist, feedback notes.
- **Joy:** the pride of a finished, polished creation.

### Lesson 19 — Computing showcase
- **Duration:** 40 min
- **Objective:** "By the end, I can present my capstone work and demonstrate my full range of skills."
- **Hook:** "Six years of computing, all in one showcase — let's celebrate everything you can do!"
- **Key activity:** Children present their capstone project (game/data investigation/physical-computing piece), explaining the concepts used. Mini-stations revisit the range: physical computing, a text-code snippet, source/fake-news evaluation, the worry plan. Audience explores and gives feedback.
- **Check for understanding:** "Name the four programming concepts you used this year." → Sequence, repetition (loops), selection (if), and variables.
- **Differentiation:** support: present with a partner/script. / stretch: explain how two concepts worked together in your project.
- **Materials:** all projects + resources — computers, micro:bit/simulator, source/claim cards, certificates.
- **Joy:** a "primary computing graduate" certificate and a proud public demo.

### Lesson 20 — Reflect & look ahead
- **Duration:** 25 min
- **Objective:** "By the end, I can reflect on my computing journey and set a goal for secondary."
- **Hook:** "From your first algorithm in Year 1 to a full program now — look how far you've come!"
- **Key activity:** Children reflect on their growth across the primary years (algorithms → robots → Scratch → loops → selection/variables → real projects, plus data, online smarts and safety). They write one thing they're proudest of and one computing goal for secondary (e.g. learn more Python, make a bigger game).
- **Check for understanding:** "What's one thing computers still can't do without us?" → e.g. decide what's true, what's kind, or what's worth making — they follow our instructions; we provide the thinking and judgement.
- **Differentiation:** support: complete reflection sentence stems. / stretch: explain how an online-safety skill will matter even more at secondary.
- **Materials:** reflection sheet, "computing journey" timeline.
- **Joy:** seeing their whole computing journey on a timeline and dreaming about what's next.

**End-of-unit check:** Child explains how a digital footprint shapes reputation, critically evaluates a claim for reliability, and confidently states healthy habits and the worry plan for independent online life.

---

## End-of-year mastery checks

A Year 6 child finishing this curriculum should be able to:

1. **Complete programs.** Plan/decompose, build and improve a substantial program that combines sequence, loops, selection and variables.
2. **Debugging & evaluating.** Debug a larger program systematically and evaluate it against its plan/criteria.
3. **Physical computing.** Identify inputs/outputs and write a program where an input triggers an output on a device (or simulator).
4. **Text-based code.** Match blocks to text-code lines, run a tiny text program, and fix a simple syntax error.
5. **Data investigation.** Run a full investigation: pose a question, collect and enter data, calculate with a formula, chart it, and write an evidence-based conclusion.
6. **Evaluate & share.** Evaluate work against criteria, give and act on specific feedback, and present finished work clearly.
7. **Footprint & critical thinking.** Explain how a digital footprint shapes reputation, and critically evaluate a claim for reliability (spotting fake news/misinformation).
8. **Safe & ready.** State healthy habits, age-appropriate choices and the worry plan with trusted adults for a more independent online life, knowing it's never their fault.

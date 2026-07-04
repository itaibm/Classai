# Computing — Year 5 (ages 9–10, KS2) — Lesson Outlines

> Part of **the best international primary school** (see [`../../../SCHOOL-CHARTER.md`](../../../SCHOOL-CHARTER.md)).
> Year 5 scope drawn from `knowledge-base/subjects/computing-life-skills/computing-ks1-ks2.md`
> and `online-safety.md`. Follows the lesson-outline format and 8 design principles in
> [`../README.md`](../README.md).

## Year overview

Year 5 is where programs start to **think and remember**. In **computer science**, children
meet **selection** ("if … then …" and "if … then … else …") so programs make decisions, and
**variables** — named boxes that store a value that can change — so programs remember a score,
a count or a name. They combine these with last year's loops to build simple interactive
projects (a quiz, a catch game). In **information technology**, the data strand reaches
**spreadsheets**: rows, columns, cells, entering data, using **SUM** and auto-charts, so the
computer calculates and visualises for them. The **digital-literacy** strand turns to the
**web and searching well**: choosing good keywords, understanding how a search engine ranks
results, and applying critical evaluation to real searches. The **online-safety** thread
matures to the idea of a **digital footprint** (what we leave online and who can see it),
alongside continued privacy, kindness, balance and the worry plan.

How it builds on Year 4: Year 4 mastered repetition; Year 5 adds the two remaining big
programming ideas — **selection** and **variables** — and combines all three. Year 4 used
branching databases and bar charts; Year 5 moves to **spreadsheets** that calculate. Year 4
judged sources; Year 5 applies that to **searching the web** with good keywords and an
understanding of ranking. Online safety steps up from "posts can spread" to a fuller idea of
a **digital footprint**.

The year runs to **19 lessons** across **5 units**, each lesson 25–40 minutes.

---

## Unit 1 — Selection: programs that decide

**Essential question:** How can my program make a decision and do different things in different situations?

**Key vocabulary:** selection, condition, "if … then …", "if … then … else …", true/false, sensing, decide, branch.

### Lesson 1 — Conditions: yes/no questions
- **Duration:** 30 min
- **Objective:** "By the end, I can give everyday 'if … then …' rules and identify the condition."
- **Hook:** "'If it's raining, take an umbrella.' Computers make decisions the same way — let's learn how."
- **Key activity:** Introduce **selection** = the program *chooses* what to do based on a **condition** (a true/false question). Unplugged: children sort situations into "if [condition] then [action]" and identify the condition (the yes/no part). Build a class set of "if … then …" rules.
- **Check for understanding:** "In 'if it's dark then turn on the light', what is the condition?" → "It's dark" — the true/false question the action depends on.
- **Differentiation:** support: match conditions to actions. / stretch: write an "if … then … else …" rule.
- **Materials:** condition/action cards, sorting mat.
- **Joy:** inventing funny "if … then …" rules for the classroom robot.

### Lesson 2 — "if … then …" in Scratch
- **Duration:** 35 min
- **Objective:** "By the end, I can use an 'if … then …' block with a sensing condition."
- **Hook:** "Can you make your sprite say 'Ouch!' the moment — and only the moment — it touches the wall?"
- **Key activity:** In Scratch, introduce the **"if ( ) then"** block and sensing conditions ("touching colour/edge?", "key pressed?"). Children build "if [touching edge] then [say 'Ouch', bounce]" inside a **forever** loop so it keeps checking. Demonstrate making the condition false → inside blocks skip.
- **Check for understanding:** "What does 'if … then …' do?" → Runs the inside blocks only if the condition is true; otherwise it skips them.
- **Differentiation:** support: drop a condition into a ready "if". / stretch: use two conditions in one project.
- **Materials:** computers with Scratch.
- **Joy:** a sprite that reacts the instant it bumps something.

### Lesson 3 — Why "if" needs a loop
- **Duration:** 30 min
- **Objective:** "By the end, I can explain why an 'if' usually lives inside a forever loop."
- **Hook:** "My 'if touching wall' only checked once and missed it — what went wrong?"
- **Key activity:** Show an "if" that runs once and misses the moment the condition becomes true; wrap it in **forever** so it keeps checking. Children fix a project where the decision is checked only once. Reinforces selection + repetition working together.
- **Check for understanding:** "Why put the 'if' inside a forever loop?" → So the program keeps checking the condition over and over and catches the moment it becomes true.
- **Differentiation:** support: add a ready forever around the if. / stretch: explain a case where a one-time if is fine.
- **Materials:** computers with Scratch, a "checks once" buggy project.
- **Joy:** the fix that finally makes the sprite *always* react.

### Lesson 4 — "if … then … else …"
- **Duration:** 35 min
- **Objective:** "By the end, I can use 'if … then … else …' to choose between two actions."
- **Hook:** "What if the program should do ONE thing when true and a DIFFERENT thing when false?"
- **Key activity:** Introduce **"if … then … else …"**: do one thing if true, another if false (e.g. "if score > 10 then say 'You win!' else say 'Keep going!'"). Children build a project that gives two different responses depending on a condition.
- **Check for understanding:** "In 'if answer = 10 then say correct else say try again', when does it say 'try again'?" → Whenever the answer is *not* 10 (the condition is false).
- **Differentiation:** support: complete a part-built if/else. / stretch: nest a second decision inside the else.
- **Materials:** computers with Scratch.
- **Joy:** a program that talks back differently depending on what you do.

**End-of-unit check:** Child uses "if … then …" with a sensing condition inside a loop, explains why, and uses "if … then … else …" to choose between two actions.

---

## Unit 2 — Variables: programs that remember

**Essential question:** How does a program remember and change a value like a score?

**Key vocabulary:** variable, value, "set ( ) to ( )", "change ( ) by ( )", score, store, name, reset.

### Lesson 5 — What is a variable?
- **Duration:** 30 min
- **Objective:** "By the end, I can explain a variable as a named box that stores a value that can change."
- **Hook:** "How does a game remember your score while you play? It uses a clever labelled box."
- **Key activity:** Introduce the **variable** = a named box (label = name, contents = value that can change). Unplugged: a labelled box ("score") with number cards inside; "set to 0" empties and puts 0; "change by 1" adds one. Children act out a score going 0→1→2→3.
- **Check for understanding:** "What is a variable?" → A named box that stores a value which can change while the program runs.
- **Differentiation:** support: read the value after one "change by 1". / stretch: explain "set to" vs "change by".
- **Materials:** a labelled box, number cards.
- **Joy:** physically "running the program" with a real box and cards.

### Lesson 6 — Make and change a variable in Scratch
- **Duration:** 35 min
- **Objective:** "By the end, I can create a variable, set it to 0, and change it by 1."
- **Hook:** "Let's make a score that climbs live on screen every time you catch something!"
- **Key activity:** In Scratch, make a "score" variable. Use **"set score to 0"** at the green flag and **"change score by 1"** on an event (e.g. clicking/catching a sprite). Show the variable on the stage so it updates live. Discuss "set to" (replace) vs "change by" (add).
- **Check for understanding:** "Score is 3; you run 'change score by 1' twice. What's the score?" → 5.
- **Differentiation:** support: add a ready "change by 1" to a catch event. / stretch: add a second variable (e.g. lives) that goes down.
- **Materials:** computers with Scratch.
- **Joy:** watching the score tick up on screen in real time.

### Lesson 7 — Reset and debug variables
- **Duration:** 30 min
- **Objective:** "By the end, I can fix a variable bug, including a missing reset."
- **Hook:** "My game starts at last game's score, not zero! What did I forget?"
- **Key activity:** Show the classic bug — no "set score to 0" at the start, so old values linger. Children add the reset and re-run. Also fix a "set to" used where "change by" was meant. Apply predict→run→spot→fix.
- **Check for understanding:** "Why 'set score to 0' at the start?" → So every game begins fresh at zero, not with the last game's score.
- **Differentiation:** support: add the missing reset. / stretch: explain the difference between "set to 1" and "change by 1" with an example.
- **Materials:** computers with Scratch, a "no reset" buggy project.
- **Joy:** the relief of a game that finally starts fresh each time.

### Lesson 8 — Combine: a small catch game
- **Duration:** 40 min
- **Objective:** "By the end, I can build a small game using a variable, an event and a loop."
- **Hook:** "Let's build a real catch game with a live score people will want to play!"
- **Key activity:** Children build a catch game: set score to 0 on green flag; move a target; "change score by 1" when caught (event + condition). Combines variable + event + loop. Test on a partner; debug as needed.
- **Check for understanding:** "Which three big ideas did your game use?" → A variable (score), an event/condition (catching), and a loop (to keep the game running).
- **Differentiation:** support: extend a starter game. / stretch: add a timer/lives variable.
- **Materials:** computers with Scratch, planning sheet.
- **Joy:** a partner racking up points in a game they built.

**End-of-unit check:** Child creates a variable, sets and changes it correctly, fixes a missing-reset bug, and uses a variable in a small interactive project.

---

## Unit 3 — Spreadsheets & data

**Essential question:** How can a spreadsheet calculate and chart my data for me?

**Key vocabulary:** spreadsheet, cell, row, column, data entry, formula, SUM, total, chart, sort.

### Lesson 9 — Inside a spreadsheet: cells, rows, columns
- **Duration:** 30 min
- **Objective:** "By the end, I can enter data into the right cells of a spreadsheet."
- **Hook:** "A spreadsheet is a giant grid where the computer can do the maths for you. Let's explore it!"
- **Key activity:** Tour a spreadsheet — **cells**, **rows**, **columns**, cell references (A1, B2). Children enter a small data set (e.g. goals per player, or favourite-snack counts) into labelled columns, with headings.
- **Check for understanding:** "What is a cell, and how do we name one?" → A single box in the grid; named by its column letter and row number (e.g. B3).
- **Differentiation:** support: type into highlighted cells. / stretch: add a heading row and a new column.
- **Materials:** computers with a spreadsheet app (Google Sheets / Excel / free tool).
- **Joy:** filling a real grid like the ones grown-ups use at work.

### Lesson 10 — The computer does the maths: SUM
- **Duration:** 35 min
- **Objective:** "By the end, I can use SUM to total numbers automatically."
- **Hook:** "Don't add it up yourself — make the spreadsheet do it instantly, even if the numbers change!"
- **Key activity:** Introduce a **formula**: =SUM(range) to total a column/row. Children total their data with SUM, then *change a number* and watch the total update automatically — the key idea that a spreadsheet calculates, unlike a notebook. (Optionally try a simple average/max.)
- **Check for understanding:** "Why is a spreadsheet better than a notebook for adding numbers?" → It calculates for you and updates the total automatically when the numbers change.
- **Differentiation:** support: use SUM on a small ready range. / stretch: total two columns and compare them.
- **Materials:** computers with a spreadsheet app.
- **Joy:** the "magic" of a total that fixes itself when you edit a number.

### Lesson 11 — Charts from spreadsheets
- **Duration:** 35 min
- **Objective:** "By the end, I can make a chart from spreadsheet data and read it."
- **Hook:** "One click and the spreadsheet draws your bar chart — let's make data beautiful!"
- **Key activity:** Children select their data and insert a **chart** (bar/column), add a title and labels, then answer most/least/total/compare questions from it. Discuss choosing the right chart for the data. Links to maths – statistics.
- **Check for understanding:** "Why turn spreadsheet data into a chart?" → To see and compare it at a glance — most, least, totals — instead of reading raw numbers.
- **Differentiation:** support: insert a chart from selected data. / stretch: choose and justify the chart type.
- **Materials:** computers with a spreadsheet app.
- **Joy:** clicking "chart" and watching the computer draw it instantly.

### Lesson 12 — Spreadsheet mini-project
- **Duration:** 40 min
- **Objective:** "By the end, I can collect data, enter it, total it and chart it to answer a question."
- **Hook:** "Let's answer a real question with data — start to finish, like a data analyst!"
- **Key activity:** Children pick/are given a question (e.g. "which lunch is most popular?"), collect or use data, enter it, total with SUM, make a chart, and write the answer with evidence from their chart.
- **Check for understanding:** "How does your chart answer the question?" → It shows which is most/least and the totals, so the answer is clear from the data.
- **Differentiation:** support: use a part-built sheet. / stretch: add a second question their data answers.
- **Materials:** computers with a spreadsheet app, data source.
- **Joy:** presenting a real data-backed answer like a pro.

**End-of-unit check:** Child enters data into a spreadsheet, totals it with SUM, makes and reads a chart, and answers a question with evidence.

---

## Unit 4 — Searching the web well

**Essential question:** How do search engines work, and how do I search and judge results well?

**Key vocabulary:** search engine, keywords, results, ranking, advert, sponsored, reliable, refine, evaluate.

### Lesson 13 — How a search engine works
- **Duration:** 30 min
- **Objective:** "By the end, I can explain a search engine as a tool that matches keywords to pages."
- **Hook:** "There are billions of web pages. How does a search engine find the right one in less than a second?"
- **Key activity:** Explain a **search engine** as "a librarian for the internet" that matches your words to pages and lists the ones it thinks are most useful near the top (**ranking**). Connect to Year 3's servers/internet. Note that some top results are **adverts/sponsored**, not the best answers.
- **Check for understanding:** "What does a search engine do?" → Finds web pages that match the words you type and ranks the most useful near the top.
- **Differentiation:** support: define "search engine" in your own words. / stretch: explain why the top result isn't always the best.
- **Materials:** displayed example search results (with adverts marked).
- **Joy:** spotting the sneaky "sponsored/advert" labels at the top of results.

### Lesson 14 — Choosing good keywords
- **Duration:** 35 min
- **Objective:** "By the end, I can choose good keywords to get better search results."
- **Hook:** "'Can you please tell me which dinosaur was the most very tall one' vs 'tallest dinosaur' — which wins?"
- **Key activity:** Teach **keywords** = the *important* words only. Children rewrite chatty/over-long searches into tight keyword searches, predict which gets better results, then test (on a curated/safe search). Practise refining: add a word to narrow a too-broad search.
- **Check for understanding:** "To find how tall a giraffe grows, what keywords would you type?" → Short, e.g. "how tall is a giraffe" — important words only.
- **Differentiation:** support: pick the better of two searches. / stretch: refine a search that returns too many results.
- **Materials:** computers with a safe/curated search, keyword practice cards.
- **Joy:** turning a rambling question into a sharp search and getting a better answer.

### Lesson 15 — Evaluate search results
- **Duration:** 35 min
- **Objective:** "By the end, I can pick the most reliable result and explain why."
- **Hook:** "The top result, an advert, a museum page and a random blog all appear. Which do you trust?"
- **Key activity:** Given a topic and several "results" (museum/encyclopaedia, advert, blog, news), children pick the most reliable using who/why/when and the fact that ranking ≠ truth. They search a real question and choose a reliable result, noting why. Combines searching with Year 4's evaluation.
- **Check for understanding:** "Is the first result always the best?" → No — top results can be adverts or just popular; check who made the page and whether others agree.
- **Differentiation:** support: choose between two clearly different sources. / stretch: explain how an advert can be mistaken for a top answer.
- **Materials:** computers with a safe search, results-ranking sheet.
- **Joy:** outsmarting the search engine by choosing a better answer than the top hit.

**End-of-unit check:** Child explains how a search engine ranks results, chooses good keywords, and selects/justifies the most reliable result.

---

## Unit 5 — Your digital footprint (staying safe, KS2)

**Essential question:** What do I leave behind online, and how do I keep it safe and kind?

**Key vocabulary:** digital footprint, profile, post, share, permanent, privacy settings, reputation, trusted adult.

> **Tone note (from the online-safety KB):** keep this unit **warm, calm and reassuring** —
> the internet is brilliant, and a trusted adult is always there to help. Never imply a child
> is to blame; keep examples gentle and age-appropriate.

### Lesson 16 — What is a digital footprint?
- **Duration:** 30 min
- **Objective:** "By the end, I can explain a digital footprint and that online actions can last."
- **Hook:** "Footprints in sand wash away — but the ones we leave online can stick around. What are we leaving?"
- **Key activity:** Introduce **digital footprint** = the trail of things we do/share online (posts, photos, messages, comments). Discuss that things can be copied, shared and last a long time — even if we delete our copy. Children map a "footprint" of what a made-up child has shared and discuss who might see it.
- **Check for understanding:** "What is a digital footprint?" → The trail of things you do and share online, which can last and be seen by others.
- **Differentiation:** support: list 3 things that add to a footprint. / stretch: explain why "I deleted it" doesn't always remove it.
- **Materials:** "footprint trail" sheet, example posts.
- **Joy:** being a "footprint detective" tracing what someone left online.

### Lesson 17 — Think before you post
- **Duration:** 30 min
- **Objective:** "By the end, I can decide what's wise to post and what to keep private."
- **Hook:** "Before you post, ask: would I be happy if my teacher, gran and future self all saw this?"
- **Key activity:** Recap personal information stays private (passwords secret). Children apply a **think-before-you-post** test to scenarios (a photo, a comment, personal details) and decide post / keep private / check with a trusted adult. Mention privacy settings exist and a trusted adult helps set them.
- **Check for understanding:** "What's a good test before posting something?" → Would I be happy if a trusted adult (and my future self) saw it? If not, don't post; keep private things private.
- **Differentiation:** support: sort post / keep-private cards. / stretch: explain why a kind, private footprint helps "future you".
- **Materials:** scenario cards, sorting mat.
- **Joy:** designing a "footprint I'd be proud of".

### Lesson 18 — Kind, balanced & getting help (refresh)
- **Duration:** 25 min
- **Objective:** "By the end, I can apply kindness, balance and the worry plan to KS2 online life."
- **Hook:** "Bigger online life means our safety smarts grow too — let's sharpen them."
- **Key activity:** Refresh being kind / a good bystander, balance & healthy habits, and the **worry plan** (stop → don't reply → keep it → tell a trusted adult), plus **Childline**. Discuss the "keep it secret from your family" warning sign and that it's never your fault.
- **Check for understanding:** "A stranger online asks you to keep a secret from your parents. What do you do?" → Don't reply, keep it, tell a trusted adult — it's a warning sign and never your fault.
- **Differentiation:** support: order the worry-plan cards. / stretch: explain who counts as a trusted adult and why two+ is wise.
- **Materials:** worry-plan cards, balance-planning strip.
- **Joy:** confidently coaching the plan to a partner.

### Lesson 19 — Year 5 computing showcase
- **Duration:** 35 min
- **Objective:** "By the end, I can demonstrate selection, variables, spreadsheets, searching and footprint smarts."
- **Hook:** "Decisions, memory, real spreadsheets, smart searching, and a footprint to be proud of — show it all!"
- **Key activity:** Stations/showcase: (1) demo a project using if/then and a variable, (2) show a spreadsheet with SUM and a chart, (3) demonstrate good keywords and choosing a reliable result, (4) map a digital footprint and apply think-before-you-post, (5) recite the worry plan. Present one proud achievement.
- **Check for understanding:** "Name the three big programming ideas you can now use." → Sequence/events, repetition (loops), selection (if), and variables (memory) — any of these core ideas.
- **Differentiation:** support: present at two stations with a partner. / stretch: be a station helper.
- **Materials:** all year's resources — computers with Scratch + spreadsheet, search demos, footprint sheets, certificates.
- **Joy:** a Year 5 "computing expert" certificate and demoing a self-made game.

**End-of-unit check:** Child explains a digital footprint and that posts can last, applies a think-before-you-post test, and recites the worry plan with trusted adults.

---

## End-of-year mastery checks

A Year 5 child finishing this curriculum should be able to:

1. **Selection.** Use "if … then …" with a sensing condition inside a loop, and "if … then … else …" to choose between two actions.
2. **Variables.** Create a variable, set it to 0 and change it, and explain "set to" vs "change by".
3. **Combining ideas.** Build a small interactive project (e.g. a catch game) using a variable, an event/condition and a loop, and debug it (including a missing reset).
4. **Spreadsheets.** Enter data into cells, total it with SUM, and make and read a chart to answer a question.
5. **How search works.** Explain that a search engine matches keywords and ranks results, and that ranking isn't truth.
6. **Searching well.** Choose good keywords and refine a search, then pick and justify the most reliable result.
7. **Digital footprint.** Explain what a digital footprint is, that online actions can last, and apply a think-before-you-post test.
8. **Staying safe.** Keep personal information private, act kindly, and recite the worry plan with trusted adults, knowing it's never their fault.

# Computing & Life Skills — Extension Topics (deeper / wider)

Additional topics that go beyond the core `computing-ks1-ks2.md`, `online-safety.md` and `life-skills.md` files: deeper coding projects, an introduction to text programming, richer data work, modern digital-literacy (digital footprint, evaluating media, AI awareness), and broader life skills (enterprise, study skills, environment, civics, nutrition). Each topic uses the standard topic block so the Classai lesson designer can read its four analysis fields and ready-made checks. Pitched at upper KS2 (ages 9–11) unless noted.

---

## 1. Scratch project — build a simple game

**Year / Key Stage:** Upper KS2 (ages 9–11) · **Est. minutes:** 30 · **Subject strand:** Computing – programming

**Prerequisites:** Scratch first programs (sequence/events), loops/repetition, variables.

### Key concepts
- A game is many small scripts running at once (sprites reacting to events).
- A score is a *variable* that changes when something happens.
- "Game over" is a *condition* (selection) you test for.

### Prior knowledge assumed
- Can start scripts with the green flag and "when key pressed"; has used `repeat`/`forever` and made a variable.

### Teach it (the explanation)
A game is just sequence + repetition + events + selection + variables put together. Pick a tiny goal: a cat that catches falling apples. Break it down (decomposition): a cat that moves left/right with arrow keys; apples that fall from the top; when the cat touches an apple, score + 1 and the apple jumps back to the top. Each of those is a short script.

**Worked example.** Catch-the-apple, step by step:
1. Cat sprite: `when right arrow pressed → change x by 10`; left arrow → `change x by -10`.
2. Apple sprite: `when green flag → forever → if not touching cat, change y by -5; if y < bottom, go to top at random x`.
3. Scoring: make variable `score`; in the apple's forever loop add `if touching Cat → change score by 1 → go to top`.
4. Test, then debug what misbehaves.

### Hooks (real-world angles)
- Their favourite game is built from these same pieces — they can make their own.
- Add their pet/character as the sprite.
- "Can you make it harder as the score rises?" (links to a later topic).

### Misconceptions (wrong answer → why → fix)
- **Wrong:** putting movement code without a `forever`/event so it runs once and stops. **Why:** thinks a script runs continuously by default. **Fix:** show that code runs top-to-bottom once unless wrapped in a loop or triggered by an event; add `forever`.
- **Wrong:** score jumps up by lots on one touch. **Why:** the `change score by 1` sits in a fast `forever` loop and fires many times while still touching. **Fix:** after scoring, move the apple away (or add a short wait) so the touch ends.

### Checks (ready-to-use)
- **Q:** Which block makes the apple keep falling rather than dropping one step? **A:** A loop — `forever` (or `repeat`) around `change y by -5`.
- **Q:** Where does the score live? **A:** In a variable called `score` that we change by 1 on a catch.

### Activity / practice
Plan a 3-sprite game on paper (decompose into scripts) before building. In Classai, present an `ordering` block: put the build steps in a sensible order. (Real building happens in Scratch at scratch.mit.edu.)

### Resources
- **Scratch (scratch.mit.edu)** — "Make it Fly" / "Pong Starter" starter projects.
- **Code.org** — Course D/E game-making lessons.

---

## 2. Loops vs events vs conditionals — the logic of programs

**Year / Key Stage:** Lower–Upper KS2 (ages 8–11) · **Est. minutes:** 20 · **Subject strand:** Computing – computational thinking

**Prerequisites:** what an algorithm is; basic Scratch blocks.

### Key concepts
- **Sequence** = do steps in order. **Repetition (loop)** = do again. **Selection (if/conditional)** = choose based on a test. **Event** = start when something happens.
- Most programs are just these four ideas combined.

### Prior knowledge assumed
- Has given step-by-step instructions and used at least one loop.

### Teach it (the explanation)
Programmers reuse four building blocks. Sequence is a recipe. A loop avoids copying the same line ten times ("repeat 10"). A conditional makes a decision ("*if* it's raining, take a coat"). An event is a trigger ("*when* the doorbell rings"). Spotting which one you need is computational thinking.

**Worked example.** "Flash a light 3 times when a button is pressed" = an **event** (button) → a **loop** (repeat 3) → a **sequence** inside (on, wait, off, wait).

### Hooks
- Daily life is full of conditionals ("if hungry, then eat") and loops ("brush every tooth").
- Traffic lights = a loop of a sequence.

### Misconceptions (wrong answer → why → fix)
- **Wrong:** using many copies of a block instead of a loop. **Why:** doesn't yet see repetition as a tool. **Fix:** show 5 identical blocks, replace with `repeat 5` — same result, less code.
- **Wrong:** thinks `if` keeps checking forever on its own. **Why:** confuses selection with a loop. **Fix:** `if` checks *once* when reached; to keep checking, put it inside a `forever`.

### Checks
- **Q:** "Keep asking until the answer is right" — which two ideas? **A:** A loop + a conditional.
- **Q:** True or false: an event makes code start. **A:** True.

### Activity / practice
`categorize` block: sort everyday instructions into Sequence / Loop / Conditional / Event.

### Resources
- **BBC Bitesize KS2 — "Selection and repetition in algorithms".**
- **Barefoot Computing** — concept posters (free with sign-up).

---

## 3. First steps in text coding (Python turtle — concept level)

**Year / Key Stage:** Upper KS2 (ages 10–11) · **Est. minutes:** 30 · **Subject strand:** Computing – programming

**Prerequisites:** confident in Scratch (sequence, loops); reading/typing fluency.

### Key concepts
- Text languages do the same things as blocks, but you *type* exact commands.
- Spelling and punctuation matter to the computer (syntax).
- A loop in text: `for i in range(4):`.

### Prior knowledge assumed
- Understands sequence and repetition from block coding.

### Teach it (the explanation)
Blocks have training wheels — you can't misspell them. Text code is the same logic, typed. In Python "turtle", `forward(100)` moves a pen 100 steps; `right(90)` turns. To draw a square you could write four pairs of lines — or use a loop. The computer is fussy: a missing colon or bracket stops it. That's normal; you read the error and fix it (debugging).

**Worked example.** Draw a square:
```
import turtle
for i in range(4):
    turtle.forward(100)
    turtle.right(90)
```
The `for ... range(4)` repeats the indented two lines four times → a square.

### Hooks
- "Real programmers type code like this" — a grown-up skill.
- Change `4` and `90` to draw a triangle or hexagon (links to angles in maths).

### Misconceptions (wrong answer → why → fix)
- **Wrong:** forgetting the colon or the indentation. **Why:** block coding never required punctuation. **Fix:** treat the colon + indent as "everything indented belongs to the loop"; show the error message is a clue, not a telling-off.
- **Wrong:** expecting `right(90)` to turn it to face right (east). **Why:** thinks the angle is a compass direction. **Fix:** it turns *90° from where it's facing* — relative, not absolute.

### Checks
- **Q:** To draw a triangle, what number replaces 4, and what angle? **A:** `range(3)` and turn 120° (exterior angle).
- **Q:** Why won't the code run if you delete the colon? **A:** It's a syntax error — Python needs `:` to start the loop's block.

### Activity / practice
`numberEntry`: "A regular pentagon has 5 sides — what turn angle does the turtle need each time?" (Answer: 72.) Links computing to geometry. (Real coding via a free Python turtle in Trinket or IDLE.)

### Resources
- **Trinket.io** — browser Python turtle, no install.
- **Code.org** — "Intro to Python" / App Lab (upper primary).

---

## 4. Spreadsheets & data handling (deeper)

**Year / Key Stage:** Upper KS2 (ages 9–11) · **Est. minutes:** 25 · **Subject strand:** Computing – data & information

**Prerequisites:** pictograms/bar charts; basic addition.

### Key concepts
- A spreadsheet stores data in cells (rows and columns).
- A formula calculates for you and updates automatically (e.g. `=SUM(B2:B6)`).
- Charts turn numbers into pictures to spot patterns.

### Prior knowledge assumed
- Can read a simple table and a bar chart.

### Teach it (the explanation)
A spreadsheet is a grid. Each box is a *cell* with an address (column letter + row number, like B3). You can type numbers, words, or a *formula* that starts with `=`. The magic: change a number and every formula using it recalculates instantly. To total pocket money for the week, `=SUM(B2:B6)` adds the range. Then make a bar chart to *see* which day you spent most.

**Worked example.** Days in B1:B5, amounts spent in C1:C5 (£2, £0, £3, £1, £4). In C6 type `=SUM(C1:C5)` → £10. Change Monday's £2 to £5 → C6 updates to £13 by itself.

### Hooks
- Track their own pocket money or screen time and chart it.
- "Scientists and shops run on spreadsheets."

### Misconceptions (wrong answer → why → fix)
- **Wrong:** typing the answer (10) into the total cell instead of a formula. **Why:** treats the cell like paper. **Fix:** show that a typed number won't update; a `=SUM` formula does — that's the point of a spreadsheet.
- **Wrong:** forgetting the `=` so the formula shows as text. **Why:** doesn't know `=` signals "calculate". **Fix:** every formula starts with `=`.

### Checks
- **Q:** What does `=SUM(A1:A4)` do? **A:** Adds the numbers in cells A1, A2, A3, A4.
- **Q:** Why use a formula instead of typing the total? **A:** It updates automatically when the data changes.

### Activity / practice
`fillBlank`: "To add up cells B2 to B8 you type ___(B2:B8)." (Answer: =SUM.) Then a `table` display modelling a small dataset to read.

### Resources
- **BBC Bitesize KS2 — "Spreadsheets".**
- **Google Sheets / free spreadsheet** — a real shared sheet to try.

---

## 5. How the internet really works (networks & data)

**Year / Key Stage:** Upper KS2 (ages 9–11) · **Est. minutes:** 20 · **Subject strand:** Computing – networks

**Prerequisites:** "using technology safely"; basic idea of a website.

### Key concepts
- The internet is a network of millions of connected computers.
- Information is broken into small *packets* that travel and are reassembled.
- A *server* stores websites; your device is a *client* that requests them.

### Prior knowledge assumed
- Has used a website/app and knows it comes "from the internet".

### Teach it (the explanation)
The internet is roads between computers; the web (websites) is the traffic. When you open a page, your device (the *client*) sends a request to a *server* — a powerful computer that stores the site — and the server sends the page back. Big things are split into *packets* (like sending a jigsaw in many envelopes) that travel separately and are rebuilt at your end. A web address (URL) is like a postal address that helps find the right server.

**Worked example.** You tap a video: device → request to the server → server sends the video in thousands of packets → your device reassembles and plays them, buffering a little ahead.

### Hooks
- Compare to posting a long letter as many numbered envelopes.
- "Where does a website actually live?" (a server in a building somewhere).

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "the internet and the web are the same thing." **Why:** uses them interchangeably. **Fix:** internet = the network (the roads); web = pages/sites that travel on it (the traffic). Email also uses the internet but isn't the web.
- **Wrong:** thinks websites are stored "in my phone" or "in the air." **Why:** no model of servers. **Fix:** sites live on servers; your device fetches a copy each time.

### Checks
- **Q:** What's the difference between the internet and the web? **A:** Internet = the network of connected computers; web = the websites that travel over it.
- **Q:** Why split data into packets? **A:** Smaller pieces travel more easily and can take different routes, then rebuild.

### Activity / practice
`ordering`: sequence "you tap a link → request goes to server → server sends packets → device reassembles → page appears."

### Resources
- **BBC Bitesize KS2 — "What is the internet?" / "Connecting computers".**
- **Code.org** — "How the Internet Works" video series (topic level).

---

## 6. Your digital footprint

**Year / Key Stage:** Upper KS2 (ages 9–11) · **Est. minutes:** 20 · **Subject strand:** Digital literacy / online safety

**Prerequisites:** core online-safety topics (personal information, kind online behaviour).

### Key concepts
- Things you post or do online can stay around — a "footprint".
- A footprint can be positive (kind, helpful) as well as risky.
- Think before you post: would I be happy for my family and future self to see this?

### Prior knowledge assumed
- Knows not to share personal information and to tell a trusted adult about worries.

### Teach it (the explanation)
Every photo, comment or like leaves a small mark online — your digital footprint. Footprints can be hard to fully erase even after you "delete", because others may have copied or shared them. That's not a reason to be scared — it's a reason to be thoughtful and kind. A great footprint shows the helpful, creative person you are. The simple test before posting: the **grandma-and-future-you test** — would both be happy to see it?

**Worked example.** A child wants to post a funny photo teasing a friend. Footprint test: would the friend be happy? Would future-you? → better to send a kind message instead.

### Hooks
- "Footprints in sand wash away — online ones often don't."
- Famous people sometimes regret old posts.

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "If I delete it, it's gone forever." **Why:** assumes delete = erased everywhere. **Fix:** others may have screenshotted or shared it; deleting your copy doesn't remove theirs. Think *before* posting.
- **Wrong:** "A digital footprint is always a bad thing." **Why:** only heard warnings. **Fix:** a footprint can be positive — kind comments, good work you're proud of.

### Checks
- **Q:** What is a digital footprint? **A:** The trail of things you do/post online that can stay around.
- **Q:** What's a good question to ask before posting? **A:** Would I be happy for my family and future self to see this? Is it kind?

### Activity / practice
`categorize`: sort example posts into "great footprint" / "think again". Reinforce: if unsure, ask a trusted adult.

### Resources
- **ThinkUKnow / CEOP Education** — digital footprint lessons.
- **Internet Matters** — age-appropriate guidance for parents & children.

---

## 7. Spotting fake & evaluating what you read online

**Year / Key Stage:** Upper KS2 (ages 9–11) · **Est. minutes:** 25 · **Subject strand:** Digital literacy / critical thinking

**Prerequisites:** reliable vs unreliable information (online-safety core).

### Key concepts
- Not everything online is true; anyone can publish anything.
- Check: who made it, why, and does another trustworthy source agree?
- Strong feelings or "too good/bad to be true" are warning signs.

### Prior knowledge assumed
- Knows some sources are more reliable than others.

### Teach it (the explanation)
The internet has no automatic truth-check. To judge a claim, be a detective: **Who** made this (an expert, a shop, a prankster)? **Why** (to inform, to sell, to fool)? **Where else** — does a trusted source (a known news site, an encyclopaedia, a book) say the same? Images and videos can be edited or AI-made, so a picture isn't proof. If something makes you very angry or excited, slow down — that's often a sign to check.

**Worked example.** A post says "School holidays cancelled forever!" with no source and a shocking headline. Detective check: no author, designed to shock, no real news site reports it → likely fake.

### Hooks
- Play "real or fake?" with a few headlines.
- AI can now make convincing fake images — even more reason to check.

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "It's online / it has a photo, so it's true." **Why:** trusts the medium. **Fix:** anyone can post; photos can be edited or AI-generated. Check the source.
- **Wrong:** "Lots of people shared it, so it's true." **Why:** confuses popularity with truth. **Fix:** false things spread fast *because* they're exciting; popularity isn't evidence.

### Checks
- **Q:** Name two questions to ask about an online claim. **A:** Who made it and why? Does another reliable source agree?
- **Q:** Is a shocking photo proof something happened? **A:** No — images can be edited or AI-made; check the source.

### Activity / practice
`multipleChoice`: given a suspicious headline, choose the best next step (check a trusted source / share it quickly / believe it). Discuss why.

### Resources
- **BBC Bitesize — "Fake news" / "Be Internet Legends" (Google).**
- **National Literacy Trust / Newswise** — fact-checking for primary.

---

## 8. AI awareness for kids (what AI is and how to use it wisely)

**Year / Key Stage:** Upper KS2 (ages 10–11) · **Est. minutes:** 20 · **Subject strand:** Digital literacy

**Prerequisites:** evaluating online information; idea of a program following rules.

### Key concepts
- AI is software that learns patterns from lots of examples to make guesses.
- It can be helpful (ideas, practice) but can be confidently wrong ("makes things up").
- A person should always check AI's answers and stay the thinker.

### Prior knowledge assumed
- Knows computers follow instructions; has met an assistant or chatbot.

### Teach it (the explanation)
AI tools (like a tutor chatbot or image maker) learn from huge amounts of examples and then predict a likely answer. They're like a very well-read but sometimes-overconfident friend: often useful, occasionally wrong while *sounding* sure (this is called "hallucinating"). So AI is a helper, not a boss: use it to get unstuck, to practise, to brainstorm — then check important facts elsewhere and do your own thinking. Never share private information with it, and remember a computer doesn't truly "understand" the way you do.

**Worked example.** You ask an AI for a fact for homework. Wise use: take its idea, then check it in a book or trusted site before writing it down — because it might be wrong.

### Hooks
- "You're literally talking to one right now" — Classai is an AI tutor.
- AI can make art and music — but it learned from people.

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "AI is always right because it's a computer." **Why:** equates computer with calculator-style certainty. **Fix:** AI *predicts* likely answers and can be confidently wrong; always check important things.
- **Wrong:** "AI thinks and feels like a person." **Why:** it talks fluently. **Fix:** it matches patterns from data; it has no understanding or feelings — you are the real thinker.

### Checks
- **Q:** Why should you check an AI's answer? **A:** It can be confidently wrong (make things up); verify important facts.
- **Q:** Should you give an AI your home address or password? **A:** No — keep personal information private.

### Activity / practice
`trueFalse`: "An AI chatbot always tells the truth." (False — explain why.) Reinforce: AI is a helper; you stay in charge of the thinking.

### Resources
- **Experience AI (Raspberry Pi Foundation & Google DeepMind)** — free primary AI lessons.
- **Common Sense Education** — "AI literacy" for kids.

---

## 9. Money skills 2 — earning, value & simple enterprise

**Year / Key Stage:** Upper KS2 (ages 9–11) · **Est. minutes:** 25 · **Subject strand:** Life skills – financial literacy

**Prerequisites:** what money is; needs vs wants; saving & budgeting basics.

### Key concepts
- Money is usually earned by providing something people value (work, goods, services).
- Price vs value: the cheapest isn't always the best buy.
- A simple enterprise: cost + effort → product → price → profit (or loss).

### Prior knowledge assumed
- Can add/subtract money; knows saving vs spending.

### Teach it (the explanation)
Money comes from creating value — doing a job, making something, offering a service. When buying, compare *value*, not just price: a 50p pen that breaks costs more than a £1 pen that lasts. A tiny business shows how it works: if lemons + cups cost £3 and you sell 10 cups of lemonade at 50p, you take £5; profit = £5 − £3 = £2 (minus your time). Pricing too high → no sales; too low → no profit.

**Worked example.** Bracelets cost 80p of beads each and take 10 minutes. Sell at £2 → profit £1.20 each before time. Sell 5 → £6 revenue, £4 cost, £2 profit... wait: 5 × 80p = £4 cost, 5 × £2 = £10 revenue, profit £6. Model the arithmetic carefully with the child.

### Hooks
- A bake sale, car wash or craft stall they could actually run.
- "Why does the same drink cost more at the cinema?"

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "Profit is the same as how much I sold for." **Why:** ignores costs. **Fix:** profit = money in − money out; you must cover what it cost to make.
- **Wrong:** "Cheaper is always better." **Why:** price-only thinking. **Fix:** weigh value, quality and how long it lasts, not just the number.

### Checks
- **Q:** You spend £3 and sell for £7. What's the profit? **A:** £4.
- **Q:** Give one reason the cheapest option might not be the best buy. **A:** It may break/run out quickly, costing more overall.

### Activity / practice
`numberEntry`: simple profit sums (revenue − cost). Then plan a mini-enterprise on paper: costs, price, expected profit.

### Resources
- **BBC Bitesize KS2 — "Money" / "Enterprise".**
- **Young Money / MyBnk** — primary financial-education resources.

---

## 10. Study skills & managing your time

**Year / Key Stage:** Upper KS2 (ages 9–11) · **Est. minutes:** 20 · **Subject strand:** Life skills – learning to learn

**Prerequisites:** none.

### Key concepts
- *How* you study matters: testing yourself beats re-reading.
- Big tasks get easier when broken into small steps with breaks.
- A simple plan and a tidy space help you focus.

### Prior knowledge assumed
- Has homework or learning tasks to manage.

### Teach it (the explanation)
Smart studying isn't about more hours — it's about better methods. Two big wins: (1) **test yourself** (cover and recall, use flashcards) instead of just re-reading, which feels easy but doesn't stick; (2) **chunk** big jobs — "write a story" becomes plan → write beginning → break → middle → end → check. Use a short plan ("first… then…"), a tidy space, and focused bursts with breaks (e.g. work 15–20 min, move 5). This connects to metacognition: plan, do, then check how it went.

**Worked example.** A 20-minute spelling task: 2 min look-cover-write-check first words, recall test, 2-min break, repeat — far better than reading the list ten times.

### Hooks
- "Beat the clock" focus bursts.
- Athletes and musicians plan practice — so can learners.

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "Re-reading is the best way to revise." **Why:** it feels fluent and easy. **Fix:** easy ≠ effective; self-testing (retrieval) is harder but makes memory stick (see [[retrieval-and-memory]]).
- **Wrong:** "I have to do the whole thing in one go." **Why:** sees the task as one lump. **Fix:** chunk it into steps with breaks; progress feels and goes better.

### Checks
- **Q:** Which is better revision: reading your notes again, or covering them and testing yourself? **A:** Testing yourself (retrieval practice).
- **Q:** What's one way to make a big task feel easier? **A:** Break it into small steps (with short breaks).

### Activity / practice
`ordering`: sequence a chunked plan for a bigger task. Then have the child set one tiny goal and a focus-burst length.

### Resources
- **BBC Bitesize — "Study support" / revision skills.**
- See also [[metacognition-and-self-regulation]] and [[retrieval-and-memory]] in this knowledge base.

---

## 11. Looking after our world (environment & responsibility)

**Year / Key Stage:** KS2 (ages 7–11) · **Est. minutes:** 20 · **Subject strand:** Life skills – citizenship / sustainability

**Prerequisites:** none (links to science: habitats, materials).

### Key concepts
- Our actions affect the environment — for better or worse.
- Reduce, reuse, recycle — in that order of impact.
- Small habits add up, and we share responsibility for our community and planet.

### Prior knowledge assumed
- Basic idea of living things and habitats (from science).

### Teach it (the explanation)
We share one planet, so how we use it matters. The most powerful idea is **reduce** (use/buy less), then **reuse** (use again), then **recycle** (turn into something new) — reduce comes first because the greenest thing is what you never had to make. Saving energy and water, walking instead of short drives, and caring for local green spaces are small habits that add up, especially when lots of people do them. This is part of being a thoughtful citizen — looking after the place and people around you.

**Worked example.** A juice carton: reduce (drink tap water from a refillable bottle), reuse (rinse and craft with it), recycle (put it in the right bin) — ranked by impact.

### Hooks
- Audit the family's recycling for a week.
- Link to a local litter-pick or growing something.

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "Recycling is the most important thing I can do." **Why:** recycling gets the most attention. **Fix:** reducing and reusing come first — they avoid making the thing at all; recycling still uses energy.
- **Wrong:** "One person can't make a difference." **Why:** the problem feels huge. **Fix:** small habits multiply across many people; communities change through individual actions.

### Checks
- **Q:** Put in order of impact: recycle, reduce, reuse. **A:** Reduce, reuse, recycle.
- **Q:** Give one small habit that helps the environment. **A:** e.g. turning off lights, refillable bottle, walking short trips, recycling correctly.

### Activity / practice
`ordering` the 3 Rs by impact, then `categorize` items into reduce/reuse/recycle. Set one family eco-habit to try.

### Resources
- **BBC Bitesize KS2 — "Recycling" / "Climate change" (child level).**
- **WWF / Eco-Schools** — primary sustainability activities.

---

## 12. Being part of a community (basic civics)

**Year / Key Stage:** KS2 (ages 7–11) · **Est. minutes:** 20 · **Subject strand:** Life skills – citizenship

**Prerequisites:** none.

### Key concepts
- Communities have rules/laws so people can live together fairly and safely.
- Decisions can be made by voting; fairness and listening matter.
- Everyone has a role: rights *and* responsibilities.

### Prior knowledge assumed
- Experience of rules at home/learning.

### Teach it (the explanation)
A community — a family, a street, a town, a country — needs shared rules so people are safe and treated fairly. Some rules are *laws* everyone must follow. Big shared decisions are often made by **voting**: everyone has a say, and the option with most support wins (democracy), while still caring about people who didn't win the vote. Being a good citizen means using your **rights** (to be safe, to be heard) *and* your **responsibilities** (to be kind, honest, and helpful). Disagreements are handled by listening and compromise, not force.

**Worked example.** The class can't agree on a game. Instead of arguing, they list options and vote; the winner is played today, the runner-up next time — fair, and everyone had a say.

### Hooks
- Hold a family vote on something real (film, dinner).
- "Why do we have traffic rules?" — fairness and safety.

### Misconceptions (wrong answer → why → fix)
- **Wrong:** "Rules just stop you having fun." **Why:** sees only restriction. **Fix:** good rules protect everyone's fun and safety; imagine a game with no rules — it falls apart.
- **Wrong:** "If I win the vote, the others don't matter." **Why:** majority = everything. **Fix:** democracy also means respecting and protecting the minority; listen to those who disagreed.

### Checks
- **Q:** Why do communities have rules/laws? **A:** So people can live together safely and fairly.
- **Q:** What does it mean to have a responsibility as well as a right? **A:** You can expect fair treatment, and you must also treat others fairly/kindly.

### Activity / practice
Run a real vote with the child (`multipleChoice` to cast it), then discuss how to treat those who voted differently.

### Resources
- **BBC Bitesize KS2 — "Government and democracy" / "Rights and responsibilities".**
- **Parliament Education (UK)** — free primary citizenship resources.

---

> These extension topics complement the core computing/online-safety/life-skills files. PSHE and safety topics keep the consistent message: stay kind, keep personal information private, and tell a trusted adult about anything that worries you — it is never your fault.

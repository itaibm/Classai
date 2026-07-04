# Computing — KS1 & KS2 (UK National Curriculum)

Eleven topics covering the Computing programme of study for ages 5–11. Each topic is teachable from this file alone. Most have an **unplugged** option (no computer needed) as well as a screen activity. Scratch is free at **scratch.mit.edu**; Scratch Jr is a free tablet app.

---

## 1. What is an algorithm?

**Year / Key Stage:** Years 1–3 (ages 5–8) · **Est. minutes:** 20 · **Subject strand:** Computer science – algorithms

**Prerequisites:** none.

### Key concepts
- An **algorithm** is a precise set of step-by-step instructions to do a task or solve a problem.
- The **order** of the steps matters — swap two steps and you get a different (often wrong) result.
- Algorithms are everywhere, not just in computers: a recipe, getting dressed, a dance.

### Prior knowledge assumed
- Can describe a familiar routine (getting ready for bed) in words.
- Knows "first, next, then, last".

### Teach it (the explanation)
An algorithm is just a fancy word for a clear list of steps, in order, to get something done. A recipe is an algorithm. The steps to brush your teeth are an algorithm. Computers can't think for themselves — they only follow the algorithm we give them, exactly. So we have to be **clear** (no missing steps) and put the steps in the **right order**.

Let's write the algorithm for making a jam sandwich:
1. Get two slices of bread.
2. Spread jam on one slice.
3. Put the other slice on top.
4. Cut the sandwich in half.

If we swap steps 3 and 4, we'd cut the bread before putting it together — that doesn't work! Order matters.

**Worked example.** Algorithm to wash your hands: (1) turn on the tap, (2) wet your hands, (3) add soap, (4) rub for 20 seconds, (5) rinse, (6) turn off the tap, (7) dry your hands. Ask: what happens if we forget step 3? (Hands aren't clean.) What if step 6 comes before step 5? (You rinse with the tap off — impossible.)

### Hooks (real-world angles)
- **Food:** a recipe is an algorithm — the steps to make their favourite snack.
- **Games:** the rules/steps to win a level, or set up a board game.
- **Daily life:** the morning routine, getting dressed, a goal celebration dance.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** "Any list of steps works, order doesn't matter."
  **Why:** the child thinks of the steps as a *set*, not a *sequence*.
  **Fix:** deliberately do the steps out of order (put socks on over shoes) and let them see it fail.
- **Wrong idea:** "Algorithms are only computer code."
  **Why:** the word sounds technical.
  **Fix:** point out recipes, directions and routines as everyday algorithms.

### Checks (ready-to-use)
- **Q:** Give me the algorithm for making toast (3–4 steps, in order). **A:** e.g. get bread → put it in the toaster → push it down/turn on → wait → take it out. Any sensible *ordered* list.
- **Q:** Is "put your shoes on, then put your socks on" a good algorithm? **A:** No — the order is wrong; socks must go first.

### Activity / practice
**Ordering block:** show the steps for planting a seed in jumbled order (cover with soil, dig a hole, put seed in, water it) and have the child drag them into the right sequence.

### Resources
- **BBC Bitesize KS1 — "What is an algorithm?"** (algorithms explained for young children).
- **Barefoot Computing — "Algorithms"** concept page (free, teacher-friendly).

---

## 2. Precise instructions & sequencing (unplugged)

**Year / Key Stage:** Years 1–3 (ages 5–8) · **Est. minutes:** 20 · **Subject strand:** Computer science – sequencing

**Prerequisites:** What is an algorithm?

### Key concepts
- Computers do **exactly** what you tell them — no more, no less.
- Instructions must be **precise**: small, clear, unambiguous steps.
- A vague instruction ("draw a house") leaves too much to guess; a precise one ("draw a square, then a triangle on top") works.

### Prior knowledge assumed
- Knows an algorithm is an ordered list of steps.
- Can give simple verbal directions (left, right, forward).

### Teach it (the explanation)
Here's the secret about computers: they are not clever, they are *obedient*. They follow your instructions exactly, even if the result is silly. So if you leave a step out or are vague, the computer (or a "robot" grown-up) does the wrong thing.

Play the **literal robot**: the child gives instructions to make a jam sandwich, and the grown-up does *exactly* what's said. "Put jam on the bread" → squash the whole jar onto the loaf, because they didn't say "open the jar, take a spoon of jam, spread it." Children quickly learn to be precise.

The same with directions: "go to the door" is vague; "take 3 steps forward, turn right, take 2 steps forward" is precise.

**Worked example.** Direct the robot from the table to the door: "Forward 3 steps. Turn left. Forward 2 steps. Stop." Try it with a missing "turn" and watch the robot walk into the wall — then fix it together.

### Hooks (real-world angles)
- **Robots/games:** programming a character or robot to move on a grid.
- **Treasure hunt:** precise directions to find a hidden object.
- **Crafts:** instructions for someone to draw a picture they can't see.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** "The robot knows what I mean."
  **Why:** children assume shared common sense, as with a person.
  **Fix:** be the literal robot and obey the *exact* words, including silly results.
- **Wrong idea:** giving big, lumpy instructions ("make breakfast").
  **Why:** they haven't decomposed the task into small steps.
  **Fix:** ask "what's the very first tiny thing I do?" and build up.

### Checks (ready-to-use)
- **Q:** I'm a robot at the start of a row of 5 tiles. Tell me precisely how to reach the last tile. **A:** "Move forward 4 tiles" (or "forward, forward, forward, forward"). Note it's 4, not 5.
- **Q:** Why didn't the robot make the sandwich properly when you said "put jam on bread"? **A:** Because the instruction wasn't precise — it didn't say to open the jar, take some jam and spread it.

### Activity / practice
**Speak/ordering block:** the child gives the tutor (acting as a literal robot) a precise sequence of moves on a 4×4 grid to reach a target square, correcting any step that fails.

### Resources
- **Barefoot Computing — "Crazy Character Algorithms"** (precise instructions, unplugged).
- **BBC Bitesize KS1 — "Following and writing instructions / algorithms."**

---

## 3. Debugging — finding and fixing mistakes

**Year / Key Stage:** Years 2–4 (ages 6–9) · **Est. minutes:** 20 · **Subject strand:** Computer science – debugging

**Prerequisites:** Precise instructions & sequencing.

### Key concepts
- A **bug** is a mistake in a set of instructions; **debugging** is finding and fixing it.
- Bugs are completely normal — even expert programmers get them every day.
- To debug: predict what should happen, run it, find where it went wrong, fix that step, run again.

### Prior knowledge assumed
- Can write a short ordered sequence of instructions.
- Understands instructions run in order.

### Teach it (the explanation)
When a program doesn't do what you wanted, it isn't broken forever and you aren't bad at this — there's just a **bug**, a small mistake hiding in the instructions. Finding and fixing it is called **debugging**, and it's a normal, even fun, part of coding. (The name comes from an old story of a real moth stuck in a computer!)

Good debuggers don't change everything randomly. They:
1. **Predict** — "this should make the cat move right then jump."
2. **Run** — try it and watch carefully.
3. **Spot** — "it moved left, not right — so the wrong step is the move."
4. **Fix** — change just that one step.
5. **Run again** — check it works now.

**Worked example.** A child's instructions to draw a square: forward, turn, forward, turn, forward, turn (only 3 sides). Predict: a square. Run: we get an open shape. Spot: a square has 4 sides, we only have 3 "forwards." Fix: add one more "forward, turn." Run again: a closed square. Bug fixed!

### Hooks (real-world angles)
- **Games:** when your Scratch character won't move, hunt the bug like a detective.
- **Sport:** a play that goes wrong — find the one step that needs fixing.
- **Everyday:** a wrong turn on a journey — back up to where it went wrong.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** "It's broken / I'm bad at this," then giving up.
  **Why:** treats a bug as failure rather than a normal step.
  **Fix:** celebrate finding the bug ("great, now we know where to look!") and reframe it as detective work.
- **Wrong idea:** deleting everything and starting over at the first error.
  **Why:** no strategy for locating the bug.
  **Fix:** teach "predict → run → spot → fix one step → run again" so they change only the broken part.

### Checks (ready-to-use)
- **Q:** What is a bug, and what is debugging? **A:** A bug is a mistake in the instructions; debugging is finding and fixing it.
- **Q:** These steps should make a triangle but they make an open shape — forward, turn, forward, turn. What's the bug? **A:** A triangle needs 3 sides; there are only 2 "forwards." Add one more "forward, turn."

### Activity / practice
**Debugging task:** present a short buggy instruction list (e.g. a robot meant to reach a star but one move is wrong) and have the child identify and fix the single faulty step.

### Resources
- **Scratch — built-in projects:** open any project and change a block to see the effect (free, scratch.mit.edu).
- **Barefoot Computing — "Debugging"** concept page.

---

## 4. Scratch Jr & first programs — sequence and events

**Year / Key Stage:** Years 1–3 (ages 5–8) · **Est. minutes:** 25 · **Subject strand:** Programming – sequence, events

**Prerequisites:** What is an algorithm?; Precise instructions & sequencing.

### Key concepts
- A **program** is an algorithm written so a computer can run it.
- Blocks join together to run **in sequence**, top to bottom (or left to right).
- An **event** starts the program: tap the green flag / tap the character.

### Prior knowledge assumed
- Can put steps in order.
- Can use a tablet or mouse to drag.

### Teach it (the explanation)
Now we turn our algorithm into a real **program** the computer can run. In Scratch Jr (or Scratch) we don't type — we snap together coloured **blocks**, like jigsaw pieces. The blocks run in order, one after another: that's the **sequence**.

But how does the program know *when* to start? With an **event** block. In Scratch Jr the yellow "start on green flag" block means "begin when I tap the green flag." In Scratch it's "when 🏁 clicked." An event is the trigger that wakes the program up.

So a first program is: **[when green flag tapped] → move right → move right → jump.** Tap the flag, and the character does exactly those three things, in that order.

**Worked example.** Make a cat walk to a ball: drag "when green flag clicked," then "move 10 steps" four times. Tap the flag — the cat walks across in four little hops. Too far? Remove one "move" block (a tiny debug!).

### Hooks (real-world angles)
- **Animals:** make a chosen animal sprite walk, hop or fly across the screen.
- **Story:** two characters that say "hello" to each other when tapped.
- **Games:** a character that moves when you press the flag.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** blocks run all at once / in any order.
  **Why:** child hasn't internalised top-to-bottom sequence.
  **Fix:** slow the program down and point to each block as it lights up while running.
- **Wrong idea:** the program runs by itself with no start.
  **Why:** the role of the event block isn't understood.
  **Fix:** remove the green-flag block and show nothing happens until there's a trigger.

### Checks (ready-to-use)
- **Q:** What does an event block (like "when green flag clicked") do? **A:** It tells the program when to start running.
- **Q:** Your blocks are: move right, move right, jump. What will the character do, in order? **A:** Move right, move right again, then jump.

### Activity / practice
**Build it:** in Scratch Jr/Scratch, make a sprite start on the green flag and move across the screen to reach an object, adjusting the number of move blocks so it lands in the right place.

### Resources
- **ScratchJr — "First Steps" / built-in tutorial** (free tablet app, ages 5–7).
- **Scratch — "Getting Started" tutorial** at scratch.mit.edu (free, ages 7+).

---

## 5. Loops & repetition in Scratch

**Year / Key Stage:** Years 3–5 (ages 7–10) · **Est. minutes:** 25 · **Subject strand:** Programming – repetition

**Prerequisites:** Scratch Jr & first programs.

### Key concepts
- A **loop** repeats blocks instead of writing them out many times.
- "**Repeat 4**" runs the inside blocks four times.
- "**Forever**" repeats endlessly until the program is stopped.

### Prior knowledge assumed
- Can build and run a simple sequence of blocks.
- Can count and recognise something that repeats.

### Teach it (the explanation)
Imagine you want a character to flash on and off ten times. You *could* drag twenty blocks. But that's slow and easy to get wrong. Programmers spot the **pattern** — "this bit repeats" — and use a **loop**.

In Scratch, the "**repeat ( )**" block is a C-shaped block: whatever you put *inside* it runs that many times. "Repeat 4 [move 10 steps, turn 90°]" draws a square — four identical sides, written once. There's also "**forever**," which repeats until you stop the program (handy for animation, like wings that keep flapping).

Loops make programs **shorter, clearer, and easier to debug** — and they show off pattern recognition, one of the big computational-thinking ideas.

**Worked example.** Draw a square with the pen: "pen down," then "repeat 4 [move 100, turn 90 degrees]." Run it — a neat square appears, using one loop instead of eight separate blocks. Change 4 to 3 and the angle to 120 → a triangle.

### Hooks (real-world angles)
- **Dance/music:** a move that repeats to the beat — "repeat 8."
- **Art:** repeating a shape to make a pattern or spiral.
- **Sport:** a drill repeated a set number of times.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** putting "repeat 4" but expecting it to do something *four different* things.
  **Why:** confuses "repeat the same blocks" with "do four steps."
  **Fix:** show the loop highlighting and looping back to the same blocks each time.
- **Wrong idea:** using "forever" then wondering why the program never finishes.
  **Why:** doesn't realise "forever" has no end.
  **Fix:** contrast "repeat 10" (stops) with "forever" (needs you to stop it) and choose the right one for the job.

### Checks (ready-to-use)
- **Q:** How many move blocks do you need with a loop to make a character hop 6 times? **A:** Just one "hop" block inside "repeat 6."
- **Q:** Why use a loop instead of copying the same block ten times? **A:** It's shorter, clearer, less error-prone and shows the repeating pattern.

### Activity / practice
**Build it:** in Scratch, use a "repeat" loop with the pen to draw a regular shape (square = repeat 4, turn 90; triangle = repeat 3, turn 120). Predict the shape before running.

### Resources
- **Scratch — "Make it Fly" / "Animate a Name"** built-in tutorials (use loops; free).
- **code.org Course C/D — "Loops"** lessons (free, blocks-based).

---

## 6. Variables in Scratch — keeping score

**Year / Key Stage:** Years 4–6 (ages 8–11) · **Est. minutes:** 25 · **Subject strand:** Programming – variables

**Prerequisites:** Scratch Jr & first programs; Loops & repetition.

### Key concepts
- A **variable** is a named box that stores a value which can change.
- You can **set** a variable (score = 0) and **change** it (score + 1).
- Variables let programs remember things: a score, a name, a count, a level.

### Prior knowledge assumed
- Can build, run and debug a short Scratch program.
- Understands a number can go up or down.

### Teach it (the explanation)
How does a game remember your **score**? It uses a **variable** — think of it as a labelled box. The label is the *name* ("score"), and inside is the *value* (a number). The clever part: the value can **change** while the program runs.

In Scratch you make a variable in the **Variables** section. Two key blocks:
- "**set [score] to 0**" — empties the box and puts 0 in (do this at the start).
- "**change [score] by 1**" — adds 1 to whatever's in the box (do this when the player catches something).

You can show the variable on screen so the player sees their score climb. Variables can hold names and words too, not just numbers.

**Worked example.** A catch game: at the green flag, "set score to 0." When the cat touches an apple, "change score by 1." Each catch bumps the box from 0 → 1 → 2 → 3. The number on screen updates live.

### Hooks (real-world angles)
- **Games:** a score, lives, or a timer that counts down.
- **Sport:** keeping the score of a match.
- **Collecting:** counting stickers, coins or points earned.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** forgetting to "set score to 0" at the start, so the score keeps old values.
  **Why:** thinks the box starts empty automatically.
  **Fix:** show the leftover value from a previous run; add "set to 0" and re-run.
- **Wrong idea:** using "set to" when they mean "change by."
  **Why:** confuses *replacing* the value with *adding* to it.
  **Fix:** demonstrate "set to 1" (always 1) vs "change by 1" (goes up each time).

### Checks (ready-to-use)
- **Q:** What is a variable? **A:** A named box that stores a value that can change while the program runs.
- **Q:** Score is 3. You run "change score by 1" twice. What's the score now? **A:** 5.
- **Q:** Why do we "set score to 0" at the start of the game? **A:** So every game begins fresh at zero, not with the last game's score.

### Activity / practice
**Build it:** in Scratch, add a "score" variable to a simple catch game — set it to 0 at the start and change it by 1 each time the sprite catches the target. Show the score on screen.

### Resources
- **Scratch — "Pong Game" tutorial** (introduces score variables; free).
- **code.org — "Variables"** lessons (free).

---

## 7. Selection — "if … then …" (conditionals)

**Year / Key Stage:** Years 4–6 (ages 8–11) · **Est. minutes:** 25 · **Subject strand:** Programming – selection

**Prerequisites:** Loops & repetition; Variables in Scratch.

### Key concepts
- **Selection** means the program **chooses** what to do based on a condition.
- An "**if … then …**" block runs its inside blocks only **if** something is true.
- A **condition** is a yes/no question: "is the score 10?", "is the sprite touching the wall?"

### Prior knowledge assumed
- Can use loops and a variable.
- Understands true/false (yes/no) questions.

### Teach it (the explanation)
So far our programs do the same thing every time. **Selection** lets a program make a **decision** — to do one thing in one situation and something else in another, just like us. "**If** it's raining, **then** take an umbrella." The bit after "if" is the **condition**: a question with a yes/no answer.

In Scratch the "**if ( ) then**" block runs the blocks inside it **only when** the condition is true. For example: "if [touching edge?] then [bounce]." There's also "**if … then … else …**": do one thing if true, *another* thing if false — like "if score > 10 then say 'You win!' else say 'Keep going!'"

Selection often lives **inside a forever loop**, so the program keeps checking the condition over and over.

**Worked example.** A maze game: "forever [ if [touching wall?] then [say 'Ouch!', go back] ]." The program constantly checks "am I touching a wall?" Most of the time the answer is no and nothing happens; the moment it's yes, the character says "Ouch!" and steps back. The decision is made automatically by the condition.

### Hooks (real-world angles)
- **Games:** "if you touch the enemy, lose a life"; "if score = 10, you win."
- **Weather/clothes:** "if it's cold, wear a coat."
- **Quizzes:** "if the answer is right, say well done."

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** thinks "if" blocks always run their inside steps.
  **Why:** ignores the condition gate.
  **Fix:** make the condition false and show the inside blocks are skipped.
- **Wrong idea:** checking a condition once, not continuously, so it never catches the moment.
  **Why:** doesn't pair "if" with a loop.
  **Fix:** wrap the "if" in a "forever" loop so it keeps checking.

### Checks (ready-to-use)
- **Q:** What does "if … then …" do? **A:** It runs the inside blocks only if the condition is true; otherwise it skips them.
- **Q:** Give an everyday "if … then …" rule. **A:** e.g. "If it's dark, then turn the light on." (Any sensible condition → action.)
- **Q:** In "if score = 10 then say 'You win'," when does the character speak? **A:** Only when the score equals 10.

### Activity / practice
**Build it:** in Scratch, add an "if [touching colour/edge] then [say something / change score]" to a project so the program reacts only when the condition is met. Use a forever loop so it keeps checking.

### Resources
- **Scratch — "Make a Chase Game"** tutorial (uses if/then and conditions; free).
- **code.org Course F — "Conditionals"** lessons (free).

---

## 8. Using technology safely & purposefully

**Year / Key Stage:** Years 1–4 (ages 5–9) · **Est. minutes:** 20 · **Subject strand:** Digital literacy – safe & purposeful use

**Prerequisites:** none.

### Key concepts
- Technology is a **tool** for a purpose: creating, finding out, communicating, playing.
- Use devices **safely** (look after them, sensible time, sit well) and **kindly**.
- If anything online ever worries or upsets you, **tell a trusted adult**.

### Prior knowledge assumed
- Has used a tablet, computer or phone for something (a game, a video, drawing).

### Teach it (the explanation)
A computer, tablet or phone is a **tool** — like a pencil or a bike. We pick it up to *do a job*: write a story, draw a picture, find out a fact, talk to grandma, or play a game. Using technology *purposefully* means knowing **why** you're using it, not just scrolling.

Using it **safely** means a few simple habits: handle devices carefully, sit up and rest your eyes, take breaks, and only go to places a grown-up says are okay. And the most important rule of all: **if you ever see or read something that worries, scares or upsets you, stop and tell a trusted adult** — a parent, carer or teacher. You will never be in trouble for telling.

**Worked example.** Compare two ways to spend 20 minutes on a tablet: (a) endlessly tapping adverts in a game, or (b) using a drawing app to make a birthday card for a friend. Both use the same device, but (b) has a clear, kind purpose. Then practise the safety rule: "What do you do if a video pops up that scares you?" → *tell a trusted adult.*

### Hooks (real-world angles)
- **Creating:** making a card, story or picture for someone they love.
- **Finding out:** looking up a fact about a favourite animal (with a grown-up).
- **Communicating:** a video call to a relative who lives far away.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** "If something upsets me online, I should hide it / sort it myself."
  **Why:** fear of getting into trouble.
  **Fix:** reassure firmly — telling a trusted adult is always right and never gets *them* in trouble.
- **Wrong idea:** "More screen time is always better."
  **Why:** devices are designed to keep us tapping.
  **Fix:** talk about balance — screens are great *and* so are running, reading and sleep.

### Checks (ready-to-use)
- **Q:** Name two things you could *create* with a tablet for a real purpose. **A:** e.g. a birthday card, a story, a drawing, a photo album. (Any purposeful creation.)
- **Q:** A video appears that makes you feel scared or upset. What's the safest thing to do? **A:** Stop watching and tell a trusted adult.

### Activity / practice
**Multiple choice / speak:** sort everyday situations into "safe & sensible" vs "tell a trusted adult" (e.g. "a kind message from your friend" vs "a stranger asking where you live").

### Resources
- **BBC Bitesize KS1 — "Using technology safely."**
- **ThinkUKnow (CEOP) — Jessie & Friends / Play Like Share** (online-safety stories for young children).

---

## 9. How the internet & networks work (simply)

**Year / Key Stage:** Years 3–6 (ages 7–11) · **Est. minutes:** 25 · **Subject strand:** Computer science – networks & the internet

**Prerequisites:** Using technology safely & purposefully.

### Key concepts
- A **network** is computers joined together so they can share information.
- The **internet** is a giant network connecting computers all over the world.
- When you load a page or video, your request travels to another computer (a **server**) and the information comes back to you.

### Prior knowledge assumed
- Has watched a video or loaded a webpage on a device.
- Knows information can be sent from one place to another (like a letter).

### Teach it (the explanation)
When you watch a video or open a website, where does it actually *come from*? Not from inside your tablet — it travels to you across the **internet**.

Start with a **network**: two or more computers joined by cables or wi-fi so they can share things, like classroom computers that all use the same printer. Now imagine joining millions of these networks all over the world — that's the **internet**.

Some computers are special: they're always on and store websites and videos, ready to send them when asked. We call them **servers**. So when you click "play," your device sends a little message — "please send me this video" — across the internet to a server. The server sends the video back to you in tiny pieces, and your screen puts them together. It happens in a blink, but it's a real journey between computers.

(The **World Wide Web** — the websites and pages — is one of the things that *travels on* the internet, like programmes on the TV signal.)

**Worked example.** Trace what happens when you open a webpage: (1) you type the address or tap a link, (2) your device asks the internet "where is this page?", (3) the request reaches the server that stores it, (4) the server sends the page back in little packets, (5) your browser reassembles them and shows the page. Like ordering a pizza: you ask, the kitchen (server) makes and sends it, it arrives at your door.

### Hooks (real-world angles)
- **Video/games:** how a streaming video or an online game reaches your screen.
- **Post:** the internet is like a worldwide postal system for information.
- **Family:** a video call connects two computers across the world.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** "Videos and websites are stored inside my device."
  **Why:** they appear instantly, so feel local.
  **Fix:** turn off wi-fi and show the page won't load — it has to come *from* somewhere.
- **Wrong idea:** "The internet and the web are the same thing."
  **Why:** the words are used loosely.
  **Fix:** internet = the network of connected computers; the web = the websites that travel on it.

### Checks (ready-to-use)
- **Q:** What is the internet? **A:** A giant network connecting computers all over the world so they can share information.
- **Q:** When you press play on a video, where does the video actually come from? **A:** From a server — another computer that sends it to your device across the internet.

### Activity / practice
**Ordering block:** put the steps of loading a webpage in order (you ask → request travels the internet → server finds the page → page sent back in packets → browser shows it).

### Resources
- **BBC Bitesize KS2 — "What is the internet?" / "Computer networks."**
- **code.org — "How the Internet Works"** video series (free, age-appropriate).

---

## 10. Search engines & evaluating results

**Year / Key Stage:** Years 3–6 (ages 7–11) · **Est. minutes:** 25 · **Subject strand:** Digital literacy / IT – searching & evaluating

**Prerequisites:** How the internet & networks work.

### Key concepts
- A **search engine** finds web pages that match the words you type.
- Better **keywords** give better results — choose the important words.
- Not everything online is true; **check** who made it and whether other sources agree.

### Prior knowledge assumed
- Can read short text and type a few words.
- Knows pages come from across the internet (servers).

### Teach it (the explanation)
There are billions of pages on the web — far too many to look through yourself. A **search engine** (like a librarian for the internet) takes the words you type and finds pages that match, then lists them with the ones it thinks are most useful near the top.

Two skills matter. First, **good keywords**: type the *important* words, not a whole sentence. Searching "tallest dinosaur" beats "can you please tell me which dinosaur was the most very tall one." Second, **evaluating** the results: the top result isn't always the best or the truest. Ask: *Who made this page? When? Are they likely to know? Do other trustworthy pages say the same?* Adverts and out-of-date or made-up pages can look just as shiny as good ones.

**Worked example.** You want to know what pandas eat. Bad search: "i love pandas they are cute what food." Better: "what do pandas eat." Now look at two results — a children's encyclopaedia / zoo site vs a random page selling panda toys. Which is more likely to give correct facts? The zoo/encyclopaedia — and we'd check a second source agrees (bamboo!).

### Hooks (real-world angles)
- **Animals:** finding reliable facts about a favourite creature.
- **Homework:** researching a topic and checking the facts are right.
- **Curiosity:** "how do volcanoes work?" — picking good keywords.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** "The first result is always the best/true."
  **Why:** assumes ranking = trustworthiness; doesn't notice adverts.
  **Fix:** compare a top advert/result with a known-good source and ask who made each.
- **Wrong idea:** "If it's online, it must be true."
  **Why:** anyone can publish anything online.
  **Fix:** teach the check — who made it, when, and does another good source agree?

### Checks (ready-to-use)
- **Q:** You want to know how tall a giraffe grows. What good keywords would you type? **A:** Something short like "how tall is a giraffe" — the important words only.
- **Q:** Give two questions you should ask to check if a web page is reliable. **A:** Who made it (do they know their stuff)? Is it up to date / do other trustworthy sources agree?

### Activity / practice
**Categorize / multiple choice:** given a search topic and several "results" (a museum page, an advert, a random blog), the child picks the most reliable and explains why.

### Resources
- **BBC Bitesize KS2 — "Using search engines" / "How to search the internet."**
- **Internet Matters — "Critical thinking & fake news"** resources for primary children (free).

---

## 11. Data, pictograms & spreadsheets

**Year / Key Stage:** Years 2–6 (ages 6–11) · **Est. minutes:** 25 · **Subject strand:** IT – data & information

**Prerequisites:** none (links to maths – statistics).

### Key concepts
- **Data** is information we collect (counts, measurements, answers).
- We **organise** data to make sense of it: tally charts, pictograms, bar charts, branching databases, spreadsheets.
- A good chart lets us **answer questions** quickly: most, least, how many altogether.

### Prior knowledge assumed
- Can count and compare numbers.
- Can read a simple table or chart.

### Teach it (the explanation)
**Data** is just collected information — like everyone's favourite fruit, or how many cars pass the window. On its own, a pile of data is hard to read. So we **organise** it into a picture or table that answers questions at a glance.

For young children: a **tally chart** counts with strokes (the fifth stroke crosses the other four — easy to count in fives), and a **pictogram** uses a picture to stand for an amount (🍎 = 1 child who likes apples). Taller pile = more popular. Older children use **bar charts**, **branching databases** (sorting things with yes/no questions, like "Does it have wings?"), and **spreadsheets** — grids of rows and columns where the computer can total and chart numbers for you instantly.

The point of any of these is to **answer questions**: Which is most popular? Which is least? How many altogether? How many more chose X than Y?

**Worked example.** Survey 10 friends' favourite fruit: apple ||||, banana |||, grapes ||| (tally). Draw a pictogram with one 🍎 per vote. Now answer: most popular? (apple, 4) Least? (banana and grapes, 3 each) How many altogether? (4+3+3 = 10). In a spreadsheet you'd type the numbers and click "chart" to draw the bars for you.

### Hooks (real-world angles)
- **Sport:** goals scored by each player over a season.
- **Weather:** sunny/rainy days in a month, shown as a pictogram.
- **Pets/food:** class survey of favourite animal, snack or colour.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** reading a pictogram by counting symbols when one symbol stands for more than 1.
  **Why:** ignores the key (e.g. 🍎 = 2 children).
  **Fix:** always read the key first, then multiply.
- **Wrong idea:** thinking a spreadsheet just stores numbers like a notebook.
  **Why:** doesn't know the computer can calculate.
  **Fix:** type a few numbers and use SUM / "chart" so they see the computer total and draw it automatically.

### Checks (ready-to-use)
- **Q:** In a pictogram, 🐶 = 2 children. There are 3 dog pictures. How many children chose dogs? **A:** 6 (3 × 2 — read the key first).
- **Q:** Why do we put data into a chart instead of leaving it as a list? **A:** So we can quickly see and compare — most, least, totals — at a glance.

### Activity / practice
**Number entry / matchPairs:** given a small tally or pictogram, the child answers "most," "least," "how many altogether" and "how many more X than Y." Optionally enter the data in a spreadsheet and make a bar chart.

### Resources
- **BBC Bitesize KS1/KS2 — "Pictograms," "Bar charts," "Handling data."**
- **BBC Bitesize KS2 — "Using spreadsheets" / "Branching databases."**

---

## 12. Creating digital content

**Year / Key Stage:** Years 1–6 (ages 5–11) · **Est. minutes:** 25 · **Subject strand:** IT – creating digital content

**Prerequisites:** Using technology safely & purposefully.

### Key concepts
- We can **create, save and retrieve** digital content: text, pictures, photos, sound, presentations.
- Different software suits different jobs (paint for pictures, a word processor for text, slides to combine both).
- Good content is made **for a purpose and an audience** — and we can edit and improve it.

### Prior knowledge assumed
- Can use a mouse/keyboard or tablet to draw and type a little.
- Knows what they want to make and who it's for.

### Teach it (the explanation)
A big part of computing is **making things** — not just using what others made. With a device you can create **digital content**: a typed story, a painted picture, a photo, a short sound recording, or a slideshow that combines several of these.

Two ideas make creations good. First, **purpose and audience**: a poster to advertise a bake sale looks different from a thank-you card for grandma. Decide what it's *for* and *who'll see it*. Second, **save and retrieve**: digital work can be saved with a name, then opened again later to **edit and improve** it — fix a spelling, change a colour, add a slide. That's a superpower paper doesn't have.

Pick the right tool: a **paint app** for pictures, a **word processor** for writing, **presentation software** to put text, pictures and sound on slides.

**Worked example.** Make a "facts about my favourite animal" mini-poster: (1) decide the purpose (teach others) and audience (the family), (2) open a slide/document, (3) type a title and 3 facts, (4) add a picture, (5) save it with a sensible name, (6) reopen it tomorrow and improve one thing (a better fact or colour). Created → saved → retrieved → edited.

### Hooks (real-world angles)
- **Story/comics:** a typed or illustrated story, or a photo comic strip.
- **Events:** a poster or invitation for a real occasion.
- **Music/sound:** record a short narration or sound effect for a slideshow.

### Misconceptions (wrong answer → why → fix)
- **Wrong idea:** "If I close it, my work is gone."
  **Why:** doesn't understand saving.
  **Fix:** save with a name, close, reopen — show it's still there and can be changed.
- **Wrong idea:** "Any tool works for any job."
  **Why:** hasn't matched software to purpose.
  **Fix:** try drawing in a word processor vs a paint app; discuss which fits the task.

### Checks (ready-to-use)
- **Q:** Name three kinds of digital content you could create. **A:** e.g. text/a story, a picture, a photo, a sound recording, a slideshow. (Any three.)
- **Q:** Why is it useful to *save* your digital work? **A:** So you can open it again later to keep, share or improve it.

### Activity / practice
**Build it:** the child plans and makes one piece of digital content for a real purpose and audience (e.g. a 1-slide animal fact card), saves it with a sensible name, then reopens it and improves one thing.

### Resources
- **BBC Bitesize KS1/KS2 — "Creating digital content" / "Word processing & presentations."**
- **Scratch — "Animate a Name" / "Create a Story"** (combine text, images and sound; free).

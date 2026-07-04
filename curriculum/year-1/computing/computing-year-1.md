# Computing — Year 1 (ages 5–6, KS1) — Lesson Outlines

> Part of **the best international primary school** (see [`../../../SCHOOL-CHARTER.md`](../../../SCHOOL-CHARTER.md)).
> Year 1 scope drawn from `knowledge-base/subjects/computing-life-skills/computing-ks1-ks2.md`
> and `online-safety.md`. Follows the lesson-outline format and 8 design principles in
> [`../README.md`](../README.md).

## Year overview

Year 1 computing begins **away from the screen**. Before children ever touch a floor robot
or a tablet, they learn that an **algorithm** is just a precise list of steps in the right
order — building computational thinking through recipes, routines, dances and "literal
robot" games. From there they meet their first real programs: directing a **floor robot**
(Bee-Bot style) and snapping **blocks** together in a ScratchJr-style tool, learning to
predict what their instructions will do and to spot and fix a simple mistake. Alongside
the computer-science thread runs a **digital-literacy** thread: technology is a *tool* with
a *purpose*, and children practise the everyday skills of logging in, using a mouse and
keyboard, and creating and saving their own digital content. The year closes — warmly and
without fear — with the foundations of **online safety**: be kind, keep personal things
private, and *always tell a trusted adult* if anything worries you. The arc moves from
**computational thinking unplugged → simple programming → using technology safely and well**.

The year runs to **20 lessons** across **5 units**, each lesson 20–40 minutes, weighted
heavily toward unplugged, hands-on doing.

---

## Unit 1 — Algorithms unplugged

**Essential question:** What is a precise instruction, and why does the order matter?

**Key vocabulary:** algorithm, step, instruction, order, sequence, first/next/then/last,
precise, robot.

### Lesson 1 — What is an algorithm?
- **Duration:** 25 min
- **Objective:** "By the end, I can say what an algorithm is and give one for an everyday task."
- **Hook:** "How does a grown-up know exactly how to make your favourite sandwich? They follow a secret list of steps!"
- **Key activity:** Together, build the jam-sandwich algorithm aloud (get two slices → spread jam → put slices together → cut in half). Children act out each step on a carpet "kitchen." Then each child gives a 3–4 step algorithm for a task they know (brushing teeth, getting dressed).
- **Check for understanding:** "Give me the algorithm for making toast." → Any sensible *ordered* list, e.g. get bread → put it in the toaster → push it down → wait → take it out.
- **Differentiation:** support: give 3 picture cards to put in order. / stretch: add a missing step a friend forgot and explain why it matters.
- **Materials:** picture-step cards (sandwich, teeth, dressing), play food, carpet space.
- **Joy:** acting out the steps as a "human kitchen," cutting an imaginary sandwich with a flourish.

### Lesson 2 — Order matters
- **Duration:** 25 min
- **Objective:** "By the end, I can show that changing the order of steps can make an algorithm go wrong."
- **Hook:** Teacher tries to put socks on *over* shoes. "Why won't this work?!"
- **Key activity:** Take a familiar algorithm (getting dressed) on big cards; deliberately swap two cards and act it out — pants over trousers, shoes before socks. Children laugh, spot the problem, and fix the order. Repeat with washing hands (rinse before soap = silly).
- **Check for understanding:** "Is 'put your shoes on, then put your socks on' a good algorithm?" → No — the order is wrong; socks must go first.
- **Differentiation:** support: fix a 2-card swap with picture support. / stretch: scramble 5 steps and re-order the whole sequence.
- **Materials:** large sequence cards (getting dressed, washing hands), real socks and shoes.
- **Joy:** catching the teacher being "silly" and being the one to fix it.

### Lesson 3 — Precise instructions: the literal robot
- **Duration:** 30 min
- **Objective:** "By the end, I can give a precise, clear instruction so a 'robot' does what I mean."
- **Hook:** "I'm a robot. I only do EXACTLY what you say. Tell me to make a sandwich…" (teacher squashes the whole jar onto the loaf).
- **Key activity:** "Literal robot" game — children take turns instructing the teacher-robot, who obeys the *exact* words (including silly results) until the instruction is precise enough. Then pairs direct each other to "draw a house" using only precise steps ("draw a square, then a triangle on top").
- **Check for understanding:** "Why didn't the robot make the sandwich when you said 'put jam on bread'?" → Because the instruction wasn't precise — it didn't say to open the jar, take some jam and spread it.
- **Differentiation:** support: choose from a word bank (open, take, spread, put). / stretch: break a big instruction ("make breakfast") into small precise steps.
- **Materials:** play food + jar, paper and crayons, robot prop (e.g. a box hat).
- **Joy:** bossing the "robot" around and watching it do exactly — comically — what was said.

### Lesson 4 — Directing a robot on a grid (unplugged)
- **Duration:** 30 min
- **Objective:** "By the end, I can give precise forward/turn instructions to move a robot along a grid."
- **Hook:** A big floor grid with a treasure square. "Can you guide our robot to the treasure with words only?"
- **Key activity:** On a taped floor grid, one child is the "robot," another gives precise moves: "forward 3, turn right, forward 2, stop." Class checks each step; a missing turn walks the robot into a "wall," then they fix it. Introduce the idea of counting *gaps*, not tiles (a row of 5 tiles needs "forward 4").
- **Check for understanding:** "I'm a robot at the start of a row of 5 tiles. Tell me precisely how to reach the last tile." → "Move forward 4" (it's 4, not 5).
- **Differentiation:** support: arrow cards to lay down for each move. / stretch: plan the whole route silently first, then test it.
- **Materials:** masking-tape floor grid, treasure prop, arrow cards.
- **Joy:** being the robot that marches across the grid (and the giggle of bumping a wall).

**End-of-unit check:** Child gives a correct ordered algorithm for a familiar task, fixes one out-of-order step, and directs a "robot" across at least 3 grid squares with precise instructions.

---

## Unit 2 — Programming floor robots

**Essential question:** How do I make a real robot follow my instructions — and fix it when it goes wrong?

**Key vocabulary:** program, button, command, forward, back, turn, predict, run, bug, debug, fix.

### Lesson 5 — Meet the floor robot
- **Duration:** 25 min
- **Objective:** "By the end, I can press the buttons to make a floor robot move forward and turn."
- **Hook:** Reveal the Bee-Bot. "This robot can't think — it only does what *you* program. Let's wake it up!"
- **Key activity:** Explore the buttons (forward, back, turn left, turn right, go, clear). Children press a single command, then "go," and watch one move. Build a 2–3 step program to move the robot to a nearby spot, pressing "clear" first each time.
- **Check for understanding:** "What does the robot do if you don't press 'go'?" → Nothing — it waits; "go" tells the program to start running.
- **Differentiation:** support: copy the teacher's button sequence. / stretch: get the robot to a target two moves away first try.
- **Materials:** Bee-Bot (or floor robot), open floor space, target markers.
- **Joy:** the robot beeping to life and trundling across the carpet on their command.

### Lesson 6 — Predict, then run
- **Duration:** 30 min
- **Objective:** "By the end, I can predict where my robot will stop before I press go."
- **Hook:** "I bet you can't guess where the robot will land… or can you?"
- **Key activity:** On a robot mat, children enter a short program, then *point to where they think it will stop* before pressing go. Run it and compare. Celebrate correct predictions; discuss surprises. Repeat with a turn added.
- **Check for understanding:** "Your program is forward, forward, turn right, forward. Point to where the robot will be." → Child points to the correct end square (reasoning about each step).
- **Differentiation:** support: 2-step programs, point with a counter. / stretch: predict programs with two turns.
- **Materials:** Bee-Bot, gridded floor mat, prediction counters.
- **Joy:** the thrill of calling the landing square correctly — "I knew it!"
- *(Connects to maths: counting squares, left/right, position.)*

### Lesson 7 — Robot to the target (programming a route)
- **Duration:** 35 min
- **Objective:** "By the end, I can plan and program a robot to travel from start to a chosen target."
- **Hook:** A mat with picture squares (farm, shop, park). "Can you drive the robot to the farm to feed the animals?"
- **Key activity:** Children plan a multi-step route to a target picture, enter the whole program, predict, then run. They use a planning strip (arrow cards) before pressing buttons — "plan it, build it, run it."
- **Check for understanding:** "How did you get the robot to the shop?" → Child describes the ordered sequence of commands they used.
- **Differentiation:** support: short straight route, no turns. / stretch: a route with two turns, or reach two targets in a row.
- **Materials:** picture floor mat, Bee-Bot, arrow planning strips.
- **Joy:** "driving" the robot on a real journey across a colourful map.

### Lesson 8 — Finding and fixing a bug
- **Duration:** 30 min
- **Objective:** "By the end, I can spot the one wrong step in a program and fix it."
- **Hook:** "Uh oh — my robot was meant to reach the star but it crashed! Can you be a bug detective?"
- **Key activity:** Teacher runs a deliberately buggy program (one wrong move). Together: **predict** what should happen → **run** → **spot** where it went wrong → **fix that one step** → **run again**. Children then fix a buggy program of their own. Reframe bugs as normal and fun ("great, now we know where to look!").
- **Check for understanding:** "What is a bug, and what is debugging?" → A bug is a mistake in the instructions; debugging is finding and fixing it.
- **Differentiation:** support: bug is in a 2-step program, with a hint. / stretch: find a bug in a longer program with no hint.
- **Materials:** Bee-Bot, floor mat with a "star" target, planning cards.
- **Joy:** being a "bug detective" with a magnifying glass and cheering when the robot finally reaches the star.

**End-of-unit check:** Child programs a floor robot to reach a chosen target, predicts where it will stop, and finds and fixes one bug in a short program.

---

## Unit 3 — First programs on screen (blocks)

**Essential question:** How do I turn my algorithm into a program a computer can run?

**Key vocabulary:** program, block, drag, sequence, event, start, green flag, sprite/character, run.

### Lesson 9 — From robot to blocks
- **Duration:** 30 min
- **Objective:** "By the end, I can drag and join blocks to make a character move in sequence."
- **Hook:** "Our floor robot followed buttons. This cat follows blocks — and you build them like jigsaw pieces!"
- **Key activity:** In a ScratchJr-style app, children meet the blocks and the green-flag/start block. Drag "move right" blocks and join them so the character walks across to an object. They learn blocks run **in order, top to bottom (or left to right)**.
- **Check for understanding:** "Your blocks are: move right, move right, jump. What will the character do, in order?" → Move right, move right again, then jump.
- **Differentiation:** support: drag pre-chosen blocks into the right order. / stretch: choose blocks to make the character reach exactly the right spot.
- **Materials:** tablets/computers with ScratchJr (or similar), large block cards for the carpet.
- **Joy:** snapping the bright blocks together and watching their own character spring to life.

### Lesson 10 — The start block (events)
- **Duration:** 25 min
- **Objective:** "By the end, I can use a start/green-flag block so my program knows when to begin."
- **Hook:** Teacher's blocks are built but the character won't move. "What's missing? How does it know *when* to start?"
- **Key activity:** Introduce the **event** (green-flag / "when tapped") block as the trigger. Children remove the start block → nothing happens; add it back → it runs. They build a program that begins on the green flag and moves a sprite to a target.
- **Check for understanding:** "What does an event block (like 'when green flag clicked') do?" → It tells the program when to start running.
- **Differentiation:** support: add the start block to a ready-made sequence. / stretch: make two characters that both start on the green flag.
- **Materials:** tablets/computers with ScratchJr-style tool.
- **Joy:** the "magic moment" of tapping the green flag and the whole program springing into action.

### Lesson 11 — Adjust and improve (a tiny debug)
- **Duration:** 30 min
- **Objective:** "By the end, I can change the number of blocks so my character lands in the right place."
- **Hook:** "My cat walked too far and fell off the screen! How do we fix it?"
- **Key activity:** Children build a program to reach a ball; if the sprite over- or undershoots, they add or remove a "move" block — a first on-screen debug. Encourage predict → run → adjust → run again.
- **Check for understanding:** "Your cat went too far past the ball. What could you change?" → Take away (or shorten) a move block, then run again.
- **Differentiation:** support: choose between "add one" or "take one away." / stretch: get the sprite to land exactly on target in the fewest blocks.
- **Materials:** tablets/computers with ScratchJr-style tool, target object on screen.
- **Joy:** the satisfaction of tweaking and finally landing the character bang on target.

**End-of-unit check:** Child builds a short block program that starts on the green flag, runs it in sequence, and adjusts the blocks to reach a target.

---

## Unit 4 — Technology around us & creating digital content

**Essential question:** What is technology for, and what can I make with it?

**Key vocabulary:** technology, computer, tablet, mouse, keyboard, click, type, log in, password, save, open, create.

### Lesson 12 — Technology is a tool with a purpose
- **Duration:** 25 min
- **Objective:** "By the end, I can name technology around me and say what we use it for."
- **Hook:** "A pencil helps us write. A bike helps us travel. What does a tablet help us do?"
- **Key activity:** Spot technology around the room/home (computer, tablet, phone, interactive board). Sort picture cards by *purpose* — to create, to find out, to communicate, to play. Discuss using a device *purposefully* (knowing why) rather than just tapping.
- **Check for understanding:** "Name two things you could *create* with a tablet for a real purpose." → e.g. a birthday card, a story, a drawing, a photo album. (Any purposeful creation.)
- **Differentiation:** support: match a device to one use. / stretch: explain which tool is best for a given job and why.
- **Materials:** picture cards of devices and uses, real devices to point to.
- **Joy:** going on a "technology hunt" around the room.

### Lesson 13 — Logging in, mouse and keyboard
- **Duration:** 30 min
- **Objective:** "By the end, I can log in and use a mouse/touchpad and keyboard to point, click and type."
- **Hook:** "Every computer has a secret 'hello' — let's learn how to wake yours up safely."
- **Key activity:** Guided log-in (typing a name/simple code). Practise mouse skills with a free clicking/dragging game (point, click, drag, double-click) or on-screen targets. Then find letters on the keyboard and type their own name. Note: a password is private (link forward to online safety).
- **Check for understanding:** "Show me how to type your name and click the green button." → Child types name and clicks accurately (observed).
- **Differentiation:** support: hand-over-hand or large-target practice. / stretch: type a short word and use the space bar between two words.
- **Materials:** computers/tablets, keyboard practice game, name cards.
- **Joy:** typing their very own name on the screen for the first time.

### Lesson 14 — Painting and drawing on screen
- **Duration:** 30 min
- **Objective:** "By the end, I can use a paint app to create a picture for a purpose."
- **Hook:** "Today we paint without any mess — and we can undo any mistake!"
- **Key activity:** In a simple paint app, children create a picture for a real purpose (e.g. a card for someone). Explore brush, colour, fill and the magic **undo**. Match the *tool to the job* — paint for pictures.
- **Check for understanding:** "Which tool would you use to colour the whole sky blue?" → The fill/bucket tool (or a big brush).
- **Differentiation:** support: trace/colour a ready shape. / stretch: combine shapes and colours into a planned scene.
- **Materials:** tablets/computers with a paint app.
- **Joy:** the "undo" superpower and making bold, colourful art with no mess.

### Lesson 15 — Save it, open it, improve it
- **Duration:** 30 min
- **Objective:** "By the end, I can save my digital work with a name, reopen it, and improve one thing."
- **Hook:** "If I close my picture, is it gone forever? Let's find out!"
- **Key activity:** Children save their picture (or a short typed caption) with a sensible name, close it, then reopen it together — showing the work is still there. They **edit and improve** one thing (a colour, a detail, fix a letter). Introduce **create → save → retrieve → improve**.
- **Check for understanding:** "Why is it useful to *save* your digital work?" → So you can open it again later to keep, share or improve it.
- **Differentiation:** support: teacher-guided save with a picture prompt. / stretch: save, reopen and add a brand-new detail independently.
- **Materials:** tablets/computers, paint/word app, saved-work display.
- **Joy:** the "ta-da!" of reopening their own work after it seemed to disappear.

**End-of-unit check:** Child logs in, uses mouse/keyboard to create a piece of digital content for a purpose, saves it with a name, and reopens it to improve one thing.

---

## Unit 5 — Staying safe and kind online

**Essential question:** How do I stay safe, kind and happy when I use technology?

**Key vocabulary:** online, kind, private, personal information, password, trusted adult, worry, tell, safe.

> **Tone note (from the online-safety KB):** keep this unit **warm, calm and reassuring**.
> The recurring message is *the internet is brilliant, and a trusted adult is always there
> to help.* Never imply a child is to blame; keep examples gentle and age-appropriate.

### Lesson 16 — Being kind online
- **Duration:** 25 min
- **Objective:** "By the end, I can explain that we are kind online, just like in real life."
- **Hook:** "There's a real person on the other side of every screen — with feelings just like yours."
- **Key activity:** Discuss that the kindness rules are the same online as in the playground. Read short pretend messages and sort them "kind" or "unkind," then say a kinder way for the unkind ones. Introduce the test: *"Would I be happy if someone sent this to me?"*
- **Check for understanding:** "What's a good question to ask yourself before sending a message?" → "Would I be happy if someone sent this to me?" / "Is it kind?"
- **Differentiation:** support: thumbs up/down for kind/unkind. / stretch: rewrite an unkind message kindly.
- **Materials:** message cards, kind/unkind sorting hoops.
- **Joy:** turning a grumpy message into a happy one and acting out the friendly version.

### Lesson 17 — Keeping personal information private
- **Duration:** 25 min
- **Objective:** "By the end, I can name personal information and say we keep it private online."
- **Hook:** "Some things about you are like the key to your front door — only for people you really trust."
- **Key activity:** Introduce **personal information** (full name, address, school, phone number, password, photos) as private. Sort facts into "okay to share in a game" (favourite colour, that I like dogs) vs "keep private" (home address, school, password). Reinforce: a password is a secret, only for you and a parent/carer; check with a trusted adult before sharing anything about yourself.
- **Check for understanding:** "A new online 'friend' in a game asks where you live. What do you do?" → Don't tell them, and tell a trusted adult.
- **Differentiation:** support: sort 4 clear cards. / stretch: explain *why* an item is private.
- **Materials:** "share / keep private" cards, sorting mat, a toy key prop.
- **Joy:** the secret-keeper "key" idea — guarding their private treasure.

### Lesson 18 — Tell a trusted adult
- **Duration:** 25 min
- **Objective:** "By the end, I can name my trusted adults and the steps to take if something online worries me."
- **Hook:** "Just like a fire drill, we can have a plan for online worries — let's learn it together."
- **Key activity:** Each child names two or three **trusted adults**. Teach the simple plan, putting the steps in order: **stop → don't reply → keep it (don't delete) → tell a trusted adult.** Reassure firmly and repeatedly: it is *never* your fault and you will *never* be in trouble for telling.
- **Check for understanding:** "Something online makes you feel scared. What's the first thing to do?" → Tell a trusted adult (after stopping and not replying). And: "Will you get in trouble for telling?" → No — it's never your fault.
- **Differentiation:** support: order the plan with picture cards. / stretch: explain why we *keep* (don't delete) the worrying thing.
- **Materials:** "worry plan" sequence cards, a "my trusted adults" drawing sheet.
- **Joy:** drawing their own circle of trusted grown-ups (a personal "helper team").

### Lesson 19 — Safe and balanced screen habits
- **Duration:** 25 min
- **Objective:** "By the end, I can name a healthy screen habit and a screen-free thing I love."
- **Hook:** "Screens are a bit like sweets — lovely in the right amount. What else makes a great day?"
- **Key activity:** Talk about **balance**: some screen time *and* plenty of running, reading, building, playing, sleeping. Children plan a balanced day, sorting activities into "screen" and "screen-free," and name one favourite screen-free thing. Healthy habits: take breaks, sit well, rest your eyes, stop a while before bed. (It's normal to find it hard to stop — that's why we plan.)
- **Check for understanding:** "Name one healthy screen habit." → e.g. take breaks, stop a while before bed, have screen-free activities you enjoy.
- **Differentiation:** support: pick activities from picture cards. / stretch: explain why screen-free time before bed helps.
- **Materials:** day-planning strip, activity picture cards (screen and screen-free).
- **Joy:** designing their own "perfect balanced day."

### Lesson 20 — Safe, kind and clever: a computing celebration
- **Duration:** 35 min
- **Objective:** "By the end, I can show what I learned this year about algorithms, robots and staying safe online."
- **Hook:** "You started the year not knowing the word 'algorithm' — today you're computing experts. Let's celebrate!"
- **Key activity:** Carousel of mini-stations revisiting the year: (1) sequence a jumbled algorithm, (2) program the floor robot to a target, (3) build a quick block program, (4) sort "kind/unkind" and "private/okay-to-share," (5) name a trusted adult and the worry plan. Children rotate, helping each other. Finish by sharing one thing they're proud of.
- **Check for understanding:** "Tell me one thing computers can't do without us." → e.g. think for themselves — they only follow the algorithm/instructions we give them.
- **Differentiation:** support: partner up and choose two stations. / stretch: be a "station helper" who explains a station to others.
- **Materials:** all year's props — sequence cards, floor robot + mat, tablets, sorting cards, trusted-adult sheets, stickers/certificates.
- **Joy:** a "computing expert" certificate and showing off a favourite skill to the class.

**End-of-unit check:** Child explains that we are kind online and keep personal information private, names two trusted adults, and recites the simple "tell a trusted adult" worry plan.

---

## End-of-year mastery checks

A Year 1 child finishing this curriculum should be able to:

1. **Algorithms.** Give a correct, ordered algorithm (3–4 steps) for a familiar task, and explain why the order matters.
2. **Precise instructions.** Direct a "robot" (person or floor robot) to a target using precise forward/turn commands, counting moves correctly.
3. **Programming a floor robot.** Program a Bee-Bot-style robot to reach a chosen target, and predict where it will stop before running it.
4. **Debugging.** Find and fix one wrong step in a short program (unplugged, robot, or on-screen).
5. **First on-screen program.** Build and run a short block program that starts on a green-flag/event block and runs in sequence.
6. **Using technology.** Log in and use a mouse/touchpad and keyboard to create digital content, save it with a name, and reopen it to improve it.
7. **Kind & private online.** Explain that we are kind online, name several pieces of personal information that stay private, and apply the test "Would I be happy if someone sent this to me?"
8. **Getting help.** Name two trusted adults and state the worry plan (stop → don't reply → keep it → tell a trusted adult), knowing it is never their fault and they will never be in trouble for telling.

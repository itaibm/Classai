# Year 5 Computing (ages 10–11) — Scope & Sequence

> Part of **the best international primary school** (see [`../../../SCHOOL-CHARTER.md`](../../../SCHOOL-CHARTER.md)).
> Built to [`../../PLANNING-BRIEF.md`](../../PLANNING-BRIEF.md). Source material:
> `knowledge-base/subjects/computing-life-skills/computing-ks1-ks2.md`, `online-safety.md`,
> `extension-topics.md` and `resources.md`.

## Year overview

Year 5 is the year pupils **cross from blocks to text** and from the screen to the physical world.
The year balances the three strands of computing:

- **Computer science:** pupils consolidate Scratch with ambitious game design (variables, lists,
  custom blocks, clones), program a **BBC micro:bit** with sensors, and write their **first Python
  programs** (turtle graphics, loops, variables, input and selection). Year 4 already opened the
  computer (input–process–output, memory and storage) and taught binary to 31 and black-and-white
  pixels, so Year 5 retrieves that in one lesson and moves on to **data representation**: bytes and
  file sizes, text (ASCII and Unicode), colour images (RGB and colour depth), **sound as data**
  (sampling) and **compression** (lossless and lossy). (Networks, packets and URLs were taught in
  Years 2–3 and are deepened in Year 6 with IP addresses, DNS and encryption, so they are not
  repeated here.)
- **Information technology:** Year 4 taught spreadsheet basics (cells, SUM, MAX/MIN, sorting, bar
  and line charts). Year 5 moves on to **spreadsheet modelling**: absolute references, 'what if?'
  models with inputs and outputs, scatter graphs and misleading charts, and a dice simulation. Year 6
  then adds IF/COUNTIF, databases and queries, and data analysis in Python.
- **Digital literacy and online safety:** spotting **advertising, influencer and sponsored content**
  (building on Year 4's fact-checking), understanding what **AI** tools can and cannot do, protecting
  **privacy**, and building healthy technology habits.

Every programming unit follows **use → modify → create**: pupils read and run working code, change
it, then design their own, with **debugging** taught as a skill, not a failure. Pupils plan
algorithms on paper (flowcharts and pseudocode) before coding.

**What this year assumes (from Years 3–4):** Scratch with sequence, repetition, selection (if/else) and
simple variables (score, timer, lives); input–process–output, memory vs storage, binary to 31 and
black-and-white pixel images (Year 4); how networks, packets and URLs work (Year 3); a first
spreadsheet with SUM, MAX/MIN, sorting and bar/line charts (Year 4);
searching effectively and checking whether information is true; AI chatbots' limits; the idea of a
digital footprint and strong passwords.

**What Year 6 relies on:** writing short Python programs with loops, variables, input and if/else;
using sensors and outputs in physical computing; bytes, character codes and how images and sound are
stored and compressed; spreadsheet models with relative and absolute references; and critically evaluating online information and persuasive content — ready
for deeper Python (strings, while loops, lists, functions), data processing, networks and security,
and larger projects.

## Time budget

36 weeks × 1 lesson = 36 slots; 35 lessons planned, 1 spare for Safer Internet Day or a coding club showcase.

| Unit | Title | Strand | Term | Lessons |
|---|---|---|---|---|
| 1 | Data representation: text, images, sound and compression | Computer science (data) | 1 | 5 (1–5) |
| 2 | Game design in Scratch | Computer science (programming) | 1 | 7 (6–12) |
| 3 | Physical computing with the micro:bit | Computer science | 2 | 6 (13–18) |
| 4 | Spreadsheet modelling: what if? | Information technology | 2 | 5 (19–23) |
| 5 | First steps in Python | Computer science (programming) | 3 | 8 (24–31) |
| 6 | Digital citizenship: truth, AI and privacy | Digital literacy | 3 | 4 (32–35) |
| | **Total** | | | **35** |

---

## Unit 1 — Data representation: text, images, sound and compression

**Essential question:** If a computer only stores 0s and 1s, how can the same bits become a message, a photo or a song — and how do we make files smaller?

**Key vocabulary:** bit, byte, kilobyte (KB), megabyte (MB), gigabyte (GB), binary, denary, character code, ASCII, Unicode, pixel, RGB, colour depth, resolution, sample, sample rate, file size, compression, lossless, lossy, run-length encoding

### Lesson 1 — Bits and bytes: how much can we store?
- **Duration:** 40 min
- **Objective:** "By the end, I can explain what a bit and a byte are, show numbers up to 255 in binary, and put everyday files in order of size." (UK NC KS2 computing — understand computer systems; CSTA 1B-DA-06)
- **Hook:** "A text message, a photo, a song and a film are all on your phone. Which is biggest — and how many times bigger?"
- **Key activity:** Five-minute retrieval of Year 4: the input–process–output model, memory vs storage, and binary to 31 with the five dot cards. New: add cards 32, 64 and 128 to make one **byte** (8 bits); pairs make 100, 200 and 255 and discover that 8 bits give 256 values (0–255). Units of data: a kilobyte is 1,000 bytes, a megabyte a million, a gigabyte a thousand million (some computers count in 1,024s — say so). Groups order file-size cards (a short text message ≈ 100 bytes, a phone photo ≈ 3 MB, a song ≈ 4 MB, an hour of HD video ≈ 2 GB) on a washing line and work out roughly how many 3 MB photos fit on a 64 GB phone (about 20,000).
- **Check for understanding:** "The biggest number one byte can show is 255, but a byte can store 256 different values. Explain how both are true." → the values run from 0 (all cards face down) to 255 (all face up), and 0 counts as a value too, so there are 256 of them
- **Differentiation:** support: eight dot cards with the dots showing, converting numbers to 100 only / stretch: work out how many values 16 bits can store (65,536) and explain the doubling pattern
- **Materials:** binary dot cards 1–128 (CS Unplugged, one set per pair), file-size cards, a washing line and pegs, mini-whiteboards
- **Joy:** "Byte-sized birthdays" — the class shows birthday days and months as a full 8-bit byte, with eight children as human 'bits' standing (1) or crouching (0)

### Lesson 2 — Words as numbers: ASCII and Unicode
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how text is stored as numbers using a character code and decode a binary message." (UK NC KS2 computing — how computers work; CSTA 1B-DA-06)
- **Hook:** "When you type the letter A, the computer stores a number. Which one — and how can it store every alphabet on Earth, and emojis too?"
- **Key activity:** Letters as numbers: a simple 1–26 code, then ASCII, where 'A' is 65 and 'a' is 97; decode a short message written as 8-bit bytes (using Lesson 1's cards); learn that Unicode extends this to well over 100,000 characters, covering scripts from Arabic and Chinese to Devanagari and Ge'ez, plus emojis; pupils encode their initials and look up the Unicode number of a character from a language spoken in the class.
- **Check for understanding:** "Why did computers need Unicode as well as the original ASCII code?" → ASCII only had room for 128 characters, enough for basic English but not for the world's writing systems; Unicode gives a number to characters from almost every script (and emojis)
- **Differentiation:** support: a 1–26 letter code before binary / stretch: spot the pattern between capital and lowercase codes (they always differ by 32) and explain why that is exactly one binary card
- **Materials:** ASCII table (letters and digits), binary cards, printed secret messages, a Unicode character chart (teacher-led)
- **Joy:** "Binary bracelets" — beads in two colours spelling your initials in ASCII

### Lesson 3 — Colour pictures: RGB and colour depth
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how a colour is stored as red, green and blue numbers, and calculate how colour depth and resolution change an image's file size." (UK NC KS2 computing — how computers work / digital media; CSTA 1B-DA-06)
- **Hook:** Show a phone screen through a hand lens: "There are no yellow dots on this screen at all. So where is the yellow coming from?"
- **Key activity:** Two-minute retrieval of Year 4's black-and-white pixel pictures (1 bit per pixel). New: screens mix red, green and blue light; in a colour picker, pupils set R, G and B from 0 to 255 (one byte each) and predict before they check (255, 255, 0 = yellow; 0, 0, 0 = black). **Colour depth:** 1 bit = 2 colours, 2 bits = 4, 8 bits = 256, 24 bits (3 bytes) ≈ 16.7 million. Pupils colour a 4 × 4 grid using a 2-bit palette (00, 01, 10, 11), swap codes with a partner, then calculate file sizes as width × height × bits per pixel.
- **Check for understanding:** "An icon is 10 × 10 pixels. How many bits does it need in black and white, and how many in full 24-bit colour? Why the difference?" → 100 bits in black and white (1 bit per pixel) and 2,400 bits (300 bytes) in full colour (24 bits per pixel); each colour pixel needs three bytes to say how much red, green and blue it has
- **Differentiation:** support: a 4 × 4 grid with a 2-colour palette first, and a calculator for sizes / stretch: show why a 12-megapixel photo would be about 36 MB uncompressed, and predict why the real file is much smaller (preview of Lesson 5)
- **Materials:** hand lenses, a colour-picker tool on screen (any drawing app), squared paper, coloured pencils in four colours, calculators
- **Joy:** "Mystery mixer" — call out RGB numbers and race to guess the colour before it is revealed

### Lesson 4 — Sound as data: sampling
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how sound is recorded as numbers by sampling, and how the sample rate affects quality and file size." (UK NC KS2 computing — how computers work; CSTA 1B-DA-06; science link: sound)
- **Hook:** Play a voice recording at full quality and then at a very low sample rate: "Same voice, same words — why does one sound like a robot?"
- **Key activity:** Retrieve Year 3 science: sound is a vibration. A microphone turns the vibration into a changing electrical wave; the computer **samples** the height of the wave many times a second and stores each height as a number. Unplugged: pupils draw a wave on graph paper, measure its height at 4 evenly spaced points, then at 16, and join the dots to redraw it — the 16-sample version is much closer to the original. Then record a short sentence in a free audio editor (e.g. Audacity), zoom in until the individual samples appear, and export it at 44,100 and 8,000 samples per second to compare the sound and the file sizes.
- **Check for understanding:** "Music is often recorded at 44,100 samples per second, but old telephone calls used about 8,000. Why does the higher rate sound better, and what does it cost?" → more samples capture the shape of the wave, including high sounds, more accurately; but every sample is a number to store, so the file is much bigger
- **Differentiation:** support: a pre-drawn wave with the sample lines already marked / stretch: calculate how many samples one minute of music needs at 44,100 per second for one channel (2,646,000), and for stereo (twice as many)
- **Materials:** graph paper, rulers, a laptop with a free audio editor and a microphone, headphones, a pre-recorded class sentence
- **Joy:** "Robot voices" — record a class tongue-twister and play it back at ever lower sample rates

### Lesson 5 — Squeezing data: compression, and Unit 1 check
- **Duration:** 45 min
- **Objective:** "By the end, I can compress a picture with run-length encoding, explain the difference between lossless and lossy compression, and show what I know about how data is represented." (UK NC KS2 computing — how computers work; CSTA 1B-DA-06; assessment)
- **Hook:** "This picture takes 64 bits to send. Can you send exactly the same picture with far fewer numbers?"
- **Key activity:** Unplugged **run-length encoding** (RLE): an 8 × 8 picture as a list of 64 bits, then as runs ('3 white, 2 black, 3 white'); pupils encode and decode each other's pictures and count the saving. RLE is **lossless** — the picture comes back exactly. Then **lossy** compression: compare the same photo saved as a high-quality and a very low-quality JPEG and spot what was thrown away (blocky edges, smudged colours); MP3 and streamed music do the same with sound. Finish with a 15-minute unit check: bytes and 8-bit binary, an ASCII message, an image-size calculation and a sampling question.
- **Check for understanding:** "Why is it fine for a holiday photo to use lossy compression, but not a computer program or a bank balance?" → lossy compression throws information away for ever; tiny changes to a photo are hard to see, but changing even one digit of a program or a balance makes it wrong, so they must use lossless compression
- **Differentiation:** support: a picture with long runs of one colour (easy savings) and a decoding frame / stretch: design a picture where RLE makes the file *bigger* (a chessboard) and explain why
- **Materials:** 8 × 8 grids, pencils, two versions of the same photo (high- and low-quality JPEG) on screen with their file sizes, unit-check sheets
- **Joy:** "Squeeze it" league — pairs compete for the biggest saving on the same picture, then try to beat the chessboard

**End-of-unit check:** Pupil shows numbers to 255 as an 8-bit byte, decodes an ASCII message, calculates the size of a small image from its resolution and colour depth, explains how sound is sampled and why the sample rate affects quality and size, and compresses a picture with run-length encoding, explaining when lossy compression is and is not acceptable.

---

## Unit 2 — Game design in Scratch

**Essential question:** How do programmers combine variables, selection and repetition to build a playable game?

**Key vocabulary:** sprite, costume, script, event, loop, forever, repeat until, if/else, condition, variable, level, game state, broadcast, list, custom block (procedure), parameter, clone, debug, iterate, playtest

### Lesson 6 — Game analysis and design
- **Duration:** 40 min
- **Objective:** "By the end, I can analyse what makes a game playable and design my own game on paper." (UK NC KS2 computing — design)
- **Hook:** Play three simple Scratch games. "Which is most fun, and why?"
- **Key activity:** Identify game mechanics (goal, rules, controls, feedback, challenge); design a game on a planning sheet (sprites, controls, scoring, win/lose conditions) with a flowchart for the main loop.
- **Check for understanding:** "What will make your game get harder as the player improves?" → A planned mechanism (e.g. speed increases as the score rises).
- **Differentiation:** support: choose from three game templates to adapt / stretch: design a game with levels.
- **Materials:** Scratch (scratch.mit.edu or offline editor), example games, planning sheets.
- **Joy:** the game-testing arcade.

### Lesson 7 — Movement and controls
- **Duration:** 40 min
- **Objective:** "By the end, I can program smooth keyboard controls and boundaries for a sprite." (UK NC KS2 computing — programming)
- **Hook:** "Why does the sprite glide off the screen and vanish? Let's fix that."
- **Key activity:** Use → modify → create: read a script with 'when key pressed' vs a forever loop with 'if key pressed'; compare smoothness; add edge detection.
- **Check for understanding:** "Why does 'forever + if key pressed' give smoother movement than 'when key pressed'?" → The loop checks the key many times a second instead of waiting for the key-repeat delay.
- **Differentiation:** support: starter project with movement code to modify / stretch: add gravity (y velocity variable) and a jump.
- **Materials:** Scratch, starter projects.
- **Joy:** racing sprites around a maze.

### Lesson 8 — Levels and game states: variables that control the game
- **Duration:** 40 min
- **Objective:** "By the end, I can use a level variable and broadcasts to move a game between states (start, playing, next level, game over) and make it harder as the level rises." (UK NC KS2 computing — variables and selection; CSTA 1B-AP-09)
- **Hook:** "Every good game has a title screen, levels that get harder and a game-over screen. How does one project know which of these it should be showing?"
- **Key activity:** Two-minute retrieval of Year 4: score, timer and lives variables, reset on the green flag. New: a **level** variable and **broadcasts** ('start game', 'next level', 'game over') that switch backdrops and start or stop scripts; use the variable inside other blocks so the game gets harder by itself (enemy speed = 2 + level; timer = 30 − 5 × level); draw the game states as a flowchart with arrows labelled by the broadcast that causes each change, then code it.
- **Check for understanding:** "Your enemy's speed block says 'move (2 + level) steps'. What speed does it move at on level 3, and why is this better than writing a separate script for each level?" → 5 steps; the one script works for every level because the variable changes, so adding level 10 needs no new code
- **Differentiation:** support: a starter project with the broadcasts already made, pupils add the level variable to one block / stretch: store a high score that only changes if beaten, and add a 'boss' level that only appears when level = 5
- **Materials:** Scratch, starter project with title and game-over backdrops, game-state flowchart sheet
- **Joy:** "Can you reach level 5?" — play-test each other's levels as they get harder

### Lesson 9 — Lists: a question bank
- **Duration:** 40 min
- **Objective:** "By the end, I can use a list to store and pick items in a program." (UK NC KS2 computing — data structures)
- **Hook:** "A quiz that asks a different question each time — how?"
- **Key activity:** Create lists of questions and answers; pick a random item number; check the answer; add a 'used' list to avoid repeats (stretch).
- **Check for understanding:** "Why do we store the questions in a list instead of making a separate variable for each?" → A list keeps them together, lets us pick by number, and can grow without changing the code.
- **Differentiation:** support: a quiz starter with the list already created / stretch: avoid repeated questions.
- **Materials:** Scratch, quiz starter project.
- **Joy:** quiz each other with your own question banks.

### Lesson 10 — Custom blocks and clones
- **Duration:** 45 min
- **Objective:** "By the end, I can make a custom block to avoid repeating code and use clones for many enemies." (UK NC KS2 computing — procedures)
- **Hook:** "Your code has the same 12 blocks copied five times. There's a better way."
- **Key activity:** Refactor repeated code into a custom block with a parameter (e.g. 'draw star size'); create clones for falling objects with 'when I start as a clone'; delete clones when they leave the screen.
- **Check for understanding:** "What is the advantage of a custom block over copying code?" → Write it once, use it many times; fixing it in one place fixes it everywhere.
- **Differentiation:** support: custom block without a parameter / stretch: custom block with two parameters.
- **Materials:** Scratch, example projects.
- **Joy:** a screen full of falling clones.

### Lesson 11 — Debugging and playtesting
- **Duration:** 40 min
- **Objective:** "By the end, I can find and fix bugs systematically and improve my game from playtest feedback." (UK NC KS2 computing — debugging)
- **Hook:** "Grace Hopper's team once found a real moth stuck in a computer — recorded as the 'first actual case of bug being found'."
- **Key activity:** Debugging strategies: predict, test one thing at a time, add 'say' blocks to show variable values, compare with the plan. Playtesting: partners play and note bugs and suggestions.
- **Check for understanding:** "Describe one bug you found and the steps you used to fix it." → A specific bug and a systematic process.
- **Differentiation:** support: debugging checklist / stretch: deliberately 'plant' a bug in a partner's copy for them to find.
- **Materials:** Scratch, playtest feedback forms, debugging checklist.
- **Joy:** "Bug hunt" challenge.

### Lesson 12 — Game showcase
- **Duration:** 40 min
- **Objective:** "By the end, I can present my game, explain how the code works and evaluate it against my design." (UK NC KS2 computing — evaluate)
- **Hook:** "The Year 5 Games Arcade is open."
- **Key activity:** Arcade: pupils play each other's games; creators explain one clever piece of code; complete an evaluation (what works, what I'd improve).
- **Check for understanding:** "Explain how your scoring code works, step by step." → A clear explanation referring to the variable, event and condition.
- **Differentiation:** support: explain with an annotated screenshot / stretch: share on a class studio and write instructions for players.
- **Materials:** Scratch, evaluation sheets.
- **Joy:** the arcade.

**End-of-unit check:** Pupil builds a working game with controls, variables, a list or clones, and a custom block; explains how a key script works and debugs a planted error.

---

## Unit 3 — Physical computing with the micro:bit

**Essential question:** How can a tiny computer sense the world and respond to it?

**Key vocabulary:** micro:bit, microcontroller, input, output, sensor, accelerometer, temperature sensor, light sensor, LED, button, radio, MakeCode, flash, download, condition, data

### Lesson 13 — Meet the micro:bit
- **Duration:** 40 min
- **Objective:** "By the end, I can identify the micro:bit's inputs and outputs and download my first program." (UK NC KS2 computing — physical systems)
- **Hook:** "This computer fits in your palm. What can it sense?"
- **Key activity:** Explore the BBC micro:bit (5×5 LED display, buttons A and B, accelerometer, temperature and light sensing, radio); use MakeCode blocks to scroll a name and show icons on button presses; download and test.
- **Check for understanding:** "Is the LED display an input or an output? And button A?" → The display is an output; the button is an input.
- **Differentiation:** support: step-by-step picture guide / stretch: animate a sequence of images.
- **Materials:** micro:bits with battery packs and USB cables, computers with MakeCode (makecode.microbit.org).
- **Joy:** wearable name badges.

### Lesson 14 — Sensing movement: a step counter
- **Duration:** 40 min
- **Objective:** "By the end, I can use the accelerometer and a variable to count steps." (UK NC KS2 computing — sensors and variables)
- **Hook:** "How does a fitness watch know you've taken a step?"
- **Key activity:** Program 'on shake' → change steps by 1 → show number; test by walking; compare with manual counts; discuss accuracy (PE link).
- **Check for understanding:** "Why might your step counter be inaccurate?" → Some shakes aren't steps and some gentle steps aren't detected; the sensor detects movement, not steps exactly.
- **Differentiation:** support: code provided to modify / stretch: reset with button A and show a smiley at a target number.
- **Materials:** micro:bits, battery packs, tape measure (for walking a set distance).
- **Joy:** step-count challenge in the playground.

### Lesson 15 — Temperature and light: a data logger
- **Duration:** 40 min
- **Objective:** "By the end, I can program a micro:bit to show temperature and light readings and use them in a condition." (UK NC KS2 computing — sensors / science link)
- **Hook:** "Which is the warmest place in school? Let the micro:bit find out."
- **Key activity:** Show temperature; use 'if temperature > 25 then show sun icon else show cloud'; measure in different locations and record in a table.
- **Check for understanding:** "Explain what your 'if … else' code does when the temperature is 20 °C." → It checks whether 20 > 25; that's false, so it runs the 'else' part and shows the cloud.
- **Differentiation:** support: one-condition code / stretch: three ranges using nested if/else if.
- **Materials:** micro:bits, recording tables, thermometers for comparison.
- **Joy:** the "warmest place in school" hunt.

### Lesson 16 — Radio: micro:bits talking
- **Duration:** 40 min
- **Objective:** "By the end, I can send and receive messages between micro:bits using radio groups." (UK NC KS2 computing — networks)
- **Hook:** "Can two micro:bits play rock–paper–scissors with each other?"
- **Key activity:** Set a radio group; send numbers or strings on button press; receive and display; build rock–paper–scissors or a quiz buzzer.
- **Check for understanding:** "Why do pairs need to use a different radio group number?" → Otherwise all micro:bits on the same group receive each other's messages.
- **Differentiation:** support: code for sending provided / stretch: send and decode a number that represents a choice.
- **Materials:** micro:bits in pairs, battery packs.
- **Joy:** radio rock–paper–scissors tournament.

### Lesson 17 — Design a useful device
- **Duration:** 45 min
- **Objective:** "By the end, I can design and program a micro:bit device that solves a real problem." (UK NC KS2 computing — design and create)
- **Hook:** "Invent something for a real person: a plant-watering reminder, a door alarm, a reaction-time game…"
- **Key activity:** Plan (problem, inputs, outputs, algorithm flowchart); build and test the program; make a simple case or mount from card.
- **Check for understanding:** "Which input and output does your device use, and why are they the right choice?" → A named input/output linked to the problem.
- **Differentiation:** support: choose from three guided projects / stretch: combine two sensors or radio.
- **Materials:** micro:bits, craft materials, flowchart templates.
- **Joy:** inventors' workshop.

### Lesson 18 — Invention fair
- **Duration:** 40 min
- **Objective:** "By the end, I can demonstrate my device and explain its algorithm." (UK NC KS2 computing — evaluate)
- **Hook:** "Dragons' Den: pitch your invention."
- **Key activity:** Pupils demonstrate devices; explain the flowchart and code; peers test and suggest improvements.
- **Check for understanding:** "Walk me through your algorithm from start to finish." → A clear sequence including inputs, conditions and outputs.
- **Differentiation:** support: pitch with a partner using the flowchart / stretch: explain one limitation and how version 2 would fix it.
- **Materials:** devices, flowcharts, feedback cards.
- **Joy:** the invention fair.

**End-of-unit check:** Pupil programs a micro:bit using at least one sensor input, a variable and a condition, and explains the device's algorithm with a flowchart.

---

## Unit 4 — Spreadsheet modelling: what if?

**Essential question:** How can a spreadsheet model help us test ideas and make decisions before we try them for real?

**Key vocabulary:** model, input cell, output cell, formula, function, AVERAGE, relative reference, absolute reference ($), fill down, what if?, trial and improvement, scatter graph, correlation, cause, misleading chart, simulation, RANDBETWEEN

### Lesson 19 — Formulas that copy correctly: absolute references
- **Duration:** 40 min
- **Objective:** "By the end, I can explain why a formula changes when it is copied, and use an absolute reference ($) to lock a cell that must not change." (UK NC KS2 computing — use software to accomplish goals; CSTA 1B-DA-06; maths link)
- **Hook:** "I copied my formula down the column and suddenly every answer is zero. The spreadsheet isn't broken — so what happened?"
- **Key activity:** Three-minute retrieval of Year 4: cell references, SUM, MAX and MIN on a ready-made sheet. New: AVERAGE; what fill-down does to a formula (=B2*C2 becomes =B3*C3 — a **relative** reference); build a currency converter where every price uses one exchange-rate cell; watch =B2*C1 break when filled down (C1 becomes C2, which is empty) and fix it with =B2*$C$1 (an **absolute** reference); then change the rate once and see every row update.
- **Check for understanding:** "You fill =B2*C1 down the column and row 3 shows 0. Explain why, and how =B2*$C$1 fixes it." → when copied down, C1 turns into C2, an empty cell, so the answer is 0; the $ signs lock the reference to C1, so every row uses the same exchange rate
- **Differentiation:** support: the rate cell highlighted in colour and formulas with blanks to complete / stretch: add a second locked cell for a 20% discount and write one formula that uses both
- **Materials:** spreadsheet software (e.g. Google Sheets, Excel or LibreOffice Calc), a price list in the local currency, a real exchange rate for a neighbouring country's currency
- **Joy:** "Holiday shopping" — convert a wish list into three currencies by changing just one cell

### Lesson 20 — What if? Building a model
- **Duration:** 45 min
- **Objective:** "By the end, I can build a spreadsheet model with input cells and formula cells, and use it to answer 'what if?' questions." (UK NC KS2 computing — use software to accomplish goals; CSTA 1B-DA-06; life-skills link: money)
- **Hook:** "Our class is running a cake sale for charity. How many cakes must we sell, and at what price, to raise 100?"
- **Key activity:** I do: a model with **inputs** (price per cake, number sold, cost of ingredients) coloured yellow and **outputs** (money taken =B1*B2, profit =B4−B3) coloured green. We do: change one input at a time and record what happens; use **trial and improvement** to find the price that reaches the target. You do: groups build their own model for a different event (a school disco or a plant sale), then swap and test each other's models with 'what if?' cards ('What if it rains and only half as many people come?').
- **Check for understanding:** "In the model, 40 cakes at 2.50 with ingredient costs of 60 gives a profit of 40. Which cells are inputs, which are formulas, and what is the profit if the price becomes 3.00? Show how you know." → price, number sold and costs are inputs; money taken and profit are formulas; 40 × 3.00 = 120, and 120 − 60 = 60 profit
- **Differentiation:** support: a partly built model with the formulas already entered, changing inputs only / stretch: add a 'break-even' row that shows how many cakes must be sold to cover the costs (60 ÷ price), and explain why it must be rounded up
- **Materials:** spreadsheet software, a cake-sale starter model, 'what if?' cards, calculators for checking
- **Joy:** "Model market" — groups pitch their event plans using live 'what if?' changes on screen

### Lesson 21 — Scatter graphs and charts that tell the truth
- **Duration:** 40 min
- **Objective:** "By the end, I can make a scatter graph to test whether two things are related, explain why a relationship does not prove one causes the other, and spot a misleading chart." (UK NC KS2 computing — present data; CSTA 1B-DA-07; maths link: statistics)
- **Hook:** "Do people with longer arms have longer legs? Do towns that sell more ice cream have more sunburn? Let's ask the data."
- **Key activity:** One-minute retrieval of Year 4: bar charts for categories, line graphs for change over time. New: pupils measure arm span and height (in pairs, sensitively; children may choose not to be measured and use a sample data set instead), enter the class data and make a **scatter graph**; describe the pattern (as one goes up, so does the other). **Correlation is not cause:** ice-cream sales and sunburn rise together because both are caused by hot, sunny weather. Then fix three **misleading charts**: a y-axis starting at 90, a 3D pie that makes one slice look huge, and a chart with no labels.
- **Check for understanding:** "A chart shows that pupils who own more books get higher reading scores. Does this prove that buying books makes you a better reader? Explain." → no; the two go together (a correlation), but something else could cause both, such as how much time the family spends reading; you would need a fair test to show cause
- **Differentiation:** support: a prepared data set and step-by-step chart instructions / stretch: add a line of best fit and use it to predict the height of someone with a 150 cm arm span, explaining how confident they are
- **Materials:** spreadsheet software, tape measures, a sample arm-span data set, three printed misleading charts
- **Joy:** "Chart crimes court" — pupils prosecute and fix the worst misleading chart

### Lesson 22 — Simulation: rolling 1,000 dice
- **Duration:** 45 min
- **Objective:** "By the end, I can use a spreadsheet to simulate a chance event many times and explain why more trials give a result closer to the expected one." (UK NC KS2 computing — use software; CSTA 1B-DA-07; maths link: probability)
- **Hook:** "Roll two dice and add them. Which total wins most often? Place your bets."
- **Key activity:** Each child first rolls two real dice 20 times and tallies the totals; the class notices results disagree. Then the spreadsheet: =RANDBETWEEN(1,6) in two columns and their sum in a third, filled down 1,000 rows; filter to each total and read the count; chart the results. Compare with the maths: 36 possible outcomes, 6 of which make 7, so 7 should come up about 1 in 6 times (about 167 in 1,000). Discuss how scientists and weather forecasters use simulations to test things they cannot try for real.
- **Check for understanding:** "Group A rolled 20 times and got no 7s. The spreadsheet rolled 1,000 times and got 171. Which is closer to the truth about two dice, and why?" → the 1,000 rolls; with only a few trials, luck can make results very uneven, but over many trials the results settle close to the expected 1 in 6 (about 167)
- **Differentiation:** support: a single-die simulation (six outcomes, each about 1 in 6) first / stretch: explain why 2 and 12 are the rarest totals by listing the outcomes, and predict how the chart would change for three dice
- **Materials:** two dice per child, tally sheets, spreadsheet software, a starter sheet with column headings
- **Joy:** "Dice derby" — each pupil backs a total and watches the 1,000-roll race refresh live

### Lesson 23 — Unit 4 check: the café model
- **Duration:** 40 min
- **Objective:** "By the end, I can build and use a spreadsheet model with absolute references, answer 'what if?' questions and choose an honest chart." (UK NC KS2 computing — assessment; CSTA 1B-DA-06, 1B-DA-07)
- **Hook:** "The school café wants to raise its prices. Will it make more money — or lose customers? You're the advisors."
- **Key activity:** Practical task on a café sheet (items, cost to make, price, number sold): write profit formulas and fill them down; add a single 'price rise %' input cell used with an absolute reference; test 5% and 10% rises; answer 'what if?' questions; choose and label a chart for the owner and explain one way a chart could mislead her.
- **Check for understanding:** "The café raises every price by 10%. Which single cell do you change in your model, and why does every profit update?" → the 'price rise %' input cell; every price formula uses it through an absolute reference ($), so changing it once recalculates every row
- **Differentiation:** support: step prompts and the price formulas already written / stretch: add an input for 'customers lost for every 10% rise' and find the price rise that gives the most profit
- **Materials:** café sales spreadsheet, task sheet
- **Joy:** café 'business advisor' certificates

**End-of-unit check:** Pupil builds a model with clearly marked input and formula cells, uses relative and absolute references correctly, answers 'what if?' questions, makes a scatter graph and explains why correlation is not cause, and explains why a simulation with many trials is more trustworthy than one with few.

---

## Unit 5 — First steps in Python

**Essential question:** How is writing code in text different from blocks — and what can it let us do?

**Key vocabulary:** Python, text-based language, syntax, statement, indentation, function, argument, import, library, turtle, loop, for, range, variable, string, integer, input, print, if, elif, else, comparison, error message, bug

### Lesson 24 — From blocks to text
- **Duration:** 40 min
- **Objective:** "By the end, I can run a Python program and explain how it compares with Scratch blocks." (UK NC KS2 computing — programming)
- **Hook:** "Most professional programmers type code. Let's see Scratch blocks turn into Python."
- **Key activity:** Compare a Scratch script with the equivalent Python; use print() to display messages; run code in a beginner-friendly editor (e.g. Thonny, Trinket or a school-approved online Python editor).
- **Check for understanding:** "Why does Python care about exact spelling and brackets when Scratch doesn't?" → Blocks can only snap together correctly; in text, the computer must read every character exactly (syntax).
- **Differentiation:** support: copy and run a provided program, then change one word / stretch: print a pattern of text using several print statements.
- **Materials:** computers with a Python editor, Scratch–Python comparison cards.
- **Joy:** "Hello, world!" in many languages printed by Python.

### Lesson 25 — Turtle graphics: sequence
- **Duration:** 40 min
- **Objective:** "By the end, I can use turtle commands to draw shapes in Python." (UK NC KS2 computing — programming)
- **Hook:** "A robot turtle with a pen. Where will it go?"
- **Key activity:** `import turtle`; `forward()`, `right()`, `left()`, `penup()`, `pendown()`, `color()`; draw a square, a triangle, and a house; predict before running.
- **Check for understanding:** "To draw an equilateral triangle, why do you turn 120°, not 60°?" → The turtle turns through the exterior angle; 180° − 60° = 120° (maths link: angles).
- **Differentiation:** support: a partly written program to complete / stretch: draw a regular hexagon and explain the angle.
- **Materials:** Python editor with turtle, squared paper for planning.
- **Joy:** "Turtle art gallery".

### Lesson 26 — Loops: for and range
- **Duration:** 40 min
- **Objective:** "By the end, I can use a for loop to repeat code and draw regular polygons." (UK NC KS2 computing — repetition)
- **Hook:** "Your square needs 8 lines of code. Can you do it in 3?"
- **Key activity:** `for i in range(4):` with indented body; draw polygons; discover the rule: turn = 360 ÷ number of sides; nested loops for patterns (spirographs).
- **Check for understanding:** "Why must the lines inside the loop be indented?" → Indentation tells Python which lines belong to the loop.
- **Differentiation:** support: loop template with blanks / stretch: nested loops to draw a flower of squares.
- **Materials:** Python editor, polygon angle chart.
- **Joy:** spirograph patterns.

### Lesson 27 — Variables and input
- **Duration:** 40 min
- **Objective:** "By the end, I can use variables and input() to make an interactive program." (UK NC KS2 computing — variables)
- **Hook:** "Let the user choose how many sides the shape has."
- **Key activity:** `sides = int(input("How many sides? "))`; use the variable in `range(sides)` and `360 / sides`; greetings programs with string variables.
- **Check for understanding:** "Why do we need int() around input() when asking for a number?" → input() gives text (a string); int() converts it to a whole number so we can do maths.
- **Differentiation:** support: a program with the input line written / stretch: also ask for colour and size.
- **Materials:** Python editor.
- **Joy:** "Shape machine" — classmates try each other's programs.

### Lesson 28 — Selection: if, elif, else
- **Duration:** 40 min
- **Objective:** "By the end, I can use if/elif/else to make a program respond to different inputs." (UK NC KS2 computing — selection)
- **Hook:** "Build a program that answers back."
- **Key activity:** Comparison operators (==, >, <); a quiz question with feedback; a number-guessing game with 'too high/too low' using a while loop (stretch).
- **Check for understanding:** "What is the difference between = and == in Python?" → = stores a value in a variable; == checks whether two values are equal.
- **Differentiation:** support: fill in conditions in a provided program / stretch: a guessing game with a while loop and a counter.
- **Materials:** Python editor, starter programs.
- **Joy:** play each other's guessing games.

### Lesson 29 — Reading error messages
- **Duration:** 40 min
- **Objective:** "By the end, I can read Python error messages and fix syntax and logic errors." (UK NC KS2 computing — debugging)
- **Hook:** "Python says 'SyntaxError'. It's trying to help. What is it telling us?"
- **Key activity:** Debugging stations with broken programs: missing colon, wrong indentation, misspelled function, string vs integer error, a logic error (wrong angle); pupils record the error, the cause and the fix.
- **Check for understanding:** "What's the difference between a syntax error and a logic error?" → A syntax error breaks the language rules so the program won't run; a logic error runs but does the wrong thing.
- **Differentiation:** support: error-message decoder card / stretch: write a buggy program for a partner with one syntax and one logic error.
- **Materials:** broken programs, decoder cards.
- **Joy:** "Bug-busters" station race.

### Lesson 30 — Project: a Python art generator or quiz
- **Duration:** 45 min
- **Objective:** "By the end, I can plan and write a Python program combining loops, variables, input and selection." (UK NC KS2 computing — design and create)
- **Hook:** "Your choice: an art generator that draws something different each time, or a quiz with a score."
- **Key activity:** Plan with pseudocode; write and test in stages; use `random` (e.g. `random.randint`) for variety (stretch).
- **Check for understanding:** "Show me where your program uses a loop, a variable and a condition." → Pointing to each in their own code with an explanation.
- **Differentiation:** support: a partly built project to extend / stretch: add random choices and a function (def).
- **Materials:** Python editor, pseudocode planning sheets.
- **Joy:** project build time.

### Lesson 31 — Code review and showcase
- **Duration:** 40 min
- **Objective:** "By the end, I can explain my code to others and give helpful feedback on theirs." (UK NC KS2 computing — evaluate)
- **Hook:** "Professional programmers review each other's code. Let's try."
- **Key activity:** Pairs review each other's programs with a checklist (does it run, is it readable, are there comments, suggestions); pupils add comments (#) and improve one thing; showcase.
- **Check for understanding:** "Why do programmers add comments to code?" → To explain what the code does so others (and they themselves later) can understand it.
- **Differentiation:** support: review with a checklist and sentence stems / stretch: suggest a refactor that shortens someone's code.
- **Materials:** Python editor, review checklists.
- **Joy:** the Python showcase.

**End-of-unit check:** Pupil writes a working Python program that uses a loop, a variable, input and if/else; reads an error message and fixes the bug; explains their code with comments.

---

## Unit 6 — Digital citizenship: truth, AI and privacy

**Essential question:** How can I be a wise, safe and kind digital citizen when not everything online is true or private?

**Key vocabulary:** information, opinion, advertising, sponsored, influencer, in-app purchase, persuasive design, source, bias, artificial intelligence (AI), algorithm, training data, privacy, personal information, cookie, location data, data profile, online reputation, screen time, wellbeing

### Lesson 32 — Who made this and why? Adverts, influencers and sponsored content
- **Duration:** 40 min
- **Objective:** "By the end, I can recognise when online content is trying to sell or persuade, including influencer posts and in-game offers, and explain the techniques used." (UK NC KS2 computing — digital literacy)
- **Hook:** "A favourite video-maker says she 'just loves' these trainers. Is she telling you her opinion — or being paid?"
- **Key activity:** Quick retrieval of Year 4's fact-checking strategies (lateral reading, checking the source). New: sort examples into information, opinion and advertising; spot labels such as 'ad', 'sponsored' and 'paid partnership'; persuasive techniques (limited-time offers, 'everyone has one', free-to-play games with loot boxes and in-app purchases); how targeted adverts use your data.
- **Check for understanding:** "Why do some countries require influencers to label paid posts with 'ad' or 'sponsored', and how does knowing change the way you read the post?" → Viewers have a right to know when someone is being paid to promote something; knowing it's an advert, you judge the claims more carefully because the person benefits if you buy.
- **Differentiation:** support: an 'information, opinion or advert?' sorting mat with picture examples / stretch: explain why free games and apps still make money, and what the player 'pays' with.
- **Materials:** teacher-curated examples of posts, adverts and game offers (screenshots), sorting mats.
- **Joy:** "Advert detectives" — design a spoof advert using every trick, then 'unmask' a partner's.

### Lesson 33 — What is AI and how does it learn?
- **Duration:** 40 min
- **Objective:** "By the end, I can explain in simple terms how AI systems learn from data and why they can make mistakes." (UK NC KS2 computing — digital literacy)
- **Hook:** "How does a phone recognise a cat in a photo? Nobody wrote 'cat' rules."
- **Key activity:** Retrieve Year 4's lesson on AI chatbots making mistakes. New: unplugged, train a 'human classifier' with example cards (e.g. apples vs not-apples) and test it on tricky cases; discuss how limited training data leads to mistakes and unfairness. (In Year 6 pupils train and test their own model on a computer.)
- **Check for understanding:** "Why might an AI trained only on photos of red apples fail to recognise a green apple?" → It learns from the examples it's given; if the data doesn't include green apples, it hasn't learned that they're apples too.
- **Differentiation:** support: guided card-sort training game / stretch: suggest how to make training data fairer and more complete.
- **Materials:** picture cards, a teacher-led machine-learning demonstration tool, discussion prompts.
- **Joy:** "Train the robot" game.

### Lesson 34 — Your data trail: cookies, location and online reputation
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how apps and websites collect data about me (cookies, location, what I click), how that data is used, and how to limit it." (UK NC KS2 computing — use technology safely, respectfully and responsibly; CSTA 1B-NI-05)
- **Hook:** "You searched for football boots once. Now football boot adverts follow you everywhere. How did the internet find out?"
- **Key activity:** Two-minute retrieval of Year 4: digital footprint, passphrases and two-step verification. New: **cookies** (small files a website saves so it recognises you) and cookie banners — what 'accept all' vs 'reject' means; **location data** — phones can store where a photo was taken inside the photo file; how clicks, likes and searches build a **profile** used to target adverts (link to Lesson 32) and recommendations; **online reputation** — what a stranger, a future school or an employer might find. Pupils audit a fictional child's online trail and give advice; practise choosing 'reject' or 'necessary only' on a mock cookie banner and turning off camera location with a trusted adult.
- **Check for understanding:** "A child posts a photo of their new bike taken in their front garden. Why could that be risky even if the photo shows nothing personal, and what could they do instead?" → the photo file may contain the location where it was taken (and the house may be recognisable), which could show where they live; turn off location for the camera, check the background, and share only with people they know, with a trusted adult's help
- **Differentiation:** support: picture cards showing where data is collected (search, map, game, camera) / stretch: explain why free apps collect data, and argue whether 'reject all' should be the default for children
- **Materials:** fictional online-trail case study, a printed mock cookie banner, a teacher-led demonstration of photo location settings. Safety: no real accounts or personal devices; parents are told about the lesson in advance
- **Joy:** "Data detectives" — reconstruct a fictional child's day from their data trail, then 'clean it up'

### Lesson 35 — Healthy tech and year review
- **Duration:** 40 min
- **Objective:** "By the end, I can make a personal plan for healthy, kind and safe technology use and reflect on my year in computing." (UK NC KS2 computing — online safety / wellbeing)
- **Hook:** "Some apps are designed to keep you scrolling. Who's in control — you or the app?"
- **Key activity:** Discuss persuasive design (autoplay, streaks, notifications); how to report and get help (trusted adults, reporting tools); write a personal "tech plan"; year review quiz across all units.
- **Check for understanding:** "Name one design feature that keeps people on an app and one strategy to stay in control." → e.g. autoplay / turning off notifications or setting time limits.
- **Differentiation:** support: tech-plan template / stretch: design a feature for an app that helps users take healthy breaks.
- **Materials:** tech-plan templates, review quiz.
- **Joy:** "Digital citizen" certificates.

**End-of-unit check:** Pupil identifies advertising and sponsored content and explains one persuasive technique, explains how AI learns from data and why it can be wrong, and describes how data trails are collected and limited and how to get help.

## Books & resources

- ***Hello Ruby: Adventures in Coding*** by Linda Liukas — a playful introduction to computational thinking, good for support pupils and unplugged activities; its sequel ***Hello Ruby: Journey Inside the Computer*** suits Unit 1.
- ***Coding Projects in Python*** (DK) by Carol Vorderman and others — clear, visual beginner Python projects that match Unit 5.
- ***Coding Games in Scratch*** by Jon Woodcock (DK) — step-by-step game projects that extend Unit 2.
- ***Ada Lovelace, Poet of Science*** by Diane Stanley — picture-book biography of the first person to publish an algorithm for a computing machine.
- ***Grace Hopper: Queen of Computer Code*** by Laurie Wallmark — picture-book biography of the computing pioneer.
- **Scratch** (scratch.mit.edu), **MakeCode for micro:bit** (makecode.microbit.org), **Python** in a beginner editor (e.g. Thonny), **CS Unplugged** (csunplugged.org) — free, high-quality tools and activities.
- **Hardware** — BBC micro:bits with battery packs; computers or tablets; spreadsheet software.

## End-of-year mastery checks

1. **Computer systems** — names the parts of a computer system and explains the difference between memory and storage.
2. **Data representation** — shows numbers to 255 as a byte, explains how text (ASCII/Unicode), colour images (RGB, colour depth) and sound (sampling) are stored, and explains lossless vs lossy compression.
3. **Scratch** — builds a game using variables, selection, repetition, lists or clones and a custom block.
4. **Physical computing** — programs a micro:bit using sensors, variables and conditions to solve a problem.
5. **Python** — writes a short program with a loop, variable, input and if/else, and fixes errors by reading error messages.
6. **Data** — builds a spreadsheet model with input cells and absolute references, answers 'what if?' questions, and makes and critiques charts (scatter graphs; correlation vs cause).
7. **Digital literacy** — recognises advertising and sponsored content, explains how AI learns from data and its limits.
8. **Safety** — explains how cookies, location data and clicks build a data trail, limits it, and knows how to report concerns and get help.

## Teacher guidance

**Common misconceptions to watch for**
- *"Computers store words and pictures, not numbers."* Everything is stored as binary numbers; codes decide what they mean.
- *"A kilobyte is exactly 1,000 bytes / exactly 1,024 bytes."* Both are used; be honest that there are two conventions.
- *"Compression is always fine."* Lossy compression throws data away for ever; programs and numbers need lossless.
- *"If two things rise together, one causes the other."* Correlation is not cause.
- *"Copying a formula keeps it the same."* Relative references move; use $ to lock a cell.
- *"If someone I follow recommends it, it's their honest opinion."* It may be a paid advert.
- *"Computers are clever; they understand what I mean."* Computers follow instructions exactly — syntax matters.
- *"= means equals."* In Python, = assigns; == compares.
- *"A variable is the thing itself."* It's a named store whose value can change.
- *"If it's online (or an AI said it), it's true."*
- *"Deleting a post removes it forever."* Copies and screenshots may remain.
- *"Bugs mean I'm bad at coding."* Debugging is a normal and essential part of programming.

**How to teach it well**
- Use → modify → create: pupils should read and change working code before writing their own.
- Pair programming (driver and navigator, swapping regularly) builds talk and reduces frustration.
- Plan on paper first (flowcharts, pseudocode); code in small steps; test often.
- Keep online safety practical and positive, and follow your school's safeguarding procedures; make sure every pupil knows how to report a concern.
- AI tools: use teacher-led demonstrations; do not require pupils to create accounts on services with age restrictions.

**Vertical connections**
- *From Year 4:* Scratch selection and variables (score, timer, lives), input–process–output, memory vs storage, binary to 31 and black-and-white pixels, first spreadsheets (SUM, MAX/MIN, sorting, bar and line charts), searching and fact-checking, AI chatbots, digital footprint, phishing and two-step verification. *From Year 3:* networks, packets and URLs. Year 5 retrieves each briefly and does not re-teach it.
- *Into Year 6:* Python strings, while loops, nested loops, lists and functions, larger text-based projects, IF/COUNTIF, databases and queries and CSV analysis (building on Year 5's models), IP addresses (one byte per number — Year 5 Lesson 1), DNS, encryption and cybersecurity, training a machine-learning model and AI ethics.
- *Across subjects:* maths (angles in turtle graphics, averages, scatter graphs and probability in spreadsheets, coordinates), science (sound and sampling, sensors, data logging, pulse data), art (turtle art, digital design), English (evaluating sources), life skills (wellbeing and online behaviour).

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
  programs** (turtle graphics, loops, variables, input and selection). They look **inside the
  computer**: its parts, and how numbers, text and pictures are all stored in **binary**. (How the
  internet works was taught in Year 4 and is deepened in Year 6, with encryption, so it is not
  repeated here.)
- **Information technology:** spreadsheets move on to **formulas, sorting, filtering and charts** to
  answer real questions with data (linked to science and maths).
- **Digital literacy and online safety:** spotting **advertising, influencer and sponsored content**
  (building on Year 4's fact-checking), understanding what **AI** tools can and cannot do, protecting
  **privacy**, and building healthy technology habits.

Every programming unit follows **use → modify → create**: pupils read and run working code, change
it, then design their own, with **debugging** taught as a skill, not a failure. Pupils plan
algorithms on paper (flowcharts and pseudocode) before coding.

**What this year assumes (from Year 4):** Scratch with sequence, repetition, selection (if/else) and
simple variables; how networks, packets and the web work; a first spreadsheet with SUM and a chart;
searching effectively and checking whether information is true; AI chatbots' limits; the idea of a
digital footprint and strong passwords.

**What Year 6 relies on:** writing short Python programs with loops, variables, input and if/else;
using sensors and outputs in physical computing; understanding binary and how computers store data;
using spreadsheet formulas; and critically evaluating online information and persuasive content — ready
for deeper Python (strings, while loops, lists, functions), data processing, networks and security,
and larger projects.

## Time budget

36 weeks × 1 lesson = 36 slots; 35 lessons planned, 1 spare for Safer Internet Day or a coding club showcase.

| Unit | Title | Strand | Term | Lessons |
|---|---|---|---|---|
| 1 | Inside the computer: binary and data | Computer science (systems and data) | 1 | 5 (1–5) |
| 2 | Game design in Scratch | Computer science (programming) | 1 | 7 (6–12) |
| 3 | Physical computing with the micro:bit | Computer science | 2 | 6 (13–18) |
| 4 | Data detectives: spreadsheets | Information technology | 2 | 5 (19–23) |
| 5 | First steps in Python | Computer science (programming) | 3 | 8 (24–31) |
| 6 | Digital citizenship: truth, AI and privacy | Digital literacy | 3 | 4 (32–35) |
| | **Total** | | | **35** |

---

## Unit 1 — Inside the computer: binary and data

**Essential question:** How can a machine that only understands 'on' and 'off' store numbers, words, pictures and music?

**Key vocabulary:** hardware, processor (CPU), memory, storage, input, output, bit, byte, binary, place value, denary (decimal), character code, ASCII, Unicode, pixel, resolution, RGB, file size, compression

### Lesson 1 — What's inside a computer?
- **Duration:** 40 min
- **Objective:** "By the end, I can name the main parts of a computer system and explain what each one does." (UK NC KS2 computing — understand computer systems)
- **Hook:** An old computer or phone opened up safely by the teacher (or a photo of one): "Where does your game actually 'live' when you switch it off?"
- **Key activity:** Identify input and output devices, the processor (CPU — follows instructions very fast), memory (RAM — the fast 'desk' used while working, emptied when switched off) and storage (keeps files when switched off); unplugged role-play of a computer: an 'input' pupil passes instructions to the 'CPU' pupil, who uses the 'memory' whiteboard and sends results to the 'output' pupil.
- **Check for understanding:** "Your unsaved drawing disappears when the power cuts out, but your saved one doesn't. Why?" → Unsaved work is only in memory (RAM), which is emptied when the power goes; saved work is written to storage, which keeps it without power.
- **Differentiation:** support: a labelled diagram of a computer system to complete / stretch: explain why a phone with more memory can run more apps at once.
- **Materials:** an old computer or phone for teacher demonstration (unplugged, battery removed), picture cards of components, role-play cards. Safety: only the teacher handles opened devices.
- **Joy:** the "human computer" role-play.

### Lesson 2 — Binary: counting with on and off
- **Duration:** 40 min
- **Objective:** "By the end, I can convert numbers between binary and denary up to 31 and explain why computers use binary." (UK NC KS2 computing — how computers work; maths link: place value)
- **Hook:** "Five cards with dots on them. With them, I can show any number from 0 to 31 — using only face up or face down."
- **Key activity:** CS Unplugged binary cards (16, 8, 4, 2, 1 dots): pupils show numbers by turning cards over (1 = face up, 0 = face down); link to place value (each place is worth double the one to its right); convert both ways; explain that a computer's switches are either on or off — two states, so base 2.
- **Check for understanding:** "What number is 10110 in binary, and how do you know?" → 22: 16 + 4 + 2 (the places worth 16, 4 and 2 are 'on').
- **Differentiation:** support: cards with dots to count / stretch: work out the largest number 8 bits (one byte) can show (255) and explain why.
- **Materials:** binary cards (printed), mini-whiteboards, place-value chart.
- **Joy:** "Binary birthdays" — show your age and birthday in binary with the cards.

### Lesson 3 — Words as numbers: character codes
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how text is stored as numbers using a character code and decode a binary message." (UK NC KS2 computing — how computers work)
- **Hook:** "When you type the letter A, the computer stores a number. Which one — and how can it store every alphabet on Earth, and emojis too?"
- **Key activity:** Letters as numbers (a simple 1–26 code, then ASCII, where 'A' is 65); decode a short message written in binary; learn that Unicode extends this to well over 100,000 characters, covering scripts from Arabic and Chinese to Devanagari, plus emojis; pupils encode their initials.
- **Check for understanding:** "Why did computers need Unicode as well as the original ASCII code?" → ASCII only had room for 128 characters, enough for basic English but not for the world's writing systems; Unicode gives a number to characters from almost every script (and emojis).
- **Differentiation:** support: a 1–26 letter code before binary / stretch: explain why capital and lowercase letters need different codes.
- **Materials:** ASCII table (letters), binary cards, secret messages.
- **Joy:** "Binary bracelets" — beads spelling your initials (two colours for 0 and 1).

### Lesson 4 — Pictures as numbers: pixels and resolution
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how images are stored as pixels with number codes for colour, and how resolution affects quality and file size." (UK NC KS2 computing — how computers work / digital media)
- **Hook:** Zoom right into a photo until it becomes squares: "Every picture on a screen is a grid of numbers. Let's prove it."
- **Key activity:** Unplugged pixel painting: colour a grid from a black-and-white code (1 = black, 0 = white), then a run-length code (e.g. '3 white, 2 black'); screens mix red, green and blue light (RGB) — each colour stored as three numbers; compare the same image at low and high resolution and their file sizes.
- **Check for understanding:** "Why does a photo with more pixels usually look sharper but take up more storage?" → More pixels show finer detail, but each pixel is stored as numbers, so more pixels means more data.
- **Differentiation:** support: an 8 × 8 black-and-white grid / stretch: use run-length coding and explain how it makes the file smaller (compression).
- **Materials:** squared paper grids, pixel codes, a zoomable photo on screen.
- **Joy:** "Pixel art decoder" — reveal a hidden picture from the numbers.

### Lesson 5 — Unit 1 check: everything is data
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how numbers, text and images are all stored in binary and describe the parts of a computer system." (UK NC KS2 computing — assessment)
- **Hook:** "Send a secret picture-and-word message to another group using only 0s and 1s."
- **Key activity:** Groups encode a short word and a small pixel image in binary and pass it to another group to decode; short quiz on components, binary conversion and character codes; link forward to how this data travels across networks (Year 4 and Year 6).
- **Check for understanding:** "If the whole message is just 0s and 1s, how does the computer know which bits are a letter and which are part of a picture?" → The file or program says how to interpret the bits — the same bits could mean a number, a letter or a colour depending on the agreed code.
- **Differentiation:** support: a partly encoded message to complete / stretch: estimate how many bits your message needs and suggest how to shrink it.
- **Materials:** binary cards, grids, ASCII tables, quiz sheets.
- **Joy:** the code-and-decode message swap.

**End-of-unit check:** Pupil names the parts of a computer system and their jobs, converts between binary and denary up to 31, decodes a binary text message, and explains how images are stored as pixels and why resolution affects file size.

---

## Unit 2 — Game design in Scratch

**Essential question:** How do programmers combine variables, selection and repetition to build a playable game?

**Key vocabulary:** sprite, costume, script, event, loop, forever, repeat until, if/else, condition, variable, score, timer, list, custom block (procedure), parameter, clone, debug, iterate, playtest

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

### Lesson 8 — Variables: score, lives and timer
- **Duration:** 40 min
- **Objective:** "By the end, I can use variables to track score, lives and time, and reset them at the start." (UK NC KS2 computing — variables)
- **Hook:** "A game where the score never resets — what's wrong?"
- **Key activity:** Create variables; change on events (collisions); reset on green flag; a countdown timer with 'repeat until timer = 0'; game over when lives = 0.
- **Check for understanding:** "Why must variables be reset when the game starts?" → Otherwise they keep the values from the last game.
- **Differentiation:** support: variable blocks provided in the starter / stretch: store a high score that only changes if beaten.
- **Materials:** Scratch, starter projects.
- **Joy:** "Beat the high score".

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

## Unit 4 — Data detectives: spreadsheets

**Essential question:** How can a spreadsheet help us answer questions with data?

**Key vocabulary:** spreadsheet, cell, cell reference, row, column, formula, function, SUM, AVERAGE, MAX, MIN, sort, filter, chart, data, record, field, question, conclusion

### Lesson 19 — Formulas and cell references
- **Duration:** 40 min
- **Objective:** "By the end, I can write formulas using cell references so they update automatically." (UK NC KS2 computing — data)
- **Hook:** "Change one number and watch the whole spreadsheet recalculate. Magic — or formulas?"
- **Key activity:** Enter data (e.g. class pulse readings from science); write =B2+C2, =B2*2; then functions =SUM(B2:B10), =AVERAGE(), =MAX(), =MIN(); copy formulas down with the fill handle.
- **Check for understanding:** "Why is =SUM(B2:B10) better than typing the total yourself?" → It updates automatically if any value changes and avoids calculation errors.
- **Differentiation:** support: formulas with the cell references highlighted / stretch: calculate a percentage of a total with a formula.
- **Materials:** spreadsheet software (e.g. Google Sheets, Excel or LibreOffice Calc), data files.
- **Joy:** "Break the spreadsheet" — change inputs and watch results update.

### Lesson 20 — Sorting and filtering
- **Duration:** 40 min
- **Objective:** "By the end, I can sort and filter data to find answers quickly." (UK NC KS2 computing — data)
- **Hook:** "A table of 100 animals. Which is the fastest? Which live in Africa and weigh more than 100 kg?"
- **Key activity:** Sort by a column (ascending/descending); filter by conditions; answer a set of questions; discuss keeping rows together when sorting.
- **Check for understanding:** "What goes wrong if you sort only one column instead of the whole table?" → The rows get mixed up, so data no longer matches the right record.
- **Differentiation:** support: questions answered by a single sort / stretch: questions needing two filter conditions.
- **Materials:** animal data spreadsheet (teacher-prepared from reliable sources).
- **Joy:** "Data race" question challenge.

### Lesson 21 — Choosing the right chart
- **Duration:** 40 min
- **Objective:** "By the end, I can create a chart that suits the data and the question." (UK NC KS2 computing — data / maths link)
- **Hook:** "Same data, three charts. Which tells the story best?"
- **Key activity:** Create bar, line and pie charts from data; choose the right one for the question (comparison, change over time, parts of a whole); label axes and titles.
- **Check for understanding:** "Why is a line chart right for temperature over a week but wrong for favourite fruits?" → Temperature changes continuously over time; fruits are separate categories.
- **Differentiation:** support: chart wizard with guidance / stretch: spot and correct a misleading chart (e.g. axis not starting at zero).
- **Materials:** spreadsheet software, data sets.
- **Joy:** "Chart makeover" of a bad chart.

### Lesson 22 — Investigation: answering a real question
- **Duration:** 45 min
- **Objective:** "By the end, I can collect, organise and analyse data to answer a question." (UK NC KS2 computing — data)
- **Hook:** "Do Year 5s get enough sleep? Does screen time before bed make a difference?" (Or a question from science or geography fieldwork.)
- **Key activity:** Groups design a data table, enter survey or fieldwork data, use formulas and charts, and write a conclusion.
- **Check for understanding:** "What does your data show, and how confident are you in the conclusion?" → A conclusion from the data, with a comment on sample size or reliability.
- **Differentiation:** support: a pre-structured table / stretch: compare two groups using AVERAGE and a chart.
- **Materials:** spreadsheet software, anonymous survey data.
- **Joy:** "Data reveal" presentations.

### Lesson 23 — Unit 4 check
- **Duration:** 40 min
- **Objective:** "By the end, I can show I can use spreadsheets to calculate, sort and chart data." (UK NC KS2 computing — assessment)
- **Hook:** "The school café needs your help to understand its sales."
- **Key activity:** Practical task: complete formulas, sort and filter, create an appropriate chart, answer questions.
- **Check for understanding:** "Which item sold the most, and which formula or tool did you use to find out?" → The correct item and method (sort, MAX or filter).
- **Differentiation:** support: step prompts / stretch: create a formula that calculates profit from price and cost columns.
- **Materials:** café sales spreadsheet.
- **Joy:** café 'business advisor' certificates.

**End-of-unit check:** Pupil uses formulas with cell references and functions, sorts and filters data correctly, chooses and labels an appropriate chart, and draws a conclusion from data.

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

**Key vocabulary:** information, opinion, advertising, sponsored, influencer, in-app purchase, persuasive design, source, bias, artificial intelligence (AI), algorithm, training data, privacy, personal information, password, two-factor authentication, screen time, wellbeing

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

### Lesson 34 — Privacy and security
- **Duration:** 40 min
- **Objective:** "By the end, I can protect my personal information with strong passwords and good privacy settings." (UK NC KS2 computing — online safety)
- **Hook:** "How long would a computer take to guess 'password123'? And 'PurpleTigerJumps!Moon7'?"
- **Key activity:** Personal information sort (safe to share / never share / ask a trusted adult); password strength (length and unpredictability; passphrases); why not to reuse passwords; two-factor authentication; app permissions.
- **Check for understanding:** "Why is a long passphrase of random words stronger than a short word with a number on the end?" → It has many more possible combinations, so it's much harder to guess.
- **Differentiation:** support: personal-information sorting cards / stretch: explain why the same password should never be used on two sites.
- **Materials:** sorting cards, password-strength demonstration (teacher-led).
- **Joy:** invent a memorable (fictional) passphrase story.

### Lesson 35 — Healthy tech and year review
- **Duration:** 40 min
- **Objective:** "By the end, I can make a personal plan for healthy, kind and safe technology use and reflect on my year in computing." (UK NC KS2 computing — online safety / wellbeing)
- **Hook:** "Some apps are designed to keep you scrolling. Who's in control — you or the app?"
- **Key activity:** Discuss persuasive design (autoplay, streaks, notifications); how to report and get help (trusted adults, reporting tools); write a personal "tech plan"; year review quiz across all units.
- **Check for understanding:** "Name one design feature that keeps people on an app and one strategy to stay in control." → e.g. autoplay / turning off notifications or setting time limits.
- **Differentiation:** support: tech-plan template / stretch: design a feature for an app that helps users take healthy breaks.
- **Materials:** tech-plan templates, review quiz.
- **Joy:** "Digital citizen" certificates.

**End-of-unit check:** Pupil identifies advertising and sponsored content and explains one persuasive technique, explains how AI learns from data and why it can be wrong, and describes how to protect personal information and get help.

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
2. **Binary and data** — converts between binary and denary (to 31), and explains how text and images are stored as numbers.
3. **Scratch** — builds a game using variables, selection, repetition, lists or clones and a custom block.
4. **Physical computing** — programs a micro:bit using sensors, variables and conditions to solve a problem.
5. **Python** — writes a short program with a loop, variable, input and if/else, and fixes errors by reading error messages.
6. **Data** — uses spreadsheet formulas, sorting, filtering and charts to answer a question.
7. **Digital literacy** — recognises advertising and sponsored content, explains how AI learns from data and its limits.
8. **Safety** — protects personal information and knows how to report concerns and get help.

## Teacher guidance

**Common misconceptions to watch for**
- *"Computers store words and pictures, not numbers."* Everything is stored as binary numbers; codes decide what they mean.
- *"Memory and storage are the same thing."* Memory (RAM) is emptied when the power goes; storage keeps files.
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
- *From Year 4:* Scratch selection and variables, how the internet and web work, first spreadsheets, searching and fact-checking, AI chatbots, digital footprint and passwords.
- *Into Year 6:* Python strings, while loops, nested loops, lists and functions, larger text-based projects, databases and CSV analysis, networks, encryption and cybersecurity, training a machine-learning model and AI ethics.
- *Across subjects:* maths (angles in turtle graphics, averages in spreadsheets, coordinates), science (sensors, data logging, pulse data), art (turtle art, digital design), English (evaluating sources), life skills (wellbeing and online behaviour).

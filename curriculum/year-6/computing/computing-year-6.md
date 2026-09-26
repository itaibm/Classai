# Year 6 Computing (ages 11–12) — Scope & Sequence

> Part of **the best international primary school** (see [`../../../SCHOOL-CHARTER.md`](../../../SCHOOL-CHARTER.md)).
> Built to [`../../PLANNING-BRIEF.md`](../../PLANNING-BRIEF.md). Aligned to the **UK National Curriculum
> Key Stage 3 Computing** (Year 7) and the **NCCE Teach Computing KS3 curriculum**, the **CSTA K-12
> Computer Science Standards (Level 2, grades 6–8)**, **IB MYP Year 1 Design (digital)** and the
> **ISTE Standards for Students**.

## Year overview

In the graduation year children move **from blocks to text**: they write real programs in **Python**,
using variables, selection, iteration, lists and functions, and learn to test and debug
systematically. Alongside programming they learn how **data** becomes information (spreadsheets,
databases and a first data analysis in Python), how **networks and the internet** actually work
(packets, IP addresses, DNS, encryption) and how to protect themselves (**cybersecurity**). A short
unit on **artificial intelligence** asks how machines "learn" and where bias comes from. The year
ends with a **capstone program** that serves the cross-subject graduation project.

**What we assume from Year 5 (ages 10–11):** confident block-based programming (Scratch or similar)
with sequence, selection, repetition and variables; decomposition and debugging of a complete
program; physical computing (inputs and outputs, e.g. micro:bit); a first look at text-based code and
syntax errors; a data investigation in a spreadsheet; digital footprint, reputation and spotting
misinformation. **What Year 6 adds:** Python syntax and data types, nested selection and loops,
lists, functions with parameters and return values, structured testing; databases and queries; the
layers of the internet; encryption and security; machine learning and bias. **What secondary relies
on:** writing, reading and debugging short Python programs independently; understanding how data and
networks work; safe, critical and ethical use of technology.

**Tools.** A free Python environment (Thonny on a laptop, or a browser editor such as Trinket or
the Raspberry Pi Foundation's online editor), a spreadsheet program, and unplugged activities for
networks and encryption. **Screen-time balance:** every lesson includes unplugged thinking (tracing
code on paper, role-plays) as well as screen work. One lesson a week, 40–45 minutes.

## Time budget

| Term | Unit | Weeks | Lessons |
|---|---|---|---|
| 1 | 1 — Python foundations | 8 | 8 |
| 1–2 | 2 — Making decisions and repeating: selection and iteration | 7 | 7 |
| 2 | 3 — Lists, functions and a game project | 6 | 6 |
| 2–3 | 4 — Data: spreadsheets, databases and analysis | 5 | 5 |
| 3 | 5 — Networks, the internet and cybersecurity | 5 | 5 |
| 3 | 6 — Artificial intelligence and digital citizenship | 2 | 2 |
| 3 | 7 — Graduation capstone program | 2 | 2 |
| | **Total** | **35 (+1 flexible)** | **35** |

---

## Unit 1 — Python foundations

**Essential question:** How do we give precise instructions to a computer in a text-based language?

**Key vocabulary:** programming language, Python, syntax, statement, function, `print()`, string, integer, float, Boolean, variable, assignment, `input()`, casting (`int()`, `str()`), operator, expression, comment, syntax error, runtime error, logic error, debugging

### Lesson 1 — From blocks to text: why Python?
- **Duration:** 40 min
- **Objective:** "By the end, I can write and run a Python program that prints text, and explain how a text language differs from block coding." (UK KS3 Computing — text-based language; CSTA 2-AP-11)
- **Hook:** Show the same program in Scratch and in Python side by side: "Same idea, different language. Which one do professional programmers use, and why?"
- **Key activity:** Open the editor; `print("Hello, world!")`; print several lines; add comments with `#`; deliberately make a mistake (missing quote or bracket) and read the error message; compare with blocks (precision, typing, speed, power).
- **Check for understanding:** "`print(Hello)` gives an error but `print("Hello")` works. Why?" → Without quotation marks, Python thinks `Hello` is a variable name that doesn't exist; quotes make it a string (text).
- **Differentiation:** support: copy-and-modify code from a printed card / stretch: print a multi-line ASCII-art picture using several `print` statements
- **Materials:** laptops with Thonny or a browser Python editor, printed code cards, a Scratch-vs-Python comparison sheet
- **Joy:** ASCII-art self-portrait

### Lesson 2 — Variables and assignment
- **Duration:** 40 min
- **Objective:** "By the end, I can create variables, assign and update values, and trace what a program prints." (UK KS3 Computing; CSTA 2-AP-11)
- **Hook:** Unplugged: labelled boxes with values inside — "What's in the box called `score` after these instructions?"
- **Key activity:** Variables as named storage; `name = "Amina"`, `age = 11`; updating (`score = score + 10`); tracing code on paper with a trace table before running it; naming rules (no spaces, can't start with a digit, meaningful names).
- **Check for understanding:** "After `x = 5`, then `x = x + 3`, then `x = x * 2`, what is `x`? Show your trace table." → 16 (5 → 8 → 16).
- **Differentiation:** support: trace tables with the first rows filled / stretch: swap the values of two variables (`a, b = b, a` or using a temporary variable) and explain why it works
- **Materials:** labelled boxes or cups, trace-table sheets, laptops
- **Joy:** "Variable magic trick" — predict the output before running

### Lesson 3 — Input and data types
- **Duration:** 45 min
- **Objective:** "By the end, I can use `input()` to get data from the user and convert it to the right data type (string, integer, float)." (UK KS3 Computing — data types; CSTA 2-AP-11)
- **Hook:** "Type your age and I'll tell you your age next year." — but the program crashes with a `TypeError`. Why?
- **Key activity:** `input()` always returns a string; `"11" + "1"` joins strings (concatenation) giving `"111"`; cast with `int()`; data types string, integer, float, Boolean; build a "greeting and age" program.
- **Check for understanding:** "Why does `age = input("Age? ")` followed by `age + 1` cause a problem, and how do you fix it?" → `input` gives a string, and you can't add a number to a string; fix it with `age = int(input("Age? "))`.
- **Differentiation:** support: a partly completed program with gaps / stretch: handle decimals with `float()` (e.g. height in metres) and format output with an f-string
- **Materials:** laptops, data-type sorting cards
- **Joy:** A chatbot that greets you by name

### Lesson 4 — Arithmetic and operators
- **Duration:** 40 min
- **Objective:** "By the end, I can use arithmetic operators (`+ - * / // % **`) and explain integer division and remainder." (UK KS3 Computing; CSTA 2-AP-11; Maths link)
- **Hook:** "A program that converts any number of minutes into hours and minutes. How does it know 135 minutes is 2 h 15 min?"
- **Key activity:** Operators and order of operations (Maths link: BIDMAS); `//` (integer division) and `%` (remainder); build converters (minutes → hours and minutes, °C → °F using the Maths formula).
- **Check for understanding:** "What do `17 // 5` and `17 % 5` give, and what do they mean?" → 3 and 2: 5 goes into 17 three whole times with remainder 2.
- **Differentiation:** support: a converter template to complete / stretch: use `%` to test whether a number is even
- **Materials:** laptops, operator cards
- **Joy:** "Pocket-money calculator" program

### Lesson 5 — Errors and debugging
- **Duration:** 45 min
- **Objective:** "By the end, I can identify and fix syntax, runtime and logic errors, using error messages and tracing." (UK KS3 Computing — debugging; CSTA 2-AP-17)
- **Hook:** "The first 'computer bug' was a real moth found in a computer in 1947. Today's bugs are in the code."
- **Key activity:** Three error types with examples (missing bracket — syntax; dividing by zero or wrong type — runtime; wrong formula giving a wrong answer — logic); a "bug hunt" of ten buggy programs; debugging strategies (read the error line, print variables, trace by hand, rubber-duck explaining).
- **Check for understanding:** "A program runs without crashing but gives the wrong area of a rectangle. What type of error is this, and how would you find it?" → A logic error; trace the code or print intermediate values to find the wrong calculation.
- **Differentiation:** support: bugs with hints / stretch: write a buggy program for a partner to fix
- **Materials:** laptops, printed buggy programs, a rubber duck
- **Joy:** "Bug hunt" race with points for each fix

### Lesson 6 — Strings: working with text
- **Duration:** 40 min
- **Objective:** "By the end, I can join, repeat, measure and change strings using `+`, `*`, `len()`, `.upper()` and indexing." (UK KS3 Computing — string manipulation; CSTA 2-AP-11)
- **Hook:** "How does a website know your password is too short?"
- **Key activity:** String operations; indexing from 0 (`word[0]`); a program that makes a username from first and last names; a program that checks a password's length.
- **Check for understanding:** "If `word = "Python"`, what is `word[0]` and what is `len(word)`?" → `"P"` and 6 — indexing starts at 0.
- **Differentiation:** support: a worked example to adapt / stretch: reverse a string with slicing (`word[::-1]`) and check for palindromes
- **Materials:** laptops, string-operation cards
- **Joy:** Palindrome checker ("racecar", "Hannah")

### Lesson 7 — Mini-project: Mad Libs story generator
- **Duration:** 45 min
- **Objective:** "By the end, I can plan, write and test a program that uses input, variables, strings and output to make an interactive story." (UK KS3 Computing — design and write programs; CSTA 2-AP-13)
- **Hook:** "Your program asks for silly words and turns them into a hilarious story."
- **Key activity:** Plan the story with gaps (algorithm first on paper); code with `input()` and f-strings; test with different inputs; share with a partner.
- **Check for understanding:** "What happens in your program if the user just presses Enter without typing a word, and how could you improve it?" → The story would have a blank gap; you could check for empty input and ask again (preview of selection).
- **Differentiation:** support: a story template with gaps already in the code / stretch: add a word-count summary or random elements with `import random`
- **Materials:** laptops, planning sheets
- **Joy:** Reading each other's hilarious stories

### Lesson 8 — Unit 1 check: read, trace, write
- **Duration:** 40 min
- **Objective:** "By the end, I can read, trace, debug and write short Python programs using variables, input, operators and strings." (UK KS3 Computing; CSTA 2-AP-11, 2-AP-17)
- **Hook:** "Three challenges: predict, fix, create."
- **Key activity:** Predict the output of a program (trace table); fix three bugs; write a program from a specification (e.g. a unit converter); self-assess.
- **Check for understanding:** "Predict the output: `a = "3"`, `b = 4`, `print(a * b)`." → `3333` (repeating the string "3" four times).
- **Differentiation:** support: fewer, shorter tasks / stretch: an extra specification with f-string formatting
- **Materials:** printed challenges, laptops
- **Joy:** "Python licence" badge

**End-of-unit check:** Trace a program with a trace table, identify and fix a syntax, a runtime and a logic error, and write a program that takes input, converts types, calculates and prints a formatted result.

---

## Unit 2 — Making decisions and repeating: selection and iteration

**Essential question:** How can programs make decisions and repeat actions efficiently?

**Key vocabulary:** condition, Boolean, comparison operator (`== != < > <= >=`), `if`, `elif`, `else`, indentation, logical operator (`and`, `or`, `not`), iteration, `while` loop, `for` loop, `range()`, counter, infinite loop, nested, random module, turtle

### Lesson 9 — Selection: if and else
- **Duration:** 40 min
- **Objective:** "By the end, I can write `if/else` statements with comparison operators and correct indentation." (UK KS3 Computing — selection; CSTA 2-AP-12)
- **Hook:** "A roller-coaster ride checks your height. Can we code the gatekeeper?"
- **Key activity:** Flowchart first (decision diamond); `if height >= 120:` … `else:` …; `==` vs `=`; indentation matters in Python; build age and height checkers.
- **Check for understanding:** "What is the difference between `=` and `==` in Python?" → `=` assigns a value to a variable; `==` compares two values and gives True or False.
- **Differentiation:** support: fill in the condition in a given structure / stretch: validate that the input is a sensible number before checking
- **Materials:** flowchart cards, laptops
- **Joy:** "Roller-coaster gatekeeper" program

### Lesson 10 — Multiple choices: elif and logical operators
- **Duration:** 45 min
- **Objective:** "By the end, I can use `elif` for several outcomes and combine conditions with `and`, `or` and `not`." (UK KS3 Computing — selection and Boolean logic; CSTA 2-AP-12)
- **Hook:** "Turn a test score into a grade or a message — with one program."
- **Key activity:** A grade program with `if/elif/else` (order matters — check the highest band first); logical operators; truth tables for `and` and `or` (unplugged with cards).
- **Check for understanding:** "Why does the order of `elif` conditions matter? Give an example." → Python stops at the first true condition; if `score >= 50` is checked before `score >= 80`, a score of 90 would get the lower message.
- **Differentiation:** support: a three-branch template / stretch: a program with nested conditions (e.g. a ticket price by age and day)
- **Materials:** truth-table cards, laptops
- **Joy:** "Choose your own adventure" mini-story with branches

### Lesson 11 — While loops and the guessing game
- **Duration:** 45 min
- **Objective:** "By the end, I can use a `while` loop with a condition and the `random` module to build a number-guessing game." (UK KS3 Computing — iteration; CSTA 2-AP-12)
- **Hook:** "I'm thinking of a number between 1 and 100. Can a computer play this game with you?"
- **Key activity:** `import random`; `secret = random.randint(1, 100)`; `while guess != secret:` with "higher/lower" hints and a guess counter; discuss infinite loops and how to stop them.
- **Check for understanding:** "What is the best strategy for guessing a number between 1 and 100, and what's the most guesses it needs?" → Always guess the middle of the remaining range (binary search); at most 7 guesses, because 2⁷ = 128 ≥ 100.
- **Differentiation:** support: a partly written game with gaps / stretch: limit the number of guesses and add a "play again?" loop
- **Materials:** laptops
- **Joy:** Beat the computer in the fewest guesses

### Lesson 12 — For loops and range
- **Duration:** 40 min
- **Objective:** "By the end, I can use `for` loops with `range()` to repeat code a set number of times and generate sequences." (UK KS3 Computing — iteration; CSTA 2-AP-12; Maths link)
- **Hook:** "Print the 7 times table up to 7 × 12 — with three lines of code."
- **Key activity:** `for i in range(1, 13): print(i, "x 7 =", i * 7)`; `range(start, stop, step)` (stop is not included); count-controlled vs condition-controlled loops; generate sequences from Maths (nth term).
- **Check for understanding:** "What numbers does `range(2, 10, 3)` produce?" → 2, 5, 8 (it stops before 10).
- **Differentiation:** support: modify a working loop / stretch: print the first 20 terms of the sequence with nth term 4n + 3, and a times-table grid with nested loops
- **Materials:** laptops, range cards
- **Joy:** "Times-table machine" for a younger sibling

### Lesson 13 — Turtle graphics: loops make art
- **Duration:** 45 min
- **Objective:** "By the end, I can use the `turtle` module and loops to draw regular polygons and patterns, linking to exterior angles." (UK KS3 Computing; CSTA 2-AP-12; Maths link)
- **Hook:** "Can you draw a perfect star or spirograph pattern with a few lines of code?"
- **Key activity:** `forward()`, `right()`, `color()`; draw a square with a loop; generalise to any regular polygon (turn 360 ÷ n — Maths exterior angles); spirals by changing the distance each loop.
- **Check for understanding:** "Why does the turtle turn 72° to draw a regular pentagon?" → The exterior angles of any polygon add up to 360°, and 360 ÷ 5 = 72.
- **Differentiation:** support: a square and a triangle with templates / stretch: a function-free polygon program that asks the user for the number of sides
- **Materials:** laptops with turtle support
- **Joy:** "Code art gallery"

### Lesson 14 — Combining selection and iteration: a quiz
- **Duration:** 45 min
- **Objective:** "By the end, I can combine loops, selection and a score variable in a quiz program with feedback." (UK KS3 Computing; CSTA 2-AP-12, 2-AP-13)
- **Hook:** "Make a quiz your friends can't beat."
- **Key activity:** Plan questions; loop through questions (repeated code for now — lists come in Unit 3); check answers (including `.lower()` so "Paris" and "paris" both count); keep score; final message by score band.
- **Check for understanding:** "Why is `.lower()` useful when checking a typed answer?" → It makes the check case-insensitive, so "Paris", "PARIS" and "paris" are all accepted.
- **Differentiation:** support: a quiz skeleton to fill with questions / stretch: allow two attempts per question with a `while` loop
- **Materials:** laptops, planning sheets
- **Joy:** Quiz swap — try to beat a classmate's quiz

### Lesson 15 — Unit 2 check: selection and iteration
- **Duration:** 40 min
- **Objective:** "By the end, I can read, trace and write programs using selection and iteration." (UK KS3 Computing; CSTA 2-AP-12, 2-AP-17)
- **Hook:** "Three challenges: predict, fix, create."
- **Key activity:** Predict loop output; fix a program with an infinite loop and an indentation error; write a program from a specification (e.g. a times-table tester with score).
- **Check for understanding:** "How many times does this loop run: `for i in range(5):`, and what values does `i` take?" → 5 times; 0, 1, 2, 3, 4.
- **Differentiation:** support: a smaller specification / stretch: add input validation
- **Materials:** printed challenges, laptops
- **Joy:** Badge progress

**End-of-unit check:** Trace a loop with a trace table, correct an infinite loop and an indentation error, and write a program combining `if/elif/else`, a loop and a counter from a specification.

---

## Unit 3 — Lists, functions and a game project

**Essential question:** How do programmers organise data and code so that bigger programs stay manageable?

**Key vocabulary:** list, element, index, `append()`, `len()`, iterate, function, `def`, parameter, argument, return value, decomposition, abstraction, reuse, test plan, test data (normal, boundary, erroneous), evaluation

### Lesson 16 — Lists
- **Duration:** 40 min
- **Objective:** "By the end, I can create a list, access elements by index, add items and loop through a list." (UK KS3 Computing — data structures; CSTA 2-AP-11)
- **Hook:** "How does a music app store your whole playlist in one variable?"
- **Key activity:** `songs = ["...", "...", "..."]`; indexing from 0; `append()`, `len()`, `in`; `for song in songs:`; build a to-do list or class-favourites program.
- **Check for understanding:** "If `animals = ["cat", "dog", "owl"]`, what is `animals[2]`, and what error does `animals[3]` give?" → `"owl"`; an IndexError, because there are only indexes 0, 1 and 2.
- **Differentiation:** support: pre-written lists to explore / stretch: find the largest number in a list with a loop (without `max()`)
- **Materials:** laptops, list cards (unplugged: a row of labelled cups)
- **Joy:** "Random playlist picker" with `random.choice()`

### Lesson 17 — Functions with parameters and return values
- **Duration:** 45 min
- **Objective:** "By the end, I can define and call functions with parameters and return values, and explain why functions help." (UK KS3 Computing — subroutines; CSTA 2-AP-14)
- **Hook:** "Programmers hate writing the same code twice. Functions let you write it once."
- **Key activity:** `def area_of_rectangle(length, width): return length * width`; call with different arguments; functions from Maths (area of a circle, percentage increase); the difference between `print` and `return`.
- **Check for understanding:** "What is the difference between a function that prints its result and one that returns it?" → Printing only shows it on screen; returning gives the value back to the program so it can be stored or used in further calculations.
- **Differentiation:** support: complete given function bodies / stretch: write a function `is_prime(n)` that returns True or False
- **Materials:** laptops, function-machine cards (unplugged link to Maths function machines)
- **Joy:** Build a "maths toolkit" of your own functions

### Lesson 18 — Decomposition: planning a game
- **Duration:** 45 min
- **Objective:** "By the end, I can decompose a game into functions and plan it with a flowchart or pseudocode and a test plan." (UK KS3 Computing — design; CSTA 2-AP-13, 2-AP-10)
- **Hook:** "Rock, paper, scissors — or a text adventure, or a hangman-style word game. Which will you build?"
- **Key activity:** Choose a game; break it into parts (get player choice, get computer choice, decide winner, keep score, play again); write pseudocode; plan functions; write a test plan with normal, boundary and erroneous data.
- **Check for understanding:** "Why do we plan with pseudocode before coding?" → To get the logic right first, without worrying about syntax, and to split the work into manageable parts.
- **Differentiation:** support: rock–paper–scissors with a planning template / stretch: a text adventure with rooms stored in a list or dictionary
- **Materials:** planning templates, flowchart symbols
- **Joy:** Designing your own game

### Lesson 19 — Building the game
- **Duration:** 45 min
- **Objective:** "By the end, I can write my game using lists, functions, selection and loops, building and testing one function at a time." (UK KS3 Computing; CSTA 2-AP-12, 2-AP-14)
- **Hook:** "Build a little, test a little."
- **Key activity:** Code the functions one by one; test each after writing it; pair programming (driver and navigator, swapping every 10 minutes).
- **Check for understanding:** "Why test each function separately before joining them together?" → If something goes wrong, you know exactly which part is at fault, so debugging is quicker.
- **Differentiation:** support: a partly built game with two functions to write / stretch: add a high-score feature or difficulty levels
- **Materials:** laptops, test plans
- **Joy:** Pair programming

### Lesson 20 — Testing and improving
- **Duration:** 45 min
- **Objective:** "By the end, I can test my game with a test plan (normal, boundary and erroneous data), fix bugs and add input validation." (UK KS3 Computing — testing; CSTA 2-AP-17)
- **Hook:** "Give your game to the most annoying tester you know. What will they type?"
- **Key activity:** Run the test plan; record results; fix failures; add validation (e.g. a loop that repeats until the user types rock, paper or scissors); user testing with a partner.
- **Check for understanding:** "Give one example of erroneous test data for your game and what your program should do with it." → e.g. typing "banana" instead of rock/paper/scissors — the program should explain and ask again rather than crash.
- **Differentiation:** support: a test plan with the first tests written / stretch: test boundary cases (e.g. scores exactly at a limit)
- **Materials:** laptops, test-plan tables
- **Joy:** "Break my game" challenge

### Lesson 21 — Game showcase and evaluation
- **Duration:** 40 min
- **Objective:** "By the end, I can present my game, explain how I used functions and lists, and evaluate it against my plan." (UK KS3 Computing; CSTA 2-AP-19; IB MYP Design Criterion D)
- **Hook:** "Arcade day."
- **Key activity:** Play each other's games; short presentations; written evaluation (what works, what I'd improve, what I learned); add comments to code.
- **Check for understanding:** "Point to one function in your game and explain its parameters and what it returns." → A clear explanation using the vocabulary.
- **Differentiation:** support: an evaluation frame / stretch: refactor one part of the code to be shorter or clearer
- **Materials:** laptops, evaluation sheets
- **Joy:** "Arcade day" with votes for the most fun game

**End-of-unit check:** A working game that uses at least one list, two functions (one with a parameter and a return value), selection and iteration, with a completed test plan and evaluation.

---

## Unit 4 — Data: spreadsheets, databases and analysis

**Essential question:** How do computers store, organise and analyse data to answer questions?

**Key vocabulary:** data, information, record, field, data type, database, table, primary key, query, criteria, sort, filter, spreadsheet, cell reference, formula, function (`SUM`, `AVERAGE`, `IF`, `COUNTIF`), chart, CSV file, data validation

### Lesson 22 — Data and information; spreadsheet formulas
- **Duration:** 40 min
- **Objective:** "By the end, I can explain the difference between data and information and use formulas and functions with cell references in a spreadsheet." (UK KS3 Computing — data; CSTA 2-DA-08)
- **Hook:** "12, 15, 9, 21 — is that information? What if I tell you they're the hours of screen time four children had last week?"
- **Key activity:** Data vs information (data + context = information); build a spreadsheet of class data (e.g. from the Maths statistics unit); formulas with cell references (`=B2*C2`), functions (`SUM`, `AVERAGE`, `MAX`, `MIN`), relative references when filling down.
- **Check for understanding:** "Why is `=B2+B3+B4` better than `=12+15+9`?" → It uses cell references, so if the data changes the result updates automatically.
- **Differentiation:** support: a partly built spreadsheet / stretch: absolute references (`$B$1`) for a fixed value like a price
- **Materials:** spreadsheet software, class data set
- **Joy:** A live "class facts" spreadsheet that updates as data is added

### Lesson 23 — IF, COUNTIF and conditional formatting
- **Duration:** 40 min
- **Objective:** "By the end, I can use `IF` and `COUNTIF` and conditional formatting to analyse data and highlight patterns." (UK KS3 Computing; CSTA 2-DA-08)
- **Hook:** "Which days did we meet the goal of 60 minutes of activity? Let the spreadsheet decide."
- **Key activity:** `=IF(B2>=60,"Goal met","Not yet")`; `=COUNTIF(B2:B31,">=60")`; conditional formatting colours; link to PE activity logs.
- **Check for understanding:** "What will `=IF(C4>100,"High","Low")` show if C4 is 100? Why?" → "Low", because 100 is not greater than 100.
- **Differentiation:** support: fill in partly written formulas / stretch: nested `IF` for three categories
- **Materials:** spreadsheet software, activity-log data
- **Joy:** A colour-coded activity tracker

### Lesson 24 — Databases: records, fields and queries
- **Duration:** 45 min
- **Objective:** "By the end, I can explain how a database is organised (tables, records, fields, primary key) and run simple queries with criteria." (UK KS3 Computing — databases; CSTA 2-DA-09)
- **Hook:** "How does a library find one book among millions in less than a second?"
- **Key activity:** Unplugged: record cards for animals sorted and searched by hand; then a spreadsheet or simple database app with a table (fields such as name, continent, mass, diet); queries with filters and criteria (e.g. mammals in Africa heavier than 100 kg); why each record needs a unique primary key.
- **Check for understanding:** "Why would 'name' be a poor primary key for a table of students?" → Two students can have the same name; a primary key must be unique (e.g. a student ID).
- **Differentiation:** support: a single-criterion query / stretch: queries with two criteria using AND and OR
- **Materials:** animal record cards, spreadsheet or database software (e.g. LibreOffice Base, Airtable or a spreadsheet table with filters)
- **Joy:** "Database detective" — solve riddles with queries

### Lesson 25 — Analysing a CSV file in Python
- **Duration:** 45 min
- **Objective:** "By the end, I can read a CSV file in Python, loop through its rows and calculate a total and an average." (UK KS3 Computing — data processing; CSTA 2-DA-08, 2-AP-12)
- **Hook:** "Spreadsheets are great — but what if the file had a million rows?"
- **Key activity:** Open a small CSV (e.g. world countries with population and area, or the class survey) with the `csv` module; loop through rows; convert values to numbers; compute totals, averages and a filtered count; compare with the spreadsheet answer.
- **Check for understanding:** "Why must we convert values from the CSV with `int()` or `float()` before calculating?" → Values read from a file are strings; they must be numbers to do arithmetic.
- **Differentiation:** support: a working program to modify for a different column / stretch: find the country with the highest population density
- **Materials:** laptops, CSV files, a printed example program
- **Joy:** Discover a surprising fact from real data

### Lesson 26 — Data project and Unit 4 check
- **Duration:** 45 min
- **Objective:** "By the end, I can answer a question with data using a spreadsheet (formulas and a suitable chart) and explain my findings." (UK KS3 Computing; CSTA 2-DA-07, 2-DA-09)
- **Hook:** "Ask a question, find the data, answer it."
- **Key activity:** Choose a question (possibly for the graduation capstone: e.g. a survey about a local issue); organise data; use formulas and a chart; write a short conclusion and a limitation; short check on vocabulary.
- **Check for understanding:** "Why did you choose that type of chart for your data?" → A reason matching chart type to data (e.g. a bar chart for categories, a line graph for change over time).
- **Differentiation:** support: a prepared data set and chart template / stretch: combine spreadsheet and Python analysis
- **Materials:** spreadsheet software, data sets or survey data
- **Joy:** Answering a real question with your own data

**End-of-unit check:** A spreadsheet answering a question with formulas (`SUM`, `AVERAGE`, `IF`) and a suitable chart; an explanation of records, fields, primary keys and queries; a short Python program that reads a CSV and calculates an average.

---

## Unit 5 — Networks, the internet and cybersecurity

**Essential question:** How does a message travel across the world in a fraction of a second — and how do we keep it safe?

**Key vocabulary:** network, LAN, WAN, router, switch, server, client, Wi-Fi, cable, fibre optic, the internet, the World Wide Web, packet, IP address, protocol, DNS, URL, HTTP, HTTPS, encryption, key, cipher, phishing, malware, password, two-factor authentication

### Lesson 27 — What is a network?
- **Duration:** 40 min
- **Objective:** "By the end, I can explain what a network is, name its hardware (router, switch, server, cables, wireless) and distinguish a LAN from a WAN." (UK KS3 Computing — networks; CSTA 2-NI-04)
- **Hook:** "How many networks have you used today without noticing?"
- **Key activity:** Map the home or school network (devices, router, internet connection); hardware tour (a real router if possible); LAN vs WAN; wired vs wireless trade-offs; the internet as a network of networks (including undersea fibre-optic cables — show a submarine cable map).
- **Check for understanding:** "What is the difference between a LAN and a WAN? Give an example of each." → A LAN covers a small area (a home or school); a WAN covers a large area and connects LANs (the internet).
- **Differentiation:** support: a labelled network diagram to complete / stretch: explain trade-offs between wired and wireless connections (speed, reliability, convenience)
- **Materials:** network diagram cards, a router, the submarine cable map (submarinecablemap.com)
- **Joy:** Tracing the undersea cables that connect your country to the world

### Lesson 28 — Packets and IP addresses (unplugged)
- **Duration:** 45 min
- **Objective:** "By the end, I can explain how data is split into packets, addressed with IP addresses and reassembled." (UK KS3 Computing — the internet; CSTA 2-NI-04)
- **Hook:** "Send a whole story to the other side of the room — but each messenger can carry only five words."
- **Key activity:** Unplugged packet-switching game: split a message into numbered packets with destination and source addresses; "routers" (children) forward packets by different routes; some arrive out of order and are reassembled; discuss lost packets and resending; `ping` or `traceroute` demonstration.
- **Check for understanding:** "Why are packets numbered?" → They may take different routes and arrive out of order; numbers let the receiving computer put them back together correctly (and ask for missing ones).
- **Differentiation:** support: a guided role card as a router / stretch: explain why sending packets by different routes makes the internet more reliable
- **Materials:** envelopes or sticky notes, address labels, a laptop for `traceroute`
- **Joy:** The packet-switching race

### Lesson 29 — The web: URLs, DNS and HTTPS
- **Duration:** 40 min
- **Objective:** "By the end, I can explain the difference between the internet and the World Wide Web, what happens when I type a URL, and why HTTPS matters." (UK KS3 Computing; CSTA 2-NI-04)
- **Hook:** "The web was invented by Tim Berners-Lee in 1989 at CERN. The internet is older. What's the difference?"
- **Key activity:** Internet (the network) vs the web (pages and links that run on it); DNS as the internet's phone book (domain name → IP address); parts of a URL; HTTP vs HTTPS (the padlock means the connection is encrypted — not that the site is trustworthy).
- **Check for understanding:** "Does the padlock (HTTPS) prove a website is honest? Explain." → No: it only means the connection is encrypted; a scam site can also use HTTPS.
- **Differentiation:** support: a sequence of cards for "what happens when you type a URL" / stretch: inspect a web page's HTML with the browser's developer tools
- **Materials:** laptops, URL anatomy cards, sequence cards
- **Joy:** Edit a web page's text locally with developer tools (and learn it isn't really changed)

### Lesson 30 — Encryption: from Caesar to today
- **Duration:** 45 min
- **Objective:** "By the end, I can encrypt and decrypt messages with a Caesar cipher, write a Python program to do it, and explain why modern encryption uses keys." (UK KS3 Computing; CSTA 2-NI-06)
- **Hook:** "Julius Caesar hid his messages by shifting each letter. Can you crack this one?"
- **Key activity:** Cipher wheel; encrypt and decrypt; crack by trying all 25 shifts (brute force) or by letter frequency; a Python Caesar cipher using `ord()`, `chr()` and `%` (link to Unit 1); the idea of public and private keys (padlock analogy).
- **Check for understanding:** "Why is a Caesar cipher easy to crack, and what makes modern encryption stronger?" → There are only 25 possible shifts to try; modern encryption uses very long keys with an enormous number of possibilities.
- **Differentiation:** support: a cipher wheel only / stretch: complete the Python cipher program and crack a message by frequency analysis
- **Materials:** cipher wheels (paper), laptops, secret messages
- **Joy:** Spy messages to a partner

### Lesson 31 — Cybersecurity: passwords, phishing and protection
- **Duration:** 45 min
- **Objective:** "By the end, I can recognise phishing and other threats and explain how strong passphrases, two-factor authentication and updates protect me." (UK KS3 Computing — cybersecurity; CSTA 2-NI-05)
- **Hook:** An example phishing message ("Your game account will be deleted! Click here…"): "Spot the five warning signs."
- **Key activity:** Threats (phishing, malware, weak passwords, oversharing); protections (passphrases of three random words, a password manager with an adult's help, two-factor authentication, software updates, checking links); write a Python password-strength checker (length, digits, capitals) using Unit 1–2 skills.
- **Check for understanding:** "Why is 'three random words' often a stronger password than 'P@ssw0rd'?" → It is longer (so there are far more combinations to guess) and easier to remember, while "P@ssw0rd" is a common pattern that attackers try first.
- **Differentiation:** support: a phishing-spotting checklist / stretch: extend the password checker to give a score and suggestions
- **Materials:** example phishing messages (made safe), laptops
- **Joy:** "Phish or legit?" game show

**End-of-unit check:** Explain with a diagram how a message travels across the internet (packets, IP addresses, routers, DNS); encrypt and decrypt with a Caesar cipher and explain its weakness; identify phishing warning signs and three protections.

---

## Unit 6 — Artificial intelligence and digital citizenship

**Essential question:** How do machines "learn", and how can we use AI wisely and fairly?

**Key vocabulary:** artificial intelligence, machine learning, training data, model, classification, prediction, accuracy, bias, large language model, generative AI, deepfake, misinformation, ethics

### Lesson 32 — How machines learn: training a model
- **Duration:** 45 min
- **Objective:** "By the end, I can train a simple image-classification model, test it and explain how training data affects its accuracy and fairness." (UK KS3 Computing; CSTA 2-IC-21; ISTE 1.3)
- **Hook:** "Teach a computer to tell the difference between a thumbs-up and a thumbs-down — in ten minutes."
- **Key activity:** Use Google's Teachable Machine to train a model on two or three classes with webcam images; test it; deliberately train with biased data (e.g. only one person's hand, or only in bright light) and see it fail for others; discuss real cases of AI bias (e.g. face recognition that works less well for some groups).
- **Check for understanding:** "Why did the model fail when someone else tried it?" → The training data only included examples from one person or one setting, so the model didn't learn the general pattern — biased or narrow data gives a biased model.
- **Differentiation:** support: guided steps with two classes / stretch: design a fairer training set and measure improvement
- **Materials:** laptops with webcams, Teachable Machine (teachablemachine.withgoogle.com); privacy: images are not uploaded unless saved — check settings with an adult
- **Joy:** Training your own AI

### Lesson 33 — Using AI wisely: chatbots, deepfakes and misinformation
- **Duration:** 45 min
- **Objective:** "By the end, I can explain what generative AI does, why it can be wrong ("hallucinations"), how to check its answers, and how to spot manipulated media." (UK KS3 Computing — safe and responsible use; CSTA 2-IC-20, 2-IC-23)
- **Hook:** An AI-generated image and a real photo side by side: "Which is real — and how can you tell?"
- **Key activity:** How a chatbot predicts likely next words from patterns in huge amounts of text (so it can sound confident and still be wrong); checking answers against reliable sources (link to English research skills); spotting AI images and deepfakes (lateral reading, reverse image search, checking the source); privacy (don't share personal information with AI tools); age rules for AI services; when AI is helpful for learning and when it replaces learning.
- **Check for understanding:** "Why can an AI chatbot give a confident but wrong answer, and what should you do about it?" → It generates likely-sounding text rather than checking facts; always verify important information with reliable sources.
- **Differentiation:** support: a checklist for checking AI answers and images / stretch: write a short class "AI charter" of good practices
- **Materials:** example AI-generated and real images, reliable-source checklist; supervised access only, following age requirements of any tool used
- **Joy:** "Real or AI?" quiz

**End-of-unit check:** Explain how a machine-learning model is trained and why biased data produces biased results; describe how to check an AI answer and spot a manipulated image; state two rules for using AI tools safely.

---

## Unit 7 — Graduation capstone program

**Essential question:** How can my code help solve a real problem for real people?

**Key vocabulary:** user, requirements, specification, design, implement, test, evaluate, iterate, documentation, user feedback

### Lesson 34 — Designing and building the capstone program
- **Duration:** 45 min
- **Objective:** "By the end, I can design and build a Python program that meets a real user's need connected to the graduation capstone project." (UK KS3 Computing; CSTA 2-AP-13, 2-AP-15; IB MYP Design Criteria A–C)
- **Hook:** "Your code, your cause: build something that helps your capstone project."
- **Key activity:** Choose a program linked to the capstone (e.g. a quiz teaching younger children about the capstone issue; a calculator that estimates water or energy savings; a survey-data analyser); write requirements with a user; plan functions; build and test incrementally.
- **Check for understanding:** "What does your user need the program to do, and how will you test that it does?" → Specific requirements and a matching test for each.
- **Differentiation:** support: choose from three templates to adapt / stretch: an open design using lists, functions, file reading and validation
- **Materials:** laptops, requirement and test templates
- **Joy:** Building something that matters

### Lesson 35 — Testing with users, presenting and reflecting
- **Duration:** 45 min
- **Objective:** "By the end, I can test my program with its users, improve it from feedback, present it and reflect on my growth as a programmer this year." (UK KS3 Computing; CSTA 2-AP-15, 2-AP-19)
- **Hook:** "Your users are waiting."
- **Key activity:** User testing (younger children, family or capstone partners); one improvement from feedback; add comments and a short user guide; present at the graduation exhibition; reflection comparing Lesson 1's "Hello, world!" with the capstone program.
- **Check for understanding:** "What did user feedback change in your program, and why?" → A specific change based on what a user found confusing or wanted.
- **Differentiation:** support: a presentation frame / stretch: publish the program (e.g. on a class page) with documentation
- **Materials:** laptops, feedback forms, exhibition space
- **Joy:** Seeing real users use your program at the graduation exhibition

**End-of-unit check:** A working, commented capstone program that meets written requirements, a record of user testing and improvement, and a short presentation explaining the design.

---

## Books & resources

- ***Python for Kids* by Jason R. Briggs** — a clear, funny, well-paced introduction to Python for this age, including turtle graphics and games.
- ***Coding Games in Python* (DK)** — step-by-step, beautifully illustrated game projects that match Unit 3.
- **Raspberry Pi Foundation projects (projects.raspberrypi.org) and Code Club** — free, well-tested Python projects and an online editor.
- **NCCE Teach Computing KS3 curriculum (teachcomputing.org)** — free, research-informed lesson materials for Python, networks and data.
- **CS Unplugged (csunplugged.org)** — unplugged activities for packets, binary, encryption and sorting; keeps screen time balanced.
- **Thonny (thonny.org)** — a free beginner-friendly Python editor that shows variables step by step (ideal for tracing).
- **Teachable Machine (teachablemachine.withgoogle.com)** — a free, visual way to train machine-learning models for Unit 6.
- **Submarine Cable Map (submarinecablemap.com)** — shows the physical internet under the oceans.
- **BBC Bitesize KS3 Computer Science** — clear explanations and quizzes for revision.
- ***Hello World* magazine (Raspberry Pi Foundation)** — free magazine for computing teachers, with classroom-tested ideas.

## End-of-year mastery checks

1. **Writes Python programs** using variables, input and type conversion, operators, strings, selection, `while` and `for` loops, lists and functions with parameters and return values. *See it:* the Unit 3 game and the capstone program.
2. **Traces and debugs** code using trace tables and error messages, distinguishing syntax, runtime and logic errors. *See it:* Unit 1 and 2 checks.
3. **Plans and tests** programs with decomposition, pseudocode or flowcharts and a test plan (normal, boundary, erroneous data). *See it:* the game test plan.
4. **Uses data** with spreadsheet formulas and functions, charts and database queries, and reads a CSV in Python. *See it:* the data project.
5. **Explains networks and the internet:** LAN/WAN, packets, IP addresses, DNS, the web vs the internet, HTTPS. *See it:* the network diagram explanation.
6. **Protects themselves and others online:** encryption basics, phishing recognition, strong passphrases, two-factor authentication. *See it:* the cybersecurity check.
7. **Understands AI:** how models learn from data, bias, checking generative-AI output, spotting manipulated media, using AI responsibly. *See it:* the Unit 6 check and class AI charter.

## Teacher guidance

- **Common misconceptions:** `=` means "equals" as in maths (in Python it assigns); `input()` returns a number (it returns a string); `range(1, 10)` includes 10 (it stops before); lists start at 1 (they start at 0); the internet and the web are the same; the padlock means a site is safe; AI "knows" things and is always right; deleting a post removes it everywhere.
- **Teaching programming well:** use PRIMM (Predict, Run, Investigate, Modify, Make); trace on paper before running; live-code with deliberate mistakes; pair-program with regular role swaps; celebrate error messages as clues, not failures.
- **Screen-time balance and wellbeing:** at least a third of each lesson is unplugged thinking, discussion or tracing; eye breaks; link to PE and Health (sleep and screens).
- **Online safety and safeguarding:** supervised internet use; age limits for AI and social tools respected; no personal data entered into online tools; clear reporting routes if something worrying appears.
- **Differentiation.** Support means worked examples, partly completed programs (Parsons problems — reorder lines of code), and templates; stretch means open specifications, extra features (validation, files, efficiency) and explaining design choices — not racing ahead to new syntax.
- **Vertical alignment.** Year 5 secured block programming, physical computing, a first look at text-based code and a spreadsheet investigation; Year 6 establishes Python fundamentals, data processing, networks, security and AI literacy. Secondary computing (UK Year 8 / US Grade 7 / MYP 2) builds on these to dictionaries, file handling, algorithms (searching and sorting), binary and computer architecture.
- **Cross-curricular links:** Maths (operators, sequences, polygons and exterior angles, statistics, prime numbers), Science (data from investigations), Geography (country data, GIS, undersea cables), English (research, evaluating sources, AI and misinformation), Art (turtle art, digital design), Life Skills (the graduation capstone).

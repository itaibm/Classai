# Year 3 Computing (ages 8–9) — Scope & Sequence

## Year overview

Year 3 computing makes children **confident Scratch programmers who use repetition (loops)**, **organisers of data with branching databases**, **understanders of how networks carry information**, **creators of audio and video**, **critical researchers**, and **safe, kind, balanced digital citizens**. Year 2 introduced sequences, events and simple *repeat* and *forever* loops; Year 3 takes loops much further — **nested loops**, loops that change values each time, several scripts running at once, and **'repeat until'** with a condition — in bigger animations and games, with systematic **debugging by tracing**.

**Every year includes data, networks, digital literacy and online safety.** This year: branching databases (data), how signals carry data by wire and Wi-Fi, how lost packets are detected and resent, where the web 'lives' in servers and data centres, and how to read a URL (networks — building on Year 2's networks, packets and web), recording and editing sound and video, judging reliable sources and user-written content, and privacy settings, strangers online, kindness and sleep-friendly screen habits (digital literacy and safety).

**Pioneers:** Ada Lovelace (who wrote about repeating operations in a program for Babbage's Analytical Engine in the 1840s) is new this year; Grace Hopper (whose team logged a real moth as a 'bug' in 1947) and Tim Berners-Lee (who invented the World Wide Web in 1989) are retrieved from Year 2.

**What this year assumes (from Year 2, ages 7–8):** algorithms and decomposition; Scratch sprites, sequences, events and broadcasts; *repeat* and *forever* loops and drawing polygons with the pen; debugging with Grace Hopper's story; networks, routers, packets, the internet vs the web (Tim Berners-Lee); data tables and charts; passwords, checking reliability, kindness online, adverts and screen balance. **What Year 4 (ages 9–10) relies on:** confident use of loops and debugging (for selection with 'if' and variables), organising data by attributes (for spreadsheets), understanding the web and URLs (for effective searching), and privacy habits (for the digital-footprint unit).

Lessons are **40 minutes**, one a week. Unplugged activities (no computer) are used to introduce new ideas; about two-thirds of lessons are hands-on at a device. Online safety is revisited in every unit, not only in Unit 6.

## Time budget

35 lessons at 1 a week = 35 weeks. Each unit ends with a project or 'show and tell' that serves as the mastery check.

| Term | Unit | Weeks | Lessons | Lessons # |
|---|---|---|---|---|
| T1 | 1. Programming with loops in Scratch | 8 | 8 | 1–8 |
| T1 | 2. Data: branching databases | 5 | 5 | 9–13 |
| T2 | 3. Networks: how information travels | 5 | 5 | 14–18 |
| T2 | 4. Creating media: audio and video | 6 | 6 | 19–24 |
| T3 | 5. Digital literacy: researching with reliable sources | 5 | 5 | 25–29 |
| T3 | 6. Online safety: private, kind and balanced | 6 | 6 | 30–35 |
| **Total** | **6 units** | **35** | **35** | |

---

## Unit 1 — Programming with loops in Scratch

**Essential question:** How can a loop make a program shorter, smarter and easier to change?

**Key vocabulary:** algorithm, program, loop, nested loop, repeat, forever, repeat until, iteration, condition, parallel, broadcast, trace, sprite, costume, pen, debug, bug, efficient, pattern

### Lesson 1 — Loops inside loops (unplugged)
- **Duration:** 40 min
- **Objective:** "By the end, I can read and write nested loops (a loop inside a loop) and work out how many times each step runs." (UK NC KS2 Computing (use repetition in programs))
- **Hook:** "A dance chorus: 'clap, clap, clap, clap, spin' — and the whole chorus happens three times. How can we write that in the fewest words?"
- **Key activity:** Two-minute retrieval of Year 2's 'repeat' dances. New: nested loops — 'repeat 3 [repeat 4 [clap], spin]'. Children act out nested dance algorithms, predict the total number of claps before performing, then write their own nested routine for a partner.
- **Check for understanding:** "In 'repeat 3 [repeat 4 [clap], spin]', how many claps and how many spins are there, and why?" → 12 claps and 3 spins — the inner loop runs its 4 claps every time the outer loop runs, and the outer loop runs 3 times
- **Differentiation:** support: dance-move cards with the loops drawn as boxes inside boxes / stretch: write a nested loop that produces exactly 24 claps in two different ways
- **Materials:** dance cards, whiteboards, music
- **Joy:** 'Loop dance' performance

### Lesson 2 — Ada Lovelace and the first loops
- **Duration:** 40 min
- **Objective:** "By the end, I can explain who Ada Lovelace was and why loops mattered in her work." (UK NC KS2 Computing; history of computing)
- **Hook:** "In the 1840s, before electricity was in homes, a woman wrote what many call the first computer program. How?"
- **Key activity:** Story of Ada Lovelace and Charles Babbage's Analytical Engine (designed, never completed); her notes described repeating a set of operations. Children act out a 'human computer' following a looped program.
- **Check for understanding:** "What idea in Ada Lovelace's notes do we still use in every program today?" → repeating a set of instructions — a loop
- **Differentiation:** support: picture timeline / stretch: explain why Babbage's machine was never built but Ada's ideas still mattered
- **Materials:** story cards, timeline
- **Joy:** 'human computer' role-play

### Lesson 3 — Loops that change things each time
- **Duration:** 40 min
- **Objective:** "By the end, I can use a loop that changes a sprite a little each time (size, colour, position) and predict the result." (UK NC KS2 Computing (use repetition; variables preview))
- **Hook:** "Can you make a balloon grow, change colour and float away — in five blocks?"
- **Key activity:** Retrieve Year 2's walking-cat 'repeat' in one minute. New: loops with changing values — 'repeat 10 [change size by 10, change colour effect by 25, change y by 5]'; children predict what the sprite will look like after the loop, run it, and explain any difference; then make a growing, fading or spiralling effect of their own.
- **Check for understanding:** "A sprite starts at size 100%. What size is it after 'repeat 10 [change size by 10]', and why?" → 200% — the size grows by 10 each time round and the loop runs 10 times (10 × 10 = 100 more)
- **Differentiation:** support: step-by-step block cards and a prediction table to fill in / stretch: make the change depend on the loop so the sprite spirals outwards (change the move distance each time)
- **Materials:** computers/tablets with Scratch, block cards, prediction tables
- **Joy:** 'Magic balloon' animations

### Lesson 4 — Nested loops with the pen: flowers and snowflakes
- **Duration:** 40 min
- **Objective:** "By the end, I can use a loop inside a loop to repeat a shape around a point and explain the angles." (UK NC KS2 Computing; links to maths (angles))
- **Hook:** "In Year 2 you drew one square. Can you draw twelve squares in a perfect flower — with only seven blocks?"
- **Key activity:** Retrieve Year 2's pen polygons (turn = 360 ÷ sides) with a quick square and hexagon. New: nest the shape inside a second loop that turns a little each time — 'repeat 12 [repeat 4 [move 50, turn 90], turn 30]' — then design snowflakes and flowers, changing the numbers and explaining the pattern.
- **Check for understanding:** "Your program 'repeat 12 [repeat 4 [move 50, turn 90], turn 30]' draws a flower of squares. Why turn 30 in the outer loop?" → 12 squares × 30° = 360°, so the squares are spread evenly all the way round and the flower closes up
- **Differentiation:** support: a table of outer-loop numbers with the matching turns given (6 × 60, 8 × 45, 12 × 30) / stretch: nest three loops, or change the pen colour inside the outer loop
- **Materials:** Scratch with pen extension, protractor images
- **Joy:** 'Snowflake' art gallery

### Lesson 5 — Many loops at once: parallel scripts
- **Duration:** 40 min
- **Objective:** "By the end, I can run several loops at the same time in different sprites and use broadcasts to make them start in the right order." (UK NC KS2 Computing (sequence; repetition))
- **Hook:** "In an aquarium, every fish moves at the same time. How can one computer run all their loops at once?"
- **Key activity:** Retrieve Year 2's forever-loop aquarium. New: several sprites with their own forever and repeat loops running in parallel; then use 'broadcast' (from Year 2) at the end of one script to start another, so a scene happens in order (a diver swims down, then the fish scatter).
- **Check for understanding:** "Two sprites each have a forever loop. Why do they both move at once — and how could you make the second one start only after the first has finished its repeat loop?" → Scratch runs each sprite's script at the same time (in parallel); put a 'broadcast' after the first sprite's loop and start the second sprite's script 'when I receive' that message
- **Differentiation:** support: a pre-made project to modify / stretch: use 'broadcast and wait' and explain how it differs from 'broadcast'
- **Materials:** Scratch
- **Joy:** 'Underwater show' with scenes in order

### Lesson 6 — Debugging loops: trace, test, fix
- **Duration:** 40 min
- **Objective:** "By the end, I can find and fix bugs in loop programs by tracing what happens each time round the loop." (UK NC KS2 Computing (detect and correct errors))
- **Hook:** "You met Grace Hopper's moth in Year 2. Today's bugs are harder: they hide inside loops."
- **Key activity:** Teach tracing: a table with one row per time round the loop (what the sprite does, where it is, what it has drawn). Children receive four buggy Scratch programs (wrong repeat count, turn outside the loop, blocks in the wrong loop of a nested pair, a loop that never ends); predict, trace, run, fix and explain each fix.
- **Check for understanding:** "The flower program draws only one square. Trace it: what's the bug and how did you find it?" → the 'turn 30' is outside the outer loop (or inside the inner one); the trace table showed the outer turn never happened between squares
- **Differentiation:** support: bugs listed as clues and a half-filled trace table / stretch: create a buggy nested-loop program for a partner and write the answer key
- **Materials:** Scratch, bug cards, trace tables
- **Joy:** 'Bug hunters' badges

### Lesson 7 — Repeat until
- **Duration:** 40 min
- **Objective:** "By the end, I can use 'repeat until' with a condition so a loop stops at the right moment." (UK NC KS2 Computing (use repetition; work with various forms of input))
- **Hook:** "Keep going until … the car reaches the finish line. How does the computer know when to stop?"
- **Key activity:** Model 'repeat until <touching [finish line]?> [move 5]' in a racing project; explore sensing conditions (touching a colour, touching a sprite, timer > 10). Children build a race between two sprites that stops each one at the line and says 'I win!' or 'Finished!'.
- **Check for understanding:** "How is 'repeat until touching finish' different from 'repeat 50'?" → 'repeat until' stops when a condition becomes true, however many steps it takes; 'repeat 50' always runs exactly 50 times, even if the sprite hasn't arrived or has gone past
- **Differentiation:** support: a starter project with the finish line and blocks provided / stretch: add a random speed to each car ('move pick random 1 to 5') and explain why the loop still stops correctly
- **Materials:** Scratch, starter project
- **Joy:** 'Grand Prix' race with random speeds

### Lesson 8 — Project: design and build a loop game
- **Duration:** 40 min
- **Objective:** "By the end, I can design, build and test a simple game that uses at least two kinds of loop." (UK NC KS2 Computing (design, write and debug programs that accomplish specific goals))
- **Hook:** "Your challenge: design a game a Year 2 child would love — and loops must power it."
- **Key activity:** Children plan on paper (sprites, what each does, which loops: e.g. a 'forever' loop moving a character with arrow keys, a 'forever' bouncing obstacle, a 'repeat until' countdown), then build, test with a partner and debug. Show-and-tell: each child explains one loop in their code.
- **Check for understanding:** "Point to a loop in your game. What does it do, and why did you choose that kind of loop?" → explains, e.g., a forever loop keeps the ball bouncing all game; a repeat until stops the timer at 0
- **Differentiation:** support: a partly built template game to customise / stretch: add a score using a variable (preview of Year 4) and explain it
- **Materials:** Scratch, planning sheets
- **Joy:** 'Arcade day': Year 2 visitors play the games

**End-of-unit check:** Show and tell: build a Scratch program that uses a nested loop, two scripts running in parallel and a 'repeat until'; explain each loop's job and how one bug was found by tracing.

---

## Unit 2 — Data: branching databases

**Essential question:** How can yes/no questions sort and identify anything?

**Key vocabulary:** data, database, attribute, branching database, yes/no question, sort, classify, identify, test, efficient, structure

### Lesson 9 — Yes/no questions sort the world (unplugged)
- **Duration:** 40 min
- **Objective:** "By the end, I can sort objects using yes/no questions and explain what makes a good question." (UK NC KS2 Computing (collect, organise and present data))
- **Hook:** "Twenty Questions: can you guess my mystery animal with only yes/no questions?"
- **Key activity:** Play '20 Questions'; then sort a set of objects (fruit, toy animals) into two groups with one question at a time, building a tree on the floor with string. Discuss good questions (objective, split the group) vs poor ones ('Is it nice?').
- **Check for understanding:** "Why is 'Is it red?' a better database question than 'Is it pretty?'" → it has a clear yes/no answer everyone agrees on; 'pretty' is an opinion
- **Differentiation:** support: objects with clear, visible attributes / stretch: find a question that splits the group exactly in half and explain why that's efficient
- **Materials:** real objects, string, question cards
- **Joy:** Twenty Questions champion

### Lesson 10 — Building a branching database on paper
- **Duration:** 40 min
- **Objective:** "By the end, I can build a branching database for a set of items that identifies each one." (UK NC KS2 Computing; links to Science (classification keys))
- **Hook:** "Can you build a key that identifies every minibeast in our science survey?"
- **Key activity:** Groups sort 8 picture cards into a branching tree on paper with yes/no questions until every item is alone; test by 'finding' a mystery card.
- **Check for understanding:** "How do you know your database is finished?" → every item ends up on its own at the end of a branch
- **Differentiation:** support: fewer items (6) / stretch: reduce the number of questions needed and explain why fewer is better
- **Materials:** picture cards, A3 paper
- **Joy:** swap-and-test with another group

### Lesson 11 — Building a branching database on screen
- **Duration:** 40 min
- **Objective:** "By the end, I can create a branching database using a digital tool." (UK NC KS2 Computing (use software to accomplish goals))
- **Hook:** "Let's turn our paper tree into a database a computer can use."
- **Key activity:** Use a branching database tool (e.g. the branching tool in J2e's j2data, or slides linked with hyperlinks); enter questions and items; test.
- **Check for understanding:** "What happens if a question is ambiguous in a digital database?" → users may go down the wrong branch and misidentify the item
- **Differentiation:** support: a partly built database / stretch: add pictures and a 'not found' route
- **Materials:** devices with a branching database tool
- **Joy:** class database of world animals

### Lesson 12 — Testing and improving
- **Duration:** 40 min
- **Objective:** "By the end, I can test a branching database and improve questions that cause errors." (UK NC KS2 Computing (debug))
- **Hook:** "Your partner is the tester — can they break your database?"
- **Key activity:** Partners test each other's databases with all items; record errors; improve ambiguous questions and structure.
- **Check for understanding:** "Which question caused a wrong answer, and how did you improve it?" → names the ambiguous question and a clearer replacement
- **Differentiation:** support: tester checklist / stretch: restructure to make the database more balanced
- **Materials:** devices, checklists
- **Joy:** 'Break my database' challenge

### Lesson 13 — Branching databases in the real world
- **Duration:** 40 min
- **Objective:** "By the end, I can explain where branching databases and yes/no decisions are used in real life." (UK NC KS2 Computing (understand computer systems in the real world))
- **Hook:** "How does a helpline or an app diagnose a problem by asking you questions?"
- **Key activity:** Explore real examples: plant identification apps, customer-service phone menus, doctors' diagnostic flowcharts; children design a branching 'help robot' flowchart for a school problem (e.g. 'My computer won't turn on').
- **Check for understanding:** "Where is a branching database used in real life, and why is it useful there?" → e.g. a plant ID app asks questions to narrow down species quickly
- **Differentiation:** support: picture examples to discuss / stretch: design a help flowchart with at least 3 levels
- **Materials:** examples, flowchart templates
- **Joy:** 'Help robot' flowchart tested by classmates

**End-of-unit check:** Show and tell: build and test a branching database that correctly identifies every item, and explain why each question is objective and useful.

---

## Unit 3 — Networks: how information travels

**Essential question:** How does a message, photo or video get from one device to another across the world?

**Key vocabulary:** network, router, signal, copper cable, fibre-optic cable, Wi-Fi, radio waves, packet, check number, resend, server, data centre, the cloud, URL, domain name, path, https

### Lesson 14 — Wires, light and radio: how signals carry data
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how data travels as signals through copper wires, fibre-optic cables and Wi-Fi, and compare them." (UK NC KS2 Computing (understand computer networks))
- **Hook:** "In Year 2 you built a string network. But what actually travels down the string — or through the air?"
- **Key activity:** Two-minute retrieval of Year 2's network parts (devices, router, cables, Wi-Fi). New: data as on/off signals — children send a short message across the room as flashes of a torch (fibre: light), taps on a table (copper: electrical pulses) and a 'radio' code (Wi-Fi: invisible radio waves), using an agreed code; then tour the school network (with the IT technician) to spot each kind.
- **Check for understanding:** "Why might a school use cables for its main connections but Wi-Fi in classrooms?" → cables are usually faster and more reliable; Wi-Fi lets laptops and tablets move around without wires, but walls and distance weaken it
- **Differentiation:** support: picture labels of the three kinds of connection / stretch: explain why fibre-optic cables can carry data further and faster than copper
- **Materials:** torches, a code card, labels, access to the school network cabinet with an adult
- **Joy:** 'Torch Morse' message race

### Lesson 15 — Lost packets: how networks check and resend (unplugged)
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how a computer notices a missing or damaged packet and gets it sent again." (UK NC KS2 Computing)
- **Hook:** "A packet goes missing on its way across the world. How does your computer even know?"
- **Key activity:** Retrieve Year 2's packet game in one round (numbered pieces, reassembled). New: add a 'check number' to each packet (e.g. the number of letters it carries); a 'noisy router' secretly changes or removes some packets; receivers use the numbers to spot missing or damaged packets and send back 'please resend 4'.
- **Check for understanding:** "A packet arrives with 9 letters but its check number says 10. What has happened, and what should the receiving computer do?" → the packet has been damaged on the way; the computer throws it away and asks for that packet to be sent again
- **Differentiation:** support: fewer, larger packets with the check numbers already written / stretch: design a better check that would also catch two swapped letters
- **Materials:** message cards, envelopes, check-number sheets
- **Joy:** 'Noisy network' challenge

### Lesson 16 — Where the web lives: servers and data centres
- **Duration:** 40 min
- **Objective:** "By the end, I can explain what servers and data centres do and why they need so much energy and cooling." (UK NC KS2 Computing (understand networks and the services they provide))
- **Hook:** "When you watch a video, where is it actually stored? Not in your tablet!"
- **Key activity:** Retrieve Year 2's browser–server request role-play. New: photos and a short approved tour video of a data centre; how 'the cloud' is really buildings full of servers around the world; why they need huge amounts of electricity and cooling, and how some are built in cold places or run on renewable energy (links to science and geography). Children map where a favourite app's servers might be.
- **Check for understanding:** "Why is 'the cloud' not really in the sky, and why do data centres need so much cooling?" → the cloud is thousands of real computers (servers) in buildings; they run all day and night and get hot, so they need cooling to keep working
- **Differentiation:** support: a picture sequence from a tablet to a data centre and back / stretch: suggest two ways data centres could use less energy
- **Materials:** photos or video of data centres, world map
- **Joy:** 'Design a greener data centre' sketch

### Lesson 17 — Reading a URL: domains, paths and https
- **Duration:** 40 min
- **Objective:** "By the end, I can name the parts of a web address and use them to judge where a page comes from." (UK NC KS2 Computing (understand the World Wide Web))
- **Hook:** "Two web addresses look almost the same. One is a real museum, one is a trick. Can you tell?"
- **Key activity:** Retrieve Year 2's internet vs web in one question. New: break URLs into parts — https (secure connection), domain name (who runs the site), country and type endings (.org, .edu, .gov, .co.uk, .ke), and the path (which page); spot look-alike addresses used in tricks; link to Unit 5's reliability checks.
- **Check for understanding:** "Look at https://www.museum-example.org/dinosaurs/t-rex. Which part tells you who runs the site, and which part tells you the page?" → the domain name (museum-example.org) tells you who runs it; the path (/dinosaurs/t-rex) tells you which page on the site
- **Differentiation:** support: a URL cut into coloured pieces to label / stretch: explain what 'https' and the padlock mean — and why a padlock alone doesn't prove a site is honest
- **Materials:** browser, URL cards
- **Joy:** 'URL detectives' — real or look-alike?

### Lesson 18 — Unit review: network explainer
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how a message travels across a network using the correct vocabulary." (UK NC KS2 Computing)
- **Hook:** "Make a comic that shows a photo's journey from your tablet to your grandma's phone in another country."
- **Key activity:** Children create a comic strip with packets, routers, cables, servers and the internet; share and check each other's accuracy.
- **Check for understanding:** "Your photo travels by Wi-Fi, copper and fibre, and one packet is damaged. Explain the journey and how the photo still arrives complete." → the photo is split into packets and sent as radio, electrical and light signals through routers; the receiver checks each packet, asks for the damaged one again, and reassembles them in order
- **Differentiation:** support: comic template with vocabulary bank / stretch: include what happens when a packet is lost
- **Materials:** comic templates
- **Joy:** 'Journey of a photo' comic gallery

**End-of-unit check:** Show and tell: explain with a diagram how a photo travels as signals and packets (including how a lost packet is resent), what a data centre does, and what each part of a URL tells you.

---

## Unit 4 — Creating media: audio and video

**Essential question:** How do creators plan, record and edit audio and video to tell a story or share information?

**Key vocabulary:** media, audio, podcast, microphone, record, edit, trim, sound effect, volume, storyboard, shot, close-up, wide shot, video, clip, sequence, transition, copyright, credit

### Lesson 19 — Planning with a storyboard
- **Duration:** 40 min
- **Objective:** "By the end, I can plan a short video with a storyboard showing shots, action and sound." (UK NC KS2 Computing (select, use and combine software to create content))
- **Hook:** "Every film — from cartoons to blockbusters — starts as drawings in boxes. Why?"
- **Key activity:** Watch a short, silent sequence and reverse-engineer it into a storyboard; learn shot types (wide, medium, close-up); groups storyboard a 30-second 'how-to' or story video (links to English explanation or a Spanish weather forecast).
- **Check for understanding:** "Why do filmmakers plan with a storyboard before filming?" → to decide shots and order in advance, saving time and making the story clear
- **Differentiation:** support: a 6-box storyboard template with shot-type icons / stretch: include a close-up for a reason and explain its effect
- **Materials:** storyboard templates, example clips
- **Joy:** 'Silent film' storyboard reveal

### Lesson 20 — Recording audio
- **Duration:** 40 min
- **Objective:** "By the end, I can record clear audio narration and sound effects." (UK NC KS2 Computing)
- **Hook:** "Why do podcasters record in cupboards full of coats?"
- **Key activity:** Test recording in different places; learn microphone distance, quiet space, soft surfaces to reduce echo; record narration and Foley sound effects (links to Science: sound).
- **Check for understanding:** "Why did the recording in the coat cupboard sound better than in the hall?" → soft materials absorb sound and reduce echo
- **Differentiation:** support: a recording checklist / stretch: create a sound effect that tricks the listener (e.g. snapping celery for a breaking branch, or coconut shells for horses' hooves)
- **Materials:** tablets or laptops with a recording app, household objects
- **Joy:** 'Foley studio' sound effects

### Lesson 21 — Editing audio
- **Duration:** 40 min
- **Objective:** "By the end, I can edit audio by trimming, sequencing and adjusting volume." (UK NC KS2 Computing)
- **Hook:** "Radio shows are edited — the 'umms' disappear!"
- **Key activity:** Use a simple audio editor (e.g. Audacity or the recording app's editor) to trim silence, cut mistakes, layer a sound effect and adjust volume.
- **Check for understanding:** "How did you make the sound effect quieter than your voice?" → lowered the volume of that track or clip
- **Differentiation:** support: step-by-step picture guide / stretch: fade music in and out
- **Materials:** Audacity or equivalent, headphones
- **Joy:** 'Radio show' mini-podcast

### Lesson 22 — Filming video
- **Duration:** 40 min
- **Objective:** "By the end, I can film video clips using different shots and steady technique." (UK NC KS2 Computing)
- **Hook:** "Wobbly camera = seasick audience. How do the pros keep it steady?"
- **Key activity:** Film storyboard shots with steady technique (two hands, elbows in, or a tripod), good light and framing.
- **Check for understanding:** "What did you do to keep your shot steady and clear?" → held the device with two hands, elbows in, and filmed with light behind the camera
- **Differentiation:** support: fewer shots / stretch: film a shot from an unusual angle for effect
- **Materials:** tablets, tripods
- **Joy:** film crew roles

### Lesson 23 — Editing video and credits
- **Duration:** 40 min
- **Objective:** "By the end, I can edit clips into a sequence with titles, transitions and credits, respecting copyright." (UK NC KS2 Computing (use technology respectfully))
- **Hook:** "Can we use any song we like in our video? Who owns music?"
- **Key activity:** Import clips, trim, order to match storyboard, add titles and credits; use copyright-free music and credit sources.
- **Check for understanding:** "Why must we credit music and images we didn't create?" → the creators own them; crediting respects their work and using copyright-free media keeps us within the law
- **Differentiation:** support: template project / stretch: add a transition only where it helps
- **Materials:** video editing app, royalty-free music library
- **Joy:** premiere prep

### Lesson 24 — Premiere and review
- **Duration:** 40 min
- **Objective:** "By the end, I can present my video to an audience and evaluate it against success criteria." (UK NC KS2 Computing (evaluate digital content))
- **Hook:** "Red-carpet premiere! Tonight's screenings are all made by Year 3 directors."
- **Key activity:** Groups introduce their video (purpose, audience, one technique they're proud of) and screen it; audience gives feedback on criteria (clear narration, steady shots, sensible order, credits). Groups note one change for a 'director's cut'.
- **Check for understanding:** "What is one strength of your video and one thing you would change in a director's cut?" → names a specific strength (e.g. close-up shows the key step) and a specific improvement (e.g. re-record the narration more slowly)
- **Differentiation:** support: a feedback card with icons for each criterion / stretch: explain how you would adapt the video for a different audience (e.g. younger children)
- **Materials:** projector or big screen, feedback cards
- **Joy:** red-carpet premiere with popcorn and tickets

**End-of-unit check:** Show and tell: present a 30-second video with narration made from a storyboard, and explain two editing decisions and how you credited sources.

---

## Unit 5 — Digital literacy: researching with reliable sources

**Essential question:** How can I tell whether information online is true, and use it fairly?

**Key vocabulary:** source, reliable, unreliable, fact, opinion, advert, sponsored, author, date, cross-check, fake, edited image, bias, copy, own words, credit

### Lesson 25 — Reliable or unreliable?
- **Duration:** 40 min
- **Objective:** "By the end, I can judge whether a website is reliable using a checklist." (UK NC KS2 Computing (be discerning in evaluating digital content))
- **Hook:** "A website says the Pacific Northwest tree octopus is endangered. Should we save it?"
- **Key activity:** Explore the well-known hoax 'tree octopus' website and a real museum page; build a reliability checklist (Who made it? Why? When? Can I check it elsewhere? Do experts agree?).
- **Check for understanding:** "What clues show that the tree octopus website isn't reliable?" → octopuses live in water; no scientific sources back it up; other reliable sites don't mention it
- **Differentiation:** support: a picture checklist / stretch: find a real fact that sounds unbelievable and prove it's true
- **Materials:** devices, printed pages, checklists
- **Joy:** 'Fact or fake?' detective game

### Lesson 26 — Fact, opinion and adverts
- **Duration:** 40 min
- **Objective:** "By the end, I can distinguish facts, opinions and adverts online." (UK NC KS2 Computing (digital literacy))
- **Hook:** "Is 'This is the best game ever!' a fact?"
- **Key activity:** Sort statements from web pages and videos into fact, opinion and advert; spot 'sponsored' labels and hidden adverts in children's videos.
- **Check for understanding:** "How can you tell when a video is actually an advert?" → labels like 'ad' or 'sponsored', the creator was given the product, it tries to make you buy
- **Differentiation:** support: sorting cards / stretch: rewrite an opinion as a checkable fact
- **Materials:** statement cards, example pages
- **Joy:** 'Advert alarm' game

### Lesson 27 — Cross-checking and edited images
- **Duration:** 40 min
- **Objective:** "By the end, I can cross-check facts in two sources and recognise that images can be edited." (UK NC KS2 Computing)
- **Hook:** "Is that photo of a shark swimming down a flooded street real?"
- **Key activity:** Look at famous edited or misleading images (age-appropriate); learn to check with a second trusted source; try simple edits on a photo to see how easy it is.
- **Check for understanding:** "Why should you check a surprising photo or fact in a second source?" → photos can be edited and facts can be wrong; a trusted second source confirms it
- **Differentiation:** support: side-by-side image pairs / stretch: explain how a real photo can mislead without editing (cropping, wrong caption)
- **Materials:** devices, image pairs
- **Joy:** 'Spot the edit' challenge

### Lesson 28 — Who writes the web? Wikis, reviews and comments
- **Duration:** 40 min
- **Objective:** "By the end, I can explain that much of the web is written by ordinary users and judge how far to trust wikis, reviews and comments." (UK NC KS2 Computing (be discerning in evaluating digital content))
- **Hook:** "Anyone can edit Wikipedia — even you. So why do so many people use it?"
- **Key activity:** Retrieve Year 2's search-and-check habits in one minute. New: user-generated content — look at a child-friendly wiki page and its history of edits, a product page with star reviews, and a comments section; discuss who wrote each, why, and how to check; practise using a wiki's references to reach the original source.
- **Check for understanding:** "Anyone can edit Wikipedia. Why can it still be useful, and how should you use it for research?" → many editors check and correct pages, and good pages list their sources; use it as a starting point and check important facts in the sources it lists or another trusted source
- **Differentiation:** support: three examples with 'who wrote it?' labels / stretch: explain why lots of five-star reviews can still be misleading (fake or paid reviews)
- **Materials:** devices, printed example pages
- **Joy:** 'Edit war' role-play showing how wiki editors correct a false claim

### Lesson 29 — Unit review: research mission
- **Duration:** 40 min
- **Objective:** "By the end, I can research a question using reliable sources, check facts in two places and credit my sources." (UK NC KS2 Computing (use search technologies effectively; be discerning in evaluating digital content))
- **Hook:** "Research mission: find three true, surprising facts about an animal from our science unit — and prove they're true."
- **Key activity:** Children write a research question, choose keywords, search on a child-safe engine, record each fact with its source, cross-check it in a second trusted source, and make a fact card with a 'sources' line. They also note one site they rejected and why.
- **Check for understanding:** "How do you know your facts are reliable, and why did you reject one website?" → each fact was confirmed in two trusted sources (e.g. a museum and an encyclopedia); a site was rejected for no author, adverts or claims no one else supports
- **Differentiation:** support: a list of three pre-checked websites to start from / stretch: record a fact that two sources disagreed on and explain which you trust
- **Materials:** devices, child-safe search engine, fact-card templates
- **Joy:** 'Fact file' cards pinned to a class 'Wall of True'

**End-of-unit check:** Show and tell: present three facts checked in two reliable sources, credit the sources, and explain one clue that a different website was unreliable.

---

## Unit 6 — Online safety: private, kind and balanced

**Essential question:** How can I stay safe, be kind and keep a healthy balance when I use technology?

**Key vocabulary:** personal information, private, password, privacy settings, digital footprint, stranger, report, block, cyberbullying, upstander, screen time, balance, wellbeing, SMART rules, trusted adult

### Lesson 30 — Privacy settings and app permissions
- **Duration:** 40 min
- **Objective:** "By the end, I can explain what app permissions and privacy settings control and decide which permissions an app really needs." (UK NC KS2 Computing (use technology safely; keep personal information private))
- **Hook:** "A drawing app wants to use your location, your camera and your contacts. Why?"
- **Key activity:** Quick retrieval of Year 2's private information and three-random-word passwords. New: permissions (location, camera, microphone, contacts) and public vs private accounts; children sort pretend apps' permission requests into 'needed to work' and 'not needed', and plan settings for a new game account with an adult.
- **Check for understanding:** "A drawing app asks to use your location and contacts. Should you allow it? Explain." → no — a drawing app doesn't need your location or contacts to work; allowing them shares private information, so say no or ask a trusted adult
- **Differentiation:** support: sorting cards with pictures / stretch: explain why a map app needs location but should only use it while you are using the app
- **Materials:** permission-request cards, pretend settings screens
- **Joy:** 'Permission police' sorting game

### Lesson 31 — People online aren't always who they say
- **Duration:** 40 min
- **Objective:** "By the end, I can recognise that people online may pretend and know what to do if a stranger contacts me." (UK NC KS2 Computing; UK RSHE (online relationships))
- **Hook:** "Is 'Emma, age 9' really Emma, age 9?"
- **Key activity:** Use Childnet's SMART rules (Safe, Meet, Accepting, Reliable, Tell); scenarios of friend requests and messages; practise responses (don't reply, block, report, tell a trusted adult).
- **Check for understanding:** "A stranger online asks where you go to school. What should you do?" → don't reply with the information; block, report and tell a trusted adult
- **Differentiation:** support: scenario cards with picture choices / stretch: explain why meeting an online-only 'friend' is never safe without a parent
- **Materials:** SMART rules poster, scenario cards
- **Joy:** SMART rules role-play

### Lesson 32 — Being kind online and being an upstander
- **Duration:** 40 min
- **Objective:** "By the end, I can explain what cyberbullying is and how to be an upstander." (UK NC KS2 Computing (respectful use); UK RSHE)
- **Hook:** "Is a 'joke' still a joke if only one person is laughing?"
- **Key activity:** Scenarios in group chats and games; discuss the difference between banter and bullying; upstander actions (don't join in, support the target, save evidence, tell an adult, report).
- **Check for understanding:** "What can an upstander do if someone is being unkind in a group chat?" → not join in, message the person kindly, tell a trusted adult, report the messages
- **Differentiation:** support: scenario cards and response prompts / stretch: write a class 'online kindness charter'
- **Materials:** scenario cards
- **Joy:** kindness charter signing

### Lesson 33 — Screens and sleep
- **Duration:** 40 min
- **Objective:** "By the end, I can explain how screens and app design can affect my sleep and plan a healthy evening routine." (UK NC KS2 Computing; UK RSHE (internet safety and harms))
- **Hook:** "Your tablet says 'Just one more episode — starting in 5, 4, 3…'. Who decided that?"
- **Key activity:** Retrieve Year 2's adverts, rewards and screen balance in one minute. New: how autoplay, notifications and streaks work at bedtime; why sleep matters for learning and mood (link to the PE sleep lesson); children log their evening screen use for a week and design a bedtime routine with an adult.
- **Check for understanding:** "Why might using a screen just before bed make it harder to fall asleep, and what is one rule that would help?" → bright screens and exciting content keep the brain alert, and notifications can wake you; e.g. screens off an hour before bed and devices charged outside the bedroom
- **Differentiation:** support: a simple evening log with pictures / stretch: design an app feature that helps users stop at bedtime
- **Materials:** evening logs
- **Joy:** 'Sleep-friendly evening' comic strip

### Lesson 34 — When something online upsets me
- **Duration:** 40 min
- **Objective:** "By the end, I can know how to get help when I see something upsetting online." (UK NC KS2 Computing (identify a range of ways to report concerns))
- **Hook:** "What should you do if you see something online that makes you feel scared or sad?"
- **Key activity:** Practise the plan: close the screen or turn the device over, don't share it, tell a trusted adult; know about reporting buttons and helplines appropriate to your country (e.g. Childline in the UK).
- **Check for understanding:** "Why should you tell an adult rather than just closing it and forgetting it?" → an adult can help you feel better, report it and stop it happening again
- **Differentiation:** support: picture step card / stretch: explain how to report content on a platform you use
- **Materials:** step cards
- **Joy:** 'Help plan' bookmark

### Lesson 35 — Year 3 computing showcase
- **Duration:** 40 min
- **Objective:** "By the end, I can present my best computing work and explain what I learned about being a safe, creative digital citizen." (UK NC KS2 Computing)
- **Hook:** "Showcase day: games, databases, videos and safety charters on display!"
- **Key activity:** Children present their loop game, branching database or video to families or another class, and share one online-safety message.
- **Check for understanding:** "What is one thing you created this year and one safety rule you'll always follow?" → names a project and a clear safety rule
- **Differentiation:** support: presentation prompts / stretch: explain how your project could be improved with Year 4 skills (variables, if)
- **Materials:** devices, displays
- **Joy:** showcase day

**End-of-unit check:** Show and tell: explain what personal information to keep private, how to respond to a stranger or unkind message, and your personal plan for a healthy screen-time balance.

---

## Books & resources

- **Scratch** (scratch.mit.edu, MIT Media Lab) — free block-based programming environment used for the loops unit; the offline editor works without internet.
- **Barefoot Computing** — free unplugged and Scratch lessons for primary computational thinking.
- ***Hello Ruby: Adventures in Coding* by Linda Liukas** — a picture book with unplugged activities that make loops, sequences and debugging concrete.
- ***Ada Lovelace, Poet of Science* by Diane Stanley** — a picture-book biography of the first programmer.
- ***Grace Hopper: Queen of Computer Code* by Laurie Wallmark** — picture-book biography of Grace Hopper, including the famous 'bug'.
- **Childnet International (SMART rules)** and **Common Sense Education digital citizenship lessons** — high-quality online-safety materials.
- **UKCIS *Education for a Connected World*** — framework mapping online-safety learning by age.
- **Audacity** (free audio editor) and a simple video editor on school tablets — for the media unit; **free-to-use music and image libraries** for copyright-safe media.
- **Submarine cable map** (e.g. TeleGeography's public map) — shows the undersea cables that carry the internet.

## End-of-year mastery checks

1. **Loops** — writes Scratch programs with nested loops, loops that change values, parallel scripts and repeat until, and explains when to use each. *See it:* the loop game.
2. **Debugging** — finds and fixes bugs systematically by tracing each time round a loop. *See it:* the bug-hunt tasks.
3. **Maths through code** — draws rotating patterns with nested loops and explains both turn angles. *See it:* the snowflake program.
4. **Branching databases** — builds and tests a branching database with objective yes/no questions.
5. **Networks** — explains how signals carry data, how lost packets are resent, what data centres do and how to read a URL.
6. **Media** — plans with a storyboard, records and edits audio and video, and credits sources.
7. **Digital literacy** — judges reliability, distinguishes facts, opinions and adverts, and cross-checks information.
8. **Online safety** — manages privacy settings and app permissions, knows the SMART rules, acts as an upstander, protects sleep, and knows how to get help.

## Teacher guidance

**Unplugged first.** Introduce each new idea without a screen (dance loops, human networks, packet races), then move to devices.

**Common misconceptions to watch for.**
- *A loop is only for repeating identical things* — loops can repeat actions that change the sprite each time (move, turn, change costume).
- *Forever loops are always better* — use repeat for a fixed number of times and repeat until when a condition should stop the loop.
- *Blocks outside a loop still repeat* — only blocks inside the loop's 'mouth' repeat.
- *The cloud is in the sky* — it is real computers (servers) in data centres.
- *Wi-Fi is the internet* — Wi-Fi is just the last short radio link to the router; the internet is the worldwide network beyond it.
- *If it's online, it's true* — always cross-check.
- *Deleted means gone forever* — screenshots and copies can remain (preview of Year 4's digital footprint).
- *Only strangers are a risk online* — unkindness can come from people we know; be an upstander.

**Safeguarding.** Online-safety lessons can prompt disclosures. Follow the school's safeguarding procedures. Use child-safe search engines and preview all web pages and videos.

**Differentiation.** Support = unplugged practice, partly built Scratch projects, block cards, working in pairs. Stretch = nested loops, conditions, remixing projects, teaching others, and explaining code line by line.

**Vertical connections.** Builds on Year 2's sequences, events, broadcasts, simple repeat/forever loops and pen polygons, networks, packets and the web, data tables, and first online-safety habits — each retrieved briefly, then extended. Year 4 adds selection (if/else) and variables, how computers work inside (input, processing, storage, binary), spreadsheets, how search engines rank pages and managing a digital footprint.

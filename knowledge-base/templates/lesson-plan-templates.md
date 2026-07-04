# Lesson-plan templates — ready to fill, mapped to Classai's beats

Eight reusable lesson-plan templates for primary tutoring (ages 5–11). Each one has **blank fields**, a **worked example** filled in for a real primary topic, and a **beat → block map** showing how it lands on the app's arc **hook → explain → example → check → practice → recap** and which blocks to use.

**How to read each template.** Fields in `[ … ]` are blanks you fill. The "Beat map" table is the bridge to Classai: it tells the planner (or you) which beats to emphasise and which blocks fit. Remember the constants from `lesson-anatomy.md`: **one new idea per lesson; mostly the child *doing*, not listening; every check/practice beat carries a `wrongAnswers` playbook; display blocks show, interactive blocks carry the answer.** Match length to the age band — ~10–15 min (5–7), ~15–25 (7–9), ~20–30 (9–11).

Templates here, at a glance:

| # | Template | Use it when… | Beat emphasis |
|---|----------|--------------|---------------|
| A | Gradual-release / direct instruction | teaching a brand-new skill | full arc, balanced |
| B | 5E inquiry | a concept best *discovered* (science, pattern-spotting) | explore before explain |
| C | Mastery with checks | the skill must be *secure* before moving on | check-heavy, gated |
| D | Review / retrieval | consolidating earlier learning | check/practice-heavy, little new |
| E | Diagnostic / placement | finding a child's starting level | checks only, no teaching |
| F | Practice / fluency | building speed & automaticity on a known skill | practice-heavy |
| G | Project / extended task | a multi-session applied piece | spans many lessons |
| H | 10-minute micro-lesson | one tiny idea, tight on time | compressed arc |

---

## A. Gradual-release / direct-instruction lesson ("I do → we do → you do")

The workhorse, and the **default mapping** to Classai's beats. Best for a clear, teachable skill or procedure.

### Template (fill the blanks)

```
Topic:              [the one skill, narrow]
Age / band:         [5–7 / 7–9 / 9–11]   Difficulty: [gentle / standard / challenge]
Length:             [~mins]
Learning intention: "By the end, I can [observable thing the child can do]."
Success criteria:   [1–3 checkable signs, e.g. "I can ___ on a fresh problem without help"]
Prior knowledge:    [the prerequisite to retrieve in the hook]
Key concepts:       [the 1–3 ideas at the core]
Hook:               [interest-linked entry] + [quick prior-knowledge retrieval question]
I do (explain):     [the think-aloud model — narrate the decisions, smallest steps, concrete first]
We do (example):    [the shared attempt — what you start, what you hand to the child]
Check:              question: [revealing, single-concept]
                    expectedAnswer: [ ]
                    wrongAnswers:
                      - answer: [likely mistake] · why: [misconception] · remedy: [one guiding move]
You do (practice):  [fresh solo problem, support faded] → [interleave with: ___]
Recap:              [child-led recall prompt] + [specific process praise to give]
Revisit later:      [what to bring back, when]
```

### Worked example — *Adding a 2-digit number and a 1-digit number, bridging ten* (age 7, standard, ~18 min)

```
Topic:              27 + 5 (bridging through ten)
Learning intention: "I can add a 1-digit number to a 2-digit number when it crosses a ten."
Success criteria:   I can split the small number to "make ten" and finish; I get a fresh one right alone.
Prior knowledge:    number bonds to 10 (3 + 7 = 10); counting in ones to 30
Key concepts:       "make ten then add the rest"; partition the second number to reach the next ten
Hook:               "You've got 27 football stickers and a pack of 5 more — how many now? First, quick: what goes with 7 to make 10?"
I do (explain):     Think aloud: "27 needs 3 more to reach 30. I split the 5 into 3 + 2. 27 + 3 = 30, then 30 + 2 = 32." Show on a number line.
We do (example):    Together do 48 + 6. I say "48 needs ___ to reach 50?" — child supplies 2; child splits the 6; I scribe.
Check:              question: "What is 36 + 7?"
                    expectedAnswer: "43 (make ten: 36 + 4 = 40, then 40 + 3 = 43)"
                    wrongAnswers:
                      - answer: "42" · why: forgot the +1 when bridging / lost one in the split · remedy: re-count the jump on the number line: 36→40 is 4, then 3 more = 43
                      - answer: "313" · why: wrote tens and ones side by side instead of adding · remedy: "is the answer near 36 or near 300?" reasonableness check, then place value
You do (practice):  Solo: 58 + 5. Then interleave a no-bridge one (52 + 3) so the child must decide *whether* to bridge.
Recap:              "Tell me your trick for crossing a ten." + "You spotted you needed 2 more to reach 60 — that's the key move."
Revisit later:      bring 36 + 7 back as a hook-retrieval in 3 days.
```

### Beat map

| Beat | This template's slot | Blocks |
|---|---|---|
| hook | Hook | warm speech / `emojiViz` / one retrieval `multipleChoice` |
| explain | I do | `whiteboard` (animate), `numberLine`, `steps`, short `richText`, `keyTerm` |
| example | We do | `steps`/`whiteboard` built together; `fillBlank` with `wordBank` |
| check | Check | `multipleChoice` / `numberEntry` / `fillBlank` (carries answer + wrongAnswers) |
| practice | You do | `numberEntry` / `multiSelect`, scaffolds faded; interleave a variant |
| recap | Recap | warm speech / one closing `shortText` |

---

## B. 5E inquiry lesson (Engage · Explore · Explain · Elaborate · Evaluate)

For concepts that are stronger when the child *notices the pattern first*, then you name it — common in science and in maths pattern work. **Caution:** inquiry needs the prerequisites in place; don't use it to teach raw basics (`pedagogy-core.md` — inquiry before basics backfires).

### Template

```
Topic:              [the concept to be discovered]
Age / band:         [ ]   Difficulty: [ ]
Engage (hook):      [a puzzle, surprise, or question that creates curiosity] + [prior-knowledge check]
Explore:            [the hands-on / data-gathering task the child does *before* being told the rule]
                    guiding prompt: "What do you notice? What stays the same? What changes?"
Explain:            [the concept named & made precise — *after* exploring; tie to what they saw]
Elaborate:          [apply/extend to a new case — "would it still work if…?"]
Evaluate (check):   question: [ ]  expectedAnswer: [ ]
                    wrongAnswers: - answer: [ ] · why: [ ] · remedy: [ ]
Recap:              [child states the discovered rule in their own words]
Revisit later:      [ ]
```

### Worked example — *Which materials are waterproof?* (age 6, standard, ~15 min)

```
Topic:              Waterproof vs absorbent materials
Engage:             "If it's raining, would you rather have a coat made of paper or plastic? Why?" + recall: "what does *soak up* mean?"
Explore:            Predict then test (described/animated): drip water on paper, cloth, foil, plastic. Sort into "lets water through / keeps water out."
                    prompt: "What do you notice about the ones that keep water out?"
Explain:            Name it: "Materials water can't pass through are *waterproof*. Ones that soak it up are *absorbent*." Connect to what they sorted.
Elaborate:          "Why are wellies made of rubber, not wool? What about an umbrella?"
Evaluate (check):   question: "A paper towel — waterproof or absorbent?"  expectedAnswer: "Absorbent — it soaks water up."
                    wrongAnswers:
                      - answer: "waterproof" · why: confuses 'looks dry/thin' with keeping water out · remedy: recall the test — paper let water through and went soggy; that's absorbent
Recap:              "In your own words — what makes something waterproof?"
Revisit later:      revisit with a new material (a sponge) in next science lesson.
```

### Beat map
Engage → **hook**; Explore → **example** (a "we do" investigation — use `whiteboard`/`slideshow` to show the test, `categorize`/`multiSelect` for the sort the child does); Explain → **explain** (named *after* the explore — `keyTerm`, `richText`); Elaborate → **practice** (apply to a new case); Evaluate → **check** + **recap**. Note the inversion: in 5E the *explore* comes before *explain*, so on the beat arc the child does an investigative example **before** the formal explanation.

---

## C. Mastery lesson with checks (gate every step)

For a foundational skill that *must* be secure before progressing — checks gate advancement; a miss loops back, not forward. Built on the mastery method + the reteach-vs-advance rule (`assessment-and-feedback.md` §6).

### Template

```
Topic:              [foundational skill]   Mastery threshold: [e.g. 4/5 correct WITH reasoning]
Prerequisite gate:  [quick check the child must pass before new content; if fail → backfill first]
Teach (small step 1): [ ]   → Check 1: q [ ] / expected [ ] / wrongAnswers [ ]   → pass? advance : reteach smaller
Teach (small step 2): [ ]   → Check 2: q [ ] / expected [ ] / wrongAnswers [ ]   → pass? advance : reteach smaller
Independent check:   [a fresh, scaffold-free item + a reasoning probe "how do you know?"]
Decision:            mastered (advance topic) / not yet (schedule re-teach)
Recap + revisit:     [ ]
```

### Worked example — *Number bonds to 10* (age 5–6, gentle, ~15 min)

```
Topic:              Pairs that make 10        Mastery threshold: 5/6 instant + can show on fingers
Prerequisite gate:  "Count me 10 fingers." (if shaky on counting to 10 → backfill counting first)
Teach step 1:       Show ten frame, 6 filled. "6 and how many empty? → 4. 6 + 4 = 10."
  Check 1:          q "8 and ___ make 10?"  expected "2"
                    wrongAnswers: - answer "3" · why counts the filled square not the gaps / off-by-one · remedy point and count the empty squares one by one
Teach step 2:       Hide the frame: "7 and ___?" (retrieval, no frame)
  Check 2:          q "3 + ___ = 10"  expected "7"
                    wrongAnswers: - answer "13" · why added instead of finding the missing part · remedy "we want to *reach* 10, not go past — how many more from 3?"
Independent check:  "Quickfire: 9? 5? 1?" + "How did you know 5's partner is 5?"
Decision:           mastered if 5/6 fast → move to bonds to 20; else re-teach with frame next session.
Recap + revisit:    "Tell me two pairs that make 10." Revisit as a warm-up daily for a week (these must be automatic).
```

### Beat map
The arc **loops**: explain → check → (pass) explain next step → check; a fail sends the director into its **stuck** path (reteach the smaller step, don't reveal). Use `numberEntry`/`fillBlank`/`multipleChoice` for the gated checks; `numberLine`/`whiteboard` ten-frame for the teach steps. End only when the independent, scaffold-free check passes *with reasoning* — that's the mastery signal, not a lucky tick (`assessment-and-feedback.md` §5).

---

## D. Review / retrieval lesson (consolidate, don't introduce)

Almost no new content — the point is to **re-retrieve** earlier learning so it sticks, surface anything decayed, and reteach lightly only where needed (`pedagogy-core.md` §4–5; `assessment-and-feedback.md` §7). Expect a little rustiness; that effortful recall *is* the benefit.

### Template

```
Topics revisited:   [2–4 earlier skills, prioritise known sticking points first]
Warm retrieval:     [3–5 quick low-stakes recall items across the topics — mix them, don't block]
Spot-check & sort:  for each: got it fast / slow but right / shaky → [shaky ones get a quick reteach]
Light reteach:      [only the shaky one — smallest reminder, then re-check]
Interleaved practice:[a few mixed items so the child must *choose* the method, not repeat one]
Recap:              [child recalls the big ideas] + [note what's now solid vs still needs work]
Revisit later:      [push solid items to longer spacing; keep shaky ones on short spacing]
```

### Worked example — *Review: times tables 2s, 5s, 10s + telling time* (age 8, standard, ~18 min)

```
Topics revisited:   ×2, ×5, ×10 facts; reading o'clock & half-past (clocks lean on ×5)
Warm retrieval:     "Mixed quickfire: 5×6? 10×3? half-past on this clock? 2×8? what's 5×5?"
Spot-check & sort:  fast: ×10, ×2 · slow: ×5 · shaky: minutes past on a clock face
Light reteach:      clock: "each number is 5 minutes — count round in 5s: 5, 10, 15…" (links to the ×5 they just did)
Interleaved practice:"7×5? show 'quarter past' — which number does the long hand point to? 10×4?" (switching types)
Recap:              "Which one felt rustiest? Let's keep that one warm." Note: ×5 + clock-minutes = short spacing.
Revisit later:      ×2/×10 → revisit in 2 weeks; clock minutes → revisit in 3 days.
```

### Beat map
Tiny **hook** (a retrieval, not new motivation) → straight into **check**/**practice** repeated across topics → minimal **explain** only on the shaky item → **recap**. This lesson is deliberately check/practice-heavy with almost no explain. Blocks: `flashcards` for warm retrieval, `multipleChoice`/`numberEntry`/`matchPairs` for spot-checks, interactive blocks for interleaved practice.

---

## E. Diagnostic / placement lesson (find the level — don't teach)

Used at the start of a topic or course to discover *where to begin* and *which prerequisites are missing*. **No teaching** — you're gathering evidence. Keep it warm and low-stakes so the child doesn't feel tested; frame it as "let's find the just-right starting point."

### Template

```
Goal:               place [child] within [topic/strand], find the highest secure point + any gaps
Frame for child:    "These help me find your just-right level — getting some wrong is exactly how it works."
Ladder of probes:   (easy → hard; stop ~2 misses past their ceiling)
  Probe 1 (below):  q [ ] → [secure? ✓/✗]
  Probe 2 (at):     q [ ] → [ ]
  Probe 3 (above):  q [ ] → [ ]
  Probe 4 (stretch):q [ ] → [ ]
Reasoning probe:    on any borderline answer: "how did you work that out?" (separates luck from skill)
Outcome:            highest secure level: [ ]   gaps found: [ ]   recommended start: [ ]   difficulty: [ ]
```

### Worked example — *Placement across fractions* (age 9, ~15 min)

```
Goal:               place a Y5 child within fractions; find ceiling + gaps
Frame:              "Quick fraction tour — some will be easy, some I expect you to miss. That's the point."
Ladder of probes:
  Probe 1 (below):  "Shade ½ of this shape." → ✓ secure
  Probe 2 (at):     "Which is bigger, ¾ or ½?" → ✓ ("¾, more parts shaded")
  Probe 3 (above):  "What is ½ + ¼?" → ✗ answered "2/6"
  Probe 4 (stretch):"Write ¾ as a decimal." → ✗ (not reached)
Reasoning probe:    on ½ + ¼ = 2/6: "tell me how" → "added tops and bottoms" → MISCONCEPTION: adding denominators.
Outcome:            secure: comparing & naming fractions · gap: equivalent fractions / common denominator
                    recommended start: equivalent fractions (½ = 2/4) BEFORE adding · difficulty: standard
```

### Beat map
This is **check after check** — no explain/practice beats. On the arc it's a string of `check` beats at rising difficulty, each carrying its `wrongAnswers` so a wrong answer is *diagnostic* (tells you which gap), terminated by a brief warm **recap** ("found our starting point"). The director's "stuck" loop is *suppressed* here — a miss is data, not a trigger to reteach. Feeds the recommended start + difficulty straight into the next real lesson's plan. Blocks: interactive only (`multipleChoice`, `numberEntry`, `shortText` for reasoning).

---

## F. Practice / fluency lesson (build speed & automaticity)

For a skill the child *understands* but isn't yet *fast* at. Goal is automaticity so the skill frees up working memory for harder things (`pedagogy-core.md` §13). Short, frequent, success-rich. **Pre-req:** only fluency-drill a skill that's *understood* — drilling a misunderstood procedure cements the error.

### Template

```
Skill (already understood): [ ]   Target: [e.g. "answer within 3 seconds" / "8/10 in 2 min"]
Quick accuracy check:       [1–2 items to confirm it's understood before speeding up; if wrong → stop, reteach]
Fluency set:                [a short run of same-type items, easy → snappy; track speed/streak]
Stretch / interleave:       [once smooth, mix in a near variant so it's recall not rote]
Self-monitor:               [child notices their own speeding up — "faster than last time?"]
Recap:                      [celebrate the gain] + [note new fluency target for next time]
```

### Worked example — *Fluency: number bonds to 20* (age 7, ~12 min)

```
Skill (understood):  pairs that make 20 (child can derive them, now needs them fast)
Target:              answer 8/10 within ~3 sec each
Quick accuracy check:"15 + ? = 20" → 5 ✓ (understood — proceed to speed)
Fluency set:         rapid: "13+?  18+?  11+?  9+?  16+?  6+? …" — keep a visible streak
Stretch / interleave:mix in bonds to 10 it builds on: "7+? to make 10 … now 17+? to make 20" (spot the link)
Self-monitor:        "You did 10 in the time you did 6 last week — feel that?"
Recap:               "Bonds to 20 are getting automatic. Next time we'll race to 9/10." 
```

### Beat map
Compressed: a tiny **check** to confirm understanding → a long **practice** run (the bulk of the lesson) → brief **recap**. Almost no explain. Use `numberEntry`/`fillBlank`/`flashcards`; keep stakes low and momentum high. If the accuracy check fails, abandon fluency and switch to a gradual-release reteach — never drill a misunderstood skill.

---

## G. Project / extended-task plan (spans several sessions)

For an applied, multi-lesson piece (a story, an investigation, a model, a presentation). Each session is still a normal beat-lesson; the **plan** sequences them and keeps a single thread. Best for older primary (8–11). Break into session-sized chunks with a check of understanding each time, so it doesn't become unguided busywork.

### Template

```
Project:            [the end product]   Driving question: [the real question it answers]
Total sessions:     [n]   Audience/purpose: [who it's for — gives it a reason]
Curriculum skills:  [the actual skills practised through it — the *why this counts* list]
Milestones (1 per session):
  S1: [plan/research]    → check: [child can state ___]
  S2: [draft/build core] → check: [ ]
  S3: [improve/edit]     → check: [ ]
  S4: [finish & share]   → check: [ ]
Success criteria:   [what a good final product shows — share with the child up front]
Scaffolds:          [planners, sentence starters, checklists per stage]
Reflection:         [child reviews against the criteria — what worked, what they'd change]
```

### Worked example — *Make a mini field-guide to our local birds* (age 9–10, 4 sessions)

```
Project:            A 4-page illustrated bird field-guide   Driving question: "Which birds live near us, and how do we tell them apart?"
Audience/purpose:   for a younger sibling to use on a walk
Curriculum skills:  non-chronological report writing; classification/observation (science); labelled diagrams; using subheadings
Milestones:
  S1 (research):    pick 4 local birds, note 3 features each → check: "what *distinguishing* features did you record?"
  S2 (draft):       write one bird entry with a heading + key facts → check: read it back — does it tell a reader how to spot it?
  S3 (improve):     add labels to a sketch; vary sentence openers → check: find one place to make it clearer
  S4 (finish/share):assemble 4 entries, present to sibling → check: explain why you grouped them this way
Success criteria:   clear subheadings · accurate features · a labelled picture each · reads as information, not a story
Scaffolds:          a 'features' table planner; sentence starters ("You can recognise it by…"); an editing checklist
Reflection:         "Which entry is your best and why? What would you change with more time?"
```

### Beat map
Each session = one beat-lesson (its **hook** re-anchors the project, **explain/example** teach that session's skill, **practice** = working on the product, **recap** = milestone check + what's next). Across sessions the *project* is the throughline; the app's spaced-review/memory carries continuity (note progress in `needsWork`/memory each time). Blocks: writing → `shortText`; planning → `categorize`/`ordering`; show-and-tell → `speak`; reference visuals → `image`/`slideshow`.

---

## H. 10-minute micro-lesson (one tiny idea, tight on time)

The compressed arc for a single small idea, a quick top-up, or when time is genuinely short. Everything is one thing: one model, one check, one practice. Front-loads the core idea so even if cut off, the child got it (`lesson-anatomy.md` — time-box gracefully).

### Template

```
One idea:          [the single tiny thing]
Hook (30s):        [one line linking to interest + one recall question]
Show (1–2 min):    [the smallest possible model — one example, concrete]
Check (1 min):     q [ ] / expected [ ] / wrongAnswers: [answer · why · remedy]
You try (2–3 min): [one fresh solo item]
Recap (30s):       [child says the idea back] + [one specific praise]
```

### Worked example — *Capital letters for names* (age 5–6, ~10 min)

```
One idea:          People's names start with a capital letter.
Hook:              "Your name — does it start big or small? Show me how you write it." (recall: what's a capital?)
Show:              "Look: *tom* vs *Tom*. Names get the big letter at the front — like a little crown." Write both.
Check:             q "Which is right: 'sam' or 'Sam'?"  expected "Sam"
                   wrongAnswers: - answer "sam" · why doesn't yet see names as special · remedy "it's a person's name — names wear the crown. Fix the first letter."
You try:           "Write your friend's name with its capital."
Recap:             "When does a word get a capital at the front?" + "You gave Sam his crown straight away!"
```

### Beat map
hook → explain → check → practice → recap, each as a single short turn (no separate "we do" — the show *is* the model, the check *is* the we-do moment). One interactive block carries the check/practice. If the soft time limit hits, the core idea is already modelled, checked and practised — exactly the front-loading the director wants.

---

## Choosing a template (quick guide)

- **Teaching something new and procedural?** → A (gradual-release).
- **A concept that's better discovered (science, patterns)?** → B (5E) — but only if prerequisites are secure.
- **A foundation that must be rock-solid?** → C (mastery).
- **Keeping earlier learning alive?** → D (review/retrieval).
- **Don't know where to start them?** → E (diagnostic).
- **Understood but slow?** → F (fluency).
- **A big applied piece over weeks?** → G (project).
- **Five spare minutes / one tiny idea?** → H (micro-lesson).

You can also **chain** them: diagnose (E) → teach (A) → secure (C) → make fluent (F) → keep alive (D), with a project (G) to apply it. That chain *is* a topic's life cycle.

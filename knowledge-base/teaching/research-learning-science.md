# Research & Learning Science — the evidence base behind the Classai method

This file is the **evidence layer** beneath `pedagogy-core.md`. Where `pedagogy-core.md` says *what to do*, this file says *why we believe it works* — grounded in real, citable research, with effect sizes and named sources. Every major claim below links to a source you can check. Read this before changing the teaching method: it is what separates evidence-based practice from folklore.

Scope: a **1:1 AI tutor teaching one child, ages 5–11 (UK KS1–KS2)**, in short, interactive, voice-led lessons built on the beats **hook → explain → example → check → practice → recap**, with a **wrong-answer → remedy** loop.

---

## 1. How to read the evidence

**What counts as strong evidence.** In rough order of trust:

1. **Systematic reviews / meta-analyses of randomised controlled trials (RCTs)** — many studies pooled, weighted, with quality controls. The EEF Toolkit and IES Practice Guides sit here.
2. **Individual high-quality RCTs and well-replicated lab findings** — e.g. the retrieval-practice and spacing literature.
3. **Expert syntheses of the above** — Rosenshine, Deans for Impact, Wiliam.
4. **Single studies, correlational work, theory, and practitioner opinion** — useful for ideas, weak for proof.

**Effect sizes (Cohen's *d* / standardised mean difference).** A *d* of 0 means no difference; ~0.2 is small, ~0.4 moderate, ~0.8 large. They let you compare interventions measured on different tests. **Caveat:** effect sizes from very different studies are not cleanly comparable (different tests, ages, durations, controls), so treat any single number as a *signpost*, not a measurement.

**EEF "months' progress."** The Education Endowment Foundation translates effect sizes into "additional months of progress" a pupil makes versus a similar pupil who didn't get the approach, over a year. So "+6 months" = roughly six months of extra learning. Convenient, but it is a *converted average across many studies* — read it as "this is well-evidenced and worth doing," not as a precise dose. The EEF also rates **evidence strength** (padlocks) and **cost** alongside impact.

**The headline that frames everything for a 1:1 tutor — Bloom's "2 sigma."** Benjamin Bloom (1984) found that students taught **one-to-one with mastery techniques** performed about **two standard deviations** better than conventionally taught peers — the average tutored student beat ~98% of the control class. The "problem" was that 1:1 human tutoring is too expensive to scale. An AI tutor is the attempt to deliver the *method* (mastery + immediate feedback + correction) at scale. Bloom's later results are widely seen as an upper bound rather than a guarantee, but the direction is the whole reason Classai exists.
Source: Bloom, B. S. (1984), *The 2 Sigma Problem*, Educational Researcher — https://journals.sagepub.com/doi/10.3102/0013189X013006004 (summary: https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem)

---

## 2. The highest-leverage, best-evidenced methods

Each entry: **the finding → the evidence/source → how the Classai tutor should apply it** (tied to the beats and the wrong-answer → remedy loop).

### 2.1 Feedback

**Finding.** Feedback — information to the learner about their performance relative to a goal, that they then act on — is among the highest-impact, most evidence-secure approaches in education. The EEF rates it **+6 months' progress**, "very high impact for very low cost," with one of the strongest evidence ratings in the whole Toolkit. The EEF's 2021 guidance (Quigley et al.) stresses it is *not* about choosing a feedback method (verbal vs written) but about **timing, quality, and ensuring the pupil acts on it**.

**Source.** EEF, *Feedback* — https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback ; EEF, *Teacher Feedback to Improve Pupil Learning* (2021) — https://files.eric.ed.gov/fulltext/ED615988.pdf

**How the Classai tutor should apply this.**
- At every **check** and **practice** beat, give feedback that is *specific to the answer* and *names the next move*, not just "well done" / "wrong." E.g. "You got the tens right; the slip was carrying the one — try just that bit again."
- **Make the child act on it.** Feedback only counts when followed by a re-attempt. The **wrong-answer → remedy** loop *is* the feedback loop: judge → explain the specific gap → re-pose a near-identical item → confirm recovery. Never deliver a correction without an immediate chance to use it.
- Keep feedback **timely** (same turn) and **focused** (one thing at a time — avoid overloading; see cognitive load, §2.6).

### 2.2 Metacognition & self-regulation

**Finding.** Teaching children to **plan, monitor, and evaluate** their own thinking is the single highest-rated strand in the EEF Toolkit: **+8 months' progress**, "high impact for very low cost," extensive evidence (355 studies). It works best **embedded in normal subject content**, not taught as separate "thinking skills" lessons, and a powerful lever is the teacher **modelling their own thinking aloud**. Caveat: high *potential* impact but "difficult to realise in practice."

**Source.** EEF, *Metacognition and self-regulation* — https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation ; EEF *Metacognition and Self-Regulated Learning* guidance report — https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition

**How the Classai tutor should apply this.**
- In the **explain** and **example** beats, **think aloud**: "I'm going to read the question twice, underline what it's asking, then check which method fits." Make the strategy visible, don't just give the answer.
- Prompt **self-monitoring** at **check**: "How sure are you, and how could you check it yourself?" Teach one concrete self-check per topic (e.g. estimate first; reverse the operation).
- At **recap**, ask the child to say *what they learned and how they'd tackle a similar one* — planning/evaluating, embedded in the real content.
- Keep it **inside the subject** (maths, reading) — never a detached lecture on "metacognition."

### 2.3 Explicit / direct instruction — Rosenshine's Principles

**Finding.** Barak Rosenshine synthesised research from cognitive science, studies of master teachers, and cognitive-support research into **ten principles of instruction** that converge on the same picture: review prior learning; teach in **small steps with practice after each**; ask many questions and check responses; provide **models and worked examples**; guide initial practice; check for understanding; aim for a **high success rate (~80%)**; scaffold then fade; and build in **weekly/monthly review**.

**Source.** Rosenshine, B. (2012), *Principles of Instruction*, American Educator — https://www.aft.org/ae/spring2012/rosenshine

**How the Classai tutor should apply this.** This is the spine of the beats. Open **hook/explain** with a quick recall of the named prior knowledge. Break **explain** into the smallest teachable sub-steps, never more than one before a **check**. **Example** = the worked model/think-aloud. Treat **~80% success** in check/practice as the target band: lots of errors ⇒ shrink the step (the wrong-answer remedy should re-teach a smaller step); everything trivially right ⇒ raise the challenge. Scaffold the first attempts heavily, then fade support across the practice beat.

### 2.4 Retrieval practice (the testing effect)

**Finding.** **Recalling** information from memory (being tested / quizzed) produces far stronger long-term retention than re-reading or re-explaining the same material. Roediger & Karpicke (2006) showed that on delayed tests (days/weeks later), prior *retrieval* beat prior *study* — sometimes dramatically. This is one of the most robust findings in learning science.

**Source.** Roediger, H. L., & Karpicke, J. D. (2006), *Test-Enhanced Learning* / *The Power of Testing Memory*, Psychological Science / Perspectives on Psychological Science — https://pdf.retrievalpractice.org/Roediger-Karpicke-2006_PPS.pdf (alt: http://psychnet.wustl.edu/memory/wp-content/uploads/2018/04/Roediger-Karpicke-2006_PPS.pdf)

**How the Classai tutor should apply this.**
- The **check** and **practice** beats are retrieval, not re-explanation. Make the child *produce* the answer (say it, type it), don't ask "does that make sense?"
- Open lessons with a **low-stakes recall** of last lesson's idea (a 1–2 question warm-up), and at **recap** ask them to retrieve today's key idea *from memory* rather than re-reading it.
- Keep retrieval **low-stakes and frequent** — frame quizzes as practice, not exams, so errors are safe (they feed the remedy loop).

### 2.5 Spaced & interleaved practice

**Finding.** **Spacing** the same material across multiple sessions (rather than massing it) markedly improves retention; the IES Practice Guide's first recommendation is "**space learning over time**" — re-expose learners to key content on at least two occasions separated by weeks. **Interleaving** (mixing problem types — ABCABC rather than AAABBB) improves later test performance and the ability to *choose* the right method, especially in maths (Rohrer & Taylor). Interleaving often makes practice *feel* harder and slower in the moment yet improves the delayed test — a "desirable difficulty."

**Source.** Pashler et al. (2007), *Organizing Instruction and Study to Improve Student Learning*, IES Practice Guide — https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/20072004.pdf ; Rohrer & Taylor, *Interleaved Practice Improves Mathematics Learning* — http://uweb.cas.usf.edu/~drohrer/pdfs/Rohrer_et_al_2015JEdPsych.pdf

**How the Classai tutor should apply this.**
- Drive **spaced review** from the learner model: schedule recall of older topics across lessons (this is exactly what `server/src/memory/` spaced review is for). Don't let a mastered topic vanish — revisit it days/weeks later.
- In the **practice** beat, once a few related skills exist, **interleave** them (mix problem types) rather than drilling one type in a block — but only *after* initial acquisition (a brand-new skill needs some blocked practice first).
- Warn (in design, not to the child) that interleaving feels harder: don't mistake the in-session dip for failure.

### 2.6 Worked examples & cognitive load (Sweller)

**Finding.** Working memory is small and easily overloaded. Cognitive Load Theory (Sweller) says effective instruction **minimises extraneous load** so the child can focus on the actual idea. The **worked-example effect**: novices learn more from *studying worked examples* than from being thrown straight into problem-solving, because problem-solving from scratch overloads working memory. Worked examples matter most **early** in learning a skill; as competence grows, shift toward independent problems (the "expertise reversal" — fade the examples).

**Source.** Sweller, J. — *Cognitive Load Theory and Instructional Design* (overview & NSW CESE summary) — https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf ; Sweller (1994), *Cognitive Load, Learning Difficulty, and Instructional Design* — https://www.uky.edu/~gmswan3/544/Cognitive_Load_&_ID.pdf

**How the Classai tutor should apply this.**
- Lead the **example** beat with a **fully worked example** before asking the child to solve one. Then a *guided* attempt (partly completed), then independent — gradual release.
- Strip extraneous load: one idea per turn, plain language, no decorative detail competing with the point. Don't split the child's attention between two things at once.
- **Fade** the worked support across the practice beat as success rises (matches Rosenshine's "scaffold then remove").

### 2.7 Mastery learning

**Finding.** Mastery learning — the child must reach a defined proficiency on the current unit (via formative checks + corrective re-teaching) **before** moving on — is well-evidenced: EEF rates it **+5 months' progress**. It was the other half of Bloom's 2-sigma result (mastery alone got students to ~+1 sigma; tutoring to ~+2).

**Source.** EEF, *Mastery learning* — https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/mastery-learning ; Bloom (1984) — https://journals.sagepub.com/doi/10.3102/0013189X013006004

**How the Classai tutor should apply this.**
- The lesson director should **gate progression on demonstrated success**, not on time elapsed: don't advance the beat/topic until the **check** is genuinely passed. (This is already the director's job — keep it.)
- When the child fails a check, the **remedy** is the "corrective procedure": re-teach a *smaller* step, then re-test. Loop until mastered, then advance.
- Define "mastered" concretely per topic (e.g. N correct in a row, including an interleaved item), and feed it to the long-term learner model.

### 2.8 One-to-one and small-group tuition

**Finding.** Targeted **1:1 tuition** averages **+4 months** (EEF), and tends to be higher in primary (~+6) than secondary. Notably, in **phonics** specifically, **one-to-one delivery reaches +8 months vs +4 for small groups** — strong evidence that the personalised, responsive format is itself a multiplier. The trade-off is reach/cost (Bloom's problem) — which an AI tutor exists to dissolve.

**Source.** EEF, *One to one tuition* — https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/one-to-one-tuition ; EEF *Phonics* (1:1 +8 / small-group +4 figures) — https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics

**How the Classai tutor should apply this.** Exploit the format: *because* it is 1:1, check constantly (a child of one can't hide at the back), adapt the next step to *this* child's last answer, and keep pace tuned to their success rate. The advantage is responsiveness — squander it if the tutor lectures instead of interacting.

### 2.9 Oral language

**Finding.** Oral language interventions (structured talk, vocabulary, discussion, reasoning aloud) have **high impact: +6 months** (EEF), and are especially beneficial for disadvantaged pupils. Spoken-language work underpins both reading comprehension and thinking.

**Source.** EEF, *Oral language interventions* — https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/oral-language-interventions

**How the Classai tutor should apply this.** Classai is voice-led — lean into it. Have the child **explain answers in words**, not just give a number; introduce and *use* new vocabulary in context; ask "why?" and "how do you know?" Encourage the child to talk through reasoning (this also serves metacognition, §2.2).

### 2.10 Formative assessment (Wiliam)

**Finding.** Dylan Wiliam's **embedded formative assessment** frames five strategies: (1) clarify and share learning intentions and success criteria; (2) engineer tasks/questions that **elicit evidence of learning**; (3) provide **feedback that moves learning forward**; (4) activate **learners as owners** of their learning; (5) activate learners as resources for one another (the last is class-oriented). The core idea: *constantly find out what the child knows and adjust.*

**Source.** Wiliam, D. (2011/2017), *Embedded Formative Assessment* — https://eric.ed.gov/?id=ED591904 (overview: https://my.chartered.college/research-hub/why-you-should-read-embedded-formative-assessment-by-dylan-wiliam/)

**How the Classai tutor should apply this.** State the lesson's **goal/success criterion** at the **hook** ("by the end you'll be able to…"). Use the **check** beats to *elicit evidence* and steer the next move (advance / remedy / raise challenge). Tie feedback to the success criterion. Hand ownership to the child at **recap** by having them judge their own progress against that criterion.

---

## 3. Reading & early literacy (ages 5–7 especially)

**The Simple View of Reading (Gough & Tunmer, 1986).** Reading Comprehension = **Decoding × Language Comprehension**. Both factors are necessary; if either is near zero, comprehension collapses. This tells the tutor *what to diagnose*: a child who can't understand a text is failing at decoding, at language comprehension, or both — and the fix differs.
Source: https://www.readingrockets.org/reading-101/how-children-learn-read/models-reading

**Scarborough's Reading Rope (2001).** Elaborates the Simple View into strands woven together: **word recognition** (phonological awareness, decoding, sight recognition) and **language comprehension** (background knowledge, vocabulary, language structures, verbal reasoning, literacy knowledge). Skilled reading = all strands tightly woven.
Source: https://readinguniverse.org/article/explore-teaching-topics/big-picture/understanding-the-simple-view-of-reading-and-scarboroughs-rope

**Systematic synthetic phonics.** Phonics — explicit, **systematic** teaching of grapheme–phoneme correspondences and blending — is the most effective approach to early word reading: EEF **+5 months**, extensive evidence; synthetic phonics has the strongest base. Two crucial caveats from the EEF: (a) phonics improves **decoding accuracy, not automatically comprehension** — vocabulary and comprehension must *also* be taught explicitly; (b) teaching must be **matched to the child's current phonics level**; intensive 1:1 phonics reaches +8 months.
Source: EEF, *Phonics* — https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics

**How the Classai tutor should apply this.**
- For early readers, teach phonics **systematically and in sequence**, matched to the child's assessed level — isolate sounds, letter–sound correspondences, **blending to read** and **segmenting to spell**.
- Diagnose reading difficulty through the Simple View lens: is the breakdown **decoding** (→ phonics remedy) or **language/comprehension** (→ vocabulary, background knowledge, comprehension strategies)?
- Don't stop at decoding — build **vocabulary and oral language** (§2.9) in parallel, because comprehension needs the other half of the rope.

---

## 4. Myths to avoid

**Learning styles ("visual / auditory / kinaesthetic" learners).** The belief that matching teaching to a child's preferred "style" improves learning is **a myth** — there is **no credible evidence for the matching hypothesis**. Pashler, McDaniel, Rohrer & Bjork (2008) reviewed the field and found the experiments that *could* validate learning-styles instruction either weren't done or, when done, found **no benefit**. Coffield et al. (2004) catalogued 71 different, often contradictory style schemes. Do **not** label a child a "type" or tailor instruction to a style.
Source: Pashler et al. (2008), *Learning Styles: Concepts and Evidence* — https://journals.sagepub.com/doi/full/10.1111/j.1539-6053.2009.01038.x ; Coffield et al. (2004) — discussion: https://pmc.ncbi.nlm.nih.gov/articles/PMC4678182/

**Over-trusting single effect-size league tables (Hattie caution).** John Hattie's *Visible Learning* popularised ranking influences by effect size with a "0.40 hinge point." It is a useful *map* of what tends to matter, but it has real methodological critiques: pooling effect sizes from very heterogeneous studies (different tests/ages/designs that aren't cleanly comparable), uneven study quality, and some documented statistical errors (e.g. impossible "common language effect size" values). **Use Hattie's rankings as a hypothesis generator, not proof; prefer EEF/IES syntheses with quality controls.**
Source: critique overview — https://visablelearning.blogspot.com/p/effect-size.html ; Snook et al., *Invisible Learnings?* — https://www.researchgate.net/publication/284499397

**Other things to be wary of.** Re-reading and highlighting *feel* productive but are weak (retrieval beats them, §2.4). "Discovery learning" with no guidance is poor for novices and young children (worked examples beat it, §2.6). Praising *ability* ("you're so clever") rather than *strategy/effort* can backfire — keep feedback specific and process-focused (§2.1).

---

## 5. Teaching-method upgrade checklist (run every lesson)

A pass over the beats, each line tied to the evidence above:

- [ ] **Hook** — state the goal/success criterion in child terms (formative assessment §2.10); do a 5–10s **recall** of named prior knowledge (retrieval §2.4, Rosenshine §2.3).
- [ ] **Explain** — one **small step** at a time (Rosenshine §2.3); **think aloud** to model the strategy (metacognition §2.2); plain language, one idea per turn, minimise load (CLT §2.6).
- [ ] **Example** — show a **fully worked example first**, then a guided attempt, then fade support (worked examples §2.6, gradual release).
- [ ] **Check** — make the child **retrieve/produce** the answer, not just nod (retrieval §2.4); use it to *elicit evidence* and decide the next move (formative §2.10). Target **~80% success** (Rosenshine §2.3).
- [ ] **Wrong answer → remedy** — give **specific, act-on-it feedback** (§2.1); re-teach a **smaller** step; **re-test** until mastered before advancing (mastery §2.7). Errors are safe and expected.
- [ ] **Practice** — retrieval-based; once skills exist, **interleave** problem types (§2.5); keep success high, raise challenge when it's too easy.
- [ ] **Recap** — child **retrieves** today's key idea from memory and **self-evaluates** against the success criterion (retrieval §2.4, metacognition §2.2, ownership §2.10).
- [ ] **Across lessons** — schedule **spaced review** of older topics via the learner model (§2.5); **gate progression on mastery, not time** (§2.7); exploit the 1:1 format with constant, adaptive checking (§2.8); have the child **talk** their reasoning (oral language §2.9).
- [ ] **Never** — label a "learning style," tailor to one (§4); give vague praise; lecture without interaction; advance past a failed check.

---

## 6. References

- Bloom, B. S. (1984). *The 2 Sigma Problem: The Search for Methods of Group Instruction as Effective as One-to-One Tutoring.* Educational Researcher. https://journals.sagepub.com/doi/10.3102/0013189X013006004 (summary: https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem)
- Coffield, F., et al. (2004). *Learning Styles and Pedagogy in Post-16 Learning.* (Discussed in: https://pmc.ncbi.nlm.nih.gov/articles/PMC4678182/)
- Education Endowment Foundation. *Feedback* (Teaching & Learning Toolkit). https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback
- Education Endowment Foundation (2021). *Teacher Feedback to Improve Pupil Learning* (guidance report). https://files.eric.ed.gov/fulltext/ED615988.pdf
- Education Endowment Foundation. *Metacognition and self-regulation* (Toolkit). https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation
- Education Endowment Foundation. *Metacognition and Self-Regulated Learning* (guidance report). https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition
- Education Endowment Foundation. *Phonics* (Toolkit). https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics
- Education Endowment Foundation. *Oral language interventions* (Toolkit). https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/oral-language-interventions
- Education Endowment Foundation. *Mastery learning* (Toolkit). https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/mastery-learning
- Education Endowment Foundation. *One to one tuition* (Toolkit). https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/one-to-one-tuition
- Gough, P. B., & Tunmer, W. E. (1986). *The Simple View of Reading.* (Overview: https://www.readingrockets.org/reading-101/how-children-learn-read/models-reading)
- Hattie, J. *Visible Learning* — and critiques: https://visablelearning.blogspot.com/p/effect-size.html ; Snook et al., *Invisible Learnings?* https://www.researchgate.net/publication/284499397
- Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008/2009). *Learning Styles: Concepts and Evidence.* Psychological Science in the Public Interest. https://journals.sagepub.com/doi/full/10.1111/j.1539-6053.2009.01038.x
- Pashler, H., et al. (2007). *Organizing Instruction and Study to Improve Student Learning* (IES Practice Guide, NCER 2007-2004). https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/20072004.pdf
- Roediger, H. L., & Karpicke, J. D. (2006). *Test-Enhanced Learning / The Power of Testing Memory.* Psychological Science / Perspectives on Psychological Science. http://psychnet.wustl.edu/memory/wp-content/uploads/2018/04/Roediger-Karpicke-2006_PPS.pdf
- Rohrer, D., & Taylor, K. (and Dedrick). *Interleaved Practice Improves Mathematics Learning.* Journal of Educational Psychology. http://uweb.cas.usf.edu/~drohrer/pdfs/Rohrer_et_al_2015JEdPsych.pdf
- Rosenshine, B. (2012). *Principles of Instruction: Research-Based Strategies That All Teachers Should Know.* American Educator. https://www.aft.org/ae/spring2012/rosenshine
- Scarborough, H. S. (2001). *The Reading Rope.* (Overview: https://readinguniverse.org/article/explore-teaching-topics/big-picture/understanding-the-simple-view-of-reading-and-scarboroughs-rope)
- Sweller, J. (1994). *Cognitive Load, Learning Difficulty, and Instructional Design.* https://www.uky.edu/~gmswan3/544/Cognitive_Load_&_ID.pdf ; NSW CESE summary: https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf
- Deans for Impact (2015/2026). *The Science of Learning.* https://www.deansforimpact.org/files/assets/thescienceoflearning.pdf
- Wiliam, D. (2011/2017). *Embedded Formative Assessment.* https://eric.ed.gov/?id=ED591904

---

*Last researched 2026-06-21. Figures are EEF Toolkit values current at that date (Toolkit is a living resource — strands are re-reviewed periodically). Effect sizes are signposts, not precise doses; prefer the method over the number.*

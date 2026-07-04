# Motivation & engagement methods

This family is about *why a child tries* — the difference between a learner who leans in and one who shuts down. Motivation is not "fun and games"; it's a set of well-theorised levers that, used right, sustain effort through difficulty, and used wrong, *destroy* it. This file is unusually strict about the wrong ways, because motivation is the area most polluted by fads: uncritical gamification, ability praise, and "mindset" hype all *sound* motivating and reliably backfire.

The governing theory is **Self-Determination Theory** (Deci & Ryan): durable motivation comes from three psychological needs — **autonomy, competence, relatedness**. Almost everything below either feeds those needs (and works) or substitutes a shallow external reward for them (and erodes them). For a character-driven AI tutor with an avatar, this family is also where the app's *personality* earns its keep — the warmth, the narrative, the relationship are motivational instruments, not decoration.

See also `pedagogy-core.md`, `metacognition-and-self-regulation.md` (goals/self-efficacy), and the subject misconceptions files (esp. maths anxiety).

---

## Self-Determination Theory: autonomy, competence, relatedness

**Family:** Motivation & engagement · **Evidence:** strong — Deci & Ryan's SDT is among the best-supported motivation theories; intrinsic motivation predicts deeper learning · **Best for:** the foundation of *all* durable motivation; every subject; all ages.

**What it is.** The theory that humans are intrinsically motivated when three needs are met: **autonomy** (a sense of choice/ownership), **competence** (feeling effective, making progress), and **relatedness** (feeling connected, cared about). Meet them → motivation comes from *within*; thwart them (control, constant failure, coldness) → motivation collapses or becomes brittle/external.

**Why it works.** Intrinsic motivation drives deeper engagement and persistence than external pressure; each need is a real psychological lever — give a child meaningful choices, frequent genuine success, and a warm relationship, and effort follows without bribes or threats.

**When to use / when NOT.** Always — it's the lens for every other method here. The "when not" is really a warning: **controlling tactics (heavy rewards/punishments) undermine autonomy** and can *reduce* intrinsic motivation (the overjustification effect, below). Use rewards sparingly and informationally, not as control.

**How to run it (steps).**
1. **Autonomy:** offer real (bounded) choices — topic, example, order.
2. **Competence:** pitch for ~80% success; make progress visible.
3. **Relatedness:** warmth, knowing the child, caring about them.
4. Notice which need is starved when a child disengages, and feed it.

**1:1 AI-tutor adaptation.** SDT is the design brief for the avatar tutor. **Autonomy:** let the child choose the topic/theme/example ("dinosaurs or football for today's problems?"), and offer Skip/Continue. **Competence:** the difficulty band + mastery loop keep success ~80% and the recap names concrete progress. **Relatedness:** the avatar's warmth, and the `LearnerModel` *remembering* the child (their name, interests, past wins) so the tutor feels like it *knows* them — relatedness is where a memory-equipped character tutor genuinely shines. When a child stalls, the tutor should diagnose which need is starved (bored→autonomy; failing→competence; flat→relatedness) and respond.

**Primary example.** A reluctant child: the tutor offers a choice (autonomy — "which of these two shall we start with?"), keeps the first task easily winnable (competence), and greets them by name referencing last time's success (relatedness) — re-engaging without any reward or pressure.

**Pitfalls.** Fake choices (everything leads to the same place); relentless difficulty (competence starved); a cold, generic tutor (relatedness starved); leaning on rewards/control (autonomy starved).

**Related.** [[gamification]], [[narrative-character-driven-learning]], [[flow-and-appropriate-challenge]], [[effective-praise-vs-ability-praise]]

---

## Growth mindset — done correctly (with honest critique)

**Family:** Motivation & engagement · **Evidence:** **mixed and over-hyped** — Dweck's original work is real; large replications (e.g. Sisk et al. 2018 meta-analysis; the National Study of Learning Mindsets 2019) show effects are **small and concentrated in specific at-risk groups**, not the transformative cure-all the hype claimed · **Best for:** *process-focused feedback culture*; struggling/anxious learners; all ages — but with realistic expectations.

**What it is.** The belief that ability can grow with effort and good strategies (a "growth" mindset) versus the belief it's fixed. Done *correctly*, it's not slogans — it's a consistent culture of **praising process** (strategy, effort, persistence) over fixed traits, and framing difficulty as growth.

**Why it works (and the honest limits).** Believing improvement is possible *can* sustain effort through difficulty — but the popular version was wildly oversold. Three honest caveats the tutor must respect: (1) **effects are small and mostly help specific groups** (lower-achieving/disadvantaged students), not everyone equally; (2) **"effort praise" alone can backfire** — praising effort on a task the child found easy, or when they're *failing* due to a bad strategy, is hollow or even insulting ("you tried so hard" = "I didn't expect you to manage"); (3) **mindset can't substitute for teaching** — telling a child to "believe in yourself" without teaching the strategy is empty. The right version praises *effective* effort and *strategy*, and pairs belief with actual instruction.

**When to use / when NOT.** As a *consistent feedback style* (process over trait), especially for children who've decided they're "bad at maths." **AVOID** the hype version: posters, "the magic of yelling 'yet!'", praising effort regardless of outcome, or treating mindset as a replacement for teaching well. If a child fails, the answer is usually a *better strategy or smaller step*, not just more belief.

**How to run it (steps).**
1. Praise the *process*: "You kept trying different strategies — that's what got you there."
2. Frame difficulty honestly: "This is hard, and hard is how we get better; let's find a way in."
3. When effort isn't working, change the *strategy*, don't just praise more effort.
4. Pair every "you can improve" with actual teaching of *how*.

**1:1 AI-tutor adaptation.** The tutor's praise defaults to **process praise** (see its own entry) and frames struggle as normal and surmountable — but it must avoid the fad traps: it doesn't praise effort on something that was easy, doesn't say "great effort" when the real issue is a fixable misconception (it *teaches* instead), and never substitutes encouragement for instruction. When the `LearnerModel` flags a child who self-labels ("I'm rubbish at this"), the tutor uses honest process framing *plus* a smaller, winnable step — belief earned through success, not asserted.

**Primary example.** A child stuck on subtraction who says "I'm just bad at maths": the tutor responds "You're not bad at it — that method got tangled. Let's try a different one (a number line)…" — pairing growth framing with an actual better strategy, then real success.

**Pitfalls.** **Empty effort praise** (esp. when effort isn't the issue); slogans without teaching; expecting mindset to transform everything (it won't); praising effort on easy work (feels patronising).

**Related.** [[effective-praise-vs-ability-praise]], [[attribution-retraining]], [[goal-orientation]], self-efficacy/goals (metacognition file)

---

## Goal orientation (mastery vs performance)

**Family:** Motivation & engagement · **Evidence:** strong — mastery (learning) goals predict deeper engagement and resilience; performance goals can drive surface learning and anxiety (achievement-goal theory, Dweck, Ames, Elliot) · **Best for:** shaping *what success means* to the child; all ages.

**What it is.** Two orientations toward achievement: a **mastery goal** ("I want to *get better* / understand this") vs a **performance goal** ("I want to *look smart* / beat others / get the top score"). The orientation a child holds shapes how they respond to difficulty.

**Why it works.** Mastery-oriented children see difficulty as part of learning, take on challenge, and persist after failure (effort is the path). Performance-oriented children, especially when avoiding looking bad ("performance-avoidance"), shy from challenge, give up after failure (it threatens their image), and feel more anxiety. The *frame* you set determines which orientation forms.

**When to use / when NOT.** Always cultivate a **mastery orientation** in how you frame tasks, praise, and goals. Be wary of **performance framing** (scores, rankings, "beat your record" as the *main* point) — fine in light doses for some children, corrosive as the dominant frame, especially for anxious or struggling ones.

**How to run it (steps).**
1. Frame the point as *getting better / understanding*, not scoring.
2. Set learning goals ("learn to use a bar model"), not just performance ones.
3. Praise improvement and strategy, not just results.
4. Treat errors as part of mastering, not as a verdict.

**1:1 AI-tutor adaptation.** The tutor's framing, goals, and praise should be **mastery-oriented**: "let's *get this*," progress over scores, improvement celebrated. This directly tempers the gamification risk — points/streaks are fine as long as the *dominant* message is "you're getting better," not "you scored." For an anxious child the `LearnerModel` flags, the tutor strips performance framing entirely (no scores foregrounded, just "you can do this now that you couldn't before").

**Primary example.** Instead of "Let's see if you can beat 8/10 today," the tutor says "Last time, halves clicked — today let's make quarters click too." The goal is understanding, not the number.

**Pitfalls.** Making the score the point (performance framing → anxiety, challenge-avoidance); ranking/comparison for a struggling child; treating a wrong answer as a verdict on ability.

**Related.** [[growth-mindset-done-correctly]], goal setting (metacognition file), [[reducing-maths-learning-anxiety]], [[gamification]]

---

## Gamification (and its risks)

**Family:** Motivation & engagement · **Evidence:** **mixed — short-term engagement boost, real long-term risks; quality depends entirely on design** (Hanus & Fox 2015 found points/badges *reduced* intrinsic motivation over time) · **Best for:** practice/fluency engagement; sparingly; ages 5–11 (with care).

**What it is.** Adding game elements — points, badges, levels, streaks, quests, avatars, progress bars — to learning to boost engagement. Ranges from shallow ("pointsification" — slap on points) to deep (genuine challenge, narrative, meaningful choice).

**Why it works — and why it often doesn't.** Game elements can grab attention and add a sense of progress and challenge (feeding competence). **But the core risk is the overjustification effect** (its own entry): rewarding an activity that was (or could be) intrinsically interesting trains the child to do it *for the reward*, and when the reward stops, motivation is *lower than before*. Shallow gamification also shifts focus from learning to point-scoring (a performance orientation) and can become an end in itself. The evidence is genuinely **mixed**: well-designed, narrative-rich, competence-supporting gamification can help; bolt-on points/badges often hurt intrinsic motivation in the medium term.

**When to use / when NOT.** Use *sparingly and informationally* — game elements that **signal genuine progress/competence** (a progress bar showing real mastery, a streak that reflects real practice) align with SDT and are relatively safe. **AVOID** the fad version: heavy points/badges/leaderboards as the *driver*, rewarding intrinsically interesting tasks, and competition that demotivates the child who's behind. Never let the game become the point. Especially avoid leaderboards/comparison for a struggling or anxious child.

**How to run it (steps).**
1. Prefer elements that *reflect real learning* (mastery-based progress, not arbitrary points).
2. Keep rewards *informational* ("you mastered ×4!"), not controlling ("do this to earn a badge").
3. Don't gamify tasks the child already finds interesting (overjustification).
4. Avoid public ranking, especially for those behind.
5. Fade the game scaffolding as intrinsic interest grows.

**1:1 AI-tutor adaptation.** Classai's safest game elements are the ones tied to **real competence and relatedness**: a mastery progress bar (reflecting the `LearnerModel`, not arbitrary points), a practice streak (real practice), and the **avatar/narrative** itself (which feeds relatedness, not a hollow reward). The tutor should keep any points *informational and mastery-linked*, avoid leaderboards entirely (it's 1:1 anyway — no peers to rank against, which sidesteps the worst risk), and never gamify a task the child already loves. The discipline: game elements *signal* progress; they are never the *reason* to learn.

**Primary example.** A "skills tree" that fills in as the child genuinely masters topics (mastery-linked progress, autonomy in choosing the next branch) — good. A "+10 points!" pop-up for every right answer, with a daily ranking — risky/avoid.

**Pitfalls.** **Overjustification** (rewarding intrinsic interest → kills it); points/badges as the driver; leaderboards for strugglers; the game eclipsing the learning; rewards that don't reflect real progress.

**Related.** [[the-overjustification-effect]], [[self-determination-theory]], [[narrative-character-driven-learning]], [[goal-orientation]]

---

## The overjustification effect

**Family:** Motivation & engagement · **Evidence:** strong/classic — Lepper, Greene & Nisbett (1973), the "magic marker" study; rewarding an intrinsically interesting activity reduces later intrinsic interest · **Best for:** a warning that governs *all* reward use; all ages.

**What it is.** When you reward someone for an activity they *already* find interesting, they start attributing their behaviour to the reward ("I do this *for the sticker*"), and when the reward is removed, they do it *less* than if it had never been offered. The extrinsic reward "overjustifies" and crowds out the intrinsic interest.

**Why it works (the mechanism).** Self-perception: children infer their own motivation from their behaviour. Reward an enjoyable task and they conclude they only did it for the reward, devaluing the activity itself. Tangible, expected, contingent rewards are the worst offenders; unexpected or purely informational praise is much safer.

**When to use / when NOT.** This is a *constraint*, not a method: **don't reward tasks the child already enjoys.** Rewards/incentives are least harmful (sometimes helpful) for tasks that are genuinely tedious-but-necessary (some drill) and *most* harmful for tasks with intrinsic appeal. When you do reward, make it **unexpected and informational** ("Wow, you really got that!"), not a pre-announced contingent prize ("Get 10 right and earn a star").

**How to run it (steps).**
1. Before rewarding, ask: does the child already find this interesting? If yes, *don't* add a tangible reward.
2. For necessary-but-dull tasks, modest rewards are okay — but keep them informational.
3. Prefer *unexpected* praise over *promised* prizes.
4. Lean on intrinsic levers (SDT) first, rewards last.

**1:1 AI-tutor adaptation.** This is the guardrail behind the tutor's whole reward stance: it does **not** dangle contingent prizes for engaging tasks, and its positive feedback is **informational process praise** ("you figured out the trick!") rather than "do X to earn Y." Any gamified element must reflect *real* competence so it reads as information, not a bribe. The tutor's primary motivators are intrinsic (autonomy/competence/relatedness via choice, success, and the avatar relationship) — rewards are a last resort, used unexpectedly.

**Primary example.** A child loves drawing the avatar's stories. The tutor does *not* introduce "earn 5 points per drawing" (which would turn play into work); it just shares delight in the drawings — keeping the intrinsic joy intact.

**Pitfalls.** Promised contingent rewards for enjoyable tasks (kills the joy); heavy tangible rewards; making praise feel like payment.

**Related.** [[gamification]], [[effective-praise-vs-ability-praise]], [[self-determination-theory]]

---

## Interest-based & culturally responsive examples

**Family:** Motivation & engagement · **Evidence:** strong — personalising problems to interests boosts motivation and performance (Walkington 2013 on interest-based personalisation); culturally responsive teaching improves engagement (Gay; Hammond) · **Best for:** every subject; making content relevant; all ages.

**What it is.** Framing the *same* learning content in terms of the child's **interests** (dinosaurs, football, a favourite game) and their **cultural context/lived experience** (familiar foods, names, settings, traditions), so it connects to what they care about and recognise.

**Why it works.** Relevance recruits attention and effort (autonomy/relatedness) and gives new ideas a familiar anchor to attach to (better encoding and transfer). Crucially, the *standard* doesn't change — only the *context* — so it boosts motivation without diluting rigour. Seeing oneself in the material also signals belonging.

**When to use / when NOT.** Constantly, especially for a reluctant or disengaged child. The one caution: personalise the *example/context*, never the *learning goal* (don't teach less because the topic is football). Keep cultural responsiveness genuine, not tokenistic.

**How to run it (steps).**
1. Know the child's interests and context (ask; remember).
2. Re-skin the example in those terms, keeping the maths/skill identical.
3. Use familiar names, foods, settings, scenarios.
4. Refresh as interests change.

**1:1 AI-tutor adaptation.** This is a **core use of the two-tier memory**: `LearnerModel.interests` drives the *hook* and *example* contexts — the tutor frames problems with *this* child's loves and world. The standard (the mastery target) is untouched; only the skin changes. Because the tutor *remembers* and *updates* interests, the personalisation stays fresh and feels like being known (relatedness). For a disengaged child, switching the example's theme is the cheapest re-engagement lever there is.

**Primary example.** Teaching division to a football fan: "21 players need to share into 3 equal teams — how many per team?" — identical maths, irresistible framing. For another child it's sharing dinosaurs, or sweets from their family's shop.

**Pitfalls.** Lowering the standard along with the context (don't); tokenistic culture (a name swap with no real connection); stale interests (a child who's moved on from dinosaurs).

**Related.** [[self-determination-theory]], [[narrative-character-driven-learning]], [[curiosity-gaps-and-hooks]]

---

## Flow & appropriate challenge

**Family:** Motivation & engagement · **Evidence:** strong — Csikszentmihalyi's flow; matches the ~80%-success / desirable-difficulty findings · **Best for:** pitching difficulty for deep engagement; all subjects; all ages.

**What it is.** **Flow** is the absorbed state of being fully engaged in a task that is *challenging but achievable* — skill and challenge in balance. Too easy → boredom; too hard → anxiety; just right → flow. The motivational sweet spot.

**Why it works.** A task matched to current skill keeps the child in the productive band where success is frequent enough to feel competent but effortful enough to be interesting; this balance is intrinsically rewarding and self-sustaining. It's the motivational face of the ZPD and the ~80%-success rule.

**When to use / when NOT.** Always aim for it. The two ways out of flow are the two failure modes to monitor: **boredom** (too easy → raise challenge) and **anxiety** (too hard → lower it / scaffold). Clear goals and immediate feedback (both native to a tutor) help sustain flow.

**How to run it (steps).**
1. Match challenge to current skill (the ~80% band).
2. Give a clear goal and immediate feedback (flow needs both).
3. Watch for boredom (→ harder) or anxiety/frustration (→ easier/scaffold).
4. Ramp difficulty *with* growing skill to stay in the channel.

**1:1 AI-tutor adaptation.** Flow is what the difficulty band + immediate remedy loop are *for*, viewed motivationally. The director keeps the child in the channel: success too high/easy → raise the band (boredom is a signal, not just inefficiency); struggle streak rising → lower/scaffold (anxiety). Clear per-turn goals and instant feedback — both built in — are exactly flow's prerequisites. The `LearnerModel` lets challenge *track* the child's rising skill, keeping them in flow across sessions.

**Primary example.** A child breezing through (bored) gets harder numbers; a child whose struggle streak spikes (anxious) gets a smaller step and a scaffold — both moves aiming back at the absorbed, "this is just right" state.

**Pitfalls.** Leaving a child bored (too easy → disengagement) or anxious (too hard → shutdown); no clear goal/feedback (flow can't form); not ramping difficulty as skill grows.

**Related.** [[self-determination-theory]] (competence), ZPD/scaffolding (mastery file), [[reducing-maths-learning-anxiety]]

---

## Narrative & character-driven learning

**Family:** Motivation & engagement · **Evidence:** moderate-strong — narrative aids memory and engagement (the "narrative effect"); pedagogical agents/characters can boost motivation and learning (Mayer's research on social cues) · **Best for:** engagement, memory, relatedness; *directly relevant to Classai's avatar tutor*; ages 5–11.

**What it is.** Embedding learning in **story** and delivering it through a **character** (a narrator, guide, or companion) rather than as bare content — a quest, a mystery, a journey, a relationship with a recurring character.

**Why it works.** Stories are inherently memorable and emotionally engaging (we're built for narrative), giving facts a structure and a *reason to care*; a warm, consistent character provides relatedness (a relationship to learn *with*) and social cues that, evidence suggests, increase effort and learning — provided the character *supports* learning rather than distracting from it.

**When to use / when NOT.** Excellent for engagement and for relatedness, especially with young children. The caution (the "seductive details" risk): narrative/character must *carry* the learning, not *bury* it — a story so elaborate the content gets lost, or a character so busy/animated it distracts, hurts (Mayer's coherence principle). The character should be friendly and present, not frantic.

**How to run it (steps).**
1. Give the learning a narrative spine (a quest, a problem to solve for a character).
2. Deliver via a consistent, warm character the child relates to.
3. Keep the story *in service of* the content, not competing with it.
4. Use the character for encouragement, modelling, and relationship — not mere decoration.

**1:1 AI-tutor adaptation.** This is **Classai's signature** — the animated avatar tutor *is* a pedagogical character, and a memory-equipped one. The design implications: the avatar should be **warm, consistent, and present** (relatedness), can frame topics as quests/stories (the hook), can model thinking and "learn alongside" the child (protégé framing), and — via the `LearnerModel` — *remembers* the child across sessions, deepening the relationship. The discipline (coherence principle): the character and any animation must *support* the lesson, never distract — a busy or constantly-animated avatar competing with the content is the failure mode to avoid. Story is a vehicle for the standard, not a substitute.

**Primary example.** The avatar as a friendly explorer who needs the child's maths help to "cross the river" (each problem builds the bridge) — narrative pulling the child through practice that would otherwise feel like drill, with the character cheering real progress.

**Pitfalls.** Story/character burying the content (seductive details); an over-animated, distracting avatar (coherence violation); inconsistent character (breaks relatedness); narrative as a thin wrapper with no real engagement.

**Related.** [[self-determination-theory]] (relatedness), [[interest-based-culturally-responsive-examples]], [[gamification]], role-play (cooperative file)

---

## Curiosity gaps & hooks

**Family:** Motivation & engagement · **Evidence:** moderate-strong — the "information gap" theory of curiosity (Loewenstein 1994); curiosity enhances memory (Gruber et al. 2014) · **Best for:** lesson openings; sparking engagement; all subjects; all ages.

**What it is.** Deliberately opening a **gap** between what the child knows and what they want to know — a puzzle, a surprising fact, an unanswered question, a "I wonder…" — that creates the *itch* of curiosity the lesson then scratches.

**Why it works.** Curiosity arises from an *awareness of a gap* in one's knowledge (Loewenstein) — once you notice you don't know something you want to know, you're motivated to close the gap. Better: curiosity primes the brain to encode the answer more strongly (Gruber et al.) — so a curious child *remembers* more, not just engages more.

**When to use / when NOT.** Ideal for **hooks** and for re-engaging a flagging child. The gap must be the *right size*: too small (obvious answer, no itch) or too big (the child can't even see what they're missing) both fail — the child needs enough knowledge to *feel* the gap.

**How to run it (steps).**
1. Open with a surprising fact, puzzle, or question that exposes a gap ("Why do you think the moon changes shape?").
2. Let the child notice they want to know.
3. Teach toward closing the gap.
4. Resolve it satisfyingly — close the loop.

**1:1 AI-tutor adaptation.** The **hook beat is a curiosity gap.** The tutor opens with a `richText`/`emojiViz` puzzle or surprising claim tied to the child's interests, lets the itch form, then teaches toward the answer — and because curiosity boosts encoding, this isn't just engagement theatre, it *improves retention*. The director should ensure the gap is sized to the child (using the `LearnerModel`'s knowledge state) and that the lesson *resolves* it (an unscratched itch frustrates).

**Primary example.** Science, Year 3 hook: "I've got two identical-looking cups of water. One will dissolve sugar way faster than the other. What could be different about them?" — the gap (temperature) pulls the child into the lesson on dissolving.

**Pitfalls.** A gap too obvious (no curiosity) or too alien (no foothold); a hook that's a gimmick disconnected from the learning; never resolving the gap (frustration).

**Related.** [[narrative-character-driven-learning]], [[interest-based-culturally-responsive-examples]], hooks in `lesson-anatomy.md`, [[flow-and-appropriate-challenge]]

---

## Effective praise vs ability praise

**Family:** Motivation & engagement · **Evidence:** strong — **process praise builds resilience; person/ability praise undermines it — AVOID ability praise** (Mueller & Dweck 1998; Henderlong & Lepper 2002 on effective praise) · **Best for:** every piece of positive feedback; all ages.

**What it is.** Two kinds of praise with opposite effects. **Process praise** targets *what the child did* — effort, strategy, focus, persistence ("you tried a different method and it worked"). **Ability/person praise** targets a *fixed trait* — "you're so smart / so clever / a natural." They feel similar but train opposite mindsets.

**Why it works (and why ability praise backfires).** Process praise tells the child *success comes from controllable actions* — so when they hit difficulty, they try harder/differently (resilience). **Ability praise** tells them success comes from a *fixed trait they have* — so when they hit difficulty (and fail), the inescapable inference is "I must *not* be smart," and they avoid challenge to protect the label (Mueller & Dweck found children praised for intelligence later chose easier tasks and crumbled after failure). Ability praise is one of the best-documented "well-meant but harmful" practices in education.

**When to use / when NOT.** **Always prefer process praise; AVOID ability/person praise** ("clever," "smart," "gifted," "a natural"). Also keep praise **sincere, specific, and not inflated** — empty or constant praise ("amazing!" for everything) loses meaning and can read as low expectations. And mind the overjustification caution: praise the *learning*, don't turn praise into a transactional reward.

**How to run it (steps).**
1. Praise the *process*: name the specific effort/strategy that worked.
2. Never praise the *trait* ("smart"/"clever").
3. Be sincere and specific — not blanket "amazing!".
4. Don't over-praise easy success (hollow, or signals low expectations).

**1:1 AI-tutor adaptation.** A **hard rule for the tutor's feedback**: positive feedback is *process praise* ("you spotted the pattern," "you didn't give up when it got tricky," "good idea to use the number line") — the avatar **never** says "you're so smart." This is the safest, highest-frequency motivation lever the tutor has, and it dovetails with growth-mindset framing and the overjustification guardrail (informational, not transactional). Praise is specific (referencing what the child actually did, from working memory) and sincere — not a reflexive "great job" on every turn.

**Primary example.** A child solves a tricky problem. **Say:** "You broke it into smaller steps and checked your answer — that's exactly how to crack a hard one." **Don't say:** "You're so clever!" (which sets up "then why did I fail the next one?").

**Pitfalls.** **Ability/person praise (avoid);** inflated, constant, non-specific praise (meaningless); over-praising easy work; praise as a transactional reward (overjustification).

**Related.** [[growth-mindset-done-correctly]], [[attribution-retraining]], [[the-overjustification-effect]], process praise in `pedagogy-core.md`

---

## Attribution retraining

**Family:** Motivation & engagement · **Evidence:** moderate-strong — shifting attributions for failure toward controllable causes improves persistence (Weiner's attribution theory; Dweck) · **Best for:** children who've learned helplessness ("I'm just bad at this"); ages 8–11 especially.

**What it is.** Deliberately reshaping *what a child blames* for their successes and failures — from **stable, uncontrollable** causes ("I failed because I'm not smart / I'm bad at maths") toward **unstable, controllable** ones ("I failed because I used the wrong strategy / didn't practise that bit yet"). Controllable attributions preserve effort; uncontrollable ones produce giving-up.

**Why it works.** A child who attributes failure to a *fixed, uncontrollable* cause ("I'm just bad at maths") sees no point in trying — nothing they do can change a fixed trait (learned helplessness). Re-attributing failure to *controllable* causes (strategy, effort, not-yet-learned) restores agency: "I can change the strategy / practise more," so effort makes sense again.

**When to use / when NOT.** Specifically for children showing helpless attributions or who self-label ("I can't do this," "I'm the dumb one"). It must be **truthful** — re-attribute to a *real* controllable cause (a genuine strategy fix), not a comforting lie; pair it with actually teaching the better strategy (otherwise it's hollow, like empty mindset talk).

**How to run it (steps).**
1. Catch the helpless attribution ("I'm just bad at this").
2. Re-attribute to a controllable cause, *truthfully*: "That method got tangled — that's fixable."
3. Provide the controllable fix (teach the better strategy).
4. When success follows, attribute it to *that* ("see — the new strategy worked, *you* made that work").

**1:1 AI-tutor adaptation.** When the `LearnerModel` flags self-defeating language or a pattern of giving up, the tutor runs attribution retraining: it gently re-frames the cause from fixed-trait to controllable-strategy, *and immediately supplies the fixable strategy plus a winnable step* (the re-attribution must be earned by real success, not asserted). After success, it credits the child's *controllable action* ("the number line was a great choice — you did that"). This is the deeper, individualised cousin of process praise, reserved for children who need it.

**Primary example.** Child: "I'll never get fractions, I'm rubbish." Tutor: "You're not rubbish — adding the bottoms is a common trap, and it's totally fixable. Watch this one trick…" → teaches it → child succeeds → "See? You fixed it by getting the pieces the same size. *That's* what worked."

**Pitfalls.** Re-attributing to a cause that isn't true (comforting lie); re-attributing without supplying the actual fix (hollow); attributing success to luck/ease rather than the child's controllable action.

**Related.** [[growth-mindset-done-correctly]], [[effective-praise-vs-ability-praise]], [[reducing-maths-learning-anxiety]]

---

## Reducing maths / learning anxiety

**Family:** Motivation & engagement · **Evidence:** strong — maths anxiety impairs working memory and performance (Ashcraft; Beilock); reducing it improves both wellbeing and achievement · **Best for:** anxious learners; maths especially; all ages.

**What it is.** Methods to lower the anxiety that some children feel toward a subject (classically maths) — anxiety that *itself* causes underperformance, independent of ability. Includes removing time pressure, reframing mistakes, building success, and addressing the child's beliefs.

**Why it works.** Anxiety consumes working memory (the worry occupies the very resource needed to do the maths), so an anxious child performs *below* their actual ability — and the resulting failure deepens the anxiety, a vicious cycle. Lowering anxiety (psychological safety, removing time pressure, success experiences, reframing errors) frees working memory and breaks the cycle. Timed tests and public correction are notorious anxiety *amplifiers*.

**When to use / when NOT.** For any child showing anxiety/avoidance around a subject (freezing, "I hate maths," distress). The key moves: **reduce time pressure** (anxiety hates the clock), **make mistakes safe** (errors = information, never shame), **build a run of success** (rebuild competence), and **address beliefs** (attribution/growth framing). Note the tension with precision-teaching's timed drills — for an anxious child, *drop or reframe* the timing.

**How to run it (steps).**
1. Create psychological safety: warmth, no judgement, mistakes welcomed.
2. Remove/soften time pressure (no high-stakes clock).
3. Start with guaranteed success to rebuild competence.
4. Reframe errors as information; reframe beliefs (attribution retraining).
5. Build up gradually, keeping the child in the success band.

**1:1 AI-tutor adaptation.** The 1:1 private format is *already* anti-anxiety (no peers watching, no public correction — a major advantage). On top, when the `LearnerModel` flags anxiety, the tutor: **removes timing** (no fluency sprints — or reframes them as relaxed personal-best games), keeps the difficulty band low for a guaranteed-success run (rebuilding competence), keeps the avatar's tone extra-warm and patient (relatedness/safety), treats every error as calm information (the remedy loop, never "wrong!"), and uses attribution retraining on the underlying beliefs. The tutor should also *slow down* — wait time and a gentle pace are themselves calming.

**Primary example.** A child who freezes at maths: the tutor drops all timing, opens with three problems she can definitely do (rebuilding "I can"), warmly treats a mistake as "ooh, interesting, let's look," and never foregrounds a score — gradually rebuilding both competence and calm.

**Pitfalls.** Timed tests / a visible clock for an anxious child (amplifies it); public-style correction or "wrong!" feedback; pushing difficulty before safety/competence is rebuilt; ignoring the *beliefs* driving the anxiety.

**Related.** [[attribution-retraining]], [[flow-and-appropriate-challenge]], [[goal-orientation]] (mastery framing), precision teaching (mastery file — note the timing tension)

---

## Summary: motivation done honestly

The throughline of this whole family, and the antidote to its many fads:

**Feed the three real needs (SDT), and use rewards/games/praise as *information*, never as *control* or *bribery*.**

- **Build motivation from within:** autonomy (real choices), competence (~80% success, visible progress, flow), relatedness (a warm avatar that *remembers* the child).
- **Praise the process, never the trait** — ability praise is a documented harm (AVOID).
- **Frame for mastery, not performance** — "get better," not "score high."
- **Treat rewards/gamification with suspicion:** the overjustification effect means rewarding interesting tasks *backfires*; keep any game elements mastery-linked and informational, and skip leaderboards (1:1 makes that easy).
- **Be honest about mindset:** process framing helps, but it's no cure-all and is no substitute for teaching the actual strategy.
- **For anxiety and helplessness,** lead with safety, success, and truthful re-attribution — not slogans.

A character-driven, memory-equipped 1:1 tutor is well-placed to do all of this *right* — its biggest motivational asset is the warm, knowing relationship (relatedness) and the personalised, well-pitched success (autonomy + competence). Its biggest temptation is the fad version (points, badges, "you're so smart!"), which this file exists to help it resist.

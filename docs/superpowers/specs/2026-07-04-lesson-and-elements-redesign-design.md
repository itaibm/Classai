# Design — Lesson & Element Redesign

- **Date:** 2026-07-04
- **Status:** Draft for review
- **Branch:** `worktree-lesson-and-elements-redesign`
- **Owner:** Itai
- **Supersedes:** the `classai-lesson/1` authored format, the flat 6-beat director, and the 22-block widget set.

---

## 1. Why

Lessons don't run like lessons today. Three things are wrong at once:

1. **The flow is erratic.** A lesson is a flat march of six beats (`hook → explain → example → check → practice → recap`) and the director sprinkles checks by a timer (`turnsSinceCheck`). So questions fire at random — sometimes a pile, sometimes a long stretch with none — and the hook is rushed and thin. It reads like *ticking off a checklist*, not teaching.
2. **The knowledge base is inert.** We built a world-class pedagogy library (`knowledge-base/teaching/` + 15 method families in `knowledge-base/methods/`), but the live lesson never *reasons* with it. It's author-only reference.
3. **The visuals are low-level and fragile.** The `whiteboard` element makes the AI place individual dots by `x/y` coordinate (≈30 hand-placed dots for one array). The 22 elements are a flat grab-bag organized by widget type, with none of the curriculum-shaped pictures (arrays, fraction bars, number bonds, maps, timelines) primary learning is actually made of.

## 2. Vision

**A world-class *crafted* lesson, delivered *adaptively* to the child in front of us.** The brilliance is designed in; the delivery is chosen live for this specific learner.

Two commitments, held together:

- **Crafted (philosophy B).** Each lesson's content — the ideas, the primary explanation, the visuals, the diagnostic checks — is authored to a high standard (by the generation pipeline, grounded in the KB).
- **Adaptive (the "be smart" half).** *How* each idea is taught is chosen per child: read the child's history, pick the teaching move most likely to land, switch method when it doesn't, occasionally explore a new method to learn what works, and evaluate every move so the system gets better at teaching *this* child over time.

## 3. The Concept Loop (the new flow)

A lesson is no longer a flat beat march. It is:

```
OPEN (a real hook)  →  [ CONCEPT LOOP ] × 3–6  →  CONSOLIDATE  →  CLOSE
```

Every Concept Loop runs the **same rigorous cycle** — only the *method* inside it changes per child:

```
CONCEPT (one micro-idea)
  ① TEACH   — present the idea with a METHOD the policy picked for THIS child (show it)
  ② CHECK   — ONE question, anchored to THIS concept (never random)
  ③ JUDGE   — LLM judges the answer vs expected / wrongAnswers
       ├─ got it   → ④ CONFIRM why it's right → NEXT CONCEPT
       └─ wrong    → ④ RETEACH with a DIFFERENT method, adapted, targeting the
                        specific misconception → ⑤ RE-CHECK (fresh variant)
                          ├─ got it → NEXT CONCEPT
                          └─ still stuck after N tries → scaffold a small win,
                             flag for spaced review, NEXT CONCEPT (never trap)
```

**Invariants that fix the complaint:**

- `OPEN` is a real phase with its own job (spark interest **and** retrieve the prerequisite) and success criterion — it can no longer be rushed away.
- **A check exists only because a concept was just taught.** Never a pile of questions; never a long questionless stretch. Exactly one anchored check per idea, plus fresh variant re-checks on failure.
- **A wrong answer always loops back into teaching**, with a *different* method aimed at the specific misconception — never "the same words louder."
- **The loop is uniform and deterministic** (predictable, testable) while *what happens inside each phase* is chosen live — so it never feels like a checklist.
- **Nobody gets trapped.** After N failed re-teaches, scaffold a win, tag for spaced review, and advance.

The intelligence lives in **method selection inside phases ① and ④**, not in restructuring the flow per concept. That uniformity is what makes it reliable.

## 4. The authored lesson format — `classai-lesson/2`

The flat `plan: LessonBeatFull[]` is replaced by `open` / `concepts[]` / `consolidate` / `close`. The **Concept** is the new authored unit.

### 4.1 The `Concept`

```jsonc
{
  "id": "times-means-groups-of",
  "idea": "The × sign means 'groups of' — 3 × 5 is 3 groups of 5.",
  "successCriteria": "Child reads '3 × 5' aloud as 'three groups of five' and builds it.",
  "priorKnowledge": ["skip-counting in 5s"],

  // ONE fully-crafted primary move + a few lightweight alternatives.
  "moves": [
    { "method": "representation-and-modelling/manipulatives", "primary": true,
      "brief": "Build 3 groups of 5 counters; name × as 'groups of'.",
      "script": { "say": "Here's the magic sign: ×. It means 'groups of'…", "adaptHints": "Swap counters for the child's favourite thing." },
      "elements": [ { "type": "array", "rows": 3, "cols": 5, "animate": "rotate" } ] },
    { "method": "play-and-game-based/narrative",          "brief": "Story: 3 treasure chests, 5 coins in each." },
    { "method": "representation-and-modelling/analogies",  "brief": "Egg boxes: 3 boxes, 5 eggs — '3 lots of 5'." },
    { "method": "retrieval-and-memory/dual-coding",        "brief": "Chant '3 groups of 5' while pointing at each group." }
  ],

  // Anchored, diagnostic check + fresh variants for re-checks.
  "check": {
    "question": "I write 4 × 2. Say it in words and tell me how many.",
    "expectedAnswer": "4 groups of 2 — that's 8.",
    "wrongAnswers": [
      { "answer": "6", "why": "read × as + (4+2)", "remedy": "Contrast: '+' joins two, '×' makes groups. Count 4 groups of 2." }
    ]
  },
  "checkVariants": [
    { "question": "Say 2 × 5 in words, then the total.", "expectedAnswer": "2 groups of 5 — 10." }
  ],

  // Guaranteed small win if still stuck after N adapted re-teaches.
  "scaffold": { "say": "Let's do one together, slowly — I build, you count the groups.", "element": { "type": "array", "rows": 2, "cols": 3 } },
  "revisitTag": "y2-maths-multiplication-groups"
}
```

**Authoring principle:**
- The **primary move is fully crafted** — verbatim `script` + authored `elements`. First-run quality equals today's best.
- The **alternatives are one-line briefs + a method tag** — not full scripts. They name genuinely-different methods (from different KB families) and are **realized live by the LLM** only when the policy calls for them. This keeps authoring load sane.
- The **check is anchored and diagnostic** — `wrongAnswers[].why/remedy` drives the targeted re-teach; `checkVariants` make a re-check a *fresh* question.

### 4.2 The lesson wrapper

```
{ format: "classai-lesson/2",
  …existing framing (id, year, subject, subjectLabel, unit, objectives, vocabulary,
                      emphasize, analysis, materials, delivery, video, differentiation)…
  open:        { goal, retrievePrior, moves[], successCriteria },
  concepts:    Concept[],            // 3–6 — the body
  consolidate: { drawsFrom: "practiceBank", interleave: true },
  close:       { recap, revisitLater },
  practiceBank: PracticeItem[],      // kept — now feeds consolidate
  adaptivity:   { … } }              // kept — governs consolidate difficulty
```

`open` reuses the move structure (a hook is a concept whose job is motivate + retrieve). `consolidate` interleaves retrieval across the lesson's concepts using the existing practice engine.

## 5. The element system (28 semantic, dual-mode elements)

The 22 widget-typed blocks are replaced by **28 elements organized by communicative job**. Three design pillars:

1. **Organized by job**, not widget: **Tell · Show · Model · Sequence · Do.** The generator picks a *job* first, then an element.
2. **Semantic & parametric**, not coordinate-level: the AI states intent (`{type:"array", rows:3, cols:5}`); the renderer draws it perfectly. No more broken hand-placed pictures.
3. **Dual-mode: DEMONSTRATE ↔ MANIPULATE.** The element the tutor uses to *show* an idea becomes the thing the child *does* to check it — one element, two modes. This collapses the old show/interactive split and makes everything hands-on.

### 5.1 Catalog

| Job | Element | Params (intent) | Demonstrate | Manipulate (check) | Subjects |
|---|---|---|---|---|---|
| Tell | `text` | value, emphasis?, term/definition? | callout / key-term | — | all |
| Show | `image` | src, alt, caption?, annotate? | picture / source | highlight regions | all |
| Show | `video` | url/searchTerm, watchTask, afterCheck | plays w/ watch-task | answer after-check | all |
| Show | `scene` | items[emoji+label], layout | emoji/illustration scene | tap/count items | all |
| Show | `audio` | src/clip, listenTask | plays a sound/clip | identify/repeat | music, languages, phonics |
| Model·num | `array` | rows, cols, animate? | draws & rotates array | build n groups of m | maths |
| Model·num | `numberLine` | min, max, marks[], jumps[] | shows jumps/positions | jump/place a value | maths |
| Model·num | `baseTen` | value, mode(tenFrame\|blocks\|placeValue) | builds in tens/ones | compose target | maths |
| Model·num | `fraction` | whole(bar\|circle), num, den | shades p/q | shade/partition | maths |
| Model·num | `barModel` | whole, parts[], unknown | Singapore bar | size/label unknown | maths |
| Model·num | `numberBond` | whole, parts[] | part-part-whole | fill missing part | maths |
| Model·space | `shape` | mode(2d\|3d\|angle\|symmetry\|net), spec | shows/rotates shape | build/measure/reflect | maths |
| Model·space | `grid` | rows, cols, mode(coord\|beebot\|pixel), cells | plots on grid | place/route/colour | maths, computing, geo |
| Model·data | `dataChart` | kind(table\|pictogram\|bar\|line\|pie), data | presents data | read off / build bar | maths, science, geo |
| Model·meas | `measure` | mode(clock\|money\|ruler\|scale\|jug\|thermo), value, unit | reads a measure | set/read the measure | maths |
| Model·lang | `wordBuild` | word, split(phoneme\|syllable\|morpheme) | chunks/blends | build/spell from parts | english, languages |
| Model·lang | `textMark` | passage, marks?, mode(highlight\|cloze\|sort) | annotates a passage | highlight/sort words | english |
| Model·lang | `sentence` | words[], label(pos\|punct\|order) | builds/labels sentence | assemble/label | english, languages |
| Model·world | `diagram` | mode(label\|cycle\|flow\|web\|mindmap), nodes, edges | labelled diagram/map | label/sort/connect | science, computing |
| Model·world | `map` | scope(world\|region\|local\|historical), pins[], regions[], routes[] | shows a map | place pin/label/trace | geography, history |
| Model·world | `timeline` | events[{when,label}], scale | events on a line | order/place events | history, science |
| Model·world | `sort` | mode(bucket\|venn\|rank), groups[], items[] | classifies items | drag items to groups | science, english, history |
| Model·make | `music` | mode(staff\|rhythm\|keyboard), spec | shows notation/beat | tap/build/play | music |
| Model·make | `draw` | prompt?, guides? | tutor annotates (sketch) | child draws/creates | art, free response |
| Sequence | `steps` | slides[], reveal | reveals worked example | predict next step | all |
| Do | `choice` | prompt, options, correct[] | — | pick answer(s) | all |
| Do | `enter` | prompt, answer, kind(number\|text) | — | type/enter answer | all |
| Do | `speak` | prompt, target? | — | say aloud (Whisper) | all |

### 5.2 Subject coverage

| Subject | Signature elements |
|---|---|
| Maths | array · numberLine · baseTen · fraction · barModel · numberBond · shape · grid · measure · dataChart |
| English / Languages | wordBuild · sentence · textMark · audio · scene |
| Science | diagram(label/cycle/web) · sort · dataChart · image(annotate) · steps |
| Geography | map · dataChart · diagram · image |
| History | timeline · map · image(annotate) · sort(then/now) |
| Computing | grid(beebot) · diagram(flow) · steps · sort |
| Art & Design | draw · image · steps · scene |
| Music | music(staff/rhythm/keyboard) · audio · steps |
| Life-skills | scene · sort · choice · steps |

### 5.3 Merges & removals from today's set

- **Merged:** `multipleChoice`+`multiSelect`+`trueFalse` → `choice`; `numberEntry`+`shortText`+`fillBlank` → `enter`; `slideshow`+`flashcards` → `steps`; `table` → `dataChart`; `emojiViz` → `scene`; `keyTerm`+`richText` → `text`; `clock`/`money` folded into `measure`; `categorize` → `sort`.
- **Removed / demoted:** raw-coordinate `whiteboard` → `draw` (labelled shapes + child canvas, escape-hatch only); `custom` node-tree retired (its layout jobs are covered by the semantic elements; drop the unbounded escape hatch).
- **New:** `array · baseTen · fraction · barModel · numberBond · shape · grid · measure · wordBuild · sentence · textMark · diagram · map · timeline · sort · music · draw · audio`.

### 5.4 Renderer contract

Each element is a React component under `client/src/blocks/elements/<name>.tsx` that takes `{ params, mode: 'demonstrate' | 'manipulate', onResult }`. `manipulate` mode reports a `BlockResult { text, correct? }` exactly as interactive blocks do today, so the director's answer path is unchanged. All elements share the design system proven in the gallery (semantic colours, `SF Pro Rounded`, light/dark tokens, `prefers-reduced-motion`). Built with the **frontend-design** skill.

## 6. The method palette (KB → live moves)

The 15 method families in `knowledge-base/methods/` become the **palette the adaptive engine chooses from**. Each method gets a stable id `"<file>/<method>"` (e.g. `retrieval-and-memory/dual-coding`). A build step compiles the method files into a machine index (`server/src/ai/method-index.ts`) carrying `{ id, family, name, bestFor, whenNot, oneLineHowTo }` per method — small enough to feed the generator and the live realizer without loading whole files. The `Concept.moves[].method` references these ids.

## 7. Per-child method-affinity model

`LearnerModel` (`shared/types.ts`) gains a **method-affinity map**:

```ts
methodAffinity: Record<string /* method id */, {
  wins: number;        // checks passed on first try after this method
  losses: number;      // checks failed after this method
  lastUsed: string;    // ISO — for recency / staleness
  note?: string;       // e.g. "stories land; abstract-first does not"
}>
```

This is the durable "how this kid learns" memory. It is updated by the evaluation loop (§8) and read by the policy (§8) to pick methods.

## 8. The adaptive policy & evaluation loop

A new module `server/src/teach/policy.ts` owns method selection. It is deterministic given the learner model + an injected RNG seed (so it is testable and resumable).

**Selection (per TEACH / RETEACH):**
- Candidate arms = the concept's authored `moves[]` (default), optionally widened to the full method index under the explore branch.
- Score each arm by the child's `methodAffinity` (a smoothed win-rate), lightly biased by method `bestFor` matching the subject/age.
- **Exploit** (pick the best arm) with probability `1 − ε`; **explore** (pick a promising unused/stale arm) with probability `ε` (default ε ≈ 0.15, higher for a new learner with little history).
- On RETEACH, exclude the method that just failed — a re-teach is always a *different* arm.

**Evaluation (after JUDGE):**
- Attribute the check outcome to the method used in the preceding TEACH/RETEACH.
- Update `methodAffinity[method]` (win on first-try pass, loss on fail) and the working-memory read.
- Feed `masteryEstimate` for the concept as today.

This is a contextual multi-armed bandit in spirit, kept deliberately simple and legible. Exploration is bounded and logged (`log`/prompt-monitor) so it never silently experiments without a trace.

## 9. Division of labour

Unchanged principle, sharpened: **control flow is deterministic; the LLM realizes and judges.**

- **Director (`server/src/teach/`)** owns: the Concept Loop state machine, check timing, method selection (via `policy.ts`), the re-teach/scaffold branching, evaluation, memory writes.
- **LLM** owns: (a) *realizing* the chosen move — turning `{method, brief}` (+ the child's interests/history) into adapted `speech` and, when the move is an alternative without authored elements, choosing/filling an element; (b) *judging* the learner's answer into `answerEval` against `expectedAnswer`/`wrongAnswers`.

The primary move ships authored `script` + `elements`, so the default path is near-deterministic and high quality; the LLM's generative latitude is concentrated on *adaptation* and *re-teach in a new style*.

## 10. The generation mechanism & prompt

We change how lessons are **built**, not hand-author them. `server/src/services/lesson-generator.ts` + `lesson-authoring.ts` + the prompts in `server/src/ai/prompts.ts` are rewritten to emit `classai-lesson/2`:

1. **Analyse** the topic (keep today's analysis: key concepts, misconceptions, prior knowledge).
2. **Decompose** into 3–6 **concepts** with `idea` + `successCriteria`.
3. For each concept: author the **primary move** (script + a chosen semantic element) and **3 alternative method briefs** drawn from the **method index** (spanning different families), plus the **anchored diagnostic check** + `checkVariants` + `scaffold`.
4. Emit `open` / `consolidate` / `close` and the existing framing.

The generation prompt is grounded in the KB (pedagogy-core + method index) and constrained to the 28-element vocabulary (element schemas provided so it states valid intent).

## 11. What we remove

- All `curriculum/**/lessons/*.json` `classai-lesson/1` files — **deleted, not migrated** (per decision).
- `classai-lesson/1` types and the linear `AuthoredState`/`AuthoredPending` director path.
- The retired block types (`custom`, `whiteboard`, and the merged widgets) and their renderers/schemas.

## 12. Code map (where the work lands)

- `shared/types.ts` — `classai-lesson/2` types (`Concept`, `TeachMove`, new `open/consolidate/close`), the 28 `LessonElement` union (replacing `LessonBlock`), `LearnerModel.methodAffinity`.
- `server/src/ai/method-index.ts` *(new)* — compiled method palette from `knowledge-base/methods/`.
- `server/src/teach/index.ts` — Concept-Loop director (replaces flat beat march + `authored.ts`).
- `server/src/teach/policy.ts` *(new)* — method selection + evaluation.
- `server/src/teach/practice.ts` — retained for `consolidate`.
- `server/src/ai/schemas.ts` — element intent schemas + tolerant parse for the 28 elements; `TeacherTurn` realization schema.
- `server/src/ai/prompts.ts` — Concept-Loop teaching prompt + realization prompt.
- `server/src/services/lesson-generator.ts` + `lesson-authoring.ts` — emit `classai-lesson/2`.
- `server/src/memory/index.ts` — write/read `methodAffinity`.
- `client/src/blocks/elements/*` *(new)* — 28 renderers (demonstrate + manipulate), built with **frontend-design**.
- `client/src/blocks/BlockView.tsx` + `client/src/screens/Classroom.tsx` — render `LessonElement`, drive dual-mode.

## 13. Phasing (sub-projects → each gets its own plan)

The build is large; it decomposes into four sequenced sub-projects. Each is independently shippable behind the existing lesson pipeline.

- **P1 — Contract & elements.** New `shared/types.ts` element union + `classai-lesson/2` types; the 28 renderers (demonstrate + manipulate) with an element-gallery dev page; tolerant element schemas. *No behaviour change to the director yet — old lessons still run on a shim, or we gate P1 behind a flag.*
- **P2 — Generation.** Rewrite the generator/prompts to emit `classai-lesson/2` grounded in the method index + element vocabulary. Delete `/1` lessons. Produce a first cohort of `/2` lessons.
- **P3 — Concept-Loop director.** Replace the flat director with the loop state machine; wire `open/concept/consolidate/close`, check anchoring, re-teach/scaffold branching.
- **P4 — Adaptivity.** `policy.ts` (selection + explore/exploit), `LearnerModel.methodAffinity`, evaluation loop, LLM live-realization of alternative moves.

## 14. Success criteria

- A lesson never asks a question that isn't anchored to a just-taught concept; never goes a whole concept without a check.
- A wrong answer always produces a *different-method*, adapted re-teach targeting the specific misconception, then a fresh re-check.
- Every visual is a semantic element the AI parameterises; zero hand-placed coordinate art on the default path.
- All 11 subjects have first-class elements (history/geography/art/music included).
- Over repeated lessons, a child's `methodAffinity` measurably concentrates on the methods that work for them, and the policy uses it.
- `npm run typecheck` passes; `test:practice` / `test:teach` (updated) pass; a full lesson runs end-to-end on a real brain.

## 15. Open questions / risks

- **Live-realization quality** for alternative moves (LLM turning a brief into a good element) is the main quality risk — mitigated by authored primaries and element schemas; needs eval.
- **Exploration on a real child** must stay bounded and safe (never explore into a method flagged wrong for the child's needs, e.g. SEND); the policy consults `differentiation-and-inclusion` constraints.
- **Renderer surface is large** (28 elements) — P1 is the biggest chunk; the gallery de-risks the style.
- **`node:sqlite` schema** change for `methodAffinity` (JSON blob on the learner row — low risk).

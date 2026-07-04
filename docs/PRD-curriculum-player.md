# PRD: Curriculum Player — make the app run the built `classai-lesson/1` lessons

**Owner:** Itai · **Executor:** Claude Code · **Status:** Draft v1 · **Date:** 2026-07-04
**Governing docs:** `SCHOOL-CHARTER.md`, `curriculum/LESSON-FILE-SPEC.md`, `CLAUDE.md`

---

## 1. Problem statement

Classai has two halves that don't meet. The `curriculum/` folder contains 54 fully-authored, validator-passing lessons (Year 2 English 25, Maths 28, Science 1) with hand-built practice banks, wrong-answer playbooks, and adaptivity rules — and ~1,000 more are planned. The app never loads them: it generates lessons on the fly with the LLM, so all of that pedagogy work (graded practice items, misconception remedies, hint ladders, scripted reteaches, human/video delivery) is unused, and adaptivity today is prompt-guided rather than rule-driven. Until this bridge is built, every new lesson we author adds zero value to the actual tutoring experience.

## 2. Goals

1. **Every built lesson is playable in the app.** All 54 current lessons (and any future validator-passing lesson) can be started from the UI and run end-to-end.
2. **The director follows the authored lesson.** Beats, verbatim scripts, blocks, checks, and stuck protocols from the JSON drive the session — the LLM personalizes and judges, it does not improvise the lesson.
3. **Deterministic adaptivity.** Practice is driven by the lesson's `practiceBank` + `adaptivity` rules (start level 2, level up on 2 consecutive correct, reteach + level down on 2 misses of a skill), implemented as director state-machine logic, not prompt hopes.
4. **Delivery modes work.** `human_intro_then_ai` pauses for the parent with setup instructions and resumes on cue; verified lesson videos play with a watch task and after-check.
5. **No regressions.** Existing dynamically-generated lessons keep working unchanged; `npm run typecheck` stays green.

## 3. Non-goals (this phase)

- **Content scaling** (building Years 1/3/4/5/6 lessons) — separate effort, unblocked by this work.
- **New block types** — the 20 existing renderers in `client/src/blocks/BlockView.tsx` cover the spec; only wiring, not new visuals.
- **Multi-user / cloud sync** — Classai stays local-first per the architecture constraints.
- **Authoring UI for curriculum lessons** — JSON files remain the source of truth, edited outside the app.
- **Changing the bring-your-own-key model or privacy guarantees** — untouched.

## 4. Users & stories

- As a **parent**, I can browse the built curriculum (year → subject → unit → lesson), enroll my kid, and start "Lesson 3: Reading with expression" knowing it's the hand-crafted version, not an on-the-fly generation.
- As a **learner**, I get the authored hook, visuals, and checks, with examples swapped to my interests, and practice that gets easier when I struggle and harder when I'm cruising.
- As a **parent during a `human_intro_then_ai` lesson**, the app tells me exactly what to lay out, waits while I run the hands-on moment, and the AI resumes when I tap the cue.
- As a **parent reviewing progress**, mastery reflects the lesson's `masterySignal` and misses are recorded against the lesson's named misconceptions.

## 5. Current state (verified by code audit, 2026-07-04)

**Works:** beat-arc playback loop (`server/src/teach/index.ts` director + `client/src/screens/Classroom.tsx`), 20 block renderers, tolerant LLM parsing (`server/src/ai/schemas.ts`), LearnerModel + spaced review (`server/src/memory/`), TTS/STT/avatar, parent dashboard + reports, SQLite persistence (`server/src/db/index.ts`).

**Missing:** loading `classai-lesson/1` files; `PracticeItem`/`LessonAdaptivity`/`LessonFull` types in `shared/types.ts`; practice-bank selection engine; level up/down state; structured reteach; `delivery.mode` handling; `humanHandoff` pause/resume; lesson-level `video` (role/watchTask/afterCheck); `endOnSuccess` enforcement.

## 6. Requirements

### P0-A — Types & curriculum library (foundation)

Extend `shared/types.ts` with the extensions already drafted at the bottom of `curriculum/LESSON-FILE-SPEC.md`: `BeatDelivery`, `BeatScript`, `HumanHandoff`, `LessonBeatFull`, `PracticeItem`, `LessonAdaptivity`, `CuratedVideo`, `LessonFull`. These are additive; `Lesson` stays untouched. Remember both server and client consume this contract.

Add a curriculum library service (`server/src/services/curriculum.ts`):

- Scans `curriculum/year-*/*/lessons/*.json` at startup (root configurable, default repo-relative; respect `CLASSAI_DATA_DIR` conventions).
- Parses + zod-validates against `classai-lesson/1`; a malformed file is skipped with a logged warning, never crashes the server (same tolerant philosophy as `schemas.ts`).
- Exposes `GET /api/curriculum` (tree: years → subjects → units → lesson summaries) and `GET /api/curriculum/lessons/:id` (full `LessonFull`).
- **Disk is the source of truth.** When a curriculum lesson is attached to a class, store only a reference + content hash; re-read on session start so file edits flow through without re-import. Map curriculum subject keys to existing `SubjectKey` values (note: files use `"math"`, folders use `maths` — normalize in one place).

**Acceptance:** all 54 lesson JSONs appear in `GET /api/curriculum`; a deliberately broken JSON is skipped with a warning; typecheck passes.

### P0-B — Authored-beat director mode

In `server/src/teach/index.ts`, when the session's lesson is a `LessonFull`:

- **Beat sequence comes from `plan[]`**, including `timeboxMin` pacing. The STATE block gains: current beat's `goal`, `successCriteria`, `script.say`, `stuckProtocol`, and the lesson's `emphasize` list.
- **Script fidelity:** the DIRECTIVE instructs the LLM to deliver `script.say` essentially verbatim, personalizing only per `script.adaptHints` and `adaptivity.personalization` (swap `interestSlots` nouns for `LearnerModel.interests`; never change the maths/facts).
- **Authored blocks render as authored.** The director passes `beat.blocks` through to the client turn; the LLM does not regenerate them.
- **Checks are judged with the authored key.** For exact-answer blocks (multipleChoice, numberEntry, trueFalse, fillBlank…), judge deterministically in the director. On a wrong answer, look it up in `check.wrongAnswers`; if matched, the DIRECTIVE hands the LLM that item's `why` + `remedy` ("use this remedy; do not reveal the answer"). Free-text/speak answers still go to the LLM with `expectedAnswer` + `wrongAnswers` as judging context.
- **Stuck handling** uses the beat's `stuckProtocol` (ordered moves) instead of the current generic override text; fall back to `adaptivity.struggleProtocol`, then the existing generic override.
- **Fallback:** sessions on legacy `Lesson` objects run exactly as today. Keep control flow in the director — this is the repo's core division of labor.

**Acceptance:** playing `curriculum/year-2/maths/lessons/lesson-01-tens-and-ones.json`, the prompt log (`/#/parent/prompts`) shows STATE blocks carrying authored beat data; a wrong answer listed in the lesson triggers its authored remedy; blocks on screen match the JSON.

### P0-C — Practice-bank adaptivity engine

New module `server/src/teach/practice.ts` — a pure, unit-testable state machine owned by the director (no LLM decisions):

- **State on `WorkingMemory`:** `currentLevel (1|2|3)`, `consecutiveCorrect`, `missesBySkill: Record<string, number>`, `usedItemIds`, `earnedSuccess: boolean`.
- **Selection:** start at `adaptivity.startLevel` (2). Pick items at `currentLevel`, preferring unseen items and skills with recorded misses; never repeat an item back-to-back; interleave skills at level 3.
- **Level up:** 2 consecutive correct at current level → level +1 (cap 3, then interleave). **Level down:** 2 misses on the same skill → serve that item's `reteach.say` (+ optional `reteach.block`) as the next turn, then drop one level and reset that skill's miss count.
- **Hint ladder:** first miss on an item → `hints[0]`; second → `hints[1]`; hints are given one per attempt, never the answer.
- **End on success:** the practice/recap phase may not end on a miss. If time is up and the last answer was wrong, serve one easier item (level 1, weakest skill) so the lesson ends on an earned win; DIRECTIVE mandates specific process praise per `adaptivity.endOnSuccess`.
- **Mastery:** on wrap-up, derive a 0–1 mastery estimate from level reached + accuracy, informed by `adaptivity.masterySignal`, and feed it through the existing `applyTurnMemory()` path so spaced review and `recommendNext()` benefit.

**Acceptance:** unit tests (plain `node --test`, no framework install) cover: level-up after 2 correct, reteach + level-down after 2 same-skill misses, hint ladder order, no back-to-back repeats, end-on-success override. A full playthrough of lesson-01 shows level movement in the prompt log.

### P0-D — Verification harness

- `npm run typecheck` green (only automated check in repo — keep it that way plus the new unit tests).
- Add `npm run test:practice` script for the practice engine tests.
- Playwright smoke (pattern already used this June for the mic fix): start a session on lesson-01 with a scripted/mock brain (add a `mock` provider path in `server/src/ai/provider.ts` returning canned `TeacherTurn`s — dev/test only, never a shipped key), answer one right, one wrong, assert the reteach appears.

### P1-E — Delivery modes: human handoff & curated video

- **Human beats:** when `beat.delivery === 'human'`, Classroom shows a full-screen handoff card: `humanHandoff.setup`, `delivery.humanNotes`, `materials.human`, and a single "We did it — continue" button; the AI resumes speaking `cueToResume`-appropriate content. Session clock keeps running; no LLM call while paused.
- **Lesson-level video:** render the `video` object at its `role` position (hook = before beat 1, teach = with explain, reinforce = before recap). Show `watchTask` before play (verified `url` only — embed as the existing video block does); after, the director asks `afterCheck.question` and judges against `afterCheck.expectedAnswer`. Unverified specs (`channel` + `searchTerm`, no url) resolve through the existing `findVideo()` service or are skipped silently — never a broken embed, never an invented URL.
- **`video_then_ai` / `human_lesson` modes** follow from the same two mechanisms.

**Acceptance:** a `human_intro_then_ai` lesson (e.g. year-2 maths lesson-01) pauses with the parent card and resumes on tap; a lesson with a verified video plays it with watch task + after-check.

### P1-F — Parent UX: curriculum browsing

- Library screen gains a "Curriculum" tab: year → subject → unit tree from `GET /api/curriculum`, showing delivery-mode badge, duration, and validation status per lesson.
- "Add to class" attaches a curriculum lesson to an existing class (reference + hash per P0-A); it then appears in the kid's schedule like any lesson.
- KidDetail/reports show which curriculum lesson (id, e.g. `y2-maths-u1-l01`) a session ran, so progress maps back to the written curriculum.

### P2 — Future considerations

- Cross-lesson interleaved review sessions drawn from multiple practice banks (spec's review lessons already exist as data).
- Per-skill mastery (not just per-topic) in `LearnerModel`, keyed by `PracticeItem.skill`.
- Auto-sync: file-watcher hot-reload of curriculum edits during a running server.
- Delete-course endpoint (known follow-up from CLAUDE.md; unrelated but adjacent).

## 7. Constraints (from `CLAUDE.md` — do not violate)

- Bring-your-own-key; no baked-in provider key (the mock brain must be inert without explicit dev opt-in).
- All data local; nothing new leaves the device.
- `shared/types.ts` is the server/client contract — update both sides together.
- `strict` + `noUncheckedIndexedAccess`: indexed access is `T | undefined` (practice-bank selection code will hit this constantly — handle it).
- Node 22+, `tsx`, `.ts` extensions in imports, no emit. `npm run typecheck` after every change.
- Server edits need a restart under `npm start`; client edits need `npm run build`.
- Control flow belongs in the director, not the prompt.

## 8. Success metrics

**Leading:** 54/54 curriculum lessons playable without error; practice-engine unit tests green; prompt log shows authored scripts/remedies in ≥ 90% of turns during a curriculum lesson; zero regressions in dynamic-lesson flow.
**Lagging:** reteach served within one turn of a 2nd same-skill miss in 100% of cases (deterministic, so measurable from transcripts); sessions end on a correct answer ≥ 95% of the time; parent reports reference authored misconceptions rather than generic notes.

## 9. Open questions

1. **Subject-key mapping** (engineering): confirm the canonical `SubjectKey` list vs curriculum folder names (`maths` vs `math`, `history-geography` vs separate `history`/`geography`) — one normalization table, decided once.
2. **Personalization boundary** (product/Itai): may the LLM re-order sentences of `script.say`, or strictly noun-swap via `interestSlots`? Recommendation: strict noun-swap for facts-bearing beats, freer for hooks/recaps.
3. **Timebox enforcement** (product): when a beat runs over its `timeboxMin`, hard-advance (current MAX_TURNS spirit) or let the director extend by one turn on active struggle? Recommendation: extend once, then advance.

## 10. Suggested build order for Claude Code

1. P0-A types + curriculum service + endpoints → typecheck.
2. P0-C practice engine as a pure module + unit tests (independent of A/B; test first).
3. P0-B director integration (uses A + C) → prompt-log verification.
4. P0-D mock brain + Playwright smoke.
5. P1-E delivery modes → P1-F browsing UX.

Each step is a separate commit on a feature branch off `claude/brain-connect-codex-classroom` (or `main` once that's merged), validated with `npm run typecheck` + tests before moving on.

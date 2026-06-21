# Lesson Engine Redesign — Design Spec

**Date:** 2026-06-21
**Proposed branch:** `claude/lesson-engine` (off `claude/ui-redesign`)
**Type:** Core teaching-loop change. Touches the lesson planner, teaching prompt, director, turn contract, schemas, a new video service, and the client block renderer. **Phased so the live lesson never breaks between phases.**

## Problem

Lessons feel like "talk, then a question." Observed: the kid's first lesson opened with a diagnostic check-in (question-first by design), and explain turns are usually plain speech because the teaching prompt only *suggests* visuals and never pre-plans them. The rich toolbelt (22 block types incl. video, animated whiteboard, slideshow, custom) is built but under-used.

## Goal

Every lesson teaches like a real lesson: **explain a concept with a visual → check → explain more → practice → recap.** The AI teacher leads with visuals/animations (and real video when it helps), and a beat can show an explanation *and* ask in one step.

## Decisions (from brainstorm)

| Topic | Decision |
|---|---|
| Lesson open | **Always explain-first.** Even the first lesson teaches with a visual; any diagnosis is a light warm-up woven in, not a question-first quiz. |
| Video | **Real video search** — build a YouTube lookup so embedded videos are real/relevant (not AI-guessed URLs). Privacy tradeoff accepted: the search query leaves the device. |
| Scope | **Full lesson-engine redesign** — planner authors per-beat visuals, director enforces visual-first explain, turn contract allows multi-block (explain + check), real video service. |

## Current system (grounded)

- **Plan**: `server/src/services/lessons.ts` two-pass (analysis → plan). Plan = 5–8 `LessonBeat`s (`hook|explain|example|check|practice|recap`) with `goal/note/successCriteria` and, for checks, pre-authored Q + wrong-answer remedies. **No visuals are pre-authored.**
- **Teaching turn**: `server/src/ai/prompts.ts` — `BLOCK_CATALOG` (full toolbelt) + `TURN_CONTRACT`. Hard rule today: **"at most ONE block per turn."** `turnDirective()` injects the per-turn directive; explain beats just say "deliver one small idea and hand it back" — no visual requirement.
- **Director**: `server/src/teach/index.ts` advances a beat only when the LLM sets `beatComplete`; tracks momentum/struggle/turnsSinceCheck.
- **Turn shape**: `TeacherTurn { speech, emotion, block?, answerEval, beatComplete, ... }` (`shared/types.ts`). One optional block.
- **Video**: already renders YouTube/Vimeo embeds (`client/src/blocks/BlockView.tsx`); the AI is told to "use a real, well-known URL" — unreliable (it guesses).

## Design — phased

### Phase A — Explain-first + visuals required on explain beats (prompt + planner only; NO contract change)
- **Default to teaching, not diagnostic.** In the recommendation/lesson-start path, a kid "continuing" a class gets an explain-first **lesson**; fold level-finding into the hook/first-explain as a light warm-up. Keep an explicit diagnostic only when a parent/flow asks for it. (`server/src/memory/` recommend + `LearnHome`/`services/lessons.ts` kind selection.)
- **`turnDirective()`**: for `explain`/`example` beats, inject a directive that **requires a DISPLAY block** (whiteboard/slideshow/steps/image/video/custom) to show the idea before/while explaining — "explain visually first, then hand it back." Keep the anti-repeat + stuck guards.
- **`BLOCK_CATALOG`**: elevate the under-used visuals — whiteboard `animate:true` for diagrams, slideshow for multi-step explainers, video for overviews. Add a one-line "lead explain beats with a visual" rule.
- **Plan prompt** (`prompts.ts` plan section): instruct the designer to make the arc explicitly hook → explain(with a visual) → example → check → explain → practice → recap, and to note an intended visual per explain/example beat.

### Phase B — Per-beat authored visuals (planner produces them)
- Extend `LessonBeat` (additive): `visual?: { kind: BlockKind; brief: string }` — the planner names the intended visual + a content brief for each explain/example beat.
- The teaching turn prompt surfaces the beat's `visual` so the LLM realizes the planned visual (consistency, less improvisation). Tolerant: if absent, behaves like Phase A.

### Phase C — Multi-block turns: explain + check together (contract change)
- `TeacherTurn`: add `blocks?: LessonBlock[]` (1–2 blocks; keep `block?` for back-compat, normalize to an array server-side). A beat can show a **display block (explain) + an interactive block (check)** in one turn.
- `server/src/ai/schemas.ts`: parse either `block` or `blocks`, validate each tolerantly, drop invalid ones (never crash).
- `client/src/blocks/BlockView.tsx` + `Classroom.tsx`: render a stack of blocks; the turn is "awaiting" if any block is interactive.
- `TURN_CONTRACT` + `BLOCK_CATALOG`: replace "at most ONE block" with "lead with a display block to explain, then optionally one interactive block to check — at most one of each."

### Phase D — Real video search service
- New `server/src/services/video.ts`: `findVideo(query, {subjectKey, gradeLevel})` → YouTube Data API v3 search (env **`YOUTUBE_API_KEY`**), filter to embeddable + safe + short, return `{ url, title }`. In-memory cache by query. Graceful fallbacks: no key or no result → return null and the lesson uses a generated visual instead.
- **Video block becomes query-driven**: the AI emits `{"type":"video","query": "...", "title"?:...}` (a search intent, not a URL). The server resolves `query → real video` during turn post-processing (in `teach/index.ts` after the LLM returns), rewriting the block to a real `url` before it reaches the client. If unresolved, the block is dropped and a `richText`/`slideshow` stands in.
- Keep accepting an explicit `url` too (back-compat). Privacy: document that the query string is sent to YouTube; gate the whole feature on the key being set.

### Phase E — New teaching UI elements (optional, after A–D land)
- Candidate: a **narrated animated concept walkthrough** (a slideshow whose steps auto-advance with TTS narration + the whiteboard animating) and an **interactive labeled diagram** (tap parts to learn them). Specced separately once A–D are verified.

## Constraints / risk control
- **The live teaching loop must keep working on Claude (opus) and Codex (gpt-5.5) after every phase.** Each phase is independently shippable and verified with a real generated lesson before the next.
- All AI-returned shapes stay **tolerantly parsed** (`schemas.ts`) with safe fallbacks — a malformed block never crashes a lesson (existing rule).
- `shared/types.ts` changes are additive (`LessonBeat.visual?`, `TeacherTurn.blocks?`, `video.query`).
- New env var **`YOUTUBE_API_KEY`** (Phase D). Without it, video search is disabled and generated visuals are used — nothing breaks. Add to `.env.example`.
- Isolated on a new branch off `claude/ui-redesign` so the UI work and a fragile core change stay separable.

## Verification (per phase)
- `npm run typecheck` + `npm run build` clean.
- Generate + run a **real lesson** end-to-end (Playwright drive of a live class) and confirm: it opens by explaining with a visual, alternates explain→check, visuals actually appear, multi-block turns render (Phase C), real video embeds (Phase D), and the lesson reaches a recap + completion without errors — on both Claude and Codex brains.

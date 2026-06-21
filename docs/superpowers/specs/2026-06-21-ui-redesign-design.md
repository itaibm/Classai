# Classai UI Redesign — Design Spec

**Date:** 2026-06-21
**Branch:** `claude/ui-redesign` (off `claude/brain-connect-codex-classroom`)
**Type:** Re-skin + UX polish. **Not** an architecture change.

## Goal

Two audiences, one app:
- **Parents** — a calm, clear, comfortable area to set up and maintain learners, classes, and the AI brain.
- **Kids** — a visual, engaging lesson experience built around the tutor character.

## Direction (decided)

**Base style: "Bright Modern"** applied everywhere — light app background, soft pastel-gradient surfaces, clean rounded/geometric type with a display weight for headers, layered soft shadows, 20–24px radii, **per-subject accent colors**.

**Kid lesson = light stage** (not a dark/immersive theme): the same bright system, made engaging through a bigger expressive character, subject color flowing into the stage + blocks, word-by-word speech, and satisfying answer feedback.

### Explicitly OUT of scope
- **No gamification** — no XP, no streaks, no levels, no points HUD. (Reversed mid-brainstorm.)

## Decisions captured

| Topic | Decision |
|---|---|
| Visual direction | Blend: "Bright Modern" base everywhere; light (not dark) kid lesson stage |
| Gamification | **None** — removed |
| Character | Refine the **existing** `avatar/Character.tsx` SVG (bigger, more expressive eyes/blush/smile); keep current emotion + mouth-sync hooks. No new asset pipeline. |
| Motion | Lively but tasteful: expressive character, satisfying answer feedback, a gentle lesson-complete celebration, smooth transitions. Respect `prefers-reduced-motion`. |
| Scope | **Everything** — design system + all parent screens + kid lesson + character |

## Design system (`client/src/styles.css` — single source of truth)

- **Tokens:** light `--bg`; `--surface` white/glassy; primary `--accent` indigo `#5b6cff`; semantic `--good/--warn/--bad`.
- **Per-subject color:** a `--subject` CSS variable (set per course/lesson) themes accent dots, bars, block accents, and the lesson stage. Mapping by `subjectKey` (math, science, language, history, art, general…).
- **Type:** rounded sans body; display weight for headers. System-font fallback stack so it renders offline (no hard dependency on a CDN font).
- **Depth & shape:** softer layered shadows, larger radii, glassy chips/pills.
- Keep the existing class names where possible so component churn stays low; restyle in place.

## Screen-by-screen

**Parent area (calm + maintainable)**
- `ParentDashboard` — friendly greeting header; learner cards show per-subject progress as **color dot + label + bar** rows; clear primary actions (Open / Start learning); AI monitor + Manage AI brain as secondary.
- `KidDetail` — declutter the dense class-tile grid; subject color identity per class; keep "what the tutor knows", history/reports, add-a-class, delete-learner.
- `CourseDetail` — cleaner syllabus list with subject theming; keep Teach / regenerate / add-curriculum.
- `ConnectBrain` — restyle to the new system; no behavior change.
- `ParentPrompts` — restyle the AI prompt monitor (live log + templates) to the new cards/type.

**Kid lesson (visual + engaging)**
- `LearnHome` — warmer "ready to learn" hub; subject-themed course cards; prominent Start.
- `Classroom` — light pastel stage with a soft spotlight; bigger character; restyled speech bubble + beat dots; subject color in the stage. Top bar keeps Mic / Voice / HD toggles, restyled. Lesson-complete = a tasteful celebration (confetti/star burst), framed as positive feedback, not scoring.
- `BlockView` / blocks — restyle chips, choices, buckets, inputs, match/order/flashcards to the new system + subject accent; keep all reveal-correct/wrong feedback animations.

**Character (`avatar/Character.tsx`)**
- Larger, rounder, friendlier; more expressive eyes (highlights), blush, smile. Preserve the existing `emotion` states and `mouthOpen` mouth-sync API so `Classroom` keeps working unchanged.

## Constraints / risk control

- Preserve all working functionality: voice (Whisper/TTS), block system, lesson director, brain providers (Anthropic/Codex/Ollama), parent PIN.
- **Minimal `shared/types.ts` changes** — ideally none. Since gamification is out, no new persisted fields are needed.
- Re-skin via `styles.css` + targeted component edits; no router or data-flow changes.
- Verify continuously: `npm run typecheck` + `npm run build`, then Playwright screenshots of each screen (same harness used for recon).
- All work isolated on `claude/ui-redesign`; nothing merged until reviewed.

## Verification

For each screen: builds clean, no TypeScript errors, renders correctly in a real browser screenshot, and the live lesson flow (check-in → teach turn → answer → feedback) still works end-to-end.

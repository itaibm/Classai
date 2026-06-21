# Classai UI Redesign — Design Spec

**Date:** 2026-06-21
**Branch:** `claude/ui-redesign` (off `claude/brain-connect-codex-classroom`)
**Type:** Re-skin + UX polish **+ one new feature** (Weekly Schedule). Touches `shared/types.ts`, server, and DB (additively).

## Goal

Two audiences, one app:
- **Parents** — a calm, clear, comfortable area to set up and maintain learners, classes, the AI brain, and a **weekly schedule** for each kid.
- **Kids** — classes organized so it's easy to pick a subject and **continue** it, leading with "today's plan", inside a visual, engaging lesson experience built around the tutor character.

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
| Scope | **Everything** — design system + all parent screens + kid lesson + character + **Weekly Schedule feature** |
| Weekly schedule | **Weekly grid, multiple classes per weekday, in order. Optional time slot per entry.** Entries are course-level (the kid "continues" the course; the recommendation engine picks the next topic). |
| Kid home | **Today first** — "Today's plan" (from the schedule) with a big Continue on the next class, then all classes grouped by subject. |

## Design system (`client/src/styles.css` — single source of truth)

- **Tokens:** light `--bg`; `--surface` white/glassy; primary `--accent` indigo `#5b6cff`; semantic `--good/--warn/--bad`.
- **Per-subject color:** a `--subject` CSS variable (set per course/lesson) themes accent dots, bars, block accents, and the lesson stage. Mapping by `subjectKey` (math, science, language, history, art, general…).
- **Type:** rounded sans body; display weight for headers. System-font fallback stack so it renders offline (no hard dependency on a CDN font).
- **Depth & shape:** softer layered shadows, larger radii, glassy chips/pills.
- Keep the existing class names where possible so component churn stays low; restyle in place.

## New feature: Weekly Schedule + organized kid home

### Data model (`shared/types.ts`, additive)
```ts
export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface ScheduleEntry {
  id: string;
  courseId: string;     // course-level; kid "continues" this class
  time?: string;        // optional "HH:MM" (24h); undefined = unscheduled time
  order: number;        // position within the day (used when no/equal times)
}

export interface WeeklySchedule {
  kidId: string;
  days: Record<Weekday, ScheduleEntry[]>;  // each day's entries, sorted by time then order
  updatedAt: string;
}
```

### Persistence
- Store one JSON blob per kid in the existing `settings` table under key `schedule:<kidId>` (no new migration needed; `node:sqlite`). If a dedicated table reads cleaner, add `schedules(kidId TEXT PRIMARY KEY, json TEXT, updatedAt TEXT)`.
- Deleting a kid or a course must drop / clean dangling schedule entries (filter out course IDs that no longer exist on read).

### Server
- `GET /api/kids/:id/schedule` → `{ schedule }` (empty week if none set).
- `PUT /api/kids/:id/schedule` → save full week; validate course IDs belong to the kid; reject unknown weekdays. Behind the parent gate, like other parent endpoints.

### Parent editor (new screen `/parent/kid/:id/schedule`)
- Linked from `KidDetail` ("📅 Weekly schedule").
- A 7-day view (week grid on wide screens; stacked day list on narrow). Per day: add a class (picker of that kid's courses), optional time, reorder, remove. Subject color on each entry. Autosaves or explicit Save.
- Empty state nudge: "Build a simple week — add classes to the days you want."

### Kid home (`LearnHome`, reorganized)
- **Today's plan** section at top: the entries for the current local weekday, in order, each showing the class (subject color), progress, time if set, and a prominent **Continue** (resolves to that course's recommended next topic via the existing recommendation/`generateLesson` flow). The next-up class gets the biggest Continue.
- **All classes** below, **grouped by subject**, each with progress + Continue, so the kid can also pick freely (Bio → Math → Literature).
- If no schedule exists, skip the Today section and just show grouped classes.

## Screen-by-screen

**Parent area (calm + maintainable)**
- `ParentDashboard` — friendly greeting header; learner cards show per-subject progress as **color dot + label + bar** rows; clear primary actions (Open / Start learning); AI monitor + Manage AI brain as secondary.
- `KidDetail` — declutter the dense class-tile grid; subject color identity per class; **add a "📅 Weekly schedule" entry point**; keep "what the tutor knows", history/reports, add-a-class, delete-learner.
- `CourseDetail` — cleaner syllabus list with subject theming; keep Teach / regenerate / add-curriculum.
- `ConnectBrain` — restyle to the new system; no behavior change.
- `ParentPrompts` — restyle the AI prompt monitor (live log + templates) to the new cards/type.

**Kid lesson (visual + engaging)**
- `LearnHome` — reorganized per the **Weekly Schedule** section above: "Today's plan" first (with Continue), then all classes grouped by subject. Warmer "ready to learn" hub feel; subject-themed cards.
- `Classroom` — light pastel stage with a soft spotlight; bigger character; restyled speech bubble + beat dots; subject color in the stage. Top bar keeps Mic / Voice / HD toggles, restyled. Lesson-complete = a tasteful celebration (confetti/star burst), framed as positive feedback, not scoring.
- `BlockView` / blocks — restyle chips, choices, buckets, inputs, match/order/flashcards to the new system + subject accent; keep all reveal-correct/wrong feedback animations.

**Character (`avatar/Character.tsx`)**
- Larger, rounder, friendlier; more expressive eyes (highlights), blush, smile. Preserve the existing `emotion` states and `mouthOpen` mouth-sync API so `Classroom` keeps working unchanged.

## Constraints / risk control

- Preserve all working functionality: voice (Whisper/TTS), block system, lesson director, brain providers (Anthropic/Codex/Ollama), parent PIN.
- `shared/types.ts` changes are **additive only** (`Weekday`, `ScheduleEntry`, `WeeklySchedule`) — no edits to existing contracts (`TeacherTurn`, `LearnerModel`, etc.).
- The Weekly Schedule adds two server endpoints + one persistence blob + one new parent screen + one new client route. The kid "Continue" reuses the existing recommendation/`generateLesson` flow — no changes to the lesson director.
- Everything else is a re-skin via `styles.css` + targeted component edits; no other router or data-flow changes.
- Verify continuously: `npm run typecheck` + `npm run build`, then Playwright screenshots of each screen (same harness used for recon).
- All work isolated on `claude/ui-redesign`; nothing merged until reviewed.

## Verification

For each screen: builds clean, no TypeScript errors, renders correctly in a real browser screenshot, and the live lesson flow (check-in → teach turn → answer → feedback) still works end-to-end.

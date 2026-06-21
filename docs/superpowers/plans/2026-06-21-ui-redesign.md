# Classai UI Redesign — Implementation Plan

> **For agentic workers:** Implement task-by-task. This repo has **no unit-test runner** (per CLAUDE.md). "Verify" steps use `npm run typecheck`, `npm run build`, and Playwright screenshots (`/tmp/shoot.py` harness) instead of tests. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Re-skin the whole app to a light "Bright Modern" system with per-subject colors and a refined character, reorganize the kid home around "Today + continue", and add a parent Weekly Schedule builder — all on `claude/ui-redesign`, with no changes to the lesson director, voice, blocks, or brain providers.

**Architecture:** All visual change flows through CSS custom properties in `client/src/styles.css` (single source of truth) plus a tiny `subjectColor()` helper. The Weekly Schedule is additive: 3 new shared types, a JSON blob in the existing `settings` table keyed `schedule:<kidId>`, two parent-gated endpoints, one new client route + screen, and a reorganized `LearnHome`. "Continue" reuses the existing recommendation/`generateLesson` flow.

**Tech Stack:** Node 22 + Fastify, `node:sqlite`, React + Vite, shared TS contract. Verify with `npm run typecheck` / `npm run build`. Screenshots via the global arm64 Chromium at `/Users/itai/Library/Caches/ms-playwright/chromium-1208/...`.

**Subject color map** (`subjectKey` → accent):
`math` indigo `#5b6cff` · `science` teal `#1bb6a6` · `language_arts` coral `#ff7a6b` · `world_language` violet `#9a6cff` · `history` amber `#e8a33a` · `general` slate-blue `#5b6cff`. Default = indigo.

---

## Phase 0 — Foundations

### Task 1: Design-system tokens in `styles.css`
**Files:** Modify `client/src/styles.css` (`:root` + base + buttons/cards/inputs).
- [ ] Replace `:root` tokens: `--bg:#f7f9ff`, `--surface:#ffffff`, `--ink:#1d2433`, `--muted:#6b7488`, `--line:#e8ecf6`, `--accent:#5b6cff` (drop the hue-derived accents; keep `--accent-h` fallback for `avatar.hue`), `--accent-soft:#eef0ff`, `--accent-ink:#3a45c4`, `--good:#1bb6a6`, `--warn:#e8a33a`, `--bad:#ff6f6b`, `--radius:22px`, softer layered `--shadow:0 14px 40px rgba(46,57,120,.12)`, add `--subject:var(--accent)` and `--subject-soft` defaults.
- [ ] Body background → soft pastel gradient (`linear-gradient(160deg,#eef1ff,#f6efff 45%,#fff1f0)` fixed) over `--bg`.
- [ ] Restyle `.btn` (radius 14–16px, indigo, soft glow shadow), `.card` (radius var, lighter border, layered shadow), inputs (radius 12–14px). Keep all class names.
- [ ] Add `@media (prefers-reduced-motion: reduce){ *{animation:none!important;transition:none!important} }`.
- [ ] **Verify:** `npm run build` succeeds. Screenshot `/#/` and `/#/parent`; confirm new palette renders, nothing overlaps.
- [ ] **Commit:** `style: new Bright Modern design tokens`

### Task 2: `subjectColor()` helper (shared)
**Files:** Create `client/src/lib/subject.ts`.
- [ ] Export `const SUBJECT_COLORS: Record<string,{accent:string;soft:string;ink:string}>` for the 6 keys above + `default`. Export `subjectColor(key?:string)` returning the entry (fallback default). Export `subjectStyle(key?)` returning `{ ['--subject']:accent, ['--subject-soft']:soft } as React.CSSProperties`.
- [ ] **Verify:** `npm run typecheck` passes.
- [ ] **Commit:** `feat: subject color helper`

---

## Phase 1 — Weekly Schedule feature (data + server + api)

### Task 3: Shared types
**Files:** Modify `shared/types.ts` (append near `Course`).
- [ ] Add:
```ts
export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export const WEEKDAYS: Weekday[] = ['mon','tue','wed','thu','fri','sat','sun'];
export interface ScheduleEntry { id: string; courseId: string; time?: string; order: number; }
export interface WeeklySchedule { kidId: string; days: Record<Weekday, ScheduleEntry[]>; updatedAt: string; }
```
- [ ] **Verify:** `npm run typecheck`.
- [ ] **Commit:** `feat: WeeklySchedule shared types`

### Task 4: Server persistence + endpoints
**Files:** Modify `server/src/routes.ts` (add after the kid endpoints, ~line 254). Reuse `settings` from `server/src/db`.
- [ ] Helper in routes (or `server/src/db/index.ts`): `getSchedule(kidId)` reads `settings.get('schedule:'+kidId)`, JSON-parses to `WeeklySchedule`, returns an empty week (`days` with each weekday `[]`) if missing; on read, **filter out entries whose `courseId` is not in the kid's courses**. `setSchedule(kidId, sched)` validates each `courseId` belongs to the kid, sorts each day by `time??'99:99'` then `order`, stamps `updatedAt`, `settings.set`.
- [ ] `app.get('/api/kids/:id/schedule', ...)` → `{ schedule }`.
- [ ] `app.put('/api/kids/:id/schedule', ...)` → body `{ schedule }`; validate; save; return `{ schedule }`. 400 on unknown weekday / foreign courseId.
- [ ] **Verify:** `npm start` (restart), `curl` GET returns empty week; PUT with a real courseId persists; GET reflects it; PUT with bogus courseId → 400.
- [ ] **Commit:** `feat: schedule persistence + endpoints`

### Task 5: Client api methods
**Files:** Modify `client/src/lib/api.ts`.
- [ ] Add `schedule:(kidId)=>req<{schedule:WeeklySchedule}>('/kids/'+kidId+'/schedule')` and `saveSchedule:(kidId,schedule)=>req<{schedule:WeeklySchedule}>('/kids/'+kidId+'/schedule',{method:'PUT',body:JSON.stringify({schedule})})`. Import the types.
- [ ] **Verify:** `npm run typecheck`.
- [ ] **Commit:** `feat: schedule api client`

---

## Phase 2 — Parent Schedule editor

### Task 6: Schedule editor screen + route
**Files:** Create `client/src/screens/ScheduleEditor.tsx`; modify `client/src/App.tsx` (add route `'/parent/kid/:id/schedule'` → `<ParentGate><ScheduleEditor kidId=.../></ParentGate>` BEFORE the `/parent/kid/:id` match); modify `client/src/screens/KidDetail.tsx` (add "📅 Weekly schedule" button near the top actions → `navigate('/parent/kid/'+kidId+'/schedule')`).
- [ ] Editor: load `api.kid`, `api.courses`, `api.schedule`. Render 7 day columns (CSS grid, wraps/stacks narrow). Each day lists entries (subject-colored chip = course title + optional time), with remove + reorder (↑/↓). "＋ Add class" opens a small inline picker of the kid's courses; optional time `<input type=time>`. Local state; **Save** button calls `api.saveSchedule`. Empty-state copy from spec.
- [ ] **Verify:** `npm run build`; screenshot `/#/parent/kid/<LEO>/schedule`; add a class to Mon + Wed, Save, reload → persists.
- [ ] **Commit:** `feat: parent weekly schedule editor`

---

## Phase 3 — Kid home reorg

### Task 7: `LearnHome` — Today + grouped-by-subject + Continue
**Files:** Modify `client/src/screens/LearnHome.tsx`.
- [ ] Also load `api.schedule(kidId)`. Compute today's weekday via `WEEKDAYS[(new Date().getDay()+6)%7]`. Build "Today's plan": map today's `ScheduleEntry[]` → their `CourseCard`s (skip missing). Render a **Today** section: each row subject-colored (use `subjectStyle(course.subjectKey)`), title, time, progress bar, **Continue** button (calls existing `start(courseId, recommendation.topicId, kind)`); the first incomplete one gets `.btn lg`.
- [ ] Render **All classes** grouped by `subjectKey` (section heading per subject with color dot), each course a card with progress + Continue + the existing "All topics" details. Reuse current `start()`.
- [ ] If schedule empty → omit Today section.
- [ ] **Verify:** `npm run build`; screenshot `/#/learn/<ANNA>` (no schedule → grouped only) and `/#/learn/<LEO>` after scheduling something (Today shows). Continue still launches a lesson.
- [ ] **Commit:** `feat: kid home — today + grouped classes`

---

## Phase 4 — Character + Classroom + blocks

### Task 8: Refine `Character.tsx`
**Files:** Modify `client/src/avatar/Character.tsx`.
- [ ] Keep the component's props/exports (`character`, `hue`, `emotion`, `mouthOpen`, `speaking`) and the existing animation hooks. Enlarge/round the face, add eye highlights + blush, friendlier mouth; ensure `mouthOpen`/`emotion` still drive the mouth/brows. Don't change the public API.
- [ ] **Verify:** `npm run build`; screenshot `/#/learn/<ANNA>` (avatar in header) — renders, no console errors.
- [ ] **Commit:** `style: refine tutor character`

### Task 9: Classroom restyle + subject theming + completion celebration
**Files:** Modify `client/src/screens/Classroom.tsx`; add CSS to `styles.css`.
- [ ] Apply `subjectStyle(lesson?.subjectKey ?? course subjectKey)` to the stage root so `--subject` themes bubble accent, beat dots, board border. Restyle `.stage` to the light pastel + soft spotlight (from mockup C). Restyle top-bar toggles.
- [ ] On `phase==='ended'` (report shown), render a tasteful one-shot celebration (CSS confetti/star burst component, ~1.5s, respects reduced-motion). No score text.
- [ ] **Verify:** drive the live flow with `/tmp/shoot_class2.py`; screenshot mid-lesson + ended state. Lesson still teaches/answers.
- [ ] **Commit:** `style: classroom stage + completion celebration`

### Task 10: Blocks restyle
**Files:** Modify `client/src/blocks/BlockView.tsx` (+ `styles.css` block rules already present).
- [ ] Ensure blocks inherit `--subject` for chips/choices/buckets/match/order/flashcards accents; keep reveal-correct/wrong feedback. Mostly CSS; touch component only where inline colors are hardcoded.
- [ ] **Verify:** `npm run build`; screenshot a live lesson with a block.
- [ ] **Commit:** `style: themed lesson blocks`

---

## Phase 5 — Parent screens restyle

### Task 11: `ParentDashboard`
**Files:** Modify `client/src/screens/ParentDashboard.tsx`.
- [ ] Greeting header; learner cards show per-subject progress rows (color dot + label + bar) using `api.courses` data already available (or a light fetch); primary actions Open / Start learning; AI monitor + Manage AI brain secondary.
- [ ] **Verify:** build + screenshot `/#/parent`.
- [ ] **Commit:** `style: parent dashboard`

### Task 12: `KidDetail` + `CourseDetail`
**Files:** Modify both screens.
- [ ] KidDetail: cleaner class grid with subject color; schedule button already added (Task 6). CourseDetail: subject-themed syllabus list.
- [ ] **Verify:** build + screenshots of both.
- [ ] **Commit:** `style: kid + course detail`

### Task 13: `ConnectBrain` + `ParentPrompts`
**Files:** Modify both screens.
- [ ] Restyle to new cards/type; no behavior change.
- [ ] **Verify:** build + screenshots of both.
- [ ] **Commit:** `style: connect-brain + prompt monitor`

---

## Phase 6 — Final pass

### Task 14: Full regression screenshot sweep
- [ ] `npm run typecheck` clean; `npm run build` clean.
- [ ] Run `/tmp/shoot.py` (all static screens) + `/tmp/shoot_class2.py` (live lesson). Eyeball every screenshot for layout breakage, contrast, overflow.
- [ ] Confirm end-to-end: create a schedule → kid Today shows it → Continue launches a lesson → teach turn → answer → feedback → completion celebration.
- [ ] **Commit:** `chore: redesign regression pass` (+ any fixes).

---

## Self-review notes
- **Spec coverage:** design system (T1–2), schedule data/server/api (T3–5), parent editor (T6), kid home (T7), character (T8), classroom+celebration (T9), blocks (T10), all parent screens (T11–13), verification (T14). All spec sections mapped.
- **Type consistency:** `WeeklySchedule.days: Record<Weekday,ScheduleEntry[]>`, `ScheduleEntry{id,courseId,time?,order}`, api `schedule`/`saveSchedule`, `subjectColor`/`subjectStyle` used consistently across T3–7.
- **No gamification** anywhere (confirmed: completion celebration is feedback, not scoring).

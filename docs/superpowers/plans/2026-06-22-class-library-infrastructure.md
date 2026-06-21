# Shared Class Library Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace kid-owned courses with a reusable Year → Class library whose approved lesson blueprints can be taught to multiple enrolled learners with independent progress and memory.

**Architecture:** Shared library records (`SchoolYear`, `ClassDefinition`, topics, knowledge materials, versioned lessons, AI suggestions) live independently from learners. `ClassEnrollment` joins learners to classes; sessions snapshot an approved lesson revision and continue using the existing deterministic director, short-term `WorkingMemory`, and long-term `LearnerModel`. Parent authoring and learner delivery use separate services and routes.

**Tech Stack:** Node 22, TypeScript strict mode, Fastify 5, built-in `node:sqlite`, React 18, Vite 6, zod 3.

## Global Constraints

- Keep all data local; do not send uploads, audio, or personal data anywhere except text prompts to the user's selected brain.
- Preserve bring-your-own-key behavior and never add a provider key.
- Preserve the deterministic lesson director as the owner of lesson control flow.
- Preserve tolerant AI JSON extraction and zod validation.
- Preserve learner-owned `WorkingMemory`, `LearnerModel`, episodes, reports, and mastery.
- Reset current learners, classes, lessons, sessions, and memory rows once for the new schema; do not migrate them.
- Do not import or modify `curriculum/` or `knowledge-base/` in this phase.
- Do not add a test runner, linter, or formatter; `npm run typecheck` is the repository's only automated check.
- Run `npm run typecheck` after each coherent implementation task and `npm run build` before completion.

---

### Task 1: Shared Contract and Clean Database Schema

**Files:**
- Modify: `shared/types.ts`
- Modify: `server/src/db/index.ts`

**Interfaces:**
- Produces: `SchoolYear`, `ClassDefinition`, `ClassEnrollment`, `KnowledgeMaterial`, shared `Topic`, versioned `Lesson`, `AISuggestion`, and session lesson snapshots.
- Produces repositories: `schoolYears`, `classes`, `enrollments`, `knowledgeMaterials`, `topics`, `lessons`, `aiSuggestions`.

- [ ] **Step 1: Replace the kid-owned course contract with shared library types**

Define these exact ownership fields while retaining existing beat, memory, progress, and teaching-turn types:

```ts
export interface SchoolYear {
  id: string;
  name: string;
  order: number;
  createdAt: string;
}

export interface ClassDefinition {
  id: string;
  yearId: string;
  subject: string;
  subjectKey: SubjectKey;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassEnrollment {
  id: string;
  classId: string;
  kidId: string;
  createdAt: string;
}

export interface KnowledgeMaterial {
  id: string;
  classId: string;
  lessonId?: string;
  title: string;
  source: 'pasted' | 'described' | 'file' | 'system';
  rawText: string;
  status: 'ready' | 'pending' | 'error';
  createdAt: string;
  updatedAt: string;
}
```

Change `Topic` to use `classId` without `kidId`. Change `Lesson` to use `classId`, `familyId`, `revision`, `status: 'draft' | 'approved' | 'archived'`, and `updatedAt`, without `kidId`. Add `lessonSnapshot: Lesson` to `Session`. Add `blocks?: LessonBlock[]` to `TranscriptEntry`.

Define `AISuggestion` with `id`, `classId`, optional `lessonId`, `sourceSessionId`, `sourceTurnTs`, `title`, `objective`, `block: LessonBlock`, `status: 'draft' | 'approved' | 'discarded'`, `createdAt`, and `updatedAt`.

- [ ] **Step 2: Introduce a one-time schema reset marker**

Use the marker `class-library-v1`. Before creating the new tables, inspect `PRAGMA user_version`; when it is below `2`, drop the old content tables and settings, create the new schema, and set `PRAGMA user_version = 2`. Do not touch `data/auth-profiles.json`.

- [ ] **Step 3: Create repository methods for every shared entity**

Provide typed list/get/insert/update/remove functions. Enrollment insertion must be idempotent under a unique `(classId, kidId)` constraint. Lesson approval must run in a transaction that archives the previously approved row in the same `familyId` before approving the selected revision.

- [ ] **Step 4: Preserve learner memory repositories and adapt session persistence**

Keep `learnerModels`, `episodes`, and their row converters behaviorally unchanged. Store and hydrate `Session.lessonSnapshot` as JSON so a running or historical session never depends on a later lesson edit.

- [ ] **Step 5: Run the contract check and commit**

Run: `npm run typecheck`  
Expected: failures only at old kid-owned course call sites, proving the contract has moved before the consumers are updated.

Commit the contract/schema transition together with the consumers fixed in Task 2 so the branch is never committed in a knowingly broken state.

---

### Task 2: Class Library, Enrollment, Progress, and Schedule Services

**Files:**
- Replace: `server/src/services/courses.ts` with `server/src/services/class-library.ts`
- Modify: `server/src/memory/index.ts`
- Modify: `server/src/routes.ts`
- Modify: `server/src/ai/prompts.ts`

**Interfaces:**
- Consumes: repositories and shared types from Task 1.
- Produces: class CRUD, material metadata, topic generation, enrollment CRUD, learner class cards, and schedule validation.

- [ ] **Step 1: Implement year and class creation**

Create `createSchoolYear({ name, order })`, `createClass({ yearId, subject, title?, description? })`, `addKnowledgeMaterial(classId, input)`, and `buildSyllabus(classId)` in `class-library.ts`. Syllabus generation uses a neutral sample learner context rather than owning the class by one kid; learner personalization belongs only in lesson delivery.

- [ ] **Step 2: Adapt progress to shared classes**

Change `courseProgress` and `recommendNext` to accept `ClassDefinition` and shared topics while continuing to read only the supplied learner's `LearnerModel`. Keep recommendation behavior and mastery thresholds unchanged.

- [ ] **Step 3: Replace course routes with library routes**

Implement these endpoints with 400/404/409 responses for invalid references or duplicate state:

```text
GET    /api/library
POST   /api/years
POST   /api/classes
GET    /api/classes/:id
PUT    /api/classes/:id
DELETE /api/classes/:id
POST   /api/classes/:id/materials
DELETE /api/materials/:id
POST   /api/classes/:id/syllabus/regenerate
GET    /api/kids/:id/classes
POST   /api/classes/:id/enrollments
DELETE /api/classes/:id/enrollments/:kidId
```

The library response groups classes beneath years. Class detail includes topics, materials, lessons, suggestions, and enrolled learner summaries.

- [ ] **Step 4: Validate weekly schedules through enrollment**

Update schedule read/write helpers so an entry is retained only when the learner has an enrollment for its `classId`. Keep the existing weekday ordering and time normalization.

- [ ] **Step 5: Typecheck and commit the shared backend foundation**

Run: `npm run typecheck`  
Expected: server passes; remaining failures are client references to `Course` and old API methods.

Commit: `feat: add shared class library foundation`

---

### Task 3: Versioned Lesson Authoring and AI Revision

**Files:**
- Replace: `server/src/services/lessons.ts` with `server/src/services/lesson-authoring.ts`
- Modify: `server/src/ai/prompts.ts`
- Modify: `server/src/routes.ts`

**Interfaces:**
- Produces: `generateLessonDraft(classId, topicId)`, `saveLessonDraft(lessonId, input)`, `reviseLessonDraft(lessonId, instruction)`, `approveLesson(lessonId)`, `archiveLesson(lessonId)`, and `deleteLesson(lessonId)`.

- [ ] **Step 1: Generate parent-reviewable lesson drafts**

Use the existing two-pass analysis/plan pipeline, class subject profile, class/lesson materials, and a neutral learner context. Generated rows start at revision `1`, use a new `familyId`, and have status `draft`.

- [ ] **Step 2: Make manual edits version-safe**

When editing a draft, update that draft and increment its `updatedAt`. When editing an approved lesson, clone it into a new draft with the same `familyId` and `revision + 1`; never mutate the approved row.

- [ ] **Step 3: Add the AI revision prompt**

Add `reviseLessonPrompt(currentLesson, instruction, classMaterials, lessonMaterials)`. It must ask for the existing `LessonPlanSchema` shape, preserve the objective unless explicitly requested, and ground revisions in attached materials. Parse it with `generateStructured`; save the result as a draft revision.

- [ ] **Step 4: Add authoring lifecycle routes**

```text
POST   /api/classes/:id/lessons
PUT    /api/lessons/:id
POST   /api/lessons/:id/revise
POST   /api/lessons/:id/approve
POST   /api/lessons/:id/archive
DELETE /api/lessons/:id
GET    /api/lessons/:id
```

Only drafts can be approved; approval archives the previously approved revision in that family. Approved lessons archive rather than hard-delete. Drafts and archived revisions can be hard-deleted when no session references them.

- [ ] **Step 5: Typecheck and commit lesson authoring**

Run: `npm run typecheck`  
Expected: server passes with the new authoring routes.

Commit: `feat: add versioned lesson authoring`

---

### Task 4: Shared Lessons in the Live Director and AI Suggestions

**Files:**
- Modify: `server/src/teach/index.ts`
- Modify: `server/src/ai/prompts.ts`
- Modify: `server/src/routes.ts`

**Interfaces:**
- Consumes: approved shared lesson, enrollment, class/lesson materials, learner model.
- Produces: isolated learner sessions and reviewable `AISuggestion` records.

- [ ] **Step 1: Require enrollment and approval before session start**

Change the start route to accept `{ kidId }`. Return `409` unless the lesson is approved and the learner is enrolled in its class. `startSession` snapshots the lesson and stores the learner-specific `WorkingMemory` exactly as today.

- [ ] **Step 2: Teach from the session snapshot**

In `nextTurn`, use `session.lessonSnapshot`, fetch the shared class, and keep all current director state transitions, stuck handling, turn caps, memory updates, reports, and episodes.

- [ ] **Step 3: Ground live teaching in knowledge materials**

Load class-wide materials plus materials attached to the snapshot lesson. Append them to `teachSystemPrompt` under a clearly delimited parent-approved knowledge section. Empty material lists remain valid.

- [ ] **Step 4: Capture successful live activities as drafts**

Persist `turn.blocks` in transcript entries. When a learner response is judged `correct`, find the previous teacher turn's interactive block and insert one idempotent suggestion keyed by `(sourceSessionId, sourceTurnTs)`. Suggestions remain drafts and never alter the lesson.

- [ ] **Step 5: Add suggestion review routes**

```text
PUT    /api/suggestions/:id
POST   /api/suggestions/:id/approve
POST   /api/suggestions/:id/discard
```

Approving marks a suggestion reusable and may attach it to the selected lesson; it does not rewrite a lesson plan automatically.

- [ ] **Step 6: Typecheck and commit live integration**

Run: `npm run typecheck`  
Expected: server passes without changing director ownership or memory semantics.

Commit: `feat: teach shared lessons with learner memory`

---

### Task 5: Typed Client API and Parent Class Library

**Files:**
- Modify: `client/src/lib/api.ts`
- Modify: `client/src/App.tsx`
- Modify: `client/src/screens/ParentDashboard.tsx`
- Create: `client/src/screens/ClassLibrary.tsx`
- Replace: `client/src/screens/CourseDetail.tsx` with `client/src/screens/ClassDetail.tsx`
- Create: `client/src/screens/LessonEditor.tsx`
- Modify: `client/src/styles.css`

**Interfaces:**
- Consumes: library and authoring routes from Tasks 2–3.
- Produces: parent workflows for Year → Class, enrollment, knowledge metadata, lesson editing, AI revision, approval, archive, delete, and suggestion review.

- [ ] **Step 1: Replace kid-course API calls with typed class-library calls**

Add methods for every endpoint in Tasks 2–4. Define `ClassCard` as `{ classDefinition, year, progress, recommendation, topicCount }`. Change `startLesson` to require `(lessonId, kidId)`.

- [ ] **Step 2: Add library routing and dashboard entry point**

Add `/parent/classes`, `/parent/class/:id`, and `/parent/lesson/:id`. Parent dashboard shows separate **Learners** and **Class Library** sections; creating a class is no longer inside a learner page.

- [ ] **Step 3: Build the Year → Class library screen**

Render years in order, classes within each year, and forms to create a year and class. Empty state explains that repository curriculum has not been imported yet.

- [ ] **Step 4: Build class detail tabs**

Provide Overview, Knowledge, Lessons, AI suggestions, and Learners sections. Support pasted material metadata, topic/lesson generation, learner enrollment toggles, suggestion approve/discard, and class deletion confirmation.

- [ ] **Step 5: Build full lesson editing**

Provide controlled fields for title, objectives, difficulty, analysis arrays, and every lesson beat's kind, goal, note, success criteria, visual, and check. Support add/remove/reorder beats, save draft, ask-AI instruction, approve, archive, and delete. Show revision and status clearly.

- [ ] **Step 6: Typecheck and commit parent authoring UI**

Run: `npm run typecheck`  
Expected: remaining failures are learner screens still using old course ownership.

Commit: `feat: add parent class library and lesson editor`

---

### Task 6: Learner Enrollment, Schedule, and Classroom Flow

**Files:**
- Modify: `client/src/screens/KidDetail.tsx`
- Modify: `client/src/screens/LearnHome.tsx`
- Modify: `client/src/screens/ScheduleEditor.tsx`
- Modify: `client/src/screens/Classroom.tsx`
- Modify: `client/src/screens/Home.tsx`

**Interfaces:**
- Consumes: learner class cards and approved shared lessons.
- Produces: learner-specific progress and session launch against shared content.

- [ ] **Step 1: Make learner detail enrollment-focused**

Remove class creation. Show enrolled shared classes and their learner-specific progress, while leaving the existing long-term memory, reports, profile editing, and delete-learner sections intact.

- [ ] **Step 2: Update learner home recommendations**

Group enrolled classes by year and show only approved lessons. Starting a recommended topic creates a draft only in the parent area; learner start selects the approved lesson for the topic and passes `kidId` to session start.

- [ ] **Step 3: Update schedule entries**

Use `classId` in `ScheduleEntry`, list only enrolled classes, and retain existing day/time ordering behavior.

- [ ] **Step 4: Pass learner identity through classroom start**

Route classroom as `/learn/:kidId/lesson/:lessonId` or otherwise retain `kidId` in navigation state. Call `api.startLesson(lessonId, kidId)` and preserve the current voice, avatar, blocks, and director loop.

- [ ] **Step 5: Typecheck and commit learner flow**

Run: `npm run typecheck`  
Expected: both server and client pass with zero TypeScript errors.

Commit: `feat: enroll learners in shared classes`

---

### Task 7: End-to-End Verification and Cleanup

**Files:**
- Modify only files required by failures found during verification.

**Interfaces:**
- Verifies all interfaces produced by Tasks 1–6.

- [ ] **Step 1: Verify the clean reset and empty states**

Start with a temporary `CLASSAI_DATA_DIR`, run the server, and confirm `/api/kids` and `/api/library` return empty arrays while brain profile storage is untouched.

- [ ] **Step 2: Run an API smoke flow**

Using the local API, create a year, class, two learners, enroll both, add a topic/material, create and approve a lesson, and verify both learner class lists reference the same class and lesson IDs.

- [ ] **Step 3: Verify access guards**

Confirm a draft cannot start, a non-enrolled learner cannot start, and an enrolled learner can start an approved lesson. Confirm the resulting session contains a lesson snapshot and independent working memory.

- [ ] **Step 4: Verify memory isolation**

Apply or inspect learner-specific memory for one enrolled child and confirm the second child's `LearnerModel`, episodes, mastery, and sessions remain unchanged.

- [ ] **Step 5: Run repository checks**

Run: `npm run typecheck`  
Expected: exit code `0`.

Run: `npm run build`  
Expected: Vite production build succeeds.

- [ ] **Step 6: Review scope and working tree**

Run `git diff --check` and inspect `git status --short`. Confirm `.obsidian/`, `curriculum/`, and `knowledge-base/` remain untracked and unchanged.

- [ ] **Step 7: Commit verification fixes**

Commit only if verification required code changes, using: `fix: complete class library integration`.

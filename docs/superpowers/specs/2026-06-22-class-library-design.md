# Shared Class Library Design

**Date:** 2026-06-22  
**Status:** Approved for planning  
**Branch:** `codex/class-library-infrastructure`

## Goal

Move classes out of individual learner folders into a parent-owned, reusable class library organized as **Year → Subject/Class**. A class owns its curriculum, knowledge materials, units, and approved lesson blueprints. Multiple learners can enroll in the same class while retaining independent progress, sessions, short-term working memory, and long-term learner models.

This phase builds the infrastructure and application logic. It does not import the existing `curriculum/` or `knowledge-base/` files yet.

## Product Model

### Library hierarchy

1. A `SchoolYear` groups classes such as Year 1, Year 2, and so on.
2. A `Class` represents one subject within a year, such as Year 1 Computing.
3. A class contains ordered units/topics, class-wide knowledge materials, lesson blueprints, and enrolled learners.
4. Knowledge materials may also be attached directly to one lesson.

The hierarchy mirrors the repository's curriculum organization, for example `curriculum/year-1/computing/`, but the files remain untouched and are not loaded during this phase.

### Shared and learner-specific data

Shared class data:

- Class identity, year, subject, description, and teaching boundaries
- Curriculum and class-wide knowledge materials
- Ordered units/topics
- Draft and approved lesson blueprints
- Approved reusable activities

Learner-specific data:

- Class enrollment
- Topic mastery and completion
- Recommendations and schedule
- Sessions, transcripts, reports, and memory episodes
- Existing short-term `WorkingMemory`
- Existing long-term `LearnerModel`

The memory systems remain learner-owned. They personalize how a shared lesson is delivered but never alter the approved shared blueprint automatically.

## Lesson Lifecycle

A lesson blueprint has a parent-controlled lifecycle:

- `draft`: editable but unavailable to learners
- `approved`: available for learner sessions
- `archived`: retained for history but unavailable for new sessions

Parents can create, fully edit, reorder, approve, archive, delete, or ask AI to revise a lesson. Full editing includes its title, objectives, analysis, teaching beats, explanations, visuals/video blocks, checks, activities, difficulty, and attached materials. AI revisions return a draft for review; they do not silently replace an approved lesson.

Starting a lesson creates a learner-specific session from an approved blueprint. The session records the blueprint revision used so later parent edits do not rewrite historical sessions.

## Live Teaching Adaptation

The deterministic lesson director remains responsible for control flow: current beat, checks, struggle streak, advancement, and completion. The AI remains responsible for teaching language, answer judgment, and producing lesson blocks.

For each live turn, the AI receives:

- The approved lesson blueprint and current director state
- Relevant class-wide and lesson-specific knowledge
- The learner profile and long-term learner model
- Recent session transcript and working memory

The AI may adapt explanations, examples, pacing, difficulty, questions, visuals, and activities. If the learner does not understand, it may reteach from a different angle or create a new activity without waiting for parent approval. It must stay within the lesson's learning objective and parent-approved class boundaries.

## AI Suggestions

Useful activities created during live teaching can be captured as class-level `AISuggestion` drafts. A suggestion records its source lesson/session, intended objective, content, and why it appeared useful.

Parents can:

- Review and edit the suggestion
- Approve it into the reusable class activity library
- Attach it to a lesson
- Discard it

Live adaptations never modify shared class content automatically.

## Parent Experience

The parent area gains a top-level **Class Library** separate from **Learners**.

The library opens by year, then subject/class. A class detail page provides:

- **Overview:** class details, units, and enrolled learners
- **Knowledge:** class-wide materials and their status
- **Lessons:** ordered drafts, approved lessons, and archived lessons
- **AI suggestions:** captured live activities awaiting review
- **Learners:** enroll or remove learners without deleting their profile

The learner page shows enrollments and learner-specific progress rather than owning classes.

## Data and Service Boundaries

The shared contract will distinguish reusable library entities from learner state. Proposed entities are:

- `SchoolYear`
- `ClassDefinition`
- `ClassEnrollment`
- `KnowledgeMaterial`
- `ClassTopic`
- `LessonBlueprint`
- `AISuggestion`

Existing `Session`, `WorkingMemory`, `LearnerModel`, `MemoryEpisode`, reports, and progress calculations remain learner-specific. Services will be separated into class-library management, lesson-authoring/revision, enrollment/progress, and live teaching.

All data stays in local SQLite. Uploaded-material storage and parsing are represented in the model and API, but actual file ingestion is deferred.

## API Behavior

The infrastructure will support:

- Listing and managing years and shared classes
- Managing topics and knowledge-material metadata
- Creating, editing, revising, approving, archiving, and deleting lessons
- Enrolling learners in shared classes
- Listing progress for one learner within one shared class
- Starting only approved lessons for enrolled learners
- Capturing and reviewing AI suggestions

Every route must verify referenced records and return a safe 4xx response for invalid class, learner, enrollment, lesson, or status combinations. AI-generated lesson and revision shapes continue through tolerant extraction, zod validation, and safe fallback behavior.

## Reset and Compatibility

There will be no migration of current records. The local application data is reset so learners, classes, lessons, sessions, reports, and memory rows start empty under the new schema.

The code and behavior of the short-term and long-term memory systems are preserved and reconnected through learner enrollments. Clearing existing memory rows is a one-time data reset, not removal of the memory feature.

## Deferred Work

- Importing or synchronizing `curriculum/`
- Importing or retrieving from `knowledge-base/`
- Upload parsing and extraction for PDFs or other file formats
- Writing parent changes back to repository Markdown files
- Automatic approval of AI-authored content

## Verification

Implementation is complete when:

1. Classes can exist without a learner owner and can enroll multiple learners.
2. Two learners can start the same approved lesson while maintaining separate progress, sessions, working memory, and long-term memory.
3. Draft lessons cannot be started.
4. Parents can fully edit a lesson and request an AI revision without changing the approved version until approval.
5. Live teaching can create adaptive activities without modifying shared content.
6. AI-created activities can appear as reviewable suggestions.
7. Current stored data is reset and the app starts cleanly.
8. `npm run typecheck` and `npm run build` succeed.

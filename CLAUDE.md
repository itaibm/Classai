# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Classai is a private, character-driven AI homeschool tutor. Parents supply a curriculum; Classai generates a syllabus and runs interactive, voice-enabled lessons behind an animated SVG character. Single TypeScript monorepo: Node 22 + Fastify server, React + Vite client, shared type contract.

## Commands

- `npm run dev` — concurrent dev: server on :8787 (`tsx watch`), client on :5173 (Vite HMR, proxies `/api` to :8787). Use this for local work.
- `npm run dev:server` / `npm run dev:client` — run one side only.
- `npm run typecheck` — full monorepo typecheck (server + client). **This is the only automated check** — there is no test runner, linter, or formatter configured. Run it after edits to verify your work.
- `npm run build` — Vite build of the client into `client/dist/`.
- `npm start` — production: serve the built client + API from :8787.
- `bash start.sh` (or `start.command` on macOS) — idempotent launcher: checks Node 22+, installs deps + builds once, opens the browser.

## Core architecture

**Data hierarchy** (defined in `shared/types.ts`): Kid (learner) → Course ("a class") → Topic (syllabus unit) → Lesson (generated) → Session (a live run). Cross-cutting: `LearnerModel` (long-term memory), Episodes, Reports.

**The lesson director** (`server/src/teach/index.ts`) is the agentic core: a deterministic state machine wrapped around the LLM. The director owns lesson state (current beat, struggle streak, checks passed, elapsed time) and each turn injects a STATE block + a DIRECTIVE (continue / check now / learner is stuck / wrap up). The LLM only produces the teaching speech and judges the learner's answer (as a structured `TeacherTurn`); the director updates state from that judgement and decides when to advance beats or end the lesson. Keep this division: control flow belongs in the director, not the prompt.

**Structured output is parsed tolerantly** (`server/src/ai/schemas.ts`). Because the brain may be Anthropic, OpenAI, or a local model, Classai does not use any vendor's structured-output API — it asks for JSON, extracts it defensively (code fences, prose containing braces), validates with zod, and applies safe fallbacks so a malformed reply never crashes a live lesson. New AI-returned shapes should follow this pattern.

**Two-tier memory**: short-term `WorkingMemory` lives on the Session and is updated by the teach loop; long-term `LearnerModel` (`server/src/memory/`) blends each turn's observations into a durable mastery map plus strengths/struggles/misconceptions/interests, and powers progress rollups, spaced review, and next-lesson recommendations.

**Provider abstraction** (`server/src/ai/provider.ts`): `getBrain()` returns a `Brain` with a single `generate()` method, built from the user's stored auth profile (`auth-store.ts`). The API-key and Ollama paths are standard; the OAuth/local-login paths mirror OpenClaw and depend on unofficial upstream endpoints — treat them as best-effort.

## Architecture constraints (don't break these)

- **Bring-your-own-key.** No developer AI key is baked in. Users connect their own brain (Anthropic API key, OpenAI OAuth, or local Ollama). Credentials live in `data/auth-profiles.json` (git-ignored) and are **never sent to the client**. Don't introduce a hardcoded or env-baked provider key.
- **Privacy: data stays local.** Voice STT (Whisper) and TTS (Kokoro) run in-browser via transformers.js/WebGPU; only transcribed text is sent to the user's brain. Learner profiles + transcripts live in local SQLite. Don't add code that ships voice audio or personal data off-device.
- **`shared/types.ts` is the contract** between server and client (`TeacherTurn`, `LearnerModel`, etc.). Changes here ripple across both sides — update both.

## Layout

- `server/src/ai/` — provider abstraction, OAuth, prompts, schemas, subject profiles
- `server/src/teach/` — the live agentic lesson loop (TeacherTurn director)
- `server/src/memory/` — long-term learner model, progress rollups, spaced review
- `server/src/services/` — curriculum → syllabus generation
- `server/src/db/` — SQLite (uses built-in `node:sqlite`, no native deps)
- `client/src/screens/`, `client/src/avatar/`, `client/src/voice/`, `client/src/blocks/`

## Gotchas

- TypeScript is **not emitted** (`noEmit: true`); everything runs through `tsx`. Use `.ts`/`.tsx` extensions in imports (`allowImportingTsExtensions`). Client imports shared types via the `@shared` path alias; server uses relative paths (`../../../shared/types.ts`).
- `strict` + `noUncheckedIndexedAccess` are on — indexed access is `T | undefined`; handle it.
- Requires **Node 22+** (for `node:sqlite` and module features).
- Server body limit is 4 MB (curricula can be large).

## Env vars (see `.env.example`)

`PORT` (8787), `CLASSAI_DATA_DIR` (`./data`, git-ignored), `CLASSAI_PARENT_PIN` (first user sets it if unset), `LOG_LEVEL` (`info`).

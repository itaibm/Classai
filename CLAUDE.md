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

**Provider abstraction** (`server/src/ai/provider.ts`): `getBrain()` returns a `Brain` with a single `generate()` method, built from the user's stored auth profile (`auth-store.ts`). Paths:
- **Anthropic API key / OpenAI API key / Ollama** — standard SDK calls.
- **Anthropic "reuse local Claude login"** — reads the local `claude` CLI token (creds file → macOS Keychain → legacy `ant`), used as an OAuth bearer. See `oauth.ts:getAnthropicLocalToken`.
- **OpenAI "Sign in with ChatGPT"** — `codexBrain` hits the **Codex subscription backend** (`chatgpt.com/backend-api/codex/responses`), NOT the standard API. It's the Responses API over SSE, requires `stream:true` + `store:false` + Codex headers (`originator: codex_cli_rs`, `OpenAI-Beta: responses=experimental`, `session_id`, codex User-Agent, `chatgpt-account-id`), and only serves **current plan models** (default `gpt-5.5`; older names like gpt-4o are rejected). Runs on the user's ChatGPT plan, no API billing, but rate-limited (~15–80 gpt-5.5 msgs / 5h) and undocumented/best-effort.

Both subscription paths are a ToS gray area and depend on unofficial endpoints — treat as best-effort.

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

`PORT` (8787), `CLASSAI_DATA_DIR` (`./data`, git-ignored), `CLASSAI_PARENT_PIN` (first user sets it if unset), `LOG_LEVEL` (`info`). Codex path also reads `OPENAI_OAUTH_BASE_URL` and `OPENAI_CODEX_MODEL` (default `gpt-5.5`).

## Session handoff (as of 2026-06-13)

Active branch: **`claude/brain-connect-codex-classroom`** (off `main`). Work is committed locally; **not pushed / no PR yet**.

**What works now (verified end-to-end):**
- Connect-your-brain: Claude "reuse local login" (reads the real `claude` token), API-key, and OpenAI "Sign in with ChatGPT" → Codex `gpt-5.5` (free on the user's plan). Connect now verifies with a real generation; Test button reports Working/Failed.
- Full lesson pipeline (learner → AI syllabus → AI lesson → live teaching turn) on both Claude Haiku and Codex gpt-5.5.
- Classroom redesign: speech bubble with word-by-word reveal, talking avatar, activity-forward layout.
- Voice answers: on-device Whisper capture (not Web Speech), live mic level meter, top-bar 🎙️ mic on/off + "● Listening…" pill, and a **universal answer bar** (mic+type) shown whenever the tutor waits with no interactive block — plus Skip/Continue.

**Important runtime notes:**
- The mic needs the app at **`http://localhost:8787`** — on a `192.168.x.x` LAN address the browser blocks all mic APIs.
- Brain selection persists in `data/auth-profiles.json`; default may be OpenAI gpt-5.5. If Codex hits its rate limit, switch to the Claude brain.
- First voice use downloads a small Whisper model (cached after).

**Known follow-ups / not done:**
- No **delete-course** endpoint — QA left junk courses on learner "Leo" (e.g. "Codex Test — Weather", "Answerbar Test"). Adding a delete-class action would let us clean them.
- The OpenAI "Sign in with ChatGPT" path only works for accounts whose plan includes Codex (current gpt-5.x models); older model names are rejected by the backend.
- Optional from `/init`: no linter/test runner exists; `npm run typecheck` is the only check.

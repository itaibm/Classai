# Classai — your at-home AI tutor 🎓

Classai is a private, open homeschooling tutor. A friendly **animated character**
teaches your kids (12+) across **any subject**, **talks** to them, **listens**,
**adapts in real time**, and **remembers** what each learner understands from one
lesson to the next. Parents bring the curriculum; Classai builds the syllabus,
runs the lessons, and reports back.

The "AI" is hidden behind the character. You connect **your own** AI brain —
there's no developer API key baked in — and everything personal (your kids' data,
their voice) stays **on your machine**.

---

## What it does

- **Parents bring a curriculum** (paste a syllabus, a textbook's table of
  contents, or just describe what to cover) → Classai builds a **sequenced
  syllabus** of topics for that subject and grade.
- **Subject-aware teaching.** Math is taught with worked steps and numeric
  checks; a world language with **speaking practice**; reading with passages and
  comprehension; science with predict-explain; history with narrative. (See
  `server/src/ai/subjects.ts`.)
- **A character teacher** that speaks (text-to-speech), shows **facial
  expressions**, and **lip-syncs**, while the kid answers by **clicking, typing,
  or speaking** (speech-to-text). Captions are always on for accessibility.
- **Two-tier memory**
  - *Short-term (working memory)* — a live read of how the lesson is going, used
    to adapt pace and difficulty turn by turn.
  - *Long-term (learner model)* — a durable per-kid profile: topic **mastery**,
    **strengths**, **struggles**, **misconceptions**, and **interests** (used to
    personalize examples). It powers **spaced review** and **next-lesson
    recommendations**, and greets returning kids by name.
- **Parent dashboard** — progress per class, **per-lesson and cumulative
  reports**, what the tutor knows about each kid, full history, and **concern
  flags** if something a parent should see comes up.
- **Diagnostics** — a gentle check-in when starting a substantial new course to
  place the learner.

## Bring your own brain (no developer key)

On the **Connect your brain** screen you choose how Classai thinks. Credentials
are stored only in `data/auth-profiles.json` on your machine (git-ignored) and
are never sent to the browser. Modeled on [OpenClaw](https://github.com/openclaw/openclaw)'s
multi-provider auth:

| Provider | How to connect |
|---|---|
| **Claude (Anthropic)** | Your own **API key**, or **reuse your local Claude login** (token from the `claude` / `ant auth login` CLI). |
| **OpenAI** | Your own **API key**, or **Sign in with ChatGPT** (OAuth 2.0 + PKCE). |
| **Local (Ollama)** | A **free local model** via any OpenAI-compatible endpoint — no key, fully offline. |

> Note: consumer-subscription login (Claude Pro/Max, ChatGPT Plus) for inference
> is restricted by both providers' terms. The API-key and local-model paths are
> fully standard; the OAuth/local-login paths reuse your own credentials the way
> OpenClaw does and depend on the providers' OAuth endpoints.

## Privacy

- Your kids' data lives in a local SQLite file (`data/classai.sqlite`).
- Voice is processed **in the browser** — speech recognition and the optional HD
  voice (Kokoro) run on-device, so **audio never leaves the machine**; only the
  resulting text goes to the brain you connected (on your own account).
- The parent area is behind a PIN.

---

## Tech

Fully open, one language (TypeScript), no heavyweight infra.

- **Server:** Node 22 + [Fastify], data in Node's built-in **`node:sqlite`** (zero
  native deps). The live lesson runs an agentic loop that asks the brain for a
  structured `TeacherTurn` each beat (validated with [zod], parsed tolerantly so a
  bad reply never breaks a lesson).
- **Client:** [React] + [Vite], a hand-authored **SVG character rig** (emotions +
  amplitude lip-sync — no proprietary assets).
- **Voice (in-browser):** [Kokoro-82M] TTS (opt-in HD) + [Whisper] STT via
  `transformers.js`/WebGPU, with the browser's Web Speech API as the instant
  default. Loaded on demand from a CDN.
- **Brain:** provider abstraction over the official Anthropic & OpenAI SDKs and
  any OpenAI-compatible local endpoint.

```
shared/types.ts        the contract (TeacherTurn, LearnerModel, …)
server/src/
  ai/                  provider abstraction, OAuth, prompts, schemas, subject profiles
  memory/              long-term learner model, progress rollups, spaced-review recommender
  services/            curriculum→syllabus and lesson generation
  teach/               the live teaching loop
  db/  routes.ts  index.ts
client/src/
  avatar/  voice/      character rig, TTS, STT
  screens/             Home, ConnectBrain, Parent area, LearnHome, Classroom
```

## Run it

Requires **Node 22+**.

```bash
npm install

# Dev (API on :8787, client on :5173 with proxy)
npm run dev
# open http://localhost:5173

# Production (build the client, then serve everything from the API)
npm run build
npm start
# open http://localhost:8787
```

First run: open **Connect your brain** → connect a provider → **Parent area** →
set a PIN → add a learner → create a class (paste curriculum or leave blank) →
**Start learning**.

Config (all optional) lives in `.env` — see `.env.example`.

## Roadmap / upgrade paths

- Swap the SVG character for a [Rive] or Live2D model (the avatar is a single
  component).
- Pluggable embeddings for semantic memory recall (the learner model already
  carries the structured signal).
- PDF/file curriculum upload.

[Fastify]: https://fastify.dev
[React]: https://react.dev
[Vite]: https://vite.dev
[zod]: https://zod.dev
[Kokoro-82M]: https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX
[Whisper]: https://huggingface.co/onnx-community/whisper-base
[Rive]: https://rive.app

/**
 * Brain provider abstraction. Given the user's connected profile, returns a
 * `Brain` with a single `generate()` method. Three vendors are supported:
 *
 *   anthropic — your own API key, OR "reuse your local Claude login" (the
 *               Claude Code OAuth token, read from ~/.claude/.credentials.json
 *               or the macOS Keychain, legacy `ant` CLI as a last resort — see
 *               oauth.ts), OR a stored OAuth token.
 *   openai    — your own API key, OR "Sign in with ChatGPT" OAuth, which talks
 *               to the Codex subscription backend (Responses API over SSE).
 *   local     — any OpenAI-compatible endpoint (Ollama by default), no key.
 *
 * The key/local paths are fully standard. The two subscription paths (Claude
 * login, ChatGPT/Codex) depend on unofficial upstream endpoints — best-effort.
 *
 * Prompt caching: a system prompt may be a plain string or a
 * `{ cached, dynamic }` split (see `SystemPrompt`). On Anthropic the `cached`
 * part becomes a system block with `cache_control`, so a lesson's stable
 * instructions are billed at the cache-read rate after the first turn. Every
 * other vendor just receives the flattened string.
 */
import { randomUUID } from 'node:crypto';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import type { BrainVendor } from '../../../shared/types.ts';
import { authStore } from './auth-store.ts';
import { getAnthropicLocalToken, clearAnthropicLocalTokenCache, refreshOpenAI } from './oauth.ts';
import { recordPrompt } from './prompt-log.ts';
import type { SplitSystemPrompt } from './prompts.ts';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** A system prompt: a plain string, or split so providers with prompt caching
 *  can cache the stable part (`cached`) and resend only `dynamic` uncached. */
export type SystemPrompt = string | SplitSystemPrompt;

/** The system prompt as one string (for vendors without caching, and the log). */
export function flattenSystem(system: SystemPrompt): string {
  if (typeof system === 'string') return system;
  return system.dynamic ? `${system.cached}\n\n${system.dynamic}` : system.cached;
}

/** Appended to the system prompt when a caller needs JSON back and the vendor
 *  has no schema-free JSON mode (Anthropic, Codex, local). */
export const JSON_ONLY_HINT = 'Reply with ONLY a single valid JSON object — no prose before or after it, no code fences.';

export interface GenerateOptions {
  system: SystemPrompt;
  messages: ChatMessage[];
  maxTokens?: number;
  /** The reply must be a single JSON object. OpenAI (API key) uses
   *  response_format json_object; the other vendors get JSON_ONLY_HINT appended
   *  to the system prompt. Parsing stays tolerant either way (schemas.ts). */
  json?: boolean;
  quality?: 'fast' | 'deep'; // 'deep' enables thinking on capable models
  label?: string; // what this call is for; shown in the Parent prompt inspector
}

export interface Brain {
  vendor: BrainVendor;
  model: string;
  generate(opts: GenerateOptions): Promise<string>;
}

export class NoBrainError extends Error {
  constructor() {
    super('No AI brain is connected. Open “Connect your brain” to add one.');
    this.name = 'NoBrainError';
  }
}

/** Dev/test-only canned brain. Inert unless CLASSAI_MOCK_BRAIN=1 is set
 *  explicitly — it ships no key and is never reachable in normal use. */
export function mockBrainEnabled(): boolean {
  return process.env.CLASSAI_MOCK_BRAIN === '1';
}

function mockGenerate(opts: GenerateOptions): string {
  const s = flattenSystem(opts.system || '');
  const u = (opts.messages || []).map((m) => m.content).join('\n');
  if (/\{"correct": boolean\}/.test(s) || /grade a young learner/i.test(s)) return '{"correct": true}';
  if (/progress report/i.test(s)) {
    return JSON.stringify({ summary: 'Mock session report.', mastered: [], needsWork: [], highlights: [], nextSteps: '', concerns: [], score: 70 });
  }
  if (/evolving profile/i.test(s)) return JSON.stringify({ summary: 'Mock learner summary.', preferences: '' });
  if (/curriculum designer/i.test(s)) {
    return JSON.stringify({ title: 'Mock', description: '', topics: [{ title: 'Topic', summary: '', estMinutes: 20, prerequisites: [] }] });
  }
  // Lesson generation (classai-lesson/1): return a valid core or practice part.
  if (/classai-lesson\/1/.test(s)) {
    if (/PRACTICE BANK/.test(u)) {
      const items = [1, 2, 3].flatMap((lvl) =>
        [0, 1, 2].map((k) => ({
          id: `mock-l${lvl}-${k}`,
          skill: 'mock skill',
          level: lvl,
          block: { type: 'numberEntry', prompt: `Type ${lvl}${k}`, answer: lvl * 10 + k },
          expectedAnswer: String(lvl * 10 + k),
          wrongAnswers: [{ answer: '0', why: 'slip', remedy: 'count again' }],
          hints: ['a small nudge', 'a bigger scaffold'],
          reteach: { say: 'Here is a smaller way to see it.' }
        }))
      );
      return JSON.stringify({ practiceBank: items, adaptivity: { startLevel: 2, levelUp: '', levelDown: '', masterySignal: '', struggleProtocol: [], personalization: '', endOnSuccess: 'End on a win.' } });
    }
    return JSON.stringify({
      vocabulary: [{ term: 'mock', definition: 'a stand-in' }],
      emphasize: ['the one big idea'],
      analysis: { keyConcepts: [], misconceptions: [], hooks: [], priorKnowledge: [] },
      materials: { human: [], digital: [] },
      delivery: { mode: 'fully_ai', humanNotes: '' },
      plan: [
        { kind: 'hook', delivery: 'ai', goal: 'hook', note: '', successCriteria: 'curious', script: { say: 'Ready?' } },
        { kind: 'explain', delivery: 'ai', goal: 'explain', note: '', successCriteria: 'shown', script: { say: 'Watch.' }, blocks: [{ type: 'richText', markdown: 'Idea.' }] },
        { kind: 'check', delivery: 'ai', goal: 'check', note: '', successCriteria: 'answered', script: { say: 'Your turn.' }, blocks: [{ type: 'multipleChoice', prompt: '2+2?', options: ['3', '4'], correct: 1 }], check: { question: '2+2?', expectedAnswer: '4', wrongAnswers: [{ answer: '3', why: 'slip', remedy: 'recount' }] } },
        { kind: 'practice', delivery: 'ai', goal: 'practice', note: '', successCriteria: '3 correct', script: { say: 'Practice!' } },
        { kind: 'recap', delivery: 'ai', goal: 'recap', note: '', successCriteria: 'stated', script: { say: 'Great job!' } }
      ],
      differentiation: { support: '', stretch: '' },
      extension: '',
      assessmentEvidence: '',
      revisitLater: ''
    });
  }
  // Default: a valid teaching turn (the director overrides blocks in authored mode).
  return JSON.stringify({
    speech: 'Mock tutor speaking.',
    emotion: 'happy',
    answerEval: 'na',
    awaitResponse: false,
    beatComplete: false,
    memoryUpdates: [],
    lessonComplete: false
  });
}

function mockBrain(): Brain {
  return { vendor: 'local', model: 'mock', async generate(opts) { return mockGenerate(opts); } };
}

/** Build the active brain from the default connected profile. */
export async function getBrain(profileId?: string): Promise<Brain> {
  if (mockBrainEnabled()) return withPromptLog(mockBrain());
  const id = profileId || authStore.getDefaultId();
  const profile = id ? authStore.getStored(id) : undefined;
  if (!profile) throw new NoBrainError();

  let brain: Brain;
  switch (profile.vendor) {
    case 'anthropic':
      brain = await anthropicBrain(profile);
      break;
    case 'openai':
      brain = await openaiBrain(profile);
      break;
    case 'local':
      brain = await localBrain(profile);
      break;
    default:
      throw new NoBrainError();
  }
  return withPromptLog(brain);
}

/** Wrap a brain so every generate() call is recorded for the Parent inspector. */
function withPromptLog(brain: Brain): Brain {
  return {
    vendor: brain.vendor,
    model: brain.model,
    async generate(opts) {
      const start = Date.now();
      const base = {
        id: `${start.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        ts: new Date(start).toISOString(),
        label: opts.label || 'AI call',
        vendor: brain.vendor,
        model: brain.model,
        system: flattenSystem(opts.system),
        messages: opts.messages
      };
      try {
        const out = await brain.generate(opts);
        recordPrompt({ ...base, response: out, ms: Date.now() - start, ok: true });
        return out;
      } catch (e: any) {
        recordPrompt({ ...base, ms: Date.now() - start, ok: false, error: e?.message || 'failed' });
        throw e;
      }
    }
  };
}

// ---- Anthropic ------------------------------------------------------------

/** OAuth (Claude-login / subscription) tokens are NOT general API keys: Anthropic
 *  only honors them when the request identifies itself as Claude Code. The first
 *  system block MUST be exactly this line, or the call is rejected (401/429) even
 *  with a valid token. API-key requests don't need it. */
export const CLAUDE_CODE_IDENTITY = "You are Claude Code, Anthropic's official CLI for Claude.";

export interface AnthropicRequestInput {
  model: string;
  system: SystemPrompt;
  messages: ChatMessage[];
  maxTokens?: number;
  json?: boolean;
  quality?: GenerateOptions['quality'];
  /** Claude-login / OAuth path: prepend the Claude Code identity block. */
  oauth: boolean;
}

/**
 * Build the Messages API request body. Pure (no network) so the exact shape —
 * identity block order, cache breakpoint placement, thinking — is unit-tested.
 *
 * System blocks, in order (the order is load-bearing):
 *   1. CLAUDE_CODE_IDENTITY            — OAuth/local-login only; must be first.
 *   2. the stable prompt               — `cache_control: ephemeral` when the
 *                                        caller split it ({ cached, dynamic }).
 *                                        The breakpoint caches 1+2 as one prefix.
 *   3. the dynamic prompt              — uncached (e.g. learner mastery).
 *   4. JSON_ONLY_HINT                  — when `json` is set; after the breakpoint
 *                                        so it never splits the cache.
 * A plain-string system prompt is sent uncached: callers that pass one (free
 * teaching, reports) mix per-turn data into it, so a breakpoint would only add
 * the 1.25× cache-write premium on every call. The per-turn DIRECTIVE lives in
 * `messages`, after the cached prefix.
 */
export function buildAnthropicRequest(input: AnthropicRequestInput): Anthropic.MessageCreateParamsNonStreaming {
  const { model, system, messages, maxTokens = 1400, json, quality = 'fast', oauth } = input;
  const blocks: Anthropic.TextBlockParam[] = [];
  if (oauth) blocks.push({ type: 'text', text: CLAUDE_CODE_IDENTITY });
  if (typeof system === 'string') {
    if (system) blocks.push({ type: 'text', text: system });
  } else {
    if (system.cached) blocks.push({ type: 'text', text: system.cached, cache_control: { type: 'ephemeral' } });
    if (system.dynamic) blocks.push({ type: 'text', text: system.dynamic });
  }
  if (json) blocks.push({ type: 'text', text: JSON_ONLY_HINT });

  // Adaptive thinking is only available on the larger models — Haiku (and
  // others) reject it with "adaptive thinking is not supported on this model",
  // so gate it by capability. 'deep' tasks (syllabus/report) get it; live turns
  // stay snappy.
  const thinking = quality === 'deep' && /opus|sonnet/.test(model);
  return {
    model,
    // Thinking tokens count against max_tokens — give them headroom so the
    // JSON answer isn't truncated after a long think.
    max_tokens: thinking ? maxTokens + 6000 : maxTokens,
    ...(blocks.length ? { system: blocks } : {}),
    // `adaptive` postdates this SDK's types; the API accepts it.
    ...(thinking ? { thinking: { type: 'adaptive' } as unknown as Anthropic.ThinkingConfigParam } : {}),
    messages: messages.map((m) => ({ role: m.role, content: m.content }))
  };
}

async function anthropicBrain(p: ReturnType<typeof authStore.getStored> & object): Promise<Brain> {
  const model = p!.model || 'claude-opus-4-8';
  let client: Anthropic;
  let oauth = false;
  const localLogin = p!.method === 'local_login';

  if (p!.method === 'api_key' && p!.apiKey) {
    client = new Anthropic({ apiKey: p!.apiKey });
  } else if (localLogin) {
    // Throws a clear, actionable error when the login is missing or expired.
    const token = await getAnthropicLocalToken();
    client = new Anthropic({ authToken: token, defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' } });
    oauth = true;
  } else if (p!.oauth?.access) {
    client = new Anthropic({ authToken: p!.oauth.access, defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' } });
    oauth = true;
  } else {
    throw new NoBrainError();
  }

  return {
    vendor: 'anthropic',
    model,
    async generate({ system, messages, maxTokens, json, quality = 'fast' }) {
      const req = buildAnthropicRequest({ model, system, messages, maxTokens, json, quality, oauth });
      let res: Anthropic.Message;
      try {
        res = await client.messages.create(req, { timeout: timeoutFor(quality), maxRetries: 1 });
      } catch (e) {
        // A rejected local-login token (revoked, refreshed elsewhere) must not
        // stay cached until its stated expiry — re-read the stores next turn.
        if (localLogin && e instanceof Anthropic.AuthenticationError) clearAnthropicLocalTokenCache();
        throw e;
      }
      return res.content
        .map((b) => (b.type === 'text' ? b.text : ''))
        .join('')
        .trim();
    }
  };
}

// ---- OpenAI (and ChatGPT OAuth) -------------------------------------------

async function openaiBrain(p: ReturnType<typeof authStore.getStored> & object): Promise<Brain> {
  const model = p!.model || 'gpt-4o';

  // "Sign in with ChatGPT" (OAuth) → the Codex subscription backend, which is
  // NOT the standard OpenAI API. It speaks the Responses API at /responses, only
  // serves current ChatGPT-plan models (e.g. gpt-5.5), requires stream:true +
  // store:false, and needs the Codex client headers. Runs on the user's plan,
  // no API billing.
  if (p!.method !== 'api_key' && p!.oauth?.access) {
    return codexBrain(p!, model);
  }

  // API key → standard OpenAI Chat Completions.
  if (p!.method === 'api_key' && p!.apiKey) {
    const client = new OpenAI({ apiKey: p!.apiKey, baseURL: p!.baseUrl });
    // Newer OpenAI models (GPT-5, o-series reasoning) reject `max_tokens` — they
    // require `max_completion_tokens`. Older models (gpt-4o) only accept `max_tokens`.
    const isReasoning = /^(gpt-5|o[1-9])/.test(model);
    return {
      vendor: 'openai',
      model,
      async generate({ system, messages, maxTokens = 1400, json, quality }) {
        const res = await client.chat.completions.create({
          model,
          messages: [{ role: 'system', content: flattenSystem(system) }, ...messages],
          ...(isReasoning
            ? { max_completion_tokens: maxTokens + 2000, reasoning_effort: 'low' as const }
            : { max_tokens: maxTokens }),
          ...(json ? { response_format: { type: 'json_object' as const } } : {})
        }, { timeout: timeoutFor(quality), maxRetries: 1 });
        return (res.choices[0]?.message?.content || '').trim();
      }
    };
  }

  throw new NoBrainError();
}

function withJsonHint(system: string, json: boolean | undefined): string {
  return json ? `${system}\n\n${JSON_ONLY_HINT}` : system;
}

/** Per-call timeout: a live turn must fail fast enough for the learner to retry;
 *  'deep' calls (syllabus, report) think for longer. */
function timeoutFor(quality: GenerateOptions['quality']): number {
  return quality === 'deep' ? 180_000 : 60_000;
}

/** One in-flight refresh per profile — OpenAI rotates refresh tokens, so two
 *  concurrent refreshes with the same token can log the user out. */
const codexRefreshes = new Map<string, ReturnType<typeof refreshOpenAI>>();
function refreshCodexTokens(profileId: string, refresh: string): ReturnType<typeof refreshOpenAI> {
  let pending = codexRefreshes.get(profileId);
  if (!pending) {
    pending = refreshOpenAI(refresh)
      .then((tokens) => {
        authStore.updateTokens(profileId, tokens);
        return tokens;
      })
      .finally(() => codexRefreshes.delete(profileId));
    codexRefreshes.set(profileId, pending);
  }
  return pending;
}

const CODEX_BASE = process.env.OPENAI_OAUTH_BASE_URL || 'https://chatgpt.com/backend-api/codex';
// Default Codex model for ChatGPT-plan accounts; the backend rejects non-plan
// models. Overridable via env as OpenAI ships new ones.
const CODEX_MODEL = process.env.OPENAI_CODEX_MODEL || 'gpt-5.5';

/** Brain backed by the ChatGPT Codex subscription backend (Responses API + SSE). */
async function codexBrain(p: ReturnType<typeof authStore.getStored> & object, model: string): Promise<Brain> {
  // Only current gpt-5.x plan models work here; anything else (e.g. a leftover
  // gpt-4o from an older connect) falls back to the known-good default.
  const codexModel = /^gpt-5\.\d/.test(model) ? model : CODEX_MODEL;
  return {
    vendor: 'openai',
    model: codexModel,
    async generate({ system, messages, json, quality }) {
      let oauth = authStore.getStored(p!.id)?.oauth ?? p!.oauth!;
      if (oauth.expires && oauth.refresh && oauth.expires < Date.now() + 60_000) {
        oauth = await refreshCodexTokens(p!.id, oauth.refresh);
      }
      const input = messages.map((m) => ({
        type: 'message',
        role: m.role,
        content: [{ type: m.role === 'assistant' ? 'output_text' : 'input_text', text: m.content }]
      }));
      const res = await fetch(`${CODEX_BASE}/responses`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${oauth.access}`,
          ...(oauth.accountId ? { 'chatgpt-account-id': oauth.accountId } : {}),
          'content-type': 'application/json',
          accept: 'text/event-stream',
          'OpenAI-Beta': 'responses=experimental',
          originator: 'codex_cli_rs',
          'User-Agent': 'codex_cli_rs/0.20.0 (Classai)',
          session_id: randomUUID()
        },
        body: JSON.stringify({
          model: codexModel,
          instructions: withJsonHint(flattenSystem(system), json),
          input,
          stream: true, // required by the codex backend
          store: false, // required by the codex backend
          reasoning: { effort: 'low' } // keep turns snappy
        }),
        signal: AbortSignal.timeout(timeoutFor(quality))
      });
      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => '');
        throw new Error(`Codex ${res.status}: ${detail.slice(0, 300)}`);
      }
      return await readCodexStream(res.body);
    }
  };
}

/** Parse a Codex Responses SSE stream and return the assembled output text. */
async function readCodexStream(body: ReadableStream<Uint8Array>): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let out = '';
  let doneText = '';
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) handle(line);
  }
  handle(buffer); // a final frame may arrive without a trailing newline
  return (out || doneText).trim();

  function handle(line: string): void {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) return;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === '[DONE]') return;
    let evt: any;
    try {
      evt = JSON.parse(payload);
    } catch {
      return; // keep-alives / non-JSON frames
    }
    if (evt.type === 'response.output_text.delta' && typeof evt.delta === 'string') out += evt.delta;
    else if (evt.type === 'response.output_text.done' && typeof evt.text === 'string') doneText = evt.text;
    else if (evt.type === 'response.failed' || evt.type === 'error') {
      const msg = evt.response?.error?.message || evt.error?.message || evt.message || 'response failed';
      throw new Error(`Codex: ${msg}`);
    }
  }
}

// ---- Local (Ollama / any OpenAI-compatible) -------------------------------

async function localBrain(p: ReturnType<typeof authStore.getStored> & object): Promise<Brain> {
  const model = p!.model || 'qwen2.5';
  const client = new OpenAI({
    baseURL: p!.baseUrl || 'http://localhost:11434/v1',
    apiKey: p!.apiKey || 'ollama'
  });
  return {
    vendor: 'local',
    model,
    async generate({ system, messages, maxTokens = 1400, json }) {
      // Note: we deliberately do NOT send `response_format` here — many
      // OpenAI-compatible local servers (Ollama, etc.) reject json_object.
      // JSON is enforced via the prompt (JSON_ONLY_HINT) and parsed tolerantly upstream.
      const res = await client.chat.completions.create({
        model,
        max_tokens: maxTokens,
        messages: [{ role: 'system', content: withJsonHint(flattenSystem(system), json) }, ...messages]
      }, { timeout: 180_000 }); // local models on consumer hardware can be slow
      return (res.choices[0]?.message?.content || '').trim();
    }
  };
}

/** Recommended models per vendor, shown in the Connect-brain UI. */
export const MODEL_OPTIONS: Record<BrainVendor, { id: string; label: string; note?: string }[]> = {
  anthropic: [
    { id: 'claude-opus-4-8', label: 'Claude Opus 4.8', note: 'Best teaching quality' },
    { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6', note: 'Faster & cheaper' },
    { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5', note: 'Most economical' }
  ],
  openai: [
    { id: 'gpt-5.5', label: 'GPT-5.5', note: 'ChatGPT login (Codex) — best' },
    { id: 'gpt-5.4', label: 'GPT-5.4', note: 'ChatGPT login (Codex)' },
    { id: 'gpt-5', label: 'GPT-5', note: 'API key only' },
    { id: 'gpt-4o', label: 'GPT-4o', note: 'API key only' },
    { id: 'gpt-4o-mini', label: 'GPT-4o mini', note: 'API key only' }
  ],
  local: [
    { id: 'qwen2.5', label: 'Qwen2.5 (Ollama)', note: 'Good default' },
    { id: 'llama3.1', label: 'Llama 3.1 (Ollama)' },
    { id: 'phi4', label: 'Phi-4 (Ollama)', note: 'Small & fast' }
  ]
};

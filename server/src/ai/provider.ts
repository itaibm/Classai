/**
 * Brain provider abstraction. Given the user's connected profile, returns a
 * `Brain` with a single `generate()` method. Three vendors are supported:
 *
 *   anthropic — your own API key, OR reuse your local Claude login (token from
 *               the `ant` CLI), OR a stored OAuth token.
 *   openai    — your own API key, OR "Sign in with ChatGPT" OAuth (best-effort,
 *               targets the configurable ChatGPT backend; mirrors OpenClaw).
 *   local     — any OpenAI-compatible endpoint (Ollama by default), no key.
 *
 * The three key/local paths are fully standard. The OAuth paths follow
 * OpenClaw's approach and depend on unofficial upstream endpoints.
 */
import { randomUUID } from 'node:crypto';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import type { BrainVendor } from '../../../shared/types.ts';
import { authStore } from './auth-store.ts';
import { getAnthropicLocalToken, refreshOpenAI } from './oauth.ts';
import { recordPrompt } from './prompt-log.ts';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GenerateOptions {
  system: string;
  messages: ChatMessage[];
  maxTokens?: number;
  json?: boolean; // hint the model to return a single JSON object
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
  const s = opts.system || '';
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
        system: opts.system,
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

async function anthropicBrain(p: ReturnType<typeof authStore.getStored> & object): Promise<Brain> {
  const model = p!.model || 'claude-opus-4-8';
  let client: Anthropic;
  // OAuth (Claude-login / subscription) tokens are NOT general API keys: Anthropic
  // only honors them when the request identifies itself as Claude Code. The first
  // system block MUST be this exact line, or the call is rejected (401/429) even
  // with a valid token. API-key requests don't need it.
  let oauthMode = false;

  if (p!.method === 'api_key' && p!.apiKey) {
    client = new Anthropic({ apiKey: p!.apiKey });
  } else if (p!.method === 'local_login') {
    const token = await getAnthropicLocalToken();
    if (!token) throw new Error('No local Claude login found. Run `claude` or `ant auth login` first, or connect an API key.');
    client = new Anthropic({ authToken: token, defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' } });
    oauthMode = true;
  } else if (p!.oauth?.access) {
    client = new Anthropic({ authToken: p!.oauth.access, defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' } });
    oauthMode = true;
  } else {
    throw new NoBrainError();
  }

  const CLAUDE_CODE_IDENTITY = "You are Claude Code, Anthropic's official CLI for Claude.";

  // Adaptive thinking is only available on the larger 4.x models — Haiku (and
  // other models) reject it with "adaptive thinking is not supported on this
  // model", so gate it by capability rather than sending it unconditionally.
  const supportsAdaptiveThinking = /opus|sonnet/.test(model);

  return {
    vendor: 'anthropic',
    model,
    async generate({ system, messages, maxTokens = 1400, json, quality = 'fast' }) {
      // For OAuth tokens, prepend the required Claude Code identity as the first
      // system block (keeping the app's real instructions as a second block).
      const sys = oauthMode
        ? [
            { type: 'text' as const, text: CLAUDE_CODE_IDENTITY },
            ...(system ? [{ type: 'text' as const, text: system }] : [])
          ]
        : system;
      const res = await client.messages.create({
        model,
        max_tokens: maxTokens,
        system: sys as any,
        // 'deep' tasks (syllabus/report) get adaptive thinking where supported; live turns stay snappy.
        ...(quality === 'deep' && supportsAdaptiveThinking ? { thinking: { type: 'adaptive' as const } } : {}),
        messages: messages.map((m) => ({ role: m.role, content: m.content }))
      } as any);
      const text = (res.content || [])
        .filter((b: any) => b.type === 'text')
        .map((b: any) => b.text)
        .join('')
        .trim();
      return text;
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
      async generate({ system, messages, maxTokens = 1400, json }) {
        const res = await client.chat.completions.create({
          model,
          messages: [{ role: 'system', content: system }, ...messages],
          ...(isReasoning
            ? { max_completion_tokens: maxTokens + 2000, reasoning_effort: 'low' as const }
            : { max_tokens: maxTokens }),
          ...(json ? { response_format: { type: 'json_object' as const } } : {})
        });
        return (res.choices[0]?.message?.content || '').trim();
      }
    };
  }

  throw new NoBrainError();
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
    async generate({ system, messages }) {
      let oauth = p!.oauth!;
      if (oauth.expires && oauth.refresh && oauth.expires < Date.now() + 60_000) {
        oauth = await refreshOpenAI(oauth.refresh);
        authStore.updateTokens(p!.id, oauth);
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
          instructions: system,
          input,
          stream: true, // required by the codex backend
          store: false, // required by the codex backend
          reasoning: { effort: 'low' } // keep turns snappy
        })
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
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const evt = JSON.parse(payload);
        if (evt.type === 'response.output_text.delta' && typeof evt.delta === 'string') out += evt.delta;
        else if (evt.type === 'response.output_text.done' && typeof evt.text === 'string') doneText = evt.text;
      } catch {
        /* ignore keep-alives / non-JSON frames */
      }
    }
  }
  return (out || doneText).trim();
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
    async generate({ system, messages, maxTokens = 1400 }) {
      // Note: we deliberately do NOT send `response_format` here — many
      // OpenAI-compatible local servers (Ollama, etc.) reject json_object.
      // JSON is enforced via the prompt and parsed tolerantly upstream.
      const res = await client.chat.completions.create({
        model,
        max_tokens: maxTokens,
        messages: [{ role: 'system', content: system }, ...messages]
      });
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

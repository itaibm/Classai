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
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import type { BrainVendor } from '../../../shared/types.ts';
import { authStore } from './auth-store.ts';
import { getAnthropicLocalToken, refreshOpenAI } from './oauth.ts';

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

/** Build the active brain from the default connected profile. */
export async function getBrain(profileId?: string): Promise<Brain> {
  const id = profileId || authStore.getDefaultId();
  const profile = id ? authStore.getStored(id) : undefined;
  if (!profile) throw new NoBrainError();

  switch (profile.vendor) {
    case 'anthropic':
      return anthropicBrain(profile);
    case 'openai':
      return openaiBrain(profile);
    case 'local':
      return localBrain(profile);
    default:
      throw new NoBrainError();
  }
}

// ---- Anthropic ------------------------------------------------------------

async function anthropicBrain(p: ReturnType<typeof authStore.getStored> & object): Promise<Brain> {
  const model = p!.model || 'claude-opus-4-8';
  let client: Anthropic;

  if (p!.method === 'api_key' && p!.apiKey) {
    client = new Anthropic({ apiKey: p!.apiKey });
  } else if (p!.method === 'local_login') {
    const token = await getAnthropicLocalToken();
    if (!token) throw new Error('No local Claude login found. Run `claude` or `ant auth login` first, or connect an API key.');
    client = new Anthropic({ authToken: token, defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' } });
  } else if (p!.oauth?.access) {
    client = new Anthropic({ authToken: p!.oauth.access, defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' } });
  } else {
    throw new NoBrainError();
  }

  return {
    vendor: 'anthropic',
    model,
    async generate({ system, messages, maxTokens = 1400, json, quality = 'fast' }) {
      const res = await client.messages.create({
        model,
        max_tokens: maxTokens,
        system,
        // 'deep' tasks (syllabus/report) get adaptive thinking; live turns stay snappy.
        ...(quality === 'deep' ? { thinking: { type: 'adaptive' as const } } : {}),
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
  let client: OpenAI;

  if (p!.method === 'api_key' && p!.apiKey) {
    client = new OpenAI({ apiKey: p!.apiKey, baseURL: p!.baseUrl });
  } else if (p!.oauth?.access) {
    let oauth = p!.oauth;
    // Refresh shortly before expiry.
    if (oauth.expires && oauth.refresh && oauth.expires < Date.now() + 60_000) {
      oauth = await refreshOpenAI(oauth.refresh);
      authStore.updateTokens(p!.id, oauth);
    }
    client = new OpenAI({
      apiKey: oauth.access,
      baseURL: p!.baseUrl || process.env.OPENAI_OAUTH_BASE_URL || 'https://chatgpt.com/backend-api/codex',
      defaultHeaders: oauth.accountId ? { 'chatgpt-account-id': oauth.accountId } : {}
    });
  } else {
    throw new NoBrainError();
  }

  return {
    vendor: 'openai',
    model,
    async generate({ system, messages, maxTokens = 1400, json }) {
      const res = await client.chat.completions.create({
        model,
        max_tokens: maxTokens,
        messages: [{ role: 'system', content: system }, ...messages],
        ...(json ? { response_format: { type: 'json_object' as const } } : {})
      });
      return (res.choices[0]?.message?.content || '').trim();
    }
  };
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
      const res = await client.chat.completions.create({
        model,
        max_tokens: maxTokens,
        messages: [{ role: 'system', content: system }, ...messages],
        ...(json ? { response_format: { type: 'json_object' as const } } : {})
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
    { id: 'gpt-4o', label: 'GPT-4o', note: 'Balanced' },
    { id: 'gpt-4o-mini', label: 'GPT-4o mini', note: 'Economical' }
  ],
  local: [
    { id: 'qwen2.5', label: 'Qwen2.5 (Ollama)', note: 'Good default' },
    { id: 'llama3.1', label: 'Llama 3.1 (Ollama)' },
    { id: 'phi4', label: 'Phi-4 (Ollama)', note: 'Small & fast' }
  ]
};

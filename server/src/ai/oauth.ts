/**
 * OAuth & local-login helpers, modelled on OpenClaw.
 *
 *  - OpenAI ("Sign in with ChatGPT"): OAuth 2.0 Authorization Code + PKCE
 *    (S256, no client secret). We open auth.openai.com/oauth/authorize, capture
 *    the loopback callback, and exchange at auth.openai.com/oauth/token.
 *
 *  - Anthropic ("reuse local Claude login"): we read the access token from the
 *    user's existing Claude login — the Claude Code credentials file / macOS
 *    Keychain (whichever holds the later-expiring token), falling back to the
 *    legacy `ant` CLI. Cached in memory until shortly before expiry; no secret
 *    is stored by Classai in that mode.
 *
 * Endpoints and the public client id are configurable via env so this keeps
 * working if the upstream backend changes — the exact values mirror OpenClaw's.
 */
import crypto from 'node:crypto';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import type { OAuthTokens } from './auth-store.ts';

const OPENAI_AUTHORIZE = process.env.OPENAI_OAUTH_AUTHORIZE_URL || 'https://auth.openai.com/oauth/authorize';
const OPENAI_TOKEN = process.env.OPENAI_OAUTH_TOKEN_URL || 'https://auth.openai.com/oauth/token';
const OPENAI_CLIENT_ID = process.env.OPENAI_OAUTH_CLIENT_ID || 'app_EMoamEEZ73f0CkXaXp7hrann';
const OPENAI_SCOPE = process.env.OPENAI_OAUTH_SCOPE || 'openid profile email offline_access';
const CALLBACK_PORT = Number(process.env.OPENAI_OAUTH_PORT || 1455);
const CALLBACK_PATH = '/auth/callback';
// Must EXACTLY match the redirect URI registered for the OpenAI client. The
// ChatGPT (Codex) client registers `localhost`, not `127.0.0.1` — using the IP
// form makes OpenAI reject the authorize request (authorize_hydra_invalid_request).
const CALLBACK_HOST = process.env.OPENAI_OAUTH_HOST || 'localhost';
const REDIRECT_URI = `http://${CALLBACK_HOST}:${CALLBACK_PORT}${CALLBACK_PATH}`;

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export interface PendingOAuth {
  verifier: string;
  state: string;
  authorizeUrl: string;
  redirectUri: string;
}

/** Build the PKCE challenge and the authorize URL the user should open. */
export function beginOpenAIOAuth(): PendingOAuth {
  const verifier = b64url(crypto.randomBytes(48));
  const challenge = b64url(crypto.createHash('sha256').update(verifier).digest());
  const state = b64url(crypto.randomBytes(16));
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: OPENAI_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: OPENAI_SCOPE,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state
  });
  return { verifier, state, authorizeUrl: `${OPENAI_AUTHORIZE}?${params}`, redirectUri: REDIRECT_URI };
}

/**
 * Open a one-shot loopback server to catch ?code&state from the redirect.
 * Resolves with the authorization code. Times out (default 5 min).
 * (Headless callers can skip this and paste the code via exchangeOpenAICode.)
 */
export function captureLoopbackCode(expectedState: string, timeoutMs = 300_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', `http://127.0.0.1:${CALLBACK_PORT}`);
      if (url.pathname !== CALLBACK_PATH) {
        res.writeHead(404).end();
        return;
      }
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const okMatch = Boolean(code) && state === expectedState;
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(
        '<html><body style="font-family:system-ui;text-align:center;padding:3rem">' +
          (okMatch
            ? '<h2>Classai is connected ✅</h2><p>You can close this tab and return to Classai.</p>'
            : '<h2>Sign-in didn’t complete ⚠️</h2><p>Please return to Classai and try again.</p>') +
          '</body></html>'
      );
      cleanup();
      if (!okMatch) reject(new Error('oauth_callback_mismatch'));
      else resolve(code!);
    });
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('oauth_timeout'));
    }, timeoutMs);
    function cleanup() {
      clearTimeout(timer);
      server.close();
    }
    server.on('error', reject);
    server.listen(CALLBACK_PORT, CALLBACK_HOST);
  });
}

async function postForm(url: string, body: Record<string, string>): Promise<any> {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString()
  });
  if (!resp.ok) {
    throw new Error(`oauth_token_error ${resp.status}: ${await resp.text()}`);
  }
  return resp.json();
}

function toTokens(raw: any): OAuthTokens {
  const access: string = raw.access_token;
  const tokens: OAuthTokens = {
    access,
    refresh: raw.refresh_token,
    expires: raw.expires_in ? Date.now() + Number(raw.expires_in) * 1000 : undefined,
    accountId: extractAccountId(access)
  };
  return tokens;
}

/** Pull an account/subject id out of the JWT access token payload, if present. */
function extractAccountId(jwt?: string): string | undefined {
  if (!jwt) return undefined;
  const part = jwt.split('.')[1];
  if (!part) return undefined;
  try {
    const payload = JSON.parse(Buffer.from(part, 'base64url').toString('utf8'));
    return (
      payload['https://api.openai.com/auth']?.chatgpt_account_id ||
      payload.account_id ||
      payload.sub
    );
  } catch {
    return undefined;
  }
}

export async function exchangeOpenAICode(code: string, verifier: string): Promise<OAuthTokens> {
  return toTokens(
    await postForm(OPENAI_TOKEN, {
      grant_type: 'authorization_code',
      client_id: OPENAI_CLIENT_ID,
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier
    })
  );
}

export async function refreshOpenAI(refresh: string): Promise<OAuthTokens> {
  const tokens = toTokens(
    await postForm(OPENAI_TOKEN, {
      grant_type: 'refresh_token',
      client_id: OPENAI_CLIENT_ID,
      refresh_token: refresh
    })
  );
  // Some providers omit a fresh refresh token on refresh; keep the old one.
  if (!tokens.refresh) tokens.refresh = refresh;
  return tokens;
}

/**
 * Reuse the user's existing local Claude login. Sources:
 *   1. Claude Code credentials file (~/.claude/.credentials.json) — Linux/manual.
 *   2. macOS Keychain entry written by Claude Code ("Claude Code-credentials").
 *   3. The legacy `ant` CLI (`ant auth print-credentials --access-token`), only
 *      when neither of the above holds a usable token.
 *
 * Both 1 and 2 are read and the one with the LATER `expiresAt` wins — Claude
 * Code refreshes whichever store it uses, so the other can hold a stale token.
 * An expired token counts as missing. The chosen token is cached in memory until
 * ~60s before it expires, so a live lesson doesn't spawn `security` (Keychain)
 * on every turn. No secret is persisted by Classai.
 *
 * Throws LocalLoginError with an actionable message when no usable token exists.
 */
export async function getAnthropicLocalToken(): Promise<string> {
  const now = Date.now();
  if (cachedLocal && cachedLocal.validUntil > now) return cachedLocal.token;
  cachedLocal = undefined;

  const found = [readClaudeCredsFile(), await readClaudeKeychain()].filter((c): c is LocalCreds => !!c);
  const chosen = pickLocalCreds(found, now);
  if (chosen) {
    cachedLocal = { token: chosen.token, validUntil: localCacheUntil(chosen.expiresAt, now) };
    return chosen.token;
  }
  const ant = await readAntCli();
  if (ant) {
    cachedLocal = { token: ant, validUntil: now + NO_EXPIRY_CACHE_MS };
    return ant;
  }
  if (found.length) {
    throw new LocalLoginError(
      'Your local Claude login has expired. Open a terminal and run `claude` once to refresh it, then try again (or connect an API key instead).'
    );
  }
  throw new LocalLoginError(
    'No local Claude login found. Open a terminal and run `claude` to sign in, then try again (or connect an API key instead).'
  );
}

export class LocalLoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocalLoginError';
  }
}

/** Forget the cached local token (e.g. after the API rejects it). */
export function clearAnthropicLocalTokenCache(): void {
  cachedLocal = undefined;
}

/** A token found in a Claude Code credentials store. */
export interface LocalCreds {
  token: string;
  /** Epoch ms; undefined when the store doesn't say. */
  expiresAt?: number;
}

/** Stop using a token this long before it expires (clock skew + request time). */
const EXPIRY_MARGIN_MS = 60_000;
/** How long to trust a token whose expiry is unknown before re-reading. */
const NO_EXPIRY_CACHE_MS = 5 * 60_000;

let cachedLocal: { token: string; validUntil: number } | undefined;

/**
 * Pick the usable token with the latest expiry. Tokens within the expiry margin
 * are treated as missing. A token with no stated expiry is used only when no
 * source has a known-valid one.
 */
export function pickLocalCreds(found: LocalCreds[], now = Date.now()): LocalCreds | undefined {
  const usable = found.filter((c) => c.expiresAt === undefined || c.expiresAt - EXPIRY_MARGIN_MS > now);
  return usable.sort((a, b) => (b.expiresAt ?? -Infinity) - (a.expiresAt ?? -Infinity))[0];
}

function localCacheUntil(expiresAt: number | undefined, now: number): number {
  return expiresAt === undefined ? now + NO_EXPIRY_CACHE_MS : expiresAt - EXPIRY_MARGIN_MS;
}

/** Pull `claudeAiOauth.{accessToken,expiresAt}` out of a Claude Code credentials JSON blob. */
export function credsFromJson(raw: string): LocalCreds | undefined {
  try {
    const o = JSON.parse(raw)?.claudeAiOauth;
    const token = o?.accessToken;
    if (typeof token !== 'string' || !token) return undefined;
    const exp = Number(o.expiresAt);
    return { token, expiresAt: Number.isFinite(exp) && exp > 0 ? exp : undefined };
  } catch {
    return undefined;
  }
}

function readClaudeCredsFile(): LocalCreds | undefined {
  try {
    return credsFromJson(readFileSync(path.join(os.homedir(), '.claude', '.credentials.json'), 'utf8'));
  } catch {
    return undefined;
  }
}

function readClaudeKeychain(): Promise<LocalCreds | undefined> {
  if (process.platform !== 'darwin') return Promise.resolve(undefined);
  return new Promise((resolve) => {
    execFile(
      'security',
      ['find-generic-password', '-s', 'Claude Code-credentials', '-w'],
      { timeout: 15_000 },
      (err, stdout) => resolve(err ? undefined : credsFromJson(stdout))
    );
  });
}

function readAntCli(): Promise<string | undefined> {
  return new Promise((resolve) => {
    execFile('ant', ['auth', 'print-credentials', '--access-token'], { timeout: 15_000 }, (err, stdout) => {
      if (err) return resolve(undefined);
      const token = stdout.trim();
      resolve(token || undefined);
    });
  });
}

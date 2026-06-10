/**
 * OAuth & local-login helpers, modelled on OpenClaw.
 *
 *  - OpenAI ("Sign in with ChatGPT"): OAuth 2.0 Authorization Code + PKCE
 *    (S256, no client secret). We open auth.openai.com/oauth/authorize, capture
 *    the loopback callback, and exchange at auth.openai.com/oauth/token.
 *
 *  - Anthropic ("reuse local Claude login"): we read the access token from the
 *    user's existing local Claude CLI login via `ant auth print-credentials
 *    --access-token` (OpenClaw treats this reuse as allowed per Anthropic staff
 *    guidance). No secret is stored by Classai in that mode.
 *
 * Endpoints and the public client id are configurable via env so this keeps
 * working if the upstream backend changes — the exact values mirror OpenClaw's.
 */
import crypto from 'node:crypto';
import http from 'node:http';
import { execFile } from 'node:child_process';
import type { OAuthTokens } from './auth-store.ts';

const OPENAI_AUTHORIZE = process.env.OPENAI_OAUTH_AUTHORIZE_URL || 'https://auth.openai.com/oauth/authorize';
const OPENAI_TOKEN = process.env.OPENAI_OAUTH_TOKEN_URL || 'https://auth.openai.com/oauth/token';
const OPENAI_CLIENT_ID = process.env.OPENAI_OAUTH_CLIENT_ID || 'app_EMoamEEZ73f0CkXaXp7hrann';
const OPENAI_SCOPE = process.env.OPENAI_OAUTH_SCOPE || 'openid profile email offline_access';
const CALLBACK_PORT = Number(process.env.OPENAI_OAUTH_PORT || 1455);
const CALLBACK_PATH = '/auth/callback';
const REDIRECT_URI = `http://127.0.0.1:${CALLBACK_PORT}${CALLBACK_PATH}`;

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
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(
        '<html><body style="font-family:system-ui;text-align:center;padding:3rem">' +
          '<h2>Classai is connected ✅</h2><p>You can close this tab and return to Classai.</p>' +
          '</body></html>'
      );
      cleanup();
      if (!code || state !== expectedState) reject(new Error('oauth_callback_mismatch'));
      else resolve(code);
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
    server.listen(CALLBACK_PORT, '127.0.0.1');
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
    const payload = JSON.parse(Buffer.from(part, 'base64').toString('utf8'));
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
 * Reuse the user's existing local Claude login by asking the `ant` CLI for a
 * fresh access token. Returns undefined if the CLI isn't installed / logged in.
 */
export function getAnthropicLocalToken(): Promise<string | undefined> {
  return new Promise((resolve) => {
    execFile(
      'ant',
      ['auth', 'print-credentials', '--access-token'],
      { timeout: 15_000 },
      (err, stdout) => {
        if (err) return resolve(undefined);
        const token = stdout.trim();
        resolve(token || undefined);
      }
    );
  });
}

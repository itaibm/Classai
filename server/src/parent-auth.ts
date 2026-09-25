/**
 * Server-side parent gate. The PIN used to be checked only in the browser, so
 * every parent endpoint (brain credentials, transcripts, deleting learners) was
 * open to anything that could reach the API. Now `verify` issues a short-lived
 * token and every non-public /api route requires it in `x-parent-token`.
 */
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import * as db from './db/index.ts';
import { PARENT_PIN_ENV } from './config.ts';
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
const tokens = new Map<string, number>(); // token -> expiry (in memory: a restart signs parents out)

/** Routes a learner (no PIN) needs: pick a kid, see their classes, run a lesson. */
const PUBLIC_ROUTES = new Set([
  'GET /api/brain/profiles', // public view only — never includes credentials
  'GET /api/parent/status',
  'POST /api/parent/verify',
  'POST /api/parent/set-pin', // checks its own authorization (first-run or current PIN)
  'GET /api/kids',
  'GET /api/kids/:id',
  'GET /api/kids/:id/curriculum',
  'GET /api/classes/:id',
  'GET /api/lessons/:id',
  'GET /api/catalog/lessons/:id',
  'POST /api/catalog/lessons/:id/start',
  'POST /api/lessons/:id/start',
  'POST /api/sessions/:id/turn',
  'GET /api/sessions/:id'
]);

// ---- PIN storage ------------------------------------------------------------

function hashPin(pin: string): string {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString('hex')}$${scryptSync(pin, salt, 32).toString('hex')}`;
}

function pinMatches(pin: string, stored: string): boolean {
  if (!stored.startsWith('scrypt$')) {
    // Legacy plaintext PIN: compare, then upgrade it to a hash on success.
    const ok = safeEqual(Buffer.from(pin), Buffer.from(stored));
    if (ok) db.settings.set('parent_pin', hashPin(pin));
    return ok;
  }
  const [, saltHex, hashHex] = stored.split('$');
  return safeEqual(scryptSync(pin, Buffer.from(saltHex!, 'hex'), 32), Buffer.from(hashHex!, 'hex'));
}

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export const validPin = (pin: unknown): pin is string => typeof pin === 'string' && /^\d{4,8}$/.test(pin);

export function pinIsSet(): boolean {
  return Boolean(PARENT_PIN_ENV || db.settings.get('parent_pin'));
}

// ---- brute-force backoff ----------------------------------------------------

let failures = 0;
let lockedUntil = 0;

/** Check a PIN attempt. Returns 'locked' while backing off after repeated misses. */
export function checkPin(pin: unknown): 'ok' | 'bad' | 'locked' {
  if (Date.now() < lockedUntil) return 'locked';
  const ok =
    typeof pin === 'string' &&
    (PARENT_PIN_ENV ? safeEqual(Buffer.from(pin), Buffer.from(PARENT_PIN_ENV)) : pinMatches(pin, db.settings.get('parent_pin') || ''));
  if (ok) {
    failures = 0;
    return 'ok';
  }
  failures++;
  if (failures >= 5) lockedUntil = Date.now() + Math.min(15 * 60_000, 30_000 * 2 ** (failures - 5));
  return 'bad';
}

export function storePin(pin: string): void {
  db.settings.set('parent_pin', hashPin(pin));
}

// ---- tokens -------------------------------------------------------------------

export function issueToken(): string {
  const token = randomBytes(24).toString('base64url');
  tokens.set(token, Date.now() + TOKEN_TTL_MS);
  return token;
}

export function hasParentToken(req: FastifyRequest): boolean {
  const token = req.headers['x-parent-token'];
  if (typeof token !== 'string') return false;
  const expiry = tokens.get(token);
  if (!expiry) return false;
  if (expiry < Date.now()) {
    tokens.delete(token);
    return false;
  }
  return true;
}

/** Require a parent token on every /api route not explicitly public. */
export function registerParentGuard(app: FastifyInstance): void {
  app.addHook('onRequest', async (req, reply) => {
    const route = req.routeOptions.url;
    if (!route?.startsWith('/api/')) return;
    if (PUBLIC_ROUTES.has(`${req.method} ${route}`)) return;
    if (hasParentToken(req)) return;
    return reply.status(401).send({ error: 'parent_auth_required' });
  });
}

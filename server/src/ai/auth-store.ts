/**
 * Brain credential store — the OpenClaw model.
 *
 * Each user connects their OWN brain. Credentials (API keys, OAuth tokens) are
 * written ONLY to $CLASSAI_DATA_DIR/auth-profiles.json on the local machine,
 * chmod 600, and are never sent to the client. The client only ever sees the
 * non-secret `BrainProfilePublic` view.
 *
 * Profiles are keyed like "anthropic:default" / "openai:personal" so a family
 * can keep multiple connected accounts and switch between them.
 */
import fs from 'node:fs';
import type { BrainProfile, BrainProfilePublic, BrainVendor } from '../../../shared/types.ts';
import { AUTH_PROFILES_PATH } from '../config.ts';

export interface OAuthTokens {
  access: string;
  refresh?: string;
  expires?: number; // epoch ms
  accountId?: string;
}

/** On-disk shape — includes secrets. Never serialize this to the client. */
interface StoredProfile extends BrainProfile {
  apiKey?: string;
  oauth?: OAuthTokens;
}

interface Store {
  profiles: Record<string, StoredProfile>;
  defaultId?: string;
}

function read(): Store {
  try {
    return JSON.parse(fs.readFileSync(AUTH_PROFILES_PATH, 'utf8')) as Store;
  } catch {
    return { profiles: {} };
  }
}

function write(store: Store): void {
  fs.writeFileSync(AUTH_PROFILES_PATH, JSON.stringify(store, null, 2), { mode: 0o600 });
  try {
    fs.chmodSync(AUTH_PROFILES_PATH, 0o600);
  } catch {
    /* best effort on platforms without chmod */
  }
}

export const authStore = {
  /** Public, secret-free list for the UI. */
  listPublic(): BrainProfilePublic[] {
    const store = read();
    return Object.values(store.profiles).map((p) => toPublic(p));
  },

  getDefaultId(): string | undefined {
    return read().defaultId;
  },

  getDefaultPublic(): BrainProfilePublic | undefined {
    const store = read();
    const id = store.defaultId;
    const p = id ? store.profiles[id] : undefined;
    return p ? toPublic(p) : undefined;
  },

  /** Internal — includes secrets. Server-side only. */
  getStored(id: string): StoredProfile | undefined {
    return read().profiles[id];
  },

  upsert(p: StoredProfile, makeDefault = false): BrainProfilePublic {
    const store = read();
    store.profiles[p.id] = { ...store.profiles[p.id], ...p };
    if (makeDefault || !store.defaultId) store.defaultId = p.id;
    write(store);
    return toPublic(store.profiles[p.id]!);
  },

  updateTokens(id: string, oauth: OAuthTokens): void {
    const store = read();
    const p = store.profiles[id];
    if (!p) return;
    p.oauth = oauth;
    write(store);
  },

  setDefault(id: string): void {
    const store = read();
    if (!store.profiles[id]) return;
    store.defaultId = id;
    write(store);
  },

  remove(id: string): void {
    const store = read();
    delete store.profiles[id];
    if (store.defaultId === id) {
      store.defaultId = Object.keys(store.profiles)[0];
    }
    write(store);
  }
};

function toPublic(p: StoredProfile): BrainProfilePublic {
  const connected =
    p.method === 'none' || p.method === 'local_login' || Boolean(p.apiKey) || Boolean(p.oauth?.access);
  const { apiKey, oauth, ...rest } = p;
  return { ...rest, connected };
}

export function profileId(vendor: BrainVendor, name = 'default'): string {
  return `${vendor}:${name}`;
}

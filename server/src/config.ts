/** Central configuration, resolved from environment with safe defaults. */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');

export const PORT = Number(process.env.PORT || 8787);

export const DATA_DIR = path.resolve(
  repoRoot,
  process.env.CLASSAI_DATA_DIR || './data'
);

/** Where the authored `classai-lesson/1` curriculum files live (disk = truth). */
export const CURRICULUM_DIR = path.resolve(
  repoRoot,
  process.env.CLASSAI_CURRICULUM_DIR || './curriculum'
);

/** Where per-user brain credentials live (git-ignored, never sent to client). */
export const AUTH_PROFILES_PATH = path.join(DATA_DIR, 'auth-profiles.json');

export const IS_PROD = process.env.NODE_ENV === 'production';

/** Built client output served in production. */
export const CLIENT_DIST = path.join(repoRoot, 'client', 'dist');

export const PARENT_PIN_ENV = process.env.CLASSAI_PARENT_PIN || '';

/** Listen address. Loopback by default: learner data and brain credentials must
 *  not be reachable from the LAN (the mic only works on localhost anyway). Set
 *  CLASSAI_HOST=0.0.0.0 to deliberately expose it. */
export const HOST = process.env.CLASSAI_HOST || '127.0.0.1';

/** Where AI-generated lessons are written (`generated/year-N/<subject>/lessons/`).
 *  Kept in the git-ignored data dir as drafts for parent review — never in
 *  `curriculum/`, so unreviewed AI output can't pass as authored curriculum. */
export const GENERATED_DIR = path.join(DATA_DIR, 'generated');

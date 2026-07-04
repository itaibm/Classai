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

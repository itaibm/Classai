/** All Classai HTTP endpoints, registered under /api. */
import type { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import type { Kid, AvatarConfig, KidResponse, WeeklySchedule, ScheduleEntry, Weekday } from '../../shared/types.ts';
import { WEEKDAYS } from '../../shared/types.ts';
import * as db from './db/index.ts';
import { authStore, profileId } from './ai/auth-store.ts';
import { getBrain, MODEL_OPTIONS, NoBrainError } from './ai/provider.ts';
import { getPromptLog, clearPromptLog } from './ai/prompt-log.ts';
import { promptTemplates } from './ai/prompt-templates.ts';
import {
  beginOpenAIOAuth,
  captureLoopbackCode,
  exchangeOpenAICode
} from './ai/oauth.ts';
import { createCourse, addCurriculum, buildSyllabus } from './services/courses.ts';
import { generateLesson } from './services/lessons.ts';
import { startSession, nextTurn } from './teach/index.ts';
import {
  getOrInitLearner,
  courseProgress,
  recommendNext
} from './memory/index.ts';
import { PARENT_PIN_ENV } from './config.ts';

const now = () => new Date().toISOString();

// ---- weekly schedule helpers ----------------------------------------------
function emptyWeek(kidId: string): WeeklySchedule {
  const days = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] } as Record<Weekday, ScheduleEntry[]>;
  return { kidId, days, updatedAt: now() };
}

/** Read a kid's schedule, dropping entries whose course no longer exists. */
function readSchedule(kidId: string): WeeklySchedule {
  const raw = db.settings.get(`schedule:${kidId}`);
  if (!raw) return emptyWeek(kidId);
  let parsed: WeeklySchedule;
  try { parsed = JSON.parse(raw) as WeeklySchedule; } catch { return emptyWeek(kidId); }
  const live = new Set(db.courses.listByKid(kidId).map((c) => c.id));
  const base = emptyWeek(kidId);
  for (const d of WEEKDAYS) {
    const entries = Array.isArray(parsed.days?.[d]) ? parsed.days[d] : [];
    base.days[d] = entries.filter((e) => e && live.has(e.courseId));
  }
  base.updatedAt = parsed.updatedAt || base.updatedAt;
  return base;
}

/** Validate + normalize an incoming schedule, then persist it. */
function writeSchedule(kidId: string, incoming: WeeklySchedule): WeeklySchedule {
  const live = new Set(db.courses.listByKid(kidId).map((c) => c.id));
  const out = emptyWeek(kidId);
  for (const d of WEEKDAYS) {
    const entries = Array.isArray(incoming.days?.[d]) ? incoming.days[d] : [];
    out.days[d] = entries
      .filter((e) => e && typeof e.courseId === 'string' && live.has(e.courseId))
      .map((e, i) => ({
        id: typeof e.id === 'string' && e.id ? e.id : `${d}-${i}-${nanoid(6)}`,
        courseId: e.courseId,
        time: typeof e.time === 'string' && /^\d{1,2}:\d{2}$/.test(e.time) ? e.time : undefined,
        order: typeof e.order === 'number' ? e.order : i,
      }))
      .sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99') || a.order - b.order)
      .map((e, i) => ({ ...e, order: i }));
  }
  out.updatedAt = now();
  db.settings.set(`schedule:${kidId}`, JSON.stringify(out));
  return out;
}

/** In-flight OpenAI OAuth attempts (state -> PKCE verifier). */
const pendingOAuth = new Map<string, { verifier: string }>();

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  // Translate known errors into clean responses.
  app.setErrorHandler((err: any, _req, reply) => {
    const status = err instanceof NoBrainError ? 400 : err.statusCode || 500;
    app.log.error(err);
    reply.status(status).send({ error: err.message || 'server_error' });
  });

  // ---- brain ---------------------------------------------------------------

  app.get('/api/brain/profiles', async () => ({
    profiles: authStore.listPublic(),
    defaultId: authStore.getDefaultId(),
    models: MODEL_OPTIONS
  }));

  // Connect via API key / local model / reuse local Claude login.
  app.post('/api/brain/connect', async (req, reply) => {
    const b = req.body as {
      vendor: 'anthropic' | 'openai' | 'local';
      method: 'api_key' | 'local_login' | 'none';
      name?: string;
      label?: string;
      model: string;
      apiKey?: string;
      baseUrl?: string;
    };
    if (!b?.vendor || !b?.model) return reply.status(400).send({ error: 'vendor and model required' });
    const id = profileId(b.vendor, b.name || 'default');
    const label =
      b.label ||
      (b.vendor === 'anthropic' ? 'Claude' : b.vendor === 'openai' ? 'OpenAI' : 'Local model') +
        (b.method === 'local_login' ? ' (local login)' : b.method === 'api_key' ? ' (API key)' : '');
    const profile = authStore.upsert(
      {
        id,
        vendor: b.vendor,
        method: b.method,
        label,
        model: b.model,
        baseUrl: b.baseUrl,
        createdAt: now(),
        apiKey: b.apiKey
      },
      true
    );
    // Verify the connection actually works before claiming success, so we never
    // report "connected" for a method whose credentials can't be resolved.
    try {
      const brain = await getBrain(id);
      await brain.generate({
        system: 'You are a helpful assistant.',
        messages: [{ role: 'user', content: 'Reply with the single word: ready' }],
        maxTokens: 16,
        label: 'Connection check'
      });
      return { profile, verified: true };
    } catch (e: any) {
      return { profile, verified: false, error: e?.message || 'Could not reach this brain.' };
    }
  });

  // Begin OpenAI "Sign in with ChatGPT" (OAuth + PKCE).
  app.post('/api/brain/oauth/start', async () => {
    const p = beginOpenAIOAuth();
    pendingOAuth.set(p.state, { verifier: p.verifier });
    // Best-effort loopback capture (works when Classai runs on the user's machine).
    captureLoopbackCode(p.state)
      .then(async (code) => {
        const tokens = await exchangeOpenAICode(code, p.verifier);
        authStore.upsert(
          {
            id: profileId('openai', 'default'),
            vendor: 'openai',
            method: 'oauth',
            label: 'ChatGPT (OAuth)',
            model: 'gpt-4o',
            createdAt: now()
          } as any,
          true
        );
        authStore.updateTokens(profileId('openai', 'default'), tokens);
        pendingOAuth.delete(p.state);
      })
      .catch(() => pendingOAuth.delete(p.state));
    return { authorizeUrl: p.authorizeUrl, state: p.state, redirectUri: p.redirectUri };
  });

  // Headless fallback: user pastes the code from the redirect URL.
  app.post('/api/brain/oauth/paste', async (req, reply) => {
    const { state, code, model } = req.body as { state: string; code: string; model?: string };
    const pend = pendingOAuth.get(state);
    if (!pend) return reply.status(400).send({ error: 'unknown or expired oauth attempt' });
    const tokens = await exchangeOpenAICode(code, pend.verifier);
    authStore.upsert(
      {
        id: profileId('openai', 'default'),
        vendor: 'openai',
        method: 'oauth',
        label: 'ChatGPT (OAuth)',
        model: model || 'gpt-4o',
        createdAt: now()
      } as any,
      true
    );
    authStore.updateTokens(profileId('openai', 'default'), tokens);
    pendingOAuth.delete(state);
    return { profile: authStore.getDefaultPublic() };
  });

  app.post('/api/brain/default', async (req) => {
    const { id } = req.body as { id: string };
    authStore.setDefault(id);
    return { ok: true };
  });

  app.delete('/api/brain/:id', async (req) => {
    authStore.remove((req.params as { id: string }).id);
    return { ok: true };
  });

  // Verify a connection with a tiny generation.
  app.post('/api/brain/test', async (req, reply) => {
    const { id } = (req.body || {}) as { id?: string };
    try {
      const brain = await getBrain(id);
      const out = await brain.generate({
        system: 'You are a helpful assistant.',
        messages: [{ role: 'user', content: 'Reply with the single word: ready' }],
        maxTokens: 16,
        label: 'Connection test'
      });
      return { ok: true, vendor: brain.vendor, model: brain.model, sample: out.slice(0, 40) };
    } catch (e: any) {
      return reply.status(400).send({ ok: false, error: e?.message || 'connection failed' });
    }
  });

  // ---- parent gate ---------------------------------------------------------

  app.get('/api/parent/status', async () => ({
    pinSet: Boolean(PARENT_PIN_ENV || db.settings.get('parent_pin'))
  }));

  app.post('/api/parent/set-pin', async (req) => {
    const { pin } = req.body as { pin: string };
    db.settings.set('parent_pin', String(pin));
    return { ok: true };
  });

  app.post('/api/parent/verify', async (req, reply) => {
    const { pin } = req.body as { pin: string };
    const real = PARENT_PIN_ENV || db.settings.get('parent_pin');
    if (!real || String(pin) === String(real)) return { ok: true };
    return reply.status(403).send({ ok: false, error: 'incorrect PIN' });
  });

  // ---- prompt inspector (parent transparency) ------------------------------
  // Lets a parent see the prompt templates the app uses AND a live log of the
  // real prompts sent during their child's sessions.

  app.get('/api/parent/prompts', async () => ({
    templates: promptTemplates(),
    log: getPromptLog()
  }));

  app.delete('/api/parent/prompts/log', async () => {
    clearPromptLog();
    return { ok: true };
  });

  // ---- kids ----------------------------------------------------------------

  app.get('/api/kids', async () => ({ kids: db.kids.list() }));

  app.post('/api/kids', async (req, reply) => {
    const b = req.body as Partial<Kid>;
    if (!b?.name) return reply.status(400).send({ error: 'name required' });
    const avatar: AvatarConfig = {
      character: b.avatar?.character || 'sage',
      hue: b.avatar?.hue ?? 210,
      voice: b.avatar?.voice || 'default',
      rate: b.avatar?.rate ?? 1
    };
    const kid: Kid = {
      id: nanoid(),
      name: b.name,
      age: b.age ?? 12,
      gradeLevel: b.gradeLevel || '',
      interests: b.interests || [],
      avatar,
      createdAt: now()
    };
    return { kid: db.kids.insert(kid) };
  });

  app.get('/api/kids/:id', async (req, reply) => {
    const kid = db.kids.get((req.params as { id: string }).id);
    if (!kid) return reply.status(404).send({ error: 'not found' });
    return { kid, courses: db.courses.listByKid(kid.id) };
  });

  app.put('/api/kids/:id', async (req, reply) => {
    const kid = db.kids.get((req.params as { id: string }).id);
    if (!kid) return reply.status(404).send({ error: 'not found' });
    const b = req.body as Partial<Kid>;
    const updated: Kid = {
      ...kid,
      name: b.name ?? kid.name,
      age: b.age ?? kid.age,
      gradeLevel: b.gradeLevel ?? kid.gradeLevel,
      interests: b.interests ?? kid.interests,
      avatar: { ...kid.avatar, ...(b.avatar || {}) }
    };
    return { kid: db.kids.update(updated) };
  });

  app.delete('/api/kids/:id', async (req) => {
    db.kids.remove((req.params as { id: string }).id);
    return { ok: true };
  });

  // ---- weekly schedule -----------------------------------------------------

  app.get('/api/kids/:id/schedule', async (req, reply) => {
    const id = (req.params as { id: string }).id;
    if (!db.kids.get(id)) return reply.status(404).send({ error: 'not found' });
    return { schedule: readSchedule(id) };
  });

  app.put('/api/kids/:id/schedule', async (req, reply) => {
    const id = (req.params as { id: string }).id;
    if (!db.kids.get(id)) return reply.status(404).send({ error: 'not found' });
    const body = req.body as { schedule?: WeeklySchedule };
    if (!body?.schedule || typeof body.schedule !== 'object' || !body.schedule.days) {
      return reply.status(400).send({ error: 'invalid schedule' });
    }
    return { schedule: writeSchedule(id, { ...body.schedule, kidId: id }) };
  });

  // ---- courses & curriculum ------------------------------------------------

  app.get('/api/kids/:kidId/courses', async (req) => {
    const kidId = (req.params as { kidId: string }).kidId;
    const model = getOrInitLearner(kidId);
    const courses = db.courses.listByKid(kidId).map((course) => {
      const topics = db.topics.listByCourse(course.id);
      return {
        course,
        progress: courseProgress(course, topics, model),
        recommendation: recommendNext(course, topics, model),
        topicCount: topics.length
      };
    });
    return { courses };
  });

  app.post('/api/kids/:kidId/courses', async (req, reply) => {
    const kid = db.kids.get((req.params as { kidId: string }).kidId);
    if (!kid) return reply.status(404).send({ error: 'kid not found' });
    const b = req.body as {
      subject: string;
      title?: string;
      description?: string;
      gradeLevel?: string;
      curriculum?: string;
      source?: 'pasted' | 'described' | 'file';
    };
    if (!b?.subject) return reply.status(400).send({ error: 'subject required' });
    const course = createCourse(kid, b);
    if (b.curriculum?.trim()) {
      addCurriculum(course, { source: b.source || 'pasted', rawText: b.curriculum });
    }
    const topics = await buildSyllabus(kid, course);
    return { course, topics };
  });

  app.get('/api/courses/:id', async (req, reply) => {
    const course = db.courses.get((req.params as { id: string }).id);
    if (!course) return reply.status(404).send({ error: 'not found' });
    const kid = db.kids.get(course.kidId)!;
    const topics = db.topics.listByCourse(course.id);
    const model = getOrInitLearner(course.kidId);
    return {
      course,
      kid,
      topics,
      curricula: db.curricula.listByCourse(course.id),
      lessons: db.lessons.listByCourse(course.id),
      progress: courseProgress(course, topics, model),
      recommendation: recommendNext(course, topics, model)
    };
  });

  app.post('/api/courses/:id/curriculum', async (req, reply) => {
    const course = db.courses.get((req.params as { id: string }).id);
    if (!course) return reply.status(404).send({ error: 'not found' });
    const kid = db.kids.get(course.kidId)!;
    const b = req.body as { rawText: string; source?: 'pasted' | 'described' | 'file' };
    addCurriculum(course, { source: b.source || 'pasted', rawText: b.rawText });
    const topics = await buildSyllabus(kid, course);
    return { topics };
  });

  app.post('/api/courses/:id/syllabus/regenerate', async (req, reply) => {
    const course = db.courses.get((req.params as { id: string }).id);
    if (!course) return reply.status(404).send({ error: 'not found' });
    const kid = db.kids.get(course.kidId)!;
    return { topics: await buildSyllabus(kid, course) };
  });

  // ---- lessons -------------------------------------------------------------

  app.post('/api/courses/:id/lessons', async (req, reply) => {
    const course = db.courses.get((req.params as { id: string }).id);
    if (!course) return reply.status(404).send({ error: 'not found' });
    const kid = db.kids.get(course.kidId)!;
    const b = req.body as { topicId: string; kind?: 'lesson' | 'diagnostic' | 'review' };
    const topic = db.topics.get(b.topicId);
    if (!topic) return reply.status(404).send({ error: 'topic not found' });
    const lesson = await generateLesson(kid, course, topic, b.kind || 'lesson');
    return { lesson };
  });

  app.get('/api/lessons/:id', async (req, reply) => {
    const lesson = db.lessons.get((req.params as { id: string }).id);
    if (!lesson) return reply.status(404).send({ error: 'not found' });
    return { lesson };
  });

  // ---- live teaching -------------------------------------------------------

  app.post('/api/lessons/:id/start', async (req, reply) => {
    const lesson = db.lessons.get((req.params as { id: string }).id);
    if (!lesson) return reply.status(404).send({ error: 'lesson not found' });
    const kid = db.kids.get(lesson.kidId);
    const course = db.courses.get(lesson.courseId);
    if (!kid || !course) return reply.status(404).send({ error: 'context missing' });
    const session = startSession(kid, course, lesson);
    return { sessionId: session.id };
  });

  app.post('/api/sessions/:id/turn', async (req) => {
    const sessionId = (req.params as { id: string }).id;
    const body = (req.body || {}) as { response?: KidResponse };
    const result = await nextTurn(sessionId, body.response);
    return result;
  });

  app.get('/api/sessions/:id', async (req, reply) => {
    const s = db.sessions.get((req.params as { id: string }).id);
    if (!s) return reply.status(404).send({ error: 'not found' });
    return { session: s };
  });

  // ---- progress, history, memory (parent views) ----------------------------

  app.get('/api/kids/:id/progress', async (req) => {
    const kidId = (req.params as { id: string }).id;
    const model = getOrInitLearner(kidId);
    const courses = db.courses.listByKid(kidId).map((course) => {
      const topics = db.topics.listByCourse(course.id);
      return {
        progress: courseProgress(course, topics, model),
        recommendation: recommendNext(course, topics, model)
      };
    });
    return { courses, episodes: db.episodes.listByKid(kidId, 40), model };
  });

  app.get('/api/kids/:id/sessions', async (req) => ({
    sessions: db.sessions.listByKid((req.params as { id: string }).id)
  }));

  app.get('/api/kids/:id/memory', async (req) => ({
    model: getOrInitLearner((req.params as { id: string }).id),
    episodes: db.episodes.listByKid((req.params as { id: string }).id, 80)
  }));
}

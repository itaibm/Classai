/** All Classai HTTP endpoints, registered under /api. */
import type { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import type {
  AISuggestion,
  AvatarConfig,
  Kid,
  KidResponse,
  Lesson,
  LessonFull,
  WeeklySchedule,
  ScheduleEntry,
  Weekday
} from '../../shared/types.ts';
import { WEEKDAYS, isLessonFull } from '../../shared/types.ts';
import { curriculumTree, getCurriculumLesson } from './services/curriculum.ts';
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
import {
  addKnowledgeMaterial,
  attachCurriculumLesson,
  buildSyllabus,
  createClass,
  createSchoolYear,
  enrollLearner,
  updateClass
} from './services/class-library.ts';
import {
  approveLesson,
  archiveLesson,
  deleteLesson,
  generateLessonDraft,
  reviseLessonDraft,
  saveLessonDraft
} from './services/lesson-authoring.ts';
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

/** Read a kid's schedule, dropping entries for classes they are not enrolled in. */
function readSchedule(kidId: string): WeeklySchedule {
  const raw = db.settings.get(`schedule:${kidId}`);
  if (!raw) return emptyWeek(kidId);
  let parsed: WeeklySchedule;
  try { parsed = JSON.parse(raw) as WeeklySchedule; } catch { return emptyWeek(kidId); }
  const live = new Set(db.enrollments.listByKid(kidId).map((enrollment) => enrollment.classId));
  const base = emptyWeek(kidId);
  for (const d of WEEKDAYS) {
    const entries = Array.isArray(parsed.days?.[d]) ? parsed.days[d] : [];
    base.days[d] = entries.filter((e) => e && live.has(e.classId));
  }
  base.updatedAt = parsed.updatedAt || base.updatedAt;
  return base;
}

/** Validate + normalize an incoming schedule, then persist it. */
function writeSchedule(kidId: string, incoming: WeeklySchedule): WeeklySchedule {
  const live = new Set(db.enrollments.listByKid(kidId).map((enrollment) => enrollment.classId));
  const out = emptyWeek(kidId);
  for (const d of WEEKDAYS) {
    const entries = Array.isArray(incoming.days?.[d]) ? incoming.days[d] : [];
    out.days[d] = entries
      .filter((e) => e && typeof e.classId === 'string' && live.has(e.classId))
      .map((e, i) => ({
        id: typeof e.id === 'string' && e.id ? e.id : `${d}-${i}-${nanoid(6)}`,
        classId: e.classId,
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

  // ---- curriculum library (authored classai-lesson/1 files) ----------------

  app.get('/api/curriculum', async () => ({ years: curriculumTree() }));

  app.get('/api/curriculum/lessons/:id', async (req, reply) => {
    const lesson = getCurriculumLesson((req.params as { id: string }).id);
    if (!lesson) return reply.status(404).send({ error: 'curriculum lesson not found' });
    return { lesson };
  });

  // Attach a curriculum lesson to a class (reference + hash; disk stays truth).
  app.post('/api/classes/:id/curriculum', async (req, reply) => {
    const classId = (req.params as { id: string }).id;
    const curriculumId = (req.body as { curriculumId?: string })?.curriculumId;
    if (!curriculumId) return reply.status(400).send({ error: 'curriculumId required' });
    try {
      return { attachment: attachCurriculumLesson(classId, curriculumId) };
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  });

  app.delete('/api/curriculum/attachments/:id', async (req) => {
    db.curriculumAttachments.remove((req.params as { id: string }).id);
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
    const classes = db.enrollments.listByKid(kid.id)
      .map((enrollment) => db.classes.get(enrollment.classId))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    return { kid, classes };
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

  // ---- shared class library ------------------------------------------------

  app.get('/api/library', async () => ({
    years: db.schoolYears.list().map((year) => ({ ...year, classes: db.classes.listByYear(year.id) }))
  }));

  app.post('/api/years', async (req, reply) => {
    const body = req.body as { name?: string; order?: number };
    if (!body?.name?.trim()) return reply.status(400).send({ error: 'year name required' });
    try { return { year: createSchoolYear({ name: body.name, order: body.order }) }; }
    catch (error: any) { return reply.status(409).send({ error: error.message }); }
  });

  app.post('/api/classes', async (req, reply) => {
    const body = req.body as { yearId?: string; subject?: string; title?: string; description?: string };
    if (!body?.yearId || !body.subject?.trim()) return reply.status(400).send({ error: 'year and subject required' });
    try { return { classDefinition: createClass({ yearId: body.yearId, subject: body.subject, title: body.title, description: body.description }) }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  app.get('/api/classes/:id', async (req, reply) => {
    const classDefinition = db.classes.get((req.params as { id: string }).id);
    if (!classDefinition) return reply.status(404).send({ error: 'class not found' });
    const enrolledKids = db.enrollments.listByClass(classDefinition.id)
      .map((enrollment) => db.kids.get(enrollment.kidId))
      .filter((kid): kid is Kid => Boolean(kid));
    return {
      classDefinition,
      year: db.schoolYears.get(classDefinition.yearId),
      topics: db.topics.listByClass(classDefinition.id),
      materials: db.knowledgeMaterials.listByClass(classDefinition.id),
      lessons: db.lessons.listByClass(classDefinition.id),
      curriculumAttachments: db.curriculumAttachments.listByClass(classDefinition.id),
      suggestions: db.aiSuggestions.listByClass(classDefinition.id),
      enrolledKids,
      allKids: db.kids.list()
    };
  });

  app.put('/api/classes/:id', async (req, reply) => {
    const classDefinition = db.classes.get((req.params as { id: string }).id);
    if (!classDefinition) return reply.status(404).send({ error: 'class not found' });
    return { classDefinition: updateClass(classDefinition, req.body as any) };
  });

  app.delete('/api/classes/:id', async (req) => {
    db.classes.remove((req.params as { id: string }).id);
    return { ok: true };
  });

  app.post('/api/classes/:id/materials', async (req, reply) => {
    const classId = (req.params as { id: string }).id;
    const body = req.body as { title?: string; rawText?: string; source?: 'pasted' | 'described' | 'file' | 'system'; lessonId?: string };
    if (!body?.rawText?.trim()) return reply.status(400).send({ error: 'material text required' });
    try { return { material: addKnowledgeMaterial(classId, { ...body, rawText: body.rawText }) }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  app.delete('/api/materials/:id', async (req, reply) => {
    const id = (req.params as { id: string }).id;
    if (!db.knowledgeMaterials.get(id)) return reply.status(404).send({ error: 'material not found' });
    db.knowledgeMaterials.remove(id);
    return { ok: true };
  });

  app.post('/api/classes/:id/syllabus/regenerate', async (req, reply) => {
    try { return { topics: await buildSyllabus((req.params as { id: string }).id) }; }
    catch (error: any) {
      const status = String(error.message).includes('existing lesson') ? 409 : 404;
      return reply.status(status).send({ error: error.message });
    }
  });

  app.get('/api/kids/:id/classes', async (req, reply) => {
    const kidId = (req.params as { id: string }).id;
    if (!db.kids.get(kidId)) return reply.status(404).send({ error: 'learner not found' });
    const model = getOrInitLearner(kidId);
    const classes = db.enrollments.listByKid(kidId).flatMap((enrollment) => {
      const classDefinition = db.classes.get(enrollment.classId);
      if (!classDefinition) return [];
      const topics = db.topics.listByClass(classDefinition.id);
      const approvedLessons = db.lessons.listByClass(classDefinition.id).filter((lesson) => lesson.status === 'approved');
      const curriculumLessons = db.curriculumAttachments.listByClass(classDefinition.id);
      return [{
        classDefinition,
        year: db.schoolYears.get(classDefinition.yearId),
        progress: courseProgress(classDefinition, topics, model),
        recommendation: recommendNext(classDefinition, topics, model),
        topicCount: topics.length,
        approvedLessons,
        curriculumLessons
      }];
    });
    return { classes };
  });

  app.post('/api/classes/:id/enrollments', async (req, reply) => {
    const classId = (req.params as { id: string }).id;
    const body = req.body as { kidId?: string };
    if (!body?.kidId) return reply.status(400).send({ error: 'kidId required' });
    try { return { enrollment: enrollLearner(classId, body.kidId) }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  app.delete('/api/classes/:id/enrollments/:kidId', async (req) => {
    const { id, kidId } = req.params as { id: string; kidId: string };
    db.enrollments.remove(id, kidId);
    return { ok: true };
  });

  // ---- lesson authoring ----------------------------------------------------

  app.post('/api/classes/:id/lessons', async (req, reply) => {
    const body = req.body as { topicId?: string; kind?: 'lesson' | 'diagnostic' | 'review' };
    if (!body?.topicId) return reply.status(400).send({ error: 'topicId required' });
    try { return { lesson: await generateLessonDraft((req.params as { id: string }).id, body.topicId, body.kind || 'lesson') }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  app.get('/api/lessons/:id', async (req, reply) => {
    const lesson = db.lessons.get((req.params as { id: string }).id);
    if (!lesson) return reply.status(404).send({ error: 'not found' });
    return { lesson };
  });

  app.put('/api/lessons/:id', async (req, reply) => {
    try { return { lesson: saveLessonDraft((req.params as { id: string }).id, req.body as any) }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  app.post('/api/lessons/:id/revise', async (req, reply) => {
    const instruction = (req.body as { instruction?: string })?.instruction;
    if (!instruction?.trim()) return reply.status(400).send({ error: 'revision instruction required' });
    try { return { lesson: await reviseLessonDraft((req.params as { id: string }).id, instruction) }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  app.post('/api/lessons/:id/approve', async (req, reply) => {
    try { return { lesson: approveLesson((req.params as { id: string }).id) }; }
    catch (error: any) { return reply.status(409).send({ error: error.message }); }
  });

  app.post('/api/lessons/:id/archive', async (req, reply) => {
    try { return { lesson: archiveLesson((req.params as { id: string }).id) }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  app.delete('/api/lessons/:id', async (req, reply) => {
    try { deleteLesson((req.params as { id: string }).id); return { ok: true }; }
    catch (error: any) { return reply.status(404).send({ error: error.message }); }
  });

  // ---- live teaching -------------------------------------------------------

  app.post('/api/lessons/:id/start', async (req, reply) => {
    const id = (req.params as { id: string }).id;
    const kidId = (req.body as { kidId?: string })?.kidId;
    if (!kidId) return reply.status(400).send({ error: 'kidId required' });
    const kid = db.kids.get(kidId);
    if (!kid) return reply.status(404).send({ error: 'learner not found' });

    // A lesson id is either a generated blueprint OR a curriculum attachment.
    let lesson: Lesson | LessonFull | undefined = db.lessons.get(id);
    if (!lesson) {
      const attachment = db.curriculumAttachments.get(id);
      if (attachment) {
        const full = getCurriculumLesson(attachment.curriculumId); // re-read fresh from disk
        if (!full) return reply.status(404).send({ error: 'curriculum file is missing or invalid' });
        full.classId = attachment.classId;
        full.id = attachment.id; // stable session lessonId; curriculumId stays the file id
        lesson = full;
      }
    }
    if (!lesson) return reply.status(404).send({ error: 'lesson not found' });

    const classDefinition = db.classes.get(lesson.classId);
    if (!classDefinition) return reply.status(404).send({ error: 'context missing' });
    // Generated blueprints must be approved; curriculum files ship approved.
    if (!isLessonFull(lesson) && lesson.status !== 'approved') return reply.status(409).send({ error: 'lesson is not approved' });
    if (!db.enrollments.get(lesson.classId, kidId)) return reply.status(409).send({ error: 'learner is not enrolled in this class' });
    const session = startSession(kid, classDefinition, lesson);
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

  // ---- AI activity suggestions --------------------------------------------

  app.put('/api/suggestions/:id', async (req, reply) => {
    const suggestion = db.aiSuggestions.get((req.params as { id: string }).id);
    if (!suggestion) return reply.status(404).send({ error: 'suggestion not found' });
    const body = req.body as Partial<Pick<AISuggestion, 'title' | 'objective' | 'lessonId' | 'block'>>;
    const updated: AISuggestion = {
      ...suggestion,
      title: body.title?.trim() || suggestion.title,
      objective: body.objective?.trim() || suggestion.objective,
      lessonId: body.lessonId ?? suggestion.lessonId,
      block: body.block ?? suggestion.block,
      updatedAt: now()
    };
    return { suggestion: db.aiSuggestions.update(updated) };
  });

  app.post('/api/suggestions/:id/approve', async (req, reply) => {
    const suggestion = db.aiSuggestions.get((req.params as { id: string }).id);
    if (!suggestion) return reply.status(404).send({ error: 'suggestion not found' });
    const body = (req.body || {}) as { lessonId?: string };
    return { suggestion: db.aiSuggestions.update({ ...suggestion, lessonId: body.lessonId ?? suggestion.lessonId, status: 'approved', updatedAt: now() }) };
  });

  app.post('/api/suggestions/:id/discard', async (req, reply) => {
    const suggestion = db.aiSuggestions.get((req.params as { id: string }).id);
    if (!suggestion) return reply.status(404).send({ error: 'suggestion not found' });
    return { suggestion: db.aiSuggestions.update({ ...suggestion, status: 'discarded', updatedAt: now() }) };
  });

  // ---- progress, history, memory (parent views) ----------------------------

  app.get('/api/kids/:id/progress', async (req) => {
    const kidId = (req.params as { id: string }).id;
    const model = getOrInitLearner(kidId);
    const courses = db.enrollments.listByKid(kidId).flatMap((enrollment) => {
      const course = db.classes.get(enrollment.classId);
      if (!course) return [];
      const topics = db.topics.listByClass(course.id);
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

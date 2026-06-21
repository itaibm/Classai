/** Typed client for the Classai API. */
import type {
  Kid,
  Course,
  Topic,
  Curriculum,
  Lesson,
  Session,
  LessonKind,
  BrainProfilePublic,
  BrainVendor,
  ModelOption,
  CourseProgress,
  Recommendation,
  LearnerModel,
  MemoryEpisode,
  TeacherTurn,
  KidResponse,
  PromptLogEntry,
  PromptTemplate,
  WeeklySchedule
} from '@shared/types';

async function req<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { 'content-type': 'application/json' },
    ...opts
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).error || `Request failed (${res.status})`);
  return data as T;
}

export interface CourseCard {
  course: Course;
  progress: CourseProgress;
  recommendation: Recommendation | null;
  topicCount: number;
}

export const api = {
  // brain
  brainProfiles: () =>
    req<{ profiles: BrainProfilePublic[]; defaultId?: string; models: Record<BrainVendor, ModelOption[]> }>(
      '/brain/profiles'
    ),
  brainConnect: (body: {
    vendor: BrainVendor;
    method: 'api_key' | 'local_login' | 'none';
    model: string;
    name?: string;
    label?: string;
    apiKey?: string;
    baseUrl?: string;
  }) =>
    req<{ profile: BrainProfilePublic; verified?: boolean; error?: string }>('/brain/connect', {
      method: 'POST',
      body: JSON.stringify(body)
    }),
  brainOauthStart: () =>
    req<{ authorizeUrl: string; state: string; redirectUri: string }>('/brain/oauth/start', { method: 'POST' }),
  brainOauthPaste: (state: string, code: string, model?: string) =>
    req<{ profile: BrainProfilePublic }>('/brain/oauth/paste', {
      method: 'POST',
      body: JSON.stringify({ state, code, model })
    }),
  brainDefault: (id: string) => req('/brain/default', { method: 'POST', body: JSON.stringify({ id }) }),
  brainRemove: (id: string) => req(`/brain/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  brainTest: (id?: string) =>
    req<{ ok: boolean; vendor?: string; model?: string; sample?: string; error?: string }>('/brain/test', {
      method: 'POST',
      body: JSON.stringify({ id })
    }),

  // parent gate
  parentStatus: () => req<{ pinSet: boolean }>('/parent/status'),
  parentSetPin: (pin: string) => req('/parent/set-pin', { method: 'POST', body: JSON.stringify({ pin }) }),
  parentVerify: (pin: string) => req<{ ok: boolean }>('/parent/verify', { method: 'POST', body: JSON.stringify({ pin }) }),

  // prompt inspector
  promptInspector: () => req<{ templates: PromptTemplate[]; log: PromptLogEntry[] }>('/parent/prompts'),
  clearPromptLog: () => req<{ ok: boolean }>('/parent/prompts/log', { method: 'DELETE' }),

  // kids
  kids: () => req<{ kids: Kid[] }>('/kids'),
  kid: (id: string) => req<{ kid: Kid; courses: Course[] }>(`/kids/${id}`),
  createKid: (body: Partial<Kid>) => req<{ kid: Kid }>('/kids', { method: 'POST', body: JSON.stringify(body) }),
  updateKid: (id: string, body: Partial<Kid>) =>
    req<{ kid: Kid }>(`/kids/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteKid: (id: string) => req(`/kids/${id}`, { method: 'DELETE' }),

  // weekly schedule
  schedule: (kidId: string) => req<{ schedule: WeeklySchedule }>(`/kids/${kidId}/schedule`),
  saveSchedule: (kidId: string, schedule: WeeklySchedule) =>
    req<{ schedule: WeeklySchedule }>(`/kids/${kidId}/schedule`, { method: 'PUT', body: JSON.stringify({ schedule }) }),

  // courses
  courses: (kidId: string) => req<{ courses: CourseCard[] }>(`/kids/${kidId}/courses`),
  createCourse: (
    kidId: string,
    body: { subject: string; title?: string; description?: string; gradeLevel?: string; curriculum?: string }
  ) => req<{ course: Course; topics: Topic[] }>(`/kids/${kidId}/courses`, { method: 'POST', body: JSON.stringify(body) }),
  course: (id: string) =>
    req<{
      course: Course;
      kid: Kid;
      topics: Topic[];
      curricula: Curriculum[];
      lessons: Lesson[];
      progress: CourseProgress;
      recommendation: Recommendation | null;
    }>(`/courses/${id}`),
  addCurriculum: (courseId: string, rawText: string) =>
    req<{ topics: Topic[] }>(`/courses/${courseId}/curriculum`, { method: 'POST', body: JSON.stringify({ rawText }) }),
  regenerateSyllabus: (courseId: string) =>
    req<{ topics: Topic[] }>(`/courses/${courseId}/syllabus/regenerate`, { method: 'POST' }),

  // lessons
  generateLesson: (courseId: string, topicId: string, kind: LessonKind = 'lesson') =>
    req<{ lesson: Lesson }>(`/courses/${courseId}/lessons`, {
      method: 'POST',
      body: JSON.stringify({ topicId, kind })
    }),
  lesson: (id: string) => req<{ lesson: Lesson }>(`/lessons/${id}`),

  // teaching
  startLesson: (lessonId: string) => req<{ sessionId: string }>(`/lessons/${lessonId}/start`, { method: 'POST' }),
  turn: (sessionId: string, response?: KidResponse) =>
    req<{ turn: TeacherTurn; ended: boolean; sessionId: string; beat: { index: number; total: number } }>(
      `/sessions/${sessionId}/turn`,
      { method: 'POST', body: JSON.stringify({ response }) }
    ),
  session: (id: string) => req<{ session: Session }>(`/sessions/${id}`),

  // progress / memory / history
  progress: (kidId: string) =>
    req<{
      courses: { progress: CourseProgress; recommendation: Recommendation | null }[];
      episodes: MemoryEpisode[];
      model: LearnerModel;
    }>(`/kids/${kidId}/progress`),
  sessions: (kidId: string) => req<{ sessions: Session[] }>(`/kids/${kidId}/sessions`),
  memory: (kidId: string) => req<{ model: LearnerModel; episodes: MemoryEpisode[] }>(`/kids/${kidId}/memory`)
};

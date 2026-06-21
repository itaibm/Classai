/** Typed client for the Classai API. */
import type {
  Kid,
  AISuggestion,
  ClassDefinition,
  ClassEnrollment,
  SchoolYear,
  Topic,
  KnowledgeMaterial,
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

export interface ClassCard {
  classDefinition: ClassDefinition;
  year?: SchoolYear;
  progress: CourseProgress;
  recommendation: Recommendation | null;
  topicCount: number;
  approvedLessons: Lesson[];
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
  kid: (id: string) => req<{ kid: Kid; classes: ClassDefinition[] }>(`/kids/${id}`),
  createKid: (body: Partial<Kid>) => req<{ kid: Kid }>('/kids', { method: 'POST', body: JSON.stringify(body) }),
  updateKid: (id: string, body: Partial<Kid>) =>
    req<{ kid: Kid }>(`/kids/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteKid: (id: string) => req(`/kids/${id}`, { method: 'DELETE' }),

  // weekly schedule
  schedule: (kidId: string) => req<{ schedule: WeeklySchedule }>(`/kids/${kidId}/schedule`),
  saveSchedule: (kidId: string, schedule: WeeklySchedule) =>
    req<{ schedule: WeeklySchedule }>(`/kids/${kidId}/schedule`, { method: 'PUT', body: JSON.stringify({ schedule }) }),

  // shared class library
  library: () => req<{ years: (SchoolYear & { classes: ClassDefinition[] })[] }>('/library'),
  createYear: (body: { name: string; order?: number }) =>
    req<{ year: SchoolYear }>('/years', { method: 'POST', body: JSON.stringify(body) }),
  createClass: (body: { yearId: string; subject: string; title?: string; description?: string }) =>
    req<{ classDefinition: ClassDefinition }>('/classes', { method: 'POST', body: JSON.stringify(body) }),
  updateClass: (id: string, body: Partial<ClassDefinition>) =>
    req<{ classDefinition: ClassDefinition }>(`/classes/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteClass: (id: string) => req<{ ok: true }>(`/classes/${id}`, { method: 'DELETE' }),
  classDetail: (id: string) =>
    req<{
      classDefinition: ClassDefinition;
      year: SchoolYear;
      topics: Topic[];
      materials: KnowledgeMaterial[];
      lessons: Lesson[];
      suggestions: AISuggestion[];
      enrolledKids: Kid[];
      allKids: Kid[];
    }>(`/classes/${id}`),
  addMaterial: (classId: string, body: { title?: string; rawText: string; lessonId?: string }) =>
    req<{ material: KnowledgeMaterial }>(`/classes/${classId}/materials`, { method: 'POST', body: JSON.stringify(body) }),
  deleteMaterial: (id: string) => req<{ ok: true }>(`/materials/${id}`, { method: 'DELETE' }),
  regenerateSyllabus: (classId: string) =>
    req<{ topics: Topic[] }>(`/classes/${classId}/syllabus/regenerate`, { method: 'POST' }),
  kidClasses: (kidId: string) => req<{ classes: ClassCard[] }>(`/kids/${kidId}/classes`),
  enroll: (classId: string, kidId: string) =>
    req<{ enrollment: ClassEnrollment }>(`/classes/${classId}/enrollments`, { method: 'POST', body: JSON.stringify({ kidId }) }),
  unenroll: (classId: string, kidId: string) =>
    req<{ ok: true }>(`/classes/${classId}/enrollments/${kidId}`, { method: 'DELETE' }),

  // lessons
  generateLesson: (classId: string, topicId: string, kind: LessonKind = 'lesson') =>
    req<{ lesson: Lesson }>(`/classes/${classId}/lessons`, {
      method: 'POST',
      body: JSON.stringify({ topicId, kind })
    }),
  lesson: (id: string) => req<{ lesson: Lesson }>(`/lessons/${id}`),
  saveLesson: (id: string, body: Partial<Lesson>) =>
    req<{ lesson: Lesson }>(`/lessons/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  reviseLesson: (id: string, instruction: string) =>
    req<{ lesson: Lesson }>(`/lessons/${id}/revise`, { method: 'POST', body: JSON.stringify({ instruction }) }),
  approveLesson: (id: string) => req<{ lesson: Lesson }>(`/lessons/${id}/approve`, { method: 'POST' }),
  archiveLesson: (id: string) => req<{ lesson: Lesson }>(`/lessons/${id}/archive`, { method: 'POST' }),
  deleteLesson: (id: string) => req<{ ok: true }>(`/lessons/${id}`, { method: 'DELETE' }),
  updateSuggestion: (id: string, body: Partial<AISuggestion>) =>
    req<{ suggestion: AISuggestion }>(`/suggestions/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  approveSuggestion: (id: string, lessonId?: string) =>
    req<{ suggestion: AISuggestion }>(`/suggestions/${id}/approve`, { method: 'POST', body: JSON.stringify({ lessonId }) }),
  discardSuggestion: (id: string) => req<{ suggestion: AISuggestion }>(`/suggestions/${id}/discard`, { method: 'POST' }),

  // teaching
  startLesson: (lessonId: string, kidId: string) => req<{ sessionId: string }>(`/lessons/${lessonId}/start`, {
    method: 'POST', body: JSON.stringify({ kidId })
  }),
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

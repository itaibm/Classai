/**
 * Memory engine — the part that lets the tutor "know everything about the kid."
 *
 *  - Long-term LearnerModel: blends each turn's observations into a durable
 *    mastery map plus strengths/struggles/misconceptions/interests.
 *  - Episodes: notable moments, for parent narrative & future recall.
 *  - Progress rollups + next-lesson recommendation (with spaced review).
 *
 * Short-term working memory lives on the Session and is updated by the teaching
 * loop (server/src/teach).
 */
import { nanoid } from 'nanoid';
import type {
  LearnerModel,
  MemoryUpdate,
  MemoryEpisode,
  Course,
  Topic,
  TopicProgress,
  CourseProgress,
  Recommendation
} from '../../../shared/types.ts';
import * as dbm from '../db/index.ts';

const MASTERY_THRESHOLD = 0.8;
const CAP = 15;

function pushCapped(arr: string[], v?: string): void {
  if (!v) return;
  const norm = v.trim();
  if (!norm) return;
  const exists = arr.some((x) => x.toLowerCase() === norm.toLowerCase());
  if (!exists) arr.push(norm);
  while (arr.length > CAP) arr.shift();
}

export function getOrInitLearner(kidId: string): LearnerModel {
  return (
    dbm.learnerModels.get(kidId) || {
      kidId,
      summary: '',
      preferences: '',
      strengths: [],
      struggles: [],
      misconceptions: [],
      interests: [],
      topicMastery: {},
      updatedAt: new Date().toISOString()
    }
  );
}

/** Fold a batch of turn observations into long-term memory. */
export function applyTurnMemory(kidId: string, updates: MemoryUpdate[]): LearnerModel {
  const model = getOrInitLearner(kidId);
  const now = new Date().toISOString();
  for (const u of updates) {
    if (!u?.topic) continue;
    const prev = model.topicMastery[u.topic];
    const w = 0.5; // weight of new evidence
    const mastery = prev
      ? Math.max(0, Math.min(1, prev.mastery * (1 - w) + u.mastery * w))
      : Math.max(0, Math.min(1, u.mastery));
    model.topicMastery[u.topic] = {
      mastery,
      confidence: Math.min(1, (prev?.confidence || 0) + 0.2),
      note: u.note || prev?.note || '',
      topicId: prev?.topicId,
      updatedAt: now
    };
    pushCapped(model.strengths, u.strength);
    pushCapped(model.struggles, u.struggle);
    pushCapped(model.misconceptions, u.misconception);
    pushCapped(model.interests, u.interest);
  }
  model.updatedAt = now;
  dbm.learnerModels.upsert(model);
  return model;
}

export function updateNarrative(kidId: string, summary: string, preferences: string): LearnerModel {
  const model = getOrInitLearner(kidId);
  if (summary) model.summary = summary;
  if (preferences) model.preferences = preferences;
  model.updatedAt = new Date().toISOString();
  dbm.learnerModels.upsert(model);
  return model;
}

export function addEpisode(
  kidId: string,
  kind: MemoryEpisode['kind'],
  text: string,
  topic?: string
): MemoryEpisode {
  return dbm.episodes.insert({
    id: nanoid(),
    kidId,
    kind,
    text,
    topic,
    createdAt: new Date().toISOString()
  });
}

// ---- progress & recommendations -------------------------------------------

function daysSince(iso?: string): number {
  if (!iso) return Infinity;
  return (Date.now() - new Date(iso).getTime()) / 86_400_000;
}

/** A topic is due for spaced review when it's partly learned and gone cold. */
function isDue(mastery: number, updatedAt?: string): boolean {
  if (mastery >= MASTERY_THRESHOLD || mastery <= 0) return false;
  const interval = 1 + Math.floor(mastery * 7); // weaker grasp → sooner review
  return daysSince(updatedAt) >= interval;
}

export function courseProgress(course: Course, topics: Topic[], model: LearnerModel): CourseProgress {
  const tp: TopicProgress[] = topics.map((t) => {
    const m = model.topicMastery[t.title];
    const mastery = m?.mastery ?? 0;
    return {
      topicId: t.id,
      title: t.title,
      mastery,
      confidence: m?.confidence ?? 0,
      lastTouched: m?.updatedAt,
      due: isDue(mastery, m?.updatedAt)
    };
  });
  const mastered = tp.filter((t) => t.mastery >= MASTERY_THRESHOLD).length;
  return { course, topics: tp, completion: topics.length ? mastered / topics.length : 0 };
}

/** Recommend the single best next thing for this course. */
export function recommendNext(course: Course, topics: Topic[], model: LearnerModel): Recommendation | null {
  if (!topics.length) return null;
  const touched = topics.some((t) => model.topicMastery[t.title]);

  // Brand-new, substantial course → start with a diagnostic.
  if (!touched && topics.length > 3) {
    const first = topics[0]!;
    return {
      reason: 'diagnostic',
      courseId: course.id,
      topicId: first.id,
      topicTitle: first.title,
      note: `Start with a quick check-in to see what ${course.subject} ${course.title} already feels like.`
    };
  }

  // Spaced review takes priority over new material.
  const due = topics
    .map((t) => ({ t, m: model.topicMastery[t.title] }))
    .filter(({ m }) => m && isDue(m.mastery, m.updatedAt))
    .sort((a, b) => (a.m!.mastery - b.m!.mastery))[0];
  if (due) {
    return {
      reason: 'spaced_review',
      courseId: course.id,
      topicId: due.t.id,
      topicTitle: due.t.title,
      note: `Time to lock in "${due.t.title}" with a short review.`
    };
  }

  // Otherwise the next not-yet-mastered topic whose prerequisites are met.
  const masteredTitles = new Set(
    topics.filter((t) => (model.topicMastery[t.title]?.mastery ?? 0) >= MASTERY_THRESHOLD).map((t) => t.title)
  );
  for (const t of topics) {
    const m = model.topicMastery[t.title]?.mastery ?? 0;
    if (m >= MASTERY_THRESHOLD) continue;
    const ready = t.prerequisites.every((p) => masteredTitles.has(p));
    if (ready) {
      return {
        reason: 'next_topic',
        courseId: course.id,
        topicId: t.id,
        topicTitle: t.title,
        note: `Next up: "${t.title}".`
      };
    }
  }

  // Everything mastered — keep the weakest sharp.
  const weakest = topics
    .map((t) => ({ t, m: model.topicMastery[t.title]?.mastery ?? 1 }))
    .sort((a, b) => a.m - b.m)[0]!;
  return {
    reason: 'continue',
    courseId: course.id,
    topicId: weakest.t.id,
    topicTitle: weakest.t.title,
    note: `Great progress! Keep "${weakest.t.title}" sharp.`
  };
}

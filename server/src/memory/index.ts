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
import type { LearnerModel, MemoryUpdate, MemoryEpisode } from '../../../shared/types.ts';
import * as dbm from '../db/index.ts';
import { blendObservation } from './mastery.ts';

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
  const nowMs = Date.now();
  const now = new Date(nowMs).toISOString();
  for (const u of updates) {
    if (!u?.topic) continue;
    // Confidence-weighted blend from a 0.5 prior, with forgetting (see mastery.ts).
    model.topicMastery[u.topic] = blendObservation(model.topicMastery[u.topic], u.mastery, u.note, nowMs);
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
// Pure rollup/recommendation logic lives in progress.ts; mastery math in mastery.ts.

export { courseProgress, recommendNext, curriculumProgress, MASTERY_THRESHOLD } from './progress.ts';
export type { LessonOutcome } from './progress.ts';
export { decayedMastery, isDue, blendObservation } from './mastery.ts';

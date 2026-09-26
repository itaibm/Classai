/**
 * Parent review of AI-generated lessons. Generated lessons are saved as drafts
 * in the data dir (not `curriculum/`) and stay playable; here a parent can
 * preview, approve, discard (regenerated on next start) or regenerate them.
 *
 * Every route lives under /api/parent/ and is deliberately NOT in
 * PUBLIC_ROUTES, so the parent guard requires `x-parent-token`.
 */
import type { FastifyInstance } from 'fastify';
import {
  approveGeneratedLesson,
  discardGeneratedLesson,
  getGeneratedLesson,
  listGeneratedLessons,
  regenerateLesson
} from './services/lesson-generator.ts';

export function registerGeneratedLessonRoutes(app: FastifyInstance): void {
  app.get('/api/parent/generated', async () => ({ lessons: listGeneratedLessons() }));

  app.get('/api/parent/generated/:id', async (req, reply) => {
    const lesson = getGeneratedLesson((req.params as { id: string }).id);
    if (!lesson) return reply.status(404).send({ error: 'generated lesson not found' });
    return { lesson };
  });

  app.post('/api/parent/generated/:id/approve', async (req, reply) => {
    const lesson = approveGeneratedLesson((req.params as { id: string }).id);
    if (!lesson) return reply.status(404).send({ error: 'generated lesson not found' });
    return { lesson };
  });

  app.delete('/api/parent/generated/:id', async (req, reply) => {
    if (!discardGeneratedLesson((req.params as { id: string }).id)) {
      return reply.status(404).send({ error: 'generated lesson not found' });
    }
    return { ok: true };
  });

  // Needs a connected brain (NoBrainError → 400 via the shared error handler).
  app.post('/api/parent/generated/:id/regenerate', async (req, reply) => {
    const result = await regenerateLesson((req.params as { id: string }).id);
    if (!result.ok && result.reason === 'not_found') return reply.status(404).send({ error: 'generated lesson not found' });
    if (!result.ok) return reply.status(502).send({ error: 'The AI could not build a new version just now — the previous draft was kept. Try again later.' });
    return { lesson: result.lesson };
  });
}

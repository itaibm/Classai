/** Classai server: Fastify API + (in production) static client. */
import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fs from 'node:fs';
import { registerRoutes } from './routes.ts';
import { PORT, IS_PROD, CLIENT_DIST } from './config.ts';

const app = Fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
  bodyLimit: 4 * 1024 * 1024 // curricula can be large
});

// The client always sends content-type: application/json, even for POSTs with no
// body (start lesson, regenerate syllabus, oauth start). Fastify's default JSON
// parser 400s on an empty body, so treat empty/whitespace as an empty object.
app.addContentTypeParser('application/json', { parseAs: 'string' }, (_req, body, done) => {
  const text = typeof body === 'string' ? body.trim() : '';
  if (!text) return done(null, {});
  try {
    done(null, JSON.parse(text));
  } catch (err) {
    (err as any).statusCode = 400;
    done(err as Error, undefined);
  }
});

await app.register(cors, { origin: true });
await registerRoutes(app);

// In production, serve the built SPA and fall back to index.html for routes.
if (IS_PROD && fs.existsSync(CLIENT_DIST)) {
  await app.register(fastifyStatic, { root: CLIENT_DIST });
  app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith('/api')) return reply.status(404).send({ error: 'not found' });
    return reply.sendFile('index.html');
  });
}

app
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(() => app.log.info(`Classai listening on http://localhost:${PORT}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

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

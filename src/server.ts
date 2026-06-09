import Fastify from 'fastify';
import cors from '@fastify/cors';
import { InMemoryProductRepository } from './repository.js';
import { ProductService } from './service.js';
import { registerProductRoutes } from './routes.js';

async function start() {
  const app = Fastify({ logger: true });

  // CORS — allows the buyer app (and browser) to call this API.
  // In production, replace `origin: true` with your actual domain.
  await app.register(cors, { origin: true });

  // Dependency wiring: repository → service → routes
  // To switch to PostgreSQL later, change ONLY the next line.
  const repository = new InMemoryProductRepository();
  const service = new ProductService(repository);

  registerProductRoutes(app, service);

  // Health check — used by load balancers and container orchestration (ECS/K8s)
  app.get('/health', async () => ({ status: 'ok', service: 'catalog-svc' }));

  const PORT = 3003;
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`catalog-svc running on http://localhost:${PORT}`);
}

start().catch((err) => { console.error(err); process.exit(1); });

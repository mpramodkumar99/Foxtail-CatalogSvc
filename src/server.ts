import Fastify from 'fastify';
import { InMemoryProductRepository } from './repository.js';
import { ProductService } from './service.js';
import { registerProductRoutes } from './routes.js';

const app = Fastify({ logger: true });

// Dependency wiring: repository → service → routes
// To switch to PostgreSQL later, change ONLY the next line.
const repository = new InMemoryProductRepository();
const service = new ProductService(repository);

registerProductRoutes(app, service);

// Health check — used by load balancers and container orchestration (ECS/K8s)
app.get('/health', async () => ({ status: 'ok', service: 'catalog-svc' }));

const PORT = 3003;
app.listen({ port: PORT, host: '0.0.0.0' })
  .then(() => console.log(`catalog-svc running on http://localhost:${PORT}`))
  .catch((err) => { app.log.error(err); process.exit(1); });

import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  InMemoryProductRepository,
  InMemoryPromotionRepository,
  InMemoryReviewRepository,
} from './repository.js';
import {
  PgProductRepository,
  PgPromotionRepository,
  PgReviewRepository,
} from './db/pg-repository.js';
import { db } from './db/client.js';
import { ProductService, PromotionService, ReviewService } from './service.js';
import { registerProductRoutes, registerPromotionRoutes, registerReviewRoutes, registerCatalogItemRoutes } from './routes.js';

async function start() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id', 'X-Admin-Key'],
    credentials: true,
  });

  const usePostgres = Boolean(process.env['DATABASE_URL']);

  const productRepo   = usePostgres ? new PgProductRepository(db)   : new InMemoryProductRepository();
  const promotionRepo = usePostgres ? new PgPromotionRepository(db)  : new InMemoryPromotionRepository();
  const reviewRepo    = usePostgres ? new PgReviewRepository(db)     : new InMemoryReviewRepository();

  registerProductRoutes(app,   new ProductService(productRepo));
  registerPromotionRoutes(app, new PromotionService(promotionRepo));
  registerReviewRoutes(app,    new ReviewService(reviewRepo));
  registerCatalogItemRoutes(app);

  app.get('/health', async () => ({ status: 'ok', service: 'catalog-svc' }));

  const PORT = 3003;
  await app.listen({ port: PORT, host: '0.0.0.0' });
  app.log.info(`catalog-svc storage: ${usePostgres ? 'PostgreSQL' : 'in-memory'}`);
  console.log(`catalog-svc running on http://localhost:${PORT}`);
}

start().catch((err) => { console.error(err); process.exit(1); });

import type { FastifyInstance } from 'fastify';
import type { ProductService, PromotionService, ReviewService } from './service.js';
import {
  createProductSchema, updateProductSchema,
  createPromotionSchema, updatePromotionSchema,
  createReviewSchema, replyReviewSchema,
} from './schemas.js';
import { searchCatalogItems } from './catalog-items.js';

// ── Seller-only: master product catalog for quick search ──────────────────────
export function registerCatalogItemRoutes(app: FastifyInstance) {
  app.get('/v1/catalog-items', async (request, reply) => {
    const { q, limit } = request.query as { q?: string; limit?: string };
    const results = searchCatalogItems(q ?? '', limit ? parseInt(limit, 10) : 10);
    return reply.send({ success: true, data: results, meta: { total: results.length } });
  });
}

export function registerProductRoutes(app: FastifyInstance, service: ProductService) {

  // ── LIST ── GET /v1/products?category=&subCategory=&shipsTo=&sellerId=&status=
  app.get('/v1/products', async (request, reply) => {
    const { category, subCategory, shipsTo, sellerId, status } = request.query as {
      category?: string; subCategory?: string; shipsTo?: string; sellerId?: string; status?: string;
    };
    const products = await service.listProducts({ category, subCategory, shipsTo, sellerId, status });
    return reply.send({ success: true, data: products, meta: { total: products.length } });
  });

  // ── GET ONE ── GET /v1/products/:id
  app.get('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const product = await service.getProduct(id);
    if (!product) return reply.status(404).send({ success: false, error: { type: 'not_found', title: 'Product not found', status: 404 } });
    return reply.send({ success: true, data: product });
  });

  // ── CREATE ── POST /v1/products
  app.post('/v1/products', async (request, reply) => {
    const parsed = createProductSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ success: false, error: { type: 'validation_error', title: 'Invalid product data', status: 400, detail: parsed.error.issues } });
    const product = await service.createProduct(parsed.data);
    return reply.status(201).send({ success: true, data: product });
  });

  // ── UPDATE ── PATCH /v1/products/:id
  app.patch('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsed = updateProductSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ success: false, error: { type: 'validation_error', title: 'Invalid update data', status: 400, detail: parsed.error.issues } });
    const updated = await service.updateProduct(id, parsed.data);
    if (!updated) return reply.status(404).send({ success: false, error: { type: 'not_found', title: 'Product not found', status: 404 } });
    return reply.send({ success: true, data: updated });
  });

  // ── DELETE ── DELETE /v1/products/:id
  app.delete('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const removed = await service.deleteProduct(id);
    if (!removed) return reply.status(404).send({ success: false, error: { type: 'not_found', title: 'Product not found', status: 404 } });
    return reply.status(204).send();
  });
}

export function registerPromotionRoutes(app: FastifyInstance, service: PromotionService) {

  // ── LIST ── GET /v1/promotions?sellerId=
  app.get('/v1/promotions', async (request, reply) => {
    const { sellerId } = request.query as { sellerId?: string };
    if (!sellerId) return reply.status(400).send({ success: false, error: { type: 'bad_request', title: 'sellerId query param required', status: 400 } });
    const promos = await service.listBySeller(sellerId);
    return reply.send({ success: true, data: promos });
  });

  // ── CREATE ── POST /v1/promotions
  app.post('/v1/promotions', async (request, reply) => {
    const parsed = createPromotionSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ success: false, error: { type: 'validation_error', title: 'Invalid promotion data', status: 400, detail: parsed.error.issues } });
    const promo = await service.create(parsed.data);
    return reply.status(201).send({ success: true, data: promo });
  });

  // ── TOGGLE ── PATCH /v1/promotions/:id
  app.patch('/v1/promotions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsed = updatePromotionSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ success: false, error: { type: 'validation_error', title: 'Invalid update data', status: 400, detail: parsed.error.issues } });
    const updated = await service.toggle(id, parsed.data.active);
    if (!updated) return reply.status(404).send({ success: false, error: { type: 'not_found', title: 'Promotion not found', status: 404 } });
    return reply.send({ success: true, data: updated });
  });

  // ── DELETE ── DELETE /v1/promotions/:id
  app.delete('/v1/promotions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const removed = await service.delete(id);
    if (!removed) return reply.status(404).send({ success: false, error: { type: 'not_found', title: 'Promotion not found', status: 404 } });
    return reply.status(204).send();
  });
}

export function registerReviewRoutes(app: FastifyInstance, service: ReviewService) {

  // ── LIST BY SELLER ── GET /v1/reviews?sellerId=
  app.get('/v1/reviews', async (request, reply) => {
    const { sellerId, productId } = request.query as { sellerId?: string; productId?: string };
    if (!sellerId && !productId) return reply.status(400).send({ success: false, error: { type: 'bad_request', title: 'sellerId or productId required', status: 400 } });
    const reviews = sellerId
      ? await service.listBySeller(sellerId)
      : await service.listByProduct(productId!);
    return reply.send({ success: true, data: reviews });
  });

  // ── CREATE ── POST /v1/reviews
  app.post('/v1/reviews', async (request, reply) => {
    const parsed = createReviewSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ success: false, error: { type: 'validation_error', title: 'Invalid review data', status: 400, detail: parsed.error.issues } });
    const review = await service.create(parsed.data);
    return reply.status(201).send({ success: true, data: review });
  });

  // ── REPLY ── PATCH /v1/reviews/:id/reply
  app.patch('/v1/reviews/:id/reply', async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsed = replyReviewSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ success: false, error: { type: 'validation_error', title: 'Invalid reply data', status: 400, detail: parsed.error.issues } });
    const updated = await service.reply(id, parsed.data);
    if (!updated) return reply.status(404).send({ success: false, error: { type: 'not_found', title: 'Review not found', status: 404 } });
    return reply.send({ success: true, data: updated });
  });

  // ── DELETE ── DELETE /v1/reviews/:id
  app.delete('/v1/reviews/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const removed = await service.delete(id);
    if (!removed) return reply.status(404).send({ success: false, error: { type: 'not_found', title: 'Review not found', status: 404 } });
    return reply.status(204).send();
  });
}

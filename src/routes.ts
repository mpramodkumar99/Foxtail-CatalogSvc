import type { FastifyInstance } from 'fastify';
import type { ProductService } from './service.js';
import { createProductSchema, updateProductSchema } from './schemas.js';

export function registerProductRoutes(app: FastifyInstance, service: ProductService) {

  // ── LIST ── GET /v1/products?category=&subCategory=&shipsTo=&sellerId=
  app.get('/v1/products', async (request, reply) => {
    const { category, subCategory, shipsTo, sellerId } = request.query as {
      category?: string;
      subCategory?: string;
      shipsTo?: string;
      sellerId?: string;
    };
    const products = await service.listProducts({ category, subCategory, shipsTo, sellerId });
    return reply.send({ success: true, data: products, meta: { total: products.length } });
  });

  // ── GET ONE ── GET /v1/products/:id
  app.get('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const product = await service.getProduct(id);
    if (!product) {
      return reply.status(404).send({
        success: false,
        error: { type: 'not_found', title: 'Product not found', status: 404 },
      });
    }
    return reply.send({ success: true, data: product });
  });

  // ── CREATE ── POST /v1/products
  app.post('/v1/products', async (request, reply) => {
    const parsed = createProductSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          type: 'validation_error',
          title: 'Invalid product data',
          status: 400,
          detail: parsed.error.issues,
        },
      });
    }
    const product = await service.createProduct(parsed.data);
    return reply.status(201).send({ success: true, data: product });
  });

  // ── UPDATE ── PATCH /v1/products/:id
  // Requires X-Seller-Id header matching the product's sellerId.
  app.patch('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const requestedSellerId = (request.headers['x-seller-id'] as string | undefined)?.trim();
    if (!requestedSellerId) {
      return reply.status(401).send({
        success: false,
        error: { type: 'unauthorized', title: 'X-Seller-Id header is required', status: 401 },
      });
    }

    const existing = await service.getProduct(id);
    if (!existing) {
      return reply.status(404).send({
        success: false,
        error: { type: 'not_found', title: 'Product not found', status: 404 },
      });
    }

    if (existing.sellerId !== requestedSellerId) {
      return reply.status(403).send({
        success: false,
        error: { type: 'forbidden', title: 'You do not own this product', status: 403 },
      });
    }

    const parsed = updateProductSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          type: 'validation_error',
          title: 'Invalid update data',
          status: 400,
          detail: parsed.error.issues,
        },
      });
    }

    const updated = await service.updateProduct(id, parsed.data);
    return reply.send({ success: true, data: updated });
  });

  // ── DELETE ── DELETE /v1/products/:id
  // Requires X-Seller-Id header matching the product's sellerId.
  app.delete('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const requestedSellerId = (request.headers['x-seller-id'] as string | undefined)?.trim();
    if (!requestedSellerId) {
      return reply.status(401).send({
        success: false,
        error: { type: 'unauthorized', title: 'X-Seller-Id header is required', status: 401 },
      });
    }

    const existing = await service.getProduct(id);
    if (!existing) {
      return reply.status(404).send({
        success: false,
        error: { type: 'not_found', title: 'Product not found', status: 404 },
      });
    }

    if (existing.sellerId !== requestedSellerId) {
      return reply.status(403).send({
        success: false,
        error: { type: 'forbidden', title: 'You do not own this product', status: 403 },
      });
    }

    await service.deleteProduct(id);
    return reply.status(204).send();
  });
}

import type { FastifyInstance } from 'fastify';
import type { ProductService } from './service.js';
import { createProductSchema, updateProductSchema } from './schemas.js';

export function registerProductRoutes(app: FastifyInstance, service: ProductService) {

  // ── LIST ── GET /v1/products?category=vegetables
  app.get('/v1/products', async (request, reply) => {
    const { category } = request.query as { category?: string };
    const products = await service.listProducts(category);
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
  app.patch('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
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
    if (!updated) {
      return reply.status(404).send({
        success: false,
        error: { type: 'not_found', title: 'Product not found', status: 404 },
      });
    }
    return reply.send({ success: true, data: updated });
  });

  // ── DELETE ── DELETE /v1/products/:id
  app.delete('/v1/products/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const removed = await service.deleteProduct(id);
    if (!removed) {
      return reply.status(404).send({
        success: false,
        error: { type: 'not_found', title: 'Product not found', status: 404 },
      });
    }
    return reply.status(204).send();
  });
}

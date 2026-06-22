import { randomUUID } from 'node:crypto';
import { eq, and, desc } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema.js';
import type { ProductRepository, PromotionRepository, ReviewRepository } from '../repository.js';
import type {
  Product, CreateProductInput, UpdateProductInput,
  Promotion, CreatePromotionInput, UpdatePromotionInput,
  Review, CreateReviewInput, ReplyReviewInput,
} from '../types.js';

type Db = NodePgDatabase<typeof schema>;

// ── Products ──────────────────────────────────────────────────────────────────

function toProduct(row: typeof schema.products.$inferSelect): Product {
  return {
    id:               row.id,
    name:             row.name,
    description:      row.description,
    category:         row.category as Product['category'],
    subCategory:      row.subCategory as Product['subCategory'],
    price:            row.price,
    originalPrice:    row.originalPrice ?? undefined,
    unit:             row.unit,
    stockQuantity:    row.stockQuantity,
    sellerId:         row.sellerId,
    sellerName:       row.sellerName,
    location:         row.location,
    inStock:          row.inStock,
    isVerified:       row.isVerified,
    isHandmade:       row.isHandmade,
    shipsTo:          row.shipsTo as Product['shipsTo'],
    images:           (row.images as string[]) ?? [],
    status:           row.status as Product['status'],
    rating:           row.rating,
    reviewCount:      row.reviewCount,
    lowStockThreshold: row.lowStockThreshold ?? undefined,
    minimumOrderQty:  row.minimumOrderQty ?? undefined,
    createdAt:        row.createdAt.toISOString(),
    updatedAt:        row.updatedAt.toISOString(),
  };
}

export class PgProductRepository implements ProductRepository {
  constructor(private db: Db) {}

  async findAll(filters?: {
    category?: string; subCategory?: string; shipsTo?: string;
    sellerId?: string; status?: string;
  }): Promise<Product[]> {
    const conditions = [];
    if (filters?.category)    conditions.push(eq(schema.products.category,    filters.category));
    if (filters?.subCategory) conditions.push(eq(schema.products.subCategory, filters.subCategory));
    if (filters?.shipsTo)     conditions.push(eq(schema.products.shipsTo,     filters.shipsTo));
    if (filters?.sellerId)    conditions.push(eq(schema.products.sellerId,    filters.sellerId));
    if (filters?.status)      conditions.push(eq(schema.products.status,      filters.status));
    const rows = conditions.length > 0
      ? await this.db.select().from(schema.products).where(and(...conditions))
      : await this.db.select().from(schema.products);
    return rows.map(toProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const [row] = await this.db.select().from(schema.products).where(eq(schema.products.id, id));
    return row ? toProduct(row) : null;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const now = new Date();
    const [row] = await this.db.insert(schema.products).values({
      id: randomUUID(), ...input,
      inStock:   input.stockQuantity > 0,
      images:    input.images ?? [],
      status:    input.status ?? 'active',
      createdAt: now, updatedAt: now,
    }).returning();
    return toProduct(row!);
  }

  async update(id: string, input: UpdateProductInput): Promise<Product | null> {
    const patch: Record<string, unknown> = { ...input, updatedAt: new Date() };
    if (typeof input.stockQuantity === 'number') patch['inStock'] = input.stockQuantity > 0;
    const [row] = await this.db.update(schema.products).set(patch).where(eq(schema.products.id, id)).returning();
    return row ? toProduct(row) : null;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db.delete(schema.products).where(eq(schema.products.id, id)).returning();
    return rows.length > 0;
  }
}

// ── Promotions ────────────────────────────────────────────────────────────────

function toPromotion(row: typeof schema.promotions.$inferSelect): Promotion {
  return {
    id:        row.id,
    sellerId:  row.sellerId,
    type:      row.type as Promotion['type'],
    value:     row.value,
    minOrder:  row.minOrder,
    validDays: row.validDays,
    active:    row.active,
    expiresAt: row.expiresAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class PgPromotionRepository implements PromotionRepository {
  constructor(private db: Db) {}

  async findBySeller(sellerId: string): Promise<Promotion[]> {
    const rows = await this.db.select().from(schema.promotions)
      .where(eq(schema.promotions.sellerId, sellerId))
      .orderBy(desc(schema.promotions.createdAt));
    return rows.map(toPromotion);
  }

  async create(input: CreatePromotionInput): Promise<Promotion> {
    const now       = new Date();
    const expiresAt = new Date(now.getTime() + input.validDays * 86400000);
    const [row] = await this.db.insert(schema.promotions).values({
      id: randomUUID(), ...input, expiresAt, createdAt: now, updatedAt: now,
    }).returning();
    return toPromotion(row!);
  }

  async update(id: string, input: UpdatePromotionInput): Promise<Promotion | null> {
    const [row] = await this.db.update(schema.promotions)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(schema.promotions.id, id))
      .returning();
    return row ? toPromotion(row) : null;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db.delete(schema.promotions).where(eq(schema.promotions.id, id)).returning();
    return rows.length > 0;
  }
}

// ── Reviews ───────────────────────────────────────────────────────────────────

function toReview(row: typeof schema.reviews.$inferSelect): Review {
  return {
    id:         row.id,
    productId:  row.productId,
    sellerId:   row.sellerId,
    buyerId:    row.buyerId,
    buyerName:  row.buyerName,
    rating:     row.rating,
    text:       row.text,
    reply:      row.reply ?? undefined,
    repliedAt:  row.repliedAt?.toISOString(),
    createdAt:  row.createdAt.toISOString(),
    updatedAt:  row.updatedAt.toISOString(),
  };
}

export class PgReviewRepository implements ReviewRepository {
  constructor(private db: Db) {}

  async findBySeller(sellerId: string): Promise<Review[]> {
    const rows = await this.db.select().from(schema.reviews)
      .where(eq(schema.reviews.sellerId, sellerId))
      .orderBy(desc(schema.reviews.createdAt));
    return rows.map(toReview);
  }

  async findByProduct(productId: string): Promise<Review[]> {
    const rows = await this.db.select().from(schema.reviews)
      .where(eq(schema.reviews.productId, productId))
      .orderBy(desc(schema.reviews.createdAt));
    return rows.map(toReview);
  }

  async create(input: CreateReviewInput): Promise<Review> {
    const now = new Date();
    const [row] = await this.db.insert(schema.reviews).values({
      id: randomUUID(), ...input, createdAt: now, updatedAt: now,
    }).returning();
    return toReview(row!);
  }

  async reply(id: string, input: ReplyReviewInput): Promise<Review | null> {
    const now = new Date();
    const [row] = await this.db.update(schema.reviews)
      .set({ reply: input.reply, repliedAt: now, updatedAt: now })
      .where(eq(schema.reviews.id, id))
      .returning();
    return row ? toReview(row) : null;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db.delete(schema.reviews).where(eq(schema.reviews.id, id)).returning();
    return rows.length > 0;
  }
}

import { pgTable, text, integer, boolean, real, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id:               text('id').primaryKey(),
  name:             text('name').notNull(),
  description:      text('description').notNull().default(''),
  category:         text('category').notNull(),
  subCategory:      text('sub_category').notNull(),
  price:            integer('price').notNull(),
  originalPrice:    integer('original_price'),
  unit:             text('unit').notNull(),
  stockQuantity:    integer('stock_quantity').notNull().default(0),
  sellerId:         text('seller_id').notNull(),
  sellerName:       text('seller_name').notNull(),
  location:         text('location').notNull(),
  inStock:          boolean('in_stock').notNull().default(true),
  isVerified:       boolean('is_verified').notNull().default(false),
  isHandmade:       boolean('is_handmade').notNull().default(false),
  shipsTo:          text('ships_to').notNull(),
  images:           jsonb('images').notNull().default('[]').$type<string[]>(),
  status:           text('status').notNull().default('active'),
  rating:           real('rating').notNull().default(0),
  reviewCount:      integer('review_count').notNull().default(0),
  lowStockThreshold: integer('low_stock_threshold'),
  minimumOrderQty:  integer('minimum_order_qty'),
  createdAt:        timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:        timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const promotions = pgTable('promotions', {
  id:        text('id').primaryKey(),
  sellerId:  text('seller_id').notNull(),
  type:      text('type').notNull(),      // 'percent' | 'flat' | 'free_delivery'
  value:     integer('value').notNull().default(0),
  minOrder:  integer('min_order').notNull().default(0),
  validDays: integer('valid_days').notNull().default(7),
  active:    boolean('active').notNull().default(true),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const reviews = pgTable('reviews', {
  id:         text('id').primaryKey(),
  productId:  text('product_id').notNull(),
  sellerId:   text('seller_id').notNull(),
  buyerId:    text('buyer_id').notNull(),
  buyerName:  text('buyer_name').notNull(),
  rating:     integer('rating').notNull(),
  text:       text('text').notNull(),
  reply:      text('reply'),
  repliedAt:  timestamp('replied_at', { withTimezone: true }),
  createdAt:  timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:  timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

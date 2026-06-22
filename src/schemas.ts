import { z } from 'zod';

const categories = ['farm_products', 'processed_foods', 'foods', 'arts_handmade', 'services'] as const;

const subCategories = [
  'grains_staples', 'vegetables_spices', 'animal_products',
  'pastes_powders', 'oils',
  'preserved_packaged',
  'furniture', 'iron_works', 'vendor_products', 'dealer_products', 'materials_finishes',
  'utilities', 'beauty_wellness', 'technical', 'construction_finishing', 'mechanical', 'rentals',
] as const;

export const createProductSchema = z.object({
  name:             z.string().min(1).max(120),
  description:      z.string().max(1000).optional().default(''),
  category:         z.enum(categories),
  subCategory:      z.enum(subCategories),
  price:            z.number().int().positive(),
  originalPrice:    z.number().int().positive().optional(),
  unit:             z.string().min(1).max(30),
  stockQuantity:    z.number().int().min(0).default(0),
  sellerId:         z.string().min(1),
  sellerName:       z.string().min(1).max(120),
  location:         z.string().min(1).max(120),
  isVerified:       z.boolean().default(false),
  isHandmade:       z.boolean().default(false),
  shipsTo:          z.enum(['mandal', 'district', 'state', 'national']),
  images:           z.array(z.string()).max(5).optional().default([]),
  status:           z.enum(['draft', 'active', 'archived']).optional().default('active'),
  rating:           z.number().min(0).max(5).default(0),
  reviewCount:      z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().positive().optional(),
  minimumOrderQty:  z.number().int().positive().optional(),
});

export const updateProductSchema = createProductSchema
  .omit({ sellerId: true, sellerName: true, location: true })
  .partial();

// ── Promotions ────────────────────────────────────────────────────────────────

export const createPromotionSchema = z.object({
  sellerId:  z.string().min(1),
  type:      z.enum(['percent', 'flat', 'free_delivery']),
  value:     z.number().int().min(0).default(0),
  minOrder:  z.number().int().min(0).default(0),
  validDays: z.number().int().min(1).max(365).default(7),
  active:    z.boolean().default(true),
});

export const updatePromotionSchema = z.object({
  active: z.boolean(),
});

// ── Reviews ───────────────────────────────────────────────────────────────────

export const createReviewSchema = z.object({
  productId: z.string().min(1),
  sellerId:  z.string().min(1),
  buyerId:   z.string().min(1),
  buyerName: z.string().min(1).max(120),
  rating:    z.number().int().min(1).max(5),
  text:      z.string().min(1).max(2000),
});

export const replyReviewSchema = z.object({
  reply: z.string().min(1).max(1000),
});

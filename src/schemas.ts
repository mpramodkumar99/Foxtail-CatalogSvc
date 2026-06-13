import { z } from 'zod';

const categories = ['farm_products', 'processed_foods', 'foods', 'arts_handmade', 'services'] as const;

const subCategories = [
  'grains_staples', 'vegetables_spices', 'animal_products',
  'pastes_powders', 'oils',
  'preserved_packaged',
  'furniture', 'iron_works', 'vendor_products', 'dealer_products', 'materials_finishes',
  'utilities', 'beauty_wellness', 'technical', 'construction_finishing', 'mechanical', 'rentals',
] as const;

// Fields a seller provides when creating a product.
// isVerified is NOT here — the server defaults it to false; only admins can flip it.
export const createProductSchema = z.object({
  name:          z.string().min(1).max(120),
  description:   z.string().max(1000).default(''),
  category:      z.enum(categories),
  subCategory:   z.enum(subCategories),
  price:         z.number().int().positive(),
  originalPrice: z.number().int().positive().optional(),
  unit:          z.string().min(1).max(30),
  sellerId:      z.string().min(1),
  sellerName:    z.string().min(1).max(120),
  location:      z.string().min(1).max(120),
  inStock:       z.boolean(),
  isHandmade:    z.boolean(),
  shipsTo:       z.enum(['mandal', 'district', 'state', 'national']),
  rating:        z.number().min(0).max(5),
  reviewCount:   z.number().int().min(0),
});

// Store-identity fields (sellerId, sellerName, location) are immutable after creation.
// isVerified is also excluded — admin-only.
export const updateProductSchema = createProductSchema
  .omit({ sellerId: true, sellerName: true, location: true })
  .partial();

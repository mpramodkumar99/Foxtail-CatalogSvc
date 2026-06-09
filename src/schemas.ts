import { z } from 'zod';

export const createProductSchema = z.object({
  name:     z.string().min(1).max(100),
  category: z.enum(['vegetables', 'fruits', 'dairy', 'grains', 'other']),
  price:    z.number().int().positive(),  // integer paise, must be > 0
  unit:     z.string().min(1).max(20),
  sellerId: z.string().min(1),
  inStock:  z.boolean(),
});

// .partial() makes every field optional — correct for PATCH semantics.
// Sending { price: 5000 } is valid; you only update what you send.
export const updateProductSchema = createProductSchema.partial();

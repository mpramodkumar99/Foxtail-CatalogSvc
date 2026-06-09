export interface Product {
  id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'dairy' | 'grains' | 'other';
  price: number;       // integer paise — ₹40 = 4000
  unit: string;        // e.g. "kg", "dozen", "litre"
  sellerId: string;
  inStock: boolean;
  createdAt: string;   // ISO timestamp e.g. "2026-06-09T10:00:00.000Z"
}

// What the caller sends to CREATE — server generates id and createdAt
export type CreateProductInput = Omit<Product, 'id' | 'createdAt'>;

// What the caller sends to UPDATE — every field optional (PATCH semantics)
export type UpdateProductInput = Partial<CreateProductInput>;

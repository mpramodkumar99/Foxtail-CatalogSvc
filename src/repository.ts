import { randomUUID } from 'node:crypto';
import type { Product, CreateProductInput, UpdateProductInput } from './types.js';

// THE CONTRACT — any storage backend must implement these five methods.
// The service layer depends only on this interface, never on the implementation.
export interface ProductRepository {
  findAll(category?: string): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(input: CreateProductInput): Promise<Product>;
  update(id: string, input: UpdateProductInput): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

// IN-MEMORY IMPLEMENTATION — a Map is our fake database for now.
// To switch to PostgreSQL: write PostgresProductRepository implementing
// the same interface above, and change one line in server.ts.
export class InMemoryProductRepository implements ProductRepository {
  private store = new Map<string, Product>();

  constructor() {
    this.seed();
  }

  async findAll(category?: string): Promise<Product[]> {
    const all = [...this.store.values()];
    if (category) {
      return all.filter((p) => p.category === category);
    }
    return all;
  }

  async findById(id: string): Promise<Product | null> {
    return this.store.get(id) ?? null;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const product: Product = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this.store.set(product.id, product);
    return product;
  }

  async update(id: string, input: UpdateProductInput): Promise<Product | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }

  private seed() {
    const samples: CreateProductInput[] = [
      { name: 'Farm Fresh Tomatoes', category: 'vegetables', price: 4500, unit: 'kg',     sellerId: 'seller-1', inStock: true },
      { name: 'Organic Bananas',     category: 'fruits',     price: 6000, unit: 'dozen',  sellerId: 'seller-2', inStock: true },
      { name: 'Fresh Milk',          category: 'dairy',      price: 5500, unit: 'litre',  sellerId: 'seller-3', inStock: true },
      { name: 'Basmati Rice',        category: 'grains',     price: 18000, unit: '5kg',   sellerId: 'seller-1', inStock: true },
      { name: 'Green Chillies',      category: 'vegetables', price: 3000, unit: 'kg',     sellerId: 'seller-4', inStock: false },
    ];
    for (const s of samples) {
      const product: Product = { ...s, id: randomUUID(), createdAt: new Date().toISOString() };
      this.store.set(product.id, product);
    }
  }
}

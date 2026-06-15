import type { ProductRepository } from './repository.js';
import type { CreateProductInput, UpdateProductInput } from './types.js';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  listProducts(filters?: {
    category?: string;
    subCategory?: string;
    shipsTo?: string;
    sellerId?: string;
    status?: string;
  }) {
    return this.repo.findAll(filters);
  }

  getProduct(id: string) {
    return this.repo.findById(id);
  }

  createProduct(input: CreateProductInput) {
    return this.repo.create(input);
  }

  updateProduct(id: string, input: UpdateProductInput) {
    return this.repo.update(id, input);
  }

  deleteProduct(id: string) {
    return this.repo.delete(id);
  }
}

import type { ProductRepository } from './repository.js';
import type { CreateProductInput, UpdateProductInput } from './types.js';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  listProducts(category?: string) {
    return this.repo.findAll(category);
  }

  getProduct(id: string) {
    return this.repo.findById(id);
  }

  createProduct(input: CreateProductInput) {
    // Business rules go here — e.g. seller verification, price sanity checks
    return this.repo.create(input);
  }

  updateProduct(id: string, input: UpdateProductInput) {
    return this.repo.update(id, input);
  }

  deleteProduct(id: string) {
    return this.repo.delete(id);
  }
}

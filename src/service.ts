import type { ProductRepository, PromotionRepository, ReviewRepository } from './repository.js';
import type {
  CreateProductInput, UpdateProductInput,
  CreatePromotionInput, UpdatePromotionInput,
  CreateReviewInput, ReplyReviewInput,
} from './types.js';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  listProducts(filters?: { category?: string; subCategory?: string; shipsTo?: string; sellerId?: string; status?: string }) {
    return this.repo.findAll(filters);
  }
  getProduct(id: string)                                { return this.repo.findById(id); }
  createProduct(input: CreateProductInput)              { return this.repo.create(input); }
  updateProduct(id: string, input: UpdateProductInput)  { return this.repo.update(id, input); }
  deleteProduct(id: string)                             { return this.repo.delete(id); }
}

export class PromotionService {
  constructor(private repo: PromotionRepository) {}

  listBySeller(sellerId: string)                              { return this.repo.findBySeller(sellerId); }
  create(input: CreatePromotionInput)                         { return this.repo.create(input); }
  toggle(id: string, active: boolean)                         { return this.repo.update(id, { active }); }
  delete(id: string)                                          { return this.repo.delete(id); }
}

export class ReviewService {
  constructor(private repo: ReviewRepository) {}

  listBySeller(sellerId: string)                              { return this.repo.findBySeller(sellerId); }
  listByProduct(productId: string)                            { return this.repo.findByProduct(productId); }
  create(input: CreateReviewInput)                            { return this.repo.create(input); }
  reply(id: string, input: ReplyReviewInput)                  { return this.repo.reply(id, input); }
  delete(id: string)                                          { return this.repo.delete(id); }
}

export type Category =
  | 'farm_products'
  | 'processed_foods'
  | 'foods'
  | 'arts_handmade'
  | 'services';

export type SubCategory =
  // farm_products
  | 'grains_staples'
  | 'vegetables_spices'
  | 'animal_products'
  // processed_foods
  | 'pastes_powders'
  | 'oils'
  // foods
  | 'preserved_packaged'
  // arts_handmade
  | 'furniture'
  | 'iron_works'
  | 'vendor_products'
  | 'dealer_products'
  | 'materials_finishes'
  // services
  | 'utilities'
  | 'beauty_wellness'
  | 'technical'
  | 'construction_finishing'
  | 'mechanical'
  | 'rentals';

export type ProductStatus = 'draft' | 'active' | 'archived';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  subCategory: SubCategory;
  price: number;          // integer paise — ₹40 = 4000
  originalPrice?: number; // paise — for discounted items
  unit: string;           // 'kg' | 'litre' | 'piece' | 'per visit' | 'per day' etc.
  stockQuantity: number;  // units available; 0 = out of stock; 9999 for services
  sellerId: string;
  sellerName: string;
  location: string;       // e.g. "Nalgonda, Telangana"
  inStock: boolean;       // server-derived: stockQuantity > 0
  isVerified: boolean;
  isHandmade: boolean;
  shipsTo: 'mandal' | 'district' | 'state' | 'national';
  images: string[];       // ordered list of image URLs, max 5
  status: ProductStatus;
  rating: number;
  reviewCount: number;
  lowStockThreshold?: number;  // seller-set; falls back to 10 if absent
  minimumOrderQty?: number;    // wholesale MOQ
  createdAt: string;
  updatedAt: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'inStock'>;
export type UpdateProductInput = Partial<Omit<CreateProductInput, 'sellerId' | 'sellerName' | 'location'>>;

// ── Promotions ────────────────────────────────────────────────────────────────

export type PromoType = 'percent' | 'flat' | 'free_delivery';

export interface Promotion {
  id: string;
  sellerId: string;
  type: PromoType;
  value: number;     // percent: 1-100  |  flat: paise  |  free_delivery: 0
  minOrder: number;  // paise; 0 = no minimum
  validDays: number;
  active: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export type CreatePromotionInput = Omit<Promotion, 'id' | 'expiresAt' | 'createdAt' | 'updatedAt'>;
export type UpdatePromotionInput = Pick<Promotion, 'active'>;

// ── Reviews ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  sellerId: string;
  buyerId: string;
  buyerName: string;
  rating: number;    // 1-5
  text: string;
  reply?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateReviewInput = Omit<Review, 'id' | 'reply' | 'repliedAt' | 'createdAt' | 'updatedAt'>;
export interface ReplyReviewInput { reply: string; }

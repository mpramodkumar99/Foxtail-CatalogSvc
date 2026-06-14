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

export type ShipsTo = 'mandal' | 'district' | 'state' | 'national';

// draft  — seller preparing listing; hidden from buyers
// active — live on the marketplace
// archived — soft-deleted; hidden from buyers, history preserved
export type ProductStatus = 'draft' | 'active' | 'archived';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  subCategory: SubCategory;
  price: number;           // integer paise — ₹40 = 4000
  originalPrice?: number;  // paise
  unit: string;            // 'kg' | 'litre' | 'piece' | 'per visit' etc.
  stockQuantity: number;   // units available; 0 = out of stock; use 9999 for services
  sellerId: string;
  sellerName: string;
  location: string;        // e.g. "Nalgonda, Telangana"
  inStock: boolean;        // derived: stockQuantity > 0 — kept for buyer-app read compat
  isVerified: boolean;     // admin-controlled — never set by seller
  isHandmade: boolean;
  shipsTo: ShipsTo;
  images: string[];        // ordered list of image URLs/URIs, max 5
  status: ProductStatus;
  rating: number;
  reviewCount: number;
  lowStockThreshold?: number; // seller-set alert level; defaults to 10 if absent
  createdAt: string;
  updatedAt: string;
}

// What a seller submits on POST.
// inStock is derived from stockQuantity — not caller-supplied.
// isVerified, id, timestamps are server-managed.
export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isVerified' | 'inStock'>;

// What a seller may PATCH.
// Store-identity fields (sellerId, sellerName, location) are immutable after creation.
// inStock continues to be derived server-side from stockQuantity.
export type UpdateProductInput = Partial<Omit<CreateProductInput, 'sellerId' | 'sellerName' | 'location'>>;

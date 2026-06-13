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

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  subCategory: SubCategory;
  price: number;          // integer paise — ₹40 = 4000
  originalPrice?: number; // paise
  unit: string;           // 'kg' | 'litre' | 'piece' | 'per visit' | 'per day' etc.
  sellerId: string;
  sellerName: string;
  location: string;       // e.g. "Nalgonda, Telangana"
  inStock: boolean;
  isVerified: boolean;    // admin-controlled — never set by seller
  isHandmade: boolean;
  shipsTo: ShipsTo;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// What a seller submits on POST — no id/timestamps/isVerified (server-managed)
export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isVerified'>;

// What a seller may change on PATCH — store identity fields are immutable after creation
export type UpdateProductInput = Partial<Omit<CreateProductInput, 'sellerId' | 'sellerName' | 'location'>>;

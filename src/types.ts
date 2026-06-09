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

export interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory: SubCategory;
  price: number;         // integer paise — ₹40 = 4000
  originalPrice?: number; // paise — for discounted items
  unit: string;          // 'kg' | 'litre' | 'piece' | 'per visit' | 'per day' etc.
  sellerId: string;
  sellerName: string;
  location: string;      // e.g. "Nalgonda, Telangana"
  inStock: boolean;
  isVerified: boolean;
  isHandmade: boolean;
  shipsTo: 'mandal' | 'district' | 'state' | 'national';
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProductInput = Partial<CreateProductInput>;

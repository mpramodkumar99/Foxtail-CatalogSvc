import { randomUUID } from 'node:crypto';
import type {
  Product, CreateProductInput, UpdateProductInput,
  Promotion, CreatePromotionInput, UpdatePromotionInput,
  Review, CreateReviewInput, ReplyReviewInput,
} from './types.js';

export interface ProductRepository {
  findAll(filters?: { category?: string; subCategory?: string; shipsTo?: string; sellerId?: string; status?: string }): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(input: CreateProductInput): Promise<Product>;
  update(id: string, input: UpdateProductInput): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

export class InMemoryProductRepository implements ProductRepository {
  private store = new Map<string, Product>();

  constructor() { this.seed(); }

  async findAll(filters?: { category?: string; subCategory?: string; shipsTo?: string; sellerId?: string; status?: string }): Promise<Product[]> {
    let results = [...this.store.values()];
    if (filters?.category)    results = results.filter(p => p.category === filters.category);
    if (filters?.subCategory) results = results.filter(p => p.subCategory === filters.subCategory);
    if (filters?.shipsTo)     results = results.filter(p => p.shipsTo === filters.shipsTo);
    if (filters?.sellerId)    results = results.filter(p => p.sellerId === filters.sellerId);
    if (filters?.status)      results = results.filter(p => p.status === filters.status);
    return results;
  }

  async findById(id: string): Promise<Product | null> {
    return this.store.get(id) ?? null;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const now = new Date().toISOString();
    const product: Product = {
      ...input,
      id: randomUUID(),
      inStock: input.stockQuantity > 0,
      images: input.images ?? [],
      status: input.status ?? 'active',
      description: input.description ?? '',
      createdAt: now,
      updatedAt: now,
    };
    this.store.set(product.id, product);
    return product;
  }

  async update(id: string, input: UpdateProductInput): Promise<Product | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated: Product = {
      ...existing,
      ...input,
      inStock: typeof input.stockQuantity === 'number' ? input.stockQuantity > 0 : existing.inStock,
      updatedAt: new Date().toISOString(),
    };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }

  private seed() {
    type SeedItem = Pick<Product,
      'name' | 'category' | 'subCategory' | 'price' | 'unit' |
      'sellerId' | 'sellerName' | 'location' | 'inStock' |
      'isVerified' | 'isHandmade' | 'shipsTo' | 'rating' | 'reviewCount'
    > & Partial<Pick<Product, 'description' | 'originalPrice' | 'stockQuantity' | 'images' | 'status' | 'lowStockThreshold' | 'minimumOrderQty'>>;
    const items: SeedItem[] = [

      // ── FARM PRODUCTS & COMMODITIES — Grains / Staples ──────────────────────
      {
        name: 'Ground Nuts', category: 'farm_products', subCategory: 'grains_staples',
        price: 9000, unit: 'kg', sellerId: 'seller-101', sellerName: 'Nizamabad Agri Co-op',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.5, reviewCount: 112,
      },
      {
        name: 'Corn (Maize)', category: 'farm_products', subCategory: 'grains_staples',
        price: 3200, unit: 'kg', sellerId: 'seller-102', sellerName: 'Armoor Farmers Hub',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.3, reviewCount: 67,
      },
      {
        name: 'Sona Masoori Rice', category: 'farm_products', subCategory: 'grains_staples',
        price: 6500, unit: 'kg', sellerId: 'seller-103', sellerName: 'Krishna Farms',
        location: 'Khammam, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.7, reviewCount: 203,
      },
      {
        name: 'Wheat (Godavari)', category: 'farm_products', subCategory: 'grains_staples',
        price: 3800, unit: 'kg', sellerId: 'seller-104', sellerName: 'Bhadradri Grains',
        location: 'Bhadradri, Telangana', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'state', rating: 4.1, reviewCount: 44,
      },

      // ── FARM PRODUCTS & COMMODITIES — Vegetables & Spices ───────────────────
      {
        name: 'Turmeric (Nizamabad Gold)', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 18000, unit: 'kg', sellerId: 'seller-105', sellerName: 'Spice Route Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.9, reviewCount: 341,
      },
      {
        name: 'Fresh Onions', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 4500, unit: 'kg', sellerId: 'seller-106', sellerName: 'Armoor Vegetable Market',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.2, reviewCount: 88,
      },
      {
        name: 'Fresh Ginger', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 16000, unit: 'kg', sellerId: 'seller-107', sellerName: 'Adilabad Spice Farm',
        location: 'Adilabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.6, reviewCount: 129,
      },
      {
        name: 'Garlic', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 22000, unit: 'kg', sellerId: 'seller-107', sellerName: 'Adilabad Spice Farm',
        location: 'Adilabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.4, reviewCount: 95,
      },
      {
        name: 'Potatoes', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 3500, unit: 'kg', sellerId: 'seller-106', sellerName: 'Armoor Vegetable Market',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.0, reviewCount: 52,
      },

      // ── FARM PRODUCTS & COMMODITIES — Animal Products ───────────────────────
      {
        name: 'Fresh Fish', category: 'farm_products', subCategory: 'animal_products',
        price: 28000, unit: 'kg', sellerId: 'seller-108', sellerName: 'Godavari Fish Market',
        location: 'Bhadradri, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.7, reviewCount: 178,
      },
      {
        name: 'Farm Chicken', category: 'farm_products', subCategory: 'animal_products',
        price: 24000, unit: 'kg', sellerId: 'seller-109', sellerName: 'Nalgonda Poultry',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.5, reviewCount: 143,
      },
      {
        name: 'Mutton', category: 'farm_products', subCategory: 'animal_products',
        price: 78000, unit: 'kg', sellerId: 'seller-110', sellerName: 'Warangal Meat Co-op',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.6, reviewCount: 97,
      },
      {
        name: 'Tiger Prawns', category: 'farm_products', subCategory: 'animal_products',
        price: 65000, unit: 'kg', sellerId: 'seller-111', sellerName: 'Godavari Aqua Farm',
        location: 'Bhadradri, Telangana', inStock: false, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.8, reviewCount: 214,
      },
      {
        name: 'Fresh Cow Milk', category: 'farm_products', subCategory: 'animal_products',
        price: 6500, unit: 'litre', sellerId: 'seller-112', sellerName: 'Desi Dairy Armoor',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.9, reviewCount: 302,
      },

      // ── PROCESSED FOODS — Pastes & Powders ──────────────────────────────────
      {
        name: 'Ginger Garlic Paste', category: 'processed_foods', subCategory: 'pastes_powders',
        price: 9000, unit: '500g', sellerId: 'seller-113', sellerName: 'Amma Kitchen',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.8, reviewCount: 267,
      },
      {
        name: 'Sesame Powder (Nuvvula Podi)', category: 'processed_foods', subCategory: 'pastes_powders',
        price: 28000, unit: 'kg', sellerId: 'seller-114', sellerName: 'Telangana Spice House',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.7, reviewCount: 189,
      },
      {
        name: 'Coriander Powder', category: 'processed_foods', subCategory: 'pastes_powders',
        price: 14000, unit: 'kg', sellerId: 'seller-113', sellerName: 'Amma Kitchen',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.6, reviewCount: 134,
      },

      // ── PROCESSED FOODS — Oils ───────────────────────────────────────────────
      {
        name: 'Cold Pressed Groundnut Oil', category: 'processed_foods', subCategory: 'oils',
        price: 38000, unit: 'litre', sellerId: 'seller-115', sellerName: 'Village Mill Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.9, reviewCount: 412,
      },
      {
        name: 'Cold Pressed Sesame Oil', category: 'processed_foods', subCategory: 'oils',
        price: 55000, unit: 'litre', sellerId: 'seller-115', sellerName: 'Village Mill Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.8, reviewCount: 287,
      },

      // ── FOODS — Preserved & Packaged ────────────────────────────────────────
      {
        name: 'Avakaya (Mango Pickle)', category: 'foods', subCategory: 'preserved_packaged',
        price: 22000, unit: '500g', sellerId: 'seller-113', sellerName: 'Amma Kitchen',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.9, reviewCount: 523,
      },
      {
        name: 'Dried Banana Chips', category: 'foods', subCategory: 'preserved_packaged',
        price: 18000, unit: '250g', sellerId: 'seller-116', sellerName: 'Karimnagar Snacks',
        location: 'Karimnagar, Telangana', inStock: true, isVerified: false, isHandmade: true,
        shipsTo: 'state', rating: 4.3, reviewCount: 76,
      },
      {
        name: 'Dry Fish (Royyala Iguru)', category: 'foods', subCategory: 'preserved_packaged',
        price: 48000, unit: 'kg', sellerId: 'seller-111', sellerName: 'Godavari Aqua Farm',
        location: 'Bhadradri, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.6, reviewCount: 148,
      },
      {
        name: 'Packaged Murmura Mix', category: 'foods', subCategory: 'preserved_packaged',
        price: 8000, unit: '200g', sellerId: 'seller-116', sellerName: 'Karimnagar Snacks',
        location: 'Karimnagar, Telangana', inStock: true, isVerified: false, isHandmade: true,
        shipsTo: 'state', rating: 4.1, reviewCount: 39,
      },
      {
        name: 'Fresh Baked Bread', category: 'foods', subCategory: 'preserved_packaged',
        price: 4500, unit: 'loaf', sellerId: 'seller-117', sellerName: 'Morning Bakery',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'mandal', rating: 4.4, reviewCount: 61,
      },

      // ── ARTS / HANDMADE — Furniture ──────────────────────────────────────────
      {
        name: 'Handcrafted Teak Sofa Set', category: 'arts_handmade', subCategory: 'furniture',
        price: 4500000, unit: 'set', sellerId: 'seller-118', sellerName: 'Karimnagar Wood Crafts',
        location: 'Karimnagar, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.7, reviewCount: 28,
      },

      // ── ARTS / HANDMADE — Iron Works ─────────────────────────────────────────
      {
        name: 'Iron Gates (Customizable)', category: 'arts_handmade', subCategory: 'iron_works',
        price: 2500000, unit: 'piece', sellerId: 'seller-119', sellerName: 'Warangal Iron Works',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.5, reviewCount: 34,
      },

      // ── ARTS / HANDMADE — Vendor / Sponsor Products ───────────────────────
      {
        name: 'Branded Vendor Merchandise', category: 'arts_handmade', subCategory: 'vendor_products',
        price: 50000, unit: 'piece', sellerId: 'seller-120', sellerName: 'HC Vendor Network',
        location: 'Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.0, reviewCount: 15,
      },

      // ── ARTS / HANDMADE — Dealer Products ────────────────────────────────────
      {
        name: 'Cement (53 Grade)', category: 'arts_handmade', subCategory: 'dealer_products',
        price: 45000, unit: '50kg bag', sellerId: 'seller-121', sellerName: 'Nalgonda Building Supplies',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.2, reviewCount: 57,
      },
      {
        name: 'Iron Rods (TMT)', category: 'arts_handmade', subCategory: 'dealer_products',
        price: 85000, unit: 'quintal', sellerId: 'seller-121', sellerName: 'Nalgonda Building Supplies',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.3, reviewCount: 41,
      },
      {
        name: 'Roofing Sheets (GI)', category: 'arts_handmade', subCategory: 'dealer_products',
        price: 120000, unit: 'bundle', sellerId: 'seller-121', sellerName: 'Nalgonda Building Supplies',
        location: 'Nalgonda, Telangana', inStock: false, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.1, reviewCount: 23,
      },

      // ── ARTS / HANDMADE — Materials & Finishes ───────────────────────────────
      {
        name: 'Copper Wire (10 AWG)', category: 'arts_handmade', subCategory: 'materials_finishes',
        price: 75000, unit: 'roll', sellerId: 'seller-122', sellerName: 'Hyderabad Metals',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.4, reviewCount: 62,
      },
      {
        name: 'Interior Wall Paint (5L)', category: 'arts_handmade', subCategory: 'materials_finishes',
        price: 180000, unit: '5L tin', sellerId: 'seller-123', sellerName: 'Decor Hub Warangal',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.6, reviewCount: 88,
      },
      {
        name: 'Handwoven Ikat Saree', category: 'arts_handmade', subCategory: 'materials_finishes',
        price: 349900, originalPrice: 450000, unit: 'piece',
        sellerId: 'seller-124', sellerName: 'Pochampally Weavers',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.9, reviewCount: 89,
      },

      // ── SERVICES — Utilities ──────────────────────────────────────────────────
      {
        name: 'Electrician Service', category: 'services', subCategory: 'utilities',
        price: 50000, unit: 'per visit', sellerId: 'seller-201', sellerName: 'Quick Fix Electricals',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.5, reviewCount: 174,
      },
      {
        name: 'Plumber Service', category: 'services', subCategory: 'utilities',
        price: 45000, unit: 'per visit', sellerId: 'seller-202', sellerName: 'AquaFix Plumbing',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.3, reviewCount: 98,
      },
      {
        name: 'Carpenter Service', category: 'services', subCategory: 'utilities',
        price: 60000, unit: 'per visit', sellerId: 'seller-203', sellerName: 'WoodCraft Services',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'district', rating: 4.4, reviewCount: 67,
      },

      // ── SERVICES — Beauty & Wellness ─────────────────────────────────────────
      {
        name: 'Beautician (Home Visit)', category: 'services', subCategory: 'beauty_wellness',
        price: 80000, unit: 'per session', sellerId: 'seller-204', sellerName: 'Glamour At Home',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.7, reviewCount: 213,
      },
      {
        name: 'Home Maid Service', category: 'services', subCategory: 'beauty_wellness',
        price: 35000, unit: 'per day', sellerId: 'seller-205', sellerName: 'CleanHome Services',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.2, reviewCount: 88,
      },
      {
        name: 'Mason / Construction Labour', category: 'services', subCategory: 'beauty_wellness',
        price: 70000, unit: 'per day', sellerId: 'seller-206', sellerName: 'Build Right Labour',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'district', rating: 4.1, reviewCount: 45,
      },

      // ── SERVICES — Technical ─────────────────────────────────────────────────
      {
        name: 'AC Service & Repair', category: 'services', subCategory: 'technical',
        price: 120000, unit: 'per visit', sellerId: 'seller-207', sellerName: 'CoolTech Services',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.6, reviewCount: 156,
      },
      {
        name: 'Refrigerator / Washing Machine Repair', category: 'services', subCategory: 'technical',
        price: 90000, unit: 'per visit', sellerId: 'seller-207', sellerName: 'CoolTech Services',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.5, reviewCount: 132,
      },

      // ── SERVICES — Construction & Finishing ──────────────────────────────────
      {
        name: 'Painting Service (Interior)', category: 'services', subCategory: 'construction_finishing',
        price: 1500000, unit: 'per room', sellerId: 'seller-208', sellerName: 'PaintPro Telangana',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.5, reviewCount: 72,
      },
      {
        name: 'Tile Flooring Work', category: 'services', subCategory: 'construction_finishing',
        price: 8000, unit: 'per sq.ft', sellerId: 'seller-209', sellerName: 'Tile Masters',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.7, reviewCount: 94,
      },
      {
        name: 'POP Ceiling Work', category: 'services', subCategory: 'construction_finishing',
        price: 12000, unit: 'per sq.ft', sellerId: 'seller-210', sellerName: 'Interior Craft Co.',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.6, reviewCount: 83,
      },
      {
        name: 'Interior Design & Work', category: 'services', subCategory: 'construction_finishing',
        price: 50000, unit: 'per sq.ft', sellerId: 'seller-210', sellerName: 'Interior Craft Co.',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.8, reviewCount: 121,
      },

      // ── SERVICES — Mechanical ────────────────────────────────────────────────
      {
        name: 'Bike Mechanic', category: 'services', subCategory: 'mechanical',
        price: 30000, unit: 'per service', sellerId: 'seller-211', sellerName: 'SpeedFix Garage',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.3, reviewCount: 107,
      },
      {
        name: 'Auto Rickshaw Mechanic', category: 'services', subCategory: 'mechanical',
        price: 50000, unit: 'per service', sellerId: 'seller-211', sellerName: 'SpeedFix Garage',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.2, reviewCount: 63,
      },
      {
        name: 'Car Service & Repair', category: 'services', subCategory: 'mechanical',
        price: 150000, unit: 'per service', sellerId: 'seller-212', sellerName: 'AutoCare Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.6, reviewCount: 145,
      },

      // ── SERVICES — Rentals ───────────────────────────────────────────────────
      {
        name: 'Vehicle Rental (Tempo)', category: 'services', subCategory: 'rentals',
        price: 250000, unit: 'per day', sellerId: 'seller-213', sellerName: 'Nizamabad Transport Co.',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.4, reviewCount: 55,
      },
      {
        name: 'Banquet Hall Rental', category: 'services', subCategory: 'rentals',
        price: 5000000, unit: 'per day', sellerId: 'seller-214', sellerName: 'Grand Hall Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.7, reviewCount: 38,
      },
      {
        name: 'Resort Booking', category: 'services', subCategory: 'rentals',
        price: 800000, unit: 'per night', sellerId: 'seller-215', sellerName: 'Telangana Resorts',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.8, reviewCount: 174,
      },
    ];

    const now = new Date().toISOString();
    for (const item of items) {
      const product: Product = {
        description: '',
        stockQuantity: item.inStock ? 50 : 0,
        images: [],
        status: 'active',
        ...item,
        id: randomUUID(),
        inStock: item.inStock,
        createdAt: now,
        updatedAt: now,
      };
      this.store.set(product.id, product);
    }
  }
}

// ── PromotionRepository ───────────────────────────────────────────────────────

export interface PromotionRepository {
  findBySeller(sellerId: string): Promise<Promotion[]>;
  create(input: CreatePromotionInput): Promise<Promotion>;
  update(id: string, input: UpdatePromotionInput): Promise<Promotion | null>;
  delete(id: string): Promise<boolean>;
}

export class InMemoryPromotionRepository implements PromotionRepository {
  private store = new Map<string, Promotion>();

  async findBySeller(sellerId: string): Promise<Promotion[]> {
    return [...this.store.values()]
      .filter(p => p.sellerId === sellerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async create(input: CreatePromotionInput): Promise<Promotion> {
    const now       = new Date().toISOString();
    const expiresAt = new Date(Date.now() + input.validDays * 86400000).toISOString();
    const promo: Promotion = { ...input, id: randomUUID(), expiresAt, createdAt: now, updatedAt: now };
    this.store.set(promo.id, promo);
    return promo;
  }

  async update(id: string, input: UpdatePromotionInput): Promise<Promotion | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input, updatedAt: new Date().toISOString() };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }
}

// ── ReviewRepository ──────────────────────────────────────────────────────────

export interface ReviewRepository {
  findBySeller(sellerId: string): Promise<Review[]>;
  findByProduct(productId: string): Promise<Review[]>;
  create(input: CreateReviewInput): Promise<Review>;
  reply(id: string, input: ReplyReviewInput): Promise<Review | null>;
  delete(id: string): Promise<boolean>;
}

export class InMemoryReviewRepository implements ReviewRepository {
  private store = new Map<string, Review>();

  async findBySeller(sellerId: string): Promise<Review[]> {
    return [...this.store.values()]
      .filter(r => r.sellerId === sellerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return [...this.store.values()]
      .filter(r => r.productId === productId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async create(input: CreateReviewInput): Promise<Review> {
    const now = new Date().toISOString();
    const review: Review = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
    this.store.set(review.id, review);
    return review;
  }

  async reply(id: string, input: ReplyReviewInput): Promise<Review | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const now = new Date().toISOString();
    const updated = { ...existing, reply: input.reply, repliedAt: now, updatedAt: now };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }
}

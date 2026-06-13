import { randomUUID } from 'node:crypto';
import type { Product, CreateProductInput, UpdateProductInput } from './types.js';

export interface ProductRepository {
  findAll(filters?: {
    category?: string;
    subCategory?: string;
    shipsTo?: string;
    sellerId?: string;
  }): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(input: CreateProductInput): Promise<Product>;
  update(id: string, input: UpdateProductInput): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

export class InMemoryProductRepository implements ProductRepository {
  private store = new Map<string, Product>();

  constructor() { this.seed(); }

  async findAll(filters?: {
    category?: string;
    subCategory?: string;
    shipsTo?: string;
    sellerId?: string;
  }): Promise<Product[]> {
    let results = [...this.store.values()];
    if (filters?.category)    results = results.filter(p => p.category    === filters.category);
    if (filters?.subCategory) results = results.filter(p => p.subCategory === filters.subCategory);
    if (filters?.shipsTo)     results = results.filter(p => p.shipsTo     === filters.shipsTo);
    if (filters?.sellerId)    results = results.filter(p => p.sellerId    === filters.sellerId);
    return results;
  }

  async findById(id: string): Promise<Product | null> {
    return this.store.get(id) ?? null;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const now = new Date().toISOString();
    const product: Product = {
      ...input,
      id:         randomUUID(),
      isVerified: false,   // admin grants verification — never caller-supplied
      createdAt:  now,
      updatedAt:  now,
    };
    this.store.set(product.id, product);
    return product;
  }

  async update(id: string, input: UpdateProductInput): Promise<Product | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated: Product = { ...existing, ...input, updatedAt: new Date().toISOString() };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }

  // ── Seed data ───────────────────────────────────────────────────────────────
  // Typed as Omit<Product, 'id' | 'createdAt' | 'updatedAt'> so each seed item
  // can carry its own isVerified value (admin-granted for trusted vendors).
  private seed() {
    const items: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [

      // ── FARM PRODUCTS — Grains / Staples ────────────────────────────────────
      {
        name: 'Ground Nuts', description: '', category: 'farm_products', subCategory: 'grains_staples',
        price: 9000, unit: 'kg', sellerId: 'seller-101', sellerName: 'Nizamabad Agri Co-op',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.5, reviewCount: 112,
      },
      {
        name: 'Corn (Maize)', description: '', category: 'farm_products', subCategory: 'grains_staples',
        price: 3200, unit: 'kg', sellerId: 'seller-102', sellerName: 'Armoor Farmers Hub',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.3, reviewCount: 67,
      },
      {
        name: 'Sona Masoori Rice', description: '', category: 'farm_products', subCategory: 'grains_staples',
        price: 6500, unit: 'kg', sellerId: 'seller-103', sellerName: 'Krishna Farms',
        location: 'Khammam, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.7, reviewCount: 203,
      },
      {
        name: 'Wheat (Godavari)', description: '', category: 'farm_products', subCategory: 'grains_staples',
        price: 3800, unit: 'kg', sellerId: 'seller-104', sellerName: 'Bhadradri Grains',
        location: 'Bhadradri, Telangana', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'state', rating: 4.1, reviewCount: 44,
      },

      // ── FARM PRODUCTS — Vegetables & Spices ─────────────────────────────────
      {
        name: 'Turmeric (Nizamabad Gold)', description: 'Premium Nizamabad turmeric, high curcumin content.', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 18000, unit: 'kg', sellerId: 'seller-105', sellerName: 'Spice Route Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.9, reviewCount: 341,
      },
      {
        name: 'Fresh Onions', description: '', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 4500, unit: 'kg', sellerId: 'seller-106', sellerName: 'Armoor Vegetable Market',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.2, reviewCount: 88,
      },
      {
        name: 'Fresh Ginger', description: '', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 16000, unit: 'kg', sellerId: 'seller-107', sellerName: 'Adilabad Spice Farm',
        location: 'Adilabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.6, reviewCount: 129,
      },
      {
        name: 'Garlic', description: '', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 22000, unit: 'kg', sellerId: 'seller-107', sellerName: 'Adilabad Spice Farm',
        location: 'Adilabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.4, reviewCount: 95,
      },
      {
        name: 'Potatoes', description: '', category: 'farm_products', subCategory: 'vegetables_spices',
        price: 3500, unit: 'kg', sellerId: 'seller-106', sellerName: 'Armoor Vegetable Market',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.0, reviewCount: 52,
      },

      // ── FARM PRODUCTS — Animal Products ─────────────────────────────────────
      {
        name: 'Fresh Fish', description: '', category: 'farm_products', subCategory: 'animal_products',
        price: 28000, unit: 'kg', sellerId: 'seller-108', sellerName: 'Godavari Fish Market',
        location: 'Bhadradri, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.7, reviewCount: 178,
      },
      {
        name: 'Farm Chicken', description: '', category: 'farm_products', subCategory: 'animal_products',
        price: 24000, unit: 'kg', sellerId: 'seller-109', sellerName: 'Nalgonda Poultry',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.5, reviewCount: 143,
      },
      {
        name: 'Mutton', description: '', category: 'farm_products', subCategory: 'animal_products',
        price: 78000, unit: 'kg', sellerId: 'seller-110', sellerName: 'Warangal Meat Co-op',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.6, reviewCount: 97,
      },
      {
        name: 'Tiger Prawns', description: '', category: 'farm_products', subCategory: 'animal_products',
        price: 65000, unit: 'kg', sellerId: 'seller-111', sellerName: 'Godavari Aqua Farm',
        location: 'Bhadradri, Telangana', inStock: false, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.8, reviewCount: 214,
      },
      {
        name: 'Fresh Cow Milk', description: 'Farm-fresh A2 cow milk, delivered same day.', category: 'farm_products', subCategory: 'animal_products',
        price: 6500, unit: 'litre', sellerId: 'seller-112', sellerName: 'Desi Dairy Armoor',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.9, reviewCount: 302,
      },

      // ── PROCESSED FOODS — Pastes & Powders ──────────────────────────────────
      {
        name: 'Ginger Garlic Paste', description: 'Fresh ground, no preservatives.', category: 'processed_foods', subCategory: 'pastes_powders',
        price: 9000, unit: '500g', sellerId: 'seller-113', sellerName: 'Amma Kitchen',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.8, reviewCount: 267,
      },
      {
        name: 'Sesame Powder (Nuvvula Podi)', description: '', category: 'processed_foods', subCategory: 'pastes_powders',
        price: 28000, unit: 'kg', sellerId: 'seller-114', sellerName: 'Telangana Spice House',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.7, reviewCount: 189,
      },
      {
        name: 'Coriander Powder', description: '', category: 'processed_foods', subCategory: 'pastes_powders',
        price: 14000, unit: 'kg', sellerId: 'seller-113', sellerName: 'Amma Kitchen',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.6, reviewCount: 134,
      },

      // ── PROCESSED FOODS — Oils ───────────────────────────────────────────────
      {
        name: 'Cold Pressed Groundnut Oil', description: 'Wood-pressed, unrefined. No chemicals.', category: 'processed_foods', subCategory: 'oils',
        price: 38000, unit: 'litre', sellerId: 'seller-115', sellerName: 'Village Mill Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.9, reviewCount: 412,
      },
      {
        name: 'Cold Pressed Sesame Oil', description: '', category: 'processed_foods', subCategory: 'oils',
        price: 55000, unit: 'litre', sellerId: 'seller-115', sellerName: 'Village Mill Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.8, reviewCount: 287,
      },

      // ── FOODS — Preserved & Packaged ────────────────────────────────────────
      {
        name: 'Avakaya (Mango Pickle)', description: 'Traditional Andhra style raw mango pickle.', category: 'foods', subCategory: 'preserved_packaged',
        price: 22000, unit: '500g', sellerId: 'seller-113', sellerName: 'Amma Kitchen',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.9, reviewCount: 523,
      },
      {
        name: 'Dried Banana Chips', description: '', category: 'foods', subCategory: 'preserved_packaged',
        price: 18000, unit: '250g', sellerId: 'seller-116', sellerName: 'Karimnagar Snacks',
        location: 'Karimnagar, Telangana', inStock: true, isVerified: false, isHandmade: true,
        shipsTo: 'state', rating: 4.3, reviewCount: 76,
      },
      {
        name: 'Dry Fish (Royyala Iguru)', description: '', category: 'foods', subCategory: 'preserved_packaged',
        price: 48000, unit: 'kg', sellerId: 'seller-111', sellerName: 'Godavari Aqua Farm',
        location: 'Bhadradri, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.6, reviewCount: 148,
      },
      {
        name: 'Packaged Murmura Mix', description: '', category: 'foods', subCategory: 'preserved_packaged',
        price: 8000, unit: '200g', sellerId: 'seller-116', sellerName: 'Karimnagar Snacks',
        location: 'Karimnagar, Telangana', inStock: true, isVerified: false, isHandmade: true,
        shipsTo: 'state', rating: 4.1, reviewCount: 39,
      },
      {
        name: 'Fresh Baked Bread', description: '', category: 'foods', subCategory: 'preserved_packaged',
        price: 4500, unit: 'loaf', sellerId: 'seller-117', sellerName: 'Morning Bakery',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'mandal', rating: 4.4, reviewCount: 61,
      },

      // ── ARTS / HANDMADE — Furniture ──────────────────────────────────────────
      {
        name: 'Handcrafted Teak Sofa Set', description: '', category: 'arts_handmade', subCategory: 'furniture',
        price: 4500000, unit: 'set', sellerId: 'seller-118', sellerName: 'Karimnagar Wood Crafts',
        location: 'Karimnagar, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.7, reviewCount: 28,
      },

      // ── ARTS / HANDMADE — Iron Works ─────────────────────────────────────────
      {
        name: 'Iron Gates (Customizable)', description: '', category: 'arts_handmade', subCategory: 'iron_works',
        price: 2500000, unit: 'piece', sellerId: 'seller-119', sellerName: 'Warangal Iron Works',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'state', rating: 4.5, reviewCount: 34,
      },

      // ── ARTS / HANDMADE — Vendor Products ────────────────────────────────────
      {
        name: 'Branded Vendor Merchandise', description: '', category: 'arts_handmade', subCategory: 'vendor_products',
        price: 50000, unit: 'piece', sellerId: 'seller-120', sellerName: 'HC Vendor Network',
        location: 'Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.0, reviewCount: 15,
      },

      // ── ARTS / HANDMADE — Dealer Products ────────────────────────────────────
      {
        name: 'Cement (53 Grade)', description: '', category: 'arts_handmade', subCategory: 'dealer_products',
        price: 45000, unit: '50kg bag', sellerId: 'seller-121', sellerName: 'Nalgonda Building Supplies',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.2, reviewCount: 57,
      },
      {
        name: 'Iron Rods (TMT)', description: '', category: 'arts_handmade', subCategory: 'dealer_products',
        price: 85000, unit: 'quintal', sellerId: 'seller-121', sellerName: 'Nalgonda Building Supplies',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.3, reviewCount: 41,
      },
      {
        name: 'Roofing Sheets (GI)', description: '', category: 'arts_handmade', subCategory: 'dealer_products',
        price: 120000, unit: 'bundle', sellerId: 'seller-121', sellerName: 'Nalgonda Building Supplies',
        location: 'Nalgonda, Telangana', inStock: false, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.1, reviewCount: 23,
      },

      // ── ARTS / HANDMADE — Materials & Finishes ───────────────────────────────
      {
        name: 'Copper Wire (10 AWG)', description: '', category: 'arts_handmade', subCategory: 'materials_finishes',
        price: 75000, unit: 'roll', sellerId: 'seller-122', sellerName: 'Hyderabad Metals',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.4, reviewCount: 62,
      },
      {
        name: 'Interior Wall Paint (5L)', description: '', category: 'arts_handmade', subCategory: 'materials_finishes',
        price: 180000, unit: '5L tin', sellerId: 'seller-123', sellerName: 'Decor Hub Warangal',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.6, reviewCount: 88,
      },
      {
        name: 'Handwoven Ikat Saree', description: 'Traditional Pochampally double-ikat weave.', category: 'arts_handmade', subCategory: 'materials_finishes',
        price: 349900, originalPrice: 450000, unit: 'piece',
        sellerId: 'seller-124', sellerName: 'Pochampally Weavers',
        location: 'Nalgonda, Telangana', inStock: true, isVerified: true, isHandmade: true,
        shipsTo: 'national', rating: 4.9, reviewCount: 89,
      },

      // ── SERVICES — Utilities ──────────────────────────────────────────────────
      {
        name: 'Electrician Service', description: '', category: 'services', subCategory: 'utilities',
        price: 50000, unit: 'per visit', sellerId: 'seller-201', sellerName: 'Quick Fix Electricals',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.5, reviewCount: 174,
      },
      {
        name: 'Plumber Service', description: '', category: 'services', subCategory: 'utilities',
        price: 45000, unit: 'per visit', sellerId: 'seller-202', sellerName: 'AquaFix Plumbing',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.3, reviewCount: 98,
      },
      {
        name: 'Carpenter Service', description: '', category: 'services', subCategory: 'utilities',
        price: 60000, unit: 'per visit', sellerId: 'seller-203', sellerName: 'WoodCraft Services',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'district', rating: 4.4, reviewCount: 67,
      },

      // ── SERVICES — Beauty & Wellness ─────────────────────────────────────────
      {
        name: 'Beautician (Home Visit)', description: '', category: 'services', subCategory: 'beauty_wellness',
        price: 80000, unit: 'per session', sellerId: 'seller-204', sellerName: 'Glamour At Home',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.7, reviewCount: 213,
      },
      {
        name: 'Home Maid Service', description: '', category: 'services', subCategory: 'beauty_wellness',
        price: 35000, unit: 'per day', sellerId: 'seller-205', sellerName: 'CleanHome Services',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'mandal', rating: 4.2, reviewCount: 88,
      },
      {
        name: 'Mason / Construction Labour', description: '', category: 'services', subCategory: 'beauty_wellness',
        price: 70000, unit: 'per day', sellerId: 'seller-206', sellerName: 'Build Right Labour',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'district', rating: 4.1, reviewCount: 45,
      },

      // ── SERVICES — Technical ─────────────────────────────────────────────────
      {
        name: 'AC Service & Repair', description: '', category: 'services', subCategory: 'technical',
        price: 120000, unit: 'per visit', sellerId: 'seller-207', sellerName: 'CoolTech Services',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.6, reviewCount: 156,
      },
      {
        name: 'Refrigerator / Washing Machine Repair', description: '', category: 'services', subCategory: 'technical',
        price: 90000, unit: 'per visit', sellerId: 'seller-207', sellerName: 'CoolTech Services',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.5, reviewCount: 132,
      },

      // ── SERVICES — Construction & Finishing ──────────────────────────────────
      {
        name: 'Painting Service (Interior)', description: '', category: 'services', subCategory: 'construction_finishing',
        price: 1500000, unit: 'per room', sellerId: 'seller-208', sellerName: 'PaintPro Telangana',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.5, reviewCount: 72,
      },
      {
        name: 'Tile Flooring Work', description: '', category: 'services', subCategory: 'construction_finishing',
        price: 8000, unit: 'per sq.ft', sellerId: 'seller-209', sellerName: 'Tile Masters',
        location: 'Warangal, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.7, reviewCount: 94,
      },
      {
        name: 'POP Ceiling Work', description: '', category: 'services', subCategory: 'construction_finishing',
        price: 12000, unit: 'per sq.ft', sellerId: 'seller-210', sellerName: 'Interior Craft Co.',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.6, reviewCount: 83,
      },
      {
        name: 'Interior Design & Work', description: '', category: 'services', subCategory: 'construction_finishing',
        price: 50000, unit: 'per sq.ft', sellerId: 'seller-210', sellerName: 'Interior Craft Co.',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.8, reviewCount: 121,
      },

      // ── SERVICES — Mechanical ────────────────────────────────────────────────
      {
        name: 'Bike Mechanic', description: '', category: 'services', subCategory: 'mechanical',
        price: 30000, unit: 'per service', sellerId: 'seller-211', sellerName: 'SpeedFix Garage',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.3, reviewCount: 107,
      },
      {
        name: 'Auto Rickshaw Mechanic', description: '', category: 'services', subCategory: 'mechanical',
        price: 50000, unit: 'per service', sellerId: 'seller-211', sellerName: 'SpeedFix Garage',
        location: 'Armoor, Nizamabad', inStock: true, isVerified: false, isHandmade: false,
        shipsTo: 'mandal', rating: 4.2, reviewCount: 63,
      },
      {
        name: 'Car Service & Repair', description: '', category: 'services', subCategory: 'mechanical',
        price: 150000, unit: 'per service', sellerId: 'seller-212', sellerName: 'AutoCare Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.6, reviewCount: 145,
      },

      // ── SERVICES — Rentals ───────────────────────────────────────────────────
      {
        name: 'Vehicle Rental (Tempo)', description: '', category: 'services', subCategory: 'rentals',
        price: 250000, unit: 'per day', sellerId: 'seller-213', sellerName: 'Nizamabad Transport Co.',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'district', rating: 4.4, reviewCount: 55,
      },
      {
        name: 'Banquet Hall Rental', description: '', category: 'services', subCategory: 'rentals',
        price: 5000000, unit: 'per day', sellerId: 'seller-214', sellerName: 'Grand Hall Nizamabad',
        location: 'Nizamabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'state', rating: 4.7, reviewCount: 38,
      },
      {
        name: 'Resort Booking', description: '', category: 'services', subCategory: 'rentals',
        price: 800000, unit: 'per night', sellerId: 'seller-215', sellerName: 'Telangana Resorts',
        location: 'Hyderabad, Telangana', inStock: true, isVerified: true, isHandmade: false,
        shipsTo: 'national', rating: 4.8, reviewCount: 174,
      },
    ];

    const now = new Date().toISOString();
    for (const item of items) {
      const product: Product = { ...item, id: randomUUID(), createdAt: now, updatedAt: now };
      this.store.set(product.id, product);
    }
  }
}

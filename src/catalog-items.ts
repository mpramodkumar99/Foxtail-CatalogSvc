export interface CatalogItem {
  name:        string;
  category:    string;
  subCategory: string;
  unit:        string;
  description: string;
  keywords:    string[];   // extra search terms
}

export const CATALOG_ITEMS: CatalogItem[] = [
  // ── Farm products → grains & staples ──────────────────────────────────────
  { name: 'Sona Masoori Rice',      category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Premium quality Sona Masoori white rice', keywords: ['rice', 'sona', 'masoori', 'akki'] },
  { name: 'Basmati Rice',           category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Long-grain aromatic Basmati rice', keywords: ['rice', 'basmati'] },
  { name: 'Boiled Rice',            category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Steamed and dried boiled rice', keywords: ['rice', 'ukdalu'] },
  { name: 'Wheat (Godavari)',       category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Hard red wheat from Godavari delta', keywords: ['wheat', 'godavari', 'goduma'] },
  { name: 'Wheat (Sharbati)',       category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Premium Sharbati wheat', keywords: ['wheat', 'sharbati'] },
  { name: 'Corn (Maize)',           category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Yellow maize for food and feed', keywords: ['corn', 'maize', 'makka', 'mokka'] },
  { name: 'Ground Nuts',            category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Raw groundnuts / peanuts', keywords: ['peanuts', 'groundnut', 'shenga', 'verusenaga'] },
  { name: 'Soybean',               category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Whole soybean seeds', keywords: ['soy', 'soya'] },
  { name: 'Jowar (Sorghum)',       category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'White sorghum grain', keywords: ['jowar', 'sorghum', 'jola'] },
  { name: 'Bajra (Pearl Millet)',  category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Pearl millet whole grain', keywords: ['bajra', 'millet', 'sajja'] },
  { name: 'Ragi (Finger Millet)', category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Finger millet grain', keywords: ['ragi', 'nachni', 'ragulu'] },
  { name: 'Black Gram (Urad Dal)',  category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Whole black gram', keywords: ['urad', 'black gram', 'minapa'] },
  { name: 'Green Gram (Moong)',    category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Whole green gram / moong', keywords: ['moong', 'green gram', 'pesalu'] },
  { name: 'Red Gram (Toor Dal)',   category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Split pigeon pea / tur dal', keywords: ['toor', 'arhar', 'kandipappu'] },
  { name: 'Bengal Gram (Chana)',   category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Whole Bengal gram / chickpea', keywords: ['chana', 'chickpea', 'senagalu'] },
  { name: 'Horse Gram',             category: 'farm_products', subCategory: 'grains_staples', unit: 'kg', description: 'Whole horse gram lentils', keywords: ['horse gram', 'kulthi', 'ulavalu'] },

  // ── Farm products → vegetables & spices ───────────────────────────────────
  { name: 'Fresh Tomatoes',        category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh red tomatoes', keywords: ['tomato', 'tamata'] },
  { name: 'Fresh Onions',          category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Red onions fresh from farm', keywords: ['onion', 'pyaz', 'nirulli'] },
  { name: 'Potatoes',              category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh potatoes', keywords: ['potato', 'aloo', 'batata'] },
  { name: 'Green Chillies',        category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh green chillies', keywords: ['chilli', 'mirchi', 'pachimirchi'] },
  { name: 'Dry Red Chillies',      category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Dried red chilli pods', keywords: ['chilli', 'mirchi', 'endu mirchi', 'dry chilli'] },
  { name: 'Fresh Ginger',          category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh ginger root', keywords: ['ginger', 'adrak', 'allam'] },
  { name: 'Garlic',                category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh garlic bulbs', keywords: ['garlic', 'lahsun', 'velluli'] },
  { name: 'Turmeric (Raw)',        category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Raw turmeric rhizomes', keywords: ['turmeric', 'haldi', 'pasupu'] },
  { name: 'Turmeric Powder',       category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Ground turmeric powder', keywords: ['turmeric', 'haldi', 'pasupu', 'powder'] },
  { name: 'Coriander Seeds',       category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Whole coriander seeds', keywords: ['coriander', 'dhania', 'dhaniyalu'] },
  { name: 'Cumin Seeds',           category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Whole cumin / jeera', keywords: ['cumin', 'jeera', 'jilakarra'] },
  { name: 'Mustard Seeds',         category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Black mustard seeds', keywords: ['mustard', 'sarson', 'avalu'] },
  { name: 'Fenugreek Seeds',       category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Whole methi / fenugreek seeds', keywords: ['methi', 'fenugreek', 'menthi'] },
  { name: 'Carrot',                category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh carrots', keywords: ['carrot', 'gajar'] },
  { name: 'Beetroot',              category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh beetroot', keywords: ['beet', 'beetroot'] },
  { name: 'Brinjal (Eggplant)',    category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh brinjal / eggplant', keywords: ['brinjal', 'baingan', 'vankaya'] },
  { name: 'Bitter Gourd',          category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh bitter gourd / karela', keywords: ['bitter gourd', 'karela', 'kakarakaya'] },
  { name: 'Ridge Gourd',           category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Fresh ridge gourd / turai', keywords: ['ridge gourd', 'turai', 'beerakaya'] },
  { name: 'Drumstick (Moringa)',   category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Moringa / drumstick pods', keywords: ['drumstick', 'moringa', 'munagakaya'] },
  { name: 'Raw Mango',             category: 'farm_products', subCategory: 'vegetables_spices', unit: 'kg', description: 'Unripe raw mangoes', keywords: ['raw mango', 'kairi', 'mamidi'] },

  // ── Farm products → animal products ───────────────────────────────────────
  { name: 'Fresh Cow Milk',        category: 'farm_products', subCategory: 'animal_products', unit: 'litre', description: 'Fresh full-fat cow milk', keywords: ['milk', 'cow milk', 'paalu'] },
  { name: 'Buffalo Milk',          category: 'farm_products', subCategory: 'animal_products', unit: 'litre', description: 'Fresh buffalo milk', keywords: ['milk', 'buffalo', 'paalu'] },
  { name: 'Desi Ghee',             category: 'farm_products', subCategory: 'animal_products', unit: 'kg',    description: 'Pure clarified butter', keywords: ['ghee', 'neyyi', 'clarified butter'] },
  { name: 'Farm Chicken',          category: 'farm_products', subCategory: 'animal_products', unit: 'kg',    description: 'Country chicken / desi chicken', keywords: ['chicken', 'murgh', 'kodi', 'natu kodi'] },
  { name: 'Broiler Chicken',       category: 'farm_products', subCategory: 'animal_products', unit: 'kg',    description: 'Farm-raised broiler chicken', keywords: ['chicken', 'broiler', 'kodi'] },
  { name: 'Eggs (Desi)',           category: 'farm_products', subCategory: 'animal_products', unit: 'dozen', description: 'Country hen desi eggs', keywords: ['eggs', 'egg', 'kodi guttalu', 'natu kodi guttalu'] },
  { name: 'Eggs (Farm)',           category: 'farm_products', subCategory: 'animal_products', unit: 'dozen', description: 'Poultry farm eggs', keywords: ['eggs', 'egg', 'guttalu'] },
  { name: 'Mutton',               category: 'farm_products', subCategory: 'animal_products', unit: 'kg',    description: 'Fresh goat mutton', keywords: ['mutton', 'goat', 'mamsam', 'meka mamsam'] },
  { name: 'Fresh Fish',            category: 'farm_products', subCategory: 'animal_products', unit: 'kg',    description: 'Fresh river / sea fish', keywords: ['fish', 'meen', 'chepalu'] },
  { name: 'Tiger Prawns',          category: 'farm_products', subCategory: 'animal_products', unit: 'kg',    description: 'Fresh tiger prawns / shrimp', keywords: ['prawns', 'shrimp', 'royyalu', 'chemmeen'] },
  { name: 'Curd / Yoghurt',        category: 'farm_products', subCategory: 'animal_products', unit: 'kg',    description: 'Fresh set curd', keywords: ['curd', 'yogurt', 'yoghurt', 'perugu', 'dahi'] },

  // ── Processed foods → pastes & powders ────────────────────────────────────
  { name: 'Ginger Garlic Paste',   category: 'processed_foods', subCategory: 'pastes_powders', unit: '500g', description: 'Ready-made ginger garlic paste', keywords: ['ginger garlic', 'paste', 'allam velluli paste'] },
  { name: 'Red Chilli Powder',     category: 'processed_foods', subCategory: 'pastes_powders', unit: 'kg',   description: 'Ground red chilli powder', keywords: ['chilli powder', 'mirchi powder', 'lal mirch'] },
  { name: 'Coriander Powder',      category: 'processed_foods', subCategory: 'pastes_powders', unit: 'kg',   description: 'Ground coriander powder', keywords: ['coriander', 'dhania powder', 'dhaniyala podi'] },
  { name: 'Garam Masala',          category: 'processed_foods', subCategory: 'pastes_powders', unit: '200g', description: 'Whole spice blend powder', keywords: ['garam masala', 'masala'] },
  { name: 'Sambar Powder',         category: 'processed_foods', subCategory: 'pastes_powders', unit: '500g', description: 'South Indian sambar spice mix', keywords: ['sambar', 'sambar powder'] },
  { name: 'Sesame Powder (Podi)',  category: 'processed_foods', subCategory: 'pastes_powders', unit: '250g', description: 'Roasted sesame chutney powder', keywords: ['sesame', 'nuvvula podi', 'podi'] },
  { name: 'Peanut Chutney Powder', category: 'processed_foods', subCategory: 'pastes_powders', unit: '250g', description: 'Dry peanut chutney mix', keywords: ['peanut', 'shenga chutney', 'peanut podi'] },
  { name: 'Wheat Flour (Atta)',    category: 'processed_foods', subCategory: 'pastes_powders', unit: 'kg',   description: 'Whole wheat flour for rotis', keywords: ['atta', 'wheat flour', 'goduma pindi'] },
  { name: 'Rice Flour',            category: 'processed_foods', subCategory: 'pastes_powders', unit: 'kg',   description: 'Fine rice flour', keywords: ['rice flour', 'akki hittu', 'biyyapu pindi'] },
  { name: 'Besan (Gram Flour)',    category: 'processed_foods', subCategory: 'pastes_powders', unit: 'kg',   description: 'Chickpea flour', keywords: ['besan', 'gram flour', 'senagapindi'] },

  // ── Processed foods → oils ─────────────────────────────────────────────────
  { name: 'Cold Pressed Groundnut Oil', category: 'processed_foods', subCategory: 'oils', unit: 'litre', description: 'Cold pressed / wood-pressed groundnut oil', keywords: ['groundnut oil', 'peanut oil', 'verusenaga nune'] },
  { name: 'Cold Pressed Sesame Oil',    category: 'processed_foods', subCategory: 'oils', unit: 'litre', description: 'Cold pressed sesame / gingelly oil', keywords: ['sesame oil', 'til oil', 'nuvvula nune'] },
  { name: 'Coconut Oil',               category: 'processed_foods', subCategory: 'oils', unit: 'litre', description: 'Cold pressed coconut oil', keywords: ['coconut oil', 'nariyal tel', 'kobari nune'] },
  { name: 'Sunflower Oil',             category: 'processed_foods', subCategory: 'oils', unit: 'litre', description: 'Refined sunflower oil', keywords: ['sunflower oil', 'sunflower'] },
  { name: 'Mustard Oil',               category: 'processed_foods', subCategory: 'oils', unit: 'litre', description: 'Kachi ghani mustard oil', keywords: ['mustard oil', 'sarson ka tel'] },

  // ── Processed foods → preserved & packaged ────────────────────────────────
  { name: 'Avakaya (Mango Pickle)',    category: 'processed_foods', subCategory: 'preserved_packaged', unit: '500g', description: 'Traditional Andhra raw mango pickle', keywords: ['avakaya', 'mango pickle', 'avakai', 'pickle'] },
  { name: 'Gongura Pickle',            category: 'processed_foods', subCategory: 'preserved_packaged', unit: '500g', description: 'Sorrel leaves Gongura pickle', keywords: ['gongura', 'sorrel', 'gongura pickle'] },
  { name: 'Tomato Pickle',             category: 'processed_foods', subCategory: 'preserved_packaged', unit: '500g', description: 'Spicy tomato pickle', keywords: ['tomato pickle', 'tamata pachadi'] },
  { name: 'Jaggery (Bellam)',          category: 'processed_foods', subCategory: 'preserved_packaged', unit: 'kg',   description: 'Natural cane jaggery blocks', keywords: ['jaggery', 'bellam', 'gur', 'vellam'] },
  { name: 'Sugar',                     category: 'processed_foods', subCategory: 'preserved_packaged', unit: 'kg',   description: 'Refined white sugar', keywords: ['sugar', 'cheeni', 'panchanadam'] },
  { name: 'Salt (Iodised)',            category: 'processed_foods', subCategory: 'preserved_packaged', unit: 'kg',   description: 'Iodised table salt', keywords: ['salt', 'namak', 'uppu'] },
  { name: 'Tamarind (Imli)',           category: 'processed_foods', subCategory: 'preserved_packaged', unit: 'kg',   description: 'Seedless tamarind pulp', keywords: ['tamarind', 'imli', 'chintapandu'] },
  { name: 'Dry Coconut (Copra)',       category: 'processed_foods', subCategory: 'preserved_packaged', unit: 'kg',   description: 'Dried copra / dry coconut', keywords: ['copra', 'dry coconut', 'kobari'] },

  // ── Foods ──────────────────────────────────────────────────────────────────
  { name: 'Idli / Dosa Batter',       category: 'foods', subCategory: 'pastes_powders', unit: 'kg',   description: 'Ready fermented idli-dosa batter', keywords: ['idli', 'dosa', 'batter', 'maavu'] },
  { name: 'Fresh Baked Bread',        category: 'foods', subCategory: 'preserved_packaged', unit: 'loaf', description: 'Freshly baked wheat bread loaf', keywords: ['bread', 'double roti'] },
  { name: 'Haldirams Namkeen',        category: 'foods', subCategory: 'preserved_packaged', unit: '200g', description: 'Haldirams savory snack mix', keywords: ['haldirams', 'namkeen', 'snack', 'mixture'] },
  { name: 'Haldirams Bhujia',         category: 'foods', subCategory: 'preserved_packaged', unit: '200g', description: 'Haldirams sev bhujia', keywords: ['haldirams', 'bhujia', 'sev', 'namkeen'] },
  { name: 'Parle-G Biscuits',         category: 'foods', subCategory: 'preserved_packaged', unit: 'pack',  description: 'Classic Parle-G glucose biscuits', keywords: ['parle', 'biscuit', 'glucose', 'parle-g'] },
  { name: 'Britannia Good Day',       category: 'foods', subCategory: 'preserved_packaged', unit: 'pack',  description: 'Britannia Good Day butter cookies', keywords: ['britannia', 'good day', 'cookie', 'biscuit'] },
  { name: 'Banana Chips',             category: 'foods', subCategory: 'preserved_packaged', unit: '250g', description: 'Crispy dried banana chips', keywords: ['banana chips', 'aritikaya chips'] },
  { name: 'Murukku',                  category: 'foods', subCategory: 'preserved_packaged', unit: '500g', description: 'Crunchy rice flour murukku', keywords: ['murukku', 'chakli', 'chegodilu'] },
  { name: 'Murmura Mix',              category: 'foods', subCategory: 'preserved_packaged', unit: '200g', description: 'Spiced puffed rice snack mix', keywords: ['murmura', 'puffed rice', 'maramaralu'] },
  { name: 'Dry Fish',                 category: 'foods', subCategory: 'preserved_packaged', unit: 'kg',   description: 'Sun-dried fish / endu chepalu', keywords: ['dry fish', 'endu chepalu', 'dried fish'] },

  // ── Services ──────────────────────────────────────────────────────────────
  { name: 'Electrician Service',       category: 'services', subCategory: 'technical', unit: 'visit', description: 'Home electrician for repairs and wiring', keywords: ['electrician', 'wiring', 'electric repair'] },
  { name: 'Plumber Service',           category: 'services', subCategory: 'technical', unit: 'visit', description: 'Plumbing repair and installation', keywords: ['plumber', 'plumbing', 'water pipe', 'tap repair'] },
  { name: 'Carpenter Service',         category: 'services', subCategory: 'utilities', unit: 'visit', description: 'Furniture repair and carpentry work', keywords: ['carpenter', 'furniture', 'wood', 'sofa repair'] },
  { name: 'Painter Service',           category: 'services', subCategory: 'construction_finishing', unit: 'sqft', description: 'Interior / exterior painting service', keywords: ['painter', 'painting', 'wall paint'] },
  { name: 'AC Service & Repair',       category: 'services', subCategory: 'technical', unit: 'visit', description: 'Air conditioner service and repair', keywords: ['ac', 'air conditioner', 'ac service', 'ac repair'] },
  { name: 'Washing Machine Repair',    category: 'services', subCategory: 'technical', unit: 'visit', description: 'Washing machine repair', keywords: ['washing machine', 'washer', 'repair'] },
  { name: 'Fridge / Refrigerator Repair', category: 'services', subCategory: 'technical', unit: 'visit', description: 'Refrigerator repair and gas filling', keywords: ['fridge', 'refrigerator', 'repair', 'gas'] },
  { name: 'Home Maid Service',         category: 'services', subCategory: 'beauty_wellness', unit: 'visit', description: 'Home cleaning / maid service', keywords: ['maid', 'cleaning', 'housekeeping', 'bai'] },
  { name: 'Beautician (Home Visit)',   category: 'services', subCategory: 'beauty_wellness', unit: 'visit', description: 'Beauty and makeup service at home', keywords: ['beautician', 'makeup', 'beauty', 'parlour'] },
  { name: 'Bike Mechanic',             category: 'services', subCategory: 'mechanical', unit: 'visit', description: 'Two-wheeler mechanic service', keywords: ['bike', 'mechanic', 'two wheeler', 'scooter'] },
  { name: 'Car Service & Repair',      category: 'services', subCategory: 'mechanical', unit: 'visit', description: 'Car servicing and repair', keywords: ['car', 'mechanic', 'automobile', 'service'] },
];

export function searchCatalogItems(q: string, limit = 10): CatalogItem[] {
  if (!q || q.trim().length < 1) return [];
  const term = q.trim().toLowerCase();
  return CATALOG_ITEMS
    .filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.keywords.some(k => k.includes(term))
    )
    .sort((a, b) => {
      const aName = a.name.toLowerCase().startsWith(term) ? 0 : 1;
      const bName = b.name.toLowerCase().startsWith(term) ? 0 : 1;
      return aName - bName;
    })
    .slice(0, limit);
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  price: number;
  priceHex: string;
  image: string;
  images: string[];
  status: string;
  category: string;
  assetId: string;
  specs: Record<string, string>;
  sizes: string[];
  version: string;
}

export interface Category {
  id: string;
  label: string;
  count: number;
}

export const products: Product[] = [
  // =========================
  // COMMENTED OUT TEE
  // =========================

  {
    id: "commented-out-black",
    slug: "commented-out-black",
    name: "COMMENTED_OUT_TEE_BLACK",
    shortName: "COMMENTED_OUT",
    description: "// Some friendships became comments.",
    longDescription:
      "Premium oversized interlock cotton t-shirt featuring the iconic /**/ developer symbol. Inspired by the sacrifices every programmer makes while chasing the next build.",
    price: 34,
    priceHex: "0x0022",
    image: "/images/tees/tee_black_1.png",
    images: [
      "/images/tees/tee_black_1.png",
      "/images/tees/tee_black_2.png",
      "/images/tees/tee_black_3.png",
    ],
    status: "IN_STOCK",
    category: "tees",
    assetId: "drop01_asset_01.exe",
    specs: {
      fabric: "INTERLOCK_COTTON",
      weight: "240GSM",
      fit: "OVERSIZED_DEV",
      color: "BLACK",
      print: "WHITE_SLASHES_BRONZE_ASTERISKS",
    },
    sizes: ["M", "L", "XL", "XXL"],
    version: "v1.0.0",
  },

  {
    id: "commented-out-white",
    slug: "commented-out-white",
    name: "COMMENTED_OUT_TEE_WHITE",
    shortName: "COMMENTED_OUT",
    description: "// Some friendships became comments.",
    longDescription:
      "Premium oversized interlock cotton t-shirt featuring the iconic /**/ developer symbol.",
    price: 34,
    priceHex: "0x0022",
    image: "/images/tees/white_tee_1.png",
    images: [
      "/images/tees/white_tee_1.png",
      "/images/tees/white_tee_2.png",
      "/images/tees/white_tee_3.png",
    ],
    status: "IN_STOCK",
    category: "tees",
    assetId: "drop01_asset_02.exe",
    specs: {
      fabric: "INTERLOCK_COTTON",
      weight: "240GSM",
      fit: "OVERSIZED_DEV",
      color: "WHITE",
      print: "WHITE_SLASHES_BRONZE_ASTERISKS",
    },
    sizes: ["M", "L", "XL", "XXL"],
    version: "v1.0.0",
  },

  {
    id: "commented-out-burgundy",
    slug: "commented-out-burgundy",
    name: "COMMENTED_OUT_TEE_BURGUNDY",
    shortName: "COMMENTED_OUT",
    description: "// Some friendships became comments.",
    longDescription:
      "Premium oversized interlock cotton t-shirt featuring the iconic /**/ developer symbol.",
    price: 36,
    priceHex: "0x0024",
    image: "/images/tees/tee_bur_1.png",
    images: [
      "/images/tees/tee_bur_1.png",
      "/images/tees/tee_bur_2.png",
      "/images/tees/tee_bur_3.png",
    ],
    status: "IN_STOCK",
    category: "tees",
    assetId: "drop01_asset_03.exe",
    specs: {
      fabric: "INTERLOCK_COTTON",
      weight: "240GSM",
      fit: "OVERSIZED_DEV",
      color: "BURGUNDY",
      print: "WHITE_SLASHES_BRONZE_ASTERISKS",
    },
    sizes: ["M", "L", "XL", "XXL"],
    version: "v1.0.0",
  },

  {
    id: "commented-out-green",
    slug: "commented-out-green",
    name: "COMMENTED_OUT_TEE_GREEN",
    shortName: "COMMENTED_OUT",
    description: "// Some friendships became comments.",
    longDescription:
      "Premium oversized interlock cotton t-shirt featuring the iconic /**/ developer symbol.",
    price: 36,
    priceHex: "0x0024",
    image: "/images/tees/tee_green_3.png",
    images: [
      "/images/tees/tee_green_1.jpeg",
      "/images/tees/tee_green_2.png",
      "/images/tees/tee_green_3.png",
    ],
    status: "IN_STOCK",
    category: "tees",
    assetId: "drop01_asset_04.exe",
    specs: {
      fabric: "INTERLOCK_COTTON",
      weight: "240GSM",
      fit: "OVERSIZED_DEV",
      color: "DARK_GREEN",
      print: "WHITE_SLASHES_BRONZE_ASTERISKS",
    },
    sizes: ["M", "L", "XL", "XXL"],
    version: "v1.0.0",
  },

  // =========================
  // AFK SWEATPANTS
  // =========================

  {
    id: "afk-sweatpants-black",
    slug: "afk-sweatpants-black",
    name: "AFK_SWEATPANTS_BLACK",
    shortName: "AFK_PANTS",
    description: "// Away from keyboard. Never from the mission.",
    longDescription:
      "Relaxed premium sweatpants designed for long coding sessions. Minimal branding, heavyweight comfort, developer lifestyle approved.",
    price: 42,
    priceHex: "0x002A",
    image: "/images/data_cargos.jpg",
    images: ["/images/data_cargos.jpg"],
    status: "IN_STOCK",
    category: "sweatpants",
    assetId: "drop01_asset_05.exe",
    specs: {
      fabric: "PREMIUM_FLEECE",
      weight: "320GSM",
      fit: "RELAXED_DEV",
      color: "BLACK",
    },
    sizes: ["M", "L", "XL", "XXL"],
    version: "v1.0.0",
  },

  {
    id: "afk-sweatpants-grey",
    slug: "afk-sweatpants-grey",
    name: "AFK_SWEATPANTS_GREY",
    shortName: "AFK_PANTS",
    description: "// Away from keyboard. Never from the mission.",
    longDescription:
      "Relaxed premium sweatpants designed for long coding sessions. Minimal branding, heavyweight comfort, developer lifestyle approved.",
    price: 42,
    priceHex: "0x002A",
    image: "/images/ghost_tee.jpg",
    images: ["/images/ghost_tee.jpg"],
    status: "IN_STOCK",
    category: "sweatpants",
    assetId: "drop01_asset_06.exe",
    specs: {
      fabric: "PREMIUM_FLEECE",
      weight: "320GSM",
      fit: "RELAXED_DEV",
      color: "LIGHT_GREY",
    },
    sizes: ["M", "L", "XL", "XXL"],
    version: "v1.0.0",
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id || p.slug === id);

export const getProductsByCategory = (category: string): Product[] => {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
};

export const categories: Category[] = [
  {
    id: "all",
    label: "--filter-all",
    count: products.length,
  },
  {
    id: "tees",
    label: "--filter-tees",
    count: products.filter((p) => p.category === "tees").length,
  },
  {
    id: "sweatpants",
    label: "--filter-sweatpants",
    count: products.filter((p) => p.category === "sweatpants").length,
  },
];

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
  {
    id: 'styl-neural-hoodie',
    slug: 'styl-neural-hoodie',
    name: 'STYL_NEURAL_HOODIE',
    shortName: 'NEURAL_HOODIE',
    description: '// Heavyweight cotton, cyberpunk threading.',
    longDescription: 'Ultra-heavyweight brushed cotton interior with embedded reflective neural-pattern stitching. Designed for developers who refuse to be ordinary.',
    price: 125,
    priceHex: '0x007D',
    image: '/images/hoodie_neural.jpg',
    images: ['/images/hoodie_neural.jpg', '/images/kernel_hoodie.jpg', '/images/module_jacket.jpg'],
    status: 'IN_STOCK',
    category: 'hoodies',
    assetId: 'asset_01.exe',
    specs: {
      fabric: 'PREMIUM_COTTON',
      weight: '420GSM',
      fit: 'OVERSIZED_EXEC',
      hardware: 'MATTE_BLACK_METAL',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    version: 'v2.4.0',
  },
  {
    id: 'ghost-in-shell-tee',
    slug: 'ghost-in-shell-tee',
    name: 'GHOST_IN_SHELL_TEE',
    shortName: 'GHOST_TEE',
    description: '// Oversized fit, optical illusion print.',
    longDescription: 'Precision-cut oversized silhouette with full-back barcode optical illusion print. 100% organic cotton. Wears like a patch of the matrix.',
    price: 55,
    priceHex: '0x0037',
    image: '/images/ghost_tee.jpg',
    images: ['/images/ghost_tee.jpg', '/images/hoodie_neural.jpg', '/images/kernel_hoodie.jpg'],
    status: 'LOW_MEM',
    category: 'tees',
    assetId: 'asset_02.exe',
    specs: {
      fabric: 'ORGANIC_COTTON',
      weight: '200GSM',
      fit: 'OVERSIZED_V2',
      hardware: 'N/A',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    version: 'v1.8.3',
  },
  {
    id: 'data-stream-cargos',
    slug: 'data-stream-cargos',
    name: 'DATA_STREAM_CARGOS',
    shortName: 'DATA_CARGOS',
    description: '// Multi-port storage, water-resistant.',
    longDescription: 'Eight-pocket tactical cargo silhouette with DWR water-resistant coating. Triple-stitched stress points. The terminal in pants form.',
    price: 180,
    priceHex: '0x00B4',
    image: '/images/data_cargos.jpg',
    images: ['/images/data_cargos.jpg', '/images/module_jacket.jpg', '/images/hoodie_neural.jpg'],
    status: 'IN_STOCK',
    category: 'outerwear',
    assetId: 'asset_03.exe',
    specs: {
      fabric: 'RIPSTOP_NYLON',
      weight: '310GSM',
      fit: 'TACTICAL_WIDE',
      hardware: 'YKK_ZIPPERS',
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    version: 'v3.1.0',
  },
  {
    id: 'kernel-hoodie',
    slug: 'kernel-hoodie',
    name: 'THE_KERNEL_HOODIE',
    shortName: 'KERNEL_HOODIE',
    description: '// Core system apparel. Root access only.',
    longDescription: 'The definitive developer hoodie. 450GSM premium brushed fleece with matte black metal eyelets and tonal embroidery. Root-level comfort.',
    price: 240,
    priceHex: '0x00F0',
    image: '/images/kernel_hoodie.jpg',
    images: ['/images/kernel_hoodie.jpg', '/images/hoodie_neural.jpg', '/images/module_jacket.jpg'],
    status: 'IN_STOCK',
    category: 'hoodies',
    assetId: 'asset_04.exe',
    specs: {
      fabric: 'PREMIUM_COTTON',
      weight: '450GSM',
      fit: 'OVERSIZED_EXEC',
      hardware: 'MATTE_BLACK_METAL',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    version: 'v2.4.0',
  },
  {
    id: 'module-jacket-v2',
    slug: 'module-jacket-v2',
    name: 'MODULE_JACKET_V2',
    shortName: 'MOD_JACKET',
    description: '// Utility shell. Obsidian finish.',
    longDescription: 'Techwear shell jacket with 12 modular zip pockets. Waterproof 20K membrane. Seam-sealed construction. Deploy in any environment.',
    price: 320,
    priceHex: '0x0140',
    image: '/images/module_jacket.jpg',
    images: ['/images/module_jacket.jpg', '/images/data_cargos.jpg', '/images/kernel_hoodie.jpg'],
    status: 'IN_STOCK',
    category: 'outerwear',
    assetId: 'asset_05.exe',
    specs: {
      fabric: '20K_MEMBRANE',
      weight: '380GSM',
      fit: 'SHELL_REGULAR',
      hardware: 'YKK_AQUAGUARD',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    version: 'v2.0.0',
  },
  {
    id: 'null-pointer-tee',
    slug: 'null-pointer-tee',
    name: 'NULL_POINTER_TEE',
    shortName: 'NULL_TEE',
    description: '// Error-state graphics. Undefined aesthetic.',
    longDescription: 'Heavyweight 260GSM boxy tee with front null-pointer exception graphic. Garment-dyed in deep black. When the build fails, wear the error.',
    price: 65,
    priceHex: '0x0041',
    image: '/images/ghost_tee.jpg',
    images: ['/images/ghost_tee.jpg', '/images/kernel_hoodie.jpg', '/images/data_cargos.jpg'],
    status: 'IN_STOCK',
    category: 'tees',
    assetId: 'asset_06.exe',
    specs: {
      fabric: 'GARMENT_DYED_COTTON',
      weight: '260GSM',
      fit: 'BOXY_WIDE',
      hardware: 'N/A',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    version: 'v1.0.0',
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id || p.slug === id);

export const getProductsByCategory = (category: string): Product[] => {
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
};

export const categories: Category[] = [
  { id: 'all', label: '--filter-all', count: products.length },
  { id: 'hoodies', label: '--filter-hoodies', count: products.filter((p) => p.category === 'hoodies').length },
  { id: 'tees', label: '--filter-tees', count: products.filter((p) => p.category === 'tees').length },
  { id: 'outerwear', label: '--filter-outerwear', count: products.filter((p) => p.category === 'outerwear').length },
  { id: 'accessories', label: '--filter-accessories', count: 0 },
];

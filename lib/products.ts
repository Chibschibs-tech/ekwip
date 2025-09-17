// Local product data with variants
export interface ProductVariant {
  id: string
  name: string
  price: number
  basePrice?: number
}

export interface ProductConfiguration {
  processor: ProductVariant
  memory: ProductVariant
  storage: ProductVariant
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  basePrice: number
  image: string
  images: string[]
  category: string
  brand: string
  inStock: boolean
  isNew: boolean
  isFeatured: boolean
  variants: {
    processors: ProductVariant[]
    memory: ProductVariant[]
    storage: ProductVariant[]
  }
  specifications: Record<string, string>
  rentalDuration: string
}

// Product variants data
const processorVariants: ProductVariant[] = [
  { id: "i7-155h", name: "Intel® Core™ Ultra 7-155H", price: 0, basePrice: 0 },
  { id: "i9-185h", name: "Intel® Core™ Ultra 9 Processor 185H", price: 200, basePrice: 200 },
  { id: "i9-285h", name: "Intel® Core™ Ultra 9 Processor 285H", price: 400, basePrice: 400 },
]

const memoryVariants: ProductVariant[] = [
  { id: "16gb", name: "16GB LPDDR5X", price: 0, basePrice: 0 },
  { id: "32gb", name: "32GB LPDDR5X", price: 150, basePrice: 150 },
  { id: "64gb", name: "64GB LPDDR5X", price: 350, basePrice: 350 },
]

const storageVariants: ProductVariant[] = [
  { id: "512gb", name: "512GB M.2 NVMe™ PCIe® 4.0 SSD", price: 0, basePrice: 0 },
  { id: "1tb", name: "1TB M.2 NVMe™ PCIe® 4.0 SSD", price: 100, basePrice: 100 },
  { id: "2tb", name: "2TB M.2 NVMe™ PCIe® 4.0 SSD", price: 250, basePrice: 250 },
]

// Sample products data
export const products: Product[] = [
  {
    id: "1",
    name: "Dell Mobile Precision Workstation 5690",
    slug: "dell-precision-5690",
    description:
      'Station de travail mobile haute performance avec processeur Intel Core Ultra et écran 16" 4K+. Idéale pour les professionnels créatifs et techniques.',
    shortDescription: 'Station de travail mobile 16" haute performance pour professionnels',
    basePrice: 2500,
    image: "/images/dell-precision-5690-main.png",
    images: [
      "/images/dell-precision-5690-main.png",
      "/images/dell-precision-5690-side.png",
      "/images/dell-precision-5690-keyboard.png",
      "/images/dell-precision-5690-ports.png",
      "/images/dell-precision-5690-screen.png",
    ],
    category: "laptops",
    brand: "Dell",
    inStock: true,
    isNew: true,
    isFeatured: true,
    variants: {
      processors: processorVariants,
      memory: memoryVariants,
      storage: storageVariants,
    },
    specifications: {
      Écran: '16" 4K+ (3840 x 2400) InfinityEdge',
      "Système d'exploitation": "Windows 11 Pro",
      Connectivité: "Wi-Fi 6E, Bluetooth 5.3",
      Ports: "2x Thunderbolt 4, 1x USB 3.2, 1x HDMI 2.1, 1x SD Card",
      Batterie: "90Wh, jusqu'à 12h d'autonomie",
      Poids: "2.0 kg",
      Dimensions: "355.3 x 230.0 x 18.3 mm",
      Garantie: "3 ans ProSupport Plus",
    },
    rentalDuration: "36 mois",
  },
  {
    id: "2",
    name: 'MacBook Pro 16"',
    slug: "macbook-pro-16",
    description:
      "Le MacBook Pro 16 pouces avec puce M3 Pro offre des performances exceptionnelles pour les professionnels créatifs.",
    shortDescription: 'MacBook Pro 16" avec puce M3 Pro pour créatifs',
    basePrice: 2800,
    image: "/images/macbook-pro.png",
    images: ["/images/macbook-pro.png"],
    category: "laptops",
    brand: "Apple",
    inStock: true,
    isNew: false,
    isFeatured: true,
    variants: {
      processors: [
        { id: "m3-pro", name: "Apple M3 Pro", price: 0 },
        { id: "m3-max", name: "Apple M3 Max", price: 500 },
      ],
      memory: [
        { id: "18gb", name: "18GB Unified Memory", price: 0 },
        { id: "36gb", name: "36GB Unified Memory", price: 400 },
      ],
      storage: [
        { id: "512gb-ssd", name: "512GB SSD", price: 0 },
        { id: "1tb-ssd", name: "1TB SSD", price: 200 },
      ],
    },
    specifications: {
      Écran: '16.2" Liquid Retina XDR',
      Processeur: "Puce Apple M3 Pro",
      Mémoire: "18GB de mémoire unifiée",
      Stockage: "512GB SSD",
      Autonomie: "Jusqu'à 22 heures",
    },
    rentalDuration: "24 mois",
  },
  {
    id: "3",
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    description: "Ultrabook premium avec écran InfinityEdge et performances exceptionnelles dans un format compact.",
    shortDescription: 'Ultrabook premium 13" compact et performant',
    basePrice: 1800,
    image: "/images/dell-xps.png",
    images: ["/images/dell-xps.png"],
    category: "laptops",
    brand: "Dell",
    inStock: true,
    isNew: false,
    isFeatured: false,
    variants: {
      processors: [
        { id: "i5-1340p", name: "Intel Core i5-1340P", price: 0 },
        { id: "i7-1360p", name: "Intel Core i7-1360P", price: 200 },
      ],
      memory: [
        { id: "16gb-lpddr5", name: "16GB LPDDR5", price: 0 },
        { id: "32gb-lpddr5", name: "32GB LPDDR5", price: 300 },
      ],
      storage: [
        { id: "512gb-nvme", name: "512GB NVMe SSD", price: 0 },
        { id: "1tb-nvme", name: "1TB NVMe SSD", price: 150 },
      ],
    },
    specifications: {
      Écran: '13.4" FHD+ InfinityEdge',
      Processeur: "Intel Core i5-1340P",
      Mémoire: "16GB LPDDR5",
      Stockage: "512GB NVMe SSD",
      Poids: "1.19 kg",
    },
    rentalDuration: "24 mois",
  },
  {
    id: "4",
    name: 'iMac 24"',
    slug: "imac-24",
    description: "iMac tout-en-un avec écran Retina 4.5K et puce M3 pour une expérience desktop exceptionnelle.",
    shortDescription: 'iMac 24" tout-en-un avec écran Retina 4.5K',
    basePrice: 2200,
    image: "/images/imac.png",
    images: ["/images/imac.png"],
    category: "desktops",
    brand: "Apple",
    inStock: true,
    isNew: true,
    isFeatured: true,
    variants: {
      processors: [
        { id: "m3-8core", name: "Apple M3 8-core CPU", price: 0 },
        { id: "m3-10core", name: "Apple M3 10-core CPU", price: 300 },
      ],
      memory: [
        { id: "8gb-unified", name: "8GB Unified Memory", price: 0 },
        { id: "16gb-unified", name: "16GB Unified Memory", price: 200 },
        { id: "24gb-unified", name: "24GB Unified Memory", price: 400 },
      ],
      storage: [
        { id: "256gb-ssd", name: "256GB SSD", price: 0 },
        { id: "512gb-ssd", name: "512GB SSD", price: 200 },
        { id: "1tb-ssd", name: "1TB SSD", price: 400 },
      ],
    },
    specifications: {
      Écran: '24" Retina 4.5K (4480 x 2520)',
      Processeur: "Puce Apple M3",
      Mémoire: "8GB de mémoire unifiée",
      Stockage: "256GB SSD",
      Couleurs: "7 couleurs disponibles",
    },
    rentalDuration: "36 mois",
  },
  {
    id: "5",
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description: "iPhone 15 Pro avec puce A17 Pro, appareil photo professionnel et design en titane.",
    shortDescription: "iPhone 15 Pro avec puce A17 Pro et design titane",
    basePrice: 800,
    image: "/images/iphone.png",
    images: ["/images/iphone.png"],
    category: "smartphones",
    brand: "Apple",
    inStock: true,
    isNew: true,
    isFeatured: true,
    variants: {
      processors: [{ id: "a17-pro", name: "Puce A17 Pro", price: 0 }],
      memory: [{ id: "8gb-ram", name: "8GB RAM", price: 0 }],
      storage: [
        { id: "128gb-storage", name: "128GB", price: 0 },
        { id: "256gb-storage", name: "256GB", price: 100 },
        { id: "512gb-storage", name: "512GB", price: 200 },
        { id: "1tb-storage", name: "1TB", price: 400 },
      ],
    },
    specifications: {
      Écran: '6.1" Super Retina XDR OLED',
      Processeur: "Puce A17 Pro",
      "Appareil photo": "Triple 48MP + 12MP + 12MP",
      Stockage: "128GB",
      Connectivité: "5G, Wi-Fi 6E, Bluetooth 5.3",
    },
    rentalDuration: "24 mois",
  },
]

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.isNew)
}

export function calculateTotalPrice(product: Product, configuration: ProductConfiguration): number {
  const processorPrice = configuration.processor.price || 0
  const memoryPrice = configuration.memory.price || 0
  const storagePrice = configuration.storage.price || 0

  return product.basePrice + processorPrice + memoryPrice + storagePrice
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR")} DH`
}

// Categories data
export const categories = [
  {
    id: "laptops",
    name: "Ordinateurs portables",
    slug: "laptops",
    description: "Laptops et ultrabooks pour tous vos besoins professionnels",
    image: "/images/laptop-hero.png",
    count: products.filter((p) => p.category === "laptops").length,
  },
  {
    id: "desktops",
    name: "Ordinateurs de bureau",
    slug: "desktops",
    description: "Stations de travail et PC de bureau performants",
    image: "/images/imac.png",
    count: products.filter((p) => p.category === "desktops").length,
  },
  {
    id: "smartphones",
    name: "Smartphones",
    slug: "smartphones",
    description: "Smartphones professionnels dernière génération",
    image: "/images/iphone.png",
    count: products.filter((p) => p.category === "smartphones").length,
  },
  {
    id: "tablets",
    name: "Tablettes",
    slug: "tablets",
    description: "Tablettes tactiles pour la mobilité professionnelle",
    image: "/placeholder.svg?height=200&width=200",
    count: 0,
  },
  {
    id: "printers",
    name: "Imprimantes",
    slug: "printers",
    description: "Solutions d'impression professionnelles",
    image: "/images/printer-hero.png",
    count: 0,
  },
  {
    id: "accessories",
    name: "Accessoires",
    slug: "accessories",
    description: "Accessoires et périphériques informatiques",
    image: "/placeholder.svg?height=200&width=200",
    count: 0,
  },
]

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug)
}

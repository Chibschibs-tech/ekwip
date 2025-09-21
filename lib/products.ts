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
  graphics?: ProductVariant
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  basePrice: number
  monthlyPrice: number
  firstMonthPrice: number
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
    graphics?: ProductVariant[]
  }
  specifications: Record<string, string>
  rentalDuration: string
  configurations?: ProductConfiguration[]
}

// Dell Precision 5690 configurations based on the screenshot
const dellPrecisionConfigurations: ProductConfiguration[] = [
  {
    processor: { id: "i7-165h", name: "Intel® Core™ Ultra 7 165H vPro® Enterprise, 16 cœurs", price: 0 },
    memory: { id: "16gb", name: "16 Go de mémoire LPDDR5X", price: 0 },
    storage: { id: "1tb", name: "SSD 1 To", price: 0 },
    graphics: { id: "rtx1000", name: "NVIDIA® RTX™ 1000 Ada Generation", price: 0 },
  },
  {
    processor: { id: "i7-165h", name: "Intel® Core™ Ultra 7 165H vPro® Enterprise, 16 cœurs", price: 0 },
    memory: { id: "32gb", name: "32 Go de mémoire LPDDR5X", price: 0 },
    storage: { id: "1tb", name: "SSD 1 To", price: 0 },
    graphics: { id: "rtx2000", name: "NVIDIA® RTX™ 2000 Ada Generation", price: 0 },
  },
  {
    processor: { id: "i7-165h", name: "Intel® Core™ Ultra 7 165H vPro® Enterprise, 16 cœurs", price: 0 },
    memory: { id: "32gb", name: "32 Go de mémoire LPDDR5X", price: 0 },
    storage: { id: "1tb", name: "SSD 1 To", price: 0 },
    graphics: { id: "rtx1000", name: "NVIDIA® RTX™ 1000 Ada Generation", price: 0 },
  },
]

// Sample products data - USING CORRECT VERCEL BLOB STORAGE URLS
export const products: Product[] = [
  {
    id: "1",
    name: "Dell Mobile Precision Workstation 5690",
    slug: "dell-precision-5690",
    description:
      'Station de travail mobile haute performance avec processeur Intel Core Ultra et écran 16" 4K+. Idéale pour les professionnels créatifs et techniques.',
    shortDescription: 'Station de travail mobile 16" haute performance pour professionnels',
    basePrice: 2500,
    monthlyPrice: 1150, // Configuration 1
    firstMonthPrice: 2770,
    image:
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-2.avif",
    images: [
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-1.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-2.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-3.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-5.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-6.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-7.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-8.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-9.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-10.avif",
    ],
    category: "ordinateurs-portables",
    brand: "Dell",
    inStock: true,
    isNew: true,
    isFeatured: true,
    variants: {
      processors: [{ id: "i7-165h", name: "Intel® Core™ Ultra 7 165H vPro® Enterprise, 16 cœurs", price: 0 }],
      memory: [
        { id: "16gb", name: "16 Go de mémoire LPDDR5X", price: 0 },
        { id: "32gb", name: "32 Go de mémoire LPDDR5X", price: 0 },
      ],
      storage: [{ id: "1tb", name: "SSD 1 To", price: 0 }],
      graphics: [
        { id: "rtx1000", name: "NVIDIA® RTX™ 1000 Ada Generation", price: 0 },
        { id: "rtx2000", name: "NVIDIA® RTX™ 2000 Ada Generation", price: 0 },
      ],
    },
    configurations: dellPrecisionConfigurations,
    specifications: {
      Écran: "16,0 pouces non-tactile FHD+",
      "Système d'exploitation": "Windows 11 Professionnel",
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
    monthlyPrice: 1400,
    firstMonthPrice: 3200,
    image: "/images/macbook-pro.png",
    images: ["/images/macbook-pro.png"],
    category: "ordinateurs-portables",
    brand: "Apple",
    inStock: true,
    isNew: false,
    isFeatured: true,
    variants: {
      processors: [
        { id: "m3-pro", name: "Apple M3 Pro", price: 0 },
        { id: "m3-max", name: "Apple M3 Max", price: 0 },
      ],
      memory: [
        { id: "18gb", name: "18GB Unified Memory", price: 0 },
        { id: "36gb", name: "36GB Unified Memory", price: 0 },
      ],
      storage: [
        { id: "512gb-ssd", name: "512GB SSD", price: 0 },
        { id: "1tb-ssd", name: "1TB SSD", price: 0 },
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
    monthlyPrice: 900,
    firstMonthPrice: 2100,
    image: "/images/dell-xps.png",
    images: ["/images/dell-xps.png"],
    category: "ordinateurs-portables",
    brand: "Dell",
    inStock: true,
    isNew: false,
    isFeatured: false,
    variants: {
      processors: [
        { id: "i5-1340p", name: "Intel Core i5-1340P", price: 0 },
        { id: "i7-1360p", name: "Intel Core i7-1360P", price: 0 },
      ],
      memory: [
        { id: "16gb-lpddr5", name: "16GB LPDDR5", price: 0 },
        { id: "32gb-lpddr5", name: "32GB LPDDR5", price: 0 },
      ],
      storage: [
        { id: "512gb-nvme", name: "512GB NVMe SSD", price: 0 },
        { id: "1tb-nvme", name: "1TB NVMe SSD", price: 0 },
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
    monthlyPrice: 1100,
    firstMonthPrice: 2500,
    image: "/images/imac.png",
    images: ["/images/imac.png"],
    category: "ordinateurs-de-bureau",
    brand: "Apple",
    inStock: true,
    isNew: true,
    isFeatured: true,
    variants: {
      processors: [
        { id: "m3-8core", name: "Apple M3 8-core CPU", price: 0 },
        { id: "m3-10core", name: "Apple M3 10-core CPU", price: 0 },
      ],
      memory: [
        { id: "8gb-unified", name: "8GB Unified Memory", price: 0 },
        { id: "16gb-unified", name: "16GB Unified Memory", price: 0 },
        { id: "24gb-unified", name: "24GB Unified Memory", price: 0 },
      ],
      storage: [
        { id: "256gb-ssd", name: "256GB SSD", price: 0 },
        { id: "512gb-ssd", name: "512GB SSD", price: 0 },
        { id: "1tb-ssd", name: "1TB SSD", price: 0 },
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
    monthlyPrice: 400,
    firstMonthPrice: 900,
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
        { id: "256gb-storage", name: "256GB", price: 0 },
        { id: "512gb-storage", name: "512GB", price: 0 },
        { id: "1tb-storage", name: "1TB", price: 0 },
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

// Helper functions - ALL REQUIRED EXPORTS
export function getProducts(): Product[] {
  return products
}

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
  // For Dell Precision, return specific prices based on configuration
  if (product.slug === "dell-precision-5690" && product.configurations) {
    const configIndex = product.configurations.findIndex(
      (config) => config.memory.id === configuration.memory.id && config.graphics?.id === configuration.graphics?.id,
    )

    switch (configIndex) {
      case 0:
        return 1150 // 16GB + RTX 1000
      case 1:
        return 1200 // 32GB + RTX 2000
      case 2:
        return 1250 // 32GB + RTX 1000
      default:
        return product.monthlyPrice
    }
  }

  return product.monthlyPrice
}

export function getFirstMonthPrice(product: Product, configuration: ProductConfiguration): number {
  // For Dell Precision, return specific first month prices
  if (product.slug === "dell-precision-5690" && product.configurations) {
    const configIndex = product.configurations.findIndex(
      (config) => config.memory.id === configuration.memory.id && config.graphics?.id === configuration.graphics?.id,
    )

    switch (configIndex) {
      case 0:
        return 2770 // 16GB + RTX 1000
      case 1:
        return 2850 // 32GB + RTX 2000
      case 2:
        return 3000 // 32GB + RTX 1000
      default:
        return product.firstMonthPrice
    }
  }

  return product.firstMonthPrice
}

export function formatPrice(price: number | undefined): string {
  if (typeof price !== "number" || isNaN(price)) {
    return "0"
  }
  return price.toLocaleString("fr-FR")
}

// Categories data - DYNAMIC PRODUCT COUNTS
export const getCategories = () => [
  {
    id: "ordinateurs-portables",
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Ordinateurs portables professionnels pour tous vos besoins",
    image: "/images/laptop-hero.png",
    count: products.filter((p) => p.category === "ordinateurs-portables").length,
  },
  {
    id: "ordinateurs-de-bureau",
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Stations de travail et PC de bureau performants",
    image: "/images/imac.png",
    count: products.filter((p) => p.category === "ordinateurs-de-bureau").length,
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
    id: "tablettes",
    name: "Tablettes",
    slug: "tablettes",
    description: "Tablettes tactiles pour la mobilité professionnelle",
    image: "/placeholder.svg?height=200&width=200",
    count: products.filter((p) => p.category === "tablettes").length,
  },
  {
    id: "imprimantes",
    name: "Imprimantes",
    slug: "imprimantes",
    description: "Solutions d'impression professionnelles",
    image: "/images/printer-hero.png",
    count: products.filter((p) => p.category === "imprimantes").length,
  },
  {
    id: "accessoires",
    name: "Accessoires",
    slug: "accessoires",
    description: "Accessoires et périphériques informatiques",
    image: "/placeholder.svg?height=200&width=200",
    count: products.filter((p) => p.category === "accessoires").length,
  },
  {
    id: "mobilier",
    name: "Mobilier",
    slug: "mobilier",
    description: "Mobilier de bureau ergonomique et fonctionnel",
    image: "/placeholder.svg?height=200&width=200",
    count: products.filter((p) => p.category === "mobilier").length,
  },
]

export function getCategoryBySlug(slug: string) {
  return getCategories().find((category) => category.slug === slug)
}

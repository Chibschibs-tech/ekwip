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
  description: string
  price: number
  duration: string
  image: string
  category: string
  features: string[]
  specifications?: Record<string, string>
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
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
    id: "macbook-pro-14",
    name: 'MacBook Pro 14"',
    description: 'MacBook Pro 14" avec puce M3 Pro',
    price: 89,
    duration: "36 mois",
    image: "/images/macbook-pro.png",
    category: "ordinateurs-portables",
    features: ["Puce M3 Pro", "16 Go RAM", "512 Go SSD", "Écran Liquid Retina XDR"],
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13",
    description: "Ultrabook Dell XPS 13 dernière génération",
    price: 65,
    duration: "36 mois",
    image: "/images/dell-xps.png",
    category: "ordinateurs-portables",
    features: ["Intel Core i7", "16 Go RAM", "512 Go SSD", 'Écran 13.4" 4K'],
  },
  {
    id: "imac-24",
    name: 'iMac 24"',
    description: 'iMac 24" avec puce M3',
    price: 75,
    duration: "36 mois",
    image: "/images/imac.png",
    category: "ordinateurs-fixes",
    features: ["Puce M3", "8 Go RAM", "256 Go SSD", "Écran Retina 4.5K"],
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "iPhone 15 Pro 128 Go",
    price: 35,
    duration: "24 mois",
    image: "/images/iphone.png",
    category: "smartphones-tablettes",
    features: ["Puce A17 Pro", "128 Go", "Caméra 48 Mpx", "Titane"],
  },
  {
    id: "dell-precision-5690",
    name: "Dell Precision 5690",
    description: "Station de travail mobile haute performance",
    price: 125,
    duration: "36 mois",
    image: "/images/dell-precision-5690.png",
    category: "ordinateurs-portables",
    features: ["Intel Core i7-13700H", "32 Go RAM", "1 To SSD", "NVIDIA RTX A2000"],
  },
]

export const categories: Category[] = [
  {
    id: "ordinateurs-portables",
    name: "Ordinateurs portables",
    description: "MacBook, PC portables professionnels",
    image: "/images/macbook-pro.png",
    productCount: 12,
  },
  {
    id: "ordinateurs-fixes",
    name: "Ordinateurs fixes",
    description: "iMac, PC de bureau, workstations",
    image: "/images/imac.png",
    productCount: 8,
  },
  {
    id: "smartphones-tablettes",
    name: "Smartphones & Tablettes",
    description: "iPhone, iPad, smartphones Android",
    image: "/images/iphone.png",
    productCount: 15,
  },
  {
    id: "imprimantes-scanners",
    name: "Imprimantes & Scanners",
    description: "Imprimantes laser, jet d'encre, multifonctions",
    image: "/images/printer-hero.png",
    productCount: 6,
  },
]

// Helper functions - ALL REQUIRED EXPORTS
export function getProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.id === slug)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.category === "ordinateurs-portables")
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.category === "ordinateurs-fixes")
}

export function calculateTotalPrice(product: Product): number {
  // For Dell Precision, return specific prices based on configuration
  if (product.id === "dell-precision-5690") {
    return product.price
  }

  return product.price
}

export function getFirstMonthPrice(product: Product): number {
  // For Dell Precision, return specific first month prices
  if (product.id === "dell-precision-5690") {
    return product.price * 3
  }

  return product.price
}

export function formatPrice(price: number): string {
  return `${price}€`
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.id === slug)
}

export function getAllProducts(): Product[] {
  return products
}

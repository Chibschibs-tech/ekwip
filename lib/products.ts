export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  specifications?: Record<string, string>
  monthlyPrice?: number
  duration?: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "ordinateurs-portables",
    name: "Ordinateurs portables",
    description: "MacBook, ThinkPad, et autres ordinateurs portables professionnels",
    image: "/images/macbook-pro.png",
    productCount: 15,
  },
  {
    id: "ordinateurs-bureau",
    name: "Ordinateurs de bureau",
    description: "iMac, PC de bureau et stations de travail",
    image: "/images/imac.png",
    productCount: 8,
  },
  {
    id: "smartphones-tablettes",
    name: "Smartphones & Tablettes",
    description: "iPhone, iPad, Samsung Galaxy et autres appareils mobiles",
    image: "/images/iphone.png",
    productCount: 12,
  },
  {
    id: "imprimantes-scanners",
    name: "Imprimantes & Scanners",
    description: "Imprimantes laser, jet d'encre et scanners professionnels",
    image: "/images/printer-hero.png",
    productCount: 6,
  },
]

export const products: Product[] = [
  {
    id: "macbook-pro-14",
    name: 'MacBook Pro 14"',
    description: 'MacBook Pro 14" avec puce M3 Pro, 18 Go de mémoire unifiée, SSD 512 Go',
    price: 2499,
    monthlyPrice: 89,
    duration: "36 mois",
    image: "/images/macbook-pro.png",
    category: "ordinateurs-portables",
    specifications: {
      Processeur: "Apple M3 Pro",
      Mémoire: "18 Go",
      Stockage: "512 Go SSD",
      Écran: '14.2" Liquid Retina XDR',
    },
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13",
    description: "Dell XPS 13 avec processeur Intel Core i7, 16 Go RAM, SSD 512 Go",
    price: 1899,
    monthlyPrice: 67,
    duration: "36 mois",
    image: "/images/dell-xps.png",
    category: "ordinateurs-portables",
    specifications: {
      Processeur: "Intel Core i7-1360P",
      Mémoire: "16 Go LPDDR5",
      Stockage: "512 Go SSD",
      Écran: '13.4" FHD+',
    },
  },
  {
    id: "imac-24",
    name: 'iMac 24"',
    description: 'iMac 24" avec puce M3, 8 Go de mémoire unifiée, SSD 256 Go',
    price: 1599,
    monthlyPrice: 57,
    duration: "36 mois",
    image: "/images/imac.png",
    category: "ordinateurs-bureau",
    specifications: {
      Processeur: "Apple M3",
      Mémoire: "8 Go",
      Stockage: "256 Go SSD",
      Écran: '24" 4.5K Retina',
    },
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "iPhone 15 Pro 128 Go avec puce A17 Pro et appareil photo professionnel",
    price: 1229,
    monthlyPrice: 44,
    duration: "36 mois",
    image: "/images/iphone.png",
    category: "smartphones-tablettes",
    specifications: {
      Processeur: "A17 Pro",
      Stockage: "128 Go",
      Écran: '6.1" Super Retina XDR',
      "Appareil photo": "48 Mpx Principal",
    },
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.id === slug)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.id === slug)
}

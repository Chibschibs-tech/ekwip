export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  basePrice: number
  image: string
  images?: string[]
  brand: string
  category: string
  inStock: boolean
  isNew?: boolean
  isPopular?: boolean
  isFeatured?: boolean
  specifications?: Record<string, string>
  variants?: Array<{
    id: string
    name: string
    price: number
  }>
  configurations?: Array<{
    id: string
    name: string
    price: number
    firstMonthPrice: number
    processor: string
    memory: string
    storage: string
    graphics: string
  }>
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  count: number
  parent: number
  image?: string
}

// Mock data par défaut
export const products: Product[] = [
  {
    id: "1",
    name: 'MacBook Pro 14"',
    slug: "macbook-pro-14",
    description: "Processeur M2 Pro, 16 Go RAM, 512 Go SSD",
    price: 120,
    basePrice: 120,
    image: "/images/macbook-pro.png",
    brand: "Apple",
    category: "Ordinateurs portables",
    inStock: true,
    isPopular: true,
    isFeatured: true,
    specifications: {
      Processeur: "Apple M2 Pro",
      Mémoire: "16 Go RAM",
      Stockage: "512 Go SSD",
      Écran: "14 pouces Liquid Retina XDR",
      Autonomie: "Jusqu'à 18 heures",
    },
  },
  {
    id: "2",
    name: "Dell XPS Desktop",
    slug: "dell-xps-desktop",
    description: "Intel i7, 32 Go RAM, 1 To SSD, RTX 3060",
    price: 95,
    basePrice: 95,
    image: "/images/dell-xps.png",
    brand: "Dell",
    category: "Ordinateurs de bureau",
    inStock: true,
    isNew: true,
    specifications: {
      Processeur: "Intel Core i7",
      Mémoire: "32 Go RAM",
      Stockage: "1 To SSD",
      "Carte graphique": "NVIDIA RTX 3060",
    },
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description: "256 Go, forfait data 100 Go inclus",
    price: 45,
    basePrice: 45,
    image: "/images/iphone.png",
    brand: "Apple",
    category: "Smartphones",
    inStock: true,
    isPopular: true,
    specifications: {
      Stockage: "256 Go",
      Écran: "6.1 pouces Super Retina XDR",
      Processeur: "A17 Pro",
      Caméra: "48 Mpx",
    },
  },
  {
    id: "4",
    name: "Dell Precision 5690",
    slug: "dell-precision-5690",
    description: "Station de travail mobile haute performance",
    price: 180,
    basePrice: 180,
    image: "/images/dell-precision-5690-main.png",
    images: [
      "/images/dell-precision-5690-main.png",
      "/images/dell-precision-5690-side.png",
      "/images/dell-precision-5690-keyboard.png",
      "/images/dell-precision-5690-ports.png",
      "/images/dell-precision-5690-screen.png",
    ],
    brand: "Dell",
    category: "Ordinateurs portables",
    inStock: true,
    isFeatured: true,
    configurations: [
      {
        id: "config-1",
        name: "Configuration Standard",
        price: 180,
        firstMonthPrice: 90,
        processor: "Intel Core i7-13700H",
        memory: "16 Go DDR5",
        storage: "512 Go SSD NVMe",
        graphics: "NVIDIA RTX A1000 6 Go",
      },
      {
        id: "config-2",
        name: "Configuration Performance",
        price: 220,
        firstMonthPrice: 110,
        processor: "Intel Core i9-13900H",
        memory: "32 Go DDR5",
        storage: "1 To SSD NVMe",
        graphics: "NVIDIA RTX A2000 8 Go",
      },
      {
        id: "config-3",
        name: "Configuration Premium",
        price: 280,
        firstMonthPrice: 140,
        processor: "Intel Core i9-13900H",
        memory: "64 Go DDR5",
        storage: "2 To SSD NVMe",
        graphics: "NVIDIA RTX A3000 12 Go",
      },
    ],
  },
]

export const categories: Category[] = [
  {
    id: 1,
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Ordinateurs portables professionnels pour tous vos besoins",
    count: 10,
    parent: 0,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
  },
  {
    id: 2,
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Stations de travail performantes pour vos équipes",
    count: 8,
    parent: 0,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptops",
  },
  {
    id: 3,
    name: "Smartphones",
    slug: "smartphones",
    description: "Smartphones professionnels pour vos équipes mobiles",
    count: 6,
    parent: 0,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/smartphone.webp",
  },
]

export function formatPrice(price: number): string {
  return `${price} DH`
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return []
  return products.filter((product) => product.category === category.name)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, 4)
}

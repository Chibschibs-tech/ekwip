export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  specifications: Record<string, string>
  inStock: boolean
  featured?: boolean
  slug: string
  gallery?: string[]
  rentalDurations: {
    duration: number
    price: number
  }[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "laptops",
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Laptops professionnels haute performance",
    image: "/images/laptop-hero.png",
    productCount: 15,
  },
  {
    id: "desktops",
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-bureau",
    description: "Stations de travail puissantes",
    image: "/images/imac.png",
    productCount: 8,
  },
  {
    id: "tablets",
    name: "Tablettes",
    slug: "tablettes",
    description: "Tablettes professionnelles",
    image: "/images/iphone.png",
    productCount: 6,
  },
  {
    id: "printers",
    name: "Imprimantes",
    slug: "imprimantes",
    description: "Solutions d'impression professionnelles",
    image: "/images/printer-hero.png",
    productCount: 12,
  },
]

export const products: Product[] = [
  {
    id: "dell-precision-5690",
    name: "Dell Precision 5690",
    description:
      "Station de travail mobile ultra-performante avec processeur Intel Core Ultra 7 et carte graphique NVIDIA RTX",
    price: 299,
    image: "/images/dell-precision-5690-main.png",
    category: "laptops",
    brand: "Dell",
    specifications: {
      Processeur: "Intel Core Ultra 7 165H",
      Mémoire: "32 Go DDR5",
      Stockage: "1 To SSD NVMe",
      Écran: '16" 4K+ OLED Touch',
      "Carte graphique": "NVIDIA RTX 2000 Ada 8GB",
    },
    inStock: true,
    featured: true,
    slug: "dell-precision-5690",
    gallery: [
      "/images/dell-precision-5690-main.png",
      "/images/dell-precision-5690-side.png",
      "/images/dell-precision-5690-keyboard.png",
      "/images/dell-precision-5690-ports.png",
      "/images/dell-precision-5690-screen.png",
    ],
    rentalDurations: [
      { duration: 12, price: 299 },
      { duration: 24, price: 249 },
      { duration: 36, price: 199 },
    ],
  },
  {
    id: "macbook-pro-16",
    name: 'MacBook Pro 16"',
    description: "MacBook Pro 16 pouces avec puce M3 Pro pour les professionnels créatifs",
    price: 349,
    image: "/images/macbook-pro.png",
    category: "laptops",
    brand: "Apple",
    specifications: {
      Processeur: "Apple M3 Pro",
      Mémoire: "18 Go",
      Stockage: "512 Go SSD",
      Écran: '16" Liquid Retina XDR',
      Autonomie: "Jusqu'à 22h",
    },
    inStock: true,
    featured: true,
    slug: "macbook-pro-16",
    rentalDurations: [
      { duration: 12, price: 349 },
      { duration: 24, price: 299 },
      { duration: 36, price: 249 },
    ],
  },
  {
    id: "imac-24",
    name: 'iMac 24"',
    description: "iMac 24 pouces avec puce M3, design coloré et écran 4.5K Retina",
    price: 279,
    image: "/images/imac.png",
    category: "desktops",
    brand: "Apple",
    specifications: {
      Processeur: "Apple M3",
      Mémoire: "16 Go",
      Stockage: "512 Go SSD",
      Écran: '24" 4.5K Retina',
      Couleurs: "7 couleurs disponibles",
    },
    inStock: true,
    featured: true,
    slug: "imac-24",
    rentalDurations: [
      { duration: 12, price: 279 },
      { duration: 24, price: 229 },
      { duration: 36, price: 189 },
    ],
  },
]

export function formatPrice(price: number): string {
  return `${price}€`
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = categories.find((cat) => cat.slug === categorySlug)
  if (!category) return []

  return products.filter((product) => product.category === category.id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery),
  )
}

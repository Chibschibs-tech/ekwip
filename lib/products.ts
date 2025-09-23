export interface Product {
  id: string
  name: string
  category: string
  price: number
  duration: number
  image: string
  description: string
  specifications: string[]
  popular?: boolean
  new?: boolean
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
    description: "Ordinateurs portables professionnels pour tous vos besoins",
    image: "/images/macbook-pro.png",
    productCount: 15,
  },
  {
    id: "desktops",
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Stations de travail puissantes pour votre bureau",
    image: "/images/imac.png",
    productCount: 8,
  },
  {
    id: "smartphones",
    name: "Smartphones",
    slug: "smartphones",
    description: "Smartphones professionnels dernière génération",
    image: "/images/iphone.png",
    productCount: 12,
  },
  {
    id: "tablets",
    name: "Tablettes",
    slug: "tablettes",
    description: "Tablettes pour mobilité et productivité",
    image: "/images/iphone.png",
    productCount: 6,
  },
  {
    id: "printers",
    name: "Imprimantes",
    slug: "imprimantes",
    description: "Solutions d'impression professionnelles",
    image: "/images/printer-hero.png",
    productCount: 10,
  },
]

export const products: Product[] = [
  {
    id: "macbook-pro-14",
    name: 'MacBook Pro 14"',
    category: "laptops",
    price: 89,
    duration: 24,
    image: "/images/macbook-pro.png",
    description: "MacBook Pro 14 pouces avec puce M3 Pro",
    specifications: ["Puce M3 Pro", "16 Go RAM", "512 Go SSD", "Écran Liquid Retina XDR"],
    popular: true,
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13",
    category: "laptops",
    price: 65,
    duration: 24,
    image: "/images/dell-xps.png",
    description: "Ultrabook Dell XPS 13 haute performance",
    specifications: ["Intel Core i7", "16 Go RAM", "512 Go SSD", 'Écran 13.3" 4K'],
    new: true,
  },
  {
    id: "imac-24",
    name: 'iMac 24"',
    category: "desktops",
    price: 95,
    duration: 24,
    image: "/images/imac.png",
    description: "iMac 24 pouces avec puce M3",
    specifications: ["Puce M3", "16 Go RAM", "512 Go SSD", "Écran Retina 4.5K"],
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "smartphones",
    price: 45,
    duration: 24,
    image: "/images/iphone.png",
    description: "iPhone 15 Pro avec puce A17 Pro",
    specifications: ["Puce A17 Pro", "256 Go", "Caméra Pro", "Titane"],
    popular: true,
  },
]

export function formatPrice(price: number): string {
  return `${price}€`
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}

export function getPopularProducts(limit = 6): Product[] {
  return products.filter((p) => p.popular).slice(0, limit)
}

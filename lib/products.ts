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
  id: string
  name: string
  slug: string
  description: string
  count: number
  parent: number
  image?: string
}

// Mock data par défaut
const defaultProducts: Product[] = [
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

const defaultCategories: Category[] = [
  {
    id: "cat-1",
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Ordinateurs portables professionnels pour tous vos besoins",
    count: 10,
    parent: 0,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
  },
  {
    id: "cat-2",
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Stations de travail performantes pour vos équipes",
    count: 8,
    parent: 0,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptops",
  },
  {
    id: "cat-3",
    name: "Smartphones",
    slug: "smartphones",
    description: "Smartphones professionnels pour vos équipes mobiles",
    count: 6,
    parent: 0,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/smartphone.webp",
  },
]

// Fonction pour charger les catégories depuis localStorage
function loadCategoriesFromStorage(): Category[] {
  if (typeof window === "undefined") return defaultCategories

  try {
    const stored = localStorage.getItem("ekwip_admin_categories")
    if (!stored) return defaultCategories

    const adminCategories = JSON.parse(stored)

    return adminCategories
      .filter((cat: any) => cat.isActive)
      .map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "",
        count: cat.productCount || 0,
        parent: 0,
        image: cat.image || undefined,
      }))
  } catch (error) {
    console.error("Error loading categories:", error)
    return defaultCategories
  }
}

// Fonction pour charger les produits depuis localStorage
function loadProductsFromStorage(): Product[] {
  if (typeof window === "undefined") return defaultProducts

  try {
    const storedProducts = localStorage.getItem("ekwip_admin_products")
    const storedCategories = localStorage.getItem("ekwip_admin_categories")
    const storedBrands = localStorage.getItem("ekwip_admin_brands")

    if (!storedProducts) return defaultProducts

    const adminProducts = JSON.parse(storedProducts)
    const adminCategories = storedCategories ? JSON.parse(storedCategories) : []
    const adminBrands = storedBrands ? JSON.parse(storedBrands) : []

    return adminProducts
      .filter((p: any) => p.status === "active")
      .map((p: any) => {
        const category = adminCategories.find((c: any) => c.id === p.categoryId)
        const brand = adminBrands.find((b: any) => b.id === p.brandId)

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.shortDescription || p.description || "",
          price: p.price || 0,
          basePrice: p.price || 0,
          image: p.thumbnail || p.images?.[0] || "/placeholder.svg",
          images: p.images || [p.thumbnail || "/placeholder.svg"],
          brand: brand?.name || "Sans marque",
          category: category?.name || "Sans catégorie",
          inStock: (p.stockQuantity || 0) > 0,
          isNew: false,
          isPopular: false,
          isFeatured: p.isFeatured || false,
          specifications: p.attributes || undefined,
        }
      })
  } catch (error) {
    console.error("Error loading products:", error)
    return defaultProducts
  }
}

export const products = loadProductsFromStorage()
export const categories = loadCategoriesFromStorage()

export function getAllProducts(): Product[] {
  return loadProductsFromStorage()
}

export function getAllCategories(): Category[] {
  return loadCategoriesFromStorage()
}

export function formatPrice(price: number): string {
  return `${price} DH`
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadProductsFromStorage().find((product) => product.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return loadCategoriesFromStorage().find((category) => category.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return []
  return loadProductsFromStorage().filter((product) => product.category === category.name)
}

export function getRelatedProducts(productId: string): Product[] {
  const allProducts = loadProductsFromStorage()
  const product = allProducts.find((p) => p.id === productId)
  if (!product) return []

  return allProducts.filter((p) => p.id !== productId && p.category === product.category).slice(0, 4)
}

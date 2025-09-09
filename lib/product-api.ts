// Mock product data and API functions

// Types for product data
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  count: number
  parent: number
  image?: {
    src: string
    alt: string
  }
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  stock_quantity: number
  stock_status: string
  images: Array<{
    id: number
    src: string
    alt: string
  }>
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  attributes: Array<{
    id: number
    name: string
    options: string[]
  }>
  meta_data: Array<{
    key: string
    value: any
  }>
  featured: boolean
  date_created: string
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  related_ids: number[]
}

// Mock data for categories
const mockCategories: Category[] = [
  {
    id: 1,
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Ordinateurs portables professionnels",
    count: 15,
    parent: 0,
  },
  {
    id: 2,
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Ordinateurs de bureau",
    count: 8,
    parent: 0,
  },
  { id: 3, name: "Smartphones", slug: "smartphones", description: "Téléphones intelligents", count: 12, parent: 0 },
  { id: 4, name: "Tablettes", slug: "tablettes", description: "Tablettes tactiles", count: 6, parent: 0 },
  { id: 5, name: "Accessoires", slug: "accessoires", description: "Accessoires informatiques", count: 20, parent: 0 },
  { id: 6, name: "Imprimantes", slug: "imprimantes", description: "Solutions d'impression", count: 7, parent: 0 },
  { id: 7, name: "Mobilier", slug: "mobilier", description: "Mobilier de bureau", count: 9, parent: 0 },
]

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    slug: "macbook-pro-14",
    description:
      "<p>Le MacBook Pro 14 pouces avec puce M3 Pro offre des performances exceptionnelles pour les professionnels créatifs.</p>",
    short_description: 'MacBook Pro 14" avec puce M3 Pro - Performance professionnelle',
    price: "25000",
    regular_price: "25000",
    sale_price: "",
    stock_quantity: 5,
    stock_status: "instock",
    images: [{ id: 1, src: "/images/macbook-pro.png", alt: 'MacBook Pro 14"' }],
    categories: [{ id: 1, name: "Ordinateurs portables", slug: "ordinateurs-portables" }],
    attributes: [
      { id: 1, name: "Processeur", options: ["Apple M3 Pro"] },
      { id: 2, name: "RAM", options: ["16 GB"] },
      { id: 3, name: "Stockage", options: ["512 GB SSD"] },
    ],
    meta_data: [],
    featured: true,
    date_created: "2024-01-15T10:00:00Z",
    tags: [
      { id: 1, name: "Apple", slug: "apple" },
      { id: 2, name: "Professionnel", slug: "professional" },
    ],
    related_ids: [2, 3],
  },
  {
    id: 2,
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    description:
      "<p>L'ultrabook Dell XPS 13 combine design élégant et performances élevées dans un format compact.</p>",
    short_description: "Dell XPS 13 - Ultrabook premium avec écran InfinityEdge",
    price: "18000",
    regular_price: "20000",
    sale_price: "18000",
    stock_quantity: 8,
    stock_status: "instock",
    images: [{ id: 2, src: "/images/dell-xps.png", alt: "Dell XPS 13" }],
    categories: [{ id: 1, name: "Ordinateurs portables", slug: "ordinateurs-portables" }],
    attributes: [
      { id: 1, name: "Processeur", options: ["Intel Core i7"] },
      { id: 2, name: "RAM", options: ["16 GB"] },
      { id: 3, name: "Stockage", options: ["512 GB SSD"] },
    ],
    meta_data: [],
    featured: true,
    date_created: "2024-01-10T10:00:00Z",
    tags: [
      { id: 3, name: "Dell", slug: "dell" },
      { id: 4, name: "Ultrabook", slug: "ultrabook" },
    ],
    related_ids: [1, 4],
  },
  {
    id: 3,
    name: 'iMac 24"',
    slug: "imac-24",
    description:
      "<p>L'iMac 24 pouces avec puce M3 redéfinit l'ordinateur de bureau tout-en-un avec des couleurs éclatantes.</p>",
    short_description: 'iMac 24" avec puce M3 - Design coloré et performances exceptionnelles',
    price: "22000",
    regular_price: "22000",
    sale_price: "",
    stock_quantity: 3,
    stock_status: "instock",
    images: [{ id: 3, src: "/images/imac.png", alt: 'iMac 24"' }],
    categories: [{ id: 2, name: "Ordinateurs de bureau", slug: "ordinateurs-de-bureau" }],
    attributes: [
      { id: 1, name: "Processeur", options: ["Apple M3"] },
      { id: 2, name: "RAM", options: ["8 GB"] },
      { id: 3, name: "Stockage", options: ["256 GB SSD"] },
    ],
    meta_data: [],
    featured: false,
    date_created: "2024-01-05T10:00:00Z",
    tags: [
      { id: 1, name: "Apple", slug: "apple" },
      { id: 5, name: "Tout-en-un", slug: "all-in-one" },
    ],
    related_ids: [1, 4],
  },
  {
    id: 4,
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description:
      "<p>L'iPhone 15 Pro avec puce A17 Pro offre des performances de niveau professionnel dans un design en titane.</p>",
    short_description: "iPhone 15 Pro - Smartphone professionnel avec puce A17 Pro",
    price: "15000",
    regular_price: "16000",
    sale_price: "15000",
    stock_quantity: 12,
    stock_status: "instock",
    images: [{ id: 4, src: "/images/iphone.png", alt: "iPhone 15 Pro" }],
    categories: [{ id: 3, name: "Smartphones", slug: "smartphones" }],
    attributes: [
      { id: 1, name: "Processeur", options: ["Apple A17 Pro"] },
      { id: 2, name: "Stockage", options: ["128 GB"] },
      { id: 3, name: "Écran", options: ["6.1 pouces"] },
    ],
    meta_data: [],
    featured: true,
    date_created: "2024-01-20T10:00:00Z",
    tags: [
      { id: 1, name: "Apple", slug: "apple" },
      { id: 6, name: "Smartphone", slug: "smartphone" },
    ],
    related_ids: [1, 3],
  },
  {
    id: 5,
    name: "iPad Pro 12.9",
    slug: "ipad-pro-12-9",
    description:
      "<p>L'iPad Pro 12.9 pouces avec puce M2 offre des performances exceptionnelles pour les professionnels créatifs.</p>",
    short_description: "iPad Pro 12.9 avec puce M2 - Performance professionnelle",
    price: "18000",
    regular_price: "18000",
    sale_price: "",
    stock_quantity: 7,
    stock_status: "instock",
    images: [{ id: 5, src: "/placeholder.svg?height=300&width=300", alt: "iPad Pro 12.9" }],
    categories: [{ id: 4, name: "Tablettes", slug: "tablettes" }],
    attributes: [
      { id: 1, name: "Processeur", options: ["Apple M2"] },
      { id: 2, name: "Stockage", options: ["256 GB"] },
      { id: 3, name: "Écran", options: ["12.9 pouces"] },
    ],
    meta_data: [],
    featured: true,
    date_created: "2024-02-15T10:00:00Z",
    tags: [
      { id: 1, name: "Apple", slug: "apple" },
      { id: 2, name: "Professionnel", slug: "professional" },
    ],
    related_ids: [6],
  },
  {
    id: 6,
    name: "Magic Keyboard",
    slug: "magic-keyboard",
    description: "<p>Le Magic Keyboard pour iPad Pro offre une expérience de frappe exceptionnelle.</p>",
    short_description: "Magic Keyboard pour iPad Pro - Clavier et trackpad intégrés",
    price: "5000",
    regular_price: "5500",
    sale_price: "5000",
    stock_quantity: 15,
    stock_status: "instock",
    images: [{ id: 6, src: "/placeholder.svg?height=300&width=300", alt: "Magic Keyboard" }],
    categories: [{ id: 5, name: "Accessoires", slug: "accessoires" }],
    attributes: [
      { id: 1, name: "Compatibilité", options: ["iPad Pro 11 pouces", "iPad Pro 12.9 pouces"] },
      { id: 2, name: "Connectivité", options: ["Smart Connector"] },
    ],
    meta_data: [],
    featured: false,
    date_created: "2024-02-10T10:00:00Z",
    tags: [
      { id: 1, name: "Apple", slug: "apple" },
      { id: 7, name: "Clavier", slug: "keyboard" },
    ],
    related_ids: [5],
  },
  {
    id: 7,
    name: "HP LaserJet Pro",
    slug: "hp-laserjet-pro",
    description: "<p>L'imprimante HP LaserJet Pro offre des impressions rapides et de haute qualité.</p>",
    short_description: "HP LaserJet Pro - Imprimante laser monochrome",
    price: "8000",
    regular_price: "8000",
    sale_price: "",
    stock_quantity: 10,
    stock_status: "instock",
    images: [{ id: 7, src: "/placeholder.svg?height=300&width=300", alt: "HP LaserJet Pro" }],
    categories: [{ id: 6, name: "Imprimantes", slug: "imprimantes" }],
    attributes: [
      { id: 1, name: "Type", options: ["Laser"] },
      { id: 2, name: "Connectivité", options: ["USB", "Wi-Fi", "Ethernet"] },
      { id: 3, name: "Vitesse d'impression", options: ["30 ppm"] },
    ],
    meta_data: [],
    featured: true,
    date_created: "2024-01-25T10:00:00Z",
    tags: [
      { id: 8, name: "HP", slug: "hp" },
      { id: 9, name: "Imprimante", slug: "printer" },
    ],
    related_ids: [],
  },
  {
    id: 8,
    name: "Bureau Réglable en Hauteur",
    slug: "bureau-reglable-hauteur",
    description: "<p>Bureau réglable en hauteur électriquement pour alterner entre position assise et debout.</p>",
    short_description: "Bureau réglable en hauteur - Pour un travail ergonomique",
    price: "12000",
    regular_price: "13000",
    sale_price: "12000",
    stock_quantity: 5,
    stock_status: "instock",
    images: [{ id: 8, src: "/placeholder.svg?height=300&width=300", alt: "Bureau Réglable en Hauteur" }],
    categories: [{ id: 7, name: "Mobilier", slug: "mobilier" }],
    attributes: [
      { id: 1, name: "Dimensions", options: ["160x80 cm"] },
      { id: 2, name: "Réglage", options: ["Électrique"] },
      { id: 3, name: "Matériau", options: ["Bois et métal"] },
    ],
    meta_data: [],
    featured: false,
    date_created: "2024-03-01T10:00:00Z",
    tags: [
      { id: 10, name: "Ergonomie", slug: "ergonomics" },
      { id: 11, name: "Bureau", slug: "desk" },
    ],
    related_ids: [],
  },
]

// API functions

export async function fetchAllCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockCategories
}

export async function fetchRentalCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  // Return all categories for rental
  return mockCategories
}

export async function fetchProductsByCategory(categoryId: number): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.filter((product) => product.categories.some((cat) => cat.id === categoryId))
}

export async function fetchFeaturedProducts(limit = 8): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.filter((product) => product.featured).slice(0, limit)
}

export async function fetchRecentProducts(limit = 8): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts
    .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
    .slice(0, limit)
}

export async function fetchProductById(productId: number): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.find((product) => product.id === productId) || null
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.find((product) => product.slug === slug) || null
}

export async function fetchFilteredProducts(filters: {
  category?: number
  search?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  onSale?: boolean
  inStock?: boolean
  orderby?: string
  order?: "asc" | "desc"
  page?: number
  perPage?: number
}): Promise<{ products: Product[]; total: number; totalPages: number }> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  let filteredProducts = [...mockProducts]

  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) =>
      product.categories.some((cat) => cat.id === filters.category),
    )
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
    )
  }

  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter((product) => Number.parseFloat(product.price) >= filters.minPrice!)
  }

  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter((product) => Number.parseFloat(product.price) <= filters.maxPrice!)
  }

  if (filters.featured) {
    filteredProducts = filteredProducts.filter((product) => product.featured)
  }

  if (filters.onSale) {
    filteredProducts = filteredProducts.filter((product) => product.sale_price)
  }

  if (filters.inStock) {
    filteredProducts = filteredProducts.filter((product) => product.stock_status === "instock")
  }

  // Apply sorting
  if (filters.orderby) {
    filteredProducts.sort((a, b) => {
      let comparison = 0

      switch (filters.orderby) {
        case "price":
          comparison = Number.parseFloat(a.price) - Number.parseFloat(b.price)
          break
        case "date":
          comparison = new Date(a.date_created).getTime() - new Date(b.date_created).getTime()
          break
        case "popularity":
          // Mock popularity based on featured status and stock
          const aPopularity = (a.featured ? 100 : 0) + a.stock_quantity
          const bPopularity = (b.featured ? 100 : 0) + b.stock_quantity
          comparison = aPopularity - bPopularity
          break
        default:
          comparison = a.name.localeCompare(b.name)
      }

      return filters.order === "desc" ? -comparison : comparison
    })
  }

  // Apply pagination
  const page = filters.page || 1
  const perPage = filters.perPage || 12
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / perPage)

  return {
    products: paginatedProducts,
    total,
    totalPages,
  }
}

export async function fetchRelatedProducts(productId: number, limit = 4): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const product = mockProducts.find((p) => p.id === productId)
  if (!product) return []

  // Get products from the same category, excluding the current product
  const relatedProducts = mockProducts.filter(
    (p) => p.id !== productId && p.categories.some((cat) => product.categories.some((pCat) => pCat.id === cat.id)),
  )

  return relatedProducts.slice(0, limit)
}

export async function fetchClientLogos() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Return actual partner logos from blob storage
  return [
    {
      name: "Cambiste",
      logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/cambiste-logo-dark.png",
    },
    {
      name: "YouPack",
      logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/logo-youpack-site-2048x444.png",
    },
    {
      name: "Ocura Consulting",
      logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/ocura22consuting_cover_e2147483647vbetatxSLpw.png",
    },
    { name: "Valkima", logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/valkima.png" },
  ]
}

// Helper function to format price - Updated to use Moroccan Dirhams
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price

  return (
    new Intl.NumberFormat("fr-MA", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice) + " Dhs"
  )
}

// Export the renamed types for backward compatibility
export type WordPressCategory = Category
export type WordPressProduct = Product

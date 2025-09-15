import { getProducts, getProductBySlug as getProductBySlugFromProducts } from "./products"

// Mock WordPress API types
export interface WordPressProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price?: string
  stock_status: string
  stock_quantity?: number
  images: Array<{
    id: number
    src: string
    alt: string
  }>
  categories: Array<{
    id: number
    name: string
  }>
  attributes: Array<{
    id: number
    name: string
    options: string[]
  }>
  featured: boolean
  date_created: string
}

export interface WordPressCategory {
  id: number
  name: string
  count: number
}

// Convert our Product type to WordPressProduct type
function convertToWordPressProduct(product: any): WordPressProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    short_description: product.shortDescription,
    price: product.price.toString(),
    regular_price: product.price.toString(),
    sale_price: undefined,
    stock_status: "instock",
    stock_quantity: 10,
    images: [
      {
        id: 1,
        src: product.image,
        alt: product.name,
      },
    ],
    categories: [
      {
        id: 1,
        name: product.category,
      },
    ],
    attributes: [],
    featured: product.featured,
    date_created: new Date().toISOString(),
  }
}

export async function fetchAllCategories(): Promise<WordPressCategory[]> {
  const products = getProducts()
  const categories = Array.from(new Set(products.map((p) => p.category)))

  return categories.map((category, index) => ({
    id: index + 1,
    name: category,
    count: products.filter((p) => p.category === category).length,
  }))
}

export async function fetchFilteredProducts(params: {
  category?: number
  search?: string
  perPage?: number
  page?: number
  orderby?: string
  order?: "asc" | "desc"
  inStock?: boolean
  onSale?: boolean
  minPrice?: number
  maxPrice?: number
}): Promise<{
  products: WordPressProduct[]
  total: number
  totalPages: number
}> {
  let products = getProducts()

  // Apply filters
  if (params.search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(params.search!.toLowerCase()) ||
        p.description.toLowerCase().includes(params.search!.toLowerCase()),
    )
  }

  if (params.minPrice) {
    products = products.filter((p) => p.price >= params.minPrice!)
  }

  if (params.maxPrice) {
    products = products.filter((p) => p.price <= params.maxPrice!)
  }

  // Convert to WordPress format
  const wpProducts = products.map(convertToWordPressProduct)

  const perPage = params.perPage || 12
  const page = params.page || 1
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage

  return {
    products: wpProducts.slice(startIndex, endIndex),
    total: wpProducts.length,
    totalPages: Math.ceil(wpProducts.length / perPage),
  }
}

export async function fetchProductBySlug(slug: string): Promise<WordPressProduct | null> {
  const product = getProductBySlugFromProducts(slug)
  if (!product) return null
  return convertToWordPressProduct(product)
}

export async function fetchRelatedProducts(productId: number, limit = 4): Promise<WordPressProduct[]> {
  const products = getProducts()
  const currentProduct = products.find((p) => p.id === productId)
  if (!currentProduct) return []

  const relatedProducts = products
    .filter((p) => p.category === currentProduct.category && p.id !== productId)
    .slice(0, limit)

  return relatedProducts.map(convertToWordPressProduct)
}

export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
  return `${numPrice.toLocaleString()} DH`
}

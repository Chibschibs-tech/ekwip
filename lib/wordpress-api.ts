import { getProducts } from "./products"
import type { WooCommerceProduct, WooCommerceCategory } from "./woocommerce-types"

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET

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

// Helper function to create WooCommerce API URL with authentication
function createWooCommerceUrl(endpoint: string, params: Record<string, string> = {}): string {
  if (!WORDPRESS_API_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    throw new Error("WordPress API credentials are not configured")
  }

  const url = new URL(`${WORDPRESS_API_URL}/wp-json/wc/v3/${endpoint}`)

  // Add authentication parameters
  url.searchParams.append("consumer_key", WC_CONSUMER_KEY)
  url.searchParams.append("consumer_secret", WC_CONSUMER_SECRET)

  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return url.toString()
}

// Helper function to format price from string to number (in Moroccan Dirhams)
function formatPrice(price: string): number {
  const numericPrice = Number.parseFloat(price)
  return isNaN(numericPrice) ? 0 : Math.round(numericPrice)
}

// Helper function to convert WooCommerce product to our Product type
function convertWooCommerceProduct(wcProduct: WooCommerceProduct): any {
  return {
    id: wcProduct.id,
    name: wcProduct.name,
    description: wcProduct.description,
    shortDescription: wcProduct.short_description,
    price: formatPrice(wcProduct.price),
    image: wcProduct.images[0]?.src || "/placeholder.svg?height=400&width=400&text=Product+Image",
    images: wcProduct.images.map((img) => img.src),
    category: wcProduct.categories[0]?.name || "Non catégorisé",
    slug: wcProduct.slug,
    featured: wcProduct.featured,
    new: false, // You might want to determine this based on date_created or a custom field
    specifications: wcProduct.attributes.reduce((specs: Record<string, string>, attr) => {
      specs[attr.name] = attr.options.join(", ")
      return specs
    }, {}),
    rentalDuration: 36, // Default rental duration, could be customized per product
  }
}

// Fetch all products
export async function fetchProducts(): Promise<any[]> {
  try {
    const url = createWooCommerceUrl("products", {
      per_page: "100",
      status: "publish",
    })

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const products: WooCommerceProduct[] = await response.json()
    return products.map(convertWooCommerceProduct)
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return mock data as fallback
    return []
  }
}

// Fetch featured products
export async function fetchFeaturedProducts(): Promise<any[]> {
  try {
    const url = createWooCommerceUrl("products", {
      per_page: "10",
      featured: "true",
      status: "publish",
    })

    const response = await fetch(url, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.statusText}`)
    }

    const products: WooCommerceProduct[] = await response.json()
    return products.map(convertWooCommerceProduct)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

// Fetch products by category
export async function fetchProductsByCategory(categorySlug: string): Promise<any[]> {
  try {
    // First, get the category ID
    const categoryUrl = createWooCommerceUrl("products/categories", {
      slug: categorySlug,
    })

    const categoryResponse = await fetch(categoryUrl, {
      next: { revalidate: 300 },
    })

    if (!categoryResponse.ok) {
      throw new Error(`Failed to fetch category: ${categoryResponse.statusText}`)
    }

    const categories: WooCommerceCategory[] = await categoryResponse.json()

    if (categories.length === 0) {
      return []
    }

    const categoryId = categories[0].id

    // Now fetch products in this category
    const productsUrl = createWooCommerceUrl("products", {
      per_page: "100",
      category: categoryId.toString(),
      status: "publish",
    })

    const productsResponse = await fetch(productsUrl, {
      next: { revalidate: 300 },
    })

    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products by category: ${productsResponse.statusText}`)
    }

    const products: WooCommerceProduct[] = await productsResponse.json()
    return products.map(convertWooCommerceProduct)
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

// Fetch single product by slug
export async function fetchProductBySlug(slug: string): Promise<any | null> {
  try {
    const url = createWooCommerceUrl("products", {
      slug: slug,
      status: "publish",
    })

    const response = await fetch(url, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const products: WooCommerceProduct[] = await response.json()

    if (products.length === 0) {
      return null
    }

    return convertWooCommerceProduct(products[0])
  } catch (error) {
    console.error("Error fetching product by slug:", error)
    return null
  }
}

// Fetch product categories
export async function fetchCategories(): Promise<WooCommerceCategory[]> {
  try {
    const url = createWooCommerceUrl("products/categories", {
      per_page: "100",
      hide_empty: "true",
    })

    const response = await fetch(url, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`)
    }

    const categories: WooCommerceCategory[] = await response.json()
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Search products
export async function searchProducts(query: string): Promise<any[]> {
  try {
    const url = createWooCommerceUrl("products", {
      per_page: "50",
      search: query,
      status: "publish",
    })

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache search results for 1 minute
    })

    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.statusText}`)
    }

    const products: WooCommerceProduct[] = await response.json()
    return products.map(convertWooCommerceProduct)
  } catch (error) {
    console.error("Error searching products:", error)
    return []
  }
}

// Helper function to format price with Moroccan Dirham formatting
export function formatPriceDH(price: number): string {
  return price
    .toLocaleString("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace("MAD", "DH")
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

export async function fetchRelatedProducts(productId: number, limit = 4): Promise<WordPressProduct[]> {
  const products = getProducts()
  const currentProduct = products.find((p) => p.id === productId)
  if (!currentProduct) return []

  const relatedProducts = products
    .filter((p) => p.category === currentProduct.category && p.id !== productId)
    .slice(0, limit)

  return relatedProducts.map(convertToWordPressProduct)
}

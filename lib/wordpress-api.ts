// WordPress/WooCommerce API functions
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://ekwip.ma/wp-json/wc/v3"
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || ""
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || ""

export interface WooCommerceProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: string
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  images: Array<{
    id: number
    date_created: string
    date_modified: string
    src: string
    name: string
    alt: string
  }>
  attributes: Array<{
    id: number
    name: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
  }>
  default_attributes: any[]
  variations: number[]
  grouped_products: number[]
  menu_order: number
  meta_data: Array<{
    id: number
    key: string
    value: any
  }>
}

export interface WooCommerceCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  display: string
  image: {
    id: number
    date_created: string
    date_modified: string
    src: string
    name: string
    alt: string
  } | null
  menu_order: number
  count: number
}

// Helper function to create auth headers
function getAuthHeaders() {
  const credentials = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64")
  return {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  }
}

// Helper function to handle API errors
function handleApiError(error: any, context: string) {
  console.error(`WooCommerce API Error (${context}):`, error)
  throw new Error(
    `Failed to
  console.error(\`WooCommerce API Error (${context}):`,
    error,
  )
  throw new Error(`Failed to fetch data from WooCommerce API: ${context}`)
}

// Fetch all products
export async function fetchProducts(
  params: {
    page?: number
    per_page?: number
    search?: string
    category?: string
    featured?: boolean
    orderby?: string
    order?: "asc" | "desc"
  } = {},
): Promise<{ products: WooCommerceProduct[]; total: number; totalPages: number }> {
  try {
    const searchParams = new URLSearchParams()

    if (params.page) searchParams.append("page", params.page.toString())
    if (params.per_page) searchParams.append("per_page", params.per_page.toString())
    if (params.search) searchParams.append("search", params.search)
    if (params.category) searchParams.append("category", params.category)
    if (params.featured) searchParams.append("featured", "true")
    if (params.orderby) searchParams.append("orderby", params.orderby)
    if (params.order) searchParams.append("order", params.order)

    const response = await fetch(`${WORDPRESS_API_URL}/products?${searchParams.toString()}`, {
      headers: getAuthHeaders(),
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const products = await response.json()
    const total = Number.parseInt(response.headers.get("X-WP-Total") || "0")
    const totalPages = Number.parseInt(response.headers.get("X-WP-TotalPages") || "0")

    return { products, total, totalPages }
  } catch (error) {
    handleApiError(error, "fetchProducts")
    // Return fallback data
    return { products: [], total: 0, totalPages: 0 }
  }
}

// Fetch featured products
export async function fetchFeaturedProducts(limit = 8): Promise<WooCommerceProduct[]> {
  try {
    const { products } = await fetchProducts({
      featured: true,
      per_page: limit,
      orderby: "popularity",
      order: "desc",
    })
    return products
  } catch (error) {
    handleApiError(error, "fetchFeaturedProducts")
    return []
  }
}

// Fetch recent products
export async function fetchRecentProducts(limit = 8): Promise<WooCommerceProduct[]> {
  try {
    const { products } = await fetchProducts({
      per_page: limit,
      orderby: "date",
      order: "desc",
    })
    return products
  } catch (error) {
    handleApiError(error, "fetchRecentProducts")
    return []
  }
}

// Fetch product by slug
export async function fetchProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/products?slug=${slug}`, {
      headers: getAuthHeaders(),
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const products = await response.json()
    return products.length > 0 ? products[0] : null
  } catch (error) {
    handleApiError(error, "fetchProductBySlug")
    return null
  }
}

// Fetch categories
export async function fetchCategories(): Promise<WooCommerceCategory[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/products/categories?per_page=100&hide_empty=true`, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const categories = await response.json()
    return categories
  } catch (error) {
    handleApiError(error, "fetchCategories")
    return []
  }
}

// Fetch products by category
export async function fetchProductsByCategory(
  categorySlug: string,
  params: {
    page?: number
    per_page?: number
    orderby?: string
    order?: "asc" | "desc"
  } = {},
): Promise<{ products: WooCommerceProduct[]; total: number; totalPages: number }> {
  try {
    // First get the category ID
    const categories = await fetchCategories()
    const category = categories.find((cat) => cat.slug === categorySlug)

    if (!category) {
      return { products: [], total: 0, totalPages: 0 }
    }

    return await fetchProducts({
      ...params,
      category: category.id.toString(),
    })
  } catch (error) {
    handleApiError(error, "fetchProductsByCategory")
    return { products: [], total: 0, totalPages: 0 }
  }
}

// Helper function to format price
export function formatPrice(price: string | number, currency = "DH"): string {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
  if (isNaN(numPrice) || numPrice === 0) return "Prix sur demande"

  return `${numPrice.toLocaleString("fr-FR")} ${currency}`
}

// Helper function to get product image
export function getProductImage(
  product: WooCommerceProduct,
  size: "thumbnail" | "medium" | "large" = "medium",
): string {
  if (product.images && product.images.length > 0) {
    return product.images[0].src
  }
  return "/placeholder.svg?height=300&width=300"
}

// Helper function to check if product is in stock
export function isProductInStock(product: WooCommerceProduct): boolean {
  return product.stock_status === "instock"
}

// Helper function to get product categories
export function getProductCategories(product: WooCommerceProduct): string[] {
  return product.categories.map((cat) => cat.name)
}

// Helper function to get product attributes
export function getProductAttributes(product: WooCommerceProduct): Record<string, string[]> {
  const attributes: Record<string, string[]> = {}

  product.attributes.forEach((attr) => {
    if (attr.visible) {
      attributes[attr.name] = attr.options
    }
  })

  return attributes
}

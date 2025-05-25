// Types for WordPress API responses
export interface WordPressCategory {
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

export interface WordPressProduct {
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

// WordPress API base URL
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://ekwip.ma/wp-json/wc/v3"

// WooCommerce API credentials
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || ""
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || ""

// Helper function to create auth header
const getAuthHeader = () => {
  const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64")
  return `Basic ${auth}`
}

// Function to fetch all categories
export async function fetchAllCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(`${WP_API_URL}/products/categories?per_page=100`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching to always get fresh data
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return [] // Return empty array in case of error
  }
}

// Function to fetch rental categories
export async function fetchRentalCategories(): Promise<WordPressCategory[]> {
  try {
    const categories = await fetchAllCategories()

    // Filter categories that have "rental" or "a-louer" in their slug
    return categories.filter(
      (category) =>
        category.slug.includes("rental") || category.slug.includes("a-louer") || category.slug.includes("location"),
    )
  } catch (error) {
    console.error("Error fetching rental categories:", error)
    return [] // Return empty array in case of error
  }
}

// Function to fetch products by category ID
export async function fetchProductsByCategory(categoryId: number): Promise<WordPressProduct[]> {
  try {
    const response = await fetch(`${WP_API_URL}/products?category=${categoryId}&per_page=20`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    return []
  }
}

// Function to fetch featured products
export async function fetchFeaturedProducts(limit = 8): Promise<WordPressProduct[]> {
  try {
    const response = await fetch(`${WP_API_URL}/products?featured=true&per_page=${limit}`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

// Function to fetch recent products
export async function fetchRecentProducts(limit = 8): Promise<WordPressProduct[]> {
  try {
    const response = await fetch(`${WP_API_URL}/products?orderby=date&order=desc&per_page=${limit}`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch recent products: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching recent products:", error)
    return []
  }
}

// Function to fetch a single product by ID
export async function fetchProductById(productId: number): Promise<WordPressProduct | null> {
  try {
    const response = await fetch(`${WP_API_URL}/products/${productId}`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error)
    return null
  }
}

// Function to fetch a single product by slug
export async function fetchProductBySlug(slug: string): Promise<WordPressProduct | null> {
  try {
    const response = await fetch(`${WP_API_URL}/products?slug=${slug}`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const products = await response.json()
    return products.length > 0 ? products[0] : null
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }
}

// Function to fetch products with filters
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
}): Promise<{ products: WordPressProduct[]; total: number; totalPages: number }> {
  try {
    const queryParams = new URLSearchParams()

    if (filters.category) queryParams.append("category", filters.category.toString())
    if (filters.search) queryParams.append("search", filters.search)
    if (filters.minPrice) queryParams.append("min_price", filters.minPrice.toString())
    if (filters.maxPrice) queryParams.append("max_price", filters.maxPrice.toString())
    if (filters.featured) queryParams.append("featured", "true")
    if (filters.onSale) queryParams.append("on_sale", "true")
    if (filters.inStock) queryParams.append("stock_status", "instock")
    if (filters.orderby) queryParams.append("orderby", filters.orderby)
    if (filters.order) queryParams.append("order", filters.order)

    const page = filters.page || 1
    queryParams.append("page", page.toString())

    const perPage = filters.perPage || 12
    queryParams.append("per_page", perPage.toString())

    const response = await fetch(`${WP_API_URL}/products?${queryParams.toString()}`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch filtered products: ${response.status}`)
    }

    const products = await response.json()
    const total = Number.parseInt(response.headers.get("X-WP-Total") || "0", 10)
    const totalPages = Number.parseInt(response.headers.get("X-WP-TotalPages") || "0", 10)

    return {
      products,
      total,
      totalPages,
    }
  } catch (error) {
    console.error("Error fetching filtered products:", error)
    return {
      products: [],
      total: 0,
      totalPages: 0,
    }
  }
}

// Function to fetch related products
export async function fetchRelatedProducts(productId: number, limit = 4): Promise<WordPressProduct[]> {
  try {
    // First get the product to get its related_ids
    const product = await fetchProductById(productId)

    if (!product || !product.related_ids || product.related_ids.length === 0) {
      // If no related products, fetch from same category
      if (product && product.categories && product.categories.length > 0) {
        const categoryId = product.categories[0].id
        const categoryProducts = await fetchProductsByCategory(categoryId)
        return categoryProducts.filter((p) => p.id !== productId).slice(0, limit)
      }
      return []
    }

    // Fetch each related product
    const relatedProducts = await Promise.all(product.related_ids.slice(0, limit).map((id) => fetchProductById(id)))

    return relatedProducts.filter((p) => p !== null) as WordPressProduct[]
  } catch (error) {
    console.error(`Error fetching related products for ${productId}:`, error)
    return []
  }
}

// Function to fetch client logos from WordPress uploads
export async function fetchClientLogos() {
  try {
    // First try to fetch from WordPress API
    try {
      const wpEndpoint = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/media?per_page=10&media_type=image&search=client-logo`

      const response = await fetch(wpEndpoint, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (response.ok) {
        const data = await response.json()

        // If we have media items, transform them to our format
        if (data && data.length > 0) {
          return data.map((media: any) => ({
            name: media.title?.rendered || `Client ${media.id}`,
            logo: media.source_url || media.guid?.rendered,
          }))
        }
      }
    } catch (wpError) {
      console.error("Error fetching from WordPress API:", wpError)
      // Continue to fallback if WordPress API fails
    }

    // Fallback to local images if WordPress API fails
    console.log("Falling back to local client logo images")
    return [
      { name: "Client 1", logo: "/images/client-logo-1.png" },
      { name: "Client 2", logo: "/images/client-logo-2.png" },
      { name: "Client 3", logo: "/images/client-logo-3.png" },
      { name: "Client 4", logo: "/images/client-logo-4.png" },
      { name: "Client 5", logo: "/images/client-logo-5.png" },
      { name: "Client 6", logo: "/images/client-logo-6.png" },
    ]
  } catch (error) {
    console.error("Error in fetchClientLogos:", error)
    // Return default logos as ultimate fallback
    return [
      { name: "Client 1", logo: "/images/client-logo-1.png" },
      { name: "Client 2", logo: "/images/client-logo-2.png" },
      { name: "Client 3", logo: "/images/client-logo-3.png" },
      { name: "Client 4", logo: "/images/client-logo-4.png" },
      { name: "Client 5", logo: "/images/client-logo-5.png" },
      { name: "Client 6", logo: "/images/client-logo-6.png" },
    ]
  }
}

// Helper function to format WooCommerce price
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price

  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice)
}

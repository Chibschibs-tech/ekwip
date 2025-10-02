import type { Product } from "@/types/product"

/**
 * Récupère tous les produits depuis localStorage
 */
export function getAllProducts(): Product[] {
  if (typeof window === "undefined") return []

  try {
    const productsData = localStorage.getItem("products")
    if (!productsData) return []

    const products = JSON.parse(productsData)
    return Array.isArray(products) ? products : []
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error)
    return []
  }
}

/**
 * Récupère un produit par son slug
 */
export function getProductBySlug(slug: string): Product | null {
  const products = getAllProducts()
  return products.find((p) => p.slug === slug) || null
}

/**
 * Récupère les produits d'une catégorie
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  const products = getAllProducts()
  return products.filter((p) => p.categories?.some((cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug))
}

/**
 * Récupère les produits d'une marque
 */
export function getProductsByBrand(brandSlug: string): Product[] {
  const products = getAllProducts()
  return products.filter((p) => p.brand?.toLowerCase().replace(/\s+/g, "-") === brandSlug)
}

/**
 * Recherche de produits
 */
export function searchProducts(query: string): Product[] {
  const products = getAllProducts()
  const searchTerm = query.toLowerCase()

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm) ||
      p.brand?.toLowerCase().includes(searchTerm) ||
      p.sku?.toLowerCase().includes(searchTerm),
  )
}

/**
 * Récupère les catégories depuis localStorage
 */
export function getAllCategories() {
  if (typeof window === "undefined") return []

  try {
    const categoriesData = localStorage.getItem("categories")
    if (!categoriesData) return []

    const categories = JSON.parse(categoriesData)
    return Array.isArray(categories) ? categories : []
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error)
    return []
  }
}

/**
 * Récupère une catégorie par son slug
 */
export function getCategoryBySlug(slug: string) {
  const categories = getAllCategories()
  return categories.find((c: any) => c.slug === slug) || null
}

/**
 * Récupère les marques depuis localStorage
 */
export function getAllBrands() {
  if (typeof window === "undefined") return []

  try {
    const brandsData = localStorage.getItem("brands")
    if (!brandsData) return []

    const brands = JSON.parse(brandsData)
    return Array.isArray(brands) ? brands : []
  } catch (error) {
    console.error("Erreur lors de la récupération des marques:", error)
    return []
  }
}

/**
 * Récupère les produits en vedette
 */
export function getFeaturedProducts(limit = 6): Product[] {
  const products = getAllProducts()
  return products.filter((p) => p.featured).slice(0, limit)
}

/**
 * Récupère les produits les plus récents
 */
export function getLatestProducts(limit = 6): Product[] {
  const products = getAllProducts()
  return products
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, limit)
}

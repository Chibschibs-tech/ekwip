"use client"

import { useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"

export function BoutiquePopularCategories() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  const { products, loading: productsLoading, error: productsError } = useProducts()

  // Get active categories and count sale products per category
  const categoriesWithCounts = useMemo(() => {
    const activeCategories = categories.filter((cat) => cat.isActive)
    
    // Debug logging
    console.log("[PopularCategories] Total categories:", categories.length)
    console.log("[PopularCategories] Active categories:", activeCategories.length)
    console.log("[PopularCategories] Total products:", products.length)
    const saleProducts = products.filter(p => p.productType === "sale" && p.status === "active")
    console.log("[PopularCategories] Sale products:", saleProducts.length)
    
    const withCounts = activeCategories
      .map((category) => {
        const categoryProducts = products.filter(
          (p) => p.categoryId === category.id && p.productType === "sale" && p.status === "active"
        )
        if (categoryProducts.length > 0) {
          console.log(`[PopularCategories] Category "${category.name}" has ${categoryProducts.length} products`)
        }
        return {
          ...category,
          productCount: categoryProducts.length,
        }
      })
      .filter((cat) => cat.productCount > 0)
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, 7) // Show top 7 categories (like the screenshot)
    
    console.log("[PopularCategories] Categories with counts:", withCounts.length, withCounts.map(c => `${c.name} (${c.productCount})`))
    return withCounts
  }, [categories, products])

  const loading = categoriesLoading || productsLoading
  const hasError = categoriesError || productsError

  useEffect(() => {
    console.log("[PopularCategories] Render state:", {
      loading,
      hasError,
      categoriesCount: categories.length,
      productsCount: products.length,
      categoriesWithCounts: categoriesWithCounts.length,
    })
  }, [loading, hasError, categories.length, products.length, categoriesWithCounts.length])

  // Show loading state
  if (loading) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (hasError) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular Categories</h2>
          </div>
          <div className="text-center py-8 text-slate-600">
            <p>Unable to load categories. Please refresh the page.</p>
            {categoriesError && <p className="text-sm text-red-500 mt-2">{categoriesError}</p>}
            {productsError && <p className="text-sm text-red-500 mt-2">{productsError}</p>}
          </div>
        </div>
      </section>
    )
  }

  // Always show section header, even if empty (for debugging)
  if (categoriesWithCounts.length === 0) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular Categories</h2>
          </div>
          <div className="text-center py-8 text-slate-600 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-lg font-medium mb-2">No categories with products found</p>
            <p className="text-sm text-slate-500">
              Debug: {categories.length} categories loaded, {products.filter(p => p.productType === "sale" && p.status === "active").length} sale products
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Check browser console for detailed logging
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header - matching screenshot style */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular Categories</h2>
        </div>

        {/* Category Cards Grid - matching screenshot layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {categoriesWithCounts.map((category) => (
            <Link 
              key={category.id} 
              href={`/boutique/${category.slug}`}
              className="block group"
            >
              <Card className="h-full overflow-hidden rounded-lg border border-gray-200 hover:border-[#1f3b57] hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Category Image */}
                  <div className="relative w-full aspect-square bg-white overflow-hidden rounded-t-lg">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain p-3 md:p-4 group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                        <div className="w-16 h-16 rounded-full bg-[#1f3b57] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-colors">
                          <span className="text-2xl font-bold text-[#1f3b57] opacity-50">
                            {category.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Category Info */}
                  <div className="p-3 md:p-4 text-center flex-1 flex flex-col justify-center bg-white rounded-b-lg">
                    <h3 className="font-semibold text-sm md:text-base text-slate-900 mb-1 line-clamp-2 group-hover:text-[#1f3b57] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      {category.productCount} product{category.productCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


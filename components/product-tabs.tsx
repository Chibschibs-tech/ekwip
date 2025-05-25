"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CategoryCard from "@/components/category-card"
import ProductCard from "@/components/product-card"
import {
  fetchAllCategories,
  fetchFeaturedProducts,
  fetchRecentProducts,
  type WordPressCategory,
  type WordPressProduct,
} from "@/lib/wordpress-api"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("featured")
  const [categories, setCategories] = useState<WordPressCategory[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<WordPressProduct[]>([])
  const [newProducts, setNewProducts] = useState<WordPressProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch categories and products in parallel
        const [categoriesData, featuredData, recentData] = await Promise.all([
          fetchAllCategories(),
          fetchFeaturedProducts(8),
          fetchRecentProducts(8),
        ])

        setCategories(categoriesData.filter((cat) => cat.count > 0).slice(0, 4))
        setFeaturedProducts(featuredData)
        setNewProducts(recentData)
      } catch (error) {
        console.error("Error fetching product data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading skeleton for categories
  const CategorySkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
    </div>
  )

  // Loading skeleton for products
  const ProductSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
      <Skeleton className="h-6 w-1/3 rounded" />
    </div>
  )

  return (
    <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="categories">Catégories</TabsTrigger>
        <TabsTrigger value="featured">Populaires</TabsTrigger>
        <TabsTrigger value="new">Nouveautés</TabsTrigger>
      </TabsList>

      <TabsContent value="categories" className="mt-0">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.name}
                description={`${category.count} produits`}
                image={category.image?.src || "/placeholder.svg?height=300&width=300"}
                href={`/catalogue/${category.slug}`}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="featured" className="mt-0">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                description={product.short_description}
                price={Number.parseFloat(product.price)}
                salePrice={product.sale_price ? Number.parseFloat(product.sale_price) : undefined}
                image={product.images[0]?.src || "/placeholder.svg?height=300&width=300"}
                category={product.categories[0]?.name || ""}
                href={`/store/product/${product.slug}`}
                badge={product.featured ? "Populaire" : undefined}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="new" className="mt-0">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                description={product.short_description}
                price={Number.parseFloat(product.price)}
                salePrice={product.sale_price ? Number.parseFloat(product.sale_price) : undefined}
                image={product.images[0]?.src || "/placeholder.svg?height=300&width=300"}
                category={product.categories[0]?.name || ""}
                href={`/store/product/${product.slug}`}
                badge="Nouveau"
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

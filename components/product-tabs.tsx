"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/product-card"
import { getProducts, getProductsByCategory } from "@/lib/products"

const categories = [
  { id: "all", name: "Tous", slug: "all" },
  { id: "laptops", name: "Ordinateurs portables", slug: "Ordinateurs portables" },
  { id: "desktops", name: "Ordinateurs de bureau", slug: "Ordinateurs de bureau" },
  { id: "smartphones", name: "Smartphones", slug: "Smartphones" },
]

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all")

  // Get products based on active tab
  const getProductsForTab = (tabId: string) => {
    if (tabId === "all") {
      return getProducts() || []
    }
    const category = categories.find((cat) => cat.id === tabId)
    if (category) {
      return getProductsByCategory(category.slug) || []
    }
    return []
  }

  const products = getProductsForTab(activeTab)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id} className="text-sm">
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Aucun produit disponible dans cette catégorie.</p>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

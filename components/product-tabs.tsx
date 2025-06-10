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
      <TabsList className="grid w-full grid-cols-4 mb-8 bg-transparent gap-2">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className={`
              text-sm transition-all duration-300 px-6 py-3 rounded-xl font-medium
              data-[state=active]:bg-ekwip 
              data-[state=active]:text-gray-100 
              data-[state=active]:shadow-lg 
              data-[state=active]:shadow-ekwip/30
              data-[state=active]:transform 
              data-[state=active]:scale-105
              data-[state=active]:-translate-y-1
              data-[state=active]:border-b-4
              data-[state=active]:border-ekwip-dark
              data-[state=inactive]:text-gray-600 
              data-[state=inactive]:bg-gray-50
              data-[state=inactive]:hover:text-gray-800 
              data-[state=inactive]:hover:bg-gray-100
              data-[state=inactive]:hover:shadow-md
              data-[state=inactive]:hover:transform
              data-[state=inactive]:hover:scale-102
              data-[state=inactive]:shadow-sm
            `}
          >
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

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, categories } from "@/lib/products"

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("laptops")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8">
        {categories.slice(0, 5).map((category) => (
          <TabsTrigger key={category.id} value={category.id} className="text-sm">
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.slice(0, 5).map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory(category.id)
              .slice(0, 6)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default ProductTabs

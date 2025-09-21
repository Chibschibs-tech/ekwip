"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { categories, getProductsByCategory } from "@/lib/products"

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState(categories[0].id)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-gray-100 p-1 rounded-xl">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="tab-button px-6 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

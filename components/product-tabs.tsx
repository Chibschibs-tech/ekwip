"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/products"

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all")

  const getProductsByCategory = (categoryId: string) => {
    if (categoryId === "all") return products.slice(0, 8)
    return products.filter((product) => product.category === categoryId).slice(0, 8)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5 mb-8">
        <TabsTrigger value="all" className="data-[state=active]:bg-ekwip data-[state=active]:text-white">
          Tous
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="data-[state=active]:bg-ekwip data-[state=active]:text-white"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getProductsByCategory("all").map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getProductsByCategory(category.id).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default ProductTabs

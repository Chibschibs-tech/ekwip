"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/product-card"
import { products, categories } from "@/lib/products"

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProducts =
    activeTab === "all"
      ? products.slice(0, 8)
      : products.filter((product) => product.category === activeTab).slice(0, 4)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8">
        <TabsTrigger value="all">Tous</TabsTrigger>
        {categories.slice(0, 6).map((category) => (
          <TabsTrigger key={category.id} value={category.id} className="text-xs lg:text-sm">
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

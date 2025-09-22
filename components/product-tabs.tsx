"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

const categories = [
  { id: "all", name: "Tous", filter: () => true },
  { id: "ordinateurs-portables", name: "Portables", filter: (p: any) => p.category === "ordinateurs-portables" },
  { id: "ordinateurs-bureau", name: "Bureau", filter: (p: any) => p.category === "ordinateurs-bureau" },
  { id: "smartphones-tablettes", name: "Mobiles", filter: (p: any) => p.category === "smartphones-tablettes" },
]

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all")

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
        <TabsContent key={category.id} value={category.id} className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter(category.filter)
              .slice(0, 8)
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

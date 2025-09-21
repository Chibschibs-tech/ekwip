"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts, getNewProducts, getProducts } from "@/lib/products"

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("featured")

  const featuredProducts = getFeaturedProducts()
  const newProducts = getNewProducts()
  const allProducts = getProducts()

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="featured" className="data-[state=active]:bg-[#1f3b57] data-[state=active]:text-white">
          Populaires
        </TabsTrigger>
        <TabsTrigger value="new" className="data-[state=active]:bg-[#1f3b57] data-[state=active]:text-white">
          Nouveautés
        </TabsTrigger>
        <TabsTrigger value="all" className="data-[state=active]:bg-[#1f3b57] data-[state=active]:text-white">
          Tous les produits
        </TabsTrigger>
      </TabsList>

      <TabsContent value="featured">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="new">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="all">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default ProductTabs

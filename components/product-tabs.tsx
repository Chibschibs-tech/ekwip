"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, categories } from "@/lib/products"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const products = {
  laptops: [
    {
      name: 'MacBook Pro 14"',
      price: "450 DH/mois",
      duration: "(36 mois)",
      image: "/images/macbook-pro.png",
      specs: ["Apple M2 Pro", "16GB RAM", "512GB SSD", 'Écran Retina 14"'],
      id: 1,
      slug: "macbook-pro-14",
    },
    {
      name: "Dell XPS 13",
      price: "380 DH/mois",
      duration: "(36 mois)",
      image: "/images/dell-xps.png",
      specs: ["Intel i7", "16GB RAM", "512GB SSD", 'Écran 13.3" FHD'],
      id: 2,
      slug: "dell-xps-13",
    },
  ],
  desktops: [
    {
      name: 'iMac 24"',
      price: "520 DH/mois",
      duration: "(36 mois)",
      image: "/images/imac.png",
      specs: ["Apple M1", "8GB RAM", "256GB SSD", 'Écran Retina 24"'],
      id: 3,
      slug: "imac-24",
    },
  ],
  smartphones: [
    {
      name: "iPhone 14 Pro",
      price: "280 DH/mois",
      duration: "(24 mois)",
      image: "/images/iphone.png",
      specs: ["128GB", "Caméra Pro", "5G", "Face ID"],
      id: 4,
      slug: "iphone-14-pro",
    },
  ],
}

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState(categories[0]?.slug || "ordinateurs-portables")

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.slug} value={category.slug} className="text-sm py-3">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.slug} value={category.slug}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProductsByCategory(category.slug)
                .slice(0, 6)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center mt-12">
        <Link href="/catalogue">
          <Button size="lg" variant="outline" className="border-ekwip text-ekwip hover:bg-ekwip-50 bg-transparent">
            Voir tout le catalogue
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProductTabs

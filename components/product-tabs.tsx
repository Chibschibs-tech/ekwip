"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

export function ProductTabs() {
  const categories = [
    {
      id: "ordinateurs-portables",
      name: "Ordinateurs portables",
      products: [
        {
          id: "macbook-pro-14",
          name: 'MacBook Pro 14"',
          description: "Puce M3 Pro, 18 Go RAM, 512 Go SSD",
          price: "250 DH/mois (36 mois)",
          image: "/images/macbook-pro.png",
          slug: "macbook-pro-14",
        },
        {
          id: "dell-xps-13",
          name: "Dell XPS 13",
          description: "Intel i7, 16 Go RAM, 512 Go SSD",
          price: "180 DH/mois (36 mois)",
          image: "/images/dell-xps.png",
          slug: "dell-xps-13",
        },
      ],
    },
    {
      id: "ordinateurs-bureau",
      name: "Ordinateurs de bureau",
      products: [
        {
          id: "imac-24",
          name: 'iMac 24"',
          description: "Puce M3, 16 Go RAM, 512 Go SSD",
          price: "220 DH/mois (36 mois)",
          image: "/images/imac.png",
          slug: "imac-24",
        },
      ],
    },
    {
      id: "smartphones",
      name: "Smartphones",
      products: [
        {
          id: "iphone-15-pro",
          name: "iPhone 15 Pro",
          description: "128 Go, Titane naturel",
          price: "120 DH/mois (24 mois)",
          image: "/images/iphone.png",
          slug: "iphone-15-pro",
        },
      ],
    },
  ]

  return (
    <div className="w-full">
      <Tabs defaultValue="ordinateurs-portables" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-sm">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="text-center">
        <Link href="/catalogue">
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
            Voir tout le catalogue
          </Button>
        </Link>
      </div>
    </div>
  )
}

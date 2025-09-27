"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  isNew?: boolean
  isPopular?: boolean
}

const productCategories = {
  "Ordinateurs portables": [
    {
      id: "1",
      name: 'MacBook Pro 14"',
      description: "Processeur M2 Pro, 16 Go RAM, 512 Go SSD",
      price: "120 DH/mois",
      image: "/images/macbook-pro.png",
      isPopular: true,
    },
    {
      id: "2",
      name: "Dell XPS 15",
      description: "Intel i7, 32 Go RAM, 1 To SSD, écran 4K",
      price: "95 DH/mois",
      image: "/images/dell-xps.png",
      isNew: true,
    },
  ],
  "Ordinateurs de bureau": [
    {
      id: "3",
      name: 'iMac 24"',
      description: "Puce M2, 16 Go RAM, 512 Go SSD, écran Retina 4.5K",
      price: "110 DH/mois",
      image: "/images/imac.png",
      isPopular: true,
    },
    {
      id: "4",
      name: "Dell OptiPlex",
      description: "Intel i5, 16 Go RAM, 512 Go SSD, format compact",
      price: "75 DH/mois",
      image: "/images/dell-xps.png",
    },
  ],
  Smartphones: [
    {
      id: "5",
      name: "iPhone 15 Pro",
      description: "256 Go, forfait data 100 Go inclus",
      price: "45 DH/mois",
      image: "/images/iphone.png",
      isPopular: true,
    },
  ],
}

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<string>("Ordinateurs portables")
  const categories = Object.keys(productCategories)

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 border-b">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === category
                ? "text-[#1f3b57] border-[#1f3b57]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productCategories[activeTab as keyof typeof productCategories]?.map((product) => (
          <Card key={product.id} className="h-full hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
              {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nouveau</Badge>}
              {product.isPopular && <Badge className="absolute top-2 right-2 bg-[#1f3b57]">Populaire</Badge>}
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#1f3b57]">{product.price}</span>
                <Link href={`/catalogue/product/${product.id}`}>
                  <Button size="sm" variant="outline">
                    Voir détails
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

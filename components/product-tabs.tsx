"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const products = {
  laptops: [
    {
      name: 'MacBook Pro 14"',
      price: "450 DH/mois",
      duration: "(36 mois)",
      image: "/images/macbook-pro.png",
      specs: ["Apple M2 Pro", "16GB RAM", "512GB SSD", 'Écran Retina 14"'],
    },
    {
      name: "Dell XPS 13",
      price: "380 DH/mois",
      duration: "(36 mois)",
      image: "/images/dell-xps.png",
      specs: ["Intel i7", "16GB RAM", "512GB SSD", 'Écran 13.3" FHD'],
    },
  ],
  desktops: [
    {
      name: 'iMac 24"',
      price: "520 DH/mois",
      duration: "(36 mois)",
      image: "/images/imac.png",
      specs: ["Apple M1", "8GB RAM", "256GB SSD", 'Écran Retina 24"'],
    },
  ],
  smartphones: [
    {
      name: "iPhone 14 Pro",
      price: "280 DH/mois",
      duration: "(24 mois)",
      image: "/images/iphone.png",
      specs: ["128GB", "Caméra Pro", "5G", "Face ID"],
    },
  ],
}

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("laptops")

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="laptops">Ordinateurs portables</TabsTrigger>
          <TabsTrigger value="desktops">Ordinateurs fixes</TabsTrigger>
          <TabsTrigger value="smartphones">Smartphones</TabsTrigger>
        </TabsList>

        <TabsContent value="laptops" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.laptops.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-video relative mb-4 bg-gray-50 rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-ekwip">{product.price}</span>
                    <Badge variant="secondary">{product.duration}</Badge>
                  </div>
                  <ul className="space-y-1 mb-4 text-sm text-gray-600">
                    {product.specs.map((spec, specIndex) => (
                      <li key={specIndex}>• {spec}</li>
                    ))}
                  </ul>
                  <Button className="w-full bg-ekwip hover:bg-ekwip-700">Demander un devis</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="desktops" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.desktops.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-video relative mb-4 bg-gray-50 rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-ekwip">{product.price}</span>
                    <Badge variant="secondary">{product.duration}</Badge>
                  </div>
                  <ul className="space-y-1 mb-4 text-sm text-gray-600">
                    {product.specs.map((spec, specIndex) => (
                      <li key={specIndex}>• {spec}</li>
                    ))}
                  </ul>
                  <Button className="w-full bg-ekwip hover:bg-ekwip-700">Demander un devis</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="smartphones" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.smartphones.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-video relative mb-4 bg-gray-50 rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-ekwip">{product.price}</span>
                    <Badge variant="secondary">{product.duration}</Badge>
                  </div>
                  <ul className="space-y-1 mb-4 text-sm text-gray-600">
                    {product.specs.map((spec, specIndex) => (
                      <li key={specIndex}>• {spec}</li>
                    ))}
                  </ul>
                  <Button className="w-full bg-ekwip hover:bg-ekwip-700">Demander un devis</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-8">
        <Link href="/catalogue">
          <Button size="lg" variant="outline" className="border-ekwip text-ekwip hover:bg-ekwip-50 bg-transparent">
            Voir tout le catalogue
          </Button>
        </Link>
      </div>
    </div>
  )
}

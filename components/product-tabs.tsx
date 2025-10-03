"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductsByCategory } from "@/lib/products"
import type { Product } from "@/lib/products"
import type { Category } from "@/types/admin"

interface ProductTabsProps {
  products: Product[]
}

export function ProductTabs({ products }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    // Charger les catégories depuis localStorage
    try {
      const stored = localStorage.getItem("ekwip_admin_categories")
      if (stored) {
        const allCategories = JSON.parse(stored)
        const activeCategories = allCategories.filter((cat: Category) => cat.isActive)
        setCategories(activeCategories)
      }
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }, [])

  useEffect(() => {
    if (activeTab === "all") {
      setDisplayedProducts(products)
    } else {
      const filtered = getProductsByCategory(activeTab)
      setDisplayedProducts(filtered)
    }
  }, [activeTab, products])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre catalogue d'équipements</h2>
          <p className="text-lg text-gray-600">
            Découvrez notre gamme complète d'équipements informatiques professionnels
          </p>
        </div>

        {/* Tabs de catégories - une seule ligne avec scroll horizontal */}
        <div className="mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="inline-flex gap-2 min-w-full pb-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-[#1f3b57] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tous les produits
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === category.id
                    ? "bg-[#1f3b57] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.slice(0, 6).map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gray-50">
                  {product.isNew && (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white z-10">Nouveau</Badge>
                  )}
                  {product.isPopular && (
                    <Badge className="absolute top-4 left-4 bg-blue-500 text-white z-10">Populaire</Badge>
                  )}
                  <Link href={`/catalogue/product/${product.slug}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.brand}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <Link href={`/catalogue/product/${product.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#1f3b57] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#1f3b57]">{product.price} DH</p>
                      <p className="text-xs text-gray-500">par mois HT</p>
                    </div>
                    <Link href={`/catalogue/product/${product.slug}`}>
                      <Button className="bg-[#1f3b57] hover:bg-[#1f3b57]/90">Découvrir</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/catalogue">
            <Button size="lg" variant="outline" className="bg-transparent">
              Voir tout le catalogue
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

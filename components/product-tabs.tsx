"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  brand: string
  category: string
  categoryId: string
  isNew?: boolean
  isPopular?: boolean
  isFeatured?: boolean
}

interface Category {
  id: string
  name: string
  slug: string
  isActive: boolean
}

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Charger les catégories depuis localStorage
    try {
      const storedCategories = localStorage.getItem("ekwip_admin_categories")
      if (storedCategories) {
        const allCategories = JSON.parse(storedCategories)
        const activeCategories = allCategories.filter((cat: Category) => cat.isActive)
        setCategories(activeCategories)
      }
    } catch (error) {
      console.error("Error loading categories:", error)
    }

    // Charger les produits depuis localStorage
    try {
      const storedProducts = localStorage.getItem("ekwip_admin_products")
      if (storedProducts) {
        const allProducts = JSON.parse(storedProducts)
        const activeProducts = allProducts
          .filter((p: any) => p.status === "active")
          .map((p: any) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            description: p.shortDescription || p.description || "",
            price: p.rentalDurations?.[0]?.monthlyPrice || p.price || 0,
            image: p.thumbnail || p.images?.[0] || "/placeholder.svg",
            brand: p.brandId || "Sans marque",
            category: p.categoryId || "Sans catégorie",
            categoryId: p.categoryId || "",
            isNew: p.isNew || false,
            isPopular: p.isPopular || false,
            isFeatured: p.isFeatured || false,
          }))
        setProducts(activeProducts)
        setDisplayedProducts(activeProducts.slice(0, 6))
      }
    } catch (error) {
      console.error("Error loading products:", error)
    }
  }, [mounted])

  useEffect(() => {
    if (activeTab === "all") {
      setDisplayedProducts(products.slice(0, 6))
    } else {
      const filtered = products.filter((p) => p.categoryId === activeTab)
      setDisplayedProducts(filtered.slice(0, 6))
    }
  }, [activeTab, products])

  if (!mounted) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Chargement des produits...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Tabs de catégories - une seule ligne avec scroll horizontal */}
      <div className="mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="inline-flex gap-2 min-w-full pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "all" ? "bg-[#1f3b57] text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun produit disponible pour le moment.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/catalogue">
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-[#1f3b57] text-[#1f3b57] hover:bg-[#1f3b57]/10"
          >
            Voir tout le catalogue
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProductTabs

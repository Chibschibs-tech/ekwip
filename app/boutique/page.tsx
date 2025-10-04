"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, ShoppingCart, Grid, List } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  image: string
  images: string[]
  brand: string
  category: string
  inStock: boolean
  isFeatured: boolean
  productType: "rent" | "sale"
}

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    try {
      const storedProducts = localStorage.getItem("ekwip_admin_products")
      const storedCategories = localStorage.getItem("ekwip_admin_categories")
      const storedBrands = localStorage.getItem("ekwip_admin_brands")

      if (storedProducts) {
        const adminProducts = JSON.parse(storedProducts)
        const adminCategories = storedCategories ? JSON.parse(storedCategories) : []
        const adminBrands = storedBrands ? JSON.parse(storedBrands) : []

        const saleProducts = adminProducts
          .filter((p: any) => p.status === "active" && p.productType === "sale")
          .map((p: any) => {
            const category = adminCategories.find((c: any) => c.id === p.categoryId)
            const brand = adminBrands.find((b: any) => b.id === p.brandId)

            return {
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description || p.shortDescription || "",
              shortDescription: p.shortDescription || "",
              price: p.price || 0,
              compareAtPrice: p.compareAtPrice,
              image: p.thumbnail || p.images?.[0] || "/placeholder.svg",
              images: p.images || [p.thumbnail || "/placeholder.svg"],
              brand: brand?.name || "Sans marque",
              category: category?.name || "Sans catégorie",
              inStock: (p.stockQuantity || 0) > 0,
              isFeatured: p.isFeatured || false,
              productType: p.productType || "sale",
            }
          })

        setProducts(saleProducts)
      }
    } catch (error) {
      console.error("Error loading products:", error)
    }
  }, [mounted])

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, sortBy])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Notre boutique</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez tous nos équipements professionnels disponibles à la vente
          </p>
        </div>
      </section>

      <section className="py-8 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-4xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                Recherche: {searchTerm} ×
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("all")}>
                {selectedCategory} ×
              </Badge>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
              {filteredProducts.length > 1 ? "s" : ""}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucun produit trouvé avec ces critères.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative bg-gray-100 aspect-square overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.isFeatured && (
                            <Badge className="absolute top-3 right-3 bg-[#1f3b57] hover:bg-[#1f3b57]/80">
                              <Star className="h-3 w-3 mr-1" />
                              Populaire
                            </Badge>
                          )}
                          {!product.inStock && (
                            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">Rupture</Badge>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-[#1f3b57] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              {product.compareAtPrice && (
                                <p className="text-sm text-gray-500 line-through">{product.compareAtPrice} DH HT</p>
                              )}
                              <p className="text-xl font-bold text-[#1f3b57]">{product.price} DH HT</p>
                              <p className="text-xs text-gray-500">{(product.price * 1.2).toFixed(2)} DH TTC</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/boutique/produit/${product.slug}`} className="flex-1">
                              <Button className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/80">Voir détails</Button>
                            </Link>
                            <Button variant="outline" size="icon" disabled={!product.inStock}>
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <div className="relative w-48 h-48 bg-gray-100 overflow-hidden rounded-l-lg flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-4"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-xl group-hover:text-[#1f3b57] transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex gap-2">
                                {product.isFeatured && (
                                  <Badge className="bg-[#1f3b57] hover:bg-[#1f3b57]/80">
                                    <Star className="h-3 w-3 mr-1" />
                                    Populaire
                                  </Badge>
                                )}
                                {!product.inStock && <Badge className="bg-red-500 hover:bg-red-600">Rupture</Badge>}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                {product.compareAtPrice && (
                                  <p className="text-sm text-gray-500 line-through">{product.compareAtPrice} DH HT</p>
                                )}
                                <p className="text-2xl font-bold text-[#1f3b57]">{product.price} DH HT</p>
                                <p className="text-sm text-gray-500">{(product.price * 1.2).toFixed(2)} DH TTC</p>
                              </div>
                              <div className="flex gap-2">
                                <Link href={`/boutique/produit/${product.slug}`}>
                                  <Button className="bg-[#1f3b57] hover:bg-[#1f3b57]/80">Voir détails</Button>
                                </Link>
                                <Button variant="outline" size="icon" disabled={!product.inStock}>
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

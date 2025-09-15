"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, ShoppingCart, Grid, List } from "lucide-react"
import { products } from "@/lib/products"
import { useLanguage } from "@/contexts/language-context"

export default function StorePage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
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
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Notre boutique</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez tous nos équipements professionnels disponibles en location
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-4xl">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
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

              {/* Sort */}
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

            {/* View Mode */}
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

          {/* Active Filters */}
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

      {/* Products */}
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
                        {/* Grid View */}
                        <div className="relative bg-gray-100 aspect-square overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.new && (
                            <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">Nouveau</Badge>
                          )}
                          {product.featured && (
                            <Badge className="absolute top-3 right-3 bg-ekwip hover:bg-ekwip-700">
                              <Star className="h-3 w-3 mr-1" />
                              Populaire
                            </Badge>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-ekwip transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-500">À partir de</p>
                              <p className="text-xl font-bold text-ekwip">
                                {product.price}€<span className="text-sm font-normal">/mois</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/store/product/${product.slug}`} className="flex-1">
                              <Button className="w-full bg-ekwip hover:bg-ekwip-700">Voir détails</Button>
                            </Link>
                            <Button variant="outline" size="icon">
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
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
                              <h3 className="font-semibold text-xl group-hover:text-ekwip transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex gap-2">
                                {product.new && <Badge className="bg-green-500 hover:bg-green-600">Nouveau</Badge>}
                                {product.featured && (
                                  <Badge className="bg-ekwip hover:bg-ekwip-700">
                                    <Star className="h-3 w-3 mr-1" />
                                    Populaire
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">À partir de</p>
                                <p className="text-2xl font-bold text-ekwip">
                                  {product.price}€<span className="text-sm font-normal">/mois</span>
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Link href={`/store/product/${product.slug}`}>
                                  <Button className="bg-ekwip hover:bg-ekwip-700">Voir détails</Button>
                                </Link>
                                <Button variant="outline" size="icon">
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

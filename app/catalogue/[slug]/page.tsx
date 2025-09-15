"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProductsByCategory, formatPrice } from "@/lib/products"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

const categoryMap: { [key: string]: string } = {
  "ordinateurs-portables": "Ordinateurs portables",
  "ordinateurs-de-bureau": "Ordinateurs de bureau",
  smartphones: "Smartphones",
  tablettes: "Tablettes",
  accessoires: "Accessoires",
  imprimantes: "Imprimantes",
  mobilier: "Mobilier",
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryMap[params.slug]
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (!categoryName) {
    notFound()
  }

  let products = getProductsByCategory(categoryName)

  // Filter by search term
  if (searchTerm) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Sort products
  products = products.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">{products.length} produits disponibles</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom A-Z</SelectItem>
              <SelectItem value="price-low">Prix croissant</SelectItem>
              <SelectItem value="price-high">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun produit trouvé pour cette recherche.</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    <>
                      {/* Grid View */}
                      <div className="relative">
                        <div className="aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.featured && (
                            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Populaire</Badge>
                          )}
                          {product.new && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Nouveau</Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.shortDescription}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)} DH</span>
                            <span className="text-sm text-gray-600">/mois</span>
                            {product.rentalDuration && (
                              <span className="text-sm text-gray-600">({product.rentalDuration} mois)</span>
                            )}
                          </div>
                          {product.firstMonthPrice && (
                            <p className="text-sm text-gray-600">
                              {formatPrice(product.firstMonthPrice)} DH Le 1er mois
                            </p>
                          )}
                        </div>
                        <Link href={`/catalogue/product/${product.slug}`}>
                          <Button className="w-full bg-[#334e68] hover:bg-[#2a3f5f] text-white">Voir détails</Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* List View */}
                      <div className="flex gap-4 p-6">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex gap-2 mb-2">
                            {product.featured && (
                              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Populaire</Badge>
                            )}
                            {product.new && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Nouveau</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{product.shortDescription}</p>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)} DH</span>
                                <span className="text-sm text-gray-600">/mois</span>
                                {product.rentalDuration && (
                                  <span className="text-sm text-gray-600">({product.rentalDuration} mois)</span>
                                )}
                              </div>
                              {product.firstMonthPrice && (
                                <p className="text-sm text-gray-600">
                                  {formatPrice(product.firstMonthPrice)} DH Le 1er mois
                                </p>
                              )}
                            </div>
                            <Link href={`/catalogue/product/${product.slug}`}>
                              <Button className="bg-[#334e68] hover:bg-[#2a3f5f] text-white">Voir détails</Button>
                            </Link>
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
    </div>
  )
}

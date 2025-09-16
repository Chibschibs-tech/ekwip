"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categoryName = categoryMap[params.slug]
  if (!categoryName) {
    notFound()
  }

  const allProducts = getProductsByCategory(categoryName)
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">{filteredProducts.length} produits disponibles</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-square bg-gray-100 overflow-hidden rounded-t-lg relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                          {product.featured && <Badge className="bg-orange-100 text-orange-800">Populaire</Badge>}
                          {product.new && <Badge className="bg-green-100 text-green-800">Nouveau</Badge>}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{product.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)} DH</span>
                            <span className="text-sm text-gray-600">/mois</span>
                            {product.rentalDuration && (
                              <span className="text-sm text-gray-600"> ({product.rentalDuration} mois)</span>
                            )}
                            {product.firstMonthPrice && (
                              <p className="text-xs text-gray-500">
                                {formatPrice(product.firstMonthPrice)} DH Le 1er mois
                              </p>
                            )}
                          </div>
                          <Link href={`/catalogue/product/${product.slug}`}>
                            <Button size="sm" className="bg-[#334e68] hover:bg-[#2a3f5f] text-white">
                              Voir détails
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex p-6 gap-6">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                          {product.featured && <Badge className="bg-orange-100 text-orange-800">Populaire</Badge>}
                          {product.new && <Badge className="bg-green-100 text-green-800">Nouveau</Badge>}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{product.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)} DH</span>
                            <span className="text-sm text-gray-600">/mois</span>
                            {product.rentalDuration && (
                              <span className="text-sm text-gray-600"> ({product.rentalDuration} mois)</span>
                            )}
                            {product.firstMonthPrice && (
                              <p className="text-xs text-gray-500">
                                {formatPrice(product.firstMonthPrice)} DH Le 1er mois
                              </p>
                            )}
                          </div>
                          <Link href={`/catalogue/product/${product.slug}`}>
                            <Button size="sm" className="bg-[#334e68] hover:bg-[#2a3f5f] text-white">
                              Voir détails
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
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

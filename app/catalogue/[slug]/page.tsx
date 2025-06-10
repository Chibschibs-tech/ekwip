"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowLeft } from "lucide-react"
import { storeProducts } from "@/lib/store-products"
import CatalogProductCard from "@/components/catalog-product-card"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface Props {
  params: { slug: string }
}

// Category mapping
const categoryMapping: Record<string, string> = {
  "ordinateurs-portables": "Ordinateurs portables",
  "ordinateurs-de-bureau": "Ordinateurs de bureau",
  smartphones: "Smartphones",
  tablettes: "Tablettes",
  accessoires: "Accessoires",
  imprimantes: "Imprimantes",
  mobilier: "Mobilier",
}

export default function CategoryPage({ params }: Props) {
  const { slug } = params
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")

  // Get category name from slug
  const categoryName = categoryMapping[slug] || slug

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return storeProducts.filter((product) => product.category === categoryName)
  }, [categoryName])

  // Apply search and brand filters
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply brand filter
    if (selectedBrand !== "all") {
      filtered = filtered.filter((product) => product.brand.toLowerCase() === selectedBrand)
    }

    return filtered
  }, [categoryProducts, searchQuery, selectedBrand])

  // Get available brands for this category
  const availableBrands = useMemo(() => {
    return Array.from(new Set(categoryProducts.map((product) => product.brand)))
  }, [categoryProducts])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/catalogue">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour au catalogue
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{categoryName}</h1>
          <p className="text-lg text-slate-600">
            Découvrez notre sélection de {categoryName.toLowerCase()} professionnels
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher dans cette catégorie..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Brand Filter */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Toutes les marques" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les marques</SelectItem>
                  {availableBrands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                En stock ({categoryProducts.filter((p) => p.stock > 0).length})
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                Nouveautés ({categoryProducts.filter((p) => p.new).length})
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-slate-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
                  {filteredProducts.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <CatalogProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Aucun produit trouvé</h3>
                <p className="text-slate-600 mb-6">
                  Aucun produit ne correspond à vos critères de recherche dans cette catégorie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedBrand("all")
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                  <Link href="/catalogue">
                    <Button>Voir toutes les catégories</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

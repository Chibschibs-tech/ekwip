"use client"

import { useState, useEffect } from "react"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import ProductCard from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function BoutiquePage() {
  const { products } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  // Filter only sale products
  const saleProducts = products.filter((p) => p.productType === "sale")

  // Apply filters
  const filteredProducts = saleProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory
    const matchesBrand = selectedBrand === "all" || product.brandId === selectedBrand

    return matchesSearch && matchesCategory && matchesBrand
  })

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price-asc":
        return (a.salePrice || 0) - (b.salePrice || 0)
      case "price-desc":
        return (b.salePrice || 0) - (a.salePrice || 0)
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Boutique Vente</h1>
        <p className="text-muted-foreground">Achetez vos équipements informatiques neufs ou reconditionnés</p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Brand Filter */}
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Marque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les marques</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort and Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom (A-Z)</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="mb-4 text-lg text-muted-foreground">Aucun produit trouvé</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
              setSelectedBrand("all")
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} href={`/boutique/produit/${product.slug}`} />
          ))}
        </div>
      )}
    </div>
  )
}

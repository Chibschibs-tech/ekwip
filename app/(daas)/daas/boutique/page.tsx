"use client"

import { useState, useMemo } from "react"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function BoutiquePage() {
  const { products } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { addItem } = useCart()
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  // Filter products for sale only and active status
  const saleProducts = useMemo(() => {
    return products.filter((p) => p.productType === "sale" && p.status === "active")
  }, [products])

  // Apply filters and search
  const filteredProducts = useMemo(() => {
    let filtered = [...saleProducts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory)
    }

    // Brand filter
    if (selectedBrand !== "all") {
      filtered = filtered.filter((p) => p.brandId === selectedBrand)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [saleProducts, searchQuery, selectedCategory, selectedBrand, sortBy])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.thumbnail || product.images?.[0] || "/placeholder.svg",
    })

    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Sans catégorie"
  }

  const getBrandName = (brandId?: string) => {
    if (!brandId) return "Sans marque"
    return brands.find((b) => b.id === brandId)?.name || "Sans marque"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Boutique de Vente</h1>
          <p className="text-xl text-blue-100">Achetez votre équipement professionnel</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories
                    .filter((c) => c.isActive)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* Brand Filter */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les marques" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les marques</SelectItem>
                  {brands
                    .filter((b) => b.isActive)
                    .map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom (A-Z)</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
                {filteredProducts.length > 1 ? "s" : ""}
              </p>

              {(searchQuery || selectedCategory !== "all" || selectedBrand !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedBrand("all")
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <Link href={`/boutique/produit/${product.slug}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                      <Image
                        src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.stockQuantity === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg">
                            Rupture de stock
                          </Badge>
                        </div>
                      )}
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </Link>

                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{getBrandName(product.brandId)}</p>
                      <Link href={`/boutique/produit/${product.slug}`}>
                        <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{getCategoryName(product.categoryId)}</p>
                    </div>

                    <div className="space-y-1">
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <p className="text-sm text-gray-500 line-through">{product.compareAtPrice.toFixed(2)} DH HT</p>
                      )}
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {product.price.toFixed(2)} DH
                        </p>
                        <span className="text-sm text-gray-500">HT</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {(product.price * 1.2).toFixed(2)} DH TTC
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant={product.stockQuantity > 0 ? "default" : "destructive"} className="text-xs">
                        {product.stockQuantity > 0 ? `${product.stockQuantity} en stock` : "Rupture"}
                      </Badge>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stockQuantity === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

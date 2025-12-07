"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"
import { useBrands } from "@/contexts/brands-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart } from "lucide-react"

interface FilterState {
  brands: string[]
  priceRange: [number, number]
  inStock: boolean
}

export default function BoutiqueCategoryPage() {
  const params = useParams()
  const categorySlug = (params?.category as string) || ""
  const { categories, loading: categoriesLoading } = useCategories()
  const { products: allProducts, loading: productsLoading } = useProducts()
  const { brands: allBrands } = useBrands()
  const { addItem } = useCart()
  const { toast } = useToast()

  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, 10000],
    inStock: false,
  })

  // Find category by slug
  const category = useMemo(() => {
    return categories.find((cat) => cat.slug === categorySlug && cat.isActive)
  }, [categories, categorySlug])

  // Filter products for this category (sale only, active status)
  const products = useMemo(() => {
    if (!category) return []
    return allProducts.filter(
      (p) => p.categoryId === category.id && p.productType === "sale" && p.status === "active"
    )
  }, [allProducts, category])

  // Calculate price range
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price).filter((p) => p > 0)
      if (prices.length > 0) {
        setFilters((prev) => ({
          ...prev,
          priceRange: [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))],
        }))
      }
    }
  }, [products])

  // Get available brands for this category
  const availableBrands = useMemo(() => {
    const brandIds = new Set(products.map((p) => p.brandId).filter(Boolean))
    return allBrands.filter((b) => brandIds.has(b.id) && b.isActive)
  }, [products, allBrands])

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => p.brandId && filters.brands.includes(p.brandId))
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((p) => (p.stockQuantity || 0) > 0)
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
  }, [products, filters, sortBy])

  const handleAddToCart = (product: any) => {
    addItem(product, 1)

    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  const toggleBrand = (brandId: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brandId)
        ? prev.brands.filter((id) => id !== brandId)
        : [...prev.brands, brandId],
    }))
  }

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 10000],
      inStock: false,
    })
  }

  const activeFiltersCount =
    filters.brands.length + (filters.inStock ? 1 : 0) + (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0)

  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Catégorie introuvable</h1>
          <Link href="/boutique">
            <Button>Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/boutique"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la boutique
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">{category.description}</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"} ${
              showFilters ? "fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto bg-white dark:bg-gray-800 lg:bg-transparent p-4 lg:p-0 overflow-y-auto" : ""
            }`}
          >
            {showFilters && (
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-xl font-bold">Filtres</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{activeFiltersCount} filtre(s) actif(s)</span>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Réinitialiser
                    </Button>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Prix</label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                    }
                    min={0}
                    max={10000}
                    step={100}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{filters.priceRange[0]} DH</span>
                    <span>{filters.priceRange[1]} DH</span>
                  </div>
                </div>

                {/* Brands */}
                {availableBrands.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-3 block">Marques</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {availableBrands.map((brand) => (
                        <div key={brand.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={brand.id}
                            checked={filters.brands.includes(brand.id)}
                            onCheckedChange={() => toggleBrand(brand.id)}
                          />
                          <label
                            htmlFor={brand.id}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {brand.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Filter */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, inStock: checked as boolean }))
                      }
                    />
                    <label htmlFor="inStock" className="text-sm cursor-pointer">
                      En stock uniquement
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2">{activeFiltersCount}</Badge>
                  )}
                </Button>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
                  {filteredProducts.length > 1 ? "s" : ""}
                </p>
              </div>

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

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Essayez de modifier vos critères de recherche ou de filtrage
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Link href={`/boutique/produit/${product.slug}`}>
                        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                          {product.stockQuantity === 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Badge variant="destructive">Rupture de stock</Badge>
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
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {allBrands.find((b) => b.id === product.brandId)?.name || "Sans marque"}
                          </p>
                          <Link href={`/boutique/produit/${product.slug}`}>
                            <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </div>

                        <div className="space-y-1">
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <p className="text-sm text-gray-500 line-through">
                              {product.compareAtPrice.toFixed(2)} DH HT
                            </p>
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

                        <Badge
                          variant={product.stockQuantity > 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {product.stockQuantity > 0
                            ? `${product.stockQuantity} en stock`
                            : "Rupture"}
                        </Badge>

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
      </div>
    </div>
  )
}


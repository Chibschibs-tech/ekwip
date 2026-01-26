"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Grid, List, SlidersHorizontal, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { BoutiqueSubmenu } from "@/components/boutique-submenu"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"
import { useBrands } from "@/contexts/brands-context"

type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc"

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  
  const { categories, loading: categoriesLoading } = useCategories()
  const { products, loading: productsLoading } = useProducts()
  const { brands } = useBrands()
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Handle "tous-les-produits" special case
  const isAllProducts = slug === "tous-les-produits"
  
  // Find current category
  const currentCategory = useMemo(() => {
    if (isAllProducts) return null
    return categories.find((c) => c.slug === slug)
  }, [categories, slug, isAllProducts])

  // Get sale products for this category (or all if tous-les-produits)
  const categoryProducts = useMemo(() => {
    let filtered = products.filter(
      (p) => p.productType === "sale" && p.status === "active"
    )
    
    if (!isAllProducts && currentCategory) {
      filtered = filtered.filter((p) => p.categoryId === currentCategory.id)
    }
    
    return filtered
  }, [products, currentCategory, isAllProducts])

  // Calculate price range from products
  const { minPrice, maxPrice } = useMemo(() => {
    if (categoryProducts.length === 0) return { minPrice: 0, maxPrice: 100000 }
    const prices = categoryProducts.map((p) => p.price)
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    }
  }, [categoryProducts])

  // Initialize price range when products load
  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  // Get brands that have products in this category
  const availableBrands = useMemo(() => {
    const brandIds = new Set(categoryProducts.map((p) => p.brandId).filter(Boolean))
    return brands
      .filter((b) => brandIds.has(b.id))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [categoryProducts, brands])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts]

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => p.brandId && selectedBrands.includes(p.brandId))
    }

    // Filter by price
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [categoryProducts, selectedBrands, priceRange, sortBy])

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setPriceRange([minPrice, maxPrice])
  }

  const hasActiveFilters = selectedBrands.length > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice

  const loading = categoriesLoading || productsLoading

  // Calculate TTC price (HT + 20% TVA) - TTC rounded up, HT = TTC / 1.2
  const formatPriceTTC = (priceHT: number) => {
    const priceTTC = Math.ceil(priceHT * 1.2)
    return new Intl.NumberFormat("fr-FR").format(priceTTC) + " Dh"
  }

  const formatPriceHTFromTTC = (priceHT: number) => {
    const priceTTC = Math.ceil(priceHT * 1.2)
    const htFromTTC = Math.round(priceTTC / 1.2)
    return new Intl.NumberFormat("fr-FR").format(htFromTTC) + " Dh HT"
  }

  // Filters sidebar component
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Clear filters */}
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Effacer les filtres
        </Button>
      )}

      {/* Brands filter */}
      {availableBrands.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Marques</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availableBrands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => toggleBrand(brand.id)}
                />
                <Label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price range filter */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Prix (HT)</h3>
        <div className="px-2">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={100}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>{new Intl.NumberFormat("fr-FR").format(Math.round(priceRange[0]))} Dh</span>
            <span>{new Intl.NumberFormat("fr-FR").format(Math.round(priceRange[1]))} Dh</span>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <BoutiqueSubmenu />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="aspect-square bg-slate-200 rounded mb-4" />
                  <div className="h-4 bg-slate-200 rounded mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAllProducts && !currentCategory) {
    return (
      <div className="min-h-screen bg-slate-50">
        <BoutiqueSubmenu />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Catégorie non trouvée</h1>
          <p className="text-slate-600 mb-8">La catégorie que vous recherchez n'existe pas.</p>
          <Link href="/boutique">
            <Button>Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <BoutiqueSubmenu />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Link href="/boutique" className="hover:text-[#1f3b57]">Boutique</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium">
            {isAllProducts ? "Tous les produits" : currentCategory?.name}
          </span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {isAllProducts ? "Tous les produits" : currentCategory?.name}
            </h1>
            <p className="text-slate-600 mt-1">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""}
              {hasActiveFilters && ` (filtré${filteredProducts.length !== 1 ? "s" : ""})`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filters button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtres
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                      !
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name-asc">Nom A-Z</SelectItem>
                <SelectItem value="name-desc">Nom Z-A</SelectItem>
              </SelectContent>
            </Select>

            {/* View mode */}
            <div className="hidden sm:flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-32">
              <h2 className="font-semibold text-lg text-slate-900 mb-4">Filtres</h2>
              <FiltersContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-slate-600 text-lg mb-4">Aucun produit trouvé</p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Effacer les filtres
                  </Button>
                )}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/boutique/produit/${product.slug}`}>
                    <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-white overflow-hidden">
                          <Image
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <Badge className="absolute top-2 left-2 bg-red-500">
                              -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                            </Badge>
                          )}
                        </div>
                        
                        {/* Product Info */}
                        <div className="p-4 border-t">
                          {product.brandName && (
                            <p className="text-xs text-slate-500 mb-1">{product.brandName}</p>
                          )}
                          <h3 className="font-medium text-sm text-slate-900 line-clamp-2 mb-2 group-hover:text-[#1f3b57] transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-[#1f3b57]">
                              {formatPriceTTC(product.price)}
                            </span>
                            <span className="text-xs text-slate-500">
                              {formatPriceHTFromTTC(product.price)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/boutique/produit/${product.slug}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4 flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-32 h-32 flex-shrink-0 bg-white rounded overflow-hidden">
                          <Image
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          {product.brandName && (
                            <p className="text-xs text-slate-500 mb-1">{product.brandName}</p>
                          )}
                          <h3 className="font-medium text-slate-900 mb-2 group-hover:text-[#1f3b57] transition-colors">
                            {product.name}
                          </h3>
                          {product.shortDescription && (
                            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                              {product.shortDescription}
                            </p>
                          )}
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-[#1f3b57]">
                              {formatPriceTTC(product.price)}
                            </span>
                            <span className="text-sm text-slate-500">
                              ({formatPriceHTFromTTC(product.price)})
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

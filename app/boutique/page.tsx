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
import { Search, ShoppingCart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { BoutiqueSubmenu } from "@/components/boutique-submenu"
import { BoutiquePromotionalBanners } from "@/components/boutique-promotional-banners"
import { BoutiquePopularCategories } from "@/components/boutique-popular-categories"

const PRODUCTS_PER_PAGE = 24

export default function BoutiquePage() {
  const { products, loading: productsLoading, error: productsError } = useProducts()
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  const { brands, loading: brandsLoading } = useBrands()
  const { addItem } = useCart()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams?.get("marque") || "all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [currentPage, setCurrentPage] = useState(1)

  const saleProducts = useMemo(() => {
    return products.filter((p) => p.productType === "sale" && p.status === "active")
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = [...saleProducts]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory)
    }

    if (selectedBrand !== "all") {
      const brand = brands.find((b) => b.slug === selectedBrand || b.id === selectedBrand)
      if (brand) {
        filtered = filtered.filter((p) => p.brandId === brand.id)
      }
    }

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
  }, [saleProducts, searchQuery, selectedCategory, selectedBrand, sortBy, brands])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const handleAddToCart = (product: any) => {
    addItem(product, 1)
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre liste de besoins`,
    })
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Sans catégorie"
  }

  const getBrandName = (brandId?: string) => {
    if (!brandId) return "Sans marque"
    return brands.find((b) => b.id === brandId)?.name || "Sans marque"
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedBrand("all")
    setCurrentPage(1)
  }

  const loading = categoriesLoading || productsLoading || brandsLoading
  const hasError = categoriesError || productsError
  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedBrand !== "all"

  return (
    <div className="min-h-screen">
      {hasError && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              {categoriesError && "Impossible de charger les catégories. "}
              {productsError && "Impossible de charger les produits. "}
              Veuillez actualiser la page ou contacter le support si le problème persiste.
            </p>
          </div>
        </div>
      )}

      <BoutiqueSubmenu />
      <BoutiquePromotionalBanners />
      <BoutiquePopularCategories />

      {/* Filters */}
      <section className="py-6 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={(v) => { setSelectedCategory(v); setCurrentPage(1) }}>
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

            <Select value={selectedBrand} onValueChange={(v) => { setSelectedBrand(v); setCurrentPage(1) }}>
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

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
                <ShoppingCart className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Aucun produit trouvé</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
              {hasActiveFilters && (
                <Button onClick={resetFilters} className="bg-[#1f3b57] hover:bg-[#1f3b57]/90">
                  Réinitialiser les filtres
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    <CardContent className="p-0">
                      <Link href={`/boutique/produit/${product.slug}`}>
                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                          <Image
                            src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {product.stockQuantity === 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                              <Badge variant="destructive" className="text-base px-4 py-2">
                                Rupture de stock
                              </Badge>
                            </div>
                          )}
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white shadow-lg z-10">
                              -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                            </Badge>
                          )}
                          {product.isFeatured && (
                            <Badge className="absolute top-4 left-4 bg-[#1f3b57] text-white shadow-lg z-10">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Vedette
                            </Badge>
                          )}
                        </div>
                      </Link>

                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            {getBrandName(product.brandId)}
                          </p>
                          <Link href={`/boutique/produit/${product.slug}`}>
                            <h3 className="font-bold text-lg text-slate-800 line-clamp-2 group-hover:text-[#1f3b57] transition-colors leading-tight">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-slate-500">{getCategoryName(product.categoryId)}</p>
                        </div>

                        <div className="space-y-1">
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <p className="text-sm text-slate-400 line-through">
                              {product.compareAtPrice.toFixed(2)} DH HT
                            </p>
                          )}
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-[#1f3b57]">{product.price.toFixed(2)} DH</p>
                            <span className="text-sm text-slate-500">HT</span>
                          </div>
                          <p className="text-sm text-slate-600">{(product.price * 1.2).toFixed(2)} DH TTC</p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <Badge
                            variant={product.stockQuantity > 0 ? "default" : "destructive"}
                            className={
                              product.stockQuantity > 0
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {product.stockQuantity > 0
                              ? `${product.stockQuantity} en stock`
                              : "Rupture de stock"}
                          </Badge>
                        </div>

                        <Button
                          className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90 text-white shadow-md hover:shadow-lg transition-all"
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                      .map((page, idx, arr) => {
                        const prev = arr[idx - 1]
                        const showEllipsis = prev !== undefined && page - prev > 1
                        return (
                          <span key={page} className="flex items-center">
                            {showEllipsis && <span className="px-2 text-gray-400">...</span>}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              className={currentPage === page ? "bg-[#1f3b57]" : ""}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          </span>
                        )
                      })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Suivant <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

"use client"

import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Sparkles } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { BoutiqueSubmenu } from "@/components/boutique-submenu"
import { BoutiquePromotionalBanners } from "@/components/boutique-promotional-banners"
import { BoutiquePopularCategories } from "@/components/boutique-popular-categories"
import { BoutiqueActualites } from "@/components/boutique-actualites"

export default function BoutiquePage() {
  const { products, loading: productsLoading, error: productsError } = useProducts()
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  const { brands, loading: brandsLoading } = useBrands()
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
    // Pass full Product object to cart context
    addItem(product, 1)

    toast({
      title: "AjoutÃ© au panier",
      description: `${product.name} a Ã©tÃ© ajoutÃ© Ã  votre panier`,
    })
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Sans catÃ©gorie"
  }

  const getBrandName = (brandId?: string) => {
    if (!brandId) return "Sans marque"
    return brands.find((b) => b.id === brandId)?.name || "Sans marque"
  }

  const loading = categoriesLoading || productsLoading || brandsLoading
  const hasError = categoriesError || productsError

  return (
    <div className="min-h-screen">
      {/* Error Display */}
      {hasError && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              {categoriesError && "âš ï¸ Impossible de charger les catÃ©gories. "}
              {productsError && "âš ï¸ Impossible de charger les produits. "}
              Veuillez actualiser la page ou contacter le support si le problÃ¨me persiste.
            </p>
          </div>
        </div>
      )}

      {/* Boutique Submenu */}
      <BoutiqueSubmenu />

      {/* Promotional Banners */}
      <BoutiquePromotionalBanners />

      {/* Popular Categories */}
      <BoutiquePopularCategories />

      {/* All Products Section - Can be hidden or moved to a separate page */}
      {false && (
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <Card className="border-0 shadow-lg">
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
                  <SelectValue placeholder="Toutes les catÃ©gories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catÃ©gories</SelectItem>
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
                  <SelectItem value="price-desc">Prix dÃ©croissant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvÃ©
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
                  RÃ©initialiser les filtres
                </Button>
              )}
            </div>
            </CardContent>
          </Card>
        </div>
      </section>
      )}

      {/* Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
                <ShoppingCart className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Aucun produit trouvÃ©</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Essayez de modifier vos critÃ¨res de recherche ou de filtrage pour trouver ce que vous cherchez.
              </p>
              {(searchQuery || selectedCategory !== "all" || selectedBrand !== "all") && (
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedBrand("all")
                  }}
                  className="bg-[#1f3b57] hover:bg-[#1f3b57]/90"
                >
                  RÃ©initialiser les filtres
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
          )}
        </div>
      </section>

      {/* ActualitÃ©s (Blog) Section */}
      <BoutiqueActualites />
    </div>
  )
}


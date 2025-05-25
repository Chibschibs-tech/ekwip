"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StoreProductCard from "@/components/store-product-card"
import FilterSidebar from "@/components/store/filter-sidebar"
import ActiveFilters from "@/components/store/active-filters"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { fetchAllCategories, fetchFilteredProducts, formatPrice, type WordPressProduct } from "@/lib/wordpress-api"
import { Skeleton } from "@/components/ui/skeleton"

// Define the FilterState type
export interface FilterState {
  categories: number[]
  brands: string[]
  priceRange: { min: number; max: number }
  inStock: boolean
  onSale: boolean
  search: string
}

export interface FilterOption {
  id: string | number
  label: string
  count: number
}

export default function StorePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("featured")
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<FilterOption[]>([])
  const [brands, setBrands] = useState<FilterOption[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 })
  const [products, setProducts] = useState<WordPressProduct[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // Initialize filter state
  const initialFilterState: FilterState = {
    categories: [],
    brands: [],
    priceRange: priceRange,
    inStock: false,
    onSale: false,
    search: "",
  }

  const [filters, setFilters] = useState<FilterState>(initialFilterState)

  // Reset filters
  const resetFilters = () => {
    setFilters(initialFilterState)
  }

  // Load categories and initial products
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      try {
        // Fetch categories
        const categoriesData = await fetchAllCategories()
        const categoryOptions = categoriesData.map((cat) => ({
          id: cat.id,
          label: cat.name,
          count: cat.count,
        }))
        setCategories(categoryOptions)

        // Extract brands from product attributes (in a real implementation)
        // For now, we'll use mock brands
        setBrands([
          { id: "apple", label: "Apple", count: 15 },
          { id: "dell", label: "Dell", count: 12 },
          { id: "hp", label: "HP", count: 10 },
          { id: "lenovo", label: "Lenovo", count: 8 },
          { id: "samsung", label: "Samsung", count: 14 },
        ])

        // Fetch initial products
        const {
          products: initialProducts,
          total,
          totalPages,
        } = await fetchFilteredProducts({
          perPage: 12,
          page: 1,
        })

        setProducts(initialProducts)
        setTotalProducts(total)
        setTotalPages(totalPages)
      } catch (error) {
        console.error("Error loading initial store data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isMounted) {
      loadInitialData()
    }
  }, [isMounted])

  // Apply filters and sorting
  useEffect(() => {
    const applyFilters = async () => {
      if (!isMounted) return

      setLoading(true)
      try {
        // Map sort option to WooCommerce parameters
        let orderby = "date"
        let order: "asc" | "desc" = "desc"

        switch (sortOption) {
          case "price-asc":
            orderby = "price"
            order = "asc"
            break
          case "price-desc":
            orderby = "price"
            order = "desc"
            break
          case "newest":
            orderby = "date"
            order = "desc"
            break
          case "featured":
            orderby = "popularity"
            order = "desc"
            break
        }

        // Prepare filter parameters
        const filterParams: Parameters<typeof fetchFilteredProducts>[0] = {
          orderby,
          order,
          page: currentPage,
          perPage: 12,
          search: filters.search || undefined,
          inStock: filters.inStock,
          onSale: filters.onSale,
          minPrice: filters.priceRange.min,
          maxPrice: filters.priceRange.max,
        }

        // Add category filter if selected
        if (filters.categories.length > 0) {
          filterParams.category = filters.categories[0] // WooCommerce API only supports one category at a time
        }

        const { products: filteredProducts, total, totalPages } = await fetchFilteredProducts(filterParams)

        setProducts(filteredProducts)
        setTotalProducts(total)
        setTotalPages(totalPages)
      } catch (error) {
        console.error("Error applying filters:", error)
      } finally {
        setLoading(false)
      }
    }

    applyFilters()
  }, [filters, sortOption, currentPage, isMounted])

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Loading skeleton for products
  const ProductSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
      <Skeleton className="h-6 w-1/3 rounded" />
    </div>
  )

  if (!isMounted) {
    return null
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-ekwip-50 to-ekwip-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Notre boutique en ligne</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez et commandez en ligne tous nos équipements disponibles à l'achat direct.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-12 h-12 rounded-full bg-white shadow-md"
              />
              {filters.search && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => setFilters({ ...filters, search: "" })}
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Store Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile filter button */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="text-xl font-bold text-gray-800">Produits ({totalProducts})</h2>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:w-[400px] p-0">
                <div className="h-full overflow-y-auto py-6 px-4">
                  <FilterSidebar
                    categories={categories}
                    brands={brands}
                    priceRange={priceRange}
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filters */}
            <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
              <FilterSidebar
                categories={categories}
                brands={brands}
                priceRange={priceRange}
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                className="sticky top-24"
              />
            </div>

            {/* Products */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              {/* Active filters */}
              <ActiveFilters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                priceFormatter={formatPrice}
                categories={categories}
              />

              {/* Sort and count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {totalProducts} produit{totalProducts !== 1 ? "s" : ""} trouvé
                  {totalProducts !== 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 hidden sm:inline">Trier par:</span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Popularité</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="newest">Nouveautés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Product grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <StoreProductCard
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          description: product.description,
                          shortDescription: product.short_description,
                          price: Number.parseFloat(product.price),
                          salePrice: product.sale_price ? Number.parseFloat(product.sale_price) : undefined,
                          stock: product.stock_quantity || 0,
                          image: product.images[0]?.src || "/placeholder.svg?height=300&width=300",
                          category: product.categories[0]?.name || "",
                          brand: "", // WooCommerce doesn't have a brand field by default
                          tags: product.tags.map((tag) => tag.name),
                          specifications: {}, // Would need to extract from attributes
                          slug: product.slug,
                          featured: product.featured,
                          new: new Date(product.date_created).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000, // New if less than 30 days old
                        }}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Précédent
                        </Button>

                        {[...Array(totalPages)].map((_, i) => {
                          const page = i + 1
                          // Show first page, last page, current page and 1 page before and after current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                onClick={() => handlePageChange(page)}
                                className={currentPage === page ? "bg-ekwip hover:bg-ekwip/90" : ""}
                              >
                                {page}
                              </Button>
                            )
                          } else if (
                            (page === 2 && currentPage > 3) ||
                            (page === totalPages - 1 && currentPage < totalPages - 2)
                          ) {
                            return <span key={page}>...</span>
                          }
                          return null
                        })}

                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Suivant
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-600 mb-6">
                    Aucun produit ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
                  </p>
                  <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

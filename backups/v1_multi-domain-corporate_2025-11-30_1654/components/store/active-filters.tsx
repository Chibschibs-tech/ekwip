"use client"

import { X } from "lucide-react"
import type { FilterState, FilterOption } from "@/app/store/page"

interface ActiveFiltersProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  resetFilters: () => void
  priceFormatter: (price: number | string) => string
  categories: FilterOption[]
}

export default function ActiveFilters({
  filters,
  setFilters,
  resetFilters,
  priceFormatter,
  categories,
}: ActiveFiltersProps) {
  // Check if any filters are active
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.inStock ||
    filters.onSale ||
    filters.priceRange.min !== 0 ||
    filters.priceRange.max !== 50000

  if (!hasActiveFilters) {
    return null
  }

  // Remove category filter
  const removeCategory = (categoryId: number) => {
    setFilters({
      ...filters,
      categories: filters.categories.filter((id) => id !== categoryId),
    })
  }

  // Remove brand filter
  const removeBrand = (brand: string) => {
    setFilters({
      ...filters,
      brands: filters.brands.filter((b) => b !== brand),
    })
  }

  // Reset price range
  const resetPriceRange = () => {
    setFilters({
      ...filters,
      priceRange: { min: 0, max: 50000 },
    })
  }

  // Remove stock filter
  const removeStockFilter = () => {
    setFilters({
      ...filters,
      inStock: false,
    })
  }

  // Remove sale filter
  const removeSaleFilter = () => {
    setFilters({
      ...filters,
      onSale: false,
    })
  }

  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.label : "Catégorie"
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-600">Filtres actifs:</span>

        {filters.categories.map((categoryId) => (
          <button
            key={`category-${categoryId}`}
            onClick={() => removeCategory(categoryId)}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
          >
            {getCategoryName(categoryId)}
            <X className="h-3 w-3" />
          </button>
        ))}

        {filters.brands.map((brand) => (
          <button
            key={`brand-${brand}`}
            onClick={() => removeBrand(brand)}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
          >
            {brand}
            <X className="h-3 w-3" />
          </button>
        ))}

        {(filters.priceRange.min !== 0 || filters.priceRange.max !== 50000) && (
          <button
            onClick={resetPriceRange}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
          >
            Prix: {priceFormatter(filters.priceRange.min)} - {priceFormatter(filters.priceRange.max)}
            <X className="h-3 w-3" />
          </button>
        )}

        {filters.inStock && (
          <button
            onClick={removeStockFilter}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
          >
            En stock uniquement
            <X className="h-3 w-3" />
          </button>
        )}

        {filters.onSale && (
          <button
            onClick={removeSaleFilter}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
          >
            En promotion uniquement
            <X className="h-3 w-3" />
          </button>
        )}

        <button onClick={resetFilters} className="text-sm text-ekwip hover:underline ml-2">
          Réinitialiser tout
        </button>
      </div>
    </div>
  )
}

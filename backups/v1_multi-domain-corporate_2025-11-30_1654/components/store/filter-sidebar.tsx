"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/lib/wordpress-api"
import type { FilterState, FilterOption } from "@/app/store/page"

interface FilterSidebarProps {
  categories: FilterOption[]
  brands: FilterOption[]
  priceRange: { min: number; max: number }
  filters: FilterState
  setFilters: (filters: FilterState) => void
  resetFilters: () => void
  className?: string
}

export default function FilterSidebar({
  categories,
  brands,
  priceRange,
  filters,
  setFilters,
  resetFilters,
  className = "",
}: FilterSidebarProps) {
  // Handle category change
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        categories: [...filters.categories, categoryId],
      })
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter((id) => id !== categoryId),
      })
    }
  }

  // Handle brand change
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        brands: [...filters.brands, brand],
      })
    } else {
      setFilters({
        ...filters,
        brands: filters.brands.filter((b) => b !== brand),
      })
    }
  }

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: {
        min: value[0],
        max: value[1],
      },
    })
  }

  // Handle stock change
  const handleStockChange = (checked: boolean) => {
    setFilters({
      ...filters,
      inStock: checked,
    })
  }

  // Handle sale change
  const handleSaleChange = (checked: boolean) => {
    setFilters({
      ...filters,
      onSale: checked,
    })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold mb-3">Catégories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id as number)}
                onCheckedChange={(checked) => handleCategoryChange(category.id as number, checked === true)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label} ({category.count})
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Marques</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={filters.brands.includes(brand.id as string)}
                onCheckedChange={(checked) => handleBrandChange(brand.id as string, checked === true)}
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand.label} ({brand.count})
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Prix</h3>
        <div className="px-2">
          <Slider
            defaultValue={[priceRange.min, priceRange.max]}
            value={[filters.priceRange.min, filters.priceRange.max]}
            onValueChange={handlePriceRangeChange}
            min={priceRange.min}
            max={priceRange.max}
            step={100}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span>{formatPrice(filters.priceRange.min)}</span>
            <span>{formatPrice(filters.priceRange.max)}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Disponibilité</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => handleStockChange(checked === true)}
            />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              En stock uniquement
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={filters.onSale}
              onCheckedChange={(checked) => handleSaleChange(checked === true)}
            />
            <label
              htmlFor="on-sale"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              En promotion uniquement
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  )
}

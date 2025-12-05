"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPrice } from "@/lib/products"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"
import { useBrands } from "@/contexts/brands-context"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

interface FilterState {
  brands: string[]
  priceRange: { min: number; max: number }
  attributes: Record<string, string[]>
  inStock: boolean
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categories, loading: categoriesLoading } = useCategories()
  const { products: allProducts, loading: productsLoading } = useProducts()
  const { brands: allBrands } = useBrands()
  const [sortBy, setSortBy] = useState("name")
  const [attributes, setAttributes] = useState<any[]>([])

  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: { min: 0, max: 1000 },
    attributes: {},
    inStock: false,
  })

  // Find category by slug
  const category = useMemo(() => {
    return categories.find((cat) => cat.slug === params.slug && cat.isActive)
  }, [categories, params.slug])

  // Filter products for this category (rental only, active status)
  const products = useMemo(() => {
    if (!category) return []
    return allProducts.filter(
      (p) => p.categoryId === category.id && p.productType === "rent" && p.status === "active"
    )
  }, [allProducts, category])

  // Calculate price range
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price).filter((p) => p > 0)
      if (prices.length > 0) {
        setFilters((prev) => ({
          ...prev,
          priceRange: {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices)),
          },
        }))
      }
    }
  }, [products])

  // Filtered products based on filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filtre par marque (using brandId)
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => p.brandId && filters.brands.includes(p.brandId))
    }

    // Filtre par prix
    filtered = filtered.filter((p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max)

    // Filtre par stock
    if (filters.inStock) {
      filtered = filtered.filter((p) => (p.stockQuantity || 0) > 0)
    }

    // Filtre par attributs (using attributes field from API)
    Object.entries(filters.attributes).forEach(([attrId, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter((p) => {
          // Check if product has this attribute value
          const productAttrs = p.attributes || {}
          const productAttrValue = productAttrs[attrId]
          return productAttrValue && values.includes(String(productAttrValue))
        })
      }
    })

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, filters, sortBy])

  // Load attributes from localStorage (temporary until API is ready)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ekwip_admin_attributes")
      if (stored) {
        const allAttributes = JSON.parse(stored)
        const categoryAttributes = allAttributes.filter((attr: any) => attr.isFilterable)
        setAttributes(categoryAttributes)
      }
    } catch (error) {
      console.error("Error loading attributes:", error)
    }
  }, [])

  // Note: notFound() can't be called in useEffect in client components
  // We'll show a 404 UI instead

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        brands: [...filters.brands, brandId],
      })
    } else {
      setFilters({
        ...filters,
        brands: filters.brands.filter((b) => b !== brandId),
      })
    }
  }

  const handleAttributeChange = (attrId: string, value: string, checked: boolean) => {
    const currentValues = filters.attributes[attrId] || []

    if (checked) {
      setFilters({
        ...filters,
        attributes: {
          ...filters.attributes,
          [attrId]: [...currentValues, value],
        },
      })
    } else {
      setFilters({
        ...filters,
        attributes: {
          ...filters.attributes,
          [attrId]: currentValues.filter((v) => v !== value),
        },
      })
    }
  }

  const handlePriceRangeChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: {
        min: value[0],
        max: value[1],
      },
    })
  }

  const resetFilters = () => {
    const prices = products.map((p) => p.price)
    setFilters({
      brands: [],
      priceRange: {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices)),
      },
      attributes: {},
      inStock: false,
    })
  }

  // Get unique brand IDs from products
  const brandIds = Array.from(new Set(products.map((p) => p.brandId).filter(Boolean))) as string[]
  const brands = allBrands.filter((b) => brandIds.includes(b.id) && b.isActive)

  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ekwip mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // Show 404 UI if category not found after loading
  if (!categoriesLoading && !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Catégorie non trouvée</h2>
          <p className="text-gray-600 mb-6">
            La catégorie "{params.slug}" n'existe pas ou n'est plus disponible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button>Retour au catalogue</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Debug info:</strong>
            </p>
            <p className="text-xs text-gray-600">
              Slug recherché: <code className="bg-white px-2 py-1 rounded">{params.slug}</code>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Catégories disponibles: {categories.length}
            </p>
            {categories.length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-gray-600 cursor-pointer">Voir les slugs disponibles</summary>
                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  {categories.slice(0, 10).map((cat) => (
                    <li key={cat.id}>
                      <code className="bg-white px-2 py-1 rounded">{cat.slug}</code> - {cat.name}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <Link href="/catalogue" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au catalogue
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-lg text-gray-600">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Marques */}
              {brands.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Marques</h3>
                  <div className="space-y-2">
                    {brands.map((brand: any) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand.id}`}
                          checked={filters.brands.includes(brand.id)}
                          onCheckedChange={(checked) => handleBrandChange(brand.id, checked === true)}
                        />
                        <label
                          htmlFor={`brand-${brand.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {brand.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prix */}
              {products.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Prix (MAD/mois)</h3>
                  <div className="px-2">
                    <Slider
                      value={[filters.priceRange.min, filters.priceRange.max]}
                      onValueChange={handlePriceRangeChange}
                      min={Math.floor(Math.min(...products.map((p) => p.price)))}
                      max={Math.ceil(Math.max(...products.map((p) => p.price)))}
                      step={10}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{formatPrice(filters.priceRange.min)}</span>
                      <span className="text-sm">{formatPrice(filters.priceRange.max)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Attributs filtrables */}
              {attributes.map((attr) => {
                // Get unique values for this attribute from products (using attributes field)
                const uniqueValues = Array.from(
                  new Set(
                    products
                      .map((p) => {
                        const productAttrs = p.attributes || {}
                        return productAttrs[attr.id]
                      })
                      .filter(Boolean),
                  ),
                ).sort()

                if (uniqueValues.length === 0) return null

                return (
                  <div key={attr.id}>
                    <h3 className="text-lg font-semibold mb-3">{attr.name}</h3>
                    <div className="space-y-2">
                      {uniqueValues.map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`attr-${attr.id}-${value}`}
                            checked={filters.attributes[attr.id]?.includes(value) || false}
                            onCheckedChange={(checked) => handleAttributeChange(attr.id, value, checked === true)}
                          />
                          <label
                            htmlFor={`attr-${attr.id}-${value}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Disponibilité */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Disponibilité</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => setFilters({ ...filters, inStock: checked === true })}
                  />
                  <label
                    htmlFor="in-stock"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    En stock uniquement
                  </label>
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun produit trouvé avec ces critères.</p>
                <Button variant="outline" onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                        <Image
                        src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                      {/* Badges can be added based on product flags if needed */}
                      {/* {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nouveau</Badge>} */}
                      {/* {product.isPopular && <Badge className="absolute top-2 right-2 bg-blue-500">Populaire</Badge>} */}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription || product.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                          <span className="text-sm text-gray-500">/mois</span>
                        </div>
                        <Badge variant={(product.stockQuantity || 0) > 0 ? "default" : "secondary"}>
                          {(product.stockQuantity || 0) > 0 ? "En stock" : "Rupture"}
                        </Badge>
                      </div>
                      <Link href={`/catalogue/product/${product.slug}`}>
                        <Button className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90">Voir détails</Button>
                      </Link>
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

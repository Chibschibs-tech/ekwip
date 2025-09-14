"use client"

import { Suspense } from "react"
import Link from "next/link"
import { FilterSidebar } from "@/components/store/filter-sidebar"
import { ActiveFilters } from "@/components/store/active-filters"
import { StoreProductCard } from "@/components/store-product-card"
import { getProducts } from "@/lib/products"

interface SearchParams {
  category?: string
  minPrice?: string
  maxPrice?: string
  search?: string
  sort?: string
  page?: string
}

interface StorePageProps {
  searchParams: SearchParams
}

export default function StorePage({ searchParams }: StorePageProps) {
  const products = getProducts()
  const categories = Array.from(new Set(products.map((p) => p.category)))

  // Filter products based on search params
  let filteredProducts = products

  if (searchParams.category) {
    filteredProducts = filteredProducts.filter((p) => p.category === searchParams.category)
  }

  if (searchParams.search) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchParams.search.toLowerCase()) ||
        p.description.toLowerCase().includes(searchParams.search.toLowerCase()),
    )
  }

  if (searchParams.minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= Number.parseInt(searchParams.minPrice!))
  }

  if (searchParams.maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= Number.parseInt(searchParams.maxPrice!))
  }

  // Sort products
  if (searchParams.sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (searchParams.sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (searchParams.sort === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
  }

  // Pagination
  const page = Number.parseInt(searchParams.page || "1")
  const itemsPerPage = 12
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Notre Catalogue d'Équipements</h1>
          <p className="text-xl opacity-90">Découvrez notre gamme complète d'équipements IT en location</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar categories={categories} />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Active Filters */}
            <ActiveFilters />

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center gap-4">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  Trier par:
                </label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  defaultValue={searchParams.sort || ""}
                  onChange={(e) => {
                    const url = new URL(window.location.href)
                    if (e.target.value) {
                      url.searchParams.set("sort", e.target.value)
                    } else {
                      url.searchParams.delete("sort")
                    }
                    window.location.href = url.toString()
                  }}
                >
                  <option value="">Pertinence</option>
                  <option value="name">Nom A-Z</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <Suspense fallback={<div>Chargement...</div>}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <StoreProductCard key={product.id} product={product} />
                ))}
              </div>
            </Suspense>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/store?${new URLSearchParams({
                      ...searchParams,
                      page: pageNum.toString(),
                    }).toString()}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pageNum === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {pageNum}
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

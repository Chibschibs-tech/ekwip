"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { categories } = useCategories()
  const { products } = useProducts()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter((p) => p.categoryId === category.id && p.status === "published")

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <Link href="/catalogue">
            <Button variant="ghost" className="mb-6 hover:bg-white/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au catalogue
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">{category.name}</h1>
          {category.description && <p className="text-lg text-slate-600 max-w-2xl">{category.description}</p>}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categoryProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">Aucun produit disponible dans cette catégorie pour le moment</p>
              <Link href="/catalogue">
                <Button variant="outline">Retour au catalogue</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  {categoryProducts.length} {categoryProducts.length === 1 ? "produit" : "produits"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} href={`/catalogue/product/${product.slug}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

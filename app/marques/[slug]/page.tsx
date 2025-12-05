"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/products"
import { notFound } from "next/navigation"
import type { Brand, Product } from "@/types/admin"

interface BrandPageProps {
  params: {
    slug: string
  }
}

export default function BrandPage({ params }: BrandPageProps) {
  const [brand, setBrand] = useState<Brand | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Charger la marque depuis localStorage
    try {
      const storedBrands = localStorage.getItem("ekwip_admin_brands")
      const storedProducts = localStorage.getItem("ekwip_admin_products")

      if (storedBrands) {
        const allBrands = JSON.parse(storedBrands)
        const foundBrand = allBrands.find((b: Brand) => b.slug === params.slug)

        if (!foundBrand || !foundBrand.isActive) {
          notFound()
        }

        setBrand(foundBrand)

        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts)
          const storedCategories = localStorage.getItem("ekwip_admin_categories")
          const categories = storedCategories ? JSON.parse(storedCategories) : []

          const brandProducts = allProducts
            .filter((p: any) => p.status === "active" && p.brandId === foundBrand.id)
            .map((p: any) => {
              const category = categories.find((c: any) => c.id === p.categoryId)

              return {
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.shortDescription || p.description || "",
                price: p.price || 0,
                basePrice: p.price || 0,
                image: p.thumbnail || p.images?.[0] || "/placeholder.svg",
                images: p.images || [p.thumbnail || "/placeholder.svg"],
                brand: foundBrand.name,
                category: category?.name || "Sans catégorie",
                inStock: (p.stockQuantity || 0) > 0,
                isNew: false,
                isPopular: false,
                isFeatured: p.isFeatured || false,
                specifications: p.attributes || undefined,
              }
            })

          setProducts(brandProducts)
        }
      }
    } catch (error) {
      console.error("Error loading brand:", error)
      notFound()
    }
  }, [params.slug])

  if (!brand) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <Link href="/marques" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux marques
          </Link>
        </div>
      </div>

      {/* Brand Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-6">
            {brand.logo && (
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{brand.name}</h1>
              {brand.description && <p className="text-lg text-gray-600">{brand.description}</p>}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Visiter le site web →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            {products.length} produit{products.length > 1 ? "s" : ""}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun produit disponible pour cette marque</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                    {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nouveau</Badge>}
                    {product.isPopular && <Badge className="absolute top-2 right-2 bg-blue-500">Populaire</Badge>}
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                      <span className="text-sm text-gray-500">/mois</span>
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "En stock" : "Rupture"}
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
  )
}

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, Package, Shield, Truck } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  images: string[]
  brand: string
  category: string
  inStock: boolean
  isFeatured: boolean
  attributes: Record<string, string>
  sku: string
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !params.slug) return

    try {
      const storedProducts = localStorage.getItem("ekwip_admin_products")
      const storedCategories = localStorage.getItem("ekwip_admin_categories")
      const storedBrands = localStorage.getItem("ekwip_admin_brands")

      if (storedProducts) {
        const adminProducts = JSON.parse(storedProducts)
        const adminCategories = storedCategories ? JSON.parse(storedCategories) : []
        const adminBrands = storedBrands ? JSON.parse(storedBrands) : []

        const foundProduct = adminProducts.find(
          (p: any) => p.slug === params.slug && p.status === "active" && p.productType === "sale",
        )

        if (foundProduct) {
          const category = adminCategories.find((c: any) => c.id === foundProduct.categoryId)
          const brand = adminBrands.find((b: any) => b.id === foundProduct.brandId)

          setProduct({
            id: foundProduct.id,
            name: foundProduct.name,
            slug: foundProduct.slug,
            description: foundProduct.description || foundProduct.shortDescription || "",
            shortDescription: foundProduct.shortDescription || "",
            price: foundProduct.price || 0,
            compareAtPrice: foundProduct.compareAtPrice,
            images: foundProduct.images || [foundProduct.thumbnail || "/placeholder.svg"],
            brand: brand?.name || "Sans marque",
            category: category?.name || "Sans catégorie",
            inStock: (foundProduct.stockQuantity || 0) > 0,
            isFeatured: foundProduct.isFeatured || false,
            attributes: foundProduct.attributes || {},
            sku: foundProduct.sku || "",
          })
        }
      }
    } catch (error) {
      console.error("Error loading product:", error)
    }
  }, [mounted, params.slug])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <Link href="/boutique">
            <Button>Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/boutique" className="text-blue-600 hover:underline">
            ← Retour à la boutique
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <div className="aspect-square relative">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex gap-2 mb-4">
              {product.isFeatured && (
                <Badge className="bg-blue-600">
                  <Star className="h-3 w-3 mr-1" />
                  Populaire
                </Badge>
              )}
              {product.inStock ? (
                <Badge className="bg-green-600">En stock</Badge>
              ) : (
                <Badge className="bg-red-600">Rupture de stock</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-600">Marque: {product.brand}</span>
              <span className="text-sm text-gray-600">SKU: {product.sku}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.shortDescription}</p>

            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-baseline gap-4 mb-4">
                {product.compareAtPrice && (
                  <span className="text-xl text-gray-500 line-through">{product.compareAtPrice} DH HT</span>
                )}
                <span className="text-4xl font-bold text-[#1f3b57]">{product.price} DH HT</span>
              </div>
              <p className="text-lg text-gray-600 mb-4">{(product.price * 1.2).toFixed(2)} DH TTC (TVA 20%)</p>

              <Button size="lg" className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/80" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Ajouter au panier" : "Rupture de stock"}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Livraison</p>
                  <p className="text-xs text-gray-600">Rapide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Garantie</p>
                  <p className="text-xs text-gray-600">Incluse</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">Support</p>
                  <p className="text-xs text-gray-600">24/7</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Description du produit</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Caractéristiques techniques</h2>
            {Object.keys(product.attributes).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex border-b pb-3">
                    <span className="font-medium w-1/3">{key}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucune caractéristique technique disponible</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBrands } from "@/contexts/brands-context"
import { useProducts } from "@/contexts/products-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface BrandPageProps {
  params: {
    slug: string
  }
}

export default function BrandPage({ params }: BrandPageProps) {
  const { brands, loading: brandsLoading } = useBrands()
  const { products, loading: productsLoading } = useProducts()
  const { addItem } = useCart()
  const { toast } = useToast()

  const brand = brands.find((b) => b.slug === params.slug && b.isActive)
  const brandProducts = brand
    ? products.filter((p) => p.brandId === brand.id && p.status === "active" && p.productType === "sale")
    : []

  const loading = brandsLoading || productsLoading

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Marque introuvable</h2>
          <Link href="/marques" className="text-[#1f3b57] hover:underline">
            Retour aux marques
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = (product: any) => {
    addItem(product, 1)
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre liste de besoins`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <Link href="/marques" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux marques
          </Link>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-6">
            {brand.logo && (
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-2" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{brand.name}</h1>
              {brand.description && <p className="text-lg text-gray-600">{brand.description}</p>}
              {brand.website && (
                <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">
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
            {brandProducts.length} produit{brandProducts.length > 1 ? "s" : ""}
          </p>
        </div>

        {brandProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Aucun produit disponible pour cette marque</p>
            <Link href="/boutique">
              <Button className="bg-[#1f3b57] hover:bg-[#1f3b57]/90">Explorer la boutique</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                  <Link href={`/boutique/produit/${product.slug}`}>
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <Image
                        src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>
                  <div className="p-4 space-y-3">
                    <Link href={`/boutique/produit/${product.slug}`}>
                      <h3 className="font-semibold line-clamp-2 hover:text-[#1f3b57] transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#1f3b57]">{product.price.toFixed(2)} DH HT</span>
                      <Badge variant={product.stockQuantity > 0 ? "default" : "secondary"} className={product.stockQuantity > 0 ? "bg-green-100 text-green-800" : ""}>
                        {product.stockQuantity > 0 ? "En stock" : "Rupture"}
                      </Badge>
                    </div>
                    <Button
                      className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90"
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
    </div>
  )
}

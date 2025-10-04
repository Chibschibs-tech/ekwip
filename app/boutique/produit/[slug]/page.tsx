"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { Product } from "@/types/admin"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, ArrowLeft, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useNeedsList } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function BoutiqueProductPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { addItem } = useNeedsList()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined" && slug) {
      const savedProducts = localStorage.getItem("products")
      if (savedProducts) {
        try {
          const allProducts: Product[] = JSON.parse(savedProducts)
          const foundProduct = allProducts.find((p) => p.slug === slug && p.productType === "sale")
          setProduct(foundProduct || null)
        } catch (error) {
          console.error("Error loading product:", error)
        }
      }
    }
  }, [slug])

  const handleAddToCart = () => {
    if (product) {
      addItem(product)
      toast({
        title: "Produit ajouté",
        description: `${product.name} a été ajouté à votre liste de besoins`,
      })
    }
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Produit non trouvé</p>
          <Link href="/boutique">
            <Button>Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/boutique" className="inline-flex items-center text-gray-600 hover:text-[#1f3b57] mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour à la boutique
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="aspect-square relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">Pas d'image</span>
              </div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-[#1f3b57]" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {product.brand && (
            <Badge variant="outline" className="text-sm">
              {product.brand}
            </Badge>
          )}

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#1f3b57]">{product.salePrice?.toLocaleString("fr-MA")} DH</span>
              <span className="text-sm text-gray-500">HT</span>
            </div>
            <div className="text-lg text-gray-600">
              {((product.salePrice || 0) * 1.2).toLocaleString("fr-MA")} DH TTC (TVA 20%)
            </div>
          </div>

          {product.stock !== undefined && (
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">En stock ({product.stock} disponibles)</span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Rupture de stock</span>
              )}
            </div>
          )}

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Informations produit</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">SKU</dt>
                  <dd className="font-medium">{product.sku}</dd>
                </div>
                {product.category && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Catégorie</dt>
                    <dd className="font-medium">{product.category}</dd>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Garantie</dt>
                    <dd className="font-medium">{product.warranty}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            size="lg"
            className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/80"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-4 last:border-0">
                      <dt className="text-sm font-medium text-gray-600 mb-1">{key}</dt>
                      <dd className="text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-gray-500">Aucune caractéristique disponible</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

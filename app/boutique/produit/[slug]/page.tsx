"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { useNeedsList } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, Truck, Shield, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { products } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { addItem } = useNeedsList()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  const product = products.find((p) => p.slug === slug && p.productType === "sale" && p.status === "active")

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="mb-4 text-2xl font-bold">Produit non trouvé</h1>
          <Button onClick={() => router.push("/boutique")}>Retour à la boutique</Button>
        </div>
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const brand = brands.find((b) => b.id === product.brandId)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast({
      title: "Produit ajouté",
      description: `${quantity} × ${product.name} ajouté${quantity > 1 ? "s" : ""} à votre liste de besoins`,
    })
  }

  const displayPrice = product.price
  const priceWithTax = displayPrice * 1.2

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-50">
            <Image
              src={product.images?.[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border bg-gray-50 ${
                    selectedImage === index ? "ring-2 ring-[#1f3b57]" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {brand && (
              <Badge variant="outline" className="mb-2">
                {brand.name}
              </Badge>
            )}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {category && <p className="text-muted-foreground">{category.name}</p>}
          </div>

          {product.isFeatured && (
            <Badge className="bg-[#1f3b57]">
              <Star className="mr-1 h-3 w-3" />
              Produit populaire
            </Badge>
          )}

          <div className="space-y-2">
            {product.compareAtPrice && product.compareAtPrice > displayPrice && (
              <p className="text-lg text-gray-500 line-through">{product.compareAtPrice.toFixed(2)} DH HT</p>
            )}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#1f3b57]">{displayPrice.toFixed(2)} DH</span>
              <span className="text-sm text-gray-500">HT</span>
            </div>
            <p className="text-lg text-gray-700">{priceWithTax.toFixed(2)} DH TTC</p>
          </div>

          {product.shortDescription && <p className="text-lg text-gray-700">{product.shortDescription}</p>}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantité:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  disabled={quantity >= product.stockQuantity}
                >
                  +
                </Button>
              </div>
            </div>

            {product.stockQuantity !== undefined && (
              <div className="text-sm">
                {product.stockQuantity > 0 ? (
                  <span className="text-green-600 font-medium">
                    ✓ En stock ({product.stockQuantity} disponible{product.stockQuantity > 1 ? "s" : ""})
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Rupture de stock</span>
                )}
              </div>
            )}

            <Button
              size="lg"
              className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90"
              onClick={handleAddToCart}
              disabled={product.stockQuantity <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ajouter au panier
            </Button>
          </div>

          <div className="grid gap-4 border-t pt-6">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-[#1f3b57]" />
              <div>
                <p className="font-medium">Livraison rapide</p>
                <p className="text-sm text-muted-foreground">Livraison sous 48h à 72h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[#1f3b57]" />
              <div>
                <p className="font-medium">Garantie constructeur</p>
                <p className="text-sm text-muted-foreground">Tous nos produits sont garantis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="prose max-w-none pt-6">
                {product.description ? (
                  <div dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, "<br>") }} />
                ) : (
                  <p className="text-muted-foreground">Aucune description disponible</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                {product.attributes && Object.keys(product.attributes).length > 0 ? (
                  <dl className="grid gap-4">
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4 border-b pb-4 last:border-0">
                        <dt className="font-medium text-gray-700">{key}</dt>
                        <dd className="text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">Aucune spécification disponible</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

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
import { ShoppingCart, Check, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ProductPage() {
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

  const product = products.find((p) => p.slug === slug && p.productType === "sale")

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="mb-4 text-2xl font-bold">Produit non trouvé</h1>
          <Link href="/boutique">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la boutique
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const brand = brands.find((b) => b.id === product.brandId)
  const priceWithTax = product.salePrice ? product.salePrice * 1.2 : 0

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre liste de besoins`,
    })
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/boutique" className="hover:text-foreground">
          Boutique
        </Link>
        <span>/</span>
        {category && (
          <>
            <span>{category.name}</span>
            <span>/</span>
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={images[selectedImage] || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {brand && <Badge variant="secondary">{brand.name}</Badge>}
              {product.stock && product.stock > 0 ? (
                <Badge variant="default" className="bg-green-500">
                  <Check className="mr-1 h-3 w-3" />
                  En stock
                </Badge>
              ) : (
                <Badge variant="destructive">Rupture de stock</Badge>
              )}
            </div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            {category && <p className="text-sm text-muted-foreground">{category.name}</p>}
          </div>

          <div className="space-y-2 border-y py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{priceWithTax.toFixed(2)} DH TTC</span>
            </div>
            <p className="text-sm text-muted-foreground">Prix HT: {product.salePrice?.toFixed(2)} DH (TVA 20%)</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full"
              disabled={!product.stock || product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ajouter à ma liste de besoins
            </Button>
            <p className="text-center text-sm text-muted-foreground">Livraison gratuite partout au Maroc</p>
          </div>

          <Card>
            <CardContent className="space-y-3 p-4">
              <h3 className="font-semibold">Caractéristiques principales</h3>
              <ul className="space-y-2 text-sm">
                {product.specifications &&
                  Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value as string}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Caractéristiques techniques</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="whitespace-pre-wrap text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {product.specifications ? (
                  <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b pb-3">
                        <dt className="mb-1 font-semibold">{key}</dt>
                        <dd className="text-muted-foreground">{value as string}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">Aucune spécification technique disponible</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

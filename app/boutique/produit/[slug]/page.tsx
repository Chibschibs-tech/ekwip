"use client"

import { useState, use } from "react"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Minus, Plus, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const { products } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { addItem } = useCart()
  const { toast } = useToast()

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.slug === resolvedParams.slug && p.productType === "sale")

  if (!product) {
    notFound()
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const brand = brands.find((b) => b.id === product.brandId)
  const images = product.images || [product.thumbnail || "/placeholder.svg"]

  const handleAddToCart = () => {
    if (product.stockQuantity < quantity) {
      toast({
        title: "Stock insuffisant",
        description: "La quantité demandée n'est pas disponible",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.thumbnail || product.images?.[0] || "/placeholder.svg",
    })

    toast({
      title: "Ajouté au panier",
      description: `${quantity} × ${product.name} ajouté${quantity > 1 ? "s" : ""} au panier`,
    })

    setQuantity(1)
  }

  const incrementQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-blue-600 dark:hover:text-blue-400">
            Boutique
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/boutique?category=${category.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-600 ring-2 ring-blue-600 ring-offset-2"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {brand && <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{brand.name}</p>}

            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h1>
              {product.shortDescription && (
                <p className="text-gray-600 dark:text-gray-400">{product.shortDescription}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Badge variant={product.stockQuantity > 0 ? "default" : "destructive"}>
                {product.stockQuantity > 0 ? `${product.stockQuantity} en stock` : "Rupture de stock"}
              </Badge>
              {category && <Badge variant="outline">{category.name}</Badge>}
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <Separator />

            <div className="space-y-2">
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500 line-through">{product.compareAtPrice.toFixed(2)} DH HT</span>
                  <Badge variant="destructive">
                    -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                  </Badge>
                </div>
              )}

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {product.price.toFixed(2)} DH
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-400">HT</span>
              </div>

              <p className="text-xl text-gray-700 dark:text-gray-300">{(product.price * 1.2).toFixed(2)} DH TTC</p>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantité:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stockQuantity}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={product.stockQuantity === 0}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stockQuantity === 0 ? "Rupture de stock" : "Ajouter au panier"}
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Garantie fabricant incluse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Support technique disponible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Livraison rapide au Maroc</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Paiement sécurisé</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
                <TabsTrigger value="delivery">Livraison</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4 mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  {product.description ? (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{product.description}</p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">Aucune description disponible.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-4 mt-6">
                {product.attributes && Object.keys(product.attributes).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Aucune caractéristique disponible.</p>
                )}
              </TabsContent>

              <TabsContent value="delivery" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Livraison Standard</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Livraison sous 2-5 jours ouvrables au Maroc
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Livraison Express</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Livraison sous 24-48h pour Casablanca et Rabat
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Retrait en magasin</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Disponible gratuitement dans nos locaux
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

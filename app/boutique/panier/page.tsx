"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useProducts } from "@/contexts/products-context"

export default function ShoppingCartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const { toast } = useToast()
  const { products } = useProducts()

  // Filter cart items to only show sale products
  const saleCartItems = useMemo(() => {
    return items.filter((item) => item.product.productType === "sale")
  }, [items])

  // Calculate totals
  const subtotal = useMemo(() => {
    return saleCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [saleCartItems])

  const taxRate = 0.2 // 20% VAT
  const tax = subtotal * taxRate
  const shipping = subtotal > 1000 ? 0 : 50 // Free shipping over 1000 DH
  const total = subtotal + tax + shipping

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré du panier",
      })
    } else {
      const product = products.find((p) => p.id === productId)
      if (product && newQuantity > product.stockQuantity) {
        toast({
          title: "Stock insuffisant",
          description: `Seulement ${product.stockQuantity} unité(s) disponible(s)`,
          variant: "destructive",
        })
        return
      }
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId)
    toast({
      title: "Produit retiré",
      description: `${productName} a été retiré du panier`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés du panier",
    })
  }

  if (saleCartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/boutique"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la boutique
          </Link>

          <div className="max-w-md mx-auto text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Ajoutez des produits à votre panier pour commencer vos achats
            </p>
            <Link href="/boutique">
              <Button size="lg">Continuer les achats</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/boutique"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la boutique
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Panier</h1>
              {saleCartItems.length > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearCart}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vider le panier
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {saleCartItems.map((item) => {
                const product = item.product
                const itemTotal = product.price * item.quantity
                const isOutOfStock = (product.stockQuantity || 0) < item.quantity

                return (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <Link href={`/boutique/produit/${product.slug}`} className="flex-shrink-0">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
                              alt={product.name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <Link href={`/boutique/produit/${product.slug}`}>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {product.sku}</p>
                            {isOutOfStock && (
                              <Badge variant="destructive" className="mt-2">
                                Stock insuffisant
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Price */}
                            <div>
                              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                {product.price.toFixed(2)} DH HT
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total: {itemTotal.toFixed(2)} DH HT
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10"
                                  onClick={() => handleQuantityChange(product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10"
                                  onClick={() => handleQuantityChange(product.id, item.quantity + 1)}
                                  disabled={
                                    !product.stockQuantity || item.quantity >= product.stockQuantity
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleRemoveItem(product.id, product.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-96">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Sous-total HT</span>
                    <span className="font-medium">{subtotal.toFixed(2)} DH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">TVA (20%)</span>
                    <span className="font-medium">{tax.toFixed(2)} DH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Livraison</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        `${shipping.toFixed(2)} DH`
                      )}
                    </span>
                  </div>
                  {subtotal < 1000 && (
                    <p className="text-xs text-gray-500">
                      Ajoutez {(1000 - subtotal).toFixed(2)} DH pour la livraison gratuite
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total TTC</span>
                  <span className="text-blue-600 dark:text-blue-400">{total.toFixed(2)} DH</span>
                </div>

                <Link href="/boutique/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Passer la commande
                  </Button>
                </Link>

                <Link href="/boutique" className="block">
                  <Button variant="outline" className="w-full">
                    Continuer les achats
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



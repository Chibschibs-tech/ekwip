"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/types/admin"
import { useNeedsList } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  href: string
}

export default function ProductCard({ product, href }: ProductCardProps) {
  const { addItem } = useNeedsList()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(product)
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre liste de besoins`,
    })
  }

  const displayPrice = product.price
  const priceWithTax = displayPrice * 1.2

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <Link href={href} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-gray-400">Pas d'image</span>
              </div>
            )}

            {product.isFeatured && (
              <Badge className="absolute left-3 top-3 bg-[#1f3b57]">
                <Star className="mr-1 h-3 w-3" />
                Populaire
              </Badge>
            )}

            {product.stockQuantity <= 0 && (
              <Badge variant="destructive" className="absolute right-3 top-3">
                Rupture
              </Badge>
            )}
          </div>
        </Link>

        <div className="p-4 space-y-3">
          <Link href={href}>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#1f3b57] transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.shortDescription && <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>}

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              {product.compareAtPrice && product.compareAtPrice > displayPrice && (
                <span className="text-sm text-gray-500 line-through">{product.compareAtPrice.toFixed(2)} DH</span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#1f3b57]">{displayPrice.toFixed(2)} DH</span>
              <span className="text-xs text-gray-500">HT</span>
            </div>
            <p className="text-sm text-gray-600">{priceWithTax.toFixed(2)} DH TTC</p>
          </div>

          {product.stockQuantity !== undefined && (
            <div className="text-sm">
              {product.stockQuantity > 0 ? (
                <span className="text-green-600">En stock ({product.stockQuantity})</span>
              ) : (
                <span className="text-red-600">Rupture de stock</span>
              )}
            </div>
          )}

          <Button
            onClick={handleAddToCart}
            disabled={product.stockQuantity <= 0}
            className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter au panier
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

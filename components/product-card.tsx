"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    image: string
    category: string
    description: string
    specs?: {
      processor?: string
      ram?: string
      storage?: string
      screen?: string
      camera?: string
    }
    stock: number
    status: string
  }
  href: string
}

export default function ProductCard({ product, href }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <Link href={href} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            {product.image ? (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-gray-400">Pas d'image</span>
              </div>
            )}

            {product.stock > 0 && product.stock < 10 && (
              <Badge className="absolute left-3 top-3 bg-orange-500">
                <Star className="mr-1 h-3 w-3" />
                Stock limité
              </Badge>
            )}

            {product.stock <= 0 && (
              <Badge variant="destructive" className="absolute right-3 top-3">
                Rupture
              </Badge>
            )}
          </div>
        </Link>

        <div className="p-4 space-y-3">
          <Link href={href}>
            <div className="mb-2">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.description && <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>}

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600">{product.price} DH</span>
              <span className="text-xs text-gray-500">/mois</span>
            </div>
          </div>

          {product.stock !== undefined && (
            <div className="text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">En stock ({product.stock})</span>
              ) : (
                <span className="text-red-600">Rupture de stock</span>
              )}
            </div>
          )}

          <Link href={href}>
            <Button
              variant="outline"
              className="w-full hover:bg-blue-600 hover:text-white transition-colors border-blue-600 text-blue-600 bg-transparent"
              disabled={product.stock <= 0}
            >
              Voir les détails
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

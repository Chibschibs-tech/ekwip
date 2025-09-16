"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/products"
import type { Product } from "@/lib/products"

interface CatalogProductCardProps {
  product: Product
}

export default function CatalogProductCard({ product }: CatalogProductCardProps) {
  return (
    <Link href={`/catalogue/product/${product.slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white font-medium">Nouveau</Badge>}
            {product.isFeatured && (
              <Badge className="bg-ekwip hover:bg-ekwip-700 text-white font-medium">Populaire</Badge>
            )}
          </div>

          {/* Stock status */}
          <div className="absolute top-3 right-3">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-3">
            {/* Brand */}
            <div className="text-sm text-gray-500 font-medium">{product.brand}</div>

            {/* Product name */}
            <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-ekwip transition-colors">
              {product.name}
            </h3>

            {/* Short description */}
            <p className="text-gray-600 text-sm line-clamp-2">{product.shortDescription}</p>

            {/* Rental duration */}
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
              Contrat {product.rentalDuration}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="text-sm text-gray-500">À partir de</div>
                <div className="text-xl font-bold text-ekwip">
                  {formatPrice(product.basePrice)}{" "}
                  <span className="text-sm font-normal">({product.rentalDuration})</span>
                </div>
              </div>

              {/* Stock indicator */}
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {product.inStock ? "Disponible" : "Indisponible"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

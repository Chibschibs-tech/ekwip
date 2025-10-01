import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1">
        {/* Product Image */}
        <div className="relative bg-gray-50 aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-green-100 text-green-800 border-green-200">Nouveau</Badge>}
            {product.isPopular && <Badge className="bg-ekwip-100 text-ekwip-800 border-ekwip-200">Populaire</Badge>}
            {product.isFeatured && <Badge className="bg-amber-100 text-amber-800 border-amber-200">Vedette</Badge>}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Rupture de stock</Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-ekwip transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

          <div className="mt-auto">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">À partir de</p>
              <p className="text-2xl font-bold text-ekwip">{product.price} DH/mois</p>
              {product.basePrice && <p className="text-xs text-gray-500 mt-1">(Location {product.basePrice} mois)</p>}
            </div>

            <Link href={`/catalogue/product/${product.slug}`} className="block">
              <Button
                variant="outline"
                className="w-full hover:bg-ekwip hover:text-white transition-colors border-ekwip text-ekwip bg-transparent"
                disabled={!product.inStock}
              >
                Voir les détails
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/products"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#1f3b57] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#1f3b57]">{formatPrice(product.monthlyPrice || 0)}/mois</span>
                {product.duration && (
                  <Badge variant="secondary" className="text-xs">
                    {product.duration}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">Prix d'achat: {formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="pt-2">
            <Link href={`/store/product/${product.id}`}>
              <Button className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90 text-white">Voir les détails</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard

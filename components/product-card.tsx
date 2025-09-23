import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.popular && (
            <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">Populaire</Badge>
          )}
          {product.new && <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">Nouveau</Badge>}
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#1f3b57] transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-[#1f3b57]">{product.price}€</span>
              <span className="text-gray-500 text-sm">/mois</span>
              <div className="text-xs text-gray-500">({product.duration} mois)</div>
            </div>
            <Link href={`/catalogue/product/${product.slug}`}>
              <Button size="sm" className="bg-[#1f3b57] hover:bg-[#1f3b57]/90">
                Voir détails
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard

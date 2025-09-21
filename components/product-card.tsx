import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice, type Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && <Badge className="absolute top-2 left-2 bg-ekwip text-white">Populaire</Badge>}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Rupture
            </Badge>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-ekwip transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-ekwip">{formatPrice(product.price)}</span>
              <span className="text-sm text-gray-500 ml-1">/mois</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
          </div>

          <Link href={`/store/product/${product.slug}`}>
            <Button className="w-full bg-ekwip hover:bg-ekwip-700 text-white" disabled={!product.inStock}>
              {product.inStock ? "Voir les détails" : "Indisponible"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard

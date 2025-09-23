import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/products"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    image: string
    brand: string
    category: string
    inStock: boolean
    isNew?: boolean
    isPopular?: boolean
    isFeatured?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative bg-gray-50 aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-green-100 text-green-800 border-green-200">Nouveau</Badge>}
            {product.isPopular && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Populaire</Badge>}
            {product.isFeatured && <Badge className="bg-ekwip-100 text-ekwip border-ekwip-200">Vedette</Badge>}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Rupture de stock</Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-ekwip transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">À partir de</p>
              <p className="text-xl font-bold text-ekwip">{formatPrice(product.price)}/mois</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/catalogue/product/${product.slug}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full hover:bg-ekwip hover:text-white transition-colors bg-transparent"
                disabled={!product.inStock}
              >
                Voir les détails
              </Button>
            </Link>
            <Button size="sm" className="bg-ekwip hover:bg-ekwip-700" disabled={!product.inStock}>
              Ajouter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard

import Image from "next/image"
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
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {product.popular && <Badge className="absolute top-2 left-2 bg-ekwip text-white">Populaire</Badge>}
          {product.new && <Badge className="absolute top-2 left-2 bg-green-600 text-white">Nouveau</Badge>}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-ekwip">{formatPrice(product.price)}</span>
              <span className="text-gray-500 text-sm">/mois</span>
            </div>
            <span className="text-sm text-gray-500">({product.duration} mois)</span>
          </div>

          <Button className="w-full bg-ekwip hover:bg-ekwip/90">Demander un devis</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard

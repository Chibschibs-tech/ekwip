import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  slug: string
  price: string
  short_description: string
  images: Array<{
    src: string
    alt: string
  }>
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/store/product/${product.slug}`}>
          <Card className="h-full hover:shadow-md transition-all">
            <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0].src || "/placeholder.svg"}
                  alt={product.images[0].alt || product.name}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">Aucune image</div>
              )}
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <div
                className="text-gray-600 text-sm mb-4 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
              <p className="text-xl font-bold text-blue-600">{product.price} MAD/mois</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

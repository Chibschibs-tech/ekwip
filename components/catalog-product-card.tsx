import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CatalogProductCardProps {
  product: {
    id: number
    name: string
    description: string
    shortDescription: string
    price: number
    salePrice?: number
    stock: number
    image: string
    category: string
    brand: string
    tags: string[]
    specifications?: Record<string, string>
    slug: string
    featured: boolean
    new: boolean
  }
}

export default function CatalogProductCard({ product }: CatalogProductCardProps) {
  const monthlyPrice = Math.round(product.price * 0.08) // Approximate 8% of purchase price for monthly rental
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <Link href={`/catalogue/${product.slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
        <div className="relative">
          {product.salePrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              -{discountPercentage}%
            </div>
          )}
          {product.new && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              Nouveau
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-ekwip text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              Populaire
            </div>
          )}
          <div className="bg-gray-50 p-6 flex items-center justify-center h-56">
            <Image
              src={product.image || "/placeholder.svg?height=200&width=200"}
              alt={product.name}
              width={200}
              height={200}
              className="max-h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.shortDescription}</p>
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500">À partir de</p>
                <span className="font-bold text-gray-800 text-lg">{monthlyPrice} €/mois</span>
              </div>
              <div
                className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {product.stock > 0 ? "Disponible" : "Indisponible"}
              </div>
            </div>
            <Button variant="outline" className="w-full" size="sm">
              Voir détails
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

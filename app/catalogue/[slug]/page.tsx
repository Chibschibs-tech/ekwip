import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getProductsByCategory, formatPrice } from "@/lib/products"
import { ChevronRight, ArrowLeft } from "lucide-react"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Map URL slugs to category names
const categoryMap: { [key: string]: string } = {
  "ordinateurs-portables": "Ordinateurs portables",
  "ordinateurs-de-bureau": "Ordinateurs de bureau",
  smartphones: "Smartphones",
  tablettes: "Tablettes",
  accessoires: "Accessoires",
  imprimantes: "Imprimantes",
  mobilier: "Mobilier",
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryMap[params.slug]

  if (!categoryName) {
    notFound()
  }

  const products = getProductsByCategory(categoryName)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/catalogue" className="hover:text-blue-600">
              Catalogue
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{categoryName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/catalogue" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au catalogue
        </Link>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">{products.length} produits disponibles</p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-gray-50 p-6">
                <Image
                  src={product.image || "/placeholder.svg?height=300&width=300&text=Product+Image"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
                {product.featured && (
                  <Badge className="absolute top-3 left-3 bg-amber-100 text-amber-600">Populaire</Badge>
                )}
                {product.new && <Badge className="absolute top-3 right-3 bg-green-100 text-green-600">Nouveau</Badge>}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)} DH<span className="text-sm font-normal">/mois</span>
                      {product.rentalDuration && (
                        <span className="text-sm font-normal text-gray-600"> ({product.rentalDuration} mois)</span>
                      )}
                    </p>
                    {product.firstMonthPrice && (
                      <p className="text-sm text-gray-500">{formatPrice(product.firstMonthPrice)} DH Le 1er mois</p>
                    )}
                  </div>
                  <Link href={`/catalogue/product/${product.slug}`}>
                    <Button size="sm" className="bg-[#334e68] hover:bg-[#2a3f5f] text-white">
                      Voir détails
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit disponible dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  )
}

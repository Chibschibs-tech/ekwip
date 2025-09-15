import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProductBySlug, getProductsByCategory, formatPrice } from "@/lib/products"
import { ChevronRight, ArrowLeft, Star, Shield, Truck, HeadphonesIcon } from "lucide-react"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

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
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/catalogue" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au catalogue
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl p-8 shadow-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square bg-white rounded-lg p-2 shadow-md">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                  {product.category}
                </Badge>
                {product.featured && <Badge className="bg-amber-100 text-amber-600">Populaire</Badge>}
                {product.new && <Badge className="bg-green-100 text-green-600">Nouveau</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{product.shortDescription}</p>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                <span className="text-xl text-gray-600">DH</span>
                <span className="text-lg text-gray-500">/mois</span>
              </div>
              {product.firstMonthPrice && (
                <p className="text-lg text-gray-700 mb-4">{formatPrice(product.firstMonthPrice)} DH Le 1er mois</p>
              )}
              <p className="text-sm text-gray-600 mb-4">
                Location longue durée • Maintenance incluse • Assurance comprise
              </p>

              <div className="space-y-3">
                <Button size="lg" className="w-full bg-[#334e68] hover:bg-[#2a3f5f] text-white">
                  Demander un devis
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent border-[#334e68] text-[#334e68] hover:bg-[#334e68] hover:text-white"
                >
                  Ajouter à ma liste de besoins
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Garantie incluse</p>
                  <p className="text-sm text-gray-600">3 ans</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Livraison</p>
                  <p className="text-sm text-gray-600">24-48h</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <HeadphonesIcon className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Support</p>
                  <p className="text-sm text-gray-600">7j/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Star className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-900">Maintenance</p>
                  <p className="text-sm text-gray-600">Incluse</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Description */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Specifications */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Spécifications</h2>
                {product.specifications && (
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start py-2">
                          <span className="font-medium text-gray-700">{key}</span>
                          <span className="text-gray-900 text-right ml-4">{value}</span>
                        </div>
                        {index < Object.entries(product.specifications!).length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-50 p-6">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{relatedProduct.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold">{formatPrice(relatedProduct.price)} DH/mois</span>
                        {relatedProduct.firstMonthPrice && (
                          <p className="text-xs text-gray-500">
                            {formatPrice(relatedProduct.firstMonthPrice)} DH Le 1er mois
                          </p>
                        )}
                      </div>
                      <Link href={`/catalogue/product/${relatedProduct.slug}`}>
                        <Button size="sm" className="bg-[#334e68] hover:bg-[#2a3f5f] text-white">
                          Voir détails
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchProductBySlug, fetchRelatedProducts } from "@/lib/wordpress-api"
import { ChevronRight, Star, Shield, Truck, RefreshCw } from "lucide-react"

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Produit non trouvé - Ekwip",
      description: "Ce produit n'existe pas ou a été supprimé.",
    }
  }

  return {
    title: `${product.name} - Ekwip`,
    description: product.short_description,
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await fetchRelatedProducts(product.id, 3)

  return (
    <div>
      {/* Breadcrumbs */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Accueil
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/store" className="hover:text-blue-600">
                  Boutique
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="font-medium text-blue-600">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0].src || "/placeholder.svg"}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-contain p-8"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">Aucune image disponible</div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                {product.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-2"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

              <div
                className="text-gray-600 mb-6 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-3xl font-bold text-blue-600">{product.price} MAD</span>
                  <span className="text-gray-500">/ mois</span>
                  {product.sale_price && (
                    <span className="text-lg text-gray-400 line-through">{product.regular_price} MAD</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">Prix de location mensuelle, maintenance incluse</p>
              </div>

              {/* Attributes */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Spécifications techniques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.attributes.map((attribute) => (
                      <div key={attribute.id} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium">{attribute.name}:</span>
                        <span className="text-gray-600">{attribute.options.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-8">
                {product.stock_status === "instock" ? (
                  <div className="flex items-center text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>En stock ({product.stock_quantity} disponibles)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Rupture de stock</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Link href="/contact" className="block">
                  <Button size="lg" className="w-full">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/comment-ca-marche" className="block">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Comment ça marche ?
                  </Button>
                </Link>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Garantie incluse</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RefreshCw className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Mise à niveau possible</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Support technique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/store/product/${relatedProduct.slug}`}>
                  <Card className="h-full hover:shadow-md transition-all">
                    <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <Image
                          src={relatedProduct.images[0].src || "/placeholder.svg"}
                          alt={relatedProduct.images[0].alt || relatedProduct.name}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">Aucune image</div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div
                        className="text-gray-600 text-sm mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: relatedProduct.short_description }}
                      />
                      <p className="text-xl font-bold text-blue-600">{relatedProduct.price} MAD/mois</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Besoin d'aide pour faire votre choix ?</h2>
          <p className="text-white text-lg max-w-2xl mx-auto mb-8 opacity-90">
            Nos experts sont là pour vous conseiller et vous proposer la solution la plus adaptée à vos besoins.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
              Contactez nos experts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

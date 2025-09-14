import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug, getProducts } from "@/lib/products"
import { ChevronRight, Star, Shield, Truck, RefreshCw, ArrowLeft } from "lucide-react"

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Produit non trouvé - Ekwip",
      description: "Ce produit n'existe pas ou a été supprimé.",
    }
  }

  return {
    title: `${product.name} - Ekwip`,
    description: product.shortDescription,
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const allProducts = getProducts()
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

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
              <li>
                <Link href={`/store?category=${encodeURIComponent(product.category)}`} className="hover:text-blue-600">
                  {product.category}
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="font-medium text-blue-600">{product.name}</li>
            </ol>
          </nav>

          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.new && <Badge className="bg-green-100 text-green-800">Nouveau</Badge>}
                {product.featured && <Badge className="bg-blue-100 text-blue-800">Populaire</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>

              {/* Pricing */}
              <div className="mb-8 bg-blue-50 rounded-lg p-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-3xl font-bold text-blue-600">{product.price}€</span>
                  <span className="text-gray-500">/ mois</span>
                </div>
                <p className="text-sm text-gray-500">Prix TTC, engagement 24 mois minimum</p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Spécifications principales</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{product.shortDescription}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 mb-8">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Ajouter à ma liste de besoins
                </Button>
                <Link href="/contact" className="block">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Demander un devis personnalisé
                  </Button>
                </Link>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 mr-2 text-green-600" />
                  <span>Assurance incluse</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RefreshCw className="h-4 w-4 mr-2 text-purple-600" />
                  <span>Mise à niveau possible</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-2 text-yellow-600" />
                  <span>Support technique 7j/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Card */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Détails du produit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Caractéristiques</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Catégorie</span>
                      <span className="text-gray-600">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Prix mensuel</span>
                      <span className="text-gray-600">{product.price}€ TTC</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Engagement minimum</span>
                      <span className="text-gray-600">24 mois</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Disponibilité</span>
                      <span className="text-green-600 font-medium">En stock</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Services inclus</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Assurance complète</div>
                        <div className="text-sm text-gray-600">Couverture vol, casse, panne</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Livraison & installation</div>
                        <div className="text-sm text-gray-600">Partout au Maroc</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Support technique</div>
                        <div className="text-sm text-gray-600">7j/7 par téléphone et email</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/store/product/${relatedProduct.slug}`}>
                  <Card className="h-full hover:shadow-md transition-all group">
                    <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {relatedProduct.new && <Badge className="bg-green-100 text-green-800 text-xs">Nouveau</Badge>}
                        {relatedProduct.featured && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Populaire</Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedProduct.shortDescription}</p>
                      <p className="text-xl font-bold text-blue-600">{relatedProduct.price}€/mois</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-5xl mx-auto text-center">
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

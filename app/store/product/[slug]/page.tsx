import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug, getProducts } from "@/lib/products"
import { ArrowLeft, Shield, Truck, HeadphonesIcon } from "lucide-react"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Produit non trouvé - Ekwip",
      description: "Ce produit n'existe pas ou a été supprimé.",
    }
  }

  return {
    title: `${product.name} - Ekwip`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const allProducts = getProducts()
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/store" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg p-8 shadow-sm">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.new && <Badge className="bg-green-100 text-green-800">Nouveau</Badge>}
                {product.featured && <Badge className="bg-blue-100 text-blue-800">Populaire</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-blue-600">{product.price}€</span>
                <span className="text-gray-600">/mois</span>
              </div>
              <p className="text-sm text-gray-600">Prix TTC, engagement 24 mois</p>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Ajouter à ma liste de besoins
              </Button>
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Demander un devis personnalisé
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Assurance incluse</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Livraison gratuite</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <HeadphonesIcon className="w-4 h-4 text-purple-600" />
                <span>Support technique</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Caractéristiques techniques</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">{product.shortDescription}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Catégorie</span>
                      <span className="text-gray-600">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Prix mensuel</span>
                      <span className="text-gray-600">{product.price}€ TTC</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Engagement</span>
                      <span className="text-gray-600">24 mois</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Disponibilité</span>
                      <span className="text-green-600 font-medium">En stock</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Avantages inclus</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Assurance complète</div>
                      <div className="text-sm text-gray-600">Couverture vol, casse, panne</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Livraison & installation</div>
                      <div className="text-sm text-gray-600">Partout au Maroc</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <HeadphonesIcon className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Support technique</div>
                      <div className="text-sm text-gray-600">7j/7 par téléphone</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-50 rounded-lg mb-4 p-4">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{relatedProduct.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{relatedProduct.price}€/mois</span>
                      <Link href={`/store/product/${relatedProduct.slug}`}>
                        <Button size="sm" variant="outline">
                          Voir
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

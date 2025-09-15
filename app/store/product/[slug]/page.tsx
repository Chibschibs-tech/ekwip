"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Truck, Shield, Headphones } from "lucide-react"
import { getProductBySlug, getProductsByCategory } from "@/lib/products"
import { useLanguage } from "@/contexts/language-context"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()

  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-ekwip">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/store" className="hover:text-ekwip">
              Boutique
            </Link>
            <span>/</span>
            <Link
              href={`/catalogue/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-ekwip"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/store">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la boutique
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
                {product.new && (
                  <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">Nouveau</Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-4 right-4 bg-ekwip hover:bg-ekwip-700">
                    <Star className="h-3 w-3 mr-1" />
                    Populaire
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.shortDescription}</p>
              </div>

              {/* Price */}
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Prix de location mensuel</p>
                    <p className="text-3xl font-bold text-ekwip">
                      {product.price}€<span className="text-lg font-normal">/mois</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Installation et configuration incluses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Support technique 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Maintenance et réparations incluses</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-ekwip hover:bg-ekwip-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Demander un devis
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Truck className="h-8 w-8 text-ekwip mx-auto mb-2" />
                  <p className="text-sm font-medium">Livraison rapide</p>
                  <p className="text-xs text-gray-500">24-48h</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Shield className="h-8 w-8 text-ekwip mx-auto mb-2" />
                  <p className="text-sm font-medium">Garantie totale</p>
                  <p className="text-xs text-gray-500">Incluse</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Headphones className="h-8 w-8 text-ekwip mx-auto mb-2" />
                  <p className="text-sm font-medium">Support 24/7</p>
                  <p className="text-xs text-gray-500">Inclus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Description détaillée</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Spécifications techniques</h3>
                    <div className="space-y-4">
                      {product.slug === "dell-mobile-precision-workstation-5690" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900">Processeur</h4>
                              <p className="text-gray-600">Intel Core Ultra 7 165H vPro</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Mémoire</h4>
                              <p className="text-gray-600">32 Go LPDDR5x</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Carte graphique</h4>
                              <p className="text-gray-600">NVIDIA RTX 2000 Ada 8 Go GDDR6</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Écran</h4>
                              <p className="text-gray-600">16" FHD tactile</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Clavier</h4>
                              <p className="text-gray-600">Français rétroéclairé avec lecteur d'empreintes</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Connectivité</h4>
                              <p className="text-gray-600">Wi-Fi 7, Bluetooth</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Système d'exploitation</h4>
                              <p className="text-gray-600">Windows 11 Professionnel</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Logiciels inclus</h4>
                              <p className="text-gray-600">Microsoft 365</p>
                            </div>
                          </div>
                        </>
                      )}
                      {product.slug !== "dell-mobile-precision-workstation-5690" && (
                        <p className="text-gray-600">
                          Spécifications détaillées disponibles sur demande. Contactez notre équipe pour plus
                          d'informations.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Support et services</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Support technique 24/7</h4>
                        <p className="text-gray-600">
                          Notre équipe d'experts est disponible 24h/24 et 7j/7 pour vous assister.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Installation et configuration</h4>
                        <p className="text-gray-600">
                          Installation complète et configuration selon vos besoins professionnels.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Maintenance préventive</h4>
                        <p className="text-gray-600">Maintenance régulière pour assurer des performances optimales.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Produits similaires</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="relative bg-gray-100 aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-ekwip transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedProduct.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-ekwip">
                          {relatedProduct.price}€<span className="text-sm font-normal">/mois</span>
                        </p>
                        <Link href={`/store/product/${relatedProduct.slug}`}>
                          <Button size="sm" variant="outline">
                            Voir
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

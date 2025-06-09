"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Star, Shield, Truck, Headphones } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getProductBySlug, getProductsByCategory } from "@/lib/store-products"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()

  // Get the product by slug
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const monthlyPrice = Math.round(product.price * 0.8) // Monthly rental price

  return (
    <div>
      {/* Breadcrumbs */}
      <section className="py-4 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <nav>
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  {t("category.breadcrumb.home")}
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-gray-900">
                  {t("category.breadcrumb.catalog")}
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                <Link
                  href={`/catalogue/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-900"
                >
                  {product.category}
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
              <li className="font-medium text-gray-900">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-96">
                <Image
                  src={product.image || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="max-h-80 w-auto object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  {product.new && <Badge className="bg-green-500 hover:bg-green-600">{t("common.new")}</Badge>}
                  {product.featured && <Badge className="bg-ekwip hover:bg-ekwip-700">{t("common.popular")}</Badge>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              </div>

              {/* Pricing */}
              <div className="bg-ekwip-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">{t("common.from")}</p>
                    <p className="text-3xl font-bold text-ekwip">
                      {product.price} €/{t("common.month")}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock > 0 ? "Disponible" : "Indisponible"}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-ekwip hover:bg-ekwip-700" size="lg">
                    {t("common.get_quote")}
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    {t("common.contact_us")}
                  </Button>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-ekwip" />
                  <div>
                    <p className="font-medium text-sm">Assurance incluse</p>
                    <p className="text-xs text-gray-600">Protection complète</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-ekwip" />
                  <div>
                    <p className="font-medium text-sm">Livraison gratuite</p>
                    <p className="text-xs text-gray-600">Installation incluse</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Headphones className="h-6 w-6 text-ekwip" />
                  <div>
                    <p className="font-medium text-sm">Support 24/7</p>
                    <p className="text-xs text-gray-600">Assistance technique</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Star className="h-6 w-6 text-ekwip" />
                  <div>
                    <p className="font-medium text-sm">Maintenance incluse</p>
                    <p className="text-xs text-gray-600">Réparations gratuites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {product.specifications && (
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Spécifications techniques</h2>
            <div className="bg-white rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/catalogue/product/${relatedProduct.slug}`}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gray-100 p-6 flex items-center justify-center h-48">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg?height=200&width=200"}
                        alt={relatedProduct.name}
                        width={200}
                        height={200}
                        className="max-h-40 w-auto object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{relatedProduct.shortDescription}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">{t("common.from")}</p>
                          <p className="text-lg font-bold text-ekwip">
                            {relatedProduct.price} €/{t("common.month")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          {t("common.view_details")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-ekwip text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Intéressé par ce produit ?</h2>
          <p className="text-lg mb-8 opacity-90">
            Contactez nos experts pour obtenir un devis personnalisé et découvrir comment ce produit peut répondre à vos
            besoins spécifiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Demander un devis
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ekwip">
              Parler à un expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

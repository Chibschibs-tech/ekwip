"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Truck, Headphones, Wrench, Check, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getProductBySlug, storeProducts } from "@/lib/store-products"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Get related products (same category, different product)
  const relatedProducts = storeProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

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
            <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="max-h-96 w-auto object-contain"
                priority
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-ekwip-100 text-ekwip px-3 py-1 rounded-full text-sm font-medium">
                  {product.brand}
                </span>
                {product.new && (
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                    {t("common.new")}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <p className="text-lg text-gray-600 mb-6">{product.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{product.price} €</span>
                  <span className="text-lg text-gray-600">/{t("common.month")}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {t("common.from")} {product.price} € {t("common.per_month")}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-green-600 font-medium">{t("product.available")}</span>
                      <span className="text-gray-500">({product.stock} en stock)</span>
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5 text-red-600" />
                      <span className="text-red-600 font-medium">{t("product.unavailable")}</span>
                    </>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-ekwip hover:bg-ekwip-700 text-white flex-1">{t("product.request_quote")}</Button>
                <Button variant="outline" className="border-ekwip text-ekwip hover:bg-ekwip hover:text-white flex-1">
                  {t("product.talk_to_expert")}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-ekwip" />
                  <div>
                    <p className="font-medium text-gray-900">{t("product.insurance_included")}</p>
                    <p className="text-sm text-gray-600">{t("product.complete_protection")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-ekwip" />
                  <div>
                    <p className="font-medium text-gray-900">{t("product.free_delivery")}</p>
                    <p className="text-sm text-gray-600">{t("product.installation_included")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="h-5 w-5 text-ekwip" />
                  <div>
                    <p className="font-medium text-gray-900">{t("product.support_24_7")}</p>
                    <p className="text-sm text-gray-600">{t("product.technical_assistance")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-ekwip" />
                  <div>
                    <p className="font-medium text-gray-900">{t("product.maintenance_included")}</p>
                    <p className="text-sm text-gray-600">{t("product.free_repairs")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {product.specifications && (
        <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t("product.specifications")}</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="px-6 py-4 flex justify-between items-center">
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t("product.related_products")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gray-100 p-6 flex items-center justify-center h-48">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={200}
                      height={200}
                      className="max-h-32 w-auto object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedProduct.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">{t("common.from")}</p>
                        <p className="text-xl font-bold">
                          {relatedProduct.price} €/{t("common.month")}
                        </p>
                      </div>
                      <Link href={`/catalogue/product/${relatedProduct.slug}`}>
                        <Button variant="outline">{t("common.view_details")}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-ekwip text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("product.interested_title")}</h2>
          <p className="text-lg mb-8 opacity-90">{t("product.interested_description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-ekwip hover:bg-gray-100">{t("product.request_quote")}</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-ekwip">
              {t("product.talk_to_expert")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

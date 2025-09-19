"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Truck, Headphones, Wrench } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  getProductBySlug,
  calculateTotalPrice,
  getFirstMonthPrice,
  formatPrice,
  type ProductConfiguration,
  type ProductVariant,
} from "@/lib/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { t } = useLanguage()
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // State for product configuration
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedConfigIndex, setSelectedConfigIndex] = useState(0)

  // For Dell Precision, use predefined configurations
  const isDellPrecision = product.slug === "dell-precision-5690"

  const [configuration, setConfiguration] = useState<ProductConfiguration>(
    isDellPrecision && product.configurations
      ? product.configurations[0]
      : {
          processor: product.variants.processors[0],
          memory: product.variants.memory[0],
          storage: product.variants.storage[0],
          graphics: product.variants.graphics?.[0],
        },
  )

  const monthlyPrice = calculateTotalPrice(product, configuration)
  const firstMonthPrice = getFirstMonthPrice(product, configuration)

  const handleConfigurationChange = (configIndex: number) => {
    if (isDellPrecision && product.configurations) {
      setSelectedConfigIndex(configIndex)
      setConfiguration(product.configurations[configIndex])
    }
  }

  const handleVariantChange = (type: keyof ProductConfiguration, variant: ProductVariant) => {
    if (!isDellPrecision) {
      setConfiguration((prev) => ({
        ...prev,
        [type]: variant,
      }))
    }
  }

  // Get available memory options based on selected processor (for Dell Precision)
  const getAvailableMemoryOptions = () => {
    if (!isDellPrecision || !product.configurations) return product.variants.memory

    return product.configurations
      .map((config) => config.memory)
      .filter((memory, index, self) => index === self.findIndex((m) => m.id === memory.id))
  }

  return (
    <div>
      {/* Breadcrumb */}
      <section className="py-6 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-ekwip">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/catalogue" className="text-gray-500 hover:text-ekwip">
              Catalogue
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/catalogue/${product.category}`} className="text-gray-500 hover:text-ekwip">
              {product.category === "ordinateurs-portables"
                ? "Ordinateurs portables"
                : product.category === "ordinateurs-de-bureau"
                  ? "Ordinateurs de bureau"
                  : product.category === "smartphones"
                    ? "Smartphones"
                    : product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/catalogue/${product.category}`}
            className="inline-flex items-center text-ekwip hover:text-ekwip-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la catégorie
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-ekwip" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">{product.brand}</Badge>
                  {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">Nouveau</Badge>}
                  {product.isFeatured && <Badge className="bg-ekwip hover:bg-ekwip-700 text-white">Populaire</Badge>}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

                <p className="text-lg text-gray-600">{product.description}</p>
              </div>

              {/* Configuration Options */}
              <div className="space-y-6">
                {isDellPrecision && product.configurations ? (
                  /* Dell Precision Predefined Configurations */
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Configurations disponibles</h3>
                    <div className="space-y-3">
                      {product.configurations.map((config, index) => {
                        const configMonthlyPrice = calculateTotalPrice(product, config)
                        const configFirstMonthPrice = getFirstMonthPrice(product, config)

                        return (
                          <button
                            key={index}
                            onClick={() => handleConfigurationChange(index)}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                              selectedConfigIndex === index
                                ? "border-ekwip bg-ekwip-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-medium text-lg">Configuration {index + 1}</div>
                              <div className="text-right">
                                <div className="text-ekwip font-bold text-lg">
                                  {formatPrice(configMonthlyPrice)}/mois
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatPrice(configFirstMonthPrice)} le 1er mois
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div>• {config.processor.name}</div>
                              <div>• {config.memory.name}</div>
                              <div>• {config.storage.name}</div>
                              {config.graphics && <div>• {config.graphics.name}</div>}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  /* Standard Configuration Options */
                  <>
                    {/* Processor */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Processeur</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {product.variants.processors.map((processor) => (
                          <button
                            key={processor.id}
                            onClick={() => handleVariantChange("processor", processor)}
                            className={`p-3 rounded-lg border-2 text-left transition-colors ${
                              configuration.processor.id === processor.id
                                ? "border-ekwip bg-ekwip-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-medium">{processor.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Memory */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Mémoire</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {getAvailableMemoryOptions().map((memory) => (
                          <button
                            key={memory.id}
                            onClick={() => handleVariantChange("memory", memory)}
                            className={`p-3 rounded-lg border-2 text-center transition-colors ${
                              configuration.memory.id === memory.id
                                ? "border-ekwip bg-ekwip-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="font-medium">{memory.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Storage */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Stockage</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {product.variants.storage.map((storage) => (
                          <button
                            key={storage.id}
                            onClick={() => handleVariantChange("storage", storage)}
                            className={`p-3 rounded-lg border-2 text-left transition-colors ${
                              configuration.storage.id === storage.id
                                ? "border-ekwip bg-ekwip-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-medium">{storage.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Graphics (if available) */}
                    {product.variants.graphics && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Carte graphique</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {product.variants.graphics.map((graphics) => (
                            <button
                              key={graphics.id}
                              onClick={() => handleVariantChange("graphics", graphics)}
                              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                                configuration.graphics?.id === graphics.id
                                  ? "border-ekwip bg-ekwip-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <span className="font-medium">{graphics.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Price and CTA */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Prix de location mensuel</div>
                    <div className="text-3xl font-bold text-ekwip">{formatPrice(monthlyPrice)}/mois</div>
                    <div className="text-sm text-gray-600 mt-1">{formatPrice(firstMonthPrice)} le premier mois</div>
                    <div className="text-xs text-gray-500 mt-1">Contrat {product.rentalDuration}</div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "Disponible" : "Indisponible"}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full" variant="gradient" disabled={!product.inStock}>
                    {t("product.request_quote")}
                  </Button>
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    {t("product.talk_to_expert")}
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-ekwip" />
                  <div>
                    <div className="font-medium text-sm">{t("product.insurance_included")}</div>
                    <div className="text-xs text-gray-500">{t("product.complete_protection")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-ekwip" />
                  <div>
                    <div className="font-medium text-sm">{t("product.free_delivery")}</div>
                    <div className="text-xs text-gray-500">{t("product.installation_included")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Headphones className="h-5 w-5 text-ekwip" />
                  <div>
                    <div className="font-medium text-sm">{t("product.support_24_7")}</div>
                    <div className="text-xs text-gray-500">{t("product.technical_assistance")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-ekwip" />
                  <div>
                    <div className="font-medium text-sm">{t("product.maintenance_included")}</div>
                    <div className="text-xs text-gray-500">{t("product.free_repairs")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("product.specifications")}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Selected Configuration */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Configuration sélectionnée</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processeur:</span>
                    <span className="font-medium">{configuration.processor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mémoire:</span>
                    <span className="font-medium">{configuration.memory.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stockage:</span>
                    <span className="font-medium">{configuration.storage.name}</span>
                  </div>
                  {configuration.graphics && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carte graphique:</span>
                      <span className="font-medium">{configuration.graphics.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Spécifications techniques</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-ekwip text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("product.interested_title")}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{t("product.interested_description")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-ekwip hover:bg-gray-100">
              {t("product.request_quote")}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent">
              {t("product.talk_to_expert")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

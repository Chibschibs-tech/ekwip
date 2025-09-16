"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Truck, Shield, Headphones, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getProductBySlug, getProductsByCategory, formatPrice, type ProductVariant } from "@/lib/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedProcessor, setSelectedProcessor] = useState<ProductVariant | null>(null)
  const [selectedMemory, setSelectedMemory] = useState<ProductVariant | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<ProductVariant | null>(null)

  if (!product) {
    notFound()
  }

  // Initialize with first options if configurations exist
  if (product.configurations && !selectedProcessor) {
    setSelectedProcessor(product.configurations.processor[0])
    setSelectedMemory(product.configurations.memory[0])
    setSelectedStorage(product.configurations.storage[0])
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const selectedImage = product.images?.[selectedImageIndex] || product.image

  // Calculate total price based on selected configurations
  const calculateTotalPrice = () => {
    let totalPrice = product.basePrice
    if (selectedProcessor) totalPrice += selectedProcessor.price
    if (selectedMemory) totalPrice += selectedMemory.price
    if (selectedStorage) totalPrice += selectedStorage.price
    return totalPrice
  }

  const calculateFirstMonthPrice = () => {
    if (!product.baseFirstMonthPrice) return null
    let totalPrice = product.baseFirstMonthPrice
    if (selectedProcessor) totalPrice += selectedProcessor.price * 0.1 // 10% of upgrade price for first month
    if (selectedMemory) totalPrice += selectedMemory.price * 0.1
    if (selectedStorage) totalPrice += selectedStorage.price * 0.1
    return Math.round(totalPrice)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/catalogue" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
        </div>

        {/* Product badges */}
        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            {product.category}
          </Badge>
          {product.featured && <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Populaire</Badge>}
          {product.new && <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Nouveau</Badge>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? "border-blue-600" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.shortDescription}</p>
            </div>

            {/* Configuration Options */}
            {product.configurations && (
              <div className="space-y-6">
                {/* Processor Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Processeur</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {product.configurations.processor.map((processor) => (
                      <button
                        key={processor.id}
                        onClick={() => setSelectedProcessor(processor)}
                        className={`p-3 border-2 rounded-lg text-left transition-colors ${
                          selectedProcessor?.id === processor.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{processor.name}</span>
                          {processor.price > 0 && (
                            <span className="text-sm text-gray-600">+{formatPrice(processor.price)} DH</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Memory Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mémoire</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.configurations.memory.map((memory) => (
                      <button
                        key={memory.id}
                        onClick={() => setSelectedMemory(memory)}
                        className={`p-3 border-2 rounded-lg text-center transition-colors ${
                          selectedMemory?.id === memory.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium">{memory.name}</div>
                        {memory.price > 0 && (
                          <div className="text-sm text-gray-600">+{formatPrice(memory.price)} DH</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Stockage</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {product.configurations.storage.map((storage) => (
                      <button
                        key={storage.id}
                        onClick={() => setSelectedStorage(storage)}
                        className={`p-3 border-2 rounded-lg text-left transition-colors ${
                          selectedStorage?.id === storage.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{storage.name}</span>
                          {storage.price > 0 && (
                            <span className="text-sm text-gray-600">+{formatPrice(storage.price)} DH</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(calculateTotalPrice())} DH</span>
                <span className="text-lg text-gray-600">/mois</span>
                {product.rentalDuration && (
                  <span className="text-lg text-gray-600">({product.rentalDuration} mois)</span>
                )}
              </div>
              {calculateFirstMonthPrice() && (
                <p className="text-lg text-gray-600">{formatPrice(calculateFirstMonthPrice()!)} DH Le 1er mois</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Location longue durée</span>
                <span>•</span>
                <span>Maintenance incluse</span>
                <span>•</span>
                <span>Assurance comprise</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full bg-[#334e68] hover:bg-[#2a3f5f] text-white">
                Demander un devis
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-[#334e68] text-[#334e68] hover:bg-[#334e68] hover:text-white bg-transparent"
              >
                Ajouter à ma liste de besoins
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Garantie incluse</p>
                  <p className="text-sm text-gray-600">3 ans</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Livraison</p>
                  <p className="text-sm text-gray-600">24-48h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Support</p>
                  <p className="text-sm text-gray-600">7/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Maintenance</p>
                  <p className="text-sm text-gray-600">Incluse</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Specifications */}
        {product.specifications && (
          <div className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Spécifications techniques</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Show selected configuration specs */}
                  {selectedProcessor && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Processeur</span>
                      <span className="text-gray-600">{selectedProcessor.name}</span>
                    </div>
                  )}
                  {selectedMemory && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Mémoire</span>
                      <span className="text-gray-600">{selectedMemory.name}</span>
                    </div>
                  )}
                  {selectedStorage && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Stockage</span>
                      <span className="text-gray-600">{selectedStorage.name}</span>
                    </div>
                  )}
                  {/* Show other specifications */}
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/catalogue/product/${relatedProduct.slug}`}>
                  <Card className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                        <img
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{relatedProduct.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">
                              À partir de {formatPrice(relatedProduct.basePrice)} DH
                            </span>
                            <span className="text-sm text-gray-600">/mois</span>
                            {relatedProduct.rentalDuration && (
                              <span className="text-sm text-gray-600"> ({relatedProduct.rentalDuration} mois)</span>
                            )}
                          </div>
                          <Button size="sm" className="bg-[#334e68] hover:bg-[#2a3f5f] text-white">
                            Voir détails
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

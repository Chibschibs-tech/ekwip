"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Truck, Headphones, Wrench } from "lucide-react"
import { getProductBySlug, getRelatedProducts } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { notFound } from "next/navigation"
import type { Product } from "@/lib/products"
import type { Attribute } from "@/types/admin"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | undefined>()
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string>("")
  const [selectedConfiguration, setSelectedConfiguration] = useState<string>("")

  useEffect(() => {
    const prod = getProductBySlug(params.slug)
    if (!prod) {
      notFound()
    }
    setProduct(prod)

    const related = getRelatedProducts(prod.id)
    setRelatedProducts(related)

    // Charger les attributs depuis localStorage
    try {
      const stored = localStorage.getItem("ekwip_admin_attributes")
      if (stored) {
        const allAttributes = JSON.parse(stored)
        setAttributes(allAttributes)
      }
    } catch (error) {
      console.error("Error loading attributes:", error)
    }
  }, [params.slug])

  if (!product) {
    return <div>Chargement...</div>
  }

  const images = product.images || [product.image]

  const handleAddToCart = () => {
    let finalPrice = product.price
    let variantName = ""

    if (product.configurations && selectedConfiguration) {
      const config = product.configurations.find((c) => c.id === selectedConfiguration)
      if (config) {
        finalPrice = config.price
        variantName = config.name
      }
    } else if (product.variants && selectedVariant) {
      const variant = product.variants.find((v) => v.id === selectedVariant)
      if (variant) {
        finalPrice = variant.price
        variantName = variant.name
      }
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      variant: variantName,
    })
  }

  const getCurrentPrice = () => {
    if (product.configurations && selectedConfiguration) {
      const config = product.configurations.find((c) => c.id === selectedConfiguration)
      return config ? config.price : product.price
    }
    if (product.variants && selectedVariant) {
      const variant = product.variants.find((v) => v.id === selectedVariant)
      return variant ? variant.price : product.price
    }
    return product.price
  }

  const getFirstMonthPrice = () => {
    if (product.configurations && selectedConfiguration) {
      const config = product.configurations.find((c) => c.id === selectedConfiguration)
      return config ? config.firstMonthPrice : null
    }
    return null
  }

  // Fonction pour obtenir le nom d'un attribut
  const getAttributeName = (attributeId: string): string => {
    const attribute = attributes.find((attr) => attr.id === attributeId)
    return attribute?.name || attributeId
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1f3b57]">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-[#1f3b57]">
              Catalogue
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <Link
          href="/catalogue"
          className="inline-flex items-center text-[#1f3b57] hover:text-[#1f3b57]/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain p-8"
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-[#1f3b57]" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.isNew && <Badge className="bg-green-100 text-green-800">Nouveau</Badge>}
                {product.isPopular && <Badge className="bg-blue-100 text-blue-800">Populaire</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Configurations for Dell Precision */}
            {product.configurations && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Choisissez votre configuration</h3>
                <div className="grid gap-4">
                  {product.configurations.map((config) => (
                    <div
                      key={config.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedConfiguration === config.id
                          ? "border-[#1f3b57] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedConfiguration(config.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{config.name}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#1f3b57]">{config.price} MAD/mois</div>
                          <div className="text-sm text-gray-500">({config.firstMonthPrice} MAD le premier mois)</div>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>• {config.processor}</div>
                        <div>• {config.memory}</div>
                        <div>• {config.storage}</div>
                        <div>• {config.graphics}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-[#1f3b57]">{getCurrentPrice()} MAD</span>
                <span className="text-gray-600">par mois</span>
              </div>
              {getFirstMonthPrice() && (
                <div className="text-sm text-gray-600">
                  Premier mois : <span className="font-semibold">{getFirstMonthPrice()} MAD</span>
                </div>
              )}
              <div className="text-sm text-gray-500 mt-2">Prix indicatif - Devis détaillé sur demande</div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90"
                disabled={
                  !product.inStock ||
                  (product.configurations && !selectedConfiguration) ||
                  (product.variants && !selectedVariant)
                }
              >
                {product.inStock ? "Ajouter à ma liste de besoins" : "Produit indisponible"}
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Demander un devis
                </Button>
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Parler à un expert
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#1f3b57]" />
                <span className="text-sm">Assurance incluse</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-[#1f3b57]" />
                <span className="text-sm">Livraison gratuite</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-[#1f3b57]" />
                <span className="text-sm">Maintenance incluse</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-[#1f3b57]" />
                <span className="text-sm">Support 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Spécifications techniques</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{getAttributeName(key)}</span>
                      <span className="text-gray-900">{value}</span>
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
            <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#1f3b57]">{relatedProduct.price} MAD/mois</span>
                      <Link href={`/catalogue/product/${relatedProduct.slug}`}>
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

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#1f3b57] to-[#2d5a7b] text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Intéressé par ce produit ?</h2>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Contactez nos experts pour obtenir un devis personnalisé et découvrir nos offres de location flexibles.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#1f3b57] hover:bg-gray-100">
                  Demander un devis
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Parler à un expert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

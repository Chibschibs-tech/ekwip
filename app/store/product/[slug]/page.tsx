"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { fetchProductBySlug, fetchRelatedProducts, formatPrice, type WordPressProduct } from "@/lib/wordpress-api"
import { Heart, ShoppingCart, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [product, setProduct] = useState<WordPressProduct | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<WordPressProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true)
      try {
        const productData = await fetchProductBySlug(params.slug)
        setProduct(productData)

        if (productData) {
          const related = await fetchRelatedProducts(productData.id, 4)
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [params.slug])

  const incrementQuantity = () => {
    if (product && quantity < (product.stock_quantity || 0)) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-6 w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="h-[400px] w-full rounded-2xl" />

          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />

            <div className="space-y-4 pt-4">
              <Skeleton className="h-10 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Product not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link href="/store">
          <Button>Retour à la boutique</Button>
        </Link>
      </div>
    )
  }

  const formattedPrice = formatPrice(product.price)
  const formattedSalePrice = product.sale_price ? formatPrice(product.sale_price) : null
  const discountPercentage = product.sale_price
    ? Math.round(
        ((Number.parseFloat(product.regular_price) - Number.parseFloat(product.sale_price)) /
          Number.parseFloat(product.regular_price)) *
          100,
      )
    : 0

  // Extract specifications from product attributes
  const specifications: Record<string, string> = {}
  product.attributes.forEach((attr) => {
    if (attr.options.length > 0) {
      specifications[attr.name] = attr.options[0]
    }
  })

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                Accueil
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Link href="/store" className="ml-1 text-sm text-gray-500 hover:text-gray-700">
                  Boutique
                </Link>
              </div>
            </li>
            {product.categories.length > 0 && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <Link
                    href={`/store?category=${product.categories[0].id}`}
                    className="ml-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {product.categories[0].name}
                  </Link>
                </div>
              </li>
            )}
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-700">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
          <Image
            src={product.images[0]?.src || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="max-h-[400px] w-auto object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: product.short_description }} />

            <div className="flex items-center gap-4 mb-6">
              {formattedSalePrice ? (
                <>
                  <span className="text-3xl font-bold text-gray-800">{formattedSalePrice}</span>
                  <span className="text-xl text-gray-500 line-through">{formattedPrice}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                    -{discountPercentage}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-800">{formattedPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div
                className={`h-3 w-3 rounded-full ${product.stock_status === "instock" ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span className={`text-sm ${product.stock_status === "instock" ? "text-green-600" : "text-red-600"}`}>
                {product.stock_status === "instock"
                  ? `En stock ${product.stock_quantity ? `(${product.stock_quantity} disponibles)` : ""}`
                  : "Rupture de stock"}
              </span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mb-8">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantité
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-10 h-10 rounded-l-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={product.stock_quantity || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  className="w-10 h-10 rounded-r-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  onClick={incrementQuantity}
                  disabled={product.stock_quantity ? quantity >= product.stock_quantity : true}
                >
                  +
                </button>
              </div>

              <Button className="flex-1 gap-2" size="lg" disabled={product.stock_status !== "instock"}>
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isFavorite ? "text-red-500 border-red-200 bg-red-50" : ""}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>

          {/* Shipping and Returns */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-ekwip mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-800">Livraison gratuite</h3>
                <p className="text-sm text-gray-600">Pour les commandes supérieures à 1000 Dhs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-ekwip mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-800">Garantie 2 ans</h3>
                <p className="text-sm text-gray-600">Tous nos produits sont garantis 2 ans</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-ekwip mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-800">Retours sous 14 jours</h3>
                <p className="text-sm text-gray-600">
                  Retournez votre produit dans les 14 jours si vous n'êtes pas satisfait
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-ekwip data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-ekwip data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
            >
              Spécifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <table className="w-full">
                <tbody>
                  {Object.entries(specifications).map(([key, value]) => (
                    <tr key={key} className="border-b last:border-b-0">
                      <td className="py-3 text-gray-600 font-medium w-1/3">{key}</td>
                      <td className="py-3 text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/store/product/${relatedProduct.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 p-4 flex items-center justify-center h-40">
                    <Image
                      src={relatedProduct.images[0]?.src || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={100}
                      height={100}
                      className="max-h-32 w-auto object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{relatedProduct.name}</h3>
                    <div
                      className="text-sm text-gray-600 mb-2 line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: relatedProduct.short_description }}
                    />
                    <p className="font-bold text-gray-800">
                      {relatedProduct.sale_price
                        ? formatPrice(relatedProduct.sale_price)
                        : formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

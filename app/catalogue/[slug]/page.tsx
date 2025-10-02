"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products"
import { ArrowLeft, Package, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [category, setCategory] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const loadData = () => {
      const cat = getCategoryBySlug(slug)
      setCategory(cat)

      if (cat) {
        const prods = getProductsByCategory(slug)
        setProducts(prods)
      }
    }

    loadData()

    const handleStorageChange = () => {
      loadData()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [slug])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      quantity: 1,
    })

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre liste de besoins.`,
    })
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Catégorie non trouvée</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Cette catégorie n'existe pas ou a été supprimée.</p>
              <Link href="/catalogue">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au catalogue
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Fil d'Ariane */}
        <div className="mb-8">
          <Link
            href="/catalogue"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au catalogue
          </Link>
        </div>

        {/* En-tête de la catégorie */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">{category.description}</p>
          )}
          <div className="mt-4">
            <Badge variant="secondary" className="text-base px-4 py-2">
              {products.length} {products.length === 1 ? "produit" : "produits"}
            </Badge>
          </div>
        </div>

        {/* Liste des produits */}
        {products.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun produit disponible</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Il n'y a actuellement aucun produit dans cette catégorie.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all">
                <CardHeader className="p-0">
                  <Link href={`/catalogue/product/${product.slug}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Rupture de stock</Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-4">
                  <Link href={`/catalogue/product/${product.slug}`}>
                    <CardTitle className="mb-2 group-hover:text-blue-600 transition-colors">{product.name}</CardTitle>
                  </Link>
                  {product.description && (
                    <CardDescription className="mb-4 line-clamp-2">{product.description}</CardDescription>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{product.price.toFixed(2)} MAD</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">par {product.rentalPeriod || "mois"}</p>
                    </div>
                    <Button onClick={() => handleAddToCart(product)} disabled={product.stock === 0} size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                  {product.brand && (
                    <div className="mt-4">
                      <Badge variant="outline">{product.brand}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

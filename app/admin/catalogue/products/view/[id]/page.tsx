"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Package, DollarSign, Calendar, Tag, ShoppingCart, Boxes } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types/admin"

export default function ViewProductPage() {
  const params = useParams()
  const router = useRouter()
  const { products, deleteProduct } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id)
    setProduct(foundProduct || null)
  }, [params.id, products])

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(params.id as string)
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès.",
      })
      router.push("/admin/catalogue/products")
    }
  }

  // Get category name
  const getCategoryName = (categoryId: string | undefined) => {
    if (!categoryId) return "Aucune catégorie"
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || "Catégorie inconnue"
  }

  // Get brand name
  const getBrandName = (brandId: string | undefined) => {
    if (!brandId) return "Non spécifiée"
    const brand = brands.find((b) => b.id === brandId)
    return brand?.name || "Marque inconnue"
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Produit non trouvé</h3>
            <p className="text-gray-600 mb-4">Ce produit n'existe pas ou a été supprimé.</p>
            <Link href="/admin/catalogue/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la liste
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isSaleProduct = product.productType === "sale"
  const isRentalProduct = product.productType === "rent"

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/catalogue/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              {isSaleProduct ? (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Vente
                </Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  <Package className="h-3 w-3 mr-1" />
                  Location
                </Badge>
              )}
            </div>
            <p className="text-gray-600">SKU: {product.sku}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/catalogue/products/edit/${product.id}`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
            </CardHeader>
            <CardContent>
              {product.images && product.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.images.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Aucune image disponible</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {product.description || "Aucune description disponible"}
              </p>
              {product.shortDescription && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-1">Description courte:</p>
                  <p className="text-gray-600">{product.shortDescription}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Attributs */}
          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Caractéristiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(product.attributes).map(([key, value], index) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <span className="font-medium capitalize">{key.replace(/_/g, " ")}</span>
                      <span className="text-gray-600">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Informations principales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Prix */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <DollarSign className="h-4 w-4" />
                  {isSaleProduct ? "Prix de vente (HT)" : "Prix de location"}
                </div>
                {(() => {
                  const priceTTC = Math.ceil((product.price || 0) * 1.2)
                  const priceHT = Math.round(priceTTC / 1.2)
                  return (
                    <>
                      <p className="text-2xl font-bold text-[#1f3b57]">
                        {new Intl.NumberFormat("fr-FR").format(priceHT)} Dh
                      </p>
                      {isSaleProduct && (
                        <p className="text-sm text-gray-500">
                          TTC: {new Intl.NumberFormat("fr-FR").format(priceTTC)} Dh
                        </p>
                      )}
                    </>
                  )
                })()}
                {isRentalProduct && (
                  <p className="text-sm text-gray-500">par mois</p>
                )}
              </div>

              {/* Prix de revient */}
              {product.costPrice && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <DollarSign className="h-4 w-4" />
                      Prix de revient (HT)
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                      {new Intl.NumberFormat("fr-FR").format(Math.round(product.costPrice))} Dh
                    </p>
                    {product.price && product.costPrice && (
                      <p className="text-sm text-green-600">
                        Marge: {((product.price - product.costPrice) / product.costPrice * 100).toFixed(1)}%
                      </p>
                    )}
                  </div>
                </>
              )}

              <Separator />

              {/* Stock */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Boxes className="h-4 w-4" />
                  Stock disponible
                </div>
                <p className="text-xl font-semibold">{product.stockQuantity} unités</p>
                <Badge 
                  variant={product.stockQuantity > (product.lowStockThreshold || 5) ? "default" : "destructive"} 
                  className="mt-2"
                >
                  {product.stockQuantity > 0 ? 
                    (product.stockQuantity <= (product.lowStockThreshold || 5) ? "Stock bas" : "En stock") 
                    : "Rupture de stock"}
                </Badge>
              </div>

              <Separator />

              {/* Marque */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Tag className="h-4 w-4" />
                  Marque
                </div>
                <p className="font-medium">{getBrandName(product.brandId)}</p>
              </div>

              <Separator />

              {/* Catégorie */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  Catégorie
                </div>
                <Badge variant="outline">{getCategoryName(product.categoryId)}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Statut */}
          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Statut</span>
                {product.status === "active" && <Badge className="bg-green-600">Actif</Badge>}
                {product.status === "draft" && <Badge variant="secondary">Brouillon</Badge>}
                {product.status === "archived" && <Badge variant="outline">Archivé</Badge>}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">En vedette</span>
                <Badge variant={product.isFeatured ? "default" : "secondary"}>
                  {product.isFeatured ? "Oui" : "Non"}
                </Badge>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500">Créé le</p>
                <p className="text-sm font-medium">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dernière modification</p>
                <p className="text-sm font-medium">
                  {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

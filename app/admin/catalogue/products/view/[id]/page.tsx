"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { useAttributes } from "@/contexts/attributes-context"
import { useToast } from "@/hooks/use-toast"
import { notFound } from "next/navigation"

export default function ViewProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getProduct, deleteProduct } = useProducts()
  const { getCategory } = useCategories()
  const { getBrand } = useBrands()
  const { getAttribute } = useAttributes()
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = useState(0)

  const product = getProduct(params.id)

  if (!product) {
    notFound()
  }

  const category = product.categoryId ? getCategory(product.categoryId) : null
  const brand = product.brandId ? getBrand(product.brandId) : null

  const handleDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ?`)) {
      deleteProduct(product.id)
      toast({
        title: "Produit supprimé",
        description: `Le produit ${product.name} a été supprimé`,
      })
      router.push("/admin/catalogue/products")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/admin/catalogue/products/edit/${product.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage] || product.thumbnail || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-blue-600" : "border-gray-200"
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
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        product.status === "active" ? "default" : product.status === "draft" ? "secondary" : "outline"
                      }
                    >
                      {product.status === "active" ? "Actif" : product.status === "draft" ? "Brouillon" : "Archivé"}
                    </Badge>
                    {product.isFeatured && <Badge className="bg-yellow-500">En vedette</Badge>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">SKU</p>
                <p className="font-mono">{product.sku}</p>
              </div>

              {product.shortDescription && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Description courte</p>
                  <p>{product.shortDescription}</p>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Catégorie</p>
                  <p className="font-medium">{category?.name || "Non défini"}</p>
                </div>
                {brand && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Marque</p>
                    <p className="font-medium">{brand.name}</p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Prix</p>
                  <p className="text-2xl font-bold text-blue-600">{product.price} DH/mois</p>
                </div>
                {product.compareAtPrice && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Prix barré</p>
                    <p className="text-lg line-through text-gray-500">{product.compareAtPrice} DH</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Prix de revient</p>
                  <p className="font-medium">{product.costPrice} DH</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stock disponible</p>
                  <p
                    className={`text-xl font-bold ${
                      product.stockQuantity <= product.lowStockThreshold ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.stockQuantity} unités
                  </p>
                  {product.stockQuantity <= product.lowStockThreshold && (
                    <p className="text-xs text-red-600">Stock bas</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Seuil de stock bas</p>
                  <p className="font-medium">{product.lowStockThreshold} unités</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {product.tags && product.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {product.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description complète</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{product.description}</p>
          </CardContent>
        </Card>
      )}

      {product.attributes && Object.keys(product.attributes).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Attributs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(product.attributes).map(([attrId, value]) => {
                const attribute = getAttribute(attrId)
                return (
                  <div key={attrId} className="border rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{attribute?.name || attrId}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Date de création</p>
              <p>{new Date(product.createdAt).toLocaleString("fr-FR")}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Dernière modification</p>
              <p>{new Date(product.updatedAt).toLocaleString("fr-FR")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

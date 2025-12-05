"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useProducts } from "@/contexts/products-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Package, DollarSign, Calendar, Tag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ViewProductPage() {
  const params = useParams()
  const router = useRouter()
  const { products, deleteProduct } = useProducts()
  const { toast } = useToast()
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id)
    setProduct(foundProduct)
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
            <h1 className="text-3xl font-bold">{product.name}</h1>
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
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">Aucune image disponible</div>
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
            </CardContent>
          </Card>

          {/* Spécifications */}
          {product.specifications && product.specifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Spécifications techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <span className="font-medium">{spec.key}</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
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
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <DollarSign className="h-4 w-4" />
                  Prix de location
                </div>
                <p className="text-2xl font-bold text-blue-600">{product.price.toFixed(2)} MAD</p>
                <p className="text-sm text-gray-500">par {product.rentalPeriod || "mois"}</p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Package className="h-4 w-4" />
                  Stock disponible
                </div>
                <p className="text-xl font-semibold">{product.stock} unités</p>
                <Badge variant={product.stock > 0 ? "default" : "destructive"} className="mt-2">
                  {product.stock > 0 ? "En stock" : "Rupture de stock"}
                </Badge>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Tag className="h-4 w-4" />
                  Marque
                </div>
                <p className="font-medium">{product.brand || "Non spécifiée"}</p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  Catégories
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.categories && product.categories.length > 0 ? (
                    product.categories.map((cat: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {cat}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Aucune catégorie</span>
                  )}
                </div>
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
                <span className="text-sm text-gray-600">Publié</span>
                <Badge variant={product.status === "published" ? "default" : "secondary"}>
                  {product.status === "published" ? "Oui" : "Non"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">En vedette</span>
                <Badge variant={product.featured ? "default" : "secondary"}>{product.featured ? "Oui" : "Non"}</Badge>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500">Créé le</p>
                <p className="text-sm font-medium">
                  {new Date(product.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dernière modification</p>
                <p className="text-sm font-medium">
                  {new Date(product.updatedAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockCategories, mockBrands, mockAttributes } from "@/lib/mock-data"
import { Upload, X, Loader2 } from "lucide-react"
import type { Attribute, Product } from "@/types/admin"
import { useProducts } from "@/contexts/products-context"
import { useToast } from "@/hooks/use-toast"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getProduct, updateProduct } = useProducts()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>([])
  const [productAttributes, setProductAttributes] = useState<Record<string, string>>({})
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  // Charger les données du produit
  useEffect(() => {
    const loadProduct = () => {
      try {
        const foundProduct = getProduct(params.id)

        if (foundProduct) {
          setProduct(foundProduct)
          setSelectedCategory(foundProduct.categoryId)
          setProductAttributes(foundProduct.attributes || {})
          setImagePreviews(foundProduct.images || [])
        } else {
          toast({
            title: "Erreur",
            description: "Produit non trouvé",
            variant: "destructive",
          })
          router.push("/admin/catalogue/products")
        }
      } catch (error) {
        console.error("Error loading product:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger le produit",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params.id, getProduct, router, toast])

  // Filtrer les attributs disponibles quand la catégorie change
  useEffect(() => {
    if (selectedCategory) {
      const filteredAttributes = mockAttributes.filter(
        (attr) => attr.categories && attr.categories.includes(selectedCategory),
      )
      setAvailableAttributes(filteredAttributes)
    } else {
      setAvailableAttributes([])
    }
  }, [selectedCategory])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newImagePreviews = filesArray.map((file) => URL.createObjectURL(file))

      setImageFiles([...imageFiles, ...filesArray])
      setImagePreviews([...imagePreviews, ...newImagePreviews])
    }
  }

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews]
    const existingImagesCount = product?.images.length || 0

    // Si c'est un fichier nouvellement uploadé, libère l'URL d'objet
    if (index >= existingImagesCount) {
      URL.revokeObjectURL(newPreviews[index])
      const newFiles = [...imageFiles]
      newFiles.splice(index - existingImagesCount, 1)
      setImageFiles(newFiles)
    }

    newPreviews.splice(index, 1)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!product) return

    setIsSubmitting(true)

    // Validation
    if (!product.name || !product.sku || !product.price || !product.categoryId) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Validation des attributs obligatoires
    const missingRequiredAttributes = availableAttributes.filter(
      (attr) => attr.isRequired && !productAttributes[attr.id],
    )

    if (missingRequiredAttributes.length > 0) {
      toast({
        title: "Attributs obligatoires manquants",
        description: `Veuillez remplir : ${missingRequiredAttributes.map((a) => a.name).join(", ")}`,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Mettre à jour le produit
      const updatedProductData = {
        ...product,
        attributes: productAttributes,
        images: imagePreviews,
        thumbnail: imagePreviews[0] || product.thumbnail,
        updatedAt: new Date().toISOString(),
      }

      updateProduct(params.id, updatedProductData)

      toast({
        title: "Produit mis à jour",
        description: `Le produit ${product.name} a été mis à jour avec succès`,
      })

      // Attendre un peu pour que l'utilisateur voie le toast
      await new Promise((resolve) => setTimeout(resolve, 500))

      router.push("/admin/catalogue/products")
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le produit",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateProductField = (field: string, value: any) => {
    if (product) {
      setProduct({ ...product, [field]: value })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Chargement du produit...</span>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-red-600">Produit non trouvé</h2>
        <p className="mt-2">Ce produit n'existe pas ou a été supprimé.</p>
        <Button className="mt-4" onClick={() => router.push("/admin/catalogue/products")}>
          Retour à la liste
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modifier un produit</h1>
          <p className="text-gray-600 dark:text-gray-400">
            #{product.sku} - {product.name}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="pricing">Prix & Stock</TabsTrigger>
            <TabsTrigger value="attributes">Attributs</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Onglet Général */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nom du produit <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={product.name}
                    onChange={(e) => updateProductField("name", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">
                      SKU <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sku"
                      value={product.sku}
                      onChange={(e) => updateProductField("sku", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={product.slug}
                      onChange={(e) => updateProductField("slug", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Description courte</Label>
                  <Textarea
                    id="shortDescription"
                    value={product.shortDescription}
                    onChange={(e) => updateProductField("shortDescription", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description complète</Label>
                  <Textarea
                    id="description"
                    value={product.description}
                    onChange={(e) => updateProductField("description", e.target.value)}
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Catégorie <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={product.categoryId}
                    onValueChange={(value) => {
                      updateProductField("categoryId", value)
                      setSelectedCategory(value)
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marque</Label>
                  <Select value={product.brandId} onValueChange={(value) => updateProductField("brandId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une marque" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBrands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    value={product.tags.join(", ")}
                    onChange={(e) =>
                      updateProductField(
                        "tags",
                        e.target.value.split(",").map((t) => t.trim()),
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={product.status} onValueChange={(value) => updateProductField("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="archived">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Produit en vedette</Label>
                  <Switch
                    id="featured"
                    checked={product.isFeatured}
                    onCheckedChange={(checked) => updateProductField("isFeatured", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Prix et Stock */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prix</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Prix de location (DH/mois) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.price}
                      onChange={(e) => updateProductField("price", Number(e.target.value))}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">Prix barré</Label>
                    <Input
                      id="compareAtPrice"
                      type="number"
                      value={product.compareAtPrice || ""}
                      onChange={(e) =>
                        updateProductField("compareAtPrice", e.target.value ? Number(e.target.value) : undefined)
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Prix de revient</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      value={product.costPrice}
                      onChange={(e) => updateProductField("costPrice", Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock">
                      Stock disponible <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={product.stockQuantity}
                      onChange={(e) => updateProductField("stockQuantity", Number(e.target.value))}
                      required
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStock">Seuil de stock bas</Label>
                    <Input
                      id="lowStock"
                      type="number"
                      value={product.lowStockThreshold}
                      onChange={(e) => updateProductField("lowStockThreshold", Number(e.target.value))}
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Attributs */}
          <TabsContent value="attributes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attributs du produit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableAttributes.length > 0 ? (
                  <div className="space-y-6">
                    {availableAttributes.map((attr) => (
                      <div key={attr.id} className="space-y-2">
                        <Label htmlFor={`attr-${attr.id}`}>
                          {attr.name} {attr.isRequired && <span className="text-red-500">*</span>}
                        </Label>

                        {attr.type === "select" ? (
                          <Select
                            value={productAttributes[attr.id] || ""}
                            onValueChange={(value) =>
                              setProductAttributes({
                                ...productAttributes,
                                [attr.id]: value,
                              })
                            }
                            required={attr.isRequired}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={`Sélectionner ${attr.name.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {attr.values.map((value) => (
                                <SelectItem key={`${attr.id}-${value}`} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : attr.type === "text" ? (
                          <Input
                            id={`attr-${attr.id}`}
                            placeholder={`Saisir ${attr.name.toLowerCase()}`}
                            value={productAttributes[attr.id] || ""}
                            onChange={(e) =>
                              setProductAttributes({
                                ...productAttributes,
                                [attr.id]: e.target.value,
                              })
                            }
                            required={attr.isRequired}
                          />
                        ) : attr.type === "number" ? (
                          <Input
                            id={`attr-${attr.id}`}
                            type="number"
                            placeholder={`Saisir ${attr.name.toLowerCase()}`}
                            value={productAttributes[attr.id] || ""}
                            onChange={(e) =>
                              setProductAttributes({
                                ...productAttributes,
                                [attr.id]: e.target.value,
                              })
                            }
                            required={attr.isRequired}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>Aucun attribut disponible pour cette catégorie.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Images */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Images du produit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Cliquez pour télécharger ou glissez-déposez
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      Ajouter des images
                    </Button>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3">Images du produit ({imagePreviews.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {imagePreviews.map((src, index) => (
                          <div key={index} className="relative rounded-md overflow-hidden border">
                            <img
                              src={src || "/placeholder.svg"}
                              alt={`Product ${index}`}
                              className="h-24 w-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            {index === 0 && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1">
                                Image principale
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet SEO */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimisation pour les moteurs de recherche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Titre méta</Label>
                  <Input id="meta-title" placeholder="Titre pour les moteurs de recherche" />
                  <p className="text-sm text-gray-500">Si vide, le nom du produit sera utilisé</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-description">Description méta</Label>
                  <Textarea id="meta-description" placeholder="Description pour les moteurs de recherche" rows={3} />
                  <p className="text-sm text-gray-500">Si vide, la description courte sera utilisée</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </div>
  )
}

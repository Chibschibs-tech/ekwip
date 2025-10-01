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
import { mockCategories, mockBrands, mockAttributes, mockProducts } from "@/lib/mock-data"
import { Upload, X, Loader2 } from "lucide-react"
import type { Attribute, Product } from "@/types/admin"
import { useToast } from "@/hooks/use-toast"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
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
    const fetchProduct = async () => {
      try {
        // Dans une implémentation réelle, ceci serait un appel API
        const foundProduct = mockProducts.find((p) => p.id === params.id)

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
        console.error("Error fetching product:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du produit",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  // Filtrer les attributs disponibles quand la catégorie change
  useEffect(() => {
    if (selectedCategory) {
      // Filtre les attributs qui s'appliquent à la catégorie sélectionnée
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

    // Si c'est un fichier local, libère l'URL d'objet
    if (index >= (product?.images.length || 0)) {
      URL.revokeObjectURL(newPreviews[index])
    }

    newPreviews.splice(index, 1)
    setImagePreviews(newPreviews)

    // Mettre également à jour les fichiers uploadés
    if (index >= (product?.images.length || 0)) {
      const newFiles = [...imageFiles]
      newFiles.splice(index - (product?.images.length || 0), 1)
      setImageFiles(newFiles)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!product) return

    setIsSubmitting(true)

    // Validation des champs obligatoires
    if (!product.name || !product.sku || !product.price || !product.stockQuantity || !product.categoryId) {
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
        description: `Veuillez remplir les attributs obligatoires : ${missingRequiredAttributes.map((a) => a.name).join(", ")}`,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // TODO: Implement actual product update with API
      // Simulation d'envoi à l'API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mise à jour du produit avec les nouveaux attributs
      const updatedProduct = {
        ...product,
        attributes: productAttributes,
      }

      toast({
        title: "Produit mis à jour",
        description: `Le produit ${product.name} a été mis à jour avec succès.`,
      })

      router.push("/admin/catalogue/products")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le produit",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateProduct = (field: string, value: any) => {
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
          <p className="text-gray-600">
            #{product.sku} - {product.name}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="pricing">Prix & Stock</TabsTrigger>
            <TabsTrigger value="attributes">Attributs</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Onglet Informations Générales */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={product.name}
                    onChange={(e) => updateProduct("name", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={product.sku}
                      onChange={(e) => updateProduct("sku", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" value={product.slug} onChange={(e) => updateProduct("slug", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Description courte</Label>
                  <Textarea
                    id="shortDescription"
                    value={product.shortDescription}
                    onChange={(e) => updateProduct("shortDescription", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description complète</Label>
                  <Textarea
                    id="description"
                    value={product.description}
                    onChange={(e) => updateProduct("description", e.target.value)}
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
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={product.categoryId}
                    onValueChange={(value) => {
                      updateProduct("categoryId", value)
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
                  <Select value={product.brandId} onValueChange={(value) => updateProduct("brandId", value)}>
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
                      updateProduct(
                        "tags",
                        e.target.value.split(",").map((t) => t.trim()),
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={product.status} onValueChange={(value) => updateProduct("status", value)}>
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
                    onCheckedChange={(checked) => updateProduct("isFeatured", checked)}
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
                    <Label htmlFor="price">Prix de location (DH/mois) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.price}
                      onChange={(e) => updateProduct("price", Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">Prix barré</Label>
                    <Input
                      id="compareAtPrice"
                      type="number"
                      value={product.compareAtPrice || ""}
                      onChange={(e) =>
                        updateProduct("compareAtPrice", e.target.value ? Number(e.target.value) : undefined)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Prix de revient</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      value={product.costPrice}
                      onChange={(e) => updateProduct("costPrice", Number(e.target.value))}
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
                    <Label htmlFor="stock">Stock disponible *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={product.stockQuantity}
                      onChange={(e) => updateProduct("stockQuantity", Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStock">Seuil de stock bas</Label>
                    <Input
                      id="lowStock"
                      type="number"
                      value={product.lowStockThreshold}
                      onChange={(e) => updateProduct("lowStockThreshold", Number(e.target.value))}
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
                <div className="flex items-center justify-between">
                  <CardTitle>Attributs du produit</CardTitle>
                </div>
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
                        ) : attr.type === "color" ? (
                          <div className="flex gap-2">
                            <Input
                              id={`attr-${attr.id}`}
                              type="color"
                              className="w-16 p-1 h-10"
                              value={productAttributes[attr.id] || "#000000"}
                              onChange={(e) =>
                                setProductAttributes({
                                  ...productAttributes,
                                  [attr.id]: e.target.value,
                                })
                              }
                              required={attr.isRequired}
                            />
                            <Input
                              placeholder="Code couleur"
                              value={productAttributes[attr.id] || ""}
                              onChange={(e) =>
                                setProductAttributes({
                                  ...productAttributes,
                                  [attr.id]: e.target.value,
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>Aucun attribut disponible pour cette catégorie.</p>
                    <Button
                      variant="link"
                      className="px-0"
                      type="button"
                      onClick={() => router.push("/admin/catalogue/attributs")}
                    >
                      Créer des attributs
                    </Button>
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
                    <p className="mt-2 text-sm text-gray-600">Cliquez pour télécharger ou glissez-déposez</p>
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

                  {/* Aperçu des images */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Images du produit ({imagePreviews.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {imagePreviews.map((src, index) => (
                          <div key={index} className="relative rounded-md overflow-hidden border">
                            <img
                              src={src || "/placeholder.svg"}
                              alt={`Product image ${index}`}
                              className="h-24 w-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 rounded-full"
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
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  )
}

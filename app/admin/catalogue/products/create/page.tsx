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
import { Upload, X } from "lucide-react"
import type { Attribute, Product } from "@/types/admin"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { useAttributes } from "@/contexts/attributes-context"
import { useToast } from "@/hooks/use-toast"

export default function CreateProductPage() {
  const router = useRouter()
  const { addProduct } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { getAttributesByCategory } = useAttributes()
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>([])
  const [productAttributes, setProductAttributes] = useState<Record<string, string>>({})
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    slug: "",
    shortDescription: "",
    description: "",
    categoryId: "",
    brandId: "",
    price: 0,
    compareAtPrice: 0,
    costPrice: 0,
    stockQuantity: 0,
    lowStockThreshold: 5,
    status: "active" as "active" | "draft" | "archived",
    isFeatured: false,
    tags: [] as string[],
  })

  useEffect(() => {
    if (selectedCategory) {
      const filteredAttributes = getAttributesByCategory(selectedCategory)
      setAvailableAttributes(filteredAttributes)
    } else {
      setAvailableAttributes([])
    }
  }, [selectedCategory, getAttributesByCategory])

  useEffect(() => {
    if (formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.name])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newImagePreviews = filesArray.map((file) => URL.createObjectURL(file))

      setImageFiles([...imageFiles, ...filesArray])
      setImagePreviews([...imagePreviews, ...newImagePreviews])
    }
  }

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles]
    const newPreviews = [...imagePreviews]

    URL.revokeObjectURL(newPreviews[index])

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setImageFiles(newFiles)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.name || !formData.sku || !formData.categoryId) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires (Nom, SKU, Catégorie)",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (formData.price <= 0) {
      toast({
        title: "Erreur de validation",
        description: "Le prix de location doit être supérieur à 0",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

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
      const productId = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      const newProduct: Product = {
        id: productId,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        sku: formData.sku,
        shortDescription: formData.shortDescription,
        description: formData.description,
        categoryId: formData.categoryId,
        brandId: formData.brandId || "",
        price: formData.price,
        compareAtPrice: formData.compareAtPrice || undefined,
        costPrice: formData.costPrice,
        thumbnail: imagePreviews[0] || "/placeholder.svg",
        images: imagePreviews.length > 0 ? imagePreviews : ["/placeholder.svg"],
        stockQuantity: formData.stockQuantity,
        lowStockThreshold: formData.lowStockThreshold,
        status: formData.status,
        isFeatured: formData.isFeatured,
        tags: formData.tags,
        attributes: productAttributes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      addProduct(newProduct)

      toast({
        title: "Produit créé",
        description: `Le produit ${formData.name} a été créé avec succès`,
      })

      await new Promise((resolve) => setTimeout(resolve, 500))

      router.push("/admin/catalogue/products")
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer le produit",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ajouter un produit</h1>
          <p className="text-gray-600 dark:text-gray-400">Créez un nouveau produit dans votre catalogue</p>
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
                    placeholder="Ex: MacBook Pro 14 pouces"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
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
                      placeholder="Ex: MBP-14-001"
                      value={formData.sku}
                      onChange={(e) => updateFormData("sku", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      placeholder="macbook-pro-14"
                      value={formData.slug}
                      onChange={(e) => updateFormData("slug", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Description courte</Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="Ordinateur portable professionnel"
                    value={formData.shortDescription}
                    onChange={(e) => updateFormData("shortDescription", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description complète</Label>
                  <Textarea
                    id="description"
                    placeholder="Description détaillée du produit..."
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
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
                    value={formData.categoryId}
                    onValueChange={(value) => {
                      updateFormData("categoryId", value)
                      setSelectedCategory(value)
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat.isActive)
                        .map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marque</Label>
                  <Select value={formData.brandId} onValueChange={(value) => updateFormData("brandId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une marque" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands
                        .filter((b) => b.isActive)
                        .map((brand) => (
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
                    placeholder="laptop, apple, pro"
                    value={formData.tags.join(", ")}
                    onChange={(e) =>
                      updateFormData(
                        "tags",
                        e.target.value.split(",").map((t) => t.trim()),
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={formData.status} onValueChange={(value: any) => updateFormData("status", value)}>
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
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => updateFormData("isFeatured", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                      placeholder="450"
                      value={formData.price || ""}
                      onChange={(e) => updateFormData("price", Number(e.target.value))}
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
                      placeholder="500"
                      value={formData.compareAtPrice || ""}
                      onChange={(e) =>
                        updateFormData("compareAtPrice", e.target.value ? Number(e.target.value) : undefined)
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
                      placeholder="350"
                      value={formData.costPrice || ""}
                      onChange={(e) => updateFormData("costPrice", Number(e.target.value))}
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
                      placeholder="15"
                      value={formData.stockQuantity || ""}
                      onChange={(e) => updateFormData("stockQuantity", Number(e.target.value))}
                      required
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStock">Seuil de stock bas</Label>
                    <Input
                      id="lowStock"
                      type="number"
                      placeholder="5"
                      value={formData.lowStockThreshold}
                      onChange={(e) => updateFormData("lowStockThreshold", Number(e.target.value))}
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attributs du produit</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCategory
                    ? "Remplissez les attributs spécifiques à la catégorie sélectionnée"
                    : "Sélectionnez d'abord une catégorie pour voir les attributs disponibles"}
                </p>
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
                    <p>
                      {selectedCategory
                        ? "Aucun attribut disponible pour cette catégorie."
                        : "Veuillez sélectionner une catégorie dans l'onglet Général."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

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
                      Sélectionner des images
                    </Button>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3">Images sélectionnées ({imagePreviews.length})</h4>
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
            {isSubmitting ? "Création en cours..." : "Créer le produit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

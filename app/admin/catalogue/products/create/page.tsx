"use client"

import Link from "next/link"
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
import { Upload, X } from "lucide-react"
import type { Attribute, Product } from "@/types/admin"
import { useToast } from "@/hooks/use-toast"
import { useProducts } from "@/contexts/products-context"

export default function CreateProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addProduct } = useProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>([])
  const [productAttributes, setProductAttributes] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    slug: "",
    shortDescription: "",
    description: "",
    price: "",
    compareAtPrice: "",
    costPrice: "",
    stock: "",
    lowStock: "5",
    categoryId: "",
    brandId: "",
    tags: "",
    status: "active",
    isFeatured: false,
  })
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  useEffect(() => {
    if (selectedCategory) {
      const filteredAttributes = mockAttributes.filter(
        (attr) => attr.categories && attr.categories.includes(selectedCategory),
      )
      setAvailableAttributes(filteredAttributes)

      const newProductAttributes: Record<string, string> = {}
      filteredAttributes.forEach((attr) => {
        if (productAttributes[attr.id]) {
          newProductAttributes[attr.id] = productAttributes[attr.id]
        }
      })
      setProductAttributes(newProductAttributes)
    } else {
      setAvailableAttributes([])
      setProductAttributes({})
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

    if (!formData.name || !formData.sku || !formData.price || !formData.stock || !formData.categoryId) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
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
        description: `Veuillez remplir les attributs obligatoires : ${missingRequiredAttributes.map((a) => a.name).join(", ")}`,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      sku: formData.sku,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      shortDescription: formData.shortDescription,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number.parseFloat(formData.compareAtPrice) : undefined,
      costPrice: formData.costPrice ? Number.parseFloat(formData.costPrice) : 0,
      categoryId: formData.categoryId,
      brandId: formData.brandId || "",
      thumbnail: imagePreviews[0] || "/placeholder.svg",
      images: imagePreviews.length > 0 ? imagePreviews : ["/placeholder.svg"],
      stockQuantity: Number.parseInt(formData.stock),
      lowStockThreshold: Number.parseInt(formData.lowStock),
      status: formData.status as "active" | "draft" | "archived",
      isFeatured: formData.isFeatured,
      tags: formData.tags ? formData.tags.split(",").map((tag) => tag.trim()) : [],
      attributes: productAttributes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addProduct(newProduct)

    toast({
      title: "Produit créé",
      description: `Le produit ${formData.name} a été créé avec succès.`,
    })

    setIsSubmitting(false)
    router.push("/admin/catalogue/products")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === "name" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
      setFormData({ ...formData, name: value, slug })
    }

    if (name === "name" && !formData.sku) {
      const sku = value.substring(0, 3).toUpperCase() + "-" + Date.now().toString().slice(-4)
      setFormData({ ...formData, name: value, sku })
    }
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
          <TabsList className="grid w-full grid-cols-5 mb-4">
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
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="MacBook Pro 14 pouces"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="MBP-14-001"
                      value={formData.sku}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      placeholder="macbook-pro-14"
                      value={formData.slug}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Description courte</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    placeholder="Ordinateur portable professionnel"
                    rows={2}
                    value={formData.shortDescription}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description complète</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description détaillée du produit..."
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
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
                    value={formData.categoryId}
                    onValueChange={(value) => {
                      setFormData({ ...formData, categoryId: value })
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
                  <Select
                    value={formData.brandId}
                    onValueChange={(value) => setFormData({ ...formData, brandId: value })}
                  >
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
                    name="tags"
                    placeholder="laptop, apple, pro"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
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
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
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
                    <Label htmlFor="price">Prix de location (DH/mois) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="450"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">Prix barré</Label>
                    <Input
                      id="compareAtPrice"
                      name="compareAtPrice"
                      type="number"
                      placeholder="500"
                      value={formData.compareAtPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Prix de revient</Label>
                    <Input
                      id="costPrice"
                      name="costPrice"
                      type="number"
                      placeholder="350"
                      value={formData.costPrice}
                      onChange={handleChange}
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
                      name="stock"
                      type="number"
                      placeholder="15"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStock">Seuil de stock bas</Label>
                    <Input
                      id="lowStock"
                      name="lowStock"
                      type="number"
                      placeholder="5"
                      value={formData.lowStock}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Attributs du produit</CardTitle>
                  {!selectedCategory && (
                    <p className="text-sm text-amber-600">
                      Veuillez d'abord sélectionner une catégorie pour voir les attributs disponibles
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCategory && availableAttributes.length > 0 ? (
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
                ) : selectedCategory ? (
                  <div className="py-8 text-center text-gray-500">
                    <p>Aucun attribut disponible pour cette catégorie.</p>
                    <p className="mt-2">
                      <Link href="/admin/catalogue/attributs" className="text-blue-600 hover:underline">
                        Créer des attributs
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>Veuillez d'abord sélectionner une catégorie pour voir les attributs disponibles.</p>
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
                      Sélectionner des images
                    </Button>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Aperçu des images ({imagePreviews.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {imagePreviews.map((src, index) => (
                          <div key={index} className="relative rounded-md overflow-hidden border">
                            <img
                              src={src || "/placeholder.svg"}
                              alt={`Preview ${index}`}
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

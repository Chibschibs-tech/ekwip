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
import { Upload, X, Loader2, Plus, Trash2 } from "lucide-react"
import type { Attribute, Product, ProductVariation, RentalDuration } from "@/types/admin"
import { useProducts } from "@/contexts/products-context"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import { useAttributes } from "@/contexts/attributes-context"
import { useToast } from "@/hooks/use-toast"
import { resizeImage } from "@/lib/image-utils"
import { RentalDurationsManager } from "@/components/admin/rental-durations-manager"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getProduct, updateProduct } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { getAttributesByCategory } = useAttributes()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>([])
  const [variationAttributes, setVariationAttributes] = useState<Attribute[]>([])
  const [productAttributes, setProductAttributes] = useState<Record<string, string>>({})
  const [imageFiles, setImageFiles] = useState<string[]>([])
  const [variations, setVariations] = useState<ProductVariation[]>([])
  const [hasVariations, setHasVariations] = useState(false)
  const [rentalDurations, setRentalDurations] = useState<RentalDuration[]>([])

  useEffect(() => {
    const loadProduct = () => {
      try {
        const foundProduct = getProduct(params.id)

        if (foundProduct) {
          setProduct(foundProduct)
          setSelectedCategory(foundProduct.categoryId)
          setProductAttributes(foundProduct.attributes || {})
          setImageFiles(foundProduct.images || [])
          setVariations(foundProduct.variations || [])
          setHasVariations((foundProduct.variations?.length || 0) > 0)
          setRentalDurations(foundProduct.rentalDurations || [])
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

  useEffect(() => {
    if (selectedCategory) {
      const filteredAttributes = getAttributesByCategory(selectedCategory)
      setAvailableAttributes(filteredAttributes)
      setVariationAttributes(filteredAttributes.filter((attr) => attr.isVariation))
    } else {
      setAvailableAttributes([])
      setVariationAttributes([])
    }
  }, [selectedCategory, getAttributesByCategory])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)

      try {
        const base64Images = await Promise.all(files.map((file) => resizeImage(file, 800, 800)))
        setImageFiles([...imageFiles, ...base64Images])
        toast({
          title: "Images ajoutées",
          description: `${files.length} image(s) téléchargée(s) avec succès`,
        })
      } catch (error) {
        console.error("Error uploading images:", error)
        toast({
          title: "Erreur",
          description: "Impossible de télécharger les images",
          variant: "destructive",
        })
      }
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...imageFiles]
    newImages.splice(index, 1)
    setImageFiles(newImages)
  }

  const addVariation = () => {
    if (!product) return
    const newVariation: ProductVariation = {
      id: `var-${Date.now()}`,
      name: "",
      sku: `${product.sku}-VAR${variations.length + 1}`,
      price: product.price,
      stockQuantity: 0,
      attributes: {},
    }
    setVariations([...variations, newVariation])
  }

  const updateVariation = (index: number, updates: Partial<ProductVariation>) => {
    const newVariations = [...variations]
    newVariations[index] = { ...newVariations[index], ...updates }
    setVariations(newVariations)
  }

  const removeVariation = (index: number) => {
    const newVariations = [...variations]
    newVariations.splice(index, 1)
    setVariations(newVariations)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!product) return

    setIsSubmitting(true)

    if (!product.name || !product.sku || !product.price || !product.categoryId) {
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
        description: `Veuillez remplir : ${missingRequiredAttributes.map((a) => a.name).join(", ")}`,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const updatedProductData: Product = {
        ...product,
        attributes: productAttributes,
        images: imageFiles,
        thumbnail: imageFiles[0] || product.thumbnail,
        variations: hasVariations ? variations : undefined,
        rentalDurations: rentalDurations.length > 0 ? rentalDurations : undefined,
        updatedAt: new Date().toISOString(),
      }

      updateProduct(params.id, updatedProductData)

      toast({
        title: "Produit mis à jour",
        description: `Le produit ${product.name} a été mis à jour avec succès`,
      })

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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="pricing">Prix & Stock</TabsTrigger>
            <TabsTrigger value="attributes">Attributs</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
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
                  <Select value={product.brandId} onValueChange={(value) => updateProductField("brandId", value)}>
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

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prix de base</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Prix de référence du produit (tous les prix sont HT)
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Prix de base (DH HT) <span className="text-red-500">*</span>
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
                    <Label htmlFor="compareAtPrice">Prix barré (DH HT)</Label>
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
                    <Label htmlFor="costPrice">Prix de revient (DH HT)</Label>
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

            <RentalDurationsManager durations={rentalDurations} onChange={setRentalDurations} />

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

          <TabsContent value="attributes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attributs du produit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableAttributes.length > 0 ? (
                  <div className="space-y-6">
                    {availableAttributes
                      .filter((attr) => !attr.isVariation)
                      .map((attr) => (
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

          <TabsContent value="variations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Variations du produit</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Créez des variations de ce produit (ex: différentes configurations processeur/RAM)
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hasVariations">Activer les variations</Label>
                  <Switch
                    id="hasVariations"
                    checked={hasVariations}
                    onCheckedChange={(checked) => {
                      setHasVariations(checked)
                      if (!checked) {
                        setVariations([])
                      }
                    }}
                  />
                </div>

                {hasVariations && (
                  <>
                    {variationAttributes.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {variations.map((variation, index) => (
                            <Card key={variation.id}>
                              <CardContent className="pt-6 space-y-4">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-semibold">Variation {index + 1}</h4>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeVariation(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label>Nom de la variation</Label>
                                    <Input
                                      placeholder="Ex: i5 / 16GB / 512GB"
                                      value={variation.name}
                                      onChange={(e) => updateVariation(index, { name: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>SKU</Label>
                                    <Input
                                      placeholder="Ex: MBP-i5-16-512"
                                      value={variation.sku}
                                      onChange={(e) => updateVariation(index, { sku: e.target.value })}
                                    />
                                  </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label>Prix (DH HT)</Label>
                                    <Input
                                      type="number"
                                      value={variation.price || ""}
                                      onChange={(e) => updateVariation(index, { price: Number(e.target.value) })}
                                      min="0"
                                      step="0.01"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Stock</Label>
                                    <Input
                                      type="number"
                                      value={variation.stockQuantity || ""}
                                      onChange={(e) =>
                                        updateVariation(index, { stockQuantity: Number(e.target.value) })
                                      }
                                      min="0"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <Label>Attributs de variation</Label>
                                  {variationAttributes.map((attr) => (
                                    <div key={attr.id} className="space-y-2">
                                      <Label className="text-sm">{attr.name}</Label>
                                      <Select
                                        value={variation.attributes[attr.id] || ""}
                                        onValueChange={(value) =>
                                          updateVariation(index, {
                                            attributes: {
                                              ...variation.attributes,
                                              [attr.id]: value,
                                            },
                                          })
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder={`Sélectionner ${attr.name.toLowerCase()}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {attr.values.map((value) => (
                                            <SelectItem key={value} value={value}>
                                              {value}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={addVariation}
                          className="w-full bg-transparent"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Ajouter une variation
                        </Button>
                      </>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <p>
                          Aucun attribut de variation défini pour cette catégorie. Veuillez créer des attributs avec
                          l'option "Utiliser pour les variations" dans la section Attributs.
                        </p>
                      </div>
                    )}
                  </>
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
                      Ajouter des images
                    </Button>
                  </div>

                  {imageFiles.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3">Images du produit ({imageFiles.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {imageFiles.map((src, index) => (
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
            {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </div>
  )
}

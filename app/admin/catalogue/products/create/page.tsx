"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { mockCategories, mockBrands } from "@/lib/mock-data"
import { Upload } from "lucide-react"

export default function CreateProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual product creation with API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/admin/catalogue/products")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ajouter un produit</h1>
          <p className="text-gray-600">Créez un nouveau produit dans votre catalogue</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input id="name" placeholder="MacBook Pro 14 pouces" required />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input id="sku" placeholder="MBP-14-001" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" placeholder="macbook-pro-14" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Description courte</Label>
                  <Textarea id="shortDescription" placeholder="Ordinateur portable professionnel" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description complète</Label>
                  <Textarea id="description" placeholder="Description détaillée du produit..." rows={6} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prix et stock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix de location (DH/mois) *</Label>
                    <Input id="price" type="number" placeholder="450" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Prix barré</Label>
                    <Input id="comparePrice" type="number" placeholder="500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Prix de revient</Label>
                    <Input id="costPrice" type="number" placeholder="350" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock disponible *</Label>
                    <Input id="stock" type="number" placeholder="15" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStock">Seuil de stock bas</Label>
                    <Input id="lowStock" type="number" placeholder="5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attributs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="processor">Processeur</Label>
                    <Input id="processor" placeholder="Apple M2 Pro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ram">RAM</Label>
                    <Input id="ram" placeholder="16GB" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage">Stockage</Label>
                    <Input id="storage" placeholder="512GB SSD" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="screen">Écran</Label>
                    <Input id="screen" placeholder='14" Retina' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select required>
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
                  <Select>
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
                  <Input id="tags" placeholder="laptop, apple, pro" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select defaultValue="active">
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
                  <Switch id="featured" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Cliquez pour télécharger ou glissez-déposez</p>
                    <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                    <Input type="file" className="hidden" accept="image/*" multiple />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

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

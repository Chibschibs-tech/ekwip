"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useAttributes } from "@/contexts/attributes-context"
import { useCategories } from "@/contexts/categories-context"
import { useToast } from "@/hooks/use-toast"
import type { Attribute } from "@/types/admin"

export default function AttributesPage() {
  const { attributes, addAttribute, updateAttribute, deleteAttribute } = useAttributes()
  const { categories } = useCategories()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "select" as "select" | "text" | "number" | "color",
    values: "",
    isRequired: false,
    isFilterable: false,
    categories: [] as string[],
  })

  const filteredAttributes = attributes.filter((attr) => attr.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name) {
      toast({
        title: "Erreur",
        description: "Le nom de l'attribut est requis",
        variant: "destructive",
      })
      return
    }

    if (formData.type === "select" && !formData.values) {
      toast({
        title: "Erreur",
        description: "Les valeurs sont requises pour un attribut de type liste",
        variant: "destructive",
      })
      return
    }

    if (formData.categories.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une catégorie",
        variant: "destructive",
      })
      return
    }

    const values = formData.type === "select" ? formData.values.split(",").map((v) => v.trim()) : []

    if (editingAttribute) {
      updateAttribute(editingAttribute.id, {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        type: formData.type,
        values,
        isRequired: formData.isRequired,
        isFilterable: formData.isFilterable,
        categories: formData.categories,
        updatedAt: new Date().toISOString(),
      })
      toast({
        title: "Attribut mis à jour",
        description: `L'attribut ${formData.name} a été mis à jour`,
      })
      setIsEditDialogOpen(false)
    } else {
      const newAttribute: Attribute = {
        id: `attr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        type: formData.type,
        values,
        isRequired: formData.isRequired,
        isFilterable: formData.isFilterable,
        order: attributes.length + 1,
        categories: formData.categories,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      addAttribute(newAttribute)
      toast({
        title: "Attribut créé",
        description: `L'attribut ${formData.name} a été créé avec succès`,
      })
      setIsCreateDialogOpen(false)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      type: "select",
      values: "",
      isRequired: false,
      isFilterable: false,
      categories: [],
    })
    setEditingAttribute(null)
  }

  const handleEdit = (attribute: Attribute) => {
    setEditingAttribute(attribute)
    setFormData({
      name: attribute.name,
      slug: attribute.slug,
      type: attribute.type,
      values: attribute.values.join(", "),
      isRequired: attribute.isRequired,
      isFilterable: attribute.isFilterable,
      categories: attribute.categories || [],
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'attribut "${name}" ?`)) {
      deleteAttribute(id)
      toast({
        title: "Attribut supprimé",
        description: `L'attribut ${name} a été supprimé`,
      })
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const AttributeForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Nom <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Processeur"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="processeur"
        />
        <p className="text-xs text-gray-500">Laissez vide pour générer automatiquement</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">
          Type d'attribut <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="select">Liste déroulante</SelectItem>
            <SelectItem value="text">Texte libre</SelectItem>
            <SelectItem value="number">Nombre</SelectItem>
            <SelectItem value="color">Couleur</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.type === "select" && (
        <div className="space-y-2">
          <Label htmlFor="values">
            Valeurs (séparées par des virgules) <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="values"
            value={formData.values}
            onChange={(e) => setFormData({ ...formData, values: e.target.value })}
            placeholder="16GB, 32GB, 64GB"
            rows={3}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>
          Catégories applicables <span className="text-red-500">*</span>
        </Label>
        <div className="border rounded-md p-4 max-h-40 overflow-y-auto space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={formData.categories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label htmlFor={`category-${category.id}`} className="cursor-pointer font-normal">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="required"
            checked={formData.isRequired}
            onCheckedChange={(checked) => setFormData({ ...formData, isRequired: !!checked })}
          />
          <Label htmlFor="required" className="cursor-pointer font-normal">
            Obligatoire
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="filterable"
            checked={formData.isFilterable}
            onCheckedChange={(checked) => setFormData({ ...formData, isFilterable: !!checked })}
          />
          <Label htmlFor="filterable" className="cursor-pointer font-normal">
            Utilisable comme filtre
          </Label>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsCreateDialogOpen(false)
            setIsEditDialogOpen(false)
            resetForm()
          }}
        >
          Annuler
        </Button>
        <Button type="submit">{editingAttribute ? "Mettre à jour" : "Créer"}</Button>
      </DialogFooter>
    </form>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attributs</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez les attributs de vos produits</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un attribut
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouvel attribut</DialogTitle>
            </DialogHeader>
            <AttributeForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des attributs ({filteredAttributes.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Valeurs</TableHead>
                  <TableHead>Catégories</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttributes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Aucun attribut trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttributes.map((attribute) => (
                    <TableRow key={attribute.id}>
                      <TableCell className="font-medium">{attribute.name}</TableCell>
                      <TableCell>
                        {
                          {
                            select: "Liste",
                            text: "Texte",
                            number: "Nombre",
                            color: "Couleur",
                          }[attribute.type]
                        }
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {attribute.type === "select" ? attribute.values.join(", ") : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {attribute.categories?.slice(0, 2).map((catId) => {
                            const category = categories.find((c) => c.id === catId)
                            return category ? (
                              <Badge key={catId} variant="outline" className="text-xs">
                                {category.name}
                              </Badge>
                            ) : null
                          })}
                          {attribute.categories && attribute.categories.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{attribute.categories.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {attribute.isRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Obligatoire
                            </Badge>
                          )}
                          {attribute.isFilterable && (
                            <Badge variant="secondary" className="text-xs">
                              Filtrable
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(attribute)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(attribute.id, attribute.name)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'attribut</DialogTitle>
          </DialogHeader>
          <AttributeForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

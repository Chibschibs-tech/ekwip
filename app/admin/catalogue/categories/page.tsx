"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, Search, MoreVertical, Pencil, Trash2, Upload, ChevronRight, ChevronDown, FolderTree, Folder, FolderOpen, Package } from "lucide-react"
import { useCategories } from "@/contexts/categories-context"
import { useToast } from "@/hooks/use-toast"
import type { Category } from "@/types/admin"

interface Family {
  id: string
  name: string
  slug: string
  description?: string
  order: number
  isActive: boolean
  categories: Category[]
}

export default function CategoriesPage() {
  const { categories, loading, error, addCategory, updateCategory, deleteCategory, refreshCategories } = useCategories()
  const { toast } = useToast()
  const [families, setFamilies] = useState<Family[]>([])
  const [familiesLoading, setFamiliesLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree")

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    familyId: "",
    order: 0,
    isActive: true,
  })

  // Fetch families with categories
  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        setFamiliesLoading(true)
        const response = await fetch("/api/families?withCategories=true")
        if (response.ok) {
          const data = await response.json()
          setFamilies(data)
          // Expand all families by default
          setExpandedFamilies(new Set(data.map((f: Family) => f.id)))
        }
      } catch (err) {
        console.error("Error fetching families:", err)
      } finally {
        setFamiliesLoading(false)
      }
    }
    fetchFamilies()
  }, [])

  const toggleFamily = (familyId: string) => {
    setExpandedFamilies(prev => {
      const newSet = new Set(prev)
      if (newSet.has(familyId)) {
        newSet.delete(familyId)
      } else {
        newSet.add(familyId)
      }
      return newSet
    })
  }

  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Filter families and their categories based on search
  const filteredFamilies = families.map(family => ({
    ...family,
    categories: family.categories.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(family => 
    family.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    family.categories.length > 0
  )

  // Debug: Log categories when they change
  useEffect(() => {
    if (!loading) {
      console.log("Categories loaded:", categories.length, categories)
    }
  }, [categories, loading])

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est requis",
        variant: "destructive",
      })
      return
    }

    const slug =
      formData.slug.trim() ||
      formData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        ...formData,
        slug,
        updatedAt: new Date().toISOString(),
      })
      toast({
        title: "Catégorie mise à jour",
        description: `La catégorie ${formData.name} a été mise à jour`,
      })
      setIsEditDialogOpen(false)
    } else {
      const newCategory: Category = {
        id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        slug,
        description: formData.description || undefined,
        image: formData.image || undefined,
        parentId: null,
        order: formData.order,
        isActive: formData.isActive,
        productCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      addCategory(newCategory)
      toast({
        title: "Catégorie créée",
        description: `La catégorie ${formData.name} a été créée avec succès`,
      })
      setIsCreateDialogOpen(false)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "",
      familyId: "",
      order: 0,
      isActive: true,
    })
    setEditingCategory(null)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      image: category.image || "",
      familyId: (category as any).familyId || "",
      order: category.order,
      isActive: category.isActive,
    })
    setIsEditDialogOpen(true)
  }

  const refreshAll = async () => {
    await refreshCategories()
    const response = await fetch("/api/families?withCategories=true")
    if (response.ok) {
      const data = await response.json()
      setFamilies(data)
    }
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${name}" ?`)) {
      deleteCategory(id)
      toast({
        title: "Catégorie supprimée",
        description: `La catégorie ${name} a été supprimée`,
      })
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleInputChange("image", reader.result as string)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'image",
        variant: "destructive",
      })
    }
  }

  const CategoryForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="familyId">Famille</Label>
        <Select
          value={formData.familyId}
          onValueChange={(value) => handleInputChange("familyId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une famille" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Aucune famille</SelectItem>
            {families.map((family) => (
              <SelectItem key={family.id} value={family.id}>
                {family.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Nom <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Ex: Ordinateurs portables"
          required
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => handleInputChange("slug", e.target.value)}
          placeholder="ordinateurs-portables"
          autoComplete="off"
        />
        <p className="text-xs text-gray-500">Laissez vide pour générer automatiquement</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Description de la catégorie"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <div className="flex gap-2">
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://..."
            autoComplete="off"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        {formData.image && (
          <div className="mt-2 relative w-32 h-32 border rounded-lg overflow-hidden">
            <img src={formData.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">Ordre d'affichage</Label>
        <Input
          id="order"
          type="number"
          value={formData.order}
          onChange={(e) => handleInputChange("order", Number.parseInt(e.target.value) || 0)}
          min="0"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="isActive">Catégorie active</Label>
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleInputChange("isActive", checked)}
        />
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
        <Button type="submit">{editingCategory ? "Mettre à jour" : "Créer"}</Button>
      </DialogFooter>
    </form>
  )

  const isLoading = loading || familiesLoading

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Catégories</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez les familles et catégories de produits</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "tree" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("tree")}
          >
            <FolderTree className="mr-2 h-4 w-4" />
            Arborescence
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <Package className="mr-2 h-4 w-4" />
            Liste
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une catégorie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
              </DialogHeader>
              <CategoryForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {viewMode === "tree" 
                ? `Arborescence (${families.length} familles, ${categories.length} catégories)` 
                : `Liste des catégories (${filteredCategories.length})`}
            </CardTitle>
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
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold mb-2">Erreur de chargement</p>
              <p className="text-red-600 text-sm mb-3">{error}</p>
              <Button onClick={refreshAll} variant="outline" size="sm">
                Réessayer
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement...</p>
            </div>
          ) : viewMode === "tree" ? (
            /* Tree View */
            <div className="space-y-2">
              {filteredFamilies.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune famille ou catégorie trouvée.
                </div>
              ) : (
                filteredFamilies.map((family) => (
                  <Collapsible
                    key={family.id}
                    open={expandedFamilies.has(family.id)}
                    onOpenChange={() => toggleFamily(family.id)}
                  >
                    <div className="border rounded-lg">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            {expandedFamilies.has(family.id) ? (
                              <ChevronDown className="h-5 w-5 text-slate-500" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-slate-500" />
                            )}
                            {expandedFamilies.has(family.id) ? (
                              <FolderOpen className="h-5 w-5 text-amber-500" />
                            ) : (
                              <Folder className="h-5 w-5 text-amber-500" />
                            )}
                            <div>
                              <span className="font-semibold text-lg">{family.name}</span>
                              <span className="ml-3 text-sm text-slate-500">
                                ({family.categories.length} catégories)
                              </span>
                            </div>
                          </div>
                          <Badge variant={family.isActive ? "default" : "secondary"}>
                            {family.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t">
                          {family.categories.length === 0 ? (
                            <div className="p-4 pl-14 text-slate-500 italic">
                              Aucune catégorie dans cette famille
                            </div>
                          ) : (
                            family.categories
                              .sort((a, b) => a.order - b.order)
                              .map((category) => (
                                <div
                                  key={category.id}
                                  className="flex items-center justify-between p-3 pl-14 border-b last:border-b-0 hover:bg-slate-50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <Package className="h-4 w-4 text-slate-400" />
                                    <div>
                                      <span className="font-medium">{category.name}</span>
                                      <span className="ml-2 text-sm text-slate-500 font-mono">
                                        ({category.slug})
                                      </span>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                      {category.productCount || 0} produits
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant={category.isActive ? "default" : "secondary"} className="mr-2">
                                      {category.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                                          <Pencil className="mr-2 h-4 w-4" />
                                          Modifier
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleDelete(category.id, category.name)}
                                          className="text-red-600"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Supprimer
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))
              )}

              {/* Categories without family */}
              {categories.filter(c => !(c as any).familyId).length > 0 && (
                <Collapsible defaultOpen>
                  <div className="border rounded-lg border-dashed">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                          <Folder className="h-5 w-5 text-slate-400" />
                          <div>
                            <span className="font-semibold text-lg text-slate-500">Sans famille</span>
                            <span className="ml-3 text-sm text-slate-400">
                              ({categories.filter(c => !(c as any).familyId).length} catégories)
                            </span>
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t">
                        {categories
                          .filter(c => !(c as any).familyId)
                          .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .sort((a, b) => a.order - b.order)
                          .map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center justify-between p-3 pl-14 border-b last:border-b-0 hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Package className="h-4 w-4 text-slate-400" />
                                <div>
                                  <span className="font-medium">{category.name}</span>
                                  <span className="ml-2 text-sm text-slate-500 font-mono">
                                    ({category.slug})
                                  </span>
                                </div>
                                <Badge variant="outline" className="ml-2">
                                  {category.productCount || 0} produits
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={category.isActive ? "default" : "secondary"} className="mr-2">
                                  {category.isActive ? "Active" : "Inactive"}
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEdit(category)}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDelete(category.id, category.name)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Supprimer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}
            </div>
          ) : (
            /* List View (original table) */
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Nom</th>
                    <th className="text-left p-3 font-medium">Famille</th>
                    <th className="text-left p-3 font-medium">Slug</th>
                    <th className="text-left p-3 font-medium">Produits</th>
                    <th className="text-left p-3 font-medium">Ordre</th>
                    <th className="text-left p-3 font-medium">Statut</th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        {categories.length === 0
                          ? "Aucune catégorie trouvée."
                          : "Aucune catégorie ne correspond à votre recherche."}
                      </td>
                    </tr>
                  ) : (
                    filteredCategories
                      .sort((a, b) => a.order - b.order)
                      .map((category) => {
                        const familyName = families.find(f => f.id === (category as any).familyId)?.name
                        return (
                          <tr key={category.id} className="border-t hover:bg-slate-50">
                            <td className="p-3 font-medium">{category.name}</td>
                            <td className="p-3 text-slate-600">{familyName || "-"}</td>
                            <td className="p-3 font-mono text-sm text-gray-600">{category.slug}</td>
                            <td className="p-3">{category.productCount}</td>
                            <td className="p-3">{category.order}</td>
                            <td className="p-3">
                              <Badge variant={category.isActive ? "default" : "secondary"}>
                                {category.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="p-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(category)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(category.id, category.name)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        )
                      })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
          </DialogHeader>
          <CategoryForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

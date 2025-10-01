"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { mockAttributes, mockCategories } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function AttributesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [attributes, setAttributes] = useState(mockAttributes)
  const [newAttribute, setNewAttribute] = useState({
    name: "",
    slug: "",
    type: "select",
    values: "",
    isRequired: false,
    isFilterable: false,
    categories: [] as string[],
  })

  const handleAddAttribute = () => {
    const values = newAttribute.values.split(",").map((v) => v.trim())

    const attribute = {
      id: `attr-${Date.now()}`,
      name: newAttribute.name,
      slug: newAttribute.slug || newAttribute.name.toLowerCase().replace(/\s+/g, "-"),
      type: newAttribute.type as "select" | "text" | "number" | "color",
      values: values,
      isRequired: newAttribute.isRequired,
      isFilterable: newAttribute.isFilterable,
      order: attributes.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categories: newAttribute.categories,
    }

    setAttributes([...attributes, attribute])
    setNewAttribute({
      name: "",
      slug: "",
      type: "select",
      values: "",
      isRequired: false,
      isFilterable: false,
      categories: [],
    })
  }

  const filteredAttributes = attributes.filter((attr) => attr.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCategoryChange = (categoryId: string) => {
    const currentCategories = [...newAttribute.categories]

    if (currentCategories.includes(categoryId)) {
      setNewAttribute({
        ...newAttribute,
        categories: currentCategories.filter((id) => id !== categoryId),
      })
    } else {
      setNewAttribute({
        ...newAttribute,
        categories: [...currentCategories, categoryId],
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attributs</h1>
          <p className="text-gray-600">Gérez les attributs de vos produits</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un attribut
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel attribut</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    placeholder="Processeur"
                    value={newAttribute.name}
                    onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="processeur"
                    value={newAttribute.slug}
                    onChange={(e) => setNewAttribute({ ...newAttribute, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type d'attribut *</Label>
                <Select
                  value={newAttribute.type}
                  onValueChange={(value) => setNewAttribute({ ...newAttribute, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select">Liste déroulante</SelectItem>
                    <SelectItem value="text">Texte libre</SelectItem>
                    <SelectItem value="number">Nombre</SelectItem>
                    <SelectItem value="color">Couleur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newAttribute.type === "select" && (
                <div className="space-y-2">
                  <Label htmlFor="values">Valeurs (séparées par des virgules) *</Label>
                  <Textarea
                    id="values"
                    placeholder="16GB, 32GB, 64GB"
                    value={newAttribute.values}
                    onChange={(e) => setNewAttribute({ ...newAttribute, values: e.target.value })}
                    rows={3}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Catégories applicables *</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-40 overflow-y-auto">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={newAttribute.categories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="required"
                    checked={newAttribute.isRequired}
                    onCheckedChange={(checked) => setNewAttribute({ ...newAttribute, isRequired: !!checked })}
                  />
                  <Label htmlFor="required">Obligatoire</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filterable"
                    checked={newAttribute.isFilterable}
                    onCheckedChange={(checked) => setNewAttribute({ ...newAttribute, isFilterable: !!checked })}
                  />
                  <Label htmlFor="filterable">Utilisable comme filtre</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  !newAttribute.name ||
                  (newAttribute.type === "select" && !newAttribute.values) ||
                  !newAttribute.categories.length
                }
                onClick={handleAddAttribute}
              >
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des attributs ({filteredAttributes.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[250px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Valeurs</TableHead>
                <TableHead>Catégories</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttributes.map((attribute) => (
                <TableRow key={attribute.id}>
                  <TableCell className="font-medium">{attribute.name}</TableCell>
                  <TableCell>
                    {
                      {
                        select: "Liste déroulante",
                        text: "Texte libre",
                        number: "Nombre",
                        color: "Couleur",
                      }[attribute.type]
                    }
                  </TableCell>
                  <TableCell>{attribute.type === "select" && attribute.values.join(", ")}</TableCell>
                  <TableCell>
                    {attribute.categories ? (
                      <div className="flex flex-wrap gap-1">
                        {attribute.categories.slice(0, 2).map((catId) => (
                          <Badge key={catId} variant="outline" className="bg-blue-50">
                            {mockCategories.find((c) => c.id === catId)?.name || ""}
                          </Badge>
                        ))}
                        {attribute.categories.length > 2 && (
                          <Badge variant="outline">+{attribute.categories.length - 2}</Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">Toutes</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {attribute.isRequired && (
                        <Badge className="bg-red-100 text-red-800 border-red-200">Obligatoire</Badge>
                      )}
                      {attribute.isFilterable && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Filtrable</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

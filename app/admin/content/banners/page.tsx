"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Banner } from "@/types/admin"

export default function BannersPage() {
  const { toast } = useToast()
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    mobileImage: "",
    isMobileEnabled: false,
    link: "",
    buttonText: "",
    position: "boutique" as "hero" | "sidebar" | "footer" | "boutique",
    order: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    isActive: true,
  })

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/banners")
      if (!response.ok) throw new Error("Failed to fetch banners")
      const data = await response.json()
      setBanners(data)
    } catch (error) {
      console.error("Error fetching banners:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les bannières",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredBanners = banners.filter((banner) => {
    const matchesSearch = banner.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPosition = positionFilter === "all" || banner.position === positionFilter
    return matchesSearch && matchesPosition
  })

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.image.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre et l'image sont requis",
        variant: "destructive",
      })
      return
    }

    try {
      const bannerData = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      }

      if (editingBanner) {
        const response = await fetch(`/api/banners/${editingBanner.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bannerData),
        })

        if (!response.ok) throw new Error("Failed to update banner")

        toast({
          title: "Bannière mise à jour",
          description: `La bannière ${formData.title} a été mise à jour`,
        })
        setIsEditDialogOpen(false)
      } else {
        const response = await fetch("/api/banners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bannerData),
        })

        if (!response.ok) throw new Error("Failed to create banner")

        toast({
          title: "Bannière créée",
          description: `La bannière ${formData.title} a été créée avec succès`,
        })
        setIsCreateDialogOpen(false)
      }

      resetForm()
      fetchBanners()
    } catch (error) {
      console.error("Error saving banner:", error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la bannière",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette bannière ?")) return

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete banner")

      toast({
        title: "Bannière supprimée",
        description: "La bannière a été supprimée avec succès",
      })
      fetchBanners()
    } catch (error) {
      console.error("Error deleting banner:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la bannière",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      description: banner.description || "",
      image: banner.image,
      mobileImage: banner.mobileImage || "",
      isMobileEnabled: banner.isMobileEnabled || false,
      link: banner.link || "",
      buttonText: banner.buttonText || "",
      position: banner.position as "hero" | "sidebar" | "footer" | "boutique",
      order: banner.order,
      startDate: banner.startDate ? new Date(banner.startDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      endDate: banner.endDate ? new Date(banner.endDate).toISOString().split("T")[0] : "",
      isActive: banner.isActive,
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      mobileImage: "",
      isMobileEnabled: false,
      link: "",
      buttonText: "",
      position: "boutique",
      order: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      isActive: true,
    })
    setEditingBanner(null)
  }

  const boutiqueBanners = filteredBanners.filter((b) => b.position === "boutique").sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bannières</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez les bannières promotionnelles de la boutique</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une bannière
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter une bannière</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Titre *</Label>
                  <Input value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required />
                </div>
                <div>
                  <Label>Position *</Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boutique">Boutique</SelectItem>
                      <SelectItem value="hero">Hero</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="footer">Footer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  placeholder="Description de la bannière (sous-titre)"
                />
              </div>

              {/* Image Guidelines */}
              {formData.position === "boutique" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-blue-900">📏 Tailles d'images recommandées</h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li><strong>Desktop (Ordre 0 - Grande bannière) :</strong> 1200x500px minimum (ratio 2.4:1)</li>
                    <li><strong>Desktop (Ordre 1-2 - Petites bannières) :</strong> 600x500px minimum (ratio 1.2:1)</li>
                    <li><strong>Mobile :</strong> 800x600px minimum (ratio 4:3)</li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-2">
                    💡 <strong>Astuce :</strong> Les images doivent contenir le gradient de fond intégré. Utilisez un format optimisé (WebP recommandé) pour de meilleures performances.
                  </p>
                </div>
              )}

              <div>
                <Label>Image Desktop *</Label>
                <Input 
                  value={formData.image} 
                  onChange={(e) => handleInputChange("image", e.target.value)} 
                  placeholder="https://example.com/image.jpg"
                  required 
                />
                <p className="text-xs text-gray-500 mt-1">URL de l'image pour desktop</p>
              </div>

              {/* Mobile Image Section */}
              <div className="space-y-3 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Activer sur mobile</Label>
                    <p className="text-xs text-gray-500">Afficher une image optimisée pour mobile</p>
                  </div>
                  <Switch 
                    checked={formData.isMobileEnabled} 
                    onCheckedChange={(checked) => handleInputChange("isMobileEnabled", checked)} 
                  />
                </div>
                {formData.isMobileEnabled && (
                  <div>
                    <Label>Image Mobile *</Label>
                    <Input 
                      value={formData.mobileImage} 
                      onChange={(e) => handleInputChange("mobileImage", e.target.value)} 
                      placeholder="https://example.com/image-mobile.jpg"
                      required={formData.isMobileEnabled}
                    />
                    <p className="text-xs text-gray-500 mt-1">URL de l'image optimisée pour mobile (800x600px recommandé)</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Lien</Label>
                  <Input 
                    value={formData.link} 
                    onChange={(e) => handleInputChange("link", e.target.value)} 
                    placeholder="/boutique?category=..."
                  />
                </div>
                <div>
                  <Label>Texte du bouton</Label>
                  <Input 
                    value={formData.buttonText} 
                    onChange={(e) => handleInputChange("buttonText", e.target.value)} 
                    placeholder="Acheter maintenant"
                  />
                </div>
              </div>

              {/* Order Explanation */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-lg">📌</span>
                  <div>
                    <Label className="font-semibold text-amber-900">Ordre d'affichage (Important pour Boutique)</Label>
                    <p className="text-sm text-amber-800 mt-1">
                      <strong>Ordre 0 :</strong> Grande bannière à gauche (affichée en premier)<br />
                      <strong>Ordre 1-2 :</strong> Petites bannières à droite (empilées verticalement)<br />
                      Seules les 3 premières bannières actives sont affichées, triées par ordre croissant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Ordre *</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => handleInputChange("order", Number.parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                <div>
                  <Label>Date de début</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date de fin (optionnel)</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch checked={formData.isActive} onCheckedChange={(checked) => handleInputChange("isActive", checked)} />
                <Label>Active</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">{editingBanner ? "Mettre à jour" : "Créer"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une bannière..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les positions</SelectItem>
                <SelectItem value="boutique">Boutique</SelectItem>
                <SelectItem value="hero">Hero</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Boutique Banners Section */}
      {positionFilter === "all" || positionFilter === "boutique" ? (
        <Card>
          <CardHeader>
            <CardTitle>Bannières Boutique ({boutiqueBanners.length})</CardTitle>
            <p className="text-sm text-gray-600">Les 3 premières bannières actives s'affichent sur la page boutique</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : boutiqueBanners.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Aucune bannière boutique. Créez-en une pour commencer.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ordre</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Lien</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {boutiqueBanners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>{banner.order}</TableCell>
                      <TableCell className="font-medium">{banner.title}</TableCell>
                      <TableCell>
                        <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden">
                          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                        </div>
                      </TableCell>
                      <TableCell>
                        {banner.link ? (
                          <a href={banner.link} className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                            {banner.link.substring(0, 30)}...
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={banner.isActive ? "default" : "secondary"}>
                          {banner.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(banner)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(banner.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ) : null}

      {/* All Banners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Toutes les bannières ({filteredBanners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : filteredBanners.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Aucune bannière trouvée</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBanners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <Badge>{banner.position}</Badge>
                    </TableCell>
                    <TableCell>{banner.order}</TableCell>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell>
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(banner)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(banner.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la bannière</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Titre *</Label>
                <Input value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required />
              </div>
              <div>
                <Label>Position *</Label>
                <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boutique">Boutique</SelectItem>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => handleInputChange("description", e.target.value)} 
                rows={3}
                placeholder="Description de la bannière (sous-titre)"
              />
            </div>

            {/* Image Guidelines */}
            {formData.position === "boutique" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-blue-900">📏 Tailles d'images recommandées</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li><strong>Desktop (Ordre 0 - Grande bannière) :</strong> 1200x500px minimum (ratio 2.4:1)</li>
                  <li><strong>Desktop (Ordre 1-2 - Petites bannières) :</strong> 600x500px minimum (ratio 1.2:1)</li>
                  <li><strong>Mobile :</strong> 800x600px minimum (ratio 4:3)</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                  💡 <strong>Astuce :</strong> Les images doivent contenir le gradient de fond intégré. Utilisez un format optimisé (WebP recommandé) pour de meilleures performances.
                </p>
              </div>
            )}

            <div>
              <Label>Image Desktop *</Label>
              <Input 
                value={formData.image} 
                onChange={(e) => handleInputChange("image", e.target.value)} 
                placeholder="https://example.com/image.jpg"
                required 
              />
              <p className="text-xs text-gray-500 mt-1">URL de l'image pour desktop</p>
            </div>

            {/* Mobile Image Section */}
            <div className="space-y-3 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Activer sur mobile</Label>
                  <p className="text-xs text-gray-500">Afficher une image optimisée pour mobile</p>
                </div>
                <Switch 
                  checked={formData.isMobileEnabled} 
                  onCheckedChange={(checked) => handleInputChange("isMobileEnabled", checked)} 
                />
              </div>
              {formData.isMobileEnabled && (
                <div>
                  <Label>Image Mobile *</Label>
                  <Input 
                    value={formData.mobileImage} 
                    onChange={(e) => handleInputChange("mobileImage", e.target.value)} 
                    placeholder="https://example.com/image-mobile.jpg"
                    required={formData.isMobileEnabled}
                  />
                  <p className="text-xs text-gray-500 mt-1">URL de l'image optimisée pour mobile (800x600px recommandé)</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Lien</Label>
                <Input 
                  value={formData.link} 
                  onChange={(e) => handleInputChange("link", e.target.value)} 
                  placeholder="/boutique?category=..."
                />
              </div>
              <div>
                <Label>Texte du bouton</Label>
                <Input 
                  value={formData.buttonText} 
                  onChange={(e) => handleInputChange("buttonText", e.target.value)} 
                  placeholder="Acheter maintenant"
                />
              </div>
            </div>

            {/* Order Explanation */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-lg">📌</span>
                <div>
                  <Label className="font-semibold text-amber-900">Ordre d'affichage (Important pour Boutique)</Label>
                  <p className="text-sm text-amber-800 mt-1">
                    <strong>Ordre 0 :</strong> Grande bannière à gauche (affichée en premier)<br />
                    <strong>Ordre 1-2 :</strong> Petites bannières à droite (empilées verticalement)<br />
                    Seules les 3 premières bannières actives sont affichées, triées par ordre croissant.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Ordre *</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) => handleInputChange("order", Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <Label>Date de début</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div>
                <Label>Date de fin (optionnel)</Label>
                <Input type="date" value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch checked={formData.isActive} onCheckedChange={(checked) => handleInputChange("isActive", checked)} />
              <Label>Active</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Mettre à jour</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}


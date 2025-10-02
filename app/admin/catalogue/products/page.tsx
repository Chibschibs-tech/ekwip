"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Filter, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useProducts } from "@/contexts/products-context"
import { useToast } from "@/hooks/use-toast"

export default function ProductsPage() {
  const router = useRouter()
  const { products, deleteProduct } = useProducts()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrer les produits par recherche
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products

    const query = searchQuery.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query),
    )
  }, [products, searchQuery])

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(id)
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès",
      })
    }
  }

  const handleExportCSV = () => {
    // Créer le contenu CSV
    const headers = ["SKU", "Nom", "Prix", "Stock", "Statut"]
    const rows = filteredProducts.map((p) => [
      p.sku,
      p.name,
      `${p.price} DH/mois`,
      p.stockQuantity.toString(),
      p.status,
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    // Télécharger le fichier
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `products-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export réussi",
      description: `${filteredProducts.length} produits exportés`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez votre catalogue de produits</p>
        </div>
        <Button onClick={() => router.push("/admin/catalogue/products/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un produit
        </Button>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des produits ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.price} DH/mois</TableCell>
                      <TableCell>
                        <span
                          className={
                            product.stockQuantity <= product.lowStockThreshold ? "text-red-600 font-medium" : ""
                          }
                        >
                          {product.stockQuantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "active"
                              ? "default"
                              : product.status === "draft"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {product.status === "active" ? "Actif" : product.status === "draft" ? "Brouillon" : "Archivé"}
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
                            <DropdownMenuItem
                              onClick={() => router.push(`/admin/catalogue/products/edit/${product.id}`)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
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
    </div>
  )
}

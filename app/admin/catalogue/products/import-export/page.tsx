"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RefreshCw,
  FileText,
  Info,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useCategories } from "@/contexts/categories-context"
import { useBrands } from "@/contexts/brands-context"
import * as XLSX from "xlsx"

interface ImportResult {
  created: number
  updated: number
  errors: { row: number; sku: string; error: string }[]
}

export default function ImportExportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { categories } = useCategories()
  const { brands } = useBrands()

  // Import state
  const [importing, setImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])

  // Import options
  const [defaultProductType, setDefaultProductType] = useState<"sale" | "rent">("sale")
  const [defaultStatus, setDefaultStatus] = useState<"active" | "draft">("active")
  const [createBrands, setCreateBrands] = useState(true)

  // Export state
  const [exporting, setExporting] = useState(false)
  const [exportProductType, setExportProductType] = useState<string>("all")
  const [exportCategory, setExportCategory] = useState<string>("all")
  const [exportStatus, setExportStatus] = useState<string>("all")
  const [exportFormat, setExportFormat] = useState<"csv" | "xlsx">("xlsx")

  // Handle file selection and preview
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setImportResult(null)

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" })

      // Show preview of first 5 rows
      setPreviewData(jsonData.slice(0, 5))
    } catch (err) {
      toast({
        title: "Erreur de lecture",
        description: "Impossible de lire le fichier. Assurez-vous qu'il s'agit d'un fichier Excel valide.",
        variant: "destructive",
      })
    }
  }, [toast])

  // Process and import file
  const handleImport = async () => {
    if (!selectedFile) return

    setImporting(true)
    setImportProgress(10)

    try {
      const data = await selectedFile.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" })

      setImportProgress(30)

      // Map Excel columns to product fields
      const mappedProducts = jsonData.map((row: any) => ({
        // Try multiple column name variations
        sku: row.SKU || row.sku || row.Sku || row["Référence"] || row.reference || row.Reference || "",
        name: row.Nom || row.name || row.Name || row["Désignation"] || row.designation || "",
        description: row.Description || row.description || "",
        shortDescription: row["Description courte"] || row.shortDescription || row.short_description || "",
        categoryName: row.Catégorie || row.Categorie || row.Category || row.category || row.categoryName || "",
        categoryId: row["ID Catégorie"] || row.categoryId || row.category_id || "",
        brandName: row.Marque || row.Brand || row.brand || row.brandName || "",
        brandId: row["ID Marque"] || row.brandId || row.brand_id || "",
        productType: row.Type || row.type || row.productType || row.product_type || "",
        price: row.Prix || row.price || row.Price || row["Prix HT"] || row["prix revendeur HT"] || 0,
        costPrice: row["Prix d'achat"] || row["Prix achat"] || row.costPrice || row.cost_price || row["prix revendeur HT"] || "",
        stockQuantity: row.Stock || row.stock || row.stockQuantity || row.stock_quantity || row.Quantité || 0,
        lowStockThreshold: row["Seuil stock"] || row.lowStockThreshold || row.low_stock_threshold || 5,
        status: row.Statut || row.status || row.Status || "",
        images: row.Images || row.images || "",
        thumbnail: row.Miniature || row.thumbnail || row.Thumbnail || "",
        attributes: row.Attributs || row.attributes || row.Attributes || "",
      }))

      setImportProgress(50)

      // Send to API in batches
      const batchSize = 50
      let totalCreated = 0
      let totalUpdated = 0
      const allErrors: { row: number; sku: string; error: string }[] = []

      for (let i = 0; i < mappedProducts.length; i += batchSize) {
        const batch = mappedProducts.slice(i, i + batchSize)
        
        const response = await fetch("/api/products/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: batch,
            options: {
              defaultProductType,
              defaultStatus,
              createBrands,
            },
          }),
        })

        if (!response.ok) {
          throw new Error("Import failed")
        }

        const result = await response.json()
        totalCreated += result.results.created
        totalUpdated += result.results.updated
        
        // Adjust row numbers for batch offset
        const batchErrors = result.results.errors.map((err: any) => ({
          ...err,
          row: err.row + i,
        }))
        allErrors.push(...batchErrors)

        setImportProgress(50 + Math.round((i / mappedProducts.length) * 50))
      }

      setImportProgress(100)
      setImportResult({
        created: totalCreated,
        updated: totalUpdated,
        errors: allErrors,
      })

      toast({
        title: "Import terminé",
        description: `${totalCreated} produits créés, ${totalUpdated} mis à jour`,
      })
    } catch (err: any) {
      toast({
        title: "Erreur d'import",
        description: err.message || "Une erreur est survenue lors de l'import",
        variant: "destructive",
      })
    } finally {
      setImporting(false)
    }
  }

  // Handle export
  const handleExport = async () => {
    setExporting(true)

    try {
      const params = new URLSearchParams()
      if (exportProductType !== "all") params.set("productType", exportProductType)
      if (exportCategory !== "all") params.set("categoryId", exportCategory)
      if (exportStatus !== "all") params.set("status", exportStatus)
      params.set("format", "json") // Always get JSON first, then convert

      const response = await fetch(`/api/products/export?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error("Export failed")
      }

      const data = await response.json()

      if (exportFormat === "xlsx") {
        // Create Excel file
        const worksheet = XLSX.utils.json_to_sheet(data.products.map((p: any) => ({
          "SKU": p.sku,
          "Nom": p.name,
          "Description": p.description,
          "Description courte": p.shortDescription,
          "Catégorie": p.categoryName,
          "ID Catégorie": p.categoryId,
          "Marque": p.brandName,
          "ID Marque": p.brandId,
          "Type": p.productType,
          "Prix HT": p.price,
          "Prix d'achat HT": p.costPrice,
          "Stock": p.stockQuantity,
          "Seuil stock bas": p.lowStockThreshold,
          "Statut": p.status,
          "Images": p.images,
          "Miniature": p.thumbnail,
        })))

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Produits")
        
        XLSX.writeFile(workbook, `produits-export-${new Date().toISOString().split("T")[0]}.xlsx`)
      } else {
        // CSV export
        const worksheet = XLSX.utils.json_to_sheet(data.products)
        const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: ";" })
        
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = `produits-export-${new Date().toISOString().split("T")[0]}.csv`
        link.click()
      }

      toast({
        title: "Export réussi",
        description: `${data.count} produits exportés`,
      })
    } catch (err: any) {
      toast({
        title: "Erreur d'export",
        description: err.message || "Une erreur est survenue lors de l'export",
        variant: "destructive",
      })
    } finally {
      setExporting(false)
    }
  }

  // Download template
  const downloadTemplate = () => {
    const templateData = [
      {
        "SKU": "EK-BTQ-0001",
        "Nom": "Exemple Produit",
        "Description": "Description détaillée du produit",
        "Description courte": "Description courte",
        "Catégorie": "Ordinateurs portables",
        "Marque": "Dell",
        "Type": "sale",
        "Prix HT": "1000",
        "Prix d'achat HT": "800",
        "Stock": "10",
        "Statut": "active",
        "Images": "https://example.com/image1.jpg, https://example.com/image2.jpg",
      },
    ]

    const worksheet = XLSX.utils.json_to_sheet(templateData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template")
    XLSX.writeFile(workbook, "template-import-produits.xlsx")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/catalogue/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Import / Export Produits</h1>
            <p className="text-gray-600">Importez ou exportez vos produits en masse</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </TabsTrigger>
        </TabsList>

        {/* IMPORT TAB */}
        <TabsContent value="import" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Importer un fichier
                </CardTitle>
                <CardDescription>
                  Formats acceptés: Excel (.xlsx, .xls) ou CSV
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium">
                      {selectedFile ? selectedFile.name : "Cliquez pour sélectionner un fichier"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      ou glissez-déposez votre fichier ici
                    </p>
                  </label>
                </div>

                {selectedFile && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewData([])
                        setImportResult(null)
                      }}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Preview */}
                {previewData.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Aperçu (5 premières lignes)</h4>
                    <div className="overflow-x-auto border rounded-lg">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            {Object.keys(previewData[0]).slice(0, 6).map((key) => (
                              <th key={key} className="px-3 py-2 text-left font-medium">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row, i) => (
                            <tr key={i} className="border-t">
                              {Object.values(row).slice(0, 6).map((val: any, j) => (
                                <td key={j} className="px-3 py-2 truncate max-w-[150px]">
                                  {String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Progress */}
                {importing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Import en cours...</span>
                      <span>{importProgress}%</span>
                    </div>
                    <Progress value={importProgress} />
                  </div>
                )}

                {/* Results */}
                {importResult && (
                  <Alert className={importResult.errors.length > 0 ? "border-yellow-500" : "border-green-500"}>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Import terminé</AlertTitle>
                    <AlertDescription className="space-y-2">
                      <div className="flex gap-4 mt-2">
                        <Badge variant="default" className="bg-green-500">
                          {importResult.created} créés
                        </Badge>
                        <Badge variant="default" className="bg-blue-500">
                          {importResult.updated} mis à jour
                        </Badge>
                        {importResult.errors.length > 0 && (
                          <Badge variant="destructive">
                            {importResult.errors.length} erreurs
                          </Badge>
                        )}
                      </div>
                      {importResult.errors.length > 0 && (
                        <div className="mt-4 max-h-40 overflow-y-auto">
                          <p className="font-medium text-sm mb-2">Erreurs:</p>
                          {importResult.errors.map((err, i) => (
                            <p key={i} className="text-sm text-red-600">
                              Ligne {err.row} (SKU: {err.sku}): {err.error}
                            </p>
                          ))}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleImport}
                    disabled={!selectedFile || importing}
                    className="flex-1"
                  >
                    {importing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Import en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Lancer l'import
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Options Section */}
            <Card>
              <CardHeader>
                <CardTitle>Options d'import</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Type de produit par défaut</Label>
                  <Select value={defaultProductType} onValueChange={(v: "sale" | "rent") => setDefaultProductType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Vente (Boutique)</SelectItem>
                      <SelectItem value="rent">Location (Catalogue)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Statut par défaut</Label>
                  <Select value={defaultStatus} onValueChange={(v: "active" | "draft") => setDefaultStatus(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="createBrands"
                    checked={createBrands}
                    onCheckedChange={(checked) => setCreateBrands(checked as boolean)}
                  />
                  <Label htmlFor="createBrands" className="text-sm">
                    Créer les marques automatiquement
                  </Label>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full" onClick={downloadTemplate}>
                    <FileText className="h-4 w-4 mr-2" />
                    Télécharger le template
                  </Button>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Colonnes reconnues</AlertTitle>
                  <AlertDescription className="text-xs mt-2">
                    SKU, Nom, Description, Catégorie, Marque, Type, Prix HT, Prix d'achat, Stock, Statut, Images
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* EXPORT TAB */}
        <TabsContent value="export" className="space-y-6">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Exporter les produits
              </CardTitle>
              <CardDescription>
                Téléchargez vos produits au format Excel ou CSV
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type de produit</Label>
                  <Select value={exportProductType} onValueChange={setExportProductType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="sale">Vente uniquement</SelectItem>
                      <SelectItem value="rent">Location uniquement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select value={exportCategory} onValueChange={setExportCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Select value={exportStatus} onValueChange={setExportStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="draft">Brouillons</SelectItem>
                      <SelectItem value="archived">Archivés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={exportFormat} onValueChange={(v: "csv" | "xlsx") => setExportFormat(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleExport}
                disabled={exporting}
                className="w-full"
              >
                {exporting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Export en cours...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger l'export
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

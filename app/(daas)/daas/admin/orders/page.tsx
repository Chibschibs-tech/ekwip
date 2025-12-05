"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  MoreVertical,
  Eye,
  Loader2,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderItem {
  id: string
  productId: string
  productName: string
  sku: string
  quantity: number
  price: number
  total: number
  rentalDuration?: number
}

interface Order {
  id: string
  orderNumber: string
  clientId: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  orderType: "rent" | "sale" | "quote"
  items: OrderItem[]
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
  paymentStatus: "pending" | "paid" | "partial" | "refunded"
  notes: string
  createdAt: string
}

const statusConfig = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Confirmé", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  processing: { label: "En cours", color: "bg-purple-100 text-purple-800", icon: Package },
  shipped: { label: "Expédié", color: "bg-indigo-100 text-indigo-800", icon: Truck },
  delivered: { label: "Livré", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Annulé", color: "bg-red-100 text-red-800", icon: XCircle },
}

const paymentStatusConfig = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Payé", color: "bg-green-100 text-green-800" },
  partial: { label: "Partiel", color: "bg-orange-100 text-orange-800" },
  refunded: { label: "Remboursé", color: "bg-red-100 text-red-800" },
}

export default function OrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        toast({ title: "Statut mis à jour", description: "Le statut de la commande a été modifié" })
        fetchOrders()
      }
    } catch (error) {
      toast({ title: "Erreur", description: "Une erreur est survenue", variant: "destructive" })
    }
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
      const matchesType = selectedType === "all" || order.orderType === selectedType
      return matchesSearch && matchesStatus && matchesType
    })
  }, [orders, searchTerm, selectedStatus, selectedType])

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing" || o.status === "confirmed").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      totalRevenue: orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0),
    }),
    [orders],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Commandes</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez les commandes et demandes de devis</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CA Encaissé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} DH</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par numéro de commande..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="processing">En cours</SelectItem>
                <SelectItem value="shipped">Expédié</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="rent">Location</SelectItem>
                <SelectItem value="sale">Vente</SelectItem>
                <SelectItem value="quote">Devis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Commande</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status]?.icon || Clock
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {order.orderType === "rent" ? "Location" : order.orderType === "sale" ? "Vente" : "Devis"}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.items?.length || 0} article(s)</TableCell>
                      <TableCell className="font-medium">{order.total?.toLocaleString() || 0} DH</TableCell>
                      <TableCell>
                        <Badge className={paymentStatusConfig[order.paymentStatus]?.color || ""}>
                          {paymentStatusConfig[order.paymentStatus]?.label || order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[order.status]?.color || ""}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[order.status]?.label || order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(order)
                                setViewDialogOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            {order.status === "pending" && (
                              <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "confirmed")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Confirmer
                              </DropdownMenuItem>
                            )}
                            {order.status === "confirmed" && (
                              <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                                <Package className="mr-2 h-4 w-4" />
                                Mettre en cours
                              </DropdownMenuItem>
                            )}
                            {order.status === "processing" && (
                              <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "shipped")}>
                                <Truck className="mr-2 h-4 w-4" />
                                Expédier
                              </DropdownMenuItem>
                            )}
                            {order.status === "shipped" && (
                              <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marquer livré
                              </DropdownMenuItem>
                            )}
                            {order.status !== "cancelled" && order.status !== "delivered" && (
                              <DropdownMenuItem
                                onClick={() => updateOrderStatus(order.id, "cancelled")}
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Annuler
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la commande {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">
                    {selectedOrder.orderType === "rent"
                      ? "Location"
                      : selectedOrder.orderType === "sale"
                        ? "Vente"
                        : "Devis"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Articles</p>
                <div className="border rounded-lg divide-y">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          SKU: {item.sku} | Qté: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{item.total?.toLocaleString()} DH</p>
                    </div>
                  )) || <p className="p-3 text-gray-500">Aucun article</p>}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Sous-total</span>
                  <span>{selectedOrder.subtotal?.toLocaleString() || 0} DH</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>TVA</span>
                  <span>{selectedOrder.taxAmount?.toLocaleString() || 0} DH</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Remise</span>
                    <span>-{selectedOrder.discountAmount?.toLocaleString()} DH</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{selectedOrder.total?.toLocaleString() || 0} DH</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

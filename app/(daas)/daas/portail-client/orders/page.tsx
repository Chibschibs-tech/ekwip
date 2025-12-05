import Link from "next/link"
import {
  ShoppingCart,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrdersPage() {
  // Mock data for orders
  const orders = [
    {
      id: "ORD-2023-001",
      date: "10 Oct 2023",
      items: [
        { name: 'MacBook Pro 16"', quantity: 2 },
        { name: "iPhone 14 Pro", quantity: 3 },
      ],
      total: "4,250 MAD/mois",
      status: "Livré",
      paymentStatus: "Payé",
      deliveryDate: "15 Oct 2023",
    },
    {
      id: "ORD-2023-002",
      date: "15 Oct 2023",
      items: [
        { name: "Dell XPS 15", quantity: 1 },
        { name: "Surface Pro 9", quantity: 2 },
      ],
      total: "2,800 MAD/mois",
      status: "En cours",
      paymentStatus: "Payé",
      deliveryDate: "Prévu le 22 Oct 2023",
    },
    {
      id: "ORD-2023-003",
      date: "18 Oct 2023",
      items: [{ name: 'iMac 27"', quantity: 1 }],
      total: "1,500 MAD/mois",
      status: "En préparation",
      paymentStatus: "En attente",
      deliveryDate: "Prévu le 25 Oct 2023",
    },
    {
      id: "ORD-2023-004",
      date: "20 Oct 2023",
      items: [
        { name: 'iPad Pro 12.9"', quantity: 2 },
        { name: "Magic Keyboard", quantity: 2 },
        { name: "Apple Pencil", quantity: 2 },
      ],
      total: "2,100 MAD/mois",
      status: "Confirmé",
      paymentStatus: "En attente",
      deliveryDate: "Prévu le 27 Oct 2023",
    },
    {
      id: "ORD-2023-005",
      date: "22 Oct 2023",
      items: [{ name: "ThinkPad X1 Carbon", quantity: 3 }],
      total: "3,300 MAD/mois",
      status: "En attente",
      paymentStatus: "Non payé",
      deliveryDate: "À confirmer",
    },
  ]

  // Orders summary
  const summary = [
    { title: "Total des commandes", value: "12", icon: ShoppingCart, color: "text-blue-500" },
    { title: "En cours", value: "3", icon: Clock, color: "text-amber-500" },
    { title: "Livrées", value: "8", icon: CheckCircle, color: "text-emerald-500" },
    { title: "Annulées", value: "1", icon: XCircle, color: "text-rose-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des commandes</h1>
          <p className="text-muted-foreground">Suivez toutes vos commandes d'équipements</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summary.map((item, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher une commande..." className="w-full pl-8" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="delivered">Livré</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="preparing">En préparation</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="unpaid">Non payé</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des commandes</CardTitle>
          <CardDescription>Historique de toutes vos commandes d'équipements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Numéro</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Équipements</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Livraison</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="max-w-[250px]">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.status === "Livré"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : order.status === "En cours"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : order.status === "En préparation" || order.status === "Confirmé"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.paymentStatus === "Payé"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : order.paymentStatus === "En attente"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-rose-100 text-rose-800 hover:bg-rose-100"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/portail-client/orders/${order.id}`} className="flex w-full">
                            Voir les détails
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Télécharger la facture</DropdownMenuItem>
                        <DropdownMenuItem>Contacter le support</DropdownMenuItem>
                        {order.status === "En attente" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-rose-500">Annuler la commande</DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

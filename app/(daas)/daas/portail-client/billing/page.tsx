import {
  Receipt,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Calendar,
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

export default function BillingPage() {
  // Mock data for invoices
  const invoices = [
    {
      id: "INV-2023-001",
      date: "01 Oct 2023",
      dueDate: "15 Oct 2023",
      amount: "4,250 MAD",
      status: "Payé",
      paymentMethod: "Carte bancaire",
      paymentDate: "05 Oct 2023",
    },
    {
      id: "INV-2023-002",
      date: "01 Sep 2023",
      dueDate: "15 Sep 2023",
      amount: "4,250 MAD",
      status: "Payé",
      paymentMethod: "Virement bancaire",
      paymentDate: "10 Sep 2023",
    },
    {
      id: "INV-2023-003",
      date: "01 Aug 2023",
      dueDate: "15 Aug 2023",
      amount: "3,800 MAD",
      status: "Payé",
      paymentMethod: "Carte bancaire",
      paymentDate: "05 Aug 2023",
    },
    {
      id: "INV-2023-004",
      date: "01 Nov 2023",
      dueDate: "15 Nov 2023",
      amount: "4,250 MAD",
      status: "En attente",
      paymentMethod: "-",
      paymentDate: "-",
    },
    {
      id: "INV-2023-005",
      date: "01 Dec 2023",
      dueDate: "15 Dec 2023",
      amount: "4,250 MAD",
      status: "À venir",
      paymentMethod: "-",
      paymentDate: "-",
    },
  ]

  // Billing summary
  const summary = [
    { title: "Montant mensuel", value: "4,250 MAD", icon: Receipt, color: "text-blue-500" },
    { title: "Prochain paiement", value: "15 Nov 2023", icon: Calendar, color: "text-indigo-500" },
    { title: "Factures impayées", value: "1", icon: AlertCircle, color: "text-amber-500" },
    { title: "Factures payées", value: "3", icon: CheckCircle, color: "text-emerald-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Facturation</h1>
          <p className="text-muted-foreground">Gérez vos factures et paiements</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter l'historique
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700">
            <CreditCard className="mr-2 h-4 w-4" />
            Gérer les moyens de paiement
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
              <Input type="search" placeholder="Rechercher une facture..." className="w-full pl-8" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="upcoming">À venir</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="current-month">Mois en cours</SelectItem>
                  <SelectItem value="last-month">Mois dernier</SelectItem>
                  <SelectItem value="last-3-months">3 derniers mois</SelectItem>
                  <SelectItem value="last-6-months">6 derniers mois</SelectItem>
                  <SelectItem value="last-year">Année dernière</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Historique des factures</CardTitle>
          <CardDescription>Toutes vos factures et leur statut de paiement</CardDescription>
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
                <TableHead>Date d'échéance</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Moyen de paiement</TableHead>
                <TableHead>Date de paiement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        invoice.status === "Payé"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : invoice.status === "En attente"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.paymentDate}</TableCell>
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
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem>Télécharger (PDF)</DropdownMenuItem>
                        {invoice.status === "En attente" && (
                          <DropdownMenuItem className="text-ekwip">Payer maintenant</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Contacter le support</DropdownMenuItem>
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

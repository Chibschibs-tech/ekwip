import Link from "next/link"
import {
  TicketCheck,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function TicketsPage() {
  // Mock data for tickets
  const tickets = [
    {
      id: "TIK-2023-001",
      title: "Problème de connexion Wi-Fi sur MacBook Pro",
      equipment: 'MacBook Pro 16"',
      equipmentId: "EQ-001",
      priority: "Élevée",
      status: "Ouvert",
      createdBy: "John Doe",
      createdAt: "18 Oct 2023",
      lastUpdate: "20 Oct 2023",
    },
    {
      id: "TIK-2023-002",
      title: "Écran fissuré sur iPhone 14 Pro",
      equipment: "iPhone 14 Pro",
      equipmentId: "EQ-003",
      priority: "Moyenne",
      status: "En cours",
      createdBy: "Michael Brown",
      createdAt: "15 Oct 2023",
      lastUpdate: "19 Oct 2023",
    },
    {
      id: "TIK-2023-003",
      title: "Problème de batterie sur Dell XPS 15",
      equipment: "Dell XPS 15",
      equipmentId: "EQ-002",
      priority: "Élevée",
      status: "En attente",
      createdBy: "Sarah Johnson",
      createdAt: "12 Oct 2023",
      lastUpdate: "17 Oct 2023",
    },
    {
      id: "TIK-2023-004",
      title: "Mise à jour logicielle requise sur iMac",
      equipment: 'iMac 27"',
      equipmentId: "EQ-004",
      priority: "Basse",
      status: "Résolu",
      createdBy: "Emily Davis",
      createdAt: "05 Oct 2023",
      lastUpdate: "10 Oct 2023",
    },
    {
      id: "TIK-2023-005",
      title: "Clavier défectueux sur ThinkPad X1 Carbon",
      equipment: "ThinkPad X1 Carbon",
      equipmentId: "EQ-006",
      priority: "Moyenne",
      status: "Fermé",
      createdBy: "Robert Wilson",
      createdAt: "28 Sep 2023",
      lastUpdate: "05 Oct 2023",
    },
  ]

  // Tickets summary
  const summary = [
    { title: "Total des tickets", value: "12", icon: TicketCheck, color: "text-blue-500" },
    { title: "Tickets ouverts", value: "3", icon: AlertCircle, color: "text-amber-500" },
    { title: "Tickets en cours", value: "2", icon: Clock, color: "text-indigo-500" },
    { title: "Tickets résolus", value: "7", icon: CheckCircle, color: "text-emerald-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des tickets</h1>
          <p className="text-muted-foreground">Suivez et gérez vos demandes de support</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700">
            <Plus className="mr-2 h-4 w-4" />
            <Link href="/portail-client/tickets/create">Créer un ticket</Link>
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
              <Input type="search" placeholder="Rechercher un ticket..." className="w-full pl-8" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="open">Ouvert</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="resolved">Résolu</SelectItem>
                  <SelectItem value="closed">Fermé</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Équipement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les équipements</SelectItem>
                  <SelectItem value="macbook">MacBook Pro</SelectItem>
                  <SelectItem value="dell">Dell XPS</SelectItem>
                  <SelectItem value="iphone">iPhone</SelectItem>
                  <SelectItem value="imac">iMac</SelectItem>
                  <SelectItem value="thinkpad">ThinkPad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des tickets</CardTitle>
          <CardDescription>Tous vos tickets de support et leur statut</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Équipement</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créé par</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-xs text-muted-foreground">Dernière mise à jour: {ticket.lastUpdate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="/placeholder.svg" alt={ticket.equipment} />
                        <AvatarFallback>{ticket.equipment.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {ticket.equipment}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        ticket.priority === "Élevée"
                          ? "bg-rose-100 text-rose-800 hover:bg-rose-100"
                          : ticket.priority === "Moyenne"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        ticket.status === "Ouvert"
                          ? "bg-rose-100 text-rose-800 hover:bg-rose-100"
                          : ticket.status === "En cours"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : ticket.status === "En attente"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : ticket.status === "Résolu"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.createdBy}</TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
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
                          <Link href={`/portail-client/tickets/${ticket.id}`} className="flex w-full">
                            Voir les détails
                          </Link>
                        </DropdownMenuItem>
                        {(ticket.status === "Ouvert" || ticket.status === "En attente") && (
                          <DropdownMenuItem>Mettre à jour</DropdownMenuItem>
                        )}
                        {ticket.status === "Ouvert" && (
                          <DropdownMenuItem className="text-amber-500">Marquer comme urgent</DropdownMenuItem>
                        )}
                        {(ticket.status === "Ouvert" || ticket.status === "En attente") && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-rose-500">Fermer le ticket</DropdownMenuItem>
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

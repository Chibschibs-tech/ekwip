import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  User,
  CheckCircle,
  Download,
  MessageSquare,
  History,
  BarChart3,
  PenToolIcon as Tool,
  Edit,
  Mail,
  Phone,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const equipmentId = params.id

  // Mock equipment data
  const equipment = {
    id: equipmentId,
    name: 'MacBook Pro 16"',
    type: "Ordinateur portable",
    model: 'MacBook Pro 16" 2023',
    serialNumber: "FVFG87654HGFD",
    specifications: [
      { name: "Processeur", value: "Apple M2 Pro" },
      { name: "Mémoire", value: "16 GB" },
      { name: "Stockage", value: "512 GB SSD" },
      { name: "Écran", value: '16" Retina' },
      { name: "Système d'exploitation", value: "macOS Ventura" },
    ],
    status: "Actif",
    healthStatus: "Excellent",
    assignedTo: {
      name: "John Doe",
      email: "john.doe@acme.com",
      department: "Marketing",
      phone: "+212 6XX XX XX XX",
    },
    rentalPeriod: {
      startDate: "15 Jan 2023",
      endDate: "15 Jan 2024",
      remainingDays: 76,
      totalDays: 365,
      progress: 79,
    },
    maintenanceHistory: [
      {
        date: "10 Jul 2023",
        type: "Maintenance préventive",
        description: "Nettoyage interne et vérification du système",
        technician: "Mohammed Alami",
      },
      {
        date: "05 Apr 2023",
        type: "Mise à jour logicielle",
        description: "Mise à jour vers macOS Ventura 13.3",
        technician: "Système automatique",
      },
    ],
    ticketHistory: [
      {
        id: "TIK-2023-001",
        date: "18 Oct 2023",
        title: "Problème de connexion Wi-Fi",
        status: "Ouvert",
      },
    ],
    usageStats: {
      averageDaily: "8.5 heures",
      lastWeek: "42 heures",
      lastMonth: "180 heures",
    },
    notes:
      "Équipement en excellent état. Utilisé principalement pour le design graphique et la création de contenu marketing.",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href="/portail-client/equipment">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{equipment.name}</h1>
            <p className="text-muted-foreground">
              {equipment.id} • {equipment.type}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Tool className="mr-2 h-4 w-4" />
            Demander une maintenance
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Créer un ticket
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700" asChild>
            <Link href={`/portail-client/equipment/${equipmentId}/assign`}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier l'assignation
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Equipment status */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Statut de l'équipement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src="/placeholder.svg" alt={equipment.name} />
                  <AvatarFallback>{equipment.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold">{equipment.name}</h2>
                    <Badge variant="outline" className="ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                      {equipment.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{equipment.model}</p>
                  <p className="text-sm">S/N: {equipment.serialNumber}</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    {equipment.healthStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">État de l'équipement</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Période de location</span>
                  <span className="text-sm text-muted-foreground">
                    {equipment.rentalPeriod.remainingDays} jours restants
                  </span>
                </div>
                <Progress value={equipment.rentalPeriod.progress} className="h-2" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Début: {equipment.rentalPeriod.startDate}</span>
                  <span className="text-xs text-muted-foreground">Fin: {equipment.rentalPeriod.endDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm font-medium">Assigné à</span>
                  </div>
                  <p className="font-medium">{equipment.assignedTo.name}</p>
                  <p className="text-xs text-muted-foreground">{equipment.assignedTo.department}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm font-medium">Date de fin</span>
                  </div>
                  <p className="font-medium">{equipment.rentalPeriod.endDate}</p>
                  <p className="text-xs text-muted-foreground">Renouvellement automatique</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <History className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm font-medium">Dernière maintenance</span>
                  </div>
                  <p className="font-medium">{equipment.maintenanceHistory[0].date}</p>
                  <p className="text-xs text-muted-foreground">{equipment.maintenanceHistory[0].type}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm font-medium">Utilisation</span>
                  </div>
                  <p className="font-medium">{equipment.usageStats.averageDaily}</p>
                  <p className="text-xs text-muted-foreground">Moyenne quotidienne</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spécifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipment.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">{spec.name}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Télécharger la fiche technique
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Tabs for history, usage, etc. */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="usage">Utilisation</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historique de maintenance</CardTitle>
              <CardDescription>Toutes les opérations de maintenance effectuées sur cet équipement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Technicien</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipment.maintenanceHistory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.technician}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historique des tickets</CardTitle>
              <CardDescription>Tickets de support liés à cet équipement</CardDescription>
            </CardHeader>
            <CardContent>
              {equipment.ticketHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Titre</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipment.ticketHistory.map((ticket, index) => (
                      <TableRow key={index}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.date}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              ticket.status === "Ouvert"
                                ? "bg-rose-100 text-rose-800 hover:bg-rose-100"
                                : ticket.status === "En cours"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : ticket.status === "Résolu"
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/portail-client/tickets/${ticket.id}`}>Voir</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Aucun ticket n'a été créé pour cet équipement</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques d'utilisation</CardTitle>
              <CardDescription>Données d'utilisation de cet équipement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-4 text-muted-foreground">Graphique d'utilisation de l'équipement</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Utilisation quotidienne</p>
                  <p className="text-2xl font-bold mt-1">{equipment.usageStats.averageDaily}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Dernière semaine</p>
                  <p className="text-2xl font-bold mt-1">{equipment.usageStats.lastWeek}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Dernier mois</p>
                  <p className="text-2xl font-bold mt-1">{equipment.usageStats.lastMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
              <CardDescription>Informations supplémentaires sur cet équipement</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{equipment.notes}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Modifier les notes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assigned user */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Utilisateur assigné</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src="/placeholder.svg" alt={equipment.assignedTo.name} />
              <AvatarFallback>{equipment.assignedTo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{equipment.assignedTo.name}</p>
              <p className="text-sm text-muted-foreground">{equipment.assignedTo.department}</p>
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/portail-client/equipment/${equipmentId}/assign`}>Modifier</Link>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{equipment.assignedTo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{equipment.assignedTo.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

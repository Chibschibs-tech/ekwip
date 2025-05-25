import Link from "next/link"
import { Package, Search, Filter, Plus, MoreHorizontal, ArrowUpDown, Download, Upload } from "lucide-react"
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

export default function EquipmentPage() {
  // Mock data for equipment
  const equipmentItems = [
    {
      id: "EQ-001",
      name: 'MacBook Pro 16"',
      type: "Ordinateur portable",
      status: "Actif",
      assignedTo: "John Doe",
      department: "Marketing",
      startDate: "15 Jan 2023",
      endDate: "15 Jan 2024",
      healthStatus: "Excellent",
    },
    {
      id: "EQ-002",
      name: "Dell XPS 15",
      type: "Ordinateur portable",
      status: "Actif",
      assignedTo: "Sarah Johnson",
      department: "Finance",
      startDate: "22 Feb 2023",
      endDate: "22 Feb 2024",
      healthStatus: "Bon",
    },
    {
      id: "EQ-003",
      name: "iPhone 14 Pro",
      type: "Smartphone",
      status: "Actif",
      assignedTo: "Michael Brown",
      department: "Ventes",
      startDate: "10 Mar 2023",
      endDate: "10 Mar 2024",
      healthStatus: "Excellent",
    },
    {
      id: "EQ-004",
      name: 'iMac 27"',
      type: "Ordinateur de bureau",
      status: "Actif",
      assignedTo: "Emily Davis",
      department: "Design",
      startDate: "05 Apr 2023",
      endDate: "05 Apr 2024",
      healthStatus: "Bon",
    },
    {
      id: "EQ-005",
      name: 'iPad Pro 12.9"',
      type: "Tablette",
      status: "En maintenance",
      assignedTo: "Non assigné",
      department: "-",
      startDate: "20 May 2023",
      endDate: "20 May 2024",
      healthStatus: "Maintenance",
    },
    {
      id: "EQ-006",
      name: "ThinkPad X1 Carbon",
      type: "Ordinateur portable",
      status: "Actif",
      assignedTo: "Robert Wilson",
      department: "IT",
      startDate: "12 Jun 2023",
      endDate: "12 Jun 2024",
      healthStatus: "Excellent",
    },
    {
      id: "EQ-007",
      name: "Samsung Galaxy S23",
      type: "Smartphone",
      status: "Actif",
      assignedTo: "Jennifer Lee",
      department: "Ventes",
      startDate: "08 Jul 2023",
      endDate: "08 Jul 2024",
      healthStatus: "Bon",
    },
    {
      id: "EQ-008",
      name: "Surface Pro 9",
      type: "Tablette",
      status: "Inactif",
      assignedTo: "Non assigné",
      department: "-",
      startDate: "-",
      endDate: "-",
      healthStatus: "-",
    },
  ]

  // Equipment summary
  const summary = [
    { title: "Total des équipements", value: "24", icon: Package, color: "text-blue-500" },
    { title: "Équipements actifs", value: "20", icon: Package, color: "text-emerald-500" },
    { title: "En maintenance", value: "2", icon: Package, color: "text-amber-500" },
    { title: "Inactifs", value: "2", icon: Package, color: "text-gray-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des équipements</h1>
          <p className="text-muted-foreground">Gérez tous vos équipements loués avec Ekwip</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700">
            <Plus className="mr-2 h-4 w-4" />
            Demander un équipement
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
              <Input type="search" placeholder="Rechercher un équipement..." className="w-full pl-8" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="laptop">Ordinateur portable</SelectItem>
                  <SelectItem value="desktop">Ordinateur de bureau</SelectItem>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="tablet">Tablette</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="maintenance">En maintenance</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="sales">Ventes</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des équipements</CardTitle>
          <CardDescription>Tous les équipements actuellement loués par votre entreprise</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Équipement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Période
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>État</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipmentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" alt={item.name} />
                        <AvatarFallback>{item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "Actif"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : item.status === "En maintenance"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    {item.startDate !== "-" ? (
                      <div className="text-xs">
                        <div>{item.startDate}</div>
                        <div className="text-muted-foreground">à {item.endDate}</div>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.healthStatus === "Excellent"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : item.healthStatus === "Bon"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : item.healthStatus === "Maintenance"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {item.healthStatus}
                    </Badge>
                  </TableCell>
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
                          <Link href={`/portail-client/equipment/${item.id}`} className="flex w-full">
                            Voir les détails
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/portail-client/equipment/${item.id}/assign`} className="flex w-full">
                            Assigner
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Créer un ticket</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-rose-500">Signaler un problème</DropdownMenuItem>
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

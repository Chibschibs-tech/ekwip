import { Users, Search, Filter, MoreHorizontal, ArrowUpDown, UserPlus, Mail, Phone, Shield, User } from "lucide-react"
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

export default function UsersPage() {
  // Mock data for users
  const users = [
    {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@acme.com",
      role: "Admin",
      department: "IT",
      phone: "+212 6XX XX XX XX",
      status: "Actif",
      equipmentCount: 2,
      lastLogin: "Il y a 2 heures",
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@acme.com",
      role: "Utilisateur",
      department: "Finance",
      phone: "+212 6XX XX XX XX",
      status: "Actif",
      equipmentCount: 1,
      lastLogin: "Il y a 1 jour",
    },
    {
      id: "USR-003",
      name: "Michael Brown",
      email: "michael.brown@acme.com",
      role: "Utilisateur",
      department: "Ventes",
      phone: "+212 6XX XX XX XX",
      status: "Actif",
      equipmentCount: 2,
      lastLogin: "Il y a 3 heures",
    },
    {
      id: "USR-004",
      name: "Emily Davis",
      email: "emily.davis@acme.com",
      role: "Manager",
      department: "Design",
      phone: "+212 6XX XX XX XX",
      status: "Actif",
      equipmentCount: 1,
      lastLogin: "Il y a 5 jours",
    },
    {
      id: "USR-005",
      name: "Robert Wilson",
      email: "robert.wilson@acme.com",
      role: "Utilisateur",
      department: "IT",
      phone: "+212 6XX XX XX XX",
      status: "Inactif",
      equipmentCount: 0,
      lastLogin: "Il y a 30 jours",
    },
    {
      id: "USR-006",
      name: "Jennifer Lee",
      email: "jennifer.lee@acme.com",
      role: "Utilisateur",
      department: "Ventes",
      phone: "+212 6XX XX XX XX",
      status: "Actif",
      equipmentCount: 1,
      lastLogin: "Il y a 2 jours",
    },
  ]

  // Users summary
  const summary = [
    { title: "Total des utilisateurs", value: "12", icon: Users, color: "text-blue-500" },
    { title: "Administrateurs", value: "1", icon: Shield, color: "text-indigo-500" },
    { title: "Managers", value: "3", icon: User, color: "text-amber-500" },
    { title: "Utilisateurs", value: "8", icon: User, color: "text-emerald-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs de votre entreprise</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Inviter par email
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
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
              <Input type="search" placeholder="Rechercher un utilisateur..." className="w-full pl-8" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">Utilisateur</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="sales">Ventes</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des utilisateurs</CardTitle>
          <CardDescription>Tous les utilisateurs de votre entreprise</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Équipements</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Dernière connexion
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === "Admin"
                          ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                          : user.role === "Manager"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.status === "Actif"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.equipmentCount}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
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
                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Voir les équipements</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "Actif" ? (
                          <DropdownMenuItem className="text-amber-500">Désactiver</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-emerald-500">Activer</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-rose-500">Supprimer</DropdownMenuItem>
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

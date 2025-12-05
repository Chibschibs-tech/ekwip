import Link from "next/link"
import {
  Package,
  ShoppingCart,
  Receipt,
  TicketCheck,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  BarChart3,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Équipements actifs",
      value: "24",
      change: "+2",
      changeType: "increase",
      icon: Package,
      color: "text-blue-500",
      link: "/portail-client/equipment",
    },
    {
      title: "Commandes en cours",
      value: "3",
      change: "+1",
      changeType: "increase",
      icon: ShoppingCart,
      color: "text-indigo-500",
      link: "/portail-client/orders",
    },
    {
      title: "Factures impayées",
      value: "2",
      change: "-1",
      changeType: "decrease",
      icon: Receipt,
      color: "text-amber-500",
      link: "/portail-client/billing",
    },
    {
      title: "Tickets ouverts",
      value: "3",
      change: "+2",
      changeType: "increase",
      icon: TicketCheck,
      color: "text-rose-500",
      link: "/portail-client/tickets",
    },
    {
      title: "Utilisateurs actifs",
      value: "12",
      change: "0",
      changeType: "neutral",
      icon: Users,
      color: "text-emerald-500",
      link: "/portail-client/users",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "equipment",
      title: "Nouvel équipement ajouté",
      description: 'MacBook Pro 16" a été ajouté à votre inventaire',
      time: "Il y a 2 heures",
      icon: Package,
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "order",
      title: "Commande confirmée",
      description: "Commande #ORD-2023-004 a été confirmée",
      time: "Il y a 5 heures",
      icon: ShoppingCart,
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 3,
      type: "ticket",
      title: "Nouveau ticket créé",
      description: "Ticket #TIK-2023-007 a été créé par John Doe",
      time: "Il y a 1 jour",
      icon: TicketCheck,
      iconColor: "bg-rose-100 text-rose-600",
    },
    {
      id: 4,
      type: "billing",
      title: "Facture payée",
      description: "Facture #INV-2023-012 a été payée",
      time: "Il y a 2 jours",
      icon: Receipt,
      iconColor: "bg-amber-100 text-amber-600",
    },
    {
      id: 5,
      type: "user",
      title: "Nouvel utilisateur ajouté",
      description: "Sarah Johnson a été ajoutée à votre équipe",
      time: "Il y a 3 jours",
      icon: Users,
      iconColor: "bg-emerald-100 text-emerald-600",
    },
  ]

  const upcomingRenewals = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      renewalDate: "15 Nov 2023",
      daysLeft: 12,
      status: "approaching",
    },
    {
      id: 2,
      name: "Dell XPS 15",
      renewalDate: "22 Nov 2023",
      daysLeft: 19,
      status: "approaching",
    },
    {
      id: 3,
      name: "iPhone 14 Pro",
      renewalDate: "5 Nov 2023",
      daysLeft: 2,
      status: "urgent",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue dans votre portail client Ekwip.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Octobre 2023
          </Button>
          <Button size="sm" className="bg-ekwip hover:bg-ekwip-700">
            <BarChart3 className="mr-2 h-4 w-4" />
            Rapports
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center pt-1 text-xs">
                {stat.changeType === "increase" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                ) : stat.changeType === "decrease" ? (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
                ) : (
                  <span className="mr-1">•</span>
                )}
                <span
                  className={
                    stat.changeType === "increase"
                      ? "text-emerald-500"
                      : stat.changeType === "decrease"
                        ? "text-rose-500"
                        : "text-gray-500"
                  }
                >
                  {stat.change} depuis le mois dernier
                </span>
              </div>
              <div className="mt-3">
                <Link href={stat.link}>
                  <Button variant="ghost" size="sm" className="h-8 w-full justify-start px-2 text-xs">
                    Voir détails
                    <ArrowUpRight className="ml-auto h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent activity */}
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg">Activité récente</CardTitle>
            <CardDescription>Les dernières activités sur votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className={`${activity.iconColor} p-2 rounded-full mr-4`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" className="text-xs">
                Voir toutes les activités
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming renewals */}
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Renouvellements à venir</CardTitle>
            <CardDescription>Équipements dont le renouvellement approche</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRenewals.map((renewal) => (
                <div key={renewal.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={renewal.name} />
                      <AvatarFallback>{renewal.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{renewal.name}</p>
                      <p className="text-xs text-muted-foreground">Renouvellement: {renewal.renewalDate}</p>
                    </div>
                  </div>
                  <Badge
                    variant={renewal.status === "urgent" ? "destructive" : "outline"}
                    className={renewal.status === "urgent" ? "" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}
                  >
                    {renewal.daysLeft} jours
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" className="text-xs">
                Voir tous les renouvellements
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage chart */}
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="text-lg">Utilisation des équipements</CardTitle>
              <CardDescription>Répartition de l'utilisation de vos équipements par département</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                Mensuel
              </Button>
              <Button variant="outline" size="sm">
                Annuel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full flex items-center justify-center">
              <Activity className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-4 text-muted-foreground">Graphique d'utilisation des équipements</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { mockDashboardStats, mockSalesData, mockOrders } from "@/lib/mock-data"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const stats = mockDashboardStats

  const statCards = [
    {
      title: "Chiffre d'affaires",
      value: `${stats.revenue.total.toLocaleString("fr-MA")} DH`,
      change: stats.revenue.change,
      icon: <DollarSign className="h-6 w-6" />,
      color: "text-green-600",
    },
    {
      title: "Commandes",
      value: stats.orders.total.toLocaleString("fr-MA"),
      change: stats.orders.change,
      icon: <ShoppingCart className="h-6 w-6" />,
      color: "text-blue-600",
    },
    {
      title: "Clients",
      value: stats.customers.total.toLocaleString("fr-MA"),
      change: stats.customers.change,
      icon: <Users className="h-6 w-6" />,
      color: "text-purple-600",
    },
    {
      title: "Produits",
      value: stats.products.total.toLocaleString("fr-MA"),
      change: stats.products.change,
      icon: <Package className="h-6 w-6" />,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-600">Aperçu de votre activité</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-600">
                {stat.change > 0 ? (
                  <>
                    <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
                    <span className="text-green-600">+{stat.change}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="mr-1 h-4 w-4 text-red-600" />
                    <span className="text-red-600">{stat.change}%</span>
                  </>
                )}
                <span className="ml-1">vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des ventes</CardTitle>
            <CardDescription>Chiffre d'affaires des 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString("fr-FR")} />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString("fr-MA")} DH`, "Chiffre d'affaires"]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString("fr-FR")}
                />
                <Line type="monotone" dataKey="revenue" stroke="#1f3b57" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Dernières commandes passées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <div className="font-medium">{order.orderNumber}</div>
                    <div className="text-sm text-gray-600">{order.customerName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.total.toLocaleString("fr-MA")} DH</div>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full bg-transparent">
              Voir toutes les commandes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

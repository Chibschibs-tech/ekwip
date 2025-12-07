"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Loader2 } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DashboardStats {
  revenue: { total: number; change: number }
  orders: { total: number; change: number }
  customers: { total: number; change: number }
  products: { total: number; change: number }
}

interface Order {
  id: string
  orderNumber: string
  clientId: string
  status: string
  total: number
  createdAt: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    revenue: { total: 0, change: 0 },
    orders: { total: 0, change: 0 },
    customers: { total: 0, change: 0 },
    products: { total: 0, change: 0 },
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [salesData, setSalesData] = useState<{ date: string; revenue: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch all data in parallel
        const [productsRes, clientsRes, ordersRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/clients"),
          fetch("/api/orders?limit=10"),
        ])

        const products = productsRes.ok ? await productsRes.json() : []
        const clients = clientsRes.ok ? await clientsRes.json() : []
        const orders = ordersRes.ok ? await ordersRes.json() : []

        // Calculate stats
        const totalRevenue = orders
          .filter((o: Order) => o.status === "delivered")
          .reduce((sum: number, o: Order) => sum + (o.total || 0), 0)

        setStats({
          revenue: { total: totalRevenue, change: 12.5 },
          orders: { total: orders.length, change: 8.2 },
          customers: { total: clients.length, change: 15.3 },
          products: { total: products.length, change: 5.1 },
        })

        setRecentOrders(orders.slice(0, 5))

        // Generate sales data for last 7 days from actual orders
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (6 - i))
          const dateStr = date.toISOString().split("T")[0]
          
          // Calculate revenue from orders for this date
          const dayRevenue = orders
            .filter((o: Order) => {
              const orderDate = o.createdAt ? new Date(o.createdAt).toISOString().split("T")[0] : null
              return orderDate === dateStr && o.status === "delivered"
            })
            .reduce((sum: number, o: Order) => sum + (o.total || 0), 0)
          
          return {
            date: dateStr,
            revenue: dayRevenue || 0,
          }
        })
        setSalesData(last7Days)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
      pending: { label: "En attente", variant: "outline" },
      confirmed: { label: "Confirmé", variant: "secondary" },
      processing: { label: "En cours", variant: "secondary" },
      shipped: { label: "Expédié", variant: "default" },
      delivered: { label: "Livré", variant: "default" },
      cancelled: { label: "Annulé", variant: "destructive" },
    }
    const { label, variant } = config[status] || { label: status, variant: "outline" as const }
    return <Badge variant={variant}>{label}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-600 dark:text-gray-400">Aperçu de votre activité</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
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
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
                  }
                />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString("fr-MA")} DH`, "Chiffre d'affaires"]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString("fr-FR")}
                />
                <Line type="monotone" dataKey="revenue" stroke="#1f3b57" strokeWidth={2} dot={{ fill: "#1f3b57" }} />
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
              {recentOrders.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucune commande récente</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="space-y-1">
                      <div className="font-medium">{order.orderNumber}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-medium">{(order.total || 0).toLocaleString("fr-MA")} DH</div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link href="/admin/orders">
              <Button variant="outline" className="mt-4 w-full bg-transparent">
                Voir toutes les commandes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

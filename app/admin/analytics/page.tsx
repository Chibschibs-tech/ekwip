"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { TrendingUp, ShoppingCart, Users, Package, Loader2 } from "lucide-react"

const COLORS = ["#1f3b57", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("30")
  const [salesData, setSalesData] = useState<{ date: string; revenue: number; orders: number }[]>([])
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([])
  const [topProducts, setTopProducts] = useState<{ name: string; sales: number }[]>([])

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)

        // Generate mock analytics data
        const days = Number.parseInt(period)
        const sales = Array.from({ length: days }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (days - 1 - i))
          return {
            date: date.toISOString().split("T")[0],
            revenue: Math.floor(Math.random() * 80000) + 20000,
            orders: Math.floor(Math.random() * 20) + 5,
          }
        })
        setSalesData(sales)

        setCategoryData([
          { name: "Ordinateurs", value: 45 },
          { name: "Smartphones", value: 25 },
          { name: "Imprimantes", value: 15 },
          { name: "Accessoires", value: 10 },
          { name: "Autres", value: 5 },
        ])

        setTopProducts([
          { name: 'MacBook Pro 14"', sales: 45 },
          { name: "Dell XPS 15", sales: 38 },
          { name: "iPhone 15 Pro", sales: 32 },
          { name: "HP LaserJet Pro", sales: 28 },
          { name: 'iMac 24"', sales: 22 },
        ])
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [period])

  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0)
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

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
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Analysez les performances de votre boutique</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 derniers jours</SelectItem>
            <SelectItem value="30">30 derniers jours</SelectItem>
            <SelectItem value="90">90 derniers jours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString("fr-MA")} DH</div>
            <p className="text-xs text-gray-500">+12.5% vs période précédente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-gray-500">+8.2% vs période précédente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgOrderValue.toLocaleString("fr-MA", { maximumFractionDigits: 0 })} DH
            </div>
            <p className="text-xs text-gray-500">+5.1% vs période précédente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-gray-500">+0.5% vs période précédente</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du chiffre d'affaires</CardTitle>
            <CardDescription>Revenus et commandes sur la période</CardDescription>
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
                <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "revenue" ? `${value.toLocaleString()} DH` : value,
                    name === "revenue" ? "CA" : "Commandes",
                  ]}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#1f3b57" name="CA" strokeWidth={2} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  name="Commandes"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
            <CardDescription>Ventes par catégorie de produits</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, "Part"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Produits les plus vendus</CardTitle>
            <CardDescription>Top 5 des produits par nombre de ventes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="sales" fill="#1f3b57" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

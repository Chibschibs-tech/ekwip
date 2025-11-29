import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get current month stats
    const currentMonth = new Date()
    const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    const thisMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)

    // Revenue stats
    const currentRevenue = await sql`
      SELECT COALESCE(SUM(total), 0) as total FROM orders 
      WHERE created_at >= ${thisMonthStart.toISOString()} AND payment_status = 'paid'
    `
    const lastRevenue = await sql`
      SELECT COALESCE(SUM(total), 0) as total FROM orders 
      WHERE created_at >= ${lastMonth.toISOString()} AND created_at < ${thisMonthStart.toISOString()} AND payment_status = 'paid'
    `

    // Orders stats
    const currentOrders = await sql`
      SELECT COUNT(*) as count FROM orders WHERE created_at >= ${thisMonthStart.toISOString()}
    `
    const lastOrders = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE created_at >= ${lastMonth.toISOString()} AND created_at < ${thisMonthStart.toISOString()}
    `

    const currentClients = await sql`SELECT COUNT(*) as count FROM clients`
    const newClients = await sql`
      SELECT COUNT(*) as count FROM clients WHERE created_at >= ${thisMonthStart.toISOString()}
    `

    // Product stats
    const totalProducts = await sql`SELECT COUNT(*) as count FROM products WHERE status = 'active'`

    // Calculate changes
    const revenueChange =
      Number.parseFloat(lastRevenue[0].total) > 0
        ? ((Number.parseFloat(currentRevenue[0].total) - Number.parseFloat(lastRevenue[0].total)) /
            Number.parseFloat(lastRevenue[0].total)) *
          100
        : 0

    const ordersChange =
      Number.parseInt(lastOrders[0].count) > 0
        ? ((Number.parseInt(currentOrders[0].count) - Number.parseInt(lastOrders[0].count)) /
            Number.parseInt(lastOrders[0].count)) *
          100
        : 0

    const stats = {
      revenue: {
        total: Number.parseFloat(currentRevenue[0].total),
        change: Math.round(revenueChange * 10) / 10,
      },
      orders: {
        total: Number.parseInt(currentOrders[0].count),
        change: Math.round(ordersChange * 10) / 10,
      },
      customers: {
        total: Number.parseInt(currentClients[0].count),
        change: Number.parseInt(newClients[0].count),
      },
      products: {
        total: Number.parseInt(totalProducts[0].count),
        change: 0,
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}

import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = `SELECT * FROM customers WHERE 1=1`
    const params: any[] = []
    let paramIndex = 1

    if (status) {
      query += ` AND status = $${paramIndex++}`
      params.push(status)
    }

    if (search) {
      query += ` AND (first_name ILIKE $${paramIndex} OR last_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR company ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`
    params.push(limit, offset)

    const customers = await sql(query, params)

    // Get addresses for each customer
    const customerIds = customers.map((c: any) => c.id)
    const addresses =
      customerIds.length > 0 ? await sql`SELECT * FROM customer_addresses WHERE customer_id = ANY(${customerIds})` : []

    const addressesByCustomer = addresses.reduce((acc: any, addr: any) => {
      if (!acc[addr.customer_id]) acc[addr.customer_id] = []
      acc[addr.customer_id].push({
        id: addr.id,
        type: addr.address_type,
        fullName: addr.full_name,
        company: addr.company,
        address: addr.address,
        city: addr.city,
        postalCode: addr.postal_code,
        country: addr.country,
        phone: addr.phone,
        isDefault: addr.is_default,
      })
      return acc
    }, {})

    const transformedCustomers = customers.map((c: any) => ({
      id: c.id,
      firstName: c.first_name,
      lastName: c.last_name,
      email: c.email,
      phone: c.phone,
      company: c.company,
      taxId: c.tax_id,
      type: c.customer_type,
      status: c.status,
      totalOrders: c.total_orders,
      totalSpent: Number.parseFloat(c.total_spent || 0),
      averageOrderValue: c.total_orders > 0 ? Number.parseFloat(c.total_spent || 0) / c.total_orders : 0,
      notes: c.notes,
      tags: c.tags || [],
      addresses: addressesByCustomer[c.id] || [],
      createdAt: c.created_at,
      updatedAt: c.updated_at,
      lastOrderAt: c.last_order_at,
    }))

    return NextResponse.json(transformedCustomers)
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("cust")
    const now = formatDate()

    const result = await sql`
      INSERT INTO customers (
        id, first_name, last_name, email, phone, company, tax_id, customer_type, status, notes, tags, created_at, updated_at
      ) VALUES (
        ${id}, ${body.firstName}, ${body.lastName}, ${body.email}, ${body.phone || null},
        ${body.company || null}, ${body.taxId || null}, ${body.type || "individual"}, ${body.status || "active"},
        ${body.notes || null}, ${JSON.stringify(body.tags || [])}, ${now}, ${now}
      )
      RETURNING *
    `

    // Add addresses if provided
    if (body.addresses && body.addresses.length > 0) {
      for (const addr of body.addresses) {
        const addrId = generateId("addr")
        await sql`
          INSERT INTO customer_addresses (id, customer_id, address_type, full_name, company, address, city, postal_code, country, phone, is_default)
          VALUES (${addrId}, ${id}, ${addr.type || "billing"}, ${addr.fullName}, ${addr.company || null}, ${addr.address}, ${addr.city}, ${addr.postalCode || null}, ${addr.country || "Maroc"}, ${addr.phone || null}, ${addr.isDefault || false})
        `
      }
    }

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}

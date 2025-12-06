import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Use template strings with conditional logic for filters
    let clients
    if (status && search) {
      const searchTerm = `%${search}%`
      clients = await sql`
        SELECT * FROM clients
        WHERE status = ${status}
          AND (company_name ILIKE ${searchTerm} OR contact_name ILIKE ${searchTerm} OR email ILIKE ${searchTerm})
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (status) {
      clients = await sql`
        SELECT * FROM clients
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (search) {
      const searchTerm = `%${search}%`
      clients = await sql`
        SELECT * FROM clients
        WHERE company_name ILIKE ${searchTerm} 
           OR contact_name ILIKE ${searchTerm} 
           OR email ILIKE ${searchTerm}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      // No filters
      clients = await sql`
        SELECT * FROM clients
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    const transformedClients = clients.map((c: any) => ({
      id: c.id,
      companyName: c.company_name,
      contactName: c.contact_name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      city: c.city,
      postalCode: c.postal_code,
      country: c.country,
      taxId: c.tax_id,
      status: c.status,
      notes: c.notes,
      totalOrders: c.total_orders,
      totalSpent: c.total_spent ? Number.parseFloat(c.total_spent) : 0,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }))

    return NextResponse.json(transformedClients)
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("client")
    const now = formatDate()

    const result = await sql`
      INSERT INTO clients (
        id, company_name, contact_name, email, phone, address, city,
        postal_code, country, tax_id, status, notes, created_at, updated_at
      ) VALUES (
        ${id}, ${body.companyName}, ${body.contactName || null}, ${body.email},
        ${body.phone || null}, ${body.address || null}, ${body.city || null},
        ${body.postalCode || null}, ${body.country || "Maroc"}, ${body.taxId || null},
        ${body.status || "active"}, ${body.notes || null}, ${now}, ${now}
      )
      RETURNING *
    `

    const c = result[0]
    const transformedClient = {
      id: c.id,
      companyName: c.company_name,
      contactName: c.contact_name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      city: c.city,
      postalCode: c.postal_code,
      country: c.country,
      taxId: c.tax_id,
      status: c.status,
      notes: c.notes,
      totalOrders: c.total_orders,
      totalSpent: c.total_spent ? Number.parseFloat(c.total_spent) : 0,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }

    return NextResponse.json(transformedClient, { status: 201 })
  } catch (error) {
    console.error("Error creating client:", error)
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}

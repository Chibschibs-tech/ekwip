import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await sql`SELECT * FROM clients WHERE id = ${id}`

    if (result.length === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    const c = result[0]
    return NextResponse.json({
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
    })
  } catch (error) {
    console.error("Error fetching client:", error)
    return NextResponse.json({ error: "Failed to fetch client" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    const result = await sql`
      UPDATE clients SET
        company_name = COALESCE(${body.companyName}, company_name),
        contact_name = COALESCE(${body.contactName}, contact_name),
        email = COALESCE(${body.email}, email),
        phone = COALESCE(${body.phone}, phone),
        address = COALESCE(${body.address}, address),
        city = COALESCE(${body.city}, city),
        postal_code = COALESCE(${body.postalCode}, postal_code),
        country = COALESCE(${body.country}, country),
        tax_id = COALESCE(${body.taxId}, tax_id),
        status = COALESCE(${body.status}, status),
        notes = COALESCE(${body.notes}, notes),
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating client:", error)
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await sql`DELETE FROM clients WHERE id = ${id} RETURNING id`

    if (result.length === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting client:", error)
    return NextResponse.json({ error: "Failed to delete client" }, { status: 500 })
  }
}

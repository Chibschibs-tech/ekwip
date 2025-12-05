import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active")
    const search = searchParams.get("search")

    let query = `SELECT * FROM suppliers WHERE 1=1`
    const params: any[] = []
    let paramIndex = 1

    if (active === "true") {
      query += ` AND is_active = true`
    }

    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR contact_person ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    query += ` ORDER BY name ASC`

    const suppliers = await sql(query, params)

    const transformedSuppliers = suppliers.map((s: any) => ({
      id: s.id,
      name: s.name,
      code: s.code,
      email: s.email,
      phone: s.phone,
      website: s.website,
      address: s.address,
      city: s.city,
      contactPerson: s.contact_person,
      contactPhone: s.contact_phone,
      contactEmail: s.contact_email,
      taxId: s.tax_id,
      paymentTerms: s.payment_terms,
      notes: s.notes,
      tags: s.tags || [],
      isActive: s.is_active,
      createdAt: s.created_at,
      updatedAt: s.updated_at,
    }))

    return NextResponse.json(transformedSuppliers)
  } catch (error) {
    console.error("Error fetching suppliers:", error)
    return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("supp")
    const now = formatDate()

    const result = await sql`
      INSERT INTO suppliers (
        id, name, code, email, phone, website, address, city, contact_person, contact_phone, contact_email,
        tax_id, payment_terms, notes, tags, is_active, created_at, updated_at
      ) VALUES (
        ${id}, ${body.name}, ${body.code || null}, ${body.email || null}, ${body.phone || null},
        ${body.website || null}, ${body.address || null}, ${body.city || null},
        ${body.contactPerson || null}, ${body.contactPhone || null}, ${body.contactEmail || null},
        ${body.taxId || null}, ${body.paymentTerms || null}, ${body.notes || null},
        ${JSON.stringify(body.tags || [])}, ${body.isActive !== false}, ${now}, ${now}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating supplier:", error)
    return NextResponse.json({ error: "Failed to create supplier" }, { status: 500 })
  }
}

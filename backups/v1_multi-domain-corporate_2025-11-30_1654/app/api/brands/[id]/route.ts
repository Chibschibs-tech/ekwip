import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const result = await sql`SELECT * FROM brands WHERE id = ${id} OR slug = ${id}`

    if (result.length === 0) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    const b = result[0]
    return NextResponse.json({
      id: b.id,
      name: b.name,
      slug: b.slug,
      description: b.description,
      logo: b.logo,
      website: b.website,
      isActive: b.is_active,
      productCount: b.product_count,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    })
  } catch (error) {
    console.error("Error fetching brand:", error)
    return NextResponse.json({ error: "Failed to fetch brand" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    const result = await sql`
      UPDATE brands SET
        name = ${body.name},
        slug = ${body.slug},
        description = ${body.description || null},
        logo = ${body.logo || null},
        website = ${body.website || null},
        is_active = ${body.isActive !== false},
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating brand:", error)
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const products = await sql`SELECT COUNT(*) as count FROM products WHERE brand_id = ${id}`
    if (Number.parseInt(products[0].count) > 0) {
      return NextResponse.json({ error: "Cannot delete brand with products" }, { status: 400 })
    }

    const result = await sql`DELETE FROM brands WHERE id = ${id} RETURNING id`

    if (result.length === 0) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting brand:", error)
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 })
  }
}

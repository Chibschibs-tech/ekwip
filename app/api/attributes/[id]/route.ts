import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const result = await sql`SELECT * FROM attributes WHERE id = ${id} OR slug = ${id}`

    if (result.length === 0) {
      return NextResponse.json({ error: "Attribute not found" }, { status: 404 })
    }

    const a = result[0]
    return NextResponse.json({
      id: a.id,
      name: a.name,
      slug: a.slug,
      type: a.type,
      values: a.values || [],
      isRequired: a.is_required,
      isFilterable: a.is_filterable,
      isVariation: a.is_variation,
      order: a.sort_order,
      categories: a.categories || [],
      createdAt: a.created_at,
      updatedAt: a.updated_at,
    })
  } catch (error) {
    console.error("Error fetching attribute:", error)
    return NextResponse.json({ error: "Failed to fetch attribute" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    const result = await sql`
      UPDATE attributes SET
        name = ${body.name},
        slug = ${body.slug},
        type = ${body.type},
        values = ${JSON.stringify(body.values || [])},
        is_required = ${body.isRequired || false},
        is_filterable = ${body.isFilterable !== false},
        is_variation = ${body.isVariation || false},
        sort_order = ${body.order || 0},
        categories = ${JSON.stringify(body.categories || [])},
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Attribute not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating attribute:", error)
    return NextResponse.json({ error: "Failed to update attribute" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const result = await sql`DELETE FROM attributes WHERE id = ${id} RETURNING id`

    if (result.length === 0) {
      return NextResponse.json({ error: "Attribute not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting attribute:", error)
    return NextResponse.json({ error: "Failed to delete attribute" }, { status: 500 })
  }
}

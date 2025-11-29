import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const attributes = await sql`SELECT * FROM attributes ORDER BY sort_order ASC, name ASC`

    const transformedAttributes = attributes.map((a: any) => ({
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
    }))

    return NextResponse.json(transformedAttributes)
  } catch (error) {
    console.error("Error fetching attributes:", error)
    return NextResponse.json({ error: "Failed to fetch attributes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("attr")
    const now = formatDate()

    const result = await sql`
      INSERT INTO attributes (
        id, name, slug, type, values, is_required, is_filterable, is_variation, sort_order, categories, created_at, updated_at
      ) VALUES (
        ${id}, ${body.name}, ${body.slug}, ${body.type}, ${JSON.stringify(body.values || [])},
        ${body.isRequired || false}, ${body.isFilterable !== false}, ${body.isVariation || false},
        ${body.order || 0}, ${JSON.stringify(body.categories || [])}, ${now}, ${now}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating attribute:", error)
    return NextResponse.json({ error: "Failed to create attribute" }, { status: 500 })
  }
}

import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active")

    let query = `SELECT * FROM brands WHERE 1=1`

    if (active === "true") {
      query += ` AND is_active = true`
    }

    query += ` ORDER BY name ASC`

    const brands = await sql(query)

    const transformedBrands = brands.map((b: any) => ({
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
    }))

    return NextResponse.json(transformedBrands)
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("brand")
    const now = formatDate()

    const result = await sql`
      INSERT INTO brands (
        id, name, slug, description, logo, website, is_active, created_at, updated_at
      ) VALUES (
        ${id}, ${body.name}, ${body.slug}, ${body.description || null}, 
        ${body.logo || null}, ${body.website || null}, ${body.isActive !== false}, ${now}, ${now}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating brand:", error)
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 })
  }
}

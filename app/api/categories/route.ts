import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active")
    const parentId = searchParams.get("parentId")

    let query = `SELECT * FROM categories WHERE 1=1`
    const params: any[] = []
    let paramIndex = 1

    if (active === "true") {
      query += ` AND is_active = true`
    }

    if (parentId) {
      if (parentId === "null") {
        query += ` AND parent_id IS NULL`
      } else {
        query += ` AND parent_id = $${paramIndex++}`
        params.push(parentId)
      }
    }

    query += ` ORDER BY sort_order ASC, name ASC`

    const categories = await sql(query, params)

    // Transform to match frontend types
    const transformedCategories = categories.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      parentId: c.parent_id,
      image: c.image,
      icon: c.icon,
      order: c.sort_order,
      isActive: c.is_active,
      productCount: c.product_count,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }))

    return NextResponse.json(transformedCategories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("cat")
    const now = formatDate()

    const result = await sql`
      INSERT INTO categories (
        id, name, slug, description, parent_id, image, icon, sort_order, is_active, created_at, updated_at
      ) VALUES (
        ${id}, ${body.name}, ${body.slug}, ${body.description || null}, ${body.parentId || null}, 
        ${body.image || null}, ${body.icon || null}, ${body.order || 0}, ${body.isActive !== false}, ${now}, ${now}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

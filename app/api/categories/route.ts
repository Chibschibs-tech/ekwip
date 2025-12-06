import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active")
    const parentId = searchParams.get("parentId")

    // Use template strings for better compatibility
    let categories
    if (active === "true" && parentId) {
      if (parentId === "null") {
        categories = await sql`
          SELECT * FROM categories 
          WHERE is_active = true AND parent_id IS NULL
          ORDER BY sort_order ASC, name ASC
        `
      } else {
        categories = await sql`
          SELECT * FROM categories 
          WHERE is_active = true AND parent_id = ${parentId}
          ORDER BY sort_order ASC, name ASC
        `
      }
    } else if (active === "true") {
      categories = await sql`
        SELECT * FROM categories 
        WHERE is_active = true
        ORDER BY sort_order ASC, name ASC
      `
    } else if (parentId) {
      if (parentId === "null") {
        categories = await sql`
          SELECT * FROM categories 
          WHERE parent_id IS NULL
          ORDER BY sort_order ASC, name ASC
        `
      } else {
        categories = await sql`
          SELECT * FROM categories 
          WHERE parent_id = ${parentId}
          ORDER BY sort_order ASC, name ASC
        `
      }
    } else {
      // Get all categories
      categories = await sql`
        SELECT * FROM categories 
        ORDER BY sort_order ASC, name ASC
      `
    }

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

    const c = result[0]
    const transformedCategory = {
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
    }

    return NextResponse.json(transformedCategory, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

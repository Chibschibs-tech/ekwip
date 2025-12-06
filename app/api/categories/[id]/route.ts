import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const result = await sql`SELECT * FROM categories WHERE id = ${id} OR slug = ${id}`

    if (result.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const c = result[0]
    return NextResponse.json({
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
    })
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    const result = await sql`
      UPDATE categories SET
        name = ${body.name},
        slug = ${body.slug},
        description = ${body.description || null},
        parent_id = ${body.parentId || null},
        image = ${body.image || null},
        icon = ${body.icon || null},
        sort_order = ${body.order || 0},
        is_active = ${body.isActive !== false},
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const c = result[0]
    return NextResponse.json({
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
    })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Check if category has products
    const products = await sql`SELECT COUNT(*) as count FROM products WHERE category_id = ${id}`
    if (Number.parseInt(products[0].count) > 0) {
      return NextResponse.json({ error: "Cannot delete category with products" }, { status: 400 })
    }

    const result = await sql`DELETE FROM categories WHERE id = ${id} RETURNING id`

    if (result.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

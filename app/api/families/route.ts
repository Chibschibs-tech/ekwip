import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active")
    const withCategories = searchParams.get("withCategories")

    let families
    if (active === "true") {
      families = await sql`
        SELECT * FROM families 
        WHERE is_active = true
        ORDER BY sort_order ASC, name ASC
      `
    } else {
      families = await sql`
        SELECT * FROM families 
        ORDER BY sort_order ASC, name ASC
      `
    }

    // Transform to match frontend types
    let transformedFamilies = (families || []).map((f: any) => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      description: f.description,
      image: f.image,
      icon: f.icon,
      order: f.sort_order,
      isActive: f.is_active,
      createdAt: f.created_at,
      updatedAt: f.updated_at,
      categories: [] as any[],
    }))

    // If withCategories is requested, fetch categories for each family
    if (withCategories === "true") {
      const categories = await sql`
        SELECT c.*, f.name as family_name
        FROM categories c
        LEFT JOIN families f ON c.family_id = f.id
        WHERE c.family_id IS NOT NULL
        ORDER BY c.sort_order ASC, c.name ASC
      `

      const categoriesByFamily: Record<string, any[]> = {}
      for (const cat of categories) {
        if (!categoriesByFamily[cat.family_id]) {
          categoriesByFamily[cat.family_id] = []
        }
        categoriesByFamily[cat.family_id].push({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          parentId: cat.parent_id,
          familyId: cat.family_id,
          categoryType: cat.category_type,
          image: cat.image,
          icon: cat.icon,
          order: cat.sort_order,
          isActive: cat.is_active,
          productCount: cat.product_count || 0,
          createdAt: cat.created_at,
          updatedAt: cat.updated_at,
        })
      }

      transformedFamilies = transformedFamilies.map((f: any) => ({
        ...f,
        categories: categoriesByFamily[f.id] || [],
      }))
    }

    return NextResponse.json(transformedFamilies)
  } catch (error: any) {
    console.error("Error fetching families:", error)
    return NextResponse.json(
      { error: "Failed to fetch families", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("fam")
    const now = formatDate()

    const result = await sql`
      INSERT INTO families (
        id, name, slug, description, image, icon, sort_order, is_active, created_at, updated_at
      ) VALUES (
        ${id}, ${body.name}, ${body.slug}, ${body.description || null}, 
        ${body.image || null}, ${body.icon || null}, ${body.order || 0}, ${body.isActive !== false}, ${now}, ${now}
      )
      RETURNING *
    `

    const f = result[0]
    const transformedFamily = {
      id: f.id,
      name: f.name,
      slug: f.slug,
      description: f.description,
      image: f.image,
      icon: f.icon,
      order: f.sort_order,
      isActive: f.is_active,
      createdAt: f.created_at,
      updatedAt: f.updated_at,
      categories: [],
    }

    return NextResponse.json(transformedFamily, { status: 201 })
  } catch (error) {
    console.error("Error creating family:", error)
    return NextResponse.json({ error: "Failed to create family" }, { status: 500 })
  }
}

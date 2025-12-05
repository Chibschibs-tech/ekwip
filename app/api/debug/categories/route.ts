import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

/**
 * Debug endpoint to check categories in database
 * GET /api/debug/categories
 */
export async function GET() {
  try {
    const categories = await sql`
      SELECT id, name, slug, is_active, product_count, sort_order
      FROM categories
      ORDER BY sort_order ASC, name ASC
    `

    // Check for specific slug
    const targetSlug = "ordinateurs-portables"
    const foundCategory = categories.find((c: any) => c.slug === targetSlug)

    return NextResponse.json({
      success: true,
      total: categories.length,
      categories: categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        isActive: c.is_active,
        productCount: c.product_count,
      })),
      targetSlug: {
        requested: targetSlug,
        found: !!foundCategory,
        category: foundCategory
          ? {
              id: foundCategory.id,
              name: foundCategory.name,
              slug: foundCategory.slug,
              isActive: foundCategory.is_active,
              productCount: foundCategory.product_count,
            }
          : null,
      },
      similarSlugs: categories
        .filter((c: any) => c.slug.includes("portable") || c.slug.includes("ordinateur"))
        .map((c: any) => ({
          slug: c.slug,
          name: c.name,
          isActive: c.is_active,
        })),
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}


import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

/**
 * Debug endpoint to check brands in database
 * GET /api/debug/brands
 */
export async function GET() {
  try {
    const brands = await sql`
      SELECT id, name, slug, is_active, product_count
      FROM brands
      ORDER BY name ASC
    `

    return NextResponse.json({
      success: true,
      total: brands.length,
      brands: brands.map((b: any) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        isActive: b.is_active,
        productCount: b.product_count,
      })),
    })
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}


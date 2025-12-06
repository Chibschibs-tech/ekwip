import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

/**
 * Debug endpoint to check products in database
 * GET /api/debug/products
 */
export async function GET() {
  try {
    const products = await sql`
      SELECT id, name, slug, category_id, brand_id, product_type, status, stock_quantity
      FROM products
      ORDER BY created_at DESC
      LIMIT 20
    `

    return NextResponse.json({
      success: true,
      total: products.length,
      products: products.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        categoryId: p.category_id,
        brandId: p.brand_id,
        productType: p.product_type,
        status: p.status,
        stockQuantity: p.stock_quantity,
      })),
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}


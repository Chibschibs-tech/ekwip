import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const result = await sql`
      SELECT p.*, 
             c.name as category_name, 
             c.slug as category_slug,
             b.name as brand_name,
             b.logo as brand_logo
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.id = ${id} OR p.slug = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const p = result[0]
    const product = {
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      description: p.description,
      shortDescription: p.short_description,
      categoryId: p.category_id,
      categoryName: p.category_name,
      categorySlug: p.category_slug,
      brandId: p.brand_id,
      brandName: p.brand_name,
      brandLogo: p.brand_logo,
      productType: p.product_type,
      price: Number.parseFloat(p.price),
      compareAtPrice: p.compare_at_price ? Number.parseFloat(p.compare_at_price) : undefined,
      costPrice: p.cost_price ? Number.parseFloat(p.cost_price) : undefined,
      images: p.images || [],
      thumbnail: p.thumbnail,
      status: p.status,
      stockQuantity: p.stock_quantity,
      lowStockThreshold: p.low_stock_threshold,
      weight: p.weight ? Number.parseFloat(p.weight) : undefined,
      dimensions: p.dimensions,
      attributes: p.attributes || {},
      tags: p.tags || [],
      isFeatured: p.is_featured,
      rentalDurations: p.rental_durations,
      variations: p.variations,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    // Get original product to track category/brand changes
    const original = await sql`SELECT category_id, brand_id FROM products WHERE id = ${id}`
    const originalCategoryId = original[0]?.category_id
    const originalBrandId = original[0]?.brand_id

    const result = await sql`
      UPDATE products SET
        name = ${body.name},
        slug = ${body.slug},
        sku = ${body.sku},
        description = ${body.description},
        short_description = ${body.shortDescription},
        category_id = ${body.categoryId},
        brand_id = ${body.brandId},
        product_type = ${body.productType},
        price = ${body.price},
        compare_at_price = ${body.compareAtPrice || null},
        cost_price = ${body.costPrice || null},
        images = ${JSON.stringify(body.images || [])},
        thumbnail = ${body.thumbnail},
        status = ${body.status},
        stock_quantity = ${body.stockQuantity},
        low_stock_threshold = ${body.lowStockThreshold},
        weight = ${body.weight || null},
        dimensions = ${body.dimensions ? JSON.stringify(body.dimensions) : null},
        attributes = ${JSON.stringify(body.attributes || {})},
        tags = ${JSON.stringify(body.tags || [])},
        is_featured = ${body.isFeatured},
        rental_durations = ${body.rentalDurations ? JSON.stringify(body.rentalDurations) : null},
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Update category product counts if changed
    if (originalCategoryId !== body.categoryId) {
      if (originalCategoryId) {
        await sql`
          UPDATE categories 
          SET product_count = (SELECT COUNT(*) FROM products WHERE category_id = ${originalCategoryId} AND status = 'active')
          WHERE id = ${originalCategoryId}
        `
      }
      if (body.categoryId) {
        await sql`
          UPDATE categories 
          SET product_count = (SELECT COUNT(*) FROM products WHERE category_id = ${body.categoryId} AND status = 'active')
          WHERE id = ${body.categoryId}
        `
      }
    }

    // Update brand product counts if changed
    if (originalBrandId !== body.brandId) {
      if (originalBrandId) {
        await sql`
          UPDATE brands 
          SET product_count = (SELECT COUNT(*) FROM products WHERE brand_id = ${originalBrandId} AND status = 'active')
          WHERE id = ${originalBrandId}
        `
      }
      if (body.brandId) {
        await sql`
          UPDATE brands 
          SET product_count = (SELECT COUNT(*) FROM products WHERE brand_id = ${body.brandId} AND status = 'active')
          WHERE id = ${body.brandId}
        `
      }
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get product info before deleting
    const product = await sql`SELECT category_id, brand_id FROM products WHERE id = ${id}`

    const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Update category product count
    if (product[0]?.category_id) {
      await sql`
        UPDATE categories 
        SET product_count = (SELECT COUNT(*) FROM products WHERE category_id = ${product[0].category_id} AND status = 'active')
        WHERE id = ${product[0].category_id}
      `
    }

    // Update brand product count
    if (product[0]?.brand_id) {
      await sql`
        UPDATE brands 
        SET product_count = (SELECT COUNT(*) FROM products WHERE brand_id = ${product[0].brand_id} AND status = 'active')
        WHERE id = ${product[0].brand_id}
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

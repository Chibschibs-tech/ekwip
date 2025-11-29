import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const brandId = searchParams.get("brandId")
    const productType = searchParams.get("productType")
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = `
      SELECT p.*, 
             c.name as category_name, 
             c.slug as category_slug,
             b.name as brand_name,
             b.logo as brand_logo
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE 1=1
    `
    const params: any[] = []
    let paramIndex = 1

    if (categoryId) {
      query += ` AND p.category_id = $${paramIndex++}`
      params.push(categoryId)
    }

    if (brandId) {
      query += ` AND p.brand_id = $${paramIndex++}`
      params.push(brandId)
    }

    if (productType) {
      query += ` AND p.product_type = $${paramIndex++}`
      params.push(productType)
    }

    if (status) {
      query += ` AND p.status = $${paramIndex++}`
      params.push(status)
    }

    if (featured === "true") {
      query += ` AND p.is_featured = true`
    }

    if (search) {
      query += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex} OR p.sku ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    query += ` ORDER BY p.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`
    params.push(limit, offset)

    const products = await sql(query, params)

    // Transform to match frontend types
    const transformedProducts = products.map((p: any) => ({
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
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("prod")
    const now = formatDate()

    const result = await sql`
      INSERT INTO products (
        id, name, slug, sku, description, short_description,
        category_id, brand_id, product_type, price, compare_at_price, cost_price,
        images, thumbnail, status, stock_quantity, low_stock_threshold,
        weight, dimensions, attributes, tags, is_featured, rental_durations,
        created_at, updated_at
      ) VALUES (
        ${id}, ${body.name}, ${body.slug}, ${body.sku}, ${body.description}, ${body.shortDescription},
        ${body.categoryId}, ${body.brandId}, ${body.productType}, ${body.price}, ${body.compareAtPrice || null}, ${body.costPrice || null},
        ${JSON.stringify(body.images || [])}, ${body.thumbnail}, ${body.status || "draft"}, ${body.stockQuantity || 0}, ${body.lowStockThreshold || 5},
        ${body.weight || null}, ${body.dimensions ? JSON.stringify(body.dimensions) : null}, ${JSON.stringify(body.attributes || {})}, ${JSON.stringify(body.tags || [])}, ${body.isFeatured || false}, ${body.rentalDurations ? JSON.stringify(body.rentalDurations) : null},
        ${now}, ${now}
      )
      RETURNING *
    `

    // Update category product count
    if (body.categoryId) {
      await sql`
        UPDATE categories 
        SET product_count = (SELECT COUNT(*) FROM products WHERE category_id = ${body.categoryId} AND status = 'active')
        WHERE id = ${body.categoryId}
      `
    }

    // Update brand product count
    if (body.brandId) {
      await sql`
        UPDATE brands 
        SET product_count = (SELECT COUNT(*) FROM products WHERE brand_id = ${body.brandId} AND status = 'active')
        WHERE id = ${body.brandId}
      `
    }

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

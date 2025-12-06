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

    // Build query using template strings - use conditional logic for filters
    let products

    // Simple case: no filters
    if (!categoryId && !brandId && !productType && !status && !featured && !search) {
      products = await sql`
        SELECT p.*, 
               c.name as category_name, 
               c.slug as category_slug,
               b.name as brand_name,
               b.logo as brand_logo
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      // Complex case with filters - build query with conditions
      // We'll use template strings with conditional SQL fragments
      let whereConditions: any[] = []
      let whereValues: any[] = []
      
      if (categoryId) {
        whereConditions.push(`p.category_id = $${whereConditions.length + 1}`)
        whereValues.push(categoryId)
      }
      if (brandId) {
        whereConditions.push(`p.brand_id = $${whereConditions.length + 1}`)
        whereValues.push(brandId)
      }
      if (productType) {
        whereConditions.push(`p.product_type = $${whereConditions.length + 1}`)
        whereValues.push(productType)
      }
      if (status) {
        whereConditions.push(`p.status = $${whereConditions.length + 1}`)
        whereValues.push(status)
      }
      if (featured === "true") {
        whereConditions.push(`p.is_featured = true`)
      }
      if (search) {
        const searchTerm = `%${search}%`
        whereConditions.push(`(p.name ILIKE $${whereConditions.length + 1} OR p.description ILIKE $${whereConditions.length + 2} OR p.sku ILIKE $${whereConditions.length + 3})`)
        whereValues.push(searchTerm, searchTerm, searchTerm)
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : ""
      
      // Add LIMIT and OFFSET as parameters
      whereValues.push(limit, offset)
      
      const query = `
        SELECT p.*, 
               c.name as category_name, 
               c.slug as category_slug,
               b.name as brand_name,
               b.logo as brand_logo
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        ${whereClause}
        ORDER BY p.created_at DESC
        LIMIT $${whereConditions.length + (search ? 4 : 1)} OFFSET $${whereConditions.length + (search ? 5 : 2)}
      `
      
      // Use sql with string query and parameters
      products = await sql(query as any, ...whereValues)
    }

    // Transform to match frontend types
    const transformedProducts = products.map((p: any) => {
      // Handle JSON fields that might be strings
      const parseJsonField = (field: any) => {
        if (!field) return field
        if (typeof field === "string") {
          try {
            return JSON.parse(field)
          } catch {
            return field
          }
        }
        return field
      }

      return {
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
        price: Number.parseFloat(p.price || 0),
        compareAtPrice: p.compare_at_price ? Number.parseFloat(p.compare_at_price) : undefined,
        costPrice: p.cost_price ? Number.parseFloat(p.cost_price) : undefined,
        images: parseJsonField(p.images) || [],
        thumbnail: p.thumbnail,
        status: p.status,
        stockQuantity: p.stock_quantity || 0,
        lowStockThreshold: p.low_stock_threshold || 5,
        weight: p.weight ? Number.parseFloat(p.weight) : undefined,
        dimensions: parseJsonField(p.dimensions),
        attributes: parseJsonField(p.attributes) || {},
        tags: parseJsonField(p.tags) || [],
        isFeatured: p.is_featured || false,
        rentalDurations: parseJsonField(p.rental_durations),
        variations: parseJsonField(p.variations),
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      }
    })

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

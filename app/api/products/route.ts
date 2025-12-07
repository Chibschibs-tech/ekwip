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
  } catch (error: any) {
    console.error("Error fetching products:", error)
    // If table doesn't exist or connection fails, return empty array
    if (error.message?.includes("does not exist") || error.message?.includes("connection")) {
      console.warn("Products table may not exist or database connection failed. Returning empty array.")
      return NextResponse.json([])
    }
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.sku || !body.productType || !body.price) {
      return NextResponse.json(
        { error: "Missing required fields: name, sku, productType, and price are required" },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    const id = generateId("prod")
    const now = formatDate()

    // Parse JSON fields that might be strings
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

    const images = body.images || []
    const attributes = body.attributes || {}
    const tags = body.tags || []
    const dimensions = body.dimensions || null
    const rentalDurations = body.rentalDurations || null

    // Truncate fields that have database length limits
    const truncate = (str: string | null | undefined, maxLength: number): string | null => {
      if (!str) return null
      if (str.length <= maxLength) return str
      console.warn(`Truncating field from ${str.length} to ${maxLength} characters: ${str.substring(0, 50)}...`)
      return str.substring(0, maxLength)
    }

    // Validate and truncate fields with VARCHAR limits
    const truncatedName = truncate(body.name, 255) || body.name
    const truncatedSlug = truncate(body.slug, 255) || body.slug
    const truncatedSku = truncate(body.sku, 100) || body.sku
    const truncatedThumbnail = truncate(body.thumbnail, 500)

    const result = await sql`
      INSERT INTO products (
        id, name, slug, sku, description, short_description,
        category_id, brand_id, product_type, price, compare_at_price, cost_price,
        images, thumbnail, status, stock_quantity, low_stock_threshold,
        weight, dimensions, attributes, tags, is_featured, rental_durations,
        created_at, updated_at
      ) VALUES (
        ${id}, ${truncatedName}, ${truncatedSlug}, ${truncatedSku}, ${body.description || null}, ${body.shortDescription || null},
        ${body.categoryId || null}, ${body.brandId || null}, ${body.productType}, ${body.price}, ${body.compareAtPrice || null}, ${body.costPrice || null},
        ${JSON.stringify(images)}, ${truncatedThumbnail}, ${body.status || "draft"}, ${body.stockQuantity || 0}, ${body.lowStockThreshold || 5},
        ${body.weight || null}, ${dimensions ? JSON.stringify(dimensions) : null}, ${JSON.stringify(attributes)}, ${JSON.stringify(tags)}, ${body.isFeatured || false}, ${rentalDurations ? JSON.stringify(rentalDurations) : null},
        ${now}, ${now}
      )
      RETURNING *
    `

    // Transform to match frontend types
    const p = result[0]
    const transformedProduct = {
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

    return NextResponse.json(transformedProduct, { status: 201 })
  } catch (error: any) {
    console.error("Error creating product:", error)
    const errorMessage = error?.message || "Failed to create product"
    const errorDetails = error?.detail || error?.code || ""
    return NextResponse.json(
      { 
        error: "Failed to create product",
        details: errorMessage,
        code: errorDetails
      },
      { status: 500 }
    )
  }
}

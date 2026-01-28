import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

// Helper function to create slug from name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { products, options } = body

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid products data" }, { status: 400 })
    }

    const results = {
      created: 0,
      updated: 0,
      errors: [] as { row: number; sku: string; error: string }[],
    }

    const now = formatDate()

    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const rowNumber = i + 2 // Account for header row

      try {
        // Validate required fields
        if (!product.sku) {
          results.errors.push({ row: rowNumber, sku: product.sku || "N/A", error: "SKU requis" })
          continue
        }
        if (!product.name) {
          results.errors.push({ row: rowNumber, sku: product.sku, error: "Nom requis" })
          continue
        }

        // Check if product with SKU exists
        const existingProduct = await sql`SELECT id FROM products WHERE sku = ${product.sku}`

        const slug = product.slug || createSlug(product.name)
        const price = parseFloat(product.price) || 0
        const costPrice = parseFloat(product.costPrice) || parseFloat(product.cost_price) || null
        const stockQuantity = parseInt(product.stockQuantity) || parseInt(product.stock) || 0
        const productType = product.productType || product.product_type || options?.defaultProductType || "sale"
        const status = product.status || options?.defaultStatus || "active"

        // Handle category lookup by name or ID
        let categoryId = product.categoryId || product.category_id || null
        if (!categoryId && product.categoryName) {
          const category = await sql`SELECT id FROM categories WHERE name ILIKE ${product.categoryName} OR slug = ${createSlug(product.categoryName)} LIMIT 1`
          if (category.length > 0) {
            categoryId = category[0].id
          }
        }

        // Handle brand lookup by name or ID
        let brandId = product.brandId || product.brand_id || null
        if (!brandId && product.brandName) {
          const brand = await sql`SELECT id FROM brands WHERE name ILIKE ${product.brandName} LIMIT 1`
          if (brand.length > 0) {
            brandId = brand[0].id
          } else if (options?.createBrands) {
            // Create brand if it doesn't exist
            const newBrandId = generateId("brand")
            await sql`
              INSERT INTO brands (id, name, slug, is_active, created_at, updated_at)
              VALUES (${newBrandId}, ${product.brandName}, ${createSlug(product.brandName)}, true, ${now}, ${now})
            `
            brandId = newBrandId
          }
        }

        // Parse images
        let images: string[] = []
        if (product.images) {
          if (Array.isArray(product.images)) {
            images = product.images
          } else if (typeof product.images === "string") {
            images = product.images.split(",").map((s: string) => s.trim()).filter(Boolean)
          }
        }

        // Parse attributes
        let attributes = {}
        if (product.attributes) {
          if (typeof product.attributes === "object") {
            attributes = product.attributes
          } else if (typeof product.attributes === "string") {
            try {
              attributes = JSON.parse(product.attributes)
            } catch {
              attributes = {}
            }
          }
        }

        if (existingProduct.length > 0) {
          // UPDATE existing product
          const productId = existingProduct[0].id

          await sql`
            UPDATE products SET
              name = ${product.name},
              slug = ${slug},
              description = ${product.description || null},
              short_description = ${product.shortDescription || product.short_description || null},
              category_id = ${categoryId},
              brand_id = ${brandId},
              product_type = ${productType},
              price = ${price},
              cost_price = ${costPrice},
              images = ${JSON.stringify(images)},
              thumbnail = ${product.thumbnail || images[0] || null},
              status = ${status},
              stock_quantity = ${stockQuantity},
              low_stock_threshold = ${parseInt(product.lowStockThreshold) || 5},
              attributes = ${JSON.stringify(attributes)},
              updated_at = ${now}
            WHERE id = ${productId}
          `
          results.updated++
        } else {
          // CREATE new product
          const newId = generateId("prod")

          // Make sure slug is unique
          let finalSlug = slug
          let slugCounter = 1
          while (true) {
            const existingSlug = await sql`SELECT id FROM products WHERE slug = ${finalSlug}`
            if (existingSlug.length === 0) break
            finalSlug = `${slug}-${slugCounter}`
            slugCounter++
          }

          await sql`
            INSERT INTO products (
              id, name, slug, sku, description, short_description,
              category_id, brand_id, product_type, price, cost_price,
              images, thumbnail, status, stock_quantity, low_stock_threshold,
              attributes, created_at, updated_at
            ) VALUES (
              ${newId}, ${product.name}, ${finalSlug}, ${product.sku},
              ${product.description || null}, ${product.shortDescription || product.short_description || null},
              ${categoryId}, ${brandId}, ${productType}, ${price}, ${costPrice},
              ${JSON.stringify(images)}, ${product.thumbnail || images[0] || null},
              ${status}, ${stockQuantity}, ${parseInt(product.lowStockThreshold) || 5},
              ${JSON.stringify(attributes)}, ${now}, ${now}
            )
          `
          results.created++
        }
      } catch (err: any) {
        console.error(`Error processing row ${rowNumber}:`, err)
        results.errors.push({
          row: rowNumber,
          sku: product.sku || "N/A",
          error: err.message || "Erreur inconnue",
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Import terminé: ${results.created} créés, ${results.updated} mis à jour, ${results.errors.length} erreurs`,
    })
  } catch (error: any) {
    console.error("Import error:", error)
    return NextResponse.json({ error: "Import failed", details: error.message }, { status: 500 })
  }
}

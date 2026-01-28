import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format") || "json"
    const productType = searchParams.get("productType") // "rent" | "sale" | null for all
    const categoryId = searchParams.get("categoryId")
    const brandId = searchParams.get("brandId")
    const status = searchParams.get("status")

    // Build query with filters
    let products
    if (productType && categoryId && status) {
      products = await sql`
        SELECT p.*, c.name as category_name, b.name as brand_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.product_type = ${productType} AND p.category_id = ${categoryId} AND p.status = ${status}
        ORDER BY p.created_at DESC
      `
    } else if (productType && categoryId) {
      products = await sql`
        SELECT p.*, c.name as category_name, b.name as brand_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.product_type = ${productType} AND p.category_id = ${categoryId}
        ORDER BY p.created_at DESC
      `
    } else if (productType && status) {
      products = await sql`
        SELECT p.*, c.name as category_name, b.name as brand_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.product_type = ${productType} AND p.status = ${status}
        ORDER BY p.created_at DESC
      `
    } else if (productType) {
      products = await sql`
        SELECT p.*, c.name as category_name, b.name as brand_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.product_type = ${productType}
        ORDER BY p.created_at DESC
      `
    } else if (categoryId) {
      products = await sql`
        SELECT p.*, c.name as category_name, b.name as brand_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.category_id = ${categoryId}
        ORDER BY p.created_at DESC
      `
    } else if (status) {
      products = await sql`
        SELECT p.*, c.name as category_name, b.name as brand_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.status = ${status}
        ORDER BY p.created_at DESC
      `
    } else {
      products = await sql`
        SELECT p.*, c.name as category_name, b.name as brand_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        ORDER BY p.created_at DESC
      `
    }

    // Transform to export format
    const exportData = products.map((p: any) => ({
      sku: p.sku,
      name: p.name,
      slug: p.slug,
      description: p.description || "",
      shortDescription: p.short_description || "",
      categoryId: p.category_id || "",
      categoryName: p.category_name || "",
      brandId: p.brand_id || "",
      brandName: p.brand_name || "",
      productType: p.product_type,
      price: p.price,
      costPrice: p.cost_price || "",
      stockQuantity: p.stock_quantity,
      lowStockThreshold: p.low_stock_threshold,
      status: p.status,
      images: Array.isArray(p.images) ? p.images.join(", ") : (p.images || ""),
      thumbnail: p.thumbnail || "",
      attributes: typeof p.attributes === "object" ? JSON.stringify(p.attributes) : (p.attributes || "{}"),
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }))

    if (format === "csv") {
      // Generate CSV
      const headers = [
        "SKU",
        "Nom",
        "Slug",
        "Description",
        "Description courte",
        "ID Catégorie",
        "Catégorie",
        "ID Marque",
        "Marque",
        "Type",
        "Prix HT",
        "Prix d'achat HT",
        "Stock",
        "Seuil stock bas",
        "Statut",
        "Images",
        "Miniature",
        "Attributs",
        "Créé le",
        "Modifié le",
      ]

      const csvRows = [headers.join(";")]

      for (const p of exportData) {
        const row = [
          p.sku,
          `"${(p.name || "").replace(/"/g, '""')}"`,
          p.slug,
          `"${(p.description || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
          `"${(p.shortDescription || "").replace(/"/g, '""')}"`,
          p.categoryId,
          `"${(p.categoryName || "").replace(/"/g, '""')}"`,
          p.brandId,
          `"${(p.brandName || "").replace(/"/g, '""')}"`,
          p.productType,
          p.price,
          p.costPrice,
          p.stockQuantity,
          p.lowStockThreshold,
          p.status,
          `"${(p.images || "").replace(/"/g, '""')}"`,
          p.thumbnail,
          `"${(p.attributes || "{}").replace(/"/g, '""')}"`,
          p.createdAt,
          p.updatedAt,
        ]
        csvRows.push(row.join(";"))
      }

      const csv = csvRows.join("\n")
      
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="products-export-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      })
    }

    // Return JSON by default
    return NextResponse.json({
      count: exportData.length,
      products: exportData,
    })
  } catch (error: any) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed", details: error.message }, { status: 500 })
  }
}

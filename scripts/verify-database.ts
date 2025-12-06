/**
 * Database Verification Script
 * 
 * This script connects to both local and production databases to verify:
 * - Database connectivity
 * - Categories, Brands, and Products data existence
 * - Data counts and sample records
 * 
 * Usage:
 *   Local:  pnpm tsx scripts/verify-database.ts
 *   Prod:   pnpm tsx scripts/verify-database.ts --prod
 *   Both:   pnpm tsx scripts/verify-database.ts --both
 */

import postgres from "postgres"
import { neon } from "@neondatabase/serverless"

// Load environment variables
require("dotenv").config({ path: ".env.local" })
require("dotenv").config()

interface DatabaseStats {
  categories: { total: number; sample: any[]; targetFound: boolean }
  brands: { total: number; sample: any[] }
  products: { total: number; sample: any[] }
}

// Docker configuration from docker-compose.yml
const LOCAL_DB_CONFIG = {
  user: "ekwip_dev",
  password: "ekwip_dev_password",
  host: "localhost",
  port: 5432,
  database: "ekwip_dev",
}

const LOCAL_DB_URL = `postgresql://${LOCAL_DB_CONFIG.user}:${LOCAL_DB_CONFIG.password}@${LOCAL_DB_CONFIG.host}:${LOCAL_DB_CONFIG.port}/${LOCAL_DB_CONFIG.database}`

// Get production URL from environment
const PROD_DB_URL = process.env.PROD_DATABASE_URL || process.env.PRODUCTION_DATABASE_URL || ""

async function checkDockerStatus(): Promise<boolean> {
  try {
    const { execSync } = require("child_process")
    const result = execSync(`docker ps --filter "name=ekwip-dev-db" --format "{{.Names}}"`, {
      encoding: "utf-8",
    })
    return result.trim() === "ekwip-dev-db"
  } catch {
    return false
  }
}

async function verifyDatabase(
  dbUrl: string,
  dbType: "local" | "production",
  dbName: string,
): Promise<DatabaseStats | null> {
  console.log(`\n${"=".repeat(70)}`)
  console.log(`📊 Verifying ${dbName} Database (${dbType.toUpperCase()})`)
  console.log(`${"=".repeat(70)}`)

  if (!dbUrl) {
    console.error(`❌ No database URL provided for ${dbName} database`)
    return null
  }

  try {
    let client: any

    // Initialize appropriate client
    if (dbType === "local") {
      // Check if Docker is running
      const dockerRunning = await checkDockerStatus()
      if (!dockerRunning) {
        console.error(`
❌ Docker container 'ekwip-dev-db' is not running!

Please start it with:
  docker-compose up -d

Or check if it exists:
  docker ps -a
        `)
        return null
      }
      console.log(`✅ Docker container is running`)

      // Local PostgreSQL (Docker)
      client = postgres(dbUrl, {
        max: 1,
        idle_timeout: 5,
        connect_timeout: 10,
      })
    } else {
      // Production Neon database
      client = neon(dbUrl)
    }

    console.log(`✅ Connected to ${dbName} database`)

    // Check Categories
    console.log(`\n📁 Checking Categories...`)
    let categories: any[]
    let categoryCount: any[]

    if (dbType === "local") {
      categories = await client`
        SELECT id, name, slug, is_active, product_count, sort_order
        FROM categories
        ORDER BY sort_order ASC
        LIMIT 10
      `
      categoryCount = await client`
        SELECT COUNT(*) as count FROM categories
      `
    } else {
      // Neon database - use template string syntax
      const categoriesResult = await client`
        SELECT id, name, slug, is_active, product_count, sort_order
        FROM categories
        ORDER BY sort_order ASC
        LIMIT 10
      `
      categories = Array.isArray(categoriesResult) ? categoriesResult : [categoriesResult]
      
      const countResult = await client`SELECT COUNT(*) as count FROM categories`
      categoryCount = Array.isArray(countResult) ? countResult : [countResult]
    }

    const totalCategories = Number.parseInt(categoryCount[0]?.count || "0")

    console.log(`   Total: ${totalCategories}`)
    if (categories.length > 0) {
      console.log(`   Sample categories:`)
      categories.slice(0, 5).forEach((cat: any) => {
        console.log(
          `   - ${cat.name} (${cat.slug}) - Active: ${cat.is_active ? "Yes" : "No"} - Products: ${cat.product_count || 0}`,
        )
      })
    } else {
      console.log(`   ⚠️  No categories found!`)
    }

    // Check Brands
    console.log(`\n🏷️  Checking Brands...`)
    let brands: any[]
    let brandCount: any[]

    if (dbType === "local") {
      brands = await client`
        SELECT id, name, slug, is_active, product_count
        FROM brands
        ORDER BY name ASC
        LIMIT 10
      `
      brandCount = await client`
        SELECT COUNT(*) as count FROM brands
      `
    } else {
      // Neon database - use template string syntax
      const brandsResult = await client`
        SELECT id, name, slug, is_active, product_count
        FROM brands
        ORDER BY name ASC
        LIMIT 10
      `
      brands = Array.isArray(brandsResult) ? brandsResult : [brandsResult]
      
      const countResult = await client`SELECT COUNT(*) as count FROM brands`
      brandCount = Array.isArray(countResult) ? countResult : [countResult]
    }

    const totalBrands = Number.parseInt(brandCount[0]?.count || "0")

    console.log(`   Total: ${totalBrands}`)
    if (brands.length > 0) {
      console.log(`   Sample brands:`)
      brands.slice(0, 5).forEach((brand: any) => {
        console.log(
          `   - ${brand.name} (${brand.slug}) - Active: ${brand.is_active ? "Yes" : "No"} - Products: ${brand.product_count || 0}`,
        )
      })
    } else {
      console.log(`   ⚠️  No brands found!`)
    }

    // Check Products
    console.log(`\n📦 Checking Products...`)
    let products: any[]
    let productCount: any[]

    if (dbType === "local") {
      products = await client`
        SELECT id, name, slug, category_id, brand_id, product_type, status, stock_quantity
        FROM products
        ORDER BY created_at DESC
        LIMIT 10
      `
      productCount = await client`
        SELECT COUNT(*) as count FROM products
      `
    } else {
      // Neon database - use template string syntax
      const productsResult = await client`
        SELECT id, name, slug, category_id, brand_id, product_type, status, stock_quantity
        FROM products
        ORDER BY created_at DESC
        LIMIT 10
      `
      products = Array.isArray(productsResult) ? productsResult : [productsResult]
      
      const countResult = await client`SELECT COUNT(*) as count FROM products`
      productCount = Array.isArray(countResult) ? countResult : [countResult]
    }

    const totalProducts = Number.parseInt(productCount[0]?.count || "0")

    console.log(`   Total: ${totalProducts}`)
    if (products.length > 0) {
      console.log(`   Sample products:`)
      products.slice(0, 5).forEach((prod: any) => {
        console.log(
          `   - ${prod.name} (${prod.slug}) - Type: ${prod.product_type} - Status: ${prod.status} - Stock: ${prod.stock_quantity || 0}`,
        )
      })
    } else {
      console.log(`   ⚠️  No products found!`)
    }

    // Check specific category (ordinateurs-portables)
    console.log(`\n🔍 Checking specific category: "ordinateurs-portables"...`)
    let laptopCategory: any[]

    if (dbType === "local") {
      laptopCategory = await client`
        SELECT id, name, slug, is_active, product_count
        FROM categories
        WHERE slug = 'ordinateurs-portables'
      `
    } else {
      // Neon database - use template string syntax
      const result = await client`
        SELECT id, name, slug, is_active, product_count
        FROM categories
        WHERE slug = 'ordinateurs-portables'
      `
      laptopCategory = Array.isArray(result) ? result : [result]
    }

    const targetFound = laptopCategory.length > 0
    if (targetFound) {
      const cat = laptopCategory[0]
      console.log(`   ✅ Found: ${cat.name}`)
      console.log(`      ID: ${cat.id}`)
      console.log(`      Active: ${cat.is_active ? "Yes" : "No"}`)
      console.log(`      Product Count: ${cat.product_count || 0}`)

      // Check products in this category
      let categoryProducts: any[]
      if (dbType === "local") {
        categoryProducts = await client`
          SELECT COUNT(*) as count FROM products WHERE category_id = ${cat.id}
        `
      } else {
        // Neon database - use template string syntax
        const result = await client`
          SELECT COUNT(*) as count FROM products WHERE category_id = ${cat.id}
        `
        categoryProducts = Array.isArray(result) ? result : [result]
      }
      const actualProductCount = Number.parseInt(categoryProducts[0]?.count || "0")
      console.log(`      Actual Products: ${actualProductCount}`)
    } else {
      console.log(`   ❌ Category "ordinateurs-portables" NOT FOUND!`)

      // Show available categories
      if (categories.length > 0) {
        console.log(`   Available categories:`)
        categories.forEach((c: any) => {
          console.log(`      - ${c.slug} (${c.name})`)
        })
      }
    }

    // Close connection for local database
    if (dbType === "local" && client) {
      await client.end()
    }

    return {
      categories: { total: totalCategories, sample: categories, targetFound },
      brands: { total: totalBrands, sample: brands },
      products: { total: totalProducts, sample: products },
    }
  } catch (error) {
    console.error(`❌ Error connecting to ${dbName} database:`, error)
    if (error instanceof Error) {
      console.error(`   Message: ${error.message}`)
      if (error.message.includes("connect ECONNREFUSED")) {
        console.error(`\n💡 Tip: Make sure Docker is running and the database container is up:`)
        console.error(`   docker-compose up -d`)
      }
    }
    return null
  }
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                   Database Verification Script                          ║
║           Ekwip - Categories, Brands, Products Check                    ║
╚══════════════════════════════════════════════════════════════════════════╝
  `)

  const args = process.argv.slice(2)
  const checkProd = args.includes("--prod")
  const checkBoth = args.includes("--both")

  const results: { local?: DatabaseStats | null; prod?: DatabaseStats | null } = {}

  // Check local database
  if (!checkProd || checkBoth) {
    console.log(`\n📍 Checking LOCAL database...`)
    results.local = await verifyDatabase(LOCAL_DB_URL, "local", "Local (Docker)")
  }

  // Check production database
  if (checkProd || checkBoth) {
    if (!PROD_DB_URL) {
      console.error(`
❌ Production database URL not found!

Please set one of these environment variables:
  - PROD_DATABASE_URL
  - PRODUCTION_DATABASE_URL

Example (PowerShell):
  $env:PROD_DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
  pnpm tsx scripts/verify-database.ts --prod
      `)
    } else {
      console.log(`\n📍 Checking PRODUCTION database...`)
      results.prod = await verifyDatabase(PROD_DB_URL, "production", "Production (Neon)")
    }
  }

  // Summary
  console.log(`\n${"=".repeat(70)}`)
  console.log(`📋 SUMMARY`)
  console.log(`${"=".repeat(70)}`)

  if (results.local) {
    console.log(`\n📍 LOCAL DATABASE:`)
    console.log(`   Categories: ${results.local.categories.total}`)
    console.log(`   Brands: ${results.local.brands.total}`)
    console.log(`   Products: ${results.local.products.total}`)
    console.log(`   Target category found: ${results.local.categories.targetFound ? "✅" : "❌"}`)
  }

  if (results.prod) {
    console.log(`\n🌐 PRODUCTION DATABASE:`)
    console.log(`   Categories: ${results.prod.categories.total}`)
    console.log(`   Brands: ${results.prod.brands.total}`)
    console.log(`   Products: ${results.prod.products.total}`)
    console.log(`   Target category found: ${results.prod.categories.targetFound ? "✅" : "❌"}`)
  }

  console.log(`\n${"=".repeat(70)}`)
  console.log(`✅ Verification complete!`)
  console.log(`${"=".repeat(70)}\n`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })

#!/usr/bin/env tsx
/**
 * Database Sync Script: Local to Production
 * 
 * This script syncs data from local Docker database to production Neon database.
 * 
 * Usage:
 *   pnpm tsx scripts/sync-local-to-prod.ts
 * 
 * Prerequisites:
 *   - Local Docker database running
 *   - Production DATABASE_URL set in environment
 *   - Both databases have the same schema
 */

import postgres from "postgres"
import { neon } from "@neondatabase/serverless"

// Get database URLs from environment
// Local: ekwip_dev database (Docker)
const LOCAL_DB_URL = process.env.LOCAL_DATABASE_URL || 
  process.env.POSTGRES_URL ||
  (process.env.DATABASE_URL?.includes("localhost") ? process.env.DATABASE_URL : 
  "postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev")

// Production: Neon database
const PROD_DB_URL = process.env.PROD_DATABASE_URL || 
  (process.env.DATABASE_URL?.includes("localhost") ? null : process.env.DATABASE_URL)

if (!PROD_DB_URL) {
  console.error("❌ PROD_DATABASE_URL or DATABASE_URL (non-local) must be set")
  process.exit(1)
}

console.log("🔄 Starting database sync: Local → Production")
console.log(`📦 Local DB: ${LOCAL_DB_URL.replace(/:[^:@]+@/, ":****@")}`)
console.log(`☁️  Prod DB: ${PROD_DB_URL.replace(/:[^:@]+@/, ":****@")}`)

// Connect to databases
const localClient = postgres(LOCAL_DB_URL)
const prodClient = neon(PROD_DB_URL)

// Tables to sync (in order of dependencies)
const TABLES_TO_SYNC = [
  "categories",
  "brands", 
  "attributes",
  "products",
  "warehouses",
  "stock",
  "clients",
  "customer_addresses",
  "suppliers",
  "coupons",
  "banners",
  "pages",
  "admin_users",
  "shop_settings",
]

async function syncTable(tableName: string) {
  console.log(`\n📊 Syncing table: ${tableName}`)
  
  try {
    // Get all data from local
    const localData = await localClient`SELECT * FROM ${localClient(tableName)}`
    
    if (localData.length === 0) {
      console.log(`   ⚠️  No data in local ${tableName}`)
      return
    }
    
    console.log(`   📥 Found ${localData.length} rows in local database`)
    
    // For each row, upsert to production
    let synced = 0
    for (const row of localData) {
      try {
        // Build column names and values
        const columns = Object.keys(row)
        const values = columns.map(col => row[col])
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ")
        const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(", ")
        
        // Use INSERT ... ON CONFLICT for upsert
        const query = `
          INSERT INTO ${tableName} (${columns.join(", ")})
          VALUES (${placeholders})
          ON CONFLICT (id) DO UPDATE SET ${setClause}
        `
        
        await prodClient(query, values)
        synced++
      } catch (error: any) {
        console.error(`   ❌ Error syncing row ${row.id}:`, error.message)
      }
    }
    
    console.log(`   ✅ Synced ${synced}/${localData.length} rows`)
  } catch (error: any) {
    console.error(`   ❌ Error syncing table ${tableName}:`, error.message)
  }
}

async function main() {
  try {
    // Test connections
    console.log("\n🔌 Testing database connections...")
    
    const localTest = await localClient`SELECT 1 as test`
    console.log("   ✅ Local database connected")
    
    const prodTest = await prodClient`SELECT 1 as test`
    console.log("   ✅ Production database connected")
    
    // Sync each table
    for (const table of TABLES_TO_SYNC) {
      await syncTable(table)
    }
    
    console.log("\n✅ Database sync completed!")
    console.log("\n⚠️  Note: Orders and order_items are NOT synced to preserve production data")
    
  } catch (error: any) {
    console.error("\n❌ Sync failed:", error.message)
    process.exit(1)
  } finally {
    await localClient.end()
  }
}

main()


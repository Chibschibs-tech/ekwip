#!/usr/bin/env tsx
/**
 * Run Database Migration Script
 * 
 * This script runs the migration script on the local Docker database.
 * 
 * Usage:
 *   pnpm tsx scripts/run-migration.ts [migration-file]
 * 
 * Example:
 *   pnpm tsx scripts/run-migration.ts scripts/003-add-order-type-migration.sql
 */

import postgres from "postgres"
import { readFileSync } from "fs"
import { join } from "path"

// Get database URL from environment
const DATABASE_URL = process.env.DATABASE_URL || 
  process.env.LOCAL_DATABASE_URL ||
  "postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev"

const migrationFile = process.argv[2] || "scripts/003-add-order-type-migration.sql"

console.log("🔄 Running database migration...")
console.log(`📦 Database: ${DATABASE_URL.replace(/:[^:@]+@/, ":****@")}`)
console.log(`📄 Migration file: ${migrationFile}\n`)

async function runMigration() {
  const client = postgres(DATABASE_URL)

  try {
    // Test connection
    await client`SELECT 1 as test`
    console.log("✅ Database connected\n")

    // Read migration file
    const migrationSQL = readFileSync(join(process.cwd(), migrationFile), "utf-8")
    
    // Execute the entire migration in a transaction
    await client.begin(async (sql) => {
      // Split by semicolons and execute each statement
      const statements = migrationSQL
        .split(";")
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith("--"))

      console.log(`📝 Found ${statements.length} SQL statements to execute\n`)

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i]
        
        // Skip comments and empty lines
        if (statement.startsWith("--") || statement.length === 0) {
          continue
        }

        try {
          console.log(`[${i + 1}/${statements.length}] Executing statement...`)
          // Use unsafe for DDL statements
          await sql.unsafe(statement)
          console.log(`   ✅ Statement ${i + 1} executed successfully`)
        } catch (error: any) {
          // Check if it's a "already exists" error (which is OK for IF NOT EXISTS)
          if (error.message.includes("already exists") || error.message.includes("duplicate") || error.message.includes("does not exist")) {
            console.log(`   ⚠️  Statement ${i + 1} skipped: ${error.message.substring(0, 80)}`)
          } else {
            console.error(`   ❌ Error in statement ${i + 1}:`, error.message)
            console.error(`   Statement: ${statement.substring(0, 100)}...`)
            throw error
          }
        }
      }
    })

    console.log("\n✅ Migration completed successfully!")
    
    // Verify migration
    console.log("\n🔍 Verifying migration...")
    
    const ordersColumns = await client`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'orders' 
        AND column_name IN ('order_type', 'client_id', 'rental_start_date', 'rental_end_date', 'rental_duration')
      ORDER BY column_name
    `
    
    const orderItemsColumns = await client`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'order_items' 
        AND column_name IN ('monthly_fee', 'upfront_contribution', 'item_start_date', 'item_end_date')
      ORDER BY column_name
    `

    console.log("\n📊 Orders table - New columns:")
    if (ordersColumns.length === 0) {
      console.log("   ⚠️  No new columns found")
    } else {
      ordersColumns.forEach((col: any) => {
        console.log(`   ✅ ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`)
      })
    }

    console.log("\n📊 Order items table - New columns:")
    if (orderItemsColumns.length === 0) {
      console.log("   ⚠️  No new columns found")
    } else {
      orderItemsColumns.forEach((col: any) => {
        console.log(`   ✅ ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`)
      })
    }

    // Check indexes
    const indexes = await client`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = 'orders' 
        AND indexname IN ('idx_orders_type', 'idx_orders_client', 'idx_orders_rental_dates')
    `
    
    console.log("\n📊 Indexes created:")
    if (indexes.length === 0) {
      console.log("   ⚠️  No new indexes found")
    } else {
      indexes.forEach((idx: any) => {
        console.log(`   ✅ ${idx.indexname}`)
      })
    }

    console.log("\n✅ Migration verification complete!")

  } catch (error: any) {
    console.error("\n❌ Migration failed:", error.message)
    if (error.stack) {
      console.error(error.stack)
    }
    process.exit(1)
  } finally {
    await client.end()
  }
}

runMigration()


#!/usr/bin/env tsx
/**
 * Fix Migration - Add Missing Columns
 */

import postgres from "postgres"

const DATABASE_URL = process.env.DATABASE_URL || 
  "postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev"

const client = postgres(DATABASE_URL)

async function fixMigration() {
  try {
    console.log("🔄 Adding missing columns...\n")

    // Add order_type
    try {
      await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_type VARCHAR(20) CHECK (order_type IN ('rental', 'sale')) DEFAULT 'sale'`
      console.log("✅ Added order_type column")
    } catch (e: any) {
      if (e.message.includes("already exists")) {
        console.log("⚠️  order_type already exists")
      } else {
        throw e
      }
    }

    // Add client_id
    try {
      await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS client_id VARCHAR(50) REFERENCES clients(id) ON DELETE SET NULL`
      console.log("✅ Added client_id column")
    } catch (e: any) {
      if (e.message.includes("already exists")) {
        console.log("⚠️  client_id already exists")
      } else {
        throw e
      }
    }

    // Add rental_start_date
    try {
      await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS rental_start_date TIMESTAMP WITH TIME ZONE`
      console.log("✅ Added rental_start_date column")
    } catch (e: any) {
      if (e.message.includes("already exists")) {
        console.log("⚠️  rental_start_date already exists")
      } else {
        throw e
      }
    }

    // Add monthly_fee to order_items
    try {
      await client`ALTER TABLE order_items ADD COLUMN IF NOT EXISTS monthly_fee DECIMAL(10,2)`
      console.log("✅ Added monthly_fee column to order_items")
    } catch (e: any) {
      if (e.message.includes("already exists")) {
        console.log("⚠️  monthly_fee already exists")
      } else {
        throw e
      }
    }

    // Create indexes
    try {
      await client`CREATE INDEX IF NOT EXISTS idx_orders_type ON orders(order_type)`
      console.log("✅ Created index idx_orders_type")
    } catch (e: any) {
      console.log("⚠️  Index idx_orders_type: " + e.message.substring(0, 60))
    }

    try {
      await client`CREATE INDEX IF NOT EXISTS idx_orders_client ON orders(client_id)`
      console.log("✅ Created index idx_orders_client")
    } catch (e: any) {
      console.log("⚠️  Index idx_orders_client: " + e.message.substring(0, 60))
    }

    try {
      await client`CREATE INDEX IF NOT EXISTS idx_orders_rental_dates ON orders(rental_start_date, rental_end_date)`
      console.log("✅ Created index idx_orders_rental_dates")
    } catch (e: any) {
      console.log("⚠️  Index idx_orders_rental_dates: " + e.message.substring(0, 60))
    }

    console.log("\n✅ Migration fix completed!")

    // Verify
    const ordersColumns = await client`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'orders' 
        AND column_name IN ('order_type', 'client_id', 'rental_start_date', 'rental_end_date', 'rental_duration')
      ORDER BY column_name
    `
    
    console.log("\n📊 Verification - Orders table:")
    ordersColumns.forEach((col: any) => {
      console.log(`   ✅ ${col.column_name}`)
    })

    const orderItemsColumns = await client`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'order_items' 
        AND column_name IN ('monthly_fee', 'upfront_contribution', 'item_start_date', 'item_end_date')
      ORDER BY column_name
    `
    
    console.log("\n📊 Verification - Order items table:")
    orderItemsColumns.forEach((col: any) => {
      console.log(`   ✅ ${col.column_name}`)
    })

  } catch (error: any) {
    console.error("\n❌ Error:", error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixMigration()


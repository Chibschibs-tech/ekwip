#!/usr/bin/env tsx
/**
 * Check Orders Table Schema
 */

import postgres from "postgres"

const DATABASE_URL = process.env.DATABASE_URL || 
  "postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev"

const client = postgres(DATABASE_URL)

async function checkSchema() {
  try {
    const columns = await client`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'orders'
      ORDER BY ordinal_position
    `
    
    console.log("📊 Orders table columns:")
    columns.forEach((col: any) => {
      console.log(`   ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`)
    })
    
    const orderItemsColumns = await client`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'order_items'
      ORDER BY ordinal_position
    `
    
    console.log("\n📊 Order items table columns:")
    orderItemsColumns.forEach((col: any) => {
      console.log(`   ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`)
    })
    
  } catch (error: any) {
    console.error("Error:", error.message)
  } finally {
    await client.end()
  }
}

checkSchema()


#!/usr/bin/env tsx
/**
 * Create Clients Table
 * This script creates the clients table required for B2B rental orders
 */

import postgres from "postgres"

const DATABASE_URL = process.env.DATABASE_URL || 
  "postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev"

const client = postgres(DATABASE_URL)

async function createClientsTable() {
  try {
    console.log("🔄 Creating clients table...\n")

    // Create clients table
    await client`
      CREATE TABLE IF NOT EXISTS clients (
        id VARCHAR(50) PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100) DEFAULT 'Maroc',
        tax_id VARCHAR(50),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
        notes TEXT,
        total_orders INTEGER DEFAULT 0,
        total_spent DECIMAL(12,2) DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
    console.log("✅ Created clients table")

    // Create indexes
    await client`CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status)`
    console.log("✅ Created index idx_clients_status")

    await client`CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email)`
    console.log("✅ Created index idx_clients_email")

    console.log("\n✅ Clients table creation completed!")

    // Verify
    const tableExists = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'clients'
      )
    `
    
    if (tableExists[0].exists) {
      console.log("\n✅ Verification: clients table exists")
      
      const columns = await client`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'clients'
        ORDER BY ordinal_position
      `
      
      console.log("\n📊 Clients table columns:")
      columns.forEach((col: any) => {
        console.log(`   - ${col.column_name} (${col.data_type})`)
      })
    }

  } catch (error: any) {
    console.error("\n❌ Error:", error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

createClientsTable()



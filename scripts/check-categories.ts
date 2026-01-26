/**
 * Check product distribution by category
 * Run with: npx tsx scripts/check-categories.ts
 */

import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL non défini')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

async function checkCategories() {
  console.log('📊 RÉPARTITION DES PRODUITS PAR CATÉGORIE\n')
  
  const results = await sql`
    SELECT 
      c.id,
      c.name as category_name,
      COUNT(p.id) as product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id AND p.product_type = 'sale'
    GROUP BY c.id, c.name
    ORDER BY product_count DESC
  `
  
  let total = 0
  for (const row of results) {
    console.log(`${row.category_name}: ${row.product_count} produits`)
    total += parseInt(row.product_count)
  }
  
  console.log(`\nTOTAL: ${total} produits sale`)
  
  // Check a few sample products
  console.log('\n\n📦 ÉCHANTILLON DE PRODUITS:')
  const samples = await sql`
    SELECT p.name, p.sku, c.name as category, b.name as brand
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN brands b ON p.brand_id = b.id
    WHERE p.product_type = 'sale'
    ORDER BY p.created_at DESC
    LIMIT 10
  `
  
  for (const p of samples) {
    console.log(`  - [${p.sku}] ${p.name?.substring(0, 50)}... → ${p.category} (${p.brand || 'N/A'})`)
  }
}

checkCategories().catch(console.error)

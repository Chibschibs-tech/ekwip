/**
 * Script to check categories in the database
 * Run with: pnpm tsx scripts/check-categories.ts
 */

import { sql } from "../lib/db"

async function checkCategories() {
  try {
    console.log("🔍 Checking categories in database...\n")

    // Fetch all categories
    const categories = await sql`
      SELECT id, name, slug, is_active, product_count, created_at
      FROM categories
      ORDER BY sort_order ASC, name ASC
    `

    if (categories.length === 0) {
      console.log("❌ No categories found in database!")
      console.log("💡 Run the seed script: pnpm tsx scripts/002-seed-data.sql")
      return
    }

    console.log(`✅ Found ${categories.length} categories:\n`)
    console.log("┌─────────────────────────────────────────────────────────────────────────┐")
    console.log("│ ID                    │ Name                  │ Slug                   │ Active │ Products │")
    console.log("├─────────────────────────────────────────────────────────────────────────┤")

    categories.forEach((cat: any) => {
      const id = cat.id.padEnd(20)
      const name = (cat.name || "").padEnd(20)
      const slug = (cat.slug || "").padEnd(20)
      const active = cat.is_active ? "✅" : "❌"
      const count = String(cat.product_count || 0).padStart(8)
      console.log(`│ ${id} │ ${name} │ ${slug} │ ${active}   │ ${count} │`)
    })

    console.log("└─────────────────────────────────────────────────────────────────────────┘\n")

    // Check for specific slug
    const targetSlug = "ordinateurs-portables"
    const foundCategory = categories.find((c: any) => c.slug === targetSlug)

    if (foundCategory) {
      console.log(`✅ Category "${targetSlug}" found:`)
      console.log(`   - ID: ${foundCategory.id}`)
      console.log(`   - Name: ${foundCategory.name}`)
      console.log(`   - Active: ${foundCategory.is_active ? "Yes" : "No"}`)
      console.log(`   - Products: ${foundCategory.product_count || 0}`)
    } else {
      console.log(`❌ Category with slug "${targetSlug}" NOT found!`)
      console.log("\n📋 Available slugs:")
      categories.forEach((c: any) => {
        console.log(`   - ${c.slug} (${c.name})`)
      })
    }

    // Check for similar slugs
    const similarSlugs = categories.filter((c: any) =>
      c.slug.includes("portable") || c.slug.includes("ordinateur")
    )
    if (similarSlugs.length > 0) {
      console.log("\n🔍 Similar slugs found:")
      similarSlugs.forEach((c: any) => {
        console.log(`   - ${c.slug} (${c.name})`)
      })
    }
  } catch (error) {
    console.error("❌ Error checking categories:", error)
    if (error instanceof Error) {
      console.error("   Message:", error.message)
    }
  }
}

checkCategories()
  .then(() => {
    console.log("\n✅ Check complete!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Fatal error:", error)
    process.exit(1)
  })


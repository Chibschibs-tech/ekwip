import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment")
  process.exit(1)
}

async function runMigration() {
  console.log("🚀 Starting families/categories migration...")
  
  const sql = neon(DATABASE_URL)
  
  try {
    // Step 1: Create families table
    console.log("\n📦 Creating families table...")
    await sql`
      CREATE TABLE IF NOT EXISTS families (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        image VARCHAR(500),
        icon VARCHAR(100),
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
    console.log("   ✅ Families table created")
    
    // Step 2: Add columns to categories table
    console.log("\n📝 Adding columns to categories table...")
    try {
      await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS family_id VARCHAR(50) REFERENCES families(id) ON DELETE SET NULL`
      console.log("   ✅ family_id column added")
    } catch (e: any) {
      if (e.message?.includes("already exists")) {
        console.log("   ⚠️ family_id column already exists")
      } else {
        throw e
      }
    }
    
    try {
      await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS category_type VARCHAR(20) DEFAULT 'category'`
      console.log("   ✅ category_type column added")
    } catch (e: any) {
      if (e.message?.includes("already exists")) {
        console.log("   ⚠️ category_type column already exists")
      } else {
        throw e
      }
    }
    
    // Step 3: Create product_categories junction table
    console.log("\n🔗 Creating product_categories junction table...")
    await sql`
      CREATE TABLE IF NOT EXISTS product_categories (
        id VARCHAR(50) PRIMARY KEY,
        product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        category_id VARCHAR(50) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        is_primary BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(product_id, category_id)
      )
    `
    console.log("   ✅ product_categories table created")
    
    // Step 4: Create indexes
    console.log("\n📊 Creating indexes...")
    await sql`CREATE INDEX IF NOT EXISTS idx_categories_family ON categories(family_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(category_type)`
    await sql`CREATE INDEX IF NOT EXISTS idx_product_categories_product ON product_categories(product_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_product_categories_category ON product_categories(category_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_families_active ON families(is_active)`
    console.log("   ✅ Indexes created")
    
    // Step 5: Insert families
    console.log("\n👨‍👩‍👧‍👦 Inserting families...")
    const familiesData = [
      { id: 'fam-informatique', name: 'Informatique', slug: 'informatique', description: 'Équipement informatique professionnel', sort_order: 1 },
      { id: 'fam-image-son', name: 'Image & Son', slug: 'image-son', description: 'Équipement audiovisuel et son', sort_order: 2 },
      { id: 'fam-telephonie', name: 'Téléphonie', slug: 'telephonie', description: 'Smartphones et accessoires téléphonie', sort_order: 3 },
      { id: 'fam-audiovisuel', name: 'Audiovisuel', slug: 'audiovisuel', description: 'Équipement audiovisuel professionnel', sort_order: 4 },
    ]
    
    for (const fam of familiesData) {
      await sql`
        INSERT INTO families (id, name, slug, description, sort_order, is_active)
        VALUES (${fam.id}, ${fam.name}, ${fam.slug}, ${fam.description}, ${fam.sort_order}, true)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          sort_order = EXCLUDED.sort_order
      `
      console.log(`   ✅ ${fam.name}`)
    }
    
    // Step 6: Insert/Update categories with family assignments
    console.log("\n📂 Inserting categories...")
    
    // Famille Informatique
    const infoCategories = [
      { id: 'cat-laptops', name: 'Ordinateurs portables', slug: 'ordinateurs-portables', sort_order: 1 },
      { id: 'cat-desktops', name: 'Ordinateurs de bureau', slug: 'ordinateurs-de-bureau', sort_order: 2 },
      { id: 'cat-printers', name: 'Imprimantes', slug: 'imprimantes', sort_order: 3 },
      { id: 'cat-monitors', name: 'Écrans et moniteurs', slug: 'ecrans-moniteurs', sort_order: 4 },
      { id: 'cat-servers', name: 'Serveurs', slug: 'serveurs', sort_order: 5 },
      { id: 'cat-networking', name: 'Réseau', slug: 'reseau', sort_order: 6 },
      { id: 'cat-accessories-it', name: 'Accessoires informatiques', slug: 'accessoires-informatiques', sort_order: 7 },
      { id: 'cat-storage', name: 'Stockage', slug: 'stockage', sort_order: 8 },
    ]
    
    console.log("\n   📁 Informatique:")
    for (const cat of infoCategories) {
      await sql`
        INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active)
        VALUES (${cat.id}, ${cat.name}, ${cat.slug}, 'fam-informatique', 'category', ${cat.sort_order}, true)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          family_id = EXCLUDED.family_id,
          category_type = EXCLUDED.category_type,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active
      `
      console.log(`      - ${cat.name}`)
    }
    
    // Famille Image & Son
    const imageSonCategories = [
      { id: 'cat-tv', name: 'Télévision', slug: 'television', sort_order: 1 },
      { id: 'cat-headphones', name: 'Casques & Écouteurs', slug: 'casques-ecouteurs', sort_order: 2 },
      { id: 'cat-speakers', name: 'Enceintes', slug: 'enceintes', sort_order: 3 },
    ]
    
    console.log("\n   📁 Image & Son:")
    for (const cat of imageSonCategories) {
      await sql`
        INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active)
        VALUES (${cat.id}, ${cat.name}, ${cat.slug}, 'fam-image-son', 'category', ${cat.sort_order}, true)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          family_id = EXCLUDED.family_id,
          category_type = EXCLUDED.category_type,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active
      `
      console.log(`      - ${cat.name}`)
    }
    
    // Famille Téléphonie
    const phoneCategories = [
      { id: 'cat-smartphones', name: 'Smartphones', slug: 'smartphones', sort_order: 1 },
      { id: 'cat-iphones', name: 'iPhone', slug: 'iphone', sort_order: 2 },
      { id: 'cat-accessories-phone', name: 'Accessoires téléphonie', slug: 'accessoires-telephonie', sort_order: 3 },
    ]
    
    console.log("\n   📁 Téléphonie:")
    for (const cat of phoneCategories) {
      await sql`
        INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active)
        VALUES (${cat.id}, ${cat.name}, ${cat.slug}, 'fam-telephonie', 'category', ${cat.sort_order}, true)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          family_id = EXCLUDED.family_id,
          category_type = EXCLUDED.category_type,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active
      `
      console.log(`      - ${cat.name}`)
    }
    
    // Famille Audiovisuel
    const avCategories = [
      { id: 'cat-microphones', name: 'Microphones', slug: 'microphones', sort_order: 1 },
      { id: 'cat-mixers', name: 'Tables de mixage', slug: 'tables-mixage', sort_order: 2 },
      { id: 'cat-speakers-av', name: 'Enceintes AV', slug: 'enceintes-av', sort_order: 3 },
      { id: 'cat-accessories-av', name: 'Accessoires AV', slug: 'accessoires-av', sort_order: 4 },
    ]
    
    console.log("\n   📁 Audiovisuel:")
    for (const cat of avCategories) {
      await sql`
        INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active)
        VALUES (${cat.id}, ${cat.name}, ${cat.slug}, 'fam-audiovisuel', 'category', ${cat.sort_order}, true)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          family_id = EXCLUDED.family_id,
          category_type = EXCLUDED.category_type,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active
      `
      console.log(`      - ${cat.name}`)
    }
    
    // Step 7: Migrate existing product-category relationships
    console.log("\n🔄 Migrating product-category relationships...")
    const migrated = await sql`
      INSERT INTO product_categories (id, product_id, category_id, is_primary)
      SELECT 
        'pc-' || id || '-' || category_id,
        id,
        category_id,
        true
      FROM products 
      WHERE category_id IS NOT NULL
      ON CONFLICT (product_id, category_id) DO NOTHING
      RETURNING id
    `
    console.log(`   ✅ ${migrated.length} relationships migrated`)
    
    // Step 8: Verify the migration
    console.log("\n📊 Verifying migration...")
    
    const families = await sql`SELECT id, name, slug FROM families ORDER BY sort_order`
    console.log(`\n✅ Families: ${families.length}`)
    families.forEach(f => console.log(`   - ${f.name} (${f.slug})`))
    
    const categoriesWithFamily = await sql`
      SELECT c.name, c.slug, f.name as family_name 
      FROM categories c 
      LEFT JOIN families f ON c.family_id = f.id 
      WHERE c.family_id IS NOT NULL
      ORDER BY f.sort_order, c.sort_order
    `
    console.log(`\n✅ Categories with families: ${categoriesWithFamily.length}`)
    
    const productCats = await sql`SELECT COUNT(*) as count FROM product_categories`
    console.log(`✅ Product-category relationships: ${productCats[0].count}`)
    
    console.log("\n🎉 Migration completed successfully!")
    
  } catch (error) {
    console.error("\n❌ Migration failed:", error)
    process.exit(1)
  }
}

runMigration()

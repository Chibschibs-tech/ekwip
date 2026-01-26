/**
 * Fix brand assignments and extract attributes from product descriptions
 * Run with: npx tsx scripts/fix-brands-and-attributes.ts
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

// Brand patterns to detect from product names/descriptions
const BRAND_PATTERNS: Record<string, string[]> = {
  'HP': ['HP ', 'HP-', 'Hewlett', 'ProBook', 'EliteBook', 'ProDesk', 'EliteDesk', 'ProOne', 'Pavilion', 'OMEN', 'Victus', 'Spectre', 'Envy'],
  'DELL': ['Dell ', 'DELL ', 'Dell-', 'Vostro', 'Inspiron', 'Latitude', 'OptiPlex', 'Precision', 'XPS', 'Alienware'],
  'LENOVO': ['Lenovo ', 'LENOVO ', 'Lenovo-', 'ThinkPad', 'ThinkCentre', 'ThinkStation', 'IdeaPad', 'IdeaCentre', 'Legion', 'Yoga'],
  'ASUS': ['ASUS ', 'Asus ', 'Vivobook', 'VivoBook', 'ZenBook', 'ROG ', 'TUF '],
  'APPLE': ['Apple ', 'MacBook', 'iMac', 'Mac '],
  'MSI': ['MSI '],
  'HUAWEI': ['HUAWEI ', 'Huawei ', 'MATEBOOK', 'MateBook'],
  'EPSON': ['EPSON ', 'Epson ', 'EcoTank', 'WorkForce', 'Expression'],
  'CANON': ['CANON ', 'Canon ', 'PIXMA', 'imageCLASS', 'MAXIFY', 'LBP', 'MF'],
  'LOGITECH': ['Logitech ', 'LOGITECH '],
  'EATON': ['EATON ', 'Eaton '],
  'APC': ['APC '],
  'CISCO': ['CISCO ', 'Cisco ', 'LINKSYS', 'Linksys'],
  'TP-LINK': ['TP-LINK', 'TP-Link', 'MERCUSYS', 'Mercusys'],
  'SAMSUNG': ['Samsung ', 'SAMSUNG '],
  'WESTERN DIGITAL': ['Western Digital', 'WD ', 'WESTERN DIGITAL'],
  'SEAGATE': ['Seagate ', 'SEAGATE '],
  'UGREEN': ['UGREEN ', 'Ugreen '],
  'XIAOMI': ['Xiaomi ', 'XIAOMI ', 'Mi Router', 'Redmi'],
  'KASPERSKY': ['KASPERSKY', 'Kaspersky'],
  'MICROSOFT': ['Microsoft ', 'MICROSOFT ', 'Windows ', 'Office '],
  'ARUBA': ['Aruba ', 'ARUBA '],
  'ALTAI': ['ALTAI ', 'Altai '],
  'PORT': ['PORT ', 'Port '],
  'JABRA': ['JABRA ', 'Jabra '],
  'AXTEL': ['AXTEL ', 'Axtel '],
  'SANDISK': ['SanDisk ', 'SANDISK '],
  'KINGSTON': ['Kingston ', 'KINGSTON '],
  'CRUCIAL': ['Crucial ', 'CRUCIAL '],
  'BROTHER': ['Brother ', 'BROTHER '],
  'RICOH': ['Ricoh ', 'RICOH '],
  'XEROX': ['Xerox ', 'XEROX '],
  'LEXMARK': ['Lexmark ', 'LEXMARK '],
  'BENQ': ['BenQ ', 'BENQ '],
  'LG': ['LG '],
  'AOC': ['AOC '],
  'PHILIPS': ['Philips ', 'PHILIPS '],
  'VIEWSONIC': ['ViewSonic ', 'VIEWSONIC '],
  'ACER': ['Acer ', 'ACER ', 'Predator', 'Nitro'],
}

// Attribute extraction patterns
const ATTRIBUTE_PATTERNS = {
  processor: [
    /Intel[®\s]+Core[™\s]*(i\d[-\s]?\d+\w*)/i,
    /Intel[®\s]+Celeron[®\s]*(\w+)/i,
    /Intel[®\s]+Pentium[®\s]*(\w+)/i,
    /AMD\s+Ryzen\s*(\d+\s*\d+\w*)/i,
    /Processeur\s+([^,]+)/i,
  ],
  ram: [
    /(\d+)\s*Go?\s*(RAM|DDR\d|SO-?DIMM|mémoire)/i,
    /RAM\s*[:=]?\s*(\d+)\s*Go?/i,
    /mémoire\s+(\d+)\s*Go/i,
  ],
  storage: [
    /(\d+)\s*(Go|To|GB|TB)\s*(SSD|HDD|NVMe|PCIe)/i,
    /SSD\s*(\d+)\s*(Go|To|GB|TB)/i,
    /Disque\s+dur\s+(\d+)\s*(Go|To)/i,
  ],
  screen: [
    /(\d+[.,]?\d*)["\s]*(pouces|inch|FHD|HD|QHD|4K)?/i,
    /écran\s*(\d+[.,]?\d*)/i,
  ],
  resolution: [
    /(\d{3,4}\s*x\s*\d{3,4})/i,
    /(FHD|Full HD|HD|QHD|4K|UHD)/i,
  ],
  graphics: [
    /(Intel[®\s]*(UHD|Iris|HD)\s*Graphics[^,]*)/i,
    /(NVIDIA[®\s]*GeForce[^,]*)/i,
    /(AMD\s*Radeon[^,]*)/i,
  ],
  connectivity: [
    /(Wi-?Fi\s*\d*[^,]*)/i,
    /(Bluetooth[®\s]*\d*[.,]?\d*)/i,
  ],
}

interface Brand {
  id: string
  name: string
}

// Load all brands from database
async function loadBrands(): Promise<Map<string, Brand>> {
  const brands = await sql`SELECT id, name FROM brands`
  const brandMap = new Map<string, Brand>()
  for (const brand of brands) {
    brandMap.set(brand.name.toUpperCase(), brand)
  }
  return brandMap
}

// Create brand if not exists
async function getOrCreateBrand(brandName: string, brandMap: Map<string, Brand>): Promise<string | null> {
  const upperName = brandName.toUpperCase()
  
  if (brandMap.has(upperName)) {
    return brandMap.get(upperName)!.id
  }
  
  // Create new brand
  const brandId = `brand-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const brandSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  const now = new Date().toISOString()
  
  try {
    await sql`
      INSERT INTO brands (id, name, slug, description, logo, website, is_active, product_count, created_at, updated_at)
      VALUES (${brandId}, ${brandName}, ${brandSlug}, ${'Produits ' + brandName}, ${'/placeholder.svg'}, ${null}, ${true}, ${0}, ${now}, ${now})
      ON CONFLICT (slug) DO NOTHING
    `
    brandMap.set(upperName, { id: brandId, name: brandName })
    console.log(`  ✅ Marque créée: ${brandName}`)
    return brandId
  } catch (error) {
    // Try to get existing
    const existing = await sql`SELECT id FROM brands WHERE UPPER(name) = ${upperName} LIMIT 1`
    if (existing.length > 0) {
      brandMap.set(upperName, { id: existing[0].id, name: brandName })
      return existing[0].id
    }
    return null
  }
}

// Detect brand from product name/description
function detectBrand(text: string): string | null {
  for (const [brandName, patterns] of Object.entries(BRAND_PATTERNS)) {
    for (const pattern of patterns) {
      if (text.toUpperCase().includes(pattern.toUpperCase())) {
        return brandName
      }
    }
  }
  return null
}

// Extract attributes from description
function extractAttributes(description: string): Record<string, string> {
  const attributes: Record<string, string> = {}
  
  for (const [attrName, patterns] of Object.entries(ATTRIBUTE_PATTERNS)) {
    for (const pattern of patterns) {
      const match = description.match(pattern)
      if (match) {
        let value = match[1] || match[0]
        value = value.trim().replace(/^[,\s]+|[,\s]+$/g, '')
        if (value && value.length > 1) {
          attributes[attrName] = value
          break
        }
      }
    }
  }
  
  return attributes
}

async function main() {
  console.log('='.repeat(70))
  console.log('🔧 CORRECTION DES MARQUES ET ATTRIBUTS')
  console.log('='.repeat(70))
  
  // Load brands
  console.log('\n📦 Chargement des marques...')
  const brandMap = await loadBrands()
  console.log(`  ${brandMap.size} marques existantes`)
  
  // Get all products without brand or with wrong brand
  console.log('\n📋 Récupération des produits...')
  const products = await sql`
    SELECT id, name, description, brand_id, attributes
    FROM products 
    WHERE product_type = 'sale'
    ORDER BY created_at DESC
  `
  console.log(`  ${products.length} produits à traiter`)
  
  let brandsFixed = 0
  let attributesExtracted = 0
  
  console.log('\n🔄 Traitement des produits...')
  
  for (const product of products) {
    const searchText = `${product.name} ${product.description || ''}`
    let needsUpdate = false
    let newBrandId = product.brand_id
    let newAttributes = product.attributes ? 
      (typeof product.attributes === 'string' ? JSON.parse(product.attributes) : product.attributes) 
      : {}
    
    // Check brand
    if (!product.brand_id) {
      const detectedBrand = detectBrand(searchText)
      if (detectedBrand) {
        const brandId = await getOrCreateBrand(detectedBrand, brandMap)
        if (brandId) {
          newBrandId = brandId
          needsUpdate = true
          brandsFixed++
        }
      }
    }
    
    // Extract attributes if empty
    if (!newAttributes || Object.keys(newAttributes).length === 0) {
      const extractedAttrs = extractAttributes(searchText)
      if (Object.keys(extractedAttrs).length > 0) {
        newAttributes = extractedAttrs
        needsUpdate = true
        attributesExtracted++
      }
    }
    
    // Update product if needed
    if (needsUpdate) {
      const now = new Date().toISOString()
      await sql`
        UPDATE products 
        SET 
          brand_id = ${newBrandId},
          attributes = ${JSON.stringify(newAttributes)},
          updated_at = ${now}
        WHERE id = ${product.id}
      `
      process.stdout.write('.')
    }
  }
  
  // Update brand product counts
  console.log('\n\n📊 Mise à jour des compteurs...')
  await sql`
    UPDATE brands b
    SET product_count = (
      SELECT COUNT(*) FROM products p 
      WHERE p.brand_id = b.id AND p.status = 'active'
    )
  `
  
  // Print report
  console.log('\n' + '='.repeat(70))
  console.log('📊 RAPPORT')
  console.log('='.repeat(70))
  console.log(`\nMarques corrigées: ${brandsFixed}`)
  console.log(`Attributs extraits: ${attributesExtracted}`)
  
  // Show brand distribution
  console.log('\n📦 Distribution par marque:')
  const brandStats = await sql`
    SELECT b.name, COUNT(p.id) as count
    FROM brands b
    LEFT JOIN products p ON p.brand_id = b.id AND p.product_type = 'sale'
    GROUP BY b.id, b.name
    HAVING COUNT(p.id) > 0
    ORDER BY count DESC
    LIMIT 15
  `
  for (const stat of brandStats) {
    console.log(`  ${stat.name}: ${stat.count} produits`)
  }
  
  console.log('\n✅ TERMINÉ!')
}

main().catch(console.error)

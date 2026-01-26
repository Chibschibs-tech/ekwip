/**
 * Import products from Excel file to the boutique (sale products)
 * Uses direct database connection for efficiency
 * Run with: npx tsx scripts/import-boutique-products.ts
 */

import * as XLSX from 'xlsx'
import * as path from 'path'
import * as fs from 'fs'
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

// Load environment variables
config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL non défini dans .env.local')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

const EXCEL_FILE = path.join(process.cwd(), 'TARIFS_REVENDEURS_DECEMBRE_2025.xlsx')

// Configuration
const CONFIG = {
  MARGIN_PERCENTAGE: 0.07, // 7% margin
  TVA_RATE: 0.20, // 20% TVA
  DEFAULT_STOCK: 10,
  DEFAULT_STATUS: 'active' as const,
  SKU_PREFIX: 'EK-BTQ',
}

// Sheet to Category Mapping
const SHEET_CATEGORY_MAPPING: Record<string, string> = {
  // PC Bureau → cat-desktops
  'PC Bureau HP': 'cat-desktops',
  'PC Bureau DELL': 'cat-desktops',
  'PC Bureau LENOVO': 'cat-desktops',
  
  // PC Portables → cat-laptops
  'PC PORTABLE HP COMMERCIAL': 'cat-laptops',
  'PC Portables HP CONSUMER ': 'cat-laptops',
  'PC Portables DELL': 'cat-laptops',
  'PC Portables ASUS': 'cat-laptops',
  'PC Portables LENOVO': 'cat-laptops',
  'HUAWEI': 'cat-laptops',
  'MSI': 'cat-laptops',
  
  // Ecrans → cat-monitors (new)
  'Ecrans Gaming': 'cat-monitors',
  
  // Serveurs → cat-servers (new)
  'SERVEURS DELL': 'cat-servers',
  
  // Imprimantes → cat-printers
  'IMPRESSION ET IMAGERIE HP': 'cat-printers',
  'IMPRESSION ET IMAGERIE EPSON': 'cat-printers',
  'IMPRESSION ET IMAGERIE CANON': 'cat-printers',
  
  // Réseau → cat-networking (new)
  'Pts Réseau HPe': 'cat-networking',
  'ALTAI': 'cat-networking',
  'Pts Réseau TP-LINK': 'cat-networking',
  'Pts Réseau HUAWEI': 'cat-networking',
  'Pts Réseau CISCO': 'cat-networking',
  
  // Logiciels → cat-software (new)
  'SYS. D\'EXPLOITATION': 'cat-software',
  'ANTIVIRUS ET SECURITE': 'cat-software',
  
  // Onduleurs → cat-ups (new)
  'EATON': 'cat-ups',
  'APC': 'cat-ups',
  
  // Stockage → cat-storage (new)
  'STOCKAGE': 'cat-storage',
  
  // Multimedia → cat-multimedia (new)
  'MULTIMEDIA': 'cat-multimedia',
  
  // Accessoires → cat-accessories
  'ACCESS PORT': 'cat-accessories',
  'ACCESS HP': 'cat-accessories',
  'ACCESS LOGITECH': 'cat-accessories',
  'ACCESSLENOVO': 'cat-accessories',
  'ACCESS UGREEN': 'cat-accessories',
  'ACCESS DIVERS': 'cat-accessories',
  'Xiaomi': 'cat-accessories',
}

// New categories to create
const NEW_CATEGORIES = [
  { id: 'cat-monitors', name: 'Écrans et Moniteurs', slug: 'ecrans-moniteurs', description: 'Écrans et moniteurs professionnels', sortOrder: 6, image: '/placeholder.svg' },
  { id: 'cat-servers', name: 'Serveurs', slug: 'serveurs', description: 'Serveurs professionnels', sortOrder: 7, image: '/placeholder.svg' },
  { id: 'cat-networking', name: 'Réseau', slug: 'reseau', description: 'Équipements réseau', sortOrder: 8, image: '/placeholder.svg' },
  { id: 'cat-software', name: 'Logiciels', slug: 'logiciels', description: 'Logiciels et licences', sortOrder: 9, image: '/placeholder.svg' },
  { id: 'cat-ups', name: 'Onduleurs', slug: 'onduleurs', description: 'Onduleurs et protection électrique', sortOrder: 10, image: '/placeholder.svg' },
  { id: 'cat-storage', name: 'Stockage', slug: 'stockage', description: 'Disques durs et solutions de stockage', sortOrder: 11, image: '/placeholder.svg' },
  { id: 'cat-multimedia', name: 'Multimédia', slug: 'multimedia', description: 'Équipements multimédia', sortOrder: 12, image: '/placeholder.svg' },
]

// Brand extraction from product name
const BRAND_PATTERNS: Record<string, string[]> = {
  'HP': ['HP ', 'HP-', 'Hewlett', 'ProBook', 'EliteBook', 'ProDesk', 'EliteDesk', 'ProOne', 'Pavilion'],
  'DELL': ['Dell ', 'DELL ', 'Dell-', 'Vostro', 'Inspiron', 'Latitude', 'OptiPlex', 'Precision', 'XPS'],
  'LENOVO': ['Lenovo ', 'LENOVO ', 'Lenovo-', 'ThinkPad', 'ThinkCentre', 'ThinkStation', 'IdeaPad', 'IdeaCentre', 'Legion'],
  'ASUS': ['ASUS ', 'Asus ', 'Vivobook', 'ZenBook', 'ROG ', 'TUF '],
  'APPLE': ['Apple ', 'MacBook', 'iMac', 'Mac '],
  'MSI': ['MSI '],
  'HUAWEI': ['HUAWEI ', 'Huawei ', 'MATEBOOK', 'MateBook'],
  'EPSON': ['EPSON ', 'Epson ', 'EcoTank', 'WorkForce'],
  'CANON': ['CANON ', 'Canon ', 'PIXMA', 'imageCLASS', 'MAXIFY'],
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
  'MICROSOFT': ['Microsoft ', 'MICROSOFT ', 'Windows '],
  'ARUBA': ['Aruba ', 'ARUBA '],
  'ALTAI': ['ALTAI ', 'Altai '],
}

// Report
interface ImportReport {
  totalProcessed: number
  imported: number
  skipped: number
  errors: Array<{ product: string; error: string }>
  categoriesCreated: string[]
  brandsCreated: string[]
}

const report: ImportReport = {
  totalProcessed: 0,
  imported: 0,
  skipped: 0,
  errors: [],
  categoriesCreated: [],
  brandsCreated: [],
}

// Global SKU counter
let skuCounter = 1

// Existing brands cache
const brandsCache: Record<string, string> = {}

// Function to generate unique ID
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Function to generate SKU
function generateSKU(): string {
  const sku = `${CONFIG.SKU_PREFIX}-${String(skuCounter).padStart(4, '0')}`
  skuCounter++
  return sku
}

// Function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

// Function to extract brand from product name
function extractBrand(productName: string): string | null {
  for (const [brand, patterns] of Object.entries(BRAND_PATTERNS)) {
    for (const pattern of patterns) {
      if (productName.toUpperCase().includes(pattern.toUpperCase())) {
        return brand
      }
    }
  }
  return null
}

// Function to load existing brands
async function loadBrands(): Promise<void> {
  const brands = await sql`SELECT id, name FROM brands`
  for (const brand of brands) {
    brandsCache[brand.name.toUpperCase()] = brand.id
  }
  console.log(`  📋 ${Object.keys(brandsCache).length} marques existantes chargées`)
}

// Function to get or create brand
async function getOrCreateBrand(brandName: string | null): Promise<string | null> {
  if (!brandName) return null
  
  const upperBrandName = brandName.toUpperCase()
  
  // Check cache
  if (brandsCache[upperBrandName]) {
    return brandsCache[upperBrandName]
  }
  
  // Create new brand
  const brandId = generateId('brand')
  const brandSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  const now = new Date().toISOString()
  
  try {
    await sql`
      INSERT INTO brands (id, name, slug, description, logo, website, is_active, product_count, created_at, updated_at)
      VALUES (${brandId}, ${brandName}, ${brandSlug}, ${'Produits ' + brandName}, ${'/placeholder.svg'}, ${null}, ${true}, ${0}, ${now}, ${now})
      ON CONFLICT (slug) DO NOTHING
    `
    brandsCache[upperBrandName] = brandId
    report.brandsCreated.push(brandName)
    return brandId
  } catch (error) {
    // Brand might already exist, try to fetch it
    const existing = await sql`SELECT id FROM brands WHERE UPPER(name) = ${upperBrandName} LIMIT 1`
    if (existing.length > 0) {
      brandsCache[upperBrandName] = existing[0].id
      return existing[0].id
    }
    return null
  }
}

// Function to calculate prices
function calculatePrices(costPrice: number): { price: number; priceTTC: number } {
  const price = Math.round(costPrice * (1 + CONFIG.MARGIN_PERCENTAGE) * 100) / 100
  const priceTTC = Math.round(price * (1 + CONFIG.TVA_RATE) * 100) / 100
  return { price, priceTTC }
}

// Function to create missing categories
async function createMissingCategories(): Promise<void> {
  console.log('\n📁 CRÉATION DES CATÉGORIES MANQUANTES...')
  
  const now = new Date().toISOString()
  
  for (const cat of NEW_CATEGORIES) {
    try {
      await sql`
        INSERT INTO categories (id, name, slug, description, parent_id, image, icon, sort_order, is_active, product_count, created_at, updated_at)
        VALUES (${cat.id}, ${cat.name}, ${cat.slug}, ${cat.description}, ${null}, ${cat.image}, ${null}, ${cat.sortOrder}, ${true}, ${0}, ${now}, ${now})
        ON CONFLICT (id) DO NOTHING
      `
      report.categoriesCreated.push(cat.name)
      console.log(`  ✅ Catégorie: ${cat.name}`)
    } catch (error: any) {
      if (!error.message?.includes('duplicate') && !error.message?.includes('already exists')) {
        console.error(`  ❌ Erreur catégorie ${cat.name}:`, error.message)
      } else {
        console.log(`  ℹ️ Catégorie ${cat.name} existe déjà`)
      }
    }
  }
}

// Function to extract short description from full description
function extractShortDescription(fullDescription: string): string {
  // Take first sentence or first 150 characters
  const firstPart = fullDescription.split(/[,;]/)[0]
  if (firstPart.length < 150) return firstPart.trim()
  return fullDescription.substring(0, 147).trim() + '...'
}

// Function to import a single product
async function importProduct(
  supplierRef: string,
  designation: string,
  costPrice: number,
  categoryId: string,
  sheetName: string
): Promise<boolean> {
  const id = generateId('prod')
  const sku = generateSKU()
  const { price } = calculatePrices(costPrice)
  const brandName = extractBrand(designation)
  const brandId = await getOrCreateBrand(brandName)
  
  // Clean up the product name
  let productName = designation.split(/[,;]/)[0].trim()
  if (productName.length > 250) {
    productName = productName.substring(0, 247) + '...'
  }
  
  const baseSlug = generateSlug(productName)
  const slug = `${baseSlug}-${sku.toLowerCase()}`
  const shortDescription = extractShortDescription(designation)
  const description = `${designation}\n\nRéférence fournisseur: ${supplierRef}`
  
  const now = new Date().toISOString()
  const tags = JSON.stringify([sheetName.toLowerCase().replace(/[^a-z0-9]/g, '-')])
  const images = JSON.stringify(['/placeholder.svg'])
  const attributes = JSON.stringify({})
  
  try {
    await sql`
      INSERT INTO products (
        id, name, slug, sku, description, short_description,
        category_id, brand_id, product_type, price, compare_at_price, cost_price,
        images, thumbnail, status, stock_quantity, low_stock_threshold,
        weight, dimensions, attributes, tags, is_featured, rental_durations,
        created_at, updated_at
      ) VALUES (
        ${id}, ${productName}, ${slug}, ${sku}, ${description}, ${shortDescription},
        ${categoryId}, ${brandId}, ${'sale'}, ${price}, ${null}, ${costPrice},
        ${images}, ${'/placeholder.svg'}, ${CONFIG.DEFAULT_STATUS}, ${CONFIG.DEFAULT_STOCK}, ${5},
        ${null}, ${null}, ${attributes}, ${tags}, ${false}, ${null},
        ${now}, ${now}
      )
    `
    report.imported++
    return true
  } catch (error: any) {
    report.errors.push({ product: productName.substring(0, 50), error: error.message || String(error) })
    return false
  }
}

// Main function to process all sheets
async function processExcel(): Promise<void> {
  console.log('='.repeat(70))
  console.log('🚀 IMPORT DES PRODUITS BOUTIQUE')
  console.log('='.repeat(70))
  console.log(`\nFichier: ${EXCEL_FILE}`)
  console.log(`Marge: ${CONFIG.MARGIN_PERCENTAGE * 100}%`)
  console.log(`TVA: ${CONFIG.TVA_RATE * 100}%`)
  console.log(`Stock initial: ${CONFIG.DEFAULT_STOCK}`)
  console.log(`Statut: ${CONFIG.DEFAULT_STATUS}`)
  console.log(`Base de données: ${DATABASE_URL?.substring(0, 50)}...`)
  
  // Check if file exists
  if (!fs.existsSync(EXCEL_FILE)) {
    console.error('❌ Fichier Excel non trouvé!')
    return
  }
  
  // Load existing brands
  console.log('\n📦 CHARGEMENT DES DONNÉES EXISTANTES...')
  await loadBrands()
  
  // Create missing categories first
  await createMissingCategories()
  
  // Read the Excel file
  const workbook = XLSX.readFile(EXCEL_FILE)
  
  console.log('\n📦 IMPORT DES PRODUITS PAR ONGLET...')
  console.log('='.repeat(70))
  
  for (const sheetName of Object.keys(SHEET_CATEGORY_MAPPING)) {
    const worksheet = workbook.Sheets[sheetName]
    if (!worksheet) {
      console.log(`\n⚠️ Onglet "${sheetName}" non trouvé`)
      continue
    }
    
    const categoryId = SHEET_CATEGORY_MAPPING[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][]
    
    console.log(`\n📌 Traitement: "${sheetName}" → ${categoryId}`)
    
    let productsInSheet = 0
    
    // Process each row (skip header rows)
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      
      // Check if this is a valid product row
      const supplierRef = row[0] ? String(row[0]).trim() : ''
      const designation = row[1] ? String(row[1]).trim() : ''
      const priceCell = row[2]
      
      // Skip if:
      // - No designation
      // - Designation is a header
      // - No valid price
      // - Very short designation
      if (!designation || 
          designation.toLowerCase().includes('désignation') ||
          designation.length < 15 ||
          typeof priceCell !== 'number' ||
          priceCell < 50) {
        continue
      }
      
      const costPrice = priceCell
      
      report.totalProcessed++
      const success = await importProduct(supplierRef, designation, costPrice, categoryId, sheetName)
      
      if (success) {
        productsInSheet++
        process.stdout.write('.')
      } else {
        process.stdout.write('x')
      }
    }
    
    console.log(`\n  ✅ ${productsInSheet} produits importés`)
  }
  
  // Update category product counts
  console.log('\n📊 Mise à jour des compteurs de produits...')
  await sql`
    UPDATE categories c
    SET product_count = (
      SELECT COUNT(*) FROM products p 
      WHERE p.category_id = c.id AND p.status = 'active'
    )
  `
  
  // Update brand product counts
  await sql`
    UPDATE brands b
    SET product_count = (
      SELECT COUNT(*) FROM products p 
      WHERE p.brand_id = b.id AND p.status = 'active'
    )
  `
  
  // Print report
  console.log('\n\n' + '='.repeat(70))
  console.log('📊 RAPPORT D\'IMPORT')
  console.log('='.repeat(70))
  console.log(`\nTotal traité: ${report.totalProcessed}`)
  console.log(`Importés avec succès: ${report.imported}`)
  console.log(`Erreurs: ${report.errors.length}`)
  
  if (report.categoriesCreated.length > 0) {
    console.log(`\nCatégories créées: ${report.categoriesCreated.join(', ')}`)
  }
  
  if (report.brandsCreated.length > 0) {
    console.log(`\nMarques créées (${report.brandsCreated.length}): ${report.brandsCreated.slice(0, 10).join(', ')}${report.brandsCreated.length > 10 ? '...' : ''}`)
  }
  
  if (report.errors.length > 0) {
    console.log('\n❌ ERREURS:')
    report.errors.slice(0, 10).forEach(err => {
      console.log(`  - ${err.product}: ${err.error.substring(0, 80)}`)
    })
    if (report.errors.length > 10) {
      console.log(`  ... et ${report.errors.length - 10} autres erreurs`)
    }
  }
  
  // Save report to file
  const reportPath = path.join(process.cwd(), 'scripts', 'import-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n📄 Rapport sauvegardé: ${reportPath}`)
  
  console.log('\n✅ IMPORT TERMINÉ!')
}

// Run the import
processExcel().catch(console.error)

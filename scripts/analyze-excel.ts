/**
 * Script to analyze the Excel file structure
 * Run with: npx tsx scripts/analyze-excel.ts
 */

import * as XLSX from 'xlsx'
import * as path from 'path'
import * as fs from 'fs'

const EXCEL_FILE = path.join(process.cwd(), 'TARIFS_REVENDEURS_DECEMBRE_2025.xlsx')

async function analyzeExcel() {
  console.log('='.repeat(60))
  console.log('📊 ANALYSE DU FICHIER EXCEL')
  console.log('='.repeat(60))
  console.log(`\nFichier: ${EXCEL_FILE}`)
  
  // Check if file exists
  if (!fs.existsSync(EXCEL_FILE)) {
    console.error('❌ Fichier non trouvé!')
    return
  }
  
  // Read the Excel file
  const workbook = XLSX.readFile(EXCEL_FILE)
  
  console.log(`\n📋 ONGLETS TROUVÉS (${workbook.SheetNames.length}):`)
  console.log('-'.repeat(40))
  
  workbook.SheetNames.forEach((sheetName, index) => {
    console.log(`  ${index + 1}. "${sheetName}"`)
  })
  
  // Analyze each sheet
  console.log('\n\n📝 DÉTAIL PAR ONGLET:')
  console.log('='.repeat(60))
  
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
    
    if (data.length === 0) {
      console.log(`\n❌ Onglet "${sheetName}": VIDE`)
      continue
    }
    
    console.log(`\n📌 ONGLET: "${sheetName}"`)
    console.log('-'.repeat(40))
    
    // Get headers (first row)
    const headers = data[0] || []
    console.log(`\n  📊 Colonnes (${headers.length}):`)
    headers.forEach((header, i) => {
      console.log(`    ${i + 1}. "${header}"`)
    })
    
    // Count data rows (excluding header)
    const dataRows = data.slice(1).filter(row => row && row.length > 0 && row.some(cell => cell !== null && cell !== undefined && cell !== ''))
    console.log(`\n  📦 Nombre de produits: ${dataRows.length}`)
    
    // Show first 3 products as sample
    if (dataRows.length > 0) {
      console.log(`\n  🔍 Échantillon (3 premiers produits):`)
      const sampleRows = dataRows.slice(0, 3)
      sampleRows.forEach((row, rowIndex) => {
        console.log(`\n    --- Produit ${rowIndex + 1} ---`)
        headers.forEach((header, colIndex) => {
          const value = row[colIndex]
          if (value !== null && value !== undefined && value !== '') {
            console.log(`    ${header}: ${value}`)
          }
        })
      })
    }
  }
  
  // Summary
  console.log('\n\n' + '='.repeat(60))
  console.log('📊 RÉSUMÉ')
  console.log('='.repeat(60))
  
  let totalProducts = 0
  const categorySummary: Record<string, number> = {}
  
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
    const dataRows = data.slice(1).filter(row => row && row.length > 0 && row.some(cell => cell !== null && cell !== undefined && cell !== ''))
    categorySummary[sheetName] = dataRows.length
    totalProducts += dataRows.length
  }
  
  console.log(`\nProduits par catégorie:`)
  Object.entries(categorySummary).forEach(([category, count]) => {
    console.log(`  - ${category}: ${count} produits`)
  })
  console.log(`\n  TOTAL: ${totalProducts} produits à importer`)
}

analyzeExcel().catch(console.error)

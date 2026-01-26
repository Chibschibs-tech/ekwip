/**
 * Script to analyze column structure in detail
 * Run with: npx tsx scripts/analyze-columns.ts
 */

import * as XLSX from 'xlsx'
import * as path from 'path'

const EXCEL_FILE = path.join(process.cwd(), 'TARIFS_REVENDEURS_DECEMBRE_2025.xlsx')

// Sheets with actual products (exclude category headers and empty sheets)
const SHEETS_TO_ANALYZE = [
  'PC Bureau HP',
  'PC Bureau DELL', 
  'PC Bureau LENOVO',
  'Ecrans Gaming',
  'PC PORTABLE HP COMMERCIAL',
  'PC Portables HP CONSUMER ',
  'PC Portables DELL',
  'PC Portables ASUS',
  'PC Portables LENOVO',
  'HUAWEI',
  'MSI',
  'SERVEURS DELL',
  'IMPRESSION ET IMAGERIE HP',
  'IMPRESSION ET IMAGERIE EPSON',
  'IMPRESSION ET IMAGERIE CANON',
  'Pts Réseau HPe',
  'ALTAI',
  'Pts Réseau TP-LINK',
  'Pts Réseau HUAWEI',
  'Pts Réseau CISCO',
  'SYS. D\'EXPLOITATION',
  'ANTIVIRUS ET SECURITE',
  'EATON',
  'APC',
  'STOCKAGE',
  'MULTIMEDIA',
  'ACCESS PORT',
  'ACCESS HP',
  'ACCESS LOGITECH',
  'ACCESSLENOVO',
  'ACCESS UGREEN',
  'ACCESS DIVERS',
  'Xiaomi'
]

async function analyzeColumns() {
  console.log('='.repeat(70))
  console.log('📊 ANALYSE DÉTAILLÉE DES COLONNES')
  console.log('='.repeat(70))
  
  const workbook = XLSX.readFile(EXCEL_FILE)
  
  // Analyze first sheet in detail
  const firstSheet = 'PC Bureau HP'
  const worksheet = workbook.Sheets[firstSheet]
  
  // Get raw data with all rows
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][]
  
  console.log(`\n📋 ANALYSE DE L'ONGLET: "${firstSheet}"`)
  console.log('-'.repeat(70))
  
  // Show first 10 rows to understand structure
  console.log('\n🔍 10 PREMIÈRES LIGNES (structure brute):')
  for (let i = 0; i < Math.min(10, rawData.length); i++) {
    const row = rawData[i]
    console.log(`\n  Ligne ${i + 1}:`)
    row.forEach((cell, j) => {
      if (cell !== '' && cell !== null && cell !== undefined) {
        const colLetter = String.fromCharCode(65 + j)
        const preview = String(cell).substring(0, 80)
        console.log(`    Col ${colLetter} (${j}): ${preview}${String(cell).length > 80 ? '...' : ''}`)
      }
    })
  }
  
  // Find the header row (should contain "Référence", "Prix", etc.)
  console.log('\n\n🔎 RECHERCHE DES EN-TÊTES:')
  const keyWords = ['référence', 'ref', 'prix', 'ht', 'ttc', 'désignation', 'description', 'marque', 'stock', 'qté']
  
  for (let i = 0; i < Math.min(20, rawData.length); i++) {
    const row = rawData[i]
    const rowText = row.map(c => String(c || '').toLowerCase()).join(' | ')
    const foundKeywords = keyWords.filter(kw => rowText.includes(kw))
    if (foundKeywords.length > 0) {
      console.log(`\n  Ligne ${i + 1} contient: ${foundKeywords.join(', ')}`)
      console.log(`  Contenu: ${row.filter(c => c).map(c => String(c).substring(0, 30)).join(' | ')}`)
    }
  }
  
  // Find a complete product row with price
  console.log('\n\n💰 RECHERCHE D\'UNE LIGNE AVEC PRIX (nombre):')
  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i]
    const hasNumber = row.some(cell => typeof cell === 'number' && cell > 100)
    if (hasNumber) {
      console.log(`\n  Ligne ${i + 1}:`)
      row.forEach((cell, j) => {
        if (cell !== '' && cell !== null && cell !== undefined) {
          const colLetter = String.fromCharCode(65 + j)
          const cellType = typeof cell
          console.log(`    Col ${colLetter}: [${cellType}] ${String(cell).substring(0, 60)}`)
        }
      })
      console.log('\n  --- (Arrêt après première ligne avec prix) ---')
      break
    }
  }
  
  // Now check another sheet to compare structure
  console.log('\n\n' + '='.repeat(70))
  console.log('📋 COMPARAISON AVEC AUTRES ONGLETS')
  console.log('='.repeat(70))
  
  const samplesToCheck = ['PC Portables DELL', 'IMPRESSION ET IMAGERIE HP', 'ACCESS LOGITECH']
  
  for (const sheetName of samplesToCheck) {
    const ws = workbook.Sheets[sheetName]
    if (!ws) continue
    
    const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as any[][]
    
    console.log(`\n📌 "${sheetName}":`)
    
    // Find first row with a price (number > 100)
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      const hasNumber = row.some(cell => typeof cell === 'number' && cell > 100)
      if (hasNumber) {
        console.log(`  Première ligne avec prix: ${i + 1}`)
        row.forEach((cell, j) => {
          if (cell !== '' && cell !== null && cell !== undefined) {
            const colLetter = String.fromCharCode(65 + j)
            const cellType = typeof cell
            if (cellType === 'number' || String(cell).length > 10) {
              console.log(`    Col ${colLetter}: [${cellType}] ${String(cell).substring(0, 50)}`)
            }
          }
        })
        break
      }
    }
  }
}

analyzeColumns().catch(console.error)

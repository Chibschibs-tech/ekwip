// This script will search for MedusaJS references in the codebase
const fs = require("fs")
const path = require("path")

function searchFilesForMedusa(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !filePath.includes("node_modules") && !filePath.includes(".next")) {
      searchFilesForMedusa(filePath, fileList)
    } else if (
      stat.isFile() &&
      (filePath.endsWith(".js") ||
        filePath.endsWith(".jsx") ||
        filePath.endsWith(".ts") ||
        filePath.endsWith(".tsx") ||
        filePath.endsWith(".mjs"))
    ) {
      const content = fs.readFileSync(filePath, "utf8")

      if (content.includes("@medusajs") || content.includes("medusa") || content.toLowerCase().includes("medusa")) {
        console.log(`Found potential MedusaJS reference in: ${filePath}`)
        const lines = content.split("\n")
        lines.forEach((line, i) => {
          if (line.toLowerCase().includes("medusa")) {
            console.log(`  Line ${i + 1}: ${line.trim()}`)
          }
        })
      }
    }
  }

  return fileList
}

// Start search from current directory
searchFilesForMedusa(".")

console.log("Search completed.")

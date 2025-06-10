import { readFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

function searchInFile(filePath, content) {
  const lines = content.split("\n")
  const results = []

  lines.forEach((line, index) => {
    // Look for MedusaJS references
    if (line.includes("@medusajs") || line.includes("medusa")) {
      results.push({
        file: filePath,
        line: index + 1,
        content: line.trim(),
        type: "medusa",
      })
    }

    // Look for WordPress references
    if (line.toLowerCase().includes("wordpress") || line.includes("wp-") || line.includes("WC_")) {
      results.push({
        file: filePath,
        line: index + 1,
        content: line.trim(),
        type: "wordpress",
      })
    }
  })

  return results
}

function searchDirectory(dir, results = []) {
  try {
    const items = readdirSync(dir)

    for (const item of items) {
      const fullPath = join(dir, item)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (item !== "node_modules" && item !== ".next" && item !== ".git") {
          searchDirectory(fullPath, results)
        }
      } else if (
        item.endsWith(".ts") ||
        item.endsWith(".tsx") ||
        item.endsWith(".js") ||
        item.endsWith(".jsx") ||
        item === "package.json"
      ) {
        try {
          const content = readFileSync(fullPath, "utf8")
          const fileResults = searchInFile(fullPath, content)
          results.push(...fileResults)
        } catch (error) {
          console.log(`Could not read file: ${fullPath}`)
        }
      }
    }
  } catch (error) {
    console.log(`Could not read directory: ${dir}`)
  }

  return results
}

console.log("Searching for MedusaJS and WordPress references...\n")

const results = searchDirectory(".")

if (results.length === 0) {
  console.log("No MedusaJS or WordPress references found.")
} else {
  console.log("Found references:\n")

  const medusaRefs = results.filter((r) => r.type === "medusa")
  const wpRefs = results.filter((r) => r.type === "wordpress")

  if (medusaRefs.length > 0) {
    console.log("=== MEDUSAJS REFERENCES ===")
    medusaRefs.forEach((ref) => {
      console.log(`${ref.file}:${ref.line} - ${ref.content}`)
    })
    console.log("")
  }

  if (wpRefs.length > 0) {
    console.log("=== WORDPRESS REFERENCES ===")
    wpRefs.forEach((ref) => {
      console.log(`${ref.file}:${ref.line} - ${ref.content}`)
    })
  }
}

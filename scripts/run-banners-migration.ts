import postgres from "postgres"
import * as fs from "fs"
import * as path from "path"

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL environment variable is not set")
    process.exit(1)
  }

  const sql = postgres(databaseUrl)

  try {
    console.log("🔄 Running banners table migration...")

    // Read the SQL file
    const sqlPath = path.join(process.cwd(), "scripts", "006-update-banners-table.sql")
    const sqlContent = fs.readFileSync(sqlPath, "utf-8")

    // Split by semicolons and execute each statement
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"))

    for (const statement of statements) {
      try {
        await sql.unsafe(statement)
        console.log(`✅ Executed: ${statement.substring(0, 50)}...`)
      } catch (error: any) {
        // Ignore "does not exist" errors for DROP CONSTRAINT
        if (error.message?.includes("does not exist")) {
          console.log(`ℹ️  Skipped (already applied): ${statement.substring(0, 50)}...`)
        } else {
          throw error
        }
      }
    }

    console.log("✅ Migration completed successfully!")
  } catch (error: any) {
    console.error("❌ Migration failed:", error.message)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

runMigration()


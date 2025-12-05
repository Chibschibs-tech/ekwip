import { neon } from "@neondatabase/serverless"
import postgres from "postgres"

// Determine if we're using local or production database
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Check if it's a local database (Docker PostgreSQL)
const isLocal =
  DATABASE_URL.includes("localhost") ||
  DATABASE_URL.includes("127.0.0.1") ||
  DATABASE_URL.includes("postgres://ekwip")

// Initialize clients based on environment
let postgresClient: ReturnType<typeof postgres> | null = null
let neonClient: ReturnType<typeof neon> | null = null

if (isLocal) {
  // Use postgres package for local Docker database
  postgresClient = postgres(DATABASE_URL, {
    max: 10, // Connection pool size
    idle_timeout: 20,
    connect_timeout: 10,
  })
} else {
  // Use Neon for production
  neonClient = neon(DATABASE_URL)
}

// Unified SQL function that works with both clients
// IMPORTANT: Only accepts template strings to prevent SQL injection
export const sql = async (
  query: TemplateStringsArray,
  ...params: any[]
): Promise<any[]> => {
  if (isLocal && postgresClient) {
    // Local PostgreSQL (Docker)
    // Template strings are automatically parameterized (safe)
    return await postgresClient(query as any, ...params)
  } else if (neonClient) {
    // Production Neon database
    // Template strings are automatically parameterized (safe)
    return await neonClient(query as any, ...params)
  }

  throw new Error("No database client available. Check DATABASE_URL configuration.")
}

// Export clients for direct access if needed
export { postgresClient, neonClient, isLocal }

// Helper to generate unique IDs
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Helper to format dates for database
export function formatDate(date: Date = new Date()): string {
  return date.toISOString()
}

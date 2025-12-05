import { neon } from "@neondatabase/serverless"
// Dynamic import for postgres to avoid bundling in production
let postgres: typeof import("postgres").default | null = null

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
let postgresClient: Awaited<ReturnType<typeof getPostgresClient>> | null = null
let neonClient: ReturnType<typeof neon> | null = null

async function getPostgresClient() {
  if (!postgres) {
    postgres = (await import("postgres")).default
  }
  return postgres
}

if (isLocal) {
  // Use postgres package for local Docker database
  // Initialize lazily to avoid bundling in production
  getPostgresClient().then((pg) => {
    postgresClient = pg(DATABASE_URL, {
      max: 10, // Connection pool size
      idle_timeout: 20,
      connect_timeout: 10,
    }) as any
  })
} else {
  // Use Neon for production (Vercel)
  neonClient = neon(DATABASE_URL)
}

// Unified SQL function that works with both clients
// Supports both template strings (preferred) and parameterized string queries
export const sql = async (
  query: TemplateStringsArray | string,
  ...params: any[]
): Promise<any[]> => {
  if (isLocal && postgresClient) {
    // Local PostgreSQL (Docker)
    if (typeof query === "string") {
      // String query with parameters - convert to parameterized query
      // This is safe as long as params are provided and query uses $1, $2, etc.
      return await postgresClient.unsafe(query, params)
    } else {
      // Template string query (preferred, automatically parameterized)
      return await postgresClient(query as any, ...params)
    }
  } else if (neonClient) {
    // Production Neon database
    if (typeof query === "string") {
      // For Neon, string queries need to be executed directly
      // Note: Neon's serverless driver handles parameterization differently
      return await neonClient(query, params)
    } else {
      // Template string query
      return await neonClient(query as any, ...params)
    }
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

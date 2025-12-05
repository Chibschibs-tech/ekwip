import { neon, neonConfig } from "@neondatabase/serverless"
import postgres from "postgres"

// Determine if we're using local PostgreSQL
const isLocal = process.env.DATABASE_URL?.includes('localhost')

// For local PostgreSQL, use the postgres package
const postgresClient = isLocal ? postgres(process.env.DATABASE_URL!) : null

// For Neon (production)
const neonClient = !isLocal ? neon(process.env.DATABASE_URL!) : null

// Create a unified SQL client that works with both
export const sql = async (query: string | TemplateStringsArray, ...params: any[]) => {
  if (isLocal && postgresClient) {
    // Using postgres package for local
    if (typeof query === 'string') {
      const result = await postgresClient.unsafe(query)
      return result
    } else {
      const result = await postgresClient(query as any, ...params)
      return result
    }
  } else if (neonClient) {
    // Using Neon for production
    if (typeof query === 'string') {
      return await neonClient(query)
    } else {
      return await neonClient(query as any, ...params)
    }
  }
  throw new Error('No database client available')
}

// Helper to generate unique IDs
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Helper to format dates for database
export function formatDate(date: Date = new Date()): string {
  return date.toISOString()
}

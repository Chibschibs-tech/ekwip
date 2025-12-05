import { neon } from "@neondatabase/serverless"

// Create a reusable SQL client
const sql = neon(process.env.DATABASE_URL!)

export { sql }

// Helper to generate unique IDs
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Helper to format dates for database
export function formatDate(date: Date = new Date()): string {
  return date.toISOString()
}

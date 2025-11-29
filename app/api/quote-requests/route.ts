import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = `SELECT * FROM quote_requests WHERE 1=1`
    const params: any[] = []
    let paramIndex = 1

    if (status) {
      query += ` AND status = $${paramIndex++}`
      params.push(status)
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`
    params.push(limit, offset)

    const requests = await sql(query, params)

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching quote requests:", error)
    return NextResponse.json({ error: "Failed to fetch quote requests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("quote")
    const now = formatDate()

    const result = await sql`
      INSERT INTO quote_requests (
        id, customer_name, customer_email, customer_phone, customer_company, items, message, status, created_at, updated_at
      ) VALUES (
        ${id}, ${body.customerName}, ${body.customerEmail}, ${body.customerPhone || null},
        ${body.customerCompany || null}, ${JSON.stringify(body.items)}, ${body.message || null}, 'pending', ${now}, ${now}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating quote request:", error)
    return NextResponse.json({ error: "Failed to create quote request" }, { status: 500 })
  }
}

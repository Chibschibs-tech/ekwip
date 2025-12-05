import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await sql`SELECT * FROM orders WHERE id = ${id}`

    if (result.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Get order items
    const items = await sql`SELECT * FROM order_items WHERE order_id = ${id}`

    const order = result[0]
    return NextResponse.json({
      id: order.id,
      orderNumber: order.order_number,
      clientId: order.client_id,
      status: order.status,
      orderType: order.order_type,
      items: items.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        productName: item.product_name,
        sku: item.sku,
        quantity: item.quantity,
        price: Number.parseFloat(item.price),
        total: Number.parseFloat(item.total),
        rentalDuration: item.rental_duration,
      })),
      subtotal: Number.parseFloat(order.subtotal),
      taxAmount: Number.parseFloat(order.tax_amount || 0),
      discountAmount: Number.parseFloat(order.discount_amount || 0),
      total: Number.parseFloat(order.total),
      shippingAddress: order.shipping_address,
      billingAddress: order.billing_address,
      paymentStatus: order.payment_status,
      paymentMethod: order.payment_method,
      notes: order.notes,
      rentalStartDate: order.rental_start_date,
      rentalEndDate: order.rental_end_date,
      rentalDuration: order.rental_duration,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    const result = await sql`
      UPDATE orders SET
        status = COALESCE(${body.status}, status),
        payment_status = COALESCE(${body.paymentStatus}, payment_status),
        notes = COALESCE(${body.notes}, notes),
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Delete order items first
    await sql`DELETE FROM order_items WHERE order_id = ${id}`

    const result = await sql`DELETE FROM orders WHERE id = ${id} RETURNING id`

    if (result.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}

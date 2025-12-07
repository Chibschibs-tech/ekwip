import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const clientId = searchParams.get("clientId")
    const orderType = searchParams.get("orderType")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Use template strings with conditional logic for filters
    let orders
    if (status && clientId && orderType) {
      orders = await sql`
        SELECT * FROM orders
        WHERE status = ${status}
          AND client_id = ${clientId}
          AND order_type = ${orderType}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (status && clientId) {
      orders = await sql`
        SELECT * FROM orders
        WHERE status = ${status}
          AND client_id = ${clientId}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (status && orderType) {
      orders = await sql`
        SELECT * FROM orders
        WHERE status = ${status}
          AND order_type = ${orderType}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (clientId && orderType) {
      orders = await sql`
        SELECT * FROM orders
        WHERE client_id = ${clientId}
          AND order_type = ${orderType}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (status) {
      orders = await sql`
        SELECT * FROM orders
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (clientId) {
      orders = await sql`
        SELECT * FROM orders
        WHERE client_id = ${clientId}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (orderType) {
      orders = await sql`
        SELECT * FROM orders
        WHERE order_type = ${orderType}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      // No filters
      orders = await sql`
        SELECT * FROM orders
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    // Get items for all orders
    const orderIds = orders.map((o: any) => o.id)
    let items: any[] = []
    if (orderIds.length > 0) {
      items = await sql`SELECT * FROM order_items WHERE order_id = ANY(${orderIds})`
    }

    const itemsByOrder = items.reduce((acc: any, item: any) => {
      if (!acc[item.order_id]) acc[item.order_id] = []
      acc[item.order_id].push({
        id: item.id,
        productId: item.product_id,
        productName: item.product_name,
        sku: item.sku,
        quantity: item.quantity,
        price: Number.parseFloat(item.price),
        total: Number.parseFloat(item.total),
        rentalDuration: item.rental_duration,
        monthlyFee: item.monthly_fee ? Number.parseFloat(item.monthly_fee) : null,
        upfrontContribution: item.upfront_contribution ? Number.parseFloat(item.upfront_contribution) : null,
        itemStartDate: item.item_start_date,
        itemEndDate: item.item_end_date,
      })
      return acc
    }, {})

    const transformedOrders = orders.map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number,
      clientId: o.client_id,
      customerId: o.customer_id,
      customerName: o.customer_name,
      customerEmail: o.customer_email,
      status: o.status,
      orderType: o.order_type || 'sale',
      items: itemsByOrder[o.id] || [],
      subtotal: Number.parseFloat(o.subtotal || 0),
      taxAmount: Number.parseFloat(o.tax || 0),
      discountAmount: Number.parseFloat(o.discount || 0),
      shippingAmount: Number.parseFloat(o.shipping || 0),
      total: Number.parseFloat(o.total || 0),
      shippingAddress: o.shipping_address,
      billingAddress: o.billing_address,
      paymentStatus: o.payment_status,
      paymentMethod: o.payment_method,
      notes: o.notes,
      // Rental-specific fields
      rentalStartDate: o.rental_start_date,
      rentalEndDate: o.rental_end_date,
      rentalDuration: o.rental_duration,
      createdAt: o.created_at,
      updatedAt: o.updated_at,
      deliveredAt: o.delivered_at,
    }))

    return NextResponse.json(transformedOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("order")
    const now = formatDate()

    // Generate order number
    const countResult = await sql`SELECT COUNT(*) as count FROM orders`
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(Number.parseInt(countResult[0].count) + 1).padStart(4, "0")}`

    // Fetch client info if clientId is provided (for rental orders)
    let customerName = body.customerName || ""
    let customerEmail = body.customerEmail || ""
    
    if (body.clientId && !customerName) {
      const clientResult = await sql`SELECT company_name, contact_name, email FROM clients WHERE id = ${body.clientId}`
      if (clientResult.length > 0) {
        const client = clientResult[0]
        customerName = client.contact_name || client.company_name || "Client"
        customerEmail = client.email || ""
      }
    }

    const result = await sql`
      INSERT INTO orders (
        id, order_number, customer_id, customer_name, customer_email,
        client_id, status, order_type, subtotal, tax, shipping, discount, total,
        shipping_address, billing_address, payment_status, notes,
        rental_start_date, rental_end_date, rental_duration,
        created_at, updated_at
      ) VALUES (
        ${id}, ${orderNumber},
        ${body.customerId || null},
        ${customerName || "Customer"},
        ${customerEmail || "customer@example.com"},
        ${body.clientId || null}, ${body.status || "pending"},
        ${body.orderType || "sale"}, ${body.subtotal || 0},
        ${body.taxAmount || body.tax || 0}, ${body.shippingAmount || body.shipping || 0},
        ${body.discountAmount || body.discount || 0}, ${body.total || 0},
        ${body.shippingAddress ? JSON.stringify(body.shippingAddress) : null},
        ${body.billingAddress ? JSON.stringify(body.billingAddress) : null},
        ${body.paymentStatus || "pending"},
        ${body.notes || null}, ${body.rentalStartDate || null},
        ${body.rentalEndDate || null}, ${body.rentalDuration || null},
        ${now}, ${now}
      )
      RETURNING *
    `

    // Add order items
    if (body.items && body.items.length > 0) {
      for (const item of body.items) {
        const itemId = generateId("item")
        await sql`
          INSERT INTO order_items (
            id, order_id, product_id, product_name, sku, quantity, price, total, 
            rental_duration, monthly_fee, upfront_contribution, item_start_date, item_end_date
          ) VALUES (
            ${itemId}, ${id}, ${item.productId}, ${item.productName}, ${item.sku || ""}, 
            ${item.quantity}, ${item.price}, ${item.total}, ${item.rentalDuration || null},
            ${item.monthlyFee || null}, ${item.upfrontContribution || null},
            ${item.itemStartDate || null}, ${item.itemEndDate || null}
          )
        `
      }
    }

    // Update client stats if client exists
    if (body.clientId) {
      await sql`
        UPDATE clients SET
          total_orders = total_orders + 1,
          total_spent = total_spent + ${body.total || 0},
          updated_at = ${now}
        WHERE id = ${body.clientId}
      `
    }

    return NextResponse.json({ ...result[0], orderNumber }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

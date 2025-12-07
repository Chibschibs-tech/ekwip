import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const position = searchParams.get("position")
    const active = searchParams.get("active")

    let banners
    try {
      if (position && active === "true") {
        banners = await sql`
          SELECT * FROM banners 
          WHERE position = ${position} AND is_active = true
          ORDER BY sort_order ASC, created_at DESC
        `
      } else if (position) {
        banners = await sql`
          SELECT * FROM banners 
          WHERE position = ${position}
          ORDER BY sort_order ASC, created_at DESC
        `
      } else if (active === "true") {
        banners = await sql`
          SELECT * FROM banners 
          WHERE is_active = true
          ORDER BY sort_order ASC, created_at DESC
        `
      } else {
        banners = await sql`
          SELECT * FROM banners 
          ORDER BY position ASC, sort_order ASC, created_at DESC
        `
      }
    } catch (dbError: any) {
      console.error("Database error fetching banners:", dbError)
      if (dbError.message?.includes("does not exist") || dbError.message?.includes("connection")) {
        console.warn("Banners table may not exist. Returning empty array.")
        return NextResponse.json([])
      }
      throw dbError
    }

    const transformedBanners = (banners || []).map((b: any) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      image: b.image,
      mobileImage: b.mobile_image,
      isMobileEnabled: b.is_mobile_enabled || false,
      link: b.link,
      buttonText: b.button_text,
      position: b.position,
      order: b.sort_order,
      startDate: b.start_date,
      endDate: b.end_date,
      isActive: b.is_active,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    }))

    return NextResponse.json(transformedBanners)
  } catch (error: any) {
    console.error("Error fetching banners:", error)
    return NextResponse.json(
      { error: "Failed to fetch banners", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.title || !body.image || !body.position) {
      return NextResponse.json(
        { error: "Missing required fields: title, image, and position are required" },
        { status: 400 }
      )
    }

    const id = generateId("banner")
    const now = formatDate()

    const result = await sql`
      INSERT INTO banners (
        id, title, description, image, mobile_image, is_mobile_enabled, link, button_text, position, sort_order, start_date, end_date, is_active, created_at, updated_at
      ) VALUES (
        ${id}, ${body.title}, ${body.description || null}, ${body.image}, ${body.mobileImage || null}, ${body.isMobileEnabled || false},
        ${body.link || null}, ${body.buttonText || null}, ${body.position}, ${body.order || 0}, 
        ${body.startDate || now}, ${body.endDate || null}, ${body.isActive !== false}, ${now}, ${now}
      )
      RETURNING *
    `

    const b = result[0]
    const transformedBanner = {
      id: b.id,
      title: b.title,
      description: b.description,
      image: b.image,
      mobileImage: b.mobile_image,
      isMobileEnabled: b.is_mobile_enabled || false,
      link: b.link,
      buttonText: b.button_text,
      position: b.position,
      order: b.sort_order,
      startDate: b.start_date,
      endDate: b.end_date,
      isActive: b.is_active,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    }

    return NextResponse.json(transformedBanner, { status: 201 })
  } catch (error: any) {
    console.error("Error creating banner:", error)
    return NextResponse.json(
      { error: "Failed to create banner", details: error.message },
      { status: 500 }
    )
  }
}


import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const result = await sql`
      SELECT * FROM banners WHERE id = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

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

    return NextResponse.json(transformedBanner)
  } catch (error: any) {
    console.error("Error fetching banner:", error)
    return NextResponse.json(
      { error: "Failed to fetch banner", details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    const result = await sql`
      UPDATE banners 
      SET 
        title = ${body.title},
        description = ${body.description !== undefined ? body.description : sql`description`},
        image = ${body.image},
        mobile_image = ${body.mobileImage !== undefined ? body.mobileImage : sql`mobile_image`},
        is_mobile_enabled = ${body.isMobileEnabled !== undefined ? body.isMobileEnabled : sql`is_mobile_enabled`},
        link = ${body.link !== undefined ? body.link : sql`link`},
        button_text = ${body.buttonText !== undefined ? body.buttonText : sql`button_text`},
        position = ${body.position},
        sort_order = ${body.order !== undefined ? body.order : sql`sort_order`},
        start_date = ${body.startDate || now},
        end_date = ${body.endDate !== undefined ? body.endDate : sql`end_date`},
        is_active = ${body.isActive !== undefined ? body.isActive : sql`is_active`},
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

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

    return NextResponse.json(transformedBanner)
  } catch (error: any) {
    console.error("Error updating banner:", error)
    return NextResponse.json(
      { error: "Failed to update banner", details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const result = await sql`
      DELETE FROM banners WHERE id = ${id} RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Banner deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting banner:", error)
    return NextResponse.json(
      { error: "Failed to delete banner", details: error.message },
      { status: 500 }
    )
  }
}


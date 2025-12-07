import { sql, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const posts = await sql`
      SELECT * FROM blog_posts WHERE id = ${id}
    `

    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const p = posts[0]
    const transformedPost = {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      featuredImage: p.featured_image,
      authorId: p.author_id,
      authorName: p.author_name,
      category: p.category,
      tags: p.tags || [],
      isPublished: p.is_published,
      publishedAt: p.published_at,
      views: p.views || 0,
      metaTitle: p.meta_title,
      metaDescription: p.meta_description,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }

    return NextResponse.json(transformedPost)
  } catch (error: any) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post", details: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const now = formatDate()

    await sql`
      UPDATE blog_posts SET
        title = ${body.title},
        slug = ${body.slug},
        excerpt = ${body.excerpt || null},
        content = ${body.content},
        featured_image = ${body.featuredImage || null},
        author_name = ${body.authorName || null},
        category = ${body.category || null},
        tags = ${JSON.stringify(body.tags || [])},
        is_published = ${body.isPublished || false},
        published_at = ${body.isPublished && !body.publishedAt ? now : body.publishedAt || null},
        meta_title = ${body.metaTitle || null},
        meta_description = ${body.metaDescription || null},
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post", details: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    await sql`
      DELETE FROM blog_posts WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post", details: error.message }, { status: 500 })
  }
}


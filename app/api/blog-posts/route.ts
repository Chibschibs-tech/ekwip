import { sql, generateId, formatDate } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let posts
    try {
      if (published === "true") {
        if (category) {
          posts = await sql`
            SELECT * FROM blog_posts 
            WHERE is_published = true AND category = ${category}
            ORDER BY published_at DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        } else {
          posts = await sql`
            SELECT * FROM blog_posts 
            WHERE is_published = true
            ORDER BY published_at DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        }
      } else {
        posts = await sql`
          SELECT * FROM blog_posts 
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `
      }
    } catch (dbError: any) {
      console.error("Database error fetching blog posts:", dbError)
      if (dbError.message?.includes("does not exist") || dbError.message?.includes("connection")) {
        console.warn("Blog posts table may not exist. Returning empty array.")
        return NextResponse.json([])
      }
      throw dbError
    }

    const transformedPosts = (posts || []).map((p: any) => ({
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
    }))

    return NextResponse.json(transformedPosts)
  } catch (error: any) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = generateId("blog")
    const now = formatDate()

    const result = await sql`
      INSERT INTO blog_posts (
        id, title, slug, excerpt, content, featured_image, author_id, author_name,
        category, tags, is_published, published_at, meta_title, meta_description,
        created_at, updated_at
      ) VALUES (
        ${id}, ${body.title}, ${body.slug}, ${body.excerpt || null}, ${body.content},
        ${body.featuredImage || null}, ${body.authorId || null}, ${body.authorName || null},
        ${body.category || null}, ${JSON.stringify(body.tags || [])}, ${body.isPublished || false},
        ${body.isPublished ? now : null}, ${body.metaTitle || null}, ${body.metaDescription || null},
        ${now}, ${now}
      )
      RETURNING *
    `

    const p = result[0]
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

    return NextResponse.json(transformedPost, { status: 201 })
  } catch (error: any) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post", details: error.message }, { status: 500 })
  }
}


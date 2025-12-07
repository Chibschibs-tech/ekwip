#!/usr/bin/env tsx
/**
 * Create Blog Posts Table
 * This script creates the blog_posts table required for Boutique Actualités section
 */

import postgres from "postgres"

const DATABASE_URL = process.env.DATABASE_URL || 
  "postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev"

const client = postgres(DATABASE_URL)

async function createBlogPostsTable() {
  try {
    console.log("🔄 Creating blog_posts table...\n")

    // Create blog_posts table
    await client`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        featured_image VARCHAR(500),
        author_id VARCHAR(50) REFERENCES admin_users(id) ON DELETE SET NULL,
        author_name VARCHAR(255),
        category VARCHAR(100),
        tags JSONB DEFAULT '[]',
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP WITH TIME ZONE,
        views INTEGER DEFAULT 0,
        meta_title VARCHAR(255),
        meta_description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
    console.log("✅ Created blog_posts table")

    // Create indexes
    await client`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`
    console.log("✅ Created index idx_blog_posts_slug")

    await client`CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published)`
    console.log("✅ Created index idx_blog_posts_published")

    await client`CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC)`
    console.log("✅ Created index idx_blog_posts_published_at")

    await client`CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category)`
    console.log("✅ Created index idx_blog_posts_category")

    console.log("\n✅ Blog posts table creation completed!")

    // Verify
    const tableExists = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'blog_posts'
      )
    `
    
    if (tableExists[0].exists) {
      console.log("✅ Verification: blog_posts table exists")
    } else {
      console.log("❌ Verification failed: blog_posts table not found")
    }
  } catch (error: any) {
    console.error("❌ Error creating blog_posts table:", error.message)
    if (error.message.includes("already exists")) {
      console.log("ℹ️  Table might already exist. Continuing...")
    } else {
      throw error
    }
  } finally {
    await client.end()
  }
}

createBlogPostsTable().catch(console.error)


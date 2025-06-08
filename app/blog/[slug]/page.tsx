"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const allPosts = getBlogPosts()
  const relatedPosts = allPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-ekwip hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t("blog.back_to_blog")}
          </Link>

          <div className="mb-6">
            <span className="inline-block bg-ekwip-100 text-ekwip px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-8">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>
                {post.readingTime} {t("blog.reading_time")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
            <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image src="/placeholder.svg?height=100&width=100" alt={post.author} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{post.author}</h3>
                <p className="text-gray-600">{t("blog.author_bio")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">{t("blog.similar_articles")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex justify-between items-center">
                        <span className="inline-block bg-ekwip-100 text-ekwip px-2 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category}
                        </span>
                        <span className="text-gray-500 text-xs">{relatedPost.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{relatedPost.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("blog.cta_title")}</h2>
          <p className="text-white text-lg max-w-2xl mx-auto mb-8 opacity-90">{t("blog.cta_description")}</p>
          <Link href="/contact">
            <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
              {t("blog.cta_button")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

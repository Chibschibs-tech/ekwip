"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User } from "lucide-react"
import { format } from "date-fns"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: string
  authorName?: string
  category?: string
  publishedAt?: string
  createdAt: string
}

export function BoutiqueActualites() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blog-posts?published=true&limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data)
        }
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Actualités</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Actualités</h2>
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">Aucun article disponible pour le moment.</p>
            <p className="text-sm text-slate-500">Les actualités seront publiées prochainement.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Actualités</h2>
            <p className="text-slate-600">Dernières nouvelles et articles</p>
          </div>
          <Link href="/actualites" className="hidden md:flex items-center gap-2 text-[#1f3b57] font-medium hover:underline">
            Voir toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/actualites/${post.slug}`}>
              <Card className="group overflow-hidden rounded-2xl border-0 shadow-[0_4px_15px_rgb(0,0,0,0.08)] hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl font-bold text-slate-300">
                          {post.title.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    {post.category && (
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    )}
                    <h3 className="font-bold text-lg text-slate-800 line-clamp-2 group-hover:text-[#1f3b57] transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {format(new Date(post.publishedAt), "d MMM yyyy")}
                          </span>
                        </div>
                      )}
                      {post.authorName && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.authorName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile "See all" link */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/actualites" className="text-[#1f3b57] font-medium hover:underline flex items-center justify-center gap-2">
            Voir toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}


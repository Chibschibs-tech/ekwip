"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getBlogPosts } from "@/lib/blog"

export default function BlogPage() {
  const posts = getBlogPosts()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Blog Ekwip</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos conseils, actualités et guides pour optimiser la gestion de vos équipements professionnels
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Article à la une</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={featuredPost.coverImage || "/placeholder.svg"}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="mb-4">
                <span className="inline-block bg-ekwip-100 text-ekwip px-3 py-1 rounded-full text-sm font-medium">
                  {featuredPost.category}
                </span>
                <span className="ml-4 text-gray-500 text-sm">{featuredPost.date}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{featuredPost.title}</h3>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <Link href={`/blog/${featuredPost.slug}`}>
                <Button>Lire l'article</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Articles récents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-md transition-all">
                  <div className="relative h-48 rounded-t-xl overflow-hidden">
                    <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3 flex justify-between items-center">
                      <span className="inline-block bg-ekwip-100 text-ekwip px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Catégories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["Gestion de trésorerie", "Équipements IT", "Optimisation", "Tendances"].map((category) => (
              <Card key={category} className="hover:shadow-md transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-800">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

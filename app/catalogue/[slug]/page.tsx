"use client"

import { useState } from "react"

interface Category {
  name: string
  slug: string
}

interface Props {
  params: { slug: string }
}

const categories: Category[] = [
  { name: "All", slug: "all" },
  { name: "Category 1", slug: "category-1" },
  { name: "Category 2", slug: "category-2" },
  { name: "Category 3", slug: "category-3" },
]

export default function CataloguePage({ params }: Props) {
  const { slug } = params
  const [activeCategory, setActiveCategory] = useState(slug)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Catalogue</h1>

      {/* Category Tabs */}
      <div className="flex border-b border-slate-200">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => setActiveCategory(category.slug)}
            className={
              category.slug === activeCategory
                ? "px-4 py-2 text-ekwip border-b-2 border-ekwip font-semibold transition-colors"
                : "px-4 py-2 text-slate-600 hover:text-slate-800 border-b-2 border-transparent hover:border-slate-300 transition-colors"
            }
          >
            {category.name}
          </button>
        ))}
      </div>

      <p className="mt-4">
        You are currently viewing the <strong>{activeCategory}</strong> category.
      </p>
    </div>
  )
}

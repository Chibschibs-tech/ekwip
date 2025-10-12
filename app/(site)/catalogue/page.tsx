"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCategories } from "@/contexts/categories-context"

export default function CataloguePage() {
  const { categories } = useCategories()
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const filteredCategories = categories.filter(
    (cat) =>
      cat.status === "active" &&
      (cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-600 text-white">Notre gamme complète</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Notre catalogue d'équipements</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Découvrez notre gamme complète d'équipements professionnels en location
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Nos catégories</h2>
            <p className="text-slate-600">
              {filteredCategories.length} {filteredCategories.length === 1 ? "catégorie" : "catégories"}
              {searchQuery && " trouvée(s)"}
            </p>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">Aucune catégorie trouvée</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Réinitialiser la recherche
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <Link key={category.id} href={`/catalogue/${category.slug}`}>
                  <Card className="group hover:shadow-xl transition-all cursor-pointer border-2 border-slate-100 hover:border-blue-200 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative">
                        {category.image ? (
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-contain p-8 group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                              <span className="text-4xl text-slate-400">📦</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-slate-600 mb-4 line-clamp-2">{category.description}</p>
                        )}
                        <span className="text-blue-600 font-medium inline-flex items-center group-hover:gap-2 transition-all">
                          Voir les produits
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Notre équipe d'experts est là pour vous conseiller et vous accompagner dans votre choix
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contactez-nous
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

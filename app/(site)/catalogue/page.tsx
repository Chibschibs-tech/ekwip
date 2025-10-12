"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Laptop, Smartphone, Printer, Monitor } from "lucide-react"
import { useCategories } from "@/contexts/categories-context"

const iconMap = {
  laptop: Laptop,
  smartphone: Smartphone,
  printer: Printer,
  desktop: Monitor,
}

export default function CataloguePage() {
  const { categories } = useCategories()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="h-12 w-64 bg-slate-200 animate-pulse rounded mx-auto mb-6"></div>
            <div className="h-6 w-96 bg-slate-200 animate-pulse rounded mx-auto"></div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Notre catalogue d'équipements</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements professionnels en location
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Nos catégories</h2>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">Aucune catégorie disponible pour le moment</p>
              <p className="text-sm text-slate-500">Les catégories seront bientôt ajoutées</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Laptop

                return (
                  <Link key={category.id} href={`/catalogue/${category.slug}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 h-full cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </h3>
                            {category.description && (
                              <p className="text-slate-600 text-sm line-clamp-2">{category.description}</p>
                            )}
                            {category.productCount !== undefined && (
                              <Badge variant="secondary" className="mt-3">
                                {category.productCount} {category.productCount === 1 ? "produit" : "produits"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#1f3b57] to-[#2d4a63] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Notre équipe d'experts est à votre disposition pour vous conseiller
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#1f3b57] hover:bg-blue-50 hover:text-[#1f3b57]"
            >
              Contactez-nous
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

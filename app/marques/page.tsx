"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useBrands } from "@/contexts/brands-context"

export default function BrandsPage() {
  const { brands, loading } = useBrands()
  const [searchQuery, setSearchQuery] = useState("")

  const activeBrands = brands.filter((b) => b.isActive)
  const filteredBrands = activeBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos marques</h1>
          <p className="text-lg text-gray-600">Découvrez toutes les marques disponibles chez Ekwip</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une marque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune marque trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Link key={brand.id} href={`/boutique?marque=${brand.slug}`}>
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="text-4xl font-bold text-gray-300">{brand.name.charAt(0)}</div>
                      )}
                    </div>
                    <h3 className="font-semibold text-center mb-1">{brand.name}</h3>
                    <p className="text-sm text-gray-600 text-center">
                      {brand.productCount} produit{brand.productCount > 1 ? "s" : ""}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

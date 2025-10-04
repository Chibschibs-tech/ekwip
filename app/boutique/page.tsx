"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useNeedsList } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [mounted, setMounted] = useState(false)
  const { addItem } = useNeedsList()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    const loadProducts = () => {
      if (typeof window !== "undefined") {
        const savedProducts = localStorage.getItem("products")
        if (savedProducts) {
          try {
            const allProducts: Product[] = JSON.parse(savedProducts)
            const saleProducts = allProducts.filter((p) => p.productType === "sale" && p.status === "published")
            setProducts(saleProducts)
            setFilteredProducts(saleProducts)
          } catch (error) {
            console.error("Error loading products:", error)
          }
        }
      }
    }

    loadProducts()

    const handleStorageChange = () => {
      loadProducts()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    let filtered = [...products]

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price-asc":
        filtered.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0))
        break
      case "price-desc":
        filtered.sort((a, b) => (b.salePrice || 0) - (a.salePrice || 0))
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, sortBy, products])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre liste de besoins`,
    })
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Boutique en ligne</h1>
        <p className="text-gray-600">Découvrez nos équipements informatiques à la vente</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="newest">Plus récents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun produit disponible</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Link href={`/boutique/produit/${product.slug}`}>
                  <div className="aspect-square relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400">Pas d'image</span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="space-y-2">
                  {product.brand && (
                    <Badge variant="outline" className="text-xs">
                      {product.brand}
                    </Badge>
                  )}

                  <Link href={`/boutique/produit/${product.slug}`}>
                    <h3 className="font-semibold text-lg hover:text-[#1f3b57] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1f3b57]">
                      {product.salePrice?.toLocaleString("fr-MA")} DH
                    </span>
                    <span className="text-xs text-gray-500">HT</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    {((product.salePrice || 0) * 1.2).toLocaleString("fr-MA")} DH TTC
                  </div>

                  {product.stock !== undefined && (
                    <div className="text-sm">
                      {product.stock > 0 ? (
                        <span className="text-green-600">En stock ({product.stock})</span>
                      ) : (
                        <span className="text-red-600">Rupture de stock</span>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/80"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

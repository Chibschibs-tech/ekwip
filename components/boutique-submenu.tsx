"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronDown, Menu, Grid3X3, Sparkles, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"

export function BoutiqueSubmenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { categories } = useCategories()
  const { products } = useProducts()

  // Get active categories with actual sale product counts
  const categoriesWithCounts = useMemo(() => {
    const activeCategories = categories.filter((cat) => cat.isActive)
    return activeCategories
      .map((category) => {
        const productCount = products.filter(
          (p) => p.categoryId === category.id && p.productType === "sale" && p.status === "active"
        ).length
        return { ...category, productCount }
      })
      .filter((cat) => cat.productCount > 0)
      .sort((a, b) => b.productCount - a.productCount)
  }, [categories, products])

  // Top categories for quick access (top 5 by product count)
  const topCategories = categoriesWithCounts.slice(0, 5)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/boutique?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <div className="bg-white border-b sticky top-[64px] z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-2">
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-full px-4 hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
              >
                <Grid3X3 className="h-5 w-5" />
                <span className="hidden sm:inline">Toutes les catégories</span>
                <span className="sm:hidden">Catégories</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 max-h-[70vh] overflow-y-auto">
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Toutes les catégories
              </div>
              <DropdownMenuSeparator />
              {categoriesWithCounts.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500">Aucune catégorie disponible</div>
              ) : (
                categoriesWithCounts.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link
                      href={`/boutique/${category.slug}`}
                      className="flex items-center justify-between w-full cursor-pointer py-2"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {category.productCount}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/boutique/tous-les-produits"
                  className="flex items-center gap-2 w-full cursor-pointer py-2 text-[#1f3b57] font-medium"
                >
                  <Grid3X3 className="h-4 w-4" />
                  Voir tous les produits
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Menu - Dynamic top categories */}
          <div className="hidden lg:flex items-center border-l border-slate-200 ml-2">
            <Link href="/boutique?filter=promotions">
              <Button
                variant="ghost"
                className="h-14 px-4 hover:bg-amber-50 hover:text-amber-700 font-medium text-amber-600 rounded-none flex items-center gap-1"
              >
                <Sparkles className="h-4 w-4" />
                Promos
              </Button>
            </Link>
            {topCategories.map((category) => (
              <Link key={category.id} href={`/boutique/${category.slug}`}>
                <Button
                  variant="ghost"
                  className="h-14 px-4 hover:bg-slate-50 font-medium text-slate-700 rounded-none"
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center ml-auto">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 h-9 text-sm border-slate-200 focus:border-[#1f3b57] focus:ring-[#1f3b57]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="lg:hidden ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white pb-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="p-3 border-b">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </form>
            
            <div className="py-2 space-y-1">
              <Link href="/boutique?filter=promotions" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start h-auto py-3 px-4 text-amber-600">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Promotions
                </Button>
              </Link>
              {topCategories.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/boutique/${category.slug}`} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-between h-auto py-3 px-4">
                    <span>{category.name}</span>
                    <span className="text-xs text-slate-400">({category.productCount})</span>
                  </Button>
                </Link>
              ))}
              <div className="border-t my-2" />
              <Link href="/boutique/tous-les-produits" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start h-auto py-3 px-4 text-[#1f3b57] font-medium">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Voir tous les produits
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


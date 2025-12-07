"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCategories } from "@/contexts/categories-context"

export function BoutiqueSubmenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { categories } = useCategories()

  // Get active categories with sale products
  const activeCategories = categories.filter((cat) => cat.isActive)

  const menuItems = [
    { name: "Promotions", href: "/boutique?filter=promotions" },
    { name: "Laptops", href: "/boutique?category=laptops" },
    { name: "Smartphones", href: "/boutique?category=smartphones" },
    { name: "Accessoires", href: "/boutique?category=accessoires" },
  ]

  return (
    <div className="bg-white border-b sticky top-[64px] z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-2">
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-full px-4 hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
              >
                <Menu className="h-5 w-5" />
                Toutes les catégories
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 max-h-96 overflow-y-auto">
              {activeCategories.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500">Aucune catégorie disponible</div>
              ) : (
                activeCategories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link
                      href={`/boutique/${category.slug}`}
                      className="flex items-center justify-between w-full cursor-pointer"
                    >
                      <span>{category.name}</span>
                      {category.productCount > 0 && (
                        <span className="text-xs text-slate-400">({category.productCount})</span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Menu - Closer to dropdown */}
          <div className="hidden md:flex items-center">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="h-14 px-4 hover:bg-slate-50 font-medium text-slate-700 rounded-none"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="py-2 space-y-1">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-auto py-3 px-4">
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


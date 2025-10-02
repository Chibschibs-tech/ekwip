"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-[#1f3b57] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo-white.png" alt="ekwip" width={100} height={30} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/comment-ca-marche" className="hover:text-gray-200 transition-colors">
              Comment ça marche
            </Link>
            <Link href="/catalogue" className="hover:text-gray-200 transition-colors">
              Catalogue
            </Link>
            <Link href="/marques" className="hover:text-gray-200 transition-colors">
              Marques
            </Link>
            <Link href="/blog" className="hover:text-gray-200 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-200 transition-colors">
              Contact
            </Link>
            <Link href="/ma-liste-besoins" className="relative hover:text-gray-200 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link href="/portail-client">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#1f3b57]"
              >
                Portail client
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link
              href="/comment-ca-marche"
              className="block hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              href="/catalogue"
              className="block hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalogue
            </Link>
            <Link
              href="/marques"
              className="block hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marques
            </Link>
            <Link
              href="/blog"
              className="block hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/ma-liste-besoins"
              className="block hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Liste de besoins {cartItemsCount > 0 && `(${cartItemsCount})`}
            </Link>
            <Link href="/portail-client" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full bg-transparent border-white text-white hover:bg-white hover:text-[#1f3b57]"
              >
                Portail client
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

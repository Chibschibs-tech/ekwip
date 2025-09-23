"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-black.png" alt="Ekwip" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/comment-ca-marche" className="text-gray-700 hover:text-ekwip transition-colors">
              Comment ça marche
            </Link>
            <Link href="/catalogue" className="text-gray-700 hover:text-ekwip transition-colors">
              Catalogue
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-ekwip transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-ekwip transition-colors">
              Contact
            </Link>
            <Link
              href="/ma-liste-besoins"
              className="flex items-center text-gray-700 hover:text-ekwip transition-colors"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              Liste de besoins
              {itemCount > 0 && (
                <span className="ml-1 bg-ekwip text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Button asChild className="bg-ekwip hover:bg-ekwip-700">
              <Link href="/portail-client">Portail client</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-ekwip focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/comment-ca-marche"
                className="block px-3 py-2 text-gray-700 hover:text-ekwip transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Comment ça marche
              </Link>
              <Link
                href="/catalogue"
                className="block px-3 py-2 text-gray-700 hover:text-ekwip transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Catalogue
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-ekwip transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-ekwip transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/ma-liste-besoins"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-ekwip transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Liste de besoins
                {itemCount > 0 && (
                  <span className="ml-2 bg-ekwip text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-ekwip hover:bg-ekwip-700">
                  <Link href="/portail-client" onClick={() => setIsOpen(false)}>
                    Portail client
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

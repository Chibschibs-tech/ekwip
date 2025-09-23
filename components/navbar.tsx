"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import NeedsListIcon from "@/components/cart/cart-icon"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-black.png"
                alt="Ekwip Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/comment-ca-marche"
                className="text-gray-700 hover:text-ekwip px-3 py-2 text-sm font-medium transition-colors"
              >
                Comment ça marche
              </Link>
              <Link
                href="/catalogue"
                className="text-gray-700 hover:text-ekwip px-3 py-2 text-sm font-medium transition-colors"
              >
                Catalogue
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-ekwip px-3 py-2 text-sm font-medium transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-ekwip px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Needs List Icon */}
            <NeedsListIcon />

            <Link href="/portail-client">
              <Button variant="gradient" size="sm" className="relative group">
                Portail Client
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Accédez à votre espace client
                </div>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-ekwip focus:outline-none focus:text-ekwip">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            <Link
              href="/comment-ca-marche"
              className="text-gray-700 hover:text-ekwip block px-3 py-2 text-base font-medium transition-colors"
              onClick={closeMenu}
            >
              Comment ça marche
            </Link>
            <Link
              href="/catalogue"
              className="text-gray-700 hover:text-ekwip block px-3 py-2 text-base font-medium transition-colors"
              onClick={closeMenu}
            >
              Catalogue
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-ekwip block px-3 py-2 text-base font-medium transition-colors"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-ekwip block px-3 py-2 text-base font-medium transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>

            {/* Mobile Needs List */}
            <div className="px-3 py-2">
              <NeedsListIcon />
            </div>

            <div className="px-3 py-2">
              <Link href="/portail-client" onClick={closeMenu}>
                <Button variant="gradient" size="sm" className="w-full">
                  Portail Client
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { CartIcon } from "./cart/cart-icon"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-black.png" alt="Ekwip" width={120} height={40} className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/comment-ca-marche" className="text-gray-700 hover:text-[#1f3b57] transition-colors">
              Comment ça marche
            </Link>
            <Link href="/catalogue" className="text-gray-700 hover:text-[#1f3b57] transition-colors">
              Catalogue Location
            </Link>
            <Link href="/boutique" className="text-gray-700 hover:text-[#1f3b57] transition-colors">
              Boutique Vente
            </Link>
            <Link href="/marques" className="text-gray-700 hover:text-[#1f3b57] transition-colors">
              Marques
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#1f3b57] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1f3b57] transition-colors">
              Contact
            </Link>
            <CartIcon />
            <Link href="/portail-client">
              <Button className="bg-[#1f3b57] hover:bg-[#1f3b57]/80">Portail Client</Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/comment-ca-marche"
              className="block text-gray-700 hover:text-[#1f3b57] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              href="/catalogue"
              className="block text-gray-700 hover:text-[#1f3b57] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalogue Location
            </Link>
            <Link
              href="/boutique"
              className="block text-gray-700 hover:text-[#1f3b57] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Boutique Vente
            </Link>
            <Link
              href="/marques"
              className="block text-gray-700 hover:text-[#1f3b57] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marques
            </Link>
            <Link
              href="/blog"
              className="block text-gray-700 hover:text-[#1f3b57] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-[#1f3b57] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-4">
              <CartIcon />
              <Link href="/portail-client" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-[#1f3b57] hover:bg-[#1f3b57]/80">Portail Client</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

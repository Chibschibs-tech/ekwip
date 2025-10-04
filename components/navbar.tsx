"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import CartIcon from "@/components/cart/cart-icon"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-black.png" alt="Ekwip Logo" width={120} height={40} className="dark:hidden" />
            <Image
              src="/images/logo-white.png"
              alt="Ekwip Logo"
              width={120}
              height={40}
              className="hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Accueil
            </Link>
            <Link href="/catalogue" className="text-sm font-medium transition-colors hover:text-primary">
              Catalogue Location
            </Link>
            <Link href="/boutique" className="text-sm font-medium transition-colors hover:text-primary">
              Boutique Vente
            </Link>
            <Link href="/marques" className="text-sm font-medium transition-colors hover:text-primary">
              Marques
            </Link>
            <Link href="/comment-ca-marche" className="text-sm font-medium transition-colors hover:text-primary">
              Comment ça marche
            </Link>
            <Link href="/portail-client" className="text-sm font-medium transition-colors hover:text-primary">
              Portail Client
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
            <CartIcon />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/catalogue"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Catalogue Location
              </Link>
              <Link
                href="/boutique"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Boutique Vente
              </Link>
              <Link
                href="/marques"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Marques
              </Link>
              <Link
                href="/comment-ca-marche"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça marche
              </Link>
              <Link
                href="/portail-client"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Portail Client
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/ma-liste-besoins"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Ma liste de besoins
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

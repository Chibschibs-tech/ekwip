"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { CartIcon } from "@/components/cart/cart-icon"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, language, setLanguage, dir } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.catalog"), href: "/catalogue" },
    { name: t("nav.store"), href: "/boutique" },
    { name: t("nav.brands"), href: "/marques" },
    { name: t("nav.how-it-works"), href: "/comment-ca-marche" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  if (!mounted) {
    return (
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white border-b sticky top-0 z-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/images/logo-black.png" alt="Ekwip" width={120} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#1f3b57] px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === "fr" ? "bg-white text-[#1f3b57] shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === "en" ? "bg-white text-[#1f3b57] shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === "ar" ? "bg-white text-[#1f3b57] shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                AR
              </button>
            </div>

            <CartIcon />

            <Link href="/portail-client">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1f3b57] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2 px-3 py-2 border-t mt-2 pt-4">
              <span className="text-sm text-gray-500">Langue:</span>
              <button
                onClick={() => {
                  setLanguage("fr")
                  setIsMenuOpen(false)
                }}
                className={`px-2 py-1 text-sm rounded ${language === "fr" ? "bg-[#1f3b57] text-white" : "bg-gray-100"}`}
              >
                FR
              </button>
              <button
                onClick={() => {
                  setLanguage("en")
                  setIsMenuOpen(false)
                }}
                className={`px-2 py-1 text-sm rounded ${language === "en" ? "bg-[#1f3b57] text-white" : "bg-gray-100"}`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  setLanguage("ar")
                  setIsMenuOpen(false)
                }}
                className={`px-2 py-1 text-sm rounded ${language === "ar" ? "bg-[#1f3b57] text-white" : "bg-gray-100"}`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

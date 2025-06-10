"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import NeedsListIcon from "@/components/cart/cart-icon"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleLanguageChange = (lang: "fr" | "en" | "es") => {
    setLanguage(lang)
    setShowLanguages(false)
  }

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case "fr":
        return "🇫🇷"
      case "en":
        return "🇬🇧"
      case "es":
        return "🇪🇸"
      default:
        return "🇫🇷"
    }
  }

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
                {t("nav.how_it_works")}
              </Link>
              <Link
                href="/catalogue"
                className="text-gray-700 hover:text-ekwip px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("nav.catalog")}
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-ekwip px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("nav.blog")}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-ekwip px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Needs List Icon */}
            <NeedsListIcon />

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center space-x-1 text-gray-700 hover:text-ekwip px-2 py-1 rounded-md transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">{getLanguageFlag(language)}</span>
              </button>

              {showLanguages && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => handleLanguageChange("fr")}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                      language === "fr" ? "bg-blue-50 text-ekwip" : "text-gray-700"
                    }`}
                  >
                    <span>🇫🇷</span>
                    <span>Français</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                      language === "en" ? "bg-blue-50 text-ekwip" : "text-gray-700"
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange("es")}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                      language === "es" ? "bg-blue-50 text-ekwip" : "text-gray-700"
                    }`}
                  >
                    <span>🇪🇸</span>
                    <span>Español</span>
                  </button>
                </div>
              )}
            </div>

            <Link href="/portail-client">
              <Button variant="gradient" size="sm" className="relative group">
                {t("nav.customer_portal")}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {t("nav.customer_portal_description")}
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
              {t("nav.how_it_works")}
            </Link>
            <Link
              href="/catalogue"
              className="text-gray-700 hover:text-ekwip block px-3 py-2 text-base font-medium transition-colors"
              onClick={closeMenu}
            >
              {t("nav.catalog")}
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-ekwip block px-3 py-2 text-base font-medium transition-colors"
              onClick={closeMenu}
            >
              {t("nav.blog")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-ekwip block px-3 py-2 text-base font-medium transition-colors"
              onClick={closeMenu}
            >
              {t("nav.contact")}
            </Link>

            {/* Mobile Needs List */}
            <div className="px-3 py-2">
              <NeedsListIcon />
            </div>

            {/* Mobile Language Switcher */}
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-700 mb-2">Language</div>
              <div className="space-y-1">
                <button
                  onClick={() => handleLanguageChange("fr")}
                  className={`w-full text-left px-2 py-1 text-sm rounded flex items-center space-x-2 ${
                    language === "fr" ? "bg-blue-50 text-ekwip" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>🇫🇷</span>
                  <span>Français</span>
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`w-full text-left px-2 py-1 text-sm rounded flex items-center space-x-2 ${
                    language === "en" ? "bg-blue-50 text-ekwip" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
                <button
                  onClick={() => handleLanguageChange("es")}
                  className={`w-full text-left px-2 py-1 text-sm rounded flex items-center space-x-2 ${
                    language === "es" ? "bg-blue-50 text-ekwip" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>🇪🇸</span>
                  <span>Español</span>
                </button>
              </div>
            </div>

            <div className="px-3 py-2">
              <Link href="/portail-client" onClick={closeMenu}>
                <Button variant="gradient" size="sm" className="w-full">
                  {t("nav.customer_portal")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

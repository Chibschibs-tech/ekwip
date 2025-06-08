"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Image from "next/image"

// Import the language switcher and useLanguage hook
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add the t function from useLanguage
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full py-4 px-4 md:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-2xl font-semibold text-gray-800">
          <Image src="/images/logo-black.png" alt="Ekwip" width={120} height={40} className="h-8 w-auto" />
        </Link>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-2">
                  <Link href="/" className="flex items-center text-2xl font-semibold text-gray-800">
                    <span className="text-ekwip mr-1">›</span>ekwip
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="mobile-touch-target">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col">
                  <Link
                    href="/comment-ca-marche"
                    className="px-6 py-4 text-lg font-medium text-gray-800 hover:text-ekwip hover:bg-ekwip-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.how_it_works")}
                  </Link>
                  <a
                    href="https://ekwip.ma/catalogue"
                    className="px-6 py-4 text-lg font-medium text-gray-800 hover:text-ekwip hover:bg-ekwip-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.catalog")}
                  </a>
                  {/* Temporarily commented out Store link
                <Link
                  href="/store"
                  className="px-6 py-4 text-lg font-medium text-gray-800 hover:text-ekwip hover:bg-ekwip-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.store")}
                </Link>
                */}
                  <Link
                    href="/contact"
                    className="px-6 py-4 text-lg font-medium text-gray-800 hover:text-ekwip hover:bg-ekwip-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.contact")}
                  </Link>
                </nav>
              </div>
              <div className="p-6 border-t">
                <Link href="/portail-client" onClick={() => setIsOpen(false)}>
                  <Button variant="gradient" className="w-full">
                    {t("nav.customer_portal")}
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/comment-ca-marche" className="text-gray-700 hover:text-ekwip font-medium transition-colors">
            {t("nav.how_it_works")}
          </Link>
          <a href="https://ekwip.ma/catalogue" className="text-gray-700 hover:text-ekwip font-medium transition-colors">
            {t("nav.catalog")}
          </a>
          {/* Temporarily commented out Store link
        <Link href="/store" className="text-gray-700 hover:text-ekwip font-medium transition-colors">
          {t("nav.store")}
        </Link>
        */}
          <Link href="/blog" className="text-gray-700 hover:text-ekwip font-medium transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-ekwip font-medium transition-colors">
            {t("nav.contact")}
          </Link>
          <LanguageSwitcher />
        </nav>

        <div className="hidden lg:block group relative">
          <Button variant="gradient" className="rounded-full px-6 shadow-md">
            {t("nav.customer_portal")}
          </Button>
          <div className="absolute right-0 mt-2 w-64 p-3 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-sm text-gray-600">
            {t("nav.customer_portal_description")}
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage, type Language } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm" onClick={() => setIsOpen(!isOpen)}>
        <Globe className="h-4 w-4" />
        <span className="uppercase">{language}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${language === "fr" ? "bg-ekwip-50 text-ekwip" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => toggleLanguage("fr")}
            >
              Français
            </button>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${language === "en" ? "bg-ekwip-50 text-ekwip" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => toggleLanguage("en")}
            >
              English
            </button>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${language === "es" ? "bg-ekwip-50 text-ekwip" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => toggleLanguage("es")}
            >
              Español
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

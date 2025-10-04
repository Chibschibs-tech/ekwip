"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    needs_list: "Ma liste de besoins",
    items: "articles",
    cart: "Panier",
    home: "Accueil",
    catalog: "Catalogue",
    brands: "Marques",
    shop: "Boutique Vente",
    how_it_works: "Comment ça marche",
    client_portal: "Portail Client",
    contact: "Contact",
  },
  ar: {
    needs_list: "قائمة احتياجاتي",
    items: "عناصر",
    cart: "السلة",
    home: "الرئيسية",
    catalog: "الكتالوج",
    brands: "العلامات التجارية",
    shop: "متجر البيع",
    how_it_works: "كيف يعمل",
    client_portal: "بوابة العميل",
    contact: "اتصل بنا",
  },
  en: {
    needs_list: "My needs list",
    items: "items",
    cart: "Cart",
    home: "Home",
    catalog: "Catalog",
    brands: "Brands",
    shop: "Shop",
    how_it_works: "How it works",
    client_portal: "Client Portal",
    contact: "Contact",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && ["fr", "ar", "en"].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

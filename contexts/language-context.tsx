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
    "nav.home": "Accueil",
    "nav.catalog": "Catalogue",
    "nav.store": "Boutique",
    "nav.brands": "Marques",
    "nav.how-it-works": "Comment ça marche",
    "nav.contact": "Contact",
    "nav.client-portal": "Portail Client",
    "nav.my-needs": "Ma liste de besoins",
    "cart.empty": "Votre liste de besoins est vide",
    "cart.items": "articles",
    "cart.view": "Voir ma liste",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.catalog": "الكتالوج",
    "nav.store": "المتجر",
    "nav.brands": "العلامات التجارية",
    "nav.how-it-works": "كيف يعمل",
    "nav.contact": "اتصل بنا",
    "nav.client-portal": "بوابة العميل",
    "nav.my-needs": "قائمة احتياجاتي",
    "cart.empty": "قائمة احتياجاتك فارغة",
    "cart.items": "عناصر",
    "cart.view": "عرض قائمتي",
  },
  en: {
    "nav.home": "Home",
    "nav.catalog": "Catalog",
    "nav.store": "Store",
    "nav.brands": "Brands",
    "nav.how-it-works": "How it works",
    "nav.contact": "Contact",
    "nav.client-portal": "Client Portal",
    "nav.my-needs": "My needs list",
    "cart.empty": "Your needs list is empty",
    "cart.items": "items",
    "cart.view": "View my list",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && ["fr", "ar", "en"].includes(savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

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

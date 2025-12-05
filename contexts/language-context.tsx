"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.catalog": "Catalogue",
    "nav.store": "Boutique",
    "nav.brands": "Marques",
    "nav.how-it-works": "Comment ça marche",
    "nav.contact": "Contact",
    "nav.client-portal": "Portail Client",
    "nav.my-needs": "Ma liste de besoins",

    // Cart
    "cart.empty": "Votre liste de besoins est vide",
    "cart.items": "articles",
    "cart.view": "Voir ma liste",
    "cart.add": "Ajouter à ma liste",
    "cart.remove": "Retirer",

    // Homepage
    "home.hero.badge": "Solutions IT professionnelles",
    "home.hero.title": "Équipez-vous, sans ruiner votre",
    "home.hero.title.highlight": "trésorerie!",
    "home.hero.description":
      "Louez vos équipements IT sur-mesure avec Ekwip. Flexibilité, performance et tranquillité d'esprit garanties.",
    "home.hero.cta.catalog": "Découvrir le catalogue",
    "home.hero.cta.quote": "Obtenir un devis",
    "home.features.title": "Pourquoi choisir Ekwip ?",
    "home.features.description": "Des solutions flexibles et performantes pour tous vos besoins informatiques",
    "home.catalog.title": "Notre catalogue d'équipements",
    "home.catalog.description": "Découvrez notre gamme complète d'équipements informatiques professionnels",
    "home.enterprise.title": "Plus de 10 collaborateurs ?",
    "home.enterprise.description":
      "Bénéficiez d'offres spéciales et d'un accompagnement dédié pour équiper toute votre équipe.",
    "home.trust.title": "Ils nous font confiance",
    "home.trust.description": "Plus de 500 entreprises nous font confiance pour leurs besoins IT",
    "home.how.title": "Comment ça marche",
    "home.how.description": "Un processus simple et efficace pour équiper votre entreprise",

    // Products
    "product.monthly": "par mois HT",
    "product.from": "À partir de",
    "product.discover": "Découvrir",
    "product.add-to-list": "Ajouter à ma liste",
    "product.in-stock": "En stock",
    "product.out-of-stock": "Rupture de stock",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Une erreur est survenue",
    "common.retry": "Réessayer",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.view": "Voir",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.all": "Tous",

    // Footer
    "footer.about": "À propos",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.admin": "Administration",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.catalog": "Catalog",
    "nav.store": "Store",
    "nav.brands": "Brands",
    "nav.how-it-works": "How it works",
    "nav.contact": "Contact",
    "nav.client-portal": "Client Portal",
    "nav.my-needs": "My needs list",

    // Cart
    "cart.empty": "Your needs list is empty",
    "cart.items": "items",
    "cart.view": "View my list",
    "cart.add": "Add to my list",
    "cart.remove": "Remove",

    // Homepage
    "home.hero.badge": "Professional IT Solutions",
    "home.hero.title": "Equip yourself, without breaking your",
    "home.hero.title.highlight": "budget!",
    "home.hero.description":
      "Rent your tailor-made IT equipment with Ekwip. Flexibility, performance and peace of mind guaranteed.",
    "home.hero.cta.catalog": "Discover catalog",
    "home.hero.cta.quote": "Get a quote",
    "home.features.title": "Why choose Ekwip?",
    "home.features.description": "Flexible and efficient solutions for all your IT needs",
    "home.catalog.title": "Our equipment catalog",
    "home.catalog.description": "Discover our complete range of professional IT equipment",
    "home.enterprise.title": "More than 10 employees?",
    "home.enterprise.description": "Benefit from special offers and dedicated support to equip your entire team.",
    "home.trust.title": "They trust us",
    "home.trust.description": "Over 500 companies trust us for their IT needs",
    "home.how.title": "How it works",
    "home.how.description": "A simple and efficient process to equip your business",

    // Products
    "product.monthly": "per month excl. tax",
    "product.from": "Starting from",
    "product.discover": "Discover",
    "product.add-to-list": "Add to my list",
    "product.in-stock": "In stock",
    "product.out-of-stock": "Out of stock",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.retry": "Retry",
    "common.back": "Back",
    "common.next": "Next",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",

    // Footer
    "footer.about": "About",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.admin": "Administration",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.catalog": "الكتالوج",
    "nav.store": "المتجر",
    "nav.brands": "العلامات التجارية",
    "nav.how-it-works": "كيف يعمل",
    "nav.contact": "اتصل بنا",
    "nav.client-portal": "بوابة العميل",
    "nav.my-needs": "قائمة احتياجاتي",

    // Cart
    "cart.empty": "قائمة احتياجاتك فارغة",
    "cart.items": "عناصر",
    "cart.view": "عرض قائمتي",
    "cart.add": "أضف إلى قائمتي",
    "cart.remove": "إزالة",

    // Homepage
    "home.hero.badge": "حلول تقنية المعلومات المهنية",
    "home.hero.title": "جهز نفسك، دون استنزاف",
    "home.hero.title.highlight": "ميزانيتك!",
    "home.hero.description": "استأجر معدات تكنولوجيا المعلومات المخصصة مع إكويب. المرونة والأداء وراحة البال مضمونة.",
    "home.hero.cta.catalog": "اكتشف الكتالوج",
    "home.hero.cta.quote": "احصل على عرض سعر",
    "home.features.title": "لماذا تختار إكويب؟",
    "home.features.description": "حلول مرنة وفعالة لجميع احتياجاتك التقنية",
    "home.catalog.title": "كتالوج معداتنا",
    "home.catalog.description": "اكتشف مجموعتنا الكاملة من معدات تكنولوجيا المعلومات المهنية",
    "home.enterprise.title": "أكثر من 10 موظفين؟",
    "home.enterprise.description": "استفد من العروض الخاصة والدعم المخصص لتجهيز فريقك بالكامل.",
    "home.trust.title": "يثقون بنا",
    "home.trust.description": "أكثر من 500 شركة تثق بنا لاحتياجاتها التقنية",
    "home.how.title": "كيف يعمل",
    "home.how.description": "عملية بسيطة وفعالة لتجهيز عملك",

    // Products
    "product.monthly": "شهريًا بدون ضريبة",
    "product.from": "ابتداءً من",
    "product.discover": "اكتشف",
    "product.add-to-list": "أضف إلى قائمتي",
    "product.in-stock": "متوفر",
    "product.out-of-stock": "غير متوفر",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.retry": "إعادة المحاولة",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.view": "عرض",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.all": "الكل",

    // Footer
    "footer.about": "حول",
    "footer.services": "الخدمات",
    "footer.contact": "اتصل بنا",
    "footer.admin": "الإدارة",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && ["fr", "ar", "en"].includes(savedLang)) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (mounted) {
      localStorage.setItem("language", lang)
    }
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const dir = language === "ar" ? "rtl" : "ltr"

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

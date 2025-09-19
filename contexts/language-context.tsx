"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.catalog": "Catalogue",
    "nav.how_it_works": "Comment ça marche",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.client_portal": "Portail Client",
    "nav.needs_list": "Ma liste de besoins",

    // Hero Section
    "hero.title": "Location d'équipements informatiques pour entreprises",
    "hero.subtitle":
      "Louez vos équipements IT dernière génération avec maintenance incluse. Flexibilité, performance et tranquillité d'esprit garanties.",
    "hero.cta_primary": "Découvrir le catalogue",
    "hero.cta_secondary": "Comment ça marche",

    // Categories
    "categories.title": "Notre catalogue d'équipements",
    "categories.subtitle": "Découvrez notre gamme complète d'équipements informatiques professionnels",
    "categories.laptops": "Ordinateurs portables",
    "categories.laptops_desc": "Ordinateurs portables professionnels pour tous vos besoins",
    "categories.desktops": "Ordinateurs de bureau",
    "categories.desktops_desc": "Stations de travail performantes pour vos équipes",
    "categories.tablets": "Tablettes",
    "categories.tablets_desc": "Tablettes tactiles pour la mobilité professionnelle",
    "categories.smartphones": "Smartphones",
    "categories.smartphones_desc": "Smartphones professionnels dernière génération",
    "categories.printers": "Imprimantes",
    "categories.printers_desc": "Solutions d'impression professionnelles",
    "categories.accessories": "Accessoires",
    "categories.accessories_desc": "Accessoires et périphériques informatiques",
    "categories.furniture": "Mobilier",
    "categories.furniture_desc": "Mobilier de bureau ergonomique et fonctionnel",

    // Features
    "features.title": "Pourquoi choisir Ekwip ?",
    "features.subtitle": "Des solutions complètes pour optimiser votre parc informatique",
    "features.flexibility.title": "Flexibilité totale",
    "features.flexibility.desc": "Adaptez votre parc selon vos besoins avec nos contrats flexibles",
    "features.maintenance.title": "Maintenance incluse",
    "features.maintenance.desc": "Support technique et maintenance préventive inclus dans tous nos contrats",
    "features.upgrade.title": "Mise à niveau",
    "features.upgrade.desc": "Bénéficiez des dernières technologies avec nos options de mise à niveau",
    "features.support.title": "Support 24/7",
    "features.support.desc": "Une équipe d'experts à votre disposition pour vous accompagner",

    // How it works
    "how_it_works.title": "Comment ça marche",
    "how_it_works.subtitle": "Un processus simple en 4 étapes",
    "how_it_works.step1.title": "1. Choisissez",
    "how_it_works.step1.desc": "Sélectionnez vos équipements dans notre catalogue",
    "how_it_works.step2.title": "2. Configurez",
    "how_it_works.step2.desc": "Personnalisez votre devis selon vos besoins",
    "how_it_works.step3.title": "3. Validez",
    "how_it_works.step3.desc": "Signez votre contrat et planifiez la livraison",
    "how_it_works.step4.title": "4. Profitez",
    "how_it_works.step4.desc": "Utilisez vos équipements avec maintenance incluse",

    // Testimonials
    "testimonials.title": "Ce que disent nos clients",
    "testimonials.subtitle": "Plus de 500 entreprises nous font confiance",

    // Contact
    "contact.title": "Contactez-nous",
    "contact.description": "Notre équipe d'experts est à votre disposition pour vous accompagner dans votre projet",
    "contact.info.title": "Informations de contact",
    "contact.info.description": "Contactez-nous par téléphone, email ou rendez-vous dans nos bureaux",
    "contact.info.address": "Adresse",
    "contact.info.phone": "Téléphone",
    "contact.info.email": "Email",
    "contact.info.hours": "Horaires",
    "contact.form.title": "Envoyez-nous un message",
    "contact.form.description": "Remplissez ce formulaire et nous vous recontacterons rapidement",
    "contact.form.name": "Nom complet",
    "contact.form.email": "Email",
    "contact.form.phone": "Téléphone",
    "contact.form.company": "Entreprise",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer le message",
    "contact.form.submitting": "Envoi en cours...",
    "contact.form.success": "Message envoyé avec succès !",
    "contact.form.success_description": "Nous vous recontacterons dans les plus brefs délais.",
    "contact.map.title": "Notre localisation",
    "contact.map.description": "Retrouvez-nous dans nos bureaux au cœur de Casablanca",

    // Product
    "product.request_quote": "Demander un devis",
    "product.talk_to_expert": "Parler à un expert",
    "product.insurance_included": "Assurance incluse",
    "product.complete_protection": "Protection complète",
    "product.free_delivery": "Livraison gratuite",
    "product.installation_included": "Installation incluse",
    "product.support_24_7": "Support 24/7",
    "product.technical_assistance": "Assistance technique",
    "product.maintenance_included": "Maintenance incluse",
    "product.free_repairs": "Réparations gratuites",
    "product.specifications": "Spécifications",
    "product.interested_title": "Intéressé par ce produit ?",
    "product.interested_description":
      "Contactez nos experts pour obtenir un devis personnalisé et découvrir nos offres de location flexibles.",

    // Cart/Needs List
    "cart.title": "Ma liste de besoins",
    "cart.empty": "Votre liste est vide",
    "cart.empty_description": "Ajoutez des produits à votre liste pour demander un devis",
    "cart.browse_catalog": "Parcourir le catalogue",
    "cart.item_count": "article",
    "cart.item_count_plural": "articles",
    "cart.remove": "Retirer",
    "cart.request_quote": "Demander un devis",
    "cart.total_items": "Total des articles",

    // Catalog
    "catalog.title": "Notre catalogue",
    "catalog.subtitle": "Découvrez notre gamme complète d'équipements informatiques",
    "catalog.sort_by": "Trier par",
    "catalog.sort.name": "Nom",
    "catalog.sort.price_low": "Prix croissant",
    "catalog.sort.price_high": "Prix décroissant",
    "catalog.sort.newest": "Plus récent",
    "catalog.filter.brand": "Marque",
    "catalog.filter.price_range": "Gamme de prix",
    "catalog.filter.availability": "Disponibilité",
    "catalog.filter.in_stock": "En stock",
    "catalog.filter.out_of_stock": "Rupture de stock",
    "catalog.no_products": "Aucun produit trouvé",
    "catalog.no_products_description": "Essayez de modifier vos filtres ou parcourez d'autres catégories",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Une erreur s'est produite",
    "common.retry": "Réessayer",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.close": "Fermer",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.confirm": "Confirmer",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.view": "Voir",
    "common.add": "Ajouter",
    "common.remove": "Retirer",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.clear": "Effacer",
    "common.apply": "Appliquer",
    "common.reset": "Réinitialiser",
    "common.submit": "Soumettre",
    "common.send": "Envoyer",
    "common.download": "Télécharger",
    "common.upload": "Téléverser",
    "common.print": "Imprimer",
    "common.share": "Partager",
    "common.copy": "Copier",
    "common.paste": "Coller",
    "common.cut": "Couper",
    "common.undo": "Annuler",
    "common.redo": "Refaire",
    "common.select_all": "Tout sélectionner",
    "common.deselect_all": "Tout désélectionner",
    "common.expand": "Développer",
    "common.collapse": "Réduire",
    "common.show_more": "Voir plus",
    "common.show_less": "Voir moins",
    "common.read_more": "Lire la suite",
    "common.read_less": "Lire moins",

    // Coming Soon
    "coming_soon.title": "Ekwip se refait une peau neuve",
    "coming_soon.subtitle": "Notre nouveau site arrive bientôt avec une expérience encore meilleure",
    "coming_soon.description":
      "Nous travaillons dur pour vous offrir une nouvelle expérience de location d'équipements informatiques. En attendant, contactez-nous pour tous vos besoins.",
    "coming_soon.form.title": "Restez informé",
    "coming_soon.form.description":
      "Laissez-nous vos coordonnées et nous vous contacterons dès que le nouveau site sera disponible",
    "coming_soon.form.name": "Nom complet",
    "coming_soon.form.company": "Entreprise",
    "coming_soon.form.email": "Email",
    "coming_soon.form.message": "Message",
    "coming_soon.form.submit": "Envoyer",
    "coming_soon.form.submitting": "Envoi en cours...",
    "coming_soon.form.success": "Merci ! Nous vous recontacterons bientôt.",
    "coming_soon.contact.title": "Besoin d'aide maintenant ?",
    "coming_soon.contact.description": "Notre équipe reste disponible pour répondre à vos besoins",
    "coming_soon.contact.phone": "+212 522 123 456",
    "coming_soon.contact.email": "sales@ekwip.ma",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.catalog": "Catalog",
    "nav.how_it_works": "How it works",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.client_portal": "Client Portal",
    "nav.needs_list": "My needs list",

    // Hero Section
    "hero.title": "IT Equipment Rental for Businesses",
    "hero.subtitle":
      "Rent your latest generation IT equipment with maintenance included. Flexibility, performance and peace of mind guaranteed.",
    "hero.cta_primary": "Discover catalog",
    "hero.cta_secondary": "How it works",

    // Categories
    "categories.title": "Our equipment catalog",
    "categories.subtitle": "Discover our complete range of professional IT equipment",
    "categories.laptops": "Laptops",
    "categories.laptops_desc": "Professional laptops for all your needs",
    "categories.desktops": "Desktops",
    "categories.desktops_desc": "High-performance workstations for your teams",
    "categories.tablets": "Tablets",
    "categories.tablets_desc": "Touch tablets for professional mobility",
    "categories.smartphones": "Smartphones",
    "categories.smartphones_desc": "Latest generation professional smartphones",
    "categories.printers": "Printers",
    "categories.printers_desc": "Professional printing solutions",
    "categories.accessories": "Accessories",
    "categories.accessories_desc": "IT accessories and peripherals",
    "categories.furniture": "Furniture",
    "categories.furniture_desc": "Ergonomic and functional office furniture",

    // Add other English translations...
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.retry": "Retry",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.add": "Add",
    "common.remove": "Remove",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.clear": "Clear",
    "common.apply": "Apply",
    "common.reset": "Reset",
    "common.submit": "Submit",
    "common.send": "Send",
    "common.download": "Download",
    "common.upload": "Upload",
    "common.print": "Print",
    "common.share": "Share",
    "common.copy": "Copy",
    "common.paste": "Paste",
    "common.cut": "Cut",
    "common.undo": "Undo",
    "common.redo": "Redo",
    "common.select_all": "Select all",
    "common.deselect_all": "Deselect all",
    "common.expand": "Expand",
    "common.collapse": "Collapse",
    "common.show_more": "Show more",
    "common.show_less": "Show less",
    "common.read_more": "Read more",
    "common.read_less": "Read less",

    // Coming Soon
    "coming_soon.title": "Ekwip is getting a makeover",
    "coming_soon.subtitle": "Our new website is coming soon with an even better experience",
    "coming_soon.description":
      "We are working hard to offer you a new IT equipment rental experience. In the meantime, contact us for all your needs.",
    "coming_soon.form.title": "Stay informed",
    "coming_soon.form.description":
      "Leave us your contact details and we will contact you as soon as the new site is available",
    "coming_soon.form.name": "Full name",
    "coming_soon.company": "Company",
    "coming_soon.form.email": "Email",
    "coming_soon.form.message": "Message",
    "coming_soon.form.submit": "Send",
    "coming_soon.form.submitting": "Sending...",
    "coming_soon.form.success": "Thank you! We will contact you soon.",
    "coming_soon.contact.title": "Need help now?",
    "coming_soon.contact.description": "Our team remains available to meet your needs",
    "coming_soon.contact.phone": "+212 522 123 456",
    "coming_soon.contact.email": "sales@ekwip.ma",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.catalog": "الكتالوج",
    "nav.how_it_works": "كيف يعمل",
    "nav.blog": "المدونة",
    "nav.contact": "اتصل بنا",
    "nav.client_portal": "بوابة العميل",
    "nav.needs_list": "قائمة احتياجاتي",

    // Hero Section
    "hero.title": "تأجير معدات تكنولوجيا المعلومات للشركات",
    "hero.subtitle":
      "استأجر أحدث جيل من معدات تكنولوجيا المعلومات الخاصة بك مع صيانة متضمنة. المرونة والأداء وراحة البال مضمونة.",
    "hero.cta_primary": "اكتشف الكتالوج",
    "hero.cta_secondary": "كيف يعمل",

    // Categories
    "categories.title": "كتالوج معداتنا",
    "categories.subtitle": "اكتشف مجموعتنا الكاملة من معدات تكنولوجيا المعلومات الاحترافية",
    "categories.laptops": "أجهزة الكمبيوتر المحمولة",
    "categories.laptops_desc": "أجهزة كمبيوتر محمولة احترافية لجميع احتياجاتك",
    "categories.desktops": "أجهزة الكمبيوتر المكتبية",
    "categories.desktops_desc": "محطات عمل عالية الأداء لفرقك",
    "categories.tablets": "الأجهزة اللوحية",
    "categories.tablets_desc": "أجهزة لوحية تعمل باللمس للتنقل المهني",
    "categories.smartphones": "الهواتف الذكية",
    "categories.smartphones_desc": "أحدث جيل من الهواتف الذكية الاحترافية",
    "categories.printers": "الطابعات",
    "categories.printers_desc": "حلول طباعة احترافية",
    "categories.accessories": "الملحقات",
    "categories.accessories_desc": "ملحقات وأجهزة طرفية لتكنولوجيا المعلومات",
    "categories.furniture": "الأثاث",
    "categories.furniture_desc": "أثاث مكتبي مريح وعملي",

    // Features
    "features.title": "لماذا تختار Ekwip؟",
    "features.subtitle": "حلول متكاملة لتحسين أسطول تكنولوجيا المعلومات الخاص بك",
    "features.flexibility.title": "مرونة كاملة",
    "features.flexibility.desc": "قم بتكييف أسطولك وفقًا لاحتياجاتك مع عقودنا المرنة",
    "features.maintenance.title": "صيانة متضمنة",
    "features.maintenance.desc": "دعم فني وصيانة وقائية متضمنة في جميع عقودنا",
    "features.upgrade.title": "ترقية",
    "features.upgrade.desc": "استفد من أحدث التقنيات مع خيارات الترقية لدينا",
    "features.support.title": "دعم 24/7",
    "features.support.desc": "فريق من الخبراء تحت تصرفك لمساعدتك",

    // How it works
    "how_it_works.title": "كيف يعمل",
    "how_it_works.subtitle": "عملية بسيطة في 4 خطوات",
    "how_it_works.step1.title": "1. اختر",
    "how_it_works.step1.desc": "اختر معداتك من الكتالوج الخاص بنا",
    "how_it_works.step2.title": "2. قم بالتكوين",
    "how_it_works.step2.desc": "خصص عرض السعر الخاص بك وفقًا لاحتياجاتك",
    "how_it_works.step3.title": "3. قم بالموافقة",
    "how_it_works.step3.desc": "وقع عقدك وخطط للتسليم",
    "how_it_works.step4.title": "4. استمتع",
    "how_it_works.step4.desc": "استخدم معداتك مع الصيانة المتضمنة",

    // Testimonials
    "testimonials.title": "ماذا يقول عملاؤنا",
    "testimonials.subtitle": "أكثر من 500 شركة تثق بنا",

    // Contact
    "contact.title": "اتصل بنا",
    "contact.description": "فريق الخبراء لدينا تحت تصرفك لمساعدتك في مشروعك",
    "contact.info.title": "معلومات الاتصال",
    "contact.info.description": "اتصل بنا عبر الهاتف أو البريد الإلكتروني أو قم بزيارتنا في مكاتبنا",
    "contact.info.address": "العنوان",
    "contact.info.phone": "الهاتف",
    "contact.info.email": "البريد الإلكتروني",
    "contact.info.hours": "ساعات العمل",
    "contact.form.title": "أرسل لنا رسالة",
    "contact.form.description": "املأ هذا النموذج وسنعاود الاتصال بك قريبًا",
    "contact.form.name": "الاسم الكامل",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "الهاتف",
    "contact.form.company": "الشركة",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال الرسالة",
    "contact.form.submitting": "جاري الإرسال...",
    "contact.form.success": "تم إرسال الرسالة بنجاح!",
    "contact.form.success_description": "سنعاود الاتصال بك في أقرب وقت ممكن.",
    "contact.map.title": "موقعنا",
    "contact.map.description": "تجدنا في مكاتبنا في قلب الدار البيضاء",

    // Product
    "product.request_quote": "طلب عرض سعر",
    "product.talk_to_expert": "التحدث إلى خبير",
    "product.insurance_included": "تأمين متضمن",
    "product.complete_protection": "حماية كاملة",
    "product.free_delivery": "توصيل مجاني",
    "product.installation_included": "تركيب متضمن",
    "product.support_24_7": "دعم 24/7",
    "product.technical_assistance": "مساعدة فنية",
    "product.maintenance_included": "صيانة متضمنة",
    "product.free_repairs": "إصلاحات مجانية",
    "product.specifications": "المواصفات",
    "product.interested_title": "هل أنت مهتم بهذا المنتج؟",
    "product.interested_description": "اتصل بخبرائنا للحصول على عرض سعر مخصص واكتشف عروض التأجير المرنة لدينا.",

    // Cart/Needs List
    "cart.title": "قائمة احتياجاتي",
    "cart.empty": "قائمتك فارغة",
    "cart.empty_description": "أضف منتجات إلى قائمتك لطلب عرض سعر",
    "cart.browse_catalog": "تصفح الكتالوج",
    "cart.item_count": "عنصر",
    "cart.item_count_plural": "عناصر",
    "cart.remove": "إزالة",
    "cart.request_quote": "طلب عرض سعر",
    "cart.total_items": "إجمالي العناصر",

    // Catalog
    "catalog.title": "كتالوجنا",
    "catalog.subtitle": "اكتشف مجموعتنا الكاملة من معدات تكنولوجيا المعلومات",
    "catalog.sort_by": "فرز حسب",
    "catalog.sort.name": "الاسم",
    "catalog.sort.price_low": "السعر من الأقل للأعلى",
    "catalog.sort.price_high": "السعر من الأعلى للأقل",
    "catalog.sort.newest": "الأحدث",
    "catalog.filter.brand": "العلامة التجارية",
    "catalog.filter.price_range": "نطاق السعر",
    "catalog.filter.availability": "التوفر",
    "catalog.filter.in_stock": "متوفر بالمخزون",
    "catalog.filter.out_of_stock": "نفد المخزون",
    "catalog.no_products": "لم يتم العثور على منتجات",
    "catalog.no_products_description": "حاول تعديل عوامل التصفية الخاصة بك أو تصفح فئات أخرى",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.retry": "إعادة المحاولة",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.close": "إغلاق",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.confirm": "تأكيد",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.view": "عرض",
    "common.add": "إضافة",
    "common.remove": "إزالة",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.sort": "فرز",
    "common.clear": "مسح",
    "common.apply": "تطبيق",
    "common.reset": "إعادة تعيين",
    "common.submit": "إرسال",
    "common.send": "إرسال",
    "common.download": "تنزيل",
    "common.upload": "تحميل",
    "common.print": "طباعة",
    "common.share": "مشاركة",
    "common.copy": "نسخ",
    "common.paste": "لصق",
    "common.cut": "قص",
    "common.undo": "تراجع",
    "common.redo": "إعادة",
    "common.select_all": "تحديد الكل",
    "common.deselect_all": "إلغاء تحديد الكل",
    "common.expand": "توسيع",
    "common.collapse": "طي",
    "common.show_more": "عرض المزيد",
    "common.show_less": "عرض أقل",
    "common.read_more": "اقرأ المزيد",
    "common.read_less": "اقرأ أقل",

    // Coming Soon
    "coming_soon.title": "Ekwip يتجدد",
    "coming_soon.subtitle": "موقعنا الجديد قريباً بتجربة أفضل",
    "coming_soon.description":
      "نعمل بجد لنقدم لك تجربة تأجير معدات تكنولوجيا المعلومات جديدة. في غضون ذلك، اتصل بنا لجميع احتياجاتك.",
    "coming_soon.form.title": "ابق على اطلاع",
    "coming_soon.form.description": "اترك لنا تفاصيل الاتصال الخاصة بك وسنتصل بك بمجرد توفر الموقع الجديد",
    "coming_soon.form.name": "الاسم الكامل",
    "coming_soon.company": "الشركة",
    "coming_soon.form.email": "البريد الإلكتروني",
    "coming_soon.form.message": "الرسالة",
    "coming_soon.form.submit": "إرسال",
    "coming_soon.form.submitting": "جاري الإرسال...",
    "coming_soon.form.success": "شكراً لك! سنتصل بك قريباً.",
    "coming_soon.contact.title": "هل تحتاج إلى مساعدة الآن؟",
    "coming_soon.contact.description": "فريقنا متاح لتلبية احتياجاتك",
    "coming_soon.contact.phone": "+212 522 123 456",
    "coming_soon.contact.email": "sales@ekwip.ma",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    // Try to get saved language from localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["fr", "ar", "en"].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }
  }

  const t = (key: string): string => {
    const currentTranslations = translations[language]
    const fallbackTranslations = translations.fr

    return currentTranslations[key] || fallbackTranslations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

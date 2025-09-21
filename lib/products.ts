export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  firstMonthPrice?: number
  rentalDuration?: number
  image: string
  category: string
  slug: string
  featured: boolean
  new: boolean
  specifications?: Record<string, string>
  images?: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  image: string
  productCount: number
}

// Sample products data
export const products: Product[] = [
  {
    id: "1",
    name: "Dell Mobile Precision Workstation 5690",
    description:
      "Station de travail mobile ultra-performante pour les professionnels exigeants avec processeur Intel Core Ultra et écran 16 pouces 4K+.",
    shortDescription: "Station de travail mobile 16 pouces haute performance pour professionnels",
    price: 1150,
    firstMonthPrice: 2770,
    rentalDuration: 36,
    image: "/images/dell-precision-5690.png",
    category: "ordinateurs-portables",
    slug: "dell-precision-5690",
    featured: true,
    new: true,
    specifications: {
      Écran: "16 pouces non-tactile FHD+",
      "Système d'exploitation": "Windows 11 Professionnel",
      Stockage: "SSD 1 To",
      Connectivité: "Wi-Fi 6E, Bluetooth 5.3",
      Ports: "USB-C, USB-A, HDMI, Ethernet",
      Batterie: "Jusqu'à 10 heures d'autonomie",
      Poids: "2.1 kg",
      Garantie: "3 ans sur site",
    },
    images: [
      "/images/dell-precision-5690-main.png",
      "/images/dell-precision-5690-side.png",
      "/images/dell-precision-5690-keyboard.png",
      "/images/dell-precision-5690-ports.png",
      "/images/dell-precision-5690-screen.png",
    ],
  },
  {
    id: "2",
    name: 'MacBook Pro 16"',
    description:
      "Le MacBook Pro le plus puissant jamais conçu, avec la puce M3 Pro et un écran Liquid Retina XDR exceptionnel.",
    shortDescription: "MacBook Pro 16 pouces avec puce M3 Pro pour créatifs",
    price: 899,
    firstMonthPrice: 1799,
    rentalDuration: 24,
    image: "/images/macbook-pro.png",
    category: "ordinateurs-portables",
    slug: "macbook-pro-16",
    featured: true,
    new: true,
    specifications: {
      Processeur: "Apple M3 Pro",
      Mémoire: "18 Go de mémoire unifiée",
      Stockage: "SSD 512 Go",
      Écran: "16 pouces Liquid Retina XDR",
      Autonomie: "Jusqu'à 22 heures",
      Poids: "2.16 kg",
    },
  },
  {
    id: "3",
    name: "Dell XPS 13",
    description:
      "Ultrabook premium avec écran InfinityEdge et performances exceptionnelles dans un format ultra-compact.",
    shortDescription: "Ultrabook premium 13 pouces compact et performant",
    price: 649,
    firstMonthPrice: 1299,
    rentalDuration: 24,
    image: "/images/dell-xps.png",
    category: "ordinateurs-portables",
    slug: "dell-xps-13",
    featured: false,
    new: false,
    specifications: {
      Processeur: "Intel Core i7-1360P",
      Mémoire: "16 Go LPDDR5",
      Stockage: "SSD 512 Go",
      Écran: "13.4 pouces FHD+",
      Poids: "1.17 kg",
    },
  },
  {
    id: "4",
    name: 'iMac 24"',
    description: "iMac tout-en-un avec écran Retina 4.5K et puce M3 pour une expérience desktop exceptionnelle.",
    shortDescription: "iMac 24 pouces tout-en-un avec écran Retina 4.5K",
    price: 799,
    firstMonthPrice: 1599,
    rentalDuration: 36,
    image: "/images/imac.png",
    category: "ordinateurs-de-bureau",
    slug: "imac-24",
    featured: true,
    new: true,
    specifications: {
      Processeur: "Apple M3",
      Mémoire: "8 Go de mémoire unifiée",
      Stockage: "SSD 256 Go",
      Écran: "24 pouces Retina 4.5K",
      Couleurs: "7 couleurs disponibles",
    },
  },
  {
    id: "5",
    name: "iPhone 15 Pro",
    description: "iPhone 15 Pro avec puce A17 Pro, appareil photo professionnel et design en titane premium.",
    shortDescription: "iPhone 15 Pro avec puce A17 Pro et design titane",
    price: 89,
    firstMonthPrice: 179,
    rentalDuration: 24,
    image: "/images/iphone.png",
    category: "smartphones",
    slug: "iphone-15-pro",
    featured: true,
    new: true,
    specifications: {
      Écran: "6.1 pouces Super Retina XDR",
      Processeur: "Puce A17 Pro",
      Stockage: "128 Go",
      "Appareil photo": "48 Mpx Principal",
      Batterie: "Jusqu'à 23h de vidéo",
    },
  },
]

// Categories with dynamic product counts
export const categories: Category[] = [
  {
    id: "ordinateurs-portables",
    name: "Ordinateurs portables",
    description: "Ordinateurs portables professionnels pour tous vos besoins",
    slug: "ordinateurs-portables",
    image: "/images/laptop-hero.png",
    productCount: products.filter((p) => p.category === "ordinateurs-portables").length,
  },
  {
    id: "ordinateurs-de-bureau",
    name: "Ordinateurs de bureau",
    description: "Stations de travail performantes pour vos équipes",
    slug: "ordinateurs-de-bureau",
    image: "/images/laptop-hero.png",
    productCount: products.filter((p) => p.category === "ordinateurs-de-bureau").length,
  },
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Smartphones professionnels pour vos équipes mobiles",
    slug: "smartphones",
    image: "/images/smartphone-hero.png",
    productCount: products.filter((p) => p.category === "smartphones").length,
  },
  {
    id: "tablettes",
    name: "Tablettes",
    description: "Tablettes tactiles pour une productivité en déplacement",
    slug: "tablettes",
    image: "/images/tablet-hero.png",
    productCount: products.filter((p) => p.category === "tablettes").length,
  },
  {
    id: "accessoires",
    name: "Accessoires",
    description: "Accessoires et périphériques pour compléter votre équipement",
    slug: "accessoires",
    image: "/images/accessories-hero.png",
    productCount: products.filter((p) => p.category === "accessoires").length,
  },
  {
    id: "imprimantes",
    name: "Imprimantes",
    description: "Solutions d'impression pour tous vos besoins professionnels",
    slug: "imprimantes",
    image: "/images/printer-hero.png",
    productCount: products.filter((p) => p.category === "imprimantes").length,
  },
]

// Helper functions - ALL REQUIRED EXPORTS
export function getProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured).slice(0, 8)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.new)
}

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function formatPrice(price: number | undefined): string {
  if (typeof price !== "number" || isNaN(price)) {
    return "0"
  }
  return price.toLocaleString("fr-FR")
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery),
  )
}

export function getAllBrands(): string[] {
  const brands = [
    ...new Set(
      products.map((product) => {
        if (product.name.includes("MacBook") || product.name.includes("iMac") || product.name.includes("iPhone")) {
          return "Apple"
        } else if (product.name.includes("Dell")) {
          return "Dell"
        } else if (product.name.includes("HP")) {
          return "HP"
        } else if (product.name.includes("Lenovo")) {
          return "Lenovo"
        }
        return "Autre"
      }),
    ),
  ]
  return brands.sort()
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((product) => {
    if (brand === "Apple") {
      return product.name.includes("MacBook") || product.name.includes("iMac") || product.name.includes("iPhone")
    } else if (brand === "Dell") {
      return product.name.includes("Dell")
    } else if (brand === "HP") {
      return product.name.includes("HP")
    } else if (brand === "Lenovo") {
      return product.name.includes("Lenovo")
    }
    return false
  })
}

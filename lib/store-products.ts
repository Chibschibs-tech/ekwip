import type { Product, FilterOption, PriceRange } from "@/types/product"

// Define the FilterState type
export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: PriceRange
  specifications: Record<string, string[]>
  inStock: boolean
  onSale: boolean
  search: string
}

// Mock data for store products
export const storeProducts: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 14",
    description:
      "Le MacBook Pro 14 pouces avec puce M2 Pro offre des performances exceptionnelles pour les professionnels créatifs et les développeurs. Son écran Liquid Retina XDR offre une qualité d'image inégalée.",
    shortDescription: "M2 Pro, 16 Go RAM, 512 Go SSD",
    price: 18999,
    salePrice: 17499,
    stock: 15,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ordinateurs portables",
    brand: "Apple",
    tags: ["laptop", "premium", "macOS"],
    specifications: {
      Processeur: "Apple M2 Pro",
      "Mémoire RAM": "16 Go",
      Stockage: "512 Go SSD",
      Écran: "14 pouces Liquid Retina XDR",
      "Système d'exploitation": "macOS",
      Connectivité: "Thunderbolt 4, HDMI, MagSafe",
      Autonomie: "Jusqu'à 18 heures",
    },
    slug: "macbook-pro-14",
    featured: true,
    new: false,
  },
  {
    id: 2,
    name: "Dell XPS 15",
    description:
      "Le Dell XPS 15 est un ordinateur portable haut de gamme avec un écran InfinityEdge et des performances exceptionnelles pour les professionnels et les créatifs.",
    shortDescription: "Intel i7, 32 Go RAM, 1 To SSD",
    price: 15999,
    stock: 8,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ordinateurs portables",
    brand: "Dell",
    tags: ["laptop", "premium", "windows"],
    specifications: {
      Processeur: "Intel Core i7-12700H",
      "Mémoire RAM": "32 Go DDR5",
      Stockage: "1 To SSD NVMe",
      Écran: "15.6 pouces 4K OLED",
      "Système d'exploitation": "Windows 11 Pro",
      "Carte graphique": "NVIDIA RTX 3050 Ti",
      Autonomie: "Jusqu'à 12 heures",
    },
    slug: "dell-xps-15",
    featured: false,
    new: true,
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1 Carbon",
    description:
      "Le ThinkPad X1 Carbon est un ordinateur portable professionnel léger et robuste, conçu pour les professionnels en déplacement qui ont besoin de fiabilité et de performance.",
    shortDescription: "Intel i5, 16 Go RAM, 512 Go SSD",
    price: 12999,
    salePrice: 11499,
    stock: 12,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ordinateurs portables",
    brand: "Lenovo",
    tags: ["laptop", "business", "windows"],
    specifications: {
      Processeur: "Intel Core i5-1240P",
      "Mémoire RAM": "16 Go LPDDR5",
      Stockage: "512 Go SSD",
      Écran: "14 pouces FHD+ IPS",
      "Système d'exploitation": "Windows 11 Pro",
      Connectivité: "Thunderbolt 4, USB-A, HDMI",
      Autonomie: "Jusqu'à 14 heures",
    },
    slug: "lenovo-thinkpad-x1-carbon",
    featured: true,
    new: false,
  },
  {
    id: 4,
    name: "Apple Mac Mini M2",
    description:
      "Le Mac Mini avec puce M2 est un ordinateur de bureau compact et puissant, parfait pour les professionnels qui ont besoin de performances dans un format réduit.",
    shortDescription: "M2, 16 Go RAM, 512 Go SSD",
    price: 9999,
    stock: 20,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ordinateurs de bureau",
    brand: "Apple",
    tags: ["desktop", "compact", "macOS"],
    specifications: {
      Processeur: "Apple M2",
      "Mémoire RAM": "16 Go",
      Stockage: "512 Go SSD",
      "Système d'exploitation": "macOS",
      Connectivité: "Thunderbolt 4, HDMI, USB-A",
      Réseau: "Wi-Fi 6E, Bluetooth 5.3, Ethernet",
    },
    slug: "mac-mini-m2",
    featured: true,
    new: true,
  },
  {
    id: 5,
    name: "Dell OptiPlex 7000",
    description:
      "Le Dell OptiPlex 7000 est un ordinateur de bureau professionnel conçu pour les entreprises qui ont besoin de fiabilité, de sécurité et de performances.",
    shortDescription: "Intel i5, 16 Go RAM, 512 Go SSD",
    price: 7999,
    salePrice: 6999,
    stock: 0,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ordinateurs de bureau",
    brand: "Dell",
    tags: ["desktop", "business", "windows"],
    specifications: {
      Processeur: "Intel Core i5-12500",
      "Mémoire RAM": "16 Go DDR4",
      Stockage: "512 Go SSD",
      "Système d'exploitation": "Windows 11 Pro",
      Connectivité: "USB-A, USB-C, HDMI, DisplayPort",
      Réseau: "Wi-Fi 6, Bluetooth 5.2, Ethernet",
    },
    slug: "dell-optiplex-7000",
    featured: true,
    new: false,
  },
  {
    id: 6,
    name: "iPhone 15 Pro",
    description:
      "L'iPhone 15 Pro est le smartphone haut de gamme d'Apple avec un appareil photo professionnel, une puce A17 Pro et un design en titane.",
    shortDescription: "A17 Pro, 256 Go, Titane",
    price: 12999,
    stock: 5,
    image: "/placeholder.svg?height=300&width=300",
    category: "Smartphones",
    brand: "Apple",
    tags: ["smartphone", "premium", "iOS"],
    specifications: {
      Processeur: "A17 Pro",
      Stockage: "256 Go",
      Écran: "6.1 pouces Super Retina XDR",
      "Système d'exploitation": "iOS 17",
      "Appareil photo": "Triple 48MP + 12MP + 12MP",
      Batterie: "Jusqu'à 23 heures de lecture vidéo",
      Résistance: "IP68 (eau et poussière)",
    },
    slug: "iphone-15-pro",
    featured: true,
    new: false,
  },
  {
    id: 7,
    name: "Samsung Galaxy S23 Ultra",
    description:
      "Le Samsung Galaxy S23 Ultra est un smartphone Android haut de gamme avec un stylet S Pen intégré, un appareil photo de 200MP et des performances exceptionnelles.",
    shortDescription: "Snapdragon 8 Gen 2, 512 Go, 12 Go RAM",
    price: 11999,
    salePrice: 10999,
    stock: 7,
    image: "/placeholder.svg?height=300&width=300",
    category: "Smartphones",
    brand: "Samsung",
    tags: ["smartphone", "premium", "android"],
    specifications: {
      Processeur: "Snapdragon 8 Gen 2",
      "Mémoire RAM": "12 Go",
      Stockage: "512 Go",
      Écran: "6.8 pouces Dynamic AMOLED 2X",
      "Système d'exploitation": "Android 13",
      "Appareil photo": "Quad 200MP + 12MP + 10MP + 10MP",
      Batterie: "5000 mAh",
    },
    slug: "samsung-galaxy-s23-ultra",
    featured: true,
    new: false,
  },
  {
    id: 8,
    name: "iPad Pro 12.9",
    description:
      "L'iPad Pro 12.9 pouces avec puce M2 est une tablette professionnelle puissante avec un écran Liquid Retina XDR pour les créatifs et les professionnels.",
    shortDescription: "M2, 256 Go, Wi-Fi + Cellular",
    price: 14999,
    stock: 10,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tablettes",
    brand: "Apple",
    tags: ["tablet", "premium", "iPadOS"],
    specifications: {
      Processeur: "Apple M2",
      Stockage: "256 Go",
      Écran: "12.9 pouces Liquid Retina XDR",
      "Système d'exploitation": "iPadOS 16",
      Connectivité: "Wi-Fi 6E, 5G, Bluetooth 5.3",
      "Appareil photo": "12MP arrière, 12MP avant",
      Autonomie: "Jusqu'à 10 heures",
    },
    slug: "ipad-pro-12-9",
    featured: true,
    new: true,
  },
  {
    id: 9,
    name: "Samsung Galaxy Tab S9 Ultra",
    description:
      "La Samsung Galaxy Tab S9 Ultra est une tablette Android haut de gamme avec un grand écran AMOLED, un stylet S Pen inclus et des performances exceptionnelles.",
    shortDescription: "Snapdragon 8 Gen 2, 512 Go, 16 Go RAM",
    price: 13999,
    salePrice: 12499,
    stock: 3,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tablettes",
    brand: "Samsung",
    tags: ["tablet", "premium", "android"],
    specifications: {
      Processeur: "Snapdragon 8 Gen 2",
      "Mémoire RAM": "16 Go",
      Stockage: "512 Go",
      Écran: "14.6 pouces Dynamic AMOLED 2X",
      "Système d'exploitation": "Android 13",
      Connectivité: "Wi-Fi 6E, 5G, Bluetooth 5.3",
      Batterie: "11200 mAh",
    },
    slug: "samsung-galaxy-tab-s9-ultra",
    featured: false,
    new: true,
  },
  {
    id: 10,
    name: "Sony WH-1000XM5",
    description:
      "Le Sony WH-1000XM5 est un casque sans fil à réduction de bruit active de premier ordre, offrant une qualité sonore exceptionnelle et un confort prolongé.",
    shortDescription: "Bluetooth, Réduction de bruit active",
    price: 3499,
    stock: 25,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessoires",
    brand: "Sony",
    tags: ["headphones", "wireless", "noise-cancelling"],
    specifications: {
      Type: "Circum-aural fermé",
      Connectivité: "Bluetooth 5.2, Jack 3.5mm",
      "Réduction de bruit": "Active avec processeur V1",
      Autonomie: "Jusqu'à 30 heures",
      Microphones: "8 microphones pour appels et ANC",
      Commandes: "Tactiles et boutons physiques",
      Poids: "250g",
    },
    slug: "sony-wh-1000xm5",
    featured: true,
    new: false,
  },
  {
    id: 11,
    name: "Apple AirPods Pro 2",
    description:
      "Les AirPods Pro 2 offrent une réduction de bruit active améliorée, un mode Transparence adaptatif et une qualité sonore supérieure dans un format compact.",
    shortDescription: "Réduction de bruit active, Spatial Audio",
    price: 2799,
    salePrice: 2499,
    stock: 18,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessoires",
    brand: "Apple",
    tags: ["earbuds", "wireless", "noise-cancelling"],
    specifications: {
      Type: "Intra-auriculaires",
      Connectivité: "Bluetooth 5.3",
      Puce: "H2",
      "Réduction de bruit": "Active avec mode Transparence adaptatif",
      Audio: "Spatial Audio avec suivi des mouvements de la tête",
      Autonomie: "Jusqu'à 6 heures (30 heures avec boîtier)",
      Résistance: "IPX4 (eau et transpiration)",
    },
    slug: "apple-airpods-pro-2",
    featured: false,
    new: true,
  },
  {
    id: 12,
    name: "HP LaserJet Pro MFP M428fdw",
    description:
      "L'imprimante multifonction HP LaserJet Pro offre impression, numérisation, copie et télécopie avec une vitesse et une qualité professionnelles.",
    shortDescription: "Laser, Multifonction, Réseau",
    price: 4999,
    stock: 0,
    image: "/placeholder.svg?height=300&width=300",
    category: "Imprimantes",
    brand: "HP",
    tags: ["printer", "laser", "multifunction"],
    specifications: {
      Type: "Laser monochrome",
      Fonctions: "Impression, numérisation, copie, télécopie",
      "Vitesse d'impression": "Jusqu'à 40 ppm",
      Connectivité: "USB, Ethernet, Wi-Fi, NFC",
      "Impression recto-verso": "Automatique",
      "Capacité papier": "350 feuilles (extensible)",
      "Cycle mensuel": "Jusqu'à 80 000 pages",
    },
    slug: "hp-laserjet-pro-mfp-m428fdw",
    featured: false,
    new: false,
  },
]

// Helper functions to extract filter options from products
export const getCategories = (): FilterOption[] => {
  const categories = new Map<string, number>()

  storeProducts.forEach((product) => {
    const count = categories.get(product.category) || 0
    categories.set(product.category, count + 1)
  })

  return Array.from(categories.entries()).map(([category, count]) => ({
    id: category.toLowerCase().replace(/\s+/g, "-"),
    label: category,
    count,
  }))
}

export const getBrands = (): FilterOption[] => {
  const brands = new Map<string, number>()

  storeProducts.forEach((product) => {
    const count = brands.get(product.brand) || 0
    brands.set(product.brand, count + 1)
  })

  return Array.from(brands.entries()).map(([brand, count]) => ({
    id: brand.toLowerCase().replace(/\s+/g, "-"),
    label: brand,
    count,
  }))
}

export const getPriceRange = (): PriceRange => {
  let min = Number.MAX_VALUE
  let max = 0

  storeProducts.forEach((product) => {
    const price = product.salePrice || product.price
    if (price < min) min = price
    if (price > max) max = price
  })

  return { min, max }
}

export const getSpecificationFilters = (): Record<string, FilterOption[]> => {
  const specs: Record<string, Map<string, number>> = {}

  // Collect all unique specification types and values
  storeProducts.forEach((product) => {
    Object.entries(product.specifications).forEach(([key, value]) => {
      if (!specs[key]) {
        specs[key] = new Map<string, number>()
      }

      const count = specs[key].get(value) || 0
      specs[key].set(value, count + 1)
    })
  })

  // Convert to FilterOption format
  const result: Record<string, FilterOption[]> = {}

  Object.entries(specs).forEach(([key, valueMap]) => {
    result[key] = Array.from(valueMap.entries()).map(([value, count]) => ({
      id: value.toLowerCase().replace(/\s+/g, "-"),
      label: value,
      count,
    }))
  })

  return result
}

// Function to filter products based on filter state
export const filterProducts = (filters: FilterState): Product[] => {
  return storeProducts.filter((product) => {
    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Filter by brands
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false
    }

    // Filter by price range
    const productPrice = product.salePrice || product.price
    if (productPrice < filters.priceRange.min || productPrice > filters.priceRange.max) {
      return false
    }

    // Filter by specifications
    for (const [specKey, specValues] of Object.entries(filters.specifications)) {
      if (specValues.length > 0) {
        const productSpecValue = product.specifications[specKey]
        if (!productSpecValue || !specValues.includes(productSpecValue)) {
          return false
        }
      }
    }

    // Filter by stock
    if (filters.inStock && product.stock <= 0) {
      return false
    }

    // Filter by sale
    if (filters.onSale && !product.salePrice) {
      return false
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const nameMatch = product.name.toLowerCase().includes(searchLower)
      const descMatch = product.description.toLowerCase().includes(searchLower)
      const shortDescMatch = product.shortDescription.toLowerCase().includes(searchLower)
      const brandMatch = product.brand.toLowerCase().includes(searchLower)
      const categoryMatch = product.category.toLowerCase().includes(searchLower)

      if (!(nameMatch || descMatch || shortDescMatch || brandMatch || categoryMatch)) {
        return false
      }
    }

    return true
  })
}

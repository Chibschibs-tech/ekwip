// This file will be used to fetch products from WooCommerce in the future
// For now, it returns mock data

export type Product = {
  id: number
  name: string
  description: string
  shortDescription: string
  price: number
  image: string
  images?: string[]
  category: string
  slug: string
  featured: boolean
  new: boolean
  specifications?: { [key: string]: string }
}

// Update the product images
export const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    description: "Ordinateur portable professionnel Apple avec puce M2 Pro, idéal pour les créatifs et développeurs.",
    shortDescription: "M2 Pro, 16 Go RAM, 512 Go SSD",
    price: 12000,
    image: "/images/macbook-pro.png",
    category: "Ordinateurs portables",
    slug: "macbook-pro-14",
    featured: true,
    new: false,
    specifications: {
      Processeur: "Apple M2 Pro",
      Mémoire: "16 Go RAM",
      Stockage: "512 Go SSD",
      Écran: '14" Liquid Retina XDR',
      Garantie: "1 an Apple Care",
    },
  },
  {
    id: 2,
    name: "Dell XPS 15",
    description: "Ordinateur portable haut de gamme avec écran InfinityEdge et performances exceptionnelles.",
    shortDescription: "Intel i7, 32 Go RAM, 1 To SSD",
    price: 9500,
    image: "/images/dell-xps.png",
    category: "Ordinateurs portables",
    slug: "dell-xps-15",
    featured: false,
    new: false,
    specifications: {
      Processeur: "Intel Core i7-13700H",
      Mémoire: "32 Go RAM",
      Stockage: "1 To SSD",
      Écran: '15.6" 4K OLED',
      "Carte graphique": "NVIDIA RTX 4060",
    },
  },
  {
    id: 3,
    name: 'iMac 24"',
    description: "Ordinateur tout-en-un élégant avec écran Retina 4.5K et puce Apple M1.",
    shortDescription: "M1, 16 Go RAM, 512 Go SSD",
    price: 8500,
    image: "/images/imac.png",
    category: "Ordinateurs de bureau",
    slug: "imac-24",
    featured: false,
    new: true,
    specifications: {
      Processeur: "Apple M1",
      Mémoire: "16 Go RAM",
      Stockage: "512 Go SSD",
      Écran: '24" 4.5K Retina',
      Couleurs: "7 couleurs disponibles",
    },
  },
  {
    id: 4,
    name: "iPhone 15 Pro",
    description: "Smartphone haut de gamme avec appareil photo professionnel et puce A17 Pro.",
    shortDescription: "256 Go, forfait data 100 Go inclus",
    price: 4500,
    image: "/images/iphone.png",
    category: "Smartphones",
    slug: "iphone-15-pro",
    featured: true,
    new: false,
    specifications: {
      Processeur: "Apple A17 Pro",
      Stockage: "256 Go",
      Écran: '6.1" Super Retina XDR',
      "Appareil photo": "48 MP Pro",
      Forfait: "100 Go data inclus",
    },
  },
  {
    id: 5,
    name: "Dell Mobile Precision Workstation 5690",
    description:
      "Station de travail mobile haut de gamme avec processeur Intel Core Ultra 7 165H vPro, 32 Go LPDDR5x, carte graphique NVIDIA RTX 2000 Ada 8 Go GDDR6, écran 16\" FHD tactile, clavier français rétroéclairé avec lecteur d'empreintes, Wi-Fi 7, Bluetooth, Windows 11 Professionnel et suite logicielle complète incluant Microsoft 365.",
    shortDescription: 'Intel Core Ultra 7 165H vPro, 32 Go RAM, NVIDIA RTX 2000 Ada, Écran 16" FHD tactile',
    price: 18000,
    image:
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/dell-precision-5690-main.jpg",
    images: [
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/dell-precision-5690-main.jpg",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/dell-precision-5690-side.jpg",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/dell-precision-5690-keyboard.jpg",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/dell-precision-5690-ports.jpg",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/dell-precision-5690-screen.jpg",
    ],
    category: "Ordinateurs portables",
    slug: "dell-mobile-precision-workstation-5690",
    featured: true,
    new: true,
    specifications: {
      Processeur: "Intel Core Ultra 7 165H vPro",
      Mémoire: "32 Go LPDDR5x",
      "Carte graphique": "NVIDIA RTX 2000 Ada 8 Go GDDR6",
      Écran: '16" FHD (1920x1200) tactile',
      Stockage: "1 To SSD NVMe",
      Clavier: "Français rétroéclairé avec lecteur d'empreintes",
      Connectivité: "Wi-Fi 7, Bluetooth 5.3",
      Système: "Windows 11 Professionnel",
      Logiciels: "Microsoft 365 inclus",
      Garantie: "3 ans Dell ProSupport",
    },
  },
]

// These functions will be replaced with actual API calls in the future
export const getProducts = () => products

export const getFeaturedProducts = () => products.filter((product) => product.featured)

export const getNewProducts = () => products.filter((product) => product.new)

export const getProductsByCategory = (category: string) => products.filter((product) => product.category === category)

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug)

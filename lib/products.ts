// This file will be used to fetch products from WooCommerce in the future
// For now, it returns mock data

export type Product = {
  id: number
  name: string
  description: string
  shortDescription: string
  price: number
  image: string
  category: string
  slug: string
  featured: boolean
  new: boolean
}

// Update the product images
export const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    description: "Ordinateur portable professionnel Apple avec puce M2 Pro, idéal pour les créatifs et développeurs.",
    shortDescription: "M2 Pro, 16 Go RAM, 512 Go SSD",
    price: 120,
    image: "/images/macbook-pro.png",
    category: "Ordinateurs portables",
    slug: "macbook-pro-14",
    featured: true,
    new: false,
  },
  {
    id: 2,
    name: "Dell XPS 15",
    description: "Ordinateur portable haut de gamme avec écran InfinityEdge et performances exceptionnelles.",
    shortDescription: "Intel i7, 32 Go RAM, 1 To SSD",
    price: 95,
    image: "/images/dell-xps.png",
    category: "Ordinateurs portables",
    slug: "dell-xps-15",
    featured: false,
    new: false,
  },
  {
    id: 3,
    name: 'iMac 24"',
    description: "Ordinateur tout-en-un élégant avec écran Retina 4.5K et puce Apple M1.",
    shortDescription: "M1, 16 Go RAM, 512 Go SSD",
    price: 85,
    image: "/images/imac.png",
    category: "Ordinateurs de bureau",
    slug: "imac-24",
    featured: false,
    new: true,
  },
  {
    id: 4,
    name: "iPhone 15 Pro",
    description: "Smartphone haut de gamme avec appareil photo professionnel et puce A17 Pro.",
    shortDescription: "256 Go, forfait data 100 Go inclus",
    price: 45,
    image: "/images/iphone.png",
    category: "Smartphones",
    slug: "iphone-15-pro",
    featured: true,
    new: false,
  },
]

// These functions will be replaced with actual API calls in the future
export const getProducts = () => products

export const getFeaturedProducts = () => products.filter((product) => product.featured)

export const getNewProducts = () => products.filter((product) => product.new)

export const getProductsByCategory = (category: string) => products.filter((product) => product.category === category)

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug)

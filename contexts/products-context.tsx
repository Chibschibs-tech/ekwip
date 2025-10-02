"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/admin"
import { mockProducts } from "@/lib/mock-data"

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

const STORAGE_KEY = "ekwip_admin_products"

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Charger les produits depuis localStorage au montage
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY)
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts)
        setProducts(parsedProducts)
      } else {
        // Si aucun produit en localStorage, utiliser les mockProducts
        setProducts(mockProducts)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts))
      }
    } catch (error) {
      console.error("Error loading products from localStorage:", error)
      setProducts(mockProducts)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Sauvegarder les produits dans localStorage à chaque modification
  useEffect(() => {
    if (isInitialized && products.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
      } catch (error) {
        console.error("Error saving products to localStorage:", error)
      }
    }
  }, [products, isInitialized])

  const addProduct = (product: Product) => {
    setProducts((prev) => {
      const newProducts = [...prev, product]
      return newProducts
    })
  }

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) => {
      const newProducts = prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
      return newProducts
    })
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const newProducts = prev.filter((p) => p.id !== id)
      return newProducts
    })
  }

  const getProduct = (id: string) => {
    return products.find((p) => p.id === id)
  }

  // Ne pas rendre les enfants tant que les produits ne sont pas chargés
  if (!isInitialized) {
    return null
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}

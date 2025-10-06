"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/admin"

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadProducts = () => {
      try {
        const stored = localStorage.getItem("ekwip_admin_products")
        if (stored) {
          const parsedProducts = JSON.parse(stored) as Product[]

          // Migration: Add productType="rent" to products that don't have it
          const migratedProducts = parsedProducts.map((product) => {
            if (!product.productType) {
              return {
                ...product,
                productType: "rent" as const,
              }
            }
            return product
          })

          // Save migrated products back to localStorage
          if (migratedProducts.some((p, i) => p.productType !== parsedProducts[i].productType)) {
            localStorage.setItem("ekwip_admin_products", JSON.stringify(migratedProducts))
          }

          setProducts(migratedProducts)
        }
      } catch (error) {
        console.error("Error loading products:", error)
        setProducts([])
      }
    }

    loadProducts()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ekwip_admin_products") {
        loadProducts()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [mounted])

  const addProduct = (product: Product) => {
    const newProducts = [...products, product]
    setProducts(newProducts)
    if (typeof window !== "undefined") {
      localStorage.setItem("ekwip_admin_products", JSON.stringify(newProducts))
      window.dispatchEvent(new Event("storage"))
    }
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const newProducts = products.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p,
    )
    setProducts(newProducts)
    if (typeof window !== "undefined") {
      localStorage.setItem("ekwip_admin_products", JSON.stringify(newProducts))
      window.dispatchEvent(new Event("storage"))
    }
  }

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id)
    setProducts(newProducts)
    if (typeof window !== "undefined") {
      localStorage.setItem("ekwip_admin_products", JSON.stringify(newProducts))
      window.dispatchEvent(new Event("storage"))
    }
  }

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
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

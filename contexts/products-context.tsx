"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Product } from "@/types/admin"

interface ProductsContextType {
  products: Product[]
  loading: boolean
  error: string | null
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<Product | null>
  updateProduct: (id: string, product: Partial<Product>) => Promise<boolean>
  deleteProduct: (id: string) => Promise<boolean>
  getProduct: (id: string) => Product | undefined
  refreshProducts: () => Promise<void>
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/products")
      if (!response.ok) throw new Error("Failed to fetch products")
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const addProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product | null> => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (!response.ok) throw new Error("Failed to create product")
      const newProduct = await response.json()
      setProducts((prev) => [...prev, newProduct])
      return newProduct
    } catch (err) {
      console.error("Error creating product:", err)
      return null
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update product")
      const updatedProduct = await response.json()
      setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
      return true
    } catch (err) {
      console.error("Error updating product:", err)
      return false
    }
  }

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete product")
      setProducts((prev) => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      console.error("Error deleting product:", err)
      return false
    }
  }

  const getProduct = (id: string) => {
    return products.find((p) => p.id === id)
  }

  const refreshProducts = async () => {
    await fetchProducts()
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        refreshProducts,
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

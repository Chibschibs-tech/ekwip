"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Brand } from "@/types/admin"

interface BrandsContextType {
  brands: Brand[]
  loading: boolean
  error: string | null
  addBrand: (brand: Omit<Brand, "id" | "createdAt" | "updatedAt">) => Promise<Brand | null>
  updateBrand: (id: string, brand: Partial<Brand>) => Promise<boolean>
  deleteBrand: (id: string) => Promise<boolean>
  getBrand: (id: string) => Brand | undefined
  refreshBrands: () => Promise<void>
}

const BrandsContext = createContext<BrandsContextType | undefined>(undefined)

export function BrandsProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/brands")
      if (!response.ok) throw new Error("Failed to fetch brands")
      const data = await response.json()
      setBrands(data)
    } catch (err) {
      console.error("Error fetching brands:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBrands()
  }, [fetchBrands])

  const addBrand = async (brand: Omit<Brand, "id" | "createdAt" | "updatedAt">): Promise<Brand | null> => {
    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brand),
      })
      if (!response.ok) throw new Error("Failed to create brand")
      const newBrand = await response.json()
      setBrands((prev) => [...prev, newBrand])
      return newBrand
    } catch (err) {
      console.error("Error creating brand:", err)
      return null
    }
  }

  const updateBrand = async (id: string, updates: Partial<Brand>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update brand")
      const updatedBrand = await response.json()
      setBrands((prev) => prev.map((b) => (b.id === id ? updatedBrand : b)))
      return true
    } catch (err) {
      console.error("Error updating brand:", err)
      return false
    }
  }

  const deleteBrand = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete brand")
      setBrands((prev) => prev.filter((b) => b.id !== id))
      return true
    } catch (err) {
      console.error("Error deleting brand:", err)
      return false
    }
  }

  const getBrand = (id: string) => {
    return brands.find((b) => b.id === id)
  }

  const refreshBrands = async () => {
    await fetchBrands()
  }

  return (
    <BrandsContext.Provider
      value={{
        brands,
        loading,
        error,
        addBrand,
        updateBrand,
        deleteBrand,
        getBrand,
        refreshBrands,
      }}
    >
      {children}
    </BrandsContext.Provider>
  )
}

export function useBrands() {
  const context = useContext(BrandsContext)
  if (context === undefined) {
    throw new Error("useBrands must be used within a BrandsProvider")
  }
  return context
}

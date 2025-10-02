"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Brand } from "@/types/admin"
import { mockBrands } from "@/lib/mock-data"

interface BrandsContextType {
  brands: Brand[]
  addBrand: (brand: Brand) => void
  updateBrand: (id: string, brand: Partial<Brand>) => void
  deleteBrand: (id: string) => void
  getBrand: (id: string) => Brand | undefined
}

const BrandsContext = createContext<BrandsContextType | undefined>(undefined)

const STORAGE_KEY = "ekwip_admin_brands"

export function BrandsProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setBrands(JSON.parse(stored))
      } else {
        setBrands(mockBrands)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBrands))
      }
    } catch (error) {
      console.error("Error loading brands:", error)
      setBrands(mockBrands)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (isInitialized && brands.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(brands))
      } catch (error) {
        console.error("Error saving brands:", error)
      }
    }
  }, [brands, isInitialized])

  const addBrand = (brand: Brand) => {
    setBrands((prev) => [...prev, brand])
  }

  const updateBrand = (id: string, updatedBrand: Partial<Brand>) => {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...updatedBrand } : b)))
  }

  const deleteBrand = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id))
  }

  const getBrand = (id: string) => {
    return brands.find((b) => b.id === id)
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <BrandsContext.Provider value={{ brands, addBrand, updateBrand, deleteBrand, getBrand }}>
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

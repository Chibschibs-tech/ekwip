"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Category } from "@/types/admin"
import { mockCategories } from "@/lib/mock-data"

interface CategoriesContextType {
  categories: Category[]
  addCategory: (category: Category) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  getCategory: (id: string) => Category | undefined
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

const STORAGE_KEY = "ekwip_admin_categories"

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCategories(JSON.parse(stored))
      } else {
        setCategories(mockCategories)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCategories))
      }
    } catch (error) {
      console.error("Error loading categories:", error)
      setCategories(mockCategories)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (isInitialized && categories.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
      } catch (error) {
        console.error("Error saving categories:", error)
      }
    }
  }, [categories, isInitialized])

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category])
  }

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedCategory } : c)))
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const getCategory = (id: string) => {
    return categories.find((c) => c.id === id)
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory, getCategory }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext)
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider")
  }
  return context
}

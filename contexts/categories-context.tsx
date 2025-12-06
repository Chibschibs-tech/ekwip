"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Category } from "@/types/admin"

interface CategoriesContextType {
  categories: Category[]
  loading: boolean
  error: string | null
  addCategory: (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<Category | null>
  updateCategory: (id: string, category: Partial<Category>) => Promise<boolean>
  deleteCategory: (id: string) => Promise<boolean>
  getCategory: (id: string) => Category | undefined
  refreshCategories: () => Promise<void>
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[CategoriesProvider] Fetching categories from /api/categories...")
      const response = await fetch("/api/categories")
      if (!response.ok) {
        const errorText = await response.text()
        console.error("[CategoriesProvider] API error:", response.status, errorText)
        throw new Error(`Failed to fetch categories: ${response.status} ${errorText}`)
      }
      const data = await response.json()
      console.log("[CategoriesProvider] Categories fetched:", data.length, "categories")
      console.log("[CategoriesProvider] Categories data:", data)
      setCategories(data)
    } catch (err) {
      console.error("[CategoriesProvider] Error fetching categories:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const addCategory = async (category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category | null> => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      })
      if (!response.ok) throw new Error("Failed to create category")
      const newCategory = await response.json()
      setCategories((prev) => [...prev, newCategory])
      return newCategory
    } catch (err) {
      console.error("Error creating category:", err)
      return null
    }
  }

  const updateCategory = async (id: string, updates: Partial<Category>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update category")
      const updatedCategory = await response.json()
      setCategories((prev) => prev.map((c) => (c.id === id ? updatedCategory : c)))
      return true
    } catch (err) {
      console.error("Error updating category:", err)
      return false
    }
  }

  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete category")
      setCategories((prev) => prev.filter((c) => c.id !== id))
      return true
    } catch (err) {
      console.error("Error deleting category:", err)
      return false
    }
  }

  const getCategory = (id: string) => {
    return categories.find((c) => c.id === id)
  }

  const refreshCategories = async () => {
    await fetchCategories()
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategory,
        refreshCategories,
      }}
    >
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

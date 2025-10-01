"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/types/admin"
import type { Role } from "@/lib/rbac"
import { hasPermission, type Permission } from "@/lib/rbac"

interface AdminAuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: Permission) => boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Check if user is authenticated (check session/token)
    // For now, we'll simulate a logged-in admin user
    const mockUser: User = {
      id: "1",
      name: "Admin User",
      email: "admin@ekwip.ma",
      role: "super_admin",
      avatar: undefined,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setUser(mockUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login logic with NextAuth or your auth provider
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockUser: User = {
        id: "1",
        name: "Admin User",
        email: email,
        role: "super_admin",
        avatar: undefined,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setUser(mockUser)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // TODO: Implement actual logout logic
    setUser(null)
  }

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false
    return hasPermission(user.role as Role, permission)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission: checkPermission,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}

"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  name: string
  email: string
  picture: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("ekwip_auth_token")
        const userData = localStorage.getItem("ekwip_user")

        if (token && userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Redirect if accessing client portal pages without auth
  useEffect(() => {
    if (!isLoading && !user && pathname?.startsWith("/portail-client") && pathname !== "/portail-client") {
      router.push("/portail-client")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real implementation, this would validate credentials with a backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser = {
        name: "John Doe",
        email: email,
        picture: "/placeholder.svg",
      }

      // Store auth data
      localStorage.setItem("ekwip_auth_token", "mock_token")
      localStorage.setItem("ekwip_user", JSON.stringify(mockUser))

      setUser(mockUser)
      router.push("/portail-client/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would redirect to Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        picture: "/placeholder.svg",
      }

      // Store auth data
      localStorage.setItem("ekwip_auth_token", "mock_google_token")
      localStorage.setItem("ekwip_user", JSON.stringify(mockUser))

      setUser(mockUser)
      router.push("/portail-client/dashboard")
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("ekwip_auth_token")
    localStorage.removeItem("ekwip_user")
    setUser(null)
    router.push("/portail-client")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

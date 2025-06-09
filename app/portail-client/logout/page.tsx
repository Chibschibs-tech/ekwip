"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic"

export default function LogoutPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      // Clear auth data
      localStorage.removeItem("ekwip_auth_token")
      localStorage.removeItem("ekwip_user")

      // Redirect to login page
      setTimeout(() => {
        router.push("/portail-client")
      }, 1500)
    }
  }, [isClient, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Déconnexion en cours...</h1>
      <p className="text-gray-600">Vous allez être redirigé vers la page de connexion.</p>
    </div>
  )
}

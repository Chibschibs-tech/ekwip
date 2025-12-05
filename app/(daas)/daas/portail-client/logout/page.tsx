"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("ekwip_auth_token")
    localStorage.removeItem("ekwip_user")

    // Redirect to login page
    router.push("/portail-client")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ekwip mx-auto"></div>
        <p className="mt-4 text-lg">Déconnexion en cours...</p>
      </div>
    </div>
  )
}

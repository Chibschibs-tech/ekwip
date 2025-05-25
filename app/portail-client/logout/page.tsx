"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

export default function LogoutPage() {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Déconnexion en cours...</h1>
      <p className="text-gray-600">Vous allez être redirigé vers la page de connexion.</p>
    </div>
  )
}

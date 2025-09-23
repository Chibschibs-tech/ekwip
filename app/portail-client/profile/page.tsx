"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
        <p className="mt-1 text-gray-500">Gérez vos informations personnelles et vos préférences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/images/placeholder.svg?height=96&width=96" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 rounded-full bg-[#1f3b57] p-1.5 text-white shadow-sm">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
              <p className="mt-1 text-sm text-gray-500">Directeur Informatique</p>
              <Separator className="my-4" />
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Membre depuis</span>
                  <span className="font-medium">Janvier 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dernière connexion</span>
                  <span className="font-medium">Aujourd'hui à 14:32</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rôle</span>
                  <span className="font-medium">Administrateur</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" defaultValue="+212 6 12 34 56 78" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="jobTitle">Fonction</Label>
                  <Input id="jobTitle" defaultValue="Directeur Informatique" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="department">Département</Label>
                  <Input id="department" defaultValue="Direction" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading} className="bg-[#1f3b57] hover:bg-[#1a3249]">
                  {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

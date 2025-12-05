"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Globe } from "lucide-react"

export default function SettingsPage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-gray-500">Gérez vos préférences et paramètres de compte</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Entreprise</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles.</CardDescription>
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
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>Mettez à jour les informations de votre entreprise.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input id="companyName" defaultValue="Société ABC" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Secteur d'activité</Label>
                    <Select defaultValue="technology">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technologie</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Santé</SelectItem>
                        <SelectItem value="education">Éducation</SelectItem>
                        <SelectItem value="retail">Commerce de détail</SelectItem>
                        <SelectItem value="manufacturing">Industrie</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Taille de l'entreprise</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une taille" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">1-50 employés</SelectItem>
                        <SelectItem value="medium">51-200 employés</SelectItem>
                        <SelectItem value="large">201-500 employés</SelectItem>
                        <SelectItem value="enterprise">Plus de 500 employés</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Adresse</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" defaultValue="123 Avenue Mohammed V" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" defaultValue="Casablanca" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input id="postalCode" defaultValue="20000" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="country">Pays</Label>
                      <Select defaultValue="morocco">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morocco">Maroc</SelectItem>
                          <SelectItem value="algeria">Algérie</SelectItem>
                          <SelectItem value="tunisia">Tunisie</SelectItem>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>Configurez comment et quand vous souhaitez être notifié.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications par email</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-orders" className="font-medium">
                          Commandes
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les nouvelles commandes et les mises à jour
                        </p>
                      </div>
                      <Switch id="email-orders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-billing" className="font-medium">
                          Facturation
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les factures et les paiements
                        </p>
                      </div>
                      <Switch id="email-billing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-equipment" className="font-medium">
                          Équipements
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les mises à jour d'équipements
                        </p>
                      </div>
                      <Switch id="email-equipment" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-tickets" className="font-medium">
                          Tickets de support
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les mises à jour de tickets
                        </p>
                      </div>
                      <Switch id="email-tickets" defaultChecked />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="text-lg font-medium">Notifications dans l'application</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-orders" className="font-medium">
                          Commandes
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les nouvelles commandes et les mises à jour
                        </p>
                      </div>
                      <Switch id="app-orders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-billing" className="font-medium">
                          Facturation
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les factures et les paiements
                        </p>
                      </div>
                      <Switch id="app-billing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-equipment" className="font-medium">
                          Équipements
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les mises à jour d'équipements
                        </p>
                      </div>
                      <Switch id="app-equipment" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-tickets" className="font-medium">
                          Tickets de support
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications pour les mises à jour de tickets
                        </p>
                      </div>
                      <Switch id="app-tickets" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Enregistrement..." : "Enregistrer les préférences"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>Gérez votre mot de passe et les paramètres de sécurité.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Changer le mot de passe</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="font-medium">
                          Activer l'authentification à deux facteurs
                        </Label>
                        <p className="text-sm text-gray-500">
                          Ajouter une couche de sécurité supplémentaire à votre compte
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="text-lg font-medium">Sessions actives</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session actuelle</p>
                          <p className="text-sm text-gray-500">Casablanca, Maroc • Chrome sur Windows</p>
                          <p className="text-xs text-gray-400">Dernière activité: Aujourd'hui à 14:32</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                          <span className="text-sm text-gray-500">Actif</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Déconnecter toutes les autres sessions
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

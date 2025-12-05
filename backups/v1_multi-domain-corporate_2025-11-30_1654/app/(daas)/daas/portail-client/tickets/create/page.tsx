"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateTicketPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock equipment data
  const equipmentItems = [
    { id: "EQ-001", name: 'MacBook Pro 16"' },
    { id: "EQ-002", name: "Dell XPS 15" },
    { id: "EQ-003", name: "iPhone 14 Pro" },
    { id: "EQ-004", name: 'iMac 27"' },
    { id: "EQ-006", name: "ThinkPad X1 Carbon" },
    { id: "EQ-007", name: "Samsung Galaxy S23" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/portail-client/tickets")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Créer un nouveau ticket</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Détails du ticket</CardTitle>
          <CardDescription>Fournissez les informations nécessaires pour votre demande de support</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du ticket</Label>
                <Input id="title" placeholder="Ex: Problème de connexion Wi-Fi" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment">Équipement concerné</Label>
                <Select required>
                  <SelectTrigger id="equipment">
                    <SelectValue placeholder="Sélectionner un équipement" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Problème matériel</SelectItem>
                    <SelectItem value="software">Problème logiciel</SelectItem>
                    <SelectItem value="network">Problème réseau</SelectItem>
                    <SelectItem value="account">Problème de compte</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priorité</Label>
                <Select required>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Sélectionner une priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Élevée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description du problème</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre problème en détail"
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Pièces jointes (optionnel)</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Glissez-déposez des fichiers ici ou cliquez pour parcourir
                </p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF jusqu'à 5 MB</p>
                <Input id="attachments" type="file" className="hidden" multiple />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => document.getElementById("attachments")?.click()}
                >
                  Parcourir les fichiers
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Annuler
              </Button>
              <Button type="submit" className="bg-ekwip hover:bg-ekwip-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Création en cours...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Créer le ticket
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

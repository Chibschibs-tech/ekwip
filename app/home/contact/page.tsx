"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simuler l'envoi
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", company: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contactez-nous</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions sur la location d'équipements IT
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de contact</CardTitle>
                  <CardDescription>Plusieurs moyens de nous joindre</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Téléphone</div>
                      <a href="tel:+212660703622" className="text-blue-600 hover:underline">
                        +212 660 703 622
                      </a>
                      <div className="text-sm text-slate-600 mt-1">Lundi - Vendredi : 9h - 18h</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Email</div>
                      <a href="mailto:contact@ekwip.ma" className="text-blue-600 hover:underline">
                        contact@ekwip.ma
                      </a>
                      <div className="text-sm text-slate-600 mt-1">Réponse sous 24h</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Adresse</div>
                      <div className="text-slate-600">
                        Casablanca, Maroc
                        <br />
                        Zone industrielle
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Besoin d'un devis ?</CardTitle>
                  <CardDescription className="text-blue-100">
                    Obtenez une estimation personnalisée pour vos besoins en équipements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">
                    Notre équipe commerciale vous contactera dans les plus brefs délais pour établir un devis adapté à
                    vos besoins spécifiques.
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                    Demander un devis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@exemple.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez vos besoins en équipements IT..."
                      rows={6}
                      required
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                      Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                      Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

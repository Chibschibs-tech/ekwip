"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-600 text-white">Parlons de votre projet</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Contactez-nous</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans votre projet
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 border-slate-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Email</h3>
                <p className="text-slate-600">contact@ekwip.ma</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Téléphone</h3>
                <p className="text-slate-600">+212 5XX-XXXXXX</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Adresse</h3>
                <p className="text-slate-600">Casablanca, Maroc</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Nom complet *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+212 6XX-XXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Entreprise
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Horaires d'ouverture</h2>
              <Card className="border-2 border-slate-100 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-800">Lundi - Vendredi</span>
                        <span className="text-slate-600">9h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-800">Samedi</span>
                        <span className="text-slate-600">9h00 - 13h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800">Dimanche</span>
                        <span className="text-slate-600">Fermé</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-slate-100 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Besoin d'une réponse rapide ?</h3>
                <p className="text-slate-600 mb-4">
                  Pour toute urgence, n'hésitez pas à nous contacter directement par téléphone. Notre équipe est
                  disponible du lundi au vendredi de 9h à 18h.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

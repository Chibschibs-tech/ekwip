"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Clock, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ComingSoon() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact-coming-soon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", company: "", email: "", message: "" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ekwip-50 via-white to-ekwip-100">
      {/* Header */}
      <header className="py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Image src="/images/logo-black.png" alt="Ekwip" width={120} height={40} className="h-10 w-auto" />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Ekwip se refait une peau neuve</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Notre nouveau site arrive bientôt avec une expérience encore meilleure
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Nous travaillons dur pour vous offrir une nouvelle expérience de location d'équipements informatiques. En
              attendant, contactez-nous pour tous vos besoins.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-xl border-ekwip-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Restez informé</CardTitle>
                  <p className="text-gray-600">
                    Laissez-nous vos coordonnées et nous vous contacterons dès que le nouveau site sera disponible
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Merci !</h3>
                      <p className="text-gray-600">Nous vous recontacterons bientôt.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-ekwip-200 focus:border-ekwip focus:ring-ekwip"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Entreprise *
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="border-ekwip-200 focus:border-ekwip focus:ring-ekwip"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-ekwip-200 focus:border-ekwip focus:ring-ekwip"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Parlez-nous de vos besoins en équipements informatiques..."
                          className="border-ekwip-200 focus:border-ekwip focus:ring-ekwip"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-ekwip hover:bg-ekwip-600 text-white"
                        size="lg"
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Besoin d'aide maintenant ?</h2>
                <p className="text-gray-600 mb-8">Notre équipe reste disponible pour répondre à vos besoins</p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ekwip-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-ekwip" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Téléphone</h3>
                      <p className="text-gray-600">+212 522 123 456</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ekwip-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-ekwip" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">sales@ekwip.ma</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ekwip-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-ekwip" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Adresse</h3>
                      <p className="text-gray-600">
                        123 Boulevard Mohammed V
                        <br />
                        Casablanca, Maroc
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ekwip-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-ekwip" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Horaires</h3>
                      <p className="text-gray-600">
                        Lun - Ven: 9h00 - 18h00
                        <br />
                        Sam: 9h00 - 13h00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Preview */}
              <Card className="border-ekwip-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Nos services</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Location d'ordinateurs portables</li>
                    <li>• Location d'ordinateurs de bureau</li>
                    <li>• Location de tablettes et smartphones</li>
                    <li>• Location d'imprimantes et accessoires</li>
                    <li>• Maintenance et support technique</li>
                    <li>• Solutions sur mesure pour entreprises</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2024 Ekwip. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

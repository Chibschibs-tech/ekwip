"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, CheckCircle, Wrench, Sparkles } from "lucide-react"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the email to sales@ekwip.ma
      // For now, we'll simulate the API call
      const response = await fetch("/api/contact-coming-soon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "sales@ekwip.ma",
          subject: "Nouveau contact depuis la page Coming Soon",
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          company: "",
          email: "",
          message: "",
        })
      }
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
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
      <main className="py-12 md:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-ekwip/20 rounded-full blur-xl"></div>
                <div className="relative bg-ekwip text-white p-6 rounded-full">
                  <Wrench className="h-12 w-12" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">{t("coming_soon.title")}</h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">{t("coming_soon.subtitle")}</p>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t("coming_soon.description")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-ekwip text-white p-2 rounded-lg">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t("coming_soon.form.title")}</h2>
                    <p className="text-gray-600">{t("coming_soon.form.description")}</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <h3 className="font-bold text-green-800 text-lg">{t("coming_soon.form.success")}</h3>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">
                          {t("coming_soon.form.name")}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t("coming_soon.form.name")}
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-700">
                          {t("coming_soon.form.company")}
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder={t("coming_soon.form.company")}
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        {t("coming_soon.form.email")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">
                        {t("coming_soon.form.message")}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Parlez-nous de vos besoins..."
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="rounded-xl"
                      />
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {t("coming_soon.form.submitting")}
                        </span>
                      ) : (
                        t("coming_soon.form.submit")
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0 bg-ekwip text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="h-6 w-6" />
                    <h3 className="text-xl font-bold">{t("coming_soon.contact.title")}</h3>
                  </div>

                  <p className="mb-6 opacity-90">{t("coming_soon.contact.description")}</p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t("coming_soon.contact.phone")}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t("coming_soon.contact.email")}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features Preview */}
              <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Ce qui vous attend</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-ekwip-100 text-ekwip p-2 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Interface modernisée</div>
                        <div className="text-sm text-gray-600">Navigation plus intuitive et design responsive</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-ekwip-100 text-ekwip p-2 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Catalogue enrichi</div>
                        <div className="text-sm text-gray-600">Plus de produits et de configurations disponibles</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-ekwip-100 text-ekwip p-2 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Portail client amélioré</div>
                        <div className="text-sm text-gray-600">Gestion simplifiée de vos équipements</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-500">© 2024 Ekwip. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

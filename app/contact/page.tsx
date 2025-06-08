"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-ekwip-50 to-ekwip-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{t("contact.title")}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("contact.description")}</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 -mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-ekwip to-ekwip-700 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("contact.info.title")}</h2>
                <p className="mb-8 opacity-90">{t("contact.info.description")}</p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t("contact.info.address")}</h3>
                      <p className="opacity-90">
                        123 Avenue Mohammed V<br />
                        Casablanca, 20000
                        <br />
                        Maroc
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t("contact.info.phone")}</h3>
                      <p className="opacity-90">
                        +212 522 123 456
                        <br />
                        +212 661 789 012
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t("contact.info.email")}</h3>
                      <p className="opacity-90">
                        contact@ekwip.ma
                        <br />
                        support@ekwip.ma
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t("contact.info.hours")}</h3>
                      <p className="opacity-90">
                        Lundi - Vendredi: 9h00 - 18h00
                        <br />
                        Samedi: 9h00 - 13h00
                        <br />
                        Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("contact.form.title")}</h2>
                <p className="text-gray-600 mb-8">{t("contact.form.description")}</p>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <h3 className="font-bold text-green-800 text-lg">{t("contact.form.success")}</h3>
                      <p className="text-green-700">{t("contact.form.success_description")}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">
                          {t("contact.form.name")}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t("contact.form.name")}
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          {t("contact.form.email")}
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">
                          {t("contact.form.phone")}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder={t("contact.form.phone")}
                          value={formData.phone}
                          onChange={handleChange}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-700">
                          {t("contact.form.company")}
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder={t("contact.form.company")}
                          value={formData.company}
                          onChange={handleChange}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">
                        {t("contact.form.message")}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Comment pouvons-nous vous aider ?"
                        rows={6}
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
                          {t("contact.form.submitting")}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          {t("contact.form.submit")} <Send className="ml-2 h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("contact.map.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("contact.map.description")}</p>
          </div>

          <div className="bg-white h-96 rounded-3xl shadow-md flex items-center justify-center">
            <p className="text-gray-500">Carte interactive ici</p>
          </div>
        </div>
      </section>
    </div>
  )
}

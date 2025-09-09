"use client"

import type React from "react"

import { useState } from "react"
import { useNeedsList } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trash2, Plus, Minus, ClipboardList, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NeedsListPage() {
  const { items, removeFromNeedsList, updateQuantity, updateDuration, clearNeedsList, getTotalPrice } = useNeedsList()
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Clear the needs list after successful submission
    setTimeout(() => {
      clearNeedsList()
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("needs_list.request_sent")}</h1>
            <p className="text-gray-600 mb-6">{t("needs_list.request_sent_description")}</p>
            <Link href="/catalogue">
              <Button>{t("needs_list.browse_more")}</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/catalogue" className="inline-flex items-center text-ekwip hover:text-ekwip-dark mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au catalogue
          </Link>

          <div className="flex items-center mb-2">
            <ClipboardList className="h-8 w-8 text-ekwip mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Ma liste d'équipements</h1>
          </div>
          <p className="text-gray-600">Sélectionnez vos équipements et demandez un devis personnalisé</p>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <ClipboardList className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Votre liste est vide</h2>
            <p className="text-gray-600 mb-6">Parcourez notre catalogue et ajoutez des équipements à votre liste</p>
            <Link href="/catalogue">
              <Button size="lg">{t("needs_list.browse_catalog")}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Equipment List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ClipboardList className="h-5 w-5 mr-2" />
                    {t("needs_list.selected_equipment")} ({items.length})
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearNeedsList}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vider la liste
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.brand} • {item.category}
                        </p>
                        <p className="text-sm font-medium text-ekwip">
                          {item.price} Dhs {t("common.per_month")}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Quantity */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{t("needs_list.quantity")}:</span>
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{t("needs_list.duration")}:</span>
                          <select
                            value={item.duration}
                            onChange={(e) => updateDuration(item.id, Number.parseInt(e.target.value))}
                            className="border rounded px-2 py-1 text-sm"
                          >
                            {[6, 12, 18, 24, 36].map((months) => (
                              <option key={months} value={months}>
                                {months} {t("common.month")}
                                {months > 1 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromNeedsList(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>{t("needs_list.quote_form_title")}</CardTitle>
                  <div className="text-2xl font-bold text-ekwip">
                    {t("needs_list.total_estimate")}: {getTotalPrice()} Dhs/mois
                  </div>
                  <p className="text-xs text-gray-500">{t("needs_list.estimate_note")}</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Nom complet *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email professionnel *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="company"
                        placeholder="Entreprise *"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Input name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder={t("needs_list.message_placeholder")}
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>

                    <Separator />

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t("needs_list.sending_request")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t("needs_list.send_request")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

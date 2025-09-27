"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, Send, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  duration: number
  category: string
}

export default function WishlistPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: 'MacBook Pro 14"',
      image: "/images/macbook-pro.png",
      price: 299,
      quantity: 2,
      duration: 12,
      category: "Ordinateurs portables",
    },
    {
      id: "2",
      name: "Dell Precision 5690",
      image: "/images/dell-precision-5690.png",
      price: 399,
      quantity: 1,
      duration: 24,
      category: "Workstations",
    },
  ])

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const updateDuration = (id: string, newDuration: number) => {
    if (newDuration < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, duration: newDuration } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const getTotalMonthly = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalContract = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity * item.duration, 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h2>
            <p className="text-gray-600 mb-6">
              Merci pour votre demande de devis. Notre équipe commerciale vous contactera dans les 24h.
            </p>
            <div className="space-y-3">
              <Link href="/catalogue">
                <Button className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/80">Continuer mes achats</Button>
              </Link>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setIsSubmitted(false)
                  setCartItems([])
                  setContactInfo({
                    name: "",
                    email: "",
                    company: "",
                    phone: "",
                    message: "",
                  })
                }}
              >
                Nouvelle demande
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ma liste de besoins</h1>
              <p className="text-gray-600">Gérez vos équipements sélectionnés et demandez un devis personnalisé</p>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-[#1f3b57]" />
              <Badge variant="secondary">
                {cartItems.length} article{cartItems.length > 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Votre liste est vide</h2>
              <p className="text-gray-600 mb-6">
                Parcourez notre catalogue et ajoutez des équipements à votre liste de besoins.
              </p>
              <Link href="/catalogue">
                <Button className="bg-[#1f3b57] hover:bg-[#1f3b57]/80">Parcourir le catalogue</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Équipements sélectionnés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg bg-gray-100 p-2"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-500">{item.category}</p>
                              <p className="text-lg font-bold text-[#1f3b57] mt-1">{item.price}€/mois</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-6 mt-4">
                            <div className="flex items-center space-x-2">
                              <Label className="text-sm font-medium">Quantité:</Label>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Label className="text-sm font-medium">Durée (mois):</Label>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateDuration(item.id, item.duration - 1)}
                                  disabled={item.duration <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">{item.duration}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateDuration(item.id, item.duration + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-gray-600">
                            Sous-total:{" "}
                            <span className="font-semibold">{item.price * item.quantity * item.duration}€</span>
                            <span className="text-gray-500"> ({item.duration} mois)</span>
                          </div>
                        </div>
                      </div>
                      {cartItems.indexOf(item) < cartItems.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Summary and Contact Form */}
            <div className="space-y-6">
              {/* Price Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total mensuel:</span>
                    <span className="font-semibold">{getTotalMonthly()}€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total contrat:</span>
                    <span className="font-semibold">{getTotalContract()}€</span>
                  </div>
                  <Separator />
                  <div className="text-sm text-gray-600">
                    <p>• Installation et configuration incluses</p>
                    <p>• Support technique 24/7</p>
                    <p>• Maintenance et réparations incluses</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Demander un devis</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={contactInfo.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={contactInfo.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Entreprise *</Label>
                      <Input
                        id="company"
                        name="company"
                        required
                        value={contactInfo.company}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={contactInfo.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={contactInfo.message}
                        onChange={handleInputChange}
                        placeholder="Précisez vos besoins spécifiques..."
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/80">
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          Demander un devis
                          <Send className="ml-2 h-4 w-4" />
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

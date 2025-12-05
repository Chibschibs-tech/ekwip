"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

import { sendEmail } from "@/app/actions/send-email"
import { toast } from "sonner"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            subject: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formDataToSend = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value)
        })

        const result = await sendEmail(formDataToSend)

        setIsSubmitting(false)

        if (result.error) {
            toast.error(result.error)
            return
        }

        setIsSubmitted(true)
        setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            subject: "",
            message: "",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#1f3b57] to-[#1f3b57]/80 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Notre équipe d'experts est là pour vous accompagner dans tous vos projets d'infrastructure IT, Audiovisuel et Digital.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Nos coordonnées</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-[#1f3b57] rounded-lg flex items-center justify-center">
                                                <Mail className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                                            <p className="text-gray-600">contact@ekwip.ma</p>
                                            <p className="text-gray-600">sales@ekwip.ma</p>
                                            <p className="text-sm text-gray-500">Réponse sous 24h</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-[#1f3b57] rounded-lg flex items-center justify-center">
                                                <Phone className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Téléphone</h3>
                                            <p className="text-gray-600">+212 5 22 XX XX XX</p>
                                            <p className="text-gray-600">+212 6 XX XX XX XX</p>
                                            <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-[#1f3b57] rounded-lg flex items-center justify-center">
                                                <MapPin className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
                                            <p className="text-gray-600">
                                                30 Bd Rahal El Meskini<br />
                                                Casablanca
                                                <br />
                                                Maroc
                                            </p>
                                            <p className="text-sm text-gray-500">Rendez-vous sur demande</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-[#1f3b57] rounded-lg flex items-center justify-center">
                                                <Clock className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Horaires</h3>
                                            <p className="text-gray-600">
                                                Lundi - Vendredi: 9h - 18h
                                                <br />
                                                Samedi: 9h - 13h
                                                <br />
                                                Dimanche: Fermé
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-gray-900">Envoyez-nous un message</CardTitle>
                                    <CardDescription>
                                        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message envoyé avec succès !</h3>
                                            <p className="text-gray-600 mb-6">
                                                Merci pour votre message. Notre équipe vous contactera très bientôt.
                                            </p>
                                            <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                                Envoyer un autre message
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="name">Nom complet *</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
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
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="company">Entreprise</Label>
                                                    <Input
                                                        id="company"
                                                        name="company"
                                                        type="text"
                                                        value={formData.company}
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
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="subject">Sujet *</Label>
                                                <Select value={formData.subject} onValueChange={handleSelectChange}>
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Sélectionnez un sujet" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="devis">Demande de devis</SelectItem>
                                                        <SelectItem value="info">Demande d'informations</SelectItem>
                                                        <SelectItem value="support">Support technique</SelectItem>
                                                        <SelectItem value="partenariat">Partenariat</SelectItem>
                                                        <SelectItem value="autre">Autre</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="message">Message *</Label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    rows={6}
                                                    required
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    placeholder="Décrivez votre projet ou votre demande en détail..."
                                                    className="mt-1"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/80"
                                                size="lg"
                                            >
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
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

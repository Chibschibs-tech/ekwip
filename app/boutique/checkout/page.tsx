"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, CreditCard, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

interface BillingAddress {
  sameAsShipping: boolean
  fullName: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)

  // Filter cart items to only show sale products
  const saleCartItems = useMemo(() => {
    return items.filter((item) => item.product.productType === "sale")
  }, [items])

  // Form state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Maroc",
  })

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    sameAsShipping: true,
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Maroc",
  })

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate totals
  const subtotal = useMemo(() => {
    return saleCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [saleCartItems])

  const taxRate = 0.2
  const tax = subtotal * taxRate
  const shipping = subtotal > 1000 ? 0 : 50
  const total = subtotal + tax + shipping

  // Validation
  const isShippingValid = () => {
    return (
      shippingAddress.fullName.trim() !== "" &&
      shippingAddress.phone.trim() !== "" &&
      shippingAddress.address.trim() !== "" &&
      shippingAddress.city.trim() !== "" &&
      shippingAddress.postalCode.trim() !== ""
    )
  }

  const isBillingValid = () => {
    if (billingAddress.sameAsShipping) return true
    return (
      billingAddress.fullName.trim() !== "" &&
      billingAddress.phone.trim() !== "" &&
      billingAddress.address.trim() !== "" &&
      billingAddress.city.trim() !== "" &&
      billingAddress.postalCode.trim() !== ""
    )
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return isShippingValid()
      case 2:
        return isBillingValid()
      case 3:
        return termsAccepted
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (canProceedToNextStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
    }
  }

  const handlePlaceOrder = async () => {
    if (!canProceedToNextStep()) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les conditions générales",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderItems = saleCartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
      }))

      const orderData = {
        orderType: "sale",
        status: "pending",
        subtotal: subtotal,
        taxAmount: tax,
        shippingAmount: shipping,
        discountAmount: 0,
        total: total,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress.sameAsShipping ? shippingAddress : billingAddress,
        paymentStatus: "pending",
        paymentMethod: paymentMethod,
        items: orderItems,
      }

      // Create order via API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const order = await response.json()

      // Clear cart
      clearCart()

      // Show success message
      toast({
        title: "Commande passée avec succès!",
        description: `Votre commande #${order.orderNumber} a été créée`,
      })

      // Redirect to order confirmation (or back to boutique)
      router.push(`/boutique?order=${order.id}`)
    } catch (error: any) {
      console.error("Error placing order:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la commande. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (saleCartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <Link href="/boutique">
            <Button>Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/boutique/panier"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au panier
        </Link>

        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[
                { number: 1, label: "Livraison", icon: MapPin },
                { number: 2, label: "Paiement", icon: CreditCard },
                { number: 3, label: "Récapitulatif", icon: Package },
              ].map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number

                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isActive
                            ? "bg-blue-600 border-blue-600 text-white"
                            : isCompleted
                              ? "bg-green-600 border-green-600 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm font-medium ${
                          isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < 2 && (
                      <div
                        className={`h-1 flex-1 mx-4 ${
                          isCompleted ? "bg-green-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Adresse de livraison</CardTitle>
                    <CardDescription>Où souhaitez-vous recevoir votre commande?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Nom complet *</Label>
                        <Input
                          id="fullName"
                          value={shippingAddress.fullName}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                          }
                          placeholder="Prénom et nom"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          value={shippingAddress.phone}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, phone: e.target.value })
                          }
                          placeholder="+212 XXX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, address: e.target.value })
                        }
                        placeholder="Rue, numéro, bâtiment"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, city: e.target.value })
                          }
                          placeholder="Casablanca"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                          }
                          placeholder="20000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Pays *</Label>
                        <Input
                          id="country"
                          value={shippingAddress.country}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, country: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={handleNextStep}
                      disabled={!canProceedToNextStep()}
                    >
                      Continuer vers le paiement
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adresse de facturation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox
                          id="sameAsShipping"
                          checked={billingAddress.sameAsShipping}
                          onCheckedChange={(checked) =>
                            setBillingAddress({ ...billingAddress, sameAsShipping: checked as boolean })
                          }
                        />
                        <Label htmlFor="sameAsShipping" className="cursor-pointer">
                          Identique à l'adresse de livraison
                        </Label>
                      </div>

                      {!billingAddress.sameAsShipping && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="billingFullName">Nom complet *</Label>
                              <Input
                                id="billingFullName"
                                value={billingAddress.fullName}
                                onChange={(e) =>
                                  setBillingAddress({ ...billingAddress, fullName: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingPhone">Téléphone *</Label>
                              <Input
                                id="billingPhone"
                                value={billingAddress.phone}
                                onChange={(e) =>
                                  setBillingAddress({ ...billingAddress, phone: e.target.value })
                                }
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="billingAddress">Adresse *</Label>
                            <Input
                              id="billingAddress"
                              value={billingAddress.address}
                              onChange={(e) =>
                                setBillingAddress({ ...billingAddress, address: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="billingCity">Ville *</Label>
                              <Input
                                id="billingCity"
                                value={billingAddress.city}
                                onChange={(e) =>
                                  setBillingAddress({ ...billingAddress, city: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingPostalCode">Code postal *</Label>
                              <Input
                                id="billingPostalCode"
                                value={billingAddress.postalCode}
                                onChange={(e) =>
                                  setBillingAddress({ ...billingAddress, postalCode: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingCountry">Pays *</Label>
                              <Input
                                id="billingCountry"
                                value={billingAddress.country}
                                onChange={(e) =>
                                  setBillingAddress({ ...billingAddress, country: e.target.value })
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Méthode de paiement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "cash_on_delivery"
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => setPaymentMethod("cash_on_delivery")}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              paymentMethod === "cash_on_delivery"
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300"
                            }`}
                          >
                            {paymentMethod === "cash_on_delivery" && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">Paiement à la livraison</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Payez en espèces ou par carte lors de la livraison
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "bank_transfer"
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => setPaymentMethod("bank_transfer")}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              paymentMethod === "bank_transfer"
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300"
                            }`}
                          >
                            {paymentMethod === "bank_transfer" && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">Virement bancaire</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Transférez le montant avant la livraison
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">
                        * Le paiement en ligne sera disponible prochainement
                      </p>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Retour
                    </Button>
                    <Button onClick={handleNextStep} disabled={!canProceedToNextStep()} className="flex-1">
                      Continuer vers le récapitulatif
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Récapitulatif de la commande</CardTitle>
                    <CardDescription>Vérifiez vos informations avant de finaliser</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Address Summary */}
                    <div>
                      <h3 className="font-semibold mb-2">Adresse de livraison</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p>{shippingAddress.fullName}</p>
                        <p>{shippingAddress.address}</p>
                        <p>
                          {shippingAddress.city}, {shippingAddress.postalCode}
                        </p>
                        <p>{shippingAddress.country}</p>
                        <p>{shippingAddress.phone}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Method Summary */}
                    <div>
                      <h3 className="font-semibold mb-2">Méthode de paiement</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {paymentMethod === "cash_on_delivery"
                          ? "Paiement à la livraison"
                          : "Virement bancaire"}
                      </p>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-4">Articles commandés</h3>
                      <div className="space-y-4">
                        {saleCartItems.map((item) => (
                          <div key={item.product.id} className="flex gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                              <Image
                                src={
                                  item.product.thumbnail || item.product.images?.[0] || "/placeholder.svg"
                                }
                                alt={item.product.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Quantité: {item.quantity} × {item.product.price.toFixed(2)} DH
                              </p>
                            </div>
                            <p className="font-semibold">
                              {(item.product.price * item.quantity).toFixed(2)} DH
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        J'accepte les{" "}
                        <Link href="/conditions-generales" className="text-blue-600 hover:underline">
                          conditions générales de vente
                        </Link>{" "}
                        et la{" "}
                        <Link href="/politique-confidentialite" className="text-blue-600 hover:underline">
                          politique de confidentialité
                        </Link>
                        . *
                      </Label>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                        Retour
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={!canProceedToNextStep() || isSubmitting}
                        className="flex-1"
                        size="lg"
                      >
                        {isSubmitting ? "Traitement..." : "Confirmer la commande"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Sous-total HT</span>
                      <span className="font-medium">{subtotal.toFixed(2)} DH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">TVA (20%)</span>
                      <span className="font-medium">{tax.toFixed(2)} DH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Livraison</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Gratuite</span>
                        ) : (
                          `${shipping.toFixed(2)} DH`
                        )}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total TTC</span>
                    <span className="text-blue-600 dark:text-blue-400">{total.toFixed(2)} DH</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


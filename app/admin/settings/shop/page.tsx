"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Save, Store, Globe, CreditCard, Truck, Bell } from "lucide-react"

export default function ShopSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General
    shopName: "Ekwip",
    shopDescription: "Location et vente d'équipements informatiques professionnels",
    email: "contact@ekwip.ma",
    phone: "+212 5 22 00 00 00",
    address: "123 Boulevard Mohammed V, Casablanca, Maroc",

    // Regional
    currency: "MAD",
    timezone: "Africa/Casablanca",
    language: "fr",

    // Features
    enableRental: true,
    enableSale: true,
    enableQuotes: true,

    // Tax
    taxEnabled: true,
    taxRate: 20,
    taxIncluded: false,

    // Shipping
    freeShippingThreshold: 5000,
    defaultShippingCost: 150,

    // Notifications
    orderNotifications: true,
    lowStockNotifications: true,
    lowStockThreshold: 5,
  })

  const handleSave = () => {
    // TODO: Save to database
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres de la boutique ont été mis à jour",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Paramètres de la boutique</h1>
          <p className="text-gray-600 dark:text-gray-400">Configurez les paramètres généraux de votre boutique</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              <CardTitle>Informations générales</CardTitle>
            </div>
            <CardDescription>Les informations de base de votre boutique</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom de la boutique</Label>
                <Input
                  value={settings.shopName}
                  onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={settings.shopDescription}
                onChange={(e) => setSettings({ ...settings, shopDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Paramètres régionaux</CardTitle>
            </div>
            <CardDescription>Devise, fuseau horaire et langue</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Devise</Label>
              <Select value={settings.currency} onValueChange={(v) => setSettings({ ...settings, currency: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MAD">MAD - Dirham marocain</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="USD">USD - Dollar américain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fuseau horaire</Label>
              <Select value={settings.timezone} onValueChange={(v) => setSettings({ ...settings, timezone: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Casablanca">Africa/Casablanca (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Langue par défaut</Label>
              <Select value={settings.language} onValueChange={(v) => setSettings({ ...settings, language: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Fonctionnalités</CardTitle>
            <CardDescription>Activez ou désactivez les fonctionnalités de la boutique</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Location d'équipements</Label>
                <p className="text-sm text-gray-500">Permettre la location de produits</p>
              </div>
              <Switch
                checked={settings.enableRental}
                onCheckedChange={(v) => setSettings({ ...settings, enableRental: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Vente d'équipements</Label>
                <p className="text-sm text-gray-500">Permettre la vente de produits</p>
              </div>
              <Switch
                checked={settings.enableSale}
                onCheckedChange={(v) => setSettings({ ...settings, enableSale: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Demandes de devis</Label>
                <p className="text-sm text-gray-500">Permettre les demandes de devis personnalisés</p>
              </div>
              <Switch
                checked={settings.enableQuotes}
                onCheckedChange={(v) => setSettings({ ...settings, enableQuotes: v })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tax Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>Taxes</CardTitle>
            </div>
            <CardDescription>Configuration de la TVA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Activer les taxes</Label>
                <p className="text-sm text-gray-500">Appliquer la TVA sur les commandes</p>
              </div>
              <Switch
                checked={settings.taxEnabled}
                onCheckedChange={(v) => setSettings({ ...settings, taxEnabled: v })}
              />
            </div>
            {settings.taxEnabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Taux de TVA (%)</Label>
                  <Input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({ ...settings, taxRate: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <Switch
                    checked={settings.taxIncluded}
                    onCheckedChange={(v) => setSettings({ ...settings, taxIncluded: v })}
                  />
                  <Label>Prix TTC affichés</Label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <CardTitle>Livraison</CardTitle>
            </div>
            <CardDescription>Configuration des frais de livraison</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Seuil livraison gratuite (DH)</Label>
              <Input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Frais de livraison par défaut (DH)</Label>
              <Input
                type="number"
                value={settings.defaultShippingCost}
                onChange={(e) => setSettings({ ...settings, defaultShippingCost: Number.parseFloat(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Configurez les alertes et notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications de commandes</Label>
                <p className="text-sm text-gray-500">Recevoir un email pour chaque nouvelle commande</p>
              </div>
              <Switch
                checked={settings.orderNotifications}
                onCheckedChange={(v) => setSettings({ ...settings, orderNotifications: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Alertes stock bas</Label>
                <p className="text-sm text-gray-500">Recevoir une alerte quand un produit atteint le seuil</p>
              </div>
              <Switch
                checked={settings.lowStockNotifications}
                onCheckedChange={(v) => setSettings({ ...settings, lowStockNotifications: v })}
              />
            </div>
            {settings.lowStockNotifications && (
              <div className="space-y-2">
                <Label>Seuil d'alerte stock bas</Label>
                <Input
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) => setSettings({ ...settings, lowStockThreshold: Number.parseInt(e.target.value) })}
                  className="w-32"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

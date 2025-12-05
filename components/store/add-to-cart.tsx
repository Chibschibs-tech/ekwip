"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface AddToCartProps {
  productId: number
}

export function AddToCart({ productId }: AddToCartProps) {
  const handleAddToCart = () => {
    // This would typically integrate with a cart system
    console.log(`Adding product ${productId} to cart`)
    // For now, just show an alert
    alert("Produit ajouté au panier ! (Fonctionnalité en développement)")
  }

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full">
      <ShoppingCart className="h-4 w-4 mr-2" />
      Ajouter au panier
    </Button>
  )
}

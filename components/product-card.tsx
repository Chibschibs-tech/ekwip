"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductProps {
  id: number
  name: string
  description: string
  shortDescription: string
  price: number
  firstMonthPrice: number
  image: string
  category: string
  slug: string
  featured: boolean
  new: boolean
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="product-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-50 p-6 flex items-center justify-center h-56 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={180}
          height={180}
          className={`product-image transition-all duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-amber-100 text-amber-600 hover:bg-amber-100 rounded-full px-3 py-1 font-medium shadow-sm">
            Populaire
          </Badge>
        )}
        {product.new && (
          <Badge className="absolute top-3 left-3 bg-blue-100 text-blue-600 hover:bg-blue-100 rounded-full px-3 py-1 font-medium shadow-sm">
            Nouveau
          </Badge>
        )}
      </div>
      <div className="p-6">
        <p className="text-sm text-blue-600 font-medium mb-2">{product.category}</p>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2">{product.shortDescription}</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {product.price} Dhs<span className="text-sm font-normal">/mois</span>
            </p>
            <p className="text-sm text-gray-500">(premier mois {product.firstMonthPrice} Dhs)</p>
          </div>
          <Link href={`/store/product/${product.slug}`}>
            <Button variant="gradient" size="sm" className="rounded-full shadow-md hover:shadow-lg">
              Voir détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

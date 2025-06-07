"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  iconName: string
  title: string
  description: string
  slug: string
}

// Map category slugs to their respective images
const categoryImages: Record<string, string> = {
  "ordinateurs-portables": "/images/laptop-hero.png",
  tablettes: "/images/tablet-hero.png",
  accessoires: "/images/accessories-hero.png",
  imprimantes: "/images/printer-hero.png",
  mobilier: "/images/furniture-hero.png",
  smartphones: "/images/smartphone-hero.png",
}

export default function CategoryCard({ iconName, title, description, slug }: CategoryCardProps) {
  // Get the image for this category or use a default
  const categoryImage = categoryImages[slug] || "/images/laptop-hero.png"

  return (
    <Link href={`/catalogue/${slug}`}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
        <Card className="group border border-ekwip-200 hover:border-ekwip hover:shadow-lg hover:bg-ekwip transition-all duration-300 h-full bg-gradient-to-br from-white to-ekwip-50 relative overflow-hidden">
          {/* Circle with product image in upper right */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white border-4 border-ekwip-100 group-hover:border-white overflow-hidden shadow-md">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={categoryImage || "/placeholder.svg"}
                alt={title}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <CardContent className="p-6 flex flex-col h-full">
            <div className="mb-4 bg-ekwip p-4 rounded-lg flex items-center justify-center">
              <div className="h-10 w-10 text-white group-hover:text-ekwip group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
                {iconName.charAt(0).toUpperCase()}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 flex-grow group-hover:text-gray-200 transition-colors duration-300">
              {description}
            </p>
            <motion.div
              className="text-ekwip flex items-center text-sm font-medium group-hover:text-white transition-colors duration-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Découvrir <ArrowRight className="ml-1 h-4 w-4" />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

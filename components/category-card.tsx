"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  iconName: string
  title: string
  description: string
  slug: string
}

export default function CategoryCard({ iconName, title, description, slug }: CategoryCardProps) {
  return (
    <Link href={`/catalogue/${slug}`}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
        <Card className="border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="mb-4 bg-slate-100 p-4 rounded-lg flex items-center justify-center">
              <div className="h-10 w-10 text-slate-600">{iconName.charAt(0).toUpperCase()}</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-slate-600 text-sm mb-4 flex-grow">{description}</p>
            <motion.div
              className="text-sky-600 hover:text-sky-700 flex items-center text-sm font-medium"
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

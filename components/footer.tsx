"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center text-2xl font-semibold mb-6">
              <Image src="/images/logo-white.png" alt="Ekwip" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Votre partenaire de confiance pour la location d'équipements informatiques professionnels au Maroc.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5 text-[#1f3b57]" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5 text-[#1f3b57]" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Linkedin className="h-5 w-5 text-[#1f3b57]" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-[#1f3b57]" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <a href="https://ekwip.ma/catalogue" className="text-gray-400 hover:text-white transition-colors">
                  Catalogue
                </a>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 hover:text-white transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/portail-client" className="text-gray-400 hover:text-white transition-colors">
                  Portail client
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Restez informé de nos dernières offres et nouveautés</p>
            <div className="flex">
              <Input
                placeholder="Votre email"
                className="rounded-l-full rounded-r-none border-gray-700 bg-gray-800 text-white focus:border-[#1f3b57]"
              />
              <Button className="rounded-l-none rounded-r-full bg-[#1f3b57] hover:bg-[#1f3b57]/80" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Ekwip. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link href="/mentions-legales" className="text-gray-500 hover:text-white text-sm transition-colors">
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link href="/cgv" className="text-gray-500 hover:text-white text-sm transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

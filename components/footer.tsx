"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center text-2xl font-semibold mb-6">
              <Image src="/images/logo-white.png" alt="Ekwip" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5 text-ekwip-300" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5 text-ekwip-300" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Linkedin className="h-5 w-5 text-ekwip-300" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-ekwip-300" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">{t("footer.services")}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.how_it_works")}
                </Link>
              </li>
              <li>
                <a href="https://ekwip.ma/catalogue" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.catalog")}
                </a>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.store")}
                </Link>
              </li>
              <li>
                <Link href="/portail-client" className="text-gray-400 hover:text-white transition-colors">
                  {t("nav.customer_portal")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">{t("footer.newsletter")}</h3>
            <p className="text-gray-400 mb-4">{t("footer.newsletter_description")}</p>
            <div className="flex">
              <Input
                placeholder={t("footer.newsletter_placeholder")}
                className="rounded-l-full rounded-r-none border-gray-700 bg-gray-800 text-white focus:border-ekwip"
              />
              <Button variant="gradient" size="icon" className="rounded-l-none rounded-r-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Ekwip. {t("footer.rights")}
          </p>
          <div className="flex space-x-6">
            <Link href="/mentions-legales" className="text-gray-500 hover:text-white text-sm transition-colors">
              {t("footer.legal_notice")}
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              {t("footer.privacy_policy")}
            </Link>
            <Link href="/cgv" className="text-gray-500 hover:text-white text-sm transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

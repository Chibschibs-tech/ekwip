import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#1F3B57] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & tagline */}
          <div className="col-span-1">
            <Image
              src="/images/logo-white.png"
              alt="Ekwip"
              width={120}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre partenaire IT au Maroc — vente de matériel, location via Rento, et développement digital sur-mesure.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/boutique" className="text-gray-300 hover:text-white transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/rento" className="text-gray-300 hover:text-white transition-colors">
                  Rento
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/portail-client" className="text-gray-300 hover:text-white transition-colors">
                  Portail Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marques" className="text-gray-300 hover:text-white transition-colors">
                  Nos marques
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-gray-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:contact@ekwip.ma" className="hover:text-white transition-colors block">contact@ekwip.ma</a>
                  <a href="mailto:sales@ekwip.ma" className="hover:text-white transition-colors block">sales@ekwip.ma</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+212660703622" className="hover:text-white transition-colors">06 60 70 36 22</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <a
                  href="https://wa.me/212660703622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>30 Bd Rahal El Meskini, Casablanca</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ekwip. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

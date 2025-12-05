import Link from "next/link"
import Image from "next/image"

export default function CorporateFooter() {
    return (
        <footer className="bg-[#1F3B57] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1">
                        <Image
                            src="/images/logo-white.png"
                            alt="Ekwip"
                            width={120}
                            height={40}
                            className="h-8 w-auto mb-4"
                        />
                        <p className="text-gray-300 text-sm">
                            Ekwip aide les entreprises à s'équiper, à se connecter et à digitaliser leurs opérations.
                        </p>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="font-semibold mb-4">Nos Solutions</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/corporate/daas" className="text-gray-300 hover:text-white transition-colors">
                                    Ekwip DaaS
                                </Link>
                            </li>
                            <li>
                                <Link href="/corporate/connect" className="text-gray-300 hover:text-white transition-colors">
                                    Ekwip Connect
                                </Link>
                            </li>
                            <li>
                                <Link href="/corporate/tech" className="text-gray-300 hover:text-white transition-colors">
                                    Ekwip Tech
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Entreprise</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/corporate/about" className="text-gray-300 hover:text-white transition-colors">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/corporate/contact" className="text-gray-300 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Casablanca, Maroc</li>
                            <li>contact@ekwip.ma</li>
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

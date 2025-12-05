import Link from "next/link"
import Image from "next/image"

export default function CorporateNavbar() {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/corporate" className="flex items-center space-x-2">
                        <Image
                            src="/images/logo-black.png"
                            alt="Ekwip"
                            width={120}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/corporate" className="text-gray-700 hover:text-[#1F3B57] font-medium transition-colors">
                            Accueil
                        </Link>
                        <Link href="/corporate/daas" className="text-gray-700 hover:text-[#1F3B57] font-medium transition-colors">
                            Ekwip DaaS
                        </Link>
                        <Link href="/corporate/connect" className="text-gray-700 hover:text-[#1F3B57] font-medium transition-colors">
                            Ekwip Connect
                        </Link>
                        <Link href="/corporate/tech" className="text-gray-700 hover:text-[#1F3B57] font-medium transition-colors">
                            Ekwip Tech
                        </Link>
                        <Link href="/corporate/contact" className="text-gray-700 hover:text-[#1F3B57] font-medium transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            href="https://daas.ekwip.ma"
                            className="bg-[#1F3B57] text-white px-6 py-2 rounded-md hover:bg-[#152d42] transition-colors font-medium"
                        >
                            Accéder au Catalogue
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

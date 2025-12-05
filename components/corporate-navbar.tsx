import Link from "next/link"
import Image from "next/image"

export default function CorporateNavbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
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
                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/corporate" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                            Accueil
                        </Link>
                        <Link href="/daas" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                            Ekwip DaaS
                        </Link>
                        <Link href="/corporate/connect" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                            Ekwip Connect
                        </Link>
                        <Link href="/corporate/tech" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                            Ekwip Tech
                        </Link>
                        <Link href="/corporate/contact" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Right Section: Language & CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1 text-sm">
                            <button className="px-2 py-1 text-ekwip-primary font-medium">
                                FR
                            </button>
                            <span className="text-slate-300">|</span>
                            <button className="px-2 py-1 text-slate-400 hover:text-slate-600 transition-colors">
                                EN
                            </button>
                        </div>

                        {/* Catalog CTA */}
                        <Link href="/daas/catalogue" className="ek-btn-pill-primary">
                            Accéder au Catalogue
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

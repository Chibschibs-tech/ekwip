"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function GlobalHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/corporate" className="flex items-center gap-2.5">
                        {/* Ek Pill */}
                        <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-ekwip-primaryDeep to-ekwip-primary flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">Ek</span>
                        </div>

                        {/* Brand */}
                        <div className="flex flex-col">
                            <span className="text-base font-bold text-slate-900">ekwip</span>
                            <span className="text-[9px] text-slate-500 uppercase tracking-[0.15em] leading-none">
                                IT • AV • TECH
                            </span>
                        </div>
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href="/corporate"
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/corporate/daas"
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Ekwip DaaS
                        </Link>
                        <Link
                            href="/corporate/connect"
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Ekwip Connect
                        </Link>
                        <Link
                            href="/corporate/tech"
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Ekwip Tech
                        </Link>
                        <Link
                            href="/corporate/contact"
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Right Section: Language & CTA - Desktop */}
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
                        <Link
                            href="/daas/catalogue"
                            className="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full bg-gradient-to-r from-ekwip-primaryDeep via-ekwip-primary to-sky-500 text-xs font-semibold text-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            Accéder au catalogue DaaS
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-700 hover:text-ekwip-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white">
                        <div className="px-4 py-4 space-y-2">
                            <Link
                                href="/corporate"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/corporate/daas"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                Ekwip DaaS
                            </Link>
                            <Link
                                href="/corporate/connect"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                Ekwip Connect
                            </Link>
                            <Link
                                href="/corporate/tech"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                Ekwip Tech
                            </Link>
                            <Link
                                href="/corporate/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-ekwip-primary hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                Contact
                            </Link>
                            <div className="pt-4 border-t border-slate-200">
                                <Link
                                    href="/daas/catalogue"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full bg-gradient-to-r from-ekwip-primaryDeep via-ekwip-primary to-sky-500 text-xs font-semibold text-white shadow-sm hover:shadow-md transition-shadow w-full"
                                >
                                    Accéder au catalogue DaaS
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </header>
    )
}

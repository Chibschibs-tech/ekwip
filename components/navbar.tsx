"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { CartIcon } from "@/components/cart/cart-icon";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LocaleLink from "@/components/LocaleLink";

const LOCALES = ["fr", "en", "ar"] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Normalise le pathname pour détecter la route active (on retire le préfixe locale)
  const normalizedPath = useMemo(() => {
    if (!pathname) return "/";
    const parts = pathname.split("/").filter(Boolean);
    const first = parts[0];
    const isLocale = first && LOCALES.includes(first as any);
    const cleaned = isLocale ? `/${parts.slice(1).join("/")}` : `/${parts.join("/")}`;
    return cleaned === "" ? "/" : cleaned;
  }, [pathname]);

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.catalog"), href: "/catalogue" },
    { name: t("nav.store"), href: "/boutique" },
    { name: t("nav.brands"), href: "/marques" },
    { name: t("nav.how-it-works"), href: "/comment-ca-marche" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return normalizedPath === "/";
    // active si la route commence par le segment visé (ex: /catalogue, /catalogue/product/…)
    return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
  };

  if (!mounted) {
    return (
      <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50" role="navigation" aria-label="Primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50" role="navigation" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo (locale-aware) */}
          <div className="flex items-center">
            <LocaleLink href="/" className="flex-shrink-0 flex items-center" aria-label="Ekwip - Accueil">
              <Image
                src="/images/logo-black.png"
                alt="Ekwip"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </LocaleLink>
          </div>

          {/* Menu desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  prefetch
                  aria-current={active ? "page" : undefined}
                  className={[
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    active
                      ? "text-[#1f3b57] bg-gray-100"
                      : "text-gray-700 hover:text-[#1f3b57] hover:bg-gray-50",
                  ].join(" ")}
                >
                  {item.name}
                </LocaleLink>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Switcher (remplace FR/EN/AR) */}
            <div className="hidden md:flex items-center">
              <LanguageSwitcher />
            </div>

            <CartIcon />

            <LocaleLink href="/portail-client">
              <Button variant="ghost" size="icon" aria-label="Client portal">
                <User className="h-5 w-5" />
              </Button>
            </LocaleLink>

            <button
              type="button"
              onClick={() => setIsMenuOpen((s) => !s)}
              className="lg:hidden p-2"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "block px-3 py-2 text-base font-medium rounded-md",
                    active
                      ? "text-[#1f3b57] bg-gray-100"
                      : "text-gray-700 hover:text-[#1f3b57] hover:bg-gray-50",
                  ].join(" ")}
                >
                  {item.name}
                </LocaleLink>
              );
            })}

            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

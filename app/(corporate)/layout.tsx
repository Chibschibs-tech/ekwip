import type React from "react"
import CorporateNavbar from "@/components/corporate-navbar"
import CorporateFooter from "@/components/corporate-footer"

export default function CorporateLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <CorporateNavbar />
            <main className="flex-grow">{children}</main>
            <CorporateFooter />
        </div>
    )
}

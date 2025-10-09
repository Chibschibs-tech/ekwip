import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { NeedsListProvider } from "@/contexts/cart-context"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NeedsListProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </NeedsListProvider>
  )
}

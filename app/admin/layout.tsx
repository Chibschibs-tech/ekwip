"use client"

import type React from "react"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import { AdminBreadcrumb } from "@/components/admin/admin-breadcrumb"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { ThemeProvider } from "@/components/theme-provider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AdminAuthProvider>
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <AdminTopbar />
            <div className="flex-1 overflow-auto">
              <div className="container mx-auto p-6">
                <div className="mb-6">
                  <AdminBreadcrumb />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </AdminAuthProvider>
    </ThemeProvider>
  )
}

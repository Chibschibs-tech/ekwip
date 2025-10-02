"use client"

import type React from "react"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { ProductsProvider } from "@/contexts/products-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import { AdminBreadcrumb } from "@/components/admin/admin-breadcrumb"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ProductsProvider>
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Topbar */}
            <AdminTopbar />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto p-6">
                {/* Breadcrumb */}
                <AdminBreadcrumb />

                {/* Content */}
                <div className="mt-6">{children}</div>
              </div>
            </main>
          </div>
        </div>
        <Toaster />
      </ProductsProvider>
    </AdminAuthProvider>
  )
}

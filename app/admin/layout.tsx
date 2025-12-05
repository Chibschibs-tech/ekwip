"use client"

import type React from "react"

import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { ProductsProvider } from "@/contexts/products-context"
import { CategoriesProvider } from "@/contexts/categories-context"
import { BrandsProvider } from "@/contexts/brands-context"
import { AttributesProvider } from "@/contexts/attributes-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import { AdminBreadcrumb } from "@/components/admin/admin-breadcrumb"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <CategoriesProvider>
        <BrandsProvider>
          <AttributesProvider>
            <ProductsProvider>
              <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
                <AdminSidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <AdminTopbar />
                  <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto px-6 py-8">
                      <AdminBreadcrumb />
                      {children}
                    </div>
                  </main>
                </div>
              </div>
              <Toaster />
            </ProductsProvider>
          </AttributesProvider>
        </BrandsProvider>
      </CategoriesProvider>
    </AdminAuthProvider>
  )
}

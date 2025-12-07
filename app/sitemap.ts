import { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ekwip.ma"

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes - dynamic routes will be handled by Next.js dynamic generation
  const routes: MetadataRoute.Sitemap = [
    // Corporate pages (main domain)
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/connect`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tech`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    
    // DaaS pages (subdomain)
    { url: `${baseUrl}/catalogue`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/boutique`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ]

  // Note: Dynamic routes (categories, products, blog posts) will be automatically
  // included by Next.js sitemap generation from the route structure
  // Additional dynamic sitemap generation can be added here if needed

  return routes
}

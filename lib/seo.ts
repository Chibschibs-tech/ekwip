import { Metadata } from "next"

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "product"
  noindex?: boolean
}

const defaultImage = "https://ekwip.ma/images/og-image.png"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ekwip.ma"
const siteName = "Ekwip"

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultImage,
    url,
    type = "website",
    noindex = false,
  } = config

  const fullTitle = `${title} | ${siteName}`
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    robots: noindex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fr_FR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export function generateStructuredData(
  type: "Organization" | "Service" | "WebSite" | "BreadcrumbList" | "FAQPage" | "LocalBusiness",
  data: any
) {
  const baseUrl = siteUrl

  const schemas: Record<string, any> = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ekwip",
      url: baseUrl,
      logo: `${baseUrl}/images/logo-black.png`,
      description: "Ekwip conçoit et opère l'infrastructure matérielle et digitale de votre entreprise",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@ekwip.ma",
        contactType: "customer service",
      },
      sameAs: [],
      ...data,
    },
    Service: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: data.serviceType || "IT Services",
      provider: {
        "@type": "Organization",
        name: "Ekwip",
        url: baseUrl,
      },
      areaServed: {
        "@type": "Country",
        name: "Morocco",
      },
      ...data,
    },
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      ...data,
    },
    BreadcrumbList: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.items || [],
      ...data,
    },
    FAQPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.questions || [],
      ...data,
    },
    LocalBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Ekwip",
      image: `${baseUrl}/images/logo-black.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
      ...data,
    },
  }

  return schemas[type] || {}
}


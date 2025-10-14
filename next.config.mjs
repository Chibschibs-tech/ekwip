// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

// 👉 chemin vers notre config i18n côté serveur
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ['via.placeholder.com', 'picsum.photos', 'images.unsplash.com'],
    unoptimized: true
  },
  async redirects() {
    return [
      // Non localisé : /store -> /boutique
      { source: '/store', destination: '/boutique', permanent: false },
      { source: '/store/:path*', destination: '/boutique', permanent: false },

      // Localisé : /:locale/store -> /:locale/boutique
      { source: '/:locale(fr|en|ar)/store', destination: '/:locale/boutique', permanent: false },
      { source: '/:locale(fr|en|ar)/store/:path*', destination: '/:locale/boutique', permanent: false }
    ];
  }
};

export default withNextIntl(nextConfig);

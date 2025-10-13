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
      { source: '/store', destination: '/catalogue', permanent: false },
      { source: '/store/:path*', destination: '/catalogue', permanent: false }
    ];
  }
};

export default withNextIntl(nextConfig);

// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

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
      // redirige /fr, /en, /ar (avec ou sans slash final) vers /
      { source: '/:locale(fr|en|ar)', destination: '/', permanent: true },
      { source: '/:locale(fr|en|ar)/', destination: '/', permanent: true },

      // existant
      { source: '/store', destination: '/catalogue', permanent: false },
      { source: '/store/:path*', destination: '/catalogue', permanent: false }
    ];
  }
};

export default withNextIntl(nextConfig);

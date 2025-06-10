/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['via.placeholder.com', 'picsum.photos', 'images.unsplash.com'],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Add a resolve alias for @medusajs/medusa to point to our mock implementation
    config.resolve.alias['@medusajs/medusa'] = require.resolve('./lib/medusa-mock.ts');
    return config;
  },
  async redirects() {
    return [
      {
        source: '/store',
        destination: '/catalogue',
        permanent: false, // Temporary redirect
      },
      {
        source: '/store/:path*',
        destination: '/catalogue',
        permanent: false, // Temporary redirect
      },
    ]
  },
}

export default nextConfig

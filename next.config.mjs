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

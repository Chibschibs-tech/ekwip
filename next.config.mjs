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
}

export default nextConfig

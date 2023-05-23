/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: [
    'page.tsx',
    'api.ts',
    'api.tsx',
  ],
  images: {
    domains: ['https://lh3.googleusercontent.com/'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // App Router is default in Next 13+ (no need to enable explicitly)

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.worldofbooks.com',
      },
      {
        protocol: 'https',
        hostname: '**.worldofbooks.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
};

module.exports = nextConfig;

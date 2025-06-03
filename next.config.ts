
// Removed: import type { NextConfig } from 'next';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', // port removed
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // port removed
      },
    ],
  },
};

export default nextConfig;

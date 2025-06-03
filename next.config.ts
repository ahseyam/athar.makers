

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
      // Example of adding a new image host:
      // {
      //   protocol: 'https',
      //   hostname: 'your-image-hosting-domain.com',
      //   pathname: '/**', // Or a more specific path if needed
      // },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run', // Added for avatars
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

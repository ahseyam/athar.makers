

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
      {
        protocol: 'https',
        hostname: 'drive.google.com', // Added for Google Drive images
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res-console.cloudinary.com', // Added for Cloudinary console/thumbnail images
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // Added for Imgur images
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;


// Removed: import type { NextConfig } from 'next';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Changed for production
  },
  eslint: {
    ignoreDuringBuilds: false, // Changed for production
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
        hostname: 'source.unsplash.com', // Added this line
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

  webpack: (config: { module: { rules: { test: RegExp; use: string[]; }[]; }; }, { isServer }: any) => {
    config.module.rules.push({
      test: /\. (hbs|handlebars)$/,
      use: ['handlebars-loader'],
    });
    return config;
  },
};

export default nextConfig;

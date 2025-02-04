/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const nextConfig = {


  async rewrites() {
    return [
      // Rewrites all API requests to your Express server
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path`,
      }
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.elementvape.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',

      },

    ],
  },
};

export default nextConfig;

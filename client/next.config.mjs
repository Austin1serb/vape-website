/** @type {import('next').NextConfig} */
const nextConfig = {


  async rewrites() {
    return [
      // Rewrites all API requests to your Express server
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
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

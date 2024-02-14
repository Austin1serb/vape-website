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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.elementvape.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },

    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
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

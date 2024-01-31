/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.elementvape.com',
          },
          
        ],
      },
};

export default nextConfig;

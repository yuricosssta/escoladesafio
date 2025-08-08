/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'placehold.co',
        hostname: "imagedelivery.net",
        port: '',
        pathname: '/**',
      },
    ],
  },
  redirects: async () => {
    return [];
  },
};

export default nextConfig;

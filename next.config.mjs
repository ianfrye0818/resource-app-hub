/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
};

export default nextConfig;

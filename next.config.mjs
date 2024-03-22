/** @type {import('next').NextConfig} */
const nextConfig = {

  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, net:false };
    // config.resolve.fallback = { fs: false, path: false, net:false };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

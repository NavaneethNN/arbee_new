/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint runs separately in CI — skip during Next.js build to avoid version conflicts
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
      };
    }
    return config;
  },
};

export default nextConfig;

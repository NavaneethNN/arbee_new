/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Cloudflare R2 public CDN
        protocol: "https",
        hostname: "pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Suppress jose Edge Runtime warnings (jose is only used in Node.js routes, not Edge)
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  eslint: {
    // ESLint compatibility issue with rushstack - disable linting during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during build - will run separately
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

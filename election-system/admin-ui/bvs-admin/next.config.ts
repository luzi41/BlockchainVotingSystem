import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "export",
    eslint: {
      ignoreDuringBuilds: true, // skips all ESLint errors at build time
    },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',

  images: {
    unoptimized: true,
    domains: ["nine-api.davinda.dev/storage"], 
  }
};

export default nextConfig;

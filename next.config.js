/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")();
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "encrypted-tbn0.gstatic.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;

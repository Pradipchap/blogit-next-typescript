const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")();
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "rygx4bpy84fhfq8q.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
  // experimental: {
  //   serverActions: true,
  // },
};

module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;

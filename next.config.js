/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "encrypted-tbn0.gstatic.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

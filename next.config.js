/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["lh3.googleusercontent.com"] },
  output: "export",
  target: "experimental-serverless-trace",
};

module.exports = nextConfig;

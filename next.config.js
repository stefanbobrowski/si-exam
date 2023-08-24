/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  output: 'export',
  distDir: '_static',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_ATLAS_URI: process.env.MONGODB_ATLAS_URI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  output: 'standalone',
  experimental: {
    // Enable experimental features if needed
  },
  // Optimize for Railway deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_ATLAS_URI: process.env.MONGODB_ATLAS_URI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
}

module.exports = nextConfig
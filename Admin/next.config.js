/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: "dist",
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000' // development api
      : 'http://localhost:3000' // production api 
  }
};

module.exports = nextConfig;

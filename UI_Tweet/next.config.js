/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // Add these settings to ignore API routes
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

module.exports = nextConfig;
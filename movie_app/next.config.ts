import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", // This puts sw.js in the public folder
  register: true, // Auto-register the service worker
  skipWaiting: true, // Updates the app immediately when you deploy new code
  disable: process.env.NODE_ENV === "development", // Only disable in dev, ENABLE in prod
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'ia.media-imdb.com' },
      { protocol: 'https', hostname: 'placehold.co' }, 
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default withPWA(nextConfig);
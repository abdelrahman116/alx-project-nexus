import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'ia.media-imdb.com' },
      // Add the new Backup API here:
      { protocol: 'https', hostname: 'placehold.co' }, 
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default withPWA(nextConfig);
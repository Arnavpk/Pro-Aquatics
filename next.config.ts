import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Temporary stock photography is served from Unsplash. Once the client
    // supplies real photographs (or `npm run images:localize` has been run),
    // images are served from /public and this entry can be removed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

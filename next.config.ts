import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Defining localPatterns turns local images into an allowlist, so we must
    // cover every local image: all no-query paths, plus the versioned project
    // screenshots (e.g. /projects/docsiv.png?v=2) used to bust browser caches.
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/projects/**", search: "?v=2" },
    ],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/game", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

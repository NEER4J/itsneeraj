import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    // Defining localPatterns turns local images into an allowlist, so we must
    // cover every local image: all no-query paths, plus the versioned project
    // screenshots (e.g. /projects/docsiv.png?v=2) used to bust browser caches.
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/projects/**", search: "?v=2" },
    ],
  },
};

export default nextConfig;

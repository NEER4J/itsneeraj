import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/#sec-work", permanent: false },
      { source: "/about", destination: "/#sec-hello", permanent: false },
      { source: "/contact", destination: "/#sec-contact", permanent: false },
      { source: "/game", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

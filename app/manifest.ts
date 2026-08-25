import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neeraj Sharma · full-stack engineer, AI products",
    short_name: "Neeraj Sharma",
    description:
      "Full-stack engineer building AI products. Founder of Docsiv, now focused on early users and distribution.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#fafafa",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}

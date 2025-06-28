import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SRS News",
    short_name: "SRS News",
    description: "మీ చేతిలో వార్తల ప్రపంచం – నిత్యం తాజా, నిస్సందేహం!",
    start_url: "/",
    display: "standalone",
    lang: "te",
    icons: [
      {
        src: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src:  "/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src:  "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src:  "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
  };
}
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "IJA Drones — Tecnologia e Inovação",
    short_name: "IJA Drones",
    description:
      "Pulverização com drones e gestão digital de missões para operações agrícolas precisas e rastreáveis.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#06110d",
    theme_color: "#06110d",
    lang: "pt-BR",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ijadrones.com.br"),
  title: {
    default: "IJA Drones | Cada hectare sob controle",
    template: "%s | IJA Drones",
  },
  description:
    "Tecnologia brasileira para drones: pulverização agrícola, planejamento de precisão e uma plataforma soberana para gestão de missões e operações.",
  keywords: [
    "drones agrícolas",
    "pulverização com drone",
    "gestão de drones",
    "tecnologia agrícola",
    "agricultura de precisão",
    "soberania tecnológica",
    "drone brasileiro",
  ],
  openGraph: {
    title: "IJA Drones | Cada hectare sob controle",
    description: "Pulverização com drones e gestão digital de missões para operações agrícolas mais precisas e rastreáveis.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "IJA Drones — Cada hectare sob controle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IJA Drones | Cada hectare sob controle",
    description: "Inteligência aérea e gestão digital para operações agrícolas.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7faf8",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

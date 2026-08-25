import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IJA Drones | Inteligência aérea para o agronegócio",
    template: "%s | IJA Drones",
  },
  description:
    "Pulverização agrícola com drones e software para gestão de voos, equipes e operações.",
  keywords: [
    "drones agrícolas",
    "pulverização com drone",
    "gestão de drones",
    "tecnologia agrícola",
  ],
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

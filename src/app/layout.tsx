import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXO — La Fiesta",
  description: "NEXO — La fiesta que conecta todo. Música, energía y la mejor noche de tu vida.",
  keywords: ["NEXO", "fiesta", "nightlife", "Buenos Aires", "eventos"],
  openGraph: {
    title: "NEXO — La Fiesta",
    description: "La fiesta que conecta todo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="grain">{children}</body>
    </html>
  );
}

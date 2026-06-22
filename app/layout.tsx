import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Livelo Haiti | Marketplace e-commerce haïtienne",
  description:
    "Achetez, vendez, payez via MonCash et suivez vos livraisons en temps réel avec Livelo Haiti.",
  keywords: [
    "Livelo Haiti",
    "marketplace Haïti",
    "e-commerce Haïti",
    "MonCash",
    "livraison Haïti",
    "boutiques locales",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[#F8FAFC] text-[#4E73C7]">{children}</body>
    </html>
  );
}

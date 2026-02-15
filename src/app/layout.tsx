import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OMNIS TECH | Wearable Intelligence",
    template: "%s | OMNIS TECH - Wearable Intelligence",
  },
  description: "Découvrez le futur de l'interaction. Bague connectée en titane, lunettes AR avec HUD et éclairage circadien. L'intelligence artificielle haut de gamme par OMNIS TECH.",
  keywords: [
    "Bague connectée titane",
    "Smart ring biohacking",
    "Lunettes réalité augmentée",
    "Smart glasses HUD",
    "Lunettes AR magnésium",
    "Affichage tête haute",
    "Éclairage circadien",
    "Human Centric Lighting",
    "Bague interface neurale",
    "Wearable tech luxe"
  ],
  openGraph: {
    title: "OMNIS TECH | Wearable Intelligence",
    description: "Discover the future of interaction. Swiss-engineered wearable technology.",
    url: "https://omnis-tech-v3.netlify.app",
    siteName: "OMNIS TECH",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMNIS TECH | Wearable Intelligence",
    description: "Discover the future of interaction. Swiss-engineered wearable technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Shopify Web Components Configuration */}
        <meta name="shopify-shop-domain" content="omnis-tech.myshopify.com" />
        <meta name="shopify-token" content="bibbe080775da2dd8c3fa9b4d7b8c7b3" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#FCFCFD] text-black selection:bg-black selection:text-white`}
      >

        <CartProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </CartProvider>

        {/* Shopify Web Components Script */}
        <Script
          src="https://cdn.shopify.com/shopifycloud/shop-js/v1.0/client.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}



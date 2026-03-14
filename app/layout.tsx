import type { Metadata } from "next";
import { Oswald, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Sapi's Crafterina | Premium Auto & Home Care",
  description: "Experience the gold standard in automotive and home care solutions.",
};

import { FestivalProvider } from "@/components/FestivalContext";
import { FestivalEffects } from "@/components/FestivalEffects";
import { CartProvider } from "@/components/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${montserrat.variable} ${playfair.variable} antialiased bg-black text-white`}
      >
        <FestivalProvider>
          <CartProvider>
            <FestivalEffects />
            {children}
          </CartProvider>
        </FestivalProvider>
      </body>
    </html>
  );
}

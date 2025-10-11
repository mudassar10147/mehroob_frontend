import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SheetMask | Premium Sheet Masks for Beautiful Skin",
  description: "Discover our collection of premium sheet masks. Hydrating, brightening, and anti-aging formulas for all skin types.",
  keywords: ["sheet masks", "skincare", "beauty", "face masks", "hydration", "anti-aging"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

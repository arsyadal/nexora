import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import PageTransition from "../components/PageTransition";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "NEXORA — Interactive Tech Company Profile",
  description:
    "NEXORA is a creative tech studio crafting immersive digital products, interfaces, and brand systems for ambitious teams.",
  metadataBase: new URL("https://nexora.vercel.app"),
  openGraph: {
    title: "NEXORA — Interactive Tech Company Profile",
    description:
      "A modern company profile showcasing advanced frontend engineering, motion, and lightweight 3D.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink-900 text-ink-50">
        <div data-barba="wrapper">
          <PageTransition />
          {children}
        </div>
      </body>
    </html>
  );
}

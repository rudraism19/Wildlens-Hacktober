import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ActiveSessionBar } from "@/components/session/active-session-bar";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { PwaRegister } from "@/components/pwa/pwa-register";

export const metadata: Metadata = {
  title: "WildLens — AI Nature Exploration",
  description:
    "See nature. Understand it. Then put your phone away. An AI-powered outdoor companion built for the Touch Grass challenge.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1914",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-forest-950 text-forest-100 min-h-screen flex flex-col antialiased selection:bg-emerald-800 selection:text-white pb-20 md:pb-6">
        <PwaRegister />
        <OfflineBanner />
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          {children}
        </main>
        <ActiveSessionBar />
        <BottomNav />
      </body>
    </html>
  );
}

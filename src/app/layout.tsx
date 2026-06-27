import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});
import { Providers } from "@/components/Providers";
import { AppShell } from "@/components/AppShell";
import { TechBackground } from "@/components/TechBackground";
import { LoginModal } from "@/components/LoginModal";
import { CompareBar } from "@/components/CompareBar";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "carros elétricos",
    "veículos híbridos",
    "catálogo automotivo",
    "SUV elétrico",
    "carros premium",
    site.name,
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: site.logo }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.logo],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={manrope.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <Providers>
          <TechBackground />
          <AppShell>{children}</AppShell>
          <LoginModal />
          <CompareBar />
        </Providers>
      </body>
    </html>
  );
}

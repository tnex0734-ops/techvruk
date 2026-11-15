import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const viewport: Viewport = {
  themeColor: "#FDFCFC",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-v2.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Taushik Chandana — Product Designer & Creative Developer",
    template: "%s | Taushik Chandana",
  },
  description:
    "Personal portfolio of Taushik Chandana. High-craft product design, AI agent workspaces, design systems, and creative engineering.",
  authors: [{ name: "Taushik Chandana", url: siteUrl }],
  creator: "Taushik Chandana",
  keywords: [
    "Taushik Chandana",
    "Product Designer",
    "UI/UX Designer",
    "Design Systems",
    "AI Workspaces",
    "Creative Developer",
    "Next.js",
    "React",
    "Three.js",
    "Hyderabad",
  ],
  icons: {
    icon: "/mascot_avatar.png",
    apple: "/mascot_avatar.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Taushik Chandana Portfolio",
    title: "Taushik Chandana — Product Designer & Creative Developer",
    description:
      "Personal portfolio of Taushik Chandana. High-craft product design, AI agent workspaces, design systems, and creative engineering.",
    images: [
      {
        url: "/footer_designer.png",
        width: 1200,
        height: 630,
        alt: "Taushik Chandana — Product Designer & Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taushik Chandana — Product Designer & Creative Developer",
    description:
      "Personal portfolio of Taushik Chandana. High-craft product design, AI agent workspaces, design systems, and creative engineering.",
    images: ["/footer_designer.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/lib/hooks/useSession";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ParaDoc.app - AI-Powered Legal Document Generation for US & Canada",
  description: "Generate accurate, jurisdiction-specific legal documents in seconds. AI chatbot, risk assessment, bulk generation, and secure storage for legal professionals. 7 days free trial.",
  keywords: [
    "legal AI", 
    "document generation", 
    "legal assistant", 
    "law firm software", 
    "legal documents",
    "AI chatbot legal",
    "risk assessment legal",
    "bulk document generation",
    "legal document templates",
    "US Canada legal software",
    "legal document automation",
    "secure legal storage"
  ],
  authors: [{ name: "ParaDoc.app Team" }],
  creator: "ParaDoc.app",
  publisher: "ParaDoc.app",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paradoc.app",
    siteName: "ParaDoc.app",
    title: "ParaDoc.app - AI-Powered Legal Document Generation",
    description: "Generate accurate, jurisdiction-specific legal documents in seconds. AI chatbot, risk assessment, and secure storage for legal professionals in US & Canada.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ParaDoc.app - AI Legal Document Generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ParaDoc.app - AI-Powered Legal Document Generation",
    description: "Generate accurate, jurisdiction-specific legal documents in seconds. Free trial available.",
    images: ["/twitter-image.png"],
    creator: "@ParaDocApp",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} font-sans antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

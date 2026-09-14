import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wosool-limousine.com"),
  title: "وصول ليموزين | Wosool Limousine - السفر الفاخر من الإسكندرية لكافة المحافظات",
  description:
    "تطبيق وصول ليموزين - رحلتك من الإسكندرية إلى مطار القاهرة والساحل الشمالي وكافة أنحاء مصر بأعلى مستويات الفخامة، الأمان، والالتزام التام بالمواعيد.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "وصول ليموزين",
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "وصول ليموزين | Wosool Travel & Limousine",
    description: "خدمة الليموزين والسفر الأولى في الإسكندرية لجميع محافظات ومطارات مصر.",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 600,
        alt: "شعار وصول ليموزين",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-background text-gray-100 min-h-screen selection:bg-gold-500/30 selection:text-gold-200 antialiased font-cairo">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
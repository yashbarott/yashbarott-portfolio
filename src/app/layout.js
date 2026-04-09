import { Inter, Syne } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://website-yash.vercel.app"),
  title: {
    default: "Yash Barot — WordPress & Shopify Expert",
    template: "%s | Yash Barot",
  },
  description:
    "Creative digital experiences built for fast, modern, conversion-driven WordPress and Shopify websites.",
  keywords: [
    "WordPress developer",
    "Shopify expert",
    "web design",
    "web development",
    "digital marketing",
    "portfolio",
    "Yash Barot",
  ],
  authors: [{ name: "Yash Barot", url: "https://website-yash.vercel.app" }],
  creator: "Yash Barot",
  openGraph: {
    title: "Yash Barot — WordPress & Shopify Expert",
    description:
      "Creative digital experiences built for fast, modern, conversion-driven WordPress and Shopify websites.",
    url: "https://website-yash.vercel.app",
    siteName: "Yash Barot Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/yashbarott.jpg",
        width: 1200,
        height: 630,
        alt: "Yash Barot Portfolio",
      },
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Yash Barot Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Barot — WordPress & Shopify Expert",
    description:
      "Creative digital experiences built for fast, modern, conversion-driven WordPress and Shopify websites.",
    images: ["/yashbarott.jpg"],
    creator: "@yashbarott",
  },
  alternates: {
    canonical: "https://website-yash.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} antialiased`}
    >
      <body 
        className="flex flex-col font-sans selection:bg-red-deep selection:text-white bg-black overflow-x-hidden"
        suppressHydrationWarning
      >
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

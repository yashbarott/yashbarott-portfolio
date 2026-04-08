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
  title: "Yash Barot — WordPress & Shopify Expert",
  description: "Creative Digital Experiences | Fast, Modern & Conversion-Driven Websites",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} antialiased`}
    >
      <body className="flex flex-col font-sans selection:bg-red-deep selection:text-white bg-black overflow-x-hidden">
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

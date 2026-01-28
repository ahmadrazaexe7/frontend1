import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Storefront Alpha | Build Your Empire",
  description: "The architect for high-growth Shopify stores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#020617] antialiased selection:bg-blue-500/30`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
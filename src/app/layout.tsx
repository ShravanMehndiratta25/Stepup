import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CheckoutDrawer } from "@/components/CheckoutDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "StepUp | Premium Performance & Comfort",
  description: "Engineering excellence meets daily luxury for your athletic and lifestyle needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-foreground bg-background">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CheckoutDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

import { Toaster } from "@/app/_components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./_context/cart";
import AuthProvider from "./_providers/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "New Santos Food",
  description: "Entregas rapidas e restaurantes de alta qualidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

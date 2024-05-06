import { Toaster } from "@/app/_components/ui/sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartProvider } from "./_context/cart";
import AuthProvider from "./_providers/auth";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "New Santos Food",
  description: "Restaurantes com produtos de alta qualidade com entregas rapidas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

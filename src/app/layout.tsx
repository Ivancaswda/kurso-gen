
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "../../context/AuthProvider";
import {Toaster} from "@/components/ui/sonner";
import Footer from "@/components/Footer";


const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "КурсоГен - Учись при помощи ИИ",
  description: "КурсоГен позволяет вам создавать курсы, домашние работы, раздаточные материалы, практические задания и многое другое для эффективной учебы.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
      <AuthProvider>



              <html lang="en">
              <body
                  className={`${inter.variable}  antialiased`}
              >


              {children}

              <Toaster/>

              </body>
              </html>

      </AuthProvider>
  );
}

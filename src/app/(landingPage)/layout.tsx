import type { Metadata } from "next";
import "../globals.css";
import { montserrat } from "../font/fonts";
import { Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  title: "PHYES Soft - Commerce",
  description: "Software de gestion para comercios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
      <Navbar/> 
        {children}
        <Footer/>
      </body>
    </html>
  );
}

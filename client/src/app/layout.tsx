// app/layout.tsx
import { Montserrat } from "next/font/google";
import React from 'react';
import NavBar from "@/src/app/components/NavBar";
import Footer from "@/src/app/components/Footer";
import NicotineWarning from "@/src/app/components/NicotineWarning";
import { ResponsiveProvider } from '@/src/app/contexts/ResponsiveContext';
import "./globals.css";
import { Metadata } from "next";

const poppins = Montserrat({ weight: ["100", '200', '400', '500', '700'], subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        {/* Metadata API is used to manage <head> elements */}
        {/* Your Metadata configuration will be applied here */}
      </head>
      <body>
        <ResponsiveProvider>
          <NicotineWarning />
          <NavBar />
          {/* Main content of the application */}
          <main>{children}</main>
          <Footer />
        </ResponsiveProvider>
      </body>
    </html>
  );
}

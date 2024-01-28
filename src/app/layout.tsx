"use client";
import "./globals.css";
import "./memoryGameStyles.css"
import { Inter } from 'next/font/google'
import NavBar from "./components/navbar";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Anshdeep Singh</title>
      </head>
      <body className={inter.className}>
          <NavBar />
          {children}
      </body>
    </html>
  );
}

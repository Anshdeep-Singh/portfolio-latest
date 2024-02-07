"use client";
import "./globals.css";
import "./memoryGameStyles.css"
import "./chessStyles.css"
import "./mineSweeperStyles.css"
import { Inter } from 'next/font/google'
import NavBar from "./components/navbar";
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
<meta name="google-adsense-account" content="ca-pub-2583303883736378"/>
        <title>Anshdeep Singh</title>
      </head>
      <body className={inter.className}>
          <NavBar />
          {children}
      </body>
    </html>
  );
}

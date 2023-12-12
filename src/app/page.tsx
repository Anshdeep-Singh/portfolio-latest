"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Montserrat } from "next/font/google";
import Footer from "./components/Footer";
import { useEffect } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function Home() {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    router.push("/home"); // Use the router instance
  }, [router]);

  return (
    <main
      className={`${montserrat.className} flex items-center justify-center h-screen`}
    >
      <div className="text-center">
        <p className="text-xl text-gray-400">Hello!</p>
        <div
          className="font-semibold py-2 px-4 rounded-full mt-4 animate-bounce"
          onClick={() => router.push("/home")}
        >
          Redirecting to Home Page
        </div>
      </div>
    </main>
  );
}

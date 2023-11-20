"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // Invoke useRouter to get the router instance

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="text-center my-6">
          <p className="text-xl text-gray-400">Hello,!</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
            onClick={() => router.push('/home')} // Use the router instance
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}

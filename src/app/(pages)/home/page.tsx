import { ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import React from "react";
import { storage } from "../../firebase";
import Image from "next/image";
import AnimatedText from "@/app/components/AnimatedText";
import Link from "next/link";
import { BulbComponent, BuyCoffeeComponent, DownloadComponent } from "@/app/components/Icons";
import SpinningLogo from "@/app/components/SpinningLogo";

import { Metadata } from 'next'
import TransitionEffect from "@/app/components/TransitionEffect";
 
export const metadata: Metadata = {
  title: 'Anshdeep Singh',
  description: 'Welcome to the portfolio website of Anshdeep Singh. A tech enthusiast skilled in AI, Data Analytics, Web Development, and Software Development. Proficient in coding and algorithms, dedicated to shaping the digital future. Seeking opportunities to drive innovation collaboratively.',
}
 

const page = async () => {
  const user = {
    name: "Anshdeep Singh",
    bio: "Jack of all trades, master of some.",
    location: "Vancouver, Canada",
    website: "https://new.anshdeepsingh.com",
    summary:
      "Tech enthusiast skilled in web development and AI. Proficient in coding and algorithms, dedicated to shaping the digital future. Seeking opportunities to drive innovation collaboratively.",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  };

  const profileImageRef = ref(storage, "display_pics/anshdeep4.png");

  const profileImageUrl = await getDownloadURL(profileImageRef);

  return (
    <>
    <TransitionEffect/>
    <main className="flex items-center text-dark w-full flex-grow pt-0">
      <div className="w-full h-full inline-block z-0 bg-white p-32 mt-0 xl:p-24 lg:p-20 md:p-20 sm:p-8">
        <div className="flex item-center justify-between w-full lg:flex-col">
          <div className="w-1/2 md:w-full">
            <Image
              src={profileImageUrl}
              alt="Profile Image"
              width={200}
              height={200}
              className="w-full h-auto lg:hidden md:inline-block md:w-full"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center md:w-full">
            <AnimatedText
              text={user.bio}
              className="!text-5xl !text-left font-semibold xl:!text-4xl lg:!text-center lg:!text-5xl md:!text-3xl sm:!text-2xl"
            />
            <p className="my-4 text-base font-medium hover:animate-wiggle sm:text-sm">{user.summary}</p>
            <div className="flex items-center self-start mt-2 lg:self-center">
              <a
                href="/resume/"
                className="flex items-center bg-black text-white p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-white hover:text-black border-2 border-gray-300 shadow-lg sm:p-1.5 sm:text-sm"
              >
                Resume
                <DownloadComponent className="ml-1" />
              </a>
              <a
                href="https://www.linkedin.com/in/anshdeepsingh369/"
                target="_blank"
                className="ml-4 text-lg font-medium capitalize text-black underline hover:text-blue-500 md:text-md sm:text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
      <SpinningLogo />
      <div className="absolute bottom-8 right-32 md:right-12 sm:inline-block w-24 sm:text-center sm:transform sm:-translate-x-1/2 sm:left-1/2 sm:right-1/2 sm:pl-4  mx-auto">
  <a href="https://www.buymeacoffee.com/anshdeep" target="_blank" rel="noopener noreferrer">
    <BuyCoffeeComponent />
  </a>
</div>

    </main>
    </>
);
};

export default page;

import Navbar from "@/app/components/navbar";
import { ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import React from "react";
import { storage } from "../../firebase";
import Image from "next/image";
import AnimatedText from "@/app/components/AnimatedText";
import Link from "next/link";
import { BulbComponent, DownloadComponent } from "@/app/components/Icons";
import Footer from "@/app/components/Footer";
import SpinningLogo from "@/app/components/SpinningLogo";

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
  const resumeRef = ref(storage, "resume/IT System Developer.pdf");

  const profileImageUrl = await getDownloadURL(profileImageRef);
  const resumeUrl = await getDownloadURL(resumeRef);

  return (
    <main className="flex items-center text-dark w-full flex-grow pt-0">
      <div className="w-full h-full inline-block z-0 bg-white p-32 mt-0">
        <div className="flex item-center justify-between w-full">
          <div className="w-1/2">
            <Image
              src={profileImageUrl}
              alt="Profile Image"
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center self-center">
            <AnimatedText
              text={user.bio}
              className="!text-5xl !text-left font-semibold"
            />
            <p className="my-4 text-base font-medium">{user.summary}</p>
            <div className="flex items-center self-start mt-2">
              <Link
                href={resumeUrl}
                target="_blank"
                className="flex items-center bg-black text-white p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-white hover:text-black border-2 border-gray-300 shadow-lg"
                download={true}
              >
                Resume
                <DownloadComponent className="ml-1" />
              </Link>
              <Link
                href="mailto:anshdeepsaini@gmail.com"
                className="ml-4 text-lg font-medium capitalize text-black underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SpinningLogo />
      <div className="absolute right-20 bottom-8 inline-block w-24">
        <BulbComponent />
      </div>
    </main>
  );
};

export default page;

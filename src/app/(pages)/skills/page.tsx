import React from "react";
import { Metadata } from "next";
import Skills from "@/app/components/Skills";
import Experience from "@/app/components/Experience";
import Education from "@/app/components/Education";
import { BuyCoffeeComponent } from "@/app/components/Icons";

export const metadata: Metadata = {
  title: "Anshdeep Singh",
  description:
    "Welcome to the portfolio website of Anshdeep Singh. A tech enthusiast skilled in AI, Data Analytics, Web Development, and Software Development. Proficient in coding and algorithms, dedicated to shaping the digital future. Seeking opportunities to drive innovation collaboratively.",
};

const page = () => {
  return (
    <>
      <div className="w-full h-full inline-block z-0 bg-white p-32 pt-1 mt-0 xl:p-24 lg:p-20 md:p-20 sm:p-8">
        <Skills />
        <Experience />
        <Education />
      </div>
      <div className="hidden sm:block mb-48 bottom-0 right-0 w-24 sm:text-center sm:transform sm:-translate-x-1/2 sm:left-1/2 sm:right-1/2 sm:pl-16 mx-auto">
        <a
          href="https://www.buymeacoffee.com/anshdeep"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BuyCoffeeComponent />
        </a>
      </div>
    </>
  );
};

export default page;

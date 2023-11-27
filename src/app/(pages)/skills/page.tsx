import React from "react";
import { Metadata } from "next";
import Skills from "@/app/components/Skills";
import Experience from "@/app/components/Experience";
import Education from "@/app/components/Education";
import { BuyCoffeeComponent } from "@/app/components/Icons";
import TransitionEffect from "@/app/components/TransitionEffect";
import ReverseTransitionEffect from "@/app/components/ReverseTransitionEffect";

export const metadata: Metadata = {
    title: "Anshdeep Singh - Skills, Experience, Education",
    description: "Anshdeep Singh is a skilled individual with a diverse set of talents spanning the fields of machine learning, software development, and web technologies. His expertise includes Python, OpenCV, Keras, Pandas, Numpy, MatplotLib, Java, Bootstrap, Spring Boot, Firebase, MySQL, TypeScript, React, Tailwind CSS, Next, HTML, Express, Node, CSS, MongoDB, JavaScript, GitHub, Figma, Canva, Power BI, Tableau, and more. Anshdeep's experience includes roles such as a Research Assistant at Douglas College, ML Engineer at Tekolutions, Research Student Intern at SCAII, and Reliability Engineer Intern at SCL, ISRO. He holds a strong educational background with a focus on Computing and Information Systems - Data Analytics from Douglas College, B.Tech in Electronics and Telecommunication from SIT, Pune, and a Diploma in Business Management from SIBM, Pune. Anshdeep's projects showcase his versatility, from developing a social media-infused marketplace to building a Bart-Trading Platform with Next.js and Firestore. With a commitment to excellence, Anshdeep is well-prepared for dynamic roles in the ever-evolving technology landscape."
  };

const page = () => {

  return (
    <>
    <TransitionEffect/>
    <main>
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
      </main>
    </>
  );
};

export default page;

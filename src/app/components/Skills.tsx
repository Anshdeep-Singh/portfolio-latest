"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { motion } from "framer-motion";

interface SkillProps {
  name: string;
  x: { sm: string; lg: string };
  y: { sm: string; lg: string };
  className: string;
}

const Skill = ({ name, x, y, className }: SkillProps) => {

  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  const xPos = isSmallScreen ? x.sm : x.lg;
  const yPos = isSmallScreen ? y.sm : y.lg;

  return (
    <>
      <motion.div
className={`flex items-center justify-center rounded-full font-semibold bg-black text-white xs:text-black xs:bg-white xs:shadow-sm p-4 shadow-lg cursor-pointer absolute ${className} md:text-xs sm:text-16 md:p-2 sm:p-1 lg:text-sm lg:p-2 xl:text-sm xl:p-3`}
whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
        }}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: 1, x: xPos, y: yPos }}
        transition={{ duration: 1.5 }}
      >
        {name}
      </motion.div>
    </>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-1 w-full text-center mb-32 md:text-6xl ">
        Skills
      </h2>
      <div className="w-full h-screen relative flex items-center justify-center bg-webPattern md:bg-webPatternMb rounded-full lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]">
        <Skill
          name="Machine Learning"
          x={{ sm: "-15vw", lg: "-15vw" }}
          y={{ sm: "2vw", lg: "2vw" }}
          className=""
        />
        <Skill
          name="Python"
          x={{ sm: "-15vw", lg: "-15vw" }}
          y={{ sm: "10vw", lg: "10vw" }}
          className=""
        />
        <Skill
          name="OpenCV"
          x={{ sm: "-25vw", lg: "-25vw" }}
          y={{ sm: "10vw", lg: "10vw" }}
          className="xs:hidden"
        />
        <Skill
          name="Keras"
          x={{ sm: "-30vw", lg: "-30vw" }}
          y={{ sm: "-10vw", lg: "-10vw" }}
          className="xs:hidden"
        />
        <Skill
          name="Pandas"
          x={{ sm: "-22vw", lg: "-22vw" }}
          y={{ sm: "-5vw", lg: "-5vw" }}
          className="xs:hidden"
        />
        <Skill
          name="Numpy"
          x={{ sm: "-40vw", lg: "-35vw" }}
          y={{ sm: "-5vw", lg: "0vw" }}
          className=""
        />
        <Skill
          name="MatplotLib"
          x={{ sm: "-35vw", lg: "-35vw" }}
          y={{ sm: "15vw", lg: "15vw" }}
          className=""
        />
        <Skill
          name="R"
          x={{ sm: "-15vw", lg: "-15vw" }}
          y={{ sm: "-10vw", lg: "-10vw" }}
          className=""
        />

        <Skill
          name="Java"
          x={{ sm: "15vw", lg: "15vw" }}
          y={{ sm: "-5vw", lg: "-5vw" }}
          className=""
        />
        <Skill
          name="Bootstrap"
          x={{ sm: "35vw", lg: "35vw" }}
          y={{ sm: "0vw", lg: "0vw" }}
          className=""
        />
        <Skill
          name="Thymleaf"
          x={{ sm: "23vw", lg: "23vw" }}
          y={{ sm: "-5vw", lg: "-5vw" }}
          className="lg:hidden"
        />
        <Skill
          name="Spring Boot"
          x={{ sm: "20vw", lg: "20vw" }}
          y={{ sm: "2vw", lg: "2vw" }}
          className="xs:hidden"
        />
        <Skill
          name="Spring MVC"
          x={{ sm: "30vw", lg: "30vw" }}
          y={{ sm: "5vw", lg: "5vw" }}
          className="lg:hidden"
        />
        <Skill
          name="Firebase"
          x={{ sm: "7vw", lg: "7vw" }}
          y={{ sm: "5vw", lg: "5vw" }}
          className=""
        />
        <Skill
          name="MySQL"
          x={{ sm: "23vw", lg: "20vw" }}
          y={{ sm: "22vw", lg: "15vw" }}
          className=""
        />

        <Skill
          name="TypeScript"
          x={{ sm: "0vw", lg: "0vw" }}
          y={{ sm: "23vw", lg: "18vw" }}
          className="sm:hidden"
        />
        <Skill
          name="React"
          x={{ sm: "-10vw", lg: "-10vw" }}
          y={{ sm: "25vw", lg: "20vw" }}
          className=""
        />
        <Skill
          name="Tailwind CSS"
          x={{ sm: "-17vw", lg: "-17vw" }}
          y={{ sm: "30vw", lg: "25vw" }}
          className="sm:hidden"
        />
        <Skill
          name="Next"
          x={{ sm: "10vw", lg: "10vw" }}
          y={{ sm: "25vw", lg: "20vw" }}
          className=""
        />
        <Skill
          name="HTML"
          x={{ sm: "10vw", lg: "10vw" }}
          y={{ sm: "30vw", lg: "25vw" }}
          className="lg:hidden"
        />
        <Skill
          name="Express"
          x={{ sm: "-5vw", lg: "-5vw" }}
          y={{ sm: "30vw", lg: "25vw" }}
          className="sm:hidden"
        />
        <Skill
          name="Node"
          x={{ sm: "3vw", lg: "3vw" }}
          y={{ sm: "35vw", lg: "27vw" }}
          className=""
        />
        <Skill
          name="CSS"
          x={{ sm: "17vw", lg: "17vw" }}
          y={{ sm: "30vw", lg: "25vw" }}
          className="lg:hidden"
        />

        <Skill
          name="Web Design"
          x={{ sm: "10vw", lg: "10vw" }}
          y={{ sm: "-15vw", lg: "-15vw" }}
          className="sm:hidden"
        />
        <Skill
          name="Web Development"
          x={{ sm: "20vw", lg: "20vw" }}
          y={{ sm: "-22vw", lg: "-20vw" }}
          className=""
        />
        <Skill
          name="Software Development"
          x={{ sm: "30vw", lg: "30vw" }}
          y={{ sm: "-13vw", lg: "-13vw" }}
          className=""
        />
        <Skill
          name="Data Science"
          x={{ sm: "-27vw", lg: "-31vw" }}
          y={{ sm: "3vw", lg: "5vw" }}
          className="lg:hidden"
        />
        <Skill
          name="MongoDB"
          x={{ sm: "20vw", lg: "15vw" }}
          y={{ sm: "12vw", lg: "10vw" }}
          className=""
        />
        <Skill
          name="JavaScript"
          x={{ sm: "0vw", lg: "0vw" }}
          y={{ sm: "17vw", lg: "12vw" }}
          className=""
        />
        <Skill
          name="GitHub"
          x={{ sm: "0vw", lg: "0vw" }}
          y={{ sm: "-5vw", lg: "-5vw" }}
          className=""
        />
        <Skill
          name="Figma"
          x={{ sm: "-9vw", lg: "-9vw" }}
          y={{ sm: "-17vw", lg: "-15vw" }}
          className=""
        />
        <Skill
          name="Canva"
          x={{ sm: "-20vw", lg: "-20vw" }}
          y={{ sm: "-20vw", lg: "-15vw" }}
          className=""
        />
        <Skill
          name="Power BI"
          x={{ sm: "-10vw", lg: "-10vw" }}
          y={{ sm: "-30vw", lg: "-21vw" }}
          className=""
        />
        <Skill
          name="Tablue"
          x={{ sm: "0vw", lg: "0vw" }}
          y={{ sm: "-24vw", lg: "-19vw" }}
          className=""
        />
      </div>
    </>
  );
};

export default Skills;

"use client";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { motion } from "framer-motion";
import {
  FbComponent,
  InstaComponent,
  LinkedinComponent,
  GitComponent,
} from "./Icons";
import { useRouter } from 'next/navigation';



const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  type CustomMobilelinkProps = {
    href: string;
    title: string;
    className?: string;
    children: React.ReactNode;
    toggle: () => void;
    router?: any;
  };
  
  const CustomMobilelink = ({ href, title, className = "", children, toggle, router }: CustomMobilelinkProps) => {
    const handleClick = () => {
      toggle();
      router.push(href);
    };
  
    return (
      <motion.button onClick={handleClick} className={`${className} relative group my-2`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.9 }}>
        {title}
        <span
          className={`
            h-[1px] inline-block
            口bg-dark
            absolute left-0 -bottom-0.5
            group-hover:w-full transition-[width] ease duration-300
            ${router.asPath === href ? "w-full" : "w-0"}
            dark:bg-light`}
        >
          &nbsp;
        </span>
      </motion.button>
    );
  };

  return (
    <header className="w-full px-32 py-12 font-medium flex item-center justify-between relative md:px-16">
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleToggle}
      >
        <span
          className={`bg-black dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${
            navbarOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-black dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            navbarOpen ? "opacity-0" : "opacity-1"
          }`}
        ></span>
        <span
          className={`bg-black dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${
            navbarOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      <div className="w-full flex justify-between items-center lg:hidden">
        <nav className="flex items-center justify-center flex-wrap">
          <motion.a
            href="/home"
            className="mx-4"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            Home
          </motion.a>
          <motion.a
            href="/projects/"
            className="mx-4"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            Projects
          </motion.a>
          <motion.a
            href="/projects/"
            className="mx-4"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            Skills
          </motion.a>
        </nav>

        <nav className="flex items-center justify-center flex-wrap">
          <motion.a
            href="https://www.linkedin.com/in/anshdeepsingh369/"
            target={"_blank"}
            className="mx-4 w-6 mr-3"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <LinkedinComponent />
          </motion.a>
          <motion.a
            href="https://github.com/Anshdeep-Singh"
            target={"_blank"}
            className="mx-4 w-6 mr-3"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <GitComponent />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/anshdeep.s.saini/"
            target={"_blank"}
            className="mx-4 w-6 mr-3"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <FbComponent />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/anshdeep_singh_/"
            target={"_blank"}
            className="mx-4 w-6 mr-3"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <InstaComponent />
          </motion.a>
        </nav>
      </div>

          {
            navbarOpen ? 
            (      
            <motion.div 
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1 , opacity: 1}}
            className="min-w-[70vw] flex flex-col justify-between z-50 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400/90 dark:bg-white/75 rounded-lg backdrop-blur-md py-32">
            <nav className="flex items-center flex-col justify-center flex-wrap pb-5">
              <CustomMobilelink
                title="Home"
                href="/home"
                className=""
                toggle={handleToggle}
                router={router}
              >
                Home
              </CustomMobilelink>
              <CustomMobilelink
                title="Projects"
                href="/projects/"
                className=""
                toggle={handleToggle}
                router={router}

              >
                Projects
              </CustomMobilelink>
              <CustomMobilelink
                title="Skills"
                href="/projects/"
                className=""
                toggle={handleToggle}
                router={router}

              >
                Skills
              </CustomMobilelink>
    
            </nav>
            <nav className="flex items-center justify-center flex-wrap">
              <motion.a
                href="https://www.linkedin.com/in/anshdeepsingh369/"
                target={"_blank"}
                className="mx-4 w-6 mr-3"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedinComponent />
              </motion.a>
              <motion.a
                href="https://github.com/Anshdeep-Singh"
                target={"_blank"}
                className="mx-4 w-6 mr-3"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <GitComponent />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/anshdeep.s.saini/"
                target={"_blank"}
                className="mx-4 w-6 mr-3"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <FbComponent />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/anshdeep_singh_/"
                target={"_blank"}
                className="mx-4 w-6 mr-3"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <InstaComponent />
              </motion.a>
            </nav>
          </motion.div>)
             : null
          }
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        {" "}
        <Logo />
      </div>
    </header>
  );
};

export default Navbar;

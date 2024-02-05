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
import ReverseTransitionEffect from "./ReverseTransitionEffect";
import TransitionEffect from "./TransitionEffect";
import QrComponent from "./QrComponent";
import { set } from "firebase/database";
import MemoryGameComponent from "./MemoryGameComponent";
import { div } from "three/examples/jsm/nodes/Nodes.js";





const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [showGamePanel, setshowGamePanel] = React.useState(false);
  const [showQrPanel, setshowQrPanel] = React.useState(false);
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setNavbarOpen(false);
    setshowGamePanel(false);
    setshowQrPanel(false);
  };


  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
    setshowGamePanel(false);
    setshowQrPanel(false);
  };

  const toggleGamePanel = () => {
    setshowGamePanel(!showGamePanel);
    setNavbarOpen(false);
    setshowQrPanel(false);
    setIsDropdownOpen(false);
  };

  const toggleQrPanel = () => {
    setshowQrPanel(!showQrPanel);
    setNavbarOpen(false);
    setshowGamePanel(false);
    setIsDropdownOpen(false);
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
          className={`bg-black dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${navbarOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
        ></span>
        <span
          className={`bg-black dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${navbarOpen ? "opacity-0" : "opacity-1"
            }`}
        ></span>
        <span
          className={`bg-black dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${navbarOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
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
            href="/skills/"
            className="mx-4"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            Skills
          </motion.a>
          <motion.a
            href="/resume/"
            className="mx-4"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            Resume
          </motion.a>
        </nav>

        <nav className="flex items-center justify-center flex-wrap">
          {!navbarOpen && (
            <div className="relative inline-block text-left">
              <div
              className="w-[150px] text-center"
              >
                <motion.button
                  type="button"
                  onClick={handleDropdownToggle}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="mx-4 text-center"
                >
                  More
                </motion.button>
              </div>
              {isDropdownOpen && (
                <div className="absolute w-[150px] mt-2 items-center bg-white border border-gray-300 divide-y divide-gray-200 rounded-md shadow-lg z-50">
                  {/* Dropdown content goes here */}
                  <div className="py-1 px-2 text-center w-full">
                    {/* Add your additional dropdown items here */}
                    <button
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded-lg"
                      onClick={toggleGamePanel}
                    >
                      Games
                    </button>
                    <button
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={toggleGamePanel}
                    >
                      QRCode Generator
                    </button>
                    <motion.a
                      href="https://chat.anshdeepsingh.com/"
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Global Chat App
                    </motion.a>
                    <motion.a
                      href="https://sketch.anshdeepsingh.com/"
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Concept Sketch App
                    </motion.a>

                    <div
                      className="flex flex-row justify-center items-center">
                      <motion.a
                        href="https://www.linkedin.com/in/anshdeepsingh369/"
                        target={"_blank"}
                        className=""
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ scale: 0.60 }}
                      >
                        <LinkedinComponent />
                      </motion.a>
                      <motion.a
                        href="https://github.com/Anshdeep-Singh"
                        target={"_blank"}
                        className=""
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ scale: 0.60 }}

                      >
                        <GitComponent />
                      </motion.a>
                      <motion.a
                        href="https://www.facebook.com/anshdeep.s.saini/"
                        target={"_blank"}
                        className=""
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ scale: 0.60 }}

                      >
                        <FbComponent />
                      </motion.a>
                      <motion.a
                        href="https://www.instagram.com/anshdeep_singh_/"
                        target={"_blank"}
                        className=""
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ scale: 0.60 }}
                      >
                        <InstaComponent />
                      </motion.a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {
        navbarOpen ?
          (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1 }}
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
                  href="/skills/"
                  className=""
                  toggle={handleToggle}
                  router={router}

                >
                  Skills
                </CustomMobilelink>
                <CustomMobilelink
                  title="Resume"
                  href="/resume/"
                  className=""
                  toggle={handleToggle}
                  router={router}
                >
                  Resume
                </CustomMobilelink>
                <CustomMobilelink
                  title="Global Chat App"
                  href="https://chat.anshdeepsingh.com/"
                  className=""
                  toggle={handleToggle}
                  router={router}
                >
                  Global Chat App
                </CustomMobilelink>
                <CustomMobilelink
                  title="Concept Sketch App"
                  href="https://sketch.anshdeepsingh.com/"
                  className=""
                  toggle={handleToggle}
                  router={router}
                >
                  Concept Sketch App
                </CustomMobilelink>
                <motion.div
                  className={`relative group my-2 cursor-pointer`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleQrPanel}
                >
                  GenerateQR Code
                </motion.div>
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
          : <>
          </>
      }

      {showGamePanel ? (
        // <QrComponent/>
        <MemoryGameComponent />
      ) : null}
      {showQrPanel ? (
        <QrComponent />
      ) : null}
      <div className="absolute left-[50%] top-2 translate-x-[-50%] cursor-pointer" onClick={toggleGamePanel}>
        <Logo />
      </div>
    </header>
  );
};

export default Navbar;

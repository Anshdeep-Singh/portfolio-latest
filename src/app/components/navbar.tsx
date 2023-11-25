
import Link from 'next/link';
import React from 'react';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { FbComponent, InstaComponent,LinkedinComponent, GitComponent } from './Icons';



const Navbar = () => {
  return (
    <header className="w-full px-32 py-12 font-medium flex item-center justify-between">
    <nav className="flex items-center justify-center flex-wrap">
      <motion.a href="/home" className="mx-4" whileHover={{y:-4}} whileTap={{scale:0.9}} >Home</motion.a>
      <motion.a href="/projects/" className="mx-4" whileHover={{y:-4}} whileTap={{scale:0.9}}>Projects</motion.a>
      <motion.a href="/projects/" className="mx-4" whileHover={{y:-4}} whileTap={{scale:0.9}}>Skills</motion.a>
    </nav>
    <nav className='flex items-center justify-center flex-wrap'>
    <motion.a href="https://www.linkedin.com/in/anshdeepsingh369/" target={"_blank"} className='mx-4 w-6 mr-3' whileHover={{y:-4}} whileTap={{scale:0.9}}><LinkedinComponent/></motion.a>
    <motion.a href="https://github.com/Anshdeep-Singh" target={"_blank"} className='mx-4 w-6 mr-3' whileHover={{y:-4}} whileTap={{scale:0.9}}><GitComponent/></motion.a>
      <motion.a href="https://www.facebook.com/anshdeep.s.saini/" target={"_blank"} className='mx-4 w-6 mr-3' whileHover={{y:-4}} whileTap={{scale:0.9}}><FbComponent/></motion.a>
      <motion.a href="https://www.instagram.com/the_cosmic_painter/" target={"_blank"} className='mx-4 w-6 mr-3' whileHover={{y:-4}} whileTap={{scale:0.9}}><InstaComponent/></motion.a>
    </nav>
    <div className='absolute left-[50%] top-2 translate-x-[-50%]'>    <Logo />
</div>
  </header>
  );
};

export default Navbar;




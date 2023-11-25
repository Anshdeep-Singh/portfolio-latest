"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const quickFade = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      staggerChildren: 0.08,
      ease: 'easeInOut',
    },
  },
};

const singleLetter = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  return (
    <div className='w-full mx-auto flex items-center py-2 justify-center text-center overflow-hidden sm:py-0'>
      <motion.h1
        className={`inline-block w-full text-black font-bold capitalize text-8xl ${className}`}
        variants={quickFade}
        initial="initial"
        animate="animate"
        whileHover={{y:-4}} 
        whileTap={{scale:0.9}}
      >
        {text.split(' ').map((char, index) => (
          <motion.span
            className='inline-block'
            key={char + '-' + index}
            variants={singleLetter}
          >
            {char}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;

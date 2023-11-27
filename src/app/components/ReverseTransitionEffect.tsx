"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReverseTransitionEffect = () => {
  return (
    <AnimatePresence>
      <>
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-50 bg-red-500'
          initial={{ x: '0%', width: '0%' }}
          animate={{ x: '100%', width: '100%' }}
          exit={{ x: ['100%', '0%'], width: ['100%', '0%'] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-30 bg-white'
          initial={{ x: '0%', width: '0%' }}
          animate={{ x: '100%', width:  '100%'  }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeInOut' }}
        />
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-10 bg-black'
          initial={{ x: '0%', width: '0%' }}
          animate={{ x: '100%', width:  '100%' }}
          transition={{ delay: 0.9, duration: 0.5, ease: 'easeInOut' }}
        />
      </>
    </AnimatePresence>
  );
};

export default ReverseTransitionEffect;

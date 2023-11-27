"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionEffect = () => {
  return (
    <AnimatePresence mode='wait'>
      <>
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-50 bg-black'
          initial={{ x: '100%', width: '100%' }}
          animate={{ x: '0%', width: '0%' }}
          exit={{ x: ['0', '100%'], width: ['0', '100%'] }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-40 bg-white'
          initial={{ x: '100%', width: '100%' }}
          animate={{ x: '0%', width: '0%' }}
          transition={{ delay: 0.1, duration: 0.4, ease: 'easeInOut' }}
        />
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-30 bg-red-800'
          initial={{ x: '100%', width: '100%' }}
          animate={{ x: '0%', width: '0%' }}
          transition={{ delay: 0.3, duration: 0.3, ease: 'easeInOut' }}
        />
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-20 bg-green-800'
          initial={{ x: '100%', width: '100%' }}
          animate={{ x: '0%', width: '0%' }}
          transition={{ delay: 0.5, duration: 0.3, ease: 'easeInOut' }}
        />
      </>
    </AnimatePresence>
  );
};

export default TransitionEffect;

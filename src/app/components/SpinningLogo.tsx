"use client";
import React, { useState } from 'react';
import { SpinningText } from './Icons';
import Link from 'next/link';

const SpinningLogo: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className='fixed left-4 bottom-4 display-flex items-center justify-center overflow-hidden'>
      <div className='w-48 h-auto display-flex items-center justify-center relative md:w-24 sm:w-12'>
        <SpinningText />
        <Link
          href="https://www.instagram.com/anshdeep_singh_/"
          className='flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white shadow-md border border-solid border-black w-20 h-20 rounded-full hover:bg-white hover:text-black ml-1 md:ml-0 sm:hidden
          md:w-12 md:h-12 md:text-[10px]'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? "Let's Go!" : "Connect"}
        </Link>
      </div>
    </div>
  );
};

export default SpinningLogo;

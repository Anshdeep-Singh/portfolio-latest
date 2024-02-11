"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";

import hero1 from "../../../public/hero1.png"
import hero2 from "../../../public/hero2.png"
import hero3 from "../../../public/hero3.png"
import hero4 from "../../../public/hero4.png"
import hero5 from "../../../public/hero5.png"
import hero6 from "../../../public/hero6.png"


const Hero = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const profileImages = [hero1, hero2, hero3, hero4, hero5, hero6];



    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
        }, 2500);
    
        return () => clearInterval(interval);
      }, [profileImages.length]);


    return (
        <>
            <Image
                src={profileImages[currentImageIndex]}
                alt="Profile Image"
                width={200}
                height={200}
                className="w-full h-auto lg:hidden md:inline-block md:w-full"
            />
        </>
    );
};

export default Hero;


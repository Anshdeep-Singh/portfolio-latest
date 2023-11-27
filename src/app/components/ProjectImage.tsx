"use client";
import { motion } from 'framer-motion';
import React from 'react';
import Image from "next/image";


const ImageMotion = motion(Image)

interface ProjectImageProps {
    img: string;
    title: string;
  }
  
  const ProjectImage: React.FC<ProjectImageProps> = ({img, title}) => {
    return (
      <>
        <ImageMotion src={img} alt={title} width={500} height={300} className="w-full h-auto"
        whileHover={{scale:1.05}}
        transition={{duration:0.2}}
        priority={true}
        />
      </>
    );
  };
  
  export default ProjectImage;
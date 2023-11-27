"use client";
import React, { useRef } from 'react';
import { motion, useScroll } from "framer-motion"
import LiComponent from './LiComponent';

interface DetailsProps {
    info: string;
    time: string;
    place: string;
    type: string;
  }
  
  const Details = ({type, place, time, info}: DetailsProps) => {

    const ref = useRef(null);
    return(<>
    <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] md:w-[80%] mx-auto flex flex-col items-center justify-between'>

        <LiComponent reference={ref}/>
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:'spring'}}
        >
        <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>{type}</h3>           
         <span className='capitalize font-medium text-black/75 xs:text-sm'>
                {time} | {place}
            </span>
            <p className='font-medium w-full md:text-sm text-justify'>{info}</p>
        </motion.div>
    </li>


    </>)
  };




const Education = () => {

    const ref = useRef(null);

    const {scrollYProgress} = useScroll(
        {
            target: ref,
            offset:["start end", "center start"]
        }
    );
  return (
    <>
    <div className='my-64 mb-48'>
        <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16'>Education</h2>
        <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
            <motion.div className='absolute left-9 top-0 w-[4px] h-full bg-black origin-top md:width-[2px] md:left-[28px] xs:left-[18px] shadow-lg' style={{scaleY:scrollYProgress , boxShadow: '0 0 10px #00ff00'}}/>
            <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
                <Details type='Computing and Information Systems - Data Analytics' place='Douglas College' time='Jan 2022 - Jan 2024' info="In my education, I tackled diverse projects showcasing proficiency in various technologies. I created a social media-infused marketplace using AWS S3, SQL, and Bootstrap. I also developed a MERN stack car rental app. Currently, I'm building a Bart-Trading Platform with Next.js and Firestore for my CSIS 4495 Final Project, focusing on streamlining goods trading through a dynamic interface with a robust CI/CD pipeline. These projects highlight my versatility and hands-on software development experience."/>
                <Details type='B.Tech E&TC' place='SIT, Pune' time='Jul 2017 - Jul 2021' info='In my B.Tech in Electronics and Telecommunication, I focused on mastering electronic systems and communication technologies. I gained expertise in circuit design, digital signal processing, and explored areas like wireless communication. The program emphasized hands-on projects, honing my skills in applying theoretical knowledge to real-world engineering challenges. I became adept at integrating hardware and software components, preparing for a dynamic career in the field.'/>
                <Details type='Diploma in Business Management' place='SIBM, Pune' time='Jan 2018 - Jul 2019' info='I delved into essential aspects of business operations. The program equipped me with a solid foundation in areas like marketing, finance, and organizational management. I gained practical insights into strategic planning, decision-making, and effective communication within a business context. Through real-world case studies and projects, I developed skills in problem-solving and critical thinking, preparing me for a dynamic role in the business world.'/>
            </ul>
        </div>
    </div>
    </>
  );
};

export default Education;
